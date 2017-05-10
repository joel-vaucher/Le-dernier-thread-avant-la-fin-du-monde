var canvas = null;
var posX = 0;
var tabThreads = [];
var tabBlocks = [];
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

	tabBlocks.push(new Mutex($('canvas'), 0, 0, "mutex", 0));
	tabBlocks.push(new Mutex($('canvas'), 0, 0, "mutex2", 0));
	
	tabThreads[0].content[0] = tabBlocks[0];
	tabThreads[1].content[0] = tabBlocks[0];
	tabThreads[2].content[0] = tabBlocks[0];
	
	tabThreads[0].content[1] = tabBlocks[1];
	tabThreads[1].content[1] = tabBlocks[1];
	tabThreads[2].content[1] = tabBlocks[1];

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

function rename() {
    alert($('#strucname').val());
    selection.name = $('#strucname').val();

    return false;
}

function restate() {
    if(selection != null){
        if($("input[type='radio'].state").is(':checked')) {
            selection.state = $("input[type='radio'].state:checked").val();
            alert(selection.state);
        }
    }
    return false;
}

function updateListBlocks(){
	var select = document.getElementById("listBlocks");
	select.options = [];
	for (i=0; i<tabBlocks.length; i++)
	{
		select.options.add(new Option(tabBlocks[i].name, i, false, false));
	}
	
}
