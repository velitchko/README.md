# Awesome Reproducibility Resources

> Curated annotated resources for reproducible visualization research.
> Each entry describes what the tool or paper is and when a visualization researcher would reach for it.

## Contents

- [Awesome Reproducibility Resources](#awesome-reproducibility-resources)
  - [Contents](#contents)
  - [Version Control](#version-control)
  - [Documentation](#documentation)
  - [Dependency Management by Language](#dependency-management-by-language)
    - [Cross-Language Containerization](#cross-language-containerization)
    - [Python](#python)
    - [R](#r)
    - [JavaScript / TypeScript](#javascript--typescript)
    - [C++](#c)
    - [Java](#java)
  - [LLM \& AI Reproducibility](#llm--ai-reproducibility)
  - [Deployment Platforms](#deployment-platforms)
  - [Archival \& Pre-registration](#archival--pre-registration)
    - [Long-term Archival](#long-term-archival)
    - [Pre-print \& Precedence](#pre-print--precedence)
    - [Pre-registration](#pre-registration)
  - [Reproducibility Certification](#reproducibility-certification)
  - [Study Replication](#study-replication)

---

## Version Control

- **[Git](https://git-scm.com)**: The standard distributed version control system. `git init` at project start, commit after every working state, and `git tag` before submission to mark the exact code that produced your published results.
- **[GitHub](https://github.com) / [GitLab](https://gitlab.com)**: Hosting platforms for Git repositories. GitHub is widely used for open visualization research; GitLab offers self-hosted options for institutional or anonymous review workflows.
- **[Git LFS](https://git-lfs.com)**: Git Large File Storage. Use when your repository contains datasets, pre-processed outputs, or binary assets too large for standard Git. Keeps the repository cloneable without bloating history.
- **Anonymous code sharing for review**: Several options exist for sharing code without revealing your identity. [anonymous.4open.science](https://anonymous.4open.science/) is often one of the lowest-friction options: paste a GitHub URL and get an anonymized link that strips your username. [OSF's](https://osf.io) view-only links support an "anonymize" option that hides contributor names while giving reviewers full access to files and data. A throwaway [GitHub](https://github.com) account (a fresh account with a neutral username) is the simplest fallback, though it requires managing a separate account until after acceptance.

---

## Documentation

- **README structure**: At minimum, a reproducible README answers three questions: what is this, how do I run it, what does it produce. See the [demo script in this repo](../tutorial-materials/part1-reproducible-repo/demo-script.md) for a working example covering requirements, setup, usage, project structure, and contact.
- **`tree` command**: Run `tree -L 2 --dirsfirst` to generate an accurate project structure diagram. Paste the output directly into your README and describe the directory structure.

| Platform | Command |
|----------|---------|
| Linux | `tree -L 2 --dirsfirst` |
| macOS | `tree -L 2` |
| Windows (Command Prompt or PowerShell) | `tree /F /A` |

> (`tree` may need to be installed separately on macOS and some Linux distributions.)
> 
- **CONTRIBUTING.md**: (Optional) Documents how others (and future you) can extend the codebase: coding conventions, how to add a new figure script, how to update dependencies.
- **LaTeX injection**: You can use a python (or other scripting language) to compute values and inject these directly into LaTeX source. This eliminates any copy-paste errors between analysis and paper. See `../tutorial-materials/part2-approaches/` for an example. Any number in your paper that comes from code should be injected this way.
- **In-paper reproducibility statement**: A brief statement in the main text pointing to the repository, plus a detailed appendix describing structure, data availability, and how to reproduce each key result. Many reviewers and venues increasingly expect this; providing it proactively signals good practice.

---

## Dependency Management by Language

> **Work in progress.** This section is incomplete. Help complete it by contributing. See [CONTRIBUTING.md](../CONTRIBUTING.md).

### Cross-Language Containerization

- **[Docker](https://www.docker.com)**: Containerizes the full environment (OS, runtime, packages) into a single portable image. Best for complex system-level dependencies or when you want reviewers to reproduce results with one command. Adds overhead but worth it for complex setups.
- **[Apptainer](https://apptainer.org)** (formerly Singularity): HPC-friendly container runtime. Use instead of Docker when your target compute environment is a university cluster where Docker is unavailable or restricted.

### Python

- **`venv` + `pip freeze`**: `python -m venv .venv` creates a project-local environment; `pip freeze > requirements.txt` pins the dependencies.
- **[conda](https://docs.conda.io) + `environment.yml`**: Use when mixing Python with R, C extensions, or CUDA. `conda env export > environment.yml` captures the full environment including non-Python packages.
- **[Poetry](https://python-poetry.org)**: Combines dependency declaration (`pyproject.toml`) and lock file (`poetry.lock`) in one tool. A good choice for projects that are also distributed as packages. `poetry install` reproduces the environment exactly.
- **[uv](https://github.com/astral-sh/uv)**: A *very* fast Python package and project manager (Rust-based). Can replace traditional `pip`/`venv` workflows; generates a `uv.lock` file. Worth adopting for new projects where install speed matters.
- **[nbstripout](https://github.com/kynan/nbstripout)**: Git filter that strips output cells from Jupyter notebooks before committing. Prevents large diffs and binary blobs from cell outputs polluting version history. Install once per repo with `nbstripout --install`.
- **[papermill](https://papermill.readthedocs.io)**: Parameterizes and executes Jupyter notebooks from the command line. Use to run the same notebook with different datasets or parameters reproducibly, and to include notebooks in a `run_all.sh` pipeline.

### R

- **[`renv`](https://rstudio.github.io/renv/)**: R's project-local dependency isolation and lock file system. Run `renv::init()` at project start to capture exact package versions; `renv::restore()` reproduces the environment on another machine.

### JavaScript / TypeScript

- **`package-lock.json` + `npm ci`**: Version pinning for NodeJS projects. **Do not add `package-lock.json` to `.gitignore`**. A common mistake in JS visualization projects. Use `npm ci` (not `npm install`) in reproduction instructions; it installs exactly what the lock file specifies.
- **[`.nvmrc`](https://github.com/nvm-sh/nvm#nvmrc)**: A single-line file pinning the NodeJS version (`echo "20" > .nvmrc`). Anyone with [nvm](https://github.com/nvm-sh/nvm) can run `nvm use` to switch to the exact version. Strongly recommended when NodeJS version affects build output.
- **[Vite](https://vite.dev)**: Build tool used by this project. Pin the version in `package.json`; the `vite.config.js` is part of the reproducible artifact. Check it into version control.
- **[TypeScript `tsconfig.json`](https://www.typescriptlang.org/tsconfig)**: Pinning `"target"` and `"lib"` in `tsconfig.json` ensures the same JS output regardless of TypeScript version. Commit the config alongside the lock file.
- **Framework-specific (React / Vue / Angular)**: Usually no additional reproducibility mechanism is needed beyond lockfiles and version pinning above. The framework version is captured via `package-lock.json`. The main risk is unpinned peer dependencies — audit with `npm ls` before archiving.

### C++

- **[CMake](https://cmake.org) + `CMakePresets.json`**: CMake is the de facto build system for C++ visualization work (CGAL, VTK, OpenGL). `CMakePresets.json` captures compiler flags, build type, and toolchain settings so that `cmake --preset <name>` reproduces the exact build configuration.
- **[vcpkg](https://vcpkg.io)**: Microsoft's C++ package manager. A `vcpkg.json` manifest pins library versions; `vcpkg install` restores them. Integrates directly with CMake. Recommended for CGAL and other geometry processing dependencies.
- **[Conan](https://conan.io)**: An alternative C++ package manager with a `conanfile.txt` or `conanfile.py`. More flexible than vcpkg for projects with complex or cross-platform dependency graphs.
- **[CGAL](https://www.cgal.org)**: If your visualization involves computational geometry, pin the CGAL version explicitly in your vcpkg manifest or CMakeLists. CGAL APIs change between minor versions that might affect numerical results.

### Java

- **[Maven](https://maven.apache.org) + `pom.xml`**: Declare all dependency versions explicitly in `pom.xml`. Avoid version ranges (`[1.0,2.0)`) which resolve differently over time. Use the Maven Dependency Plugin to generate a bill of materials before archiving.
- **[Gradle](https://gradle.org) + dependency locking**: Gradle supports lock files via `dependencyLocking`. Enable with `configurations.all { resolutionStrategy.activateDependencyLocking() }` and commit the generated `gradle.lockfile`. Without this, `implementation 'group:artifact:1.+'` can resolve to different versions on different machines.
- **`.java-version` / `.sdkmanrc`**: Pin the JDK version using [SDKMAN!](https://sdkman.io/) and a `.sdkmanrc` file, or a `.java-version` file readable by [jEnv](https://www.jenv.be/). JVM behavior and standard library output can differ across major versions.

---

## LLM & AI Reproducibility

> Norms and tooling for LLM reproducibility are still evolving. Expect this section to grow. Some lightweight templates `AGENTS.md` and `gen_ai.md` are provided as work-in-progress materials. Check them out if you're interested: [`AGENTS.md`](../tutorial-materials/part1-reproducible-repo/AGENTS.md) · [`gen_ai.md`](../tutorial-materials/part1-reproducible-repo/gen_ai.md).

- **Log every LLM task that touches results**: If a model helped write analysis code, clean data, or interpret output, log it. Take note of the date, provider, model version, and a link to the archived prompt and output.
- **Report the model version and access date**: `gpt-4o (accessed 2025-11-03)` is more specific than `GPT-4` or `ChatGPTG`. Model behavior changes silently between versions and over time.
- **Use temperature 0 for deterministic outputs**: If you use local models you can specify parameters. Use temperature 0 when possible to maximize reproducibility. Note that hosted models may still produce different outputs across runs.
- **Prefer local exports over shared links**: Conversation export files are less dependent on platform availability than shareable URLs. Shared URLs can (and do) expire and can be revoked.

---

## Deployment Platforms

- **[GitHub Pages](https://pages.github.com)**: Free static hosting directly from a GitHub repository. The simplest path for deploying interactive visualization systems built with D3, Vega-Lite, or other browser-based frameworks. A live URL alongside a paper significantly lowers the barrier for reviewers.
- **[Netlify](https://netlify.com)**: Static hosting with continuous deployment from Git. Useful when GitHub Pages is too limited (custom build steps, redirects, environment variables). Offers deploy previews for each branch.
- **[Vercel](https://vercel.com)**: Full-stack platform supporting server-side rendering and edge functions. Use when your visualization system requires a backend (e.g., a data API or server-side processing).
- **[Render](https://render.com)**: Full-stack hosting with support for Dockerized applications. A good choice when deploying a containerized research system for review or demonstration.
- **[Binder](https://mybinder.org)**: Turns any public GitHub repository into a live, executable Jupyter environment: no sign-up required for visitors. Use to let reviewers run your Python or R notebook analysis directly in a browser without any local setup.
- **[Observable](https://observablehq.com)**: Reactive notebook environment for JavaScript-based visualization. Supports embedding, forking, and version history. Great for interactive D3 or Vega-Lite analyses that you want others to explore and extend.
- **[ngrok](https://ngrok.com)**: Creates a public tunnel to a locally running server. Useful during review or demonstration when you want to share a running visualization system temporarily without a full deployment.

---

## Archival & Pre-registration

### Long-term Archival

- **[Zenodo](https://zenodo.org)**: CERN-hosted repository that mints a DOI for any deposited artifact. The preferred platform for GRSI code snapshots. Free, supports versioned deposits, and designed for long-term preservation. Use the GitHub → Zenodo integration to automatically archive each tagged release.
- **[OSF](https://osf.io)** (Open Science Framework): Hosts pre-registrations, data, materials, and pre-prints under a single project DOI. Particularly useful for empirical studies where you want to link your pre-registration, study materials, and final data in one place.
- **[Software Heritage](https://www.softwareheritage.org)**: Automatically archives all public GitHub/GitLab repositories. Provides a permanent SWHID (Software Hash Identifier) for any commit. Use as a citation-stable identifier for your code when Zenodo is not an option.

### Pre-print & Precedence

- **[Open Policy Finder](https://openpolicyfinder.jisc.ac.uk/)**: Database of journal and publisher open access policies. Check this before submitting to find if your target venue allows preprints, which version you are permitted to share, and whether an embargo applies.
- **[arXiv](https://arxiv.org)**: Pre-print server widely used in CS and visualization. Establishes a timestamped public record of your work before formal publication. Accepted by many visualization venues, though policies vary — check your target venue.
- **[Figshare](https://figshare.com)**: General-purpose data and figure repository with DOI minting. Useful for depositing large supplemental datasets, high-resolution figures, or video supplements that cannot be hosted in the paper repository.
- **[Dryad](https://datadryad.org)**: Research data repository with a focus on long-term preservation and curation. Use for raw experimental data from user studies, particularly when the data has reuse potential beyond your specific paper.

### Pre-registration

- **[AsPredicted](https://aspredicted.org)**: Lightweight pre-registration form for empirical studies. Answers nine questions about the study design before data collection. Lower overhead than OSF pre-registration; sufficient for most perceptual visualization studies.
- **[OSF Pre-registration](https://help.osf.io/article/330-welcome-to-registrations)**: A document detailing all the steps to pre-register your study on the Open Science Framework. Useful for studies with complex designs where you want to document hypotheses, analysis plan, and exclusion criteria in detail.

---

## Reproducibility Certification

- **[GRSI](https://www.replicabilitystamp.org)** (Graphics Replicability Stamp Initiative): A community-run certification for graphics and visualization papers whose code and data allow independent reproduction of the key results. Awarded manuscripts may benefit from increased visibility and can be associated with higher citation counts in some analyses; see the [live statistics](https://www.replicabilitystamp.org/#statistics) for current numbers. The process requires a working repository and a reviewer who independently runs your code.
- **[ACM Artifact Review and Badging](https://www.acm.org/publications/policies/artifact-review-and-badging-current)**: ACM's formal artifact evaluation framework, offering badges for artifacts that are functional, reusable, and available. Relevant for papers at ACM venues; criteria align closely with GRSI requirements.
- **[IEEE artifact badges](https://ieeeaccess.ieee.org/authors/reproducibility/)**: Some IEEE venues have adopted artifact evaluation and badging processes. Check the specific venue's call for papers for current badge criteria and submission process.
- 
---

## Study Replication

- **[reVISit](https://revisit.dev)**: If you are doing evaluations and studies, you might want to use a framework supporting the full experiment lifecycle: design, execution, automatic provenance tracking, and participant replay. Useful when building or replicating perceptual visualization studies.
- **Provenance tracking**: Recording interaction logs and study execution state allows detailed inspection of individual participant sessions and independent verification of reported results. Essential for studies where interaction behavior is part of what is being measured.
- **Experimental structure documentation**: Perceptual studies depend on tasks, stimuli, timing, counterbalancing, and interaction constraints. Incomplete specification of these is a major barrier to replication. Document all of these explicitly alongside your statistical analysis.
