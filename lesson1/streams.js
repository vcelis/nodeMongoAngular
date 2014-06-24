/* NodeJS streams and piping */
var fs = require('fs');

var writer = fs.createWriteStream('file1.txt');
writer.write('Some data here');
// ends up and send the 'finish' event
writer.end();

writer.on('finish', function() {
  // piping
  var reader = fs.createReadStream('file1.txt');
  var writer = fs.createWriteStream('file2.txt');
  reader.pipe(writer);

  writer.on('finish', function() {
    // Reader
    var reader = fs.createReadStream('file2.txt');

    reader.on('readable', function() {
      console.log('Read: ' + this.read().toString());
    });

    reader.on('end', function() {
      console.log('DONE');
    });

  });
});