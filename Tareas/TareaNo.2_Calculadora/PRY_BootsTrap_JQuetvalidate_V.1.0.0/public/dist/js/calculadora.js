function capturar(arg) {
    var valor = arg.dataset.valor;
    var caja_texto_resultado = document.getElementById("txt_caja_resultado");

    // Si el valor es "=", evalúa la expresión
    if (valor === "=") {
        try {
            caja_texto_resultado.value = eval(caja_texto_resultado.value);
        } catch (error) {
            caja_texto_resultado.value = "Error";
        }
    } else if (valor === "C") {
        // Si el valor es "C", limpia el campo
        caja_texto_resultado.value = "";
    } else {
        // Concatenar el valor al campo de texto
        caja_texto_resultado.value += valor;
    }
}