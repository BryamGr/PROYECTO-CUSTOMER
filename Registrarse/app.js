// app.js
document.addEventListener("DOMContentLoaded", () => {
  /* ===========================
   *  LOGIN PAGE
   * ===========================
   */
  const loginForm = document.getElementById("loginForm");
  const loginRegisterLink = document.getElementById("registerLink");
  const loginPasswordInput = document.getElementById("password");
  const loginTogglePasswordBtn = document.getElementById("togglePassword");

  if (loginForm) {
    // Enviar login
    loginForm.addEventListener("submit", (event) => {
      event.preventDefault();
      // Aquí luego conectas con backend/Firebase
      window.location.href = "dashboard.html"; // página después de iniciar sesión
    });

    // Ir desde login a registro
    if (loginRegisterLink) {
      loginRegisterLink.addEventListener("click", (event) => {
        event.preventDefault();
        window.location.href = "registro.html";
      });
    }

    // Mostrar / ocultar contraseña en login
    if (loginPasswordInput && loginTogglePasswordBtn) {
      const icon = loginTogglePasswordBtn.querySelector(".material-symbols-outlined");
      loginTogglePasswordBtn.addEventListener("click", () => {
        const isPassword = loginPasswordInput.type === "password";
        loginPasswordInput.type = isPassword ? "text" : "password";
        if (icon) icon.textContent = isPassword ? "visibility_off" : "visibility";
      });
    }
  }

  /* ===========================
   *  REGISTER PAGE
   * ===========================
   */
  const registerForm = document.getElementById("registerForm");
  const goToLoginLink = document.getElementById("goToLogin");

  const registerPasswordInput = document.getElementById("registerPassword");
  const registerConfirmPasswordInput = document.getElementById("registerConfirmPassword");
  const toggleRegisterPasswordBtn = document.getElementById("toggleRegisterPassword");
  const toggleRegisterConfirmPasswordBtn = document.getElementById("toggleRegisterConfirmPassword");

  if (registerForm) {
    // Enviar registro
    registerForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const password = registerPasswordInput?.value || "";
      const confirm = registerConfirmPasswordInput?.value || "";

      if (password !== confirm) {
        alert("Las contraseñas no coinciden. Revísalas por favor.");
        return;
      }

      // Aquí iría la lógica real de registro (Firebase, API, etc.)
      alert("Cuenta creada con éxito 🎉 Ahora te llevamos a Loopi.");
      window.location.href = "dashboard.html";
    });

    // Ir desde registro a login
    if (goToLoginLink) {
      goToLoginLink.addEventListener("click", (event) => {
        event.preventDefault();
        window.location.href = "login.html";
      });
    }

    // Mostrar / ocultar contraseña principal
    if (registerPasswordInput && toggleRegisterPasswordBtn) {
      const icon = toggleRegisterPasswordBtn.querySelector(".material-symbols-outlined");
      toggleRegisterPasswordBtn.addEventListener("click", () => {
        const isPassword = registerPasswordInput.type === "password";
        registerPasswordInput.type = isPassword ? "text" : "password";
        if (icon) icon.textContent = isPassword ? "visibility_off" : "visibility";
      });
    }

    // Mostrar / ocultar confirmación de contraseña
    if (registerConfirmPasswordInput && toggleRegisterConfirmPasswordBtn) {
      const icon = toggleRegisterConfirmPasswordBtn.querySelector(".material-symbols-outlined");
      toggleRegisterConfirmPasswordBtn.addEventListener("click", () => {
        const isPassword = registerConfirmPasswordInput.type === "password";
        registerConfirmPasswordInput.type = isPassword ? "text" : "password";
        if (icon) icon.textContent = isPassword ? "visibility" : "visibility_off";
      });
    }
  }
});
