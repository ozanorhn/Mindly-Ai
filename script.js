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
            if (this.status == 200) { elmnt.innerHTML = this.responseText; }
            if (this.status == 404) { elmnt.innerHTML = "Page not found."; }
            elmnt.removeAttribute("w3-include-html");
            includeHTML();
          }
        }
        xhttp.open("GET", file, true);
        xhttp.send();
        return;
      }
    }
  }
  includeHTML();
  

  function showSection(sectionId) {
    document.querySelectorAll('.hidden').forEach(section => section.style.display = 'none');
    document.getElementById(sectionId).style.display = 'block';
}

function generateQuiz() {
    const input = document.getElementById('quizInput').value;
    const output = document.getElementById('quizOutput');
    output.textContent = `Das Quiz zu '${input}' wird erstellt...`;
}

function generateVocabulary() {
    const input = document.getElementById('vocabularyInput').value;
    const output = document.getElementById('vocabularyOutput');
    output.textContent = `Vokabeltrainer mit den eingegebenen Vokabeln: ${input}`;
}

function generateLearningPlan() {
    const input = document.getElementById('learningPlanInput').value;
    const output = document.getElementById('learningPlanOutput');
    output.textContent = `Lernplan wird erstellt für: ${input}`;
}