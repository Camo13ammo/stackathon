// this is global now 
window.whiteboard = new window.EventEmitter();

(function () {

    project.currentStyle = {
        fillColor: 'black'
    };

    var mirrorPositions = [[255, 129],[400,350], [200, 500]];

    var mirrorPaths = [];
    for (var i = 0, l = mirrorPositions.length; i < l; i++) {
        var rectPath = new Path.Rectangle({
            point: mirrorPositions[i],
            size: [150, 10]
        });
        mirrorPaths.push(rectPath);
    }

    window.addEventListener('deviceorientation', function (e) {
        var angle = {};

        angle.x = Math.floor(e.gamma*50);
        angle.y = Math.floor(e.beta*50);

        whiteboard.rotate(angle, true);
    })

    whiteboard.rotate = function (angle, shouldBroadcast) {

        my = angle.y;
        mx = angle.x;
        px = 255;
        py = 129;

        mirrorPaths[0].rotation = (Math.floor(180*Math.atan((my-py)/(mx-px))/Math.PI));
        view.update([true])

        if (shouldBroadcast) {
            whiteboard.emit('rotate', angle);
        }
        
    };
})();



    // var canvas = document.querySelector('#paint');
    // var sketch = document.querySelector('#sketch');
    // var sketchStyle = getComputedStyle(sketch);

    // canvas.width = parseInt(sketchStyle.getPropertyValue('width'));
    // canvas.height = parseInt(sketchStyle.getPropertyValue('height'));

    // var ctx = canvas.getContext('2d');


    // ctx.lineWidth = 5;
    // ctx.lineJoin = 'round';
    // ctx.lineCap = 'round';




    // canvas.addEventListener('mousedown', function (e) {
    //     drawing = true;
    //     currentMousePosition.x = e.pageX - this.offsetLeft;
    //     currentMousePosition.y = e.pageY - this.offsetTop;
    // });

    // canvas.addEventListener('mouseup', function () {
    //     drawing = false;
    // });

    // canvas.addEventListener('mousemove', function (e) {

    //     if (!drawing) return;

    //     lastMousePosition.x = currentMousePosition.x;
    //     lastMousePosition.y = currentMousePosition.y;

    //     currentMousePosition.x = e.pageX - this.offsetLeft;
    //     currentMousePosition.y = e.pageY - this.offsetTop;

    //     whiteboard.draw(lastMousePosition, currentMousePosition, color, currentMousePosition.x, true);

    // });