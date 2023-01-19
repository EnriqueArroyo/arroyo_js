//Declaro la clase para los productos
class Producto {
  constructor(id, nombre, precio, cantidad, descripcion, imagen) {
    this.id = id;
    this.nombre = nombre;
    this.precio = precio;
    this.cantidad = cantidad;
    this.descripcion = descripcion;
    this.imagen = imagen;
  }
}
//Creo las instancias de los productos que voy a usar
const producto1 = new Producto(
  1,
  "Wraps",
  350.0,
  0,
  "Los Wraps son muy ricos y nutritivos",
  "018ab5a2-6a2a-418c-8603-ee8e32169f81-1667924223374.webp"
);
const producto2 = new Producto(
  2,
  "Parrillada",
  2500.0,
  0,
  "Parrillada completa para una persona",
  "lamalbequeria-1661802104650.webp"
);
const producto3 = new Producto(
  3,
  "Combo completo",
  750.0,
  0,
  "Esto es un combo",
  "mcdonaldscol-1660251198623.webp"
);
const producto4 = new Producto(
  4,
  "Esto es una copia",
  150.0,
  0,
  "Hay que poner algo aca",
  "mcdonaldscol-1660251198623.webp"
);




//Variable y constante para almacenar los valores del total y del envio
let total = 0;
const envio = 150;
document.getElementById("total").innerHTML = total;

//Creo un arreglo con los productos creados
const pedido = [producto1, producto2, producto3, producto4];
refresh();
function refresh(){
  let cardContainer = document.getElementById("card_container");
  cardContainer.innerHTML = ``;
pedido.forEach(producto => {
  cardContainer.innerHTML += 
  `<div class="col">
  <div class="card h-100">
    <img
      src="img/${producto.imagen}"
      class="card-img-top"
      height="150px"
      width="268px"
      alt="..."
    />
    <div class="card-body">
      <h5 class="card-title">${producto.nombre}</h5>
      <p class="card-text">${producto.descripcion}</p>
      <p class="card-text" >$${producto.precio}</p>
    </div>
    <div class="card-footer">
      <button
        id=""
        onclick="disminuir(${pedido.indexOf(producto)})"
        value="decrease"
      >
        -
      </button>

      <div class="contador_contenedor">
        <h1 id="${pedido.indexOf(producto)}" value="">${producto.cantidad}</h1>
      </div>

      <button id="add-button" onclick="aumentar(${pedido.indexOf(producto)})">
        +
      </button>
    </div>
  </div>
</div>`
});
}




calcTotal();

//Funcion para agregar cantidad al producto
function aumentar(index) {
  let producto = pedido[index];
  producto.cantidad++;
  refrescar(index);
  calcTotal();
  actualizarTabla(pedido);
  console.log(
    `Añadiste un ${producto.nombre} y ahora hay${producto.cantidad} en el pedido`
  );
  return producto.cantidad;
}
//Funcion para disminuir la cantidad al producto. Cuenta con una validacion para productos que ya estan en 0
function disminuir(index) {
  let producto = pedido[index];
  if (producto.cantidad > 0) {
    producto.cantidad--;
    refrescar(index);
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
//Funcion que recorre el arreglo de productos y calcula el total del pedido
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

//Funcion que refresca los valores al iniciar el html, aumentar y/o disminuir cantidades
function refrescar(index) {
  let producto = pedido[index];
  document.getElementById(index).innerHTML = producto.cantidad;
  document.getElementById("subtotal").innerHTML = calcTotal();
  document.getElementById("subtotal").innerHTML = calcTotal();
  actualizarTabla(pedido);
}

//Funcion que actualiza la tabla donde se listan los productos seleccionados por el usuario
//Se llama al iniciar el html, al agregar y disminuir cantidades para que se refresquen los valores
function actualizarTabla(pedido) {

  var tabla = document.querySelector('#pedido');
  var tbody = tabla.querySelector('tbody');

  // Funcion que limpia los datos viejos en caso de que haya
  tbody.innerHTML = '';

  // Funcion que recorre el arreglo de objetos
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

// Manejo de formularios de ventana modal CREAR PRODUCTOS

//Capturamos btn
let crearProductoBtn = document.getElementById("crear-productos-btn");
//Adjunto el evento
crearProductoBtn.addEventListener("click", () =>{cargarProducto(pedido)});

function cargarProducto(array){
  let id_max = 0;
  array.forEach(producto => {
    
    if (producto.id > id_max){
      id_max = producto.id;
      console.log("El id maximo es =" + id_max)
    }
  });

  let nombre_input = document.getElementById("nombre-input");
  let descripcion_input = document.getElementById("descripcion-input");
  let precio_input = document.getElementById("precio-input");
  
  
  const producto= new Producto(id_max+1, nombre_input.value, precio_input.value , 0, descripcion_input.value, "sin-foto.jpg")
  array.push(producto)
  console.log(pedido)
  console.log("hiciste clic")
  refresh();
}