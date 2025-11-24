// efectos para el cursor

$(document).mousemove(function(e) {
  $(".cursor").css({
    left: e.pageX + "px",
    top: e.pageY + "px"
  });
});

$("a").hover(
  function() {
    $(".cursor").css({ transform: "translate(-50%, -50%) scale(1.5)" });
  },
  function() {
    $(".cursor").css({ transform: "translate(-50%, -50%) scale(1)" });
  }
);
