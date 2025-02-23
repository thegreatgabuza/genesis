document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slide');
    const sections = document.querySelectorAll('.content-sections section');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    let currentSlide = 0;

    function showSlide(index) {
        // Remove active class from all slides and sections
        slides.forEach(slide => slide.classList.remove('active'));
        sections.forEach(section => section.classList.remove('active'));

        // Add active class to current slide and section
        slides[index].classList.add('active');
        sections[index].classList.add('active');

        // Update button states
        prevBtn.style.opacity = index === 0 ? '0.5' : '1';
        nextBtn.style.opacity = index === slides.length - 1 ? '0.5' : '1';
    }

    function nextSlide() {
        if (currentSlide < slides.length - 1) {
            currentSlide++;
            showSlide(currentSlide);
        }
    }

    function prevSlide() {
        if (currentSlide > 0) {
            currentSlide--;
            showSlide(currentSlide);
        }
    }

    // Event listeners for buttons
    if (prevBtn && nextBtn) {
        nextBtn.addEventListener('click', nextSlide);
        prevBtn.addEventListener('click', prevSlide);
        showSlide(currentSlide);
    }

    // Add navigation functionality
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            if (!link.dataset.index) return;
            
            e.preventDefault();
            const slideIndex = parseInt(link.dataset.index);
            
            // Update navigation
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            
            // Show corresponding slide
            currentSlide = slideIndex;
            showSlide(currentSlide);

            // Trigger confetti if navigating to oldage section
            if (link.getAttribute('href') === '#oldage') {
                createConfetti();
            }
        });
    });

    // Also trigger confetti if directly navigating to oldage section
    if (window.location.hash === '#oldage') {
        setTimeout(createConfetti, 500);
    }

    // Initialize gallery if it exists
    initializeGallery();
});

function initializeGallery() {
    // Gallery Slideshow
    const galleryItems = document.querySelectorAll('.gallery-item');
    const itemsPerPage = 4; // Show 4 items at a time
    let currentGalleryPage = 0;
    const totalPages = Math.ceil(galleryItems.length / itemsPerPage);

    function showGalleryPage(page) {
        galleryItems.forEach((item, index) => {
            const startIndex = page * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;
            
            if (index >= startIndex && index < endIndex) {
                item.style.display = 'block';
                item.style.opacity = '1';
            } else {
                item.style.display = 'none';
                item.style.opacity = '0';
            }
        });

        // Update gallery navigation buttons
        if (galleryPrevBtn) galleryPrevBtn.style.opacity = page === 0 ? '0.5' : '1';
        if (galleryNextBtn) galleryNextBtn.style.opacity = page === totalPages - 1 ? '0.5' : '1';
    }

    function nextGalleryPage() {
        if (currentGalleryPage < totalPages - 1) {
            currentGalleryPage++;
            showGalleryPage(currentGalleryPage);
        }
    }

    function prevGalleryPage() {
        if (currentGalleryPage > 0) {
            currentGalleryPage--;
            showGalleryPage(currentGalleryPage);
        }
    }

    // Add gallery navigation buttons
    const galleryNav = document.createElement('div');
    galleryNav.className = 'gallery-nav';
    galleryNav.innerHTML = `
        <button class="gallery-prev">❮</button>
        <button class="gallery-next">❯</button>
    `;
    document.querySelector('.college-gallery').appendChild(galleryNav);

    const galleryPrevBtn = document.querySelector('.gallery-prev');
    const galleryNextBtn = document.querySelector('.gallery-next');

    galleryPrevBtn.addEventListener('click', prevGalleryPage);
    galleryNextBtn.addEventListener('click', nextGalleryPage);

    // Initialize gallery
    showGalleryPage(0);

    // Auto-slide gallery every 5 seconds
    setInterval(() => {
        if (currentGalleryPage < totalPages - 1) {
            nextGalleryPage();
        } else {
            currentGalleryPage = 0;
            showGalleryPage(0);
        }
    }, 5000);
}

function createConfetti() {
    const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];
    const confettiContainer = document.querySelector('.confetti-container');
    
    if (!confettiContainer) return;

    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDelay = Math.random() * 3 + 's';
        confettiContainer.appendChild(confetti);
    }

    // Clean up confetti after animation
    setTimeout(() => {
        confettiContainer.innerHTML = '';
    }, 6000);
} 