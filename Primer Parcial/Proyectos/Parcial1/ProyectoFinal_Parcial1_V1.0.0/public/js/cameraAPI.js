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
}

function tomarFoto() {
    let video_res = document.getElementById("video");
    let foto_res = document.getElementById("foto");
    let ctx = foto_res.getContext("2d");
    ctx.drawImage(video_res, 0, 0, foto_res.width, foto_res.height);
}

function reintentarFoto() {
    let foto_res = document.getElementById("foto");
    let ctx = foto_res.getContext("2d");
    ctx.clearRect(0, 0, foto_res.width, foto_res.height);
    localStorage.removeItem('foto');
}