# Stinson Tina Migration Guide

## Objective
Build and maintain a homepage-first Tina CMS implementation in this repo that visually and structurally matches the Stinson source site while keeping all homepage content fully editable in Tina JSON.

## Canonical Paths
- Source repo (reference): `/Users/minig/CMS/ai-template-stinson-demo`
- Destination repo (implementation): `/Users/minig/CMS/tina-barebones-starter`

## Scope (Phase 1)
- Homepage (`/`) only.
- Keep non-home MDX routes functional and unchanged unless required for build stability.
- Integrations are UI-only (no live scheduler/form backend).

## Data Ownership
- Homepage JSON: `/Users/minig/CMS/tina-barebones-starter/content/landing/home.json`
- Global JSON: `/Users/minig/CMS/tina-barebones-starter/content/site/global.json`
- Tina homepage collection: `/Users/minig/CMS/tina-barebones-starter/tina/collections/landing-page.js`
- Tina global collection: `/Users/minig/CMS/tina-barebones-starter/tina/collections/site-global.js`
- No freeform blob sections. All visible text/content must map to explicit fields.

## Styling and Component Rules
- BEM naming is required.
- Each homepage section must own its own `.module.sass` file.
- Use local assets only under `/Users/minig/CMS/tina-barebones-starter/public/uploads/stinson/home/`.
- Prefer semantic HTML and accessible interactions (`aria-*`, keyboard operation, `:focus-visible`).
- Use explicit transitions (no `transition: all`) and respect `prefers-reduced-motion`.
- Use `next/image` for section images with stable layout sizing.

## CSS Modules Naming Convention
- Both of these are acceptable:
  - Kebab-case block names (example: `.site-footer`, accessed as `styles["site-footer"]`).
  - CamelCase block names (example: `.siteFooter`, accessed as `styles.siteFooter`).
- Preferred for new/updated files in this repo: camelCase BEM block names to reduce bracket access noise in TSX.

## Rendering Architecture
- Home route loads Tina data server-first with parallel queries (`Promise.all`) and falls back safely when Tina query fails.
- Keep client boundaries minimal:
  - Tina bridge (`useTina`) page.
  - Interactive sections/components only.
- Route handling for non-home pages must remain stable.

## Homepage Section Mapping
- `hero-0`
- `block_text_fh-1`
- `multi_item_row-2`
- `image_text-3`
- `block_masonary_grid-4`
- `multi_item_testimonial-5`
- `multi_use_banner-6`
- `multi_use_banner-7`

## Definition Of Done (Global)
1. `corepack pnpm lint` passes.
2. `corepack pnpm build-local` passes.
3. Tina sidebar loads and edits homepage/global JSON successfully.
4. Homepage renders local assets (no source hotlinks for migrated media).
5. Desktop + mobile layouts are visually aligned with source intent.
6. Keyboard nav and focus states work for header, links, buttons, slider controls.

## Definition Of Done (Per Section)
For each section ID above:
1. Copy parity: text, headings, CTA labels, and ordering match source.
2. Layout parity: spacing, alignment, and breakpoints are close to source.
3. Visual parity: color, typography scale, and icon/image treatment are close to source.
4. Edit parity: all user-visible content is editable in Tina fields.
5. Accessibility parity: valid heading hierarchy, alt/aria labels, keyboard access.

## Implementation Workflow
1. Inspect source section in `/Users/minig/CMS/ai-template-stinson-demo`.
2. Map section to Tina JSON shape in `home.json`.
3. Update TSX + section `.module.sass` in destination repo.
4. Verify at desktop and mobile widths.
5. Run lint/build checks before moving to next section.

## Regression Guardrails
- Do not remove or break existing non-home routes.
- Do not revert unrelated workspace changes unless explicitly requested.
- Keep homepage schema backward-compatible with current `home.json` and `global.json` content.

## Known Environment Notes
- `next build` may print lockfile SWC patch warnings in this environment; treat as non-blocking if build exits `0`.
- Keep `.playwright-cli/` artifacts out of implementation logic.

## Working Notes
- If source behavior and current implementation conflict, prefer source parity unless it breaks Tina editability or accessibility.
- Keep changes incremental and run checks after major style/layout updates.
