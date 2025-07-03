let n_inicio_dowhile = 0;
let n_final_dowhile = 0;
let numero_tabla_dowhile = 0;
let v_i_dowhile = 1; // Valor inicial del slider
let v_f_dowhile = 10; // Valor final del slider

function cambiarnumeroTablaDoWhile(arg){
    numero_tabla_dowhile = parseInt(arg.value);
    mostrarResultadoDoWhile(v_i_dowhile, v_f_dowhile, numero_tabla_dowhile);
}

function pasarNumeroDoWhile(arg){
    let id_elemento=arg.id;

    if (id_elemento === "txt_numero_inicio_dowhile"){
        n_inicio_dowhile = parseInt(arg.value);
    }else{
        n_final_dowhile = parseInt(arg.value);
    }
}

$(".js-range-slider-dowhile").ionRangeSlider({
    type: "double",
    min: 0,
    max: 100,
    from: 1,
    to: 10,
    grid: true,
    onStart: function(data) {
        v_i_dowhile = data.from;
        v_f_dowhile = data.to;
        mostrarResultadoDoWhile(data.from, data.to, numero_tabla_dowhile);
        },
    onChange: function(data) {
        v_i_dowhile = data.from;
        v_f_dowhile = data.to;
        mostrarResultadoDoWhile(data.from, data.to, numero_tabla_dowhile);
    }
});

function mostrarResultadoDoWhile(v_i_dowhile, v_f_dowhile, numero_tabla_dowhile){
    let ul_rango_dowhile = document.getElementById("ul_rango_dowhile")
    ul_rango_dowhile.innerHTML = "";        
    
    let n_inicio_txt_dowhile = document.getElementById("numero_inicio_txt_dowhile");
    let n_fin_txt_dowhile = document.getElementById("numero_fin_txt_dowhile");
    n_inicio_txt_dowhile.innerHTML = v_i_dowhile;
    n_fin_txt_dowhile.innerHTML = v_f_dowhile;

    let i = v_i_dowhile;
    do {
        let item = document.createElement("li");
        item.innerHTML = i + "x" + numero_tabla_dowhile + " = " + (i * numero_tabla_dowhile);                 
        ul_rango_dowhile.appendChild(item);
        i++;
    } while (i <= v_f_dowhile);
}