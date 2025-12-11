// efectos para el cursor

$(document).mousemove(function (e) {
  $(".cursor").css({
    left: e.clientX + "px", // 👈 usa clientX/clientY
    top: e.clientY + "px",
  });
});

document.addEventListener("mousemove", (e) => {
  const el = document.querySelector(".cursor");
  if (!el) return;
  el.style.left = e.clientX + "px";
  el.style.top = e.clientY + "px";
});

// opcional: efecto al pasar por enlaces
$("a").hover(
  function () {
    $(".cursor").addClass("cursor-grow");
  },
  function () {
    $(".cursor").removeClass("cursor-grow");
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

// PÁGINA NEWSLETTER

// Mostrar el día actual
$(document).ready(function () {
  const dias = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
  ];
  let hoy = new Date();
  $("#diaActual").text("Hoy es " + dias[hoy.getDay()]);

  $(document).ready(function () {
    const estados = [
      "Despejado",
      "Mayormente nublado",
      "Parcialmente nublado",
      "Lluvias ligeras",
      "Tormentas aisladas",
    ];

    // Cambia el estado del tiempo cada 6 segundos en cada bloque
    $(".dia").each(function (index, element) {
      let estadoElem = $(element).find(".estado");
      let i = 0;
      setInterval(function () {
        i = (i + 1) % estados.length;
        estadoElem.fadeOut(300, function () {
          $(this).text(estados[i]).fadeIn(300);
        });
      }, 6000 + index * 500); // escalonado para que no cambien todos a la vez
    });
  });

  // Efecto dinámico en el tráfico (cambia cada 7 segundos)
  const estadosTrafico = [
    "Tráfico fluido en la mayoría de avenidas",
    "Congestión en el centro histórico",
    "Retrasos en la línea de autobuses",
    "Carreteras despejadas hacia los templos",
  ];
  let indexTrafico = 0;
  setInterval(function () {
    indexTrafico = (indexTrafico + 1) % estadosTrafico.length;
    $("#traficoTexto").slideUp(500, function () {
      $(this).text(estadosTrafico[indexTrafico]).slideDown(500);
    });
  }, 7000);
});

// js y jquery para turismo
// $(document).ready(function() {
//   // Carrusel automático en naturaleza
//   let index = 0;
//   const images = $(".turismo-carrusel img");
//   setInterval(function() {
//     images.removeClass("active");
//     index = (index + 1) % images.length;
//     images.eq(index).addClass("active");
//   }, 4000);

//   // Animación de entrada en texto de naturaleza
//   $(".turismo-texto").hide().fadeIn(1500);

//   // Zoom en imagen de guías
//   $(".guias .turismo-imagen img").hover(function() {
//     $(this).css("transform", "scale(1.05)");
//   }, function() {
//     $(this).css("transform", "scale(1)");
//   });

//   // Rebote en botón de guías
//   $(".guias .turismo-btn").hover(function() {
//     $(this).animate({ marginTop: "-5px" }, 200).animate({ marginTop: "0px" }, 200);
//   });

//   // Scroll reveal en templos
//   $(window).on("scroll", function() {
//     $(".templos .turismo-contenido").each(function() {
//       if ($(this).offset().top < $(window).scrollTop() + $(window).height()) {
//         $(this).fadeIn(1000);
//       }
//     });
//   });

//   // Flip en tarjetas de itinerarios
//   $(".itinerarios .tarjeta").hover(function() {
//     $(this).toggleClass("flipped");
//   });

// Modal Rail Pass
// $(".railpass .turismo-btn").click(function (e) {
//   e.preventDefault();
//   $("#modalWindow").addClass("show-modal");
// });

// $(".close").click(function () {
//   $("#modalWindow").removeClass("show-modal");
// });

// $(window).click(function (e) {
//   if ($(e.target).is("#modalWindow")) {
//     $("#modalWindow").removeClass("show-modal");
//   }
// });
// // });

// document.addEventListener("DOMContentLoaded", function () {
//   const track = document.querySelector(".turismo-nat-track");
//   const slides = Array.from(document.querySelectorAll(".turismo-nat-slide"));
//   const dots = Array.from(document.querySelectorAll(".turismo-nat-dot"));
//   const overlay = document.querySelector(".turismo-nat-overlay");

//   let current = 0;
//   const total = slides.length;
//   let autoplay = true; // pon false si no quieres autoplay
//   const intervalMs = 5000;

//   function updateOverlay() {
//     const info = slides[current].getAttribute("data-info") || "";
//     overlay.textContent = info;
//   }

//   function goTo(index) {
//     current = (index + total) % total;
//     track.style.transform = `translateX(-${current * 100}%)`;
//     dots.forEach((d, i) => {
//       d.classList.toggle("active", i === current);
//       d.setAttribute("aria-selected", i === current ? "true" : "false");
//     });
//     updateOverlay();
//   }

//   // Init
//   goTo(0);

//   // Dots click
//   dots.forEach((dot, i) => {
//     dot.addEventListener("click", () => {
//       autoplay = false; // pausa autoplay si el usuario interactúa
//       goTo(i);
//     });
//   });

//   // Autoplay
//   let timer = null;
//   function startAutoplay() {
//     if (autoplay) {
//       timer = setInterval(() => goTo(current + 1), intervalMs);
//     }
//   }
//   function stopAutoplay() {
//     if (timer) clearInterval(timer);
//   }
//   startAutoplay();

//   // Pausar en hover sobre el carrusel
//   const carousel = document.querySelector(".turismo-nat-carousel");
//   carousel.addEventListener("mouseenter", stopAutoplay);
//   carousel.addEventListener("mouseleave", () => {
//     if (autoplay) startAutoplay();
//   });

//   // Seguridad: si alguna imagen falla, que no rompa
//   slides.forEach((slide) => {
//     const img = slide.querySelector("img");
//     img.addEventListener("error", () => {
//       overlay.textContent = "Imagen no disponible. Revisa la ruta.";
//       overlay.style.opacity = "1";
//     });
//   });
// });

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




// INFORMACION

$(document).ready(function () {
  console.log("Online con jQuery");

  //   convertiomos el titulo con draffable con jQueryUI
  $("#title").draggable();

  let $aBtns = $(".toggle");

  $aBtns.on("click", function (e) {
    e.preventDefault();
    // cancela el efvento por defecto que tenga el elemento de html

    let $this = $(this);
    let $this_p = $this.next();
    $this_p.slideToggle();
  });

  // show image on hover

  let $imgHover = $(".img-hover");

  $imgHover
    .on("mouseenter", function () {
      $(this).next().stop(true, true).slideDown();
    })
    .on("mouseleave", function () {
      $(this).next().stop(true, true).slideUp();
    });