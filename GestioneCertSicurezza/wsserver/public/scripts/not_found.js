const originalWidth1 = document.getElementById("typed1").offsetWidth;
const originalWidth2 = document.getElementById("typed2").offsetWidth;

// Animation for typed1
let tl1 = new TimelineMax({
  paused: true,
});
tl1.fromTo(
  "#typed1",
  2,
  {
    width: "0",
  },
  {
    width: originalWidth1,
    ease: SteppedEase.config(37),
  },
  0
);
tl1.fromTo(
  "#typed1",
  0.5,
  {
    "border-right": "2px solid #fff",
  },
  {
    "border-right": "0px solid transparent",
    repeat: 6,
    ease: SteppedEase.config(37),
  },
  0
);

// Animation for typed2
let tl2 = new TimelineMax({
  paused: true,
});
tl2.fromTo(
  "#typed2",
  4,
  {
    width: "0",
  },
  {
    width: originalWidth2,
    ease: SteppedEase.config(37),
  },
  0
);
tl2.fromTo(
  "#typed2",
  0.5,
  {
    "border-right": "2px solid #fff",
  },
  {
    "border-right": "0px solid transparent",
    repeat: 10,
    ease: SteppedEase.config(37),
  },
  0
);

// Rest of your code remains the same

setTimeout(() => {
  const textToAnimate1 = document.getElementById("typed1");
  textToAnimate1.classList.remove("invisible");
  tl1.play();
  setTimeout(() => {
    const textToAnimate2 = document.getElementById("typed2");
    textToAnimate2.classList.remove("invisible");
    tl2.play();
    setTimeout(() => {
      const button = document.getElementById("returnHome");
      gsap.from(button, 1, { duration: 0.3, opacity: 0, y: 50 });
      button.classList.remove("invisible");
    }, 4500);
  }, 2500);
}, 2000);


function returnHome() {
  window.location.href = window.location.origin + "/ws";
}

//click animation
const button = document.getElementById("returnHome");
button.addEventListener("click", gsap.from(button, 0.5, { scale: 0.9 }));