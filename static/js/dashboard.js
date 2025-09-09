// ===== FUNCIONALIDADES DEL DASHBOARD =====

// Configuración de gráficos
function initCharts() {
    // Gráfico de Asistencia por Curso
    const attendanceCtx = document.getElementById('attendanceChart').getContext('2d');
    new Chart(attendanceCtx, {
        type: 'doughnut',
        data: {
            labels: ['Matemáticas', 'Programación', 'Inglés', 'Historia', 'Ciencias'],
            datasets: [{
                data: [95, 88, 92, 85, 90],
                backgroundColor: [
                    '#059669',
                    '#2563eb', 
                    '#f59e0b',
                    '#dc2626',
                    '#7c3aed'
                ],
                borderWidth: 2,
                borderColor: '#ffffff'
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        font: {
                            size: 12
                        }
                    }
                }
            }
        }
    });

    // Gráfico de Trend Mensual
    const trendCtx = document.getElementById('monthlyTrendChart').getContext('2d');
    new Chart(trendCtx, {
        type: 'line',
        data: {
            labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
            datasets: [{
                label: 'Asistencia (%)',
                data: [85, 88, 92, 90, 94, 96],
                borderColor: '#059669',
                backgroundColor: 'rgba(5, 150, 105, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: false,
                    min: 80,
                    max: 100
                }
            }
        }
    });
}

// Simulación de datos en tiempo real
function simulateLiveData() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    // Animación de contadores
    statNumbers.forEach(stat => {
        const target = parseInt(stat.textContent);
        let current = 0;
        const duration = 2000;
        const steps = 60;
        const increment = target / steps;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                stat.textContent = target;
                clearInterval(timer);
            } else {
                stat.textContent = Math.round(current);
            }
        }, duration / steps);
    });
}

// Notificaciones interactivas
function setupNotifications() {
    const notifications = document.querySelectorAll('.notification-item');
    
    notifications.forEach(notification => {
        notification.addEventListener('click', function() {
            this.style.opacity = '0.7';
            setTimeout(() => {
                this.style.opacity = '1';
            }, 300);
            
            // Aquí se podría agregar lógica para marcar como leído
            console.log('Notificación clickeada:', this.querySelector('p').textContent);
        });
    });
}

// Inicialización cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    console.log('Dashboard inicializado');
    
    initCharts();
    simulateLiveData();
    setupNotifications();
    
    // Actualizar datos cada 30 segundos (simulado)
    setInterval(simulateLiveData, 30000);
});

// Funcionalidad de búsqueda rápida (para implementar luego)
function quickSearch() {
    // TODO: Implementar búsqueda en tiempo real
    console.log('Funcionalidad de búsqueda rápida');
}

// Exportar funciones para uso global (si es necesario)
window.dashboard = {
    initCharts,
    simulateLiveData,
    setupNotifications,
    quickSearch
};
