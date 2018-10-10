function moveBgAround(xFactor, yFactor, timeFactor) {

    // Set default values
    if (xFactor    === undefined) { xFactor    = 201;  }
    if (yFactor    === undefined) { yFactor    = 201;  }
    if (timeFactor === undefined) { timeFactor = 1001; }

    var xDest = -1 * (Math.floor(Math.random() * 201));
    var yDest = -1 * (Math.floor(Math.random() * 201));
    var time  =       Math.floor(Math.random() * 1001) + 2000;
    $("#h").animate({
        backgroundPosition: "(" + xDest + "px " + yDest + "px)"
    }, time, "swing", function() {
        moveBgAround(xFactor, yFactor, timeFactor);
    });
}
