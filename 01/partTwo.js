const fs = require('fs');
const path = require('path');
const readline = require('readline');

const reportFileStream = fs.createReadStream(path.join(__dirname, './expense_report.txt'));

const lineReader = readline.createInterface({
  input: reportFileStream,
});

const TOTAL = 2020;
let entries = [];

lineReader.on('line', (reportEntry) => {
  entries.push(+reportEntry);
});

lineReader.on('close', () => {
  for(let i = 0; i < entries.length; i++) {
    let map = {};
    const SUB_TOTAL = TOTAL - entries[i];

    for (let j = i + 1; j < entries.length; j++) {
      if (SUB_TOTAL < entries[j]) {
        // probably can't find any two numbers to make the sum (this assumes non-negative values only)
        continue;
      }

      const complement = SUB_TOTAL - entries[j];
      if (complement in map) {
        console.log('the product: ', complement * entries[i] * entries[j]);
        return;
      } else {
        map[entries[j]] = true;
      }
    }
  }
});
