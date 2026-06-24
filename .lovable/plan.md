
# Elite Portfolio Overhaul — Apple Dark Mode

Shift the portfolio from the current warm ceramic theme to an ultra-premium OLED dark aesthetic, while keeping all copy, data, routes, and the Vite/React/Three stack intact. Many primitives (CustomCursor, Magnetic, ProjectCard 3D tilt, ScrollReveal, ParticleField, HeroObject) already exist — this plan re-skins and amplifies them rather than rebuilding.

## 1. Global Aesthetic — Apple Dark

Rewrite design tokens in `src/index.css` and `tailwind.config.ts`:

- `--background`: near-black `#08090B` (not pure black — keeps depth)
- `--foreground`: `#F5F5F7` (Apple SF white)
- `--muted-foreground`: cool gray `#86868B`
- `--primary` (accent): neon blue `#0A84FF`
- `--border`: `hsla(0,0%,100%,0.08)` titanium hairline
- Glass surface token: `bg-white/[0.04] backdrop-blur-xl` with inner highlight via `box-shadow: inset 0 1px 0 rgba(255,255,255,0.06)`
- Typography: keep current sans, tighten tracking on display headings (`-0.04em`), introduce SF-like weight ramp (400 body / 500 UI / 600 display)
- Grain overlay: drop opacity, switch to cool tint so it reads as sensor noise, not paper
- Update `GrainOverlay`, `Navbar`, `AboutBento`, `Certifications`, `ContactForm`, `ExperienceTimeline`, `Marquee` glass surfaces to the new tokens (no hardcoded colors — only tokens)

## 2. Hero — Fluid Mesh + Reactive Geometry

- Replace the warm `GlassTorus` material with a chromatic dark-glass shader: `transmission 0.95`, `ior 1.6`, subtle `iridescence 0.4`, env tint cool blue. Keep the existing torus float; add a second smaller floating shape (icosahedron) offset behind for depth.
- Add a fullscreen `GradientMesh` behind hero: animated radial gradients (deep blue → violet → black) that follow pointer with a lerped offset. Implemented as a single GPU-friendly `<canvas>` shader or layered `radial-gradient`s on motion values to keep perf high.
- Stagger hero copy reveal: split headline into words/chars, animate `opacity 0→1`, `y 24→0`, `filter blur(12px)→blur(0)` with `0.06s` stagger and `cubic-bezier(0.22,1,0.36,1)`.

## 3. Cursor + Magnetic Micro-Interactions

- `CustomCursor`: keep the rAF architecture; add a soft glow layer (radial `#0A84FF` at 18% opacity, 80px blur) that trails the dot with heavier lerp (0.08) for the "Apple pointer" feel. Ring stays crisp white at 1.5px.
- Audit `Navbar` links, hero CTAs, contact buttons, and resume button — wrap any not already in `<Magnetic>` (strength 0.25 for text links, 0.4 for buttons).

## 4. Project Cards — Glass + Glare

`ProjectCard` already has 3D tilt and a radial glow. Upgrade:

- Swap card surface to dark glass token; add 1px inner top highlight.
- Add a moving glare: a thin diagonal white gradient strip (`mix-blend-overlay`, opacity 0.08) whose position tracks `state.x` — sweeps across as the cursor moves.
- Slightly increase tilt to `12deg` max; clamp on small screens.
- Update `DashboardVisual` / `VisionVisual` palettes to cool grays + blue accent so they sit in the dark theme.

## 5. Scroll Reveals

`ScrollReveal` exists. Wrap any sections still rendering bare (Certifications row, Marquee band, Contact block) so every major band floats up with the same spring. Add a section-level parallax: headings drift up ~20px slower than their body via `useScroll` + `useTransform`, capped so layout never feels loose.

## 6. Performance Guardrails

- All transforms via `transform` / `opacity` only; keep `will-change` hints where present.
- Cap `dpr` on Three canvases at `[1, 1.5]` (already set).
- Respect `prefers-reduced-motion`: hero stagger, parallax, and mesh animation collapse to static fades.
- Verify no layout shift on glass surfaces (backdrop-filter fallback color).

## Files to touch

```text
src/index.css                       tokens + glass utility
tailwind.config.ts                  color/shadow tokens
src/components/CustomCursor.tsx     add glow layer
src/components/HeroObject.tsx       dark glass material + 2nd shape
src/components/HeroGradientMesh.tsx NEW — reactive background
src/components/ProjectCard.tsx      glare + dark glass
src/components/AboutBento.tsx       glass token swap
src/components/Certifications.tsx   glass token swap
src/components/ContactForm.tsx      glass token swap
src/components/ExperienceTimeline.tsx  glass token swap
src/components/Navbar.tsx           glass + magnetic audit
src/components/GrainOverlay.tsx     cool tint, lower opacity
src/components/Marquee.tsx          dark surface
src/pages/Index.tsx                 mount mesh, wrap sections in ScrollReveal, hero stagger
```

## Out of scope

- No copy, data, or routing changes.
- No new dependencies (everything ships on existing framer-motion + three + drei).
- Memory note `style/aesthetic-direction` (warm ceramic, no black) will be superseded by this explicit user request — I'll update it after you approve.

Approve and I'll ship it end-to-end.
