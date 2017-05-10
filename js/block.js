class Block{
    constructor(canvas, idthread, idblock) {
        this.canvas = canvas;
        this.idthread = idthread;
        this.idblock = idblock;
        this.color = '#000000';
	  }

    draw(x, y){
        this.canvas.drawRect({
            layer:true,
            groups:[this.name],
            name: this.idthread+","+this.idblock,
    		fillStyle: this.color,
    		x:x, y:y,
    		width: 30,
    		height: 20,
    		fromCenter: true,
            click: function(layer){
                var coords = layer.name.split(',');
                selection = tabThreads[coords[0]].content[coords[1]];
                $('#selection').text("thread:"+coords[0]+",block:"+coords[1]);
            }
    	});

    }
}
