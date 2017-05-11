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
var nbTicksForChange = 100;

window.onload = function(){
    canvas = document.getElementById("canvas");

    var displayWidth = $('#container').width();
    var displayHeight = $('#container').height();
    canvas.width = parseInt(displayWidth * 0.8);
    canvas.height =  parseInt(displayHeight * 0.8);

	changeNbThread();
	tabThreads[0].color = '#0000ff';

    tick();
};

function draw() {

   //background
    $('canvas').drawRect({
        fillStyle: '#bfbfbf',
        x:0, y: 0,
        width: canvas.width,
        height: canvas.height,
        fromCenter: false
    });

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
	nbTicksForChange = 50 + Math.random()*150;
}

function tick() {
	if(start){
		nbTick++;
		if(nbTick > nbTicksForChange){
			changeThread();
		}
		if(!tabThreads[index].update()){
			changeThread();
		}
	}

	requestAnimationFrame(tick);
	resize();
	draw();
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
            }else{
				tabSemaphore[name].nbThreadMax = n;
			}
            tabThreads[idt].content[idb] = new Block($('canvas'), idt, idb, '#00ff00', tabSemaphore[name]);
        } else if (isBarriere) {
            if(!(name in tabBarriere)){
                tabBarriere[name] = new Barriere(n);
            }else{
				tabBarriere[name].nbThreadMax = n;
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
