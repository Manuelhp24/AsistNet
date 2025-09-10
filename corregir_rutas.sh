#!/bin/bash

# Corregir rutas en todas las páginas HTML
find templates -name "*.html" -exec sed -i 's/href="login.html"/href="login.html"/g' {} \;
find templates -name "*.html" -exec sed -i 's/href="registro.html"/href="registro.html"/g' {} \;
find templates -name "*.html" -exec sed -i 's/href="preguntas_frecuentes.html"/href="preguntas_frecuentes.html"/g' {} \;
find templates -name "*.html" -exec sed -i 's/href="..\/index.html"/href="..\/index.html"/g' {} \;
