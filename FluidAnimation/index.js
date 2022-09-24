const canvas = document.querySelector(`canvas`);
const generateButton = document.querySelector(`.generateTreeBtn`);
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext(`2d`);

let tempStartX = canvas.width / 2;
let tempStartY = canvas.height / 2 - 80;
function drawTree(startX, startY, len, angle, branchWidth, color1, color2) {
  ctx.beginPath();
  ctx.save();
  ctx.strokeStyle = color1;
  ctx.fillStyle = color2;
  ctx.shadowBlur = 15;
  ctx.shadowColor = `black`;
  ctx.lineWidth = branchWidth;
  ctx.translate(startX, startY);
  ctx.rotate(angle * (Math.PI / 180));
  ctx.moveTo(0, 0);
  // ctx.lineTo(0, -len);

  if (angle > 0) {
    ctx.bezierCurveTo(20, -len / 2, 20, -len / 2, 0, -len);
  } else {
    ctx.bezierCurveTo(20, -len / 2, -20, -len / 2, 0, -len);
  }
  ctx.stroke();

  if (len < 30) {
    ctx.beginPath();
    ctx.arc(0, -len, 50, 0, Math.PI / 2);
    ctx.fill();
    ctx.restore();
    return;
  }

  let ranNum = 0;
  if (Math.random() < 0.9) {
    ranNum = Math.random() * 5 + 5;
    drawTree(0, -len, len * 0.85, angle + ranNum, branchWidth);
  }
  if (Math.random() < 0.9) {
    ranNum = Math.random() * 5 + 5;
    drawTree(0, -len, len * 0.85, angle - ranNum, branchWidth);
  }
  if (Math.random() < 0.2) {
    ranNum = Math.random() * 5 - 2.5;
    drawTree(0, -len, len * 0.5, angle + ranNum, branchWidth);
  }
  ctx.restore();
}
// generateButton.onclick = () => {
//   ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
//   MakeTree(1);
// };

function MakeTree(len) {
  for (let i = 0; i <= len; ++i) {
    let branchWidth = Math.random() * 20 + 1;
    drawTree(
      (canvas.width * (i + 1)) / (len + 2),
      canvas.height - 80,
      160,
      0,
      branchWidth,
      `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${
        Math.random() * 255
      }, 0.4)`,
      `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${
        Math.random() * 255
      }, 1)`
    );
  }
}
