var startGender = function () {
    
    // Variables for rotation calculation
    var imageCenterX,
        imageCenterY,
        mouseX,
        mouseY,
        radians,
        inerval,
        degree = 0;
        img = $('.image'),
        offset = img.offset(),
        
        // Boolean to indicate when the mouse is down
        // to indicate when the mouse is down AND moving to
        // rotate dial.  Probably a better event driven way to do this. 
        mousedown = false,
        moveMouse = false,

        // Constants for male and female degree positons
        femaleDegree = 135,
        maleDegree = 0,
        snapThreshold = 7;


    //Initialize the gender slider
    $("#imageFemale").css("opacity", 0);
    $('a#buttonMale').addClass("down");
    $('.arrow').fadeOut(0).delay(1500);


    /**
     * Ensure mouse is down to enable dragging
     */    
    $('.image').mousedown(function(e){
    	mousedown = true;
    	e.preventDefault();  //prevents image from being dragged
    });


    /**
     * Ensure mouse is down to enable dragging
     */
    $(document).mouseup(function(){
        mousedown = false;
    });
     

    // Fade in and out arrow - have to figure out an event driven way to implement this
    // so when the user moves the dial, the arrow fades out and stops
    interval = setInterval(function () {
        $('.arrow').fadeIn(1500).delay(150).fadeOut(1500);
    }, 3);


    /**
     * Detect when mouse is moving
     */
    $('.image').mousemove(function(e) {
        
        // Image only updates when mouse is down and moving
    	if (!mousedown) return;
             
        // Calculate degree based off of cursor position relative to center of image
    	imageCenterX = (offset.left) + (img.width() / 2);
        imageCenterY = (offset.top) + (img.height() / 2);
        mouseX = e.pageX;
        mouseY = e.pageY;
        radians = Math.atan2(mouseX - imageCenterX, mouseY - imageCenterY);
        degree = (radians * (180 / Math.PI) * -1) + femaleDegree;
        
        // Only rotate between maleDegree position (0) and femaleDegree position (135)
        if ((degree > maleDegree) && (degree < femaleDegree)) {
            // Rotate the image as a funciton of degree
            rotateImage(degree);
        
            // When degree becomes close enough to femaleDegree position, snap into place and toggle female button
            if ( degree > (femaleDegree - snapThreshold) ) {
                $('a#buttonFemale').addClass("down");
                $("#imageMale").css("opacity", 0);
                rotateImage( femaleDegree );

            // When degree becomes close enough to maleDegree position, snap into place and toggle male button
            } else if (degree < (maleDegree + snapThreshold)){
                $('a#buttonMale').addClass("down");
                $("#imageFemale").css("opacity", 0);
                rotateImage(maleDegree);
                
            } else {
                $('a#buttonFemale').removeClass("down");
                $('a#buttonMale').removeClass("down");
                // $(".arrow").css("opacity", 0);
                clearInterval(interval);
            }
        }
    });
    

    /**
     * When the female button is clicked, the dial turns to the female position
     */
    $('a#buttonFemale').click(function(){
        
        // A hack solution to animate the dial.  Theres got to be a much cleaner 
        // way to create a delay without use of setInterval
        if (degree <= 135) {
            var ints = setInterval(function() {rotateImage(degree); degree += 1; if(degree > 135) clearInterval(ints) }, 1);
        }

        $('a#buttonMale').removeClass("down");
        $(this).addClass("down");
    });


    /**
     * When the male button is clicked, the dial turns to the male position
     */
    $('a#buttonMale').click(function(){

        // A hack solution to animate the dial.  Theres got to be a much cleaner 
        // way to create a delay without use of setInterval
        if (degree >= 0) {
            var ints = setInterval(function() {if(degree <= 0) clearInterval(ints); rotateImage(degree); degree -= 1 }, 1);
        }

        $(this).addClass("down");
        $('a#buttonFemale').removeClass("down");
    });


    /**
     * Rotate the image by updating css
     */
    rotateImage = function (deg) {

        // Opacity magnitude of male and female images are a function of degree of rotation
        opacityMale = (((femaleDegree - snapThreshold) - deg) * 0.009);
        opacityFemale = ((deg - snapThreshold)*0.009);
        $("#imageMale").css("opacity", opacityMale);
        $("#imageFemale").css("opacity", opacityFemale);

        img.css('-moz-transform', 'rotate(' + deg + 'deg)');
        img.css('-webkit-transform', 'rotate(' + deg + 'deg)');
        img.css('-o-transform', 'rotate(' + deg + 'deg)');
        img.css('-ms-transform', 'rotate(' + deg + 'deg)');  
    }
}

