// JavaScript para la página de Registro - AsistNet

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

// Mostrar/ocultar contraseña
function inicializarTogglePassword() {
    document.querySelectorAll('.password-toggle').forEach(toggle => {
        toggle.addEventListener('click', function() {
            const input = this.closest('.relative').querySelector('input');
            const icon = this.querySelector('i');
            
            if (input.type === 'password') {
                input.type = 'text';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            } else {
                input.type = 'password';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            }
        });
    });
}

// Validación de fortaleza de contraseña
function validarFortalezaContrasena(contrasena) {
    let fortaleza = 0;
    const regex = {
        minuscula: /[a-z]/,
        mayuscula: /[A-Z]/,
        numero: /[0-9]/,
        especial: /[!@#$%^&*(),.?":{}|<>]/
    };

    if (contrasena.length >= 8) fortaleza += 25;
    if (regex.minuscula.test(contrasena)) fortaleza += 25;
    if (regex.mayuscula.test(contrasena)) fortaleza += 25;
    if (regex.numero.test(contrasena)) fortaleza += 15;
    if (regex.especial.test(contrasena)) fortaleza += 10;

    return Math.min(fortaleza, 100);
}

// Validación del formulario
function inicializarValidacionFormulario() {
    const formulario = document.querySelector('form');
    
    if (formulario) {
        formulario.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nombre = document.getElementById('nombre')?.value;
            const tipoDocumento = document.getElementById('select')?.value;
            const documento = document.getElementById('Documento')?.value;
            const telefono = document.getElementById('telefono')?.value;
            const correo = document.getElementById('correo')?.value;
            const contrasena = document.getElementById('contrasena')?.value;
            const confirmarContrasena = document.getElementById('confirmar_contrasena')?.value;
            
            // Validaciones
            let errores = [];
            
            if (!nombre) {
                errores.push('El nombre completo es obligatorio');
            }
            
            if (!tipoDocumento) {
                errores.push('El tipo de documento es obligatorio');
            }
            
            if (!documento) {
                errores.push('El número de documento es obligatorio');
            }
            
            if (!telefono) {
                errores.push('El teléfono es obligatorio');
            }
            
            if (!correo) {
                errores.push('El correo electrónico es obligatorio');
            } else if (!validarEmail(correo)) {
                errores.push('El correo electrónico no es válido');
            }
            
            if (contrasena !== confirmarContrasena) {
                errores.push('Las contraseñas no coinciden');
            }
            
            if (contrasena && contrasena.length < 8) {
                errores.push('La contraseña debe tener al menos 8 caracteres');
            }
            
            if (contrasena) {
                const fortaleza = validarFortalezaContrasena(contrasena);
                if (fortaleza < 50) {
                    errores.push('La contraseña es demasiado débil. Debe incluir mayúsculas, números y caracteres especiales');
                }
            }
            
            if (errores.length > 0) {
                mostrarMensaje(errores.join('<br>'), 'error');
            } else {
                // Simular registro exitoso
                mostrarMensaje('¡Registro exitoso! Redirigiendo al login...', 'success');
                setTimeout(() => {
                    window.location.href = 'login.html';
                }, 2000);
            }
        });
    }
}

// Validar email
function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Mostrar mensajes al usuario
function mostrarMensaje(mensaje, tipo = 'info') {
    // Remover mensajes existentes
    const mensajesExistentes = document.querySelectorAll('.custom-message');
    mensajesExistentes.forEach(msg => msg.remove());
    
    // Crear nuevo mensaje
    const mensajeDiv = document.createElement('div');
    mensajeDiv.className = `custom-message fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 ${
        tipo === 'error' ? 'bg-red-500' : 
        tipo === 'success' ? 'bg-green-500' : 'bg-blue-500'
    } text-white max-w-sm`;
    mensajeDiv.innerHTML = mensaje;
    mensajeDiv.style.zIndex = '1000';
    
    document.body.appendChild(mensajeDiv);
    
    // Remover después de 5 segundos
    setTimeout(() => {
        if (mensajeDiv.parentNode) {
            mensajeDiv.parentNode.removeChild(mensajeDiv);
        }
    }, 5000);
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

// Inicializar todas las funcionalidades
document.addEventListener('DOMContentLoaded', function() {
    configurarTailwind();
    inicializarMenuMovil();
    inicializarTogglePassword();
    inicializarValidacionFormulario();
    inicializarCierreMenuMovil();
    inicializarCierreExternoMenu();
    
    console.log('AsistNet - Registro cargado correctamente');
});