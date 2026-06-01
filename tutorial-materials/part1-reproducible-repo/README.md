# Part I — Why Reproducibility Matters: Live Demo Files

> Tutorial segment: 9:05–9:25 · Presenter: Velitchko Filipov

This directory contains everything needed to follow along with or reproduce the live demo from Part I.

## Contents

| File | Description |
|------|-------------|
| `demo-script.md` | Full presenter script with step-by-step instructions |
| `figure3.py` | Example figure script: vertical bar chart of accuracy by condition |
| `run_all.sh` | Shell script to regenerate all figures in one command |
| `results.csv` | Sample dataset used by the figure scripts |
| `AGENTS.md` | LLM archiving protocol — loaded by agent tools (Claude Code, Codex, Cursor) |
| `gen_ai.md` | Example LLM usage log with task index and output references |

## Demo Overview

The live demo builds a minimum viable reproducible repo from scratch (~10 min):

1. `git init` + standard folder structure
2. README with setup/usage instructions
3. Virtual environment + pinned `requirements.txt`
4. One script per figure, relative paths only
5. `gen_ai.md` + `AGENTS.md` for LLM usage logging
6. Live LLM-assisted figure generation via Claude Code
7. Git tag before submission + fresh-clone test

## Pre-staging for Live Demo

Copy these files to `~/Projects/my_reproducible_paper` before the session:

```bash
cp -r tutorial-materials/part1-reproducible-repo ~/demo-assets
```
