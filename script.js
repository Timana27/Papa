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
// Cambia este número si quieres saltar más o menos inicio
const inicioCancion = 30;



/* ABRIR CARTA + INICIAR MUSICA */

abrirBtn.addEventListener("click", () => {


    inicio.style.display = "none";

    carta.style.display = "block";


    // Saltar el inicio de la canción

    audio.currentTime = inicioCancion;


    // Reproducir música

    audio.play();


    playBtn.innerHTML = "❚❚";


    document
    .querySelector(".music-top")
    .classList.add("playing");


    playing = true;


});



/* BOTON PLAY / PAUSA */


playBtn.addEventListener("click", () => {



    if(!playing){


        audio.play();


        playBtn.innerHTML = "❚❚";


        document
        .querySelector(".music-top")
        .classList.add("playing");


        playing = true;



    }else{


        audio.pause();


        playBtn.innerHTML = "▶";


        document
        .querySelector(".music-top")
        .classList.remove("playing");


        playing = false;


    }


});




/* BARRA DE PROGRESO Y TIEMPO */


audio.addEventListener("timeupdate", () => {



    if(audio.duration){


        const percent =
        ((audio.currentTime - inicioCancion) /
        (audio.duration - inicioCancion)) * 100;


        progressBar.style.width =
        percent + "%";


    }



    const minutes =
    Math.floor(audio.currentTime / 60);



    const seconds =
    Math.floor(audio.currentTime % 60);



    time.textContent =
    `${minutes}:${seconds.toString().padStart(2,'0')}`;



});





/* CUANDO TERMINE LA CANCION */


audio.addEventListener("ended", () => {



    playBtn.innerHTML = "▶";



    document
    .querySelector(".music-top")
    .classList.remove("playing");



    progressBar.style.width = "0%";



    playing = false;



});

/* ========================= */
/* MAZO TIPO CARTAS */
/* ========================= */

const deck = document.querySelector(".photo-deck");

let startX = 0;
let moveX = 0;
let activo = false;



deck.addEventListener("mousedown", iniciar);
deck.addEventListener("touchstart", iniciar);



function iniciar(e){

    activo = true;

    startX = e.type === "touchstart"
    ? e.touches[0].clientX
    : e.clientX;

}



document.addEventListener("mousemove", mover);
document.addEventListener("touchmove", mover);



function mover(e){

    if(!activo) return;


    moveX = e.type === "touchmove"
    ? e.touches[0].clientX - startX
    : e.clientX - startX;



    const fotoActual = deck.firstElementChild;


    fotoActual.style.transform =
    `translateX(${moveX}px) rotate(${moveX/20}deg)`;

}




document.addEventListener("mouseup", soltar);
document.addEventListener("touchend", soltar);



function soltar(){


    if(!activo) return;


    activo=false;


    const fotoActual = deck.firstElementChild;



    if(moveX < -50){


        // sale la foto de adelante

        fotoActual.style.transform =
        "translateX(-500px) rotate(-20deg)";

        fotoActual.style.opacity="0";



        setTimeout(()=>{


            // manda la foto al final

            deck.appendChild(fotoActual);



            // vuelve a aparecer atrás

            fotoActual.style.transform="";

            fotoActual.style.opacity="1";



        },400);



    }else{


        // vuelve a su lugar

        fotoActual.style.transform="";


    }



    moveX=0;

}
