const avatarWrapper = document.getElementById("avatar-wrapper");
const avatar = document.getElementById("avatar");
const root = document.documentElement;

let pastProgress = 0;
let ticking = false;

const parallaxSpeeds = [0.65, 0.35, 0.1];

function updateScene() {
  const positionX = window.scrollX;
  const screenWidth = root.scrollWidth - window.innerWidth;
  const maxWidth = window.innerWidth - avatarWrapper.offsetWidth;
  const progress = screenWidth > 0 ? (positionX / screenWidth) * maxWidth : 0;

  if (progress < pastProgress) {
    avatar.classList.remove("face-right");
  } else if (progress > pastProgress) {
    avatar.classList.add("face-right");
  }

  const layerPositions = parallaxSpeeds
    .map((speed) => `${-positionX * speed}px`)
    .join(", ");

  document.body.style.backgroundPositionX = layerPositions;
  avatarWrapper.style.transform = `translate3d(${progress}px, 0, 0)`;

  pastProgress = progress;
  ticking = false;
}

window.addEventListener(
  "scroll",
  () => {
    if (!ticking) {
      window.requestAnimationFrame(updateScene);
      ticking = true;
    }
  },
  { passive: true }
);

window.addEventListener(
  "wheel",
  (event) => {
    if (Math.abs(event.deltaY) > Math.abs(event.deltaX)) {
      window.scrollBy({
        left: event.deltaY,
        behavior: "auto",
      });
    }
  },
  { passive: true }
);

document.addEventListener("keydown", (event) => {
  const step = window.innerWidth;

  if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
    window.scrollBy({ left: -step, behavior: "smooth" });
  } else if (event.key === "ArrowRight" || event.key === "ArrowDown") {
    window.scrollBy({ left: step, behavior: "smooth" });
  }
});

window.addEventListener("resize", updateScene);
updateScene();