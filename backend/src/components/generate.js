import { verifyResponsePassword } from '../helpers/validations';

const characters = {
  numbers: '0 1 2 3 4 5 6 7 8 9',
  simbols: '! @ # $ % ^ & * ( ) _ - + = { [ } ] ; : < , > . ? /',
  uppercase: 'A B C D E F G H I J K L M N O P Q R S T U V W X Y Z',
  lowercase: 'a b c d e f g h i j k l m n o p q r s t u v w x y z',
}

const optionsDefaults = {
  numbers: true,
  simbols: true,
  uppercase: true,
  lowercase: true
}

export const generatePassword = (numberOfCharacters = 6, options = optionsDefaults) => {

  let finalCharacters = '';

  let password = '';

  for (let prop in options) {
    if (options[prop] === true) {
      finalCharacters += characters[prop];
    }
  }

  finalCharacters = finalCharacters.trim();
  finalCharacters = finalCharacters.split(' ');

  for (let i = 0; i < numberOfCharacters; i++) {
    password += finalCharacters[Math.floor(Math.random() * finalCharacters.length)];
  }

  if (password.length != numberOfCharacters || !verifyResponsePassword(password, options)) {
    return generatePassword(numberOfCharacters, options);
  } else {
    return password;
  }
}

const generate = (req, res) => {
  let numberOfCharacters = req.body.character;

  let options = {
    numbers: req.body.numbers,
    simbols: req.body.simbols,
    uppercase: req.body.uppercase,
    lowercase: true
  };

  let password = generatePassword(numberOfCharacters, options);

  res.json({ password });
}



export default generate;