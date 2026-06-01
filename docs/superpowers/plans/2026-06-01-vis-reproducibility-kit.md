# vis-reproducibility-kit Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create a new GitHub template repository `vis-reproducibility-kit` providing stack-agnostic reproducibility scaffolding (core layer) plus per-language dependency management examples (stacks layer) for visualization researchers using Python, R, JavaScript/TypeScript, Jupyter, and C++.

**Architecture:** Two-layer design. `core/` contains files every researcher copies regardless of stack (README template, LLM logging, figure scripts, checklists). `stacks/` contains one subdirectory per language with only the dependency management files — the minimal piece that varies per tech. `docker/` and `latex/` provide optional advanced patterns.

**Tech Stack:** Bash, Python 3, R (renv), Node.js (npm), CMake + vcpkg, Docker, LaTeX

---

### Task 1: Initialize repository

**Files:**
- Create: `/home/velitchko/Documents/Projects/vis-reproducibility-kit/` (new git repo)
- Create: `.gitignore`
- Create: `LICENSE`

- [ ] **Step 1: Create and init the repo**

```bash
mkdir /home/velitchko/Documents/Projects/vis-reproducibility-kit
cd /home/velitchko/Documents/Projects/vis-reproducibility-kit
git init
```

Expected: `Initialized empty Git repository in .../vis-reproducibility-kit/.git/`

- [ ] **Step 2: Create .gitignore**

Write `/home/velitchko/Documents/Projects/vis-reproducibility-kit/.gitignore`:

```
.DS_Store
.venv/
__pycache__/
*.pyc
node_modules/
*.egg-info/
.ipynb_checkpoints/
renv/
.Rproj.user/
build/
dist/
```

- [ ] **Step 3: Create MIT LICENSE**

Write `/home/velitchko/Documents/Projects/vis-reproducibility-kit/LICENSE`:

```
MIT License

Copyright (c) 2026 Velitchko Filipov, Tobias Isenberg, Alexander Lex

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

- [ ] **Step 4: Initial commit**

```bash
git -C /home/velitchko/Documents/Projects/vis-reproducibility-kit add .gitignore LICENSE
git -C /home/velitchko/Documents/Projects/vis-reproducibility-kit commit -m "init: repository scaffold"
```

---

### Task 2: Root README

**Files:**
- Create: `README.md`

- [ ] **Step 1: Write root README**

Write `/home/velitchko/Documents/Projects/vis-reproducibility-kit/README.md`:

```markdown
# vis-reproducibility-kit

A stack-agnostic starter kit for reproducible visualization research.
Companion to the [README.md Tutorial](https://github.com/visvar/readme.md) at EuroVis 2026.

## How to use

**Step 1 — Copy `core/` into your project root.** This applies to every researcher regardless of language or stack.

**Step 2 — Copy your stack from `stacks/<your-stack>/`.** Pick one. This handles dependency management for your language.

**Step 3 — Fill in the placeholders** in `README-template.md`, `AGENTS.md`, and `gen_ai.md`.

```bash
# Quick start — Python project
cp -r core/ ~/my-paper/
cp stacks/python/.gitignore ~/my-paper/
cp stacks/python/setup.sh ~/my-paper/
```

## Directory overview

| Directory | What it is |
|-----------|-----------|
| [`core/`](core/) | Stack-agnostic templates: README, LLM logging, figure scripts, checklists |
| [`stacks/python/`](stacks/python/) | pip + venv + requirements.txt |
| [`stacks/python-conda/`](stacks/python-conda/) | conda + environment.yml |
| [`stacks/r/`](stacks/r/) | renv + renv.lock (also covers Quarto) |
| [`stacks/javascript/`](stacks/javascript/) | npm + package-lock.json |
| [`stacks/typescript/`](stacks/typescript/) | TypeScript + tsconfig + npm |
| [`stacks/jupyter/`](stacks/jupyter/) | Notebook reproducibility: nbstripout, papermill, kernel pinning |
| [`stacks/cpp/`](stacks/cpp/) | CMake + vcpkg manifest (CGAL example) |
| [`docker/`](docker/) | Dockerfiles for full environment isolation |
| [`latex/`](latex/) | LaTeX number injection: embed computed values into your paper |

## Design principle

The `core/` layer is the whole point. The folder structure, README template, LLM
logging protocol, figure-per-script pattern, and checklists are universal — they
do not change based on your tech stack. The `stacks/` layer is just the 10–20
lines that differ: how you pin versions in Python vs R vs Node vs C++.

Copy `core/`. Pick one stack. You're done.

## From the tutorial

This kit is based on materials developed for the EuroVis 2026 tutorial
**README.md: A Tutorial on Reproducible Visualization Research** by
Velitchko Filipov, Tobias Isenberg, and Alexander Lex.

See [RESOURCES.md](https://github.com/visvar/readme.md/blob/main/RESOURCES.md)
in the tutorial repository for an annotated list of reproducibility tools,
platforms, and papers.
```

- [ ] **Step 2: Commit**

```bash
git -C /home/velitchko/Documents/Projects/vis-reproducibility-kit add README.md
git -C /home/velitchko/Documents/Projects/vis-reproducibility-kit commit -m "docs: add root README with usage instructions"
```

---

### Task 3: core/ — stack-agnostic templates

**Files:**
- Create: `core/README-template.md`
- Create: `core/AGENTS.md`
- Create: `core/gen_ai.md`
- Create: `core/run_all.sh`

- [ ] **Step 1: Write README-template.md**

Write `/home/velitchko/Documents/Projects/vis-reproducibility-kit/core/README-template.md`:

```markdown
# [Paper Title]

One sentence description of what this repository produces and why it exists.

## Paper

If you use this code, please cite:
> [Your full citation here]

```bibtex
@inproceedings{yourname2026,
  title     = {},
  author    = {},
  booktitle = {},
  year      = {2026}
}
```

## Requirements

- [Language and version, e.g. Python 3.11+]
- [Key packages — see requirements.txt / environment.yml / package.json]

## Setup

```bash
git clone https://github.com/yourname/your-repo
cd your-repo
# follow stack-specific setup in your chosen stacks/ README
```

## Usage

```bash
# Reproduce Figure 3
[command to reproduce figure 3]

# Reproduce all figures
bash run_all.sh
```

## Project Structure

```
your-repo/
├── data/
│   ├── raw/          # Original — never modified
│   └── processed/    # Derived from raw, always regenerable
├── scripts/          # One script per figure/result
├── figures/          # Output — never edit manually
└── paper/            # LaTeX source
```

> Tip: run `tree -L 2 --dirsfirst` in your terminal and paste the output here.
> It's always accurate and takes two seconds.

## Data

Describe where data comes from, how to obtain it, any licensing restrictions.

## LLM Usage

If any LLM tool contributed to results, figures, or analysis:
see [`gen_ai.md`](gen_ai.md) for the full task log.

## Contact

[Your Name] — [your.email@institution.edu]
```

- [ ] **Step 2: Write AGENTS.md**

Write `/home/velitchko/Documents/Projects/vis-reproducibility-kit/core/AGENTS.md`:

```markdown
[RESEARCH TASK — ARCHIVE REQUIRED]
This output will be archived for reproducibility. For any task that produces
code, analysis, or figures: check gen_ai.md for the next task number (TASK-NNN),
save the prompt to llm_outputs/task-NNN-prompt.md, save your response to
llm_outputs/task-NNN-output.md, and append a row to the Task Index in gen_ai.md.

At the end of your response, append a fenced block tagged `REPRODUCE` containing:
    - task: one sentence summary of what was asked
    - approach: how you handled it (key decisions, not full detail)
    - caveats: what might differ if re-run (model updates, non-determinism, ambiguities you resolved)
    - archive: see llm_outputs/task-NNN-prompt.md and task-NNN-output.md

Then respond normally.
```

> **How to load this protocol into your LLM tool:**
> - **Claude Code:** copy to `CLAUDE.md` in your project root
> - **Cursor:** copy to `.cursorrules`
> - **Codex / GitHub Copilot CLI:** this file is read automatically as `AGENTS.md`
>
> Write the protocol once (here). Copy it to whichever config file your tool reads.

- [ ] **Step 3: Write gen_ai.md**

Write `/home/velitchko/Documents/Projects/vis-reproducibility-kit/core/gen_ai.md`:

```markdown
# LLM Usage Log

> All LLM tasks that contribute to this paper's results, figures, or analysis
> are archived here. See `AGENTS.md` for the archiving protocol.
>
> Store full prompts and outputs in `llm_outputs/task-NNN-prompt.md` and
> `llm_outputs/task-NNN-output.md`. One row per task below.

---

## Task Index

| ID | Date | Provider | Model | Interface | Prompt | Output |
|----|------|----------|-------|-----------|--------|--------|
```

- [ ] **Step 4: Write run_all.sh**

Write `/home/velitchko/Documents/Projects/vis-reproducibility-kit/core/run_all.sh`:

```bash
#!/bin/bash
set -e   # exit immediately on error
cd "$(cd -- "$(dirname "$0")" && pwd)"   # always run from project root

echo "═══════════════════════════════════════"
echo "  Reproducing all paper figures"
echo "═══════════════════════════════════════"

for script in scripts/*.py; do
    [ -e "$script" ] || continue
    name=$(basename "$script" .py)
    echo ""
    echo "Generating ${name}..."
    python "$script" --output "figures/${name}.pdf"
done

echo ""
echo "Done. All figures saved to figures/"
```

> **Adapt for your stack:** replace `python "$script" --output ...` with the
> command that runs your figure scripts. For R: `Rscript "$script"`.
> For notebooks: `papermill "$script" /dev/null`.

- [ ] **Step 5: Make run_all.sh executable and commit**

```bash
chmod +x /home/velitchko/Documents/Projects/vis-reproducibility-kit/core/run_all.sh
git -C /home/velitchko/Documents/Projects/vis-reproducibility-kit add core/
git -C /home/velitchko/Documents/Projects/vis-reproducibility-kit commit -m "feat: add core stack-agnostic templates"
```

---

### Task 4: core/checklists/

**Files:**
- Create: `core/checklists/minimal-reproducible.md`
- Create: `core/checklists/grsi-application.md`

- [ ] **Step 1: Write minimal-reproducible checklist**

Write `/home/velitchko/Documents/Projects/vis-reproducibility-kit/core/checklists/minimal-reproducible.md`:

```markdown
# Minimal Reproducible Publication Checklist

Use this before submission. Ten minutes now saves hours on revision day.

## Repository

- [ ] Git repo initialized and pushed to GitHub/GitLab
- [ ] Folder structure: `data/raw/`, `data/processed/`, `scripts/`, `figures/`
- [ ] `.gitignore` excludes virtual environments, build artifacts, OS files
- [ ] Repository is public (or has an anonymous review link)

## README

- [ ] README answers: what is this / how do I run it / what does it produce
- [ ] Setup instructions tested from a fresh clone
- [ ] Usage section maps figures to specific commands
- [ ] Project structure diagram generated with `tree -L 2 --dirsfirst`
- [ ] Contact information included

## Dependencies

- [ ] Dependencies pinned (requirements.txt / environment.yml / renv.lock / package-lock.json)
- [ ] Virtual environment or container setup documented in README
- [ ] No globally-installed packages undocumented in the manifest

## Figure Scripts

- [ ] One script per figure (or clearly named sections)
- [ ] All paths relative — no hardcoded `/Users/yourname/...` anywhere
- [ ] `run_all.sh` (or equivalent) reproduces all figures with one command
- [ ] Random seeds set for any non-deterministic steps

## Data

- [ ] Raw data committed or download instructions provided
- [ ] Pre-processing steps scripted (not manual)
- [ ] Large files handled via Git LFS or external link with instructions

## LLM Usage (if applicable)

- [ ] `AGENTS.md` protocol in place
- [ ] `gen_ai.md` task index complete with all LLM-assisted tasks
- [ ] Prompt and output files archived in `llm_outputs/`

## Final Check

- [ ] Git tag created before submission: `git tag -a v1.0 -m "EuroVis 2026 submission"`
- [ ] Fresh clone test: clone to a new directory, follow only the README, verify it runs
```

- [ ] **Step 2: Write GRSI application checklist**

Write `/home/velitchko/Documents/Projects/vis-reproducibility-kit/core/checklists/grsi-application.md`:

```markdown
# GRSI Application Checklist

The [Graphics Replicability Stamp Initiative](https://www.replicabilitystamp.org)
certifies that a paper's key results can be independently reproduced.
This checklist covers what a GRSI reviewer expects to find.

## Before you apply

- [ ] Paper is accepted (GRSI review happens post-acceptance)
- [ ] Repository is public and permanently accessible
- [ ] A DOI has been minted for the code snapshot (Zenodo recommended)
- [ ] All authors agree to apply

## Repository requirements

- [ ] README contains clear setup instructions a stranger can follow
- [ ] Dependencies pinned with exact versions (not just `>=`)
- [ ] Key results (figures, tables, metrics) are reproducible from the provided code and data
- [ ] Any data not in the repository has documented download instructions
- [ ] Pre-processing steps are scripted — no undocumented manual steps

## What reviewers will do

A GRSI reviewer will:
1. Clone your repository fresh
2. Follow your README setup instructions exactly
3. Run your code to reproduce the key results cited in the paper
4. Verify that the reproduced results match the paper's claims within reasonable tolerance

**Design for this.** If your reviewer needs to ask you anything, your README is incomplete.

## Common rejection reasons

- Missing dependencies (installed globally, not listed)
- Data file referenced but not committed and no download instructions
- Hard-coded paths that only work on your machine
- Pre-processing step described in the paper but not scripted
- Version drift between code and paper (code updated post-submission)

## Applying

1. Prepare your repository using the minimal-reproducible checklist
2. Deposit a code snapshot on [Zenodo](https://zenodo.org) and obtain a DOI
3. Submit via the GRSI application form at [replicabilitystamp.org](https://www.replicabilitystamp.org)
4. A volunteer reviewer will contact you within a few weeks
```

- [ ] **Step 3: Commit**

```bash
git -C /home/velitchko/Documents/Projects/vis-reproducibility-kit add core/checklists/
git -C /home/velitchko/Documents/Projects/vis-reproducibility-kit commit -m "feat: add reproducibility and GRSI checklists"
```

---

### Task 5: stacks/python/ and stacks/python-conda/

**Files:**
- Create: `stacks/python/README.md`
- Create: `stacks/python/setup.sh`
- Create: `stacks/python/.gitignore`
- Create: `stacks/python-conda/README.md`
- Create: `stacks/python-conda/environment.yml`
- Create: `stacks/python-conda/.gitignore`

- [ ] **Step 1: Write stacks/python/README.md**

Write `/home/velitchko/Documents/Projects/vis-reproducibility-kit/stacks/python/README.md`:

```markdown
# Python Stack

Uses `venv` for isolation and `pip freeze` for version pinning.
Covers Python 3.8+ with pip-installable dependencies.

> For projects mixing Python with R, CUDA, or compiled C extensions,
> use [`../python-conda/`](../python-conda/) instead.

## First time setup (you, when starting the project)

```bash
python -m venv .venv
source .venv/bin/activate        # Windows: .venv\Scripts\activate
pip install matplotlib pandas    # replace with your packages
pip freeze > requirements.txt
git add requirements.txt .gitignore
git commit -m "pin dependencies"
```

## Reproducing (reviewer, or you on a new machine)

```bash
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
bash run_all.sh
```

Or use the provided setup script:

```bash
bash setup.sh
source .venv/bin/activate
bash run_all.sh
```

## Common pitfalls

| Mistake | Fix |
|---------|-----|
| Package installed globally, not listed in requirements.txt | Always activate venv before installing anything |
| `pip freeze` captures too many packages (system bleed) | Create venv first, then install, then freeze |
| requirements.txt has `==` but package was yanked | Pin to a minor version range in requirements.in, use pip-tools |
| `.venv/` accidentally committed | Ensure `.venv/` is in `.gitignore` |
```

- [ ] **Step 2: Write stacks/python/setup.sh**

Write `/home/velitchko/Documents/Projects/vis-reproducibility-kit/stacks/python/setup.sh`:

```bash
#!/bin/bash
set -e
cd "$(cd -- "$(dirname "$0")" && pwd)"

echo "Setting up Python environment..."
python -m venv .venv
source .venv/bin/activate
pip install --upgrade pip --quiet
pip install -r requirements.txt
echo ""
echo "Done. Activate with: source .venv/bin/activate"
```

- [ ] **Step 3: Write stacks/python/.gitignore**

Write `/home/velitchko/Documents/Projects/vis-reproducibility-kit/stacks/python/.gitignore`:

```
.venv/
__pycache__/
*.pyc
*.pyo
*.egg-info/
dist/
build/
.pytest_cache/
.ipynb_checkpoints/
```

- [ ] **Step 4: Write stacks/python-conda/README.md**

Write `/home/velitchko/Documents/Projects/vis-reproducibility-kit/stacks/python-conda/README.md`:

```markdown
# Python (conda) Stack

Uses conda for environment isolation. Preferred when your project requires:
- Non-Python system packages (GDAL, PROJ, HDF5)
- R or Julia alongside Python
- CUDA / GPU drivers
- Compiled C/C++ extensions with complex system-level dependencies

## First time setup

```bash
conda env create -f environment.yml
conda activate myproject
```

After adding new packages:

```bash
conda env export > environment.yml
git add environment.yml
git commit -m "update conda environment"
```

## Reproducing

```bash
conda env create -f environment.yml
conda activate myproject
bash run_all.sh
```

## Notes

- Pin the Python version explicitly in `environment.yml`.
- Use `conda-forge` as the primary channel for the most up-to-date packages.
- List pip-only packages under the `pip:` key inside `dependencies`.
- Commit `environment.yml` — never add it to `.gitignore`.
```

- [ ] **Step 5: Write stacks/python-conda/environment.yml**

Write `/home/velitchko/Documents/Projects/vis-reproducibility-kit/stacks/python-conda/environment.yml`:

```yaml
name: myproject
channels:
  - conda-forge
  - defaults
dependencies:
  - python=3.11.8
  - numpy=1.26.4
  - matplotlib=3.8.3
  - pandas=2.2.1
  - scipy=1.12.0
  - pip=24.0
  - pip:
    - some-pip-only-package==1.0.0
```

- [ ] **Step 6: Write stacks/python-conda/.gitignore**

Write `/home/velitchko/Documents/Projects/vis-reproducibility-kit/stacks/python-conda/.gitignore`:

```
__pycache__/
*.pyc
*.egg-info/
.ipynb_checkpoints/
```

- [ ] **Step 7: Make setup.sh executable and commit**

```bash
chmod +x /home/velitchko/Documents/Projects/vis-reproducibility-kit/stacks/python/setup.sh
git -C /home/velitchko/Documents/Projects/vis-reproducibility-kit add stacks/python/ stacks/python-conda/
git -C /home/velitchko/Documents/Projects/vis-reproducibility-kit commit -m "feat: add Python and Python-conda stacks"
```

---

### Task 6: stacks/r/

**Files:**
- Create: `stacks/r/README.md`
- Create: `stacks/r/.gitignore`

- [ ] **Step 1: Write stacks/r/README.md**

Write `/home/velitchko/Documents/Projects/vis-reproducibility-kit/stacks/r/README.md`:

```markdown
# R Stack

Uses [`renv`](https://rstudio.github.io/renv/) for project-local package isolation
and a lock file for exact version pinning.

> Also covers **Quarto** documents (`.qmd`) — see the Quarto section below.

## First time setup

```r
# In R console, from your project root:
install.packages("renv")
renv::init()

# Install your packages normally:
install.packages(c("ggplot2", "dplyr", "tidyr"))

# Snapshot the exact versions:
renv::snapshot()
```

Commit the resulting files:

```bash
git add renv.lock .Rprofile renv/activate.R renv/settings.json
git commit -m "pin R dependencies with renv"
```

## Reproducing

```r
# In R console, from the cloned project root:
renv::restore()
```

Then run your analysis scripts normally.

## Figure scripts (R equivalent of run_all.sh)

Add a `run_all.R` at your project root:

```r
#!/usr/bin/env Rscript
scripts <- list.files("scripts", pattern = "\\.R$", full.names = TRUE)
for (s in scripts) {
  message("Running ", s)
  source(s)
}
message("Done.")
```

## Quarto

Quarto (`.qmd`) documents work with the same renv workflow. Pin the Quarto
version by committing a `_quarto.yml` file with a `quarto-version` field, and
document the Quarto CLI version used in your README.

```yaml
# _quarto.yml
project:
  type: document
quarto-version: "1.4.549"
```

Render reproducibly:

```bash
quarto render your-document.qmd
```

## Common pitfalls

| Mistake | Fix |
|---------|-----|
| `renv/` directory committed (large) | Only commit `renv.lock`, `.Rprofile`, `renv/activate.R`, `renv/settings.json` |
| Package version differs on CRAN | Use `renv::restore()` which installs exact versions from the lock file |
| Random results in simulations | Set `set.seed(42)` at the top of each script |
```

- [ ] **Step 2: Write stacks/r/.gitignore**

Write `/home/velitchko/Documents/Projects/vis-reproducibility-kit/stacks/r/.gitignore`:

```
# renv — commit the lock file and activate script, not the library
renv/library/
renv/local/
renv/python/
renv/staging/

# R session artifacts
.Rhistory
.RData
.Rproj.user/
*.Rproj

# Output (regenerable)
*.pdf
*.png
Rplots.pdf
```

- [ ] **Step 3: Commit**

```bash
git -C /home/velitchko/Documents/Projects/vis-reproducibility-kit add stacks/r/
git -C /home/velitchko/Documents/Projects/vis-reproducibility-kit commit -m "feat: add R stack with renv and Quarto guidance"
```

---

### Task 7: stacks/javascript/ and stacks/typescript/

**Files:**
- Create: `stacks/javascript/README.md`
- Create: `stacks/javascript/package.json`
- Create: `stacks/javascript/.gitignore`
- Create: `stacks/typescript/README.md`
- Create: `stacks/typescript/package.json`
- Create: `stacks/typescript/tsconfig.json`
- Create: `stacks/typescript/.gitignore`

- [ ] **Step 1: Write stacks/javascript/README.md**

Write `/home/velitchko/Documents/Projects/vis-reproducibility-kit/stacks/javascript/README.md`:

```markdown
# JavaScript Stack

Uses npm with `package-lock.json` for exact dependency pinning.
Covers D3, Vega-Lite, Observable Plot, and similar browser-based visualization libraries.

## Critical rule

**Do NOT add `package-lock.json` to `.gitignore`.** This is the most common
reproducibility mistake in JavaScript visualization projects. The lock file is
what makes `npm install` deterministic. Without it, a reviewer gets different
versions than you used.

## First time setup

```bash
npm init -y
npm install d3 vega-lite    # replace with your packages
# package-lock.json is now created — commit it
git add package.json package-lock.json .gitignore
git commit -m "pin JS dependencies"
```

## Reproducing

```bash
npm ci    # installs exact versions from package-lock.json (not npm install)
```

Use `npm ci` (not `npm install`) when reproducing. `npm ci` uses the lock file
exactly; `npm install` may update minor versions.

## Framework variants

This stack works for plain JS or any framework (React, Vue, Svelte, etc.).
For frameworks with a build step, document the build command in your README:

```bash
npm ci
npm run build    # or: npm run dev
```

## Deployment

For a static visualization to accompany a paper:
- GitHub Pages: push `dist/` or configure Pages to build from a branch
- Netlify: connect your repo and set build command to `npm run build`
```

- [ ] **Step 2: Write stacks/javascript/package.json**

Write `/home/velitchko/Documents/Projects/vis-reproducibility-kit/stacks/javascript/package.json`:

```json
{
  "name": "my-vis-paper",
  "version": "1.0.0",
  "description": "Visualization code for [Paper Title]",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "d3": "^7.9.0"
  },
  "devDependencies": {
    "vite": "^5.2.0"
  }
}
```

- [ ] **Step 3: Write stacks/javascript/.gitignore**

Write `/home/velitchko/Documents/Projects/vis-reproducibility-kit/stacks/javascript/.gitignore`:

```
node_modules/
dist/
.cache/
.env
.env.local
```

- [ ] **Step 4: Write stacks/typescript/README.md**

Write `/home/velitchko/Documents/Projects/vis-reproducibility-kit/stacks/typescript/README.md`:

```markdown
# TypeScript Stack

Extends the JavaScript stack with TypeScript type checking.
Uses npm + `package-lock.json` for pinning (same rules as the JS stack).

## First time setup

```bash
npm init -y
npm install --save-dev typescript @types/d3
npm install d3
npx tsc --init    # creates tsconfig.json — commit this
git add package.json package-lock.json tsconfig.json .gitignore
git commit -m "pin TS dependencies"
```

## Reproducing

```bash
npm ci
npm run build
```

## tsconfig.json decisions to document

Two settings affect reproducibility of type checking results:
- `"target"` — the JS output version; pin this explicitly
- `"strict"` — set to `true` to catch errors reviewers might not catch with loose settings

The provided `tsconfig.json` is a minimal reproducible baseline. Adjust for your framework.
```

- [ ] **Step 5: Write stacks/typescript/package.json**

Write `/home/velitchko/Documents/Projects/vis-reproducibility-kit/stacks/typescript/package.json`:

```json
{
  "name": "my-vis-paper",
  "version": "1.0.0",
  "scripts": {
    "build": "tsc",
    "dev": "vite",
    "preview": "vite preview"
  },
  "dependencies": {
    "d3": "^7.9.0"
  },
  "devDependencies": {
    "@types/d3": "^7.4.3",
    "typescript": "^5.4.5",
    "vite": "^5.2.0"
  }
}
```

- [ ] **Step 6: Write stacks/typescript/tsconfig.json**

Write `/home/velitchko/Documents/Projects/vis-reproducibility-kit/stacks/typescript/tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "outDir": "./dist",
    "rootDir": "./src",
    "declaration": true,
    "sourceMap": true,
    "esModuleInterop": true,
    "skipLibCheck": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

- [ ] **Step 7: Write stacks/typescript/.gitignore**

Write `/home/velitchko/Documents/Projects/vis-reproducibility-kit/stacks/typescript/.gitignore`:

```
node_modules/
dist/
.cache/
.env
.env.local
```

- [ ] **Step 8: Commit**

```bash
git -C /home/velitchko/Documents/Projects/vis-reproducibility-kit add stacks/javascript/ stacks/typescript/
git -C /home/velitchko/Documents/Projects/vis-reproducibility-kit commit -m "feat: add JavaScript and TypeScript stacks"
```

---

### Task 8: stacks/jupyter/ and stacks/cpp/

**Files:**
- Create: `stacks/jupyter/README.md`
- Create: `stacks/jupyter/.gitignore`
- Create: `stacks/cpp/README.md`
- Create: `stacks/cpp/CMakeLists.txt`
- Create: `stacks/cpp/vcpkg.json`
- Create: `stacks/cpp/.gitignore`

- [ ] **Step 1: Write stacks/jupyter/README.md**

Write `/home/velitchko/Documents/Projects/vis-reproducibility-kit/stacks/jupyter/README.md`:

```markdown
# Jupyter Notebook Stack

Notebooks have three reproducibility challenges plain scripts do not:
1. **Output bleed** — committed outputs inflate diffs and embed non-reproducible state
2. **Execution order** — cells can be run out of order, leaving hidden state
3. **Kernel drift** — the running kernel may differ from the pinned environment

This stack addresses all three.

## Dependency pinning

Jupyter notebooks run inside a kernel. Pin the kernel environment exactly:

```bash
python -m venv .venv
source .venv/bin/activate
pip install jupyter matplotlib pandas    # your packages
pip freeze > requirements.txt
git add requirements.txt
git commit -m "pin notebook dependencies"
```

Register the environment as a kernel:

```bash
pip install ipykernel
python -m ipykernel install --user --name myproject --display-name "My Project"
```

Document the kernel name in your README so reviewers select the right one.

## Stripping outputs before committing (nbstripout)

Install once:

```bash
pip install nbstripout
nbstripout --install    # installs a git filter for this repo
```

After this, `git diff` and commits will never include cell outputs. Reviewers
reproduce outputs by running the notebook themselves.

## Parameterized execution (papermill)

For notebooks that produce figures with parameters (e.g., different datasets
or conditions), use [papermill](https://papermill.readthedocs.io/en/latest/)
to run them from the command line:

```bash
pip install papermill
papermill analysis.ipynb output.ipynb -p dataset results.csv -p condition A
```

Add papermill to your `run_all.sh`:

```bash
papermill scripts/figure3.ipynb /dev/null -p output figures/figure3.pdf
```

## Executing all notebooks reproducibly

```bash
# Run all notebooks in order, fail fast on any error
for nb in scripts/*.ipynb; do
    jupyter nbconvert --to notebook --execute "$nb" --output "$nb"
done
```

## Quarto alternative

If you are writing a paper or report in R or Python, consider
[Quarto](https://quarto.org) as a notebook alternative. Quarto `.qmd` files
are plain text (no JSON), diff cleanly, and render to PDF/HTML/Word from the
command line — making them more reproducible than `.ipynb` by default.

## Common pitfalls

| Mistake | Fix |
|---------|-----|
| Outputs committed to git | Install nbstripout |
| Notebook only works when run top-to-bottom manually | Use `jupyter nbconvert --execute` in CI to verify |
| Kernel not documented | State kernel name and Python version in README |
| `import *` or global state between cells | Refactor shared logic into a `.py` module, import it |
```

- [ ] **Step 2: Write stacks/jupyter/.gitignore**

Write `/home/velitchko/Documents/Projects/vis-reproducibility-kit/stacks/jupyter/.gitignore`:

```
.venv/
__pycache__/
*.pyc
.ipynb_checkpoints/
# Note: .ipynb files themselves should NOT be ignored
# nbstripout handles stripping outputs before commit
```

- [ ] **Step 3: Write stacks/cpp/README.md**

Write `/home/velitchko/Documents/Projects/vis-reproducibility-kit/stacks/cpp/README.md`:

```markdown
# C++ Stack

Uses CMake as the build system and [vcpkg](https://vcpkg.io) in manifest mode
for dependency management. The `vcpkg.json` manifest pins exact library versions
and is committed to the repository.

Covers projects using libraries like CGAL (computational geometry / network layouts),
Eigen (linear algebra), Boost, or VTK (scientific visualization).

## Prerequisites

Install once on each machine:

```bash
# vcpkg (clone and bootstrap)
git clone https://github.com/microsoft/vcpkg ~/vcpkg
~/vcpkg/bootstrap-vcpkg.sh

# Set environment variable (add to your shell profile)
export VCPKG_ROOT=$HOME/vcpkg
```

## First time setup

```bash
mkdir build && cd build
cmake .. --preset default    # uses CMakePresets.json
cmake --build .
```

vcpkg reads `vcpkg.json`, downloads and builds all dependencies automatically.

## Reproducing

```bash
mkdir build && cd build
cmake .. --preset default
cmake --build .
./reproduce_figures    # replace with your executable name
```

## Files to commit

```
your-project/
├── CMakeLists.txt        ← commit
├── CMakePresets.json     ← commit
├── vcpkg.json            ← commit (manifest — pins dependency versions)
└── src/
    └── main.cpp
```

Do NOT commit `build/` or `vcpkg_installed/`.

## Adding CGAL (example)

```json
// vcpkg.json
{
  "name": "my-network-viz",
  "version": "0.1.0",
  "dependencies": [
    "cgal",
    "eigen3",
    "boost-graph"
  ]
}
```

In `CMakeLists.txt`:

```cmake
find_package(CGAL REQUIRED)
target_link_libraries(my_target PRIVATE CGAL::CGAL)
```

## Hardware specification

C++ visualization research often depends on hardware. Document in your README:
- OS and version used
- Compiler and version (`g++ --version` or `clang++ --version`)
- CPU/GPU if results are performance-sensitive
- Any SIMD or architecture-specific flags in CMakePresets.json

## Common pitfalls

| Mistake | Fix |
|---------|-----|
| `vcpkg_installed/` committed | Add to `.gitignore` — it's regenerated by cmake |
| No `CMakePresets.json` | Required for `cmake .. --preset default` to work reproducibly |
| Build flags differ between machines | Pin flags in CMakePresets.json, not command line |
| System library (OpenGL, X11) undocumented | List system-level prerequisites in README |
```

- [ ] **Step 4: Write stacks/cpp/CMakeLists.txt**

Write `/home/velitchko/Documents/Projects/vis-reproducibility-kit/stacks/cpp/CMakeLists.txt`:

```cmake
cmake_minimum_required(VERSION 3.25)
project(my_vis_project VERSION 0.1.0 LANGUAGES CXX)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

# vcpkg dependencies (declared in vcpkg.json)
find_package(CGAL REQUIRED)
find_package(Eigen3 REQUIRED)

add_executable(reproduce_figures src/main.cpp)
target_link_libraries(reproduce_figures PRIVATE CGAL::CGAL Eigen3::Eigen)
```

- [ ] **Step 5: Write stacks/cpp/vcpkg.json**

Write `/home/velitchko/Documents/Projects/vis-reproducibility-kit/stacks/cpp/vcpkg.json`:

```json
{
  "name": "my-vis-project",
  "version": "0.1.0",
  "dependencies": [
    {
      "name": "cgal",
      "version>=": "5.6.1"
    },
    {
      "name": "eigen3",
      "version>=": "3.4.0"
    }
  ],
  "builtin-baseline": "a34c873a9717a888f58dc05268dea15592c2f822"
}
```

> Replace `builtin-baseline` with the output of `git -C $VCPKG_ROOT rev-parse HEAD`
> after installing your dependencies. This pins the vcpkg registry version.

- [ ] **Step 6: Write stacks/cpp/.gitignore**

Write `/home/velitchko/Documents/Projects/vis-reproducibility-kit/stacks/cpp/.gitignore`:

```
build/
vcpkg_installed/
CMakeCache.txt
CMakeFiles/
*.o
*.a
*.so
*.dylib
```

- [ ] **Step 7: Commit**

```bash
git -C /home/velitchko/Documents/Projects/vis-reproducibility-kit add stacks/jupyter/ stacks/cpp/
git -C /home/velitchko/Documents/Projects/vis-reproducibility-kit commit -m "feat: add Jupyter and C++ stacks"
```

---

### Task 9: docker/

**Files:**
- Create: `docker/README.md`
- Create: `docker/Dockerfile.python`
- Create: `docker/Dockerfile.r`
- Create: `docker/Dockerfile.node`

- [ ] **Step 1: Write docker/README.md**

Write `/home/velitchko/Documents/Projects/vis-reproducibility-kit/docker/README.md`:

```markdown
# Docker

Full environment isolation. Use when `requirements.txt` or `renv.lock` alone
is insufficient — for example, when your analysis depends on system-level
libraries, specific OS versions, or you want reviewers to reproduce with
a single command regardless of their setup.

## Choosing a Dockerfile

| File | Use for |
|------|---------|
| `Dockerfile.python` | Python visualization, matplotlib, pandas, networkx |
| `Dockerfile.r` | R + ggplot2 + tidyverse, Quarto |
| `Dockerfile.node` | JavaScript/TypeScript visualization with a build step |

## Build and run

```bash
# Build
docker build -f docker/Dockerfile.python -t myproject .

# Run — mounts your figures/ directory so outputs are accessible
docker run --rm -v "$(pwd)/figures:/app/figures" myproject
```

## What each Dockerfile does

Each Dockerfile:
1. Starts from a pinned base image (specific version tag, not `latest`)
2. Copies dependency manifest (`requirements.txt`, `renv.lock`, `package*.json`)
3. Installs dependencies in a separate layer (cached if manifest unchanged)
4. Copies project source
5. Runs `run_all.sh` (or equivalent) by default

## Pinning the base image

Always use a specific version tag, never `latest`:

```dockerfile
# Good — reproducible
FROM python:3.11.8-slim

# Bad — will silently use a different version six months from now
FROM python:latest
```

## Adding to README

Document the Docker usage in your paper's README:

```markdown
## Reproduce with Docker (no local setup required)

    docker build -f docker/Dockerfile.python -t myproject .
    docker run --rm -v "$(pwd)/figures:/app/figures" myproject
```
```

- [ ] **Step 2: Write docker/Dockerfile.python**

Write `/home/velitchko/Documents/Projects/vis-reproducibility-kit/docker/Dockerfile.python`:

```dockerfile
FROM python:3.11.8-slim

WORKDIR /app

# Install dependencies first (cached layer — only rebuilt if requirements.txt changes)
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy project source
COPY . .

# Create output directory
RUN mkdir -p figures

# Reproduce all figures by default
CMD ["bash", "run_all.sh"]
```

- [ ] **Step 3: Write docker/Dockerfile.r**

Write `/home/velitchko/Documents/Projects/vis-reproducibility-kit/docker/Dockerfile.r`:

```dockerfile
FROM rocker/tidyverse:4.3.3

WORKDIR /app

# Install renv
RUN R -e "install.packages('renv', repos='https://cloud.r-project.org')"

# Restore dependencies from lock file (cached layer)
COPY renv.lock .
COPY renv/activate.R renv/activate.R
COPY renv/settings.json renv/settings.json
RUN R -e "renv::restore()"

# Copy project source
COPY . .

RUN mkdir -p figures

CMD ["Rscript", "run_all.R"]
```

- [ ] **Step 4: Write docker/Dockerfile.node**

Write `/home/velitchko/Documents/Projects/vis-reproducibility-kit/docker/Dockerfile.node`:

```dockerfile
FROM node:20.12-alpine

WORKDIR /app

# Install dependencies (cached layer — only rebuilt if package files change)
COPY package*.json ./
RUN npm ci --ignore-scripts

# Copy source and build
COPY . .
RUN npm run build

EXPOSE 3000
CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0"]
```

- [ ] **Step 5: Commit**

```bash
git -C /home/velitchko/Documents/Projects/vis-reproducibility-kit add docker/
git -C /home/velitchko/Documents/Projects/vis-reproducibility-kit commit -m "feat: add Docker environment templates for Python, R, and Node"
```

---

### Task 10: latex/number-injection/

**Files:**
- Create: `latex/number-injection/README.md`
- Create: `latex/number-injection/inject_numbers.py`
- Create: `latex/number-injection/numbers.tex` (generated by script — example output)
- Create: `latex/number-injection/example.tex`

- [ ] **Step 1: Write latex/number-injection/README.md**

Write `/home/velitchko/Documents/Projects/vis-reproducibility-kit/latex/number-injection/README.md`:

```markdown
# LaTeX Number Injection

Embed computed values directly into your LaTeX source, eliminating
copy-paste errors between your analysis and your paper.

**The problem:** You run an analysis, get a result (e.g., mean accuracy = 0.847),
type it into your paper, then re-run the analysis with corrected data. The paper
still says 0.847. You submit. A reviewer notices.

**The solution:** Generate `\newcommand` definitions from your analysis output,
then `\input` them into your paper. The number in the paper is always the number
your code computed.

## How it works

1. Your analysis script writes results to `results.csv` (or any structured output).
2. `inject_numbers.py` reads `results.csv` and generates `numbers.tex` — a file of
   `\newcommand` definitions.
3. Your paper's `.tex` file includes `\input{numbers}` and uses the commands.

## Usage

```bash
python inject_numbers.py --input results.csv --output numbers.tex
```

Then in your paper:

```latex
\input{numbers}

The mean accuracy was \MeanAccuracy{} across all conditions
(SD = \SDAccuracy{}, $n$ = \NumParticipants{}).
```

## Integrating into run_all.sh

Add number injection as the last step:

```bash
python inject_numbers.py --input data/processed/results.csv --output paper/numbers.tex
echo "Numbers injected into paper/numbers.tex"
```

Now every time you run `bash run_all.sh`, your paper's numbers are refreshed.
```

- [ ] **Step 2: Write inject_numbers.py**

Write `/home/velitchko/Documents/Projects/vis-reproducibility-kit/latex/number-injection/inject_numbers.py`:

```python
#!/usr/bin/env python3
"""
Generate LaTeX \newcommand definitions from a CSV of results.

Usage:
    python inject_numbers.py --input results.csv --output numbers.tex

The CSV must have 'metric' and 'value' columns (see example below).
Add rows for every number that appears in your paper.
"""
import argparse
import csv
import re
from pathlib import Path


def to_command_name(metric: str) -> str:
    """Convert a metric name to a valid LaTeX command name (letters only)."""
    words = re.sub(r'[^a-zA-Z0-9 ]', ' ', metric).split()
    return ''.join(w.capitalize() for w in words)


def format_value(value: str) -> str:
    """Format a numeric value: integers stay as integers, floats get 3 decimal places."""
    try:
        f = float(value)
        if f == int(f):
            return str(int(f))
        return f"{f:.3f}"
    except ValueError:
        return value  # non-numeric values passed through as-is


def inject(input_path: Path, output_path: Path) -> None:
    commands = []
    with open(input_path, newline='') as f:
        reader = csv.DictReader(f)
        for row in reader:
            name = to_command_name(row['metric'])
            value = format_value(row['value'])
            commands.append(f"\\newcommand{{\\{name}}}{{{value}}}")

    header = (
        "% Auto-generated by inject_numbers.py — do not edit manually.\n"
        "% Regenerate with: python inject_numbers.py "
        f"--input {input_path} --output {output_path}\n"
    )
    output_path.write_text(header + "\n".join(commands) + "\n")
    print(f"Wrote {len(commands)} commands to {output_path}")


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--input', required=True, type=Path)
    parser.add_argument('--output', required=True, type=Path)
    args = parser.parse_args()
    inject(args.input, args.output)


if __name__ == '__main__':
    main()
```

- [ ] **Step 3: Write example results.csv**

Write `/home/velitchko/Documents/Projects/vis-reproducibility-kit/latex/number-injection/results.csv`:

```csv
metric,value
mean accuracy,0.847
SD accuracy,0.062
num participants,24
median completion time,34.2
p value,0.003
```

- [ ] **Step 4: Write example.tex**

Write `/home/velitchko/Documents/Projects/vis-reproducibility-kit/latex/number-injection/example.tex`:

```latex
\documentclass{article}

% Load auto-generated numbers (regenerated by inject_numbers.py)
\input{numbers}

\begin{document}

\section*{Number Injection Example}

The mean accuracy was \MeanAccuracy{} across all conditions
(SD = \SDAccuracy{}, $n$ = \NumParticipants{}).
Median completion time was \MedianCompletionTime{} seconds.
The difference was statistically significant ($p$ = \PValue{}).

\end{document}
```

- [ ] **Step 5: Run the script to generate numbers.tex (verify it works)**

```bash
cd /home/velitchko/Documents/Projects/vis-reproducibility-kit/latex/number-injection
python inject_numbers.py --input results.csv --output numbers.tex
cat numbers.tex
```

Expected output:
```
% Auto-generated by inject_numbers.py — do not edit manually.
% Regenerate with: python inject_numbers.py --input results.csv --output numbers.tex
\newcommand{\MeanAccuracy}{0.847}
\newcommand{\SDAccuracy}{0.062}
\newcommand{\NumParticipants}{24}
\newcommand{\MedianCompletionTime}{34.200}
\newcommand{\PValue}{0.003}
```

- [ ] **Step 6: Add numbers.tex to .gitignore (it's generated), commit the rest**

```bash
echo "numbers.tex" >> /home/velitchko/Documents/Projects/vis-reproducibility-kit/.gitignore
git -C /home/velitchko/Documents/Projects/vis-reproducibility-kit add latex/ .gitignore
git -C /home/velitchko/Documents/Projects/vis-reproducibility-kit commit -m "feat: add LaTeX number injection example"
```

---

### Task 11: Update tutorial repo RESOURCES.md with actual kit repo URL

**Files:**
- Modify: `/home/velitchko/Documents/Projects/readme.md/RESOURCES.md` (Templates section)

- [ ] **Step 1: Update the Templates & Starter Kits section**

In `/home/velitchko/Documents/Projects/readme.md/RESOURCES.md`, replace the placeholder repo URL with the actual GitHub URL once the repo is pushed. Update the line:

```markdown
> A companion repository — **`vis-reproducibility-kit`** — is planned as a GitHub template repository
```

to:

```markdown
> **[vis-reproducibility-kit](https://github.com/visvar/vis-reproducibility-kit)** — GitHub template repository.
> Use via "Use this template" to start a new reproducible project.
```

- [ ] **Step 2: Commit**

```bash
git -C /home/velitchko/Documents/Projects/readme.md add RESOURCES.md
git -C /home/velitchko/Documents/Projects/readme.md commit -m "docs: link vis-reproducibility-kit in RESOURCES.md"
```

---

## Self-Review

**Spec coverage:**
- [x] stack-agnostic core layer → Task 3 + 4
- [x] Python (pip + venv) → Task 5
- [x] Python (conda) → Task 5
- [x] R (renv + Quarto) → Task 6
- [x] JavaScript → Task 7
- [x] TypeScript → Task 7
- [x] Jupyter (nbstripout, papermill, kernel) → Task 8
- [x] C++ (CMake + vcpkg + CGAL example) → Task 8
- [x] Docker (Python, R, Node) → Task 9
- [x] LaTeX number injection → Task 10
- [x] Two-layer design principle (core + stacks) → root README in Task 2

**Placeholder scan:** No TBDs, TODOs, or "implement later" present.

**Type consistency:** No shared types or function signatures across tasks — each task produces standalone files.
