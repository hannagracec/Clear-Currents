document.addEventListener("DOMContentLoaded", function () {
    const gameContainer = document.getElementById("game-container");
    const catcher = document.createElement("div");
    catcher.id = "catcher";
    gameContainer.appendChild(catcher);

    const scoreCount = document.getElementById("scoreCount"); // Get the existing span element
    const timerDisplay = document.getElementById("timer");

    let score = 0;
    let timeLeft = 60; // Set the initial time to 60 seconds

    function createRaindrop() {
        const raindrop = document.createElement("div");
        raindrop.className = "raindrop";
        raindrop.style.left = `${Math.random() * (gameContainer.clientWidth - 20)}px`;
        gameContainer.appendChild(raindrop);

        const animation = raindrop.animate([
            { top: 0 },
            { top: `${gameContainer.clientHeight}px` }
        ], {
            duration: 2000,
            easing: "linear"
        });

        animation.onfinish = function () {
            gameContainer.removeChild(raindrop);
        };
    }

    function createBadRaindrop() {
        const badRaindrop = document.createElement("div");
        badRaindrop.className = "bad-raindrop";
        badRaindrop.style.left = `${Math.random() * (gameContainer.clientWidth - 20)}px`;
        gameContainer.appendChild(badRaindrop);

        const animation = badRaindrop.animate([
            { top: 0 },
            { top: `${gameContainer.clientHeight}px` }
        ], {
            duration: 2000,
            easing: "linear"
        });

        animation.onfinish = function () {
            gameContainer.removeChild(badRaindrop);
            decrementScore();
        };
    }

    function moveCatcher(event) {
        const catcherX = event.clientX - gameContainer.offsetLeft - catcher.clientWidth / 2;
        if (catcherX >= 0 && catcherX <= gameContainer.clientWidth - catcher.clientWidth) {
            catcher.style.left = `${catcherX}px`;
        }
    }

    function checkCollision() {
        const raindrops = document.getElementsByClassName("raindrop");

        for (let i = 0; i < raindrops.length; i++) {
            const raindrop = raindrops[i];
            const catcherRect = catcher.getBoundingClientRect();
            const raindropRect = raindrop.getBoundingClientRect();

            if (
                raindropRect.bottom >= catcherRect.top &&
                raindropRect.left >= catcherRect.left &&
                raindropRect.right <= catcherRect.right
            ) {
                gameContainer.removeChild(raindrop);
                incrementScore();
            }
        }
    }

    function checkBadRaindropCollision() {
        const badRaindrops = document.getElementsByClassName("bad-raindrop");
        let collisionDetected = false;  // Flag to track if a collision occurred

        for (let i = 0; i < badRaindrops.length; i++) {
            const badRaindrop = badRaindrops[i];
            const catcherRect = catcher.getBoundingClientRect();
            const badRaindropRect = badRaindrop.getBoundingClientRect();

            if (
                badRaindropRect.bottom >= catcherRect.top &&
                badRaindropRect.left >= catcherRect.left &&
                badRaindropRect.right <= catcherRect.right
            ) {
                gameContainer.removeChild(badRaindrop);
                collisionDetected = true;  // Set the flag to true
        }
    }

    if (collisionDetected) {
        decrementScore();  // Decrement score outside the loop if a collision occurred
    } 
}   

    function incrementScore() {
        score++;
        scoreCount.textContent = score; // Update the existing span element
    }

    function decrementScore() {
        if (score > 0) {
            score--;
            scoreCount.textContent = score; // Update the existing span element
        }
    }

    function updateTimer() {
        timerDisplay.textContent = `Time: ${timeLeft}s`;

        if (timeLeft === 0) {
            endGame();
        } else {
            timeLeft--;
        }
    }

    function endGame() {
        clearInterval(gameInterval);
        alert(`Game Over! Your score is ${score}`);

        score = 0;
        timeLeft = 60;
        scoreCount.textContent = score;
        gameInterval = setInterval(updateTimer, 1000);

    }

    let gameInterval = setInterval(updateTimer, 1000);
    setInterval(createRaindrop, 1000);
    setInterval(createBadRaindrop, 2000);
    document.addEventListener("mousemove", moveCatcher);
    setInterval(checkCollision, 50);
    setInterval(checkBadRaindropCollision, 50);
});