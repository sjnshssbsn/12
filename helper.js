const avatarWrapper = document.getElementById("avatar-wrapper");
const avatar = document.getElementById("avatar");
const root = document.documentElement;

let pastProgress = 0;
let ticking = false;

// Скорости от преден към заден слой: дървета, облаци, основен фон
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

// Преобразува вертикалното въртене на мишката в хоризонтално скролване
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

// Навигация със стрелките на клавиатурата
document.addEventListener("keydown", (event) => {
  const step = window.innerWidth;

  if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
    window.scrollBy({ left: -step, behavior: "smooth" });
  } else if (event.key === "ArrowRight" || event.key === "ArrowDown") {
    window.scrollBy({ left: step, behavior: "smooth" });
  }
});

// Начално позициониране при зареждане и преоразмеряване на прозореца
window.addEventListener("resize", updateScene);
updateScene();