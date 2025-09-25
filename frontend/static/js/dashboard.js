// JavaScript para el Dashboard - AsistNet

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

// Inicializar gráficos
function inicializarGraficos() {
    // Gráfico de Asistencia por Curso
    const attendanceCtx = document.getElementById('attendanceChart');
    if (attendanceCtx) {
        new Chart(attendanceCtx.getContext('2d'), {
            type: 'doughnut',
            data: {
                labels: ['Matemáticas', 'Programación', 'Inglés', 'Ciencias', 'Historia'],
                datasets: [{
                    data: [95, 88, 92, 85, 78],
                    backgroundColor: [
                        '#059669', '#f59e0b', '#3b82f6', '#ef4444', '#8b5cf6'
                    ],
                    borderWidth: 2,
                    borderColor: '#ffffff'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 20,
                            usePointStyle: true
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return `${context.label}: ${context.raw}%`;
                            }
                        }
                    }
                }
            }
        });
    }

    // Gráfico de Trend Mensual
    const trendCtx = document.getElementById('monthlyTrendChart');
    if (trendCtx) {
        new Chart(trendCtx.getContext('2d'), {
            type: 'line',
            data: {
                labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep'],
                datasets: [{
                    label: 'Porcentaje de Asistencia',
                    data: [85, 88, 90, 87, 91, 93, 89, 92, 95],
                    borderColor: '#059669',
                    backgroundColor: 'rgba(5, 150, 105, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.3,
                    pointBackgroundColor: '#059669',
                    pointBorderColor: '#ffffff',
                    pointBorderWidth: 2,
                    pointRadius: 5
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: false,
                        min: 75,
                        max: 100,
                        ticks: {
                            callback: function(value) {
                                return value + '%';
                            }
                        }
                    }
                },
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return `Asistencia: ${context.raw}%`;
                            }
                        }
                    }
                }
            }
        });
    }
}

// Cargar datos del dashboard
function cargarDatosDashboard() {
    // Simular carga de datos del servidor
    console.log('Cargando datos del dashboard...');
    
    // Aquí irían las peticiones fetch reales
    /*
    Promise.all([
        fetch('/api/dashboard/estadisticas'),
        fetch('/api/dashboard/notificaciones'),
        fetch('/api/dashboard/graficos')
    ]).then(responses => {
        return Promise.all(responses.map(response => response.json()));
    }).then(data => {
        actualizarEstadisticas(data[0]);
        actualizarNotificaciones(data[1]);
        actualizarGraficos(data[2]);
    }).catch(error => {
        console.error('Error al cargar datos del dashboard:', error);
        mostrarError('Error al cargar los datos del dashboard');
    });
    */
}

// Actualizar estadísticas en tiempo real
function actualizarEstadisticas(datos) {
    // Esta función actualizaría las estadísticas con datos reales del servidor
    const elementos = {
        totalEstudiantes: document.querySelector('.stat-card:nth-child(1) p'),
        asistenciasHoy: document.querySelector('.stat-card:nth-child(2) p'),
        inasistencias: document.querySelector('.stat-card:nth-child(3) p'),
        cursosActivos: document.querySelector('.stat-card:nth-child(4) p')
    };
    
    if (elementos.totalEstudiantes) elementos.totalEstudiantes.textContent = datos.totalEstudiantes;
    if (elementos.asistenciasHoy) elementos.asistenciasHoy.textContent = datos.asistenciasHoy;
    if (elementos.inasistencias) elementos.inasistencias.textContent = datos.inasistencias;
    if (elementos.cursosActivos) elementos.cursosActivos.textContent = datos.cursosActivos;
}

// Manejar notificaciones
function inicializarNotificaciones() {
    const botonesNotificacion = document.querySelectorAll('.notification-item button');
    
    botonesNotificacion.forEach((boton, index) => {
        boton.addEventListener('click', function() {
            // Aquí iría la lógica para manejar cada notificación
            const tiposNotificacion = ['inasistencia', 'asistencia', 'nuevo-estudiante'];
            manejarNotificacion(tiposNotificacion[index]);
        });
    });
}

function manejarNotificacion(tipo) {
    switch(tipo) {
        case 'inasistencia':
            window.location.href = 'historial_estudiantes.html';
            break;
        case 'asistencia':
            window.location.href = 'consulta_asistencias.html';
            break;
        case 'nuevo-estudiante':
            // Aquí iría la lógica para ver detalles del nuevo estudiante
            mostrarNotificacion('Redirigiendo a detalles del estudiante...', 'info');
            break;
    }
}

// Mostrar notificaciones del sistema
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

// Actualizar datos en tiempo real (simulación)
function iniciarActualizacionTiempoReal() {
    // Simular actualización de datos cada 30 segundos
    setInterval(() => {
        // Aquí iría la lógica para actualizar datos en tiempo real
        console.log('Actualizando datos del dashboard...');
        
        // Simular cambios en las estadísticas
        const elementos = document.querySelectorAll('.stat-card p.text-3xl');
        if (elementos.length >= 4) {
            // Incrementar asistencias de hoy aleatoriamente
            const asistenciasActual = parseInt(elementos[1].textContent);
            elementos[1].textContent = asistenciasActual + Math.floor(Math.random() * 3);
        }
    }, 30000);
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
    inicializarGraficos();
    inicializarNotificaciones();
    inicializarCierreMenuMovil();
    cargarDatosDashboard();
    iniciarActualizacionTiempoReal();
    
    console.log('Dashboard - AsistNet cargado correctamente');
});

// Funciones de utilidad para el dashboard
const dashboardManager = {
    // Exportar reporte del dashboard
    exportarReporte: function() {
        mostrarNotificacion('Generando reporte del dashboard...', 'info');
        
        setTimeout(() => {
            mostrarNotificacion('Reporte generado exitosamente', 'success');
            // Aquí iría la lógica real de exportación
            // window.open('/api/dashboard/exportar', '_blank');
        }, 2000);
    },
    
    // Actualizar manualmente los datos
    actualizarManual: function() {
        mostrarNotificacion('Actualizando datos...', 'info');
        cargarDatosDashboard();
        
        setTimeout(() => {
            mostrarNotificacion('Datos actualizados correctamente', 'success');
        }, 1000);
    },
    
    // Obtener resumen rápido
    obtenerResumen: function() {
        const elementos = document.querySelectorAll('.stat-card p.text-3xl');
        return {
            totalEstudiantes: elementos[0] ? elementos[0].textContent : '0',
            asistenciasHoy: elementos[1] ? elementos[1].textContent : '0',
            inasistencias: elementos[2] ? elementos[2].textContent : '0',
            cursosActivos: elementos[3] ? elementos[3].textContent : '0'
        };
    }
};