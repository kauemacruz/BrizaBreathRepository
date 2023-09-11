var iWH = 0;
var xWH = 0;
var yWH = 30;
var myTimeoutWH;
var myTimeout2WH;
var speed = 25;
var cWH = document.getElementById("myCanvasWH");
var ctxWH = cWH.getContext("2d");
var my_gradientWH = ctxWH.createLinearGradient(70, 0, 0, 170);
my_gradientWH.addColorStop(0, "#49B79D");
my_gradientWH.addColorStop(1, "#0661AA");
ctxWH.fillStyle = my_gradientWH;
ctxWH.beginPath();
ctxWH.arc(150, 100, 80, 0, 2 * Math.PI, true);
ctxWH.fill();
function animateWH() {
    if (iWH > 79) {
        iWH = 80;
        if (yWH > 1) {
            if (!BismuteWH) {
                audioListWH[6].muted = false;
                audioListWH[6].loop = false;
                audioListWH[6].play();
            }
        }
    }
    if (iWH > 25) {
        ctxWH.clearRect(0, 0, cWH.width, cWH.height);
        ctxWH.fillStyle = my_gradientWH;
        ctxWH.beginPath();
        ctxWH.arc(150, 100, iWH, 0, 2 * Math.PI, true);
        ctxWH.fill();
        ctxWH.font = "bold 48px serif"
        ctxWH.fillStyle = "white";
        ctxWH.textAlign = "center";
        ctxWH.fillText(yWH, 150, 115);
    }
    if (iWH == 80) {
        xWH++;
        ctxWH.clearRect(0, 0, cWH.width, cWH.height);
        ctxWH.fillStyle = my_gradientWH;
        ctxWH.beginPath();
        ctxWH.arc(150, 100, 80 - xWH, 0, 2 * Math.PI, true);
        ctxWH.fill();
        ctxWH.font = "bold 48px serif"
        ctxWH.fillStyle = "white";
        ctxWH.textAlign = "center";
        ctxWH.fillText(yWH, 150, 115);
    }
    if (xWH > 50) {
        yWH--;
        xWH = 0;
        iWH = 25;
        ctxWH.font = "bold 48px serif"
        ctxWH.fillStyle = "white";
        ctxWH.textAlign = "center";
        ctxWH.fillText(yWH, 150, 165);
        if (yWH > 1) {
            if (!BismuteWH) {
                audioListWH[5].muted = false;
                audioListWH[5].loop = false;
                audioListWH[5].play();
            }
        } else {
            if (!ismuteWH) {
                audioListWH[2].muted = false;
                audioListWH[2].play();
            }
        }
    }
    if (yWH == 0) {
        ctxWH.clearRect(0, 0, cWH.width, cWH.height);
        ctxWH.fillStyle = my_gradientWH;
        ctxWH.beginPath();
        ctxWH.arc(150, 100, 80, 0, 2 * Math.PI, true);
        ctxWH.fill();
        ctxWH.font = "bold 48px serif"
        ctxWH.fillStyle = "white";
        ctxWH.textAlign = "center";
        ctxWH.fillText('Hold', 150, 115);
    }
    iWH++;
    myTimeoutWH = setTimeout(animateWH, speed);
}

function animate2WH() {
    if (iWH > 0) {
        ctxWH.clearRect(0, 0, cWH.width, cWH.height);
        ctxWH.fillStyle = my_gradientWH;
        ctxWH.beginPath();
        ctxWH.arc(150, 100, 80, 0, 2 * Math.PI, true);
        ctxWH.fill();
        ctxWH.font = "bold 48px serif"
        ctxWH.fillStyle = "white";
        ctxWH.textAlign = "center";
        ctxWH.fillText(yWH, 150, 115);
        yWH--;
    }
    iWH++;
    myTimeout2WH = setTimeout(animate2WH, 1000);
}

const songSelectWH = document.getElementById('song-selectWH');
const audioPlayerWH = document.getElementById('audio-playerWH');
var isWHON = false;
// Variable to store the timeout ID
let timeoutIdWH;


// Function to play the selected song
const playSelectedSongWH = () => {
    const selectedSongWH = songSelectWH.value;
    audioPlayerWH.src = selectedSongWH;
    if (isWHON !== true) {
        audioPlayerWH.muted = false;
        audioPlayerWH.play();
        localStorage.setItem('selectedSongWH', songSelectWH.value);
        // Clear any existing timeout
        clearTimeout(timeoutIdWH);
        timeoutIdWH = setTimeout(function () {
            audioPlayerWH.pause();
            audioPlayerWH.currentTime = 0;
        }, 15000);
    } else {
        audioPlayerWH.muted = false;
        audioPlayerWH.loop = true;
        audioPlayerWH.play();
        clearTimeout(timeoutIdWH);
    }
};


const storedSongWH = localStorage.getItem('selectedSongWH');
if (storedSongWH) {
    // Set the value of the songSelect dropdown to the stored song
    songSelectWH.value = storedSongWH;
}

// Add an event listener to the songSelectWH dropdown
songSelectWH.addEventListener('change', function () {
    // Stop the currently playing song
    audioPlayerWH.pause();
    audioPlayerWH.currentTime = 0;

    // Play the selected song
    playSelectedSongWH();
});

$(function () {
    $('#WHForm').on('submit', function (e) {
        e.preventDefault(); // Prevent the default form submission

        var formData = new FormData(this); // Get the form data

        $.ajax({
            url: "/",
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function (result) {
                $('#WHResultSaved').html(result); // Update the result section with the server response
            }
        });
        document.getElementById("WHResults").innerHTML = "";
        timerRefWH.value = "|";
        clearInterval(intWH);
        document.getElementById('WHSettings').disabled = false;
        document.getElementById('WHSettings').style.color = '#49B79D';
        if (!isSongMuteWH) {
            audioPlayerWH.pause();
        }
        timerControlsButtonsWH.pauseWH.style.display = 'none';
        timerControlsButtonsWH.startWH.style.display = 'inline';
        setFormDisabledStateWH(false);
        setTimerControlsDisabledStateWH(false, true, true);
        document.getElementById('resetBtnWH').style.display = 'none';
        document.getElementById('stopBtnWH').style.display = 'inline';
        timerControlsButtonsWH.stopWH.style.color = "rgb(177, 177, 177)";
        timerControlsButtonsWH.startWH.style.color = "#0661AA";
        document.getElementById('WHSave').disabled = true;
        document.getElementById('WHSave').style.color = 'rgb(177, 177, 177)';
        stopTimerTickWH();
        resetTimerWH();
        timerWH.isFinishedWH = true;
        stopTimerTickWH();
    });
});

let formSettingsFieldsWH,
    timerControlsButtonsWH,
    statusPanelWH,
    timerWH,
    timerSettingsWH;

function setTimerSettingsWH(
    intervalCountWH = timerSettingsWH.intervalCountWH,
    intervalDurationWH = timerSettingsWH.intervalDurationWH,
    enableBreakWH = timerSettingsWH.enableBreakWH,
    breakDurationWH = timerSettingsWH.breakDurationWH,
    enableBreak2WH = timerSettingsWH.enableBreak2WH,
    breakDuration2WH = timerSettingsWH.breakDuration2WH
) {
    timerSettingsWH = {
        intervalCountWH,
        intervalDurationWH,
        enableBreakWH,
        breakDurationWH,
        enableBreak2WH,
        breakDuration2WH,
    };
}

function resetTimerWH() {
    timerWH = {
        totalTimeElapsedWH: 0,
        elapsedInIntervalWH: 0,
        intervalsDoneWH: 0,
        isBreak3WH: false,
        isBreakWH: false,
        isBreak2WH: true,
        isFinishedWH: false
    };
    updateInfoWH();
}

let [secondsWH, minutesWH, hoursWH] = [0, 0, 0];
let timerRefWH = document.getElementById('timerDisplayWH');
let intWH = null;
document.getElementById('stopBtnWH').disabled = true;
document.getElementById('stopBtnWH').style.color = 'rgb(177, 177, 177)';
document.getElementById('WHSave').disabled = true;
document.getElementById('WHSave').style.color = 'rgb(177, 177, 177)';

var audioListWH = []
audioListWH.push(new Audio('../sounds/breathein.mp3'));
audioListWH.push(new Audio('../sounds/normalbreath.mp3'));
audioListWH.push(new Audio('../sounds/letgoandhold.mp3'));
audioListWH.push(new Audio('../sounds/hold.mp3'));
audioListWH.push(new Audio('../sounds/chill.mp3'));
audioListWH.push(new Audio('../sounds/fullyin.mp3'));
audioListWH.push(new Audio('../sounds/fullyout.mp3'));
audioListWH.push(new Audio('../sounds/letGo.mp3'));


var audioWH = document.getElementById("audioWH"),
    muteWH = document.getElementById("muteWH"),
    ismuteWH = false;

var BaudioWH = document.getElementById("BaudioWH"),
    BmuteWH = document.getElementById("BmuteWH"),
    BismuteWH = false;

audioPlayerWH.loop = true;

var audioSongWH = document.getElementById("songWH"),
    muteSongWH = document.getElementById("songMuteWH"),
    isSongMuteWH = false;

// Get the volumeVWH bar element
const volumeVoiceWH = document.getElementById('volumeVoiceWH');

// Add an event listener for the volumeVWH change event
volumeVoiceWH.addEventListener('input', function () {
    // Get the current volumeVWH value
    const volumeVWH = parseFloat(volumeVoiceWH.value);

    // Check if volumeVWH is 0 and mute the media if necessary
    if (volumeVWH === 0) {
        audioListWH[0].muted = true;
        audioListWH[1].muted = true;
        audioListWH[2].muted = true;
        audioListWH[3].muted = true;
        audioListWH[4].muted = true;
        audioWH.style.display = "none";
        muteWH.style.display = "block";
        ismuteWH = true;
    } else {
        audioListWH[0].muted = false;
        audioListWH[1].muted = false;
        audioListWH[2].muted = false;
        audioListWH[3].muted = false;
        audioListWH[4].muted = false;
        muteWH.style.display = "none";
        audioWH.style.display = "block";
        ismuteWH = false;
    }
});
// Get the volumeVWH bar element
const BvolumeVoiceWH = document.getElementById('BvolumeVoiceWH');

// Add an event listener for the volumeVWH change event
BvolumeVoiceWH.addEventListener('input', function () {
    // Get the current volumeVWH value
    const BvolumeVWH = parseFloat(BvolumeVoiceWH.value);

    // Check if volumeVWH is 0 and mute the media if necessary
    if (BvolumeVWH === 0) {
        audioListWH[5].muted = true;
        audioListWH[6].muted = true;
        BaudioWH.style.display = "none";
        BmuteWH.style.display = "block";
        BismuteWH = true;
    } else {
        audioListWH[5].muted = false;
        audioListWH[6].muted = false;
        BmuteWH.style.display = "none";
        BaudioWH.style.display = "block";
        BismuteWH = false;
    }
});

// Get the volumeSWH bar element
const volumeSongWH = document.getElementById('volumeSongWH');

// Add an event listener for the volumeSWH change event
volumeSongWH.addEventListener('input', function () {
    // Get the current volumeSWH value
    const volumeSWH = parseFloat(volumeSongWH.value);

    // Check if volumeSWH is 0 and mute the media if necessary
    if (volumeSWH === 0) {
        audioPlayerWH.muted = true;
        audioSongWH.style.display = "none";
        muteSongWH.style.display = "block";
        isSongMuteWH = true;
    } else {
        audioPlayerWH.muted = false;
        muteSongWH.style.display = "none";
        audioSongWH.style.display = "block";
        isSongMuteWH = false;
    }
});


var inhaleWH = 9999;
var holdHW = 15;
var exhaleWH = 9999;
setTimerSettingsWH(9999, inhaleWH, true, holdHW, true, exhaleWH);
initializeTimerControlsWH();
initializeStatusPanelWH();
initializeTimerSettingsFormWH();
resetTimerWH();

var minusBtnWH = document.getElementById("minusWH"),
    plusBtnWH = document.getElementById("plusWH"),
    numberWH = 30, /// numberWH value
    minWH = 20, /// minWH numberWH
    maxWH = 70;
minusBtnWH.onclick = function () {
    if (numberWH > minWH) {
        numberWH = numberWH - 10;
        formSettingsFieldsWH.breakDuration2WH.value = numberWH;
        ctxWH.clearRect(0, 0, cWH.width, cWH.height);
        ctxWH.fillStyle = my_gradientWH;
        ctxWH.beginPath();
        ctxWH.arc(150, 100, 80, 0, 2 * Math.PI, true);
        ctxWH.fill();
        ctxWH.font = "bold 48px serif"
        ctxWH.fillStyle = "white";
        ctxWH.textAlign = "center";
        ctxWH.fillText(numberWH, 150, 115);
        yWH = numberWH;
        setTimerSettingsWH(9999, yWH, true, formSettingsFieldsWH.breakDurationWH.value, true, 9999);
    }
}

plusBtnWH.onclick = function () {
    if (numberWH < maxWH) {
        numberWH = numberWH + 10;
        formSettingsFieldsWH.breakDuration2WH.value = numberWH;
        ctxWH.clearRect(0, 0, cWH.width, cWH.height);
        ctxWH.fillStyle = my_gradientWH;
        ctxWH.beginPath();
        ctxWH.arc(150, 100, 80, 0, 2 * Math.PI, true);
        ctxWH.fill();
        ctxWH.font = "bold 48px serif"
        ctxWH.fillStyle = "white";
        ctxWH.textAlign = "center";
        ctxWH.fillText(numberWH, 150, 115);
        yWH = numberWH;
        setTimerSettingsWH(9999, yWH, true, formSettingsFieldsWH.breakDurationWH.value, true, 9999);
    }
}
var SminusBtnWH = document.getElementById("SminusWH"),
    SplusBtnWH = document.getElementById("SplusWH"),
    breathSpeed = document.getElementById("breathSpeed");
breathSpeed.value = "Medium";
SminusBtnWH.onclick = function () {
    if (breathSpeed.value == "Medium") {
        SminusBtnWH.style.color = "rgb(177,177,177)";
        breathSpeed.value = "Slow";
        speed = 30;
    }
    else if (breathSpeed.value == "Fast") {
        breathSpeed.value = "Medium";
        speed = 25;
        SplusBtnWH.style.color = "#49B79D";
    }
}

SplusBtnWH.onclick = function () {
    if (breathSpeed.value == "Slow") {
        SminusBtnWH.style.color = "#49B79D";
        breathSpeed.value = "Medium";
        speed = 25;
    }
    else if (breathSpeed.value == "Medium") {
        breathSpeed.value = "Fast";
        SplusBtnWH.style.color = "rgb(177,177,177)";
        speed = 20;
    }
}

function initializeTimerSettingsFormWH() {
    const oneDayInSecondsWH = 60 * 60 * 24;
    let lastUserSetEnableBreakWH = timerSettingsWH.enableBreakWH;
    let lastUserSetEnableBreak2 = timerSettingsWH.enableBreak2WH;
    formSettingsFieldsWH = {
        intervalCountWH: document.getElementById('intervalCountInputWH'),
        intervalDurationWH: document.getElementById('intervalDurationInputWH'),
        enableBreakWH: document.getElementById('enableBreakInputWH'),
        breakDurationWH: document.getElementById('breakDurationInputWH'),
        enableBreak2WH: document.getElementById('enableBreakInput2WH'),
        breakDuration2WH: document.getElementById('breakDurationInput2WH'),
    };
    formSettingsFieldsWH.intervalCountWH.value = timerSettingsWH.intervalCountWH;
    formSettingsFieldsWH.intervalDurationWH.value = timerSettingsWH.intervalDurationWH;
    formSettingsFieldsWH.enableBreakWH.checked = timerSettingsWH.enableBreakWH;
    formSettingsFieldsWH.breakDurationWH.value = timerSettingsWH.breakDurationWH;
    formSettingsFieldsWH.enableBreak2WH.checked = timerSettingsWH.enableBreak2WH;
    formSettingsFieldsWH.breakDuration2WH.value = 30;
    ctxWH.font = "bold 48px serif"
    ctxWH.fillStyle = "white";
    ctxWH.textAlign = "center";
    ctxWH.fillText(30, 150, 115);

    function getNumberInBoundsOrDefaultWH(value, minWH, maxWH, def = 1) {
        const valueAsNumberWH = parseInt(value);
        return isNaN(valueAsNumberWH) ? def : Math.max(minWH, Math.min(valueAsNumberWH, maxWH));
    }

    function setBreakDurationLineDisplayWH(displayed) {
        const breakDurationInputLineEltWH = document.getElementById('breakDurationInputLineWH');
        breakDurationInputLineEltWH.style.display = displayed ? null : 'none';
        const breakDurationInputLineElt2WH = document.getElementById('breakDurationInputLine2WH');
        breakDurationInputLineElt2WH.style.display = displayed ? null : 'none';
    }

    formSettingsFieldsWH.intervalCountWH.addEventListener('input', () => {
        const intervalCountWH = getNumberInBoundsOrDefaultWH(formSettingsFieldsWH.intervalCountWH.value, 1, 9999),
            hasOneIntervalWH = intervalCountWH === 1,
            hasBreakWH = hasOneIntervalWH ? false : lastUserSetEnableBreakWH;
        formSettingsFieldsWH.enableBreakWH.disabled = hasOneIntervalWH === true;
        formSettingsFieldsWH.enableBreakWH.checked = hasBreakWH;
        setBreakDurationLineDisplayWH(hasBreakWH);
        setTimerSettingsWH(intervalCountWH, undefined, hasBreakWH);
        updateInfoWH();
    });

    formSettingsFieldsWH.intervalDurationWH.addEventListener('input', () => {
        setTimerSettingsWH(undefined, getNumberInBoundsOrDefaultWH(formSettingsFieldsWH.intervalDurationWH.value, 1, oneDayInSecondsWH));
        updateInfoWH();
    });

    formSettingsFieldsWH.enableBreakWH.addEventListener('change', () => {
        const enableBreakWH = formSettingsFieldsWH.enableBreakWH.checked;
        lastUserSetEnableBreakWH = enableBreakWH;
        setBreakDurationLineDisplayWH(enableBreakWH);
        setTimerSettingsWH(undefined, undefined, enableBreakWH);
        updateInfoWH();
    });

    formSettingsFieldsWH.breakDurationWH.addEventListener('input', () => {
        setTimerSettingsWH(
            undefined, undefined, undefined,
            getNumberInBoundsOrDefaultWH(formSettingsFieldsWH.breakDurationWH.value, 1, oneDayInSecondsWH)
        );
        updateInfoWH();
    });

    formSettingsFieldsWH.enableBreak2WH.addEventListener('change', () => {
        const enableBreak2WH = formSettingsFieldsWH.enableBreak2WH.checked;
        lastUserSetEnableBreak2 = enableBreak2WH;
        setBreakDurationLineDisplayWH(enableBreak2WH);
        setTimerSettingsWH(undefined, undefined, undefined, undefined, enableBreak2WH);
        updateInfoWH();
    });

    formSettingsFieldsWH.breakDuration2WH.addEventListener('input', () => {
        setTimerSettingsWH(
            undefined, undefined, undefined, undefined, undefined,
            getNumberInBoundsOrDefaultWH(formSettingsFieldsWH.breakDuration2WH.value, 1, oneDayInSecondsWH)
        );
        updateInfoWH();
    });
}

function initializeTimerControlsWH() {
    timerControlsButtonsWH = {
        startWH: document.getElementById('startBtnWH'),
        pauseWH: document.getElementById('pauseBtnWH'),
        stopWH: document.getElementById('stopBtnWH'),
    };
    setTimerControlsDisabledStateWH(false, true, true);
    timerControlsButtonsWH.startWH.addEventListener('click', startTimerWH);
    timerControlsButtonsWH.pauseWH.addEventListener('click', pauseTimerWH);
    timerControlsButtonsWH.stopWH.addEventListener('click', stopTimerWH);
}

function initializeStatusPanelWH() {
    statusPanelWH = {
        timeOverviewMessageWH: document.getElementById('timeOverviewMessageWH'),

        elapsedInIntervalBoxWH: document.getElementById('elapsedInIntervalBoxWH'),
        elapsedInBreakIntervalBoxWH: document.getElementById('elapsedInBreakIntervalBoxWH'),
        elapsedInIntervalWH: document.getElementById('elapsedInIntervalWH'),
        elapsedInBreakIntervalWH: document.getElementById('elapsedInBreakIntervalWH'),
        elapsedInBreakIntervalBox2WH: document.getElementById('elapsedInBreakIntervalBox2WH'),
        elapsedInBreakInterval2WH: document.getElementById('elapsedInBreakInterval2WH'),
        intervalsDoneWH: document.getElementById('intervalsDoneWH'),
    };
}

function setTimerControlsDisabledStateWH(startWH, pauseWH, stopWH) {
    timerControlsButtonsWH.startWH.disabled = startWH;
    timerControlsButtonsWH.pauseWH.disabled = pauseWH;
    timerControlsButtonsWH.stopWH.disabled = stopWH;
}

function setFormDisabledStateWH(disabled) {
    formSettingsFieldsWH.intervalCountWH.disabled = disabled;
    formSettingsFieldsWH.intervalDurationWH.disabled = disabled;
    formSettingsFieldsWH.enableBreakWH.disabled = disabled || timerSettingsWH.intervalCountWH === 1;
    formSettingsFieldsWH.breakDurationWH.disabled = disabled;
    formSettingsFieldsWH.enableBreak2WH.disabled = disabled
    formSettingsFieldsWH.breakDuration2WH.disabled = disabled;
    minusBtnWH.disabled = disabled;
    plusBtnWH.disabled = disabled;
}

function startTimerWH() {
    setFormDisabledStateWH(true);
    setTimerControlsDisabledStateWH(false, true, false);
    document.getElementById('stopBtnWH').style.color = '#990000';
    if (intWH !== null) {
        clearInterval(intWH);
    }
    if (timerWH.isBreak2WH) {
        if (!ismuteWH) {
            audioListWH[5].muted = false;
            audioListWH[5].play();
        }
    }
    isWHON = true;
    if (!isSongMuteWH) {
        playSelectedSongWH();
    }
    if (timerWH.isFinishedWH) {
        resetTimerWH();
    }
    startTimerTickWH();
    document.getElementById("circleWH").style.display = "block";
    animateWH();
    timerControlsButtonsWH.startWH.style.display = 'none';
    timerControlsButtonsWH.pauseWH.style.display = 'inline';
    timerControlsButtonsWH.pauseWH.style.color = "rgb(177, 177, 177)";
    document.getElementById('WHDate').value = date;
    document.getElementById('WHSettings').disabled = true;
    document.getElementById('WHSettings').style.color = 'rgb(177, 177, 177)';
}

var nextroundWH = false;
function pauseTimerWH() {
    setTimerControlsDisabledStateWH(true, true, false);
    timerControlsButtonsWH.pauseWH.style.color = "rgb(177, 177, 177)";
    document.getElementById("WHResults").innerHTML += "<div class='NOfSteps'> <div>Round " + (timerWH.intervalsDoneWH) + "</div><div>" + timeWH + " seconds</div></div>";
    timerRefWH.value += timeWH + "|";
    clearInterval(intWH);
    [secondsWH, minutesWH] = [0, 0];
    clearTimeout(myTimeoutWH);
    ctxWH.clearRect(0, 0, cWH.width, cWH.height);
    ctxWH.fillStyle = my_gradientWH;
    ctxWH.beginPath();
    ctxWH.arc(150, 100, 80, 0, 2 * Math.PI, true);
    ctxWH.fill();
    ctxWH.font = "bold 48px serif"
    ctxWH.fillStyle = "white";
    ctxWH.textAlign = "center";
    yWH = formSettingsFieldsWH.breakDurationWH.value;
    ctxWH.fillText(yWH, 150, 115);
    nextroundWH = true;
    timerControlsButtonsWH.stopWH.style.color = '#990000';
}

function stopTimerWH() {
    if (timerWH.isBreak3WH) {
        document.getElementById("WHResults").innerHTML += "<div class='NOfSteps'> <div>Round " + (timerWH.intervalsDoneWH) + "</div><div>" + timeWH + " seconds</div></div>";
        timerRefAHAT.value += timerAHAT.elapsedInIntervalAHAT + "|";
    }
    if (document.getElementById("WHResults").innerHTML !== "") {
        document.getElementById('WHSave').disabled = false;
        document.getElementById('WHSave').style.color = '#49B79D';
        timerControlsButtonsWH.stopWH.style.display = "none";
        document.getElementById('resetBtnWH').style.display = 'inline';
        document.getElementById('resetBtnWH').style.color = '#990000';
        setTimerControlsDisabledStateWH(true, true, true);
        timerControlsButtonsWH.startWH.style.color = "rgb(177, 177, 177)";
    } else {
        setTimerControlsDisabledStateWH(false, true, true);
        timerControlsButtonsWH.startWH.style.color = '#49B79D';
    }
    clearInterval(intWH);
    [secondsWH, minutesWH] = [0, 0];
    document.getElementById('WHSettings').disabled = false;
    document.getElementById('WHSettings').style.color = '#49B79D';
    if (!isSongMuteWH) {
        audioPlayerWH.pause();
    }
    audioPlayerWH.currentTime = 0;
    timerControlsButtonsWH.pauseWH.style.display = 'none';
    timerControlsButtonsWH.startWH.style.display = 'inline';
    setFormDisabledStateWH(false);
    timerControlsButtonsWH.stopWH.style.color = "rgb(177, 177, 177)";
    ctxWH.clearRect(0, 0, cWH.width, cWH.height);
    ctxWH.fillStyle = my_gradientWH;
    ctxWH.beginPath();
    ctxWH.arc(150, 100, 80, 0, 2 * Math.PI, true);
    ctxWH.fill();
    ctxWH.font = "bold 48px serif"
    ctxWH.fillStyle = "white";
    ctxWH.textAlign = "center";
    yWH = formSettingsFieldsWH.breakDuration2WH.value;
    ctxWH.fillText(yWH, 150, 115);
    if (!ismuteWH) {
        audioListWH[1].muted = false;
        audioListWH[1].play();
    }
    stopTimerTickWH();
    clearTimeout(myTimeoutWH);
    clearTimeout(myTimeout2WH);
}
document.getElementById('resetBtnWH').addEventListener('click', function () {
    resetTimerWH();
    setTimerControlsDisabledStateWH(false, true, true);
    timerControlsButtonsWH.startWH.style.color = '#49B79D';
    document.getElementById("WHResults").innerHTML = '';
    document.getElementById('resetBtnWH').style.display = 'none';
    timerControlsButtonsWH.stopWH.style.display = "inline";
    document.getElementById('WHSave').disabled = true;
    document.getElementById('WHSave').style.color = 'rgb(177, 177, 177)';
});


var timeWH = '';
function displayTimerWH() {
    secondsWH++;
    if (secondsWH == 60) {
        secondsWH = 0;
        minutesWH++;
    }
    let mWH = minutesWH < 10 ? "0" + minutesWH : minutesWH;
    let sWH = secondsWH < 10 ? "0" + secondsWH : secondsWH;
    ctxWH.clearRect(0, 0, cWH.width, cWH.height);
    ctxWH.fillStyle = my_gradientWH;
    ctxWH.beginPath();
    ctxWH.arc(150, 100, 80, 0, 2 * Math.PI, true);
    ctxWH.fill();
    ctxWH.font = "bold 48px serif"
    ctxWH.fillStyle = "white";
    ctxWH.textAlign = "center";
    timeWH = `${mWH} : ${sWH}`;
    ctxWH.fillText(timeWH, 150, 115);
}

function startTimerTickWH() {
    timerWH.intervalId = setInterval(onTimerTickWH, 1000);
}

function stopTimerTickWH() {
    clearInterval(timerWH.intervalId);
}

function onTimerTickWH() {
    const currentIntervalDurationWH = timerWH.isBreakWH ? timerSettingsWH.breakDurationWH : timerWH.isBreak2WH ? timerSettingsWH.breakDuration2WH : timerSettingsWH.intervalDurationWH;
    if (timerWH.elapsedInIntervalWH <= currentIntervalDurationWH && timerWH.isBreak3WH) {
        timerWH.elapsedInIntervalWH++;
        if (nextroundWH && yWH == 15) {
            if (!ismuteWH) {
                audioListWH[0].muted = false;
                audioListWH[0].play();
            }
            animate2WH();
            timerWH.isBreakWH = true;
            timerWH.isBreak3WH = false;
            timerWH.isFinishedWH = timerWH.intervalsDoneWH === timerSettingsWH.intervalCountWH;
            if (!timerWH.isFinishedWH) {
                timerWH.elapsedInIntervalWH = 1;
            }
            if (timerWH.isFinishedWH) {
                setTimerControlsDisabledStateWH(false, true, false);
                setFormDisabledStateWH(false);
                stopTimerTickWH();
            } else {
                timerWH.totalTimeElapsedWH++;
            }

            updateInfoWH();
            nextroundWH = false;
        }
        updateInfoWH();
    } else if (timerWH.elapsedInIntervalWH <= currentIntervalDurationWH && timerWH.isBreakWH) {
        timerWH.elapsedInIntervalWH++;
        if (timerWH.elapsedInIntervalWH > currentIntervalDurationWH && yWH == 0 && timerWH.isBreakWH) {           
            clearTimeout(myTimeout2WH);
            timerWH.isBreak2WH = true;
            timerWH.isBreakWH = false;
            clearInterval(intWH);
            [secondsWH, minutesWH] = [0, 0];
            stopTimerTickWH();
            if (!ismuteWH) {
                audioListWH[7].muted = false;
                audioListWH[7].play();
            }
            ctxWH.clearRect(0, 0, cWH.width, cWH.height);
            ctxWH.fillStyle = my_gradientWH;
            ctxWH.beginPath();
            ctxWH.arc(150, 100, 80, 0, 2 * Math.PI, true);
            ctxWH.fill();
            ctxWH.font = "bold 48px serif"
            ctxWH.fillStyle = "white";
            ctxWH.textAlign = "center";
            ctxWH.fillText('Let Go', 150, 115);
            setTimeout(function () {
                ctxWH.clearRect(0, 0, cWH.width, cWH.height);
                yWH = numberWH;
                startTimerWH();
            }, 3000);
        }
    } else if (timerWH.elapsedInIntervalWH <= currentIntervalDurationWH && timerWH.isBreak2WH) {
        timerWH.elapsedInIntervalWH++;
        if (yWH == 0 && timerWH.isBreak2WH) {
            intWH = setInterval(displayTimerWH, 1000);
            clearTimeout(myTimeoutWH);
            timerWH.isBreak3WH = true;
            timerWH.isBreak2WH = false;
            timerWH.intervalsDoneWH++;
            timerWH.isFinishedWH = timerWH.intervalsDoneWH === timerSettingsWH.intervalCountWH;
            if (!timerWH.isFinishedWH) {
                timerWH.elapsedInIntervalWH = 1;
            }
            if (timerWH.isFinishedWH) {
                setTimerControlsDisabledStateWH(false, false, false);
                setFormDisabledStateWH(false);
                stopTimerTickWH();
            } else {
                timerWH.totalTimeElapsedWH++;
            }
            updateInfoWH();
            timerControlsButtonsWH.pauseWH.style.color = '#0661AA';
            setTimerControlsDisabledStateWH(false, false, false);
        }
        updateInfoWH();
    }
}

function updateInfoWH() {
    statusPanelWH.timeOverviewMessageWH.style.display = timerWH.isFinishedWH ? 'block' : null;
    statusPanelWH.elapsedInIntervalBoxWH.style.display = timerWH.isFinishedWH || timerWH.isBreakWH || timerWH.isBreak2WH || timerWH.isBreak4 ? 'none' : null;
    statusPanelWH.elapsedInBreakIntervalBoxWH.style.display = !timerWH.isFinishedWH && timerWH.isBreakWH ? 'block' : null;
    statusPanelWH.elapsedInBreakIntervalBox2WH.style.display = !timerWH.isFinishedWH && timerWH.isBreak2WH ? 'block' : null;
    if (timerWH.isBreakWH) {
        statusPanelWH.elapsedInBreakIntervalWH.textContent = timerWH.elapsedInIntervalWH;
    } else if (timerWH.isBreak2WH) {
        statusPanelWH.elapsedInBreakInterval2WH.textContent = timerWH.elapsedInIntervalWH;
    } else {
        statusPanelWH.elapsedInIntervalWH.textContent = timerWH.elapsedInIntervalWH;
    }
    statusPanelWH.intervalsDoneWH.value = timerWH.intervalsDoneWH;
}
