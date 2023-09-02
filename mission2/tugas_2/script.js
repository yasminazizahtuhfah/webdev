//board
let board;
let boardWidth = 750;
let boardHeight = 300;
let obstacleInterval;
let context;

//nemo
let nemoWidth = 110;
let nemoHeight = 85;
let nemoX = 50;
let nemoY = boardHeight - nemoHeight;
let nemoImg;

let nemo = {
    x : nemoX,
    y : nemoY,
    width : nemoWidth,
    height : nemoHeight
}

//obstacle
let obstacleArray = [];

let obstacle1Width = 50;
let obstacle2Width = 50;
let obstacle3Width = 50;

let obstacleHeight = 50;
let obstacleX = 700;
let obstacleY = boardHeight - obstacleHeight;

let obstacle1Img;
let obstacle2Img;
let obstacle3Img;

//physics
let velocityX = -8; 
let velocityY = 0;
let gravity = .4;

let gameOver = false;
let score = 0;

window.onload = function() {
    board = document.getElementById("board");
    board.height = boardHeight;
    board.width = boardWidth;

    context = board.getContext("2d"); 

    nemoImg = new Image();
    nemoImg.src = "./img/nemo.png";
    nemoImg.onload = function() {
        context.drawImage(nemoImg, nemo.x, nemo.y, nemo.width, nemo.height);
    }

    obstacle1Img = new Image();
    obstacle1Img.src = "./img/obstacle1.png";

    obstacle2Img = new Image();
    obstacle2Img.src = "./img/obstacle2.png";

    obstacle3Img = new Image();
    obstacle3Img.src = "./img/obstacle3.png";

    document.getElementById("restartButton").addEventListener("click", restartGame);
    requestAnimationFrame(update);
    setInterval(placeobstacle, 1000);
    document.addEventListener("keydown", movenemo);
}

function update() {
    requestAnimationFrame(update);
    if (gameOver) {
        document.getElementById("restartButton").style.display = "block"; // Tampilkan tombol main ulang
       
        context.fillStyle = "black"; // Warna teks
        context.font = "40px Dekko"; // Gaya teks
        context.fillText("Game Over", boardWidth / 2 - 100, boardHeight / 2);
        return;
    }
    context.clearRect(0, 0, board.width, board.height);

    //nemo
    velocityY += gravity;
    nemo.y = Math.min(nemo.y + velocityY, nemoY); 
    context.drawImage(nemoImg, nemo.x, nemo.y, nemo.width, nemo.height);

    //obstacle
    for (let i = 0; i < obstacleArray.length; i++) {
        let obstacle = obstacleArray[i];
        obstacle.x += velocityX;
        context.drawImage(obstacle.img, obstacle.x, obstacle.y, obstacle.width, obstacle.height);

        if (detectCollision(nemo, obstacle)) {
            gameOver = true;
            nemoImg.onload = function() {
                context.drawImage(nemoImg, nemo.x, nemo.y, nemo.width, nemo.height);
            }
        } 
    }

    //score
    context.fillStyle="black";
    context.font="20px Al;an";
    score++;
    context.fillText(score, 5, 20);
}

function restartGame() {
    gameOver = false;
    score = 0;
    nemo.y = nemoY;
    obstacleArray = []; // Bersihkan semua rintangan
    velocityX = -8; // Atur kecepatan ulang
    clearInterval(obstacleInterval); // Hentikan interval placeobstacle

    obstacleInterval = setInterval(placeobstacle, 1000); // Mulai kembali interval placeobstacle

    document.getElementById("restartButton").style.display = "none"; // Sembunyikan tombol main ulang
    requestAnimationFrame(update); // Mulai permainan lagi
}

function movenemo(e) {
    if (gameOver) {
        return;
    }

    if ((e.code == "Space" || e.code == "ArrowUp") && nemo.y == nemoY) {
        //jump
        velocityY = -10;
    }
    else if (e.code == "ArrowDown" && nemo.y == nemoY) {
        //duck
    }

}

function placeobstacle() {
    if (gameOver) {
        return;
    }

    //place obstacle
    let obstacle = {
        img : null,
        x : obstacleX,
        y : obstacleY,
        width : null,
        height: obstacleHeight
    }

    let placeobstacleChance = Math.random(); //0 - 0.9999...

    if (placeobstacleChance > .90) { //10% you get obstacle3
        obstacle.img = obstacle3Img;
        obstacle.width = obstacle3Width;
        obstacleArray.push(obstacle);
    }
    else if (placeobstacleChance > .70) { //30% you get obstacle2
        obstacle.img = obstacle2Img;
        obstacle.width = obstacle2Width;
        obstacleArray.push(obstacle);
    }
    else if (placeobstacleChance > .50) { //50% you get obstacle1
        obstacle.img = obstacle1Img;
        obstacle.width = obstacle1Width;
        obstacleArray.push(obstacle);
    }

    if (obstacleArray.length > 5) {
        obstacleArray.shift(); //remove the first element from the array so that the array doesn't constantly grow
    }
}

function detectCollision(a, b) {
    return a.x < b.x + b.width &&   //a's top left corner doesn't reach b's top right corner
           a.x + a.width > b.x &&   //a's top right corner passes b's top left corner
           a.y < b.y + b.height &&  //a's top left corner doesn't reach b's bottom left corner
           a.y + a.height > b.y;    //a's bottom left corner passes b's top left corner
}

