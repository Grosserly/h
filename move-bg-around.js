(function moveBgAround() {
    var x    = -1 * (Math.floor(Math.random() * 201));
    var y    = -1 * (Math.floor(Math.random() * 201));
    var time =       Math.floor(Math.random() * 1001) + 2000;
    $("#h").animate({
        backgroundPosition: "(" + x + "px " + y + "px)"
    }, time, "swing", function() {
        moveBgAround();
    });
})();
