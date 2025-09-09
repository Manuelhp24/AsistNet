 <script>
        // Convertir toda el área del li en clickeable
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', function() {
                const link = this.querySelector('a');
                if (link) {
                    window.location.href = link.href;
                }
            });
        });
    </script>