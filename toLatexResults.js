import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Function to read JSON files from a given directory
function readJSONFiles(dir) {
  const files = fs.readdirSync(dir);
  const jsonFiles = files.filter(file => file.endsWith('results-processed.json'));
  const file = jsonFiles[0];
  return file ? JSON.parse(fs.readFileSync(path.join(dir, file), 'utf8')).filter(el => el !== null) : [];
}

// // Function to create LaTeX table header
// function createTableHeader(jsonData) {
//   if (jsonData.length === 0) return '';
//
//   const headers = ['Rozmiar macierzy', ...jsonData.map(data => data.dataLabel)];
//   const tableHeaders = `\\begin{tabular}{|c|${'c|'.repeat(headers.length - 1)}}\n\\hline\n${headers.join(' & ')} \\\\\n\\hline\n`;
//   return `${tableHeaders}`;
// }
//
// function roundToTwoDigits(value) {
//   return Math.round(value * 100) / 100;
// }
//
// function createTableRow(jsonData, size, valueType) {
//   if (jsonData.length === 0) return '';
//
//   return `${size}` + jsonData.reduce((acc, data) => acc + ` & ${roundToTwoDigits(data[valueType])}`, '') + ' \\\\\\hline\n';
// }
//
// function endLatexTable() {
//   return '\\end{tabular}\n';
// }
//
// function mergeTablesSideBySide(table1, table2) {
//   let result = '';
//
//   result += "\\begin{table}[h]\n\\centering\n"
//   result += table1;
//   result += "\\captionof{table}{Średnia.}\n"
//   result += "\\end{table}\n\n";
//
//   result += "\\begin{table}[h]\n\\centering\n"
//   result += table2;
//   result += "\\captionof{table}{Mediana.}\n"
//   result += "\\end{table}\n";
//
//   return result;
// }

function saveMergedResult(result, dir) {
  fs.writeFileSync(path.join(dir, 'merged_2.txt'), result);
}

function createTableHeader(jsonData) {
  if (jsonData.length === 0) return '';

  const headers = jsonData.map(data => data.dataLabel);
  const mainHeader = "\\begin{table}[h]\n" +
    "\\centering\n" +
    `\\begin{tabular}{|c|c|${'c|'.repeat(headers.length)}}\n` +
    "\\hline\n" +
    "Rozmiar macierzy & Miara & \\multicolumn{4}{c|}{Wartości} \\\\ \\cline{3-6}\n"

  const secondRowHeader = `& & ${headers.join(' & ')} \\\\\n\\hline\n`;
  return `${mainHeader}${secondRowHeader}`;
}

function roundToTwoDigits(value) {
  return Math.round(value * 100) / 100;
}

const parseValueType = (valueType) => valueType === 'mean' ? 'Średnia' : 'Mediana';

function createTableRow(jsonData, size) {
  if (jsonData.length === 0) return '';

  const meanRow = `${size}\n` + `& ${parseValueType('mean')}` + jsonData.reduce((acc, data) => acc + ` & ${roundToTwoDigits(data.mean)}`, '') + ' \\\\ \\cline{2-6}\n';
  const medianRow = `& ${parseValueType('median')}` + jsonData.reduce((acc, data) => acc + ` & ${roundToTwoDigits(data.median)}`, '') + ' \\\\\n\\hline\n';

  return `${meanRow}${medianRow}`;
}

function endLatexTable() {
  return "\\end{tabular}\n" +
  "\\caption{Porównanie Średniej i Mediany dla różnych rozmiarów macierzy.}\n" +
  "\\end{table}";
}

// function walkThroughFolders(folder) {
//   const baseDir = path.join(__dirname, folder);
//   const firstLevelDirs = fs.readdirSync(baseDir).filter(file => fs.statSync(path.join(baseDir, file)).isDirectory());
//
//   firstLevelDirs.forEach(firstLevelDir => {
//     const secondLevelDirs = fs.readdirSync(path.join(baseDir, firstLevelDir)).filter(file => fs.statSync(path.join(baseDir, firstLevelDir, file)).isDirectory());
//     let mergedMeanTable = createTableHeader(readJSONFiles(path.join(baseDir, firstLevelDir, secondLevelDirs[0])));
//     let mergedMedianTable = createTableHeader(readJSONFiles(path.join(baseDir, firstLevelDir, secondLevelDirs[0])));
//
//
//     secondLevelDirs.forEach(secondLevelDir => {
//       const targetDir = path.join(baseDir, firstLevelDir, secondLevelDir);
//       const jsonData = readJSONFiles(targetDir);
//       const size = path.basename(secondLevelDir);
//       mergedMeanTable += createTableRow(jsonData, size, 'mean');
//       mergedMedianTable += createTableRow(jsonData, size, 'median');
//     });
//
//     mergedMeanTable += endLatexTable();
//     mergedMedianTable += endLatexTable();
//     saveMergedResult(mergeTablesSideBySide(mergedMeanTable, mergedMedianTable), path.join(baseDir, firstLevelDir));
//   });
// }


function walkThroughFolders(folder) {
  const baseDir = path.join(__dirname, folder);
  const firstLevelDirs = fs.readdirSync(baseDir).filter(file => fs.statSync(path.join(baseDir, file)).isDirectory());

  firstLevelDirs.forEach(firstLevelDir => {
    const secondLevelDirs = fs.readdirSync(path.join(baseDir, firstLevelDir)).filter(file => fs.statSync(path.join(baseDir, firstLevelDir, file)).isDirectory());
    let mergedTable = createTableHeader(readJSONFiles(path.join(baseDir, firstLevelDir, secondLevelDirs[0])));


    secondLevelDirs.forEach(secondLevelDir => {
      const targetDir = path.join(baseDir, firstLevelDir, secondLevelDir);
      const jsonData = readJSONFiles(targetDir);
      console.log(jsonData);
      const size = path.basename(secondLevelDir);
      mergedTable += createTableRow(jsonData, size);
    });

    mergedTable += endLatexTable();
    saveMergedResult(mergedTable, path.join(baseDir, firstLevelDir));
  });
}



function main() {
  const folders = ['results-memory-after-gc', 'results-memory', 'results-time'];
  for (const folder of folders) walkThroughFolders(folder);
}

main();