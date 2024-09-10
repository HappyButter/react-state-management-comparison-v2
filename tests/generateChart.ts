import { ChartJSNodeCanvas } from 'chartjs-node-canvas';
import * as fs from 'fs';
import { ChartConfiguration } from 'chart.js';


function* cyclicColorGenerator<T>(arr: T[]): Generator<T> {
  let index = 0;
  while (true) {
    yield arr[index];
    index = (index + 1) % arr.length;
  }
}

// Example usage:
const values = ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)', 'rgba(201, 203, 207, 0.6)'];
const colorGenerator = cyclicColorGenerator(values);

const createChartData = (data: number[][], dataLabels: string[]) => {
  return {
    labels: data[0].map((_, i) => i + 1),
    datasets: data.map((data, i) => ({
      label: dataLabels[i],
      data: data,
      borderColor: colorGenerator.next().value,
    }))
  };
};

const createChartConfig = (title: string, data: number[][], dataLabels: string[]) => {
  return {
    type: 'line',
    data: createChartData(data, dataLabels),
    options: {
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Duration (ms)'
          }
        },
        x: {
          title: {
            display: true,
            text: 'Test Number'
          }
        }
      },
      plugins: {
        legend: {
          position: 'top'
        },
        title: {
          display: true,
          text: title
        }
      }
    }
  } as ChartConfiguration;
};


const width = 800;
const height = 600;
const chartCallback = () => {};

const generateChart = async (title: string, results: number[][], dataLabels: string[]) => {
  const chartJSNodeCanvas = new ChartJSNodeCanvas({ width, height, chartCallback });

  const configuration = createChartConfig(title, results, dataLabels);

  // Render chart as PNG
  const image = await chartJSNodeCanvas.renderToBuffer(configuration);
  const fileName = `${title}.png`
  fs.writeFileSync(fileName, image);

  console.log(`Chart saved to ${fileName}`);
};

export { generateChart };