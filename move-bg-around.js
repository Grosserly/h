function moveBgAround() {
    var x = Math.floor(Math.random() * 201);
    var y = Math.floor(Math.random() * 201);
    var time = Math.floor(Math.random() * 1001) + 2000;
    $('#h').animate({
        backgroundPosition: '(' + (x * -1) + 'px ' + (y * -1) + 'px)'
    }, time, "swing", function() {
        moveBgAround();
    });
}
