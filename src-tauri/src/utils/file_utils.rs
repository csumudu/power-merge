use std::{
    fs,
    path::Path,
    process::{Command, Stdio},
};

use walkdir::WalkDir;

use crate::models::File;

pub fn parse_files_from_directory(dir_path: &str) -> Vec<File> {
    let mut files: Vec<File> = Vec::new();

    for entry in WalkDir::new(dir_path).into_iter().filter_map(|e| e.ok()) {
        if entry.file_type().is_file() {
            if let Some(file_name) = entry.file_name().to_str() {
                let path = entry
                    .path()
                    .to_path_buf()
                    .display()
                    .to_string()
                    .replace("\\", "/");

                let relative_path = path.clone().strip_prefix(dir_path).unwrap().to_string();

                let sub_directories: Vec<String> = relative_path
                    .trim_end_matches(file_name)
                    .trim_end_matches('/')
                    .split('/')
                    .map(|dir| dir.to_string())
                    .filter(|dir| !dir.is_empty())
                    .collect();

                files.push(File {
                    path,
                    relative_path,
                    sub_directories,
                    name: file_name.to_string(),
                    has_conflicts: false,
                })
            }
        }
    }

    files
}

pub fn get_files_with_conflicts(source: &str, target: &str) -> Vec<File> {
    let source_files = parse_files_from_directory(source);
    let target_files = parse_files_from_directory(target);

    let mut merged_set = vec![];

    for file1 in source_files {
        let file1_content = fs::read_to_string(&file1.path).expect("Failed to read file One");

        //If same file exist in set2 compair them
        if let Some(file2) = target_files
            .iter()
            .find(|f| f.relative_path == file1.relative_path)
        {
            // If content is same simply add the file
            let file2_content = fs::read_to_string(&file2.path).expect("Failed to read file Two");

            if file1_content == file2_content {
                println!("Content is equal->{}", file1.relative_path);
                // Files are identical, add any of them to the merged set
                merged_set.push(file1.clone());
            // If content is not equal merge them
            } else {
                println!("Content is NOT equal");

                merged_set.push(File {
                    relative_path: file1.relative_path.clone(),
                    sub_directories: file1.sub_directories.clone(),
                    path: file1.path.clone(),
                    name: file1.name.clone(),
                    has_conflicts: true,
                });
            }
        } else {
            println!(
                "File exists only in set1, add it to the merged set {}",
                file1.path
            );
            // File exists only in set1, add it to the merged set
            merged_set.push(file1.clone());
        }
    }

    // Add files from set2 that are not already in the merged set
    for file2 in target_files {
        if let Some(f2) = merged_set
            .iter()
            .find(|f| f.relative_path == file2.relative_path)
        {
            println!("file allready included --> {}", f2.relative_path)
        } else {
            println!("file only in set 2 --> {}", file2.relative_path);
            merged_set.push(file2.clone());
        }
    }

    merged_set
}

pub fn create_directory_tree(dirs: &String) {
    fs::create_dir_all(dirs).expect("Sub directory creation failed")
}

pub fn write_file(file: &File, content: String, output_directory: &str) {
    let file_name = file.name.clone();

    let mut file_path = format!("{}/{}", &output_directory, &file_name);

    if file.sub_directories.len() > 0 {
        let cloned_subs = file.sub_directories.clone();

        let sub_dir_str = &cloned_subs.join("/");

        let sub_dir_path = format!("{}/{}", output_directory, sub_dir_str);
        println!("sub directory path -{}", sub_dir_path);

        file_path = format!("{}/{}/{}", &output_directory, &sub_dir_str, &file_name);

        create_directory_tree(&sub_dir_path);
    }

    println!("result file path -{}", &file_path);

    fs::write(&file_path, &content).expect("Failed to write file");
}

pub fn create_files(files: &[File], res_directory: &str) {
    for file in files {
        print!("file to be created-->{}",file.path);
        
        let content = fs::read_to_string(&file.path).expect("Failed to read file Two");

        write_file(&file, content, res_directory);
    }
}

pub fn get_file_name(path: &str) -> &str {
    let path = Path::new(path);
    let file_name = path.file_name().unwrap().to_str().unwrap();
    file_name
}

pub fn get_file_content(file: File) -> String {
    match get_file_content_by_path(file.path) {
        Some(content) => content,
        None => String::from(""),
    }
}

pub fn get_file_content_by_path(path: String) -> Option<String> {
    let content = fs::read_to_string(path);
    return content.ok();
}

pub fn merge_file_content(sourceFile: File, targetFile: File, resultFolderPath: &str) -> bool {
    let mut is_conflict_resolved = false;

    let sourceFilePath: &str = &sourceFile.path;
    let targetFilePath: &str = &targetFile.path;

    let source_file_name = get_file_name((sourceFilePath));
    let target_file_name = get_file_name((targetFilePath));

    let temp_path_1 = format!(
        "C:/Users/Sumudu/projects/rust/merge-tools/cc-merge-2/data/_tmp/source/{}",
        source_file_name
    );

    let temp_path_2 = format!(
        "C:/Users/Sumudu/projects/rust/merge-tools/cc-merge-2/data/_tmp/target/{}",
        target_file_name
    );

    let res_path = "C:/Users/Sumudu/projects/rust/merge-tools/cc-merge-2/data/_tmp/merged.txt";

    let source_content = fs::read_to_string(&sourceFilePath).expect("Failed to read Source file");
    let target_content = fs::read_to_string(&targetFilePath).expect("Failed to read Target file");

    // Create temporary files for the merge tool to work with
    fs::write(&temp_path_1, &source_content).expect("create temp file 1 failed");
    fs::write(&temp_path_2, &target_content).expect("create temp file 2 failed");
    fs::write(&res_path, &source_content).expect("create temp file 2 failed");

    let output = Command::new("meld")
        .arg(&temp_path_1)
        .arg(&res_path)
        .arg(&temp_path_2)
        .stdout(Stdio::piped())
        .stderr(Stdio::null())
        .spawn()
        .expect("Failed to open merge tool")
        .wait_with_output()
        .expect("Failed to wait for merge tool");

    let mut merged_content = fs::read_to_string(res_path).unwrap();

    if output.status.success() {
        println!("Automatic merge successful.");
        if merged_content != source_content {
            let tmp_file = File {
                relative_path: targetFile.relative_path.clone(),
                sub_directories: targetFile.sub_directories.clone(),
                path: targetFile.path.clone(),
                name: targetFile.name.clone(),
                has_conflicts: false,
            };

            write_file(&tmp_file, merged_content, resultFolderPath);

            is_conflict_resolved = true
        }
    }

    // Clean up temporary files
    fs::remove_file(temp_path_1).expect("Failed to close temporary file");
    fs::remove_file(temp_path_2).expect("Failed to close temporary file");
    fs::remove_file(res_path).expect("Failed to close temporary file");

    println!("is Merged resolved -->{}", is_conflict_resolved);

    is_conflict_resolved
}
