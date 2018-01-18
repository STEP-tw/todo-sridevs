let toAscii = function (char) {
  return char.charCodeAt();
}

let fromAscii = function (str) {
  return String.fromCharCode(str);
}

let toReverseArray = function (str,seperator) {
  return str.split(seperator).reverse();
}

class Crypter {
  constructor(key) {
    this.key = key;
  }

  encrypt(word) {
    word = toReverseArray(word,'');
    return word.map(toAscii).join(this.key);
  }

  decrypt(str) {
    str = toReverseArray(str,this.key);
    return str.map(fromAscii).join('');
  }
}

module.exports = Crypter;
