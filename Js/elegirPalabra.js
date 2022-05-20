/*Partida*/

var partida = {

    vidas: 9,
    intentos: 0,
    gano: false,
    palabras: ["CAMA", "MAESTRA", "ESCUDO", "TERCIARIO", "MUSEO", "COPA", "CASA", "VERDE", "MENTIRA", "OSO", "ARGENTINA", "PERSONA", "PELO", "AGUA", "BANANA", "MOTO", "PERRO", ],
    palabra: "",
    arrayletras: [],
    rejugar: false,
    letraIncorrectas: []

}


/*--------------------------Juego--------------------------*/







teclado = document.getElementById("eventoTeclado")
teclado.addEventListener("keydown", function(e) {
    cad = ``
    var input = e.key
    input = input.toUpperCase();
    var encontro = false
    document.getElementById("eventoTeclado").value = "";

    if (partida.rejugar == true) {
        console.log("Se vuelve a rejugar")
        partida.vidas = 9
        partida.intentos = 0
        document.getElementById("imagenes").innerHTML = ``
        partida.arrayletras = []
        partida.rejugar = false
    }

    if ((partida.vidas > 0) && (partida.gano != true)) {
        encontro = buscarLetra(partida, input)

        if (!encontro) {
            partida.intentos++;
            partida.vidas--;
            mostrarIntentos(input, partida)
        }
    }
    if (partida.gano == true) {
        return 0
    }
    if (partida.vidas == false) {
        alert(`Perdiste! la palabra era: ${partida.palabra}`)
        return 0
    }











    return 0



})


function sacarPalabra(accion, array) {

    if (accion == 0) {

        var item = array[Math.floor(Math.random() * array.length)];
        console.log(item)
        return item



    }


}





/*--------------------------Demas-------------------------------*/

function insertarNuevasPalabras(arrayPalabras, nuevaPalabra) {
    arrayPalabras.push(nuevaPalabra)
    return arrayPalabras
}

function buscarLetra(partida, input) {
    //palabra array y el dom
    for (letra of partida.palabra) {

        if (input == letra) {




            partida.arrayletras = cambiarLetra(partida, input)
            console.log(partida.arrayletras)

            mostrarVictoria(partida)

            return true


        }


    }


}

function cambiarLetra(partida, colocarLetra) {
    //palabra,input,array,arraypete

    var repetido = 0
    var contAciertos = 0
    for (letra in partida.palabra) {

        if (partida.palabra[letra] == colocarLetra) {
            document.getElementById(letra).style.opacity = "100%"
            contAciertos++
            if (contAciertos >= 1) {

                partida.arrayletras.push(colocarLetra)
            }
        }


    }
    return partida.arrayletras
        //return contAciertos

}



function mostrarVictoria(partida) {
    //array,palabra,dom
    console.log("verificando..")
    console.log(`${typeof(partida.arrayletras)} == ${partida.palabra}`)
    if ((partida.arrayletras).length == (partida.palabra).length) {
        console.log(partida.palabra)

        document.getElementById("imagenes").innerHTML = `<img id="mostrarMuñeco" src="./Img/ahorcado/baseWin.png" alt="">`
            /*document.getElementById("mensaje").innerHTML = `<div id="victoria">
            <p>Ganaste!</p>
            </div>`*/
        partida.gano = true

    }


}


function mostrarLetrasTablero(palabra, cambio) {

    if (cambio == 0) {
        var divPalabras = document.getElementById("palabras")
        cad1 = ``
            /*p id="${palabra[i]}"class="letraCorrecta">${palabra[i]}</p>*/
        for (i = 0; i < palabra.length; i++) {
            cad1 += `<div class=conteiner>
                        <p id="${i}"class="letraCorrecta">${palabra[i]}</p>
                        <div class="espacios">
                        </div>

                    </div>
                    </div>
                    `




        }
        divPalabras.innerHTML = cad1

    }
    if (cambio == 1) {
        var xd = document.getElementById("palabras")
        console.log(xd.children)
        var i = xd.children.length
        while (i > 0) {
            xd.removeChild(xd.firstChild)
        }



    }




}


function mostrarIntentos(input, partida) {
    console.log(`Vida actual = ${partida.vidas}`)
    cad0 = ``
    partida.letraIncorrectas.push(input)
    if (partida.vidas >= 0) {

        for (i in partida.letraIncorrectas) {
            cad0 += `<div  id="${input}" class="letraEquivocada"> ${partida.letraIncorrectas[i]} - </div>`
        }

        document.getElementById("equivocadas").innerHTML = cad0

        document.getElementById("imagenes").innerHTML = `<img id="mostrarMuñeco" src="./Img/ahorcado/base${partida.intentos}.png" alt="">`



    }
}

function reinicarPartida() {
    document.getElementById("eventoTeclado").value = "";
    document.getElementById("equivocadas").innerHTML = ""
    document.getElementById("imagenes").innerHTML = ""
    var nuevoArray = []
    var rejugar = true
    var empezar = false

    partida.rejugar = rejugar
    partida.gano = empezar
    partida.arrayletras = nuevoArray
    partida.letraIncorrectas = nuevoArray
    partida.palabra = sacarPalabra(0, partida.palabras, "")
    mostrarLetrasTablero(partida.palabra, 0)
    cambiarMenu(1)

    return 0
}

function cambiarMenu(condicion) {

    if (condicion == 1) {
        //Mostrar el juego
        document.getElementById("game").classList.remove("ocultar");
        document.getElementById("game").classList.add("mostrarJuego");
        document.getElementById("menu").classList.add("ocultar")
        document.getElementById("eventoTeclado").focus()

        pantalla = document.getElementById("ahorcado")
    }
    if (condicion == 2) {
        //Pantalla para agregar palabras
        document.getElementById("agregarPalabra").classList.remove("ocultar");
        document.getElementById("agregarPalabra").classList.add("mostrarAgregar");
        document.getElementById("menu").classList.add("ocultar")

    }
    if (condicion == 3) {
        //Ocultar Pantalla de agregar
        document.getElementById("agregarPalabra").classList.remove("mostrarAgregar");
        document.getElementById("agregarPalabra").classList.add("ocultar");

    }
    if (condicion == 4) {
        //MostrarMenu
        document.getElementById("menu").classList.add("mostrarMenu")
        document.getElementById("menu").classList.remove("ocultar")
    }
}




/*--------------------------Botones-------------------------------*/
//Boton para empezar a jugar
var btnGame = document.querySelector("#btnGame")
btnGame.addEventListener("click", function() {
    partida.palabra = sacarPalabra(0, partida.palabras)
    cambiarMenu(1)
    mostrarLetrasTablero(partida.palabra, 0)




})
document.getElementById("btnCancelGame").addEventListener("click", function() {
    alert(`La palabra es: ${partida.palabra}`)
})

//Rejugar
document.getElementById("btnNewGame").addEventListener("click", function() {
    reinicarPartida()

})

//Menu para agregar palabras
document.getElementById("btnAdd").addEventListener("click", function() {

    cambiarMenu(2)

})


//boton que agrega la palabra
document.getElementById("btnAgregarPalabra").addEventListener("click", function() {
    var ingreso = document.getElementById("nuevaPalabra").value
    console.log(ingreso)
    ingreso = ingreso.toUpperCase()
    partida.palabras = insertarNuevasPalabras(partida.palabras, ingreso)
    console.log(partida.palabras)
    sacarPalabra(1, ingreso)
    cambiarMenu(3)
    cambiarMenu(4)

})

//Nuevo juego
var btnCancel = document.querySelector("#btnCancelGame")
btnCancel.addEventListener("click", function() {
    reinicarPartida()
})

//Focus en la pantalla
var focus = document.getElementById("body")
focus.addEventListener("click", function() {
    document.getElementById("eventoTeclado").focus()
})