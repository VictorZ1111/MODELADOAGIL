const params = new URLSearchParams(window.location.search);
const personajeId = params.get("id");

const contenedor = document.getElementById("CONTENEDOR-PERSONAJES");

fetch(`/api/personajes/${personajeId}`)
  .then(res => res.json())
  .then(personaje => {
    if (!personaje || personaje.error) {
      contenedor.innerHTML = "<p>No hay informacion del personaje</p>";
      return;
    }

    contenedor.innerHTML = `
      <img src="/${personaje.imagen}" alt="${personaje.nombre}">
      <h1>${personaje.nombre}</h1>

      <h2>Habilidades</h2>
      ${personaje.habilidades.map(h => `
        <div class="HABILIDADES">
          <strong>${h.nombre}</strong>
          <p>${h.descripcion}</p>
          <p><strong>OBTENCION:</strong> ${h.como_conseguir}</p>
        </div>
      `).join("")}

      <h2>Tiros</h2>
      ${personaje.tiros.map(t => `
        <div class="HABILIDADES">
          <strong>${t.nombre}</strong>
          <p>${t.descripcion}</p>
          <p><strong>OBTENCION:</strong> ${t.como_conseguir}</p>
        </div>
      `).join("")}
    `;
  });

document.addEventListener('DOMContentLoaded', () => {
  const btnVolver = document.getElementById('btnVolver');
  if (btnVolver) {
    btnVolver.addEventListener('click', (e) => {
      e.preventDefault(); // Previene que el <a> actúe con su href (aunque no lo tenga)
      const rol = localStorage.getItem('rol');
      if (rol === 'admin') {
        window.location.href = '../HTML/admininicio.html';
      } else {
        window.location.href = '../index.html';
      }
    });
  }
});

