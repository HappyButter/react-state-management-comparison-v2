// generateCharts.js

import { generateChart } from './generateChart.js';
import fs from 'fs';

// Function to read the data from the provided file
const readDataFromFile = (fileName) => {
  try {
    const fileData = fs.readFileSync(fileName, 'utf8');
    return JSON.parse(fileData);
  } catch (error) {
    console.error(`Error reading file: ${fileName}`, error);
    process.exit(1);
  }
};

// Main function to generate charts
const generateChartsFromFile = async (fileName) => {
  const aggregatedResultsByTestType = readDataFromFile(fileName);

  for (const testType in aggregatedResultsByTestType) {
    for (const gridSize in aggregatedResultsByTestType[testType]) {
      const { title, dataLabels, chartData } = aggregatedResultsByTestType[testType][gridSize];
      await generateChart(title, chartData, dataLabels);
    }
  }
};

// Read file name from command-line arguments
const fileName = process.argv[2];

if (!fileName) {
  console.error('Please provide a file name as an argument.');
  process.exit(1);
}

// Call the main function
generateChartsFromFile(fileName).then(r => console.log('Charts generated successfully!'));
