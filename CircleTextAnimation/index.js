class RingMaker {
  constructor(
    val = {
      data: "안녕하세염",
      zSize: 50,
      rotSpeed: 8,
      color: "black",
      position: { posX: 50, posY: 50 },
    }
  ) {
    this.data = val.data;
    this.zSize = val.zSize;
    this.rotSpeed = val.rotSpeed;
    this.color = val.color;
    this.position = val.position;
  }

  make(data, zSize, rotSpeed, color, position) {
    if (data) this.data = data;
    if (zSize) this.zSize = zSize;
    if (rotSpeed) this.rotSpeed = rotSpeed;
    if (color) this.color = color;
    if (position) {
      this.position = position;
    }
    return makeFunc(
      this.data,
      this.zSize,
      this.rotSpeed,
      this.color,
      this.position
    );
  }
}

function makeFunc(
  data = "안녕하세염",
  zSize = 50,
  rotSpeed = 8,
  color = "black",
  position = { posX: 50, posY: 50 }
) {
  const charList = [];
  const tempContainer = document.createElement("div");
  tempContainer.classList.add("circleContainer");
  tempContainer.style.left = `${position.posX}vw`;
  tempContainer.style.top = `${position.posY}vh`;
  document.body.appendChild(tempContainer);
  const tempSplitting = document.createElement("div");
  tempSplitting.innerText = data;
  tempSplitting.classList.add("textSplitting");
  tempSplitting.style.setProperty(
    "animation",
    `animate ${rotSpeed}s linear infinite`
  );
  tempContainer.append(tempSplitting);
  const textOrigin = data;
  for (let i = 0; i < textOrigin.length; ++i) {
    let curChar = document.createElement("span");
    curChar.innerText = textOrigin[i];
    curChar.classList.add("char");
    curChar.dataset.char = textOrigin[i];
    curChar.dataset.index = i;
    curChar.style.setProperty(
      "transform",
      `rotateY(${(i * 360) / textOrigin.length}deg) translateZ(${zSize / 4}vw)`
    );
    curChar.style.color = `${color}`;
    tempSplitting.append(curChar);
    charList.push(curChar);
  }
  tempSplitting.childNodes[0].remove();
}

const myRing = new RingMaker({ data: "안녕하세염", zSize: 40, rotSpeed: 4 });
myRing.make();
myRing.data = "그래그래그래그래그래그래";
myRing.zSize = 80;
myRing.color = "#fff000";
myRing.position = { posX: 30, posY: 20 };
myRing.make();
