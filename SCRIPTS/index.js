document.addEventListener('DOMContentLoaded', () => {
  const contenedor = document.getElementById('personajesAdmin') || document.querySelector('.PERSONAJES');
  if (!contenedor) return;

  fetch('/api/personajes')
    .then(res => res.json())
    .then(personajes => {
      contenedor.innerHTML = personajes.map(personaje => `
        <div class="PERSONAJE">
          <a href="../HTML/web2.html?id=${personaje.id}">
            <img src="/IMAGES/${personaje.imagen.replace(/^.*[\\/]/, '')}" alt="${personaje.nombre}">
          </a>
          <p><strong>${personaje.nombre.toUpperCase()}</strong></p>
        </div>
      `).join('');
    });

  const userIcon = document.getElementById('userIcon');
  const userDropdown = document.getElementById('userDropdown');

  if (userIcon && userDropdown) {
    userIcon.addEventListener('click', () => {
      userDropdown.style.display = userDropdown.style.display === 'block' ? 'none' : 'block';
    });

    document.addEventListener('click', (event) => {
      if (!event.target.closest('.user-menu-container')) {
        userDropdown.style.display = 'none';
      }
    });
  }
});