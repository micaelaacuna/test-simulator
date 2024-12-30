const fs = require('fs');

function countJsonElements(filePath) {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return;
        }
        try {
            const jsonData = JSON.parse(data);
            console.log(`We have ${jsonData.length} questions in the pool!`);
        } catch (parseErr) {
            console.error('Error parsing JSON:', parseErr);
        }
    });
}

countJsonElements('questions.json');

