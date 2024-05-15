//i faced error getting elements, so i found out DOM must be loaded so my code works!
document.addEventListener("DOMContentLoaded", function () {
  //store profile
  let score; //base point
  let hearts; //base lives
  let intervalTime; //shape move each "20" millisecond
  let records = [];

  //game difficulty
  let gameHarderInterval = 3; //each "3" point game become harder
  let baseGameSpeed = 2; //"2" pixel per intervalTime

  //these make code running well
  let gameRunning = false;
  let shapeInterval;
  let timerInterval;
  let warnInterval;

  //cache elements
  const gameElem = document.getElementById("game");
  const pointElem = document.getElementById("point");
  const heartElem = document.getElementById("heart");
  const errorElem = document.getElementById("error");
  const recordElem = document.getElementById("record");
  const timerElem = document.getElementById("timer");

  //event listeners for start and end
  document.getElementById("start").addEventListener("click", startGame);
  document.getElementById("end").addEventListener("click", endGame);

  //theme for Dev
  if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');

  } else {
    document.documentElement.classList.remove('dark');
  }
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (e.matches) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  });

  //start
  function startGame() {
    if (!gameRunning) {
      //console things
      console.count('Game Number')
      console.log('Game Started!');
      console.group('Shapes');
      //store and calculate time 
      let timer = 0;
      timer = Date.now();
      startTimer(timer);
      //reset profile
      gameRunning = true;
      score = 0;
      hearts = 3;
      intervalTime = 20;
      updateScore();
      updateHearts();
      spawnShape();
    }
    else {
      warn('You Already start the game!');
    }
  }

  //end
  function endGame() {
    if (gameRunning) {
      //console things
      console.groupEnd('Shapes');
      console.log('Game Ended!');
      //stop game and timer
      clearInterval(timerInterval);
      clearInterval(shapeInterval);
      gameRunning = false;
      gameElem.innerHTML = "";
      //add score to array and calculate max
      records.push(score);
      recordElem.innerText = Math.max(...records);
      //modal after game finished using daisyUI
      document.getElementById(
        "modalText"
      ).innerHTML = `Your Score is ${score} !`;
      my_modal_1.showModal();
    }
    else {
      warn("You didn't start the game!");
    }
  }

  //functions
  function updateScore() {
    pointElem.innerText = score;
  }

  function updateHearts() {
    heartElem.innerText = hearts;
  }

  function spawnShape() {
    //random shape
    console.count('Shape Number');
    const shapes = ["square", "circle", "trapezium", "triangle"];
    const randomShape = shapes[Math.floor(Math.random() * shapes.length)];
    //create and style shape
    const shapeDiv = document.createElement("div");
    shapeDiv.id = "shape"
    shapeDiv.classList.add(randomShape, "shape", "custom-grab");
    shapeDiv.style.position = "absolute";
    shapeDiv.style.left = `${Math.random() * (gameElem.offsetWidth - 100)}px`;
    shapeDiv.style.top = "0px";
    gameElem.appendChild(shapeDiv);
    //move shape
    shapeInterval = setInterval(() => {
      moveShape(shapeDiv);
    }, intervalTime);
    //event for shape
    shapeDiv.addEventListener("click", () => {
      clearInterval(shapeInterval);
      gameElem.removeChild(shapeDiv);
      score++;
      updateScore();
      if (score % gameHarderInterval === 0) {
        //make game harder each gameHarderInterval time and change bg color
        changeBgColor();
        intervalTime--;
      }
      spawnShape();
    });
  }

  function moveShape(shape) {
    //change top of shape
    const topPosition = parseInt(shape.style.top);
    const newTopPosition = topPosition + baseGameSpeed;
    shape.style.top = `${newTopPosition}px`;
    //move until it reach bottom
    if (newTopPosition >= gameElem.offsetHeight - 100) { //100 = shapes size in shapes.css
      //stop moving if reached
      clearInterval(shapeInterval);
      gameElem.removeChild(shape);
      hearts--;
      updateHearts();
      if (hearts === 0) {
        endGame();
      } else {
        spawnShape();
      }
    }
  }

  function warn(msg) {
    //using daisyUI toast msg
    const warnText = `<div id="errorMsg" class="toast toast-center" >
    <div onclick="this.remove();" class="alert alert-info custom-pointer">
      <span>${msg}</span>
    </div>
    </div>`;
    warnInterval && clearInterval(warnInterval); //in case user press it multiple time first previous interval will cancel
    errorElem.innerHTML = warnText;
    warnInterval = setTimeout(() => {
      errorElem.removeChild(errorMsg);
    }, 100000);///////
  }

  function changeBgColor() {
    //all colors in tailwind!
    const colors = [
      "slate",
      "gray",
      "zinc",
      "neutral",
      "stone",
      "red",
      "orange",
      "amber",
      "yellow",
      "lime",
      "green",
      "emerald",
      "teal",
      "cyan",
      "sky",
      "blue",
      "indigo",
      "violet",
      "purple",
      "fuchsia",
      "pink",
      "rose"
    ];
    //picking random color
    const randomNumber = Math.floor(Math.random() * colors.length);
    //remove previous bg color
    const classes = gameElem.classList;
    classes.forEach(cls => {
      if (cls.startsWith('bg-')) {
        gameElem.classList.remove(cls);
      }
    });
    //change background color
    gameElem.classList.add(`bg-${colors[randomNumber]}-200`)
  }

  function startTimer(startTime) {
    timerInterval = setInterval(() => {
      //calculate time passed
      const passedTime = Date.now() - startTime;
      //calculate sec, min, millisecond
      const minutes = Math.floor(passedTime / (1000 * 60));
      const seconds = Math.floor((passedTime % (1000 * 60)) / 1000);
      const milliseconds = passedTime % 1000;
      //formatting time
      const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
      const formattedMilliseconds = milliseconds < 100 ? (milliseconds < 10 ? `00${milliseconds}` : `0${milliseconds}`) : milliseconds;
      //showing clock
      timerElem.innerText = `${minutes}:${formattedSeconds}:${formattedMilliseconds}`;
    }, 1);
  }
});
/*Hope you enjoyed!*/