const buttonColors = ['red', 'blue', 'green', 'yellow'];
const startBtn = document.getElementById("start-btn");
let userClickedPattern = [];
let gamePattern = [];

let level = 0;
let started = false;

let userChosenColor;
let randomChosenColor;

function nextSequence() {
  let randomNumber = Math.floor(Math.random() * 4);
  randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $('.' + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
  level++;
  $('h1').text('Level ' + level);
  userClickedPattern = [];
  
}

function playSound (name) {
  const colorSound = new Audio(`sounds/${name}.mp3`);
  colorSound.play();
}

function animatePress (currentColor) {
  let currentBtn = $('#' + currentColor);
  currentBtn.addClass('pressed');
  setTimeout(function() {
    currentBtn.removeClass('pressed');
  }, 100);
}

function checkAnswer(currentLevel) {
  if(gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {nextSequence();}, 1000);
      
    }
    
  } else {
    let playSound = new Audio('sounds/wrong.mp3');
    playSound.play();
    started = false;
    $('body').addClass('game-over');
    setTimeout(function() {
      $('body').removeClass('game-over');
    }, 200);
    $('h1').text('Game Over, Press Start Button to Restart');
    startBtn.style.display = "block";
    userClickedPattern = [];
    gamePattern = [];
    level = 0;
  }
}

$('.btn').click(function() {
  userChosenColor = this.id;
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
  
 
});

startBtn.addEventListener("click", function() {
  if(!started) {
    nextSequence();
    started = true;
    startBtn.style.display = "none";
  } 
  
});
