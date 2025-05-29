document.getElementById('menuIcon').addEventListener('click', () => {
  const sidebar = document.getElementById('sidebar');
  const isVisible = sidebar.style.right === '0px';
  sidebar.style.right = isVisible ? '-220px' : '0px';
});
