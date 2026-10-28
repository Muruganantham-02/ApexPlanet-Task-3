
const questions = [
  {
    question: "Which language is used to style web pages?",
    answers: ["HTML", "CSS", "Python", "SQL"],
    correct: "CSS"
  },
  {
    question: "Which language makes web pages interactive?",
    answers: ["JavaScript", "Excel", "SQL", "HTML only"],
    correct: "JavaScript"
  },
  {
    question: "Which tag is used to create a paragraph in HTML?",
    answers: ["<h1>", "<p>", "<img>", "<table>"],
    correct: "<p>"
  }
];

let currentQuestion = 0;
let score = 0;
let answered = false;

const questionElement = document.getElementById("question");
const answersElement = document.getElementById("answers");
const resultElement = document.getElementById("quiz-result");
const nextButton = document.getElementById("next-btn");

function showQuestion() {
  answered = false;

  const item = questions[currentQuestion];
  questionElement.textContent =
    `Question ${currentQuestion + 1}: ${item.question}`;

  answersElement.replaceChildren();
  resultElement.textContent = "";
  nextButton.textContent =
    currentQuestion === questions.length - 1
      ? "Show Final Score"
      : "Next Question";

  item.answers.forEach(answer => {
    const button = document.createElement("button");
    button.textContent = answer;

    button.addEventListener("click", () => {
      if (answered) return;

      answered = true;

      if (answer === item.correct) {
        score++;
        resultElement.textContent = "Correct answer!";
      } else {
        resultElement.textContent =
          `Incorrect. Correct answer: ${item.correct}`;
      }

      Array.from(answersElement.children).forEach(b => {
        b.disabled = true;
      });
    });

    answersElement.appendChild(button);
  });
}

nextButton.addEventListener("click", () => {
  if (!answered) {
    resultElement.textContent = "Please select an answer first.";
    return;
  }

  if (currentQuestion < questions.length - 1) {
    currentQuestion++;
    showQuestion();
  } else {
    questionElement.textContent =
      `Quiz completed! Your score: ${score}/${questions.length}`;

    answersElement.replaceChildren();
    resultElement.textContent = "Well done!";
    nextButton.textContent = "Restart Quiz";

    nextButton.onclick = () => {
      currentQuestion = 0;
      score = 0;
      nextButton.onclick = null;
      showQuestion();
    };
  }
});

showQuestion();

// Fetch a random joke from a public API
const jokeElement = document.getElementById("joke");
const jokeButton = document.getElementById("joke-btn");

jokeButton.addEventListener("click", async () => {
  jokeButton.disabled = true;
  jokeElement.textContent = "Loading joke...";

  try {
    const response = await fetch(
      "https://official-joke-api.appspot.com/random_joke"
    );

    if (!response.ok) {
      throw new Error("Unable to fetch joke");
    }

    const data = await response.json();
    jokeElement.textContent = `${data.setup} — ${data.punchline}`;
  } catch (error) {
    jokeElement.textContent =
      "Could not load a joke. Please check your internet and try again.";
  } finally {
    jokeButton.disabled = false;
  }
});
