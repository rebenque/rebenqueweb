//jQuery for page scrolling feature - requires jQuery Easing plugin
$(function() {
    var switchers = $('.rbq-opacity-switcher');
    $.each(switchers, function() {
      var switcher = $(this),
          firstChild = switcher.children(":first-child");
      firstChild.addClass("active");
      setInterval(function () {
        var activeElement = switcher.children(".active"),
            nextElement = activeElement.is(":last-child")?
              firstChild: activeElement.next();

        activeElement.removeClass("active");
        nextElement.addClass("active");
      }, 4000);
    });
});
