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

// Function to calculate z-score and filter out values based on the 3-sigma rule
function filterByZScore(data) {
  const mean = data.reduce((a, b) => a + b, 0) / data.length;
  const stdDev = Math.sqrt(data.map(x => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / data.length);
  return data.filter(x => Math.abs((x - mean) / stdDev) <= 3);
}

// Function to calculate the median value
function calculateMedian(data) {
  const sorted = data.slice().sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
}

// Function to calculate the mean value
function calculateMean(data) {
  return data.reduce((a, b) => a + b, 0) / data.length;
}

// Function to process JSON data
function processJSONData(jsonData) {
  return jsonData.map(data => {
    if(!data?.chartData) return null;

    const filteredData = filterByZScore(data.chartData);
    return {
      ...data,
      filteredData,
      median: calculateMedian(filteredData),
      mean: calculateMean(filteredData)
    };
  });
}

// Function to save the processed result to a JSON file
function saveProcessedResult(result, dir) {
  fs.writeFileSync(path.join(dir, 'results-processed.json'), JSON.stringify(result, null, 2));
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
      console.log("Reading JSON files from: ", targetDir);
      const processedData = processJSONData(jsonData);
      if (!processedData?.length) {
        console.log("No data to process in: ", targetDir);
        return;
      }
      saveProcessedResult(processedData, targetDir);
    });
  });
}

// Main function to execute the process
function main() {
  for (const folder of folders) walkThroughFolders(folder);
}

main();