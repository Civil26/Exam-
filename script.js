let questions = [
    { id: 1, text: "What is 2+2?", options: ["3", "4", "5"], answer: 1, type: "single" },
    { id: 2, text: "What is 3+5?", options: ["7", "8", "9"], answer: 1, type: "single" }
];

let currentQuestionIndex = 0;
let userAnswers = {};

function startExam() {
    document.getElementById('loginPage').style.display = 'none';
    document.getElementById('instructionsPage').style.display = 'block';
}

function showExamPage() {
    document.getElementById('instructionsPage').style.display = 'none';
    document.getElementById('examPage').style.display = 'block';
    showQuestion();
    startTimer(30);
    startWebcam();
}

function showQuestion() {
    let q = questions[currentQuestionIndex];
    document.getElementById('questionBox').innerHTML = `
        <h3>${q.text}</h3>
        ${q.options.map((opt, i) => `<button class="option-btn" onclick="selectAnswer(${i})">${opt}</button>`).join('')}
    `;
}

function selectAnswer(optionIndex) {
    userAnswers[currentQuestionIndex] = optionIndex;
    document.querySelectorAll(".option-btn")[optionIndex].style.backgroundColor = "lightgreen";
}

function prevQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        showQuestion();
    }
}

function nextQuestion() {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        showQuestion();
    }
}

function submitExam() {
    document.getElementById('examPage').style.display = 'none';
    document.getElementById('resultPage').style.display = 'block';
    let score = 0;
    questions.forEach((q, i) => {
        if (userAnswers[i] === q.answer) score++;
    });
    document.getElementById('resultDetails').innerText = `You scored ${score} out of ${questions.length}`;
}

function startTimer(minutes) {
    let time = minutes * 60;
    setInterval(() => {
        let min = Math.floor(time / 60);
        let sec = time % 60;
        document.getElementById("timer").innerText = `Time Left: ${min}:${sec < 10 ? '0' : ''}${sec}`;
        time--;
    }, 1000);
}

function startWebcam() {
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
            document.getElementById("webcam").srcObject = stream;
        })
        .catch(err => console.error("Webcam access denied!", err));
}
