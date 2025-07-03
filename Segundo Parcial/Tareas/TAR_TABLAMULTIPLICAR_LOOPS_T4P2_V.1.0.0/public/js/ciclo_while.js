let n_inicio_while = 0;
let n_final_while = 0;
let numero_tabla_while = 0;
let v_i_while = 1; // Valor inicial del slider
let v_f_while = 10; // Valor final del slider

function cambiarnumeroTablaWhile(arg){
    numero_tabla_while = parseInt(arg.value);
    mostrarResultadoWhile(v_i_while, v_f_while, numero_tabla_while);
}

function pasarNumeroWhile(arg){
    let id_elemento=arg.id;

    if (id_elemento === "txt_numero_inicio_while"){
        n_inicio_while = parseInt(arg.value);
    }else{
        n_final_while = parseInt(arg.value);
    }
}

$(".js-range-slider-while").ionRangeSlider({
    type: "double",
    min: 0,
    max: 100,
    from: 1,
    to: 10,
    grid: true,
    onStart: function(data) {
        v_i_while = data.from;
        v_f_while = data.to;
        mostrarResultadoWhile(data.from, data.to, numero_tabla_while);
        },
    onChange: function(data) {
        v_i_while = data.from;
        v_f_while = data.to;
        mostrarResultadoWhile(data.from, data.to, numero_tabla_while);
    }
});

function mostrarResultadoWhile(v_i_while, v_f_while, numero_tabla_while){
    let ul_rango_while = document.getElementById("ul_rango_while")
    ul_rango_while.innerHTML = "";        
    
    let n_inicio_txt_while = document.getElementById("numero_inicio_txt_while");
    let n_fin_txt_while = document.getElementById("numero_fin_txt_while");
    n_inicio_txt_while.innerHTML = v_i_while;
    n_fin_txt_while.innerHTML = v_f_while;

    let i = v_i_while;
    while (i <= v_f_while) {
        let item = document.createElement("li");
        item.innerHTML = i + "x" + numero_tabla_while + " = " + (i * numero_tabla_while);                 
        ul_rango_while.appendChild(item);
        i++;
    }
}