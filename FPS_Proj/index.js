const crossHair = document.getElementById("crossHair");
const world = document.getElementById("world");

document.addEventListener("click", (e) => {
  crossHair.requestPointerLock();
});

class Object {
  constructor({ position: { x, y }, obj }) {
    this.position = { x, y };
    this.obj = obj;

    SetObjectPosition(obj, { x, y });
  }

  GetPosition() {
    return this.position;
  }

  SetPosition(x, y) {
    SetObjectPosition(this.obj, { x, y });
    this.position = { x, y };
  }
}
function SetObjectPosition(obj, { x, y }) {
  obj.style = `
      background-color: lightblue;
      width: 100px;
      height: 100px;
      transform : translate(${x}px, ${y}px);
      `;
}

let objects = [];

// const curObj = new Object({ position: { x: 100, y: 100 }, obj: objects[0] });
// curObj.SetPosition(200, 100);

CreateObject(100, 100);
CreateObject(300, 200);
CreateObject(500, 300);
CreateObject(700, 400);
CreateObject(900, 500);

function CreateObject(x, y) {
  const curObj = document.createElement("div");
  curObj.classList = "obj";
  world.append(curObj);
  objects.push(new Object({ position: { x, y }, obj: curObj }));
}

const worldPos = { x: 0, y: 0 };

function mousemove(e) {
  if (
    worldPos.x + e.movementX <= 0 ||
    worldPos.x + e.movementX >= 1000 ||
    worldPos.y + e.movementY <= -400 ||
    worldPos.y + e.movementY >= 400
  )
    return;

  objects.forEach((item) => {
    item.SetPosition(
      item.GetPosition().x - e.movementX,
      item.GetPosition().y - e.movementY
    );
  });

  worldPos.x += e.movementX;
  worldPos.y += e.movementY;
}

function mousedown(e) {
  console.log(e.currentTarget);
}

window.addEventListener("mousemove", mousemove);
document.onclick = mousedown;
