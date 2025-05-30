// Uso de la API: Geolocation
// let, var
//Aqui se define la variable my_geolocation


let my_geolocation = navigator.geolocation;

//Comprobamos si la geolocalización está soportada


 
function inicializarMapa() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(posiciones) {
            let latitud = posiciones.coords.latitude;
            let longitud = posiciones.coords.longitude;
            var map = L.map('map').setView([latitud, longitud], 13);
            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; OpenStreetMap contributors'
            }).addTo(map);
            L.marker([latitud, longitud]).addTo(map)
                .bindPopup('Estás aquí')
                .openPopup();
        })
}else {
    console.log("La geolocalización no está soportada en este navegador.");
}
}
function obtenerUbicacion() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(posiciones) {
            var latitud = posiciones.coords.latitude;
            var longitud = posiciones.coords.longitude;

            document.getElementById("latitud").value = latitud;
            document.getElementById("longitud").value = longitud;

        });
    }
}

function reintentarUbicacion() {
    document.getElementById("latitud").value = "";
    document.getElementById("longitud").value = "";
    localStorage.removeItem('latitud');
    localStorage.removeItem('longitud');

}
