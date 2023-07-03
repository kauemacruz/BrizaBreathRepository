/*Lungs JS*/
const songSelectLungs = document.getElementById('song-selectLungs');
const audioPlayerLungs = document.getElementById('audio-playerLungs');
const startBtnLungs = document.getElementById('lungsStart');

// Variable to store the timeout ID
let timeoutIdLungs;


// Function to play the selected song
const playSelectedSongLungs = () => {
    const selectedSongLungs = songSelectLungs.value;
    audioPlayerLungs.src = selectedSongLungs;
    if (lungsIsOn != true) {
        audioPlayerLungs.muted = false;
        audioPlayerLungs.play();
        localStorage.setItem('selectedSongLungs', songSelectLungs.value);
        // Clear any existing timeout
        clearTimeout(timeoutIdLungs);
        timeoutIdLungs = setTimeout(function () {
            audioPlayerLungs.pause();
            audioPlayerLungs.currentTime = 0;
        }, 15000);
    }
    else {
        audioPlayerLungs.muted = false;
        audioPlayerLungs.loop = true;
        audioPlayerLungs.play();
        clearTimeout(timeoutIdLungs);
    }
};

const storedSongLungs = localStorage.getItem('selectedSongLungs');
if (storedSongLungs) {
    // Set the value of the songSelect dropdown to the stored song
    songSelectLungs.value = storedSongLungs;
}

// Add an event listener to the songSelectLungs dropdown
songSelectLungs.addEventListener('change', function () {
    // Stop the currently playing song
    audioPlayerLungs.pause();
    audioPlayerLungs.currentTime = 0;

    // Play the selected song
    playSelectedSongLungs();
});


$(function () {
    $('#lungsForm').on('submit', function (e) {
        e.preventDefault(); // Prevent the default form submission

        var formData = new FormData(this); // Get the form data

        $.ajax({
            url: "/",
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function (result) {
                $('#lungsResultSaved').html(result); // Update the result section with the server response
            }
        });
        clearInterval(lungsInt);
        [lungsSeconds, lungsMinutes] = [0, 0];
        lungsTimerRef.value = '00 : 00';
        document.getElementById('lungsStop').disabled = true;
        document.getElementById('lungsStop').style.color = 'rgb(177, 177, 177)';
        document.getElementById('lungsSave').disabled = true;
        document.getElementById('lungsSave').style.color = 'rgb(177, 177, 177)';
        audioPlayerLungs.currentTime = 0;
    });
});

let [lungsSeconds, lungsMinutes] = [0, 0];
let lungsTimerRef = document.getElementById('timerDisplayLungs');
let lungsInt = null;
document.getElementById('lungsStop').disabled = true;
document.getElementById('lungsStop').style.color = 'rgb(177, 177, 177)';
document.getElementById('lungsSave').disabled = true;
document.getElementById('lungsSave').style.color = 'rgb(177, 177, 177)';
var lungsIsOn = false;
startBtnLungs.addEventListener('click', () => {
    if (lungsInt !== null) {
        clearInterval(lungsInt);
    }
    lungsInt = setInterval(lungsDisplayTimer, 1000);
    document.getElementById('lungsStart').style.display = 'none';
    document.getElementById('lungsPause').style.display = 'inline';
    document.getElementById('lungsStop').disabled = true;
    document.getElementById('lungsStop').style.color = 'rgb(177, 177, 177)';
    document.getElementById('lungsSave').disabled = true;
    document.getElementById('lungsSave').style.color = 'rgb(177, 177, 177)';
    document.getElementById('lungsSettings').disabled = true;
    document.getElementById('lungsSettings').style.color = 'rgb(177, 177, 177)';
    lungsIsOn = true;
    if (lungsismute != true) {
        playSelectedSongLungs();
    }
});
document.getElementById('lungsPause').addEventListener('click', () => {
    clearInterval(lungsInt);
    document.getElementById('lungsStart').style.display = 'inline';
    document.getElementById('lungsPause').style.display = 'none';
    document.getElementById('lungsStop').disabled = false;
    document.getElementById('lungsStop').style.color = '#990000';
    document.getElementById('lungsSave').disabled = false;
    document.getElementById('lungsSave').style.color = '#49B79D';
    document.getElementById('lungsSettings').disabled = false;
    document.getElementById('lungsSettings').style.color = '#49B79D';
    if (lungsismute != true) {
        audioPlayerLungs.pause();
    }
    lungsIsOn = false;
    document.getElementById('lungsDate').value = date;
});
document.getElementById('lungsStop').addEventListener('click', () => {
    clearInterval(lungsInt);
    [lungsSeconds, lungsMinutes] = [0, 0];
    lungsTimerRef.value = '00 : 00';
    document.getElementById('lungsStop').disabled = true;
    document.getElementById('lungsStop').style.color = 'rgb(177, 177, 177)';
    document.getElementById('lungsSave').disabled = true;
    document.getElementById('lungsSave').style.color = 'rgb(177, 177, 177)';
    if (lungsismute != true) {
        audioPlayerLungs.pause();
    }
    audioPlayerLungs.currentTime = 0;
    lungsIsOn = false;
});
function lungsDisplayTimer() {
    lungsSeconds++;
    if (lungsSeconds == 60) {
        lungsSeconds = 0;
        lungsMinutes++;
    }
    let lungsM = lungsMinutes < 10 ? "0" + lungsMinutes : lungsMinutes;
    let lungsS = lungsSeconds < 10 ? "0" + lungsSeconds : lungsSeconds;
    lungsTimerRef.value = `${lungsM} : ${lungsS}`;
}
var lungsaudio = document.getElementById("lungsaudio"),
    lungsmute = document.getElementById("lungsmute"),
    lungsismute = false;


// Get the volumeLungs bar element
const volumeBarLungs = document.getElementById('volumeBarLungs');

// Add an event listener for the volumeLungs change event
volumeBarLungs.addEventListener('input', function () {
    // Get the current volumeLungs value
    const volumeLungs = parseFloat(volumeBarLungs.value);

    // Check if volumeLungs is 0 and mute the media if necessary
    if (volumeLungs === 0) {
        audioPlayerLungs.muted = true;
        lungsaudio.style.display = "none";
        lungsmute.style.display = "block";
        lungsismute = true;
    } else {
        audioPlayerLungs.muted = false;
        lungsmute.style.display = "none";
        lungsaudio.style.display = "block";
        lungsismute = false;
    }
});
