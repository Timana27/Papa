const abrirBtn = document.getElementById("abrirBtn");
const inicio = document.getElementById("inicio");
const carta = document.getElementById("carta");

/* REPRODUCTOR */
const audio = document.getElementById("audio");
const playBtn = document.getElementById("playBtn");
const progressBar = document.getElementById("progressBar");
const time = document.getElementById("time");

let playing = false;

// SEGUNDO DONDE EMPIEZA LA MUSICA
const inicioCancion = 30;

/* ------------------------------ */
/* EFECTO CONFETI (BORDER FX) */
/* ------------------------------ */

function crearConfeti(elemento) {
    const colores = ["#d4af37", "#fff", "#ffef99", "#c99a2e"];

    const rect = elemento.getBoundingClientRect();

    for (let i = 0; i < 18; i++) {
        const confeti = document.createElement("div");
        confeti.classList.add("confeti");

        confeti.style.left = rect.width / 2 + "px";
        confeti.style.top = rect.height / 2 + "px";

        const angle = Math.random() * 2 * Math.PI;
        const distance = Math.random() * 90;

        confeti.style.setProperty("--x", Math.cos(angle) * distance + "px");
        confeti.style.setProperty("--y", Math.sin(angle) * distance + "px");

        confeti.style.background =
            colores[Math.floor(Math.random() * colores.length)];

        elemento.style.position = "relative";
        elemento.appendChild(confeti);

        setTimeout(() => {
            confeti.remove();
        }, 800);
    }
}

/* ------------------------------ */
/* ABRIR CARTA + ANIMACIÓN */
/* ------------------------------ */

abrirBtn.addEventListener("click", () => {

    inicio.style.display = "none";
    carta.style.display = "block";

    carta.classList.remove("carta-animada");
    void carta.offsetWidth;
    carta.classList.add("carta-animada");

    audio.currentTime = inicioCancion;
    audio.play();

    playBtn.innerHTML = "❚❚";

    document.querySelector(".music-top").classList.add("playing");

    playing = true;
});

/* ------------------------------ */
/* PLAY / PAUSA */
/* ------------------------------ */

playBtn.addEventListener("click", () => {

    if (!playing) {

        audio.play();
        playBtn.innerHTML = "❚❚";
        document.querySelector(".music-top").classList.add("playing");
        playing = true;

    } else {

        audio.pause();
        playBtn.innerHTML = "▶";
        document.querySelector(".music-top").classList.remove("playing");
        playing = false;
    }
});

/* ------------------------------ */
/* BARRA DE PROGRESO */
/* ------------------------------ */

audio.addEventListener("timeupdate", () => {

    if (audio.duration) {

        const percent =
            ((audio.currentTime - inicioCancion) /
            (audio.duration - inicioCancion)) * 100;

        progressBar.style.width = percent + "%";
    }

    const minutes = Math.floor(audio.currentTime / 60);
    const seconds = Math.floor(audio.currentTime % 60);

    time.textContent =
        `${minutes}:${seconds.toString().padStart(2, '0')}`;
});

/* ------------------------------ */
/* FIN DE CANCIÓN */
/* ------------------------------ */

audio.addEventListener("ended", () => {

    playBtn.innerHTML = "▶";
    document.querySelector(".music-top").classList.remove("playing");
    progressBar.style.width = "0%";
    playing = false;
});

/* ========================= */
/* MAZO DE FOTOS */
/* ========================= */

const deck = document.querySelector(".photo-deck");

let startX = 0;
let moveX = 0;
let activo = false;

deck.addEventListener("mousedown", iniciar);
deck.addEventListener("touchstart", iniciar);

function iniciar(e) {

    activo = true;

    startX = e.type === "touchstart"
        ? e.touches[0].clientX
        : e.clientX;
}

document.addEventListener("mousemove", mover);
document.addEventListener("touchmove", mover);

function mover(e) {

    if (!activo) return;

    moveX = e.type === "touchmove"
        ? e.touches[0].clientX - startX
        : e.clientX - startX;

    const fotoActual = deck.firstElementChild;

    fotoActual.style.transform =
        `translateX(${moveX}px) rotate(${moveX / 20}deg)`;
}

document.addEventListener("mouseup", soltar);
document.addEventListener("touchend", soltar);

function soltar() {

    if (!activo) return;

    activo = false;

    const fotoActual = deck.firstElementChild;

    if (moveX < -50) {

        fotoActual.style.transform =
            "translateX(-500px) rotate(-20deg)";
        fotoActual.style.opacity = "0";

        setTimeout(() => {

            deck.appendChild(fotoActual);

            fotoActual.style.transform = "";
            fotoActual.style.opacity = "1";

            // 🔥 CONFETI SOLO EN BORDE DE FOTO
            crearConfeti(deck);

        }, 400);

    } else {

        fotoActual.style.transform = "";
    }

    moveX = 0;
}
