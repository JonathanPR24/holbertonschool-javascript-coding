#!/usr/bin/node
/* eslint-disable */

const fs = require('fs');

// Check if the user provided a file path as an argument
if (process.argv.length !== 3) {
  console.error('Usage: node 0-readme.js <file_path>');
  process.exit(1);
}

const filePath = process.argv[2];

// Read the file content using utf-8 encoding
fs.readFile(filePath, 'utf-8', (err, data) => {
  if (err) {
    console.error(err);
  } else {
    console.log(data);
  }
});
