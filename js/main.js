var canvas = null;
var posX = 0;
var tabThreads = [];
var index = 0;
var nbTick = 0;

window.onload = function(){
    canvas = document.getElementById("canvas");

    var displayWidth = $('#container').width();
    var displayHeight = $('#container').height();
    canvas.width = parseInt(displayWidth * 0.8);
    canvas.height =  parseInt(displayHeight * 0.8);

    console.log(canvas.width);
	
	tabThreads.push(new Thread(100, $('canvas')));
	tabThreads.push(new Thread(200, $('canvas')));
	tabThreads.push(new Thread(300, $('canvas')));
	tabThreads[0].color = '#0000ff';
	

    tick();
};

function  drawMicroProcesseur() {

   //background
    $('canvas').drawRect({
        fillStyle: '#bfbfbf',
        x:0, y: 0,
        width: canvas.width,
        height: canvas.height,
        fromCenter: false
    });

    //Microprocesseur
    /*$('canvas').drawRect({
		name: 'thread',
		layer: true,
        fillStyle: '#fdff3d',
        x:posX, y: 100,
        width: 100,
        height: 100,
        fromCenter: true
    });*/
	
	for (var i = 0; i < tabThreads.length; i++) {
		tabThreads[i].draw();
	}
	
}

function resize(){
    var displayWidth = $('#container').width();
    var displayHeight = $('#container').height();
    canvas.width = parseInt(displayWidth * 0.8);
    canvas.height =  parseInt(displayHeight * 0.8);
}

function tick() {
	nbTick++;
	if(nbTick > 100){
		nbTick = 0;
		tabThreads[index].color = '#000055';
		index = (index+1)%tabThreads.length;
		tabThreads[index].color = '#0000ff';
	}
	requestAnimationFrame(tick);
	resize();
	drawMicroProcesseur();
	tabThreads[index].move();
}


