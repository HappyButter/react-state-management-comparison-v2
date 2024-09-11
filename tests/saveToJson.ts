import * as fs from 'fs';
import * as path from 'path';
import * as lockfile from 'proper-lockfile';
import { AggregatedResultsByTestType } from './types/types';

const deepMerge = (target: any, source: any): any => {
  for (const key of Object.keys(source)) {
    if (Array.isArray(source[key]) && Array.isArray(target[key])) {
      // If both target and source are arrays, concatenate them
      target[key] = [...new Set([...target[key], ...source[key]])]; // Ensure uniqueness
    } else if (source[key] instanceof Object && target[key] instanceof Object) {
      // If both target and source are objects, recursively merge them
      target[key] = deepMerge(target[key], source[key]);
    } else {
      // Otherwise, just overwrite the target with the source value
      target[key] = source[key];
    }
  }
  return target;
};

const saveResultsToJson = async (results: AggregatedResultsByTestType, filePath: string) => {
  const dir = path.dirname(filePath);
  try {
    await fs.promises.mkdir(dir, { recursive: true });
  } catch (err) {
    console.error('Error creating directory:', err);
    throw err;
  }

  let fileContent: AggregatedResultsByTestType = {};

  try {
    const stat = await fs.promises.stat(filePath);
    if (stat.isDirectory()) {
      throw new Error(`Path is a directory: ${filePath}`);
    }

    const data = await fs.promises.readFile(filePath, 'utf-8');
    fileContent = JSON.parse(data);
  } catch (error: any) {
    if (error.code !== 'ENOENT') {
      console.error('Error reading file:', error);
      throw error;
    }
  }

  const mergedResults = deepMerge(fileContent, results);

  let release;
  try {
    release = await lockfile.lock(filePath);
  } catch (error: any) {
    if (error.code === 'ENOENT') {
      console.warn(`File does not exist, creating new file: ${filePath}`);
      await fs.promises.writeFile(filePath, JSON.stringify(mergedResults, null, 2));
      return;
    } else {
      console.error('Error locking file:', error);
      throw error;
    }
  }

  try {
    await fs.promises.writeFile(filePath, JSON.stringify(mergedResults, null, 2));
  } catch (error: any) {
    console.error('Error writing file:', error);
  } finally {
    if (release) {
      await release();
    }
  }
};

function saveToJson2(fileName: string, jsonObject: any) {
  const dir = path.dirname(fileName);
  const jsonString = JSON.stringify(jsonObject, null, 2);

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  fs.writeFile(fileName, jsonString, (err) => {
    if (err) {
      console.error('Error writing file:', err);
    } else {
      console.log('File has been saved.');
    }
  });
}

export { saveResultsToJson, saveToJson2 };