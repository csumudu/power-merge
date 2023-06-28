// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod commands;
mod models;
mod utils;

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            commands::greet,
            commands::get_folder_file_list,
            commands::get_selected_folder_path,
            commands::merge_folders,
            commands::resolve_file_conflict,
            commands::open_folder,
            commands::open_file_content
        ])
        .run(tauri::generate_context!())
        .expect("Error occurred while running Power Tools application");
}
