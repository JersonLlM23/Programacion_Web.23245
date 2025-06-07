function soloLetras(valor) {
    return /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(valor.trim());
}

function cedulaEcuatoriana(cedula) {
    if (!/^\d{10}$/.test(cedula)) return false;
    let digitos = cedula.split('').map(Number);
    let provincia = parseInt(cedula.substring(0, 2));
    if (provincia < 1 || provincia > 24) return false;
    let suma = 0;
    for (let i = 0; i < 9; i++) {
        let mult = (i % 2 === 0) ? 2 : 1;
        let res = digitos[i] * mult;
        if (res > 9) res -= 9;
        suma += res;
    }
    let verificador = (10 - (suma % 10)) % 10;
    return verificador === digitos[9];
}

function validarEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validarTelefono(telefono) {
    return /^\d{10}$/.test(telefono);
}

function mostrarModalErrores(errores) {
    let lista = '<ul>';
    errores.forEach(e => lista += `<li>${e}</li>`);
    lista += '</ul>';
    document.getElementById('listaErroresPerfil').innerHTML = lista;
    var modal = new bootstrap.Modal(document.getElementById('modalErroresPerfil'));
    modal.show();
}

function validarFormularioCrearPerfil() {
    let nombre = document.getElementById('txt_nombre').value.trim();
    let apellido = document.getElementById('txt_apellido').value.trim();
    let cedula = document.getElementById('txt_cedula').value.trim();
    let telefono = document.getElementById('txt_telefono').value.trim();
    let email = document.getElementById('txt_email').value.trim();
    let iduni = document.getElementById('txt_iduni').value.trim();
    let nacimiento = document.getElementById('txt_nacimiento').value.trim();
    let genero = document.getElementById('txt_genero').value;
    let certificado = document.getElementById('disponible_proyectos').checked;
    let latitud = document.getElementById('latitud').value.trim();
    let longitud = document.getElementById('longitud').value.trim();
    let departamento = document.getElementById('txt_departamento').value;
    let semestre = document.getElementById('txt_semestre').value;

    if (!soloLetras(nombre)) {
        mostrarModalErrores(['El nombre solo debe contener letras y espacios.']);
        return false;
    }
    if (!soloLetras(apellido)) {
        mostrarModalErrores(['El apellido solo debe contener letras y espacios.']);
        return false;
    }
    if (!cedulaEcuatoriana(cedula)) {
        mostrarModalErrores(['La cédula ingresada no es válida.']);
        return false;
    }
    if (!validarTelefono(telefono)) {
        mostrarModalErrores(['El teléfono debe tener 10 dígitos numéricos.']);
        return false;
    }
    if (!email || !validarEmail(email)) {
        mostrarModalErrores(['El correo electrónico no es válido.']);
        return false;
    }
    if (!iduni) {
        mostrarModalErrores(['El ID de universidad es obligatorio.']);
        return false;
    }
    if (!nacimiento) {
        mostrarModalErrores(['La fecha de nacimiento es obligatoria.']);
        return false;
    }
    // Validar edad
    const hoy = new Date();
    const fechaNac = new Date(nacimiento);
    let edad = hoy.getFullYear() - fechaNac.getFullYear();
    const m = hoy.getMonth() - fechaNac.getMonth();
    if (m < 0 || (m === 0 && hoy.getDate() < fechaNac.getDate())) {
        edad--;
    }
    if (edad < 18 || edad > 74) {
        mostrarModalErrores(['La edad debe ser mayor a 17 y menor a 75 años.']);
        return false;
    }
    if (!genero) {
        mostrarModalErrores(['Por favor, selecciona tu género.']);
        return false;
    }
    if (!certificado) {
        mostrarModalErrores(['Por favor, acepta nuestros términos y condiciones.']);
        return false;
    }
    if (!latitud || !longitud) {
        mostrarModalErrores(['Por favor, obtén tu ubicación antes de guardar el perfil.']);
        return false;
    }
    if (!departamento) {
        mostrarModalErrores(['Por favor, selecciona tu departamento.']);
        return false;
    }
    if (!semestre) {
        mostrarModalErrores(['Por favor, selecciona tu semestre o nivel.']);
        return false;
    }
    // Si todo está bien
    guardarPerfilSinFoto();
    return true;
}

document.addEventListener('DOMContentLoaded', function() {
    var form = document.getElementById('formPerfil');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            if (validarFormularioCrearPerfil()) {
                guardarPerfilSinFoto();
            }
        });
    }
});