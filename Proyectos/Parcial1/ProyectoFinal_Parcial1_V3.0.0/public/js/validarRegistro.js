document.getElementById('registerForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const email = document.getElementById('email').value.trim();
  const confirmEmail = document.getElementById('confirm_email').value.trim();
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirm_password').value;
  const terms = document.getElementById('terms').checked;
  const captchaResponse = grecaptcha.getResponse();

  if (email === '' || confirmEmail === '') {
    mostrarModalRegistroError('Por favor completa ambos campos de correo.');
    return;
  }

  if (email !== confirmEmail) {
    mostrarModalRegistroError('Los correos electrónicos no coinciden.');
    return;
  }

  if (password === '' || confirmPassword === '') {
    mostrarModalRegistroError('Por favor completa ambos campos de contraseña.');
    return;
  }

  if (password !== confirmPassword) {
    mostrarModalRegistroError('Las contraseñas no coinciden.');
    return;
  }

  if (!terms) {
    mostrarModalRegistroError('Debes aceptar los términos y condiciones.');
    return;
  }

  if (captchaResponse.length === 0) {
    mostrarModalRegistroError('Por favor, verifica el captcha.');
    return;
  }

  // Guardar email y contraseña en localStorage
  localStorage.setItem('usuario_registrado', JSON.stringify({
    email: email,
    password: password
  }));

  // Mostrar modal de éxito
  const modal = new bootstrap.Modal(document.getElementById('registroExitosoModal'));
  modal.show();

  document.getElementById('irLoginBtn').onclick = function() {
    window.location.href = "login.html";
  };
});

function mostrarModalRegistroError(mensaje) {
  document.getElementById('registroErrorMsg').innerHTML = mensaje;
  var modal = new bootstrap.Modal(document.getElementById('registroErrorModal'));
  modal.show();
}
