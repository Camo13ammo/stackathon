


// we need this socket object to send messages to our server 
var socket = io(window.location.origin); 

socket.on('connect', function(){

  console.log('I have made a persistent two-way connection to the server!'); 


  // the draw event is emitted in whiteboard.js and caught here
  whiteboard.on('rotate', function toBeRunOnlyOnDraw(angle, ids, id){
      socket.emit('imTurning', angle, ids, id);
  })

  socket.on('otherTurn', function(angle, ids, id){
    whiteboard.rotate(angle, ids, id, true)
  })
  
})


// ////rooms: 
// var socket = io(location.origin);

// socket.on('connect', function () {

//     var room = 'room';

//     socket.emit('wantToJoinRoomPlox', room);

//     whiteboard.on('draw', function (start, end, color) {
//         socket.emit('newDraw', start, end, color);
//     });



//     socket.on('drawHistory', function (drawHistory) {
//         drawHistory.forEach(function (draw) {
//             whiteboard.draw(draw.start, draw.end, draw.color);
//         });
//     });

//     socket.on('someoneElseDrew', function (start, end, color) {
//         whiteboard.draw(start, end, color);
//     });

// });
