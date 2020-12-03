const fs = require('fs');
const path = require('path');
const readline = require('readline');

function getLineReader() {
  const passwordsFileStream = fs.createReadStream(path.join(__dirname, './passwords.txt'));

  return readline.createInterface({
    input: passwordsFileStream,
  });
}

function partOne() {
  const lineReader = getLineReader();
  let totalValidPasswords = 0;

  lineReader.on('line', (entry) => {
    const [policy, password] = entry.split(': ');
    const numberRegex = /\d+|[a-zA-Z]/g;

    let result;
    let policyValues = [];
    while((result= numberRegex.exec(policy))) {
      policyValues.push(result[0]);
    }

    const [min, max, character] = policyValues;

    let charCount = 0;
    for (let i = 0; i < password.length; i++) {
      if (password[i] === character) charCount++;
    }

    if (charCount >= min && charCount <= max) totalValidPasswords++;
  });

  lineReader.on('close', () => {
    console.log('Total Valid passwords: ', totalValidPasswords);
  });
}

function partTwo() {
  const lineReader = getLineReader();

  let totalValidPasswords = 0;

  lineReader.on('line', (entry) => {
    const [policy, password] = entry.split(': ');
    const numberRegex = /\d+|[a-zA-Z]/g;

    let result;
    let policyValues = [];
    while((result= numberRegex.exec(policy))) {
      policyValues.push(result[0]);
    }

    const [first, second, character] = policyValues;

    let seen = false;

    if (password[first - 1] === character) {
        seen = !seen;
    }

    if (password[second - 1] === character) {
        seen = !seen;
    }

    if (seen) {
        totalValidPasswords++;
    }
  });

  lineReader.on('close', () => {
    console.log('Total Valid passwords: ', totalValidPasswords);
  });

}

module.exports = {
  partOne,
  partTwo,
}
