function terminalType() {
	console.log("typing in terminal")
	let p = document.getElementById("about-paragraph")
	let text = p.innerText
	p.innerText = ""
	p.style.opacity = '1'
	let i = 0, speed = 50

	function typeWriter() {
		if (i < text.length) {
			p.innerHTML += text.charAt(i)
			i++
			setTimeout(typeWriter, speed)
		}
	}

	typeWriter()
}

const audioPlayer = document.getElementById('audio-player')
let audioPlaying = false
async function setupAudioPlayer(event) {
	event.stopPropagation()
	if (audioPlaying || !audioPlayer.paused) return
	document.body.style.pointerEvents = 'none'
	const content = document.getElementById('content')
	await transition.begin(content, OPACITY_ANIMATION.out).promise
	changeContent('pages/home.html')
	await Promise.all([transition.begin(content, OPACITY_ANIMATION.in).promise, showNavs([BOT_NAV, RIGHT_NAV, LEFT_NAV])])
	audioPlayer.volume = 0.3
	audioPlayer.play()
	audioPlaying = true
	document.body.style.pointerEvents = 'auto'
}

window.onload = () => {
	document.body.addEventListener('click', setupAudioPlayer)
}
