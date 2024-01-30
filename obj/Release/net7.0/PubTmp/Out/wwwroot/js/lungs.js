/*Lungs JS*/
var isLUNGSon = false;

const startBtnLungs = document.getElementById('lungsStart');
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
        audioPlayerBRT.currentTime = 0;
    });
});

let [lungsSeconds, lungsMinutes] = [0, 0];
let lungsTimerRef = document.getElementById('timerDisplayLungs');
let lungsInt = null;
document.getElementById('lungsStop').disabled = true;
document.getElementById('lungsStop').style.color = 'rgb(177, 177, 177)';
document.getElementById('lungsSave').disabled = true;
document.getElementById('lungsSave').style.color = 'rgb(177, 177, 177)';
startBtnLungs.addEventListener('click', () => {
    isLUNGSon = true;
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
    if (!audioPlayerBRT.muted) {
        audioObjects.bell.muted = false;
        audioObjects.bell.play();
        playSelectedSongBRT(true);
    }
});
document.getElementById('lungsPause').addEventListener('click', () => {
    isLUNGSon = false;
    clearInterval(lungsInt);
    document.getElementById('lungsStart').style.display = 'inline';
    document.getElementById('lungsPause').style.display = 'none';
    document.getElementById('lungsStop').disabled = false;
    document.getElementById('lungsStop').style.color = '#990000';
    document.getElementById('lungsSave').disabled = false;
    document.getElementById('lungsSave').style.color = '#49B79D';
    document.getElementById('lungsSettings').disabled = false;
    document.getElementById('lungsSettings').style.color = '#49B79D';
    if (!audioPlayerBRT.muted) {
        audioPlayerBRT.pause();
    }
    document.getElementById('lungsDate').value = date;
});
document.getElementById('lungsStop').addEventListener('click', () => {
    isLUNGSon = false;
    clearInterval(lungsInt);
    [lungsSeconds, lungsMinutes] = [0, 0];
    lungsTimerRef.value = '00 : 00';
    document.getElementById('lungsStop').disabled = true;
    document.getElementById('lungsStop').style.color = 'rgb(177, 177, 177)';
    document.getElementById('lungsSave').disabled = true;
    document.getElementById('lungsSave').style.color = 'rgb(177, 177, 177)';
    if (!audioPlayerBRT.muted) {
        audioPlayerBRT.pause();
    }
    audioPlayerBRT.currentTime = 0;
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
    lungsmute = document.getElementById("lungsmute");

// Get the volumeLungs bar element
const volumeBarLungs = document.getElementById('volumeBarLungs');

// Add an event listener for the volumeLungs change event
volumeBarLungs.addEventListener('input', function () {
    // Get the current volumeLungs value
    const volumeLungs = parseFloat(volumeBarLungs.value);

    // Check if volumeLungs is 0 and mute the media if necessary
    if (volumeLungs === 0) {
        audioPlayerBRT.muted = true;
        lungsaudio.style.display = "none";
        lungsmute.style.display = "block";
    } else {
        audioPlayerBRT.muted = false;
        lungsmute.style.display = "none";
        lungsaudio.style.display = "block";
    }
});
