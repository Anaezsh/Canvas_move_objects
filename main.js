var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
context.fillStyle = "#f4ff57";
context.strokeStyle = "#fc3636";
context.lineWidth = 4;

var rects = [];

var mouse = {
  x: 0,
  y: 0,
  down: false
}

canvas.onmousemove = function(e) {
  mouse.x = e.pageX;
  mouse.y = e.pageY;
}

canvas.onmousedown = function() {
  mouse.down = true;
}

canvas.onmouseup = function() {
  mouse.down = false;
}

// canvas.onclick = function(e) {
//   var x = e.pageX;
//   var y = e.pageY;
//   for(var i=0; i<rects.length; i++) {
//     if(isCursorInRect(x,y,rects[i])) {
//       rects[i].select();
//     }
//   }
// }

function fillRect(x,y,w,h) {
  context.fillRect(x,y,w,h);
}

function strokeRect(x,y,w,h) {
  context.strokeRect(x,y,w,h);
}

function isCursorInRect(x,y,rect) {
  return (x>rect.x && x<rect.x+rect.w && y>rect.y && y<rect.y+rect.h);
}

var Rect = function(x,y,w,h) {
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
}
Rect.prototype.draw = function() {
  fillRect(this.x,this.y,this.w,this.h);
}
Rect.prototype.stroke = function() {
  strokeRect(this.x,this.y,this.w,this.h);
}
Rect.prototype.select = function() {
  this.selected = !this.selected;
}

function init() {
  for(var i=0; i<5; i++) {
    rects.push(new Rect(50+i*60,50,50,50));
    rects[i].draw();
  }
}

function render() {
  context.clearRect(0,0,canvas.width,canvas.height);
  for(var i=0; i<rects.length; i++) {
    rects[i].draw();
    if(isCursorInRect(mouse.x,mouse.y,rects[i])) {
      rects[i].stroke();
    }
    if(isCursorInRect(mouse.x,mouse.y,rects[i]) && mouse.down) {
      rects[i].x = mouse.x - rects[i].w/2;
      rects[i].y = mouse.y - rects[i].h/2;
    }
  }
  requestAnimationFrame(render);
}

init();
render();
