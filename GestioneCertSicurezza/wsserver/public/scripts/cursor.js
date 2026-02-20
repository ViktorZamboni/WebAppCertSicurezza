//Custom cursor
const cursor = document.getElementById("cursor");
const width = 26;
const idleTimeout = 150;
const maxIndex = 10;
let mousePosition = { x: -100, y: -100 };
let dots = [];
let timeoutID;
let idle = false;

//The cursor is rapresented by various dots
class Dot {
  constructor(index = 0) {
    this.index = index;
    this.anglespeed = 0.05;
    this.x = 0;
    this.y = 0;
    this.scale = 1 - index / maxIndex;
    this.range = width / 2 - (width / 2) * this.scale + 2;
    this.limit = width * 0.75 * this.scale;
    this.element = document.createElement("span");
    this.element.className = "mousedot";
    TweenMax.set(this.element, { scale: this.scale });
    cursor.appendChild(this.element);
  }

  //When the cursor is stable the dots are rendered in a different way
  lock() {
    this.lockX = this.x;
    this.lockY = this.y;
    this.angleX = Math.PI * 2 * Math.random();
    this.angleY = Math.PI * 2 * Math.random();
  }

  //Render the cursor on the page in the right position
  draw() {
    if (!idle || this.index <= 6) {
      TweenMax.set(this.element, { x: this.x, y: this.y });
    } else {
      this.angleX += this.anglespeed;
      this.angleY += this.anglespeed;
      this.y = this.lockY + Math.sin(this.angleY) * this.range;
      this.x = this.lockX + Math.sin(this.angleX) * this.range;
      TweenMax.set(this.element, { x: this.x, y: this.y });
    }
  }

  //On click animation
  animateOnClick() {
    TweenMax.to(this.element, 0.2, {
      scale: this.scale * 1.2,
      ease: Power2.easeInOut,
      onComplete: () => {
        TweenMax.to(this.element, 0.1, {
          scale: this.scale,
          ease: Power2.easeInOut,
        });
      },
    });
  }
}

//update the position of each dot in the cursor and render it
const render = () => {
  let x = mousePosition.x;
  let y = mousePosition.y;
  dots.forEach((dot, index, dots) => {
    let nextDot = dots[index + 1] || dots[0];
    dot.x = x;
    dot.y = y;
    dot.draw();
    if (!idle || index <= 6) {
      x += (nextDot.x - dot.x) * 0.35;
      y += (nextDot.y - dot.y) * 0.35;
    }
  });

  //recall render function
  requestAnimationFrame(render);
};

//Function that resets the current idle timer and starts a new one, if the timers ends the cursor is locked which means it is stable in a position
function resetIdleTimer() {
  clearTimeout(timeoutID);
  timeoutID = setTimeout(() => {
    idle = true;
    for (let dot of dots) {
      dot.lock();
    }
  }, idleTimeout);
  idle = false;
}

//Create the dots for the cursor
for (let i = 0; i < maxIndex; i++) {
  let dot = new Dot(i);
  dots.push(dot);
}

//When the mouse moves, the position of the cursor is updated and the timer of idle is reset
window.addEventListener("mousemove", (event) => {
  mousePosition.x = event.clientX - width / 2;
  mousePosition.y = event.clientY - width / 2;
  resetIdleTimer();
});

//When the touch moves, the position of the cursor is updated and the timer of idle is reset
window.addEventListener("touchmove", (event) => {
  mousePosition.x = event.touches[0].clientX - width / 2;
  mousePosition.y = event.touches[0].clientY - width / 2;
  resetIdleTimer();
});

//When a point on the page is clicked, the dots are animated
window.addEventListener("click", () => {
  dots.forEach((dot) => {
    if (dot.index == 0) {
      dot.animateOnClick();
    }
  });
});

//Initialize the rendering process
render();