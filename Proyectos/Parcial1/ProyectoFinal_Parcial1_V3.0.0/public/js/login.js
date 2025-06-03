window.onload = function() {
  // Autocompletar email si existe
  const usuario = JSON.parse(localStorage.getItem('usuario_registrado'));
  if (usuario && usuario.email) {
    const emailInput = document.querySelector('input[type="email"]');
    if (emailInput) emailInput.value = usuario.email;
  }

  // Validar login
  const form = document.querySelector('form');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      const email = form.querySelector('input[type="email"]').value.trim();
      const password = form.querySelector('input[type="password"]').value;

      // Datos de admin
      const adminEmail = "admin@admin.com";
      const adminPass = "admin123";

      // Si es admin, redirige a indexadmin.html
      if (email === adminEmail && password === adminPass) {
        window.location.href = "../../indexadmin.html";
        return;
      }

      // Si es usuario normal, valida con localStorage
      if (!usuario || email !== usuario.email || password !== usuario.password) {
        // Mostrar modal de error
        const modal = new bootstrap.Modal(document.getElementById('loginErrorModal'));
        modal.show();
        return;
      }
      // Redirige a index normal
      window.location.href = "../../index.html";
    });
  }
};