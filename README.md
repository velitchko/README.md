# README.md: A Tutorial on Reproducible Visualization Research

> **EuroVis 2026** · Friday, June 12, 2026 · Nottingham, UK · 09:00 · Room F5

Practical guidance and resources for creating reproducible visualization research from the start.

Website: [README.md](https://velitchko.github.io/README.md)

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
[ORCID: 0000-0001-9592-2179](https://orcid.org/0000-0001-9592-2179) · [LinkedIn](https://www.linkedin.com/in/velitchko-filipov/)

### Tobias Isenberg
**Université Paris-Saclay, CNRS, Inria, LISN, France**  
[ORCID: 0000-0001-7953-8644](https://orcid.org/0000-0001-7953-8644) · [LinkedIn](https://www.linkedin.com/in/tobiasisenberg/)

### Alexander Lex
**TU Graz, Austria & University of Utah, USA**  
[ORCID: 0000-0001-6930-5468](https://orcid.org/0000-0001-6930-5468) · [LinkedIn](https://www.linkedin.com/in/alexander-lex-83961533/)

## Repository Structure

```
readme.md/
├── website/                              # Tutorial website (React + Vite, deployed to GitHub Pages)
├── tutorial-materials/                   # Hands-on materials organized by tutorial segment
│   ├── part1-reproducible-repo/          # Part I: version control, documentation, LLM logging
│   ├── part2-approaches/                 # Part II: GRSI, archiving, LaTeX number injection
│   └── part3-study-replication/          # Part III: reVISit 2 walkthrough, provenance tracking
├── tips-and-tricks/                      # Quick-reference tips for reproducible practice
└── awesome-reproducibility-resources/   # Annotated list of tools, platforms, and papers
```

## Resources

### Tutorial Materials

The [`tutorial-materials/`](tutorial-materials/) directory is organized by tutorial segment:

| Directory | Segment | Contents |
|-----------|---------|----------|
| [`part1-reproducible-repo/`](tutorial-materials/part1-reproducible-repo/) | Part I (9:05–9:25) | Live demo files: figure scripts, sample data, LLM logging setup (Velitchko Filipov) |
| [`part2-approaches/`](tutorial-materials/part2-approaches/) | Part II (9:25–9:45) | GRSI & archiving examples, LaTeX number injection (Tobias Isenberg) |
| [`part3-study-replication/`](tutorial-materials/part3-study-replication/) | Part III (9:45–10:05) | reVISit 2 walkthrough, provenance tracking (Alexander Lex) |

See each subdirectory's `README.md` for details on its contents.

### Tutorial Slides

The slides can be downloaded as [PDF](README.md.slides.pdf) or as [PPTX](README.md.pptx).

### Tips & Tricks

[`tips-and-tricks/`](tips-and-tricks/) contains quick-reference tips across version control, documentation, dependency management, LLM usage, data/figures, study design, and submission. Things you can adopt immediately.

### Awesome Reproducibility Resources

[`awesome-reproducibility-resources/`](awesome-reproducibility-resources/) is a curated, annotated list of tools, platforms, and papers for reproducible visualization research. Each entry explains what it is and when to use.
