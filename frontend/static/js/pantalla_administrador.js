// JavaScript para el Panel de Administrador - AsistNet

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

// Menú móvil del administrador
function inicializarMenuMovil() {
    const botonMenuToggle = document.getElementById('menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    
    if (botonMenuToggle && sidebar) {
        botonMenuToggle.addEventListener('click', function(event) {
            event.stopPropagation();
            sidebar.classList.toggle('hidden');
            sidebar.classList.toggle('absolute');
            sidebar.classList.toggle('z-50');
        });
    }
}

// Cerrar menú al hacer clic fuera de él
function inicializarCierreExternoMenu() {
    document.addEventListener('click', function(event) {
        const sidebar = document.querySelector('.sidebar');
        const menuToggle = document.getElementById('menu-toggle');
        
        if (window.innerWidth < 768 && 
            sidebar && !sidebar.classList.contains('hidden') && 
            !sidebar.contains(event.target) && 
            menuToggle && !menuToggle.contains(event.target)) {
            sidebar.classList.add('hidden');
        }
    });
}

// Navegación del sidebar
function inicializarNavegacionSidebar() {
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remover clase active de todos los items
            navItems.forEach(navItem => {
                navItem.classList.remove('active-nav');
            });
            
            // Agregar clase active al item clickeado
            this.classList.add('active-nav');
            
            // Cerrar menú móvil después de la selección
            if (window.innerWidth < 768) {
                const sidebar = document.querySelector('.sidebar');
                if (sidebar) {
                    sidebar.classList.add('hidden');
                }
            }
        });
    });
}

// Cargar datos del dashboard
function cargarDatosDashboard() {
    // Simular carga de datos del servidor
    console.log('Cargando datos del dashboard...');
    
    // Aquí irían las peticiones fetch para obtener datos reales
    /*
    fetch('/api/admin/dashboard')
        .then(response => response.json())
        .then(data => {
            actualizarEstadisticas(data);
        })
        .catch(error => {
            console.error('Error al cargar datos:', error);
        });
    */
}

// Actualizar estadísticas en tiempo real
function actualizarEstadisticas(datos) {
    // Esta función actualizaría las estadísticas con datos reales
    // Por ahora es solo un esqueleto para futura implementación
}

// Notificaciones
function inicializarNotificaciones() {
    const botonNotificaciones = document.querySelector('button .fa-bell').parentElement;
    
    if (botonNotificaciones) {
        botonNotificaciones.addEventListener('click', function() {
            // Aquí iría la lógica para mostrar notificaciones
            console.log('Mostrar notificaciones');
        });
    }
}

// Inicializar todas las funcionalidades
document.addEventListener('DOMContentLoaded', function() {
    configurarTailwind();
    inicializarMenuMovil();
    inicializarCierreExternoMenu();
    inicializarNavegacionSidebar();
    cargarDatosDashboard();
    inicializarNotificaciones();
    
    console.log('Panel de Administrador - AsistNet cargado correctamente');
});

// Funciones de utilidad para el administrador
const adminPanel = {
    // Mostrar mensaje de confirmación
    mostrarConfirmacion: function(mensaje, callback) {
        if (confirm(mensaje)) {
            callback();
        }
    },
    
    // Mostrar notificación toast
    mostrarNotificacion: function(mensaje, tipo = 'info') {
        // Crear elemento de notificación
        const notificacion = document.createElement('div');
        notificacion.className = `fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 ${
            tipo === 'error' ? 'bg-red-500' : 
            tipo === 'success' ? 'bg-green-500' : 'bg-blue-500'
        } text-white max-w-sm`;
        notificacion.textContent = mensaje;
        notificacion.style.zIndex = '1000';
        
        document.body.appendChild(notificacion);
        
        // Remover después de 5 segundos
        setTimeout(() => {
            if (notificacion.parentNode) {
                notificacion.parentNode.removeChild(notificacion);
            }
        }, 5000);
    },
    
    // Cargar vista específica
    cargarVista: function(vista) {
        // Aquí iría la lógica para cargar diferentes vistas del panel
        console.log('Cargando vista:', vista);
    }
};