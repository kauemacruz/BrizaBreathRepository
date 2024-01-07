//WH js//
const WHball = document.getElementById('WHball');
const WHballText = document.getElementById('WHballText');

function WHchangeBall(scale, duration) {
    WHball.style.transition = `transform ${duration}s ease`;
    WHball.style.transform = `scale(${scale})`;
}

const WHmodal = document.getElementById("WHmodal");
const WHcloseModal = document.getElementById("WHcloseModal");
const WHBTN = document.getElementById("WHBTN");

function WHopenmodal() {
    WHmodal.style.display = "block";
    audioObjects.fullyin.load();
    audioObjects.fullyout.load();
    audioObjects.letgoandhold.load();
    audioObjects.fullyinHold.load();
    audioObjects.normalbreath.load();
}
// Function to close the modal
function WHclose() {
    WHmodal.style.display = "none";
    clearInterval(intWH);
    [secondsWH, minutesWH] = [0, 0];
    document.getElementById('WHSettings').disabled = false;
    document.getElementById('WHSettings').style.color = '#49B79D';
    if (!audioPlayerBRT.muted) {
        audioPlayerBRT.pause();
    }
    audioPlayerBRT.currentTime = 0;
    timerControlsButtonsWH.pauseWH.style.display = 'none';
    timerControlsButtonsWH.startWH.style.display = 'inline';
    setFormDisabledStateWH(false);
    setTimerControlsDisabledStateWH(false, true, true);
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
    document.getElementById("WHResults").innerHTML = '';
    stopTimerTickWH();
    resetTimerWH();
    clearTimeout(myTimeoutWH);
    clearTimeout(myTimeout2WH);
}
// Event listener for closing the modal
WHcloseModal.addEventListener("click", WHclose);
WHBTN.onclick = function () {
    WHopenmodal();
}

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
var playedFullyOut = false;
function animateWH() {
    if (iWH > 79) {
        iWH = 80;
    }
    if (iWH === 80 && !playedFullyOut) {
        playedFullyOut = true; // Set the flag to indicate that the audio has been played.
        if (yWH > 1) {
            if (!BismuteWH) {
                audioObjects.fullyout.muted = false;
                audioObjects.fullyout.loop = false;
                audioObjects.fullyout.play();
            }
        }
    } else if (iWH < 80) {
        // Reset the flag when iWH is less than 80 to allow for the next cycle.
        playedFullyOut = false;
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
                audioObjects.fullyin.muted = false;
                audioObjects.fullyin.loop = false;
                audioObjects.fullyin.play();
            }
        } else {
            if (!ismuteWH) {
                audioObjects.letgoandhold.muted = false;
                audioObjects.letgoandhold.play();
            }
        }
    }
    iWH++;
    myTimeoutWH = setTimeout(animateWH, speed);
    if (yWH == 0) {
        playedFullyOut = false;
        ctxWH.clearRect(0, 0, cWH.width, cWH.height);
        ctxWH.fillStyle = my_gradientWH;
        ctxWH.beginPath();
        ctxWH.arc(150, 100, 80, 0, 2 * Math.PI, true);
        ctxWH.fill();
        ctxWH.font = "bold 48px serif"
        ctxWH.fillStyle = "white";
        ctxWH.textAlign = "center";
        ctxWH.fillText('Hold', 150, 115);
        [secondsWH, minutesWH] = [0, 0];
        clearTimeout(myTimeoutWH);
        intWH = setInterval(displayTimerWH, 1000);
    }
}
/*
function animate3WH() {
    WHchangeBall(1.5, 1);
    audioObjects.fullyin.play();
    setTimeout(function () {
        WHchangeBall(0.5, 1);
        audioObjects.fullyout.play();
    }, 1000);
    myTimeout3WH = setTimeout(animate3WH, 2000);
}*/
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
    if (yWH == -1) {
        [secondsWH, minutesWH] = [0, 0];
        if (!ismuteWH) {
            audioObjects.letGo.muted = false;
            audioObjects.letGo.play();
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
        clearTimeout(myTimeout2WH);
        yWH = formSettingsFieldsWH.breakDuration2WH.value;
        setTimeout(function () {
            startTimerWH();
        }, 3000);
    }
}

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
        if (!audioPlayerBRT.muted) {
            audioPlayerBRT.pause();
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

var audioWH = document.getElementById("audioWH"),
    muteWH = document.getElementById("muteWH"),
    ismuteWH = false;

var BaudioWH = document.getElementById("BaudioWH"),
    BmuteWH = document.getElementById("BmuteWH"),
    BismuteWH = false;

audioPlayerBRT.loop = true;

var audioSongWH = document.getElementById("songWH"),
    muteSongWH = document.getElementById("songMuteWH");
// Get the volumeVWH bar element
const volumeVoiceWH = document.getElementById('volumeVoiceWH');

// Add an event listener for the volumeVWH change event
volumeVoiceWH.addEventListener('input', function () {
    // Get the current volumeVWH value
    const volumeVWH = parseFloat(volumeVoiceWH.value);

    // Check if volumeVWH is 0 and mute the media if necessary
    if (volumeVWH === 0) {
        audioObjects.inhale.muted = true;
        audioObjects.normalbreath.muted = true;
        audioObjects.letgoandhold.muted = true;
        audioObjects.fullyinHold.muted = true;
        audioWH.style.display = "none";
        muteWH.style.display = "block";
        ismuteWH = true;
    } else {
        audioObjects.inhale.muted = false;
        audioObjects.normalbreath.muted = false;
        audioObjects.letgoandhold.muted = false;
        audioObjects.fullyinHold.muted = false;
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
        audioObjects.fullyin.muted = true;
        audioObjects.fullyout.muted = true;
        BaudioWH.style.display = "none";
        BmuteWH.style.display = "block";
        BismuteWH = true;
    } else {
        audioObjects.fullyin.muted = false;
        audioObjects.fullyout.muted = false;
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
        audioPlayerBRT.muted = true;
        audioSongWH.style.display = "none";
        muteSongWH.style.display = "block";
    } else {
        audioPlayerBRT.muted = false;
        muteSongWH.style.display = "none";
        audioSongWH.style.display = "block";
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
    minWH = 10, /// minWH numberWH
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
    breathSpeedWH = document.getElementById("breathSpeedWH");
breathSpeedWH.value = "Medium";
SminusBtnWH.onclick = function () {
    if (breathSpeedWH.value == "Medium") {
        SminusBtnWH.style.color = "rgb(177,177,177)";
        breathSpeedWH.value = "Slow";
        speed = 30;
    }
    else if (breathSpeedWH.value == "Fast") {
        breathSpeedWH.value = "Medium";
        speed = 25;
        SplusBtnWH.style.color = "#49B79D";
    }
}

SplusBtnWH.onclick = function () {
    if (breathSpeedWH.value == "Slow") {
        SminusBtnWH.style.color = "#49B79D";
        breathSpeedWH.value = "Medium";
        speed = 25;
    }
    else if (breathSpeedWH.value == "Medium") {
        breathSpeedWH.value = "Fast";
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
var musicIsOnWH = false;
function startTimerWH() {
    timerRefAHAT.value = "";
    setFormDisabledStateWH(true);
    setTimerControlsDisabledStateWH(false, true, false);
    document.getElementById('stopBtnWH').style.color = '#990000';
    if (intWH !== null) {
        clearInterval(intWH);
    }
    if (timerWH.isFinishedWH) {
        resetTimerWH();
    }
    if (!audioPlayerBRT.muted) {
        playSelectedSongBRT(true);
    }
    startTimerTickWH();
    document.getElementById("circleWH").style.display = "block";
    if (!BismuteWH) {
        audioObjects.fullyin.muted = false;
        audioObjects.fullyin.loop = false;
        audioObjects.fullyin.play();
    }
    animateWH();
    animate3WH(); 
    timerControlsButtonsWH.startWH.style.display = 'none';
    timerControlsButtonsWH.pauseWH.style.display = 'inline';
    timerControlsButtonsWH.pauseWH.style.color = "rgb(177, 177, 177)";
    document.getElementById('WHDate').value = date;
    document.getElementById('WHSettings').disabled = true;
    document.getElementById('WHSettings').style.color = 'rgb(177, 177, 177)';
}

function pauseTimerWH() {
    timerWH.intervalsDoneWH++;
    intervalsDoneWH.value = timerWH.intervalsDoneWH;
    timerRefWH.value += timeWH + "|";
    setTimerControlsDisabledStateWH(true, true, false);
    timerControlsButtonsWH.pauseWH.style.color = "rgb(177, 177, 177)";
    if (isPortuguese) {
        document.getElementById("WHResults").innerHTML += "<div class='NOfSteps'> <div>Round " + (timerWH.intervalsDoneWH) + "</div><div>" + timeWH + " segundos</div></div>";
    } else {
        document.getElementById("WHResults").innerHTML += "<div class='NOfSteps'> <div>Round " + (timerWH.intervalsDoneWH) + "</div><div>" + timeWH + " seconds</div></div>";
    }
    timerRefAHAT.value += timerAHAT.elapsedInIntervalAHAT + "|";
    clearInterval(intWH);
    [secondsWH, minutesWH] = [0, 0];
    stopTimerTickWH();
    timerControlsButtonsWH.stopWH.style.color = '#990000';
    if (!ismuteWH) {
        audioObjects.fullyinHold.muted = false;
        audioObjects.fullyinHold.play();
    }
    yWH = 15;
    animate2WH();
    timerWH.isBreak2WH = true;
    timerWH.isBreak3WH = false;
}

function stopTimerWH() {
    if (timerWH.isBreak3WH) {
        timerWH.intervalsDoneWH++;
        intervalsDoneWH.value = timerWH.intervalsDoneWH;
        timerRefWH.value += timeWH + "|";
        if (isPortuguese) {
            document.getElementById("WHResults").innerHTML += "<div class='NOfSteps'> <div>Round " + (timerWH.intervalsDoneWH) + "</div><div>" + timeWH + " segundos</div></div>";
        } else {
            document.getElementById("WHResults").innerHTML += "<div class='NOfSteps'> <div>Round " + (timerWH.intervalsDoneWH) + "</div><div>" + timeWH + " seconds</div></div>";
        }
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
    if (!audioPlayerBRT.muted) {
        audioPlayerBRT.pause();
    }
    audioPlayerBRT.currentTime = 0;
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
        audioObjects.normalbreath.muted = false;
        audioObjects.normalbreath.play();
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
    const currentIntervalDurationWH = timerWH.isBreak2WH ? timerSettingsWH.breakDuration2WH : timerSettingsWH.intervalDurationWH;
    if (timerWH.elapsedInIntervalWH <= currentIntervalDurationWH && timerWH.isBreak2WH) {
        timerWH.elapsedInIntervalWH++;
        if (yWH == 0 && timerWH.isBreak2WH) {
            timerWH.isBreak2WH = false;
            timerWH.isBreak3WH = true;
            timerControlsButtonsWH.pauseWH.style.color = '#0661AA';
            setTimerControlsDisabledStateWH(false, false, false);
        }
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
