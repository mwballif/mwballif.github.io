#!/usr/bin/env python3
"""Compile tex/blog/*.tex to Hugo markdown via htlatex."""

from __future__ import annotations

import re
import shutil
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
TEX_DIR = ROOT / "tex" / "blog"
BUILD_DIR = ROOT / "tex" / "build"
CONTENT_DIR = ROOT / "content" / "blog"
STATIC_BLOG_DIR = ROOT / "static" / "blog"
HTLATEX = shutil.which("htlatex")


def parse_metadata(tex_path: Path) -> dict[str, str]:
    meta: dict[str, str] = {}
    for line in tex_path.read_text(encoding="utf-8").splitlines():
        match = re.match(r"^%%\s*hugo-([a-z]+):\s*(.+?)\s*$", line)
        if match:
            meta[match.group(1)] = match.group(2)
    return meta


def extract_body(html_path: Path) -> str:
    html = html_path.read_text(encoding="utf-8", errors="replace")
    match = re.search(r"<body[^>]*>(.*)</body>", html, re.DOTALL | re.IGNORECASE)
    if not match:
        raise ValueError(f"No <body> found in {html_path}")
    return match.group(1).strip()


def rewrite_asset_paths(html: str, slug: str) -> str:
    html = re.sub(rf'(?:\./)?{re.escape(slug)}(\d+x?\.(?:svg|png))', rf'/blog/{slug}/\1', html)
    return html


def compile_post(tex_path: Path) -> None:
    slug = tex_path.stem
    meta = parse_metadata(tex_path)
    title = meta.get("title", slug.replace("-", " ").title())
    date = meta.get("date", "2026-01-01")
    draft = meta.get("draft", "false").lower() == "true"

    work_dir = BUILD_DIR / slug
    if work_dir.exists():
        shutil.rmtree(work_dir)
    work_dir.mkdir(parents=True)

    local_tex = work_dir / tex_path.name
    shutil.copy2(tex_path, local_tex)
    preamble_src = ROOT / "tex" / "templates" / "preamble.tex"
    preamble_dst = work_dir / "preamble.tex"
    shutil.copy2(preamble_src, preamble_dst)

    tex_source = local_tex.read_text(encoding="utf-8")
    tex_source = tex_source.replace("../templates/preamble.tex", "preamble.tex")
    local_tex.write_text(tex_source, encoding="utf-8")

    print(f"Compiling {tex_path.name} ...")
    result = subprocess.run(
        [HTLATEX, str(local_tex.name), "html,mathjax"],
        cwd=work_dir,
        capture_output=True,
        text=True,
    )
    if result.returncode != 0:
        print(result.stdout)
        print(result.stderr, file=sys.stderr)
        raise RuntimeError(f"htlatex failed for {tex_path.name}")

    html_path = work_dir / f"{slug}.html"
    if not html_path.exists():
        raise FileNotFoundError(f"Missing HTML output for {slug}")

    body = extract_body(html_path)
    body = rewrite_asset_paths(body, slug)

    asset_dir = STATIC_BLOG_DIR / slug
    asset_dir.mkdir(parents=True, exist_ok=True)
    for asset in work_dir.glob(f"{slug}*"):
        if asset.suffix in {".svg", ".png"}:
            shutil.copy2(asset, asset_dir / asset.name)

    output = CONTENT_DIR / f"{slug}.md"
    front_matter = (
        "---\n"
        f'title: "{title}"\n'
        f"date: {date}\n"
        f"draft: {draft}\n"
        "latex: true\n"
        "---\n\n"
        '<div class="latex-body">\n'
        f"{body}\n"
        "</div>\n"
    )
    output.write_text(front_matter, encoding="utf-8")
    print(f"Wrote {output.relative_to(ROOT)}")


def main() -> int:
    if HTLATEX is None:
        print("htlatex not found. Install TeX Live (texlive-latex-base).", file=sys.stderr)
        return 1

    if not TEX_DIR.exists():
        print("No tex/blog directory found.")
        return 0

    tex_files = sorted(TEX_DIR.glob("*.tex"))
    if not tex_files:
        print("No .tex blog sources found.")
        return 0

    CONTENT_DIR.mkdir(parents=True, exist_ok=True)
    BUILD_DIR.mkdir(parents=True, exist_ok=True)

    for tex_path in tex_files:
        compile_post(tex_path)

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
