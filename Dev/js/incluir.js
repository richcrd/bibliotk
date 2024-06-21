document.addEventListener("DOMContentLoaded", incluirHTML);

function incluirHTML() {
    document.querySelectorAll("[data-include]").forEach(async elemento => {
        const archivo = elemento.getAttribute("data-include");
        if (archivo) {
            try {
                const respuesta = await fetch(archivo);
                if (!respuesta.ok) throw new Error('La respuesta de la red no es la correcta');
                const datos = await respuesta.text();
                elemento.innerHTML = datos;
                elemento.removeAttribute("data-include");
            } catch (error) {
                console.error('Hubo un problema con la operación de obtención: ', error);
                elemento.innerHTML = "Página no encontrada.";
            }
        }
    });
}


