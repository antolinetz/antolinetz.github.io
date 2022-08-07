const btnPlayer = document.getElementById('m-jugador')
const cardContaioner = document.getElementById('contenedor-tarjetas')
const btnRestart = document.getElementById('reiniciar')
const sSelAtaque = document.getElementById('seleccionar-ataque')
const sRestart = document.getElementById('reiniciar')
const spMascotaPlayer = document.getElementById('mascota-jugador')
const spMascotaEnemigo = document.getElementById('mascota-enemigo')
const sSelMascota = document.getElementById('seleccionar-mascota')
const contenedorAtaques = document.getElementById('contenedor-ataques')
const sMensajes = document.getElementById('resultado')
const atPlayer = document.getElementById('ataque-jugador') 
const atEnemigo = document.getElementById('ataque-enemigo')
const spVPlayer = document.getElementById('vidas-jugador')
const spVEnemy = document.getElementById('vidas-enemigo')


let mEnemy
let mPlayer
let btnFuego
let btnAgua
let btnTierra
let btnsAttk = []
let attackPlayer = []
let attacksMokepon
let attackEnemigo = []
let enemyWins = 0
let playerWins = 0
let mokepons = []
let mokeponCard
let indexAttkPlayer
let indexAttkEnemigo
let gameMode
let resultado
let ia = 0


class Mokepon {
    constructor(n,i,l) {
        this.name = n
        this.image = i
        this.life = l
        this.attacks = []
    }
}

let hipodoge = new Mokepon('hipodoge', './assets/mokepons_mokepon_hipodoge_attack.png', 5)
let capipepo = new Mokepon('capipepo', './assets/mokepons_mokepon_capipepo_attack.png', 5)
let ratigueya = new Mokepon('ratigueya', './assets/mokepons_mokepon_ratigueya_attack.png', 5)
let langostelvis = new Mokepon('langostelvis', './assets/mokepons_mokepon_langostelvis_attack.png', 5)
let pydos = new Mokepon('pydos', './assets/mokepons_mokepon_pydos_attack.png', 5)
let tucapalma = new Mokepon('tucapalma', './assets/mokepons_mokepon_tucapalma_attack.png', 5)

mokepons.push(hipodoge,capipepo,ratigueya,tucapalma,pydos,langostelvis)

hipodoge.attacks.push(
    {name: 'agua', icon: '🌊', id: 'btn-agua'},
    {name: 'agua', icon: '🌊', id: 'btn-agua'},
    {name: 'agua', icon: '🌊', id: 'btn-agua'},
    {name: 'tierra', icon: '🌱', id: 'btn-tierra'},
    {name: 'tierra', icon: '🌱', id: 'btn-tierra'},
    {name: 'fuego', icon: '🔥', id: 'btn-fuego'}
)

capipepo.attacks.push(
    {name: 'tierra', icon: '🌱', id: 'btn-tierra'},
    {name: 'tierra', icon: '🌱', id: 'btn-tierra'},
    {name: 'tierra', icon: '🌱', id: 'btn-tierra'},
    {name: 'fuego', icon: '🔥', id: 'btn-fuego'},
    {name: 'fuego', icon: '🔥', id: 'btn-fuego'},
    {name: 'agua', icon: '🌊', id: 'btn-agua'}
)

ratigueya.attacks.push(
    {name: 'fuego', icon: '🔥', id: 'btn-fuego'},
    {name: 'fuego', icon: '🔥', id: 'btn-fuego'},
    {name: 'fuego', icon: '🔥', id: 'btn-fuego'},
    {name: 'tierra', icon: '🌱', id: 'btn-tierra'},
    {name: 'tierra', icon: '🌱', id: 'btn-tierra'},
    {name: 'agua', icon: '🌊', id: 'btn-agua'}
)

langostelvis.attacks.push(
    {name: 'fuego', icon: '🔥', id: 'btn-fuego'},
    {name: 'fuego', icon: '🔥', id: 'btn-fuego'},
    {name: 'fuego', icon: '🔥', id: 'btn-fuego'},
    {name: 'agua', icon: '🌊', id: 'btn-agua'},
    {name: 'agua', icon: '🌊', id: 'btn-agua'},
    {name: 'tierra', icon: '🌱', id: 'btn-tierra'},
)

pydos.attacks.push(
    {name: 'agua', icon: '🌊', id: 'btn-agua'},
    {name: 'agua', icon: '🌊', id: 'btn-agua'},
    {name: 'agua', icon: '🌊', id: 'btn-agua'},
    {name: 'fuego', icon: '🔥', id: 'btn-fuego'},
    {name: 'fuego', icon: '🔥', id: 'btn-fuego'},
    {name: 'tierra', icon: '🌱', id: 'btn-tierra'}
)
tucapalma.attacks.push(
    {name: 'tierra', icon: '🌱', id: 'btn-tierra'},
    {name: 'tierra', icon: '🌱', id: 'btn-tierra'},
    {name: 'tierra', icon: '🌱', id: 'btn-tierra'},
    {name: 'agua', icon: '🌊', id: 'btn-agua'},
    {name: 'agua', icon: '🌊', id: 'btn-agua'},
    {name: 'fuego', icon: '🔥', id: 'btn-fuego'}
)



function startGame() {
    sSelAtaque.style.display = 'none'
    sRestart.style.display = 'none'

    mokepons.forEach((mokepon) => {
        mokeponCard = `
        <input type="radio" name="mascota" id=${mokepon.name} />
        <label for=${mokepon.name} class="tarjeta-mokepon">
            <p>${mokepon.name}</p>
            <img src=${mokepon.image} alt=${mokepon.name}>
        </label>
        `
        cardContaioner.innerHTML += mokeponCard
    })

    btnPlayer.addEventListener('click', selectMokepons)
    btnRestart.addEventListener('click', restartGame)
}

function aleatorio(v) {
    return v[Math.floor(Math.random() * v.length)]
}

function selectMokepons() {
    mPlayer = eval(document.querySelector('input[name="mascota"]:checked').id)
    mEnemy = aleatorio(mokepons)

    if (mPlayer != null) {
        spMascotaPlayer.innerHTML = `<span class="icon-m-jugador"><img src=${mPlayer.image}></span><span class="name-m-jugador">${mPlayer.name}</span>`
        spMascotaEnemigo.innerHTML = `<span class="name-m-enemigo">${mEnemy.name}</span><span class="icon-m-enemigo"><img src=${mEnemy.image}></span>`
        sSelAtaque.style.display = 'flex'
        sSelMascota.style.display = 'none'
    } else {
       alert('Selecciona una mascota plz')
    }
    extraerAtaques(mPlayer)
    sequenciaAtaque()
}

function extraerAtaques(mokepon) {
    let attacks
    for (let i = 0; i < mokepons.length; i++) {
        attacks = mokepon.attacks
    }
    mostrarAtaques(attacks)
}

function mostrarAtaques (attacks) {
    attacks.forEach((attack) => {
        attacksMokepon = `<button id=${attack.id} name="btn-ataque" class="btn-ataque btnAttk">${attack.icon}</button>`
        contenedorAtaques.innerHTML += attacksMokepon
    })
    btnFuego = document.getElementById('btn-fuego')
    btnAgua = document.getElementById('btn-agua')
    btnTierra = document.getElementById('btn-tierra')
    btnsAttk = document.querySelectorAll('.btnAttk')
}

function sequenciaAtaque() {
    btnsAttk.forEach((btnAttk) => {
        btnAttk.addEventListener('click', (e) => {
            if (e.target.textContent === '🔥') {
                attackPlayer.push('fuego')
                btnAttk.disabled = true
                btnAttk.style.background = '#343d62'
                btnAttk.style.border = 'none'
            } else if (e.target.textContent === '🌊') {
                attackPlayer.push('agua')
                btnAttk.disabled = true
                btnAttk.style.background = '#343d62'
                btnAttk.style.border = 'none'
            } else {
                attackPlayer.push('tierra')
                btnAttk.disabled = true
                btnAttk.style.background = '#343d62'
                btnAttk.style.border = 'none'
            }
            iniciarCombate()
        })
    })
}

function iniciarCombate() {
    gameMode = document.querySelector('input[name="mode"]:checked').id
    console.log(gameMode);
    attacksEnemy()
    if (gameMode === 'sequence') {
        if (attackPlayer.length === mPlayer.attacks.length) {
            combate()
        }
    } else if (gameMode = 'oneByOne') {
        combateOneByOne()
    }
}
function attacksEnemy() {
    for (let i = 0; i < mEnemy.attacks.length; i++) {
        attackEnemigo.push(mEnemy.attacks[i].name)       
    }
    attackEnemigo.sort(() => Math.random() - 0.5)
}

function newMensaje() {
    let newAtaquePlayer = document.createElement('p')
    let newAtaqueEnemigo = document.createElement('p')
    sMensajes.innerHTML = resultado
    newAtaquePlayer.innerHTML = indexAttkPlayer
    newAtaqueEnemigo.innerHTML = indexAttkEnemigo
    atPlayer.appendChild(newAtaquePlayer)
    atEnemigo.appendChild(newAtaqueEnemigo)

}
function msgFinal(resultadoFinal) {
    sMensajes.innerHTML = resultadoFinal
    sRestart.style.display = 'block'
}

function attacksNames(j, e) {
    indexAttkPlayer = attackPlayer[j]
    indexAttkEnemigo = attackEnemigo[e]
}

function combateOneByOne() {
    if (attackPlayer[ia] === attackEnemigo[ia]) {
        console.log('Enemigo: ' + attackEnemigo[ia] + ' Jugador ' + attackPlayer[ia])  
        resultado = 'Empate'
        attacksNames(ia, ia)
        newMensaje()
        ia++
    } else if (attackPlayer[ia] == 'fuego' && attackEnemigo[ia] == 'tierra' || attackPlayer[ia] == 'tierra' && attackEnemigo[ia] == 'agua' || attackPlayer[ia] == 'agua' && attackEnemigo[ia] == 'fuego') {
        console.log('Enemigo: ' + attackEnemigo[ia] + ' Jugador ' + attackPlayer[ia])  
        resultado = 'Ganaste'
        attacksNames(ia, ia)
        playerWins++
        spVPlayer.innerHTML = playerWins
        newMensaje()
        ia++
    } else {
        console.log('Enemigo: ' + attackEnemigo[ia] + ' Jugador ' + attackPlayer[ia])  
        resultado = 'Perdiste'
        attacksNames(ia, ia)
        enemyWins++
        spVEnemy.innerHTML = enemyWins
        newMensaje()
        ia++
    }
    if (attackPlayer.length === mPlayer.attacks.length) {
        rVidas()                
    }

}

function combate() {

    for (let i = 0; i < attackPlayer.length; i++) {
        if (attackPlayer[i] === attackEnemigo[i]) {
            attacksNames(i, i)
            newMensaje()
        } else if (attackPlayer[i] == 'fuego' && attackEnemigo[i] == 'tierra' || attackPlayer[i] == 'tierra' && attackEnemigo[i] == 'agua' || attackPlayer[i] == 'agua' && attackEnemigo[i] == 'fuego') {
            attacksNames(i, i)
            playerWins++
            spVPlayer.innerHTML = playerWins
            newMensaje()
        } else {
            attacksNames(i, i)
            enemyWins++
            spVEnemy.innerHTML = enemyWins
            newMensaje()
        }
    }

    rVidas()
}

function rVidas() {
    if (playerWins > enemyWins) {
        msgFinal('Felicitaciones, has ganado!!! :)')
    } else if (playerWins < enemyWins) {
        msgFinal('Sorry, perdiste!!! tal vez la proxima vez :(')
    } else {
        msgFinal('Es un empate, vamos a resolver esto!')
    }
}

function restartGame() {
    location.reload()
}


window.addEventListener('load', startGame)

