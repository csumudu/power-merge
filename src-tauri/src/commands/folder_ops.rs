use std::{
    fs,
    path::Path,
    process::{Command, Stdio},
};

use crate::models::File;
use nfd2::{DialogType, Response};
use serde_json::Value;

use crate::utils::{
    create_files, extract_values, getContent, get_file_content_by_path, get_files_with_conflicts,
    merge_file_content, modify_values, parse_files_from_directory, write_file,
};

#[tauri::command]
pub fn get_folder_file_list(ftype: &str) -> (String, Vec<File>) {
    println!("Opening folder select window...");
    println!("Folder Type -- {}", ftype);
    let result = nfd2::open_pick_folder(None);

    match result {
        Ok(Response::Okay(folder_path)) => {
            let sanitized_path = folder_path.to_str().unwrap().replace("\\", "/");
            let res = parse_files_from_directory(&sanitized_path);
            println!("fiel-->{:?}", res);
            (sanitized_path, res)

            //vec![folder_path.to_str().unwrap().to_string()]
        }
        _ => (String::from(""), vec![]),
    }
}

#[tauri::command]
pub fn open_folder(path: &str) {
    println!("Opening the folder ->{}", path);

    Command::new("explorer")
        .arg(path.to_string().replace("/", "\\"))
        .spawn()
        .unwrap();
}

#[tauri::command]
pub fn open_file_content(path: &str) -> String {
    println!("Retreive File Content for ->{}", path);
    match get_file_content_by_path(path.to_string()) {
        Some(content) => content,
        None => String::from(""),
    }
}

#[tauri::command]
pub fn get_selected_folder_path() -> String {
    let result = nfd2::open_pick_folder(None);

    match result {
        Ok(Response::Okay(folder_path)) => {
            let sanitized_path = folder_path.to_str().unwrap().replace("\\", "/");
            sanitized_path
        }
        _ => String::from(""),
    }
}

#[tauri::command]
pub async fn generate_translations(
    source: &str,
    language: &str,
    api: &str,
) -> Result<Vec<File>, String> {
    println!("source - {}", source);
    println!("target - {}", language);

    //TODO Read from environment
    let url = "https://translation.googleapis.com/language/translate/v2?key=AIzaSyCjc6e8SajyPX7b0X40xWA9lREzmMwZlXk";

    let source_files = parse_files_from_directory(source)
        .into_iter()
        .filter(|f| f.name == "en.json")
        .map(|mut f: File| {
            let old_name = f.name.clone();
            let new_name = format!("{}.json", language);
            f.name = new_name.clone();
            f.result_path = Some(f.path.replace(&old_name, &new_name));
            f
        })
        .collect::<Vec<File>>();

    println!("Source Files {:?}", source_files);

    for file in source_files {
        print!("file to be created-->{}", file.path);

        let content = fs::read_to_string(&file.path).expect("Failed to read file Two");
        if (api == "google") {
            let mut parsed: Value = serde_json::from_str(&content).expect("Failed to parse JSON");

            let mut values_to_be_translated = Vec::new();
            extract_values(&parsed, &mut values_to_be_translated);
            println!("Values to be translated --->{:?}", values_to_be_translated);

            let values_to_be_translated_str: Vec<&str> =
                values_to_be_translated.iter().map(|s| s.as_str()).collect();

            let translated_values = getContent(url, values_to_be_translated_str, language)
                .await
                .unwrap_or_default();

            print!("Translated Values-->{:?}", translated_values);

            let mut index = 0;
            modify_values(&mut parsed, &translated_values, &mut index);

            let updated_content =
                serde_json::to_string_pretty(&parsed).expect("Failed to serialize JSON");

            write_file(&file, updated_content, &source);
        } else {
            write_file(&file, content, &source);
        }
    }

    Ok(parse_files_from_directory(source))
}

#[tauri::command]
pub fn merge_folders(source: &str, target: &str, result: &str) -> Vec<File> {
    println!("source - {}", source);
    println!("target - {}", target);
    println!("result - {}", result);

    match fs::remove_dir_all(result) {
        Ok(_) => println!("Directory successfully deleted -{}", result),
        Err(e) => println!("Failed to delete the directort {:?}", e),
    }

    match fs::create_dir(result) {
        Ok(_) => println!("Directory successfully Created {}", result),
        Err(e) => println!("Failed to Create the directort {:?}", e),
    }

    let merged_result: Vec<File> = get_files_with_conflicts(source, target)
        .into_iter()
        .map(|mut f| {
            f.result_path = Some(format!("{}/{}", result, f.relative_path).replace("//", "/"));
            f
        })
        .collect();

    println!("After added res path --> {:#?}", merged_result);

    let files_without_conflicts: Vec<File> = merged_result
        .clone()
        .into_iter()
        .filter(|f| !f.has_conflicts)
        .collect();

    println!("files without conflict - {:#?}", files_without_conflicts);

    create_files(&files_without_conflicts, &result);

    merged_result
}

#[tauri::command]
pub fn resolve_file_conflict(sourceFile: File, targetFile: File, resultFolderPath: &str) -> bool {
    println!("source - {}", sourceFile.path);
    println!("target - {}", targetFile.path);
    println!("result - {}", resultFolderPath);

    merge_file_content(sourceFile, targetFile, resultFolderPath)
}
