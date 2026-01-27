// Smooth scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal').forEach(el => {
    observer.observe(el);
});

// Add staggered animation to timeline items
document.querySelectorAll('.timeline-item').forEach((item, index) => {
    item.style.animationDelay = `${index * 0.1}s`;
});

// Add staggered animation to project cards
document.querySelectorAll('.project-card').forEach((card, index) => {
    card.style.animation = 'fadeIn 0.6s ease-out forwards';
    card.style.animationDelay = `${index * 0.1}s`;
    card.style.opacity = '0';
});

// Gallery Carousel Functionality
const track = document.querySelector('.carousel-track');
const slides = Array.from(track.children);
const nextButton = document.querySelector('.next-btn');
const prevButton = document.querySelector('.prev-btn');
const dotsContainer = document.querySelector('.carousel-dots');

// Create dots
slides.forEach((_, index) => {
    const dot = document.createElement('span');
    dot.classList.add('dot');
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => {
        goToSlide(index);
    });
    dotsContainer.appendChild(dot);
});

const dots = Array.from(dotsContainer.children);

let currentIndex = 0;

const goToSlide = (index) => {
    track.style.transform = `translateX(-${index * 100}%)`;
    currentIndex = index;
    
    // Update dots
    dots.forEach(dot => dot.classList.remove('active'));
    dots[index].classList.add('active');
};

nextButton.addEventListener('click', () => {
    const nextIndex = (currentIndex + 1) % slides.length;
    goToSlide(nextIndex);
});

prevButton.addEventListener('click', () => {
    const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
    goToSlide(prevIndex);
});

// Auto-play carousel
let autoplayInterval = setInterval(() => {
    const nextIndex = (currentIndex + 1) % slides.length;
    goToSlide(nextIndex);
}, 5000);

// Pause autoplay on hover
const carouselContainer = document.querySelector('.carousel-container');
carouselContainer.addEventListener('mouseenter', () => {
    clearInterval(autoplayInterval);
});

carouselContainer.addEventListener('mouseleave', () => {
    autoplayInterval = setInterval(() => {
        const nextIndex = (currentIndex + 1) % slides.length;
        goToSlide(nextIndex);
    }, 5000);
});

// Touch support for mobile
let touchStartX = 0;
let touchEndX = 0;

carouselContainer.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

carouselContainer.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

const handleSwipe = () => {
    if (touchEndX < touchStartX - 50) {
        // Swipe left
        const nextIndex = (currentIndex + 1) % slides.length;
        goToSlide(nextIndex);
    }
    if (touchEndX > touchStartX + 50) {
        // Swipe right
        const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
        goToSlide(prevIndex);
    }
};