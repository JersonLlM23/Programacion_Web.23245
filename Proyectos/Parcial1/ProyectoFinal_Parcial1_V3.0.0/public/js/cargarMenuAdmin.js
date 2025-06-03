// Cargar menú admin
fetch('paginas/Admin/menuadmin.html')
  .then(res => res.text())
  .then(data => document.getElementById('menuadmin').innerHTML = data);

// Función para cargar páginas admin
window.cargarPaginasAdmin = function(nombre_pagina) {
    fetch(`paginas/Admin/${nombre_pagina}.html`)
        .then(res => res.text())
        .then(data => {
            document.getElementById('contenidoadmin').innerHTML = data;

            // Llama a la función después de cargar la vista
            if (nombre_pagina === 'verPerfiladmin') {
                setTimeout(() => {
                    if (typeof window.mostrarPerfilesAdmin === "function") {
                        window.mostrarPerfilesAdmin();
                    }
                }, 0);
            }

            if (nombre_pagina === 'verMensajes') {
                setTimeout(() => {
                    if (typeof window.mostrarMensajesContacto === "function") {
                        window.mostrarMensajesContacto();
                    }
                }, 0);
            }
        })
        .catch(err => console.error('Error al cargar la página:', err));
}

// Cargar página principal admin al iniciar
window.onload = () => cargarPaginasAdmin('indexadmin');