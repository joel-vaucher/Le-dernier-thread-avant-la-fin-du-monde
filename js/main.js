var canvas = null;
var posX = 0;
var tabThreads = [];
var tabMutex = [];
var tabSemaphore = [];
var tabBarriere = [];
var index = 0;
var nbTick = 0;
var selection = null;
var start = false;

window.onload = function(){
    canvas = document.getElementById("canvas");

    var displayWidth = $('#container').width();
    var displayHeight = $('#container').height();
    canvas.width = parseInt(displayWidth * 0.8);
    canvas.height =  parseInt(displayHeight * 0.8);

	changeNbThread();
	tabThreads[0].color = '#0000ff';

	/*tabThreads[0].content[0] = new Block($('canvas'), 0, 0, '#00ff00', tabSemaphore["s1"]);
	tabThreads[1].content[0] = new Block($('canvas'), 1, 0, '#00ff00', tabSemaphore["s1"]);
	tabThreads[2].content[0] = new Block($('canvas'), 2, 0, '#00ff00', tabSemaphore["s1"]);
	
	tabThreads[0].content[1] = new Block($('canvas'), 0, 1, '#ff0000', tabMutex["m2"]);
	tabThreads[1].content[1] = new Block($('canvas'), 1, 1, '#ff0000', tabMutex["m2"]);
	tabThreads[2].content[1] = new Block($('canvas'), 2, 1, '#ff0000', tabMutex["m2"]);
	
	tabThreads[0].content[2] = new Block($('canvas'), 0, 1, '#0000ff', tabBarriere["b1"]);
	tabThreads[1].content[2] = new Block($('canvas'), 1, 1, '#0000ff', tabBarriere["b1"]);
	tabThreads[2].content[2] = new Block($('canvas'), 2, 1, '#0000ff', tabBarriere["b1"]);*/

    tick();
};

function drawMicroProcesseur() {

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

function changeThread(){
	nbTick = 0;
	tabThreads[index].color = '#000055';
	index = (index+1)%tabThreads.length;
	tabThreads[index].color = '#0000ff';
}

function tick() {
	if(start){
		nbTick++;
		if(nbTick > 100){
			changeThread();
		}
		if(!tabThreads[index].update()){
			changeThread();
		}
	}
	
	requestAnimationFrame(tick);
	resize();
	drawMicroProcesseur();
}

function restate() {
    var name = $("#strucname").val();
    var n = $("#strucN").val();
    var isRien = $("#staterien").is(':checked');
    var isMutex = $("#statemutex").is(':checked');
    var isSemaphore = $("#statesemaphore").is(':checked');
    var isBarriere = $("#statebarrier").is(':checked');
    var idt = selection.idthread;
    var idb = selection.idblock;
    if(selection != null){
        if(isRien){
            tabThreads[idt].content[idb] = new Block($('canvas'), idt, idb);
        } else if (isMutex) {
            if(!(name in tabMutex)){
                tabMutex[name] = new Mutex();
            }
            tabThreads[idt].content[idb] = new Block($('canvas'), idt, idb, '#ff0000', tabMutex[name]);
        } else if (isSemaphore) {
            if(!(name in tabSemaphore)){
                tabSemaphore[name] = new Semaphore(n);
            }
            tabThreads[idt].content[idb] = new Block($('canvas'), idt, idb, '#00ff00', tabSemaphore[name]);
        } else if (isBarriere) {
            if(!(name in tabBarriere)){
                tabBarriere[name] = new Barriere(n);
            }
            tabThreads[idt].content[idb] = new Block($('canvas'), idt, idb, '#0000ff', tabBarriere[name]);
        }
    }
    return false;
}

function startStop(){
	start = !start;
}

function changeNbThread(){
    var nbThreads = $("#spinThreads").val();
	while(nbThreads < tabThreads.length){
		tabThreads.splice(tabThreads.length-1,1);
	}
	for(var i = tabThreads.length; i < nbThreads; i++){
		tabThreads.push(new Thread(100 + i*100, $('canvas'), i));
	}
	if(index > tabThreads.length-1){
		index=0;
		tabThreads[0].color = '#0000ff';
	}
}