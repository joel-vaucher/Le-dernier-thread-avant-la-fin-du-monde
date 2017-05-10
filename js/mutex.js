class Mutex{
	constructor(){
		this.lock = false;
	}

	canEnter(threadId){
		if(this.lock){
			return false;
		}
		this.lock = true;
		return true;
	}

	canExit(threadId){
		this.lock = false;
		return true;
	}
}
