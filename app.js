// Mobile Menu Functionality
document.addEventListener('DOMContentLoaded', function () {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mainNav = document.getElementById('mainNav');

    mobileMenuBtn.addEventListener('click', function () {
        mainNav.classList.toggle('active');

        // Animate hamburger icon
        const spans = mobileMenuBtn.querySelectorAll('span');
        if (mainNav.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });

    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            mainNav.classList.remove('active');
            mobileMenuBtn.querySelectorAll('span')[0].style.transform = 'none';
            mobileMenuBtn.querySelectorAll('span')[1].style.opacity = '1';
            mobileMenuBtn.querySelectorAll('span')[2].style.transform = 'none';
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// 
let currentIndex = 0;
let autoPlayInterval; // Variable para guardar el temporizador

const slides = document.querySelectorAll('.carousel-slide');
const dots = document.querySelectorAll('.dot');
const track = document.querySelector('.carousel-track');

// Función principal para mover el carrusel
function updateCarousel() {
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    
    // Actualizar estado de las bolitas
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
    });
}

// Función para saltar al siguiente slide automáticamente
function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    updateCarousel();
}

// Función para cuando haces clic manualmente en las bolitas
function currentSlide(index) {
    currentIndex = index;
    updateCarousel();
    resetTimer(); // Reiniciamos el tiempo para que no salte de inmediato
}

// Función para iniciar/reiniciar el temporizador
function resetTimer() {
    clearInterval(autoPlayInterval); // Borra el contador anterior
    autoPlayInterval = setInterval(nextSlide, 5000); // Crea uno nuevo de 5 segundos
}

// Iniciar el carrusel por primera vez
resetTimer();
