# Live Demo Process — Part I

## README.md: A Tutorial on Reproducible Visualization Research
> EuroVIS 2026 · Velitchko Filipov · Tobias Isenberg · Alexander Lex

---

### 1. Initialize the Repository (~2 min)

Start with the most basic question: you have a paper, you have some code — what do you do first?

Gauge the room: who version controls from day one, and who adds git right before submission? React naturally to the split — it's almost always telling.

```bash
cd ~/Projects
mkdir my-eurovis-paper
cd my-eurovis-paper
git init
```

The commit history is the lab notebook — what changed, when, and why.

```bash
mkdir -p data/raw data/processed scripts figures paper llm_outputs
touch README.md AGENTS.md
```

Ask if anyone sees a folder they'd add. Take one or two suggestions and include them if sensible — the audience engagement is the point.

```bash
git add .
git commit -m "initial project structure"
```

---

### 2. Write the README (~3 min)

The README is the most important file in the repo. Not a placeholder — a document that answers three questions: what is this, how do I run it, what does it produce.

Build it live, asking the room to fill in each section as you go. The target: a stranger — or you in six months — can go from fresh clone to running system in under ten minutes. Write it for the most tired, confused version of yourself.

---PASTE / TYPE THIS INTO README.md---

# My EuroVIS Paper

One sentence description of what this is and what it produces.

## Paper

If you use this code, please cite:
> [Your citation here]

## Requirements

- Python 3.10+
- matplotlib, pandas (see requirements.txt)

## Setup

```bash
git clone https://github.com/yourname/my-eurovis-paper
cd my-eurovis-paper
python -m venv .venv
source .venv/bin/activate   # Windows: .venv\Scripts\activate
pip install -r requirements.txt
```

## Usage

```bash
# Reproduce Figure 3
python scripts/figure3.py --output figures/figure3.pdf

# Reproduce all figures
bash scripts/run_all.sh
```

## Project Structure

```
my-eurovis-paper/
├── data/
│   ├── raw/          # Original, never modified
│   └── processed/    # Derived from raw, always regenerable
├── scripts/          # One script per figure
├── figures/          # Output — never edit manually
└── paper/            # LaTeX source
```

## Data

Describe where data comes from, how to obtain it, any licensing.

## Contact

Velitchko Filipov — velitchko.filipov@tuwien.ac.at

---END README---

When you reach the Project Structure section, run `tree` in the terminal instead of typing it by hand — always accurate and takes two seconds:

```bash
tree -L 2 --dirsfirst
```

Good prompts for the room while writing:
- "What goes in Requirements? What do YOU always forget to list?"
- "What would you want to see in Usage that you've never seen?"

```bash
git add README.md
git commit -m "add README with setup and usage instructions"
```

---

### 3. Lock Dependencies (~2 min)

Before installing anything, isolate. Virtual environments mean the project's packages never collide with your system or another project. This is the one step people skip and then spend two hours debugging on someone else's machine.

```bash
python -m venv .venv
source .venv/bin/activate
```

Note for Windows: `.venv\Scripts\activate`. The prompt should show `(.venv)`. If it doesn't — some shells suppress it — verify with:

```bash
echo $VIRTUAL_ENV
which python
```

`VIRTUAL_ENV` prints the venv path if active, empty if not. `which python` should point into your `.venv` folder.

```bash
echo ".venv/" >> .gitignore
git add .gitignore
git commit -m "add .gitignore for virtual environment"
```

The most common reproducibility failure is dependency drift. You wrote code against pandas 1.5. Someone runs it with pandas 2.1. It either breaks — or worse, runs and gives the wrong answer with no error message.

```bash
pip install matplotlib pandas
pip freeze > requirements.txt
cat requirements.txt
```

Every package. Exact version. Pinned. Commit this immediately — right after the code runs cleanly. Not as an afterthought.

```bash
git add requirements.txt
git commit -m "pin dependencies"
```

For Node projects: `package-lock.json` already does this. The mistake people make is adding it to `.gitignore`. Don't. That file is what makes JS deps reproducible.

Docker takes this further — full environment isolation — but for most visualization research a pinned `requirements.txt` is sufficient and far more likely to actually get done.

---

### 4. One Script Per Figure (~3 min)

This is the practice that pays off most consistently: every figure in your paper, one command. That's the rule.

Copy the pre-staged files:

```bash
cp ~/demo-assets/results.csv data/processed/results.csv
cp ~/demo-assets/figure3.py scripts/figure3.py
cp ~/demo-assets/run_all.sh scripts/run_all.sh
chmod +x scripts/run_all.sh
```

Show `figure3.py` briefly in the editor:

```python
import matplotlib.pyplot as plt
import pandas as pd
import argparse

parser = argparse.ArgumentParser()
parser.add_argument('--output', required=True)
args = parser.parse_args()

df = pd.read_csv('data/processed/results.csv')

fig, ax = plt.subplots(figsize=(6, 4))
ax.bar(df['condition'], df['accuracy'], color='#4C72B0')
ax.set_xlabel('Condition')
ax.set_ylabel('Accuracy')
ax.set_title('Figure 3: Accuracy by Condition')
plt.tight_layout()
plt.savefig(args.output)
print(f"Saved to {args.output}")
```

Show `run_all.sh`:

```bash
#!/bin/bash
set -e   # exit immediately on error
cd "$(cd -- "$(dirname "$0")" && pwd)/.."   # always run from project root

echo "═══════════════════════════════════════"
echo "  Reproducing all paper figures"
echo "═══════════════════════════════════════"

for script in scripts/*.py; do
    name=$(basename "$script" .py)
    echo ""
    echo "Generating ${name}..."
    python "$script" --output "figures/${name}.pdf"
done

echo ""
echo "Done. All figures saved to figures/"
```

Three things to point out: relative paths everywhere (no hardcoded `/Users/velitchko/Desktop/...`), the `cd` at the top anchors the script to the project root so it works from anywhere, and `set -e` stops immediately on failure rather than silently continuing.

```bash
bash scripts/run_all.sh
timg figures/figure3.pdf
```

Ask the room: how many of your current figures can be reproduced with a single command? What's stopping the others? Let one or two people answer.

```bash
git add .
git commit -m "add figure scripts and processed data"
```

---

### 5. (OPTIONAL) Document LLM Usage (~2 min)

For anyone using LLMs in their research pipeline — not for writing polish or debugging code, but for anything that ends up in the results — this needs to be documented like any other dependency. The structure has two parts: a pre-prompt that instructs any LLM to document itself, and an index table of every task.

```bash
cp ~/demo-assets/gen_ai.md gen_ai.md
cp ~/demo-assets/AGENTS.md AGENTS.md
cat AGENTS.md
```

Walk through what's on screen: `AGENTS.md` holds the archiving protocol once, for the whole project. Different tools pick it up differently — Codex reads it automatically, Claude Code reads `CLAUDE.md`, Cursor has `.cursorrules`. So each tool needs a one-time pointer, but you write the protocol once. `gen_ai.md` is the index — every task gets a row, and the full prompt and output live as separate files in `llm_outputs/`.

Ask the room: what agent tool does your team use? Has anyone had to maintain separate instructions per tool? This tends to resonate.

```bash
git add gen_ai.md llm_outputs/ AGENTS.md
git commit -m "add LLM usage log and agent archiving protocol"
```

---

### 6. (OPTIONAL) LLM-Assisted Figure Generation (~2.5 min)

Each agent tool reads one config file at session start. For Claude Code that's `CLAUDE.md`. Point it at `AGENTS.md` so the protocol is loaded before any prompt.

```bash
cp AGENTS.md CLAUDE.md
git add CLAUDE.md
git commit -m "add CLAUDE.md with agent archiving protocol"
```

Each tool needs the protocol in its own config file — Claude Code reads `CLAUDE.md`, Codex reads `AGENTS.md` directly, Cursor gets `.cursorrules`. One source, one copy per tool. Now describe the task:

```bash
claude "Write scripts/figure2.py — use scripts/figure3.py as a
template (argparse --output, tight_layout, savefig, same style),
read data/processed/results.csv, produce a horizontal bar chart
of accuracy by condition instead of a vertical one."
```

After Claude Code finishes:

```bash
python scripts/figure2.py --output figures/figure2.pdf
timg figures/figure2.pdf
```

Show what got logged:

```bash
cat gen_ai.md
cat llm_outputs/task-002-output.md
```

The REPRODUCE block is at the bottom of the output file — the model wrote it because the pre-prompt told it to. The table row is already there. Nothing to fill in manually. Six months from now a reviewer asks: did an LLM write this? Open `gen_ai.md`, find the row, open the output file. That's the full audit trail.

```bash
git add scripts/figure2.py figures/figure2.pdf gen_ai.md llm_outputs/
git commit -m "add LLM-generated figure2 script and archive task-002"
```

---

### 7. Tag and Verify (~1 min)

Tag the version before submission. When a reviewer asks about something in six months, you want to check out exactly the code that produced your results — not your best guess at what it was.

```bash
git tag -a v1.0 -m "Version submitted to EuroVIS 2026"
git log --oneline
```

Show the clean commit history from today.

Before submitting: clone into a fresh directory. Follow only the README. If it breaks, fix it now — not after acceptance.

---

### Checklist

Walk through each item:

- [ ] Git repo initialized and pushed
- [ ] Folder structure: `raw/`, `processed/`, `scripts/`, `figures/`
- [ ] README.md: what, how, what it produces
- [ ] Virtual environment (`.venv/`) in `.gitignore`, setup documented in README
- [ ] Dependencies locked (`requirements.txt`)
- [ ] One script per figure, relative paths only
- [ ] (optional) `gen_ai.md` if LLMs in the research pipeline
- [ ] Fresh clone test before submission ← do this tonight

That's level two. Minimum viable. It took ten minutes. It will save three hours on revision day.

---

### Timing Guide

  Opening / framing       ~0.5 min
  1. Init repository      ~2.0 min
  2. README               ~3.0 min   ← most interactive, can trim
  3. Lock dependencies    ~2.0 min
  4. Figure scripts       ~3.0 min   ← the demo moment
  5. LLM usage log        ~2.0 min
  6. LLM figure gen       ~2.5 min   ← Claude Code live
  7. Tag and verify       ~1.0 min
  Checklist + handoff     ~1.0 min
  ──
  TOTAL                  ~17.0 min

  If running long: cut step 7 (tagging), go straight to checklist.
  If running very long: skip gen_ai.md live, say "it's in the repo".

---

### Pre-Staged Files

Copy these from `~/demo_files/` to `~/Projects/my_reproducible_paper` for the session.

---

### Common Pitfalls (pick 2–3 during step 4)

  ❌  Hardcoded paths  /Users/yourname/Desktop/project/data/...
  ❌  Missing dep in requirements.txt (installed globally, not listed)
  ❌  Data file not committed or too large for git (→ use [git LFS](https://git-lfs.com/))
  ❌  Undocumented preprocessing step ("just run this first")
  ❌  Random seed not set → non-deterministic outputs
  ❌  README says run script.py but file is called analysis_FINAL.py
  ❌  package-lock.json in .gitignore
