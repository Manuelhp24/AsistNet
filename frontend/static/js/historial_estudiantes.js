// JavaScript para la página Historial de Estudiantes - AsistNet

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

// Variables globales para el modal
let estudianteActual = '';
let estadoActual = '';

// Función para abrir el modal de edición
function abrirModal(nombre, estado) {
    estudianteActual = nombre;
    estadoActual = estado;
    
    document.getElementById('nombre-estudiante').textContent = `Estudiante: ${nombre}`;
    document.getElementById('nuevo-estado').value = estado;
    
    const modal = document.getElementById('modal');
    modal.classList.remove('hidden');
}

// Función para cerrar el modal
function cerrarModal() {
    const modal = document.getElementById('modal');
    modal.classList.add('hidden');
}

// Función para guardar los cambios de asistencia
function guardarCambios() {
    const nuevoEstado = document.getElementById('nuevo-estado').value;
    
    // Validar que se haya seleccionado un estado diferente
    if (nuevoEstado === estadoActual) {
        mostrarNotificacion('No se realizaron cambios en el estado de asistencia.', 'info');
        cerrarModal();
        return;
    }
    
    // Simular envío de datos al servidor
    mostrarLoading(true);
    
    setTimeout(() => {
        mostrarLoading(false);
        
        // Aquí iría la lógica real para actualizar en la base de datos
        console.log(`Actualizando asistencia de ${estudianteActual} de ${estadoActual} a ${nuevoEstado}`);
        
        mostrarNotificacion(`Asistencia de ${estudianteActual} actualizada a: ${nuevoEstado}`, 'success');
        
        // Actualizar la fila correspondiente en la tabla
        actualizarFilaTabla(estudianteActual, nuevoEstado);
        
        cerrarModal();
    }, 1500);
}

// Función para actualizar la fila de la tabla después de editar
function actualizarFilaTabla(nombre, nuevoEstado) {
    const filas = document.querySelectorAll('.table-row');
    
    filas.forEach(fila => {
        const nombreCelda = fila.querySelector('td:first-child').textContent;
        if (nombreCelda === nombre) {
            const estadoCelda = fila.querySelector('td:nth-child(3)');
            
            // Actualizar clase y contenido
            estadoCelda.className = 'px-6 py-4 whitespace-nowrap text-sm ' + 
                                   (nuevoEstado === 'Presente' ? 'presente' : 
                                    nuevoEstado === 'Ausente' ? 'ausente' : 'tarde');
            
            estadoCelda.innerHTML = nuevoEstado === 'Presente' ? 
                '<i class="fas fa-check-circle mr-1"></i> Presente' :
                nuevoEstado === 'Ausente' ? 
                '<i class="fas fa-times-circle mr-1"></i> Ausente' :
                '<i class="fas fa-clock mr-1"></i> Tarde';
        }
    });
}

// Función para mostrar notificaciones
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
    notificacion.textContent = mensaje;
    
    document.body.appendChild(notificacion);
    
    // Remover después de 5 segundos
    setTimeout(() => {
        if (notificacion.parentNode) {
            notificacion.parentNode.removeChild(notificacion);
        }
    }, 5000);
}

// Función para mostrar/ocultar loading
function mostrarLoading(mostrar) {
    const botonGuardar = document.querySelector('#modal button.btn-primary');
    if (botonGuardar) {
        if (mostrar) {
            botonGuardar.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Guardando...';
            botonGuardar.disabled = true;
        } else {
            botonGuardar.innerHTML = '<i class="fas fa-save mr-2"></i>Guardar Cambios';
            botonGuardar.disabled = false;
        }
    }
}

// Cerrar modal al hacer clic fuera de él
function inicializarCierreModalExterno() {
    const modal = document.getElementById('modal');
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                cerrarModal();
            }
        });
    }
}

// Filtrar estudiantes (función adicional para búsqueda)
function inicializarBusqueda() {
    const inputBusqueda = document.getElementById('input-busqueda');
    if (inputBusqueda) {
        inputBusqueda.addEventListener('input', function(e) {
            const termino = e.target.value.toLowerCase();
            const filas = document.querySelectorAll('.table-row');
            
            filas.forEach(fila => {
                const nombre = fila.querySelector('td:first-child').textContent.toLowerCase();
                if (nombre.includes(termino)) {
                    fila.style.display = '';
                } else {
                    fila.style.display = 'none';
                }
            });
        });
    }
}

// Inicializar todas las funcionalidades
document.addEventListener('DOMContentLoaded', function() {
    configurarTailwind();
    inicializarMenuMovil();
    inicializarCierreModalExterno();
    inicializarBusqueda();
    
    console.log('Historial de Estudiantes - AsistNet cargado correctamente');
});

// Funciones de utilidad para el historial
const historialManager = {
    // Exportar historial a PDF
    exportarPDF: function() {
        mostrarNotificacion('Generando reporte PDF...', 'info');
        // Aquí iría la lógica para generar PDF
        setTimeout(() => {
            mostrarNotificacion('Reporte PDF generado exitosamente', 'success');
        }, 2000);
    },
    
    // Filtrar por fecha
    filtrarPorFecha: function(fechaInicio, fechaFin) {
        mostrarNotificacion(`Filtrando desde ${fechaInicio} hasta ${fechaFin}`, 'info');
        // Aquí iría la lógica de filtrado por fecha
    },
    
    // Obtener estadísticas
    obtenerEstadisticas: function() {
        return {
            totalEstudiantes: document.querySelectorAll('.table-row').length,
            presentes: document.querySelectorAll('.presente').length,
            ausentes: document.querySelectorAll('.ausente').length,
            tardes: document.querySelectorAll('.tarde').length
        };
    }
};