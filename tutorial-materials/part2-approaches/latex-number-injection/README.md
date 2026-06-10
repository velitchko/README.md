# LaTeX Results Injection Example

## Script part

You can use any scripting language that can produce text files as output, in the example I use Python. The [`latex-injection.py`](latex-injection.py) script showcases the process. First, an empty string `latexOutputString` is generated at the start of the script. Then, as your analysis progresses, you will compute the various metrics that you want to have available in your LaTeX paper. For each metric/number/string we produce a new macro that holds the value, for instance `\KeyMetricOne{42}`. Once the metric has beed computed/derived, we add a line to the `latexOutputString` variable as

```
latexOutputString += "\\newcommand{\\KeyMetricOne}{" + str(keyMetric1) + "}\n"
```

(the backslashes have to be escaped).

One challenge is that LaTeX macros cannot contain any digits, only letters. So if we want to save metrics, for instance, for a series of years, we need to convert the year's didgits into letters. We can use [Roman numerals](https://en.wikipedia.org/wiki/Roman_numerals) for this purpose as follows:

```
latexOutputString += "\\newcommand{\\KeyMetricIn" + intToRoman(year) + "}{" + str(keyMetric3) + "}\n"
```

The function `intToRoman()`, defined at the start of the script, then converts the integer tag into Roman numerals, so 2026 into MMXXVI. The resulting macro is then `\KeyMetricInMMXXVI{...}`.

At the end the script writes out the `latexOutputString` into a text file (whose name is specified in `latexOutputFile`), always overwriting what was there before. You can also add a relative directory to directly overwrite the respective file in the folder where your LaTeX sources reside (in the example all is in the same directory). In the example, the file `numbersFromScript.tex` is generated, which looks like the contents of [`numbersFromScript-generated.tex`](numbersFromScript-generated.tex)

## LaTeX part

In the LaTeX source document you only need to add a line to include the produced text file with the macros. In the [`example-paper.tex`](example-paper.tex) example, we do `\input{numbersFromScript.tex}`. Then the respective metric macros can be used in the text. Notice that LaTeX, by default, removes spaces behind macros, so if you want to use macros in the text when there is no punctuation directly following the macro you write, for instance, `\KeyMetricOne{}`. If you want to do further calculations with the numbers in the macro, you can also add `\usepackage{pgf}` to your praeamble, and then you can do things such as `\pgfmathparse{\KeyMetricOne+\KeyMetricTwo}\pgfmathprintnumber[fixed, precision=0]{\pgfmathresult}` to do some arithmetic. The example also contains some code for percentage calculations via the `\percentageRounded{}{}` macro defined at the top, but many more things are possible. Please see the [documentation of the `pgf` package](https://tikz.dev/math-parsing). The LaTeX compilation then produces the final result `example-paper.pdf`, which looks like [`example-paper-result.pdf`](example-paper-result.pdf).

## Running the script

To run the script, setup and activate your virtual python environment:

```bash
python -m venv .venv
source .venv/bin/activate # For Windows venv\Scripts\activate.{bat, ps1}
```

Run the python script to inject into latex:

```bash
python latex-injection.py
```

And finally regenerate the paper using [pdflatex](https://www.tug.org/texlive/) or [overleaf](https://overleaf.com)

```bash
pdflatex example-paper.tex
```


## Author

Tobias Isenberg ([https://tobias.isenberg.cc/](https://tobias.isenberg.cc/))