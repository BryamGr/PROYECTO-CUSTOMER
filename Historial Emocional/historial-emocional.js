    // ========= Navegación inferior =========
    const routes = {
    rutinas: "/Home/home.html",        // pantalla de rutinas / temporizador
    comunicar: "/Comunicar/comunicar.html", // tablero de comunicación
    progreso: "/Progreso/progreso.html",   // puntos / ABC / etc.
    emociones: "/Emociones/emociones.html", // pantalla principal de emociones
    ajustes: "/Ajustes/ajustes.html",     // configuración
    };

    const navLinks = document.querySelectorAll("[data-nav]");

    navLinks.forEach((link) => {
    const key = link.dataset.nav;
    const target = routes[key];

    if (!target) return;

    link.addEventListener("click", (event) => {
        event.preventDefault();
        // Abre cada sección en otra pestaña, como acordamos
        window.open(target, "_blank");
    });
    });

    // ========= Botón volver =========
    const backButton = document.querySelector("[data-back]");

    if (backButton) {
    backButton.addEventListener("click", () => {
        if (window.history.length > 1) {
        window.history.back();
        } else {
        // Si no hay historial, volvemos a la pantalla principal de emociones
        const fallback = routes.emociones || "emociones.html";
        window.location.href = fallback;
        }
    });
    }

    // ========= Filtros de emociones (chips) =========
    const filterChips = document.querySelectorAll("[data-filter]");
    const emotionItems = document.querySelectorAll("[data-emotion-item]");

    // Clases para estado activo/inactivo (coinciden con el HTML + Tailwind)
    const activeClasses = [
    "bg-primary/20",
    "dark:bg-primary/30",
    "text-primary",
    "dark:text-white",
    ];

    const inactiveClasses = [
    "bg-gray-200",
    "dark:bg-black/20",
    "text-gray-800",
    "dark:text-gray-300",
    ];

    function setChipActive(chipToActivate) {
    filterChips.forEach((chip) => {
        chip.classList.remove(...activeClasses, ...inactiveClasses);
        chip.classList.add(...inactiveClasses);
    });

    chipToActivate.classList.remove(...inactiveClasses);
    chipToActivate.classList.add(...activeClasses);
    }

    function applyFilter(filterKey) {
    // "todas" muestra todo
    if (filterKey === "todas") {
        emotionItems.forEach((item) => {
        item.classList.remove("hidden");
        });
        return;
    }

    emotionItems.forEach((item) => {
        const emotion = item.dataset.emotionItem;
        if (!emotion) return;

        if (emotion === filterKey) {
        item.classList.remove("hidden");
        } else {
        item.classList.add("hidden");
        }
    });
    }

    filterChips.forEach((chip) => {
    chip.addEventListener("click", () => {
        const filterKey = chip.dataset.filter;
        if (!filterKey) return;

        setChipActive(chip);
        applyFilter(filterKey);
    });
    });

    // Estado inicial: filtro "todas" (por si el HTML cambia)
    const initialChip = document.querySelector('[data-filter="todas"]');
    if (initialChip) {
    setChipActive(initialChip);
    applyFilter("todas");
    }
