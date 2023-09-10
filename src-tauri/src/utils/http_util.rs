use reqwest::{Client, Result};
use serde_json::{json, Value};

fn extract_translated_texts(json: &Value) -> Vec<String> {
    let mut translated_texts: Vec<String> = Vec::new();

    if let Some(translations) = json["data"]["translations"].as_array() {
        for translation in translations {
            if let Some(translated_text) = translation["translatedText"].as_str() {
                translated_texts.push(translated_text.to_string());
            }
        }
    }

    translated_texts
}

pub async fn getContent(url: &str, words: Vec<&str>, lang: &str) -> Result<Vec<String>> {
    let client = Client::new();

    let payload = json!({
        "q": words,
        "target": lang
    });
    let response = client
        .post(url)
        .header("Content-Type", "application/json")
        .body(payload.to_string())
        .send()
        .await?;

    let response_text = response.text().await?;

    let parsed: Value = serde_json::from_str(&response_text).expect("Failed to parse JSON");

    let translated_texts = extract_translated_texts(&parsed);

    Ok(translated_texts)
}
