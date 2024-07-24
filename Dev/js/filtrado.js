// Declaramos las constantes a utilizar antes definidas en nuestro codigo catalogo.html con las clases .filtrado
const filtradoBtn = document.querySelectorAll(".filtrado-botones button");
const filtradoTarjetas = document.querySelectorAll(".filtrado-tarjetas .card");

const filtrarTarjetas = e => {
    document.querySelector(".active").classList.remove("active");
    e.target.classList.add("active");

    //iteramos sobre cada tarjeta
    filtradoTarjetas.forEach(card => {
        card.classList.add("hide");
        // revisamos si la tarjeta es igual al filtro seleccionado o "Todos"
        if (card.dataset.name === e.target.dataset.name || e.target.dataset.name === "todos") {
            card.classList.remove("hide");
        }
    })
}

// Agregamos el evento click
filtradoBtn.forEach(button => button.addEventListener("click", filtrarTarjetas));