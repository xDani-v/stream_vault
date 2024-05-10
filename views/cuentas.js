const fs = require('fs');

var id = 0;
// Crear o actualizar datos
function addData(id, servicio, email, email_pass, cuenta_pass, valor, fecha_prox_pago) {
    let data = loadData();
    data.push({ id, servicio, email, email_pass, cuenta_pass, valor, fecha_prox_pago });
    saveData(data);
}

// Leer datos
function loadData() {
    try {
        let data = fs.readFileSync('data/cuentas.json', 'utf8');
        return JSON.parse(data);
    } catch (err) {
        return [];
    }
}

function loadServicios() {
    try {
        let data = fs.readFileSync('data/servicios.json', 'utf8');
        let servicios = JSON.parse(data);

        // Obtener el elemento select
        let select = document.getElementById('servicio');

        // Crear una opción para cada servicio en los datos
        servicios.forEach(servicio => {
            let option = document.createElement('option');
            option.value = servicio.id; // Asume que cada servicio tiene un id
            option.text = servicio.nombre; // Asume que cada servicio tiene un nombre
            select.add(option);
        });
    } catch (err) {
        console.error(err);
        return [];
    }
}


// Guardar datos
function saveData(data) {
    fs.writeFileSync('data/cuentas.json', JSON.stringify(data));
}

function deleteData(id) {
    let data = loadData();
    data = data.filter(item => String(item.id) !== String(id));
    saveData(data);
    displayData();
}

//actualizar datos
function updateData(id, servicio, email, email_pass, cuenta_pass, valor, fecha_prox_pago) {
    let data = loadData();
    let item = data.find(item => String(item.id) === String(id));
    if (item) {
        // Actualizar el registro existente
        item.servicio = servicio;
        item.email = email;
        item.email_pass = email_pass;
        item.cuenta_pass = cuenta_pass;
        item.valor = valor;
        item.fecha_prox_pago = fecha_prox_pago;
        saveData(data);
    } else {
        console.log(`No se encontró ningún registro con el id ${id}`);
    }
}

function editData(ido) {
    let data = loadData();
    let item = data.find(item => String(item.id) === String(ido));
    if (item) {
        // Aquí puedes llenar los campos de entrada con los valores de 'item'
        // Por ejemplo:
        document.getElementById('servicio').value = item.servicio;
        document.getElementById('email').value = item.email;
        document.getElementById('email_pass').value = item.email_pass;
        document.getElementById('cuenta_pass').value = item.cuenta_pass;
        document.getElementById('valor').value = item.valor;
        document.getElementById('fecha_prox_pago').value = item.fecha_prox_pago;
        // También puedes guardar el 'id' del elemento que se está editando para usarlo más tarde
        id = item.id;
    }
}

function clearData() {
    document.getElementById('servicio').value = '';
    document.getElementById('email').value = '';
    document.getElementById('email_pass').value = '';
    document.getElementById('cuenta_pass').value = '';
    document.getElementById('valor').value = '';
    document.getElementById('fecha_prox_pago').value = '';
}

document.getElementById('form').addEventListener('submit', (e) => {
    e.preventDefault();
    const servicio = document.getElementById('servicio').value;
    const email = document.getElementById('email').value;
    const email_pass = document.getElementById('email_pass').value;
    const cuenta_pass = document.getElementById('cuenta_pass').value;
    const valor = document.getElementById('valor').value;
    const fecha_prox_pago = document.getElementById('fecha_prox_pago').value;

    if (id === 0) {

        id = Date.now();
        addData(id, servicio, email, email_pass, cuenta_pass, valor, fecha_prox_pago);

    } else {

        updateData(id, servicio, email, email_pass, cuenta_pass, valor, fecha_prox_pago);
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
                <td>${item.servicio}</td>
                <td>${item.email}</td>
                <td>${item.email_pass}</td>
                <td>${item.cuenta_pass}</td>
                <td>${item.valor}</td>
                <td>${item.fecha_prox_pago}</td>
                <td>
                <button class="btn btn-info" onclick="editData('${item.id}')">Editar</button>
                <button class="btn btn-warning" onclick="deleteData('${item.id}')">Eliminar</button> 
                </td>
            </tr>
        `;
    });
    table.innerHTML = rows; // Agregar todas las filas a la vez
}

displayData();
loadServicios();
