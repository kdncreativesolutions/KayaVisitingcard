// Kaya Driving School - Social Media Hub Interactive Scripts

document.addEventListener('DOMContentLoaded', () => {
  initTiltEffect();
  initActiveStateInteractions();
});

/* ==========================================
   1. Subtle 3D Tilt Effect for Desktop View
   ========================================== */
function initTiltEffect() {
  const cards = document.querySelectorAll('.social-card, .action-btn');
  
  // Only apply on devices that support hover (non-touch)
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  if (isTouchDevice) return;

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left; // x coordinate inside the card
      const y = e.clientY - rect.top;  // y coordinate inside the card

      // Save mouse coordinate variables for premium CSS glare/glow gradient effects
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);

      // 3D rotation computation
      const width = rect.width;
      const height = rect.height;
      const centerX = width / 2;
      const centerY = height / 2;
      
      // Calculate rotation angles (limits tilt to maximum of 4 degrees for premium subtle look)
      const rotateX = ((centerY - y) / centerY) * 4; 
      const rotateY = ((x - centerX) / centerX) * 4;

      // Apply style transform matrix
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-2px)`;
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
   2. Micro-Interactions: Card & Button Click Sparkle
   ========================================== */
function initActiveStateInteractions() {
  const interactables = document.querySelectorAll('.social-card, .action-btn, .feature-col');
  
  interactables.forEach(item => {
    item.addEventListener('click', () => {
      // Add a scale down animation briefly on click
      item.style.transform = 'scale(0.97)';
      setTimeout(() => {
        item.style.transform = '';
      }, 150);
    });
  });
}
