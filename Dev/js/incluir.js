// Se agrega un llamador de eventos al evento DOMContentLoaded sobre todo para ejecutar la función incluirHTML cuando la página esté cargada
document.addEventListener("DOMContentLoaded", function() {
    incluirHTML();
});

// Función que nos ayuda a incluir archivos HTML en nuestra pagina index
function incluirHTML() {
    // Con una constante y un query obtenemos los elementos que tiene el atributo de abajo en comillas
    const elementos = document.querySelectorAll("[data-include]");

    // Luego recorremos todos los elementos y obtenemos el nombre de los archivos gracias a la ruta que especificamos anteriormente en el index
    elementos.forEach(elemento => {
        // Obtener el nombre del archivo del atributo data-include
        const archivo = elemento.getAttribute("data-include");

        // Si el nombre del archivo no está vacío, obtener el archivo
        if (archivo) {
            fetch(archivo)
                .then(respuesta => {
                    // Si la respuesta está bien, devolver el texto de la respuesta
                    if (respuesta.ok) return respuesta.text();

                    // Si la respuesta no está bien, lanzar un error
                    throw new Error('La respuesta de la red no es la correcta');
                })
                .then(datos => {
                    // Establecemos el innerHTML del elemento a los datos del archivo para pintarlo al index
                    elemento.innerHTML = datos;

                    // Eliminamos el atributo data-include del elemento
                    elemento.removeAttribute("data-include");
                })
                .catch(error => {
                    // Luego si hay problema se puede imprimir el error en la consola
                    console.error('Hubo un problema con la operación de obtención: ', error);

                    // Establecemos nuevamente a el innerHTML del elemento como "Página no encontrada".
                    elemento.innerHTML = "Página no encontrada.";
                    // Esto se pretende si en dado caso olvidamos o pusimos mal el nombre del archivo con la ruta
                });
        }
    });
}

