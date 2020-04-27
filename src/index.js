import Particle from "./particles";

let canvas = document.querySelector("#particlesField");
let ctx = canvas.getContext("2d");
let width = window.innerWidth;
let height = window.innerHeight;
let particles = [];
let presetDefault = {
  count: 1000,
  size: 1,
  minSpeed: 10,
  maxSpeed: 50,
  startOrigin: {
    x: undefined,
    y: undefined
  }
};

let settings = presetDefault;

const generateParticles = function(count, size, originX, originY) {
  while (count--) {
    let x = originX || Math.random() * window.innerWidth,
      y = originY || Math.random() * window.innerHeight;

    particles.push(new Particle(x, y, size));
  }
};

/* ======================= */

resize();

window.addEventListener("resize", resize, false);

generateParticles(
  settings.count,
  settings.size,
  settings.startOrigin.x,
  settings.startOrigin.y
);

animate();

/* ======================= */

function resize() {
  width = window.innerWidth;
  height = window.innerHeight;

  if (particles) {
    for (let i = 0; i < particles.length; i++) {
      if (particles[i].position.x > width) {
        particles[i].stop();
        particles[i].position.x = width;
      }

      if (particles[i].position.y > height) {
        particles[i].stop();
        particles[i].position.y = height;
      }
    }
  }
}

function renderCanvas() {
  ctx.globalCompositeOperation = "destination-out";
  ctx.fillStyle = "rgba(0,0,0,0.1)";

  ctx.fillRect(0, 0, width, height);

  ctx.globalCompositeOperation = "source-over";
  ctx.fillStyle = "rgba(255,255,255,1)";

  if (particles) {
    let i = (particles || []).length;
    while (i--) {
      particles[i].draw(ctx);
    }
  }
}

function animate(time) {
  requestAnimationFrame(animate);

  if (width !== canvas.width) {
    canvas.width = width;
  }

  if (height !== canvas.height) {
    canvas.height = height;
  }

  if (particles) {
    for (let i = 0; i < particles.length; i++) {
      let ball = particles[i];
      if (!ball.getPosition(time)) {
        let x = Math.random() * width,
          y = Math.random() * height,
          speed = Math.random() * (settings.maxSpeed / 2) + settings.minSpeed;
        ball.move(x, y, speed);
      }
    }
  }

  renderCanvas();
}
