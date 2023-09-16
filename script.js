document.getElementById("startGameButton").addEventListener("click", startGame);
document.getElementById("newQuestionButton").addEventListener("click", showQuestion);

let correctAnswer;

function startGame() {
    document.getElementById("startGameSection").classList.add("hidden");
    showQuestion();
}

function showQuestion() {
    document.getElementById("resultSection").classList.add("hidden");
    document.getElementById("questionSection").classList.remove("hidden");

    // Randomly pick the answer between 9 and 19
    correctAnswer = Math.floor(Math.random() * 11) + 9;

    // Randomly pick x and y based on the correctAnswer
    const x = Math.floor(Math.random() * (correctAnswer - 3)) + 1;
    const y = Math.floor(Math.random() * (correctAnswer - x - 2)) + 1;
    const z = correctAnswer - x - y;
    

    document.getElementById("question").textContent = `${x} + ${y} + ${z}`;

    const choices = generateChoices(correctAnswer);
    const choiceButtons = document.querySelectorAll(".choiceBtn");
    choiceButtons.forEach((btn, index) => {
        btn.textContent = choices[index];
        btn.addEventListener("click", checkAnswer);
    });
}


function generateChoices(correct) {
    const choices = new Set();

    while (choices.size < 3) {
        let randomChoice = Math.floor(Math.random() * 11) + 9;
        if (randomChoice !== correct) {
            choices.add(randomChoice);
        }
    }

    const choicesArray = Array.from(choices);
    const correctPos = Math.floor(Math.random() * 4);

    choicesArray.splice(correctPos, 0, correct);
    
    // Sort the choices
    return choicesArray.sort((a, b) => a - b);
}



function checkAnswer(event) {
    const playerChoice = parseInt(event.target.textContent);

    document.getElementById("questionSection").classList.add("hidden");
    document.getElementById("resultSection").classList.remove("hidden");

    const resultText = document.getElementById("resultText");
    const resultImage = document.getElementById("resultImage");

    if (playerChoice === correctAnswer) {
        resultText.textContent = "Correct";
        resultText.style.color = "green";
        resultImage.src = "correct.jpg";
    } else {
        resultText.textContent = "Incorrect";
        resultText.style.color = "red";
        resultImage.src = "wrong.jpg";
    }
}
