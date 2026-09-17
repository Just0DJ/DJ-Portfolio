// Site bootstrap: intro animation (steady pace with hold-to-fast-forward),
// theme persistence, accent color, and scroll progress.

import { accentColors } from '../data/content';

const STEP_MS = 1100; // ms per intro text (steady)
const FADE_OUT_MS = 600; // must match .intro transition in CSS
const HOLD_MS = 450; // how long the left button must be held to fast-forward

export function applyThemeMode(mode: 'light' | 'dark'): void {
  if (mode === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
  } else {
    document.documentElement.removeAttribute('data-theme');
  }
  try {
    localStorage.setItem('themeMode', mode);
  } catch {
    /* storage unavailable */
  }
}

function toggleThemeMode(): void {
  const isLight = document.documentElement.getAttribute('data-theme') === 'light';
  applyThemeMode(isLight ? 'dark' : 'light');
}

function getRandomAccentColor(): string {
  return accentColors[Math.floor(Math.random() * accentColors.length)] ?? '#00d4ff';
}

function revealMain(intro: HTMLElement, main: HTMLElement): void {
  intro.style.opacity = '0';
  window.setTimeout(() => {
    intro.style.display = 'none';
    main.classList.add('active');
    document.body.style.overflow = 'auto';
  }, FADE_OUT_MS);
}

function startIntroAnimation(): void {
  const intro = document.getElementById('intro');
  const main = document.getElementById('main');
  if (!intro || !main) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reducedMotion) {
    intro.style.display = 'none';
    main.classList.add('active');
    document.body.style.overflow = 'auto';
    return;
  }

  const spans = intro.querySelectorAll('span');
  const total = spans.length * STEP_MS + STEP_MS;

  let revealed = false;
  let holdTimer: number | undefined;
  let revealTimer: number | undefined;

  const finishNow = (): void => {
    if (revealed) return;
    revealed = true;
    window.clearTimeout(revealTimer);
    window.clearTimeout(holdTimer);
    document.removeEventListener('pointerdown', onDown);
    document.removeEventListener('pointerup', onUp);
    document.removeEventListener('pointercancel', onUp);
    revealMain(intro, main);
  };

  // Fast-forward: press and HOLD the left mouse button (or a touch) anywhere.
  // Releasing before HOLD_MS cancels the fast-forward.
  const onDown = (e: PointerEvent): void => {
    if (revealed) return;
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    window.clearTimeout(holdTimer);
    holdTimer = window.setTimeout(finishNow, HOLD_MS);
  };
  const onUp = (): void => {
    window.clearTimeout(holdTimer);
  };

  document.addEventListener('pointerdown', onDown);
  document.addEventListener('pointerup', onUp);
  document.addEventListener('pointercancel', onUp);

  revealTimer = window.setTimeout(finishNow, total);
}

export function initSite(): void {
  let savedMode: string | null = null;
  try {
    savedMode = localStorage.getItem('themeMode');
  } catch {
    /* storage unavailable */
  }
  applyThemeMode(savedMode === 'light' ? 'light' : 'dark');

  const topModeBtn = document.getElementById('topModeToggle');
  const heroModeBtn = document.getElementById('heroThemeToggle');
  topModeBtn?.addEventListener('click', toggleThemeMode);
  heroModeBtn?.addEventListener('click', toggleThemeMode);

  startIntroAnimation();

  let lastScrollY = 0;
  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    const scrollProgress = document.getElementById('scrollProgress');
    if (scrollProgress) {
      scrollProgress.style.width = scrollPercent + '%';
    }

    const scrollChange = Math.abs(scrollTop - lastScrollY);
    if (scrollChange >= 100) {
      document.documentElement.style.setProperty('--accent-color', getRandomAccentColor());
      lastScrollY = scrollTop;
    }
  });
}
