Final.graphics = (function() {
    'use strict';

    let width = 1000;

    //------------------------------------------------------------------
    //
    // Public function that allows the client code to clear the canvas.
    //
    //------------------------------------------------------------------
    function clear() {
        Final.context.clearRect(0, 0, Final.canvas.width, Final.canvas.height);
    }

    // --------------------------------------------------------------
    //
    // Draws a texture to the canvas with the following specification:
    //    image: Image
    //    center: {x: , y: }
    //    rotation:     // radians
    //    size: { width: , height: }
    //
    // --------------------------------------------------------------
    function drawTexture(image, center, rotation, size) {
        Final.context.save();

        Final.context.translate(center.x, center.y);
        Final.context.rotate(rotation);
        Final.context.translate(-center.x, -center.y);

        Final.context.drawImage(
            image,
            center.x - size.x / 2,
            center.y - size.y / 2,
            size.x, size.y);

        Final.context.restore();
    }

    // --------------------------------------------------------------
    //
    // Draw a rectangle to the canvas with the following attributes:
    //      center: { x: , y: },
    //      size: { x: , y: },
    //      rotation:       // radians
    //
    // --------------------------------------------------------------
    function drawRectangle(rect) {
        Final.context.save();
        Final.context.translate(rect.center.x, rect.center.y );
        Final.context.rotate(rect.rotation);
        Final.context.translate(-rect.center.x, -rect.center.y);
        
        Final.context.fillStyle = rect.fill;
        Final.context.fillRect(rect.center.x - rect.size.x / 2, rect.center.y - rect.size.y / 2, rect.size.x, rect.size.y);
        
        // Final.context.strokeStyle = rect.stroke;
        // Final.context.strokeRect(rect.center.x - rect.size.x / 2, rect.center.y - rect.size.y / 2, rect.size.x, rect.size.y);

        Final.context.restore();
    }

    let api = {
        clear: clear,
        drawTexture: drawTexture,
        drawRectangle: drawRectangle,
        width: width,
    };

    return api;
}());
