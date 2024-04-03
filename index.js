let inputDir = { x: 0, y: 0 };
const gameMusicSound = new Audio('Snake Music.mp3');
const snakeMoveSound = new Audio('movesound.mp3');
const eatSound = new Audio('eat_crunchy-40919.mp3');
const gameOverSound = new Audio('gameoOver.mp3');

let lastPintTime = 0;
let speed = 9;
let score = 0;
let snakeArr = [
    { x: 13, y: 15 }
];
food = { x: 6, y: 7 };

//game functions
function main(ctime) {
    window.requestAnimationFrame(main);
    // console.log(curTime)
    if ((ctime - lastPintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPintTime = ctime;
    gamEngine();
}
function displayImage(src, width, height) {
    var img = document.createElement("img");
    img.src = src;
    img.width = width;
    img.height = height;
    document.body.appendChild(img);
}
function isCollide(snake) {
    // If you bump into your self
    for (let i = 1; i < snakeArr.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true; 
        }
    }
    // If you bump into the wall
    if(snake[0].x >= 18 || snake[0].x <=0 || snake[0].y >= 18 || snake[0].y <=0){
        return true;
    }
        
    return false;
}
function gameOver() {
    // Display the "Game Over" div
    document.getElementById("game-over").style.display = "block";
  }
function gamEngine() {
    //st1 Updating the snake array\
    if (isCollide(snakeArr)) {
        gameOverSound.play();
        gameMusicSound.pause();
        gameOver();
   // Restart button logic
     document.getElementById("restart-button").addEventListener("click", function() {
    // Reload the game
      location.reload();
     
  });
        inputDir = { x: 0, y: 0 };
        gameOver();
   // Restart button logic
     document.getElementById("restart-button").addEventListener("click", function() {
    // Reload the game
      location.reload();
     
  });
        snakeArr = [{ x: 13, y: 15 }];
        score = 0;

    }
    // if snake eats the food increase the score and re-display the food
    if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
        eatSound.play();
        score += 1;
        if(score>hiscoreval){
            hiscoreval = score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
            hiscoreBox.innerHTML = "HiScore: " + hiscoreval;
        }
        scoreBox.innerHTML = "Score: " + score;
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y});
        let a = 2;
        let b = 16;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) }
    }

       // Moving the snake
    for (let i = snakeArr.length - 2; i>=0; i--) { 
        snakeArr[i+1] = {...snakeArr[i]};
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;



    //st2 Render the snake and food
    //display the snake
    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;

        if (index === 0) {
            snakeElement.classList.add('head');
        }
        else {
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });
    // Display the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food')
    board.appendChild(foodElement);


}

//game logic strat here
gameMusicSound.play();
let hiscore = localStorage.getItem("hiscore");
if(hiscore === null){
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
}
else{
    hiscoreval = JSON.parse(hiscore);
    hiscoreBox.innerHTML = "HiScore: " + hiscore;
}


window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    inputDir = { x: 0, y: 1 } // Start the game
    snakeMoveSound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        default:
            break;
    }

});