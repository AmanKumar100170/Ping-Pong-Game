document.addEventListener('DOMContentLoaded', () => {
    const startBtn = document.querySelector('button');
    const leftPaddle = document.querySelector('.paddle-left');
    const rightPaddle = document.querySelector('.paddle-right');
    const ball = document.querySelector('.ball');
    const infoContainer = document.querySelector('.info-container');

    let gameStarted = false;
    let leftScore = 0, rightScore = 0;
    let ballSpeedX = 8, ballSpeedY = 8;
    let ballDirectionX = 1, ballDirectionY = 1;
    let gameInterval;
    const winningScore = 5;

    function updatePaddlePosition(e) {
        const key = e.key.toLowerCase();

        if (key === 'w' && leftPaddle.offsetTop > 0) {
            leftPaddle.style.top = leftPaddle.offsetTop - 20 + 'px';
        }
        if (key === 's' && leftPaddle.offsetTop < 440) {
            leftPaddle.style.top = leftPaddle.offsetTop + 20 + 'px';
        }

        if (key === 'arrowup' && rightPaddle.offsetTop > 0) {
            rightPaddle.style.top = rightPaddle.offsetTop - 20 + 'px';
        }
        if (key === 'arrowdown' && rightPaddle.offsetTop < 440) {
            rightPaddle.style.top = rightPaddle.offsetTop + 20 + 'px';
        }
    }

    function moveBall() {
        const ballTop = ball.offsetTop;
        const ballLeft = ball.offsetLeft;

        if (ballTop <= 0 || ballTop >= 520) {
            ballDirectionY *= -1;
        }

        if (
            ballLeft <= 25 &&
            ballTop >= leftPaddle.offsetTop &&
            ballTop <= leftPaddle.offsetTop + 110
        ) {
            ballDirectionX *= -1;
        }

        if (
            ballLeft >= 1245 &&
            ballTop >= rightPaddle.offsetTop &&
            ballTop <= rightPaddle.offsetTop + 110
        ) {
            ballDirectionX *= -1;
        }

        if (ballLeft <= 0) {
            rightScore++;
            resetBall();
            checkWin();
        }

        if (ballLeft >= 1270) {
            leftScore++;
            resetBall();
            checkWin();
        }

        ball.style.top = ballTop + ballSpeedY * ballDirectionY + 'px';
        ball.style.left = ballLeft + ballSpeedX * ballDirectionX + 'px';

        updateScores();
    }

    function resetBall() {
        ball.style.top = '245px';
        ball.style.left = '635px';
        ballDirectionX *= -1;
    }

    function updateScores() {
        const scores = document.querySelectorAll('.score');
        scores[0].textContent = leftScore;
        scores[2].textContent = rightScore;
    }

    function checkWin() {
        if (leftScore === winningScore || rightScore === winningScore) {
            alert(`${leftScore === winningScore ? 'Left' : 'Right'} Player Wins!`);
            resetGame();
        }
    }

    function resetGame() {
        clearInterval(gameInterval);
        gameStarted = false;

        leftScore = 0;
        rightScore = 0;

        const scores = document.querySelectorAll('.score');
        scores[0].remove();
        scores[1].remove();
        scores[2].remove();

        startBtn.style.display = 'block';
    }

    function runGame() {
        if (!gameStarted) {
            resetBall();
            gameStarted = true;
            startBtn.style.display = 'none';

            const lScore = document.createElement('div');
            lScore.classList.add('score');
            lScore.textContent = `${leftScore}`;
            const colon = document.createElement('div');
            colon.classList.add('score');
            colon.textContent = ':';
            const rScore = document.createElement('div');
            rScore.classList.add('score');
            rScore.textContent = `${rightScore}`;

            infoContainer.appendChild(lScore);
            infoContainer.appendChild(colon);
            infoContainer.appendChild(rScore);
            infoContainer.style.justifyContent = 'space-evenly';
            infoContainer.style.alignItems = 'flex-end';

            gameInterval = setInterval(moveBall, 25);
            document.addEventListener('keydown', updatePaddlePosition);
        }
    }

    function initiateGame() {
        startBtn.style.display = 'block';  
        startBtn.addEventListener('click', runGame);
    }

    initiateGame();
});
