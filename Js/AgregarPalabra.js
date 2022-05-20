function cambiarPantallaAgregar(condicion) {
    if (condicion == 1) {
        document.getElementById("agregarPalabra").classList.remove("ocultar");
        document.getElementById("agregarPalabra").classList.add("mostrarAgregar");
        document.getElementById("menu").classList.add("ocultar")

    } else {
        document.getElementById("agregarPalabra").classList.remove("mostrarAgregar");
        document.getElementById("agregarPalabra").classList.add("ocultar");
    }

}
document.getElementById("btnAdd").addEventListener("click", function() {
    cambiarPantallaAgregar(1)

})
document.getElementById("btnAgregarPalabra").addEventListener("click", function() {
    var ingreso = document.getElementById("nuevaPalabra").value
    ingreso = ingreso.toUpperCase()
    sacarPalabra(1, ingreso)
    cambiarPantallaAgregar(2)
    EmpezarJuego()

})