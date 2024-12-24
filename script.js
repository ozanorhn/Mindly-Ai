// Dynamisches Laden von HTML-Templates
function includeHTML() {
  var z, i, elmnt, file, xhttp;
  z = document.getElementsByTagName("*");
  for (i = 0; i < z.length; i++) {
      elmnt = z[i];
      file = elmnt.getAttribute("w3-include-html");
      if (file) {
          xhttp = new XMLHttpRequest();
          xhttp.onreadystatechange = function () {
              if (this.readyState == 4) {
                  if (this.status == 200) elmnt.innerHTML = this.responseText;
                  if (this.status == 404) elmnt.innerHTML = "Page not found.";
                  elmnt.removeAttribute("w3-include-html");
                  includeHTML();
              }
          };
          xhttp.open("GET", file, true);
          xhttp.send();
          return;
      }
  }
}

// Sektionen anzeigen/verstecken
function showSection(sectionId) {
  document.querySelectorAll('.hidden').forEach(section => section.style.display = 'none');
  document.getElementById(sectionId).style.display = 'block';
}


async function generateQuiz() {
  const input = document.getElementById('quizInput').value;
  const output = document.getElementById('quizOutput');
  showLoading(true);

  try {
      const response = await fetch('https://api.openai.com/v1/completions', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer`
          },
          body: JSON.stringify({
              model: "text-davinci-003",
              prompt: input,
              max_tokens: 150
          })
      });

      if (!response.ok) {
          throw new Error(`Fehler: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      output.innerHTML = data.choices[0].text || 'Keine Daten erhalten.';
  } catch (error) {
      output.textContent = 'Fehler beim Erstellen des Quiz.';
      console.error(error);
  } finally {
      showLoading(false);
  }
}


// Vokabeltrainer erstellen
function generateVocabulary() {
  const input = document.getElementById('vocabularyInput').value;
  const output = document.getElementById('vocabularyOutput');
  output.textContent = `Vokabeltrainer mit den eingegebenen Vokabeln: ${input}`;
}

// Lernplan erstellen
function generateLearningPlan() {
  const input = document.getElementById('learningPlanInput').value;
  const output = document.getElementById('learningPlanOutput');
  output.textContent = `Lernplan wird erstellt für: ${input}`;
}

// OCR ausführen
function runOCR(fileInput) {
  const output = document.getElementById('ocrOutput');
  const file = fileInput.files[0];

  if (file) {
      const reader = new FileReader();
      reader.onload = function () {
          Tesseract.recognize(reader.result, 'eng')
              .then(({ data: { text } }) => {
                  output.textContent = `Erkannter Text: ${text}`;
              })
              .catch(err => {
                  output.textContent = `Fehler: ${err.message}`;
              });
      };
      reader.readAsDataURL(file);
  } else {
      output.textContent = 'Bitte wähle eine Datei aus.';
  }
}

// Spinner anzeigen/verstecken
function showLoading(show) {
  document.getElementById('loading').style.display = show ? 'block' : 'none';
}
