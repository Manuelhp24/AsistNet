let estudianteActual = null;

function abrirModal(nombre, estadoActual) {
    estudianteActual = nombre;
    document.getElementById("nombre-estudiante").innerText = "Estudiante: " + nombre;
    document.getElementById("nuevo-estado").value = estadoActual;
    document.getElementById("modal").classList.remove('hidden');
}

function cerrarModal() {
    document.getElementById("modal").classList.add('hidden');
}

function guardarCambios() {
    const nuevoEstado = document.getElementById("nuevo-estado").value;
    alert(`Asistencia actualizada para ${estudianteActual}: ${nuevoEstado}`);
    cerrarModal();

    // Aquí iría la lógica para actualizar la tabla
    // Por simplicidad en este ejemplo solo mostramos un alert
}
