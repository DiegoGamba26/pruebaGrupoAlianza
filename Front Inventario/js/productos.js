const apiUrl = "https://localhost:44349/api/products"; // Ajusta el puerto si es diferente

async function cargarProductos() {
  const nombre = document.getElementById("filtroNombre").value;
  const categoria = document.getElementById("filtroCategoria").value;

  let url = `${apiUrl}?`;
  if (nombre) url += `name=${encodeURIComponent(nombre)}&`;
  if (categoria) url += `category=${encodeURIComponent(categoria)}`;

  const resp = await fetch(url);
  const productos = await resp.json();

  const tabla = document.getElementById("tablaProductos");
  tabla.innerHTML = "";

  productos.forEach(p => {
    tabla.innerHTML += `
    <tr>
      <td>${p.nombre}</td>
      <td>${p.categoria}</td>
      <td>$${p.precio}</td>
      <td>${p.stock}</td>
      <td>
        <a href="editar.html?id=${p.id}" class="btn btn-sm btn-warning" title="✏️ Editar producto">
          ✏️
        </a>
        <button onclick="eliminar(${p.id})" class="btn btn-sm btn-danger" title="🗑️ Eliminar producto">
          🗑️
        </button>
       <button class="btn btn-sm btn-success" title="Comprar">
  <i class="fas fa-cart-plus"></i>
</button>
        <button onclick="vender(${p.id})" class="btn btn-sm btn-secondary" title="📦 Vender (aumenta stock)">
          📦
        </button>
      </td>
    </tr>
  `;
  });
}

async function eliminar(id) {
  if (confirm("¿Eliminar producto?")) {
    await fetch(`${apiUrl}/${id}`, { method: "DELETE" });
    cargarProductos();
  }
}

async function comprar(id) {
  await fetch(`${apiUrl}/comprar/${id}`, { method: "PATCH" });
  cargarProductos();
}

async function vender(id) {
  await fetch(`${apiUrl}/vender/${id}`, { method: "PATCH" });
  cargarProductos();
}

window.onload = cargarProductos;
