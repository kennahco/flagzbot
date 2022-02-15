const fs = require('fs');

module.exports = function(filename) {
  fs.readFile(filename, 'utf8' , (err, data) => {
  if (err) {
    console.error(err)
    return
  }
  arr = data.split('\n');
  })
  return arr;
}