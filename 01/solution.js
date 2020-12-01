const fs = require('fs');
const path = require('path');
const readline = require('readline');

const reportFileStream = fs.createReadStream(path.join(__dirname, './expense_report.txt'));

const lineReader = readline.createInterface({
  input: reportFileStream,
});

const map = {};
const TOTAL = 2020;

lineReader.on('line', (reportEntry) => {
  const complement = TOTAL - reportEntry;

  if (complement in map) {
    console.log('the product: ', reportEntry * complement);

    lineReader.close();
    lineReader.removeAllListeners();
  } else {
    map[reportEntry] = true;
  }
});
