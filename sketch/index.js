const numStars = 100
let stars = []
let canvas
let currentState = 0
let initialSpeed = 1
let currentSpeed = initialSpeed

Array.prototype.drawAll = function() {
	for (let i = 0; i < this.length; i++) {
		this[i].draw()
	}
}

Array.prototype.moveAll = function(direction) {
	for (let i = 0; i < this.length; i++) {
		this[i].move(direction)
	}
}

function mouseClicked() {
	let star = random(stars)
	let position = createVector(mouseX, mouseY, 0)
	star.set(position)
	star.draw()
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}

function initStars() {
	stars = []
	for(let i = 0; i < numStars; i ++) {
		stars.push(new Star());
	}
}

function changeState(state) {
	currentState = state
}

function setup() {
	canvas = createCanvas(windowWidth, windowHeight);
	canvas.position(0,0);
	canvas.style('z-index', '-2');
	background(0)
	initStars()
}

let rotateIncrement = 0

function update() {
	let speedX = currentSpeed * norm(mouseX, width / 2, width)
	let speedY = currentSpeed * norm(mouseY, height / 2, height)
	let direction = createVector(-speedX, -speedY, 0)
	stars.moveAll(direction)
}

function draw() {
	update()
	if (currentState === 0) background(0);
	stars.drawAll()
}
