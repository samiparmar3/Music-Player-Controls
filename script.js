const songs = [
    {
        title: "Dance Playful Night",
        file: "alexzavesa-dance-playful-night-510786.mp3"
    },
    {
        title: "gvidon-gvidon-medicine",
        file: "gvidon-gvidon-medicine-364031.mp3"
    },
    {
        title: "kontraa-water-afro-pop-music",
        file: "kontraa-water-afro-pop-music-445661 (1).mp3"
    },
    {
        title: "kontraa-water",
        file: "kontraa-water-afro-pop-music-445661 (1).mp3"
    }
];

const audio = document.getElementById("audio");
const songTitle = document.getElementById("songTitle");
const playBtn = document.getElementById("playBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const progressBar = document.getElementById("progressBar");
const currentTimeText = document.getElementById("currentTime");
const durationText = document.getElementById("duration");

let currentSong = 0;

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
}

function loadSong(index) {
    audio.src = songs[index].file;
    songTitle.textContent = songs[index].title;
}

function playPauseSong() {
    if (audio.paused) {
        audio.play();
        playBtn.textContent = "⏸";
    } else {
        audio.pause();
        playBtn.textContent = "▶";
    }
}

function nextSong() {
    currentSong++;

    if (currentSong >= songs.length) {
        currentSong = 0;
    }

    loadSong(currentSong);
    audio.play();
    playBtn.textContent = "⏸";
}

function prevSong() {
    currentSong--;

    if (currentSong < 0) {
        currentSong = songs.length - 1;
    }

    loadSong(currentSong);
    audio.play();
    playBtn.textContent = "⏸";
}

audio.addEventListener("loadedmetadata", () => {
    durationText.textContent = formatTime(audio.duration);
});

audio.addEventListener("timeupdate", () => {
    if (audio.duration) {
        progressBar.value =
            (audio.currentTime / audio.duration) * 100;

        currentTimeText.textContent =
            formatTime(audio.currentTime);
    }
});

progressBar.addEventListener("input", () => {
    if (audio.duration) {
        audio.currentTime =
            (progressBar.value / 100) * audio.duration;
    }
});

audio.addEventListener("ended", nextSong);

playBtn.addEventListener("click", playPauseSong);
nextBtn.addEventListener("click", nextSong);
prevBtn.addEventListener("click", prevSong);

loadSong(currentSong);