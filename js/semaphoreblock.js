class SemaphoreBlock extends Block{

    constructor(canvas, idthread, idblock, semaphore){
        super(canvas, idthread, idblock);

        this.color = '#00ff00';
        this.mutex = semaphore;
    }
}
