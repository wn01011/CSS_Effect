const canvas = document.querySelector(`canvas`);
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext(`2d`);

let curX = 0;
let curY = 0;
let curAngle = 0;
function drawTree(startX, startY, len, angle) {
  curAngle = angle + Math.random();
  curX = startX + len;
  curY = startY + len;
  ctx.beginPath();
  ctx.strokeStyle = "white";
  ctx.translate(-startX, -startY);
  ctx.rotate(curAngle * (Math.PI / 180));

  ctx.translate(startX, startY);
  ctx.moveTo(startX, startY);
  ctx.lineTo(startX + len, startY + len);
  ctx.stroke();

  setTimeout(() => {
    drawTree(curX, curY, len, curAngle);
  }, 500);
}
drawTree(100, 100, 10, 0);
