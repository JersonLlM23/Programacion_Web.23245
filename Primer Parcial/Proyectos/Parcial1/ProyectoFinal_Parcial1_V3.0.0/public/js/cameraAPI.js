let strem = null;

function inicializarCamara() {
    navigator.mediaDevices.getUserMedia({ video: true }).then(
        s => {
            strem = s;
            document.getElementById('video').srcObject = strem;
        }
    ).catch(
        e => { console.error(e); }
    );
}

function detenerCamara() {
    if (strem) {
        strem.getTracks().forEach(track => track.stop());
        strem = null;
    }
    document.getElementById('video').style.display = "none";
}

function tomarFoto() {
    let video_res = document.getElementById("video");
    let foto_res = document.getElementById("foto");
    let ctx = foto_res.getContext("2d");
    ctx.drawImage(video_res, 0, 0, foto_res.width, foto_res.height);

    let img = document.getElementById("foto_perfil");
    img.src = foto_res.toDataURL("image/png");
    img.style.display = "block";
    foto_res.style.display = "none"; // OCULTA el canvas
    video_res.style.display = "none";
    detenerCamara();
}

function reintentarFoto() {
    let foto_res = document.getElementById("foto");
    let img = document.getElementById("foto_perfil");
    let ctx = foto_res.getContext("2d");
    ctx.clearRect(0, 0, foto_res.width, foto_res.height);
    img.style.display = "none";
    foto_res.style.display = "none";
    document.getElementById('video').style.display = "block";
    inicializarCamara();
}

function iniciarCamara() {
    document.getElementById('foto_perfil').style.display = "none";
    document.getElementById('video').style.display = "block";
    document.getElementById('foto').style.display = "none";
    inicializarCamara();
}