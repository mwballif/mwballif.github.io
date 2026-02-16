# Mitchell Ballif's Portfolio

A personal site built with [Hugo](https://gohugo.io/). Handcoded styling with vanilla CSS. Deploys to GitHub Pages via GitHub Actions.

## Design

- **Colors:** Dark gray text (`rgb(39, 39, 39)`), blue links (`rgb(26, 13, 171)`), white background
- **Font:** Fragment Mono (Google Fonts)
- **Layout:** Left-aligned, single column, ~800px max width

## Adding a Blog Post

1. Create a new post from the blog archetype:
   ```bash
   hugo new blog/my-new-post.md
   ```
2. Edit `content/blog/my-new-post.md`: set `title`, `date`, and write the body in Markdown.
3. Optional: add a TL;DR in a `<div class="tldr">...</div>` at the top.
4. Build and deploy (see below), or push to `main` to trigger the GitHub Action.

## Adding a Code Project

Edit `data/projects.json` and add an entry:

```json
{ "date": "2026 Feb 16", "title": "Project Name", "url": "https://github.com/username/repo" }
```

## Local Build

1. Install [Hugo](https://gohugo.io/installation/) (extended not required).
2. From the repo root:
   ```bash
   hugo server
   ```
   Then open http://localhost:1313.
3. To build the site for production:
   ```bash
   hugo --minify
   ```
   Output is in `public/`.

## Deploy to GitHub Pages

- **Automatic:** Pushing to `main` runs the GitHub Action (`.github/workflows/hugo.yml`), which builds Hugo and deploys the `public/` artifact to GitHub Pages.
  - In your repo: **Settings → Pages → Build and deployment**: set Source to **GitHub Actions**.
- **Manual:** Run `hugo --minify`, then copy the contents of `public/` to the branch or location your Pages site uses (if you are not using the Actions deploy).

## Repository Structure

```
├── archetypes/
│   └── blog.md              # Template for new posts
├── content/
│   ├── _index.md
│   ├── blog/                # Blog posts (Markdown)
│   ├── code.md              # Code page (projects from data/projects.json)
│   └── research.md           # Research page
├── data/
│   └── projects.json        # Code page project list
├── layouts/                  # Hugo templates (base, list, single, partials)
├── static/                   # Assets (copied to site root when building)
│   ├── css/
│   │   ├── styles.css       # Main styles — edit here
│   │   └── post-styles.css  # Post-specific styles
│   ├── favicon.svg
│   ├── L1380479-2 2.jpeg    # Profile image
│   └── Ballif - April- Resume.pdf
├── hugo.toml
├── package.json             # npm start → hugo server, npm run build → hugo --minify
└── .github/workflows/
    └── hugo.yml             # Deploy to GitHub Pages
```

## About

I'm an undergraduate at Brigham Young University studying Economics and Mathematics. Research interests: labor economics, financial economics, and machine learning.
