/*!
* Start Bootstrap - Agency v7.0.12 (https://startbootstrap.com/theme/agency)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-agency/blob/master/LICENSE)
*/
//
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }

    };

    // Shrink the navbar 
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    //  Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            rootMargin: '0px 0px -40%',
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

});

window.mostrarModalContacto = function() {
    var modal = new bootstrap.Modal(document.getElementById('contactoEnviadoModal'));
    modal.show();
    // Limpia el formulario si quieres:
    var form = document.querySelector('#contact form');
    if(form) form.reset();
}

function calcularEdad() {
    const nacimiento = document.getElementById('txt_nacimiento').value;
    const spanEdad = document.getElementById('edadCalculada');
    if (!nacimiento) {
        spanEdad.textContent = '';
        return;
    }
    const hoy = new Date();
    const fechaNac = new Date(nacimiento);
    let edad = hoy.getFullYear() - fechaNac.getFullYear();
    const m = hoy.getMonth() - fechaNac.getMonth();
    if (m < 0 || (m === 0 && hoy.getDate() < fechaNac.getDate())) {
        edad--;
    }
    if (edad < 0 || isNaN(edad)) {
        spanEdad.textContent = '';
        return;
    }
    spanEdad.textContent = `Edad: ${edad} años`;
}

window.mostrarFechaHoraActual = function(idElemento) {
    function actualizar() {
        const ahora = new Date();
        const fecha = ahora.toLocaleDateString('es-EC');
        const hora = ahora.toLocaleTimeString('es-EC', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        document.getElementById(idElemento).textContent = `📅 ${fecha} 🕒 ${hora}`;
    }
    actualizar();
    // Limpia intervalos anteriores si existen
    if (window._intervalFechaHora) clearInterval(window._intervalFechaHora);
    window._intervalFechaHora = setInterval(actualizar, 1000);
}

window.inicializarVistaPerfil = function() {
    // Recupera usuario
    var usuario = localStorage.getItem('usuario');
    if (!usuario) {
      var usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
      if (usuarios.length > 0) {
        usuario = JSON.stringify(usuarios[usuarios.length - 1]);
        localStorage.setItem('usuario', usuario);
      }
    }
    if (usuario) {
      var user = JSON.parse(usuario);
      document.getElementById('tbd_nombre').innerHTML = user.nombre_usuario || '';
      document.getElementById('tbd_edad').innerHTML = user.edad_usuario || '';
      document.getElementById('tbd_departamento').innerHTML = user.departamento_usuario || '';
      document.getElementById('tbd_semestre').innerHTML = user.semestre_usuario || '';
      document.getElementById('tbd_genero').innerHTML = user.genero_usuario || '';
      if (user.estado_animo) {
        document.getElementById('estadoAnimo').value = user.estado_animo;
      }
      if (user.comentario_dia) {
        document.getElementById('comentarioDia').value = user.comentario_dia;
      }
      if (user.foto_usuario && user.foto_usuario.length > 30) {
        var img = document.getElementById('foto_perfil');
        img.src = user.foto_usuario;
        img.style.display = "block";
      }
    }
    // Fecha y hora
    if (typeof mostrarFechaHoraActual === "function") {
        mostrarFechaHoraActual('fechaHoraPerfil');
    }
    // Modal de éxito si viene de registro
    if (sessionStorage.getItem('perfilRecienCreado')) {
        if (typeof mostrarModalPerfil === "function") {
            mostrarModalPerfil("¡Muy bien!", "Ahora agrega tu foto, estado de ánimo y comentario del día.");
        }
        sessionStorage.removeItem('perfilRecienCreado');
    }

    // Asocia el evento al botón de eliminar perfil SIEMPRE que cargues la vista
    const btn = document.getElementById('btnConfirmarEliminarPerfil');
    if (btn) {
        btn.onclick = function() {
            localStorage.removeItem('usuario');
            var usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
            var usuario = JSON.parse(sessionStorage.getItem('usuario')) || JSON.parse(localStorage.getItem('usuario')) || {};
            var index = usuarios.findIndex(u =>
                u.nombre_usuario === usuario.nombre_usuario &&
                u.departamento_usuario === usuario.departamento_usuario &&
                u.latitud_usuario === usuario.latitud_usuario &&
                u.longitud_usuario === usuario.longitud_usuario
            );
            if (index !== -1) {
                usuarios.splice(index, 1);
                localStorage.setItem('usuarios', JSON.stringify(usuarios));
            }
            if (typeof cargarPaginas === "function") {
                cargarPaginas('verPerfiles');
            } else {
                window.location.href = 'verPerfiles.html';
            }
        }
    }
}

window.confirmarEliminarPerfil = function() {
  var modal = new bootstrap.Modal(document.getElementById('modalConfirmarEliminarPerfil'));
  modal.show();
}

document.addEventListener('DOMContentLoaded', function() {
  const btn = document.getElementById('btnConfirmarEliminarPerfil');
  if (btn) {
    btn.onclick = function() {
      // Elimina usuario individual
      localStorage.removeItem('usuario');
      // Elimina también del array de usuarios si es necesario
      var usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
      var usuario = JSON.parse(sessionStorage.getItem('usuario')) || JSON.parse(localStorage.getItem('usuario')) || {};
      var index = usuarios.findIndex(u =>
        u.nombre_usuario === usuario.nombre_usuario &&
        u.departamento_usuario === usuario.departamento_usuario &&
        u.latitud_usuario === usuario.latitud_usuario &&
        u.longitud_usuario === usuario.longitud_usuario
      );
      if (index !== -1) {
        usuarios.splice(index, 1);
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
      }
      // Redirige
      if (typeof cargarPaginas === "function") {
        cargarPaginas('verPerfiles');
      } else {
        window.location.href = 'verPerfiles.html';
      }
    }
  }
});

