var censoredWords = [ 'sad', 'bad', 'mad' ];
var customCensoredWords = [];

function censor(raw) {
  for (var i=0; i < censoredWords.length; i++) {
    raw = raw.replace(censoredWords[i], '****');
  }
  for (var i=0; i < customCensoredWords.length; i++) {
    raw = raw.replace(customCensoredWords[i], '****');
  }
  return raw;
}

function addCensoredWord(word) {
  customCensoredWords.push(word);
}

function getCensoredWords() {
  return censoredWords.concat(customCensoredWords);
}

exports.censor = censor;
exports.addCensoredWord = addCensoredWord;
exports.getCensoredWords = getCensoredWords;