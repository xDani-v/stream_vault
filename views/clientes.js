const fs = require('fs');

var id = 0;
// Crear o actualizar datos
function addData(id, nombre, correo, telefono, estado) {
    let data = loadData();
    data.push({ id, nombre, correo, telefono, estado });
    saveData(data);
}

// Leer datos
function loadData() {
    try {
        let data = fs.readFileSync('clientes.json', 'utf8');
        return JSON.parse(data);
    } catch (err) {
        return [];
    }
}

// Guardar datos
function saveData(data) {
    fs.writeFileSync('clientes.json', JSON.stringify(data));
}

// Eliminar datos
function deleteData(id) {
    let data = loadData();
    data = data.filter(item => String(item.id) !== String(id));
    saveData(data);
    displayData();
}

//actualizar datos
function updateData(id, nombre, correo, telefono, estado) {
    let data = loadData();
    let item = data.find(item => String(item.id) === String(id));
    if (item) {
        // Actualizar el registro existente
        item.nombre = nombre;
        item.correo = correo;
        item.telefono = telefono;
        item.estado = estado;
        saveData(data);
    } else {
        console.log(`No se encontró ningún registro con el id ${id}`);
    }
}

//mostrar datos
function editData(ido) {
    let data = loadData();
    let item = data.find(item => String(item.id) === String(ido));
    if (item) {
        // Aquí puedes llenar los campos de entrada con los valores de 'item'
        // Por ejemplo:
        document.getElementById('nombre').value = item.nombre;
        document.getElementById('correo').value = item.correo;
        document.getElementById('telefono').value = item.telefono;
        document.getElementById('estado').value = item.estado;
        // También puedes guardar el 'id' del elemento que se está editando para usarlo más tarde
        id = item.id;
    }
}

//limpiar datos
function clearData() {
    document.getElementById('nombre').value = '';
    document.getElementById('correo').value = '';
    document.getElementById('telefono').value = '';
    document.getElementById('estado').value = '';
}

document.getElementById('form').addEventListener('submit', (e) => {
    e.preventDefault();
    const nombre = document.getElementById('nombre').value;
    const correo = document.getElementById('correo').value;
    const telefono = document.getElementById('telefono').value;
    const estado = document.getElementById('estado').value;
    if (id === 0) {

        id = Date.now();
        addData(id, nombre, correo, telefono, estado);

    } else {

        updateData(id, nombre, correo, telefono, estado);
        id = 0;
    }
    clearData();
    displayData();
});

function displayData() {
    let data = loadData();
    let table = document.getElementById('tbody');
    table.innerHTML = ''; // Limpiar el contenido anterior
    let rows = '';
    data.forEach(item => {
        rows += `
            <tr>
                <td>${item.id}</td>
                <td>${item.nombre}</td>
                <td>${item.correo}</td>
                <td>${item.telefono}</td>
                <td>${item.estado}</td>
                <td><button class="btn btn-warning" onclick="deleteData('${item.id}')">Eliminar</button> 
                <button class="btn btn-info" onclick="editData('${item.id}')">Editar</button></td>
            </tr>
        `;
    });
    table.innerHTML = rows; // Agregar todas las filas a la vez
}

displayData();