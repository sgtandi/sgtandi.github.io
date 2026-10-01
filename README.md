# Andi Naufal's Portfolio Website

A premium, minimalist single-page portfolio website designed to showcase your unique profile: bridging the gap between a **Computer Science degree** (IT background) and **UI/UX Research & Design**, culminating in your current journey as an **iOS Developer Student** at the **Apple Developer Academy Bali**.

---

## 🚀 How to Run the Website

Since this is a static website built with native web technologies (HTML, CSS, and Vanilla JavaScript), there are no build steps, node packages to install, or compile processes. You can run it in a few different ways:

### Method 1: Direct Local Open (Simplest)
1. Open your file finder (macOS Finder).
2. Navigate to this directory: `/Users/andinaufal/Desktop/ANTIGRAVITY IDE EXPORTS/Portfolio Website`
3. Double-click the **`index.html`** file.
4. It will open instantly in your default web browser (Safari, Chrome, Arc, etc.).

### Method 2: Python HTTP Server (Recommended for development)
If you want to run it on a local server (enabling full protocol testing and avoiding CORS-like restrictions for local files), use the terminal:
1. Open your Terminal app on macOS.
2. Run this command:
   ```bash
   cd "/Users/andinaufal/Desktop/ANTIGRAVITY IDE EXPORTS/Portfolio Website" && python3 -m http.server 8000
   ```
3. Open your browser and go to: `http://localhost:8000`

### Method 3: Visual Studio Code "Live Server" Extension
If you use VS Code:
1. Open this workspace in VS Code.
2. Install the **Live Server** extension by Ritwick Dey.
3. Click the **Go Live** button at the bottom-right corner of the editor window.

### Method 4: Node.js Static Server (`npx`)
If you have Node.js installed, you can launch a quick development server by running:
```bash
npx serve
```

---

## 📁 File Structure

The project maintains a lightweight and modular structure:

```text
├── index.html   # HTML5 structure, semantic sections, and SEO tags
├── style.css    # Premium dark theme design system, layout, and animations
├── script.js    # Scroll animations, menu toggle, and email clipboard utility
└── README.md    # Documentation (This file)
```

---

## 💎 Design System & Features

- **Colors & Theme**: A premium, minimalist light theme utilizing pure white backgrounds (`#FFFFFF`) paired with solid black text, structured border lines, and clean color accents (Apple Blue, Bali Coral, Mint Green). No background gradients or background ambient glows are used, maintaining a modern print-like aesthetic.
- **Typography**: Uses modern, premium Google Fonts (`Plus Jakarta Sans` for headers, `Inter` for body text) ensuring maximum legibility and style.
- **Scroll Reveals**: An Intersection Observer runs in JavaScript to trigger smooth slide/fade-in animations on sections, cards, and timeline entries as you scroll.
- **Dynamic Elements**:
  - A beautiful circular profile picture at the top of the Hero section in full color with zoom hover effects.
  - A pulsing green status dot indicating your active status at the Apple Developer Academy Bali.
  - Interactive "Get in Touch" copy-to-clipboard button that displays a custom toast tooltip (`Copied!`).
  - Active navigation links that automatically underline as you scroll into corresponding sections.
  - Fully responsive drawer navigation menu for mobile devices.

---

## 🛠 How to Customize

### 1. Updating Projects
In `index.html`, find the `<section id="projects">` element. You can add more cards using the following layout:
```html
<div class="project-card">
    <div class="project-visual bg-cpp">
        <!-- Optional visual mock, terminal look, or image -->
    </div>
    <div class="project-info">
        <span class="project-meta">Date • Category</span>
        <h3>Project Title</h3>
        <p class="project-text">Description of your project...</p>
        <div class="project-tags">
            <span class="tag">Swift</span>
            <span class="tag">SwiftUI</span>
        </div>
        <a href="https://github.com/..." target="_blank" class="project-link">View Source Code</a>
    </div>
</div>
```

### 2. Modifying Work History
In `index.html`, find the `<section id="experience">` element. Add or edit `<div class="timeline-item">` containers inside the `<div class="timeline">` wrapper to update your career history.
