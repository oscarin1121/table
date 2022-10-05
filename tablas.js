let table = document.getElementById("table").getElementsByTagName('tbody')[0];
const firebaseConfig = {
    apiKey: "AIzaSyBbchOzyKMRloavCwi6BeClHzFcxu5zD2M",
    authDomain: "tablas-93f1a.firebaseapp.com",
    projectId: "tablas-93f1a",
    storageBucket: "tablas-93f1a.appspot.com",
    messagingSenderId: "509416583198",
    appId: "1:509416583198:web:0cd44ecc52b029125bfe0f",
    measurementId: "G-NTX714Z5JR",
    databaseURL: "https://tablas-93f1a-default-rtdb.firebaseio.com"
};
let boton = document.getElementById("Enviar");
let id;
let Sku;
let Cantidad;
let rowlocation = 0;
firebase.initializeApp(firebaseConfig);
let db = firebase.database();

function agregarDatosTabla(idAdd, skuAdd, cantidadAdd) {
    let row = table.insertRow(rowlocation);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    cell1.innerHTML = idAdd;
    cell2.innerHTML = skuAdd;
    cell3.innerHTML = cantidadAdd;
    rowlocation++;
}


db.ref('/').once('value').then((snapshot) => {
    let valores = snapshot.val();
    for (const key in valores) {
        if (Object.hasOwnProperty.call(valores, key)) {
            id = key;
            let Skulength = valores[key].products.sku;
            for (const skuItem in Skulength) {
                if (Object.hasOwnProperty.call(Skulength, skuItem)) {
                    Sku = skuItem;
                    let Cantidad = Skulength[skuItem].quantity;
                    agregarDatosTabla(id, Sku, Cantidad);
                }
            }
        }
    }
});

boton.onclick = function () {
    id = document.getElementById("idItem").value;
    Sku = document.getElementById("skuItem").value;
    Cantidad = document.getElementById("cantidadItem").value;
    if (id != "" & Sku != "" & Cantidad != "") {
        db.ref(`${id}/products/sku/${Sku}`).update({
            quantity: parseInt(Cantidad)
        });
        agregarDatosTabla(id, Sku, Cantidad);
    } else {
        window.alert("Todos los datos son necesarios");
    }
};

