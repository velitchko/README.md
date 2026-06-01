---
name: resources-awesome-list
description: Design spec for RESOURCES.md — annotated curated resource list for the README.md EuroVis 2026 tutorial, plus plan for companion vis-reproducibility-kit repo
metadata:
  type: project
---

# RESOURCES.md Design Spec

## Goal

Add a `RESOURCES.md` file to the tutorial repository root. It serves as a standalone annotated reference — useful both during the tutorial and as a lasting resource for visualization researchers.

## Format decision

Annotated reference (Option B from brainstorm): each entry has a 1–2 sentence annotation explaining what it is and when a visualization researcher would reach for it. This is more useful than a bare link list and respects that the audience is researchers, not general developers.

## Sections (10 total)

1. **Version Control** — Git, GitHub/GitLab, Git LFS, anonymous repos
2. **Documentation** — README structure, `tree`, CONTRIBUTING.md, LaTeX number injection, in-paper statement
3. **Dependency Management** — pip/venv, conda, renv, package-lock.json, CMake/vcpkg, Docker, Apptainer
4. **LLM & AI Reproducibility** — AGENTS.md, gen_ai.md, conversation exports, model reporting, prompt versioning
5. **Deployment Platforms** — GitHub Pages, Netlify, Vercel, Render, Binder, Observable, ngrok
6. **Archival & Pre-registration** — Zenodo, OSF, Software Heritage, AsPredicted, arXiv, Figshare, Dryad
7. **Reproducibility Certification** — GRSI, ACM artifact badges, IEEE artifact badges
8. **Study Replication** — reVISit 2, reVISit, provenance tracking, experimental structure
9. **Key Papers & Readings** — all 12 paper references in chronological order with annotations
10. **Templates & Starter Kits** — pointer to vis-reproducibility-kit (see below)

## Companion repo plan: `vis-reproducibility-kit`

A GitHub template repository (use via "Use this template") providing stack-agnostic scaffolding + per-language dependency examples.

**Structure:**
- `core/` — stack-agnostic templates: README, AGENTS.md, gen_ai.md, folder structure, checklists, run_all.sh
- `stacks/` — one directory per tech: python, python-conda, r, javascript, typescript, jupyter, cpp
- `docker/` — Dockerfiles for Python, R, and Node VIS environments
- `latex/` — LaTeX number injection example

**Design principle:** The `core/` layer applies to every researcher regardless of stack. The `stacks/` layer is opt-in — pick the one subdirectory matching your tech and copy what you need. This avoids producing an overwhelming monolithic template while still covering the full range of visualization research workflows (Python, R, D3/JS/TS, Jupyter, C++/CGAL, etc.).

## Sources

All content grounded in:
- Tutorial paper: `evt20261000.pdf`
- Live demo script: `tutorial-materials/part1-reproducible-repo/demo-script.md`
- Example files: AGENTS.md, gen_ai.md in `tutorial-materials/part1-reproducible-repo/`
- Paper references: 12 citations with DOIs from the paper bibliography
