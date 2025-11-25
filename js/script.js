// efectos para el cursor

// $(document).mousemove(function(e) {
//   $(".cursor").css({
//     left: e.pageX + "px",
//     top: e.pageY + "px"
//   });
// });

// $("a").hover(
//   function() {
//     $(".cursor").css({ transform: "translate(-50%, -50%) scale(1.5)" });
//   },
//   function() {
//     $(".cursor").css({ transform: "translate(-50%, -50%) scale(1)" });
//   }
// );


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