    // ======== Rutas navegación inferior ========
    const routes = {
    rutinas: "/Home/home.html",
    comunicar: "/Comunicar/comunicar.html",
    progreso: "/Progreso/progreso.html",
    emociones: "/Emociones/emociones.html",
    ajustes: "/Ajustes/ajustes.html",
    };

    // Navegación inferior
    document.querySelectorAll("[data-nav]").forEach((el) => {
    el.addEventListener("click", () => {
        const key = el.dataset.nav;
        const url = routes[key];
        if (url) {
        window.location.href = url;
        }
    });
    });

    // Botón volver (usa historial; si no, va a home)
    const backBtn = document.querySelector("[data-back]");
    if (backBtn) {
    backBtn.addEventListener("click", () => {
        if (document.referrer) {
        history.back();
        } else {
        window.location.href = routes.rutinas;
        }
    });
    }

    // ======== Lógica de pasos de la rutina ========
    const stepsContainer = document.getElementById("stepsContainer");
    const addStepBtn = document.getElementById("addStepBtn");
    const saveRoutineBtn = document.getElementById("saveRoutineBtn");
    const routineNameInput = document.getElementById("routineName");

    // Asignar IDs internos a los pasos actuales
    let stepIdCounter = 0;
    Array.from(stepsContainer.querySelectorAll(".routine-step")).forEach((step) => {
    stepIdCounter += 1;
    step.dataset.stepId = String(stepIdCounter);
    });

    // Crear un paso nuevo
    function createStep(description = "", minutes = null) {
    stepIdCounter += 1;

    const wrapper = document.createElement("div");
    wrapper.className =
        "routine-step group flex gap-4 rounded-xl border border-gray-300 bg-white p-4 dark:border-gray-700 dark:bg-gray-800";
    wrapper.dataset.stepId = String(stepIdCounter);

    wrapper.innerHTML = `
        <div class="flex flex-col items-center gap-2">
        <button type="button"
            class="flex size-16 shrink-0 items-center justify-center rounded-lg bg-gray-200 dark:bg-gray-700">
            <span class="material-symbols-outlined text-gray-500 dark:text-gray-400">add_photo_alternate</span>
        </button>
        <div
            class="cursor-grab text-gray-400 transition-colors group-hover:text-gray-600 dark:text-gray-500 dark:group-hover:text-gray-300">
            <span class="material-symbols-outlined">drag_indicator</span>
        </div>
        </div>
        <div class="flex-1">
        <input
            data-role="description"
            class="form-input w-full rounded-md border-gray-300 bg-white p-3 text-base font-medium text-black placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-500"
            placeholder="Describe el paso"
        />
        <div class="mt-3 flex items-center justify-between">
            <button type="button" data-action="timer"
            class="flex items-center gap-2 rounded-full px-3 py-1 text-sm text-primary transition-colors hover:bg-primary/10">
            <span class="material-symbols-outlined text-base">timer_off</span>
            <span>Añadir temporizador</span>
            </button>
            <button type="button" data-action="delete"
            class="flex h-8 w-8 items-center justify-center rounded-full text-alert transition-colors hover:bg-alert/10">
            <span class="material-symbols-outlined text-xl">delete</span>
            </button>
        </div>
        </div>
    `;

    const descInput = wrapper.querySelector('[data-role="description"]');
    if (description) descInput.value = description;

    const timerBtn = wrapper.querySelector('[data-action="timer"]');
    updateTimerButton(timerBtn, minutes);

    stepsContainer.appendChild(wrapper);
    }

    // Actualiza el texto/ícono del botón de temporizador
    function updateTimerButton(btn, minutes) {
    if (!btn) return;

    if (minutes == null) {
        btn.dataset.minutes = "";
        btn.innerHTML = `
        <span class="material-symbols-outlined text-base">timer_off</span>
        <span>Añadir temporizador</span>
        `;
    } else {
        btn.dataset.minutes = String(minutes);
        btn.innerHTML = `
        <span class="material-symbols-outlined text-base">timer</span>
        <span>${minutes} min</span>
        `;
    }
    }

    // Delegación de eventos dentro de los pasos
    stepsContainer.addEventListener("click", (event) => {
    const actionBtn = event.target.closest("button[data-action]");
    if (!actionBtn) return;

    const step = actionBtn.closest(".routine-step");
    const action = actionBtn.dataset.action;

    if (action === "delete") {
        step.remove();
        return;
    }

    if (action === "timer") {
        const current = parseInt(actionBtn.dataset.minutes || "", 10);
        const initial = Number.isNaN(current) ? "" : String(current);

        const input = prompt(
        "¿Cuántos minutos debe durar este paso? (deja vacío para quitar el temporizador)",
        initial
        );

        if (input === null) return; // cancelado

        const trimmed = input.trim();
        if (trimmed === "") {
        updateTimerButton(actionBtn, null);
        return;
        }

        const minutes = parseInt(trimmed, 10);
        if (Number.isNaN(minutes) || minutes <= 0) {
        alert("Ingresa un número de minutos válido (mayor a 0).");
        return;
        }

        updateTimerButton(actionBtn, minutes);
    }
    });

    // Botón Añadir Paso
    if (addStepBtn) {
    addStepBtn.addEventListener("click", () => {
        createStep();
        // Hacer scroll al final para ver el nuevo paso
        stepsContainer.lastElementChild?.scrollIntoView({ behavior: "smooth", block: "end" });
    });
    }

    // Guardar rutina (de momento solo muestra un resumen)
    if (saveRoutineBtn) {
    saveRoutineBtn.addEventListener("click", () => {
        const name = routineNameInput.value.trim();

        if (!name) {
        alert("Ponle un nombre a la rutina 😊");
        routineNameInput.focus();
        return;
        }

        const steps = Array.from(stepsContainer.querySelectorAll(".routine-step")).map((step) => {
        const descInput = step.querySelector('[data-role="description"]');
        const timerBtn = step.querySelector('[data-action="timer"]');
        const description = descInput.value.trim();

        const minutesRaw = timerBtn.dataset.minutes || "";
        const minutes = minutesRaw ? parseInt(minutesRaw, 10) : null;

        return { description, minutes };
        }).filter((s) => s.description !== "");

        if (!steps.length) {
        alert("Añade al menos un paso a la rutina.");
        return;
        }

        // Aquí podrías guardar en localStorage o enviarlo a tu backend.
        console.log("Rutina guardada:", { name, steps });

        alert(`Rutina "${name}" guardada con ${steps.length} paso(s).\n(Por ahora se guarda solo en memoria 😄)`);

        // Ejemplo: volver a la pantalla principal de rutinas
        // window.location.href = routes.rutinas;
    });
    }
