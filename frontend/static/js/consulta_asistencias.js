// JavaScript para la página Consulta de Asistencias - AsistNet

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

// Función para filtrar asistencias por grupo
function mostrarAsistencias() {
    const grupoSeleccionado = document.getElementById('grupo').value;
    const filas = document.querySelectorAll('#tabla-asistencias tr');
    
    let asistenciasCount = 0;
    let ausenciasCount = 0;
    let retardosCount = 0;
    
    filas.forEach(fila => {
        const grupoFila = fila.getAttribute('data-grupo');
        
        if (grupoSeleccionado === 'todos' || grupoFila === grupoSeleccionado) {
            fila.style.display = '';
            
            // Contar estadísticas
            const estado = fila.querySelector('td:nth-child(3)').className;
            if (estado.includes('presente')) asistenciasCount++;
            else if (estado.includes('ausente')) ausenciasCount++;
            else if (estado.includes('tarde')) retardosCount++;
        } else {
            fila.style.display = 'none';
        }
    });
    
    // Actualizar estadísticas
    actualizarEstadisticas(asistenciasCount, ausenciasCount, retardosCount);
    
    // Mostrar mensaje si no hay resultados
    mostrarMensajeSinResultados(grupoSeleccionado, asistenciasCount + ausenciasCount + retardosCount);
}

// Función para actualizar estadísticas
function actualizarEstadisticas(asistencias, ausencias, retardos) {
    document.querySelector('.bg-emerald-50 p').textContent = asistencias;
    document.querySelector('.bg-red-50 p').textContent = ausencias;
    document.querySelector('.bg-amber-50 p').textContent = retardos;
}

// Mostrar mensaje cuando no hay resultados
function mostrarMensajeSinResultados(grupo, total) {
    const tablaBody = document.getElementById('tabla-asistencias');
    let mensajeExistente = document.getElementById('mensaje-sin-resultados');
    
    if (total === 0) {
        if (!mensajeExistente) {
            const mensajeFila = document.createElement('tr');
            mensajeFila.id = 'mensaje-sin-resultados';
            mensajeFila.innerHTML = `
                <td colspan="4" class="px-6 py-8 text-center text-gray-500">
                    <i class="fas fa-inbox text-4xl mb-2 opacity-50"></i>
                    <p class="text-lg">No se encontraron asistencias para el grupo "${grupo}"</p>
                    <p class="text-sm mt-1">Intenta seleccionar otro grupo o verifica las fechas</p>
                </td>
            `;
            tablaBody.appendChild(mensajeFila);
        }
    } else {
        if (mensajeExistente) {
            mensajeExistente.remove();
        }
    }
}

// Cargar datos de asistencias (simulación)
function cargarDatosAsistencias() {
    // En una aplicación real, aquí se haría una petición al servidor
    console.log('Cargando datos de asistencias...');
    
    // Simular datos del servidor
    const datosEjemplo = [
        { clase: 'Matemáticas', grupo: 'Grupo A', estado: 'presente', fecha: '10/09/2024' },
        { clase: 'Historia', grupo: 'Grupo A', estado: 'ausente', fecha: '09/09/2024' },
        { clase: 'Inglés', grupo: 'Grupo B', estado: 'presente', fecha: '10/09/2024' },
        { clase: 'Ciencias', grupo: 'Grupo B', estado: 'tarde', fecha: '08/09/2024' },
        { clase: 'Programación', grupo: 'Grupo C', estado: 'presente', fecha: '11/09/2024' },
        { clase: 'Arte', grupo: 'Grupo C', estado: 'ausente', fecha: '07/09/2024' }
    ];
    
    // Aquí iría la lógica para poblar la tabla con datos reales
    // poblarTabla(datosEjemplo);
}

// Exportar reporte de asistencias
function exportarReporte() {
    const grupoSeleccionado = document.getElementById('grupo').value;
    const nombreArchivo = `reporte-asistencias-${grupoSeleccionado.toLowerCase().replace(' ', '-')}-${new Date().toISOString().split('T')[0]}.pdf`;
    
    mostrarNotificacion(`Generando reporte: ${nombreArchivo}`, 'info');
    
    // Simular generación de reporte
    setTimeout(() => {
        mostrarNotificacion('Reporte generado exitosamente', 'success');
        
        // Aquí iría la lógica real de exportación
        // window.open(`/api/exportar-asistencias?grupo=${grupoSeleccionado}`, '_blank');
    }, 2000);
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
    notificacion.textContent = mensaje;
    
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
    inicializarCierreMenuMovil();
    cargarDatosAsistencias();
    mostrarAsistencias(); // Mostrar todas las asistencias al cargar
    
    console.log('Consulta de Asistencias - AsistNet cargada correctamente');
});

// Funciones de utilidad para consulta de asistencias
const consultaAsistencias = {
    // Buscar asistencias por texto
    buscarAsistencias: function(termino) {
        const filas = document.querySelectorAll('#tabla-asistencias tr');
        const terminoLower = termino.toLowerCase();
        
        filas.forEach(fila => {
            const textoFila = fila.textContent.toLowerCase();
            if (textoFila.includes(terminoLower)) {
                fila.style.display = '';
            } else {
                fila.style.display = 'none';
            }
        });
    },
    
    // Ordenar tabla por columna
    ordenarTabla: function(columna) {
        const tabla = document.getElementById('tabla-asistencias');
        const filas = Array.from(tabla.querySelectorAll('tr'));
        const direccion = tabla.getAttribute('data-orden') === 'asc' ? 'desc' : 'asc';
        
        filas.sort((a, b) => {
            const valorA = a.querySelector(`td:nth-child(${columna})`).textContent;
            const valorB = b.querySelector(`td:nth-child(${columna})`).textContent;
            
            if (direccion === 'asc') {
                return valorA.localeCompare(valorB);
            } else {
                return valorB.localeCompare(valorA);
            }
        });
        
        // Reordenar filas
        filas.forEach(fila => tabla.appendChild(fila));
        tabla.setAttribute('data-orden', direccion);
    },
    
    // Obtener resumen estadístico
    obtenerResumen: function() {
        const filas = document.querySelectorAll('#tabla-asistencias tr');
        let total = 0;
        let presentes = 0;
        let ausentes = 0;
        let tardes = 0;
        
        filas.forEach(fila => {
            if (fila.style.display !== 'none') {
                total++;
                const estado = fila.querySelector('td:nth-child(3)').className;
                if (estado.includes('presente')) presentes++;
                else if (estado.includes('ausente')) ausentes++;
                else if (estado.includes('tarde')) tardes++;
            }
        });
        
        return {
            total,
            presentes,
            ausentes,
            tardes,
            porcentajeAsistencia: total > 0 ? ((presentes + tardes) / total * 100).toFixed(1) : 0
        };
    }
};