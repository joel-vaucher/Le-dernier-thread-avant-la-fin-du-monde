class Block{
    constructor(canvas, idthread, idblock, name, state) {
        this.canvas = canvas;
        this.idthread = idthread;
        this.idblock = idblock;
		this.name = name;
        this.state = state;
	  }

    draw(x, y){
        this.canvas.drawRect({
            layer:true,
            groups:[this.name],
            name: this.idthread+","+this.idblock,
    		fillStyle: '#000000',
    		x:x, y:y,
    		width: 30,
    		height: 20,
    		fromCenter: true,
            click: function(layer){
                var coords = layer.name.split(',');
                selection = tabThreads[coords[0]].content[coords[1]];
                var name = tabThreads[coords[0]].content[coords[1]].name;
                var state = tabThreads[coords[0]].content[coords[1]].state;
                alert(name+","+state);
            }
    	});

    }
}
