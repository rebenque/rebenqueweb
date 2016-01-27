//jQuery for page scrolling feature - requires jQuery Easing plugin
$(function() {
    $('a.page-scroll-parallax').bind('click', function(event) {
        var $anchor = $(this);
        //$('html, body, .rbq-parallax').stop().animate({
        $('.rbq-parallax').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top + $('.rbq-parallax').scrollTop()
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });
});
$(function() {
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body, .rbq-parallax').stop().animate({
        //$('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });
});


/*
function setBindings() {
  $("li a").click(function(e){
    e.preventDefault();
    var sectionId = e.currentTarget.id + "Section";
    $("html").animate({
      scrollTop: $("#" + sectionId).position().top +"px"
    },1000)
  });
  */
