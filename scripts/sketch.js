const numStars = 100
let stars = []
let canvas
let currentState = 0
let initialSpeed = 1
let currentSpeed = initialSpeed
let starfield

// TODO: Improve this function with the new class Starfield
// function mouseClicked() {
// 	let star = random(stars)
// 	let position = createVector(mouseX, mouseY, 0)
// 	star.set(position)
// 	star.draw()
// }

// TODO: Improve this function with the new class Starfield
// function windowResized() {
// 	resizeCanvas(windowWidth, windowHeight);
// }

function setup() {
	canvas = createCanvas(windowWidth, windowHeight);
	canvas.position(0,0);
	canvas.style('z-index', '-2');
	background(0)
	starfield = new Starfield()
	starfield.init()
	starfield.draw()
}

function update() {
	const normalizedMouseX = norm(mouseX, width / 2, width)
	const normalizedMouseY = -norm(mouseY, height / 2, height)
	const direction = createVector(normalizedMouseX, normalizedMouseY)
	starfield.move(direction)
}

function draw() {
	update()
	starfield.draw()
}
