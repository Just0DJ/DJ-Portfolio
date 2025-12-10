// Animation control variables
let skipping = false;
let animationSpeed = 1500; // Default 1.5 seconds per text
let currentTextIndex = 0;
const introTexts = [
    'நான் டிஜே', 'मैं डिजे', 'أنا ديجي', 'Je suis DiJay', 'I am DiJay'
];

// Theme and accent color management
const accentColors = [
    '#00d4ff', '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4',
    '#feca57', '#ff9ff3', '#54a0ff', '#5f27cd', '#00d2d3',
    '#ff4757', '#2ed573', '#ffa502', '#ff6348', '#5352ed',
    '#ff3838', '#32ff7e', '#ff9f1a', '#ff6b9d', '#4834d4',
    '#00d2d3', '#ff7675', '#74b9ff', '#a29bfe', '#fd79a8'
];

function getRandomAccentColor() {
    return accentColors[Math.floor(Math.random() * accentColors.length)];
}

function updateAccentColor(color) {
    document.documentElement.style.setProperty('--accent-color', color);
}

// Gradient theme cycling
const gradientThemes = [
    { name: 'aurora', colors: ['#00d2d3', '#5f27cd', '#54a0ff'] },
    { name: 'sunset', colors: ['#ff6b6b', '#feca57', '#ff9f1a'] },
    { name: 'ocean', colors: ['#00d4ff', '#0099cc', '#4ecdc4'] },
    { name: 'forest', colors: ['#2ed573', '#1e7e34', '#00b894'] }
];

function applyGradientTheme(theme) {
    const [c1, c2, c3] = theme.colors;
    document.documentElement.style.setProperty('--grad1', c1);
    document.documentElement.style.setProperty('--grad2', c2);
    document.documentElement.style.setProperty('--grad3', c3);
    updateAccentColor(c1);
    localStorage.setItem('gradientTheme', theme.name);
}

function cycleTheme() {
    const saved = localStorage.getItem('gradientTheme') || gradientThemes[0].name;
    const idx = gradientThemes.findIndex(t => t.name === saved);
    const next = gradientThemes[(idx + 1) % gradientThemes.length];
    applyGradientTheme(next);
}

// Animation progression control
function startIntroAnimation() {
    const intro = document.getElementById('intro');
    const main = document.getElementById('main');

    // Hide menu during animation
    const bottomMenu = document.querySelector('.bottom-menu');
    bottomMenu.style.display = 'none';

    function showNextText() {
        // Hide all texts
        const spans = intro.querySelectorAll('span');
        spans.forEach(span => {
            span.style.opacity = '0';
        });

        // Show current text
        if (spans[currentTextIndex]) {
            spans[currentTextIndex].style.opacity = '1';
        }

        currentTextIndex++;

        if (currentTextIndex >= spans.length) {
            // Animation complete, transition to main content
            setTimeout(() => {
                intro.style.opacity = '0';
                setTimeout(() => {
                    intro.style.display = 'none';
                    main.classList.add('active');
                    document.body.style.overflow = 'auto';
                    // Show menu after animation
                    bottomMenu.style.display = 'flex';
                    bottomMenu.classList.add('show');
                }, 2000);
            }, skipping ? 100 : 2000);
            return;
        }

        // Schedule next text
        setTimeout(showNextText, skipping ? 100 : animationSpeed);
    }

    showNextText();
}

// Keyboard and mouse controls for animation
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
        e.preventDefault();
        skipping = true;
    }
});

document.addEventListener('keyup', (e) => {
    if (e.code === 'Space') {
        skipping = false;
    }
});

document.addEventListener('mousedown', () => {
    skipping = true;
});

document.addEventListener('mouseup', () => {
    skipping = false;
});

// Bottom menu functionality
// Theme mode (dark/light)
const THEME_MODE_KEY = 'themeMode';
function applyThemeMode(mode) {
    if (mode === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
    } else {
        document.documentElement.removeAttribute('data-theme');
    }
    localStorage.setItem(THEME_MODE_KEY, mode);
}

function toggleThemeMode() {
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    applyThemeMode(isLight ? 'dark' : 'light');
}

function setupBottomMenu() {
    const scrollUpBtn = document.getElementById('scrollUp');
    const modeBtn = document.getElementById('darkModeToggle');
    const topModeBtn = document.getElementById('topModeToggle');

    // Scroll to top
    if (scrollUpBtn) {
        scrollUpBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Dark/Light toggle
    if (modeBtn) modeBtn.addEventListener('click', toggleThemeMode);
    if (topModeBtn) topModeBtn.addEventListener('click', toggleThemeMode);
}

// Scroll reveal for sections
function setupScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('.section').forEach(sec => observer.observe(sec));
}

// Intro animation logic
document.addEventListener('DOMContentLoaded', () => {
    const intro = document.getElementById('intro');
    const main = document.getElementById('main');

    // Initialize theme mode from storage
    const savedMode = localStorage.getItem(THEME_MODE_KEY);
    applyThemeMode(savedMode === 'light' ? 'light' : 'dark');

    // Setup bottom menu and scroll reveal
    setupBottomMenu();
    setupScrollReveal();

    // Start intro animation
    startIntroAnimation();
});

// Scroll progress indicator and color changes
let lastScrollY = 0;
window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    const scrollProgress = document.getElementById('scrollProgress');
    if (scrollProgress) {
        scrollProgress.style.width = scrollPercent + '%';
    }

    // Color change on scroll (both up and down) - every 100px scroll
    const scrollChange = Math.abs(scrollTop - lastScrollY);
    if (scrollChange >= 100) {
        updateAccentColor(getRandomAccentColor());
        lastScrollY = scrollTop;
    }
});

// Contact form handling
document.getElementById('contactForm')?.addEventListener('submit', function (e) {
    e.preventDefault();
    alert('Thank you for your message! I\'ll get back to you soon.');
    this.reset();
});

// Gallery modal handling
const galleryModal = document.getElementById('galleryModal');
const galleryTitle = document.getElementById('galleryTitle');
const galleryImagesEl = document.getElementById('galleryImages');
const galleryCloseBtn = document.getElementById('galleryClose');

// Ensure modal starts hidden
if (galleryModal) {
    galleryModal.hidden = true;
    galleryModal.style.display = 'none';
}

const projectData = {
    'science-cache': {
        title: 'Science Cache System',
        desc: 'Modular sample storage system designed for IRC 2025, focusing on reliability and integration.'
    },
    'mini-rover': {
        title: 'Mini Rover Chassis',
        desc: 'Lightweight chassis with CAD and simulation studies for traction and load.'
    },
    'erc-2025': {
        title: 'ERC 2025 Rover Modules',
        desc: 'Gripper and modular chassis components with CNC and 3D printing.'
    }
};

async function resolveGalleryImages(key) {
    const manifestUrl = `gallery/${key}/manifest.json`;
    try {
        const res = await fetch(manifestUrl);
        if (res.ok) {
            const json = await res.json();
            if (Array.isArray(json.images)) {
                return json.images.map(name => `gallery/${key}/${name}`);
            }
        }
    } catch (_) { }
    const candidates = [];
    const exts = ['jpg', 'png', 'jpeg', 'webp'];
    for (let i = 1; i <= 20; i++) {
        for (const ext of exts) {
            candidates.push(`gallery/${key}/${i}.${ext}`);
        }
    }
    const results = await Promise.allSettled(candidates.map(src => probeImage(src)));
    return results.filter(r => r.status === 'fulfilled').map(r => r.value);
}

function probeImage(src) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(src);
        img.onerror = () => reject();
        img.src = src;
    });
}

const firstImageCache = {};
async function getFirstImage(key) {
    if (firstImageCache[key]) return firstImageCache[key];
    const imgs = await resolveGalleryImages(key);
    firstImageCache[key] = imgs[0] || null;
    return firstImageCache[key];
}

async function openGallery(key) {
    const data = projectData[key] || {};
    const images = await resolveGalleryImages(key);
    galleryTitle.textContent = (data.title) || key.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
    const details = data.desc ? `<p style="color: var(--text-secondary); margin: 0.5rem 0 1rem">${data.desc}</p>` : '';
    const content = images.length
        ? images.map(src => `<img src="${src}" alt="${key} preview">`).join('')
        : `<p style="color: var(--text-secondary);">No images found. Add files under <code>gallery/${key}/</code> or create <code>manifest.json</code>.</p>`;
    galleryImagesEl.innerHTML = details + content;
    galleryModal.hidden = false;
    galleryModal.style.display = 'flex';
}

function closeGallery() {
    galleryModal.hidden = true;
    galleryModal.style.display = 'none';
    galleryImagesEl.innerHTML = '';
}

document.querySelectorAll('.gallery-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const key = link.getAttribute('data-gallery');
        openGallery(key);
    });
});

// Open gallery when clicking on project card
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', () => {
        const key = card.getAttribute('data-project');
        if (key) openGallery(key);
    });

    // Hover preview inside card
    let hoverTimer;
    card.addEventListener('mouseenter', () => {
        hoverTimer = setTimeout(async () => {
            const key = card.getAttribute('data-project');
            const img = await getFirstImage(key);
            if (!img) return;
            const preview = document.createElement('div');
            preview.className = 'hover-preview';
            preview.style.position = 'absolute';
            preview.style.top = '12px';
            preview.style.right = '12px';
            preview.style.background = 'rgba(0,0,0,0.7)';
            preview.style.border = '1px solid var(--border-color)';
            preview.style.borderRadius = '10px';
            preview.style.overflow = 'hidden';
            preview.style.boxShadow = '0 10px 24px rgba(0,0,0,0.35)';
            preview.style.backdropFilter = 'blur(4px)';
            preview.innerHTML = `<img src="${img}" alt="preview" style="width:160px;height:100px;object-fit:cover;display:block">`;
            card.appendChild(preview);
        }, 180);
    });
    card.addEventListener('mouseleave', () => {
        clearTimeout(hoverTimer);
        const hp = card.querySelector('.hover-preview');
        if (hp) hp.remove();
    });
});

galleryCloseBtn.addEventListener('click', closeGallery);
galleryModal.addEventListener('click', (e) => {
    // Close when clicking outside the modal content
    if (!e.target.closest('.gallery-modal')) closeGallery();
});

// Close on Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !galleryModal.hidden) {
        closeGallery();
    }
});

// Timeline preview functionality
document.addEventListener('click', function(e) {
    // Handle more button click
    if (e.target.classList.contains('timeline-more-btn')) {
        const previewId = e.target.getAttribute('data-preview-id');
        const preview = document.getElementById(previewId);
        if (preview) {
            preview.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
        }
    }

    // Handle close button click
    if (e.target.classList.contains('timeline-preview-close') ||
        e.target.classList.contains('timeline-preview')) {
        document.querySelectorAll('.timeline-preview').forEach(preview => {
            preview.classList.remove('active');
        });
        document.body.style.overflow = ''; // Re-enable scrolling
    }
});

// Close preview when clicking outside content
document.querySelectorAll('.timeline-preview').forEach(preview => {
    preview.addEventListener('click', function(e) {
        if (e.target === this) {
            this.classList.remove('active');
            document.body.style.overflow = ''; // Re-enable scrolling
        }
    });
});

// Gallery Marquee Functionality
const marqueeTrack = document.getElementById('marqueeTrack');
const imgUpload = document.getElementById('imgUpload');
let uploadedImages = [];

// Handle image upload
if (imgUpload) {
    imgUpload.addEventListener('change', (e) => {
        const files = Array.from(e.target.files);

        files.forEach(file => {
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = function (ev) {
                    const img = document.createElement('img');
                    img.src = ev.target.result;
                    img.className = 'marquee-img';
                    img.alt = file.name;
                    img.title = file.name;

                    // Add to track
                    marqueeTrack.appendChild(img);
                    uploadedImages.push(img);

                    // Create duplicate for seamless scrolling
                    const imgDuplicate = img.cloneNode(true);
                    marqueeTrack.appendChild(imgDuplicate);

                    // Adjust animation speed based on number of images
                    updateMarqueeSpeed();
                };
                reader.readAsDataURL(file);
            }
        });

        // Clear input to allow re-uploading same files
        e.target.value = '';
    });
}

// Update marquee animation speed based on content
function updateMarqueeSpeed() {
    const totalImages = marqueeTrack.children.length;
    if (totalImages > 0) {
        // Slower animation for more images
        const duration = Math.max(15, 22 + (totalImages * 0.5));
        marqueeTrack.style.animationDuration = `${duration}s`;
    }
}

// Add drag and drop functionality
const galleryMarquee = document.querySelector('.gallery-marquee');
if (galleryMarquee) {
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        galleryMarquee.addEventListener(eventName, preventDefaults, false);
    });

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    ['dragenter', 'dragover'].forEach(eventName => {
        galleryMarquee.addEventListener(eventName, () => {
            galleryMarquee.style.background = 'var(--frost-bg)';
            galleryMarquee.style.border = '2px dashed var(--accent-color)';
        });
    });

    ['dragleave', 'drop'].forEach(eventName => {
        galleryMarquee.addEventListener(eventName, () => {
            galleryMarquee.style.background = '';
            galleryMarquee.style.border = '';
        });
    });

    galleryMarquee.addEventListener('drop', (e) => {
        const dt = e.dataTransfer;
        const files = dt.files;

        if (files.length > 0) {
            imgUpload.files = files;
            const event = new Event('change', { bubbles: true });
            imgUpload.dispatchEvent(event);
        }
    });
}

// Add some default images if none uploaded
if (marqueeTrack && marqueeTrack.children.length === 0) {
    const defaultImages = [
        'PFP.jpg',
        'PFP.jpg',
        'PFP.jpg',
        'PFP.jpg',
        'PFP.jpg'
    ];

    defaultImages.forEach((src, index) => {
        const img = document.createElement('img');
        img.src = src;
        img.className = 'marquee-img';
        img.alt = `Gallery image ${index + 1}`;
        img.title = `Gallery image ${index + 1}`;
        marqueeTrack.appendChild(img);

        // Create duplicate for seamless scrolling
        const imgDuplicate = img.cloneNode(true);
        marqueeTrack.appendChild(imgDuplicate);
    });
}
