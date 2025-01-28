// Reset scroll position on page reload
window.onload = function () {
  window.scrollTo(0, 0);
};

// Disable browser's automatic scroll restoration
if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}

document.querySelectorAll(".cta-btn").forEach((button) => {
  button.addEventListener("click", (e) => {
    e.preventDefault();
    const target = document.querySelector(button.getAttribute("href"));
    target.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });
});

// Add hover effect to buttons
document.querySelectorAll(".cta-btn").forEach((button) => {
  button.addEventListener("mouseenter", () => {
    button.style.transform = "translateY(-3px)";
  });
  button.addEventListener("mouseleave", () => {
    button.style.transform = "translateY(0)";
  });
});

const canvas = document.getElementById("interactive-canvas");
const ctx = canvas.getContext("2d");
canvas.style.position = "fixed";
canvas.style.zIndex = "-1";

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

const points = Array(50)
  .fill()
  .map(() => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    dx: Math.random() * 2 - 1,
    dy: Math.random() * 2 - 1,
  }));

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = "rgba(123, 102, 183, 0.2)";

  points.forEach((point) => {
    point.x += point.dx;
    point.y += point.dy;

    if (point.x < 0 || point.x > canvas.width) point.dx *= -1;
    if (point.y < 0 || point.y > canvas.height) point.dy *= -1;

    points.forEach((other) => {
      const distance = Math.hypot(point.x - other.x, point.y - other.y);
      if (distance < 150) {
        ctx.beginPath();
        ctx.moveTo(point.x, point.y);
        ctx.lineTo(other.x, other.y);
        ctx.stroke();
      }
    });
  });

  requestAnimationFrame(draw);
}
draw();

// Mouse interaction
canvas.addEventListener("mousemove", (e) => {
  points[0].x = e.clientX;
  points[0].y = e.clientY;
});
