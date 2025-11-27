// onboarding.js
document.addEventListener("DOMContentLoaded", () => {
  // Slides de tu onboarding
  const slides = [
    {
      title: "¡Hola! Te damos la bienvenida a Loopi.",
      text: "Tu compañero para organizar el día a día, entender emociones y comunicarnos mejor.",
      // Puedes poner distintas imágenes por slide si quieres:
      image: null, // usa la del HTML por defecto
    },
    {
      title: "Crea rutinas visuales fáciles.",
      text: "Organiza pasos simples para levantarse, comer, estudiar o relajarse, con recordatorios claros.",
      image: null,
    },
    {
      title: "Apoya la regulación emocional.",
      text: "Usa actividades y recursos pensados para expresar cómo nos sentimos y calmarnos poco a poco.",
      image: null,
    },
    {
      title: "Conecta a familia y profesionales.",
      text: "Comparte avances y rutinas con cuidadores, docentes o terapeutas para trabajar en equipo.",
      image: null,
    },
  ];

  const titleEl = document.getElementById("slideTitle");
  const textEl = document.getElementById("slideText");
  const imageEl = document.getElementById("slideImage");
  const dotsContainer = document.getElementById("dotsContainer");
  const nextButton = document.getElementById("nextButton");
  const skipButton = document.getElementById("skipButton");

  let currentIndex = 0;

  // Renderiza un slide según el índice
  function renderSlide(index) {
    const slide = slides[index];

    if (titleEl) titleEl.textContent = slide.title;
    if (textEl) textEl.textContent = slide.text;

    // Si quieres cambiar imagen por slide, descomenta esto y pon URLs en slides.image
    if (imageEl && slide.image) {
      imageEl.style.backgroundImage = `url("${slide.image}")`;
    }

    // Paginadores (puntitos)
    if (dotsContainer) {
      dotsContainer.innerHTML = "";
      slides.forEach((_, i) => {
        const dot = document.createElement("div");
        dot.className =
          "h-2 w-2 rounded-full transition-colors duration-200 " +
          (i === index ? "bg-primary" : "bg-gray-300 dark:bg-gray-600");
        dotsContainer.appendChild(dot);
      });
    }

    // Texto del botón: Siguiente / Empezar
    if (nextButton) {
      const label = nextButton.querySelector("span");
      if (label) {
        label.textContent = index === slides.length - 1 ? "Empezar" : "Siguiente";
      }
    }
  }

  // Lógica botón "Siguiente"
  if (nextButton) {
    nextButton.addEventListener("click", () => {
      if (currentIndex < slides.length - 1) {
        currentIndex++;
        renderSlide(currentIndex);
      } else {
        // 👉 Aquí decides a dónde ir después del onboarding
        // Ajusta la ruta según tu estructura de carpetas.
        window.location.href = "../Home/home.html";
        // o simplemente "login.html" si está en la misma carpeta.
      }
    });
  }

  // Lógica botón "Saltar"
  if (skipButton) {
    skipButton.addEventListener("click", () => {
      // Mismo destino que el final del onboarding
      window.location.href = "../../Home/home.html";
    });
  }

  // Primer render
  renderSlide(currentIndex);
});
