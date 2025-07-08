const questions = [
  {
    question: "혼자 여행이 좋아요? 함께 여행이 좋아요?",
    answers: ["혼자", "함께"]
  },
  {
    question: "계획 여행 vs 즉흥 여행",
    answers: ["계획형", "즉흥형"]
  },
  {
    question: "혼자 여행이 좋아요? 함께 여행이 좋아요?",
    answers: ["혼자", "함께"]
  },
  {
    question: "계획 여행 vs 즉흥 여행",
    answers: ["계획형", "즉흥형"]
  },
  {
    question: "혼자 여행이 좋아요? 함께 여행이 좋아요?",
    answers: ["혼자", "함께"]
  },
  {
    question: "계획 여행 vs 즉흥 여행",
    answers: ["계획형", "즉흥형"]
  },
  {
    question: "혼자 여행이 좋아요? 함께 여행이 좋아요?",
    answers: ["혼자", "함께"]
  },
  {
    question: "계획 여행 vs 즉흥 여행",
    answers: ["계획형", "즉흥형"]
  },
  {
    question: "혼자 여행이 좋아요? 함께 여행이 좋아요?",
    answers: ["혼자", "함께"]
  },
  {
    question: "계획 여행 vs 즉흥 여행",
    answers: ["계획형", "즉흥형"]
  },
  {
    question: "혼자 여행이 좋아요? 함께 여행이 좋아요?",
    answers: ["혼자", "함께"]
  },
  {
    question: "계획 여행 vs 즉흥 여행",
    answers: ["계획형", "즉흥형"]
  }
  // ... 총 12개 구성
];

let current = 0;
const results = { introvert: 0, extrovert: 0 };

const questionBox = document.getElementById("question");
const answersBox = document.getElementById("answers");
const progressBar = document.getElementById("progressBar");
const guideText = document.getElementById("guideText");

function loadQuestion() {
  const q = questions[current];
  questionBox.textContent = q.question;
  answersBox.innerHTML = "";

  guideText.textContent = `${current + 1}/12 질문 중`; 
  progressBar.style.width = `${((current + 1) / questions.length) * 100}%`;

  q.answers.forEach((ans, i) => {
    const btn = document.createElement("button");
    btn.textContent = ans;
    btn.addEventListener("click", () => {
      if (i === 0) results.introvert++;
      else results.extrovert++;

      current++;
      if (current < questions.length) {
        loadQuestion();
      } else {
        localStorage.setItem("travelResult", JSON.stringify(results));
        window.location.href = "result.html";
      }
    });
    answersBox.appendChild(btn);
  });
}

loadQuestion();
