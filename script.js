// 1. Fungsi Membuka Kertas
function openCard() {
  const cover = document.getElementById('paperCover');
  if (!cover.classList.contains('opened')) {
    cover.classList.add('opened');
    setTimeout(() => launchConfetti(), 300);
  }
}

// 2. Navigasi Antar Halaman
function goToPage(pageNumber) {
  document.querySelectorAll('.page').forEach(page => {
    page.classList.remove('active');
  });
  document.getElementById(`page${pageNumber}`).classList.add('active');

  if (pageNumber === 2) {
    launchConfetti();
  }
}

// 3. Mesin Animasi Konfeti (HTML5 Canvas)
const canvas = document.getElementById('confetti-canvas');
const ctx = canvas.getContext('2d');
let particles = [];
let animationId = null;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

const colors = ['#b48a4e', '#1e293b', '#e11d48', '#0284c7', '#16a34a', '#f59e0b'];

function launchConfetti() {
  for (let i = 0; i < 90; i++) {
    particles.push({
      x: canvas.width / 2,
      y: canvas.height / 2 + 40,
      vx: (Math.random() - 0.5) * 14,
      vy: (Math.random() - 0.85) * 15,
      size: Math.random() * 7 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 10,
      gravity: 0.32,
      drag: 0.98,
      opacity: 1
    });
  }
  if (!animationId) {
    animateConfetti();
  }
}

function animateConfetti() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach((p, index) => {
    p.vx *= p.drag;
    p.vy *= p.drag;
    p.vy += p.gravity;
    p.x += p.vx;
    p.y += p.vy;
    p.rotation += p.rotationSpeed;
    p.opacity -= 0.008;

    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate((p.rotation * Math.PI) / 180);
    ctx.globalAlpha = Math.max(p.opacity, 0);
    ctx.fillStyle = p.color;
    ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
    ctx.restore();

    if (p.opacity <= 0 || p.y > canvas.height) {
      particles.splice(index, 1);
    }
  });

  if (particles.length > 0) {
    animationId = requestAnimationFrame(animateConfetti);
  } else {
    animationId = null;
  }
}