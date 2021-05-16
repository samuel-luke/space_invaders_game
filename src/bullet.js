function Bullets(graphics, spec) {
    let that = {};
    let particles = [];
    let delay = 0;

    let bacteriophageImage = new Image();
    bacteriophageImage.src = "./assets/bacteriophage.png";

    let bacteriophageHurtImage = new Image();
    bacteriophageHurtImage.src = "./assets/bacteriophage_hurt.png";

    function create(spec) {
        let that = {};

        spec.fill = 'rgb(255, 255, 255)';
        spec.stroke = 'rgb(0, 0, 0)';
        spec.alive = 0;

        that.update = function(elapsedTime) {
            spec.center.x += (spec.speed * spec.direction.x * elapsedTime);
            spec.center.y += (spec.speed * spec.direction.y * elapsedTime);
            spec.alive += elapsedTime;

            // Check if bullet hit any enemies
            for (let i = 0; i < Final.enemies.enemies.length; i++) {
                let current = Final.enemies.enemies[i];
                if (collisionDetection({radius: 5, x: spec.center.x, y: spec.center.y}, {radius: current.size/2, x: current.x, y: current.y})) {
                    current.health -= 1;
                    Final.hits++;

                    // Destroy bullet
                    spec.alive = 3000;
                }
            }
            

            return spec.alive < spec.lifetime;
        };

        that.draw = function() {
            graphics.drawTexture(spec.image, spec.center, spec.rotation, spec.size);
        };

        return that;
    }

    that.fire = function() {
        if (delay <= 0) {
            let p = create({
                image: spec.image,
                center: { x: spec.center.x, y: spec.center.y },
                size: {x: spec.size, y: spec.size},
                rotation: -Math.PI/2,
                speed: spec.speed,
                direction: spec.direction,
                lifetime: spec.lifetime,
            });
            particles.push(p);
            Final.shotsFired++;
            delay = Final.fireDelay;
            Final.blaster.play();
        }
    }

    that.center = spec.center;

    that.update = function(elapsedTime) {
        delay -= elapsedTime;
        let keepMe = [];
        for (let particle = 0; particle < particles.length; particle++) {
            if (particles[particle].update(elapsedTime)) {
                keepMe.push(particles[particle]);
            }
        }
        particles = keepMe;
    };

    that.render = function() {
        for (let p = particles.length - 1; p >= 0; p--) {
            particles[p].draw();
        }
    };

    return that;
}

function collisionDetection(circle1, circle2) {
    var dx = circle1.x - circle2.x;
    var dy = circle1.y - circle2.y;
    var distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < circle1.radius + circle2.radius) {
        return true;
    }
    return false;
}
