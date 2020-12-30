class Petal {
    constructor(v, ra) {
        // start coordinates
        this.strX = v.x;
        this.strY = v.y;
        // the moving points that create the lines
        this.p = v.copy();
        this.prevP = createVector(this.strX, this.strY);
        // change in x coordinate
        this.dx = 0;
        // angle of rotation og each petal
        this.ra = ra % TWO_PI;
        // the value of the color of the petal
        this.col = 120 + 10 * level;
        // stroke weight
        this.sw = map(level, 1, maxLevel, 4, 6);
        // parameters for sin(), cos() and noise()
        this.t1 = random(TWO_PI);
        this.t2 = random(TWO_PI);
        // rotation coordinates for the current and the previous x and y coordinates
        this.rotX = this.strX;
        this.rotY = this.strY;
        this.pRotX = this.strX;
        this.pRotY = this.strY;
        // the location of the flowers
        this.flowerX = this.strX;
        this.flowerY = this.strY;

        this.drawPetal = true;
        this.finished = false;
        // calculating the length
        if (this.ra >= radians(40) && this.ra <= radians(140)) {
            this.len = map(level, 0, maxLevel, 280, 40) * 0.7 + random(50);
        } else {
            this.len = map(level, 0, maxLevel, 280, 40) + random(50);
        }
    }

    update() {
        if (this.dx <= this.len) {
            // update the location of the points of each line
            this.prevP.x = this.p.x;
            this.prevP.y = this.p.y;
            this.p.x = this.dx + map(noise(this.t2), 0, 1, -1, 1) * 2 + map(noise(this.p.x, this.p.y), 0, 1, -1, 1) + 0.5 * cos(this.t1)
            this.p.y = 2 * sin(this.t1) + map(noise(this.t1), 0, 1, -1, 1);
            // update the parameters of the equations above
            this.dx += random(0.5, 2);
            this.t1 += random(0.05, 0.15);
            this.t2 += random(0.15, 0.3);
            this.sw -= this.sw * 0.001;
            // rotate by the rotation matrix and update previous values
            this.pRotX = this.rotX;
            this.pRotY = this.rotY;
            this.flowerX = this.rotX;
            this.flowerY = this.rotY
            this.rotX = (this.p.x * cos(this.ra) - this.p.y * sin(this.ra)) + this.strX;
            this.rotY = (this.p.x * sin(this.ra) + this.p.y * cos(this.ra)) + this.strY;

        } else {
            this.finished = true;
        }
    }

    render() {
        if (this.dx <= this.len) {
            strokeWeight(this.sw);
            stroke(0, this.col, this.col, 50);
            if (this.dx > 2) {
                line(this.pRotX, this.pRotY, this.rotX, this.rotY);
            }
        } else {
            if (this.drawPetal) {
                this.drawPetal = false;
                push()
                translate(this.flowerX, this.flowerY);
                noStroke();
                let transparency = map(level, 1, maxLevel, 25, 35);
                fill(this.col + 50, 0, 36, transparency);
                for (let i = 0; i < 10; i++) {
                    rotate(this.ra + i * TWO_PI / 10);
                    ellipse(random(-2, 2), random(-2, 2), random(5, 10) * (1 + (level / maxLevel)), random(11, 18) * (1 + (level / maxLevel)));
                }
                fill(this.col, 150)
                circle(0, 0, random(5, 8));
                pop();
            }
        }
    }
}