var slideIndex = 1;
sliding = false;
$(document).ready(function() {
$('#fullpage').fullpage({
    autoScrolling: false,

});
});

$('body').scrollspy({target: '#navbar-example'});
