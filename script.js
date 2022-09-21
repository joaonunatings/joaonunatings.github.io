var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;

// function onYouTubeIframeAPIReady() {
// 	player = new YT.Player('wp-custom-header-video', {
// 		events: {
// 			'onReady': onPlayerReady,
// 			'onStateChange': onPlayerStateChange
// 		}
// 	});
// }

window.onYouTubePlayerAPIReady = function(){
	player = new YT.Player('player', {
		height: '390',
		width: '640',
		videoId: 'pX_jySkFIK4',
		playerVars: {
			'mute': 0,
			'autoplay': 1,
			'controls': 0,
			'disablekb': 1,
			'start': 60,
			'fs': 0,
			'iv-load-policy': 3,
			'loop': 1,
			'modestbranding': 1,
			'playsinline': 1,
			'rel': 0
		},
		events: {
			'onReady': onPlayerReady,
			'onStateChange': onPlayerStateChange
		}
	});
}

function onPlayerReady() {
	console.log("hey Im ready");
	//do whatever you want here. Like, player.playVideo();
}

function onPlayerStateChange() {
	console.log("my state changed");
}

let muteButton = document.getElementById("mute");

muteButton.addEventListener('click', function(event) {
	console.log(player);

	let icon = createElement('i', "")

	if (player.isMuted()) {
		player.unMute();
		muteButton.innerHTML = '<i class="bi bi-volume-up"></i>'
	} else {
		player.mute();
		muteButton.innerHTML = '<i class="bi bi-volume-mute"></i>'
	}
});