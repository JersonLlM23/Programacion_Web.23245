fetch('menu.html')
  .then(res => res.text())
  .then(data => document.getElementById('menu').innerHTML = data)
  .catch(err => console.error('Error al cargar el menú:', err));

fetch('menu2.html')
  .then(res => res.text())
  .then(data => document.getElementById('menu2').innerHTML = data)
  .catch(err => console.error('Error al cargar el menú2:', err));

fetch('footer.html')
  .then(res => res.text())
  .then(data => document.getElementById('piedepagina').innerHTML = data)
  .catch(err => console.error('Error al cargar el pie de página:', err));

function cargarPaginas(nombre_pagina) {
    fetch(`../pages/${nombre_pagina}.html`)
        .then(res => res.text())
        .then(data => {
            document.getElementById('paginaprincipal').innerHTML = data;
        })
        .catch(err => console.error('Error al cargar la página:', err));
}

function cargarPaginas2(nom_pagina) {
    fetch(`../pages/${nom_pagina}.html`)
        .then(res => res.text())
        .then(data => {
            document.getElementById('inventariocontenido').innerHTML = data;
        })
        .catch(err => console.error('Error al cargar la página:', err));
    }

window.onload = () => {
  cargarPaginas('dashboard');  
  cargarPaginas2('inventario');
};
