const fs = require('fs');
const readline = require('readline');

const fileStream = fs.createReadStream(process.argv[2]);

const rl = readline.createInterface({
  input: fileStream,
  crlfDelay: Infinity
});
// Note: we use the crlfDelay option to recognize all instances of CR LF
// ('\r\n') in input.txt as a single line break.

const target = process.argv[3];

async function processLineByLine() {
  const importers = {}; // imported -> [ importers ]

  let currentImporter;
  for await (const line of rl) {
    if (!line.length) {
      continue;
    }
    if (line[0] === ' ') {
      const imported = line.trim();
      if (importers[imported]) {
         importers[imported].push(currentImporter);
      } else {
         importers[imported] = [currentImporter];
      }
    } else {
      currentImporter = line;
    }
  }

  const stack = [[target]];
  let chain;
  while (chain = stack.pop()) {
    const n = importers[chain[chain.length - 1]];
    // assuming the root has no importer
    if (!n) {
      console.log('%s', chain);
      continue;
    }
    for (const i of n) {
      if (chain.includes(i)) { // loop!
        const newChain = chain.concat(i);
        console.log('...%s', newChain);
      } else {
        const newChain = chain.concat(i);
        stack.push(newChain);
      }
    }
  }
}

processLineByLine().catch(console.error);
