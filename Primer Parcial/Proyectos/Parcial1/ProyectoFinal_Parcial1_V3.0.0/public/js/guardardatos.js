function guardarPerfilSinFoto() {
    var nombre = document.getElementById('txt_nombre').value;
    var apellido = document.getElementById('txt_apellido').value;
    var cedula = document.getElementById('txt_cedula').value;
    var iduni = document.getElementById('txt_iduni').value;
    var nacimiento = document.getElementById('txt_nacimiento').value;
    var genero = document.getElementById('txt_genero').value;
    var email = document.getElementById('txt_email').value;
    var telefono = document.getElementById('txt_telefono').value;
    var departamento = document.getElementById('txt_departamento').value;
    var semestre = document.getElementById('txt_semestre').value;
    var certificado = document.getElementById('disponible_proyectos').checked;
    var latitud = document.getElementById('latitud').value;
    var longitud = document.getElementById('longitud').value;
    var comentario = document.getElementById('comentarioDia') ? document.getElementById('comentarioDia').value : "";

    // Calcula la edad
    const hoy = new Date();
    const fechaNac = new Date(nacimiento);
    let edad = hoy.getFullYear() - fechaNac.getFullYear();
    const m = hoy.getMonth() - fechaNac.getMonth();
    if (m < 0 || (m === 0 && hoy.getDate() < fechaNac.getDate())) {
        edad--;
    }

    var datos_usuario = {
        nombre_usuario : nombre,
        apellido_usuario : apellido,
        edad_usuario : edad,
        cedula_usuario : cedula,
        iduni_usuario : iduni,
        nacimiento_usuario : nacimiento,
        genero_usuario : genero,
        email_usuario : email,
        telefono_usuario : telefono,
        departamento_usuario : departamento,
        semestre_usuario : semestre,
        certificado_usuario : certificado,
        latitud_usuario : latitud,
        longitud_usuario : longitud,
        foto_usuario: "", // Vacío por ahora
        comentario_dia: comentario,
    };

    // Guardar en array de usuarios
    var usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    usuarios.push(datos_usuario);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    // Guardar el último usuario individualmente
    localStorage.setItem('usuario', JSON.stringify(datos_usuario));

    sessionStorage.setItem('perfilRecienCreado', '1');
    cargarPaginas('verPerfil');
}


function guardarFotoPerfil() {
    var img = document.getElementById('foto_perfil');
    var usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    var usuario = JSON.parse(localStorage.getItem('usuario')) || {};

    // Actualiza la foto en el usuario actual
    usuario.foto_usuario = img.src;

    // Actualiza el usuario en el array de usuarios (último)
    if (usuarios.length > 0) {
        usuarios[usuarios.length - 1] = usuario;
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
    }
    // Actualiza el usuario individual
    localStorage.setItem('usuario', JSON.stringify(usuario));

    alert('Foto guardada exitosamente');
    // Redirige a verPerfiles si quieres
    if (typeof cargarPaginas === "function") {
        cargarPaginas('verPerfiles');
    } else {
        window.location.href = 'verPerfiles.html';
    }
}

function guardarEstadoAnimo() {
    var estado = document.getElementById('estadoAnimo').value;
    var usuario = JSON.parse(localStorage.getItem('usuario')) || {};
    var usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    usuario.estado_animo = estado;

    if (usuarios.length > 0) {
        usuarios[usuarios.length - 1] = usuario;
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
    }
    localStorage.setItem('usuario', JSON.stringify(usuario));
    alert('Estado de ánimo guardado exitosamente');
}

function guardarTodoPerfil() {
    // Guardar foto
    var img = document.getElementById('foto_perfil');
    var usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    var usuario = JSON.parse(localStorage.getItem('usuario')) || {};

    usuario.foto_usuario = img.src;

    // Guardar comentario
    var comentario = document.getElementById('comentarioDia').value;
    usuario.comentario_dia = comentario;

    // Guardar estado de ánimo
    var estado = document.getElementById('estadoAnimo').value;
    usuario.estado_animo = estado;

    // Actualiza el usuario en el array de usuarios (último)
    if (usuarios.length > 0) {
        usuarios[usuarios.length - 1] = usuario;
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
    }
    // Actualiza el usuario individual
    localStorage.setItem('usuario', JSON.stringify(usuario));

    cargarPaginas('verPerfiles');
}

function validarYGuardarTodoPerfil() {
    let errores = [];
    // Validar foto
    var img = document.getElementById('foto_perfil');
    if (!img.src || img.style.display === "none") {
        errores.push("Debes tomar una foto.");
    }
    // Validar comentario
    var comentario = document.getElementById('comentarioDia').value.trim();
    if (!comentario) {
        errores.push("Debes escribir un comentario sobre tu día.");
    }
    // Validar estado de ánimo
    var estado = document.getElementById('estadoAnimo').value;
    if (!estado) {
        errores.push("Debes seleccionar tu estado de ánimo.");
    }

    if (errores.length > 0) {
        mostrarModalPerfil("Faltan datos", errores.join("<br>"));
        return;
    }

    // Si todo está bien, guarda y muestra modal de éxito
    guardarTodoPerfil();
    mostrarModalPerfil("¡Perfil actualizado!", "¡Tus datos del día se guardaron correctamente!");
}

// Modal Bootstrap reutilizable
function mostrarModalPerfil(titulo, mensaje) {
    let modalHtml = `
    <div class="modal fade" id="modalPerfilMsg" tabindex="-1" aria-labelledby="modalPerfilMsgLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header bg-info text-white">
            <h5 class="modal-title" id="modalPerfilMsgLabel">${titulo}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
          </div>
          <div class="modal-body">${mensaje}</div>
          <div class="modal-footer">
            <button type="button" class="btn btn-info w-100" data-bs-dismiss="modal">Aceptar</button>
          </div>
        </div>
      </div>
    </div>`;
    // Elimina modal anterior si existe
    let oldModal = document.getElementById('modalPerfilMsg');
    if (oldModal) oldModal.remove();
    document.body.insertAdjacentHTML('beforeend', modalHtml);
    var modal = new bootstrap.Modal(document.getElementById('modalPerfilMsg'));
    modal.show();
}

