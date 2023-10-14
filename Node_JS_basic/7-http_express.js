const express = require('express');
const fs = require('fs').promises;

const app = express();
const port = 1245;

app.get('/', (req, res) => {
  res.send('Hello Holberton School!');
});

app.get('/students', async (req, res) => {
  try {
    const databaseFilename = process.argv[2];
    const fileContents = await fs.readFile(databaseFilename, 'utf8');
    const lines = fileContents.split('\n').filter((line) => line.trim() !== '');
    const fieldCounts = {};

    for (const line of lines) {
      const data = line.split(',');

      if (data.length === 4) {
        const field = data[3].trim();

        if (Object.prototype.hasOwnProperty.call(fieldCounts, field)) {
          fieldCounts[field].push(data[0].trim());
        } else {
          fieldCounts[field] = [data[0].trim()];
        }
      }
    }

    const totalStudents = lines.length - 1; // Subtract 1 to exclude the header
    let response = 'This is the list of our students\n';
    response += `Number of students: ${totalStudents}\n`;

    for (const field in fieldCounts) {
      if (Object.prototype.hasOwnProperty.call(fieldCounts, field)) {
        const count = fieldCounts[field].length;
        const list = fieldCounts[field].join(', ');
        response += `Number of students in ${field}: ${count}. List: ${list}\n`;
      }
    }

    res.send(response);
  } catch (error) {
    console.error(error);
    res.status(500).send('This is the list of our students\nCannot load the database');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});

module.exports = app;
