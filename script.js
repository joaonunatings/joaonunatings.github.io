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