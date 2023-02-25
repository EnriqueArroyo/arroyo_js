

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
//Creo las instancias de los productos que voy a usar inicialmente como precreados
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


// Cargo los datos de Local Store y los paso 
const almacenados = JSON.parse(localStorage.getItem("productos")) || [producto1, producto2, producto3, producto4];
actualizarTabla(almacenados);
const guardarLocal = (clave, valor) => {
  localStorage.setItem(clave, valor);
};

guardarLocal("productos", JSON.stringify(almacenados));



console.log(almacenados);

// Carga los productos del arreglo de pedido en pantalla
refresh(almacenados);

function refresh(productos) {
  let cardContainer = document.getElementById("card_container");
  cardContainer.innerHTML = ``;
  productos.forEach((producto) => {
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
      <p class="card-text">$${producto.precio}</p>
    </div>
    <div class="card-footer">
      <button
        id=""
        onclick="disminuir(${almacenados.indexOf(producto)})"
        value="decrease"
      >
        -
      </button>

      <div class="contador_contenedor">
        <h1 id="${almacenados.indexOf(producto)}" value="">${
      producto.cantidad
    }</h1>
      </div>

      <button id="add-button" onclick="aumentar(${almacenados.indexOf(
        producto
      )})">
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

  almacenados.forEach((producto) => {
    selectProduct.innerHTML += `<option value="${producto.id}">${producto.nombre}</option>`;
  });
}
//Select del Eliminar | Lista los productos creados en el selector en la seccion eliminar producto
function listarProductosE() {
  let selectProductE = document.getElementById("selectProductE");
  selectProductE.innerHTML = `<option value="">Seleccione un producto</option>`;

  almacenados.forEach((producto) => {
    selectProductE.innerHTML += `<option value="${producto.id}">${producto.nombre}</option>`;
  });
}

//Calcula el total del pedido mas el envio
calcTotal();

//Funcion para agregar cantidad al producto
function aumentar(index) {
  let producto = almacenados[index];
  producto.cantidad++;
  refrescar(index);
  calcTotal();
  actualizarTabla(almacenados);
  console.log(
    `Añadiste un ${producto.nombre} y ahora hay${producto.cantidad} en el pedido`
  );
  localStorage.setItem("productos", JSON.stringify(almacenados));

  Toastify({
    text: "Se añadio " + producto.nombre,
    duration: 3000,
    newWindow: false,
    close: false,
    gravity: "bottom", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: "#ffffffc4",
      color: "black",
      border: "solid 1px #ffc45f",
      height: "45px",
      padding: "10px",
    },
    onClick: function () {}, // Callback after click
  }).showToast();

  return producto.cantidad;
}
//Funcion para disminuir la cantidad al producto. Cuenta con una validacion para productos que ya estan en 0
function disminuir(index) {
  let producto = almacenados[index];
  if (producto.cantidad > 0) {
    producto.cantidad--;
    refrescar(index);
    localStorage.setItem("productos", JSON.stringify(almacenados));

    console.log(
      `quitaste un ${producto.nombre} y ahora hay${producto.cantidad} en el pedido`
    );
    calcTotal();
    actualizarTabla(almacenados);
    Toastify({
      text: "Se quito " + producto.nombre,
      duration: 3000,
      newWindow: false,
      close: false,
      gravity: "bottom", // `top` or `bottom`
      position: "right", // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
        background: "#ffffffc4",
        color: "black",
        border: "solid 1px #ffc45f",
        height: "45px",
        padding: "10px",
      },
      onClick: function () {}, // Callback after click
    }).showToast();
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
  almacenados.forEach((producto) => {
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
  let producto = almacenados[index];
  document.getElementById(index).innerHTML = producto.cantidad;
  document.getElementById("subtotal").innerHTML = calcTotal();
  actualizarTabla(almacenados);
  localStorage.setItem("productos", JSON.stringify(almacenados));
}

//Funcion que actualiza la tabla donde se listan los productos seleccionados por el usuario
//Se llama al iniciar el html, al agregar y disminuir cantidades para que se refresquen los valores
function actualizarTabla(pedido) {
  var tabla = document.querySelector("#pedido");
  var tbody = tabla.querySelector("tbody");

  // Funcion que limpia los datos viejos en caso de que haya
  tbody.innerHTML = "";

  // Funcion que recorre el arreglo de objetos
  almacenados.forEach(function (objeto) {
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
  setTimeout(() => {
    cargarProducto(almacenados);
  }, 500);
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
  console.log(almacenados);
  console.log("hiciste clic");
  refresh(almacenados);
  Toastify({
    text: "Se creo " + producto.nombre,
    duration: 3000,
    newWindow: false,
    close: false,
    gravity: "bottom", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: "#ffffffc4",
      color: "black",
      border: "solid 1px #ffc45f",
      height: "45px",
      padding: "10px",
    },
    onClick: function () {}, // Callback after click
  }).showToast();
  document.getElementById("formulario").reset();
  localStorage.setItem("productos", JSON.stringify(almacenados));
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
  almacenados.forEach((producto) => {
    if (producto.id == productId) {
      producto.nombre = document.getElementById("nombre-inputm").value;
      producto.descripcion =
        document.getElementById("descripcion-inputm").value;
      producto.precio = document.getElementById("precio-inputm").value;
      producto.imagen = buscarImagenPorNombre(
        document.getElementById("listadoImgModificar").value
      ).ruta;
      Toastify({
        text: "Se modifico " + producto.nombre,
        duration: 3000,
        newWindow: false,
        close: false,
        gravity: "bottom", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "#ffffffc4",
          color: "black",
          border: "solid 1px #ffc45f",
          height: "45px",
          padding: "10px",
        },
        onClick: function () {}, // Callback after click
      }).showToast();
    }
  });
  console.log("modificaste un producto");
  console.log(almacenados);
  refresh(almacenados);
  document.getElementById("formulario").reset();
  actualizarTabla(almacenados);
  calcTotal();
  document.getElementById("subtotal").innerHTML = calcTotal();
  localStorage.setItem("productos", JSON.stringify(almacenados));

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
  almacenados.forEach((producto) => {
    if (producto.id == productId) {
      Toastify({
        text: "Se elimino " + producto.nombre,
        duration: 3000,
        newWindow: false,
        close: false,
        gravity: "bottom", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "#ffffffc4",
          color: "black",
          border: "solid 1px #ffc45f",
          height: "45px",
          padding: "10px",
        },
        onClick: function () {}, // Callback after click
      }).showToast();
      almacenados.splice(indice, 1);
      console.log("eliminaste un producto");
      console.log(almacenados);
    }
    indice++;
  });
  actualizarTabla(almacenados);
  document.getElementById("subtotal").innerHTML = calcTotal();
  calcTotal();
  refresh(almacenados);
  localStorage.setItem("productos", JSON.stringify(almacenados));
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
  for (let i = 0; i < almacenados.length; i++) {
    if (almacenados[i].id == productId) {
      return almacenados[i];
    }
  }
  //Limpiamos los formularios para la proxima carga de datos
  nombre_input.value = "";
  descripcion_input.value = "";
  precio_input.value = "";
  return null;
}

//Buscador
const searchInput = document.querySelector(".form-control");
searchInput.addEventListener("input", () => {
  const searchTerm = searchInput.value.trim().toLowerCase();
  const filteredProductos = almacenados.filter((producto) =>
    producto.nombre.toLowerCase().includes(searchTerm)
  );
  refresh(filteredProductos);
});

//Nuevo Aleatorio (consiste en una funcion que crea un producto aleatorio, es mas para testing de forma de no tener que cargar productos a mano)------------------------------------------------------------------- v
//Capturamos btn

let cargarProductoBtn = document.getElementById("nuevo-aleatorio");
//Adjunto el evento
cargarProductoBtn.addEventListener("click", () => {
  setTimeout(() => {
    cargarAleatorio(almacenados);
  }, 500);
});

function cargarAleatorio(array) {
  let id_max = 0;
  array.forEach((producto) => {
    if (producto.id > id_max) {
      id_max = producto.id;
    }
  });
  console.log("El id máximo es =" + id_max);

  //Arreglos para tomar los datos aleatorios
  let nombres = [
    "Galletas",
    "Cerveza",
    "Pasta",
    "Yogurt",
    "Leche",
    "Queso",
    "Pan",
    "Jugo",
    "Café",
    "Chocolate",
    "Ñoquis",
    "Pizza",
    "Empanadas",
    "Milanesas",
    "Hamburguesa",
    "Sushi",
    "Tacos",
    "Ensalada",
    "Churrasco",
    "Wok",
    "Sopa",
    "Pescado",
    "Pastas",
    "Pollo",
    "Carne",
    "Risotto",
    "Ramen",
    "Fajitas",
    "Curry",
    "Ceviche",
    "Cordero",
    "Bruschetta",
    "Tostadas",
    "Kebab",
    "Cangrejo",
    "Asado",
    "Tortilla",
    "Wrap",
    "Tartar",
    "Quiche",
  ];
  let descripciones = [
    "Delicioso",
    "Saludable",
    "Refrescante",
    "Nutritivo",
    "Energizante",
    "Con vitaminas",
    "Bajo en calorías",
    "Con sabor a frutas",
    "Con trozos de chocolate",
    "Recién horneado",
    "Deliciosa opción para toda la familia",
    "Combinación perfecta de sabores",
    "Ideal para compartir",
    "La opción más saludable",
    "Hecho con los mejores ingredientes",
    "Un clásico de siempre",
    "No te pierdas esta delicia",
    "Increíblemente sabroso",
    "El plato más popular",
    "Irresistible sabor y textura",
    "La opción vegetariana",
    "Lo mejor de la cocina internacional",
    "Una delicia para el paladar",
    "La alternativa más fresca y saludable",
    "Un verdadero manjar",
    "Un toque picante",
    "La opción más exótica",
    "El plato más sofisticado",
    "Una experiencia gastronómica única",
    "El toque gourmet",
    "Con ingredientes frescos de la huerta",
    "Una explosión de sabor en tu boca",
    "La opción más tradicional",
    "Una opción diferente y sabrosa",
    "Un plato que no te puedes perder",
  ];

  const precios = () => {
    const min = 1200;
    const max = 4500;
    const mult = 50;
    const rango = (max - min) / mult + 1;
    const total = Array.from({ length: rango }, (_, i) => min + i * mult);
    return total[Math.floor(Math.random() * total.length)];
  };
  console.log("Paso 3 ---------------------------------");
  function obtenerRutaAleatoria(imagenes) {
    const indiceAleatorio = Math.floor(Math.random() * imagenes.length);

    return imagenes[indiceAleatorio].ruta;
  }

  const producto = new Producto(
    id_max + 1,
    nombres[Math.floor(Math.random() * nombres.length)],
    precios(),
    0,
    descripciones[Math.floor(Math.random() * descripciones.length)],
    imagenes.length > 0 ? obtenerRutaAleatoria(imagenes) : ""
  );
  console.log("ruta aleatoria =", obtenerRutaAleatoria(imagenes));
  console.log("producto aleatorio =", producto);

  array.push(producto);
  console.log(almacenados);
  console.log("hiciste clic");
  console.log("Creaste un producto aleatorio");
  refresh(almacenados);
  Toastify({
    text: "Se creo " + producto.nombre,
    duration: 3000,
    newWindow: false,
    close: false,
    gravity: "bottom", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: "#ffffffc4",
      color: "black",
      border: "solid 1px #ffc45f",
      height: "45px",
      padding: "10px",
    },
    onClick: function () {}, // Callback after click
  }).showToast();
  localStorage.setItem("productos", JSON.stringify(almacenados));
}

// Comprar o finalizar compra -------------------------------------------------------
let finalizarVentaBtn = document.getElementById("finalizar-venta");
//Adjunto el evento
finalizarVentaBtn.addEventListener("click", () => {
  setTimeout(() => {
    finalizarVenta();
  }, 500);
});

function finalizarVenta() {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger",
    },
    buttonsStyling: false,
  });

  swalWithBootstrapButtons
    .fire({
      title: "Desea finalizar el pedido?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Finalizar",
      cancelButtonText: "Continuar comprando",
      reverseButtons: true,
    })
    .then((result) => {
      if (result.isConfirmed) {
        swalWithBootstrapButtons.fire(
          "Finalizado",
          "Muchas gracias por comprar!",
          "success"
        );

        almacenados.forEach((producto) => {
          producto.cantidad = 0;
        });

        actualizarTabla(almacenados);
        calcTotal();

        localStorage.setItem("productos", JSON.stringify(almacenados));
      }
    });
}
