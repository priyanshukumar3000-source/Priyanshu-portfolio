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
- P0: Replace placeholder social links/email in portfolio.ts with real ones; real hackathon entries; real project demo/case-study URLs
- P1: Project case-study detail pages; resume/CV download
- P2: BGM ambient loop option; blog/guestbook; WebGL shader hero variant; i18n (JP accents)
