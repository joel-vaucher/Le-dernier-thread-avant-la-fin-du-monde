class Mutex{
	constructor(){
		this.lock = false;
	}

	canEnter(){
		if(this.lock){
			return false;
		}
		this.lock = true;
		return true;
	}

	canExit(){
		this.lock = false;
		return true;
	}
}
