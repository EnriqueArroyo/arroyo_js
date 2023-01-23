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
  "Hamburguesa con bebida + fritas",
  "combo-mc.webp"
);
const producto4 = new Producto(
  4,
  "Medialunas",
  150.0,
  0,
  "Medialunas tipicas",
  "medialunas.png"
);

//Variable y constante para almacenar los valores del total y del envio
let total = 0;
const envio = 150;
document.getElementById("total").innerHTML = total;

//Creo un arreglo con los productos creados
const pedido = [producto1, producto2, producto3, producto4];

// Carga los productos del arreglo de pedido en pantalla
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

//Select del Modificar | Lista los productos creados en el selector en la seccion modificar producto
function listarProductos() {
  let selectProduct = document.getElementById("selectProduct");
  selectProduct.innerHTML = `<option value="">Seleccione un producto</option>`;

  pedido.forEach((producto) => {
    selectProduct.innerHTML += `<option value="${producto.id}">${producto.nombre}</option>`;
  });
}
//Select del Eliminar | Lista los productos creados en el selector en la seccion eliminar producto
function listarProductosE() {
  let selectProductE = document.getElementById("selectProductE");
  selectProductE.innerHTML = `<option value="">Seleccione un producto</option>`;

  pedido.forEach((producto) => {
    selectProductE.innerHTML += `<option value="${producto.id}">${producto.nombre}</option>`;
  });
}

//Calcula el total del pedido mas el envio
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

// Manejo de formularios de ventana modal

//Crear producto ------------------------------------------------------------------- v
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
    buscarImagenPorNombre(imagen_input.value).ruta
  );
  array.push(producto);
  console.log(pedido);
  console.log("hiciste clic");
  refresh();
  document.getElementById("formulario").reset();
}

// Modificar producto ------------------------------------------------------------------- v
const select = document.getElementById("selectProduct");
const nombre_input = document.getElementById("nombre-inputm");
const descripcion_input = document.getElementById("descripcion-inputm");
let precio_input = document.getElementById("precio-inputm");
let img_input = document.getElementById("crearImgM");
let select_input = document.getElementById("listadoImgModificar");

//Detectamos los cambios del selector para actualizar los formularios en pantalla y la imagen correspondiente al producto seleccionado
select.addEventListener("change", function () {
  const selectedProductId = select.value;
  const selectedProduct = buscarProductoPorID(selectedProductId);
  console.log(selectedProduct.imagen);
  if (selectedProduct != null) {
    nombre_input.value = selectedProduct.nombre;
    descripcion_input.value = selectedProduct.descripcion;
    precio_input.value = selectedProduct.precio;
    img_input.innerHTML = `<img
    src="img/${selectedProduct.imagen}"
    class="img-fluid rounded float-right img-thumbnail"
    alt=""
  />`;
    document.getElementById("listadoImgModificar").value = buscarImagenPorRuta(
      selectedProduct.imagen
    );
  }
});
let modificarProductoBtn = document.getElementById("modificar-productos-btn");
modificarProductoBtn.addEventListener("click", () => {
  modificarProducto(select.value);
});

//Modificamos el producto según su ID
function modificarProducto(productId) {
  pedido.forEach((producto) => {
    if (producto.id == productId) {
      producto.nombre = document.getElementById("nombre-inputm").value;
      producto.descripcion =
        document.getElementById("descripcion-inputm").value;
      producto.precio = document.getElementById("precio-inputm").value;
      producto.imagen = buscarImagenPorNombre(
        document.getElementById("listadoImgModificar").value
      ).ruta;
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
//Levantamos el producto seleccionado para obtener su ID desde su Value en el Select
const selectE = document.getElementById("selectProductE");
selectE.addEventListener("change", function () {
  const selectedProductId = selectE.value;
});

//Adjunto el evento para eliminar el producto seleccionado
eliminarProductoBtn.addEventListener("click", () => {
  eliminarProducto(selectE.value);
});

//Eliminamos el producto según su ID
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

//Arreglo de objetos imagen para guardar su nombre y ruta
let imagenes = [
  { nombre: "Sin foto", ruta: "sin-foto.jpg" },
  { nombre: "Agua", ruta: "agua.png" },
  { nombre: "Alfajor de Maizena", ruta: "alfajor-maizena.png" },
  { nombre: "Arepa de carne", ruta: "arepa-carne.png" },
  { nombre: "Arepa", ruta: "arepa.png" },
  { nombre: "Baos", ruta: "baos.png" },
  { nombre: "Canelones", ruta: "canelones.png" },
  { nombre: "Capuchino", ruta: "capuchino.png" },
  { nombre: "Chorizo a la parrilla", ruta: "chorizo.png" },
  { nombre: "Churro de Dulce de leche", ruta: "churro-ddl.png" },
  { nombre: "Churro de Nutella", ruta: "churro-nutella.png" },
  { nombre: "Crepa", ruta: "crepa.png" },
  { nombre: "Croisant de Salmón", ruta: "croisant-salmon.png" },
  { nombre: "Donas rellenas", ruta: "donas.png" },
  { nombre: "Dumplings", ruta: "dumplings.png" },
  { nombre: "Empanadas", ruta: "empanadas.png" },
  { nombre: "Café Expreso", ruta: "expresso.png" },
  { nombre: "Fideos Penne al Pesto", ruta: "fideos-penne-al-pesto.png" },
  { nombre: "Medialunas de jamón y queso", ruta: "medialuna-jyq.png" },
  { nombre: "Medialunas", ruta: "medialunas.png" },
  { nombre: "Milanesa con Pure", ruta: "mila-con-pure.png" },
  { nombre: "Milanesa napolitana", ruta: "milanesa-napolitana.png" },
  { nombre: "Ñoquis", ruta: "noquis.png" },
  { nombre: "Papas Fritas", ruta: "papas-fritas.png" },
  { nombre: "Pizza", ruta: "pizza.png" },
  { nombre: "Ensalada de sushi", ruta: "poke-salads.png" },
  { nombre: "Postre de chocolate", ruta: "postre-choco.png" },
  { nombre: "Provoleta a la plancha", ruta: "provoleta.png" },
  { nombre: "Sorrentinos", ruta: "sorrentinos.png" },
  { nombre: "Sushi rolls 10pz", ruta: "sushi-rolls.png" },
  { nombre: "Sushi rolls 23pz", ruta: "sushi-rolls-promo.png" },
  { nombre: "Tequeños", ruta: "tequeños.png" },
  { nombre: "Tostado", ruta: "tostado.png" },
  { nombre: "Wraps", ruta: "wraps.png" },
  { nombre: "Parrillada", ruta: "parrillada.png" },
  { nombre: "Combo MC Donalds", ruta: "combo-mc.webp" },
];

//Cargamos los Option y el Value del Select en la opcion de crear producto pasandole como dato el arreglo de imagenes
let selectImg = document.getElementById("listadoImgCrear");
imagenes.forEach(function (imagenes) {
  selectImg.innerHTML += `<option value="${imagenes.nombre}">${imagenes.nombre}</option>`;
});
//Detectamos los cambios en el select para actualizar la IMG que se visualiza segun el value del select
selectImg.addEventListener("change", function () {
  let crearImg = document.getElementById("crearImg");
  const selectedImagennombre = selectImg.value;
  const selectedImagen = buscarImagenPorNombre(selectedImagennombre);
  crearImg.innerHTML = `<img
  src="img/${selectedImagen.ruta}"
  class="img-fluid rounded float-right img-thumbnail"
  alt=""
/>`;
});

//Cargamos los Option y el Value del Select en la opcion de modificar producto pasandole como dato el arreglo de imagenes
let selectImgM = document.getElementById("listadoImgModificar");
imagenes.forEach(function (imagenes) {
  selectImgM.innerHTML += `<option value="${imagenes.nombre}">${imagenes.nombre}</option>`;
});
//Detectamos los cambios en el select para actualizar la IMG que se visualiza segun el value del select
selectImgM.addEventListener("change", function () {
  let crearImgM = document.getElementById("crearImgM");
  const selectedImagennombreM = selectImgM.value;
  const selectedImagenM = buscarImagenPorNombre(selectedImagennombreM);
  crearImgM.innerHTML = `<img
  src="img/${selectedImagenM.ruta}"
  class="img-fluid rounded float-right img-thumbnail"
  alt=""
/>`;
});

//Buscamos una imagen segun su nombre y retornamos el resultado
function buscarImagenPorNombre(nombre) {
  for (let i = 0; i < imagenes.length; i++) {
    if (imagenes[i].nombre == nombre) {
      return imagenes[i];
    }
  }
  return null;
}

//Buscamos una imagen segun su ruta y retornamos el resultado
function buscarImagenPorRuta(img) {
  let imagen = imagenes.find((imagen) => imagen.ruta == img);
  if (imagen) {
    return imagen.nombre;
  }
}
//Buscamos un producto segun su ID y retornamos el resultado
function buscarProductoPorID(productId) {
  for (let i = 0; i < pedido.length; i++) {
    if (pedido[i].id == productId) {
      return pedido[i];
    }
  }
  //Limpiamos los formularios para la proxima carga de datos
  nombre_input.value = "";
  descripcion_input.value = "";
  precio_input.value = "";
  return null;
}
