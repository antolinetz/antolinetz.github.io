class Options {
    constructor(n, i) {
        this.img = new Image()
        this.name = n
        this.img.src = i
    }
}

const pcOption = []
pcOption.push(new Options('papel', 'assets/papel.png'))
pcOption.push(new Options('tijera', 'assets/tijera.png'))
pcOption.push(new Options('piedra', 'assets/piedra.png'))

const r = document.getElementById('resultado')
const m = document.getElementById('marcador')
const pcImg = document.getElementById('pcImg')
const jImg = document.getElementById('jImg')
const mt = document.getElementById('modal-title')
const mtxt = document.getElementById('modal-text')
const mi = document.getElementById('modal-img')
const modal = document.querySelector('.modal');
const closeModal = document.querySelector('.modal__close');

let wins = 0
let defeats = 0
let parities = 0
let times = 0



function aJugar() {
    let pcElige = pcOption[Math.floor(Math.random() * pcOption.length)]
    let jElige = document.querySelector('button[name=ptp]:focus').id
    jImg.innerHTML = '<img src="assets/' + jElige + '.png" />'
    const animar = setInterval(() => pcImg.innerHTML = '<img src="' + pcOption[Math.floor(Math.random() * pcOption.length)].img.src + '" />', 30);
    setTimeout(() => { clearInterval(animar) }, 1000);
    setTimeout(() => { pcImg.innerHTML = '<img src="' + pcElige.img.src + '" />'
        if (jElige == pcElige.name) {
            r.removeAttribute('class');
            r.innerHTML =  'Ambos eligieron ' + pcElige.name + '. Es un empate!'
            parities++
            times++
        }
        else if (jElige == 'papel' && pcElige.name == 'piedra' || jElige == 'tijera' && pcElige.name == 'papel' || jElige == 'piedra' && pcElige.name == 'tijera') {
            r.classList.remove('resultado-defeat');
            r.classList.add('resultado-win')
            r.innerHTML =  'Elegiste ' + jElige + ' y el PC eligió ' + pcElige.name + '. Has ganado!' 
            wins++
            times++
        } else {
            r.classList.remove('resultado-win');
            r.classList.add('resultado-defeat')
            r.innerHTML =  'Elegiste ' + jElige + ' y el PC eligió ' + pcElige.name + '. Has perdido!'
            defeats++
            times++
        }

        m.innerHTML = 'Victorias: ' + wins + '<br/>Derrotas: ' + defeats + '<br/> Empates: ' + parities

        if (wins === 3) {
            modal.classList.add('modal--show')
            mi.innerHTML = '<img src="assets/win.png" class="modal__img">'
            mt.innerHTML= "Ganaste!!!"
            mtxt.innerHTML = 'Exceltent. ganaste ' + wins + ' veces y perdiste ' + defeats + ' veces de un total de ' + times + ' intentos. <br/>La victoria es tuya. Prueba tu suerte de nuevo.'
        } else if (defeats === 3) {
            modal.classList.add('modal--show')
            mi.innerHTML = '<img src="assets/defeat.png" class="modal__img">'
            mt.innerHTML= "Perdiste :("
            mtxt.innerHTML = 'Ganaste solo ' + wins + ' veces y perdiste ' + defeats + ' veces de un total de ' + times + ' intentos. <br/>Es una clara derrota. Prueba tu suerte de nuevo.'
        }
    }, 1100);
}

closeModal.addEventListener('click', (e)=>{
    e.preventDefault()
    modal.classList.remove('modal--show')
    wins = 0
    defeats = 0
    parities = 0
    times = 0
    jImg.innerHTML = '<img src="assets/default.png" class="j-img-default">'
    pcImg.innerHTML = '<img src="assets/default.png">'
    m.innerHTML = 'Victorias: ' + wins + '<br/>Derrotas: ' + defeats + '<br/> Empates: ' + parities
    r.removeAttribute('class');
    r.innerHTML = 'Hola de nuevo, vamos a jugar!'
});