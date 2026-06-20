export interface DensityCounter {
  word: string;
  qty: string;
}

export class Counter {
  countWords(text: string): [number, number, DensityCounter[]] {
    const cleanedText = text
      .toLowerCase()
      .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");
    if (!text.trim()) return [0, 0, [{ word: "", qty: "" }]];
    const words = cleanedText.split(/\s+/).length;
    const characters = text.length;
    const density = this.getDensity(cleanedText, words);

    return [words, characters, density];
  }

  getDensity(text: string, totalWords: number): DensityCounter[] {
    const words = text.split(/\s+/);
    const density: DensityCounter[] = [];
    for (const w of words) {
      if (!density.some((item) => item.word === w)) {
        const q = words.filter((k) => k === w).length;
        const percentage = Math.round((q * 100) / totalWords);
        density.push({ word: w, qty: `${q} (${percentage}%)` });
      }
    }

    return this.sortDensity(density);
  }

  sortDensity(density: DensityCounter[]): DensityCounter[] {
    const n = density.length;

    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        const percentA = this.extractPercentage(density[j].qty);
        const percentB = this.extractPercentage(density[j + 1].qty);

        if (percentA < percentB) {
          const temp = density[j];
          density[j] = density[j + 1];
          density[j + 1] = temp;
        }
      }
    }
    return density;
  }

  extractPercentage(qtyString: string): number {
    const match = qtyString.match(/\((\d+)%\)/);
    return match ? parseInt(match[1], 10) : 0;
  }
}
