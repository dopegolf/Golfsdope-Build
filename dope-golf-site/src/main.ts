import "./style.css";
import { collections, type Collection } from "./collections";

const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;

/* ------------------------------------------------------------------ */
/* Collection cards                                                    */
/* ------------------------------------------------------------------ */
function renderCollections(): void {
  const mount = document.querySelector<HTMLDivElement>("[data-cards]");
  if (!mount) return;

  mount.innerHTML = collections
    .map((c: Collection, i: number) => {
      const chips = c.proof
        .map((p) => `<span class="chip">${p}</span>`)
        .join("");
      return `
      <article class="card" data-reveal style="--accent:${c.accent};--accent2:${c.accent2};--i:${i}">
        <div class="card__art">
          <img src="${c.image}" alt="${c.name} collection lifestyle" class="card__photo" loading="lazy" />
          <span class="card__num" aria-hidden="true">0${i + 1}</span>
          <span class="card__soon">Coming Soon</span>
        </div>
        <div class="card__body">
          <p class="card__locale">${c.locale}</p>
          <h3 class="card__name">${c.name}</h3>
          <p class="card__blurb">${c.blurb}</p>
          <div class="card__chips">${chips}</div>
        </div>
        <div class="card__sheen" aria-hidden="true"></div>
      </article>`;
    })
    .join("");
}

/* ------------------------------------------------------------------ */
/* Split text: wrap words for staggered rise-in on reveal              */
/* ------------------------------------------------------------------ */
function splitWords(node: Node, counter: { i: number }): void {
  if (node.nodeType === Node.TEXT_NODE) {
    const text = node.textContent ?? "";
    if (!text.trim()) return;
    const frag = document.createDocumentFragment();
    for (const part of text.split(/(\s+)/)) {
      if (!part) continue;
      if (/^\s+$/.test(part)) {
        frag.appendChild(document.createTextNode(part));
      } else {
        const w = document.createElement("span");
        w.className = "w";
        const wi = document.createElement("span");
        wi.className = "wi";
        wi.textContent = part;
        wi.style.transitionDelay = `${counter.i++ * 60}ms`;
        w.appendChild(wi);
        frag.appendChild(w);
      }
    }
    node.parentNode?.replaceChild(frag, node);
  } else if (node.nodeType === Node.ELEMENT_NODE) {
    for (const child of Array.from(node.childNodes)) splitWords(child, counter);
  }
}

function initSplitText(): void {
  if (prefersReducedMotion) return;
  document.querySelectorAll<HTMLElement>("[data-split]").forEach((el) => {
    splitWords(el, { i: 0 });
    el.classList.add("is-split");
  });
}

/* ------------------------------------------------------------------ */
/* Scroll reveal                                                       */
/* ------------------------------------------------------------------ */
function initReveal(): void {
  const items = document.querySelectorAll<HTMLElement>("[data-reveal]");
  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    items.forEach((el) => el.classList.add("is-visible"));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
  );
  items.forEach((el) => io.observe(el));
}

/* ------------------------------------------------------------------ */
/* Parallax + topbar state (single rAF-throttled scroll handler)       */
/* ------------------------------------------------------------------ */
function initScrollFx(): void {
  const parallaxEls = Array.from(
    document.querySelectorAll<HTMLElement>("[data-parallax]"),
  );
  const topbar = document.querySelector<HTMLElement>("[data-topbar]");
  const heroContent = document.querySelector<HTMLElement>("[data-hero-content]");
  const progress = document.querySelector<HTMLElement>("[data-progress]");
  let ticking = false;

  const update = (): void => {
    const y = window.scrollY;

    if (topbar) topbar.classList.toggle("is-scrolled", y > 40);

    if (progress) {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.transform = `scaleX(${max > 0 ? Math.min(1, y / max) : 0})`;
    }

    if (!prefersReducedMotion) {
      for (const el of parallaxEls) {
        const speed = Number(el.dataset.parallax ?? "0.2");
        el.style.transform = `translate3d(0, ${y * speed}px, 0)`;
      }
      if (heroContent && y < window.innerHeight) {
        const p = y / window.innerHeight;
        heroContent.style.transform = `translate3d(0, ${y * 0.15}px, 0)`;
        heroContent.style.opacity = String(Math.max(0, 1 - p * 1.15));
      }
    }
    ticking = false;
  };

  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    },
    { passive: true },
  );
  update();
}

/* ------------------------------------------------------------------ */
/* Gold particle drift (hero canvas)                                   */
/* ------------------------------------------------------------------ */
interface Particle {
  x: number;
  y: number;
  r: number;
  vy: number;
  vx: number;
  a: number;
  tw: number;
}

function initParticles(): void {
  const canvas = document.querySelector<HTMLCanvasElement>("[data-particles]");
  if (!canvas || prefersReducedMotion) return;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  let w = 0;
  let h = 0;
  let dpr = 1;
  let particles: Particle[] = [];
  let raf = 0;
  let running = true;

  const build = (): void => {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = canvas.offsetWidth;
    h = canvas.offsetHeight;
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const count = Math.min(90, Math.floor((w * h) / 16000));
    particles = Array.from({ length: count }, () => spawn());
  };

  const spawn = (): Particle => ({
    x: Math.random() * w,
    y: Math.random() * h,
    r: Math.random() * 1.8 + 0.4,
    vy: -(Math.random() * 0.35 + 0.08),
    vx: (Math.random() - 0.5) * 0.25,
    a: Math.random() * 0.5 + 0.15,
    tw: Math.random() * Math.PI * 2,
  });

  const tick = (): void => {
    if (!running) return;
    ctx.clearRect(0, 0, w, h);
    for (const p of particles) {
      p.y += p.vy;
      p.x += p.vx;
      p.tw += 0.03;
      if (p.y < -4) {
        p.y = h + 4;
        p.x = Math.random() * w;
      }
      if (p.x < -4) p.x = w + 4;
      if (p.x > w + 4) p.x = -4;
      const flicker = p.a * (0.6 + Math.sin(p.tw) * 0.4);
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(212, 175, 55, ${flicker.toFixed(3)})`;
      ctx.fill();
    }
    raf = window.requestAnimationFrame(tick);
  };

  build();
  tick();

  // CSS is injected via JS import, so the first build() can run before layout
  // settles (canvas measured too small). Rebuild once the frame paints and again
  // after full load so particles fill the real hero dimensions.
  window.requestAnimationFrame(build);
  window.addEventListener("load", build, { once: true });
  window.addEventListener("resize", build, { passive: true });
  // Pause when hero is offscreen to save cycles.
  const hero = document.querySelector("[data-hero]");
  if (hero && "IntersectionObserver" in window) {
    new IntersectionObserver((entries) => {
      const e = entries[0];
      if (!e) return;
      running = e.isIntersecting;
      if (running) {
        raf = window.requestAnimationFrame(tick);
      } else {
        window.cancelAnimationFrame(raf);
      }
    }).observe(hero);
  }
}

/* ------------------------------------------------------------------ */
/* VIP form (client-side only — no backend wired yet)                  */
/* ------------------------------------------------------------------ */
function initVipForm(): void {
  const form = document.querySelector<HTMLFormElement>("[data-vip-form]");
  const msg = document.querySelector<HTMLParagraphElement>("[data-vip-msg]");
  if (!form || !msg) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const input = form.querySelector<HTMLInputElement>('input[name="email"]');
    const value = input?.value.trim() ?? "";
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    if (!valid) {
      msg.textContent = "Enter a valid email to join the crew.";
      msg.dataset.state = "error";
      input?.focus();
      return;
    }
    msg.textContent = "You're in. Welcome to the movement — check your inbox soon.";
    msg.dataset.state = "ok";
    form.reset();
  });
}

/* ------------------------------------------------------------------ */
/* Footer year                                                         */
/* ------------------------------------------------------------------ */
function initYear(): void {
  const el = document.querySelector<HTMLSpanElement>("[data-year]");
  if (el) el.textContent = String(new Date().getFullYear());
}

/* ------------------------------------------------------------------ */
/* Boot                                                                */
/* ------------------------------------------------------------------ */
function boot(): void {
  renderCollections();
  initSplitText();
  initReveal();
  initScrollFx();
  initParticles();
  initVipForm();
  initYear();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", boot);
} else {
  boot();
}
