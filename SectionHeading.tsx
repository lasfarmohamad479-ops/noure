@import url("https://fonts.googleapis.com/css2?family=Amiri:ital,wght@0,400;0,700;1,400&family=Amiri+Quran&family=Cairo:wght@300;400;500;600;700;800;900&family=Reem+Kufi:wght@400;500;600;700&family=Aref+Ruqaa:wght@400;700&display=swap");
@import "tailwindcss";

@theme {
  --color-night-950: #060f0b;
  --color-night-900: #0a1a13;
  --color-night-800: #0f2419;
  --color-night-700: #163325;
  --color-night-600: #1e4432;
  --color-emerald-glow: #2dd4a7;
  --color-gold-300: #eed9a4;
  --color-gold-400: #e2c275;
  --color-gold-500: #d4af37;
  --color-gold-600: #b8941f;
  --color-cream-100: #f6f1e2;
  --color-cream-300: #e8dfc8;
  --color-cream-500: #c9bfa4;

  --font-sans: "Cairo", ui-sans-serif, system-ui, sans-serif;
  --font-quran: "Amiri Quran", "Amiri", serif;
  --font-amiri: "Amiri", serif;
  --font-kufi: "Reem Kufi", sans-serif;
  --font-ruqaa: "Aref Ruqaa", serif;
}

html {
  scroll-behavior: smooth;
}

body {
  background-color: var(--color-night-950);
  color: var(--color-cream-100);
  font-family: var(--font-sans);
  overflow-x: hidden;
}

::selection {
  background: rgba(212, 175, 55, 0.35);
  color: #fff8e1;
}

/* ---------- Scrollbar ---------- */
::-webkit-scrollbar {
  width: 10px;
  height: 8px;
}
::-webkit-scrollbar-track {
  background: #0a1a13;
}
::-webkit-scrollbar-thumb {
  background: linear-gradient(180deg, #2dd4a7, #1e4432);
  border-radius: 8px;
}

/* ---------- Islamic geometric pattern background ---------- */
.pattern-bg {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Cg fill='none' stroke='%23d4af37' stroke-opacity='0.07'%3E%3Cpath d='M40 0l10 10H30z'/%3E%3Cpath d='M40 80l10-10H30z'/%3E%3Cpath d='M0 40l10-10v20z'/%3E%3Cpath d='M80 40l-10-10v20z'/%3E%3Crect x='20' y='20' width='40' height='40' transform='rotate(45 40 40)'/%3E%3Ccircle cx='40' cy='40' r='8'/%3E%3C/g%3E%3C/svg%3E");
}

.pattern-dense {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='56' viewBox='0 0 56 56'%3E%3Cg fill='none' stroke='%232dd4a7' stroke-opacity='0.06'%3E%3Cpath d='M28 2l7 7-7 7-7-7z'/%3E%3Cpath d='M2 28l7 7 7-7-7-7z'/%3E%3Cpath d='M54 28l-7 7-7-7 7-7z'/%3E%3Cpath d='M28 54l-7-7 7-7 7 7z'/%3E%3Ccircle cx='28' cy='28' r='10'/%3E%3C/g%3E%3C/svg%3E");
}

/* ---------- Glass cards ---------- */
.glass {
  background: linear-gradient(145deg, rgba(22, 51, 37, 0.55), rgba(10, 26, 19, 0.75));
  backdrop-filter: blur(14px);
  border: 1px solid rgba(212, 175, 55, 0.16);
}

.glass-strong {
  background: linear-gradient(160deg, rgba(30, 68, 50, 0.7), rgba(10, 26, 19, 0.9));
  backdrop-filter: blur(18px);
  border: 1px solid rgba(212, 175, 55, 0.25);
}

.gold-border {
  border: 1px solid rgba(212, 175, 55, 0.35);
}

.text-glow-gold {
  text-shadow: 0 0 24px rgba(212, 175, 55, 0.45), 0 0 60px rgba(212, 175, 55, 0.2);
}

.text-glow-emerald {
  text-shadow: 0 0 20px rgba(45, 212, 167, 0.5);
}

/* ---------- Gold gradient text ---------- */
.gold-text {
  background: linear-gradient(120deg, #f5e3ad 0%, #d4af37 45%, #a87f1a 70%, #eed9a4 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

/* ---------- Animated gradient border ---------- */
.luxury-frame {
  position: relative;
  border-radius: 1.25rem;
}
.luxury-frame::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  padding: 1px;
  background: linear-gradient(135deg, rgba(212, 175, 55, 0.6), rgba(45, 212, 167, 0.25), rgba(212, 175, 55, 0.15));
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
}

/* ---------- Mushaf frame ---------- */
.mushaf-frame {
  border: 2px solid rgba(212, 175, 55, 0.4);
  box-shadow:
    inset 0 0 0 1px rgba(212, 175, 55, 0.25),
    inset 0 0 40px rgba(212, 175, 55, 0.06),
    0 20px 60px rgba(0, 0, 0, 0.5);
  background:
    radial-gradient(ellipse at top, rgba(212, 175, 55, 0.05), transparent 60%),
    linear-gradient(160deg, #0d2016, #081510);
}

/* ---------- Tajweed color classes (quran.com markup) ---------- */
.tajweed-text .ham_wasl { color: #9aa5b1; }
.tajweed-text .slnt { color: #64748b; opacity: 0.55; font-size: 0.85em; }
.tajweed-text .madda_normal { color: #63b3ed; }
.tajweed-text .madda_permissible { color: #f6ad55; }
.tajweed-text .madda_necessary { color: #f56565; }
.tajweed-text .madda_obligatory { color: #fc8181; }
.tajweed-text .qalaqah { color: #ecc94b; }
.tajweed-text .ghunnah { color: #68d391; }
.tajweed-text .idgham_ghunnah { color: #4fd1c5; }
.tajweed-text .idgham_shafawi { color: #4fd1c5; }
.tajweed-text .idgham_wo_ghunnah { color: #b794f4; }
.tajweed-text .idgham_mutajanisayn { color: #d6bcfa; }
.tajweed-text .idgham_mutaqaribayn { color: #d6bcfa; }
.tajweed-text .ikhafa { color: #9ae6b4; }
.tajweed-text .ikhafa_shafawi { color: #9ae6b4; }
.tajweed-text .iqlab { color: #f687b3; }
.tajweed-text .laam_shamsiyah { color: #a0aec0; }
.tajweed-text .laam_qamariyah { color: #f6e05e; }
.tajweed-text .end {
  color: #d4af37;
  font-weight: 700;
}

/* plain (non-tajweed) verse number ornament */
.ayah-num {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 2.2rem;
  height: 2.2rem;
  margin: 0 0.35rem;
  color: var(--color-gold-400);
  font-family: var(--font-amiri);
  font-weight: 700;
  position: relative;
}

/* ---------- Keyframe animations ---------- */
@keyframes float-slow {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-14px); }
}
.animate-float-slow {
  animation: float-slow 7s ease-in-out infinite;
}

@keyframes pulse-soft {
  0%, 100% { opacity: 0.55; }
  50% { opacity: 1; }
}
.animate-pulse-soft {
  animation: pulse-soft 4s ease-in-out infinite;
}

@keyframes shimmer {
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
}
.animate-shimmer {
  background-size: 200% auto;
  animation: shimmer 5s linear infinite;
}

@keyframes spin-slow {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
.animate-spin-slow {
  animation: spin-slow 24s linear infinite;
}

@keyframes glow-ring {
  0%, 100% { box-shadow: 0 0 30px rgba(212, 175, 55, 0.25), 0 0 80px rgba(45, 212, 167, 0.12); }
  50% { box-shadow: 0 0 50px rgba(212, 175, 55, 0.45), 0 0 120px rgba(45, 212, 167, 0.25); }
}
.animate-glow-ring {
  animation: glow-ring 3.5s ease-in-out infinite;
}

/* ---------- Ornament divider ---------- */
.ornament-divider {
  display: flex;
  align-items: center;
  gap: 1rem;
}
.ornament-divider::before,
.ornament-divider::after {
  content: "";
  height: 1px;
  flex: 1;
  background: linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.5), transparent);
}

/* ---------- Inputs ---------- */
.input-lux {
  background: rgba(10, 26, 19, 0.7);
  border: 1px solid rgba(212, 175, 55, 0.25);
  border-radius: 0.9rem;
  padding: 0.7rem 1.1rem;
  color: var(--color-cream-100);
  outline: none;
  transition: all 0.25s ease;
  font-family: var(--font-sans);
}
.input-lux::placeholder {
  color: rgba(201, 191, 164, 0.5);
}
.input-lux:focus {
  border-color: rgba(45, 212, 167, 0.6);
  box-shadow: 0 0 0 3px rgba(45, 212, 167, 0.12);
}

select.input-lux option {
  background: #0a1a13;
  color: #f6f1e2;
}

/* ---------- Amiri Quran font helpers ---------- */
.font-quran {
  font-family: var(--font-quran);
}
.font-amiri {
  font-family: var(--font-amiri);
}
.font-kufi {
  font-family: var(--font-kufi);
}
.font-ruqaa {
  font-family: var(--font-ruqaa);
}
