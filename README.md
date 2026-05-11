# README.md: A Tutorial on Reproducible Visualization Research

> **EuroVis 2026** · June 8, 2026 · Nottingham, UK · 09:00 + Room F5

Practical guidance and resources for creating reproducible visualization research from the start.

## About

Reproducibility is fundamental to scientific progress, yet most published visualization research remains difficult or impossible to reproduce. This 100-minute tutorial provides practical guidance on creating reproducible research from the start.

We cover reproducibility challenges across software artifacts, empirical studies, and the research process itself. Participants will learn workflows for version control, documentation, dependency management, and gain exposure to the GRSI certification process and reVISit 2 framework for study replication.

## Schedule

The tutorial is structured in three parts with interactive polling, live demonstrations, and open discussion.

| Time | Event |
|------|-------|
| 9:00–9:05 | Welcome & Introduction |
| 9:05–9:25 | **Part I: Why Reproducibility Matters?**<br>• The cost of irreproducibility<br>• Reproducibility vs. replicability<br>• Five core aspects: version control, documentation, dependencies, LLM/AI, deployment |
| 9:25–9:45 | **Part II: How to Approach Reproducible Research**<br>• GRSI certification process<br>• Archival platforms and pre-registration<br>• Making reproducibility easy for reviewers |
| 9:45–10:05 | **Part III: Replicating Studies**<br>• Replicability in perceptual studies<br>• Provenance tracking<br>• Live walkthrough: reVISit 2 framework |
| 10:05–10:20 | Discussion (Q&A) |
| 10:20–10:25 | Comments & Closing |

*Times are preliminary and may change*

## Organizers

### Velitchko Filipov
**TU Wien, Austria**  
[ORCID: 0000-0001-9592-2179](https://orcid.org/0000-0001-9592-2179) · [LinkedIn](#)

### Tobias Isenberg
**Université Paris-Saclay, CNRS, Inria, LISN, France**  
[ORCID: 0000-0001-7953-8644](https://orcid.org/0000-0001-7953-8644) · [LinkedIn](#)

### Alexander Lex
**TU Graz, Austria & University of Utah, USA**  
[ORCID: 0000-0001-6930-5468](https://orcid.org/0000-0001-6930-5468) · [LinkedIn](#)

## Resources

### Demo Files

The [`demo_files/`](demo_files/) directory contains everything needed to follow along with or reproduce the live demo from Part I of the tutorial.

| File | Description |
|------|-------------|
| [`demo-script.md`](demo_files/demo-script.md) | Full presenter script with step-by-step instructions for the live demo |
| [`figure3.py`](demo_files/figure3.py) | Example figure script: vertical bar chart of accuracy by condition |
| [`run_all.sh`](demo_files/run_all.sh) | Shell script to regenerate all figures in one command |
| [`results.csv`](demo_files/results.csv) | Sample dataset used by the figure scripts |
| [`AGENTS.md`](demo_files/AGENTS.md) | LLM archiving protocol — loaded by agent tools (Claude Code, Codex, Cursor) |
| [`gen_ai.md`](demo_files/gen_ai.md) | Example LLM usage log with task index and output references |
