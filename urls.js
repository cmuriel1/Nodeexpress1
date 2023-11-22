const fs = require('fs').promises;
const axios = require('axios');

async function fetchAndSave(url, outputFileName) {
  console.log(`Processing ${url} and saving to ${outputFileName}`);
  try {
    const response = await axios.get(url);
    await fs.writeFile(outputFileName, response.data);
    console.log(`Wrote to ${outputFileName}`);
  } catch (error) {
    console.error(`Error downloading or writing to ${url}`);
    console.error(error.message);
  }
}

function getHostName(url) {
  const { hostname } = new URL(url);
  return hostname;
}

async function processUrls(fileName) {
  try {
    const data = await fs.readFile(fileName, 'utf-8');
    const urls = data.split('\n');
    const promises = [];

    for (const url of urls) {
      if (url.trim() !== '') {
        const outputFileName = `${getHostName(url)}.txt`;
        promises.push(fetchAndSave(url, outputFileName));
      }
    }

    // Start all downloading operations concurrently
    await Promise.all(promises);

    console.log('All requests completed');
  } catch (error) {
    console.error(`Error reading file: ${fileName}`);
    console.error(error.message);
    process.exit(1);
  }
}

const fileName = process.argv[2];
if (!fileName) {
  console.error('Usage: node urls.js FILENAME');
  process.exit(1);
}

processUrls(fileName);
