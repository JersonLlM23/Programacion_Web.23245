fetch('paginas/menu.html')
    .then(res => res.text())
    .then(data => document.getElementById('menu').innerHTML = data)
    .catch(err => console.error('Error al cargar el menú:', err));
 

window.cargarPaginas = function(nombre_pagina) {
    // Detener cámara solo si existe la función y el elemento video
    if (typeof detenerCamara === "function" && document.getElementById('video')) {
        detenerCamara();
    }
    fetch(`paginas/${nombre_pagina}.html`)
        .then(res => res.text())
        .then(data => {
            document.getElementById('contenido').innerHTML = data;

            if (nombre_pagina === 'verPerfiles') {
                if (typeof mostrarUsuarios === "function") mostrarUsuarios();
            }
            if (nombre_pagina === 'verPerfil') {
                if (typeof window.inicializarVistaPerfil === "function") window.inicializarVistaPerfil();
            }
            if (nombre_pagina === 'crearUser') {
                // Solo inicializar cámara si existe el elemento video
                if (typeof inicializarCamara === "function" && document.getElementById('video')) {
                    inicializarCamara();
                }
                if (typeof inicializarMapa === "function") inicializarMapa();
            }
        })
        .catch(err => console.error('Error al cargar la página:', err));
}

window.onload = () => cargarPaginas('index');