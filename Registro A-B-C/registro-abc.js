    // registro-abc.js
    document.addEventListener("DOMContentLoaded", () => {
    const messageEl = document.getElementById("abcMessage");

    function showMessage(text, color = "text-emerald-400") {
        if (!messageEl) return;
        messageEl.textContent = text;
        // reset posibles colores
        messageEl.classList.remove("text-emerald-400", "text-red-400");
        messageEl.classList.add(color);

        messageEl.style.opacity = "1";
        setTimeout(() => {
        messageEl.style.opacity = "0";
        }, 4000);
    }

    /* ====== Conexión (wifi_off / wifi) ====== */
    const connBtn = document.getElementById("abcConnectionButton");
    const connIcon = document.getElementById("abcConnectionIcon");
    const connText = document.getElementById("abcConnectionText");
    let isOffline = true;

    if (connBtn && connIcon && connText) {
        connBtn.addEventListener("click", () => {
        isOffline = !isOffline;

        if (isOffline) {
            connIcon.textContent = "wifi_off";
            connText.textContent = "Sin conexión";
            connBtn.classList.remove("text-emerald-400");
            connBtn.classList.add("text-orange-500", "dark:text-orange-400");
        } else {
            connIcon.textContent = "wifi";
            connText.textContent = "Conectado";
            connBtn.classList.remove("text-orange-500", "dark:text-orange-400");
            connBtn.classList.add("text-emerald-400");
        }
        });
    }

    /* ====== Volver atrás ====== */
    const backButton = document.getElementById("backButton");
    if (backButton) {
        backButton.addEventListener("click", () => {
        // puedes cambiar a window.history.back() si prefieres
        window.location.href = "progreso.html";
        });
    }

    /* ====== Chips A, B, C, Contexto ====== */
    const chips = document.querySelectorAll(".chip");

    function setChipActive(chip, active) {
        if (active) {
        chip.classList.remove(
            "bg-zinc-200/50",
            "dark:bg-zinc-800/80",
            "text-zinc-800",
            "dark:text-zinc-200"
        );
        chip.classList.add(
            "bg-primary/20",
            "dark:bg-primary/30",
            "text-primary",
            "dark:text-primary-200",
            "ring-2",
            "ring-primary",
            "chip-active"
        );
        } else {
        chip.classList.remove(
            "bg-primary/20",
            "dark:bg-primary/30",
            "text-primary",
            "dark:text-primary-200",
            "ring-2",
            "ring-primary",
            "chip-active"
        );
        chip.classList.add(
            "bg-zinc-200/50",
            "dark:bg-zinc-800/80",
            "text-zinc-800",
            "dark:text-zinc-200"
        );
        }
    }

    // iniciar seleccionados por data-selected="true"
    chips.forEach((chip) => {
        const selected = chip.getAttribute("data-selected") === "true";
        setChipActive(chip, selected);

        chip.addEventListener("click", () => {
        const group = chip.getAttribute("data-group");
        if (!group) return;

        // desactivar resto del grupo
        chips.forEach((other) => {
            if (other !== chip && other.getAttribute("data-group") === group) {
            setChipActive(other, false);
            }
        });

        // activar el pulsado
        const isNowActive = !chip.classList.contains("chip-active");
        setChipActive(chip, isNowActive);
        });
    });

    function getSelectedValue(groupName) {
        const selected = document.querySelector(
        '.chip.chip-active[data-group="' + groupName + '"]'
        );
        return selected ? selected.getAttribute("data-value") : null;
    }

    /* ====== Adjuntar Foto (dispara input file) ====== */
    const attachPhotoButton = document.getElementById("attachPhotoButton");
    const photoInput = document.getElementById("photoInput");

    if (attachPhotoButton && photoInput) {
        attachPhotoButton.addEventListener("click", () => {
        photoInput.click();
        });

        photoInput.addEventListener("change", () => {
        if (photoInput.files && photoInput.files.length > 0) {
            showMessage("Foto seleccionada: " + photoInput.files[0].name);
        }
        });
    }

    /* ====== Registrar Evento ====== */
    const detailsInput = document.getElementById("detailsInput");
    const eventsList = document.getElementById("eventsList");
    const registerEventButton = document.getElementById("registerEventButton");

    if (registerEventButton && eventsList) {
        registerEventButton.addEventListener("click", () => {
        const antecedente = getSelectedValue("antecedente");
        const conducta = getSelectedValue("conducta");
        const consecuencia = getSelectedValue("consecuencia");
        const contexto = getSelectedValue("contexto");
        const detalles = detailsInput ? detailsInput.value.trim() : "";

        if (!antecedente || !conducta || !consecuencia) {
            showMessage(
            "Selecciona al menos un antecedente, una conducta y una consecuencia.",
            "text-red-400"
            );
            return;
        }

        const now = new Date();
        const hora = now.toLocaleTimeString("es-ES", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
        });

        // crear tarjeta
        const card = document.createElement("div");
        card.className =
            "flex flex-col gap-3 rounded-xl bg-zinc-100 dark:bg-zinc-900/50 p-4";

        card.innerHTML = `
            <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
                <span class="material-symbols-outlined text-sky-400">flag</span>
                <p class="font-semibold text-zinc-800 dark:text-zinc-200">${conducta}</p>
            </div>
            <p class="text-sm text-zinc-500 dark:text-zinc-400">${hora} - Hoy</p>
            </div>
            <div class="flex flex-wrap items-center gap-2 text-sm text-zinc-600 dark:text-zinc-300">
            <span class="font-bold text-zinc-400 dark:text-zinc-500">A:</span>
            <p>${antecedente}</p>
            <span class="font-bold text-zinc-400 dark:text-zinc-500">C:</span>
            <p>${consecuencia}</p>
            ${
                contexto
                ? `<span class="font-bold text-zinc-400 dark:text-zinc-500">Ctx:</span><p>${contexto}</p>`
                : ""
            }
            </div>
            ${
            detalles
                ? `<p class="text-sm italic text-zinc-500 dark:text-zinc-400 border-l-2 border-primary/50 pl-2">${detalles}</p>`
                : ""
            }
        `;

        eventsList.prepend(card);
        if (detailsInput) detailsInput.value = "";

        showMessage("Evento registrado en el historial ✅");
        });
    }

    /* ====== Botón Filtrar ====== */
    const filterButton = document.getElementById("filterButton");
    if (filterButton) {
        filterButton.addEventListener("click", () => {
        showMessage("Aquí podrás filtrar eventos por fecha o tipo (en construcción).");
        });
    }

    /* ====== Navegación inferior ====== */
    const routes = {
        rutinas: "/Home/home.html",
        comunicar: "/Comunicar/comunicar.html",
        progreso: "/Progreso/progreso.html", // pantalla principal de progreso
        emociones: "/Emociones/emociones.html",
        ajustes: "ajustes.html",
    };

    const navLinks = document.querySelectorAll("[data-nav]");
    navLinks.forEach((link) => {
        link.addEventListener("click", (event) => {
        event.preventDefault();
        const key = link.getAttribute("data-nav");
        if (!key) return;
        const target = routes[key];
        if (target) {
            window.location.href = target;
        }
        });
    });
    });
