# Resources: Reproducible Visualization Research

> Curated annotated resources for the [README.md Tutorial](README.md) at EuroVis 2026.
> Each entry describes what the tool or paper is and when a visualization researcher would reach for it.

## Contents

- [Version Control](#version-control)
- [Documentation](#documentation)
- [Dependency Management](#dependency-management)
- [LLM & AI Reproducibility](#llm--ai-reproducibility)
- [Deployment Platforms](#deployment-platforms)
- [Archival & Pre-registration](#archival--pre-registration)
- [Reproducibility Certification](#reproducibility-certification)
- [Study Replication](#study-replication)
- [Key Papers & Readings](#key-papers--readings)
- [Templates & Starter Kits](#templates--starter-kits)

---

## Version Control

- **[Git](https://git-scm.com)** — The standard distributed version control system. Essential baseline: `git init` at project start, commit after every working state, and `git tag` before submission to mark the exact code that produced your published results.
- **[GitHub](https://github.com) / [GitLab](https://gitlab.com)** — Hosting platforms for Git repositories. GitHub is the most common choice for open visualization research; GitLab offers self-hosted options for institutional or anonymous review workflows.
- **[Git LFS](https://git-lfs.com)** — Git Large File Storage. Use when your repository contains datasets, pre-processed outputs, or binary assets too large for standard Git. Keeps the repository cloneable without bloating history.
- **Anonymous repositories** — GitHub supports private repositories that can be shared via a secret link during review, addressing anonymity requirements while keeping code accessible to reviewers before publication.

---

## Documentation

- **README structure** — A reproducible README answers three questions: what is this, how do I run it, what does it produce. See the [demo script in this repo](tutorial-materials/part1-reproducible-repo/demo-script.md) for a working example covering requirements, setup, usage, project structure, and contact.
- **`tree` command** — Run `tree -L 2 --dirsfirst` to generate an accurate project structure diagram. Paste the output directly into your README rather than writing it by hand — it stays accurate as the project evolves.
- **CONTRIBUTING.md** — Documents how others (and future you) can extend the codebase: coding conventions, how to add a new figure script, how to update dependencies. Reduces friction for collaborators and reviewers who want to extend your work.
- **LaTeX number injection** — Script-driven embedding of computed values directly into LaTeX source, eliminating copy-paste errors between analysis and paper. See `tutorial-materials/part2-approaches/` for an example. Any number in your paper that comes from code should be injected this way.
- **In-paper reproducibility statement** — A brief statement in the main text pointing to the repository, plus a detailed appendix describing structure, data availability, and how to reproduce each key result. Reviewers expect this; providing it proactively signals good practice.

---

## Dependency Management

- **`requirements.txt` + `pip freeze`** — The minimal Python reproducibility step. Run `pip freeze > requirements.txt` immediately after your code runs cleanly. Anyone else (or you in 6 months) can recreate the exact environment with `pip install -r requirements.txt`.
- **Python `venv`** — Create a project-local virtual environment (`python -m venv .venv`) before installing anything. This isolates your project's packages from your system and from other projects, preventing the most common "it works on my machine" failure mode.
- **conda + `environment.yml`** — Use when your project mixes Python with R, compiled C extensions, or CUDA dependencies. `conda env export > environment.yml` captures the full environment including non-Python packages.
- **`renv`** — R's project-local dependency isolation and lock file system. Run `renv::init()` at project start to capture exact package versions; `renv::restore()` reproduces the environment on another machine.
- **`package-lock.json`** — The Node.js equivalent of a pinned requirements file. **Do not add it to `.gitignore`** — this is the most common mistake in JavaScript visualization projects. Committing it ensures `npm install` produces the exact same dependency tree on every machine.
- **CMake + vcpkg / Conan** — For C++ projects (e.g., CGAL-based network visualization), use a package manager (vcpkg or Conan) with a manifest file (`vcpkg.json` or `conanfile.txt`) and a pinned CMakePresets.json to capture the full build configuration.
- **[Docker](https://www.docker.com)** — Containerizes the full environment (OS, runtime, packages) into a single portable image. Best for complex system-level dependencies or when you want reviewers to reproduce results with one command. Not a catch-all — adds overhead — but worth it for complex setups.
- **[Apptainer](https://apptainer.org)** (formerly Singularity) — HPC-friendly container runtime. Use instead of Docker when your target compute environment is a university cluster where Docker is unavailable or restricted.

---

## LLM & AI Reproducibility

- **[`AGENTS.md`](tutorial-materials/part1-reproducible-repo/AGENTS.md)** — A project-level archiving protocol for LLM-assisted tasks. Write the protocol once; point each tool at it via its own config file (CLAUDE.md for Claude Code, `.cursorrules` for Cursor, AGENTS.md is read natively by Codex). See the example in this repo.
- **[`gen_ai.md`](tutorial-materials/part1-reproducible-repo/gen_ai.md)** — A task index log: every LLM task that contributes to results, figures, or analysis gets a row with the date, provider, model, and links to archived prompt and output files. Provides a full audit trail. See the example in this repo.
- **Conversation exports** — Most LLM interfaces (ChatGPT, Claude) offer conversation export or shareable link features. Archive these alongside your results. Note: shared links can expire; local exports are more durable.
- **Model reporting** — When reporting LLM-assisted results, always include: model name and version, access date, temperature and other generation parameters, and the full prompt. Model capabilities shift rapidly; results obtained with one version may not be reproducible with a later one.
- **Prompt versioning** — Treat prompts as code. Store them under `llm_outputs/` or a `prompts/` directory, version-controlled alongside the outputs they produced.

---

## Deployment Platforms

- **[GitHub Pages](https://pages.github.com)** — Free static hosting directly from a GitHub repository. The simplest path for deploying interactive visualization systems built with D3, Vega-Lite, or other browser-based frameworks. A live URL alongside a paper significantly lowers the barrier for reviewers.
- **[Netlify](https://netlify.com)** — Static hosting with continuous deployment from Git. Useful when GitHub Pages is too limited (custom build steps, redirects, environment variables). Offers deploy previews for each branch.
- **[Vercel](https://vercel.com)** — Full-stack platform supporting server-side rendering and edge functions. Use when your visualization system requires a backend (e.g., a data API or server-side processing).
- **[Render](https://render.com)** — Full-stack hosting with support for Dockerized applications. A good choice when deploying a containerized research system for review or demonstration.
- **[Binder](https://mybinder.org)** — Turns any public GitHub repository into a live, executable Jupyter environment — no sign-up required for visitors. Use to let reviewers run your Python or R notebook analysis directly in a browser without any local setup.
- **[Observable](https://observablehq.com)** — Reactive notebook environment for JavaScript-based visualization. Supports embedding, forking, and version history. A natural fit for interactive D3 or Vega-Lite analyses that you want others to explore and extend.
- **[ngrok](https://ngrok.com)** — Creates a public tunnel to a locally running server. Useful during review or demonstration when you want to share a running visualization system temporarily without a full deployment.

---

## Archival & Pre-registration

### Long-term Archival

- **[Zenodo](https://zenodo.org)** — CERN-hosted repository that mints a DOI for any deposited artifact. The preferred platform for GRSI code snapshots. Free, supports versioned deposits, and guarantees 20+ year preservation. Use the GitHub → Zenodo integration to automatically archive each tagged release.
- **[OSF](https://osf.io)** (Open Science Framework) — Hosts pre-registrations, data, materials, and pre-prints under a single project DOI. Particularly useful for empirical studies where you want to link your pre-registration, study materials, and final data in one place.
- **[Software Heritage](https://www.softwareheritage.org)** — Automatically archives all public GitHub/GitLab repositories. Provides a permanent SWHID (Software Hash Identifier) for any commit. Use as a citation-stable identifier for your code when Zenodo is not an option.

### Pre-print & Precedence

- **[arXiv](https://arxiv.org)** — Pre-print server widely used in CS and visualization. Establishes a timestamped public record of your work before formal publication. Accepted by most visualization venues.
- **[Figshare](https://figshare.com)** — General-purpose data and figure repository with DOI minting. Useful for depositing large supplemental datasets, high-resolution figures, or video supplements that cannot be hosted in the paper repository.
- **[Dryad](https://datadryad.org)** — Research data repository with a focus on long-term preservation and curation. Use for raw experimental data from user studies, particularly when the data has reuse potential beyond your specific paper.

### Pre-registration

- **[AsPredicted](https://aspredicted.org)** — Lightweight pre-registration form for empirical studies. Answers nine questions about the study design before data collection. Lower overhead than OSF pre-registration; sufficient for most perceptual visualization studies.
- **[OSF Pre-registration](https://osf.io/prereg/)** — Full-featured pre-registration on the Open Science Framework. Use for studies with complex designs where you want to document hypotheses, analysis plan, and exclusion criteria in detail.

---

## Reproducibility Certification

- **[GRSI](https://www.replicabilitystamp.org)** (Graphics Replicability Stamp Initiative) — A community-run certification for graphics and visualization papers whose code and data allow independent reproduction of the key results. Benefits include improved citation rates, enhanced credibility during review, and increased visibility. The process requires a working repository and a reviewer who independently runs your code. Building reproducibility in from the start (Part I workflows) makes GRSI straightforward rather than a retrofit. See Isenberg [2024] for an empirical analysis of what GRSI-certified papers look like in practice.
- **[ACM Artifact Review and Badging](https://www.acm.org/publications/policies/artifact-review-and-badging-current)** — ACM's formal artifact evaluation framework, offering badges for artifacts that are functional, reusable, and available. Relevant for papers at ACM venues; criteria align closely with GRSI requirements.
- **IEEE artifact badges** — IEEE Computer Society venues including IEEE VIS are adopting artifact evaluation processes. Check the specific venue's call for papers for current badge criteria and submission process.

---

## Study Replication

- **[reVISit 2](https://doi.org/10/hbkxwp)** — A framework supporting the full experiment lifecycle: design, execution, automatic provenance tracking, and participant replay. Best paper at IEEE VIS 2025. Use when building or replicating perceptual visualization studies — the DSL-based study definition makes experimental logic explicit and shareable in a way that paper descriptions alone cannot.
- **[reVISit](https://doi.org/10/hbdjdh)** — The original reVISit framework for scalable evaluation of interactive visualizations. Provides the foundation that reVISit 2 extends.
- **Provenance tracking** — Recording interaction logs and study execution state allows detailed inspection of individual participant sessions and independent verification of reported results. Essential for studies where interaction behavior is part of what is being measured.
- **Experimental structure documentation** — Perceptual studies depend on tasks, stimuli, timing, counterbalancing, and interaction constraints. Incomplete specification of these is a major barrier to replication. Document all of these explicitly alongside your statistical analysis.

---

## Key Papers & Readings

Visualization-community-specific literature on reproducibility and replicability, in chronological order.

- **[Haroz (2018) — Open practices in visualization research](https://doi.org/10/gtw4sp)** — Surveys open data and material sharing at IEEE VIS. Foundational baseline for the community; documents citation benefits of open practices.
- **[Kosara & Haroz (2018) — Skipping the replication crisis in visualization](https://doi.org/10/gtw4sq)** — Identifies threats to study validity specific to visualization experiments and proposes concrete countermeasures. Establishes the key threat taxonomy and the definition of reproducibility (same data + code → same results) used in this tutorial.
- **[Sukumar & Metoyer (2018) — Towards designing unbiased replication studies](https://doi.org/10/gtw4sr)** — Framework for designing replication studies in information visualization that control for bias. Establishes the definition of replicability (different data + same method → consistent findings) used in this tutorial.
- **[Quadri & Rosen (2019) — You can't publish replication studies (and how to anyways)](https://doi.org/10/gtxgh9)** — Proposes re-evaluation, expansion, and specialization strategies for making replication studies publishable. Essential reading for anyone designing a study that extends or validates prior work.
- **[Fekete & Freire (2020) — Exploring reproducibility in visualization](https://doi.org/10/ghd59m)** — Surveys the reproducibility landscape in visualization; documents that most researchers cannot recreate their own results from two years ago. The community reference for reproducibility definitions and the reproducibility crisis framing used in this tutorial.
- **[Meyer & Dykes (2020) — Criteria for rigor in visualization design study](https://doi.org/10/gf6724)** — Establishes transparency as a fundamental criterion for methodological rigor in design studies. Positions reproducibility within a broader movement toward rigorous research practice across visualization's diverse methodologies.
- **[Isenberg (2022) — Personal experiences of providing and using research prototypes](https://doi.org/10/gr2d83)** — First-person account of the challenges and benefits of sharing research code and applying for GRSI stamps. Practical perspective grounded in direct experience.
- **[Ding et al. (2023) — reVISit: Supporting scalable evaluation of interactive visualizations](https://doi.org/10/hbdjdh)** — Introduces the reVISit framework for study design and execution. See Part III of this tutorial.
- **[Franke, Reina & Koch (2023) — Toward reproducible visual analysis results](https://doi.org/10/gtw42q)** — Proposes a typology of reproducibility aspects for visualization design. Source for the estimate that researchers spend 20–30% of their time attempting to reproduce others' work.
- **[Reina (2023) — Can image data facilitate reproducibility of graphics and visualizations?](https://doi.org/10/gtw4nt)** — Introduces lightweight methods for embedding pipeline state in rendered images as a trusted scientific practice. Novel approach to making figures self-documenting.
- **[Isenberg (2024) — The state of reproducibility stamps for visualization research papers](https://doi.org/10/nt3t)** — Quantifies how few published visualization works meet reproducibility standards and analyzes what GRSI-certified papers look like. The current empirical baseline for the community.
- **[Cutler et al. (2026) — ReVISit 2: A full experiment life cycle user study framework](https://doi.org/10/hbkxwp)** — IEEE VIS 2025 best paper. Extends reVISit with full lifecycle support from design through dissemination. Current state of the art for replicable empirical visualization research.

---

## Templates & Starter Kits

> **[vis-reproducibility-kit](https://github.com/visvar/vis-reproducibility-kit)** — GitHub template repository. Use via "Use this template" to start a new reproducible project. Provides stack-agnostic scaffolding (`core/`) plus per-language dependency examples (`stacks/`) covering Python, R, JavaScript/TypeScript, Jupyter, and C++.

**Planned structure:**

```
vis-reproducibility-kit/
├── core/                       # Stack-agnostic (use this regardless of language)
│   ├── README-template.md      # What/how/what-it-produces structure from the demo
│   ├── AGENTS.md               # LLM archiving protocol template
│   ├── gen_ai.md               # LLM usage log template
│   ├── folder-structure.md     # Recommended layout: data/raw, data/processed,
│   │                           #   scripts, figures, paper
│   ├── checklists/
│   │   ├── minimal-reproducible.md   # Part I checklist from the live demo
│   │   └── grsi-application.md       # GRSI submission checklist
│   └── run_all.sh              # Figure regeneration script template
│
├── stacks/                     # Pick the one that matches your tech
│   ├── python/                 # venv + requirements.txt + pip freeze
│   ├── python-conda/           # conda + environment.yml
│   ├── r/                      # renv + renv.lock
│   ├── javascript/             # npm + package-lock.json
│   ├── typescript/             # TypeScript + tsconfig + package-lock.json
│   ├── jupyter/                # Notebook reproducibility: nbstripout, papermill
│   └── cpp/                    # CMake + vcpkg manifest or Conan conanfile
│
├── docker/
│   ├── Dockerfile.python       # Python + common VIS deps
│   ├── Dockerfile.r            # R + ggplot2 + tidyverse
│   └── Dockerfile.node         # Node + build tools
│
└── latex/
    └── number-injection/       # LaTeX number injection example (Tobias Isenberg)
```

In the meantime, the live demo files from Part I are available directly in this repository:

| File | Description |
|------|-------------|
| [`AGENTS.md`](tutorial-materials/part1-reproducible-repo/AGENTS.md) | LLM archiving protocol template |
| [`gen_ai.md`](tutorial-materials/part1-reproducible-repo/gen_ai.md) | LLM usage log template |
| [`run_all.sh`](tutorial-materials/part1-reproducible-repo/run_all.sh) | Figure regeneration script |
| [`figure3.py`](tutorial-materials/part1-reproducible-repo/figure3.py) | Example one-script-per-figure pattern |
