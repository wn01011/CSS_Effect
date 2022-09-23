const canvas = document.querySelector(`canvas`);
const generateButton = document.querySelector(`.generateTreeBtn`);
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext(`2d`);

let tempStartX = canvas.width / 2;
let tempStartY = canvas.height / 2 - 80;
function drawTree(startX, startY, len, angle, branchWidth, color1, color2) {
  console.log(startX, startY);
  ctx.beginPath();
  ctx.save();
  ctx.strokeStyle = color1;
  ctx.fillStyle = color2;
  ctx.translate(startX, startY);
  ctx.rotate(angle * (Math.PI / 180));
  ctx.moveTo(0, 0);
  ctx.lineTo(0, -len);
  ctx.stroke();

  if (len < 40) {
    ctx.beginPath();
    ctx.arc(0, -len, 50, 0, Math.PI / 2);
    ctx.fill();
    ctx.restore();
    return;
  }
  let ranNum = 0;
  if (Math.random() < 0.9) {
    ranNum = Math.random() * 15 + 5;
    setTimeout(
      () => drawTree(0, -len, len * 0.85, angle + ranNum, branchWidth),
      500
    );
  }
  if (Math.random() < 0.9) {
    ranNum = Math.random() * 15 + 5;
    setTimeout(
      () => drawTree(tempStartX, -len, len * 0.85, angle - ranNum, branchWidth),
      500
    );
  }
  if (Math.random() < 0.2) {
    ranNum = Math.random() * 15 - 7.5;
    setTimeout(
      () => drawTree(tempStartX, -len, len * 0.5, angle + ranNum, branchWidth),
      500
    );
  }
  ctx.restore();
}
generateButton.onclick = () => {
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  setTimeout(() => {
    drawTree(canvas.width / 2, canvas.height - 80, 120, 0, 2, `brown`, `green`);
  }, 500);
};
