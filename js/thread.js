class Thread{
	
	constructor(x, canvas) {
		this.canvas = canvas;
		this.x = x;
		this.threadY = 20;
		this.color = '#000055';
		this.content = [null,null,null,null];
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
		
		
		for(var i = 1; i <= this.content.length; i++){
			this.canvas.drawRect({
			fillStyle: '#000000',
			x:this.x + 5, y: i * 150,
			width: 30,
			height: 20,
			fromCenter: true
			});
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
			 if(this.previous != null && !this.previous.canExit()){
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
				if(this.content[index] instanceof Mutex){
					if(!this.content[index].canEnter()){
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