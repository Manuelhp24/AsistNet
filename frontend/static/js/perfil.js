// JavaScript para la página de Perfil - AsistNet

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

// Funcionalidad para editar perfil
const userPanel = {
    isEditMode: false,
    datosOriginales: {},
    
    inicializar: function() {
        this.guardarDatosOriginales();
        this.configurarEventos();
    },
    
    guardarDatosOriginales: function() {
        this.datosOriginales = {
            nombre: document.getElementById('input-name').value,
            email: document.getElementById('input-email').value,
            telefono: document.getElementById('input-phone').value,
            fechaNacimiento: document.getElementById('input-birthdate').value
        };
    },
    
    configurarEventos: function() {
        // Evento para subir avatar
        document.getElementById('avatar-upload').addEventListener('change', this.manejarSubidaAvatar.bind(this));
    },
    
    toggleEditMode: function() {
        this.isEditMode = !this.isEditMode;
        const inputs = document.querySelectorAll('#input-name, #input-email, #input-phone, #input-birthdate');
        const editBtn = document.getElementById('edit-btn');
        const editActions = document.getElementById('edit-actions');
        
        inputs.forEach(input => {
            input.disabled = !this.isEditMode;
            if (this.isEditMode) {
                input.classList.add('bg-white');
                input.classList.remove('bg-gray-50');
            } else {
                input.classList.remove('bg-white');
                input.classList.add('bg-gray-50');
            }
        });
        
        if (this.isEditMode) {
            editBtn.classList.add('hidden');
            editActions.classList.remove('hidden');
            this.mostrarMensaje('Modo edición activado. Puedes modificar tu información.', 'info');
        } else {
            editBtn.classList.remove('hidden');
            editActions.classList.add('hidden');
        }
    },
    
    saveProfile: function() {
        // Validar datos antes de guardar
        if (!this.validarDatos()) {
            return;
        }
        
        // Simular guardado en servidor
        this.mostrarLoading(true);
        
        setTimeout(() => {
            this.mostrarLoading(false);
            this.mostrarMensaje('Perfil actualizado correctamente', 'success');
            this.guardarDatosOriginales(); // Actualizar datos originales
            this.toggleEditMode();
        }, 1500);
    },
    
    validarDatos: function() {
        const nombre = document.getElementById('input-name').value.trim();
        const email = document.getElementById('input-email').value.trim();
        const telefono = document.getElementById('input-phone').value.trim();
        
        let errores = [];
        
        if (!nombre) {
            errores.push('El nombre es obligatorio');
            document.getElementById('input-name').style.borderColor = '#ef4444';
        }
        
        if (!email) {
            errores.push('El email es obligatorio');
            document.getElementById('input-email').style.borderColor = '#ef4444';
        } else if (!this.validarEmail(email)) {
            errores.push('El formato del email no es válido');
            document.getElementById('input-email').style.borderColor = '#ef4444';
        }
        
        if (telefono && !this.validarTelefono(telefono)) {
            errores.push('El formato del teléfono no es válido');
            document.getElementById('input-phone').style.borderColor = '#ef4444';
        }
        
        if (errores.length > 0) {
            this.mostrarMensaje(errores.join('<br>'), 'error');
            return false;
        }
        
        return true;
    },
    
    validarEmail: function(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    },
    
    validarTelefono: function(telefono) {
        const regex = /^[\+]?[1-9][\d]{0,15}$/;
        return regex.test(telefono.replace(/\s/g, ''));
    },
    
    cancelEdit: function() {
        // Restaurar valores originales
        document.getElementById('input-name').value = this.datosOriginales.nombre;
        document.getElementById('input-email').value = this.datosOriginales.email;
        document.getElementById('input-phone').value = this.datosOriginales.telefono;
        document.getElementById('input-birthdate').value = this.datosOriginales.fechaNacimiento;
        
        // Restaurar estilos de borde
        const inputs = document.querySelectorAll('#input-name, #input-email, #input-phone, #input-birthdate');
        inputs.forEach(input => {
            input.style.borderColor = '';
        });
        
        this.mostrarMensaje('Edición cancelada. No se guardaron los cambios.', 'info');
        this.toggleEditMode();
    },
    
    manejarSubidaAvatar: function(e) {
        const file = e.target.files[0];
        if (file) {
            // Validar tipo de archivo
            if (!file.type.startsWith('image/')) {
                this.mostrarMensaje('Por favor, selecciona una imagen válida', 'error');
                return;
            }
            
            // Validar tamaño (máximo 2MB)
            if (file.size > 2 * 1024 * 1024) {
                this.mostrarMensaje('La imagen debe ser menor a 2MB', 'error');
                return;
            }
            
            const reader = new FileReader();
            reader.onload = (e) => {
                document.getElementById('user-avatar').src = e.target.result;
                this.mostrarMensaje('Avatar actualizado correctamente', 'success');
                
                // Aquí podrías enviar la imagen al servidor
                // this.subirAvatarAlServidor(file);
            };
            reader.readAsDataURL(file);
        }
    },
    
    mostrarLoading: function(mostrar) {
        const botonGuardar = document.querySelector('#edit-actions .btn-primary');
        if (mostrar) {
            botonGuardar.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Guardando...';
            botonGuardar.disabled = true;
        } else {
            botonGuardar.innerHTML = '<i class="fas fa-save mr-2"></i>Guardar cambios';
            botonGuardar.disabled = false;
        }
    },
    
    mostrarMensaje: function(mensaje, tipo = 'info') {
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
    },
    
    // Método para subir avatar al servidor (ejemplo)
    subirAvatarAlServidor: function(file) {
        const formData = new FormData();
        formData.append('avatar', file);
        
        // Aquí iría la petición fetch al servidor
        /*
        fetch('/api/upload-avatar', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                this.mostrarMensaje('Avatar actualizado correctamente', 'success');
            } else {
                this.mostrarMensaje('Error al subir el avatar', 'error');
            }
        })
        .catch(error => {
            this.mostrarMensaje('Error de conexión', 'error');
        });
        */
    }
};

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
    userPanel.inicializar();
    inicializarCierreMenuMovil();
    inicializarCierreExternoMenu();
    
    console.log('AsistNet - Perfil cargado correctamente');
});