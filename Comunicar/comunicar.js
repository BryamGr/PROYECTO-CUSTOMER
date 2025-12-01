    // comunicar.js
    document.addEventListener("DOMContentLoaded", () => {
    /* ========= Estado de conexión ========= */
    const connectionButton = document.getElementById("connectionButton");
    const connectionIcon = document.getElementById("connectionIcon");
    let isOffline = true;

    if (connectionButton && connectionIcon) {
        connectionButton.addEventListener("click", () => {
        isOffline = !isOffline;

        if (isOffline) {
            connectionIcon.textContent = "cloud_off";
            connectionIcon.classList.remove("text-emerald-400");
            connectionIcon.classList.add("text-slate-500", "dark:text-slate-400");
        } else {
            connectionIcon.textContent = "cloud";
            connectionIcon.classList.remove("text-slate-500", "dark:text-slate-400");
            connectionIcon.classList.add("text-emerald-400");
        }
        });
    }

    /* ========= Frases / pictogramas ========= */
    const phraseCards = document.querySelectorAll(".phrase-card");
    const selectedSection = document.getElementById("selectedPhrase");
    const selectedText = document.getElementById("selectedPhraseText");

    phraseCards.forEach((card) => {
        card.classList.add("transition", "hover:-translate-y-0.5", "hover:shadow-md");

        card.addEventListener("click", () => {
        const phrase = card.getAttribute("data-text") || card.innerText.trim();

        // quitar selección previa
        phraseCards.forEach((c) => {
            c.classList.remove("ring-4", "ring-primary", "shadow-lg", "scale-105");
        });

        // marcar seleccionada
        card.classList.add("ring-4", "ring-primary", "shadow-lg", "scale-105");

        // mostrar barra superior con la frase
        if (selectedSection && selectedText) {
            selectedSection.classList.remove("hidden");
            selectedText.textContent = phrase;
        }

        // reproducir por voz (si el navegador lo soporta)
        if ("speechSynthesis" in window && phrase) {
            const utterance = new SpeechSynthesisUtterance(phrase);
            utterance.lang = "es-ES"; // puedes cambiar a "es-PE" si tu navegador lo soporta
            window.speechSynthesis.cancel();
            window.speechSynthesis.speak(utterance);
        }
        });
    });

    /* ========= Buscador ========= */
    const searchInput = document.getElementById("searchInput");

    if (searchInput) {
        searchInput.addEventListener("input", () => {
        const query = searchInput.value.toLowerCase().trim();

        phraseCards.forEach((card) => {
            const text = (card.getAttribute("data-text") || "").toLowerCase();
            if (!query || text.includes(query)) {
            card.style.display = "";
            } else {
            card.style.display = "none";
            }
        });
        });
    }

    /* ========= Tabs (Frases / Favoritos / Recientes) ========= */
    const tabLinks = document.querySelectorAll(".tab-link");
    const phrasesGrid = document.getElementById("phrasesGrid");
    const favoritesEmpty = document.getElementById("favoritesEmpty");
    const recentEmpty = document.getElementById("recentEmpty");

    function showTab(tabName) {
        if (!phrasesGrid || !favoritesEmpty || !recentEmpty) return;

        phrasesGrid.classList.toggle("hidden", tabName !== "frases");
        favoritesEmpty.classList.toggle("hidden", tabName !== "favoritos");
        recentEmpty.classList.toggle("hidden", tabName !== "recientes");

        tabLinks.forEach((link) => {
        const label = link.querySelector(".tab-label");
        const isActive = link.getAttribute("data-tab") === tabName;

        // borde
        link.classList.toggle("border-b-primary", isActive);
        link.classList.toggle("border-b-transparent", !isActive);

        // color del texto
        if (label) {
            label.classList.toggle("text-primary", isActive);
            label.classList.toggle("text-slate-500", !isActive);
            label.classList.toggle("dark:text-slate-400", !isActive);
        }
        });
    }

    tabLinks.forEach((link) => {
        link.addEventListener("click", (event) => {
        event.preventDefault();
        const tab = link.getAttribute("data-tab") || "frases";
        showTab(tab);
        });
    });

    // tab inicial
    showTab("frases");

    /* ========= Navegación inferior ========= */
    const routes = {
        rutinas: "/Home/home.html",
        comunicar: "/Comunicar/comunicar.html", // esta misma
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

        // no recargues si ya estás en Comunicar
        if (target && key !== "comunicar") {
            window.location.href = target;
        }
        });
    });
    });
