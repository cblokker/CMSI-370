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

    $("#imageFemale").css("opacity", 0);

    $('.image').mousedown(function(e){
    	mousedown = true;
    	e.preventDefault();
    });

    $(document).mouseup(function(){
        mousedown = false;
    })
    
    $('.image').mousemove(function(e) {
    	if (mousedown == false) return;

    	imageCenterX = (offset.left) + (img.width() / 2);
        imageCenterY = (offset.top) + (img.height() / 2);
        mouseX = e.pageX;
        mouseY = e.pageY;
        radians = Math.atan2(mouseX - imageCenterX, mouseY - imageCenterY);
        degree = (radians * (180 / Math.PI) * -1) + 135;
        img.css('-moz-transform', 'rotate(' + degree + 'deg)');
        img.css('-webkit-transform', 'rotate(' + degree + 'deg)');
        img.css('-o-transform', 'rotate(' + degree + 'deg)');
        img.css('-ms-transform', 'rotate(' + degree + 'deg)');

        opacityMale = ((135 - degree)*0.008);
        opacityFemale = (degree*0.008);

        if (mouseX > imageCenterX) {
            $("#imageMale").css("opacity", opacityMale);
            $("#imageFemale").css("opacity", opacityFemale);
        }

        if ( (mouseX < (imageCenterX + 30)) && (mouseX > (imageCenterX - 30)) && (mouseY > (imageCenterY)) ) {
            $('a#buttonFemale').addClass("down");
        } else {
            $('a#buttonFemale').removeClass("down");
        }

        if ( (mouseY < (imageCenterX + 80)) && (mouseX > (imageCenterX + 30)) && (mouseY < (imageCenterY - 30)) ) {
            $('a#buttonMale').addClass("down");
        } else {
            $('a#buttonMale').removeClass("down");
        }
    });
}

