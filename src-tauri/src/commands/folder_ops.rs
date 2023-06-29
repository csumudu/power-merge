use std::{
    fs,
    path::Path,
    process::{Command, Stdio},
};

use crate::models::File;
use nfd2::{DialogType, Response};

use crate::utils::{
    create_files, get_file_content_by_path, get_files_with_conflicts, merge_file_content,
    parse_files_from_directory,
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
            f.path = format!("{}/{}", result, f.relative_path).replace("//", "/");
            f
        })
        .collect();

    let files_without_conflicts: Vec<File> = merged_result
        .clone()
        .into_iter()
        .filter(|f| !f.has_conflicts)
        .map(|mut f| {
            f.path = format!("{}/{}", source, f.relative_path).replace("//", "/");
            f
        })
        .collect();

    println!("files without conflict - {:?}", files_without_conflicts);

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
