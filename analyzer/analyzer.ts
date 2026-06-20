import * as fs from 'fs';
import * as readline from 'readline';
import { config as dotenvConfig } from "dotenv";
dotenvConfig();


export interface DensityCounter {
    word: string;
    qty: number;
    percentage: number;
}

export class Analyzer {

    public analyzeText(text: string): void {
        if (!text.trim()) {
            console.log("0 words\n0 characters");
            return;
        }

        // Get characters and clean text to get words and density
        const totalCharacters = text.length;
        const cleanedText = text.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, " ");
        const totalWords = cleanedText.split(/\s+/).length;
        const density = this.getDensity(cleanedText, totalWords)

        // Print results
        console.log(`\n--- Analysis Result ---`);
        console.log(`${totalWords} words`);
        console.log(`${totalCharacters} characters \n`);
        for (const item of density) {
            console.log(`${item.word}: ${item.qty} -  ${item.percentage}%`);
        }
    }

    private getDensity(text: string, totalWords: number): DensityCounter[] {
        const words = text.split(/\s+/)
        const density: DensityCounter[] = []
        for (const w of words) {
            if (!density.some(item => item.word === w)) {
                const q = words.filter(k => k === w).length;
                const percentage = Math.round(q * 100 / totalWords);
                density.push({ word: w, qty: q, percentage: percentage })
            }
        }

        return this.sortDensity(density);
    }

    private sortDensity(density: DensityCounter[]): DensityCounter[] {
        const n = density.length;

        for (let i = 0; i < n - 1; i++) {
            for (let j = 0; j < n - i - 1; j++) {
                const percentA = density[j].percentage;
                const percentB = density[j + 1].percentage;

                if (percentA < percentB) {
                    const temp = density[j];
                    density[j] = density[j + 1];
                    density[j + 1] = temp;
                }
            }
        }
        return density;
    }

}

// --- Terminal Interaction Logic ---
const counter = new Analyzer();
const args = process.argv.slice(2);

if (args.length > 0) {
    const argument = args.join(" ");

    // If the argument points to an existing file, read it; otherwise, process the argument as raw text
    if (fs.existsSync(argument)) {
        const fileContent = fs.readFileSync(argument, 'utf-8');
        counter.analyzeText(fileContent);
    } else {
        counter.analyzeText(argument);
    }
} else {
    // Interactive mode if no initial arguments are provided
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    console.log("Please type or paste the text to evaluate (Press ENTER when done):");
    rl.on('line', (line) => {
        counter.analyzeText(line);
        rl.close();
    });
}