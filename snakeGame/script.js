const step = 20;
const snake = document.getElementsByClassName('snake')[0];
const snakeHead = document.getElementsByClassName('snk-head')[0];
const dot = document.getElementsByClassName('dot')[0];
const startWall = 0;
const endWall = 500;
let stopL = false;
let stopR = false;
let stopT = false;
let stopB = false;
let level = 200;
let status = '';
let score = 0;

//  rắn di chuyển lên xuống trái phải
function runLeft() {
  if (stopL === false) {
    let leftPosition = getHeadPosition()[0];
    snake.style.left = `${leftPosition}px`;
    snake.style.right = `${480-leftPosition}px`;
    if (leftPosition > 0) {
      setTimeout(function () {
        // console.log(getHeadPosition());
        leftPosition -= step;
        snake.style.left = `${leftPosition}px`;
        status = 'left-ing';
        rotateHead(status);
        console.log(status);
        runLeft();
        eatDot();
   
      }, level);
    }
  }

}

function runRight() {
  if (stopR === false) {
    let rightPosition = getHeadPosition()[1];
    snake.style.right = `${rightPosition}px`;
    snake.style.left = `${480-rightPosition}px`;
    if (rightPosition > 0) {
      setTimeout(function () {
        // console.log(getHeadPosition());
        rightPosition -= step;
        snake.style.right = `${rightPosition}px`;
        status = 'right-ing';
        rotateHead(status);
        console.log(status);
        eatDot();
        runRight();

      }, level);
    }
  }
}

function runTop() {
  if (stopT === false) {
    let topPosition = getHeadPosition()[2];
    snake.style.top = `${topPosition}px`;
    snake.style.bottom = `${480-topPosition}px`;
    if (topPosition > 0) {
      setTimeout(function () {
        // console.log(getHeadPosition());
        topPosition -= step;
        snake.style.top = `${topPosition}px`;
        status = 'up-ing';
        rotateHead(status);
        console.log(status);
        eatDot();
        runTop();

      }, level);
    }
  }
}

function runBottom() {
  if (stopB === false) {
    let bottomPosition = getHeadPosition()[3];
    snake.style.bottom = `${bottomPosition}px`;
    snake.style.top = `${480-bottomPosition}px`;
    if (bottomPosition > 0) {
      setTimeout(function () {
        // console.log(getHeadPosition());
        bottomPosition -= step;
        snake.style.bottom = `${bottomPosition}px`;
        status = 'down-ing';
        rotateHead(status);
        console.log(status);
        eatDot();
        runBottom();

      }, level);
    }
  }
}


// lấy vị trí đầu rắn
function getHeadPosition() {
  let right = getComputedStyle(snake).right.match(/[0-9]/g).join('');
  let top = getComputedStyle(snake).top.match(/[0-9]/g).join('');
  let bottom = getComputedStyle(snake).bottom.match(/[0-9]/g).join('');
  let left = getComputedStyle(snake).left.match(/[0-9]/g).join('');
  let position = [left, right, top, bottom];
  return position;
}
// xoay đầu rắn
function rotateHead(direction) {
  switch (direction) {
    case 'left-ing':
      snakeHead.style.borderRadius = '7px 0 0 7px';
      break;
    case 'right-ing':
      snakeHead.style.borderRadius = '0 7px 7px 0';
      break;
    case 'up-ing':
      snakeHead.style.borderRadius = '7px 7px 0 0';
      break;
    case 'down-ing':
      snakeHead.style.borderRadius = '0 0 7px 7px';
      break;
  }
}

// lấy vị trí dot
function getDotPosition() {
  let right = getComputedStyle(dot).right.match(/[0-9]/g).join('');
  let top = getComputedStyle(dot).top.match(/[0-9]/g).join('');
  let bottom = getComputedStyle(dot).bottom.match(/[0-9]/g).join('');
  let left = getComputedStyle(dot).left.match(/[0-9]/g).join('');
  let position = [left, right, top, bottom];
  return position;
}
// random dot
function randomDotPosition() {
  let left = Math.floor(Math.random() * 24) * 20;
  let right = 480 - left;
  let top = Math.floor(Math.random() * 24) * 20;
  let bottom = 480 - top;
  let position = [left, right, top, bottom];
  (position[0] === getDotPosition()[0] && position[2] === getDotPosition()[2]) ? randomDotPosition(): position;
  return position;
}

function randomDot() {
  dot.style.left = `${randomDotPosition()[0]}px`;
  dot.style.top = `${randomDotPosition()[2]}px`;
  console.log(getDotPosition());
}
// eat dot 
function eatDot() {
  if (getDotPosition()[0] ===  getHeadPosition()[0] && getDotPosition()[2] ===  getHeadPosition()[2]) { score += 1;
    randomDot();
  }
}
// bắt sự kiện arrow
document.onkeyup = function (e) {
  switch (e.keyCode) {
    case 37:
      console.log('left');
      if (status !== 'right-ing') {
        left();
      };
      break;
    case 38:
      console.log('up');
      if (status !== 'down-ing') {
        up();
      };
      break;
    case 39:
      console.log('right');
      if (status !== 'left-ing') {
        right();
      };

      break;
    case 40:
      console.log('down');
      if (status !== 'down-ing') {
        down();
      };

      break;
  }
};

function stopMove(direction) {
  switch (direction) {
    case 'left':
      stopL = true;
      break;
    case 'right':
      stopR = true;
      break;
    case 'up':
      stopT = true;
      break;
    case 'down':
      stopB = true;
      break;
  }
}

function continueMove(direction) {
  switch (direction) {
    case 'left':
      stopL = false;
      break;
    case 'right':
      stopR = false;
      break;
    case 'up':
      stopT = false;
      break;
    case 'down':
      stopB = false;
      break;
  }
}

function left() {
  stopMove('right');
  stopMove('down');
  stopMove('up');
  continueMove('left');
  runLeft();
}

function right() {
  stopMove('left');
  stopMove('down');
  stopMove('up');
  continueMove('right');
  runRight();
  
}

function up() {
  stopMove('right');
  stopMove('left');
  stopMove('down');
  continueMove('up');
  runTop();

}

function down() {
  stopMove('right');
  stopMove('left');
  stopMove('up');
  continueMove('down');
  runBottom();
  
}
