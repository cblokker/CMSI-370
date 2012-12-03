var startGender = function () {
    
    var imageCenterX,
        imageCenterY,
        mouseX,
        mouseY,
        radians,
        degree;

    var img = $('.image');
    var offset = img.offset();
    var mousedown = false;

    $('.image').mousedown(function(e){
    	mousedown = true;
    	e.preventDefault();
    });

    $(document).mouseup(function(){
        mousedown = false;
    })
    
    $('.image').mousemove(function(e) {
    	if (mousedown == false) return;

    	center_x = (offset.left) + (img.width()/2);
        center_y = (offset.top) + (img.height()/2);
        mouse_x = e.pageX;
        mouse_y = e.pageY;
        radians = Math.atan2(mouse_x - center_x, mouse_y - center_y);
        degree = (radians * (180 / Math.PI) * -1) + 135;
        img.css('-moz-transform', 'rotate(' + degree + 'deg)');
        img.css('-webkit-transform', 'rotate(' + degree + 'deg)');
        img.css('-o-transform', 'rotate(' + degree + 'deg)');
        img.css('-ms-transform', 'rotate(' + degree + 'deg)');
    });
}

