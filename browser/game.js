// project.currentStyle = {
// 	fillColor: 'black'
// };

// var mirrorPositions = [[255, 129],[600,200]];

// var mirrorPaths = [];
// for (var i = 0, l = mirrorPositions.length; i < l; i++) {
// 	var rectPath = new Path.Rectangle({
// 		point: mirrorPositions[i],
// 		size: [150, 10]
// 	});
// 	mirrorPaths.push(rectPath);
// }

// function onMouseDrag(event) {

	// window.addEventListener('deviceorientation', function (e) {
		// console.log(e)
		// var mx = Math.floor(e.gamma*20);
		// var my = Math.floor(e.beta*20);

		// var px;
		// var py;

		// for(var i=0; i<mirrorPaths.length; i++) {
			// px = mirrorPositions[i][0];
			// py = mirrorPositions[i][1];
			// mirrorPaths[i].rotation = (180*Math.atan((my-py)/(mx-px))/Math.PI);
			// mirrorPaths[0].rotation = e.beta;
		// }	
	// })	
// }



// function onMouseMove(event) {

// 	var mx = event.event.x - 85;
// 	var my = event.event.y;
// 	var px;
// 	var py;

// 	for(var i=0; i<mirrorPaths.length; i++) {
// 		px = mirrorPositions[i][0];
// 		py = mirrorPositions[i][1];
// 		mirrorPaths[i].rotation = (180*Math.atan((my-py)/(mx-px))/Math.PI);
// 	}	
// }

