# Tips & Tricks for Reproducible Visualization Research

A list of some habits and workarounds that make reproducibility easier from the start.
Each tip is something you can adopt immediately without overhauling your workflow.
Feel free to extend this list and contribute!

## Contents

- [Tips \& Tricks for Reproducible Visualization Research](#tips--tricks-for-reproducible-visualization-research)
  - [Contents](#contents)
  - [Version Control](#version-control)
  - [Documentation](#documentation)
  - [Dependency Management](#dependency-management)
  - [Data \& Figures](#data--figures)
  - [Copyright \& Licensing](#copyright--licensing)
  - [Study Design](#study-design)
  - [Submission \& Review](#submission--review)
  - [LLM \& AI Usage](#llm--ai-usage)

---

## Version Control

- **Tag before you submit**: Run `git tag v1.0-submission` before hitting submit. This creates a snapshot of the exact code that produced your results and the exact version of your paper. It takes 5 seconds.
- **Commit messages as a lab notebook**: Write commit messages that explain *why*, not *what*. "Switch to log scale after outlier skewed the y-axis" is clearer than "update figure3.py".
- **One branch per paper revision**: Create a branch for each major revision round (`revision-r1`, `revision-r2`). Lets you reproduce figures from any round without needing to hunt through commit history.
- **Don't `.gitignore` lock files!**: `package-lock.json`, `renv.lock`, `poetry.lock` need to be committed. These pin your dependency versions and are essential for reproducing the results.
- **Use `.gitattributes` to normalize line endings**: Add `* text=auto` to avoid weird diffs when collaborating across operating systems (i.e., between Windows and Unix).

---

## Documentation

- **Generate your project directory structure (directory tree), don't write it**: Run `tree -L 2 --dirsfirst` and paste the output. It stays accurate.
- **Write the README before the paper**: A README that explains what the code does and how to run it forces you to make the code actually runnable. Do it first, not as an afterthought.
- **Number all figure scripts**: Name scripts `figure01.py`, `figure02.py` etc. so the mapping from script to paper figure is unambiguous without reading any documentation.
- **Put the reproduction command on line 1**: The very first thing in your README after the title should a paragraph describing how to reproduce the results of your paper using the code. This should be a single command that reproduces your main result. Reviewers will thank you.
- **Things can differ**: The results may differ slightly between the paper and the figures or images the code produces, that is fine, data changes and fixes happen. Add a block in the README that states and documents what is changed, why, and what people can expect.
- **`run_all.sh` is your reproducibility test**: Write a shell script that regenerates every figure from scratch. If it fails, your paper is not reproducible. Run it before every submission.

---

## Dependency Management

- **Pin dependencies immediately**: Run `pip freeze > requirements.txt` (or equivalent) the moment your code produces correct results.
- **Use virtual environments for every project**: `python -m venv .venv` takes 3 seconds. Not doing it costs days when packages conflict across projects.
- **Pin major and minor, not patch**: `numpy==1.26` instead of `numpy` gives reproducibility without blocking security patches. `numpy==1.26.4` is more precise but not necessary.
- **Document the Python/R/Node version too**: A `requirements.txt` without a `python_requires` line or `.nvmrc` is only half the picture. Pin the runtime version alongside the packages or describe this in the README under a requirements section.
- **Test your environment file on a clean machine**: Create a fresh virtual environment from your `requirements.txt` or `environment.yml` before submitting. Try going through the steps you wrote in the README and see if you can reproduce your own results. This usually surfaces something missing.

---

## Data & Figures

- **Never modify raw data**: Keep `data/raw/` read-only. All pre-processing should go in scripts under `data/processed/`.
- **Store figure scripts alongside figures**: A `figures/` directory containing both `figure03.pdf` and `figure03.py` makes the provenance self-evident without needing documentation.
- **Use relative paths everywhere**: `/home/user/myproject/data/` breaks on every other machine. `../data/` works anywhere the directory structure is intact.
- **Embed metadata in figures**: Tools like `matplotlib`'s `savefig(metadata={...})` allow you to store the script name, git hash, and parameters inside the PDF.
- **Keep a `seeds.md`**: If your analysis uses random seeds, document every seed in one place with the result it produced. Reproducing stochastic results requires the exact seed.The same holds for any parameter tuning.

## Copyright & Licensing

- **Declare copyright and license for your figures**: Add a statement like the following to your paper to make the copyright status of your figures explicit and allow reuse:

  > *I as the author of this paper state that all figures in this paper are my own as well as are and remain under my own personal copyright, with the permission to be used here. I also make them available under the Creative Commons Attribution 4.0 International (CC BY 4.0) license and share them at osf.io/\<your\_osf\>.*

  Replace `<your_osf>` with your OSF project identifier. This one statement covers copyright retention, reuse license, and archival location in a single paragraph.

- **Use CC BY 4.0 for maximum reuse**: The Creative Commons Attribution 4.0 International license allows anyone to share and adapt your figures as long as they credit you. It is the standard open license for scientific figures and is compatible with most open-access publication requirements.

- **Archive figures on OSF**: Depositing your figures on OSF creates a stable, citable DOI-backed location independent of the paper's publisher. Link the OSF project in your copyright statement so others can find the originals even if the paper moves behind a paywall.

- **Keep the source files, not just the exports**: Archive the scripts or source files (`.py`, `.R`, `.svg`, Illustrator, Figma) that produced each figure alongside the exported PDFs/PNGs. This is what makes figures truly reusable rather than just viewable.

- **Post a preprint before or at submission**: Uploading your paper to [arXiv](https://arxiv.org) or [OSF Preprints](https://osf.io/preprints) before journal submission establishes a public timestamp on your work, keeps it open access regardless of where it is published, and lets you share it freely during review. Most visualization venues explicitly permit this. Check [Open Policy Finder](https://openpolicyfinder.jisc.ac.uk/) for your target journal's policy.

- **Check what version you are allowed to share**: Many publishers distinguish between the *submitted version* (pre-review), the *accepted manuscript* (post-review, pre-typeset), and the *version of record* (final published PDF). Journals that restrict sharing usually still allow the accepted manuscript on a preprint server after an embargo period. Know which version you are permitted to post before you post it.

- **Post a preprint before signing the copyright agreement**: Once you sign a publisher copyright transfer, you may lose the right to post or update the preprint. If you want the preprint to reflect the final accepted text, update it *before* signing or check whether the agreement permits updates afterwards.

- **Retain copyright where possible**: Some publishers offer a license-to-publish option instead of a full copyright transfer. This lets you keep ownership of your own work while still granting the publisher the right to distribute it. Prefer this over outright transfer when available.

---

## Study Design

- **Pre-register before collecting data**: Even a lightweight [AsPredicted](https://aspredicted.org) form before you run your first participant separates confirmatory from exploratory analysis. Takes ~20 minutes and it makes your results significantly more credible.
- **Use a pilot to catch logging bugs**: Run 2–3 pilot participants and inspect the raw logs before the main study. Logging bugs discovered mid-study can make the entire dataset irreproducible.
- **Export your counterbalancing scheme**: Save the exact assignment of conditions to participants as a CSV. If a participant needs to be re-run, you need to know their original condition assignment.
- **Archive the exact stimulus files**: Version-control every image, video, or interactive artifact shown to participants. A "fixed" stimulus invalidates prior participants' data.
- **Document exclusion criteria before analysis**: Write down your participant exclusion rules before looking at the data. Post-hoc exclusions are a major replicability threat.
- **Pre-registrations are not a contract**: Deviating from your pre-registration can happen. Pilots surface issues, data may look different than expected, better analysis approaches emerge. What matters is that you are transparent: clearly distinguish confirmatory analyses (as pre-registered) from exploratory ones (deviating from it), and briefly described and justify any deviations in the paper. Do not let a fear of compliance stop you from submitting.

---

## Submission & Review

- **Sharing code anonymously for review**: There are several approaches depending on how much effort you want to invest:
  - **[anonymous.4open.science](https://anonymous.4open.science/)**: The easiest option. Paste your public GitHub URL and get an anonymized link that strips your username and hides identifying information. No account setup needed; the link is shareable immediately.
  - **OSF anonymous view link**: If your materials are hosted on OSF, you can generate a view-only link with the "anonymize" option enabled. This hides contributor names and profile information while giving reviewers full access to files and data. Useful if you are already using OSF for pre-registration or data archival.
  - **Throwaway GitHub account**: Create a fresh account with a neutral username, push the code there, and share the link publicly. Simple and requires no special tools, but means managing a separate account and remembering to transfer or archive the repo after acceptance.
- **Mint a Zenodo DOI before submitting**: ~5 minutes. Gives reviewers a stable link. The GitHub → Zenodo integration automates this on every tagged release.
- **Test the Zenodo download**: Download your own archived deposit to a clean directory and follow your own instructions. If it fails for you, it will fail for reviewers.
- **Write a one-paragraph reproduction guide in the paper**: Don't assume reviewers will find your README. In the appendix you can write a short paragraph that states this: "clone X, run Y, results appear in Z".
- **Apply for GRSI after acceptance**: Yes, you should do this! There are citation benefits. The [Graphics Replicability Stamp Initiative](https://www.replicabilitystamp.org/) is a community endorsement that boosts citation rates. If you followed the practices above, you likely already qualify. PSA: it is a volunteer-based effort. If you have benefited from it, consider [giving back by volunteering a reviewer](https://www.replicabilitystamp.org/#volunteering).

---

## LLM & AI Usage

- **Treat these as research tools**: Report the methods and the usage. Use things responsibly and ensure that the results are correct. You carry responsability for your submission.
- **Note the model version and access date**: `gpt-4o (accessed 2025-11-03)` is meaningful; `GPT-4` is not. Model behavior changes silently across versions.
- **Use temperature 0 for deterministic results**: If you have local models for code generation or analysis that contribute to results, set temperature to 0 and report it. Non-zero temperature means different runs produce different outputs.