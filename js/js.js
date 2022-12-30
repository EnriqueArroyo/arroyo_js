class Producto {
  constructor(id, nombre, precio, cantidad, descripcion) {
    this.id = id;
    this.nombre = nombre;
    this.precio = precio;
    this.cantidad = cantidad;
    this.descripcion = descripcion;
  }
}
const producto1 = new Producto(
  1,
  "Wraps",
  350.0,
  0,
  "Los Wraps son muy ricos y nutritivos"
);
const producto2 = new Producto(
  2,
  "Parrillada",
  2500.0,
  0,
  "Parrillada completa para una persona"
);
const producto3 = new Producto(
  3,
  "Combo completo",
  749.99,
  0,
  "Esto es un combo"
);
const producto4 = new Producto(
  4,
  "Esto es una copia",
  150.0,
  0,
  "Hay que poner algo aca"
);
let total = 0;
const envio = 150;
document.getElementById("total").innerHTML = total;

const pedido = [producto1, producto2, producto3, producto4];

refrescar();
calcTotal();

function aumentar(producto) {
  producto.cantidad++;
  refrescar();
  calcTotal();
  actualizarTabla(pedido);
  console.log(
    `Añadiste un ${producto.nombre} y ahora hay${producto.cantidad} en el pedido`
  );
  return producto.cantidad;
}
function disminuir(producto) {
  if (producto.cantidad > 0) {
    producto.cantidad--;
    refrescar();
    console.log(
      `quitaste un ${producto.nombre} y ahora hay${producto.cantidad} en el pedido`
    );
    calcTotal();
    actualizarTabla(pedido);
    return producto.cantidad;
  } else {
    console.log(
      `No se puede quitar el producto ${producto.nombre} la cantidad actual está en 0`
    );
  }
}

function calcTotal() {
  let totalFinal = 0;
  pedido.forEach((producto) => {
    total = producto.cantidad * producto.precio;
    totalFinal += total;
    console.log(
      `${producto.nombre}, ${producto.cantidad} * ${producto.precio} =` +
        producto.precio * producto.cantidad
    );
  });
  document.getElementById("total").innerHTML = totalFinal + envio;
  return totalFinal;
}

function refrescar() {
  
  document.getElementById("p1n").innerHTML = producto1.nombre;
  document.getElementById("p1p").innerHTML = producto1.precio;
  document.getElementById("p1d").innerHTML = producto1.descripcion;
  document.getElementById("p1c").innerHTML = producto1.cantidad;

  document.getElementById("p2n").innerHTML = producto2.nombre;
  document.getElementById("p2p").innerHTML = producto2.precio;
  document.getElementById("p2d").innerHTML = producto2.descripcion;
  document.getElementById("p2c").innerHTML = producto2.cantidad;

  document.getElementById("p3n").innerHTML = producto3.nombre;
  document.getElementById("p3p").innerHTML = producto3.precio;
  document.getElementById("p3d").innerHTML = producto3.descripcion;
  document.getElementById("p3c").innerHTML = producto3.cantidad;

  document.getElementById("p4n").innerHTML = producto4.nombre;
  document.getElementById("p4p").innerHTML = producto4.precio;
  document.getElementById("p4d").innerHTML = producto4.descripcion;
  document.getElementById("p4c").innerHTML = producto4.cantidad;
  document.getElementById("subtotal").innerHTML = calcTotal();
  actualizarTabla(pedido);
}

function actualizarTabla(pedido) {
  // Seleccionamos la tabla y el cuerpo de la tabla
  var tabla = document.querySelector('#pedido');
  var tbody = tabla.querySelector('tbody');

  // Limpiamos el cuerpo de la tabla
  tbody.innerHTML = '';

  // Recorremos el arreglo de objetos
  pedido.forEach(function(objeto) {
    // Creamos una fila para cada objeto
    var fila = document.createElement('tr');
    if (objeto.cantidad == 0) return;
    // Agregamos las celdas con los datos del objeto
    fila.innerHTML = '<td>' + objeto.cantidad + '</td>' +
                     '<td>' + objeto.nombre + '</td>' +                    
                     '<td>$' + objeto.precio + '</td>' +
                     '<td>$' + objeto.precio*objeto.cantidad + '</td>';

    // Agregamos la fila a la tabla
    tbody.appendChild(fila);
  });
}
