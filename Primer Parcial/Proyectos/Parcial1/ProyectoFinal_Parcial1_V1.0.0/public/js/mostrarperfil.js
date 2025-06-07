function mostrarPerfil() {
    var usuario = localStorage.getItem('usuario');
    if (usuario) {
        var user = JSON.parse(usuario);
        document.getElementById('tbd_nombre').innerHTML = user.nombre_usuario;
        document.getElementById('tbd_edad').innerHTML = user.edad_usuario;
        document.getElementById('tbd_departamento').innerHTML = user.departamento_usuario;
        document.getElementById('latitud').innerHTML = user.latitud_usuario;
        document.getElementById('longitud').innerHTML = user.longitud_usuario;


        if (user.foto_usuario && user.foto_usuario.length > 30) {
            var img = document.getElementById('foto_perfil');
            img.src = user.foto_usuario;
            img.style.display = "block";
        }
    }
}

function eliminarUsuario() {
    localStorage.removeItem('usuario');
    alert('Usuario eliminado correctamente!');
    cargarPaginas('verPerfil');
}