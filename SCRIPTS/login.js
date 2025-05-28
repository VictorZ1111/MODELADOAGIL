document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('formLogin');

  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    const usuario = form.usuario.value.trim();
    const contrasena = form.contrasena.value.trim();

    try {
      const res = await fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ usuario, contrasena })
      });

      if (res.ok) {
        // Guardar el rol (de momento asumimos solo admin puede loguearse)
        localStorage.setItem('rol', 'admin');
        window.location.href = '/HTML/admininicio.html';
      } else {
        const errorText = await res.text();
        alert(errorText || 'Error al iniciar sesión');
      }
    } catch (err) {
      console.error('Error al enviar el login:', err);
      alert('Error de red o del servidor');
    }
  });
});
