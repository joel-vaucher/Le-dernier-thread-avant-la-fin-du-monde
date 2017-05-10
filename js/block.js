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
            groups:[this.name],
            name: this.idthread+","+this.idblock,
    		fillStyle: this.color,
    		x:x+5, y:y,
    		width: 30,
    		height: 20,
    		fromCenter: true,
            click: function(layer){
                var coords = layer.name.split(',');
                selection = tabThreads[coords[0]].content[coords[1]];
            }
    	});

    }
}
