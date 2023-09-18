const path = require('path');

// Get the directory path of the currently executing script
const directoryPath = __dirname;

// Construct the full path to the "twosum" file
const filePath = path.join(directoryPath, 'twosum');

console.log(`Path of 'twosum': ${filePath}`);