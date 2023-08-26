class player extends Phaser.GameObjects{

    constructor(){
        super();
        this.stuff = [null,null,null,null,null,null,null,null,null,null];
    }

    collcet(item) {
        this.space = 0;
        while (this.space < 10){
            if (this.items[this.space] == null){
                this.items[this.space] == item;
                break;
            }
            else {
                this.space += 1;
            }
        }
    }

    has(item){
        this.space = 0;
        this.result = false
        while (this.space < 10){
            if (this.items[this.space] == item){
                this.result = true;
                break;
            }
            else {
                this.space += 1;
            }
        }
        return this.result;
    }

    takeOut(item){
        this.space = 0;
        while (this.space < 10){
            if (this.items[this.space] == item){
                this.items[this.space] == null;
                break;
            }
            else {
                this.space += 1;
            }
        }
    }

}