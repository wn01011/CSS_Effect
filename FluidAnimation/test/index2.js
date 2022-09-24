const canvas = document.querySelector(`canvas`);
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext(`2d`);
const boom = document.getElementById("Boom");

class Branche {
  constructor(x = canvas.width / 2, y = canvas.height - 80, r = 10) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.direction = 270;
    this.speed = 2;
    this.force = 10;
    this.color = `rgb(${255 * Math.random()}, ${255 * Math.random()}, ${
      255 * Math.random()
    })`;
    this.lifeTime = 0;
    this.growSpeed = 1 + Math.random() * 7;
  }

  update() {
    let result = [];
    if (
      this.y > canvas.height - 80 ||
      this.y < 0 ||
      this.lifeTime >= 200 ||
      this.r < 0.02
    ) {
      delete this;
      // console.log("삭제");
      return;
    }

    this.r *= 0.995;
    let dire = (Math.PI * this.direction) / 180;
    this.direction += this.force;
    this.x += Math.cos(dire) * this.speed;
    this.y += Math.sin(dire) * this.speed;
    this.lifeTime += 1;

    if (Math.random() < 0.01) {
      let b = new Branche();
      b.randomData(this);
      b.color = this.color;
      result.push(b);
    }
    return result;
  }

  draw(ctx) {
    if (this.y > canvas.height - 80) {
      delete this;
      // console.log("삭제");
      return;
    }

    ctx.beginPath();
    ctx.strokeStyle = this.color;
    ctx.fillStyle = `red`;
    ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
    ctx.stroke();
    delete this;
  }

  randomData(parent) {
    let x = 0;
    let y = 0;
    let speed = this.growSpeed * Math.random() * 0.2;
    let dire = 270;
    let r = 3;

    if (parent != null) {
      x = parent.x;
      y = parent.y;
      r = parent.r * 0.95;
      dire = parent.direction;
    }

    this.x = x;
    this.y = y;
    this.speed = speed;
    this.dire = dire;
    this.force = 0.5 * Math.random() - 0.25;
    this.r = r;
  }
}

function makeBranche(len) {
  for (let i = 0; i < len; ++i) {
    let branche = new Branche();
    branche.randomData();
    branche.x += canvas.width * Math.random();
    branche.y = canvas.height - 80;
    brancheList.push(branche);
  }
}
let brancheList = [];

function update() {
  if (brancheList.length >= 500)
    brancheList = brancheList.slice(
      brancheList.length - 51,
      brancheList.length - 1
    );
  let divisionList = [];
  for (let i = 0; i < brancheList.length; ++i) {
    if (brancheList[i]) {
      let result = brancheList[i].update();
      brancheList[i].draw(ctx);
      if (result && divisionList.length <= 10)
        divisionList = divisionList.concat(result);
    } else {
      delete brancheList[i];
      brancheList.splice(i, 1);
    }
  }
  brancheList = brancheList.concat(divisionList);
}
let boomId;
let count = 0;
let mainId;
boom.onclick = () => {
  clearInterval(boomId);
  clearInterval(mainId);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  brancheList = [];
  makeBranche(10);
  boomId = setInterval(update, 5.0);
  mainId = setInterval(() => {
    if (count >= 10) return clearInterval(mainId);
    count++;
    clearInterval(boomId);
    brancheList = [];
    makeBranche(10);
    boomId = setInterval(update, 5.0);
  }, 5000);
};
