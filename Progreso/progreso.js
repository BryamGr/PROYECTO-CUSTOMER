    // progreso.js
    document.addEventListener("DOMContentLoaded", () => {
    /* ========= Estado de conexión ========= */
    const connBtn = document.getElementById("progressConnectionButton");
    const connIcon = document.getElementById("progressConnectionIcon");
    const connText = document.getElementById("progressConnectionText");
    let isOffline = true;

    if (connBtn && connIcon && connText) {
        connBtn.addEventListener("click", () => {
        isOffline = !isOffline;

        if (isOffline) {
            connIcon.textContent = "wifi_off";
            connIcon.classList.remove("text-emerald-400");
            connIcon.classList.add("text-slate-700", "dark:text-slate-200");
            connText.textContent = "Sin conexión";
            connText.classList.remove("text-emerald-400");
        } else {
            connIcon.textContent = "wifi";
            connIcon.classList.remove("text-slate-700", "dark:text-slate-200");
            connIcon.classList.add("text-emerald-400");
            connText.textContent = "Conectado";
            connText.classList.add("text-emerald-400");
        }
        });
    }

    /* ========= Total de estrellas ========= */
    const totalStarsEl = document.getElementById("totalStars");
    const messageEl = document.getElementById("progressMessage");
    let totalStars = parseInt(totalStarsEl ? totalStarsEl.textContent : "0", 10) || 0;
    let messageTimeout = null;

    function updateStars() {
        if (totalStarsEl) {
        totalStarsEl.textContent = String(totalStars);
        }
    }

    function showMessage(text) {
        if (!messageEl) {
        alert(text);
        return;
        }
        messageEl.textContent = text;
        messageEl.classList.add("opacity-100");

        if (messageTimeout) clearTimeout(messageTimeout);
        messageTimeout = setTimeout(() => {
        messageEl.classList.remove("opacity-100");
        }, 4000);
    }

    /* ========= Botón Agregar Punto ========= */
    const addPointButton = document.getElementById("addPointButton");
    if (addPointButton) {
        addPointButton.addEventListener("click", () => {
        totalStars += 1;
        updateStars();
        showMessage("Has sumado 1 estrella ✨ ¡Buen trabajo!");
        });
    }

    /* ========= Canjear recompensas ========= */
    const redeemButtons = document.querySelectorAll(".redeem-button");

    redeemButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
        const cost = parseInt(btn.getAttribute("data-cost") || "0", 10);
        const rewardName = btn.getAttribute("data-reward") || "esta recompensa";

        if (totalStars >= cost) {
            totalStars -= cost;
            updateStars();
            showMessage(`Canjeaste: ${rewardName}. ¡Disfruta tu recompensa! 🎉`);
        } else {
            const faltan = cost - totalStars;
            showMessage(`Te faltan ${faltan} estrellas para canjear "${rewardName}".`);
        }
        });

        // Hover suave
        btn.classList.add("transition", "hover:shadow-md");
    });

    /* ========= Historial y Reglas ========= */
    const historyButton = document.getElementById("historyButton");
    const rulesButton = document.getElementById("rulesButton");

    if (historyButton) {
        historyButton.addEventListener("click", () => {
        showMessage("Aquí se mostrará el historial de estrellas (pantalla en construcción).");
        });
    }

    if (rulesButton) {
        rulesButton.addEventListener("click", () => {
        showMessage("Aquí verás las reglas de la economía de fichas (pantalla en construcción).");
        });
    }

    /* ========= Navegación inferior ========= */
    const routes = {
        rutinas: "/Home/home.html",
        comunicar: "/Comunicar/comunicar.html",
        progreso: "/Progreso/progreso.html",   // esta pantalla
        emociones: "/Emociones/emociones.html",
        ajustes: "ajustes.html",
    };

    const navLinks = document.querySelectorAll("[data-nav]");
    navLinks.forEach((link) => {
        link.addEventListener("click", (event) => {
        event.preventDefault();
        const key = link.getAttribute("data-nav");
        const target = routes[key];
        if (target && key !== "progreso") {
            window.location.href = target;
        }
        });
    });
    });
