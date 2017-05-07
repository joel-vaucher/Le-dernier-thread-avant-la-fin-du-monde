class Thread{
	constructor(x, canvas) {
		this.canvas = canvas;
		this.x = x;
		this.threadY = 20;
		this.color = '#000055';
	  }
	  
	 draw(){
		this.canvas.drawRect({
        fillStyle: '#000000',
        x:this.x, y: 20,
        width: 10,
        height: this.canvas.height() - 20,
        fromCenter: false
		});
		
		this.canvas.drawArc({
        fillStyle: this.color,
        x:this.x + 5, y: this.threadY,
        radius: 25,
        fromCenter: true
		});
	 
	 }
	 
	 move(){
		 this.threadY++;
	 }
}