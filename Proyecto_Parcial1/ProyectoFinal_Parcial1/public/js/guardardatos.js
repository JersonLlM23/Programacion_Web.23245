function guardarPerfil() {
    //1.  Captura los valores de los campos del formulario
    var nombre = document.getElementById('txt_nombre').value;
    var edad = document.getElementById('txt_edad').value;
    var departamento = document.getElementById('txt_departamento').value;
    var latitud = document.getElementById('latitud').value;
    var longitud = document.getElementById('longitud').value;
    var foto = document.getElementById('foto').toDataURL("image/png");

    // 2. Convertir esas variables o atributos en objetos

    var datos_usuario = {
        nombre_usuario : nombre,
        edad_usuario : edad,
        departamento_usuario : departamento,
        latitud_usuario : latitud,
        longitud_usuario : longitud,
        foto_usuario: foto
    };

    localStorage.setItem('usuario', JSON.stringify(datos_usuario));
    alert('Datos del Usuario almacenados exitosamente');
    cargarPaginas('verPerfil');
}