const pokemonData = [];

function PokemonDataFromId(x, y) {
  let curItem;
  pokemonData.forEach((item) => {
    if (item.id.x == x && item.id.y == y) {
      curItem = item;
      // 왜 break안됨 ?
    }
  });
  return curItem;
}

class Pokemon {
  constructor(name = "", id = { x: 0, y: 0 }, hp = 100, exp = 0, skill = {}) {
    this.name = name;
    this.id = id;
    this.hp = hp;
    this.maxHp = this.hp;
    this.exp = exp;
    this.skill = skill;
  }
}
class Skill {
  constructor(name = "skillName", cost = 1, damage = 10) {
    this.name = name;
    this.cost = cost;
    this.damage = damage;
  }
}
const Num0 = new Pokemon("이상해씨", { x: 0, y: 0 }, 100, 0, {
  skill1: new Skill("몸통박치기", 1, 20),
  skill2: new Skill("울음소리", 2, 20),
  skill3: new Skill("덩굴채찍", 3, 30),
  skill4: new Skill("잎날가르기", 4, 40),
});
const Num1 = new Pokemon("이상해풀", { x: 1, y: 0 }, 150, 0, {
  skill1: new Skill("몸통박치기", 1, 20),
  skill2: new Skill("울음소리", 2, 30),
  skill3: new Skill("덩굴채찍", 3, 40),
  skill4: new Skill("잎날가르기", 4, 50),
});
const Num2 = new Pokemon("이상해꽃", { x: 2, y: 0 }, 250, 0, {
  skill1: new Skill("몸통박치기", 1, 30),
  skill2: new Skill("덩굴채찍", 3, 40),
  skill3: new Skill("잎날가르기", 4, 50),
  skill4: new Skill("솔라빔", 5, 60),
});
const Num3 = new Pokemon("푸크린", { x: 0, y: 3 }, 400, 0, {
  skill1: new Skill("노래하기", 1, 10),
  skill2: new Skill("연속뺨치기", 2, 20),
  skill3: new Skill("돌림노래", 3, 30),
  skill4: new Skill("하이퍼보이스", 4, 40),
});

const Num4 = new Pokemon("피카츄", { x: 11, y: 1 }, 350, 0, {
  skill1: new Skill("전기쇼크", 1, 10),
  skill2: new Skill("전광석화", 2, 20),
  skill2: new Skill("10만볼트", 3, 30),
  skill2: new Skill("100만볼트", 4, 40),
});
pokemonData.push(Num0);
pokemonData.push(Num1);
pokemonData.push(Num2);
pokemonData.push(Num3);
pokemonData.push(Num4);

class Sprite {
  constructor(
    image,
    width,
    height,
    position = { x: 0, y: 0 },
    ratio = 1,
    type = 1,
    frame = 0
  ) {
    this.image = image;
    this.position = position;
    this.width = width;
    this.height = height;
    this.ratio = ratio;
    this.type = type;
    this.frame = frame;
  }
  animW = 0;
  animH = 0;
  draw() {
    c.drawImage(
      this.image,
      this.width * this.animW,
      this.height * this.animH,
      this.width,
      this.height,
      -((this.width * this.ratio * this.type) / 2) + this.position.x,
      -((this.height * this.ratio * this.type) / 2) + this.position.y,
      this.width * this.ratio,
      this.height * this.ratio
    );
  }
}

class PokemonBattleImage {
  constructor(canvas, image, width, height, id = { x: 0, y: 0 }) {
    this.canvas = canvas;
    this.image = image;
    this.width = width;
    this.height = height;
    this.id = id;
  }
  draw() {
    // 2080 x 1920 : 13 x 12 = 160
    this.canvas.drawImage(
      this.image,
      160 * this.id.x,
      160 * this.id.y,
      160,
      160,
      70,
      -20,
      160,
      160
    );
  }
}
