// home.js
document.addEventListener("DOMContentLoaded", () => {
  /* ========= Estado de conexión ========= */
  const status = document.getElementById("connectionStatus");
  const statusText = document.getElementById("connectionText");
  const statusIcon = document.getElementById("connectionIcon");

  let isOffline = true;

  if (status && statusText && statusIcon) {
    status.addEventListener("click", () => {
      isOffline = !isOffline;

      if (isOffline) {
        statusText.textContent = "Sin conexión";
        statusIcon.textContent = "wifi_off";
        status.style.backgroundColor = "rgba(255, 107, 107, 0.2)";
        statusText.style.color = "#ff6b6b";
        statusIcon.style.color = "#ff6b6b";
      } else {
        statusText.textContent = "Conectado";
        statusIcon.textContent = "wifi";
        status.style.backgroundColor = "rgba(34, 197, 94, 0.18)"; // verde suave
        statusText.style.color = "#4ade80";
        statusIcon.style.color = "#4ade80";
      }
    });
  }

  /* ========= Botón "Crear rutina" ========= */
  const createRoutineBtn = document.getElementById("createRoutineBtn");

  if (createRoutineBtn) {
    createRoutineBtn.addEventListener("click", () => {
      // Ruta de la página para crear una nueva rutina
      // 👉 Cambia esta ruta si tu estructura de carpetas es distinta
      const url = "/Crear Rutina/crear-rutina.html";
      window.location.href = url;
    });
  }

  /* ========= Botones de Rutinas ========= */
  const routineButtons = document.querySelectorAll("[data-routine]");

  routineButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-routine") || "manana";

      // Abre una NUEVA pestaña con la página de rutina
      // Ajusta la ruta si la carpeta es distinta
      const url = `/Crear Rutina/crear-rutina.html?rutina=${encodeURIComponent(id)}`;
      window.open(url, "_blank");
    });
  });

  /* ========= Navegación inferior ========= */
  const routes = {
    rutinas: "/Home/home.html",       // esta pantalla
    comunicar: "/Comunicar/comunicar.html",
    progreso: "/Progreso/progreso.html",
    emociones: "/Emociones/emociones.html",
    ajustes: "/Ajustes/ajustes.html",
  };

  const navLinks = document.querySelectorAll("[data-nav]");

  navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const key = link.getAttribute("data-nav");
      const target = routes[key];

      if (target) {
        window.location.href = target;
      }
    });
  });
});
