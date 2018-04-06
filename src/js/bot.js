$('.bot').mouseenter(function(e) {
  e.preventDefault();
  $('.bulle').fadeIn('slow');
});

$('.bot').mouseleave(function(e) {
  e.preventDefault();
  $('.bulle').fadeOut('slow');
});
