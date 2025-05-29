document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('formPersonaje');
  if (!form) return;

  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    const id = form.elements['id'].value.trim();
    const nombre = form.elements['nombre'].value.trim();
    const imagen = form.elements['imagen'].value.trim();

    const habNombre = document.getElementById('hab-nombre').value.trim();
    const habDesc = document.getElementById('hab-desc').value.trim();
    const habCons = document.getElementById('hab-cons').value.trim();

    const tiroNombre = document.getElementById('tiro-nombre').value.trim();
    const tiroDesc = document.getElementById('tiro-desc').value.trim();
    const tiroCons = document.getElementById('tiro-cons').value.trim();

    if (!id || !nombre || !imagen || !habNombre || !habDesc || !habCons || !tiroNombre || !tiroDesc || !tiroCons) {
      alert('Todos los campos son obligatorios.');
      return;
    }

    const habilidades = [{
      nombre: habNombre,
      descripcion: habDesc,
      como_conseguir: habCons
    }];

    const tiros = [{
      nombre: tiroNombre,
      descripcion: tiroDesc,
      como_conseguir: tiroCons
    }];

    const data = { id, nombre, imagen, habilidades, tiros };

    const res = await fetch('/api/personajes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    if (res.ok) {
      alert('Personaje agregado correctamente');
      form.reset();
    } else {
      const error = await res.json();
      alert('Error: ' + (error.error || 'No autorizado'));
    }
  });

  // Código del icono de usuario
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
