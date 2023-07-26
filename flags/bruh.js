const fs = require('fs');
const path = require('path');

const directoryPath = 'C:/Users/Etudiant/Documents/Coding/IdeoSorter/flags';

fs.readdir(directoryPath, function (err, files) {
  if (err) {
    return console.log('Unable to scan directory: ' + err);
  }

  files.forEach(function (file) {
    if (path.extname(file) === '.svg') {
      console.log('{ name: "' + file + '", quote: "" },');
    }
  });
});