document.getElementById('startGameButton').addEventListener('click', startGame);

function startGame() {
    let timeLeft =15; 
    const timerDisplay = document.getElementById('timer');
    const messageDisplay = document.getElementById('message');
    
    timerDisplay.textContent = timeLeft;

    const countdown = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(countdown);
            messageDisplay.textContent = 'Time is up! Better luck next time!';
                   }
                   displayResult=retryButton ;
    }, 1000);
}
