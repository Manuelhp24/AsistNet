#!/bin/bash

# Páginas a actualizar
PAGINAS=(
    "login.html"
    "registro.html"
    "dashboard.html"
    "dashboard-simple.html"
    "perfil.html"
    "notificaciones.html"
    "busqueda.html"
    "consulta_asistencias.html"
    "historial_estudiantes.html"
    "preguntas_frecuentes.html"
    "politicas_de_seguridad.html"
    "restablecer_contrasena.html"
    "pantalla_administrador.html"
)

for pagina in "${PAGINAS[@]}"; do
    if [ -f "templates/$pagina" ]; then
        # Backup
        cp "templates/$pagina" "templates/$pagina.backup"
        
        # Extraer contenido único de la página (entre <main> y </main>)
        contenido=$(sed -n '/<main>/,/<\/main>/p' "templates/$pagina" | sed '1d;$d')
        
        # Crear nueva página unificada
        cat templates/components/header.html > "templates/$pagina.tmp"
        echo "$contenido" >> "templates/$pagina.tmp"
        cat templates/components/footer.html >> "templates/$pagina.tmp"
        
        # Reemplazar archivo original
        mv "templates/$pagina.tmp" "templates/$pagina"
        
        echo "✅ $pagina actualizada"
    else
        echo "⚠️  $pagina no existe"
    fi
done
