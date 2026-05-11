#!/bin/bash
set -e   # exit immediately if any command fails
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
echo "═══════════════════════════════════════"
echo "  Done. All figures saved to figures/"
echo "═══════════════════════════════════════"
