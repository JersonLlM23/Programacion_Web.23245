window.guardarMensajeContacto = function() {
    const nombre = document.getElementById('contactName').value.trim();
    const email = document.getElementById('contactEmail').value.trim();
    const telefono = document.getElementById('contactPhone').value.trim();
    const mensaje = document.getElementById('contactMessage').value.trim();
    const fecha = new Date().toLocaleString('es-EC');

    if (!nombre || !email || !mensaje) {
        alert('Por favor completa los campos obligatorios.');
        return;
    }

    const nuevoMensaje = { nombre, email, telefono, mensaje, fecha };
    const mensajes = JSON.parse(localStorage.getItem('mensajesContacto')) || [];
    mensajes.push(nuevoMensaje);
    localStorage.setItem('mensajesContacto', JSON.stringify(mensajes));

    // Limpia el formulario
    document.getElementById('contactName').value = '';
    document.getElementById('contactEmail').value = '';
    document.getElementById('contactPhone').value = '';
    document.getElementById('contactMessage').value = '';

    // Si tienes modal de éxito, muéstralo aquí
    if (typeof bootstrap !== "undefined" && document.getElementById('contactoEnviadoModal')) {
        var modal = new bootstrap.Modal(document.getElementById('contactoEnviadoModal'));
        modal.show();
    }
}

let indexMensajeAEliminar = null;

ss = function() {
  var mensajes = JSON.parse(localStorage.getItem('mensajesContacto')) || [];
  var tbody = document.querySelector('#tablaMensajes tbody');
  if (!tbody) return;
  tbody.innerHTML = '';
  mensajes.forEach(function(msg, i) {
    var tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${msg.fecha || '-'}</td>
      <td>${msg.nombre || '-'}</td>
      <td>${msg.email || '-'}</td>
      <td>${msg.telefono || '-'}</td>
      <td>${msg.mensaje || '-'}</td>
      <td>
        <button class="btn btn-danger btn-sm" onclick="eliminarMensaje(${i})">Eliminar</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
  asociarEventoEliminarMensaje();
}

window.eliminarMensaje = function(index) {
  indexMensajeAEliminar = index;
  var modal = new bootstrap.Modal(document.getElementById('modalConfirmarEliminarMensaje'));
  modal.show();
}

// Asociar el evento al botón "Sí" del modal cada vez que se cargue la vista
function asociarEventoEliminarMensaje() {
  const btn = document.getElementById('btnConfirmarEliminarMensaje');
  if (btn) {
    btn.onclick = function() {
      if (indexMensajeAEliminar !== null) {
        var mensajes = JSON.parse(localStorage.getItem('mensajesContacto')) || [];
        mensajes.splice(indexMensajeAEliminar, 1);
        localStorage.setItem('mensajesContacto', JSON.stringify(mensajes));
        window.mostrarMensajesContacto();
        indexMensajeAEliminar = null;
        // Cierra el modal
        var modal = bootstrap.Modal.getInstance(document.getElementById('modalConfirmarEliminarMensaje'));
        if (modal) modal.hide();
      }
    }
  }
}

window.mostrarMensajesContacto = function() {
  var mensajes = JSON.parse(localStorage.getItem('mensajesContacto')) || [];
  var tbody = document.querySelector('#tablaMensajes tbody');
  if (!tbody) return;
  tbody.innerHTML = '';
  mensajes.forEach(function(msg, i) {
    var tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${msg.fecha || '-'}</td>
      <td>${msg.nombre || '-'}</td>
      <td>${msg.email || '-'}</td>
      <td>${msg.telefono || '-'}</td>
      <td>${msg.mensaje || '-'}</td>
      <td>
        <button class="btn btn-danger btn-sm" onclick="eliminarMensaje(${i})">Eliminar</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
  asociarEventoEliminarMensaje();
}

// Llama a asociarEventoEliminarMensaje después de mostrar los mensajes
document.addEventListener('DOMContentLoaded', function() {
  asociarEventoEliminarMensaje();
});