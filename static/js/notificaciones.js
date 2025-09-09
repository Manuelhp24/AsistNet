// ===== SISTEMA DE NOTIFICACIONES EN TIEMPO REAL =====

class NotificationSystem {
    constructor() {
        this.notifications = [];
        this.currentFilter = 'all';
        this.currentPage = 1;
        this.notificationsPerPage = 10;
        this.init();
    }

    init() {
        this.loadNotifications();
        this.setupEventListeners();
        this.startRealTimeUpdates();
    }

    // Simular datos de notificaciones
    generateSampleNotifications() {
        return [
            {
                id: 1,
                type: 'alert',
                title: '⚠️ Inasistencia consecutiva',
                message: 'Juan Pérez tiene 3 inasistencias consecutivas en Matemáticas',
                time: 'Hace 2 horas',
                read: false,
                priority: 'high'
            },
            {
                id: 2,
                type: 'success',
                title: '✅ Asistencia registrada',
                message: 'Asistencia masiva del curso de Programación registrada correctamente',
                time: 'Hace 5 horas',
                read: true,
                priority: 'medium'
            },
            {
                id: 3,
                type: 'info',
                title: '🎓 Nuevo estudiante',
                message: 'María García se ha registrado en el sistema',
                time: 'Ayer',
                read: false,
                priority: 'low'
            },
            {
                id: 4,
                type: 'alert',
                title: '🚨 Sistema caído',
                message: 'El servidor de base de datos presentó problemas esta mañana',
                time: 'Ayer',
                read: true,
                priority: 'high'
            },
            {
                id: 5,
                type: 'success',
                title: '📊 Reporte generado',
                message: 'El reporte mensual de asistencias ha sido generado exitosamente',
                time: 'Hace 2 días',
                read: false,
                priority: 'medium'
            }
        ];
    }

    // Cargar notificaciones
    loadNotifications() {
        // Simular carga desde API
        setTimeout(() => {
            this.notifications = this.generateSampleNotifications();
            this.renderNotifications();
            this.updateUnreadCount();
        }, 1000);
    }

    // Renderizar notificaciones
    renderNotifications() {
        const container = document.getElementById('notifications-list');
        const filteredNotifications = this.filterNotifications(this.currentFilter);
        const paginatedNotifications = this.paginateNotifications(filteredNotifications);

        if (paginatedNotifications.length === 0) {
            container.innerHTML = `
                <div class="text-center py-12 text-gray-500">
                    <i class="fas fa-bell text-4xl mb-4"></i>
                    <p>No hay notificaciones</p>
                </div>
            `;
            return;
        }

        container.innerHTML = paginatedNotifications.map(notification => `
            <div class="notification-item ${notification.read ? '' : 'unread'} ${notification.type}" 
                 onclick="notificationSystem.markAsRead(${notification.id})">
                <div class="flex items-start space-x-4">
                    <div class="notification-icon ${notification.type}">
                        ${this.getNotificationIcon(notification.type)}
                    </div>
                    <div class="notification-content">
                        <div class="notification-title">
                            ${notification.title}
                            ${!notification.read ? '<span class="unread-badge">NUEVO</span>' : ''}
                        </div>
                        <div class="notification-message">${notification.message}</div>
                        <div class="notification-time">${notification.time}</div>
                    </div>
                </div>
            </div>
        `).join('');
    }

    // Filtrar notificaciones
    filterNotifications(filterType) {
        this.currentFilter = filterType;
        
        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(btn => btn.classList.remove('active'));
        event.target.classList.add('active');

        switch (filterType) {
            case 'unread':
                return this.notifications.filter(n => !n.read);
            case 'alerts':
                return this.notifications.filter(n => n.type === 'alert');
            case 'info':
                return this.notifications.filter(n => n.type === 'info');
            default:
                return this.notifications;
        }
    }

    // Paginar notificaciones
    paginateNotifications(notifications) {
        const start = (this.currentPage - 1) * this.notificationsPerPage;
        return notifications.slice(0, start + this.notificationsPerPage);
    }

    // Marcar como leída
    markAsRead(id) {
        const notification = this.notifications.find(n => n.id === id);
        if (notification && !notification.read) {
            notification.read = true;
            this.renderNotifications();
            this.updateUnreadCount();
            this.showToast('Notificación marcada como leída');
        }
    }

    // Marcar todas como leídas
    markAllAsRead() {
        this.notifications.forEach(n => n.read = true);
        this.renderNotifications();
        this.updateUnreadCount();
        this.showToast('Todas las notificaciones marcadas como leídas');
    }

    // Actualizar contador de no leídas
    updateUnreadCount() {
        const unreadCount = this.notifications.filter(n => !n.read).length;
        document.getElementById('unread-count').textContent = unreadCount;
    }

    // Cargar más notificaciones
    loadMore() {
        this.currentPage++;
        this.renderNotifications();
    }

    // Iconos por tipo
    getNotificationIcon(type) {
        const icons = {
            alert: '⚠️',
            success: '✅',
            info: 'ℹ️',
            default: '🔔'
        };
        return icons[type] || icons.default;
    }

    // Mostrar toast de confirmación
    showToast(message) {
        // Implementación simple de toast
        const toast = document.createElement('div');
        toast.className = 'fixed top-4 right-4 bg-emerald-600 text-white px-6 py-3 rounded-lg shadow-lg z-50';
        toast.textContent = message;
        document.body.appendChild(toast);

        setTimeout(() => {
            toast.remove();
        }, 3000);
    }

    // Actualizaciones en tiempo real
    startRealTimeUpdates() {
        // Simular actualizaciones en tiempo real
        setInterval(() => {
            this.simulateNewNotification();
        }, 30000);
    }

    simulateNewNotification() {
        const newNotification = {
            id: Date.now(),
            type: Math.random() > 0.5 ? 'alert' : 'info',
            title: Math.random() > 0.5 ? '⚠️ Nueva alerta' : '📋 Actualización',
            message: 'Nueva notificación en tiempo real',
            time: 'Ahora mismo',
            read: false,
            priority: 'medium'
        };

        this.notifications.unshift(newNotification);
        this.renderNotifications();
        this.updateUnreadCount();
        
        // Mostrar notificación push
        if ('Notification' in window && Notification.permission === 'granted') {
            new Notification(newNotification.title, {
                body: newNotification.message,
                icon: '/static/img/favicon.png'
            });
        }
    }

    // Configurar event listeners
    setupEventListeners() {
        // Solicitar permisos de notificación
        if ('Notification' in window) {
            Notification.requestPermission();
        }
    }
}

// Inicializar el sistema de notificaciones
const notificationSystem = new NotificationSystem();

// Funciones globales para los botones
function filterNotifications(type) {
    notificationSystem.filterNotifications(type);
}

function markAllAsRead() {
    notificationSystem.markAllAsRead();
}

function loadMore() {
    notificationSystem.loadMore();
}

// Exportar para uso global
window.notificationSystem = notificationSystem;
window.filterNotifications = filterNotifications;
window.markAllAsRead = markAllAsRead;
window.loadMore = loadMore;
