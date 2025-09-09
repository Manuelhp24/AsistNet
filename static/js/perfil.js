// ===== SISTEMA DE PERFIL DE USUARIO =====

class UserProfileSystem {
    constructor() {
        this.isEditMode = false;
        this.originalData = {};
        this.currentUser = null;
        
        this.init();
    }

    init() {
        this.loadUserData();
        this.setupEventListeners();
        this.setupAvatarUpload();
    }

    // Cargar datos del usuario
    loadUserData() {
        // Simular carga de datos desde API/localStorage
        setTimeout(() => {
            this.currentUser = {
                id: 'EST2024001',
                name: 'Juan Pérez',
                email: 'juan.perez@email.com',
                phone: '+1 234 567 8900',
                birthdate: '2000-05-15',
                avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
                role: 'Estudiante',
                attendance: 92,
                activeCourses: 3,
                absences: 2,
                courses: [
                    {
                        name: 'Matemáticas Avanzadas',
                        professor: 'Carlos Rodríguez',
                        schedule: 'Lun y Mié • 08:00-10:00',
                        attendance: 95
                    },
                    {
                        name: 'Programación Web',
                        professor: 'Ana Martínez',
                        schedule: 'Mar y Jue • 09:30-11:30',
                        attendance: 88
                    }
                ],
                recentAttendance: [
                    {
                        course: 'Matemáticas',
                        time: '08:00 - 10:00',
                        date: '10/09/2024',
                        status: 'present'
                    },
                    {
                        course: 'Programación',
                        time: '09:30 - 11:30',
                        date: '09/09/2024',
                        status: 'late'
                    },
                    {
                        course: 'Inglés',
                        time: '10:00 - 12:00',
                        date: '08/09/2024',
                        status: 'absent'
                    }
                ]
            };

            this.renderUserData();
            this.updateProgressBars();
        }, 500);
    }

    // Renderizar datos del usuario
    renderUserData() {
        if (!this.currentUser) return;

        // Información básica
        document.getElementById('user-name').textContent = this.currentUser.name;
        document.getElementById('user-email').textContent = this.currentUser.email;
        document.getElementById('user-id').textContent = `ID: ${this.currentUser.id}`;
        
        // Avatar
        document.getElementById('user-avatar').src = this.currentUser.avatar;

        // Campos de formulario
        document.getElementById('input-name').value = this.currentUser.name;
        document.getElementById('input-email').value = this.currentUser.email;
        document.getElementById('input-phone').value = this.currentUser.phone;
        document.getElementById('input-birthdate').value = this.currentUser.birthdate;

        // Estadísticas
        this.updateStatistics();

        // Guardar datos originales
        this.originalData = { ...this.currentUser };
    }

    // Actualizar estadísticas
    updateStatistics() {
        const stats = document.querySelectorAll('.bg-gray-50');
        if (stats.length >= 3) {
            stats[0].querySelector('span:last-child').textContent = `${this.currentUser.attendance}%`;
            stats[1].querySelector('span:last-child').textContent = this.currentUser.activeCourses;
            stats[2].querySelector('span:last-child').textContent = this.currentUser.absences;
        }
    }

    // Actualizar barras de progreso
    updateProgressBars() {
        const courseCards = document.querySelectorAll('.border-gray-200');
        this.currentUser.courses.forEach((course, index) => {
            if (courseCards[index]) {
                const progressBar = courseCards[index].querySelector('.progress-bar');
                if (!progressBar) {
                    const progressHtml = `
                        <div class="progress-bar">
                            <div class="progress-fill ${this.getProgressClass(course.attendance)}" 
                                 style="width: ${course.attendance}%"></div>
                        </div>
                    `;
                    courseCards[index].querySelector('.flex.justify-between').insertAdjacentHTML('afterend', progressHtml);
                }
            }
        });
    }

    // Obtener clase CSS para la barra de progreso
    getProgressClass(percentage) {
        if (percentage >= 90) return 'high';
        if (percentage >= 70) return 'medium';
        return 'low';
    }

    // Configurar event listeners
    setupEventListeners() {
        // Enter para guardar en modo edición
        document.addEventListener('keydown', (e) => {
            if (this.isEditMode && e.key === 'Enter') {
                this.saveProfile();
            } else if (this.isEditMode && e.key === 'Escape') {
                this.cancelEdit();
            }
        });

        // Validación en tiempo real
        const inputs = document.querySelectorAll('input');
        inputs.forEach(input => {
            input.addEventListener('input', (e) => {
                this.validateField(e.target);
            });
        });
    }

    // Configurar upload de avatar
    setupAvatarUpload() {
        const uploadInput = document.getElementById('avatar-upload');
        uploadInput.addEventListener('change', (e) => {
            this.handleAvatarUpload(e.target.files[0]);
        });
    }

    // Manejar upload de avatar
    handleAvatarUpload(file) {
        if (!file) return;

        if (!file.type.startsWith('image/')) {
            this.showNotification('Por favor, selecciona una imagen válida', 'error');
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            this.showNotification('La imagen debe ser menor a 5MB', 'error');
            return;
        }

        // Simular upload
        this.showNotification('Subiendo avatar...', 'info');
        
        setTimeout(() => {
            const reader = new FileReader();
            reader.onload = (e) => {
                this.currentUser.avatar = e.target.result;
                document.getElementById('user-avatar').src = e.target.result;
                this.showNotification('Avatar actualizado correctamente', 'success');
                
                // Aquí se guardaría en el servidor
                console.log('Avatar guardado:', this.currentUser.avatar);
            };
            reader.readAsDataURL(file);
        }, 1000);
    }

    // Alternar modo edición
    toggleEditMode() {
        this.isEditMode = !this.isEditMode;
        
        const inputs = document.querySelectorAll('input');
        const editBtn = document.getElementById('edit-btn');
        const editActions = document.getElementById('edit-actions');

        inputs.forEach(input => {
            input.disabled = !this.isEditMode;
        });

        if (this.isEditMode) {
            editBtn.innerHTML = '<i class="fas fa-times mr-2"></i>Cancelar';
            editBtn.classList.remove('bg-white', 'text-emerald-800');
            editBtn.classList.add('bg-gray-500', 'text-white');
            document.body.classList.add('edit-mode');
        } else {
            editBtn.innerHTML = '<i class="fas fa-edit mr-2"></i>Editar Perfil';
            editBtn.classList.remove('bg-gray-500', 'text-white');
            editBtn.classList.add('bg-white', 'text-emerald-800');
            document.body.classList.remove('edit-mode');
            this.cancelEdit();
        }
    }

    // Validar campo
    validateField(field) {
        const value = field.value.trim();
        
        switch (field.id) {
            case 'input-name':
                if (value.length < 2) {
                    field.classList.add('border-red-500');
                    return false;
                }
                break;
                
            case 'input-email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    field.classList.add('border-red-500');
                    return false;
                }
                break;
                
            case 'input-phone':
                const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
                if (!phoneRegex.test(value.replace(/\D/g, ''))) {
                    field.classList.add('border-red-500');
                    return false;
                }
                break;
        }
        
        field.classList.remove('border-red-500');
        return true;
    }

    // Validar formulario completo
    validateForm() {
        const inputs = document.querySelectorAll('input');
        let isValid = true;

        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isValid = false;
            }
        });

        return isValid;
    }

    // Guardar perfil
    saveProfile() {
        if (!this.validateForm()) {
            this.showNotification('Por favor, corrige los errores en el formulario', 'error');
            return;
        }

        // Actualizar datos
        this.currentUser.name = document.getElementById('input-name').value;
        this.currentUser.email = document.getElementById('input-email').value;
        this.currentUser.phone = document.getElementById('input-phone').value;
        this.currentUser.birthdate = document.getElementById('input-birthdate').value;

        // Simular guardado en servidor
        this.showNotification('Guardando cambios...', 'info');
        
        setTimeout(() => {
            this.renderUserData();
            this.toggleEditMode();
            this.showNotification('Perfil actualizado correctamente', 'success');
            
            // Aquí se haría el request al servidor
            console.log('Datos guardados:', this.currentUser);
        }, 1000);
    }

    // Cancelar edición
    cancelEdit() {
        // Restaurar datos originales
        this.currentUser = { ...this.originalData };
        this.renderUserData();
        this.toggleEditMode();
    }

    // Mostrar notificación
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `profile-notification ${
            type === 'error' ? 'border-red-500' : 
            type === 'success' ? 'border-green-500' : 'border-blue-500'
        }`;
        
        notification.innerHTML = `
            <div class="flex items-center">
                <i class="fas ${
                    type === 'error' ? 'fa-exclamation-circle text-red-500' : 
                    type === 'success' ? 'fa-check-circle text-green-500' : 'fa-info-circle text-blue-500'
                } mr-3"></i>
                <p>${message}</p>
            </div>
        `;

        document.body.appendChild(notification);

        // Auto-remover después de 3 segundos
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    // Exportar datos (para futuras funcionalidades)
    exportData() {
        const dataStr = JSON.stringify(this.currentUser, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
        
        const exportFileDefaultName = `perfil-${this.currentUser.id}.json`;
        
        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileDefaultName);
        linkElement.click();
    }
}

// Inicializar el sistema de perfil
const userPanel = new UserProfileSystem();

// Funciones globales
window.userPanel = userPanel;
