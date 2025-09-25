// JavaScript para la página de Iniciar Sesión - AsistNet

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

// Validación del formulario de login
function inicializarValidacionLogin() {
    const formulario = document.querySelector('form');
    const usuarioInput = document.getElementById('usuario');
    const passwordInput = document.getElementById('password');
    const recordarCheckbox = document.querySelector('input[type="checkbox"]');
    
    if (formulario) {
        formulario.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const usuario = usuarioInput.value.trim();
            const password = passwordInput.value.trim();
            
            // Validaciones
            let errores = [];
            
            if (!usuario) {
                errores.push('El campo usuario es obligatorio');
                usuarioInput.style.borderColor = '#ef4444';
            } else {
                usuarioInput.style.borderColor = '#10b981';
            }
            
            if (!password) {
                errores.push('El campo contraseña es obligatorio');
                passwordInput.style.borderColor = '#ef4444';
            } else {
                passwordInput.style.borderColor = '#10b981';
            }
            
            if (errores.length > 0) {
                mostrarMensaje(errores.join('<br>'), 'error');
                return;
            }
            
            // Simular proceso de login
            simularLogin(usuario, password, recordarCheckbox.checked);
        });
    }
}

// Simular proceso de login
function simularLogin(usuario, password, recordar) {
    // Mostrar loading
    const botonLogin = document.querySelector('.btn-primary');
    const textoOriginal = botonLogin.innerHTML;
    botonLogin.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Verificando...';
    botonLogin.disabled = true;
    
    // Simular delay de red
    setTimeout(() => {
        // Aquí iría la lógica real de autenticación
        const credencialesValidas = validarCredenciales(usuario, password);
        
        if (credencialesValidas) {
            // Guardar en localStorage si se marcó "Recordar usuario"
            if (recordar) {
                localStorage.setItem('usuarioRecordado', usuario);
            } else {
                localStorage.removeItem('usuarioRecordado');
            }
            
            mostrarMensaje('¡Inicio de sesión exitoso! Redirigiendo...', 'success');
            
            // Redirección después de éxito
            setTimeout(() => {
                window.location.href = 'pantalla_administrador.html';
            }, 1500);
        } else {
            mostrarMensaje('Usuario o contraseña incorrectos. Por favor, verifique sus credenciales.', 'error');
            botonLogin.innerHTML = textoOriginal;
            botonLogin.disabled = false;
        }
    }, 1500);
}

// Validar credenciales (simulación)
function validarCredenciales(usuario, password) {
    // En una implementación real, esto haría una petición al servidor
    const usuariosValidos = ['admin', 'usuario', 'docente', 'estudiante'];
    const passwordValido = 'password123'; // Solo para demostración
    
    return usuariosValidos.includes(usuario.toLowerCase()) && password === passwordValido;
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

// Cargar usuario recordado
function cargarUsuarioRecordado() {
    const usuarioRecordado = localStorage.getItem('usuarioRecordado');
    const usuarioInput = document.getElementById('usuario');
    const recordarCheckbox = document.querySelector('input[type="checkbox"]');
    
    if (usuarioRecordado) {
        usuarioInput.value = usuarioRecordado;
        recordarCheckbox.checked = true;
    }
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
    inicializarValidacionLogin();
    cargarUsuarioRecordado();
    inicializarCierreMenuMovil();
    inicializarCierreExternoMenu();
    
    console.log('AsistNet - Login cargado correctamente');
});