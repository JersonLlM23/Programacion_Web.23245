fetch('paginas/menu.html')
    .then(res => res.text())
    .then(data => document.getElementById('menu').innerHTML = data)
    .catch(err => console.error('Error al cargar el menú:', err));
 

function cargarPaginas(nombre_pagina) {

    if (typeof detenerCamara === "function" && nombre_pagina !== 'crearUser') {
        detenerCamara();
    }
    fetch(`paginas/${nombre_pagina}.html`)
        .then(res => res.text())
        .then(data => {
            document.getElementById('contenido').innerHTML = data;
            if (nombre_pagina === 'verPerfil') {
                if (typeof mostrarPerfil === "function") mostrarPerfil();
            }

            if (nombre_pagina === 'crearUser') {
                if (typeof inicializarCamara === "function") inicializarCamara();
                if (typeof inicializarMapa === "function") inicializarMapa();
            }
        })
        .catch(err => console.error('Error al cargar la página:', err));
}

window.onload = () => cargarPaginas('index');