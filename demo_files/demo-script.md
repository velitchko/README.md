# LIVE DEMO SCRIPT — Part I

## README.md: A Tutorial on Reproducible Visualization Research
> EuroVIS 2026 · Velitchko Filipov · Tobias Isenberg  ·  Alexander Lex

### PIVOT SLIDE: "LET'S FIX IT" (~30 sec)

[Say:]
  "Enough of the why. Let's actually do it.
   We're going to build a minimum viable reproducible repo — live —
   right now. This will take about ten minutes.
   If you want to follow along, open a terminal. If not, just watch."

[Switch to terminal. Do not go back to slides until the checklist.]

### STEP 1: INIT THE REPO (~2 min)

[Say:]
  "First thing. We have a paper. We have some code. What do we do?"

[Ask the room:]
  "Who here version controls their research from day one?
   ...and who adds git right before submission?"
  [pause, note the split, react naturally]

[Type exactly:]
  cd ~/Desktop
  mkdir my-eurovis-paper
  cd my-eurovis-paper
  git init

[Say:]
  "That's it. We have a repo. Empty, but tracked.
   The commit history is going to be our lab notebook —
   what changed, when, and why."

[Continue typing:]
  mkdir -p data/raw data/processed scripts figures paper llm_outputs
  touch README.md AGENTS.md

[Ask the room:]
  "What else do you usually end up needing?
   Any folders I'm missing?"
  [take one or two suggestions, add them if sensible]

  git add .
  git commit -m "initial project structure"

[Say:]
  "First commit. We exist. We're reproducible in the most minimal
   sense — at least someone can clone this."



### STEP 2: THE README (~3 min) ───

[Say:]
  "Now the most important file in the repo. The README.
   Not a placeholder. Not a title and one line.
   A document that answers three questions:
   what is this, how do I run it, what does it produce."

[Open README.md in editor. Type the following live, asking the room
 to fill in each section:]

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

[Say — when you reach the Project Structure section:]
  "Instead of typing this by hand, just run tree in the terminal
   and paste the output. It's always accurate and takes two seconds."

[Switch to terminal briefly. Type:]
  tree -L 2 --dirsfirst

[Copy the output. Paste it into the README under Project Structure.
 Then switch back to the editor and continue.]

[Ask the room while typing:]
  "What goes in Requirements? What do YOU always forget to list?"
  "What would you want to see in Usage that you've never seen?"

[Say:]
  "Goal: a stranger — including you in six months —
   can go from fresh clone to running system in under ten minutes.
   Write it for the most tired, confused version of yourself."

[Save. Then:]
  git add README.md
  git commit -m "add README with setup and usage instructions"

---

### STEP 3: DEPENDENCIES (~2 min) ───

[Say:]
  "Before we install anything — isolate. Virtual environments
   mean your project's packages never collide with your system
   or another project. This is the one step people skip and
   then spend two hours debugging on someone else's machine."

[Type:]
  python -m venv .venv
  source .venv/bin/activate

[Say:]
  "On Windows that's .venv\\Scripts\\activate instead.
   Your prompt should now show (.venv) — everything you install
   from here stays in this folder.
   If you don't see it — some shells or prompt themes suppress it —
   you can always verify with:"

[Type:]
  echo $VIRTUAL_ENV
  which python

[Say:]
  "VIRTUAL_ENV prints the venv path if active, empty if not.
   And which python should point into your .venv folder."

[Type:]
  echo ".venv/" >> .gitignore
  git add .gitignore
  git commit -m "add .gitignore for virtual environment"

[Say:]
  "Most common reproducibility failure: dependency drift.
   You wrote code against pandas 1.5.
   Someone runs it with pandas 2.1.
   It either breaks — or worse — runs and gives the wrong answer
   with no error message."

[Type:]
  pip install matplotlib pandas
  pip freeze > requirements.txt
  cat requirements.txt

[Say:]
  "Every package. Exact version. Pinned.
   Commit this immediately — right after the code runs cleanly.
   Not as an afterthought."

[Type:]
  git add requirements.txt
  git commit -m "pin dependencies"

[If using JavaScript, mention:]
  "For Node projects: package-lock.json already does this.
   The mistake people make is adding it to .gitignore.
   Don't. That file is what makes your JS deps reproducible."

[Say:]
  "Docker takes this further — full environment isolation —
   but for most visualization research a pinned requirements.txt
   is sufficient and way more likely to actually get done."

---

### STEP 4: FIGURE SCRIPTS (~3 min) ───

[Say:]
  "This is the one that pays off most consistently.
   Every figure in your paper — one command. That's the rule."

[Copy pre-staged files in:]
  cp ~/demo-assets/results.csv data/processed/results.csv
  cp ~/demo-assets/figure3.py scripts/figure3.py
  cp ~/demo-assets/run_all.sh scripts/run_all.sh
  chmod +x scripts/run_all.sh

[Show the script briefly in editor — figure3.py should look like:]

---CONTENTS OF scripts/figure3.py---
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
---END---

[Show run_all.sh:]

---CONTENTS OF scripts/run_all.sh---
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
---END---

[Say:]
  "Notice three things: relative paths everywhere, no hardcoded
   /Users/velitchko/Desktop/... anywhere.
   The cd at the top anchors the script to the project root —
   so it works whether you call it from the root, from scripts/,
   or from anywhere else.
   And set -e — if anything breaks, it stops immediately
   rather than silently continuing."

[Run it:]
  bash scripts/run_all.sh

[Type:]
  timg figures/figure3.pdf

[Ask the room:]
  "How many of your current figures can be reproduced
   with a single command like this?
   What's stopping the others?"
  [let one or two people answer]

[Type:]
  git add .
  git commit -m "add figure scripts and processed data"

---

### STEP 5: GEN_AI.MD (~2 min) ───

[Say:]
  "One more file. For those of you using LLMs in your research
   pipeline — not for writing polish or debugging code,
   but for anything that ends up in your results —
   this needs to be documented like any other dependency.
   The structure here has two parts: a pre-prompt that instructs
   any LLM to document itself, and an index table of every task."

[Type:]
  cp ~/demo-assets/gen_ai.md gen_ai.md
  cp ~/demo-assets/AGENTS.md AGENTS.md
  cat AGENTS.md

[Say — walk through what they see:]
  "AGENTS.md holds the archiving protocol once, for the whole project.
   Different tools pick it up differently — Codex reads it
   automatically, Claude Code reads CLAUDE.md, Cursor has
   .cursorrules. So each tool needs a one-time pointer to this file.
   But you write the protocol once. That's the point.
   gen_ai.md is the index — every task gets a row and the full
   prompt and output live as separate files in llm_outputs/."

[Ask the room:]
  "What agent tool does your team use?
   Has anyone had to maintain separate instructions per tool?"
  [let one or two people answer — this will resonate]

[Type:]
  git add gen_ai.md llm_outputs/ AGENTS.md
  git commit -m "add LLM usage log and agent archiving protocol"

---

### STEP 6: LLM-ASSISTED FIGURE GENERATION (~2.5 min) ───

[Say:]
  "Now let's use it. Each agent tool has one config file it reads
   at session start — for Claude Code that's CLAUDE.md. We point
   it at AGENTS.md so the protocol is loaded before any prompt."

[Type:]
  cp AGENTS.md CLAUDE.md
  git add CLAUDE.md
  git commit -m "add CLAUDE.md with agent archiving protocol"

[Say:]
  "Each tool needs the protocol in its own config file —
   Claude Code reads CLAUDE.md, Codex reads AGENTS.md directly,
   Cursor gets .cursorrules. So we copy AGENTS.md into whichever
   file your tool reads. One source, one copy per tool.
   Now — I just describe the task."

[Type:]
  claude "Write scripts/figure2.py — use scripts/figure3.py as a
  template (argparse --output, tight_layout, savefig, same style),
  read data/processed/results.csv, produce a horizontal bar chart
  of accuracy by condition instead of a vertical one."

[Wait for Claude Code to finish. Then:]
  python scripts/figure2.py --output figures/figure2.pdf
  timg figures/figure2.pdf

[Show what got logged:]
  cat gen_ai.md
  cat llm_outputs/task-002-output.md

[Say:]
  "The REPRODUCE block is at the bottom of the output file —
   the model wrote it because the pre-prompt told it to.
   The table row is already there. Nothing to fill in.
   Six months from now a reviewer asks: did an LLM write this?
   You open gen_ai.md, find the row, open the output file.
   That's the full audit trail."

[Type:]
  git add scripts/figure2.py figures/figure2.pdf gen_ai.md llm_outputs/
  git commit -m "add LLM-generated figure2 script and archive task-002"

---

### STEP 7: TAG AND TEST (~1 min) ───

[Say:]
  "One more thing before submission. Tag the version.
   When a reviewer asks about something in six months
   you want to check out exactly the code that produced your results —
   not your best guess at what it was."

[Type:]
  git tag -a v1.0 -m "Version submitted to EuroVIS 2026"
  git log --oneline

[Show the log — clean commit history from today.]

[Say:]
  "And before you submit — clone this into a fresh directory.
   Follow only the README. If it breaks, fix it now.
   Not after acceptance."

---

##CHECKLIST SLIDE (~1 min) ───

[Switch back to slides. Show checklist.]

[Walk through each item — tick them off as you go:]

  - [ ] Git repo initialized and pushed
  - [ ] Folder structure: raw/, processed/, scripts/, figures/
  - [ ] README.md: what, how, what it produces
  - [ ] Virtual environment (.venv/) in .gitignore, setup documented in README
  - [ ] Dependencies locked (requirements.txt)
  - [ ] One script per figure, relative paths only
  - [ ] gen_ai.md if LLMs in the research pipeline
  - [ ] Fresh clone test before submission  ← "do this tonight"

[Say:]
  "That's level two. Minimum viable.
   It took us ten minutes.
   It will save you three hours on revision day.
   Tobias will take you from here to level three."

[Finish.]

---

##TIMING GUIDE ───

  Pivot slide + intro       ~0.5 min
  Step 1: init + structure  ~2.0 min
  Step 2: README            ~3.0 min   ← most interactive, can trim
  Step 3: venv + deps       ~2.0 min
  Step 4: figure scripts    ~3.0 min   ← the demo moment
  Step 5: gen_ai.md         ~2.0 min
  Step 6: LLM figure gen    ~2.5 min   ← Claude Code live
  Step 7: tag + test        ~1.0 min
  Checklist + handoff       ~1.0 min
  ────────────────────────────────
  TOTAL                    ~17.0 min

  If running long: cut Step 7 (tagging), go straight to checklist.
  If running very long: skip gen_ai.md live, say "it's in the repo".

---

##PRE-STAGED FILES ───

Copy these from ~/demo_files/ to ~/Projects/my_reproducible_paper for the session.

### ~/demo-assets/results.csv

condition,accuracy
Baseline,0.72
Method A,0.81
Method B,0.79
Method C,0.85

### ~/demo-assets/figure3.py

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

### ~/demo-assets/gen_ai.md

# LLM Usage Log

> All LLM tasks that contribute to this paper's results, figures, or analysis
> are archived here. See `AGENTS.md` for the archiving protocol.

---

## Task Index

| ID | Date | Provider | Model | Interface | Prompt | Output |
|----|------|----------|-------|-----------|--------|--------|

────────────────────────────────────────────────────────────────

### ~/demo-assets/run_all.sh

#!/bin/bash
set -e
cd "$(cd -- "$(dirname "$0")" && pwd)/.."   # always run from project root

for script in scripts/*.py; do
    name=$(basename "$script" .py)
    echo "Generating ${name}..."
    python "$script" --output "figures/${name}.pdf"
done

echo "Done. All figures saved to figures/"

---

##COMMON PITFALLS TO MENTION (pick 2-3 during step 4) ───

  ❌  Hardcoded paths  /Users/yourname/Desktop/project/data/...
  ❌  Missing dep in requirements.txt (installed globally, not listed)
  ❌  Data file not committed or too large for git (→ use (git LFS)[https://git-lfs.com/])
  ❌  Undocumented preprocessing step ("just run this first")
  ❌  Random seed not set → non-deterministic outputs
  ❌  README says run script.py but file is called analysis_FINAL.py
  ❌  package-lock.json in .gitignore

---
