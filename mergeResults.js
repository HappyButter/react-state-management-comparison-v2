import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Function to read JSON files from a given directory
function readJSONFiles(dir) {
  const files = fs.readdirSync(dir);
  const jsonFiles = files.filter(file => file.endsWith('.json') && file !== 'results-combined.json');
  return jsonFiles.map(file => JSON.parse(fs.readFileSync(path.join(dir, file), 'utf8')));
}

// Function to merge JSON data
function mergeJSONData(jsonData) {
  const result = {
    title: jsonData[0].testTitle,
    chartData: [],
    dataLabels: []
  };

  jsonData.forEach(data => {
    if (!data?.dataLabel) return;
    result.chartData.push(data.chartData);
    result.dataLabels.push(data.dataLabel);
  });

  return result;
}

// Function to save the merged result to a JSON file
function saveMergedResult(result, dir) {
  fs.writeFileSync(path.join(dir, 'results-combined.json'), JSON.stringify(result, null, 2));
}

const folders = ['results-memory-after-gc', 'results-memory', 'results-time'];

// Function to walk through all folders with the structure `./result-time/*/*/`
function walkThroughFolders(folder) {
  const baseDir = path.join(__dirname, folder);
  const firstLevelDirs = fs.readdirSync(baseDir).filter(file => fs.statSync(path.join(baseDir, file)).isDirectory());

  firstLevelDirs.forEach(firstLevelDir => {
    const secondLevelDirs = fs.readdirSync(path.join(baseDir, firstLevelDir)).filter(file => fs.statSync(path.join(baseDir, firstLevelDir, file)).isDirectory());

    secondLevelDirs.forEach(secondLevelDir => {
      const targetDir = path.join(baseDir, firstLevelDir, secondLevelDir);
      const jsonData = readJSONFiles(targetDir);
      const mergedResult = mergeJSONData(jsonData);
      saveMergedResult(mergedResult, targetDir);
    });
  });
}

// Main function to execute the process
function main() {
  for (const folder of folders) walkThroughFolders(folder);
}

main();