import "./style.css";

const snake_col = "lightblue";
const snake_border = "darkblue";
const board_background = "#090809";
const board_border = "#ebe8eb";
let changing_direction = false;
let dx = 0;
let dy = 0;
let food_x = 50;
let food_y = 50;
let gameScore = 0;
let gameInProgress = false;

//style getters from css

document.getElementById("scoreValue").innerHTML = gameScore;

const snakeboard = document.getElementById("gameCanvas");
const snakeboard_ctx = gameCanvas.getContext("2d");
document.addEventListener("keydown", handle_keydown);

const restartBtn = document.querySelector(".btn");
restartBtn.addEventListener("click", () => {
  restart_game();
});

let snake = [
  { x: 200, y: 200 },
  { x: 190, y: 200 },
  { x: 180, y: 200 },
  { x: 170, y: 200 },
];

function drawSnakePart(snakePart) {
  snakeboard_ctx.fillStyle = snake_col;
  snakeboard_ctx.strokestyle = snake_border;
  snakeboard_ctx.fillRect(snakePart.x, snakePart.y, 10, 10);
  snakeboard_ctx.strokeRect(snakePart.x, snakePart.y, 10, 10);
}

function drawSnake() {
  snake.forEach(drawSnakePart);
}

function clear_board() {
  snakeboard_ctx.fillStyle = board_background;
  snakeboard_ctx.strokestyle = board_border;
  snakeboard_ctx.fillRect(0, 0, snakeboard.clientWidth, snakeboard.height);
  snakeboard_ctx.strokeRect(0, 0, snakeboard.clientWidth, snakeboard.height);
}

function move_snake() {
  const head = { x: snake[0].x + dx, y: snake[0].y + dy };
  snake.unshift(head);
  const has_eaten_food = snake[0].x === food_x && snake[0].y === food_y;
  if (has_eaten_food) {
    gameScore = gameScore + 1;
    document.getElementById("scoreValue").innerHTML = gameScore;
    // Generate new food location
    gen_food();
  } else {
    // Remove the last part of snake body
    snake.pop();
  }
}

function handle_keydown(event) {
  change_direction(event);

  if (event.keyCode === 32) {
    restart_game();
  }
}

function change_direction(event) {
  const LEFT_KEY = 37;
  const RIGHT_KEY = 39;
  const UP_KEY = 38;
  const DOWN_KEY = 40;

  if (changing_direction) return;
  changing_direction = true;

  const keyPressed = event.keyCode;
  const goingUp = dy === -10;
  const goingDown = dy === 10;
  const goingRight = dx === 10;
  const goingLeft = dx === -10;

  if (keyPressed === LEFT_KEY && !goingRight) {
    dx = -10;
    dy = 0;
  }

  if (keyPressed === UP_KEY && !goingDown) {
    dx = 0;
    dy = -10;
  }

  if (keyPressed === RIGHT_KEY && !goingLeft) {
    dx = 10;
    dy = 0;
  }

  if (keyPressed === DOWN_KEY && !goingUp) {
    dx = 0;
    dy = 10;
  }

  //WASD keybinds
  if (keyPressed === 65 && !goingRight) {
    dx = -10;
    dy = 0;
  }

  if (keyPressed === 87 && !goingDown) {
    dx = 0;
    dy = -10;
  }

  if (keyPressed === 68 && !goingLeft) {
    dx = 10;
    dy = 0;
  }

  if (keyPressed === 83 && !goingUp) {
    dx = 0;
    dy = 10;
  }
}

function has_game_ended() {
  for (let i = 4; i < snake.length; i++) {
    const has_collided = snake[i].x === snake[0].x && snake[i].y === snake[0].y;
    if (has_collided) {
      return true;
    }
  }
  const hitLeftWall = snake[0].x < 0;
  const hitRightWall = snake[0].x > snakeboard.width - 10;
  const hitTopWall = snake[0].y < 0;
  const hitBottomWall = snake[0].y > snakeboard.height - 10;

  return hitLeftWall || hitRightWall || hitTopWall || hitBottomWall;
}

function random_food(min, max) {
  return Math.round((Math.random() * (max - min) + min) / 10) * 10;
}

function gen_food() {
  food_x = random_food(0, snakeboard.width - 10);
  food_y = random_food(0, snakeboard.height - 10);
  snake.forEach(function has_snake_eaten_food(part) {
    const has_eaten = part.x == food_x && part.y == food_y;
    if (has_eaten) gen_food();
  });
}

function draw_food() {
  snakeboard_ctx.fillStyle = "lightgreen";
  snakeboard_ctx.strokestyle = "darkgreen";
  snakeboard_ctx.fillRect(food_x, food_y, 10, 10);
  snakeboard_ctx.strokeRect(food_x, food_y, 10, 10);
}

function restart_game() {
  snake = [
    { x: 200, y: 200 },
    { x: 190, y: 200 },
    { x: 180, y: 200 },
    { x: 170, y: 200 },
  ];
  dx = 0;
  dy = 0;
  clear_board();
  drawSnake();
  move_snake();
  draw_food();
  score = 0;

  if (!gameInProgress) {
    main();
  }
}

function main(gamespeed) {
  if (has_game_ended()) {
    snakeboard_ctx.font = "30px Arial";
    snakeboard_ctx.fillStyle = "red";
    snakeboard_ctx.fillText("Game Over", 100, 200);
    gameInProgress = false;
    return;
  }

  gameInProgress = true;

  changing_direction = false;
  setTimeout(function onTick() {
    clear_board();
    draw_food();
    move_snake();
    drawSnake();

    // Call main again
    main();
  }, 100);
}

main();
