function mostrarUsuarios() {
  var usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
  var tbody = document.getElementById('tablaUsuarios');
  tbody.innerHTML = '';
  usuarios.forEach(function(user, i) {
    // Estado de ánimo
    var estadoHtml = user.estado_animo
      ? `<span class="badge bg-secondary fs-6">${user.estado_animo}</span>`
      : '<span class="text-muted">Sin estado</span>';
    // Edad
    var edad = user.edad_usuario ? user.edad_usuario : '';
    // Género
    var genero = user.genero_usuario ? user.genero_usuario : '';
    // Nombre
    var nombre = user.nombre_usuario ? user.nombre_usuario : '';

    var tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${estadoHtml}</td>
      <td>${nombre}</td>
      <td>${edad}</td>
      <td>${genero}</td>
      <td>
        <button class="btn btn-info btn-sm" onclick="verDiaModal(${i})">Ver día</button>
      </td>
      <td>
        <button class="btn btn-sm btn-primary" onclick="window.open('https://www.google.com/maps?q=${user.latitud_usuario},${user.longitud_usuario}', '_blank')">
          Ver en el mapa
        </button>
      </td>
      <td>
        <button class="btn btn-sm btn-danger" onclick="eliminarUsuario(${i})">
          Eliminar
        </button>
      </td>
    `;
    tbody.appendChild(tr);
  });
  asociarEventoEliminar(); // ¡Asegúrate de llamar esto aquí!
}

let indexAEliminar = null;

// Esta función se llama desde el botón Eliminar de la tabla
window.eliminarUsuario = function(index) {
  indexAEliminar = index;
  var modal = new bootstrap.Modal(document.getElementById('modalConfirmarEliminar'));
  modal.show();
}

// Esta función asocia el evento al botón "Sí" del modal
function asociarEventoEliminar() {
  const btn = document.getElementById('btnConfirmarEliminar');
  if (btn) {
    btn.onclick = function() {
      if (indexAEliminar !== null) {
        var usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        usuarios.splice(indexAEliminar, 1);
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
        mostrarUsuarios();
        indexAEliminar = null;
        // Cierra el modal
        var modal = bootstrap.Modal.getInstance(document.getElementById('modalConfirmarEliminar'));
        if (modal) modal.hide();
      }
    }
  }
}

window.verDiaModal = function(index) {
  var usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
  var user = usuarios[index];

  // Foto
  var fotoHtml = user.foto_usuario
    ? `<img src="${user.foto_usuario}" alt="Foto del día" class="img-fluid rounded mb-3" style="max-height:300px;">`
    : '<div class="text-muted mb-2">Sin foto</div>';

  // Estado de ánimo (opcional)
  var estadoHtml = user.estado_animo
    ? `<div class="mb-2"><span class="badge bg-secondary fs-5">${user.estado_animo}</span></div>`
    : '';

  // Comentario
  var comentarioHtml = user.comentario_dia
    ? `<p class="mb-0">${user.comentario_dia}</p>`
    : '<div class="text-muted">Sin comentario</div>';

  document.getElementById('modalVerDiaBody').innerHTML = `
    ${fotoHtml}
    ${estadoHtml}
    ${comentarioHtml}
  `;

  var modal = new bootstrap.Modal(document.getElementById('modalVerDia'));
  modal.show();
}

window.mostrarPerfilesAdmin = function() {
  var usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
  var tbody = document.querySelector('#tablaPerfilesAdmin tbody');
  if (!tbody) return;
  tbody.innerHTML = '';
  usuarios.forEach(function(user, i) {
    var tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${user.nombre_usuario || '-'}</td>
      <td>${user.edad_usuario || '-'}</td>
      <td>${user.departamento_usuario || '-'}</td>
      <td>${user.genero_usuario || '-'}</td>
      <td>
        <button class="btn btn-info btn-sm" onclick="verDatosPerfilAdmin(${i})">Ver datos</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

window.verDatosPerfilAdmin = function(index) {
  var usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
  var user = usuarios[index];
  if (!user) return;
  var html = `
    <ul class="list-group">
      <li class="list-group-item"><strong>Nombre:</strong> ${user.nombre_usuario || '-'}</li>
      <li class="list-group-item"><strong>Apellido:</strong> ${user.apellido_usuario || '-'}</li>
      <li class="list-group-item"><strong>Cédula:</strong> ${user.cedula_usuario || '-'}</li>
      <li class="list-group-item"><strong>ID UNI:</strong> ${user.iduni_usuario || '-'}</li>
      <li class="list-group-item"><strong>Fecha Nacimiento:</strong> ${user.nacimiento_usuario || '-'}</li>
      <li class="list-group-item"><strong>Género:</strong> ${user.genero_usuario || '-'}</li>
      <li class="list-group-item"><strong>Email:</strong> ${user.email_usuario || '-'}</li>
      <li class="list-group-item"><strong>Teléfono:</strong> ${user.telefono_usuario || '-'}</li>
      <li class="list-group-item"><strong>Departamento:</strong> ${user.departamento_usuario || '-'}</li>
      <li class="list-group-item"><strong>Semestre:</strong> ${user.semestre_usuario || '-'}</li>
      <li class="list-group-item"><strong>Certificado:</strong> ${user.certificado_usuario ? 'Sí' : 'No'}</li>
      <li class="list-group-item"><strong>Latitud:</strong> ${user.latitud_usuario || '-'}</li>
      <li class="list-group-item"><strong>Longitud:</strong> ${user.longitud_usuario || '-'}</li>
    </ul>
  `;
  document.getElementById('modalVerDatosPerfilBody').innerHTML = html;
  var modal = new bootstrap.Modal(document.getElementById('modalVerDatosPerfil'));
  modal.show();
}