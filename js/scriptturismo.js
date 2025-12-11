// efectos para el cursor

$(document).mousemove(function (e) {
  $(".cursor-turismo").css({
    left: e.clientX + "px", // 👈 usa clientX/clientY
    top: e.clientY + "px",
  });
});

document.addEventListener("mousemove", (e) => {
  const el = document.querySelector(".cursor-turismo");
  if (!el) return;
  el.style.left = e.clientX + "px";
  el.style.top = e.clientY + "px";
});

// opcional: efecto al pasar por enlaces
$("a").hover(
  function () {
    $(".cursor-turismo").addClass("cursor-grow");
  },
  function () {
    $(".cursor-turismo").removeClass("cursor-grow");
  }
);

// efecto disminuir head al hacer scroll

/*jslint devel: true*/
/*eslint-env browser*/

document.addEventListener("DOMContentLoaded", function () {
  const header = document.querySelector(".navbar");
  const threshold = window.innerHeight / 2;

  window.addEventListener("scroll", function () {
    if (window.scrollY > threshold) {
      header.classList.add("shrink");
    } else {
      header.classList.remove("shrink");
    }
  });
});

// efecto 3d head
(function () {
  const hero = document.querySelector(".hero-kyoto-turismo");
  const title = document.querySelector(".hero-title-turismo");

  // Ajustes del efecto
  const cfg = {
    maxRotateX: 18, // grados
    maxRotateY: 22,
    maxTranslateX: 100, // px
    maxTranslateY: 80, // px
    minScale: 0.76,
    maxScale: 1.0,
    maxBlur: 18, // px
    perspective: 700, // px
  };

  let width = hero.offsetWidth;
  let height = hero.offsetHeight;

  function updateDims() {
    width = hero.offsetWidth;
    height = hero.offsetHeight;
  }

  function mapRange(v, inMin, inMax, outMin, outMax) {
    return outMin + ((outMax - outMin) * (v - inMin)) / (inMax - inMin);
  }

  function applyEffect(clientX, clientY) {
    const rect = hero.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    const normX = (x / width) * 2 - 1; // -1 .. 1
    const normY = (y / height) * 2 - 1; // -1 .. 1

    const rotY = normX * cfg.maxRotateY; // inclinación lateral
    const rotX = -normY * cfg.maxRotateX; // inclinación vertical

    const tX = normX * cfg.maxTranslateX;
    const tY = normY * cfg.maxTranslateY;

    // scale y blur según distancia al centro
    const dist = Math.min(1, Math.sqrt(normX * normX + normY * normY));
    const scale = mapRange(dist, 1, 0, cfg.minScale, cfg.maxScale);
    const blur = Math.round(mapRange(dist, 0, 1, cfg.maxBlur, 0));

    title.style.transform =
      `perspective(${cfg.perspective}px) translateX(${tX}px) translateY(${tY}px) ` +
      `scale(${scale}) rotateX(${rotX}deg) rotateY(${rotY}deg)`;

    title.style.filter = `blur(${blur}px)`;
  }

  // Efecto activo solo en desktop
  const isTouch = window.matchMedia("(pointer: coarse)").matches;

  if (!isTouch) {
    hero.addEventListener("mousemove", (e) =>
      applyEffect(e.clientX, e.clientY)
    );
    window.addEventListener("resize", updateDims);
    updateDims();
  } else {
    // Fallback en móvil: ligera animación al entrar
    title.classList.add("hero-title-mobile");
  }

  // Restablece al salir
  hero.addEventListener("mouseleave", () => {
    title.style.transform = "none";
    title.style.filter = "none";
  });
})();

// menu hambuerguesa para el navbar
// lógica del menu (simplemente el clik en un icono)

// selección de elementos del html

let burger = document.querySelector(".burger > i");
let menu_opt = document.querySelector(".menu");

// definimos evneto click sobre le botón del menú
burger.addEventListener("click", function () {
  burger.classList.toggle("fa-bars");
  burger.classList.toggle("fa-times");
  menu_opt.classList.toggle("menu-show");
});

// sortable para elegir tu propio itinerario

$(function () {
  $("#sortable").sortable({
    placeholder: "ui-state-highlight",
  });
  $("#sortable").disableSelection();
});

// slideShow.js — versión funcional basada en tu ejemplo

let slideIndex = 1;
let autoSlide;
let arrDots;

function initSlideshow() {
  // Asegura que el DOM está listo y las dots existen
  arrDots = document.querySelectorAll(".turismo-slideshow-dots .dot");
  showSlide(slideIndex);
  startAutoSlide();

  // Eventos de dots
  for (let k = 0; k < arrDots.length; k++) {
    arrDots[k].addEventListener("click", function () {
      stopAutoSlide();
      currentDotSlide(k);
      startAutoSlide();
    });
  }

  // Flechas
  const nextSlideArrow = document.querySelector(
    ".turismo-slideshow-container .next"
  );
  const prevSlideArrow = document.querySelector(
    ".turismo-slideshow-container .prev"
  );

  nextSlideArrow.addEventListener("click", function () {
    stopAutoSlide();
    nextPrevSlide(1);
    startAutoSlide();
  });

  prevSlideArrow.addEventListener("click", function () {
    stopAutoSlide();
    nextPrevSlide(-1);
    startAutoSlide();
  });

  // Pausar autoplay en hover del contenedor
  const container = document.querySelector(".turismo-slideshow-container");
  container.addEventListener("mouseenter", stopAutoSlide);
  container.addEventListener("mouseleave", startAutoSlide);
}

function nextPrevSlide(index) {
  slideIndex = slideIndex + index;
  showSlide(slideIndex);
}

function currentDotSlide(dotIndex) {
  slideIndex = dotIndex + 1;
  showSlide(slideIndex);
}

function showSlide(slideNumber) {
  const arrSlides = document.querySelectorAll(
    ".turismo-slideshow-container .mySlides"
  );

  if (arrSlides.length === 0) return;

  if (slideNumber > arrSlides.length) {
    slideIndex = 1;
  }
  if (slideNumber < 1) {
    slideIndex = arrSlides.length;
  }

  // Oculta todos y desactiva puntos
  for (let i = 0; i < arrSlides.length; i++) {
    arrSlides[i].style.display = "none";
    if (arrDots[i]) {
      arrDots[i].classList.remove("active");
    }
  }

  // Muestra el slide actual y activa su dot
  arrSlides[slideIndex - 1].style.display = "block";
  if (arrDots[slideIndex - 1]) {
    arrDots[slideIndex - 1].classList.add("active");
  }
}

function startAutoSlide() {
  stopAutoSlide();
  autoSlide = setInterval(function () {
    nextPrevSlide(1);
  }, 3000);
}

function stopAutoSlide() {
  if (autoSlide) clearInterval(autoSlide);
}

// Inicializa cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", initSlideshow);

// ventanas modales para la sección de guías para ver mas informacion con el botón que esta al flip-card

// Abrir modal con contenido dinámico
// document.querySelectorAll("#openModal").forEach((btn) => {
//   btn.addEventListener("click", function () {
//     let guide = this.getAttribute("data-guide");
//     let modalWindow = document.querySelector("#modalWindow");
//     let modalText = document.querySelector("#modalText");

//     // Contenido según guía
//     if (guide === "templos") {
//       modalText.innerHTML =
//         "<h2>Ruta de los Templos Zen</h2><p>Visita Kinkaku-ji (Pabellón Dorado), Ryoan-ji con su famoso jardín de rocas, y Ginkaku-ji (Pabellón Plateado). Es una ruta clásica para entender la espiritualidad zen en Kyoto.</p>";
//     } else if (guide === "gion") {
//       modalText.innerHTML =
//         "<h2>Gion y Higashiyama</h2><p>Recorre las calles históricas de Gion, observa casas de té y quizás una geisha en plena actividad. Higashiyama ofrece templos como Kiyomizu-dera y vistas espectaculares de la ciudad.</p>";
//     } else if (guide === "arashiyama") {
//       modalText.innerHTML =
//         "<h2>Arashiyama</h2><p>Explora el bosque de bambú, cruza el puente Togetsukyo y disfruta de un paseo en barca por el río Katsura. Ideal para combinar naturaleza y tradición.</p>";
//     } else if (guide === "nishiki") {
//       modalText.innerHTML =
//         "<h2>Mercados y Gastronomía</h2><p>El Nishiki Market es el corazón culinario de Kyoto. Prueba dulces wagashi, encurtidos tsukemono, sashimi fresco y el famoso té matcha. Perfecto para los amantes de la comida.</p>";
//     }

//     modalWindow.classList.add("show-modal");
//   });
// });

// // Cerrar modal
// let btnCloseModal = document.querySelector(
//   "#modalWindow > .modal-content > .close"
// );
// btnCloseModal.addEventListener("click", closeModalWindow);

// function closeModalWindow() {
//   let modalWindow = document.querySelector("#modalWindow");
//   modalWindow.classList.remove("show-modal");
// }

// // Cerrar al hacer click fuera
// window.addEventListener("click", function (event) {
//   let modal = document.querySelector("#modalWindow");
//   if (event.target == modal) {
//     closeModalWindow();
//   }
// });

// Abrir modal con contenido dinámico
document.querySelectorAll("#openModal").forEach((btn) => {
  btn.addEventListener("click", function () {
    let guide = this.getAttribute("data-guide");
    let modalWindow = document.querySelector("#modalWindow");
    let modalText = document.querySelector("#modalText");

    // Contenido según guía
    if (guide === "templos") {
      modalText.innerHTML =
        "<h2>Ruta de los Templos Zen</h2><p>Visita Kinkaku-ji (Pabellón Dorado), Ryoan-ji con su famoso jardín de rocas, y Ginkaku-ji (Pabellón Plateado). Es una ruta clásica para entender la espiritualidad zen en Kyoto.</p>";
    } else if (guide === "gion") {
      modalText.innerHTML =
        "<h2>Gion y Higashiyama</h2><p>Recorre las calles históricas de Gion, observa casas de té y quizás una geisha en plena actividad. Higashiyama ofrece templos como Kiyomizu-dera y vistas espectaculares de la ciudad.</p>";
    } else if (guide === "arashiyama") {
      modalText.innerHTML =
        "<h2>Arashiyama</h2><p>Explora el bosque de bambú, cruza el puente Togetsukyo y disfruta de un paseo en barca por el río Katsura. Ideal para combinar naturaleza y tradición.</p>";
    } else if (guide === "nishiki") {
      modalText.innerHTML =
        "<h2>Mercados y Gastronomía</h2><p>El Nishiki Market es el corazón culinario de Kyoto. Prueba dulces wagashi, encurtidos tsukemono, sashimi fresco y el famoso té matcha. Perfecto para los amantes de la comida.</p>";
    }

    modalWindow.classList.add("show-modal");
  });
});

// Cerrar modal
let btnCloseModal = document.querySelector(
  "#modalWindow > .modal-content > .close"
);
btnCloseModal.addEventListener("click", closeModalWindow);

function closeModalWindow() {
  let modalWindow = document.querySelector("#modalWindow");
  modalWindow.classList.remove("show-modal");
}

// Cerrar al hacer click fuera
window.addEventListener("click", function (event) {
  let modal = document.querySelector("#modalWindow");
  if (event.target == modal) {
    closeModalWindow();
  }
});
