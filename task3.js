const readlineSync = require("readline-sync");

const numberLenght = Math.floor(Math.random() * (7 - 3) + 3);
let tries = 3; // для ввода количества попыток
const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

const createNumber = () => {
  let gameNumber = [];

  for (let i = 0; i < numberLenght; i++) {
    let rndIndex = Math.floor(Math.random() * numbers.length);
    gameNumber.push({
      index: i,
      value: numbers[rndIndex],
    });
    numbers.splice(rndIndex, 1);
  }
  return gameNumber;
};

let gameNumber = createNumber();

const wrongAnswer = (message) => {
  console.log(message);
  console.log("количество оставшихся попыток", tries);
  const answer = readlineSync.question("Put your number again ");
  playerTry(answer);
};

const playerTry = (playerNumber) => {
  tries--;
  const correct = [];
  const miss = [];
  let correctCount = 0;
  if (tries < 0) {
    console.log("Ты проиграл 1");
    return;
  }
  console.log(
    "\x1b[36m%s\x1b[0m",
    "-----------------------------------------------------------------------------------"
  );
  if (playerNumber.toString().length !== numberLenght) {
    wrongAnswer("Неверное количество цифр в числе");
    return;
  }
  console.log(gameNumber); // Убрать комментарий, чтобы подсмотреть число
  playerNumber = playerNumber.toString();

  for (let i = 0; i < playerNumber.length; i++) {
    for (let j = 0; j < gameNumber.length; j++) {
      if (+playerNumber[i] === gameNumber[j].value) {
        if (i === gameNumber[j].index) {
          correct.push(playerNumber[i]);
          correctCount++;
        } else {
          miss.push(playerNumber[i]);
        }
      }
    }
  }
  if (gameNumber.length === correctCount) {
    console.log("Ты угадал!");
    return;
  } else {
    if (tries > 0) {
      console.log(
        "совпавших цифр на своих местах",
        correct.length,
        `(${correct.join(",")})`
      );
      console.log(
        "совпавших цифр не на своих местах",
        miss.length,
        `(${miss.join(",")})`
      );
      wrongAnswer("Попробуй еще");
    } else {
      console.log("Ты проиграл 2");
      return;
    }
  }
};
console.log("Введите число длиной " + numberLenght + " символа(ов)");
const playerNumber = readlineSync.question("Put your number? ");

playerTry(playerNumber);
