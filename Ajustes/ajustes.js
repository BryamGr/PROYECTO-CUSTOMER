    // ajustes.js
    document.addEventListener("DOMContentLoaded", () => {
    /* ========= Banner de conexión ========= */
    const offlineBanner = document.getElementById("offlineBanner");
    const offlineIcon = document.getElementById("offlineIcon");
    const offlineText = document.getElementById("offlineText");
    let isOffline = true;

    if (offlineBanner && offlineIcon && offlineText) {
        offlineBanner.addEventListener("click", () => {
        isOffline = !isOffline;

        if (isOffline) {
            offlineIcon.textContent = "wifi_off";
            offlineText.textContent = "Sin conexión";
        } else {
            offlineIcon.textContent = "wifi";
            offlineText.textContent = "Conectado";
        }
        });
    }

    /* ========= Botón atrás ========= */
    const backButton = document.getElementById("backButton");
    if (backButton) {
        backButton.addEventListener("click", () => {
        if (window.history.length > 1) {
            window.history.back();
        } else {
            window.location.href = "/Home/home.html";
        }
        });
    }

    /* ========= Slider de velocidad TTS ========= */
    const ttsSpeedTrack = document.getElementById("ttsSpeedTrack");
    const ttsSpeedFill = document.getElementById("ttsSpeedFill");
    const ttsSpeedThumb = document.getElementById("ttsSpeedThumb");
    const ttsSpeedLabel = document.getElementById("ttsSpeedLabel");

    // 0 = Lento, 1 = Normal, 2 = Rápido
    let ttsSpeedValue = 1;

    function applyTtsSpeedUI() {
        if (!ttsSpeedFill || !ttsSpeedThumb || !ttsSpeedLabel) return;

        const percents = [20, 50, 80];
        const labels = ["Lento", "Normal", "Rápido"];

        const pct = percents[ttsSpeedValue];
        ttsSpeedFill.style.width = pct + "%";
        ttsSpeedThumb.style.left = pct + "%";
        ttsSpeedLabel.textContent = labels[ttsSpeedValue];
    }

    if (ttsSpeedTrack) {
        ttsSpeedTrack.addEventListener("click", (event) => {
        const rect = ttsSpeedTrack.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const ratio = x / rect.width;

        if (ratio < 1 / 3) {
            ttsSpeedValue = 0;
        } else if (ratio < 2 / 3) {
            ttsSpeedValue = 1;
        } else {
            ttsSpeedValue = 2;
        }
        applyTtsSpeedUI();
        });
    }

    applyTtsSpeedUI();

    /* ========= Respuesta táctil ========= */
    const vibrationTypeBtn = document.getElementById("vibrationTypeBtn");
    const vibrationIntensityBtn = document.getElementById("vibrationIntensityBtn");

    const vibrationTypes = ["Corta", "Media", "Larga"];
    const vibrationIntensities = ["Suave", "Media", "Fuerte"];

    let vibrationTypeIndex = 0;
    let vibrationIntensityIndex = 2; // Fuerte

    if (vibrationTypeBtn) {
        vibrationTypeBtn.addEventListener("click", () => {
        vibrationTypeIndex = (vibrationTypeIndex + 1) % vibrationTypes.length;
        vibrationTypeBtn.textContent = vibrationTypes[vibrationTypeIndex];
        });
    }

    if (vibrationIntensityBtn) {
        vibrationIntensityBtn.addEventListener("click", () => {
        vibrationIntensityIndex =
            (vibrationIntensityIndex + 1) % vibrationIntensities.length;
        vibrationIntensityBtn.textContent =
            vibrationIntensities[vibrationIntensityIndex];
        });
    }

    /* ========= Filtros de color ========= */
    const colorFilterToggle = document.getElementById("color-filter-toggle");
    const colorFiltersGrid = document.getElementById("colorFiltersGrid");
    const colorOptions = document.querySelectorAll(".color-filter-option");
    const colorLabels = document.querySelectorAll("[data-filter-label]");

    let activeFilter = "normal";

    function updateColorFiltersUI() {
        const enabled = !colorFilterToggle || colorFilterToggle.checked;

        if (colorFiltersGrid) {
        colorFiltersGrid.classList.toggle("opacity-50", !enabled);
        colorFiltersGrid.classList.toggle("pointer-events-none", !enabled);
        }

        colorOptions.forEach((btn) => {
        const filter = btn.getAttribute("data-filter");
        const isActive = enabled && filter === activeFilter;

        btn.classList.toggle("ring-2", isActive);
        btn.classList.toggle("ring-primary", isActive);
        btn.classList.toggle("ring-offset-2", isActive);
        btn.classList.toggle(
            "ring-offset-background-light",
            isActive
        );
        btn.classList.toggle(
            "dark:ring-offset-background-dark",
            isActive
        );
        });

        colorLabels.forEach((label) => {
        const filter = label.getAttribute("data-filter-label");
        const isActive = enabled && filter === activeFilter;

        if (isActive) {
            label.classList.remove("text-slate-500", "dark:text-slate-400");
            label.classList.add("text-slate-800", "dark:text-slate-200", "font-medium");
        } else {
            label.classList.remove("text-slate-800", "dark:text-slate-200", "font-medium");
            label.classList.add("text-slate-500", "dark:text-slate-400");
        }
        });
    }

    colorOptions.forEach((btn) => {
        btn.addEventListener("click", () => {
        const filter = btn.getAttribute("data-filter") || "normal";
        activeFilter = filter;
        updateColorFiltersUI();
        });
    });

    if (colorFilterToggle) {
        colorFilterToggle.addEventListener("change", () => {
        updateColorFiltersUI();
        });
    }

    updateColorFiltersUI();

    /* ========= Botón de Restablecer ========= */
    const resetBtn = document.getElementById("resetAccessibilityBtn");
    if (resetBtn) {
        resetBtn.addEventListener("click", () => {
        // Velocidad
        ttsSpeedValue = 1;
        applyTtsSpeedUI();

        // Vibración
        vibrationTypeIndex = 0;
        vibrationIntensityIndex = 2;
        if (vibrationTypeBtn) vibrationTypeBtn.textContent = vibrationTypes[0];
        if (vibrationIntensityBtn)
            vibrationIntensityBtn.textContent = vibrationIntensities[2];

        // Filtros de color
        activeFilter = "normal";
        if (colorFilterToggle) colorFilterToggle.checked = true;
        updateColorFiltersUI();

        alert("Se restablecieron los valores de accesibilidad a los predeterminados.");
        });
    }

    /* ========= Navegación inferior ========= */
    const routes = {
        rutinas: "/Home/home.html",
        comunicar: "/Comunicar/comunicar.html",
        progreso: "/Progreso/progreso.html",
        emociones: "/Emociones/emociones.html",
        ajustes: "/Ajustes/ajustes.html", // esta pantalla
    };

    const navLinks = document.querySelectorAll("[data-nav]");
    navLinks.forEach((link) => {
        link.addEventListener("click", (event) => {
        event.preventDefault();
        const key = link.getAttribute("data-nav");
        if (!key) return;
        const target = routes[key];
        if (target && key !== "ajustes") {
            window.location.href = target;
        }
        });
    });
    });
