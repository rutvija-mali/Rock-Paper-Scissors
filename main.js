const rulesButton = document.querySelector(".rule-btn");
const closeButton = document.querySelector(".close-btn");
const modelElement = document.querySelector(".model");
const choices = document.querySelectorAll(".choose");
const gameBoard = document.querySelector(".game-board");
const resultSection = document.querySelector(".result-section");
const resultDivs = document.querySelectorAll(".result");
let winnerText = document.querySelector(".winner-result");
const showWinner = document.querySelector(".show-winner");
const computerScoreSpan = document.querySelector(".computer-score");
const userScoreSpan = document.querySelector(".user-score");

const playAgainBtn = document.querySelector(".play-again");

let computerScore = parseInt(localStorage.getItem("computerScore")) || 0;
let userScore = parseInt(localStorage.getItem("userScore")) || 0;

computerScoreSpan.textContent = computerScore;
userScoreSpan.textContent = userScore;


choices.forEach((choice) => {
    choice.addEventListener("click", (e) => {
        const userChoice = choice.dataset.choice;
        if (!userChoice) return; 
        getComputerChoice(userChoice);
    });
});


function updateLocalStorage() {
    localStorage.setItem("userScore", userScore);
    localStorage.setItem("computerScore", computerScore);

    computerScoreSpan.textContent = computerScore;
    userScoreSpan.textContent = userScore;
}


function getComputerChoice(userChoice) {
    const choiceIndex = Math.floor(Math.random() * 3);
    const computerChoice = ["rock", "scissors", "paper"][choiceIndex];

    displayResult([userChoice, computerChoice]);
    displayWinner([userChoice, computerChoice]);
}


function displayWinner(results) {
    const [userChoice, computerChoice] = results;
    const winner = decideWinner(userChoice, computerChoice);

    if (winner === "user") {
        winnerText.innerText = "YOU WIN";
        resultDivs[0].classList.add("winner");
        userScore++; 
    } else if (winner === "computer") {
        winnerText.innerText = "YOU LOSE";
        resultDivs[1].classList.add("winner");
        computerScore++; 
    } else {
        winnerText.innerText = "DRAW";
    }


    showWinner.classList.remove("hidden");
    resultSection.classList.add("show-winner");

    updateLocalStorage();
}


function displayResult(results) {
    resultDivs.forEach((resultDiv, index) => {
        const choice = results[index];
        resultDiv.innerHTML = `
            <div class="choose ${choice} ${choice}-border">
                <img src="./imges/${choice}.png" alt="${choice}-img">
            </div>
        `;
    });

    gameBoard.classList.add("hidden");
    resultSection.classList.remove("hidden");
}

function decideWinner(userChoice, computerChoice) {
    if (userChoice === computerChoice) {
        return "draw";
    } else if (
        (userChoice === "rock" && computerChoice === "scissors") ||
        (userChoice === "scissors" && computerChoice === "paper") ||
        (userChoice === "paper" && computerChoice === "rock")
    ) {
        return "user";
    } else {
        return "computer";
    }
}


rulesButton.addEventListener("click", () => {
    modelElement.classList.add("model-visible");
});

closeButton.addEventListener("click", () => {
    modelElement.classList.remove("model-visible");
});


playAgainBtn.addEventListener("click", () => {
    gameBoard.classList.remove("hidden");
    resultSection.classList.add("hidden");
    resultDivs.forEach((div) => div.classList.remove("winner"));
    showWinner.classList.add("hidden");
});
