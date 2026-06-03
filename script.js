// CONFIGURACIÓN DEL MOTOR DE PARTÍCULAS MÁGICAS
const canvas = document.getElementById('magic-particles');
const ctx = canvas.getContext('2d');

// Ajustar tamaño del lienzo al tamaño real de la sección
function resizeCanvas() {
    const parent = canvas.parentElement;
    canvas.width = parent.offsetWidth;
    canvas.height = parent.offsetHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Estructura de cada partícula de oro
const particlesArray = [];
const numberOfParticles = 80; // Cantidad ideal de partículas flotantes

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2.5 + 0.5; // Tamaños variados finos
        this.speedX = Math.random() * 0.4 - 0.2; // Movimiento horizontal sutil
        this.speedY = Math.random() * -0.6 - 0.2; // Flotan hacia arriba constantemente
        this.alpha = Math.random() * 0.5 + 0.2; // Opacidades para dar profundidad
        this.fadeSpeed = Math.random() * 0.005 + 0.002;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Si la partícula sube demasiado o sale, se reinicia abajo
        if (this.y < 0 || this.x < 0 || this.x > canvas.width) {
            this.x = Math.random() * canvas.width;
            this.y = canvas.height + 10;
            this.size = Math.random() * 2.5 + 0.5;
            this.alpha = Math.random() * 0.5 + 0.2;
        }
    }

    draw() {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        // Color oro premium con resplandor
        ctx.fillStyle = '#D4AF37';
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#D4AF37';
        ctx.fill();
        ctx.restore();
    }
}

// Inicializar la manada de partículas
function init() {
    for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
    }
}
init();

// Bucle de animación continuo (Renderizado a 60 FPS)
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
    }
    requestAnimationFrame(animate);
}
animate();



// CONTROL INTERACTIVO DEL MENÚ DE HAMBURGUESA MÓVIL
const menuToggle = document.getElementById('mobile-menu');
const navMenu = document.getElementById('nav-menu');

if (menuToggle && navMenu) {
    // Abre y cierra al hacer clic en la hamburguesa
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('is-active');
        navMenu.classList.toggle('active');
    });

    // Cierra automáticamente el menú cuando se hace clic en una opción (Mitología, Artistas, etc.)
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('is-active');
            navMenu.classList.remove('active');
        });
    });
}

// ACCIÓN DEL BOTÓN "INGRESAR A LA EXPERIENCIA"
const btnEnter = document.getElementById('btn-enter');

if (btnEnter) {
    btnEnter.addEventListener('click', () => {
        // Busca la sección de historia y se desplaza suavemente hacia ella
        document.querySelector('#historia').scrollIntoView({ 
            behavior: 'smooth' 
        });
    });
}


// 1. Lógica del Preloader
window.addEventListener('load', () => {
    const loader = document.getElementById('preloader');
    const progress = document.getElementById('progress');
    const perc = document.getElementById('perc');
    let width = 0;
    const interval = setInterval(() => {
        if (width >= 100) {
            clearInterval(interval);
            loader.style.opacity = '0';
            setTimeout(() => { loader.style.display = 'none'; }, 1000);
        } else {
            width++;
            progress.style.width = width + '%';
            perc.innerText = width + '%';
        }
    }, 30);
});

// 2. Lógica de animación de la sección contacto
document.addEventListener('DOMContentLoaded', () => {
    const contactSection = document.querySelector('.contact-section');
    if (contactSection) {
        contactSection.style.opacity = 0;
        contactSection.style.transform = 'translateY(50px)';
        contactSection.style.transition = 'all 1s ease-out';

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = 1;
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        });
        observer.observe(contactSection);
    }
});

const audio = document.getElementById('bg-music');

// Función que intenta reproducir
function playAudio() {
    audio.play().then(() => {
        console.log("Música iniciada correctamente.");
    }).catch(error => {
        console.log("Bloqueado por el navegador, esperando interacción.");
    });
}

// Escuchar cambios de pestaña
document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
        audio.pause();
    } else {
        playAudio();
    }
});

// ACTIVACIÓN MÁGICA: Escucha el primer clic en la página
document.addEventListener('click', () => {
    playAudio();
}, { once: true });




document.addEventListener('DOMContentLoaded', () => {
    const welcomeOverlay = document.getElementById('welcome-overlay');
    const startBtn = document.getElementById('btn-start-music');
    const audio = document.getElementById('bg-music');

    startBtn.addEventListener('click', () => {
        // 1. Reproducir música
        audio.play().catch(e => console.log("Error al reproducir:", e));
        
        // 2. Ocultar la capa de bienvenida
        welcomeOverlay.style.transition = "opacity 1s ease";
        welcomeOverlay.style.opacity = "0";
        
        // 3. Eliminarla del DOM después de la animación
        setTimeout(() => {
            welcomeOverlay.style.display = "none";
        }, 1000);
    });
});