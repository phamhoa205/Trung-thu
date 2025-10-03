const canvas = document.getElementById("sky");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Cập nhật kích thước khi thay đổi màn hình
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// Ảnh nền
const bg = new Image();
bg.src = "anh-nen.jpg";

// Danh sách lồng đèn
let lanterns = [];
const lanternImg = new Image();
lanternImg.src = "long-den.png"; // ảnh lồng đèn PNG

function Lantern(x, y, speed) {
  this.x = x;
  this.y = y;
  this.speed = speed;
  this.size = 0.05 * canvas.width + Math.random() * 0.05 * canvas.width;
}

Lantern.prototype.draw = function() {
  ctx.drawImage(lanternImg, this.x, this.y, this.size, this.size * 1.2);
};

Lantern.prototype.update = function() {
  this.y -= this.speed;
  if (this.y < -100) {
    this.y = canvas.height + 50;
    this.x = Math.random() * canvas.width;
  }
  this.draw();
};

// Tạo nhiều lồng đèn ban đầu
for (let i = 0; i < 40; i++) {
  lanterns.push(new Lantern(Math.random() * canvas.width, Math.random() * canvas.height, 0.5 + Math.random()));
}

function animate() {
  ctx.drawImage(bg, 0, 0, canvas.width, canvas.height); // vẽ nền
  lanterns.forEach(lantern => lantern.update());
  requestAnimationFrame(animate);
}

bg.onload = animate; // bắt đầu khi ảnh nền load xong

// Popup
const popup = document.getElementById("popup");
const closeBtn = document.getElementById("close");
const message = document.getElementById("message");
const popupImg = document.getElementById("popup-img");
const openBtn = document.getElementById("open-btn");

// Hiện popup khi bấm vào lồng đèn
canvas.addEventListener("click", (e) => {
  lanterns.forEach(lantern => {
    if (
      e.offsetX > lantern.x &&
      e.offsetX < lantern.x + lantern.size &&
      e.offsetY > lantern.y &&
      e.offsetY < lantern.y + lantern.size * 1.2
    ) {
      showPopup();
    }
  });
});

function showPopup() {
  const messages = [
    "🌕 Trung Thu vui vẻ Hồng Nguyên nhé!",
    "🎉 Chúc Hồng Nguyên một mùa trăng hạnh phúc!",
    "✨ Anh mong điều tốt đẹp đến với em!"
  ];
  const images = ["anh1.jpg", "anh2.jpg", "anh3.jpg", "anh4.jpg"];

  const mode = Math.floor(Math.random() * 3);

  openBtn.style.display = "none";
  openBtn.onclick = null;

  if (mode === 0) { 
    // chỉ chữ
    message.innerText = messages[Math.floor(Math.random() * messages.length)];
    message.style.display = "block";
    popupImg.style.display = "none";
  } 
  else if (mode === 1) { 
    // chỉ ảnh
    let imgPick = images[Math.floor(Math.random() * images.length)];
    
    if (imgPick === "anh4.jpg") {
      popupImg.src = "anh4.jpg";
      popupImg.style.display = "block";
      message.innerText = "Món quà dành cho Hồng Nguyên";
      message.style.display = "block";

      openBtn.style.display = "inline-block";
      openBtn.onclick = () => {
        message.innerText = "💖💖💖";
        popupImg.style.display = "none";
        openBtn.style.display = "none";
      };

    } else {
      popupImg.src = imgPick;
      popupImg.style.display = "block";
      message.style.display = "none";
    }
  } 
  else { 
    // chữ + ảnh cố định
    message.innerText = "💖 Hồng Nguyên luôn vui vẻ nhé!";
    message.style.display = "block";
    popupImg.src = "anh1.jpg"; 
    popupImg.style.display = "block";
  }

  popup.classList.remove("hidden");
}

closeBtn.onclick = () => popup.classList.add("hidden");
