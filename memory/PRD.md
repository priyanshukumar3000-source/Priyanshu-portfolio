# PRD — Priyanshu Kumar Cyber-Anime Portfolio

## Original problem statement
Premium, highly interactive 3D personal portfolio presenting Priyanshu Kumar as Full-Stack Web Developer, UI/UX Designer & Creative Technologist. Aesthetic: high-end futuristic anime game interface — deep purple + black, neon purple highlights, glassmorphism, 3D depth, cinematic animations. Sections: 3D hero with original anime character + "I Design. I Build. I Evolve.", About with animated stats, 3D skill constellation, Designer showcase ("Designing Before I Develop."), Projects ("Things I've Built" — HealthGuard, Huguen), Hackathons ("Built Under Pressure."), Journey timeline (Learn → Design → Build → Compete → Improve → Evolve), interactive "My Developer Mode" terminal, cinematic Contact, floating glass navbar, anime loading screen, optional sound (off by default), fully responsive, award-worthy craft.

## Architecture
- Frontend: Vite + React 19 + TS strict, Tailwind v4, motion (framer), lenis smooth scroll, three/@react-three/fiber 3D hero scene (particles, floating wireframe shapes, glow rings, mouse-parallax rig; desktop-only, CSS fallback on mobile).
- Backend: FastAPI + motor/MongoDB. `POST/GET /api/contact` (ContactMessage, uuid ids, aware-UTC timestamps).
- Content: ALL editable content lives in `frontend/src/data/portfolio.ts` (projects, skills, socials, hackathons, journey, terminal commands). Add a project = append to PROJECTS array.
- Images: AI-generated original anime character + project/design art (Emergent static CDN); user's photos in About.

## User personas
- Recruiter: quick proof of skill → hero, projects, terminal "sudo hire"
- Client: design credibility → designer showcase, case studies, contact form
- Hackathon judge: pressure-tested builds → hackathon mission cards

## Implemented (2026-09-14)
- Anime loading screen (boot logs, DESIGN→CODE→CREATE→EVOLVE progress, WELCOME TO MY WORLD, skip)
- Floating glass navbar: active-section pill, sound toggle (WebAudio, off by default), mobile menu
- Cinematic hero: masked line-by-line headline reveal, R3F particle/shape/ring scene with mouse parallax, mouse-reactive character card, floating code HUD chips
- Editorial marquee, About with animated counters + tilt photos, skill constellation with animated charge bars, designer 3D gallery, project showcase (HealthGuard + Huguen) with problem/solution/tech/links, hackathon mission cards with XP bars, scroll-driven journey timeline, interactive terminal (help/whoami/skills/mission/projects/contact/sudo hire/clear), contact form wired to MongoDB, footer, SEO/OG meta
- Verified: typecheck clean, API smoke (POST persists, GET lists, 422 negative), full browser pass incl. mobile 390px

## Backlog
- P0: Real hackathon event names/results (3 confirmed); real project demo/case-study URLs
- P1: Project case-study detail pages; resume/CV download; Instagram link if wanted
- P2: BGM ambient loop option; blog/guestbook; WebGL shader hero variant; i18n (JP accents)

## Iteration log
- 2026-09-14 (v2): Real identity wired (email, GitHub, LinkedIn, B.Tech CSE bio, 2 internships, 3 hackathons). Shinobi FX pack: 3D spinning shuriken + pulsing energy orbs in hero scene, site-wide rising ember canvas, custom neon cursor with spring ring, kanji watermarks per section (忍技美創闘道端絆), spinning shuriken dividers, new `experience` terminal command. Typecheck + browser pass clean.
- 2026-09-14 (v4): Solid metallic 3D ninja star (4 curved blades, beveled extrude, fast spin + hover bob) and procedural 3D katana (steel blade with glowing violet edge, tsuba guard, wrapped tsuka, quickdraw slide every 7s, slow diagonal flourish) added to hero WebGL scene; both inherit mouse-parallax rig. Desktop-only with the rest of the 3D scene.
- 2026-09-14 (v3): Sakura Storm easter egg — Konami code (↑↑↓↓←→←→BA) or 5 rapid logo clicks unleashes full-screen cherry-blossom petal canvas (ESC/30s disperses). Hero character swapped from generated art to user's neon blazer photo. Brand renamed PK://EVOLVEX. Skills recalibrated (frontend/design strong, backend honest ~55-68). GitHub corrected to priyanshukumar3000-source. Hackathons = real 4 (SIH, AISPIRE UP, STC, United Group). HealthGuard → HealthGuard Rural with live demo https://healthguard-rural.vercel.app + real feature set (AI triage, PHC token queues, teleconsult, EN/HI, low-data). Projects carry TOP-RATED chip. Verified via keyboard-driven browser pass incl. Konami trigger + ESC dismiss.
