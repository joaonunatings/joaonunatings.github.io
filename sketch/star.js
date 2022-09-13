class Star {
	constructor() {
		let x = random(0, width)
		let y = random(0, height)
		let z = random(0, 1)

		this.pos = createVector(x, y, z)
		this.direction = createVector(0, 0, 0)
		this.lightSpeed = 30
		this.t = random(TAU)
		this.size = random(0.25, 3)
	}

	move(direction) {
		this.direction = (direction.mag() > this.lightSpeed) ? direction.normalize().mult(this.lightSpeed) : direction
		this.pos.add(direction)
		if (direction.x > 0 && this.pos.x > width) {
			this.pos.x = 0
			this.pos.y = random(0, height)
		}
		if (direction.x < 0 && this.pos.x < 0) {
			this.pos.x = width
			this.pos.y = random(0, height)
		}
		if (direction.y > 0 && this.pos.y > height) {
			this.pos.y = 0
			this.pos.x = random(0, width)
		}
		if (direction.y < 0 && this.pos.y < 0) {
			this.pos.y = height
			this.pos.x = random(0, width)
		}
	}

	draw() {
		fill(255)

		let x = this.pos.x
		let y = this.pos.y
		let px = this.pos.x - this.direction.x
		let py = this.pos.y - this.direction.y

		let speed = this.direction.mag()
		let normValue = norm(speed, 0, this.lightSpeed)
		let shakeValue = 0.2
		translate(random(-shakeValue * normValue , shakeValue * normValue), random(-shakeValue * normValue, shakeValue * normValue))

		let colorValue = 255 - normValue * 150
		let c = color(colorValue, colorValue, 255)
		stroke(c)
		line(px, py, x, y)

		noStroke()
		this.t += 0.1
		let scale = this.size + cos(this.t) * 0.2
		ellipse(this.pos.x, this.pos.y, scale, scale)
	}
}