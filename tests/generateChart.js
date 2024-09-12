import { ChartJSNodeCanvas } from 'chartjs-node-canvas';
import fs from 'fs';

function* cyclicColorGenerator(arr) {
  let index = 0;
  while (true) {
    yield arr[index];
    index = (index + 1) % arr.length;
  }
}

// Example usage:
const values = ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)', 'rgba(201, 203, 207, 0.6)', 'rgba(54, 162, 235, 0.6)'];
const colorGenerator = cyclicColorGenerator(values);

const createChartData = (data, dataLabels) => {
  return {
    labels: data[0].map((_, i) => i + 1),
    datasets: data.map((dataSet, i) => ({
      label: dataLabels[i],
      data: dataSet,
      borderColor: colorGenerator.next().value
    }))
  };
};

const createChartConfig = (title, data, dataLabels, isTimeChart=true) => {
  return {
    type: 'line',
    data: createChartData(data, dataLabels),
    options: {
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: isTimeChart ? 'Duration (ms)' : 'Memory used (MB)'
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
  };
};

const width = 900;
const height = 600;
const chartCallback = () => {
};

const generateChart = async (title, results, dataLabels) => {
  const chartJSNodeCanvas = new ChartJSNodeCanvas({ width, height, chartCallback });

  const configuration = createChartConfig(title, results, dataLabels);

  // Render chart as PNG
  const image = await chartJSNodeCanvas.renderToBuffer(configuration);
  const fileName = `${title}.png`;
  fs.writeFileSync(fileName, image);

  console.log(`Chart saved to ${fileName}`);
};


const generateChart2 = async (path, title, results, dataLabels, isTimeChart) => {
  const chartJSNodeCanvas = new ChartJSNodeCanvas({ width, height, chartCallback });

  const configuration = createChartConfig(title, results, dataLabels, isTimeChart);

  // Render chart as PNG
  const image = await chartJSNodeCanvas.renderToBuffer(configuration);
  const fileName = `${path}/${title}.png`;
  fs.writeFileSync(fileName, image);

  console.log(`Chart saved to ${fileName}`);
};

export { generateChart, generateChart2 };