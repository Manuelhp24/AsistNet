// AsistNet - JavaScript principal
// Funcionalidades para la página principal

// Configuración de Tailwind CSS
function configurarTailwind() {
    if (typeof tailwind !== 'undefined') {
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        'emerald': {
                            50: '#ecfdf5',
                            100: '#d1fae5',
                            200: '#a7f3d0',
                            300: '#6ee7b7',
                            400: '#34d399',
                            500: '#10b981',
                            600: '#059669',
                            700: '#047857',
                            800: '#065f46',
                            900: '#064e3b',
                        },
                        'amber': {
                            50: '#fffbeb',
                            100: '#fef3c7',
                            200: '#fde68a',
                            300: '#fcd34d',
                            400: '#fbbf24',
                            500: '#f59e0b',
                            600: '#d97706',
                            700: '#b45309',
                            800: '#92400e',
                            900: '#78350f',
                        }
                    }
                }
            }
        };
    }
}

// Menú móvil - Mostrar/ocultar
function inicializarMenuMovil() {
    const botonMenuMovil = document.querySelector('.mobile-menu-button');
    const menuMovil = document.querySelector('.mobile-menu');
    
    if (botonMenuMovil && menuMovil) {
        botonMenuMovil.addEventListener('click', () => {
            menuMovil.classList.toggle('hidden');
        });
    }
}

// Desplazamiento suave para enlaces internos
function inicializarDesplazamientoSuave() {
    document.querySelectorAll('a[href^="#"]').forEach(enlace => {
        enlace.addEventListener('click', function (e) {
            e.preventDefault();
            
            const idDestino = this.getAttribute('href');
            const elementoDestino = document.querySelector(idDestino);
            
            if (elementoDestino) {
                elementoDestino.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Animaciones al hacer scroll
function inicializarAnimacionesScroll() {
    const animarAlScroll = function() {
        const elementos = document.querySelectorAll('.feature-card, .testimonial-card, .stats-item');
        
        elementos.forEach(elemento => {
            const posicionElemento = elemento.getBoundingClientRect().top;
            const posicionPantalla = window.innerHeight / 1.2;
            
            if(posicionElemento < posicionPantalla) {
                elemento.style.opacity = '1';
                elemento.style.transform = 'translateY(0)';
            }
        });
    };
    
    window.addEventListener('scroll', animarAlScroll);
}

// Inicializar elementos con opacidad 0 para animación
function inicializarAnimaciones() {
    document.querySelectorAll('.feature-card, .testimonial-card, .stats-item').forEach(elemento => {
        elemento.style.opacity = '0';
        elemento.style.transform = 'translateY(20px)';
        elemento.style.transition = 'all 0.6s ease';
    });
}

// Cerrar menú móvil al hacer clic en un enlace
function inicializarCierreMenuMovil() {
    const menuMovil = document.querySelector('.mobile-menu');
    const enlacesMenu = document.querySelectorAll('.mobile-menu a');
    
    enlacesMenu.forEach(enlace => {
        enlace.addEventListener('click', () => {
            if (menuMovil) {
                menuMovil.classList.add('hidden');
            }
        });
    });
}

// Cerrar menú móvil al hacer clic fuera de él
function inicializarCierreExternoMenu() {
    document.addEventListener('click', (e) => {
        const menuMovil = document.querySelector('.mobile-menu');
        const botonMenu = document.querySelector('.mobile-menu-button');
        
        if (menuMovil && !menuMovil.classList.contains('hidden') && 
            !menuMovil.contains(e.target) && 
            botonMenu && !botonMenu.contains(e.target)) {
            menuMovil.classList.add('hidden');
        }
    });
}

// Inicializar todas las funcionalidades cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', function() {
    configurarTailwind();
    inicializarMenuMovil();
    inicializarDesplazamientoSuave();
    inicializarAnimacionesScroll();
    inicializarAnimaciones();
    inicializarCierreMenuMovil();
    inicializarCierreExternoMenu();
    
    console.log('AsistNet - JavaScript cargado correctamente');
});

// Funciones utilitarias adicionales
const AsistNet = {
    // Función debounce para mejorar el rendimiento
    debounce: function(funcion, espera) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                funcion(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, espera);
        };
    }
};

// Hacer funciones disponibles globalmente
window.AsistNet = AsistNet;

// Manejar cambios de tamaño de ventana
window.addEventListener('resize', AsistNet.debounce(function() {
    // Cerrar menú móvil en pantallas grandes
    if (window.innerWidth >= 768) {
        const menuMovil = document.querySelector('.mobile-menu');
        if (menuMovil) {
            menuMovil.classList.add('hidden');
        }
    }
}, 250));