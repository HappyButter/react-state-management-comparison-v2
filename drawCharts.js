import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { generateChart2 } from './tests/generateChart.js';

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Function to read JSON data from `results-combined.json` in a given directory
function readJSONData(dir) {
  const filePath = path.join(dir, 'results-combined.json');
  if (fs.existsSync(filePath)) {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  }
  return null;
}

const folders = ['results-memory-after-gc', 'results-memory', 'results-time'];

// Function to walk through all folders with the structure `./results-time/*/*/`
async function walkThroughFolders(folder) {
  const baseDir = path.join(__dirname, folder);
  const firstLevelDirs = fs.readdirSync(baseDir).filter(file => fs.statSync(path.join(baseDir, file)).isDirectory());

  for (const firstLevelDir of firstLevelDirs) {
    const secondLevelDirs = fs.readdirSync(path.join(baseDir, firstLevelDir)).filter(file => fs.statSync(path.join(baseDir, firstLevelDir, file)).isDirectory());

    for (const secondLevelDir of secondLevelDirs) {
      const targetDir = path.join(baseDir, firstLevelDir, secondLevelDir);
      const jsonData = readJSONData(targetDir);

      if (jsonData) {
        const { title, chartData, dataLabels } = jsonData;
        await generateChart2(
          targetDir,
          title,
          chartData,
          dataLabels,
          folder === 'results-time'
        );
      }
    }
  }
}

// Main function to execute the process
async function main() {
  for (const folder of folders) await walkThroughFolders(folder);
}

await main();