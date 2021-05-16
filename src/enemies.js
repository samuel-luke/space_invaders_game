function Enemies(graphics) {
    let that = {};
    that.enemies = [];

    let virusImage = new Image();
    virusImage.src = "./assets/virus.png";

    let bacteriumImage = new Image();
    bacteriumImage.src = "./assets/bacterium.png";

    let bacteriophageImage = new Image();
    bacteriophageImage.src = "./assets/bacteriophage.png";

    let bacteriophageHurtImage = new Image();
    bacteriophageHurtImage.src = "./assets/bacteriophage_hurt.png";

    let bonus1 = new Image();
    bonus1.src = "./assets/bonus1.png";

    let bonus2 = new Image();
    bonus2.src = "./assets/bonus2.png";

    let bonus3 = new Image();
    bonus3.src = "./assets/bonus3.png";

	let imageFire = new Image();
    imageFire.src = './assets/fire.png';
    
    let imageSmoke = new Image();
    imageSmoke.src = './assets/smoke-2.png';

    function create(spec) {
        let that = {};
        that.health = spec.health;
        that.size = spec.size.x;
        that.x = spec.start_location.x;
        that.y = spec.start_location.y;
        that.finalX = spec.center.x;
        that.finalY = spec.center.y;
        that.destination = {x: spec.center.x, y: spec.center.y};
        that.image = spec.image;
        that.score = spec.score;
        that.speed = spec.speed;
        that.delay = spec.delay;
        that.idle = 0;
        that.pursuitSpeed = {x: spec.speed.x, y: spec.speed.x};
        that.idleSpeed = {x: spec.speed.x / 10, y: spec.speed.y / 10};

        that.update = function(elapsedTime) {
            // Collision Detection
            if (collisionDetection({radius: 5, x: that.x, y: that.y}, {radius: Final.myCharacter.width/2, x: Final.myCharacter.x, y: Final.myCharacter.y})) { 
                Final.pages['page-game'].death();

                that.health -= 2;
            }

            // Random Pursuit
            if (Random.getRandomInt(1, 2000) == 1) {
                that.destination.x = that.finalX;
                that.finalX = Final.myCharacter.x;

                that.destination.y = that.finalY;
                that.finalY = Final.canvas.height + 100;
                that.speed = that.pursuitSpeed;
            }

            if (that.y > Final.canvas.height) {
                that.y = -100;
                that.finalX = that.destination.x;
                that.finalY = that.destination.y;
            }

            // Movement
            if (that.delay <= 0) {
                if (that.idle > 0) {
                    that.x += that.speed.x * elapsedTime;
                    that.idle -= elapsedTime;
                }
                else {
                    if( Math.abs( that.x - that.finalX ) > 5 || Math.abs( that.y - that.finalY ) > 5) {
                        if (that.x > that.finalX) {
                            that.x -= that.speed.x * elapsedTime;
                        }
                        if (that.x < that.finalX) {
                            that.x += that.speed.x * elapsedTime;
                        }
                        if (that.y > that.finalY) {
                            that.y -= that.speed.y * elapsedTime;
                        }
                        if (that.y < that.finalY) {
                            that.y += that.speed.y * elapsedTime;
                        }
                    } else {
                        that.idle = 1000;
                        that.speed.x = that.idleSpeed.x;
                        that.speed.y = that.idleSpeed.y;
                    }
                }
            }
            
            that.delay -= elapsedTime;
        };

        that.draw = function() {
            if (that.image.src == bacteriophageImage.src && that.health <= 1) {
                graphics.drawTexture(bacteriophageHurtImage, {x: that.x, y: that.y}, spec.rotation, spec.size);                
            } else {
                graphics.drawTexture(spec.image, {x: that.x, y: that.y}, spec.rotation, spec.size);
            }
        };

        return that;
    }

    that.level1 = function() {
        that.enemies.length = 0;

        for (let i = 84; i <= 768; i += 100 ) {
            let e = create({
                image: bacteriophageImage,
                start_location: {x: -50, y: 300},
                delay: 2* i,
                center: { x: i, y: 100 },
                size: {x: 100, y: 100},
                rotation: 0,
                speed: {x: .2, y: .1},
                direction: 1,
                health: 2,
                score: 150,
            });
            that.enemies.push(e);
        }
        for (let i = 50; i <= 768; i += 75 ) {
            let e = create({
                image: virusImage,
                start_location: {x: 800, y: 400},
                delay: 2 * i + 3000,
                center: { x: i, y: 200 },
                size: {x: 75, y: 75},
                rotation: -Math.PI/2,
                speed: {x: .3, y: .1},
                direction: 1, 
                health: 1,
                score: 80,
            });
            that.enemies.push(e);
        }
        for (let i = 50; i <= 768; i += 75 ) {
            let e = create({
                image: bacteriumImage,
                start_location: {x: -100, y: 500},
                delay: 2 * i + 7000,
                center: { x: i, y: 300 },
                size: {x: 75, y: 75},
                rotation: -Math.PI/2,
                speed: {x: .2, y: .2},
                direction: 1, 
                health: 1,
                score: 50,
            });
            that.enemies.push(e);
        }        
    }

    that.level2 = function() {
        that.enemies.length = 0;

        for (let i = 50; i <= 768; i += 90 ) {
            let e = create({
                image: bacteriophageImage,
                start_location: {x: -50, y: 400},
                delay: 2 * i,
                center: { x: i, y: 100 },
                size: {x: 75, y: 75},
                rotation: 0,
                speed: {x: .2, y: .1},
                direction: 1,
                health: 2,
                score: 150,
            });
            that.enemies.push(e);
        }
        for (let i = 50; i <= 768; i += 75 ) {
            let e = create({
                image: bacteriumImage,
                start_location: {x: -100, y: 600},
                delay: 2 * i + 3000,
                center: { x: i, y: 200 },
                size: {x: 60, y: 60},
                rotation: -Math.PI/2,
                speed: {x: .4, y: .2},
                direction: 1, 
                health: 1,
                score: 50,
            });
            that.enemies.push(e);
        }
        for (let i = 50; i <= 720; i += 50 ) {
            let e = create({
                image: virusImage,
                start_location: {x: 800, y: 400},
                delay: 2 * i + 4000,
                center: { x: i, y: 275 },
                size: {x: 50, y: 50},
                rotation: -Math.PI/2,
                speed: {x: .3, y: .1},
                direction: 1, 
                health: 1,
                score: 80,
            });
            that.enemies.push(e);
        }    
        for (let i = 50; i <= 720; i += 50 ) {
            let e = create({
                image: virusImage,
                start_location: {x: -100, y: 400},
                delay: 2 * i + 5000,
                center: { x: i, y: 350 },
                size: {x: 50, y: 50},
                rotation: -Math.PI/2,
                speed: {x: .3, y: .1},
                direction: 1, 
                health: 1,
                score: 80,
            });
            that.enemies.push(e);
        }     
    }

    that.level3 = function() {
        that.enemies.length = 0;

        for (let i = 0; i <= 768; i += 80 ) {
            let e = create({
                image: bacteriophageImage,
                start_location: {x: -50, y: 400},
                delay: 2 * i,
                center: { x: i, y: 100 },
                size: {x: 100, y: 100},
                rotation: 0,
                speed: {x: .3, y: .2},
                direction: 1,
                health: 2,
                score: 150,
            });
            that.enemies.push(e);
        }
        for (let i = 50; i <= 700; i += 50 ) {
            let e = create({
                image: bonus1,
                start_location: {x: -100, y: 600},
                delay: 2 * i + 2000,
                center: { x: i, y: 200 },
                size: {x: 75, y: 75},
                rotation: -Math.PI/2,
                speed: {x: .6, y: .4},
                direction: 1, 
                health: 1,
                score: 50,
            });
            that.enemies.push(e);
        }
        for (let i = 50; i <= 700; i += 40 ) {
            let e = create({
                image: bonus2,
                start_location: {x: 800, y: 400},
                delay: 2 * i + 5000,
                center: { x: i, y: 275 },
                size: {x: 50, y: 50},
                rotation: -Math.PI/2,
                speed: {x: .4, y: .4},
                direction: 1, 
                health: 1,
                score: 50,
            });
            that.enemies.push(e);
        }    
        for (let i = 50; i <= 700; i += 30 ) {
            let e = create({
                image: bonus3,
                start_location: {x: -100, y: 400},
                delay: 2 * i + 7000,
                center: { x: i, y: 350 },
                size: {x: 30, y: 30},
                rotation: -Math.PI/2,
                speed: {x: .3, y: .2},
                direction: 1, 
                health: 1,
                score: 50,
            });
            that.enemies.push(e);
        }  
    }

    that.update = function(elapsedTime) {
        let keepMe = [];
        for (let enemy = 0; enemy < that.enemies.length; enemy++) {
            that.enemies[enemy].update(elapsedTime);
            if (that.enemies[enemy].health > 0) {
                keepMe.push(that.enemies[enemy]);
            } else {
                Final.score += that.enemies[enemy].score;

                Final.particleSystem3.center.x = that.enemies[enemy].x;
                Final.particleSystem3.center.y = that.enemies[enemy].y;
                Final.particleSystem3.explosionTime = 500;

                Final.particleSystem4.center.x = that.enemies[enemy].x;
                Final.particleSystem4.center.y = that.enemies[enemy].y;
                Final.particleSystem4.explosionTime = 500;

                Final.explosion.play();
            }
        }
        that.enemies = keepMe;
    };

    that.render = function() {
        for (let p = that.enemies.length - 1; p >= 0; p--) {
            that.enemies[p].draw();
        }
    };

    return that;
}
