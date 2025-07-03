let n_inicio_for = 0;
let n_final_for = 0;
let numero_tabla_for = 0;
let v_i_for = 1; // Valor inicial del slider
let v_f_for = 10; // Valor final del slider

function cambiarnumeroTablaFor(arg){
    numero_tabla_for = parseInt(arg.value);
    mostrarResultadoFor(v_i_for, v_f_for, numero_tabla_for);
}

function pasarNumeroFor(arg){
    let id_elemento=arg.id;

    if (id_elemento === "txt_numero_inicio_for"){
        n_inicio_for = parseInt(arg.value);
    }else{
        n_final_for = parseInt(arg.value);
    }
}

$(".js-range-slider-for").ionRangeSlider({
    type: "double",
    min: 0,
    max: 100,
    from: 1,
    to: 10,
    grid: true,
    onStart: function(data) {
        v_i_for = data.from;
        v_f_for = data.to;
        mostrarResultadoFor(data.from, data.to, numero_tabla_for);
        },
    onChange: function(data) {
        v_i_for = data.from;
        v_f_for = data.to;
        mostrarResultadoFor(data.from, data.to, numero_tabla_for);
    }
});

function mostrarResultadoFor(v_i_for,v_f_for,numero_tabla_for){
    let ul_rango_for = document.getElementById("ul_rango_for")
    ul_rango_for.innerHTML = "";        
    
    let n_inicio_txt_for = document.getElementById("numero_inicio_txt_for");
    let n_fin_txt_for = document.getElementById("numero_fin_txt_for");
    n_inicio_txt_for.innerHTML = v_i_for;
    n_fin_txt_for.innerHTML = v_f_for;

    for (let i = v_i_for; i <= v_f_for; i++) {
        let item = document.createElement("li");
        item.innerHTML = i + "x" + numero_tabla_for + " = " + (i * numero_tabla_for);                 
        ul_rango_for.appendChild(item);
    }
}