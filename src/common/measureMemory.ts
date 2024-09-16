export async function measureMemory(): Promise<[number, number]> {
  // @ts-ignore
  if (performance && performance.memory) {
    // @ts-ignore
    const memory1 = performance.memory.usedJSHeapSize / Math.pow(1000, 2);
    console.log('Memory in use:', memory1, 'MB');

    return new Promise<[number, number]>((resolve) => {
      setTimeout(() => {
        // @ts-ignore
        const memory2 = performance.memory.usedJSHeapSize / Math.pow(1000, 2);
        console.log('Memory in use after GC:', memory2, 'MB');

        resolve([memory1, memory2]);
      }, 5000);
    });
  }
  return Promise.resolve([0, 0]);
}