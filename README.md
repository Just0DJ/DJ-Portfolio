# 🌐 DiJay's Portfolio Website

> A modern, minimal, and responsive portfolio built to represent my journey as a **Mechanical Engineer**, **Designer**, and **Tech Enthusiast**.
> Designed and coded by **Diwaakar Jayaprakash (DJ)**. Live at **[dijay.netlify.app](https://dijay.netlify.app/)** (legacy deploy) — this repo now builds with Astro for Freebuff-managed hosting.

---

## 🏗️ Architecture (2026 modernization)

The original site was a single 2,000-line `Index.html`. It is now an **Astro + TypeScript** static site with content collections — no CMS, no backend, no client framework.

```
src/
├── assets/                  # Optimized at build time via astro:assets (WebP, responsive)
├── components/              # Intro, Navbar, Hero, Skills, Projects, Experience,
│                            # Achievements, Contact, Modal
├── content/
│   ├── projects/*.md        # Case studies — add a project by adding a markdown file
│   └── experiences/*.md     # Work experience entries
├── data/content.ts          # Skills, achievements, site metadata, accent palette
├── layouts/BaseLayout.astro # SEO meta, canonical URLs, theme pre-hydration
├── pages/
│   ├── index.astro          # One-page portfolio
│   └── projects/[slug].astro# Dedicated, independently routable case-study pages
├── scripts/                 # site.ts (theme/intro/scroll), modal.ts (native <dialog>)
└── styles/global.css        # Design tokens & all styling
public/logos/                 # Tech-stack icons
```

**Key properties**

- Adding a project = adding one markdown file to `src/content/projects/` (frontmatter + body). It automatically appears in the marquee, modal, sitemap, and gets its own `/projects/<slug>/` case-study page.
- All images flow through `astro:assets` (sharp): automatic WebP, responsive `srcset`, hashed immutable URLs.
- The universal modal uses the native `<dialog>` element (focus trapping + Escape handling for free) with `data-modal-id`/`data-modal-type` triggers.
- Design tokens live in `src/styles/global.css`; dark/light theme, accent-color rotation, intro animation, and marquee behavior are ported 1:1 from the original.
- The original page is preserved under `legacy/index.html`.

## 🧞 Commands

| Command | Action |
| --- | --- |
| `bun install` | Install dependencies |
| `bun run dev` | Local dev server (binds `0.0.0.0`, honors `$PORT`) |
| `bun run build` | Production build to `dist/` |
| `bun run preview` | Preview the production build (honors `$PORT`) |
| `bun run serve` | Static file server for `dist/` (used by Freebuff preview) |
| `bun run check` | `astro check` + `tsc --noEmit` |
| `sh ./scripts/validate-dist.sh` | Validate that all internal links/assets in `dist/` resolve |

## 🚀 CI / Deployment

- **CI** (`.github/workflows/ci.yml`): install → typecheck → build → link/asset validation on every push/PR.
- **Hosting**: Freebuff-managed (install `bun install`, build `bun run build`, static output in `dist/`). Netlify's legacy deploy remains pointed at the pre-migration site.
- Sitemap generated at `/sitemap-index.xml`.

---

## 🧑‍🔧 About Me

🎓 **B.Tech Mechanical Engineering** student at *IIITDM Kancheepuram* (2023–Present).
🔩 Passionate about **CAD Design**, **Robotics**, **Simulation**, and **Data-driven Engineering**.

📍 Based in **Abu Dhabi, UAE**
📧 **[diwaakarjayaprakash@gmail.com](mailto:diwaakarjayaprakash@gmail.com)**
🔗 [LinkedIn](https://linkedin.com/in/IamDiJay) · [GitHub](https://github.com/Just0DJ) · [Instagram](https://instagram.com/dijay__)

## 🧰 Technical Toolbox

| Domain | Tools & Skills |
|--------|----------------|
| 🧠 Design & CAD | SolidWorks (Motion Analysis), Fusion 360, OnShape, AutoCAD |
| ⚙️ Simulation | Basic FEA, CFD |
| 💻 Programming | Python, MATLAB, MySQL, C++ |
| 🔩 Core Engineering | Machine Design, Kinematics, Material Selection |
| 🏭 Manufacturing | CNC Machining, 3D Printing, Laser Cutting |
| 📑 Documentation | Canva, MS PowerPoint, Google Sheets |

## 🚀 Featured Projects

### 🔬 **Science Cache System – MaRS Rover Society**
- Designed a modular system for sample storage and retrieval.
- Created CAD models using Fusion 360 and OnShape; fabricated for IRC 2025.

### 🤖 **Mini Rover – Chassis Design**
- Designed and simulated rover chassis with SolidWorks (motion & structural).

### 🌍 **IRC 2025 – Science Cache System**
- Led cache integration for competition using CAD and rapid prototyping.

## 💼 Experience

### 🧩 **Tech Mahindra – ASML Semiconductor Dept. Intern**
📍 Bangalore, India | *May–Jul 2025*

### ⚡ **Assistant – EV Safety & Battery Systems**
📍 *Mar–Apr 2025*

### 🚀 **Mechanical Team Member – MaRS Rover Society**
📍 *Mar 2024 – Present* — ERC 2025 (4th globally), IRC 2025 (16th globally)

## 🏆 Achievements

- 🥇 **European Rover Challenge (ERC 2025)** – Ranked **4th globally**
- 🥈 **International Rover Challenge (IRC 2025)** – Ranked **16th globally**

## 💬 Connect With Me

[![LinkedIn](https://img.shields.io/badge/LinkedIn-IamDiJay-blue?logo=linkedin)](https://linkedin.com/in/IamDiJay)
[![Email](https://img.shields.io/badge/Email-DiwaakarJayaprakash%40gmail.com-red?logo=gmail)](mailto:diwaakarjayaprakash@gmail.com)
[![Portfolio](https://img.shields.io/badge/Portfolio-dijay.netlify.app-black?logo=netlify)](https://dijay.netlify.app)
[![Instagram](https://img.shields.io/badge/Instagram-@dijay__-pink?logo=instagram)](https://instagram.com/dijay__)

> “Engineering isn’t just about building machines — it’s about building possibilities.”
> — *Diwaakar Jayaprakash*
