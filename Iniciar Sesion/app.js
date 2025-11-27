// Iniciar Sesion/app.js
document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  const passwordInput = document.getElementById("password");
  const togglePasswordBtn = document.getElementById("togglePassword");

  // 1) Enviar formulario de inicio de sesión
  if (loginForm) {
    loginForm.addEventListener("submit", (event) => {
      event.preventDefault(); // evita recarga

      const email = document.getElementById("email").value.trim();
      const password = passwordInput.value.trim();

      // Validación mínima
      if (!email || !password) {
        alert("Por favor, completa tu correo y contraseña.");
        return;
      }

      // ✅ Redirección al Onboarding
      window.location.href = "../Onboarding Inicial/onboarding.html";
    });
  }

  // 2) Mostrar / ocultar contraseña (opcional pero útil)
  if (togglePasswordBtn && passwordInput) {
    const icon = togglePasswordBtn.querySelector(".material-symbols-outlined");

    togglePasswordBtn.addEventListener("click", () => {
      const isPassword = passwordInput.type === "password";
      passwordInput.type = isPassword ? "text" : "password";

      if (icon) {
        icon.textContent = isPassword ? "visibility_off" : "visibility";
      }
    });
  }
});
