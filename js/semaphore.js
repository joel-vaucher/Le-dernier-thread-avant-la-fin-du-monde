class Semaphore{
	constructor(nbThreadMax){
		this.nbThread = 0;
		this.nbThreadMax = nbThreadMax;
	}

	canEnter(threadId){
		if(this.nbThread == this.nbThreadMax){
			return false;
		}
		this.nbThread++;
		return true;
	}

	canExit(threadId){
		this.nbThread--;
		return true;
	}
}
