class player extends Phaser.GameObjects.Sprite {

    constructor(scene, x, y, texture) {
        super(scene, x, y, texture, 0);
        this.setScale(2);
        this.texture.setFilter(Phaser.Textures.FilterMode.NEAREST);
        scene.add.existing(this);
    }


    
}    