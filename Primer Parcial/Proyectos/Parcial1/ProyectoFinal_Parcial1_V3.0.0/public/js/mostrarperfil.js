function mostrarPerfil() {
    var usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    if (usuarios.length > 0) {
        var user = usuarios[usuarios.length - 1]; // último usuario
        document.getElementById('tbd_nombre').innerHTML = user.nombre_usuario;
        document.getElementById('tbd_edad').innerHTML = user.edad_usuario;
        document.getElementById('tbd_departamento').innerHTML = user.departamento_usuario;
        document.getElementById('tbd_semestre').innerHTML = user.semestre_usuario;
        document.getElementById('tbd_genero').innerHTML = user.genero_usuario;

        if (user.foto_usuario && user.foto_usuario.length > 30) {
            var img = document.getElementById('foto_perfil');
            img.src = user.foto_usuario;
            img.style.display = "block";
        }
    }
}

function eliminarUsuario() {
    localStorage.removeItem('usuario');
    cargarPaginas('verPerfiles');
}