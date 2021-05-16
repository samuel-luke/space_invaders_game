Final.pages['page-game'] = (function(gameModel, screens, graphics, input) {
	let keyboard = input.Keyboard();
	let bulletImage = new Image();
	bulletImage.src = "./assets/syringe.png"
	let imageFire = new Image();
    imageFire.src = './assets/fire.png';
    let imageSmoke = new Image();
    imageSmoke.src = './assets/smoke-2.png';

	// All one-time game page initialization is performed here.
	function initialize() {
		Final.canvas = document.getElementById('main-canvas');
		Final.context = Final.canvas.getContext('2d');

		Final.bg_canvas = document.getElementById('background-canvas');
		Final.bg_context = Final.canvas.getContext('2d');

		Final.previousTime = performance.now();
		Final.gameTime = 0;
		Final.score = 0;
		Final.shotsFired = 0;
		Final.hits = 0;
		Final.lives = 3;
		Final.level = 1;
		Final.fireDelay = 400;
		
		keyboard.registerCommand(Final.leftControl, moveLeft);
		keyboard.registerCommand(Final.rightControl, moveRight);
		keyboard.registerCommand(Final.fireControl, fire);

		if (localStorage.getItem('score1') === null) {
            localStorage.setItem('score1', 10000);
		}
		
		if (localStorage.getItem('score2') === null) {
            localStorage.setItem('score2', 5000);
		}
		
		if (localStorage.getItem('score3') === null) {
            localStorage.setItem('score3', 3000);
		}
		
		if (localStorage.getItem('score4') === null) {
            localStorage.setItem('score4', 2000);
		}
		
		if (localStorage.getItem('score5') === null) {
            localStorage.setItem('score5', 1000);
        }

		Final.myCharacter = function(imageSource, x, y, width, height, angle) {
			let image = new Image();
			image.isReady = false;
			image.onload = function() {
				this.isReady = true;
			};
			image.src = imageSource;
			let speed = .3;
			return {
				image: image,
				x : x, 
				y : y,
				width : width,
				height : height,
				angle : angle,
				speed : speed,
			};
		}('./assets/caduceus.png', Final.canvas.width/2, Final.canvas.height - 100, 100, 100, 180);

		Final.lifeIcon1 = function(imageSource, x, y, width, height, angle) {
			let image = new Image();
			image.isReady = false;
			image.onload = function() {
				this.isReady = true;
			};
			image.src = imageSource;
			let speed = .3;
			return {
				image: image,
				x : x, 
				y : y,
				width : width,
				height : height,
				angle : angle,
				speed : speed,
			};
		}('./assets/caduceus.png', 160, 40, 50, 50, 180);

		Final.lifeIcon2 = function(imageSource, x, y, width, height, angle) {
			let image = new Image();
			image.isReady = false;
			image.onload = function() {
				this.isReady = true;
			};
			image.src = imageSource;
			let speed = .3;
			return {
				image: image,
				x : x, 
				y : y,
				width : width,
				height : height,
				angle : angle,
				speed : speed,
			};
		}('./assets/caduceus.png', 210, 40, 50, 50, 180);

		Final.explosion = new Sound("./assets/small_explosion.mp3");
		Final.blaster = new Sound("./assets/laser_beam.mp3")

		myMusic = new Sound("./assets/odyssey.ogg");
		myMusic.volume = .5;

		Final.enemies.level1();
	}

	let bullet = Bullets(graphics, {
		image: bulletImage,
        center: {x: 384, y: 924},
        size: 50,
        speed: 1,
		lifetime: 1000, 
		direction: {x: 0, y: -1}, 
	});

	Final.particleSystem = ParticleSystem(graphics, {
        image: imageFire,
        center: {x: 300, y: 300},
        size: {mean: 20, stdev: 3},
        speed: { mean: .2, stdev: 0.1},
		lifetime: { mean: 400, stdev: 100},
		explosionTime: 0,
    });

    Final.particleSystem2 = ParticleSystem(graphics, {
        image: imageSmoke,
        center: {x: 300, y: 300},
        size: {mean: 15, stdev: 3},
        speed: { mean: .1, stdev: 0.1},
        lifetime: { mean: 600, stdev: 300},
		explosionTime: 0,
	});

	Final.particleSystem3 = ParticleSystem(graphics, {
        image: imageFire,
        center: {x: 300, y: 300},
        size: {mean: 15, stdev: 3},
        speed: { mean: .1, stdev: 0.1},
        lifetime: { mean: 200, stdev: 100},
		explosionTime: 0,
    });

    Final.particleSystem4 = ParticleSystem(graphics, {
        image: imageSmoke,
        center: {x: 300, y: 300},
        size: {mean: 15, stdev: 3},
        speed: { mean: .05, stdev: 0.01},
        lifetime: { mean: 100, stdev: 50},
		explosionTime: 0,
	});
	
	Final.enemies = Enemies(graphics);

	function moveLeft(elapsedTime) {
		if (Final.myCharacter.x > 0) {
			Final.myCharacter.x -= elapsedTime * Final.myCharacter.speed;
		}
	}

	function moveRight(elapsedTime) {
		if (Final.myCharacter.x < Final.canvas.width) {
			Final.myCharacter.x += elapsedTime * Final.myCharacter.speed;
		}
	}

	function fire() {
		bullet.fire();
	}		
	
	function processInput(elapsedTime) {
		keyboard.update(elapsedTime);
	}
	
	function renderCharacter(character) {
		if (character.image.isReady) {
			Final.context.save();
			Final.context.translate(character.x, character.y);
			Final.context.rotate(character.angle*Math.PI/180);
			Final.context.translate(-character.x, -character.y);
			Final.context.drawImage(
				character.image,
				character.x - character.width / 2,
				character.y - character.width / 2,
				character.height,
				character.width,
			);
			Final.context.restore();
		}
	}

	function renderScore() {
		Final.context.font = "30px Impact";
		Final.context.textAlign = "center";
		Final.context.fillStyle = "white";
		Final.context.fillText("Score: " + Final.score, Final.canvas.width - 100, 50);
	}

	function renderLives() {
		Final.context.font = "30px Impact";
		Final.context.textAlign = "center";
		Final.context.fillStyle = "white";
		Final.context.fillText("Lives: ", 100, 50);
		
		if (Final.lives > 1) renderCharacter(Final.lifeIcon1);
		if (Final.lives > 2) renderCharacter(Final.lifeIcon2);
	}

	function death() {
		console.log("DEAD")
		Final.lives--;
		
		Final.particleSystem.center.x = Final.myCharacter.x;
		Final.particleSystem.center.y = Final.myCharacter.y;
		Final.particleSystem.explosionTime = 1000;

		Final.particleSystem2.center.x = Final.myCharacter.x;
		Final.particleSystem2.center.y = Final.myCharacter.y;
		Final.particleSystem2.explosionTime = 1000;
		
		Final.myCharacter.x = Final.canvas.width/2;
		Final.myCharacter.y = Final.canvas.height - 100;

		Final.explosion.play();
	}

	function deathScreen() {
		if (Final.score > localStorage.getItem('score1')) localStorage.setItem('score1', Final.score);
		else if (Final.score > localStorage.getItem('score2')) localStorage.setItem('score2', Final.score);
		else if (Final.score > localStorage.getItem('score3')) localStorage.setItem('score3', Final.score);
		else if (Final.score > localStorage.getItem('score4')) localStorage.setItem('score4', Final.score);
		else if (Final.score > localStorage.getItem('score5')) localStorage.setItem('score5', Final.score);

		Final.context.font = "50px Impact";
		Final.context.textAlign = "center";
		Final.context.fillStyle = "white";
		Final.context.fillText("GAME OVER", Final.canvas.width/2, Final.canvas.height/2 - 100);
		Final.context.font = "40px Impact";
		Final.context.fillText("Shots Fired: " + Final.shotsFired, Final.canvas.width/2, Final.canvas.height/2 + 100);
		Final.context.fillText("Hits: " + Final.hits, Final.canvas.width/2, Final.canvas.height/2 + 200);
		Final.context.fillText("Hit/Miss Ratio: " + (Final.hits/Final.shotsFired).toFixed(2), Final.canvas.width/2, Final.canvas.height/2 + 300);
	}
	
	function update(elapsedTime) {
		bullet.center.y = Final.myCharacter.y;
		bullet.center.x = Final.myCharacter.x;

		Final.enemies.update(elapsedTime);
		bullet.update(elapsedTime);

		Final.particleSystem.update(elapsedTime);
		Final.particleSystem.explosionTime -= elapsedTime;
		Final.particleSystem2.update(elapsedTime);
		Final.particleSystem2.explosionTime -= elapsedTime;
		
		Final.particleSystem3.update(elapsedTime);
		Final.particleSystem3.explosionTime -= elapsedTime;
		Final.particleSystem4.update(elapsedTime);
		Final.particleSystem4.explosionTime -= elapsedTime;

		if (Final.enemies.enemies.length == 0) {
			if (Final.level == 1) {
				Final.level++;
				Final.enemies.level2();
			} 
			else if (Final.level == 2) {
				Final.level++;
				Final.enemies.level3();
			}
			else if (Final.level == 3) {
				Final.level = 1;
				Final.enemies.level1();
			}
		}
	}

	function render() {
		graphics.clear();
		
		Final.enemies.render();
		bullet.render();

		Final.particleSystem.render();
		Final.particleSystem2.render();
		Final.particleSystem3.render();
		Final.particleSystem4.render();
		renderCharacter(Final.myCharacter);
		renderScore();
		renderLives();
	}


	function gameLoop(time) {
		let elapsedTime = time - Final.previousTime;
		Final.previousTime = time;

		if (Final.lives > 0) {
			processInput(elapsedTime);
			update(elapsedTime);
			render(elapsedTime);
		} else {
			deathScreen();
			return;
		}
	
		requestAnimationFrame(gameLoop);
	}

	function run() {
		myMusic.play();

		input.initialize();
		
		initialize();

		requestAnimationFrame(gameLoop);
	}

	return {
		initialize : initialize,
		run : run,
		death : death,
	};
}(Final.model, Final.screens, Final.graphics, Final.input));
