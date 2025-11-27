// rutina.js
document.addEventListener("DOMContentLoaded", () => {
  /* ========= Config según la rutina (viene por ?rutina=...) ========= */
  const params = new URLSearchParams(window.location.search);
  const routineId = params.get("rutina") || "manana";

  const routines = {
    manana: {
      title: "Hora de prepararse",
      nextTitle: "Lavar los dientes",
      nextText: "Es hora de ir al baño a cepillarse.",
      durationSeconds: 120, // 2 minutos
    },
    tareas: {
      title: "Hora de enfocarse",
      nextTitle: "Empezar la primera tarea",
      nextText: "Busca tu cuaderno y materiales para comenzar.",
      durationSeconds: 180, // 3 minutos
    },
    higiene: {
      title: "Hora de cuidarse",
      nextTitle: "Ir al baño",
      nextText: "Ve al baño para iniciar tu rutina de higiene.",
      durationSeconds: 150,
    },
    sueno: {
      title: "Hora de relajarse",
      nextTitle: "Preparar la cama",
      nextText: "Ordena tu cama y busca tu peluche o manta favorita.",
      durationSeconds: 120,
    },
  };

  const cfg = routines[routineId] || routines.manana;

  /* ========= Referencias al DOM ========= */
  const screenTitle = document.getElementById("screenTitle");
  const nextActivityTitle = document.getElementById("nextActivityTitle");
  const nextActivityText = document.getElementById("nextActivityText");

  const countdownLabel = document.getElementById("countdownLabel");
  const countdownTime = document.getElementById("countdownTime");
  const countdownPath = document.getElementById("countdownPath");

  const readyButton = document.getElementById("readyButton");
  const snoozeButton = document.getElementById("snoozeButton");

  const connectionButton = document.getElementById("connectionButton");
  const connectionIcon = document.getElementById("connectionIcon");

  // Pintamos textos según la rutina
  if (screenTitle) screenTitle.textContent = cfg.title;
  if (nextActivityTitle) nextActivityTitle.textContent = cfg.nextTitle;
  if (nextActivityText) nextActivityText.textContent = cfg.nextText;

  /* ========= Temporizador ========= */
  let totalSeconds = cfg.durationSeconds;
  let remainingSeconds = totalSeconds;
  let timerId = null;
  let finished = false;

  function formatTime(seconds) {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    const mm = String(m).padStart(2, "0");
    const ss = String(s).padStart(2, "0");
    return `${mm}:${ss}`;
  }

  function updateTimerText() {
    if (!countdownTime || !countdownLabel || !countdownPath) return;

    countdownTime.textContent = formatTime(remainingSeconds);

    if (remainingSeconds <= 0) {
      countdownLabel.textContent = "Tiempo terminado";
    } else {
      const minutes = Math.ceil(remainingSeconds / 60);
      if (minutes === 1) {
        countdownLabel.textContent = "Queda 1 minuto";
      } else {
        countdownLabel.textContent = `Quedan ${minutes} minutos`;
      }
    }

    // Actualizar círculo (0-100)
    const progress = Math.max(0, (remainingSeconds / totalSeconds) * 100);
    countdownPath.setAttribute("stroke-dasharray", `${progress}, 100`);
  }

  function startTimer() {
    updateTimerText();
    timerId = setInterval(() => {
      if (remainingSeconds > 0) {
        remainingSeconds -= 1;
        updateTimerText();
      } else {
        clearInterval(timerId);
        finished = true;
      }
    }, 1000);
  }

  // Iniciar automáticamente
  startTimer();

  // Botón "¡Estoy listo!"
  if (readyButton) {
    readyButton.addEventListener("click", () => {
      if (timerId) clearInterval(timerId);
      finished = true;
      remainingSeconds = 0;
      updateTimerText();
      alert("¡Genial! Pasemos a la siguiente actividad.");

      // Si se abrió desde otra pestaña, intenta cerrarse; si no, vuelve a home
      if (window.opener) {
        window.close();
      } else {
        window.location.href = "home.html";
      }
    });
  }

  // Botón "Posponer 5 min"
  if (snoozeButton) {
    snoozeButton.addEventListener("click", () => {
      const extra = 5 * 60; // 5 minutos
      totalSeconds += extra;
      remainingSeconds += extra;
      finished = false;
      if (!timerId) {
        startTimer();
      } else {
        updateTimerText();
      }
    });
  }

  /* ========= Wifi: Sin conexión / Conectado ========= */
  let isOffline = true;
  if (connectionButton && connectionIcon) {
    connectionButton.addEventListener("click", () => {
      isOffline = !isOffline;

      if (isOffline) {
        connectionIcon.textContent = "wifi_off";
        connectionIcon.style.color = "#f97373";
      } else {
        connectionIcon.textContent = "wifi";
        connectionIcon.style.color = "#4ade80";
      }
    });
  }

  /* ========= Navegación inferior ========= */
  const routes = {
    rutinas: "/Home/home.html",
    comunicar: "/Comunicar/comunicar.html",
    progreso: "/Progreso/progreso.html",
    emociones: "/Emociones/emociones.html",
    ajustes: "ajustes.html",
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
