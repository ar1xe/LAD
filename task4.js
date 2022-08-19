const readlineSync = require("readline-sync");
var exec = require("child_process").exec;
exec("chcp 65001");

const monster = {
  maxHealth: 10,
  name: "Лютый",
  moves: [
    {
      name: "Удар когтистой лапой",
      physicalDmg: 3, // физический урон
      magicDmg: 0, // магический урон
      physicArmorPercents: 20, // физическая броня
      magicArmorPercents: 20, // магическая броня
      cooldown: 0, // ходов на восстановление
    },
    {
      name: "Огненное дыхание",
      physicalDmg: 0,
      magicDmg: 4,
      physicArmorPercents: 0,
      magicArmorPercents: 0,
      cooldown: 3,
    },
    {
      name: "Удар хвостом",
      physicalDmg: 2,
      magicDmg: 0,
      physicArmorPercents: 50,
      magicArmorPercents: 0,
      cooldown: 2,
    },
  ],
};

const hero = {
  name: "Евстафий",
  moves: [
    {
      name: "Удар боевым кадилом",
      physicalDmg: 2,
      magicDmg: 0,
      physicArmorPercents: 0,
      magicArmorPercents: 50,
      cooldown: 0,
    },
    {
      name: "Вертушка левой пяткой",
      physicalDmg: 4,
      magicDmg: 0,
      physicArmorPercents: 0,
      magicArmorPercents: 0,
      cooldown: 4,
    },
    {
      name: "Каноничный фаербол",
      physicalDmg: 0,
      magicDmg: 5,
      physicArmorPercents: 0,
      magicArmorPercents: 0,
      cooldown: 3,
    },
    {
      name: "Магический блок",
      physicalDmg: 0,
      magicDmg: 0,
      physicArmorPercents: 100,
      magicArmorPercents: 100,
      cooldown: 4,
    },
  ],
};

const allMoves = {};

let playerHealth = readlineSync.question("Enter initial player health ");

const getMovementIndex = () => {
  let rndIndex = Math.floor(Math.random() * monster.moves.length);
  if (allMoves[monster.moves[rndIndex].name]) {
    getMovementIndex();
  }
  return rndIndex;
};

const endGame = (playerWin) => {
  if (playerWin) {
    console.log("Ты выиграл");
  } else {
    console.log("Ты проиграл");
  }
};

const turn = () => {
  // console.clear();
  for (let moveName in allMoves) {
    allMoves[moveName]--;
    if (!allMoves[moveName]) {
      delete allMoves[moveName];
    }
  }
  const moveIndex = getMovementIndex();
  const monsterMove = monster.moves[moveIndex];
  const playerMovements = playerMovementList();

  console.log("moveIndex", moveIndex);

  if (monsterMove.cooldown !== 0) {
    allMoves[monsterMove.name] = monsterMove.cooldown;
  }
  console.log(allMoves);
  console.log(`Монстр использует ${monsterMove.name}`);
  console.log(
    "\x1b[36m%s\x1b[0m",
    "-----------------------------------------------------------------------------------"
  );

  let playerMovementStr = "";
  playerMovements.forEach((move, index) => {
    playerMovementStr += `\n(${index + 1}) ${move.name}`;
  });

  let playerChoise = readlineSync.question(
    "Выберете способность " + playerMovementStr + "\n"
  );
  playerChoise -= 1;

  const playerMove = hero.moves[playerChoise];

  if (playerMove.cooldown !== 0) {
    allMoves[playerMove.name] = playerMove.cooldown;
  }
  console.log(allMoves);

  const monsterPhysicalDmg = Math.ceil(
    monsterMove.physicalDmg -
      (monsterMove.physicalDmg / 100) * playerMove.physicArmorPercents
  );
  const monsterMagicalDmg = Math.ceil(
    monsterMove.magicDmg -
      (monsterMove.magicDmg / 100) * playerMove.magicArmorPercents
  );

  const playerPhysicalDmg = Math.ceil(
    playerMove.physicalDmg -
      (playerMove.physicalDmg / 100) * monsterMove.physicArmorPercents
  );
  const playerMagicalDmg = Math.ceil(
    playerMove.magicDmg -
      (playerMove.magicDmg / 100) * monsterMove.magicArmorPercents
  );

  const totalMonsterDmg = monsterPhysicalDmg + monsterMagicalDmg;
  const totalPlayerDmg = playerPhysicalDmg + playerMagicalDmg;

  playerHealth -= totalMonsterDmg;
  if (playerHealth <= 0) {
    endGame();
    return;
  }

  console.log(playerHealth);
  monster.maxHealth -= totalPlayerDmg;
  if (monster.maxHealth <= 0) {
    endGame(true);
    return;
  }

  console.log(
    "\x1b[33m%s\x1b[0m",
    "-----------------------------------------------------------------------------------"
  );
  console.log(`у монстра осталось ${monster.maxHealth} здоровья`);
  console.log(`у тебя осталось ${playerHealth} здоровья`);

  turn();
};

const playerMovementList = () => {
  const arrSkillsPlayer = [];

  hero.moves.forEach((move) => {
    if (!allMoves[move.name]) {
      arrSkillsPlayer.push(move);
    }
  });
  return arrSkillsPlayer;
};
turn();
