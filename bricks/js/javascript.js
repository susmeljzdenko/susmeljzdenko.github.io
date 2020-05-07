var canvas = document.getElementById("playCanvas");
var ctx = canvas.getContext("2d");

var xy = "";
localStorage.setItem(xy, "| ");

//var init
var easyHighscore = document.querySelector("#easyHs");
var mediumHighscore = document.querySelector("#mediumHs");
var hardHighscore = document.querySelector("#hardHs");

var trymaxe = document.querySelector("#trye");
var trymaxm = document.querySelector("#trym");
var trymaxh = document.querySelector("#tryh");
var pauseButton = document.querySelector("#pauseButton");
var muteMsuic = document.querySelector("#muteMusic");

document.getElementById("pauseButton").onclick = pauseGame;
document.getElementById("endButton").onclick = stopGame;

var currentscore = document.querySelector("#orangesCount");
var currentDiff = document.querySelector("#level");
var currentlives = document.querySelector("#lives");
var currenthelp = document.querySelector("#help");
var timer = document.querySelector("#timer");

//img setup
var img = new Image();   // Create new img element
img.src = 'img/orangeBasket.png';
var orange = new Image();
orange.src = 'img/oranges.png';
var orangeSpecial = new Image();
orangeSpecial.src = 'img/orangesSpecial.png';

//music setup
var mutePointer=1;
var music = new Audio('music/music.mp3');
music.volume = 0.5;
function playMusic() {
  music.play();
}
function muteMusic(){
  if(mutePointer==1){
    music.volume=0.0;
    document.querySelector('#muteMusic').innerHTML = 'Unmute music &#128263;';
    mutePointer=0;
  }
  else{
    music.volume = 0.5;
    document.querySelector('#muteMusic').innerHTML = 'Mute music &#9835;';
    mutePointer=1;
  }

}
var soundFX = new Audio('music/soundFX.mp3');

//ball setup
var ballRadius = 8;
var x = canvas.width / 2;
var y = canvas.height - 30;

var dx  = 4;
var dy = Math.floor((Math.random()*(-4))-2);

//paddle setup
var paddleHeight = 30;
var paddleWidth = 110;
var paddleX = (canvas.width - paddleWidth) / 2;

//key events
var rightPressed = false;
var leftPressed = false;
var shiftPressed = false;
var paused = false;
var lockPress = true;
var pauselockPress = true;
var unlockPause = false;

var difficultyName="";

//brick setup
var brickCol = 8;
var brickRow = 4;
var brickWidth = 44;
var brickHeight = 35;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;

//game setup
var score = 0;
var lives = 3;
var time = -1;
var difficulty = -1;
var running = false;
var timerStart = false;
var bricks = [];
highscoreSet();
levelSetup();

function extraLives(){
  lives=9999;
  livesUpdate();
}

function levelSetup() {
  for (var col = 0; col < brickRow; col++) {
    bricks[col] = [];
    for (var row = 0; row < brickCol; row++) {
      if (Math.random() > 0.9)
        bricks[col][row] = {
          x: 0,
          y: 0,
          status: 1,
          special: 1,
        };
      else
        bricks[col][row] = {
          x: 0,
          y: 0,
          status: 1,
          special: 0,
        };
    }
  }
  rightPressed = false;
  leftPressed = false;
  score = 0;
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);

start();

function start() {
  drawBricks();
  drawBall();
  drawPaddle();
  

  swal(
    {
      title: "Welcome to Orange frenzy!",
      text: "Use arrowkeys ← → or control the paddle with your mouse. Glowing oranges give more points.\n\nTo pause the game press the key 'P'.\n\nHighscores are displayed under 'Statistics'.",
      imageUrl:'img/favicon.png',
      animation: "slide-from-bottom",
      inputPlaceholder: "Enter your username here",      
      closeOnConfirm: true,
      showConfirmButton: true,
    },
  );
}

function livesUpdate(lives){
  switch(lives){
    case 0:
      currentlives.innerHTML = 'No more 🧡 remaining.';
    case 1:
      currentlives.innerHTML = '🧡 ' + lives;
    break;
    case 2:
      currentlives.innerHTML = '🧡🧡 ' + lives;
    break;
    case 3:
      currentlives.innerHTML = '🧡🧡🧡 ' + lives;
    break;
    default:
      currentlives.innerHTML = '🧡🧡🧡🧡🧡	&#8734;';
    break;
  }
}

function startGame() {
  playMusic();
  running = true;
  document.getElementById("difficultySet").style.display = "none";
  if (!timerStart) timerTick();
  timerStart = true;
  draw();
  diff();

  var x = localStorage.getItem(xy);
  var res = x.split("|");

  if (document.getElementById("easyRadio").checked) {
    difficulty = 0;
    lives = 1;
    currentlives.innerHTML = '🧡 ' + lives;
  }

  if (document.getElementById("mediumRadio").checked) {
    difficulty = 1;
    lives = 2;
    currentlives.innerHTML = '🧡🧡 ' + lives;
    dy+=1;
    dx-=2;
  }

  if (document.getElementById("hardRadio").checked) {
    difficulty = 2;
    lives = 3;
    currentlives.innerHTML = '🧡🧡🧡 ' + lives;
    dy+=2;
    dx-=1;
  }

  x = res.join("|")
  localStorage.setItem(xy, x);
  console.log("Easy HS: "+res[0]+" Medium HS:  "+res[1]+" Hard HS:  "+res[2]);

  
  switch(difficulty){
    case 0:
        difficultyName="Easy";
        break;
      case 1:
        difficultyName="Medium";
      break;
      case 2:
        difficultyName="Hard";
      break;
      default:
        difficultyName="Unknown";
        break;
  }

  currentDiff.innerHTML = ' ' + difficultyName;
  currentscore.innerHTML = '🍊 ' +  score;
  document.getElementById("statPanel").style.display = "inherit";
}

function stopGame() {
  running = true;
  difficulty = -1;
  levelSetup();
  x = canvas.width / 2;
  y = canvas.height - 40;
  dx = 4
  dy = Math.floor((Math.random()*(-4))-2);

  paddleX = (canvas.width - paddleWidth) / 2;
  draw();
  time = 0;
  running = false;
  document.getElementById("difficultySet").style.display = "inherit";
  document.getElementById("statPanel").style.display = "none";
  pauseButton.innerHTML = "Pause";
}

function pauseGame() {
  if (running) {
    running = false;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBricks();
    drawBall();
    drawPaddle();
    
    pauseButton.innerHTML = "Continue";
  } else {
    running = true;
    draw();

    if (document.getElementById("mediumRadio").checked) {
      runGame(1);
    }

    if (document.getElementById("hardRadio").checked) {
      runGame(3);
    }

    pauseButton.innerHTML = "Pause";
  }
}

function pausePress() {
  if (paused && !running && unlockPause) {
    pauseGame();
  }
  highscoreSet();
}


function checkEmpty(){
        if((bricks[0][0].status == 0 && bricks[0][1].status == 0 && bricks[0][2].status == 0 && bricks[0][3].status == 0 && bricks[0][4].status == 0 && bricks[0][5].status == 0 && bricks[0][6].status == 0 && bricks[0][7].status == 0)
        && (bricks[1][0].status == 0 && bricks[1][1].status == 0 && bricks[1][2].status == 0 && bricks[1][3].status == 0 && bricks[1][4].status == 0 && bricks[1][5].status == 0 && bricks[1][6].status == 0 && bricks[1][7].status == 0)
        && (bricks[2][0].status == 0 && bricks[2][1].status == 0 && bricks[2][2].status == 0 && bricks[2][3].status == 0 && bricks[2][4].status == 0 && bricks[2][5].status == 0 && bricks[2][6].status == 0 && bricks[2][7].status == 0)
        && (bricks[3][0].status == 0 && bricks[3][1].status == 0 && bricks[3][2].status == 0 && bricks[3][3].status == 0 && bricks[3][4].status == 0 && bricks[3][5].status == 0 && bricks[3][6].status == 0 && bricks[3][7].status == 0)){
          stopGame();
          end();   
        }
      }

function collisionDetection() {
  for (var col = 0; col < brickRow; col++) {
    for (var row = 0; row < brickCol; row++) {
      var b = bricks[col][row];
      checkEmpty();
      if (b.status == 1) {
        if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
          
            soundFX.playbackRate = 3.0;
            soundFX.play();
            dy = -dy;
            b.status = 0;
          if (b.special == 1)
            score += 10;

            score++;

            currentscore.innerHTML = '🍊 ' + score;

            var arr = localStorage.getItem(xy);
            var res = arr.split("|");

            //difficulty HS set
          if (difficulty == 0) {
            if (res[0] < score) {
              res[0] = score;
            }
          }

          else if (difficulty == 1) {
            if (res[1] < score) {
              res[1] = score;
            }
          }

          else if (difficulty == 2) {
            if (res[2] < score) {
              res[2] = score;
            }
          }
          
          arr = res.join("|");
          localStorage.setItem(xy, arr);

          easyHighscore.innerHTML = ' Easy: ' + res[0];
          mediumHighscore.innerHTML = ' Medium: ' + res[1];
          hardHighscore.innerHTML = ' Hard: ' + res[2];

        }
      } 
    }
  }
}

function keyDownHandler(e) {
  if (e.key == "Right" || e.key == "ArrowRight") {
    rightPressed = true;

  } else if (e.key == "Left" || e.key == "ArrowLeft") {
    leftPressed = true;
  } else if (e.key == "Shift") {
    shiftPressed = true;
  } else if (e.key == "p") {
    paused = true;
  }
}

function keyUpHandler(e) {
  if (e.key == "Right" || e.key == "ArrowRight") {
    rightPressed = false;
  } else if (e.key == "Left" || e.key == "ArrowLeft") {
    leftPressed = false;
  } else if (e.key == "Shift") {
    shiftPressed = false;
  } else if (e.key == "p" || e.key == "P") {
    paused = false;
    unlockPause = true;
  }
}

function mouseMoveHandler(e) {
  var p = document.getElementById("playWind");
  var marLeft = parseInt(getStyle(p, "margin-left"));
  var relativeX = e.clientX - canvas.offsetLeft - marLeft+20;

  if (relativeX > 0 && relativeX < canvas.width) {
    paddleX = relativeX - paddleWidth / 2;
  }
}

function drawBall(){
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = "orange";
  ctx.lineWidth= 2;
  ctx.strokeStyle = "black";
  ctx.stroke();
  ctx.fill();
  ctx.closePath();
}

function drawPaddle(){
  ctx.beginPath();
  ctx.drawImage(img, paddleX, canvas.height - paddleHeight);
  ctx.closePath();
}

function drawBricks(){
  for (var col = 0; col < brickRow; col++) {
    for (var row = 0; row < brickCol; row++) {
      if (bricks[col][row].status == 1) {
        var brickX = row * (brickWidth + brickPadding) + brickOffsetLeft;
        var brickY = col * (brickHeight + brickPadding) + brickOffsetTop;
        bricks[col][row].x = brickX;
        bricks[col][row].y = brickY;

        if (bricks[col][row].special == 1) {
          ctx.beginPath();
          ctx.drawImage(orangeSpecial, brickX, brickY - 5);
          ctx.fillStyle = "black";
          ctx.fill();
          ctx.closePath();
        }
        else {
          ctx.beginPath();
          ctx.drawImage(orange, brickX, brickY);
          ctx.fillStyle = "black";
          ctx.fill();
          ctx.closePath();
        }
      }
    }
  }
}

function runGame(i){
  while (i >= 0) {
    draw();
    i--;
  }
}

function draw() {
  if (running) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBricks();
    drawBall();
    drawPaddle();
    collisionDetection();

    var disty = 0;
    if (x > paddleX && x < paddleX + paddleWidth) 
      disty = paddleHeight - 6;
    else 
      disty = 0;

    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
      dx = -dx;
    }
    if (y + dy < ballRadius - disty) {
      dy = -dy;
    } else if (y + dy > canvas.height - ballRadius - disty) {
      if (x > paddleX && x < paddleX + paddleWidth) {
        dy = -dy;
      } else {
        lives--;
        livesUpdate(lives);
        if (!lives) {
          running = false;
          end();
        } else {
          dx = +dx;
          dy = -dy;
        }
      }
    }

    if (rightPressed && paddleX<canvas.width-paddleWidth) {
      paddleX += 8;

    } else if (leftPressed && paddleX>0) {
      paddleX -= 8;
    }
    if (paused) {
      if (pauselockPress) {
        pauselockPress = false;
        unlockPause = false;
        pauseGame();
      }
    } else {
      pauselockPress = true;
    }
    x += dx;
    y += dy;
    requestAnimationFrame(draw);
  }
}

function timerTick(){
  if (time>=-1) {
    window.setTimeout(function () {
      timerTick();
    }, 1000);

    if (running)
      time++;

    var minutes = Math.floor(time/60);
    var seconds = time-minutes*60;

    var msg = minutes + "min  " + seconds + "s";
    timer.innerHTML = msg;
    highscoreSet();
  }
}

function end(){
  swal({
    position: "top-end",
    title: "Game over!",
    text: "You lost all your lives 🧡!\n\n Oranges collected: "+score+" 🍊.\nTime spent collecting: "+time+"s.",
    imageUrl:'img/favicon.png',
    showConfirmButton: true,
    showCancelButton: false,
    allowEscapeKey: false,
    allowOutsideClick: false,
  }, function () {
    stopGame();
  });
}

function help(){
  swal({
    position: "top-end",
    title: "Game help:\n ",
    animation: "slide-from-top",
    imageUrl:'img/favicon.png',
    text: "Use arrowkeys ← → or control the paddle with your mouse.\nTo pause the game press the key 'P'.\n\nHighscores are displayed under 'Statistics'.",
    showConfirmButton: true,
    showCancelButton: false,
  });
}

function diff(){
  if (document.getElementById("mediumRadio").checked) 
    runGame(1);

  if (document.getElementById("hardRadio").checked) 
    runGame(3);
}

function highscoreSet(){
  var easyDiff = [];
  for (var i = 0; i < localStorage.length; i++) {
    easyDiff[i] = [];
    easyDiff[i][0] = localStorage.key(i);
  }

  var medDiff = [];
  for (var i = 0; i < localStorage.length; i++) {
    medDiff[i] = [];
    medDiff[i][0] = localStorage.key(i);
  }

  var hardDiff = [];
  for (var i = 0; i < localStorage.length; i++) {
    hardDiff[i] = [];
    hardDiff[i][0] = localStorage.key(i);
  }
  
  easyDiff = easyDiff.sort(sortFunction);
  medDiff = medDiff.sort(sortFunction);
  hardDiff = hardDiff.sort(sortFunction);
}

function sortFunction(a, b) {
  if (a[1] === b[1]) {
    return 0;
  } else {
    return a[1] > b[1] ? -1 : 1;
  }
}

var getStyle = function (e, styleName) {
  var styleValue = "";
  if (document.defaultView && document.defaultView.getComputedStyle) {
    styleValue = document.defaultView
      .getComputedStyle(e, "")
      .getPropertyValue(styleName);
  } else if (e.currentStyle) {
    styleName = styleName.replace(/\-(\w)/g, function (strMatch, p1) {
      return p1.toUpperCase();
    });
    styleValue = e.currentStyle[styleName];
  }
  return styleValue;
};
