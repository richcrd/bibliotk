// Array vacio para guardar en ello la lista de libros
let librosGuardados = [];

function guardarLibro(id) {
    // Selecciona el boton que fue clickeado segun el numero del id 
    const boton = document.querySelector(`button[data-id='${id}']`);
    // Encuentra el mas cercano que coincida del data-id con el de libro
    const libroElement = document.querySelector(`button[data-id='${id}']`).closest('.card-body');
    const titulo = libroElement.querySelector('.card-title').textContent;

    // Hacemos esta condicional para verificar si el libro ya esta en la lista guardada, si esta entonces
    // no lo agrega
    if (!librosGuardados.includes(titulo)) {
        librosGuardados.push(titulo);
        actualizarListaLibros();
    }
}

function actualizarListaLibros() {
    // Selecciona el contenedor donde se mostrarán los libros
    const listaLibros = document.getElementById('listaLibros');
    listaLibros.innerHTML = '';

    // Esto recorre cada título en librosGuardados o sea en el arreglo que declaramos antes
    librosGuardados.forEach((titulo, index) => {
        const libroItem = document.createElement('div');
        libroItem.classList.add('libro-item');
        libroItem.innerHTML = `
            <span class="libro-titulo">${titulo}</span>
            <button class="btn-eliminar" onclick="eliminarLibro(${index})">&times;</button>
        `;
        listaLibros.appendChild(libroItem);
    });
}

function eliminarLibro(index){
    librosGuardados.splice(index, 1)
    actualizarListaLibros();
}

// Eventos clicks
document.getElementById('iconoFlotante').addEventListener('click', () => {
    document.getElementById('contenedorFlotante').classList.toggle('hide');
});

document.getElementById('btnCerrar').addEventListener('click', () => {
    document.getElementById('contenedorFlotante').classList.add('hide');
});
