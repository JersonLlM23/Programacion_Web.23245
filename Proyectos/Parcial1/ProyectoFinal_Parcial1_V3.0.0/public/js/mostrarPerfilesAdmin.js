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
      <td>
        <button class="btn btn-danger btn-sm" onclick="eliminarPerfilAdmin(${i})">Eliminar</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
  asociarEventoEliminarPerfilAdmin();
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

let indexPerfilAEliminar = null;

window.eliminarPerfilAdmin = function(index) {
  indexPerfilAEliminar = index;
  var modal = new bootstrap.Modal(document.getElementById('modalConfirmarEliminarPerfilAdmin'));
  modal.show();
}

function asociarEventoEliminarPerfilAdmin() {
  const btn = document.getElementById('btnConfirmarEliminarPerfilAdmin');
  if (btn) {
    btn.onclick = function() {
      if (indexPerfilAEliminar !== null) {
        var usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        usuarios.splice(indexPerfilAEliminar, 1);
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
        window.mostrarPerfilesAdmin();
        indexPerfilAEliminar = null;
        // Cierra el modal
        var modal = bootstrap.Modal.getInstance(document.getElementById('modalConfirmarEliminarPerfilAdmin'));
        if (modal) modal.hide();
      }
    }
  }
}

// Llama a asociarEventoEliminarPerfilAdmin después de mostrar la tabla
const oldMostrarPerfilesAdmin = window.mostrarPerfilesAdmin;
window.mostrarPerfilesAdmin = function() {
  oldMostrarPerfilesAdmin();
  asociarEventoEliminarPerfilAdmin();
}

// Ejecutar al cargar la vista (SPA)
if (typeof window.mostrarPerfilesAdmin === "function") {
  window.mostrarPerfilesAdmin();
}
