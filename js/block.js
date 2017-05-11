class Block{
    constructor(canvas, idthread, idblock, color = '#000000', element=null) {
        this.canvas = canvas;
        this.idthread = idthread;
        this.idblock = idblock;
        this.color = color;
		this.element = element;
	  }

    draw(x, y){
        this.canvas.drawRect({
            layer:true,
            name: this.idthread+","+this.idblock,
    		fillStyle: this.color,
    		x:x+5, y:y,
    		width: 30,
    		height: 20,
    		fromCenter: true,
            click: function(layer){
                var coords = layer.name.split(',');
                selection = tabThreads[coords[0]].content[coords[1]];
                $('#selection').text("thread:"+coords[0]+",block:"+coords[1]);
            }
    	});

        this.canvas.drawText({
            fillStyle: '#9cf',
            strokeStyle: '#25a',
            strokeWidth: 2,
            x: x-40, y: y,
            fontSize: 24,
            fontFamily: 'Verdana, sans-serif',
            text: this.idthread+","+this.idblock
    	});

        var tab = null;
        var info = "";
        if(this.element instanceof Mutex){
            tab = tabMutex;
        } else if(this.element instanceof Semaphore){
            tab = tabSemaphore;
            info = this.element.nbThreadMax - this.element.nbThread;
        } else if(this.element instanceof Barriere){
            tab = tabBarriere;
            info = this.element.nbThreadMax - this.element.listThread.length;
        }
        var elementName = "";
        if(tab != null) {
            elementName = Object.keys(tab).filter(function(key) { return tab[key] == this.element}, this);
        }

        this.canvas.drawText({
            fillStyle: '#9cf',
            strokeStyle: '#25a',
            strokeWidth: 2,
            x: x-40, y: y+25,
            fontSize: 24,
            fontFamily: 'Verdana, sans-serif',
            text: elementName
    	});
        this.canvas.drawText({
            fillStyle: '#9cf',
            strokeStyle: '#25a',
            strokeWidth: 2,
            x: x-40, y: y+50,
            fontSize: 24,
            fontFamily: 'Verdana, sans-serif',
            text: info
    	});

    }
}
