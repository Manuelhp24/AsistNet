// JavaScript para la página de Contacto - AsistNet

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

// Validación de formulario de contacto
function inicializarFormularioContacto() {
    const formulario = document.querySelector('form');
    
    if (formulario) {
        formulario.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validarFormulario()) {
                enviarFormulario();
            }
        });
    }
}

// Validar campos del formulario
function validarFormulario() {
    const nombre = document.getElementById('nombre').value.trim();
    const correo = document.getElementById('correo').value.trim();
    const asunto = document.getElementById('asunto').value;
    const mensaje = document.getElementById('mensaje').value.trim();
    
    let errores = [];
    
    // Validar nombre
    if (!nombre) {
        errores.push('El nombre es obligatorio');
        marcarError('nombre');
    } else {
        removerError('nombre');
    }
    
    // Validar correo
    if (!correo) {
        errores.push('El correo electrónico es obligatorio');
        marcarError('correo');
    } else if (!validarEmail(correo)) {
        errores.push('El formato del correo electrónico no es válido');
        marcarError('correo');
    } else {
        removerError('correo');
    }
    
    // Validar asunto
    if (!asunto) {
        errores.push('Debes seleccionar un asunto');
        marcarError('asunto');
    } else {
        removerError('asunto');
    }
    
    // Validar mensaje
    if (!mensaje) {
        errores.push('El mensaje es obligatorio');
        marcarError('mensaje');
    } else if (mensaje.length < 10) {
        errores.push('El mensaje debe tener al menos 10 caracteres');
        marcarError('mensaje');
    } else {
        removerError('mensaje');
    }
    
    if (errores.length > 0) {
        mostrarNotificacion(errores.join('<br>'), 'error');
        return false;
    }
    
    return true;
}

// Validar formato de email
function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Marcar campo con error
function marcarError(campoId) {
    const campo = document.getElementById(campoId);
    if (campo) {
        campo.classList.add('border-red-500');
        campo.classList.remove('border-gray-300');
    }
}

// Remover marca de error
function removerError(campoId) {
    const campo = document.getElementById(campoId);
    if (campo) {
        campo.classList.remove('border-red-500');
        campo.classList.add('border-gray-300');
    }
}

// Enviar formulario (simulación)
function enviarFormulario() {
    const botonEnviar = document.querySelector('form button[type="submit"]');
    const textoOriginal = botonEnviar.innerHTML;
    
    // Mostrar estado de carga
    botonEnviar.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Enviando...';
    botonEnviar.disabled = true;
    
    // Simular envío al servidor
    setTimeout(() => {
        // Restaurar botón
        botonEnviar.innerHTML = textoOriginal;
        botonEnviar.disabled = false;
        
        // Mostrar mensaje de éxito
        mostrarNotificacion('¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.', 'success');
        
        // Limpiar formulario
        document.querySelector('form').reset();
        
        // Aquí iría la lógica real de envío al servidor
        // enviarDatosAlServidor();
    }, 2000);
}

// Función para enviar datos al servidor (ejemplo)
function enviarDatosAlServidor() {
    const formData = new FormData(document.querySelector('form'));
    
    // Aquí iría la petición fetch real
    /*
    fetch('/api/contacto', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            mostrarNotificacion('Mensaje enviado exitosamente', 'success');
        } else {
            mostrarNotificacion('Error al enviar el mensaje', 'error');
        }
    })
    .catch(error => {
        mostrarNotificacion('Error de conexión', 'error');
    });
    */
}

// Mostrar notificaciones
function mostrarNotificacion(mensaje, tipo = 'info') {
    // Remover notificaciones existentes
    const notificacionesExistentes = document.querySelectorAll('.custom-notification');
    notificacionesExistentes.forEach(notif => notif.remove());
    
    // Crear nueva notificación
    const notificacion = document.createElement('div');
    notificacion.className = `custom-notification fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 ${
        tipo === 'error' ? 'bg-red-500' : 
        tipo === 'success' ? 'bg-green-500' : 'bg-blue-500'
    } text-white max-w-sm`;
    notificacion.innerHTML = mensaje;
    
    document.body.appendChild(notificacion);
    
    // Remover después de 5 segundos
    setTimeout(() => {
        if (notificacion.parentNode) {
            notificacion.parentNode.removeChild(notificacion);
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

// Inicializar todas las funcionalidades
document.addEventListener('DOMContentLoaded', function() {
    configurarTailwind();
    inicializarMenuMovil();
    inicializarFormularioContacto();
    inicializarCierreMenuMovil();
    
    console.log('Página de Contacto - AsistNet cargada correctamente');
});

// Funciones de utilidad para contacto
const contactoManager = {
    // Copiar información de contacto al portapapeles
    copiarContacto: function(tipo) {
        let texto = '';
        
        switch(tipo) {
            case 'email':
                texto = 'soporte@asistnet.com';
                break;
            case 'telefono':
                texto = '+57 4560000';
                break;
            case 'ubicacion':
                texto = 'Medellín, Colombia';
                break;
        }
        
        navigator.clipboard.writeText(texto).then(() => {
            mostrarNotificacion(`${tipo.charAt(0).toUpperCase() + tipo.slice(1)} copiado al portapapeles`, 'success');
        });
    },
    
    // Abrir aplicación de correo
    abrirCorreo: function() {
        window.location.href = 'mailto:soporte@asistnet.com';
    },
    
    // Abrir teléfono
    abrirTelefono: function() {
        window.location.href = 'tel:+574560000';
    }
};