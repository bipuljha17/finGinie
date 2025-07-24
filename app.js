// Presentation Logic
const slides = document.querySelectorAll('.slide');
const slideNavButtons = document.querySelectorAll('.slide-nav-btn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const progressFill = document.getElementById('progressFill');
const slideCounter = document.getElementById('slideCounter');
let currentSlide = 0;

// Initialize Charts
function createInsightsChart() {
  const ctx = document.getElementById('insightsChart').getContext('2d');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Gen Z Striver', 'Millennial Optimizer', 'SMB Balancer', 'Legacy Planner'],
      datasets: [{
        label: 'Market Share %',
        data: [23, 24, 26, 27],
        backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C', '#5D878F']
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false }
      },
      scales: {
        y: {
          beginAtZero: true,
          suggestedMax: 30,
          grid: {
            color: 'rgba(0,0,0,0.05)'
          }
        }
      }
    }
  });
}

function updateSlideVisibility() {
  slides.forEach((slide, index) => {
    if (index === currentSlide) {
      slide.classList.add('active');
    } else {
      slide.classList.remove('active');
    }
  });
  // Update nav buttons active state
  slideNavButtons.forEach((btn) => {
    btn.classList.remove('active');
    if (parseInt(btn.getAttribute('data-slide')) - 1 === currentSlide) {
      btn.classList.add('active');
    }
  });
  // Update progress bar & counter
  const progressPercent = ((currentSlide) / (slides.length - 1)) * 100;
  progressFill.style.width = progressPercent + '%';
  slideCounter.textContent = `${currentSlide + 1} / ${slides.length}`;
  // prev / next button enable
  prevBtn.disabled = currentSlide === 0;
  nextBtn.disabled = currentSlide === slides.length - 1;
}

function goToSlide(index) {
  if (index < 0 || index >= slides.length) return;
  currentSlide = index;
  updateSlideVisibility();
}

// Event Listeners
prevBtn.addEventListener('click', () => goToSlide(currentSlide - 1));
nextBtn.addEventListener('click', () => goToSlide(currentSlide + 1));

slideNavButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    goToSlide(parseInt(btn.getAttribute('data-slide')) - 1);
  });
});

// Keyboard Navigation
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') goToSlide(currentSlide - 1);
  if (e.key === 'ArrowRight') goToSlide(currentSlide + 1);
});

// Touch Swipe Navigation (basic)
let touchStartX = 0;
let touchEndX = 0;
document.addEventListener('touchstart', (e) => {
  touchStartX = e.changedTouches[0].screenX;
});
document.addEventListener('touchend', (e) => {
  touchEndX = e.changedTouches[0].screenX;
  if (touchEndX < touchStartX - 50) goToSlide(currentSlide + 1);
  if (touchEndX > touchStartX + 50) goToSlide(currentSlide - 1);
});

// Initialize
window.addEventListener('DOMContentLoaded', () => {
  updateSlideVisibility();
  createInsightsChart();
});