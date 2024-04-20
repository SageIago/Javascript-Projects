const QUESTIONS = [
    {
        question : "What is the best description of Nick Nick?",
        option: [
            {text: "Stupid, always blames himself", correct: false},
            {text: "He is the most strongest Late Veteran", correct: true},
            {text: "A cruel person, but inside he is just a friend", correct: false},
            {text: "Nick Nick doesn't know his own name", correct: false}
        ]
    },
     {
        question : "What's the main aim of the story?",
        option : [
            {text: "The protagonist wants to go against the heavens", correct: false},
            {text: "To save humanity from the oppression of the Specters." ,correct : true},
            {text: "The protagonist wants to rebel against the Specter's authority.", correct: false},
            {text: "Survival in a world that is apocalyptic.", correct: false}
        ]
     }, 
     {
        question : "Which universe is KTS set in?",
        option : [
            {text: "Earth, 7120(5000 years after the apoclaypse).", correct: false},
            {text: "Mars, 10 billion years from now." ,correct : true},
            {text: "Earth, 2300 ( Like a few years after the apoclaypse)", correct: false},
            {text: "Mars, 100 billion years from now.", correct: false}
        ]
     }
]

const QuestionElement = document.querySelector(".question")
const AnswerBtn = document.getElementById("Answer-btn")
const NextBtn = document.getElementById("Next-Btn")

// I need to initalise some variables
let currentQuestionCount 
let score

// To start Kill the Sun Quiz i need a function that would help me start the Quiz
function startQuiz() {
    score = 0
    currentQuestionCount = 0
    showTheQuestions()
}


function showTheQuestions() {
    resetState()
    let currentQuestion = QUESTIONS[currentQuestionCount]
    let questionno = currentQuestionCount + 1
    QuestionElement.innerHTML = questionno + ". " + currentQuestion.question
    
    currentQuestion.option.forEach(answer=> {
        const btn = document.createElement('button')
        btn.innerHTML = answer.text
        btn.classList.add("btn")
        AnswerBtn.appendChild(btn)
        if(answer.correct) {
            btn.dataset.correct = answer.correct
        }

        btn.addEventListener("click", function(e){
            const selectedBtn = e.target
            const isCorrect = selectedBtn.dataset.correct === "true"
            if(isCorrect) {
                selectedBtn.classList.add("correct")
                score++
            } else {
                selectedBtn.classList.add("incorrect")
            }
            Array.from(AnswerBtn.children).forEach(button=> {
                if(button.dataset.correct === "true") {
                    button.classList.add("true")
                }
        
                button.disabled = true
            })
            NextBtn.style.display = "block"
        })
        
    })

}

NextBtn.addEventListener("click", function(){
    if(currentQuestionCount < QUESTIONS.length) {
        callNextBtn()
    } else {
        startQuiz()
    }
})

function callNextBtn() {
    currentQuestionCount++
    if(currentQuestionCount < QUESTIONS.length) {
        showTheQuestions()
    }else {
        showScore()
    }
}

function showScore() {
    resetState()
    QuestionElement.innerHTML = `You have scored ${score} out of ${QUESTIONS.length}`
    NextBtn.style.display = "block"
    NextBtn.innerHTML = "Restart Quiz"
}

function resetState() {
    NextBtn.style.display = "none"
    while(AnswerBtn.firstChild)  {
        AnswerBtn.removeChild(AnswerBtn.firstChild)
    }
}

startQuiz()

