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
- P0: No blockers for the requested weapon interactions. Huguen demo/case-study URLs remain placeholders pending real links; actual hackathon ranks/results need owner confirmation (four event names already populated).
- P1: Project case-study detail pages; resume/CV download; broader mobile performance audit of existing Sakura Storm/WeaponRain effects.
- P2: Site-wide accessibility review (new weapon controls already support keyboard and reduced motion); BGM ambient loop option; blog/guestbook; WebGL shader hero variant; i18n (JP accents); Instagram link if wanted.
- SEO/Open Graph metadata and a working navbar sound toggle are ALREADY implemented, verified in source during this continuation. Do not rebuild them based on the stale handoff summary.

## Latest request — weapon interactions (2026-07)
- User: "Slash On Click: Let visitors click the About katana to trigger a full slash arc with a screen shake" and "Star Trails: Add a fading comet trail behind the orbiting ninja star in Skills".
- Completed: native keyboard-accessible, screen-projected katana hit target; 210-degree luminous slash SVG above the portrait, physical katana swing, 260ms decaying content shake, 900ms repeat-click cooldown, replay and cleanup. A horizontal click hint sits below the blade; portrait now top-aligns with intro so the katana is reachable after About navigation.
- Completed: connected world-space violet/cyan comet ribbon behind Skills' orbiting star. Fixed 64-sample history, 2.1s fading lifetime, tapered width, smooth scroll-linked orbit, offscreen pausing and history reset. Uses existing WebGL canvas, no new service or integration.
- Accessibility/performance: native matchMedia subscriptions respond to reduced-motion and viewport changes live. Reduced motion replaces slash/shake with a gentle aura pulse and makes Skills' star static without a moving trail. Both enhanced weapon scenes unmount below 768px, preserving the existing desktop-only policy.
- Architecture additions: `components/three/KatanaSlash.tsx` owns portalled SVG and cancellable content shake; `components/three/StarTrail.tsx` owns bounded ribbon geometry. `WeaponRain.tsx` owns interaction/media state; Skills provides viewport visibility; Home main has `portfolio-content` test ID. No backend or authentication changes.
- Testing: `yarn run tsc -b --noEmit` passes; lint has zero errors (four pre-existing warnings). Frontend testing reports `/app/test_reports/iteration_1.json` and `/app/test_reports/iteration_2.json`: all three issues from first pass fixed; final pass reports 100%, no outstanding UI bugs. Verified real blade clicks at 1440x900 and 1920x800, visible arc, shake/cooldown/cleanup, keyboard, trail, mobile gating and dynamic reduced-motion changes including mid-slash cancellation.
- User verification pending: click the About katana and scroll through Skills in desktop preview. No mocked behavior was introduced. Next optional enhancements: a slash whoosh respecting the existing mute toggle; richer project stories; resume download once a PDF is supplied.

## Iteration log
- 2026-09-14 (v2): Real identity wired (email, GitHub, LinkedIn, B.Tech CSE bio, 2 internships, 3 hackathons). Shinobi FX pack: 3D spinning shuriken + pulsing energy orbs in hero scene, site-wide rising ember canvas, custom neon cursor with spring ring, kanji watermarks per section (忍技美創闘道端絆), spinning shuriken dividers, new `experience` terminal command. Typecheck + browser pass clean.
- 2026-09-14 (v6): Weapon FX pack — (1) impact flash: expanding additive shockwave ring + 16-particle dust burst with gravity at each weapon's landing moment; (2) katana hover-ignite: cursor proximity (screen-projected, <180px) flares aura sprites + point light ~2.7x; (3) OrbitStarScene in Skills: ninja star on scroll-linked elliptical orbit flying over the cards (z-20, depth-scaled, aura sprite); (4) Storm Steel: 9 2D katanas (blade gradient, edge glow, guard, wrapped handle) rain with petals during Sakura Storm. All verified via browser passes incl. Konami trigger.
- 2026-09-14 (v5): Scroll-triggered WeaponRain scene in About — 3 ninja stars + katana drop from above with bounce easing when the section enters view (re-drops on re-entry), framing the portrait; katana carries a pulsing additive-blend violet aura (2 sprites + point light). Desktop-only canvas around portrait. Verified mid-drop and landed via browser pass.
- 2026-09-14 (v4): Solid metallic 3D ninja star (4 curved blades, beveled extrude, fast spin + hover bob) and procedural 3D katana (steel blade with glowing violet edge, tsuba guard, wrapped tsuka, quickdraw slide every 7s, slow diagonal flourish) added to hero WebGL scene; both inherit mouse-parallax rig. Desktop-only with the rest of the 3D scene.
- 2026-09-14 (v3): Sakura Storm easter egg — Konami code (↑↑↓↓←→←→BA) or 5 rapid logo clicks unleashes full-screen cherry-blossom petal canvas (ESC/30s disperses). Hero character swapped from generated art to user's neon blazer photo. Brand renamed PK://EVOLVEX. Skills recalibrated (frontend/design strong, backend honest ~55-68). GitHub corrected to priyanshukumar3000-source. Hackathons = real 4 (SIH, AISPIRE UP, STC, United Group). HealthGuard → HealthGuard Rural with live demo https://healthguard-rural.vercel.app + real feature set (AI triage, PHC token queues, teleconsult, EN/HI, low-data). Projects carry TOP-RATED chip. Verified via keyboard-driven browser pass incl. Konami trigger + ESC dismiss.
