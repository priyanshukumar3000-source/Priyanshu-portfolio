# Weapon Interactions Regression Notes (manual/Playwright)

Site: REACT_APP_BACKEND_URL (public portfolio)

## Katana Slash (Desktop >=768px)
1. Wait ~7s for loading screen; click nav-link-about; wait ~4s (2s katana drop + settle).
2. At 1440x900 or 1920x800, the `[data-testid="about-katana-slash-button"]` midpoint is inside the viewport after About navigation (roughly y733/y722 respectively). Get bounding_box(); verify elementFromPoint at its midpoint is the button; use a real page.mouse.click(cx,cy) without scrolling farther. The hint must be horizontal, fully legible beneath the blade, and unclipped by cards.
3. Expect: `[data-testid="about-katana-slash"]` count == 1, button data-state="slashing", visible violet/cyan 210° arc (screenshot). After ~900ms SVG removed, state="ready".
4. Keyboard: focus button, Enter or Space → slash fires. aria-label = "Slash with the About katana".
5. Rapid clicks: only 1 SVG active during 900ms cooldown.
6. After 900ms, another click succeeds.
7. portfolio-content getAnimations() returns count>=1 during 90–350 ms after click (WAAPI translate shake).
8. Click on portrait/nav/cards → no slash.
9. Scroll away/back → no residual translate/transform on portfolio-content.

## Skills Star Trail (Desktop)
1. Nav to skills; wait 3s.
2. `[data-testid="skills-star-trail-scene"]` present, data-trail="active".
3. Screenshot shows a tapered violet/cyan ribbon connected to orbiting star.
4. Scroll to top → data-trail="paused".
5. Nav back to skills → data-trail="active".

## Mobile (<768px)
1. Resize viewport to 390x844; katana button and star-trail-scene NOT mounted.
2. Resize back to desktop → both remount.

## Reduced Motion (prefers-reduced-motion: reduce)
1. Slash SVG must NOT render on click.
2. portfolio-content must NOT run the shake WAAPI animation.
3. Skills scene data-trail must be "reduced-motion" (no trail geometry).
4. Katana button still fires (gentle aura pulse only).
