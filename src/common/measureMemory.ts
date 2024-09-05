export async function measureMemory() {
  if (typeof process != 'undefined') {
    // // @ts-ignore
    // const memory = process.memoryUsage().heapUsed / Math.pow(1000, 2);
    // console.log('Memory in use:', memory, 'MB');
    // return memory;
    // // @ts-ignore
  } else if (performance) {
    // @ts-ignore
    const memory1 = performance.memory.usedJSHeapSize / Math.pow(1000, 2);
    console.log('Memory in use:', memory1, 'MB');

    // let interval = measurementInterval();
    // console.log('Scheduling memory measurement in ' +
    //   `${Math.round(interval / 1000)} seconds.`);
    // setTimeout(() => {
    //   // @ts-ignore
    //   const memory2 = performance.memory.usedJSHeapSize / Math.pow(1000, 2)
    //   console.log("Memory in use after GC:", memory2, "MB");
    // }, interval);

    return new Promise<[number, number]>((resolve) => {
      setTimeout(() => {
        // @ts-ignore
        const memory2 = performance.memory.usedJSHeapSize / Math.pow(1000, 2);
        console.log('Memory in use after GC:', memory2, 'MB');

        resolve([memory1, memory2]);
      }, 5000);
    });
  }
  return [0, 0];
}

// function measurementInterval() {
//   const MEAN_INTERVAL_IN_MS = 5 * 60 * 1000;
//   return -Math.log(Math.random()) * MEAN_INTERVAL_IN_MS;
// }