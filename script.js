const questions=[
    {
        question: "which is the largest ocean in the world?",
        answers: [
            {text:"Arabian Ocean",correct: false},
            {text:"pasific Ocean",correct: true},
            {text:"Bay of bengal",correct: false},
            {text:"Indian ocean",correct: false},


        ]
    },
    {
        question: "What is the largest desert in the world?",
        answers: [
            {text:"Kalahari",correct: false},
            {text:"Gobi",correct: false},
            {text:"Sahara",correct: false},
            {text:"Antarctica",correct: true},
        ]
    },
    {
        question: "What is the smallest continent in the world?",
        answers: [
            {text:"Asia",correct: false},
            {text:"Australia",correct: true},
            {text:"Arctic",correct: false},
            {text:"Africa",correct: false},
        ]
    },
    {
        question: "What is Java?",
        answers: [
            {text:"Programming language",correct: true},
            {text:"System language",correct: false},
            {text:"Method",correct: false},
            {text:"None of these",correct: false},
        ]
    },
];
const questionElement=document.getElementById("question");
const answerButtons=document.getElementById("answer-buttons");
const nextButton=document.getElementById("next-btn");

let currentQuestionIndex=0;
let score=0;

function startQuiz()
{
    currentQuestionIndex=0;
    score=0;
    nextButton.innerHTML="Next";
    showQuestion();

}
function showQuestion()
{
    resetState();
    let currentQuestion = questions[currentQuestionIndex]
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML= questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer=>{
        const button=document.createElement("button")
        button.innerHTML=answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button)
        if(answer.correct)
        {
            button.dataset.correct=answer.correct;
        }
        button.addEventListener("click",selectAnswer);

    });

}
function resetState()
{
    nextButton.style.display="none";
    while(answerButtons.firstChild)
    {
        answerButtons.removeChild(answerButtons.firstChild);
    }


}

function selectAnswer(e){
    const selectedBtn=e.target;
    const isCorrect=selectedBtn.dataset.correct==="true";
    if(isCorrect)
    {
        score++;
        selectedBtn.classList.add("correct");
    }
    else{
        selectedBtn.classList.add("incorrect");

    }

    Array.from(answerButtons.children).forEach(button =>{
        if(button.dataset.correct === "true")
        {
            button.classList.add("correct");
        }
        button.disabled=true;
    });
    nextButton.style.display= "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML= `you scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML="Play Again";
    nextButton.style.display="block";
}
function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex<questions.length){
        showQuestion();
    }
    else{
        showScore();
    }
}
nextButton.addEventListener("click",()=>{
    if(currentQuestionIndex<questions.length)
    {
        handleNextButton();
    }
    else{
        startQuiz();
    }
})
startQuiz();

