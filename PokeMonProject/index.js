const canvas = document.querySelector("canvas");
const context = canvas.getContext(`2d`);

canvas.width = 1280;
canvas.height = 640;
canvas.style.border = `1px solid black`;

const image = new Image();
image.src = "./Assets/Map/map.png";
const playerImage = new Image();
playerImage.src = "./Assets/Character/Move.png";
const characterWidth = 48;

const tileWidth = 30;
const tileheight = 20;

const collisionsMap = [];
const battleMap = [];
const boundaries = [];
const battleZones = [];
// 0 : Up, 1: Down, 2: Right, 3 : Left
let animDirection = 0;

class Sprite {
  constructor({ _position, _velocity, _image, _frames = { max: 1 } }) {
    this.position = _position;
    this.image = _image;
    this.velocity = _velocity;
    this.frames = { ..._frames, val: 0, elapsed: 0 };
  }

  draw() {
    let ratioW;
    let ratioH;
    let cropW = 0;
    let cropH = 0;
    if (this.frames.max != 1) {
      cropW = this.frames.val * 48;
      cropH = animDirection * 48;
      ratioW = (2 * this.image.width) / this.frames.max;
      ratioH = (2 * this.image.height) / this.frames.max;
    } else {
      ratioW = this.image.width;
      ratioH = this.image.height;
    }
    context.drawImage(
      this.image,
      // 이미지 자르기 (Crop)
      cropW,
      cropH,
      this.image.width / this.frames.max,
      this.image.height / this.frames.max,
      // 실제 캐릭터 출력 (위치, 위치, 비율, 비율)
      this.position.x,
      this.position.y,
      ratioW,
      ratioH
    );
    if (this.frames.max > 1) {
      this.frames.elapsed++;
    }
    if (
      this.frames.elapsed % 15 === 0 &&
      (keys.w.pressed || keys.s.pressed || keys.a.pressed || keys.d.pressed)
    ) {
      if (this.frames.val < this.frames.max - 1) {
        this.frames.val++;
      } else {
        this.frames.val = 0;
      }
    }
  }
}

for (let i = 0; i < collisions.length; i += tileWidth) {
  collisionsMap.push(collisions.slice(i, tileWidth + i));
}
for (let i = 0; i < battleZone.length; i += tileWidth) {
  battleMap.push(battleZone.slice(i, tileWidth + i));
}

class Boundary {
  static width = 64;
  constructor({ _position }) {
    this.position = _position;
    this.width = Boundary.width;
  }

  draw() {
    context.fillStyle = "rgba(255, 1, 0, 0.5)";
    context.fillRect(this.position.x, this.position.y, this.width, this.width);
  }
}

class BattleZone {
  static width = 64;
  constructor({ _position }) {
    this.position = _position;
    this.width = BattleZone.width;
  }

  draw() {
    context.fillStyle = "rgba(0, 255, 0, 0.5)";
    context.fillRect(this.position.x, this.position.y, this.width, this.width);
  }
}

const offset = {
  x: 128,
  y: -320,
};
const background = new Sprite({
  _position: {
    x: offset.x,
    y: offset.y,
  },
  _image: image,
});
collisionsMap.forEach((row, i) => {
  row.forEach((symbol, j) => {
    if (symbol != 0) {
      boundaries.push(
        new Boundary({
          _position: {
            x: j * Boundary.width + offset.x,
            y: i * Boundary.width + offset.y,
          },
        })
      );
    }
  });
});
battleMap.forEach((row, i) => {
  row.forEach((symbol, j) => {
    if (symbol != 0) {
      battleZones.push(
        new BattleZone({
          _position: {
            x: j * BattleZone.width + offset.x,
            y: i * BattleZone.width + offset.y,
          },
        })
      );
    }
  });
});
const keys = {
  w: {
    pressed: false,
  },
  a: {
    pressed: false,
  },
  s: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
};

const player = new Sprite({
  _position: {
    x: canvas.width / 2 - playerImage.width / 16,
    y: canvas.height / 2 - playerImage.height / 16,
  },
  _velocity: 2,
  _image: playerImage,
  _frames: { max: 4 },
});

function RectCollisionCheck({ rect1, rect2 }) {
  return (
    rect1.position.x + 64 >= rect2.position.x &&
    rect1.position.x <= rect2.position.x + 32 &&
    rect1.position.y <= rect2.position.y + 32 &&
    rect1.position.y + 64 >= rect2.position.y
  );
}

function Animate() {
  window.requestAnimationFrame(Animate);
  // 백그라운드 그리기
  background.draw();
  //   캐릭터 그리기
  player.draw();

  // 바운더리 그리기
  boundaries.forEach((x) => {
    x.draw();
  });
  battleZones.forEach((x) => {
    x.draw();
  });

  let canMove = true;
  if (keys.w.pressed) {
    boundaries.forEach((x) => {
      if (
        RectCollisionCheck({
          rect1: player,
          rect2: {
            ...x,
            position: {
              x: x.position.x,
              y: x.position.y + player.velocity,
            },
          },
        })
      ) {
        canMove = false;
      }
    });
    if (canMove) {
      boundaries.forEach((x) => {
        x.position.y += player.velocity;
      });
      battleZones.forEach((x) => {
        x.position.y += player.velocity;
      });
      background.position.y += player.velocity;
    }
  } else if (keys.a.pressed) {
    boundaries.forEach((x) => {
      if (
        RectCollisionCheck({
          rect1: player,
          rect2: {
            ...x,
            position: {
              x: x.position.x + player.velocity,
              y: x.position.y,
            },
          },
        })
      ) {
        canMove = false;
      }
    });
    if (canMove) {
      boundaries.forEach((x) => {
        x.position.x += player.velocity;
      });
      battleZones.forEach((x) => {
        x.position.x += player.velocity;
      });
      background.position.x += player.velocity;
    }
  } else if (keys.s.pressed) {
    boundaries.forEach((x) => {
      if (
        RectCollisionCheck({
          rect1: player,
          rect2: {
            ...x,
            position: {
              x: x.position.x,
              y: x.position.y - player.velocity,
            },
          },
        })
      ) {
        canMove = false;
      }
    });
    if (canMove) {
      boundaries.forEach((x) => {
        x.position.y -= player.velocity;
      });
      battleZones.forEach((x) => {
        x.position.y -= player.velocity;
      });
      background.position.y -= player.velocity;
    }
  } else if (keys.d.pressed) {
    boundaries.forEach((x) => {
      if (
        RectCollisionCheck({
          rect1: player,
          rect2: {
            ...x,
            position: {
              x: x.position.x - player.velocity,
              y: x.position.y,
            },
          },
        })
      ) {
        canMove = false;
      }
    });
    if (canMove) {
      boundaries.forEach((x) => {
        x.position.x -= player.velocity;
      });
      battleZones.forEach((x) => {
        x.position.x -= player.velocity;
      });
      background.position.x -= player.velocity;
    }
  }
}
Animate();

window.addEventListener("keydown", (e) => {
  switch (true) {
    // case 'w': case 'ArrowUp':
    // 방법은 두개다.
    case ["w", "ArrowUp"].includes(e.key):
      animDirection = 1;
      keys.w.pressed = true;
      break;
    case ["s", "ArrowDown"].includes(e.key):
      animDirection = 0;
      keys.s.pressed = true;
      break;
    case ["a", "ArrowLeft"].includes(e.key):
      animDirection = 2;
      keys.a.pressed = true;
      break;
    case ["d", "ArrowRight"].includes(e.key):
      animDirection = 3;
      keys.d.pressed = true;
      break;
  }
});
window.addEventListener("keyup", (e) => {
  switch (true) {
    // case 'w': case 'ArrowUp':
    // 방법은 두개다.
    case ["w", "ArrowUp"].includes(e.key):
      keys.w.pressed = false;
      break;
    case ["s", "ArrowDown"].includes(e.key):
      keys.s.pressed = false;
      break;
    case ["a", "ArrowLeft"].includes(e.key):
      keys.a.pressed = false;
      break;
    case ["d", "ArrowRight"].includes(e.key):
      keys.d.pressed = false;
      break;
  }
});
