use serde::{Deserialize, Serialize};
use ts_rs::TS;

#[derive(Serialize, TS, Deserialize, Debug, Eq, PartialEq, Hash, Clone)]
#[ts(export, export_to = "../src/app/models/")]
pub struct File {
    pub path: String,
    pub relative_path: String,
    pub sub_directories: Vec<String>,
    pub name: String,
    pub has_conflicts: bool,
}
