const html = document.querySelector('html')
const botonCorto = document.querySelector('.app__card-button--corto')
const botonEnfoque = document.querySelector('.app__card-button--enfoque')
const botonLargo = document.querySelector('.app__card-button--largo')

const banner = document.querySelector('.app__image')

const titulo = document.querySelector('.app__title')

const botones =document.querySelectorAll('.app__card-button')

const inputEnfoqueMusica = document.getElementById('alternar-musica')
const musica = new Audio('/sounds/luna-rise-part-one.mp3')

const botonInicioPausa = document.querySelector('#start-pause')
let tiempoTranscurridoSegundos = 1500
let idIntervalo = null

const audioPlay = new Audio('./sounds/play.wav');
const audioPausa = new Audio('./sounds/pause.mp3');
const audioTiempoFinalizado = new Audio('./sounds/beep.mp3')

const textoInicioPausa = document.querySelector('#start-pause span')

const btnPausa = new Image();
btnPausa.src = './img/pause.png';

const btnPlay = new Image();
btnPlay.src = './img/play_arrow.png';

const imagen = document.querySelector('#start-pause img');

const tiempoEnPantalla = document.querySelector('#timer')

musica.loop = true

inputEnfoqueMusica.addEventListener('change', () => {
    if(musica.paused){
        musica.play()
    }else{
        musica.pause()
    }
})


botonCorto.addEventListener('click', () => {
    tiempoTranscurridoSegundos = 300
    cambiarContexto('descanso-corto')
    botonCorto.classList.add('active')
});

botonEnfoque.addEventListener('click', () => {
    tiempoTranscurridoSegundos = 1500
    cambiarContexto('enfoque')
    botonEnfoque.classList.add('active')
});

botonLargo.addEventListener('click', () => {
    tiempoTranscurridoSegundos = 900
    cambiarContexto('descanso-largo')
    botonLargo.classList.add('active')
});

function cambiarContexto(contexto) {

    mostrarTiempo()
    botones.forEach(function(contexto){
        contexto.classList.remove('active')
    })

    html.setAttribute('data-contexto', contexto)
    banner.setAttribute('src', `./img/${contexto}.png`)

    switch (contexto) {
        case "enfoque":
            titulo.innerHTML = `Optimiza tu productividad,<br>
                <strong class="app__title-strong">sumérgete en lo que importa.</strong>`
                break;
        case "descanso-corto" :
            titulo.innerHTML = ` ¿Qué tal un respiro? <br>
                <strong class="app__title-strong">¡Haz una pausa corta!</strong>`
            break;
        case "descanso-largo" :
            titulo.innerHTML = `Horade volver a la superficie
                <strong class="app__title-strong">Haz una pausa larga.</strong>`
            break;
        default:
            break;
    }
}  

const cuentaRegresiva = () => {
    if(tiempoTranscurridoSegundos <= 0){
        audioTiempoFinalizado.play()
        alert('tiempo final')
        reiniciar()
        return
    }
    textoInicioPausa.textContent = "pausar"
    tiempoTranscurridoSegundos -= 1
    mostrarTiempo()
}

botonInicioPausa.addEventListener('click', iniciarPausar)

function iniciarPausar(){
    if(idIntervalo){
        audioPausa.play();
        reiniciar()
        return
    }
    audioPlay.play();
    imagen.setAttribute('src', btnPausa.src);
    idIntervalo = setInterval(cuentaRegresiva,1000)
}

function reiniciar(){
    imagen.setAttribute('src', btnPlay.src);
    clearInterval(idIntervalo)
    idIntervalo = null
    textoInicioPausa.textContent = "comenzar"
}

function mostrarTiempo() {
    const minutos = Math.floor(tiempoTranscurridoSegundos / 60);
    const segundos = tiempoTranscurridoSegundos % 60;

    // Asegúrate de que los minutos y segundos estén siempre en dos dígitos
    const tiempoFormateado = `${String(minutos).padStart(2, '0')}:${String(segundos).padStart(2, '0')}`;
    tiempoEnPantalla.innerHTML = tiempoFormateado;
}


mostrarTiempo();