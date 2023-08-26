class MeadowZone extends Phaser.Scene {
    constructor() {
        super('meadowZone');
    }

    preload(){

        this.load.image('meadowZone', "assets/meadowZone.png");
        this.load.image('grassyGround', "assets/grassyGround.png");
        this.load.image('wall', "assets/wall.png");
        this.load.spritesheet('eevee', "assets/eevee.png", {frameWidth: 74, frameHeight: 55, startFrame: 0, endFrame: 3});
        this.load.spritesheet('turtwig', "assets/turtwig.png", {frameWidth: 74, frameHeight: 54, startFrame: 0, endFrame: 1});
        this.load.image('speedUp', "assets/speedUp.png");
        this.load.image('finish', "assets/finish.png");
        this.load.image('replay', "assets/replay.png");

    }    

    create(){

        let width = config.width;
        let height = config.height;
        this.physics.world.gravity.y = 1000;
        this.cameras.main.setBounds(0, 0, 3400, 900);

        this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        this.keyG = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.G);
        this.keyV = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.V);
        this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.bg = this.add.tileSprite(0,0, 3400, game.config.height, 'meadowZone').setOrigin(0,0);

        this.ground = this.physics.add.sprite(1700, 830, 'grassyGround');
        this.ground.body.immovable = true;
        this.ground.body.allowGravity = false;

        this.platforms = this.add.group();

        this.leftWall = this.physics.add.sprite(-1, 380, 'wall');
        this.leftWall.body.allowGravity = false;
        this.leftWall.body.immovable = true;
        this.platforms.add(this.leftWall);

        this.rightWall = this.physics.add.sprite(3401, 380, 'wall');
        this.rightWall.body.allowGravity = false;
        this.rightWall.body.immovable = true;
        this.platforms.add(this.rightWall);

        /*this.speedUp = this.physics.add.sprite(800, 350, 'speedUp');
        this.speedUp.setAlpha(0);
        this.speedUp.body.allowGravity = false;*/

        this.p1 = this.physics.add.sprite(55, 732.5, 'eevee');
        this.cameras.main.startFollow(this.p1, true, 0.05, 0.05);
        this.runSpeed = 270;
        
        this.opponent = this.physics.add.sprite(505, 733, 'turtwig');
        this.enemieSpeed = 300;

        this.physics.add.collider(this.p1, this.ground);
        this.physics.add.collider(this.p1, this.platforms);
        this.physics.add.collider(this.opponent, this.ground);
        this.physics.add.collider(this.opponent, this.platforms);

        this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNumbers('eevee', { start: 1, end: 3, first: 0}),
            frameRate: 5,
            repeat: -1
        });

        this.anims.create({
            key: 'idle',
            frames: [{key: 'eevee', frame: 0}],
        });

        this.anims.create({
            key: 'run',
            frames: this.anims.generateFrameNumbers('turtwig', { start: 0, end: 1, first: 0}),
            frameRate: 6,
            repeat: -1
        });

        this.anims.create({
            key: 'stop',
            frames: [{key: 'turtwig', frame: 1}],
        });

        this.complete = false;
        this.display = 0;

        this.timer = 0;
        this.time.addEvent({
            delay: 1000, 
            callback: () => this.timer = this.timer + 1,
            callbackScope: this, 
        });

    }

    update(){

        if(this.keyA.isDown && this.complete == false) {
            this.p1.setVelocityX(-this.runSpeed);
            this.p1.setFlip(true, false);
            this.p1.anims.play('walk', true);
            /*this.time.addEvent({
                delay: 2000, 
                callback: () => this.speedUp.setAlpha(1),
                callbackScope: this, 
                loop: true
            });
            this.time.addEvent({
                delay: 2500, 
                callback: () => this.speedUp.setAlpha(0),
                callbackScope: this, 
                loop: true
            });
            if(this.p1.x < 2611 && this.p1.x > 811){
                this.speedUp.setVelocityX(-this.runSpeed);
            }
            else {
                this.speedUp.setVelocityX(0);
            }*/
        }
        else if(this.keyD.isDown && this.complete == false) {
            this.p1.setVelocityX(this.runSpeed);
            this.p1.resetFlip();
            this.p1.anims.play('walk', true);
            /*if(this.p1.x < 2611 && this.p1.x > 811){
                this.speedUp.setVelocityX(this.runSpeed);
            }
            else {
                this.speedUp.setVelocityX(0);
            }*/
        }
        else {
            this.p1.setVelocityX(0);
            this.p1.anims.play('idle', true);
            //this.speedUp.setVelocityX(0);
        }

        if(this.p1.body.touching.down && Phaser.Input.Keyboard.JustDown(this.keyW) && this.complete == false) {
            this.p1.body.setVelocityY(-500);
        }

        if(this.p1.body.touching.down && Phaser.Input.Keyboard.JustDown(this.keySpace) && this.complete == false) {
            this.p1.body.setVelocityY(-500);
        }

        if(Phaser.Input.Keyboard.JustDown(this.keyR)) {
            console.log("Eevee x: " + this.p1.x);
            console.log("Turtwig x: " + this.opponent.x);
        }

        this.opponent.setVelocityX(this.enemieSpeed);
        this.opponent.anims.play('run', true);
        
        if (this.opponent.x == 3363.5){
            this.enemieSpeed = -this.enemieSpeed;
            this.opponent.setFlip(true, false);
        }

        if (this.opponent.x == 36.5){
            this.enemieSpeed = -this.enemieSpeed;
            this.opponent.resetFlip();
        }
        
        if (this.physics.overlap(this.p1, this.opponent)){
            this.complete = true;
        }

        if (this.complete == true){
            if (this.keyA.isDown || this.keyD.isDown) {
                this.p1.setVelocityX(0);
                this.p1.anims.play('idle', true);
            }
            if (this.p1.body.touching.down && Phaser.Input.Keyboard.JustDown(this.keyW)) {
                this.p1.body.setVelocityY(0);
                this.p1.anims.play('idle', true);
            }
            this.enemieSpeed = 0;
            this.opponent.anims.play('stop', true);
            if (this.p1.x < 811 && this.display != 1){
                this.finish = this.physics.add.sprite(800, 400, 'finish');
                this.finish.body.immovable = true;
                this.finish.body.allowGravity = false;
                this.replay = this.physics.add.sprite(1200, 830, 'replay');
                this.replay.body.immovable = true;
                this.replay.body.allowGravity = false;
                this.display = this.display + 1;
            }
            else if (this.p1.x > 2611 && this.display != 1){
                this.finish = this.physics.add.sprite(2600, 400, 'finish');
                this.finish.body.immovable = true;
                this.finish.body.allowGravity = false;
                this.replay = this.physics.add.sprite(3000, 830, 'replay');
                this.replay.body.immovable = true;
                this.replay.body.allowGravity = false;
                this.display = this.display + 1;
            }
            else {
                if (this.display != 1){
                    this.finish = this.physics.add.sprite(this.p1.x, 400, 'finish');
                    this.finish.body.immovable = true;
                    this.finish.body.allowGravity = false;
                    this.replay = this.physics.add.sprite(this.p1.x+390, 830, 'replay');
                    this.replay.body.immovable = true;
                    this.replay.body.allowGravity = false;
                    this.display = this.display + 1;
                }
            }
            if (Phaser.Input.Keyboard.JustDown(this.keyG)){
                this.p1.x = 55;
                this.p1.resetFlip();
                this.opponent.x = 505;
                this.opponent.resetFlip();
                this.enemieSpeed = 300;
                this.display = this.display - 1;
                this.finish.destroy();
                this.replay.destroy();
                this.complete = false
            }
        }

    }

    checkCollision(a, b) {
        // simple AABB checking
        if ((a.x < b.x + b.width && 
            a.x + a.width > b.x && 
            a.y < b.y + b.height &&
            a.height + a.y > b.y) ) {
                return true;
        } 
        else {
            return false;
        }
    }

    collect(item) {
        this.space = 0;
        while (this.space < 18){
            if (inventory[this.space] == null){
                inventory[this.space] == item;
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
        while (this.space < inventory.length){
            if (inventory[this.space] == item){
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
            if (inventory[this.space] == item){
                inventory[this.space] = null;
                break;
            }
            else {
                this.space += 1;
            }
        }
    }

}