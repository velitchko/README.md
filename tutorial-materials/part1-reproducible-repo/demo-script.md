# Live Demo Process — Part I

## README.md: A Tutorial on Reproducible Visualization Research

> EuroVIS 2026 · Velitchko Filipov · Tobias Isenberg · Alexander Lex

---

### 1. Initialize the Repository (~2 min)

Start with the most basic question: you have a paper, you have some code: what do you do first?

First things first, lets setup a repository.

```bash
cd ~/Projects
mkdir my-eurovis-paper
cd my-eurovis-paper
git init
```

The commit history is your lab notebook. Here you can document what changed, when, and why.
Lets create some initial structure for our paper.

```bash
mkdir -p data/raw data/processed scripts figures code paper # (optional) llm_outputs
touch README.md # (optional) AGENTS.md
```

Does this correspond to your typical structure? What other folders would you need?

```bash
# optional mkdirs if suggestions
git add .
git commit -m "initial project structure"
```

---

### 2. Write the README (~3 min)

The README is the most important file in the repo.
It should focus on answering three main questions: **what is this, how do I run it, what does it produce**.

> *(Try to engage people and ask the room to fill in each section.)*

Our target is that a stranger (*or you in six months*) can go from fresh clone to running system in under ten minutes. Write it for the most tired, confused version of yourself.

> ---PASTE / TYPE THIS INTO README.md---

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
git clone https://github.com/<yourname>/my-eurovis-paper
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

Velitchko Filipov — [velitchko.filipov@tuwien.ac.at](mailto:velitchko.filipov@tuwien.ac.at)

> ---END README---

**TIP** Run `tree` in the terminal to generate project/directory structure instead of typing it by hand (always accurate)

```bash
tree -L 2 --dirsfirst
```

Question to participants:

> - "What goes in Requirements? What do YOU always forget to list?"
> - "What would you want to see in Usage that you've never seen?"

```bash
git add README.md
git commit -m "add README with setup and usage instructions"
```

---

### 3. Lock Dependencies (~2 min)

Before installing anything lets isolate our environment.
We want to create virtual environments so thato our project's packages never clash or cause issues with your system or another project.
This is the one step people skip and causes hours worth of headaches and debugging.

```bash
python -m venv .venv
source .venv/bin/activate
```

> Note for Windows: `.venv\Scripts\activate`. The prompt should show `(.venv)`. If it doesn't that means the shell is suppressing it. Verify with:

```bash
echo $VIRTUAL_ENV
which python
```

`VIRTUAL_ENV` prints the venv path if active, empty if not. `which python` should point into your `.venv` folder.

Lets also add the virtual environment to our gitignore so we dont accidentally commit it.

```bash
echo ".venv/" >> .gitignore
git add .gitignore
git commit -m "add .gitignore for virtual environment"
```

The most common reproducibility failure is dependency drift. You wrote code against pandas 1.5. Someone runs it with pandas 2.1. It either breaks or runs and gives the wrong answer with no error message.

```bash
pip install matplotlib pandas
pip freeze > requirements.txt
cat requirements.txt
```

Every package and the exact version are now pinned. We want to commit this immediately as soon as our code runs cleanly.

```bash
git add requirements.txt
git commit -m "pin dependencies"
```

For Node projects: `package-lock.json` already does this. The mistake people make is adding it to `.gitignore`. Don't. That file is what makes JS deps reproducible.

Docker takes this further. We can isolate our full environment isolation. But for most visualization research a pinned `requirements.txt` or `package-lock.json` is sufficient and far more likely to actually get done.

---

### 4. One Script Per Figure (~3 min)

This pays off consistently: every figure in your paper scripted and generated with one command.

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

**TIP** Three things to pay attention to: relative paths everywhere (no hardcoded `/Users/velitchko/Desktop/...`), the `cd` at the top anchors the script to the project root so it works from anywhere, and `set -e` stops immediately on failure rather than silently continuing.

```bash
bash scripts/run_all.sh
timg figures/figure3.pdf
```

Question:

> - How many of your current figures can be reproduced with a single command?
> - What's stopping you from doing this?

```bash
git add .
git commit -m "add figure scripts and processed data"
```

---

### 5. (OPTIONAL) Document LLM Usage (~2 min)

For anyone using LLMs in their research pipeline (not for writing polish or debugging code) and adds generates results in the analysis or discussion sections, this needs to be documented like any other dependency. An approach I suggest could be to have a two part structure: a pre-prompt that instructs any LLM to document itself, and an index table of every task.

```bash
cp ~/demo-assets/gen_ai.md gen_ai.md
cp ~/demo-assets/AGENTS.md AGENTS.md
cat AGENTS.md
```

`AGENTS.md` explains the archiving protocol once, for the whole project. Different tools pick it up differently: Codex reads it automatically, Claude Code reads `CLAUDE.md`, Cursor has `.cursorrules`. So each tool needs a one-time pointer, but you write the protocol once. `gen_ai.md` is our index it contains every task and the full prompt and output live as separate files in `llm_outputs/`.


```bash
git add gen_ai.md llm_outputs/ AGENTS.md
git commit -m "add LLM usage log and agent archiving protocol"
```

---

### 6. (OPTIONAL) LLM-Assisted Figure Generation (~2.5 min)

So these config files we add to our repository and commit them.

```bash
cp AGENTS.md CLAUDE.md
git add CLAUDE.md
git commit -m "add CLAUDE.md with agent archiving protocol"
```

Now we describe the task and prompt our LLM:

```bash
claude "Write scripts/figure2.py — use scripts/figure3.py as a
template (argparse --output, tight_layout, savefig, same style),
read data/processed/results.csv, produce a horizontal bar chart
of accuracy by condition instead of a vertical one."
```

After the model finishes we run our script and verify the output:

```bash
python scripts/figure2.py --output figures/figure2.pdf
timg figures/figure2.pdf
```

We also verify what got logged:

```bash
cat gen_ai.md
cat llm_outputs/task-002-output.md
```

The REPRODUCE block is at the bottom of the output file. The model wrote it because the pre-prompt told it to. The table row is already there. We do not need to to fill in anything manually. Six months from now a reviewer asks: did an LLM write this? Open `gen_ai.md`, find the row, open the output file and we have our answer.

```bash
git add scripts/figure2.py figures/figure2.pdf gen_ai.md llm_outputs/
git commit -m "add LLM-generated figure2 script and archive task-002"
```

---

### 7. Tag and Verify (~1 min)

Tag the version before submission. When a reviewer asks about something in six months, you want to check out exactly the code that produced your results. We dont want to reconstruct and guess what it was.

```bash
git tag -a v1.0 -m "Version submitted to EuroVIS 2026"
git log --oneline
```

Show the clean commit history from today.

**TL;DR** Before submitting: create a fresh repository, layout your structure, write the readme README, test if things work, and finally push & tag. Do a fresh clone and make sure everything works. This is cheaper and easier to start with than retrofit after acceptance.

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

That's our minimum reproducible paper. It takes a few minutes, it might save you a few days when revising.

---

### Common Pitfalls (pick 2–3 during step 4)

- ❌  Hardcoded paths  /Users/yourname/Desktop/project/data/...
- ❌  Missing dep in requirements.txt (installed globally, not listed)
- ❌  Data file not committed or too large for git (→ use [git LFS](https://git-lfs.com/))
- ❌  Undocumented preprocessing step ("just run this first")
- ❌  Random seed not set → non-deterministic outputs
- ❌  README says run script.py but file is called analysis_FINAL.py
- ❌  package-lock.json in .gitignore
