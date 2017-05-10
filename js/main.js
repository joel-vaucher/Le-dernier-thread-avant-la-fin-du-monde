var canvas = null;
var posX = 0;
var tabThreads = [];
var tabMutex = [];
var index = 0;
var nbTick = 0;
var selection = null;

window.onload = function(){
    canvas = document.getElementById("canvas");

    var displayWidth = $('#container').width();
    var displayHeight = $('#container').height();
    canvas.width = parseInt(displayWidth * 0.8);
    canvas.height =  parseInt(displayHeight * 0.8);

	tabThreads.push(new Thread(100, $('canvas'), 0));
	tabThreads.push(new Thread(200, $('canvas'), 1));
	tabThreads.push(new Thread(300, $('canvas'), 2));
	tabThreads[0].color = '#0000ff';

	tabMutex["m1"] = new Mutex();
	tabMutex["m2"] = new Mutex();

	tabThreads[0].content[0] = new MutexBlock($('canvas'), 0, 0, tabMutex["m1"]);
	tabThreads[1].content[0] = new MutexBlock($('canvas'), 1, 0, tabMutex["m1"]);
	tabThreads[2].content[0] = new MutexBlock($('canvas'), 2, 0, tabMutex["m1"]);

	tabThreads[0].content[1] = new MutexBlock($('canvas'), 0, 1, tabMutex["m2"]);
	tabThreads[1].content[1] = new MutexBlock($('canvas'), 1, 1, tabMutex["m2"]);
	tabThreads[2].content[1] = new MutexBlock($('canvas'), 2, 1, tabMutex["m2"]);

	updateListBlocks();

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

function changeThread(){
	nbTick = 0;
	tabThreads[index].color = '#000055';
	index = (index+1)%tabThreads.length;
	tabThreads[index].color = '#0000ff';
}

function tick() {
	nbTick++;
	if(nbTick > 100){
		changeThread();
	}
	requestAnimationFrame(tick);
	resize();
	drawMicroProcesseur();
	if(!tabThreads[index].update()){
		changeThread();
	}
}

function restate() {
    var name = $("#strucname").val();
    var isMutex = $("#statemutex").is(':checked');
    var idt = selection.idthread;
    var idb = selection.idblock;
    if(selection != null){
        if(isMutex) {
            if(!(name in tabMutex)){
                tabMutex[name] = new Mutex();
            }
            tabThreads[idt].content[idb] = new MutexBlock($('canvas'), idt, idb, tabMutex[name]);
        }
    }
    return false;
}

function updateListBlocks(){
	var select = document.getElementById("listBlocks");
	select.options = [];
    var cpt = 0;
	for(var key in tabMutex) {
		select.options.add(new Option(key, cpt++, false, false));
	}

}
