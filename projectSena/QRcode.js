var QRCode = require('qrcode');

//endpoint que muestra la información de la ficha
let fichaId = 1; // Este ID variará según la ficha
let url = `http://tusitio.com/ficha/${fichaId}`;

QRCode.toDataURL(url, function (err, url) {
    console.log(url); // Esta es la URL del QR generado que puedo incrustar en la página web o imprimir.
});
