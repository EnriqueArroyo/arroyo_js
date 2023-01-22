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
  "wraps.png"
);
const producto2 = new Producto(
  2,
  "Parrillada",
  2500.0,
  0,
  "Parrillada completa para una persona",
  "parrillada.png"
);
const producto3 = new Producto(
  3,
  "Combo completo",
  750.0,
  0,
  "Esto es un combo",
  "combo-mc.webp"
);
const producto4 = new Producto(
  4,
  "Esto es una copia",
  150.0,
  0,
  "Hay que poner algo aca",
  "combo-mc.webp"
);

//Variable y constante para almacenar los valores del total y del envio
let total = 0;
const envio = 150;
document.getElementById("total").innerHTML = total;

//Creo un arreglo con los productos creados
const pedido = [producto1, producto2, producto3, producto4];
refresh();
function refresh() {
  let cardContainer = document.getElementById("card_container");
  cardContainer.innerHTML = ``;
  pedido.forEach((producto) => {
    cardContainer.innerHTML += `<div class="col">
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
</div>`;
  });
}

//Select del Modificar
function listarProductos() {
  let selectProduct = document.getElementById("selectProduct");
  selectProduct.innerHTML = `<option value="">Seleccione un producto</option>`;

  pedido.forEach((producto) => {
    selectProduct.innerHTML += `<option value="${producto.id}">${producto.nombre}</option>`;
  });
}
//Select del Eliminar
function listarProductosE() {
  let selectProductE = document.getElementById("selectProductE");
  selectProductE.innerHTML = `<option value="">Seleccione un producto</option>`;

  pedido.forEach((producto) => {
    selectProductE.innerHTML += `<option value="${producto.id}">${producto.nombre}</option>`;
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
  actualizarTabla(pedido);
}

//Funcion que actualiza la tabla donde se listan los productos seleccionados por el usuario
//Se llama al iniciar el html, al agregar y disminuir cantidades para que se refresquen los valores
function actualizarTabla(pedido) {
  var tabla = document.querySelector("#pedido");
  var tbody = tabla.querySelector("tbody");

  // Funcion que limpia los datos viejos en caso de que haya
  tbody.innerHTML = "";

  // Funcion que recorre el arreglo de objetos
  pedido.forEach(function (objeto) {
    // Creamos una fila para cada objeto
    var fila = document.createElement("tr");
    if (objeto.cantidad == 0) return;
    // Agregamos las celdas con los datos del objeto
    fila.innerHTML =
      "<td>" +
      objeto.cantidad +
      "</td>" +
      "<td>" +
      objeto.nombre +
      "</td>" +
      "<td>$" +
      objeto.precio +
      "</td>" +
      "<td>$" +
      objeto.precio * objeto.cantidad +
      "</td>";

    // Agregamos la fila a la tabla
    tbody.appendChild(fila);
  });
}

// Manejo de formularios de ventana modal CREAR PRODUCTOS
//Capturamos btn
let crearProductoBtn = document.getElementById("crear-productos-btn");
//Adjunto el evento
crearProductoBtn.addEventListener("click", () => {
  cargarProducto(pedido);
});

function cargarProducto(array) {
  
  let id_max = 0;
  array.forEach((producto) => {
    if (producto.id > id_max) {
      id_max = producto.id;
      console.log("El id maximo es =" + id_max);
    }
  });

  let nombre_input = document.getElementById("nombre-input");
  let descripcion_input = document.getElementById("descripcion-input");
  let precio_input = document.getElementById("precio-input");
  let imagen_input = document.getElementById("listadoImgCrear"); 
  const producto = new Producto(
    id_max + 1,
    nombre_input.value,
    precio_input.value,
    0,
    descripcion_input.value,
    findImageMByName(imagen_input.value).path
  );
  array.push(producto);
  console.log(pedido);
  console.log("hiciste clic");
  refresh();
  document.getElementById("formulario").reset();
}

// Modificar producto
const select = document.getElementById("selectProduct");
const nombre_input = document.getElementById("nombre-inputm");
const descripcion_input = document.getElementById("descripcion-inputm");
let precio_input = document.getElementById("precio-inputm");

select.addEventListener("change", function () {
  const selectedProductId = select.value;
  const selectedProduct = findProductById(selectedProductId);
  if (selectedProduct != null) {
    nombre_input.value = selectedProduct.nombre;
    descripcion_input.value = selectedProduct.descripcion;
    precio_input.value = selectedProduct.precio;
  }
});

function findProductById(productId) {
  for (let i = 0; i < pedido.length; i++) {
    if (pedido[i].id == productId) {
      return pedido[i];
    }
  }
  nombre_input.value = "";
  descripcion_input.value = "";
  precio_input.value = "";
  return null;
}

let modificarProductoBtn = document.getElementById("modificar-productos-btn");
modificarProductoBtn.addEventListener("click", () => {
  modificarProducto(select.value);
});

function modificarProducto(productId) {
  pedido.forEach((producto) => {
    if (producto.id == productId) {
      producto.nombre = document.getElementById("nombre-inputm").value;
      producto.descripcion =
        document.getElementById("descripcion-inputm").value;
      producto.precio = document.getElementById("precio-inputm").value;
    }
  });

  console.log("modificaste un producto");
  console.log(pedido);
  refresh();
  document.getElementById("formulario").reset();
  actualizarTabla(pedido);
  calcTotal();
  document.getElementById("subtotal").innerHTML = calcTotal();

  nombre_input.value = "";
  descripcion_input.value = "";
  precio_input.value = "";
}

//Eliminar producto ---------------------------------------------------------------------v

//Capturamos btn
let eliminarProductoBtn = document.getElementById("eliminar-productos-btn");

const selectE = document.getElementById("selectProductE");
selectE.addEventListener("change", function () {
  const selectedProductId = selectE.value;
});

//Adjunto el evento
eliminarProductoBtn.addEventListener("click", () => {
  eliminarProducto(selectE.value);
});

function eliminarProducto(productId) {
  let indice = 0;
  pedido.forEach((producto) => {
    if (producto.id == productId) {
      pedido.splice(indice, 1);
      console.log("eliminaste un producto");
      console.log(pedido);
    }
    indice++;
  });

  actualizarTabla(pedido);

  document.getElementById("subtotal").innerHTML = calcTotal();
  calcTotal();
  refresh();
}

//imagenes

let imagenes = [
  { name: "Sin foto", path: "sin-foto.jpg" },
  { name: "Agua", path: "agua.png" },
  { name: "Alfajor de Maizena", path: "alfajor-maizena.png" },
  { name: "Arepa de carne", path: "arepa-carne.png" },
  { name: "Arepa", path: "arepa.png" },
  { name: "Baos", path: "baos.png" },
  { name: "Canelones", path: "canelones.png" },
  { name: "Capuchino", path: "capuchino.png" },
  { name: "Chorizo a la parrilla", path: "chorizo.png" },
  { name: "Churro de Dulce de leche", path: "churro-ddl.png" },
  { name: "Churro de Nutella", path: "churro-nutella.png" },
  { name: "Crepa", path: "crepa.png" },
  { name: "Croisant de Salmón", path: "croisant-salmon.png" },
  { name: "Donas rellenas", path: "donas.png" },
  { name: "Dumplings", path: "dumplings.png" },
  { name: "Empanadas", path: "empanadas.png" },
  { name: "Café Expreso", path: "expresso.png" },
  { name: "Fideos Penne al Pesto", path: "fideos-penne-al-pesto.png" },
  { name: "Medialunas de jamón y queso", path: "medialuna-jyq.png" },
  { name: "Medialunas", path: "medialunas.png" },
  { name: "Milanesa con Pure", path: "mila-con-pure.png" },
  { name: "Milanesa napolitana", path: "milanesa-napolitana.png" },
  { name: "Ñoquis", path: "noquis.png" },
  { name: "Papas Fritas", path: "papas-fritas.png" },
  { name: "Pizza", path: "pizza.png" },
  { name: "Ensalada de sushi", path: "poke-salads.png" },
  { name: "Postre de chocolate", path: "postre-choco.png" },
  { name: "Provoleta a la plancha", path: "provoleta.png" },
  { name: "Sorrentinos", path: "sorrentinos.png" },
  { name: "Sushi rolls 10pz", path: "sushi-rolls.png" },
  { name: "Sushi rolls 23pz", path: "sushi-rolls-promo.png" },
  { name: "Tequeños", path: "tequeños.png" },
  { name: "Tostado", path: "tostado.png" },
  { name: "Wraps", path: "wraps.png" },
  { name: "Parrillada", path: "parrillada.png" },
  { name: "Combo MC Donalds", path: "combo-mc.webp" },
];

let selectImg = document.getElementById("listadoImgCrear");
imagenes.forEach(function (imagenes) {
  selectImg.innerHTML += `<option value="${imagenes.name}">${imagenes.name}</option>`;
});

selectImg.addEventListener("change", function () {
  let crearImg = document.getElementById("crearImg");
  const selectedImagenName = selectImg.value;
  const selectedImagen = findImageByName(selectedImagenName);
  crearImg.innerHTML = `<img
  src="img/${selectedImagen.path}"
  class="img-fluid rounded float-right img-thumbnail"
  alt=""
/>`;
});

function findImageByName(name) {
  for (let i = 0; i < imagenes.length; i++) {
    if (imagenes[i].name == name) {
      return imagenes[i];
    }
  }
  return null;
}


let selectImgM = document.getElementById("listadoImgModificar");
imagenes.forEach(function (imagenes) {
  selectImgM.innerHTML += `<option value="${imagenes.name}">${imagenes.name}</option>`;
});

selectImgM.addEventListener("change", function () {
  let crearImgM = document.getElementById("crearImgM");
  const selectedImagenNameM = selectImgM.value;
  const selectedImagenM = findImageMByName(selectedImagenNameM);
  crearImgM.innerHTML = `<img
  src="img/${selectedImagenM.path}"
  class="img-fluid rounded float-right img-thumbnail"
  alt=""
/>`;
});

function findImageMByName(name) {
  for (let i = 0; i < imagenes.length; i++) {
    if (imagenes[i].name == name) {
      return imagenes[i];
    }
  }
  return null;
}
console.log(imagenes);
console.log(selectImg.value);

