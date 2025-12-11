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
  const hero = document.querySelector(".hero-kyoto-news");
  const title = document.querySelector(".hero-title-news");

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
