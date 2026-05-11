import matplotlib.pyplot as plt
import pandas as pd
import argparse

parser = argparse.ArgumentParser()
parser.add_argument('--output', required=True, help='Output path for the figure')
args = parser.parse_args()

df = pd.read_csv('data/processed/results.csv')

fig, ax = plt.subplots(figsize=(6, 4))
ax.bar(df['condition'], df['accuracy'], color='#4C72B0', edgecolor='white', linewidth=0.8)
ax.set_xlabel('Condition', fontsize=12)
ax.set_ylabel('Accuracy', fontsize=12)
ax.set_title('Figure 3: Accuracy by Condition', fontsize=13)
ax.set_ylim(0, 1.0)
ax.spines['top'].set_visible(False)
ax.spines['right'].set_visible(False)
plt.tight_layout()
plt.savefig(args.output, dpi=150)
print(f"Saved to {args.output}")
