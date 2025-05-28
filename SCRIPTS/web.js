const params = new URLSearchParams(window.location.search);
const personajeId = params.get("id");

const contenedor = document.getElementById("CONTENEDOR-PERSONAJES");

fetch("../JSON/personajes.json")
  .then(res => res.json())
  .then(data => {
    const personaje = data.find(p => p.id === personajeId);

    if (!personaje) {
      contenedor.innerHTML = "<p>No hay informacion del personaje</p>";
      return;
    }

    contenedor.innerHTML = `
      <img src="${personaje.imagen}" alt="${personaje.nombre}">
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
  })

