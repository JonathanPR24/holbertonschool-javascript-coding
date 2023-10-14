const http = require('http');
const fs = require('fs').promises;
const url = require('url');

const app = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');

  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;

  if (path === '/') {
    res.end('Hello Holberton School!');
  } else if (path === '/students') {
    // Get the database file name from command line arguments
    const dbName = process.argv[2];

    if (!dbName) {
      res.end('Database file not provided');
      return;
    }

    // Read the database asynchronously
    fs.readFile(dbName, 'utf8')
      .then((fileContents) => {
        const lines = fileContents.split('\n').filter((line) => line.trim() !== '');
        const fieldCounts = {};

        for (const line of lines) {
          const data = line.split(',');

          if (data.length === 4) {
            const field = data[3].trim();

            if (fieldCounts[field]) {
              fieldCounts[field].push(data[0].trim());
            } else {
              fieldCounts[field] = [data[0].trim()];
            }
          }
        }

        const totalStudents = lines.length - 1; // Subtract 1 to exclude the header
        res.end('This is the list of our students\n');
        res.write(`Number of students: ${totalStudents}\n`);

        for (const field in fieldCounts) {
          if (fieldCounts.hasOwnProperty(field)) {
            const count = fieldCounts[field].length;
            const list = fieldCounts[field].join(', ');
            res.write(`Number of students in ${field}: ${count}. List: ${list}\n`);
          }
        }

        res.end();
      })
      .catch(() => {
        res.end('Cannot load the database');
      });
  } else {
    res.end('Not found');
  }
});

app.listen(1245);

module.exports = app;
