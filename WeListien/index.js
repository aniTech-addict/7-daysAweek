// Play-Pause Button Toggle
const playBtn = document.getElementById('play-btn');






// Manage State of Play Button
let isPlaying = true; // Assume starts playing

function togglePlayState() {
    isPlaying = !isPlaying;
    updatePlayIcon();
}

function updatePlayIcon() {
    if (isPlaying) {
        playBtn.classList.remove('pause-icon');
        playBtn.classList.add('play-icon');
    } else {
        playBtn.classList.remove('play-icon');
        playBtn.classList.add('pause-icon');
    }
}

playBtn.addEventListener('click', togglePlayState);