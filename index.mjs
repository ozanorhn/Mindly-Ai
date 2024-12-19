import fetch from 'node-fetch';

const API_KEY = "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";
const MODEL_URL = "https://api-inference.huggingface.co/models/EleutherAI/gpt-neo-2.7B";

async function generateText(prompt) {
  try {
    const response = await fetch(MODEL_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        inputs: prompt,
        parameters: {
          max_length: 200,
          temperature: 0.7,
          top_p: 0.9,
          repetition_penalty: 1.2,
        },
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error("Fehler:", error);
      throw new Error(`API-Anfrage fehlgeschlagen: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Antwortdaten:", data);

    if (data && data.length > 0 && data[0].generated_text) {
      const rawText = data[0].generated_text;

      // Filtern der Antwort auf die relevanten Wochen
      const lines = rawText.split('\n');
      const filteredLines = lines.filter(
        line => line.trim().startsWith('- Woche 1') || 
                line.trim().startsWith('- Woche 2') || 
                line.trim().startsWith('- Woche 3')
      );
      const cleanedText = filteredLines.map(line => line.trim()).join('\n');
      return cleanedText;
    } else {
      return "Keine Antwort erhalten.";
    }
  } catch (error) {
    console.error("Fehler bei der API-Anfrage:", error);
    return "Fehler beim Generieren des Textes.";
  }
}

async function main() {
  const prompt = `
    Erstelle einen Lernplan, um Python in genau 3 Wochen zu lernen, mit 2 Stunden pro Tag.
    Die Antwort sollte nur die folgenden 3 Wochen umfassen:

    - Woche 1: Grundlagen (z. B. Einführung in Python, Installation, Variablen, Datentypen)
    - Woche 2: Fortgeschrittene Konzepte (z. B. Kontrollstrukturen, Schleifen, Funktionen)
    - Woche 3: Praxisprojekte (z. B. Erstellung eines Mini-Projekts)

    Bitte halte dich strikt an diese Struktur und füge keine weiteren Wochen hinzu.
  `;

  const result = await generateText(prompt);
  console.log("Generierter Text:", result);
}

main();
