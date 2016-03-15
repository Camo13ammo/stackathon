// this is global now 
window.whiteboard = new window.EventEmitter();

(function () {

    // project.currentStyle = {
    //     fillColor: 'black'
    // };

    var walls = [];
    for(var i=0; i<4; i++) {
    }
    var wall1 = new Path.Rectangle(new Rectangle(0, 0, 3000, 10))
    var wall2 = new Path.Rectangle(new Rectangle(0, 0, 10, 1000))
    var wall3 = new Path.Rectangle(new Rectangle(0, 1000, 3000, 10))
    var wall4 = new Path.Rectangle(new Rectangle(3000, 0, 10, 1010))
    var walls = [wall1, wall2, wall3, wall4];

    for(var i=0; i<walls.length; i++) {
        walls[i].fillColor = 'black';
        walls[i].isWall = true;
    }

    var laser = new Path();
    laser.x = 175;
    laser.y = 999;
    laser.angle = -90;
    laser.strokeColor = 'red';

    var mirrorPositions = [[100, 100], [1000, 110], [1300, 700], [1900, 200]];

    var mirrorPaths = [];
    for (var i = 0, l = mirrorPositions.length; i < l; i++) {
        var rectPath = new Path.Rectangle({
            point: mirrorPositions[i],
            size: [150, 10]
        });
        rectPath.fillColor = 'black';
        mirrorPaths.push(rectPath);
    }
    mirrorPaths[0].rotation = -45.5;
    mirrorPaths[1].rotation = 30;
    mirrorPaths[2].rotation = 10;
    mirrorPaths[3].rotation = 0;

    // mirrorPaths[1].rotation = 35;


    function degToRad(deg) {
        return Math.PI*deg/180;
    }

    function radToDeg(deg) {
        return deg*180/Math.PI;
    }

    var rigged = [[1,1], [-1,1], [1, -1], [0, 1]]


    function generateLaser() {
    laser.add(new Point(laser.x, laser.y));

 
        var notWall = true;
        var mirror = false;
        var p=6000;
        var t=1;
        var x;
        var y;
        while(notWall) {
            mirror = false;

            x = Math.floor(laser.x + p*Math.cos(degToRad(laser.angle)));
            y = Math.floor(laser.y + p*Math.sin(degToRad(laser.angle)));

            laser.add(new Point(x, y));

            for(var i=0; i<mirrorPaths.length; i++) {
                if(laser.getIntersections(mirrorPaths[i])length > 0) {
                    var intersect = laser.getIntersections(mirrorPaths[i]);
                    var newpt = new Point(intersect[0].point.x+rigged[i][0], intersect[0].point.y+rigged[i][1]);
                    laser.segments[laser.segments.length-1].point = newpt;
                    laser.x = newpt.x;
                    laser.y = newpt.y;
                    laser.angle = -1*(laser.angle - 2*mirrorPaths[i].rotation);
                    mirror = true;
                }
            }

            if(!mirror) {
                for(var i=0; i<walls.length; i++) {
                    if(laser.getIntersections(walls[i]).length > 0) {
                        var endit = laser.getIntersections(walls[i]);
                        var end = new Point(endit[0].point.x, endit[0].point.y);
                        laser.segments[laser.segments.length-1].point = end;
                        notWall = false;
                    }
                }
            }

            t++;

            if(t === 500) {
                notWall = false;
            }
        }
    }

    generateLaser();



    // window.addEventListener('deviceorientation', function (e) {
    //     var angle = {};

    //     angle.x = Math.floor(e.gamma*50);
    //     angle.y = Math.floor(e.beta*50);

    //     whiteboard.rotate(angle, [socket.id], socket.id, true);

    //     laser.removeSegments();
    //     laser = new Path();
    //     laser.x = 175;
    //     laser.y = 999;
    //     laser.angle = -90;
    //     laser.strokeColor = 'red';


    //     generateLaser();
    // });

    window.addEventListener('mousemove', function (e) {
        var angle = {};

        angle.x = e.x;
        angle.y = e.y;

        whiteboard.rotate(angle, [socket.id], socket.id, false, true);

        // laser.removeSegments();
        // laser = new Path();
        // laser.x = 175;
        // laser.y = 999;
        // laser.angle = -90;
        // laser.strokeColor = 'red';


        // generateLaser();
        // view.update([true]);


    });

    


    whiteboard.rotate = function (angle, socketIds, theSocket, assign, shouldBroadcast) {
        if(assign){
            for(var i=0; i<socketIds.length; i++) {
                mirrorPaths[i].player = socketIds[i];
            }
        }
        my = angle.y;
        mx = angle.x;
        px = 255;
        py = 129;


        for(var i=0; i<mirrorPaths.length; i++) {
            if(mirrorPaths[i].player === theSocket) {
                mirrorPaths[i].rotation = (Math.floor(180*Math.atan((my-py)/(mx-px))/Math.PI));
            }
        }


        laser.removeSegments();
        laser = new Path();
        laser.x = 175;
        laser.y = 999;
        laser.angle = -90;
        laser.strokeColor = 'red';

        generateLaser();
        view.update([true]);

        if (shouldBroadcast) {
            whiteboard.emit('rotate', angle, socketIds, socket.id);
        }

        
    };
})();
