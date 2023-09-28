const swipeContainer = document.querySelector(".body");
let touchStartY = 0;
let touchEndY = 0;
let touchStartX = 0;
let touchEndX = 0;

swipeContainer.addEventListener("touchstart", (event) => {
  touchStartX = event.touches[0].clientX;
});

swipeContainer.addEventListener("touchmove", (event) => {
  touchEndX = event.touches[0].clientX;
});

swipeContainer.addEventListener("touchend", () => {
  handleSwipe();
});

swipeContainer.addEventListener("touchstart", (event) => {
  touchStartY = event.touches[0].clientY;
});

swipeContainer.addEventListener("touchmove", (event) => {
  touchEndY = event.touches[0].clientY;
});

swipeContainer.addEventListener("touchend", () => {
  handleSwipe();
});

function handleSwipe() {
  const swipeDistanceY = touchEndY - touchStartY;
  const swipeDistanceX = touchEndX - touchStartX;

  if (Math.abs(swipeDistanceY) > Math.abs(swipeDistanceX)) {
    // Vertical swipe
    if (swipeDistanceY > 50) {
      dx = 0;
      dy = -10;
    } else if (swipeDistanceY < -50) {
      dx = 0;
      dy = 10;
    }
  } else {
    // Horizontal swipe
    if (swipeDistanceX > 50) {
      dx = 10;
      dy = 0;
      console.log("Swiped right!");
    } else if (swipeDistanceX < -50) {
      dx = -10;
      dy = 0;
      console.log("Swiped left!");
    }
  }
}

export default handleSwipe;
