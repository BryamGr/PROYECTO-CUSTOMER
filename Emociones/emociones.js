// emociones.js
document.addEventListener("DOMContentLoaded", () => {
  /* ========= Estado de conexión en el header ========= */
  const connButton = document.getElementById("emotionConnectionButton");
  const connIcon = document.getElementById("emotionConnectionIcon");
  const connText = document.getElementById("emotionConnectionText");

  let isOffline = true;

  if (connButton && connIcon && connText) {
    connButton.addEventListener("click", () => {
      isOffline = !isOffline;

      if (isOffline) {
        connIcon.textContent = "wifi_off";
        connIcon.classList.remove("text-emerald-400");
        connIcon.classList.add("text-zinc-500", "dark:text-zinc-400");
        connText.textContent = "Sin conexión";
        connText.classList.remove("text-emerald-400");
      } else {
        connIcon.textContent = "wifi";
        connIcon.classList.remove("text-zinc-500", "dark:text-zinc-400");
        connIcon.classList.add("text-emerald-400");
        connText.textContent = "Conectado";
        connText.classList.add("text-emerald-400");
      }
    });
  }

  /* ========= Selección de emoción ========= */
  const emotionButtons = document.querySelectorAll("[data-emotion]");
  const feedback = document.getElementById("emotionFeedback");

  const emotionMessages = {
    "muy-calmado": {
      label: "Muy calmado",
      message: "¡Qué bien! Este es un buen momento para seguir con tus actividades o ayudar a otra persona.",
    },
    "tranquilo": {
      label: "Tranquilo",
      message: "Estás en un punto cómodo. Si algo cambia, puedes volver a decirnos cómo te sientes.",
    },
    "inquieto": {
      label: "Un poco inquieto",
      message: "Gracias por contarlo. Tal vez una pequeña pausa, respirar profundo o moverte un poco pueda ayudar.",
    },
    "estresado": {
      label: "Estresado",
      message: "Es importante cuidar tu cuerpo y mente. Puedes pedir apoyo, hacer una pausa o usar una actividad calmante.",
    },
    "abrumado": {
      label: "Abrumado",
      message: "Sentirse así puede ser muy difícil. Avísale a tu cuidador o profesional para que te acompañe un momento.",
    },
    "crisis": {
      label: "En crisis",
      message: "Es muy importante que alguien cercano te acompañe ahora. Pide ayuda inmediatamente a tu cuidador o profesional.",
    },
  };

  emotionButtons.forEach((btn) => {
    btn.classList.add("hover:-translate-y-0.5", "hover:shadow-md");

    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-emotion");
      const config = emotionMessages[id] || null;

      // Quitar selección previa
      emotionButtons.forEach((b) => {
        b.classList.remove("ring-4", "ring-primary", "shadow-lg", "scale-105");
      });

      // Marcar botón activo
      btn.classList.add("ring-4", "ring-primary", "shadow-lg", "scale-105");

      // Actualizar mensaje
      if (feedback && config) {
        feedback.textContent = `Has elegido: ${config.label}. ${config.message}`;
      } else if (feedback) {
        feedback.textContent = "Gracias por compartir cómo te sientes.";
      }
    });
  });

  /* ========= Navegación inferior ========= */
  const routes = {
    rutinas: "/Home/home.html",
    comunicar: "/Comunicar/comunicar.html",
    progreso: "/Progreso/progreso.html",
    emociones: "/Emociones/emociones.html", // esta misma
    ajustes: "/Ajustes/ajustes.html",
  };

  const navLinks = document.querySelectorAll("[data-nav]");

  navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const key = link.getAttribute("data-nav");
      const target = routes[key];

      // No recargar si ya estás en emociones
      if (target && key !== "emociones") {
        window.location.href = target;
      }
    });
  });
});
