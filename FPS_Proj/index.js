const crossHair = document.getElementById("crossHair");
const world = document.getElementById("world");
const score = document.getElementById("score");
const timeLimit = document.getElementById("timeLimit");
let scoreText = 0;
let timeText = 20;
let pointerLock = document.addEventListener("click", OnClick);

function OnClick() {
  crossHair.requestPointerLock();
}

const SPEED = 20;
const worldPos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
const htmlPos = { x: 0, y: 0 };
const pageX = worldPos.x;
const pageY = worldPos.y;

class Object {
  constructor({
    position: { x, y },
    obj,
    velocity: { velX = 0, velY = 0 },
    size: { width, height },
  }) {
    this.position = { x, y };
    this.obj = obj;
    this.velocity = { velX, velY };
    this.size = { width, height };
    SetObjectPosition(obj, { x, y });
    this.xSign = (Math.floor(Math.random() * 2) - 0.5) * 2;
    this.ySign = (Math.floor(Math.random() * 2) - 0.5) * 2;
  }

  GetPosition() {
    return this.position;
  }

  GetVelocity() {
    return this.velocity;
  }

  GetSize() {
    return this.size;
  }

  SetPosition(x, y) {
    SetObjectPosition(this.obj, { x, y });
    this.position = { x, y };
  }

  Move() {
    this.SetPosition(
      this.position.x + this.velocity.velX * this.xSign,
      this.position.y + this.velocity.velY * this.ySign
    );
  }
}

function SetObjectPosition(obj, { x, y }) {
  obj.style.setProperty("transform", `translate(${x}px, ${y}px)`);
}

let objects = [];
const frame = document.createElement("main");
world.append(frame);
frame.style = `
position: absolute;
border : 1px solid black;
width : 1000px;
height : 700px;
position:absolute;
transform : translate(0px, 0px);
`;
SetObjectPosition(frame, { x: 0, y: 0 });

CreateObject(0, 0, 0, 0);
// 첫번째 옵젝은 시작지점 표시용으로 냅둔다.
CreateObject(1000, 700, 0, 0);
// 두번째 옵젝도 마지막 표시용으로 냅둔다.
// 순차적으로 생성
let createId;
let timeId;
let gameStart = false;
window.onkeydown = (e) => {
  if (gameStart) return;
  gameStart = true;
  if (e.key == "Enter") {
    createId = setInterval(() => {
      let ranNum = Math.floor(Math.random() * 4);
      // top bottom right left
      let ranX = 1000;
      let ranY = 700;
      let ranWidth = Math.random() * 100 + 50;
      let ranHeight = Math.random() * 100 + 50;
      switch (ranNum) {
        case 0:
          ranX = Math.random() * 1000;
          ranY = -ranHeight;
          break;
        case 1:
          ranX = Math.random() * 1000;
          break;
        case 2:
          ranY = Math.random() * 700;
          break;
        case 3:
          ranX = -ranWidth;
          ranY = Math.random() * 700;
          break;
      }
      let curObj = CreateObject(
        -htmlPos.x + ranX,
        -htmlPos.y + ranY,
        ranWidth,
        ranHeight,
        {
          velX: 0.5 + Math.random() * SPEED,
          velY: 0.5 + Math.random() * SPEED,
        }
      );
      switch (ranNum) {
        case 0:
          curObj.ySign = 1;
          break;
        case 1:
          curObj.ySign = -1;
          break;
        case 2:
          curObj.xSign = -1;
          break;
        case 3:
          curObj.xSign = 1;
          break;
      }
    }, 100);
    timeText = 20;
    timeId = setInterval(() => {
      timeText -= 1;
      timeLimit.innerHTML = `남은 시간 : ${timeText}<button
      class="goHome" onclick="goHomeFunction()"
      style="display: block; width: 200px; height: 50px; font-size: 1.5rem"
    >
      홈으로
    </button>`;
    }, 1000);

    score.innerHTML = `점수 : ${scoreText}`;
  }
};

let gameManagerId = setInterval(() => {
  if (timeText <= 0) {
    score.innerText = `점수 : ${scoreText}\n다시 시작하려면 Enter`;
    scoreText = 0;
    timeText = 20;
    clearInterval(createId);
    clearInterval(timeId);
    gameStart = false;
    for (let i = 2; i < objects.length; ++i) {
      DestroyObject(objects[i]);
    }
  }
}, 100);

function CreateObject(
  x,
  y,
  width = 100,
  height = 100,
  velocity = { velX: 0, velY: 0 }
) {
  const curObj = document.createElement("div");
  curObj.classList = "obj";
  curObj.style.width = `${width}`;
  curObj.style.height = `${height}`;
  curObj.style.backgroundColor = `rgb(${Math.random() * 255}, ${
    Math.random() * 255
  }, ${Math.random() * 255})`;
  world.append(curObj);
  let tempObj = new Object({
    position: { x, y },
    obj: curObj,
    velocity: { velX: velocity.velX, velY: velocity.velY },
    size: { width, height },
  });
  objects.push(tempObj);
  return tempObj;
}

function mousemove(e) {
  let xFlag = 1;
  let yFlag = 1;
  if (worldPos.x + e.movementX <= 0 || worldPos.x + e.movementX >= 1000) {
    xFlag = 0;
  }
  if (worldPos.y + e.movementY <= 0 || worldPos.y + e.movementY >= 700) {
    yFlag = 0;
  }

  objects.forEach((item) => {
    item.SetPosition(
      item.GetPosition().x - e.movementX * xFlag,
      item.GetPosition().y - e.movementY * yFlag
    );
  });
  worldPos.x += e.movementX * xFlag;
  worldPos.y += e.movementY * yFlag;
  htmlPos.x += e.movementX * xFlag;
  htmlPos.y += e.movementY * yFlag;

  SetObjectPosition(frame, {
    x: objects[0].GetPosition().x,
    y: objects[0].GetPosition().y,
  });
}

function mousedown(e) {
  for (let i = 2; i < objects.length; ++i) {
    CollisionCheck(objects[i]);
  }
}

function CollisionCheck(obj) {
  if (
    Math.abs(obj.GetPosition().x + obj.GetSize().width / 2 - pageX) <=
      obj.GetSize().width / 2 &&
    Math.abs(obj.GetPosition().y + obj.GetSize().height / 2 - pageY) <=
      obj.GetSize().height / 2
  ) {
    DestroyObject(obj);
    score.innerText = `점수 : ${++scoreText}`;
  }
}

function DestroyObject(obj) {
  let idx = objects.findIndex((x) => x === obj);
  objects.splice(idx, 1);
  obj.obj.remove();
}

window.addEventListener("mousemove", mousemove);
document.onclick = mousedown;

world.addEventListener("focusin", (e) => {
  console.log("focusin");
});
world.addEventListener("focusout", (e) => {
  console.log("focusout");
});

function Action() {
  window.requestAnimationFrame(Action);
  for (let i = 2; i < objects.length; ++i) {
    if (
      objects[i].GetVelocity().velX != 0 ||
      objects[i].GetVelocity().velY != 0
    ) {
      objects[i].Move();
      if (
        objects[i].GetPosition().x <= objects[0].GetPosition().x - 100 ||
        objects[i].GetPosition().x >= objects[1].GetPosition().x + 100 ||
        objects[i].GetPosition().y <= objects[0].GetPosition().y - 100 ||
        objects[i].GetPosition().y >= objects[1].GetPosition().y + 100
      ) {
        DestroyObject(objects[i]);
      }
    }
  }
}
Action();
