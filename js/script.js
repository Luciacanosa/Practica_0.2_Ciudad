// efectos para el cursor

$(document).mousemove(function (e) {
  $(".cursor").css({
    left: e.clientX + "px",  // 👈 usa clientX/clientY
    top: e.clientY + "px"
  });
});

document.addEventListener("mousemove", (e) => {
  const el = document.querySelector(".cursor");
  if (!el) return;
  el.style.left = e.clientX + "px";
  el.style.top  = e.clientY + "px";
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

// 👇 Abrir modal automáticamente a los 10 segundos
setTimeout(openModalWindow, 10000);



// carrusel fotos parte historia pag principal
function iniciarCarrusel(selector) {
  const images = document.querySelectorAll(selector + " img");
  let index = 0;

  function showNextImage() {
    images.forEach(img => img.classList.remove("active"));
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
$(document).ready(function() {
  const dias = ["Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado"];
  let hoy = new Date();
  $("#diaActual").text("Hoy es " + dias[hoy.getDay()]);

  $(document).ready(function() {
  const estados = [
    "Despejado",
    "Mayormente nublado",
    "Parcialmente nublado",
    "Lluvias ligeras",
    "Tormentas aisladas"
  ];

  // Cambia el estado del tiempo cada 6 segundos en cada bloque
  $(".dia").each(function(index, element) {
    let estadoElem = $(element).find(".estado");
    let i = 0;
    setInterval(function() {
      i = (i + 1) % estados.length;
      estadoElem.fadeOut(300, function() {
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
    "Carreteras despejadas hacia los templos"
  ];
  let indexTrafico = 0;
  setInterval(function() {
    indexTrafico = (indexTrafico + 1) % estadosTrafico.length;
    $("#traficoTexto").slideUp(500, function() {
      $(this).text(estadosTrafico[indexTrafico]).slideDown(500);
    });
  }, 7000);
});





// js y jquery para turismo
$(document).ready(function() {
  // Carrusel automático en naturaleza
  let index = 0;
  const images = $(".turismo-carrusel img");
  setInterval(function() {
    images.removeClass("active");
    index = (index + 1) % images.length;
    images.eq(index).addClass("active");
  }, 4000);

  // Animación de entrada en texto de naturaleza
  $(".turismo-texto").hide().fadeIn(1500);

  // Zoom en imagen de guías
  $(".guias .turismo-imagen img").hover(function() {
    $(this).css("transform", "scale(1.05)");
  }, function() {
    $(this).css("transform", "scale(1)");
  });

  // Rebote en botón de guías
  $(".guias .turismo-btn").hover(function() {
    $(this).animate({ marginTop: "-5px" }, 200).animate({ marginTop: "0px" }, 200);
  });

  // Scroll reveal en templos
  $(window).on("scroll", function() {
    $(".templos .turismo-contenido").each(function() {
      if ($(this).offset().top < $(window).scrollTop() + $(window).height()) {
        $(this).fadeIn(1000);
      }
    });
  });

  // Flip en tarjetas de itinerarios
  $(".itinerarios .tarjeta").hover(function() {
    $(this).toggleClass("flipped");
  });

  // Modal Rail Pass
  $(".railpass .turismo-btn").click(function(e) {
    e.preventDefault();
    $("#modalWindow").addClass("show-modal");
  });

  $(".close").click(function() {
    $("#modalWindow").removeClass("show-modal");
  });

  $(window).click(function(e) {
    if ($(e.target).is("#modalWindow")) {
      $("#modalWindow").removeClass("show-modal");
    }
  });
});

