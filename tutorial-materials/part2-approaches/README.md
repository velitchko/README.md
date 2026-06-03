# Part II — How to Approach Reproducible Research

> Tutorial segment: 9:25–9:45 · Presenter: Tobias Isenberg

This directory contains examples and materials for Part II of the tutorial.

## Contents

- **LaTeX results injection example**: workflow for embedding computed results directly from your analysis scripts into your LaTeX paper source, eliminating extra work and possible copy-paste errors between analysis and paper

## Structure

```
part2-approaches/
├── latex-number-injection/
│   ├── README.md
│   ├── example-paper.tex (the LaTeX source example)
│   ├── example-paper-result.pdf (the produced PDF output, renamed so it is not overwritten)
│   ├── latex-injection.py (the example for the analysis script that produces the injection file)
│   ├── numbersFromScript-generated.tex (the script-produced number injection file, renamed so it is not overwritten)
│   └── orcid.pdf (ORCID icon)
└── README.md (this file)
```

## Topics covered in this segment

- scripting data analysis and generation of visuals
- injecting computed numbers into LaTeX to avoid manual transcription errors
- scripting user studies and pre-registration
- reproducibility for paper reviewers: archival platforms
- GRSI certification process and making reproducibility analysis easy for GRSI reviewers
