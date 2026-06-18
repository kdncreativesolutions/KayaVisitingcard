// Kaya Driving School - Social Media Hub Interactive Scripts

document.addEventListener('DOMContentLoaded', () => {
  initParticles();
  initTiltEffect();
  initProfilePulse();
});

/* ==========================================
   1. Canvas Floating Particles System
   ========================================== */
function initParticles() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let particlesArray = [];
  let animationFrameId;

  // Set Canvas Dimensions
  function setCanvasSize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  setCanvasSize();
  window.addEventListener('resize', () => {
    setCanvasSize();
    createParticles();
  });

  // Particle Class
  class Particle {
    constructor() {
      this.reset();
      // Start at random position in canvas on init
      this.y = Math.random() * canvas.height;
    }

    reset() {
      this.x = Math.random() * canvas.width;
      this.y = canvas.height + 20; // Start just below bottom border
      this.size = Math.random() * 3.5 + 0.5; // Size between 0.5px and 4px
      this.speedX = (Math.random() - 0.5) * 0.3; // Very slow horizontal drift
      this.speedY = -(Math.random() * 0.4 + 0.1); // Slow upward drift
      this.opacity = Math.random() * 0.5 + 0.1; // Low opacity for subtle look
      this.fadeSpeed = Math.random() * 0.005 + 0.002;
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;

      // Wrap horizontal bounds
      if (this.x < 0) this.x = canvas.width;
      if (this.x > canvas.width) this.x = 0;

      // Reset if moves past the top of the canvas
      if (this.y < -20) {
        this.reset();
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
      ctx.shadowBlur = this.size * 2;
      ctx.shadowColor = 'rgba(138, 43, 226, 0.3)'; // Neon purple shadow glow
      ctx.fill();
      ctx.shadowBlur = 0; // Reset shadow for performance
    }
  }

  // Create Particle Array
  function createParticles() {
    particlesArray = [];
    // Adjust density based on screen width
    const numberOfParticles = Math.min(Math.floor((canvas.width * canvas.height) / 15000), 100);
    for (let i = 0; i < numberOfParticles; i++) {
      particlesArray.push(new Particle());
    }
  }

  // Animation Loop
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particlesArray.length; i++) {
      particlesArray[i].update();
      particlesArray[i].draw();
    }
    animationFrameId = requestAnimationFrame(animate);
  }

  createParticles();
  animate();
}

/* ==========================================
   2. 3D Tilt and Glare Interaction Effect
   ========================================== */
function initTiltEffect() {
  const cards = document.querySelectorAll('.social-card, .website-btn');
  
  // Only apply on devices that support hover (desktop)
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  if (isTouchDevice) return;

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left; // x coordinate inside the card
      const y = e.clientY - rect.top;  // y coordinate inside the card

      // Save mouse coordinate variables for premium CSS glare gradients
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);

      // 3D rotation computation
      const width = rect.width;
      const height = rect.height;
      const centerX = width / 2;
      const centerY = height / 2;
      
      // Calculate rotation angles (limits tilt to maximum of 8 degrees)
      const rotateX = ((centerY - y) / centerY) * 8; 
      const rotateY = ((x - centerX) / centerX) * 8;

      // Apply style transform matrix
      if (card.classList.contains('website-btn')) {
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-3px)`;
      } else {
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
      }
    });

    card.addEventListener('mouseleave', () => {
      // Smooth reset on exit
      card.style.transform = '';
      card.style.setProperty('--mouse-x', `-999px`);
      card.style.setProperty('--mouse-y', `-999px`);
    });
  });
}

/* ==========================================
   3. Micro-Interaction: Profile Click Sparkle
   ========================================== */
function initProfilePulse() {
  const profile = document.getElementById('profile-trigger');
  if (!profile) return;

  profile.addEventListener('click', () => {
    // Add active animation class
    profile.style.transform = 'scale(0.92) rotate(-5deg)';
    
    // Ambient glowing ring splash
    const glowColor = 'rgba(138, 43, 226, 0.8)';
    profile.style.boxShadow = `0 0 35px ${glowColor}, 0 0 70px ${glowColor}`;

    setTimeout(() => {
      profile.style.transform = '';
      profile.style.boxShadow = '';
    }, 450);
  });
}
