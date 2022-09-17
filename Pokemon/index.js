const canvas = document.getElementById("canvas");
const opponentCanvas = document.getElementById("opponentCanvas");
const allyCanvas = document.getElementById("allyCanvas");
const film = document.getElementById("film");
const battleScene = document.getElementById("battleScene");
const attackBtn = document.getElementById("attack");
const pokemonBtn = document.getElementById("pokemon");
const bagBtn = document.getElementById("bag");
const runBtn = document.getElementById("run");
const allyImage = document.getElementById("allyImage");
const opponentImage = document.getElementById("opponentImage");
const opponentName = document.getElementsByClassName("name")[0];
const allyName = document.getElementsByClassName("name")[1];
const opponentHpBar = document.getElementsByClassName("hpBar")[0];
const expBar = document.getElementsByClassName("expBar")[0];
const allyHpBar = document.getElementsByClassName("hpBar")[1];
const talk = document.getElementById("talk");
const battleSelect = document.getElementById("battleSelect");
const hpText = document.getElementsByClassName("hptext")[0];
const skillListContainer = document.getElementById("attackList");
const skillList = document.getElementsByClassName("skills");
// origin map width & height = 480 by 320 px
// x4 = 1920 by 1280
canvas.width = 960;
canvas.height = 640;
const c = canvas.getContext("2d");
const co = opponentCanvas.getContext("2d");
const ca = allyCanvas.getContext("2d");

c.font = "24px serif";

const collisionMap = [];
const battleZoneMap = [];

for (let i = 0; i < colliders.length; i += 30) {
  collisionMap.push(colliders.slice(i, i + 30));
}

for (let i = 0; i < battleZones.length; i += 30) {
  battleZoneMap.push(battleZones.slice(i, i + 30));
}

let upPressed = false;
let downPressed = false;
let leftPressed = false;
let rightPressed = false;
// attack bag
// pokemon run
let battleBtns = [
  [1, 0],
  [0, 0],
];
let attackBtns = [1, 0, 0, 0];
let curPos = { x: 0, y: 0 };

let battleInit = false;
let sceneTransition = false;
let exp = 0;

const myPokeMon = PokemonDataFromId(0, 3);

let otherPokeMon = PokemonDataFromId(11, 1);

const map = new Image();
// mapSource = (1920x1280) : (1x1)
map.src = "./Assets/Tiled/Map.png";
map.width = 1920;
map.height = 1280;
const offset = {
  x: -120,
  y: -120,
};
const positionMoved = {
  x: offset.x,
  y: offset.y,
};
const mapSprite = new Sprite(
  map,
  map.width,
  map.height,
  {
    x: offset.x,
    y: offset.y,
  },
  1,
  0
);

const pokemonIcon = new Image();
pokemonIcon.src =
  "./Assets/Images/pokemon-front/Mobile - Pokemon Smile - Pokemon Icons 1st Generation.png";

allyName.textContent = `${myPokeMon.name}`;
opponentName.textContent = `${otherPokeMon.name}`;
hpText.textContent = `${myPokeMon.hp}/${myPokeMon.maxHp}`;
expBar.style.setProperty(`width`, `${exp}%`);
skillList[0].innerHTML = `<span></span>${myPokeMon.skill.skill1.name} : ${myPokeMon.skill.skill1.damage}`;
skillList[1].innerHTML = `<span></span>${myPokeMon.skill.skill2.name} : ${myPokeMon.skill.skill2.damage}`;
skillList[2].innerHTML = `<span></span>${myPokeMon.skill.skill3.name} : ${myPokeMon.skill.skill3.damage}`;
skillList[3].innerHTML = `<span></span>${myPokeMon.skill.skill4.name} : ${myPokeMon.skill.skill4.damage}`;

let pokemonBattleImage = new PokemonBattleImage(co, pokemonIcon, 380, 220, {
  x: otherPokeMon.id.x,
  y: otherPokeMon.id.y,
});
let pokemonBattleImage2 = new PokemonBattleImage(ca, pokemonIcon, 380, 220, {
  x: myPokeMon.id.x,
  y: myPokeMon.id.y,
});

const player = new Image();
// playerSource = (192x192) : (4x4)
player.width = 192 / 4;
player.height = 192 / 4;
player.src = "./Assets/Tiled/Character/player.png";

let playerSprite = new Sprite(
  player,
  player.width,
  player.height,
  {
    x: canvas.width / 2,
    y: canvas.height / 2,
  },
  3
);
playerSprite.frame = 4;
playerSprite.speed = 4;
playerSprite.absolutePosition = {
  x: -offset.x + canvas.width / 2 - 32,
  y: -offset.y + canvas.height / 2 - 32,
};

let animDelay = 10;
let animTick = 0;
let inAttackBtn = false;
function Action() {
  window.requestAnimationFrame(Action);

  if (battleInit) {
    if (!inAttackBtn) {
      if (battleBtns[0][0]) {
        attackBtn.focus();
      } else if (battleBtns[0][1]) {
        bagBtn.focus();
      } else if (battleBtns[1][0]) {
        pokemonBtn.focus();
      } else {
        runBtn.focus();
      }
      if (leftPressed) {
        if (battleBtns[1][0]) {
          battleBtns[1][0] = 0;
          battleBtns[0][0] = 1;
        } else if (battleBtns[1][1]) {
          battleBtns[1][1] = 0;
          battleBtns[0][1] = 1;
        }
      } else if (rightPressed) {
        if (battleBtns[0][0]) {
          battleBtns[0][0] = 0;
          battleBtns[1][0] = 1;
        } else if (battleBtns[0][1]) {
          battleBtns[0][1] = 0;
          battleBtns[1][1] = 1;
        }
      } else if (downPressed) {
        if (battleBtns[0][0]) {
          battleBtns[0][0] = 0;
          battleBtns[0][1] = 1;
        } else if (battleBtns[1][0]) {
          battleBtns[1][0] = 0;
          battleBtns[1][1] = 1;
        }
      } else if (upPressed) {
        if (battleBtns[0][1]) {
          battleBtns[0][1] = 0;
          battleBtns[0][0] = 1;
        } else if (battleBtns[1][1]) {
          battleBtns[1][1] = 0;
          battleBtns[1][0] = 1;
        }
      }
    } else {
      if (attackBtns[0]) {
        skillList[0].focus();
      } else if (attackBtns[1]) {
        skillList[1].focus();
      } else if (attackBtns[2]) {
        skillList[2].focus();
      } else {
        skillList[3].focus();
      }
      if (upPressed) {
        if (attackBtns[1]) {
          attackBtns[1] = 0;
          attackBtns[0] = 1;
        } else if (attackBtns[2]) {
          attackBtns[2] = 0;
          attackBtns[1] = 1;
        } else if (attackBtns[3]) {
          attackBtns[3] = 0;
          attackBtns[2] = 1;
        }
        upPressed = false;
      } else if (downPressed) {
        if (attackBtns[0]) {
          attackBtns[0] = 0;
          attackBtns[1] = 1;
        } else if (attackBtns[1]) {
          attackBtns[1] = 0;
          attackBtns[2] = 1;
        } else if (attackBtns[2]) {
          attackBtns[2] = 0;
          attackBtns[3] = 1;
        }
        downPressed = false;
      }
    }

    return;
  }
  // drawPokemon
  pokemonBattleImage.draw();
  pokemonBattleImage2.draw();
  // drawMap
  mapSprite.draw();
  // draw battleZone & colliders
  DrawZones();

  // playerAnimation
  if (animTick++ % animDelay == 0) {
    animTick = 1;
    PlayerFrame();
  }
  playerSprite.draw();

  // When Battle Start Return

  PlayerMove();
  if (BattleZoneChecker()) {
    sceneTransition = true;
  }
}
Action();

function DrawZones() {
  for (let i = 0; i < collisionMap.length; ++i) {
    for (let j = 0; j < collisionMap[i].length; ++j) {
      if (collisionMap[i][j] != 0) {
        c.fillStyle = "rgba(255, 0, 0, 0.3)";
        c.fillRect(j * 64 + positionMoved.x, i * 64 + positionMoved.y, 64, 64);
      }
      if (battleZoneMap[i][j] != 0) {
        c.fillStyle = "rgba(0, 255, 255, 0.3";
        c.fillRect(j * 64 + positionMoved.x, i * 64 + positionMoved.y, 64, 64);
      }
    }
  }
  c.fillStyle = `black`;
  c.fillText("방향키 : wasd", 100, 100);
  c.fillText("선택 : SpaceBar", 100, 150);
  c.fillText("공격과 도망치다만 구현됨", 100, 200);
  c.fillText("=>우측의 초록존에 들어가서 돌아다니면 전투발생", 100, 250);
}

function PlayerFrame() {
  playerSprite.animW = (playerSprite.animW + 1) % playerSprite.frame;
}

function PlayerMove() {
  let speed = playerSprite.speed;
  if (
    upPressed &&
    CollisionChecker({
      x: playerSprite.absolutePosition.x,
      y: playerSprite.absolutePosition.y - playerSprite.speed,
    })
  ) {
    mapSprite.position.y += speed;
    positionMoved.y += speed;
    playerSprite.absolutePosition.y -= speed;
  } else if (
    downPressed &&
    CollisionChecker({
      x: playerSprite.absolutePosition.x,
      y: playerSprite.absolutePosition.y + playerSprite.speed,
    })
  ) {
    mapSprite.position.y -= speed;
    positionMoved.y -= speed;
    playerSprite.absolutePosition.y += speed;
  } else if (
    rightPressed &&
    CollisionChecker({
      x: playerSprite.absolutePosition.x + playerSprite.speed,
      y: playerSprite.absolutePosition.y,
    })
  ) {
    mapSprite.position.x -= speed;
    positionMoved.x -= speed;
    playerSprite.absolutePosition.x += speed;
  } else if (
    leftPressed &&
    CollisionChecker({
      x: playerSprite.absolutePosition.x - playerSprite.speed,
      y: playerSprite.absolutePosition.y,
    })
  ) {
    mapSprite.position.x += speed;
    positionMoved.x += speed;
    playerSprite.absolutePosition.x -= speed;
  }
}

function ColliderBoxChecker(rect1 = { x, y }, rect2 = { x, y }) {
  let xDiff = Math.abs(rect1.x - rect2.x);
  let yDiff = Math.abs(rect1.y - rect2.y);

  if (xDiff <= 64 && yDiff <= 64) return true;
  else return false;
}

function CollisionIndex(i = 0, j = 0) {
  if (collisionMap[i][j] != 0) return true;
  else return false;
}

function BattleZoneIndex(i = 0, j = 0) {
  if (battleZoneMap[i][j] != 0) return true;
  else return false;
}

function CollisionChecker(position = { x, y }) {
  let canGo = true;
  for (let i = 0; i < 20; ++i) {
    for (let j = 0; j < 30; ++j) {
      if (
        CollisionIndex(i, j) &&
        ColliderBoxChecker(
          {
            x: position.x,
            y: position.y,
          },
          { x: j * 64, y: i * 64 }
        )
      ) {
        canGo = false;
      }
    }
  }
  return canGo;
}

function BattleZoneChecker() {
  if (myPokeMon.hp <= 0) {
    if (
      curPos.x != Math.floor(playerSprite.absolutePosition.x / 64) ||
      curPos.y != Math.floor(playerSprite.absolutePosition.y / 64)
    ) {
      if (myPokeMon.hp < myPokeMon.maxHp) myPokeMon.hp += 5;
      else if (myPokeMon.hp > myPokeMon.maxHp) myPokeMon.hp = myPokeMon.maxHp;
    }
    return false;
  }
  if (
    curPos.x != Math.floor(playerSprite.absolutePosition.x / 64) ||
    curPos.y != Math.floor(playerSprite.absolutePosition.y / 64)
  ) {
    if (myPokeMon.hp < myPokeMon.maxHp) myPokeMon.hp += 5;
    else if (myPokeMon.hp > myPokeMon.maxHp) myPokeMon.hp = myPokeMon.maxHp;
    curPos = {
      x: Math.floor(playerSprite.absolutePosition.x / 64),
      y: Math.floor(playerSprite.absolutePosition.y / 64),
    };
    if (BattleZoneIndex(curPos.y, curPos.x) && Math.random() <= 0.1) {
      battleInit = true;
      MakeNewOpponent();
      hpText.textContent = `${myPokeMon.hp}/${myPokeMon.maxHp}`;
      allyHpBar.style.width = 100 * (myPokeMon.hp / myPokeMon.maxHp) + `%`;
      return true;
    } else return false;
  } else return false;
}

// KeyBoard EventListeners
window.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "w":
      playerSprite.animH = 1;
      upPressed = true;

      break;
    case "a":
      leftPressed = true;
      playerSprite.animH = 2;
      break;
    case "s":
      downPressed = true;
      playerSprite.animH = 0;
      break;
    case "d":
      rightPressed = true;
      playerSprite.animH = 3;
      break;
    case " ":
      break;
    case "Enter":
      battleInit = false;
      canvas.style.opacity = "1";
      battleScene.style.display = "none";
      break;
  }
});
let talkState = false;
let curTalk;
let talkIterator = 0;
window.addEventListener("keyup", (e) => {
  if (!inAttackBtn) {
    switch (e.key) {
      case "w":
        upPressed = false;
        break;
      case "a":
        leftPressed = false;
        break;
      case "s":
        downPressed = false;
        break;
      case "d":
        rightPressed = false;
        break;
      case " ":
        if (talkState) {
          if (talkIterator == curTalk.length) {
            talkState = false;
            battleSelect.style.display = "grid";
            talk.textContent = "";
            talkIterator = 0;
            curTalk = null;
            if (myPokeMon.hp <= 0 || otherPokeMon.hp <= 0) {
              battleInit = false;
              canvas.style.opacity = "1";
              battleScene.style.display = "none";
              if (otherPokeMon.hp <= 0) {
                exp += 20;
                expBar.style.setProperty(`width`, `${exp}%`);
              }
            }
          } else talk.textContent = curTalk[talkIterator++];
        } else if (battleInit) {
          if (battleBtns[0][0]) {
            inAttackBtn = true;
            skillListContainer.style.display = `flex`;
            // Attack();
          } else if (battleBtns[1][0]) {
            console.log(`bag`);
          } else if (battleBtns[0][1]) {
            console.log(`pokemon`);
          } else if (battleBtns[1][1]) {
            battleInit = false;
            canvas.style.opacity = "1";
            battleScene.style.display = "none";
            co.clearRect(0, 0, opponentCanvas.width, opponentCanvas.height);
          }
        }
        break;
    }
  } else if (inAttackBtn) {
    if (e.key == " ") {
      if (attackBtns[0]) Attack(0);
      else if (attackBtns[1]) Attack(1);
      else if (attackBtns[2]) Attack(2);
      else if (attackBtns[3]) Attack(3);
      inAttackBtn = false;
      skillListContainer.style.display = `none`;
    }
  }
});

function Attack(skillNum) {
  let ranNum = Math.floor(Math.random() * 3);

  let ranSkillNum = skillNum;
  curTalk = MakeText(myPokeMon, otherPokeMon, ranSkillNum, ranNum);
  opponentHpBar.style.width =
    100 * (otherPokeMon.hp / otherPokeMon.maxHp) + "%";

  ranSkillNum = Math.floor(
    Math.random() * Object.keys(otherPokeMon.skill).length
  );
  ranNum = Math.floor(Math.random() * 3);
  curTalk = [
    ...curTalk,
    ...MakeText(otherPokeMon, myPokeMon, ranSkillNum, ranNum),
  ];
  allyHpBar.style.width = 100 * (myPokeMon.hp / myPokeMon.maxHp) + `%`;
  hpText.textContent = `${myPokeMon.hp}/${myPokeMon.maxHp}`;
  talkState = true;
  battleSelect.style.display = "none";
}

function MakeText(attack, attacked, skillNum, ranNum) {
  let texts = [];
  let ranText = "";
  let curSkill;

  switch (ranNum) {
    case 2:
      ranText = "굉장했다!";
      break;
    case 1:
      ranText = "적당했다.";
      break;
    case 0:
      ranText = "효과가 없었다.";
      break;
  }
  switch (skillNum) {
    case 0:
      curSkill = attack.skill.skill1;
      break;
    case 1:
      curSkill = attack.skill.skill2;
      break;
    case 2:
      curSkill = attack.skill.skill3;
      break;
    case 3:
      curSkill = attack.skill.skill4;
      break;
  }
  texts.push(`${attack.name}의 ${curSkill.name}은 ${ranText}`);
  texts.push(
    `${attacked.name}의 체력이 ${
      curSkill.damage * parseInt(ranNum)
    }만큼 깎였다.`
  );
  attacked.hp -= curSkill.damage * parseInt(ranNum);
  return texts;
}

let transitionFrame = 0;
let transitionCount = 0;
function SceneTransitionEffect() {
  window.requestAnimationFrame(SceneTransitionEffect);
  if (!sceneTransition) return;

  transitionFrame++;
  if (transitionCount < 5) {
    if (transitionFrame < 10) {
      film.style.opacity = `${transitionFrame / 10}`;
    } else if (transitionFrame <= 20) {
      film.style.opacity = `${(20 - transitionFrame) / 10}`;
    } else {
      transitionFrame = 0;
      transitionCount++;
    }
  } else {
    transitionCount = 0;
    canvas.style.opacity = "0";
    sceneTransition = false;
    battleScene.style.display = "block";
    imageTransition = true;
  }
}
SceneTransitionEffect();

let monsterFrame = 0;
let imageTransition = true;
function SceneTransitionEffect2() {
  window.requestAnimationFrame(SceneTransitionEffect2);
  if (sceneTransition || !battleInit || !imageTransition) return;
  monsterFrame++;
  if (monsterFrame < 60) {
    opponentCanvas.style.transform = `translateX(${300 - 5 * monsterFrame}px)`;
    allyCanvas.style.transform = `translateX(${-300 + 5 * monsterFrame}px)`;
  } else {
    monsterFrame = 0;
    imageTransition = false;
    return;
  }
}
SceneTransitionEffect2();

function MakeNewOpponent() {
  otherPokeMon = PokemonDataFromId(Math.floor(Math.random() * 3), 0);
  opponentName.textContent = `${otherPokeMon.name}`;
  co.clearRect(0, 0, opponentCanvas.width, opponentCanvas.height);
  opponentHpBar.style.width = 100 + "%";
  pokemonBattleImage = new PokemonBattleImage(co, pokemonIcon, 380, 220, {
    x: otherPokeMon.id.x,
    y: otherPokeMon.id.y,
  });
  pokemonBattleImage.draw();
}
