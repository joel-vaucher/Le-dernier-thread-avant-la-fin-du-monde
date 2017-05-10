class MutexBlock extends Block{

    constructor(canvas, idthread, idblock, mutex){
        super(canvas, idthread, idblock);

        this.color = '#ff0000';
        this.mutex = mutex;
    }
}
