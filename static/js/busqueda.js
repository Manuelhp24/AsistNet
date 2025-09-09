// ===== SISTEMA DE BÚSQUEDA INTELIGENTE EN TIEMPO REAL =====

class SmartSearchSystem {
    constructor() {
        this.searchInput = document.getElementById('search-input');
        this.suggestionsContainer = document.getElementById('suggestions-container');
        this.suggestionsList = document.getElementById('suggestions-list');
        this.resultsContainer = document.getElementById('results-container');
        this.resultsCount = document.getElementById('results-count');
        this.clearSearchBtn = document.getElementById('clear-search');
        this.searchBtn = document.getElementById('search-btn');
        this.advancedFilters = document.getElementById('advanced-filters');
        this.toggleFiltersBtn = document.getElementById('toggle-filters');
        this.loadingElement = document.getElementById('loading');
        
        this.currentQuery = '';
        this.currentFilters = {
            type: 'all',
            date: 'all',
            status: 'all'
        };
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadSampleData();
    }

    // Configurar event listeners
    setupEventListeners() {
        // Búsqueda en tiempo real
        this.searchInput.addEventListener('input', this.debounce(() => {
            this.handleSearchInput();
        }, 300));

        // Botón de búsqueda
        this.searchBtn.addEventListener('click', () => {
            this.performSearch(this.searchInput.value);
        });

        // Botón de limpiar
        this.clearSearchBtn.addEventListener('click', () => {
            this.clearSearch();
        });

        // Teclas especiales
        this.searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                this.performSearch(this.searchInput.value);
            } else if (e.key === 'Escape') {
                this.hideSuggestions();
            }
        });

        // Filtros
        document.getElementById('filter-type').addEventListener('change', (e) => {
            this.currentFilters.type = e.target.value;
            this.performSearch(this.currentQuery);
        });

        document.getElementById('filter-date').addEventListener('change', (e) => {
            this.currentFilters.date = e.target.value;
            this.performSearch(this.currentQuery);
        });

        document.getElementById('filter-status').addEventListener('change', (e) => {
            this.currentFilters.status = e.target.value;
            this.performSearch(this.currentQuery);
        });

        // Toggle filtros
        this.toggleFiltersBtn.addEventListener('click', () => {
            this.advancedFilters.classList.toggle('hidden');
            this.toggleFiltersBtn.innerHTML = this.advancedFilters.classList.contains('hidden') 
                ? '<i class="fas fa-filter mr-1"></i>Filtros avanzados' 
                : '<i class="fas fa-times mr-1"></i>Ocultar filtros';
        });

        // Cerrar sugerencias al hacer click fuera
        document.addEventListener('click', (e) => {
            if (!this.searchInput.contains(e.target) && !this.suggestionsContainer.contains(e.target)) {
                this.hideSuggestions();
            }
        });
    }

    // Debounce para búsqueda en tiempo real
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Manejar input de búsqueda
    handleSearchInput() {
        const query = this.searchInput.value.trim();
        this.currentQuery = query;

        // Mostrar/ocultar botón de limpiar
        this.clearSearchBtn.classList.toggle('hidden', query === '');

        if (query === '') {
            this.hideSuggestions();
            this.clearResults();
            return;
        }

        if (query.length < 2) {
            this.hideSuggestions();
            return;
        }

        // Mostrar sugerencias
        this.showSuggestions(query);
    }

    // Mostrar sugerencias
    async showSuggestions(query) {
        this.showLoading(true);
        
        // Simular delay de API
        setTimeout(() => {
            const suggestions = this.generateSuggestions(query);
            this.renderSuggestions(suggestions);
            this.showLoading(false);
        }, 200);
    }

    // Generar sugerencias
    generateSuggestions(query) {
        const lowerQuery = query.toLowerCase();
        const allData = this.getSampleData();
        const suggestions = [];

        // Buscar en estudiantes
        allData.students.forEach(student => {
            if (student.name.toLowerCase().includes(lowerQuery) || 
                student.email.toLowerCase().includes(lowerQuery)) {
                suggestions.push({
                    type: 'student',
                    title: student.name,
                    subtitle: student.email,
                    icon: '👨‍🎓',
                    data: student
                });
            }
        });

        // Buscar en cursos
        allData.courses.forEach(course => {
            if (course.name.toLowerCase().includes(lowerQuery) || 
                course.code.toLowerCase().includes(lowerQuery)) {
                suggestions.push({
                    type: 'course',
                    title: course.name,
                    subtitle: `Código: ${course.code}`,
                    icon: '📚',
                    data: course
                });
            }
        });

        return suggestions.slice(0, 5); // Limitar a 5 sugerencias
    }

    // Renderizar sugerencias
    renderSuggestions(suggestions) {
        if (suggestions.length === 0) {
            this.hideSuggestions();
            return;
        }

        this.suggestionsList.innerHTML = suggestions.map(suggestion => `
            <div class="suggestion-item" onclick="searchSystem.selectSuggestion(this)" 
                 data-type="${suggestion.type}" data-value='${JSON.stringify(suggestion.data)}'>
                <div class="flex items-center">
                    <div class="suggestion-icon ${suggestion.type}">
                        ${suggestion.icon}
                    </div>
                    <div>
                        <div class="font-semibold text-gray-800">${suggestion.title}</div>
                        <div class="text-sm text-gray-600">${suggestion.subtitle}</div>
                    </div>
                </div>
            </div>
        `).join('');

        this.suggestionsContainer.classList.remove('hidden');
    }

    // Ocultar sugerencias
    hideSuggestions() {
        this.suggestionsContainer.classList.add('hidden');
    }

    // Seleccionar sugerencia
    selectSuggestion(element) {
        const type = element.getAttribute('data-type');
        const data = JSON.parse(element.getAttribute('data-value'));
        
        this.searchInput.value = data.name || data.title;
        this.performSearch(this.searchInput.value);
        this.hideSuggestions();
    }

    // Realizar búsqueda
    async performSearch(query) {
        if (!query.trim()) {
            this.clearResults();
            return;
        }

        this.currentQuery = query;
        this.showLoading(true);
        this.hideSuggestions();

        // Simular delay de búsqueda
        setTimeout(() => {
            const results = this.searchData(query);
            this.renderResults(results);
            this.updateResultsCount(results.length);
            this.showLoading(false);
        }, 500);
    }

    // Buscar en datos
    searchData(query) {
        const lowerQuery = query.toLowerCase();
        const allData = this.getSampleData();
        const results = [];

        // Aplicar filtros
        const filterType = this.currentFilters.type;
        const filterDate = this.currentFilters.date;
        const filterStatus = this.currentFilters.status;

        // Buscar estudiantes
        if (filterType === 'all' || filterType === 'students') {
            allData.students.forEach(student => {
                if (this.matchesSearch(student, lowerQuery)) {
                    results.push({
                        type: 'student',
                        title: student.name,
                        description: `Email: ${student.email} | Curso: ${student.course}`,
                        meta: `ID: ${student.id} | ${student.status}`,
                        badge: student.status,
                        icon: '👨‍🎓',
                        data: student
                    });
                }
            });
        }

        // Buscar cursos
        if (filterType === 'all' || filterType === 'courses') {
            allData.courses.forEach(course => {
                if (this.matchesSearch(course, lowerQuery)) {
                    results.push({
                        type: 'course',
                        title: course.name,
                        description: course.description,
                        meta: `Código: ${course.code} | Estudiantes: ${course.students}`,
                        badge: course.status,
                        icon: '📚',
                        data: course
                    });
                }
            });
        }

        // Buscar asistencias
        if (filterType === 'all' || filterType === 'attendance') {
            allData.attendance.forEach(record => {
                if (this.matchesSearch(record, lowerQuery)) {
                    results.push({
                        type: 'attendance',
                        title: `Asistencia de ${record.studentName}`,
                        description: `Curso: ${record.course} | Fecha: ${record.date}`,
                        meta: `Hora: ${record.time} | Estado: ${record.status}`,
                        badge: record.status,
                        icon: '📅',
                        data: record
                    });
                }
            });
        }

        return results;
    }

    // Verificar coincidencia de búsqueda
    matchesSearch(item, query) {
        for (let key in item) {
            if (typeof item[key] === 'string' && item[key].toLowerCase().includes(query)) {
                return true;
            }
        }
        return false;
    }

    // Renderizar resultados
    renderResults(results) {
        if (results.length === 0) {
            this.resultsContainer.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-search"></i>
                    <p>No se encontraron resultados para "${this.currentQuery}"</p>
                    <p class="text-sm mt-2">Intenta con otros términos o ajusta los filtros</p>
                </div>
            `;
            return;
        }

        this.resultsContainer.innerHTML = results.map(result => `
            <div class="result-item" onclick="searchSystem.handleResultClick(this)" 
                 data-type="${result.type}" data-value='${JSON.stringify(result.data)}'>
                <div class="result-header">
                    <div class="result-title">
                        ${result.icon} ${result.title}
                    </div>
                    <span class="result-badge badge-${result.badge}">
                        ${result.badge}
                    </span>
                </div>
                <div class="result-meta">${result.meta}</div>
                <div class="result-description">${result.description}</div>
            </div>
        `).join('');
    }

    // Manejar click en resultado
    handleResultClick(element) {
        const type = element.getAttribute('data-type');
        const data = JSON.parse(element.getAttribute('data-value'));
        
        console.log('Resultado seleccionado:', type, data);
        // Aquí se podría redirigir a la página correspondiente
        this.showToast(`Redirigiendo a ${type}: ${data.name || data.studentName}`);
    }

    // Actualizar contador de resultados
    updateResultsCount(count) {
        this.resultsCount.textContent = `${count} resultado${count !== 1 ? 's' : ''}`;
    }

    // Limpiar búsqueda
    clearSearch() {
        this.searchInput.value = '';
        this.clearSearchBtn.classList.add('hidden');
        this.hideSuggestions();
        this.clearResults();
    }

    // Limpiar resultados
    clearResults() {
        this.resultsContainer.innerHTML = `
            <div class="text-center py-12 text-gray-500">
                <i class="fas fa-search text-4xl mb-4"></i>
                <p>Ingresa un término de búsqueda para comenzar</p>
            </div>
        `;
        this.resultsCount.textContent = '0 resultados';
    }

    // Mostrar/ocultar loading
    showLoading(show) {
        if (show) {
            this.searchInput.classList.add('loading');
            this.loadingElement.classList.remove('hidden');
        } else {
            this.searchInput.classList.remove('loading');
            this.loadingElement.classList.add('hidden');
        }
    }

    // Mostrar toast
    showToast(message) {
        const toast = document.createElement('div');
        toast.className = 'fixed bottom-4 right-4 bg-emerald-600 text-white px-6 py-3 rounded-lg shadow-lg z-50';
        toast.textContent = message;
        document.body.appendChild(toast);

        setTimeout(() => {
            toast.remove();
        }, 3000);
    }

    // Datos de ejemplo
    loadSampleData() {
        // Los datos se generan on-demand
    }

    getSampleData() {
        return {
            students: [
                { id: 1, name: 'Juan Pérez', email: 'juan@email.com', course: 'Matemáticas', status: 'active' },
                { id: 2, name: 'María García', email: 'maria@email.com', course: 'Programación', status: 'active' },
                { id: 3, name: 'Carlos López', email: 'carlos@email.com', course: 'Inglés', status: 'inactive' },
                { id: 4, name: 'Ana Martínez', email: 'ana@email.com', course: 'Historia', status: 'active' }
            ],
            courses: [
                { id: 1, name: 'Matemáticas Avanzadas', code: 'MATH101', description: 'Curso de matemáticas para nivel avanzado', students: 25, status: 'active' },
                { id: 2, name: 'Programación Web', code: 'PROG201', description: 'Desarrollo web moderno con JavaScript', students: 30, status: 'active' },
                { id: 3, name: 'Inglés Técnico', code: 'ENG301', description: 'Inglés para propósitos académicos', students: 20, status: 'active' }
            ],
            attendance: [
                { id: 1, studentName: 'Juan Pérez', course: 'Matemáticas', date: '2024-09-09', time: '08:00', status: 'present' },
                { id: 2, studentName: 'María García', course: 'Programación', date: '2024-09-09', time: '09:30', status: 'late' },
                { id: 3, studentName: 'Carlos López', course: 'Inglés', date: '2024-09-08', time: '10:00', status: 'absent' }
            ]
        };
    }
}

// Inicializar el sistema de búsqueda
const searchSystem = new SmartSearchSystem();

// Funciones globales
window.searchSystem = searchSystem;
