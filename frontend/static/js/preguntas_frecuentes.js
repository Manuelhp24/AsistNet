// JavaScript para la página de Preguntas Frecuentes - AsistNet

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

// Menú móvil
function inicializarMenuMovil() {
    const botonMenuMovil = document.querySelector('.mobile-menu-button');
    const menuMovil = document.querySelector('.mobile-menu');
    
    if (botonMenuMovil && menuMovil) {
        botonMenuMovil.addEventListener('click', () => {
            menuMovil.classList.toggle('hidden');
        });
    }
}

// Funcionalidad de acordeón para FAQs (opcional - para expandir/contraer respuestas)
function inicializarAcordeonFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const pregunta = item.querySelector('h3');
        const respuesta = item.querySelector('.text-gray-700');
        
        if (pregunta && respuesta) {
            // Ocultar respuesta inicialmente (opcional)
            // respuesta.style.display = 'none';
            
            pregunta.style.cursor = 'pointer';
            pregunta.addEventListener('click', () => {
                // Alternar visibilidad de la respuesta
                if (respuesta.style.display === 'none') {
                    respuesta.style.display = 'block';
                    item.style.borderLeftColor = '#f59e0b';
                } else {
                    respuesta.style.display = 'none';
                    item.style.borderLeftColor = 'transparent';
                }
            });
        }
    });
}

// Smooth scroll para enlaces internos
function inicializarScrollSuave() {
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

// Efecto de hover mejorado para FAQ items
function inicializarEfectosHover() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.borderLeftColor = '#f59e0b';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.borderLeftColor = 'transparent';
        });
    });
}

// Inicializar todas las funcionalidades
document.addEventListener('DOMContentLoaded', function() {
    configurarTailwind();
    inicializarMenuMovil();
    inicializarScrollSuave();
    inicializarCierreMenuMovil();
    inicializarCierreExternoMenu();
    inicializarEfectosHover();
    
    // Opcional: Descomenta la siguiente línea si quieres que las FAQs sean expandibles
    // inicializarAcordeonFAQ();
    
    console.log('AsistNet - Preguntas Frecuentes cargado correctamente');
});