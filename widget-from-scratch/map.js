var startGender = function () {
    
    // Variables for rotation calculation
    var imageCenterX,
        imageCenterY,
        mouseX,
        mouseY,
        radians,
        degree,
        img = $('.image'),
        offset = img.offset(),
        
        // Boolean to indicate when the mouse is down.  Used to 
        mousedown = false,

        // Constants for male and female degree positons
        femaleDegree = 135,
        maleDegree = 0;

    //Initialize the gender slider
    $("#imageFemale").css("opacity", 0);
    $('a#buttonMale').addClass("down");

    /**
     * 
     */    
    $('.image').mousedown(function(e){
    	mousedown = true;
    	e.preventDefault();  //prevents image from being dragged
    });

    /**
     * Ensure mouse is down 
     */
    $(document).mouseup(function(){
        mousedown = false;
    })

    /**
     * Detect when mouse is moving
     */
    $('.image').mousemove(function(e) {

        // Image only updates when mouse is down and moving
    	if (mousedown == false) return;
        
        // Calculate degree based off of cursor position relative to center of image
    	imageCenterX = (offset.left) + (img.width() / 2);
        imageCenterY = (offset.top) + (img.height() / 2);
        mouseX = e.pageX;
        mouseY = e.pageY;
        radians = Math.atan2(mouseX - imageCenterX, mouseY - imageCenterY);
        degree = (radians * (180 / Math.PI) * -1) + femaleDegree;
        
        // Only rotate from maleDegree position to femaleDegree position
        if ((degree > maleDegree) && (degree < femaleDegree)) {

            // Rotate the image as a funciton of degree
            rotateImage(degree);

            // Opacity magnitude of male and female images are a function of degree of rotation
            opacityMale = ((femaleDegree - degree) * 0.008);
            opacityFemale = (degree*0.008);
            $("#imageMale").css("opacity", opacityMale);
            $("#imageFemale").css("opacity", opacityFemale);
        
            // When degree becomes close enough to femaleDegree position, snap into place and toggle female button
            if ( degree > (femaleDegree - 10) ) {
                $('a#buttonFemale').addClass("down");
                rotateImage( femaleDegree );

            // When degree becomes close enough to maleDegree position, snap into place and toggle male button
            } else if (degree < (maleDegree + 10)){
                $('a#buttonMale').addClass("down");
                rotateImage(maleDegree);

            } else {
                $('a#buttonFemale').removeClass("down");
                $('a#buttonMale').removeClass("down");
            }
        }
    });

    /**
     * Rotate the image by updating css
     */
    rotateImage = function (deg) {
        img.css('-moz-transform', 'rotate(' + deg + 'deg)');
        img.css('-webkit-transform', 'rotate(' + deg + 'deg)');
        img.css('-o-transform', 'rotate(' + deg + 'deg)');
        img.css('-ms-transform', 'rotate(' + deg + 'deg)');  
    }
}

