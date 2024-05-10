const fs = require('fs');

var id = 0;
// Crear o actualizar datos
function addData(id, nombre, imagen, numero_perfiles, estado) {
    let data = loadData();
    data.push({ id, nombre, imagen, numero_perfiles, estado });
    saveData(data);
}

// Leer datos
function loadData() {
    try {
        let data = fs.readFileSync('data/servicios.json', 'utf8');
        return JSON.parse(data);
    } catch (err) {
        return [];
    }
}

// Guardar datos
function saveData(data) {
    fs.writeFileSync('data/servicios.json', JSON.stringify(data));
}

// Eliminar datos
function deleteData(id) {
    let data = loadData();
    data = data.filter(item => String(item.id) !== String(id));
    saveData(data);
    displayData();
}

//actualizar datos
function updateData(id, nombre, imagen, numero_perfiles, estado) {
    let data = loadData();
    let item = data.find(item => String(item.id) === String(id));
    if (item) {
        // Actualizar el registro existente
        item.nombre = nombre;
        item.imagen = imagen;
        item.numero_perfiles = numero_perfiles;
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
        document.getElementById('imagen').value = item.imagen;
        document.getElementById('numero_perfiles').value = item.numero_perfiles;
        document.getElementById('estado').value = item.estado;
        // También puedes guardar el 'id' del elemento que se está editando para usarlo más tarde
        id = item.id;
    }
}

//limpiar datos
function clearData() {
    document.getElementById('nombre').value = '';
    document.getElementById('imagen').value = '';
    document.getElementById('numero_perfiles').value = '';
    document.getElementById('estado').value = 'Seleccione';
}

document.getElementById('form').addEventListener('submit', (e) => {
    e.preventDefault();
    const nombre = document.getElementById('nombre').value;
    const imagen = document.getElementById('imagen').value;
    const numero_perfiles = document.getElementById('numero_perfiles').value;
    const estado = document.getElementById('estado').value;
    if (id === 0) {
        id = Date.now();
        addData(id, nombre, imagen, numero_perfiles, estado);
    } else {
        updateData(id, nombre, imagen, numero_perfiles, estado);
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
                <td><img class="img-fluid" src="${item.imagen}" alt="Imagen del item" style="max-width: 100px; height: auto;"></td>
                <td>${item.numero_perfiles}</td>
                <td>${item.estado}</td>
                <td>
                    <button class="btn btn-warning" onclick="deleteData('${item.id}')">Eliminar</button>
                    <button class="btn btn-info" onclick="editData('${item.id}')">Editar</button>
                </td>
            </tr>
        `;
    });
    table.innerHTML = rows; // Agregar todas las filas a la vez
}

displayData();
