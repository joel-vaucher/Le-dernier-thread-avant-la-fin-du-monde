class Thread{

	constructor(x, canvas, idthread) {
		this.canvas = canvas;
		this.x = x;
		this.threadY = 20;
		this.idthread = idthread;
		this.color = '#000055';
		this.content = [new Block(canvas, idthread, 0),
						new Block(canvas, idthread, 1),
						new Block(canvas, idthread, 2),
						new Block(canvas, idthread, 3)];
		this.previous = null;
	  }

	 draw(){
		this.canvas.drawRect({
        fillStyle: '#000000',
        x:this.x, y: 20,
        width: 10,
        height: this.canvas.height() - 20,
        fromCenter: false
		});


		for(var i = 0; i < this.content.length; i++){
			this.content[i].draw(this.x,  (i+1) * 150);
		}


		this.canvas.drawArc({
        fillStyle: this.color,
        x:this.x + 5, y: this.threadY,
        radius: 25,
        fromCenter: true
		});
	 }

	 update(){
		 if(this.threadY % 150 == 0 && this.threadY > 0){
			 if(this.previous != null && !this.previous.element.canExit(this.idthread)){
				 return false;
			 }else{
				 this.previous = null;
			 }
			 var index = this.threadY/150 - 1;
			 if(index >= this.content.length){
				//alert("end");
				this.threadY = 0;
			 }else{
				//alert(this.content[index]);
				if(this.content[index].element != null){
					if(!this.content[index].element.canEnter(this.idthread)){
						return false;
					}
					this.previous = this.content[index];
				}
			 }
		 }
		 this.threadY++;
		 return true;
	 }
}
