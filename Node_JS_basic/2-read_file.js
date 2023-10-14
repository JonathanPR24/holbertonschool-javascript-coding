const fs = require('fs');

function countStudents(path) {
  try {
    // Read the contents of the database file synchronously
    const fileContents = fs.readFileSync(path, 'utf8');

    // Split the file contents into lines
    const lines = fileContents.split('\n').filter((line) => line.trim() !== '');

    // Initialize objects to store the counts of students in each field
    const fieldCounts = {};

    for (const line of lines) {
      const data = line.split(',');

      if (data.length === 4) {
        const field = data[3].trim();

        // Count the students in each field
        if (fieldCounts.hasOwnProperty(field)) {
          fieldCounts[field].push(data[0].trim());
        } else {
          fieldCounts[field] = [data[0].trim()];
        }
      }
    }

    // Log the total number of students
    const totalStudents = lines.length - 1; // Subtract 1 to exclude the header
    console.log(`Number of students: ${totalStudents}`);

    // Log the number of students in each field and the list of first names
    for (const field in fieldCounts) {
      if (fieldCounts.hasOwnProperty(field)) {
        const count = fieldCounts[field].length;
        const list = fieldCounts[field].join(', ');
        console.log(`Number of students in ${field}: ${count}. List: ${list}`);
      }
    }
  } catch (error) {
    throw new Error('Cannot load the database');
  }
}

module.exports = countStudents;
