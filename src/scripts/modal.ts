// Accessible universal modal built on the native <dialog> element.
// Any element with [data-modal-open] opens the dialog; [data-modal-close]
// closes it. Content is rendered from the central content registry.

import type { Achievement, SkillCategory } from '../data/content';

interface DetailEntry {
  heading: string;
  body: string;
}

export interface CollectionEntry {
  id: string;
  title: string;
  subtitle: string;
  heroSrc: string;
  heroAlt: string;
  details: DetailEntry[];
}

export interface ModalDataSource {
  skills: SkillCategory[];
  achievements: Achievement[];
  experiences: CollectionEntry[];
  projects: CollectionEntry[];
}

const state: { data: ModalDataSource | null } = { data: null };

function findEntry(type: string, id: string): CollectionEntry | undefined {
  const data = state.data;
  if (!data) return undefined;
  if (type === 'skill') {
    const s = data.skills.find((x) => x.id === id);
    return s
      ? {
          id: s.id,
          title: s.title,
          subtitle: s.level,
          heroSrc: '',
          heroAlt: '',
          details: s.details,
        }
      : undefined;
  }
  if (type === 'achievement') {
    const a = data.achievements.find((x) => x.id === id);
    return a
      ? {
          id: a.id,
          title: a.title,
          subtitle: a.role,
          heroSrc: '',
          heroAlt: '',
          details: a.details,
        }
      : undefined;
  }
  if (type === 'experience') return data.experiences.find((x) => x.id === id);
  if (type === 'project') return data.projects.find((x) => x.id === id);
  return undefined;
}

function renderDetails(entry: CollectionEntry): string {
  return entry.details
    .map((d) => '<h3>' + escapeHtml(d.heading) + '</h3><p>' + escapeHtml(d.body) + '</p>')
    .join('');
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function openModal(id: string, type: string): void {
  const modal = document.getElementById('universalModal') as HTMLDialogElement | null;
  const entry = findEntry(type, id);
  if (!modal || !entry) return;

  const titleEl = document.getElementById('mTitle');
  const subtitleEl = document.getElementById('mSubtitle');
  const imageContainer = document.getElementById('mImageContainer');
  const imageEl = document.getElementById('mImage') as HTMLImageElement | null;
  const bodyEl = document.getElementById('mBody');
  if (!titleEl || !subtitleEl || !imageContainer || !imageEl || !bodyEl) return;

  titleEl.textContent = entry.title;
  subtitleEl.textContent = entry.subtitle;

  if (entry.heroSrc) {
    imageEl.src = entry.heroSrc;
    imageEl.alt = entry.heroAlt || entry.title;
    imageContainer.style.display = 'block';
  } else {
    imageEl.src = '';
    imageContainer.style.display = 'none';
  }

  bodyEl.innerHTML = renderDetails(entry);

  if (typeof modal.showModal === 'function') {
    modal.showModal();
  } else {
    modal.setAttribute('open', '');
  }
}

export function closeModal(): void {
  const modal = document.getElementById('universalModal') as HTMLDialogElement | null;
  if (!modal) return;
  if (typeof modal.close === 'function') {
    modal.close();
  } else {
    modal.removeAttribute('open');
  }
  const imageEl = document.getElementById('mImage') as HTMLImageElement | null;
  if (imageEl) imageEl.src = '';
}

export function initModal(data: ModalDataSource): void {
  state.data = data;

  const modal = document.getElementById('universalModal') as HTMLDialogElement | null;
  if (!modal) return;

  // Click on the backdrop closes; clicks inside .modal-content do not.
  modal.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    if (target instanceof Element && target.closest('.modal-content')) return;
    closeModal();
  });

  // Whole cards and explicit buttons open the modal (delegated).
  document.addEventListener('click', (e) => {
    const openTrigger = (e.target as HTMLElement | null)?.closest<HTMLElement>('[data-modal-open]');
    if (openTrigger) {
      // Ignore clicks on real links inside the trigger (e.g. case-study links).
      const link = (e.target as HTMLElement | null)?.closest('a[href]');
      if (!link) {
        e.preventDefault();
        openModal(openTrigger.dataset.modalId ?? '', openTrigger.dataset.modalType ?? '');
        return;
      }
    }

    const closeTrigger = (e.target as HTMLElement | null)?.closest<HTMLElement>('[data-modal-close]');
    if (closeTrigger) {
      e.preventDefault();
      closeModal();
    }
  });
}
