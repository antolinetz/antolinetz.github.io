class Billete { //Esta es la clase Billete
  constructor(v, c) {
    this.imagen = new Image(); //se crea la imagen
    this.valor = v;
    this.cantidad = c;
    this.imagen.src = img[this.valor] //se trae la url de la imagen asociada al nombre
  }
}

window.onload = function totalEnCaja() {
  for ( var d of caja) {
    disponible += (d.valor * d.cantidad);
  }
  console.log(disponible);
}

function retirarDinero() {
  entregado.length = 0 ; // se limpia el entregado en el retiro anterior
  d.innerHTML = ''; //borrar el contenido previo en el innerHTML
  m.innerHTML = '';
  dinero = parseInt(t.value); //extraemos en valor introducido

  if (disponible - retirado >= dinero) { // Preguntamos si el cajero dispone del dinero para ejecutar la funcion
    for (var bi of caja) { //este ciclo va a todos los elementos que estan en caja y ponerlos en la vaiable bi
      if (dinero > 0) { //Preguntamos si la cantidad a retirar es superior a 0
        div = Math.floor(dinero / bi.valor); //redondear por debajo para quitar los decimales
        if (div > bi.cantidad) {
          papeles = bi.cantidad;
        }
        else {
          papeles = div;
        }
        entregado.push(new Billete(bi.valor, papeles)); //se pone en entregado la cantidad de billetes entregados expresada en la variante papeles
        dinero = dinero - (bi.valor * papeles); //restamos al dinero la cantidad itarada de cada para que en el proximo ciclo entregar solo lo restante
      }
    }
  } else {
    console.log("Paila");
  }

  if (dinero > 0) { //si al cerrar el ciclo dinero sigue siendo mayor que 0 entonces le avisamos al usuario que no esta la cantidad disponible ...
    m.innerHTML = '<p class="destacado">¡No es posible retirar ese monto!</p> <p>Revisa tu saldo o intenta con un monto diferente.</p>';
    clearCantidad();
  } else {
    m.innerHTML = '<p class="destacado">¡Retiro exitoso!</p> <p>Has recibido</p>';
    //console.log(entregado); //miramos cuanto dinero se entrego !!!!!!!!!!!!!!!!!
    for (var e of entregado) { //aca recorremos el array y le mostramos al usuario la cantidad de billetes
      if (e.cantidad > 0) {
        d.innerHTML += '<div class="resultado-billete ">' + e.cantidad + ' billetes de <img class="billete" src="' + e.imagen.src + '"/> </div>';
        //dentro de if para no mostrar la cantidad de billetes que no se entregaron
      }
    }
    for (var r of entregado) { //calculamos en total entregado
      retirado += (r.valor * r.cantidad);
    }
    console.log(retirado);
    //aqui termina el ciclo de mostrar
    console.log("Se han retirado $" + retirado + ". Quedan $" + (disponible - retirado) + " disponibles");
    clearCantidad();
  }
}

function ingresarCantidad() { //activa el boton retirar despues de ingresar la cantidad
if(t.value==="") {
      b.disabled = true;
  } else {
      b.disabled = false;
  }
}

function clearCantidad() { //borra la cantidad del cambio
  b.disabled = true;
  t.value = "";
}


function addNumber(element){
  t.value = t.value+element.value;
  b.disabled = false;
}
function deleteNumber() {
    t.value = t.value.substr(0, t.value.length - 1);
}


var img = [];
img[100] = "assets/100.png";
img[50] = "assets/50.png";
img[20] = "assets/20.png";
img[10] = "assets/10.png";


var caja = []; //Esta es la caja que almacena todos los billestes de la clase billeste
caja.push(new Billete(100, 10));
caja.push(new Billete(50, 20));
caja.push(new Billete(20, 10));
caja.push(new Billete(10, 20));
//Asi hemos agregado billetes a la caja

var dinero = 0; //es la cantidad que desea extraer el usiario
var entregado = []; //Es el array donde se guardaran todos los billetes que entregamos al usuario
var div = 0; //es el resultado de la division en cada iteracion
var papeles = 0; //cantidad de papeles a ser entregados
var disponible = 0; //lacantidad de dinero disponible en el cajero
var retirado = 0;

var b = document.getElementById('retirar');
b.addEventListener('click', retirarDinero);

var t = document.getElementById("cantidad"); //traemos la caja de texto
var m = document.getElementById("mensaje");
var d = document.getElementById("resultado");
