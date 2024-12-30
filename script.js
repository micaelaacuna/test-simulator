// document.addEventListener("DOMContentLoaded", () => {
//   const progressBar = document.getElementById("progress-bar");
//   const timerElement = document.getElementById("timer");
//   const formElement = document.getElementById("exam-form");
//   const submitButton = document.getElementById("submit-button");

//   const resultOverlay = document.getElementById("result-overlay");
//   const resultImage = document.getElementById("result-image");
//   const resultText = document.getElementById("result-text");

//   let timer = 0;
//   let interval;
//   let questions = [];

//   fetch("fiori.json")
//     .then((response) => response.json())
//     .then((data) => {
//       questions = data.sort(() => Math.random() - 0.5).slice(0, 80);
//       renderQuestions();
//       startTimer();
//     });

//   function renderQuestions() {
//     questions.forEach((q, index) => {
//       const questionDiv = document.createElement("div");
//       questionDiv.classList.add("question");

//       const correctAnswersCount = q.answers.filter((a) => a.correct).length;
//       const isMultipleChoice = correctAnswersCount > 1;

//       const questionText = isMultipleChoice
//         ? `${index + 1}. ${
//             q.question
//           } (Hint: there are ${correctAnswersCount} correct answers)`
//         : `${index + 1}. ${q.question}`;

//       const questionTitle = document.createElement("h3");
//       questionTitle.textContent = questionText;
//       questionDiv.appendChild(questionTitle);

//       const answerInputs = [];
//       q.answers.forEach((a, i) => {
//         const input = document.createElement("input");
//         input.type = isMultipleChoice ? "checkbox" : "radio";
//         input.name = `question-${index}`;
//         input.value = i;

//         const label = document.createElement("label");
//         label.textContent = a.text;

//         const answerDiv = document.createElement("div");
//         answerDiv.appendChild(input);
//         answerDiv.appendChild(label);

//         questionDiv.appendChild(answerDiv);
//         answerInputs.push(input);
//       });

//       if (isMultipleChoice) {
//         answerInputs.forEach((input) => {
//           input.addEventListener("change", () => {
//             const selectedCount = answerInputs.filter((i) => i.checked).length;
//             if (selectedCount > correctAnswersCount) {
//               input.checked = false;
//               alert(`You can select up to ${correctAnswersCount} options.`);
//             }
//           });
//         });
//       }

//       formElement.appendChild(questionDiv);
//     });
//   }

//   function startTimer() {
//     interval = setInterval(() => {
//       timer++;
//       const minutes = Math.floor(timer / 60);
//       const seconds = timer % 60;
//       timerElement.textContent = `Time: ${minutes}:${seconds
//         .toString()
//         .padStart(2, "0")}`;
//     }, 1000);
//   }

//   submitButton.addEventListener("click", (event) => {
//     event.preventDefault();
//     clearInterval(interval);

//     const answers = Array.from(formElement.elements);
//     let score = 0;

//     questions.forEach((q, index) => {
//       const selected = answers
//         .filter((input) => input.name === `question-${index}` && input.checked)
//         .map((input) => parseInt(input.value, 10));

//       const correctAnswers = q.answers
//         .map((a, i) => (a.correct ? i : null))
//         .filter((i) => i !== null);

//       const isCorrect =
//         JSON.stringify(selected.sort()) ===
//         JSON.stringify(correctAnswers.sort());
//       if (isCorrect) score++;

//       const questionDiv = formElement.children[index];
//       questionDiv.classList.add(isCorrect ? "correct" : "incorrect");
//     });

//     const percentage = Math.round((score / questions.length) * 100);
//     alert(`You scored ${percentage}%! ${percentage >= 66 ? "Pass" : "Fail"}`);

//     resultOverlay.style.display = "flex";

//     if (percentage >= 66) {
//       resultImage.src = "success.png";
//       resultText.textContent = "Congrats!";
//     } else {
//       resultImage.src = "fail.jpg";
//       resultText.textContent = "Press F5 to re-start";
//     }
//   });

//   formElement.addEventListener("change", () => {
//     const totalQuestions = questions.length;
//     const answeredQuestions = Array.from(formElement.elements)
//       .filter((input) => input.checked)
//       .map((input) => input.name)
//       .filter((value, index, self) => self.indexOf(value) === index).length;

//     progressBar.style.width = `${(answeredQuestions / totalQuestions) * 100}%`;
//   });
// });

document.addEventListener("DOMContentLoaded", () => {
  const progressBar = document.getElementById("progress-bar");
  const timerElement = document.getElementById("timer");
  const formElement = document.getElementById("exam-form");
  const submitButton = document.getElementById("submit-button");

  const resultOverlay = document.getElementById("result-overlay");
  const resultImage = document.getElementById("result-image");
  const resultText = document.getElementById("result-text");

  let timer = 0;
  let interval;
  let questions = [];

  fetch("fiori.json")
    .then((response) => response.json())
    .then((data) => {
      questions = data.sort(() => Math.random() - 0.5).slice(0, 80);

      // Check if any question has an image, if not, add one
      const hasImage = questions.some((q) => q.image);
      if (!hasImage) {
        // Find a random question without an image and add an image
        const questionWithoutImage = questions.find((q) => !q.image);
        if (questionWithoutImage) {
          questionWithoutImage.image = "default_image.jpg"; // Add a default image
        }
      }

      renderQuestions();
      startTimer();
    });

  function renderQuestions() {
    questions.forEach((q, index) => {
      const questionDiv = document.createElement("div");
      questionDiv.classList.add("question");

      const correctAnswersCount = q.answers.filter((a) => a.correct).length;
      const isMultipleChoice = correctAnswersCount > 1;

      const questionText = isMultipleChoice
        ? `${index + 1}. ${
            q.question
          } (Hint: there are ${correctAnswersCount} correct answers)`
        : `${index + 1}. ${q.question}`;

      const questionTitle = document.createElement("h3");
      questionTitle.textContent = questionText;
      questionDiv.appendChild(questionTitle);

      // If the question has an image, render it
      if (q.image) {
        const imageElement = document.createElement("img");
        imageElement.src = q.image;
        imageElement.alt = "Question image";
        questionDiv.appendChild(imageElement);
      }

      const answerInputs = [];
      q.answers.forEach((a, i) => {
        const input = document.createElement("input");
        input.type = isMultipleChoice ? "checkbox" : "radio";
        input.name = `question-${index}`;
        input.value = i;

        const label = document.createElement("label");
        label.textContent = a.text;

        const answerDiv = document.createElement("div");
        answerDiv.appendChild(input);
        answerDiv.appendChild(label);

        questionDiv.appendChild(answerDiv);
        answerInputs.push(input);
      });

      if (isMultipleChoice) {
        answerInputs.forEach((input) => {
          input.addEventListener("change", () => {
            const selectedCount = answerInputs.filter((i) => i.checked).length;
            if (selectedCount > correctAnswersCount) {
              input.checked = false;
              alert(`You can select up to ${correctAnswersCount} options.`);
            }
          });
        });
      }

      formElement.appendChild(questionDiv);
    });
  }

  function startTimer() {
    interval = setInterval(() => {
      timer++;
      const minutes = Math.floor(timer / 60);
      const seconds = timer % 60;
      timerElement.textContent = `Time: ${minutes}:${seconds
        .toString()
        .padStart(2, "0")}`;
    }, 1000);
  }

  submitButton.addEventListener("click", (event) => {
    event.preventDefault();
    clearInterval(interval);

    const answers = Array.from(formElement.elements);
    let score = 0;

    questions.forEach((q, index) => {
      const selected = answers
        .filter((input) => input.name === `question-${index}` && input.checked)
        .map((input) => parseInt(input.value, 10));

      const correctAnswers = q.answers
        .map((a, i) => (a.correct ? i : null))
        .filter((i) => i !== null);

      const isCorrect =
        JSON.stringify(selected.sort()) ===
        JSON.stringify(correctAnswers.sort());
      if (isCorrect) score++;

      const questionDiv = formElement.children[index];
      questionDiv.classList.add(isCorrect ? "correct" : "incorrect");
    });

    const percentage = Math.round((score / questions.length) * 100);
    alert(`You scored ${percentage}%! ${percentage >= 66 ? "Pass" : "Fail"}`);

    resultOverlay.style.display = "flex";

    if (percentage >= 66) {
      resultImage.src = "success.png";
      resultText.textContent = "Congrats!";
    } else {
      resultImage.src = "fail.jpg";
      resultText.textContent = "Press F5 to re-start";
    }
  });

  formElement.addEventListener("change", () => {
    const totalQuestions = questions.length;
    const answeredQuestions = Array.from(formElement.elements)
      .filter((input) => input.checked)
      .map((input) => input.name)
      .filter((value, index, self) => self.indexOf(value) === index).length;

    progressBar.style.width = `${(answeredQuestions / totalQuestions) * 100}%`;
  });
});
