const TRANSFORM_OUT = "1s ease-in"
const TRANSFORM_IN = "1s ease-out"

const DIRECTION_ANIMATION = {
	RIGHT: {
		out: "transform translateX(0) translateX(100%) " + TRANSFORM_OUT,
		in: "transform translateX(-100%) translateX(0) " + TRANSFORM_IN
	},
	LEFT: {
		out: "transform translateX(0) translateX(-100%) " + TRANSFORM_OUT,
		in: "transform translateX(100%) translateX(0) " + TRANSFORM_IN
	},
	UP: {
		out: "transform translateY(0) translateY(-100%) " + TRANSFORM_OUT,
		in: "transform translateY(100%) translateY(0) " + TRANSFORM_IN
	},
	DOWN: {
		out: "transform translateY(0) translateY(100%) " + TRANSFORM_OUT,
		in: "transform translateY(-100%) translateY(0) " + TRANSFORM_IN
	}
}

const OPACITY_ANIMATION = {
	out: "opacity 1 0 1s ease-out",
	in: "opacity 0 1 1s ease-in"
}

const CONTENT = document.getElementById('content')
const RIGHT_NAV = document.getElementById('rightNav')
const LEFT_NAV = document.getElementById('leftNav')
const TOP_NAV = document.getElementById('topNav')
const BOT_NAV = document.getElementById('botNav')

function animate(directionAnimation, opacityAnimation) {
	return transition.begin(CONTENT, [
		directionAnimation,
		opacityAnimation
	]).promise
}

function changeContent(location) {
	CONTENT.innerHTML = '<iframe src="' + location + '" onload="this.insertAdjacentHTML(\'afterend\', (this.contentDocument.body||this.contentDocument).innerHTML);this.remove()"></iframe>'
}

async function travel(direction, pageContent) {
	await animate(direction.out, OPACITY_ANIMATION.out)
	changeContent(pageContent)
	await animate(direction.in, OPACITY_ANIMATION.in)
}

function hideNavs(navs) {
	let navPromises = []
	for (const nav of navs) {
		if (nav.hidden === false) {
			nav.style.pointerEvents = 'none'
			navPromises.push(transition.begin(nav, "opacity 1 0 0.5s ease-in").promise.then(() => {
				nav.hidden = true
				nav.style.pointerEvents = 'auto'
			}))
		}
	}
	return Promise.all(navPromises)
}

function showNavs(navs) {
	let navPromises = []
	for (const nav of navs) {
		if (nav.hidden === true) {
			nav.hidden = false
			navPromises.push(transition.begin(nav, 'opacity 0 1 1s ease-out').promise)
		}
	}
	return Promise.all(navPromises)
}

function changeNav(element, text, onClickFunction) {
	const travelContainer = element.getElementsByClassName('travel-container')[0]
	travelContainer.onclick = onClickFunction
	const travelText = travelContainer.getElementsByClassName('travel-text')[0]
	travelText.innerText = text
}

async function goToHome(direction) {
	const hideNavsPromise = hideNavs([RIGHT_NAV, LEFT_NAV, BOT_NAV, TOP_NAV])
	const travelPromise = travel(direction, 'pages/home.html')
	await Promise.all([hideNavsPromise, travelPromise])
	switch(direction) {
		case DIRECTION_ANIMATION.LEFT:
			changeNav(RIGHT_NAV, "About", goToAbout)
			break
		case DIRECTION_ANIMATION.RIGHT:
			changeNav(LEFT_NAV, "Projects", goToProjects)
			break
		case DIRECTION_ANIMATION.UP:
			changeNav(BOT_NAV, "CV", goToCV)
			break
		case DIRECTION_ANIMATION.DOWN:
			changeNav(TOP_NAV, "Contact", () => console.log("not yet implemented"))
			break
	}
	showNavs([RIGHT_NAV, LEFT_NAV, BOT_NAV])
}

async function goToProjects() {
	const hideNavsPromise = hideNavs([RIGHT_NAV, BOT_NAV, LEFT_NAV, TOP_NAV])
	const travelPromise = travel(DIRECTION_ANIMATION.RIGHT, "pages/projects.html")
	await Promise.all([hideNavsPromise, travelPromise])
	changeNav(RIGHT_NAV, "Home", () => goToHome(DIRECTION_ANIMATION.LEFT))
	showNavs([RIGHT_NAV])
}

async function goToAbout() {
	const hideNavsPromise = hideNavs([LEFT_NAV, RIGHT_NAV, BOT_NAV, TOP_NAV])
	const travelPromise = travel(DIRECTION_ANIMATION.LEFT, "pages/about.html")
	await travelPromise
	hideNavsPromise.then(() => {
		changeNav(LEFT_NAV, "Home", () => goToHome(DIRECTION_ANIMATION.RIGHT))
		showNavs([LEFT_NAV])
	})
	const aboutText = document.getElementById('about-text')
	const profilePicture = document.getElementById('profile-picture')
	const aboutParagraph = document.getElementById('about-paragraph')
	await transition.begin(aboutText, "width 0 100% 0.5s ease-out").promise
	transition.begin(aboutParagraph, "opacity 0 1 1s linear")
	transition.begin(profilePicture, "opacity 0 1 1s linear")
	transition.begin(aboutText, "filter blur(5px) blur(0) 1s linear")
}

async function goToCV() {
	const hideNavsPromise = hideNavs([TOP_NAV, RIGHT_NAV, LEFT_NAV, BOT_NAV])
	const travelPromise = travel(DIRECTION_ANIMATION.UP, "pages/cv.html")
	await Promise.all([hideNavsPromise, travelPromise])
	changeNav(TOP_NAV, "Home", () => goToHome(DIRECTION_ANIMATION.DOWN))
	showNavs([TOP_NAV])
}