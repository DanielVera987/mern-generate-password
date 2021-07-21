"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.generatePassword = void 0;

var _validations = require("../helpers/validations");

var characters = {
  numbers: '0 1 2 3 4 5 6 7 8 9',
  simbols: '! @ # $ % ^ & * ( ) _ - + = { [ } ] ; : < , > . ? /',
  uppercase: 'A B C D E F G H I J K L M N O P Q R S T U V W X Y Z',
  lowercase: 'a b c d e f g h i j k l m n o p q r s t u v w x y z'
};
var optionsDefaults = {
  numbers: true,
  simbols: true,
  uppercase: true,
  lowercase: true
};

var generatePassword = function generatePassword() {
  var numberOfCharacters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 6;
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : optionsDefaults;
  var finalCharacters = '';
  var password = '';

  for (var prop in options) {
    if (options[prop] === true) {
      finalCharacters += characters[prop];
    }
  }

  finalCharacters = finalCharacters.trim();
  finalCharacters = finalCharacters.split(' ');

  for (var i = 0; i < numberOfCharacters; i++) {
    password += finalCharacters[Math.floor(Math.random() * finalCharacters.length)];
  }

  if (password.length != numberOfCharacters || !(0, _validations.verifyResponsePassword)(password, options)) {
    return generatePassword(numberOfCharacters, options);
  } else {
    return password;
  }
};

exports.generatePassword = generatePassword;

var generate = function generate(req, res) {
  var numberOfCharacters = req.body.character;
  var options = {
    numbers: req.body.numbers,
    simbols: req.body.simbols,
    uppercase: req.body.uppercase,
    lowercase: true
  };
  var password = generatePassword(numberOfCharacters, options);
  res.json({
    password: password
  });
};

var _default = generate;
exports["default"] = _default;