const questions = [
    {
        question: "Which is the largest animal in the world?",
        answers: [{text:"Shark",correct:false},
            {text:"Blue whale",correct:true},
            {text:"Elephant",correct:false},
            {text:"Giraffe",correct:false}]
    },
    {
        question: "What is the smallest country in the world by area?",
        answers: [{text:"Monaco",correct:false},
            {text:"Vatican City",correct:true},
            {text:"San Marino",correct:false},
            {text:"Liechtenstein",correct:false}]
    },
    {
        question: "Which is the largest desert in the world?",
        answers: [{text:"Kalahari",correct:false},
            {text:"Gobi",correct:false},
            {text:"Sahara",correct:false},
            {text:"Antarctica",correct:true}]
    },
    {
        question: "Which is the smallest continent in the world?",
        answers: [{text:"Asia",correct:false},
            {text:"Australia",correct:true},
            {text:"Antarctica",correct:false},
            {text:"Africa",correct:false}]
    },
];
const questionElement = document.querySelector("#question");
const answerButtons = document.querySelector("#answer-buttons");
const nextButton = document.querySelector("#next-btn");
const restartButton = document.querySelector("#restart-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}
function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click",selectAnswer);
    })
}
function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectBtn = e.target;
    const isCorrect = selectBtn.dataset.correct === "true";
    if(isCorrect){
        selectBtn.classList.add("correct");
        score++;
    }
    else{
        selectBtn.classList.add("incorrect");
    }
   Array.from(answerButtons.children).forEach((button) => {
       if(button.dataset.correct === "true"){
           button.classList.add("correct");
       }
       button.disabled = true;
       nextButton.style.display = "block";

   })
}

function showScore(){
    resetState();
    questionElement.innerHTML = `your score is ${score} of 4`
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }
    else{
        showScore();
        restartButton.style.display = "block";

    }
}

restartButton.addEventListener("click",()=>{
    startQuiz();
    restartButton.style.display = "none";
    console.log(restartButton);
})

nextButton.addEventListener("click",()=>{
if(currentQuestionIndex < questions.length){
    handleNextButton();
}
else{
    startQuiz();
}
})

startQuiz();