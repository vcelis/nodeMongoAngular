var censor = require('censorify');

console.log(censor.getCensoredWords());
console.log(censor.censor('Some very sad, bad and mad text.'));

censor.addCensoredWord('MEAN');
console.log(censor.getCensoredWords());
console.log(censor.censor('The MEAN stack is the future!'));