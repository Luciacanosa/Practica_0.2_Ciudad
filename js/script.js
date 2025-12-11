// efectos para el cursor

$(document).mousemove(function (e) {
  $(".cursor-index").css({
    left: e.clientX + "px", // 👈 usa clientX/clientY
    top: e.clientY + "px",
  });
});

document.addEventListener("mousemove", (e) => {
  const el = document.querySelector(".cursor-index");
  if (!el) return;
  el.style.left = e.clientX + "px";
  el.style.top = e.clientY + "px";
});

// opcional: efecto al pasar por enlaces
$("a").hover(
  function () {
    $(".cursor-index").addClass("cursor-grow");
  },
  function () {
    $(".cursor-index").removeClass("cursor-grow");
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
  const hero = document.querySelector(".hero-kyoto");
  const title = document.querySelector(".hero-title");

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

// ventana modal ULTIMA OPORTUNIDAD JRPASS EN 10 SEGUNDOs

// Lógica abrir/cerrar de la ventana modal
let btnOpenModal = document.querySelector("#openModal");

btnOpenModal.addEventListener("click", openModalWindow);

// Función propia para abrir ventana modal
function openModalWindow() {
  let modalWindow = document.querySelector("#modalWindow");
  modalWindow.classList.add("show-modal");
}

let btnCloseModal = document.querySelector(
  "#modalWindow > .modal-content > .close"
);

btnCloseModal.addEventListener("click", closeModalWindow);

// Función para cerrar la ventana modal
function closeModalWindow() {
  let modalWindow = document.querySelector("#modalWindow");
  modalWindow.classList.remove("show-modal");
}

// Cerrar ventana modal cuando se detecta click fuera
window.addEventListener("click", function (event) {
  let modal = document.querySelector("#modalWindow");
  if (event.target == modal) {
    closeModalWindow();
  }
});

// Abrir modal automáticamente a los 10 segundos
setTimeout(openModalWindow, 10000);

// carrusel fotos parte historia pag principal
function iniciarCarrusel(selector) {
  const images = document.querySelectorAll(selector + " img");
  let index = 0;

  function showNextImage() {
    images.forEach((img) => img.classList.remove("active"));
    images[index].classList.add("active");
    index = (index + 1) % images.length;
  }

  showNextImage(); // mostrar la primera
  setInterval(showNextImage, 3000); // cambiar cada 3 segundos
}

// Inicia cada carrusel por separado
iniciarCarrusel(".carrusel.historia");
iniciarCarrusel(".carrusel.cultura");

// SECCION NATURALEZA

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
