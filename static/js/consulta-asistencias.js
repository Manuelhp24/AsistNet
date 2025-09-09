function mostrarAsistencias() {
    const grupoSeleccionado = document.getElementById('grupo').value;
    const filas = document.querySelectorAll('#tabla-asistencias tr');

    filas.forEach(fila => {
        if (grupoSeleccionado === 'todos' || fila.getAttribute('data-grupo') === grupoSeleccionado) {
            fila.style.display = '';
        } else {
            fila.style.display = 'none';
        }
    });
}

// Inicializar la tabla mostrando todos los registros
document.addEventListener('DOMContentLoaded', function() {
    mostrarAsistencias();
});
