const root = document.documentElement;
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

const energyModes = {
  aurora: {
    name: "极光",
    terminal: [
      '<span class="ok">✓</span> 极光协议已载入',
      '<span class="ok">✓</span> 粒子网络连接完成',
      '<span class="accent">nova://</span> 灵感坐标已锁定',
    ],
  },
  pulse: {
    name: "脉冲",
    terminal: [
      '<span class="ok">✓</span> 脉冲引擎已点火',
      '<span class="ok">✓</span> 视觉频率同步完成',
      '<span class="accent">nova://</span> 创作能量达到峰值',
    ],
  },
  eclipse: {
    name: "日蚀",
    terminal: [
      '<span class="ok">✓</span> 日蚀模式已开启',
      '<span class="ok">✓</span> 暗场对比重新校准',
      '<span class="accent">nova://</span> 隐藏信号已显现',
    ],
  },
};

const terminalOutput = document.querySelector("#terminal-output");
let terminalRun = 0;

function typeTerminal(modeKey, instant = false) {
  const runId = ++terminalRun;
  terminalOutput.innerHTML = "";
  const lines = energyModes[modeKey].terminal;

  lines.forEach((line, index) => {
    window.setTimeout(
      () => {
        if (runId !== terminalRun) return;
        const paragraph = document.createElement("p");
        paragraph.innerHTML = line;
        terminalOutput.appendChild(paragraph);
      },
      instant || reducedMotion.matches ? 0 : 540 + index * 520,
    );
  });
}

document.querySelectorAll(".mode-button").forEach((button) => {
  button.addEventListener("click", () => {
    const mode = button.dataset.mode;
    root.dataset.energy = mode;
    document.querySelectorAll(".mode-button").forEach((item) => {
      const active = item === button;
      item.classList.toggle("is-active", active);
      item.setAttribute("aria-pressed", String(active));
    });
    typeTerminal(mode);
    pulseCore();
  });
});

function pulseCore() {
  const core = document.querySelector("#energy-core");
  core.classList.remove("is-pulsing");
  void core.offsetWidth;
  core.classList.add("is-pulsing");
  window.setTimeout(() => core.classList.remove("is-pulsing"), 750);
}

document.querySelector("#energy-core").addEventListener("click", pulseCore);

const reactorStage = document.querySelector("#reactor-stage");
reactorStage.addEventListener("pointermove", (event) => {
  if (reducedMotion.matches) return;
  const rect = reactorStage.getBoundingClientRect();
  const x = (event.clientX - rect.left) / rect.width - 0.5;
  const y = (event.clientY - rect.top) / rect.height - 0.5;
  reactorStage.style.transform = `rotateX(${-y * 10}deg) rotateY(${x * 12}deg)`;
});

reactorStage.addEventListener("pointerleave", () => {
  reactorStage.style.transform = "rotateX(0deg) rotateY(0deg)";
});

let pointerFrame = 0;
window.addEventListener("pointermove", (event) => {
  if (pointerFrame) return;
  pointerFrame = window.requestAnimationFrame(() => {
    root.style.setProperty("--mouse-x", `${event.clientX}px`);
    root.style.setProperty("--mouse-y", `${event.clientY}px`);
    pointerFrame = 0;
  });
});

function updateClock() {
  const clock = document.querySelector("#local-time");
  clock.textContent = new Intl.DateTimeFormat("zh-CN", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(new Date());
}

updateClock();
window.setInterval(updateClock, 1000);

const countObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const node = entry.target;
      const target = Number(node.dataset.count);
      const duration = reducedMotion.matches ? 1 : 1100;
      const started = performance.now();

      function tick(now) {
        const progress = Math.min((now - started) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        node.textContent = Math.round(target * eased).toString();
        if (progress < 1) window.requestAnimationFrame(tick);
      }

      window.requestAnimationFrame(tick);
      observer.unobserve(node);
    });
  },
  { threshold: 0.5 },
);

document.querySelectorAll("[data-count]").forEach((node) => countObserver.observe(node));

const ideaFragments = {
  subject: ["一座城市", "一片森林", "一本日记", "一颗星球", "一间教室", "一条时间河流"],
  behavior: ["会回应情绪", "能听懂梦境", "正在缓慢生长", "会记住每次选择", "能把声音变成颜色", "会在午夜重组自己"],
  form: ["数字花园", "互动地图", "声音装置", "AI 伙伴", "视觉档案", "未来展览"],
};

const ideaOutput = document.querySelector("#idea-output");
const generateButton = document.querySelector("#generate-idea");

function pick(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function burstParticles() {
  const section = document.querySelector(".idea-reactor");
  const buttonRect = generateButton.getBoundingClientRect();
  const sectionRect = section.getBoundingClientRect();
  const originX = buttonRect.left - sectionRect.left + buttonRect.width / 2;
  const originY = buttonRect.top - sectionRect.top + buttonRect.height / 2;

  for (let index = 0; index < 18; index += 1) {
    const particle = document.createElement("i");
    const angle = (Math.PI * 2 * index) / 18;
    const distance = 55 + Math.random() * 95;
    particle.className = "idea-particle";
    particle.style.left = `${originX}px`;
    particle.style.top = `${originY}px`;
    particle.style.setProperty("--burst-x", `${Math.cos(angle) * distance}px`);
    particle.style.setProperty("--burst-y", `${Math.sin(angle) * distance}px`);
    section.appendChild(particle);
    window.setTimeout(() => particle.remove(), 850);
  }
}

generateButton.addEventListener("click", () => {
  ideaOutput.classList.add("is-changing");
  if (!reducedMotion.matches) burstParticles();
  window.setTimeout(
    () => {
      ideaOutput.textContent = `${pick(ideaFragments.subject)}，${pick(ideaFragments.behavior)}的${pick(ideaFragments.form)}`;
      ideaOutput.classList.remove("is-changing");
    },
    reducedMotion.matches ? 0 : 180,
  );
});

const canvas = document.querySelector("#starfield");
const context = canvas.getContext("2d");
let particles = [];
let animationFrame = 0;
const pointer = { x: -1000, y: -1000 };

function createParticles() {
  const amount = Math.min(115, Math.max(42, Math.floor((window.innerWidth * window.innerHeight) / 14500)));
  particles = Array.from({ length: amount }, () => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    vx: (Math.random() - 0.5) * 0.18,
    vy: (Math.random() - 0.5) * 0.18,
    radius: 0.45 + Math.random() * 1.25,
  }));
}

function resizeCanvas() {
  const ratio = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = Math.floor(window.innerWidth * ratio);
  canvas.height = Math.floor(window.innerHeight * ratio);
  canvas.style.width = `${window.innerWidth}px`;
  canvas.style.height = `${window.innerHeight}px`;
  context.setTransform(ratio, 0, 0, ratio, 0, 0);
  createParticles();
}

function drawParticles(animate = true) {
  context.clearRect(0, 0, window.innerWidth, window.innerHeight);
  context.fillStyle = "rgba(205, 226, 255, 0.72)";

  particles.forEach((particle, index) => {
    if (animate) {
      particle.x += particle.vx;
      particle.y += particle.vy;
      if (particle.x < -10) particle.x = window.innerWidth + 10;
      if (particle.x > window.innerWidth + 10) particle.x = -10;
      if (particle.y < -10) particle.y = window.innerHeight + 10;
      if (particle.y > window.innerHeight + 10) particle.y = -10;
    }

    context.beginPath();
    context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
    context.fill();

    for (let nextIndex = index + 1; nextIndex < particles.length; nextIndex += 1) {
      const next = particles[nextIndex];
      const dx = particle.x - next.x;
      const dy = particle.y - next.y;
      const distance = Math.hypot(dx, dy);
      if (distance < 104) {
        context.strokeStyle = `rgba(104, 176, 255, ${(1 - distance / 104) * 0.13})`;
        context.lineWidth = 0.6;
        context.beginPath();
        context.moveTo(particle.x, particle.y);
        context.lineTo(next.x, next.y);
        context.stroke();
      }
    }

    const pointerDistance = Math.hypot(particle.x - pointer.x, particle.y - pointer.y);
    if (pointerDistance < 150) {
      context.strokeStyle = `rgba(83, 246, 255, ${(1 - pointerDistance / 150) * 0.45})`;
      context.lineWidth = 0.8;
      context.beginPath();
      context.moveTo(particle.x, particle.y);
      context.lineTo(pointer.x, pointer.y);
      context.stroke();
    }
  });

  if (animate) animationFrame = window.requestAnimationFrame(() => drawParticles(true));
}

window.addEventListener("pointermove", (event) => {
  pointer.x = event.clientX;
  pointer.y = event.clientY;
});

window.addEventListener("pointerleave", () => {
  pointer.x = -1000;
  pointer.y = -1000;
});

window.addEventListener("resize", () => {
  window.cancelAnimationFrame(animationFrame);
  resizeCanvas();
  drawParticles(!reducedMotion.matches);
});

function startCanvas() {
  window.cancelAnimationFrame(animationFrame);
  resizeCanvas();
  drawParticles(!reducedMotion.matches);
}

reducedMotion.addEventListener("change", startCanvas);
startCanvas();
typeTerminal("aurora");
