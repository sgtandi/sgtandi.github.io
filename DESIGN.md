# DESIGN.md: Andi Naufal portfolio

Direction from the owner (Nov 2026): laid out like a printed portfolio the owner shared. Three
boards: a justified uppercase cover, an about page with a polaroid, and a ruled contents table.

## Rules

- **Colour:** pure white `#ffffff` (never off-white or cream, even where the reference is grey paper), near-black `#161616` text, grey `#6b6b6b` for secondary text, `#bdbdbd` rules. The portrait and work keep their own colour.
- **Type:** Inter Tight, 400, 500 and 600. The cover is large uppercase 400 with each line justified edge to edge (`.jl`); "2026 Portfolio" is centred. Section headings are 14px 600, sentence case. Body is 13px; lists are 11px.
- **Boards:** each home section (`.board`) is at least one screen tall on desktop, with wide side margins (`--side`).
- **About:** three columns. The portrait sits in a polaroid (white border, thicker at the bottom, soft shadow), with the name and contacts under it; then About me, Education and Experience; then Skills and Tools.
- **Contents:** a running head ("Andi Naufal | Portfolio" / "Contents"), then a table in the lower right: number, project in bold uppercase, and sub-items "01.1 / The brief" that link into the case studies, each on its own grey rule.
- **Case studies:** the same running head and type; the title uses the cover style.

## Files

- `styles.css` is the only stylesheet, shared by the home page and `work/*.html`.
- `script.js` runs the clock and the click-to-enlarge on case-study images.
