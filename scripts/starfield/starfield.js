const DEFAULT_BACKGROUND = 0

class Starfield {

	constructor(size = 500) {
		this.size = size

		this.speed = 1
	}

	init() {
		this.stars = []
		for (let i = 0; i < this.size; i++) {
			this.stars.push(new Star())
		}
	}

	draw() {
		background(DEFAULT_BACKGROUND)
		for (let i = 0; i < this.size; i++) {
			this.stars[i].draw()
		}
	}

	move(direction) {
		// console.log("x: " + direction.x + "\n y: " + direction.y)
		for (let i = 0; i < this.size; i++) {
			this.stars[i].move(direction)
		}
	}
}