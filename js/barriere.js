class Barriere{
	constructor(nbThreadMax){
		this.listThread = [];
		this.listThreadExit = [];
		this.nbThreadMax = nbThreadMax;
	}
	
	canEnter(threadId){		
		var index = this.listThreadExit.indexOf(threadId);
		if(index != -1){
			this.listThreadExit.splice(index, 1);
			return true;
		}
		
		if(this.listThread.indexOf(threadId) == -1){
			if(this.listThread.length == this.nbThreadMax - 1){
				this.listThreadExit = this.listThread;
				this.listThread = [];
				return true;
			}else{
				this.listThread.push(threadId);
			}
		}
		return false;
	}

	canExit(threadId){
		return true;
	}
}
