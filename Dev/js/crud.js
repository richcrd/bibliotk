// Funcion para validar formulario y obtenemos el valor por cada entrada del usuario

function validateForm(){
    var name = document.getElementById("name").value;
    var age = document.getElementById("age").value;
    var address = document.getElementById("address").value;
    var email = document.getElementById("email").value;
    
    // Validaciones de Entradas
    // Si no hay un campo valido entonces devolvemos falso
    if(name == ""){
        alert("El campo Nombre no puede estar vacio!");
        return false;
    }

    if(age == ""){
        alert("El campo Edad no puede estar vacio!");
        return false;
    }
    else if( age < 1){
        alert("La Edad no debe ser menor que cero");
    }

    if(address == ""){
        alert("El campo direccion no puede estar vacio!");
        return false;
    }

    if(email == ""){
        alert("El campo Correo no puede estar vacio!");
        return false;
    }
    else if(!email.includes("@")){
        alert("Direccion de Correo Invalida");
        return false;
    }
    return true;
}


// Función para mostrar los datos
function showData() {
    var peopleList = JSON.parse(localStorage.getItem("peopleList")) || [];

    var html = "";
    // Realizamos las funciones de los elementos de cada columna dirigida en HTML
    peopleList.forEach(function (element, index) {
        html += "<tr>";
        html += "<td>" + element.id + "</td>"; // Utilizar el ID existente
        html += "<td>" + element.name + "</td>";
        html += "<td>" + element.age + "</td>";
        html += "<td>" + element.address + "</td>";
        html += "<td>" + element.email + "</td>";
        // Agregamos dos nuevos botones de Delete & Update siempre y cuando hayan datos en tabla
        html += '<td><button onclick="deleteData(' + index + ')" class="btn btn-danger">Eliminar</button><button onclick="updateData(' + index + ')" class="btn btn-warning m-2">Editar</button></td>';
        html += "</tr>";
    });

    document.querySelector("#crudTable tbody").innerHTML = html;
}

// Función para generar un ID numérico único
function generateUniqueId() {
    var counter = localStorage.getItem("counter") || 0;
    counter++;
    localStorage.setItem("counter", counter);
    return counter;
}

// Función para agregar datos
function AddData() {
    if (validateForm()) {
        var name = document.getElementById("name").value;
        var age = document.getElementById("age").value;
        var address = document.getElementById("address").value;
        var email = document.getElementById("email").value;

        var peopleList = JSON.parse(localStorage.getItem("peopleList")) || [];

        var newEntry = {
            id: generateUniqueId(), // Utiliza la función para obtener un ID único
            name: name,
            age: age,
            address: address,
            email: email,
        };

        peopleList.push(newEntry);

        localStorage.setItem("peopleList", JSON.stringify(peopleList));
        showData();

        document.getElementById("name").value = "";
        document.getElementById("age").value = "";
        document.getElementById("address").value = "";
        document.getElementById("email").value = "";
    }
}

// Funcion para eliminar los datos de forma local

function deleteData(index){
    var peopleList;
        if(localStorage.getItem("peopleList") == null){
            peopleList = []
        }
        else {
            peopleList = JSON.parse(localStorage.getItem("peopleList")); // Declaramos el Almacenamiento Local
        }

        peopleList.splice(index, 1);
        localStorage.setItem("peopleList", JSON.stringify
        (peopleList));
        showData();
}

//  Funcion para actualizar o editar los datos en almacenamiento local
function updateData(index){
    document.getElementById("Submit").style.display = "none";
    document.getElementById("Update").style.display = "block";

    var peopleList;
        if(localStorage.getItem("peopleList") == null){
            peopleList = []
        }
        else {
            peopleList = JSON.parse(localStorage.getItem("peopleList")); // Declaramos el Almacenamiento Local
        }

    document.getElementById("name").value = peopleList[index].name;
    document.getElementById("age").value = peopleList[index].age;
    document.getElementById("address").value = peopleList[index].address;
    document.getElementById("email").value = peopleList[index].email;

    document.querySelector("#Update").onclick = function(){
        if(validateForm() == true){
            peopleList[index].name = document.getElementById("name").value;
            peopleList[index].age = document.getElementById("age").value;
            peopleList[index].address = document.getElementById("address").value;
            peopleList[index].email = document.getElementById("email").value;

            localStorage.setItem("peopleList", JSON.stringify
            (peopleList));

            showData();

            document.getElementById("name").value = "";
            document.getElementById("age").value = "";
            document.getElementById("address").value = "";
            document.getElementById("email").value = "";

            // Submit se muestra y Update se oculta para actualizar los Datos

            document.getElementById("Submit").style.display = "block";
            document.getElementById("Update").style.display = "none";
        }
    }
}

// Llamada y carga todos los datos cuando el documento o página haya cargado
document.onload = showData();