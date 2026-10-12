const noBtn = document.getElementById("noBtn");
const fechaInput = document.getElementById("fecha");
const horaInput = document.getElementById("hora");

/* ==========================
   PERSONALIZACIÓN POR URL
   ========================== */

const params =
    new URLSearchParams(window.location.search);

const nombre =
    params.get("para");

const nombrePersona =
    document.getElementById("nombrePersona");

const tituloPantalla2 =
    document.getElementById("tituloPantalla2");

if (nombre) {

    if (nombrePersona) {
        nombrePersona.textContent = nombre;
    }

    if (tituloPantalla2) {
        tituloPantalla2.textContent =
            `¿De verdad acabas de decir que sí, ${nombre}?`;
    }

} else {

    if (nombrePersona) {
        nombrePersona.style.display = "none";
    }

    if (tituloPantalla2) {
        tituloPantalla2.textContent =
            "¿De verdad acabas de decir que sí?";
    }

}

/* ==========================
   FECHA MÍNIMA
   ========================== */

const hoy = new Date().toISOString().split("T")[0];
fechaInput.min = hoy;

/* ==========================
   HORA POR DEFECTO
   ========================== */

horaInput.value = "00:00";

/* ==========================
   MENSAJES BOTÓN NO
   ========================== */

const mensajes = [
    "¿Segura? 😏",
    "Piénsalo otra vez 😆",
    "No tan rápido 🏃",
    "Inténtalo de nuevo 😂",
    "Solo hay una respuesta ❤️"
];

let indiceMensaje = 0;

function moverBoton() {

    const card = document.querySelector(".card");

    const ancho = card.offsetWidth - 180;
    const alto = card.offsetHeight - 120;

    const x = Math.random() * ancho;
    const y = Math.random() * alto;

    noBtn.style.left = x + "px";
    noBtn.style.top = y + "px";

    noBtn.textContent =
        mensajes[indiceMensaje];

    indiceMensaje++;

    if (indiceMensaje >= mensajes.length) {
        indiceMensaje = 0;
    }
}

/* ==========================
   EVENTOS BOTÓN NO
   ========================== */

noBtn.addEventListener("mouseover", moverBoton);

noBtn.addEventListener("click", function (e) {

    e.preventDefault();
    moverBoton();

});

noBtn.addEventListener("touchstart", function (e) {

    e.preventDefault();
    moverBoton();

}, { passive: false });

noBtn.addEventListener("touchmove", function (e) {

    e.preventDefault();
    moverBoton();

}, { passive: false });

noBtn.addEventListener("touchend", function (e) {

    e.preventDefault();
    moverBoton();

}, { passive: false });

/* ==========================
   FECHA BONITA
   ========================== */

function formatearFecha(fechaTexto) {

    const fecha =
        new Date(fechaTexto + "T00:00:00");

    const dia =
        String(fecha.getDate()).padStart(2, "0");

    const meses = [
        "Enero",
        "Febrero",
        "Marzo",
        "Abril",
        "Mayo",
        "Junio",
        "Julio",
        "Agosto",
        "Septiembre",
        "Octubre",
        "Noviembre",
        "Diciembre"
    ];

    return `${dia} de ${meses[fecha.getMonth()]} de ${fecha.getFullYear()}`;
}

/* ==========================
   HORA BONITA
   ========================== */

function formatearHora(hora24) {

    const partes = hora24.split(":");

    let horas = parseInt(partes[0]);
    const minutos = partes[1];

    const periodo =
        horas >= 12 ? "PM" : "AM";

    horas = horas % 12;

    if (horas === 0) {
        horas = 12;
    }

    return `${horas}:${minutos} ${periodo}`;
}

/* ==========================
   PANTALLA 1 -> 2
   ========================== */

document.getElementById("yesBtn")
.addEventListener("click", function () {

    document.getElementById("pantalla1")
    .classList.add("oculto");

    document.getElementById("pantalla2")
    .classList.remove("oculto");

});

/* ==========================
   PANTALLA 2 -> 3
   ========================== */

document.getElementById("continuarBtn")
.addEventListener("click", function () {

    document.getElementById("pantalla2")
    .classList.add("oculto");

    document.getElementById("pantalla3")
    .classList.remove("oculto");

});

/* ==========================
   CONFIRMAR CITA
   ========================== */

document.getElementById("confirmarBtn")
.addEventListener("click", function () {

    const fecha =
        document.getElementById("fecha").value;

    const hora =
        document.getElementById("hora").value;

    if (!fecha || !hora) {

        alert(
            "Selecciona fecha y hora ❤️"
        );

        return;
    }

    document.getElementById("pantalla3")
    .classList.add("oculto");

    document.getElementById("pantallaFinal")
    .classList.remove("oculto");

    document.getElementById("tituloConfirmacion")
    .innerHTML =
    "¡La cita está confirmada!";

    if (nombre) {

        document.getElementById("mensajeConfirmacion")
        .innerHTML =
        `Gracias por decir que sí, ${nombre} ❤️`;

    } else {

        document.getElementById("mensajeConfirmacion")
        .innerHTML =
        "Gracias por decir que sí ❤️";

    }

    document.getElementById("resumen")
    .innerHTML =
    `
        📅 ${formatearFecha(fecha)}
        <br><br>
        ⏰ ${formatearHora(hora)}
    `;

    iniciarContador(fecha, hora);

});

/* ==========================
   CUENTA REGRESIVA
   ========================== */

function iniciarContador(fecha, hora) {

    const destino =
        new Date(fecha + "T" + hora);

    const intervalo =
        setInterval(function () {

            const ahora =
                new Date();

            const diferencia =
                destino - ahora;

            if (diferencia <= 0) {

                document.getElementById("contador")
                .innerHTML =
                "🎉 ¡Llegó el día de la cita! ❤️";

                clearInterval(intervalo);

                return;
            }

            const dias =
                Math.floor(diferencia / 86400000);

            const horas =
                Math.floor(
                    (diferencia % 86400000) / 3600000
                );

            const minutos =
                Math.floor(
                    (diferencia % 3600000) / 60000
                );

            const segundos =
                Math.floor(
                    (diferencia % 60000) / 1000
                );

            document.getElementById("contador")
            .innerHTML =
            `
                ${dias} días<br>
                ${horas} horas<br>
                ${minutos} minutos<br>
                ${segundos} segundos
            `;

        }, 1000);

}

/* ==========================
   REINICIAR EXPERIENCIA
   ========================== */

document.getElementById("reiniciarBtn")
.addEventListener("click", function () {

    location.reload();

});
