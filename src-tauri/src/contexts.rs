use std::path::Path;

#[tauri::command]
pub fn identify_context(folder_path: String) -> String {
    let path = Path::new(&folder_path);

    println!("{}", path.display());

    return "".to_string();
}

#[cfg(test)]
mod tests {
    #[test]
    fn test_identify_context() {
        assert_eq!(2, 1 + 1)
    }
}
