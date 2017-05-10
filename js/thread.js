class Thread{
	
	constructor(x, canvas) {
		this.canvas = canvas;
		this.x = x;
		this.threadY = 20;
		this.color = '#000055';
		this.content = ["case1","case2","case3","case4"];
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
	 
	 move(){
		 if(this.threadY % 150 == 0 && this.threadY > 0){
			 var index = this.threadY/150 - 1;
			 if(index >= this.content.length){
				alert("end");
				this.threadY = 0;
			 }else{
				alert(this.content[index]);
			 }
		 }
		 this.threadY++;
	 }
}