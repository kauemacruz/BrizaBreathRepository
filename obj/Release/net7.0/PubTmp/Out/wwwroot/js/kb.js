const KBmodal = document.getElementById("KBmodal");
const KBcloseModal = document.getElementById("KBcloseModal");
const KBBTN = document.getElementById("KBBTN");

function KBopenmodal() {
    KBmodal.style.display = "block";
    audioObjects.fullyout2.load();
    audioObjects.fullyinHold.load();
    audioObjects.normalbreath.load();
    audioObjects.nextRound.load();
}
// Function to close the modal
function KBclose() {
    KBmodal.style.display = "none";
    clearInterval(intKB);
    [secondsKB, minutesKB] = [0, 0];
    document.getElementById('KBSettings').disabled = false;
    document.getElementById('KBSettings').style.color = '#49B79D';
    if (!audioPlayerBRT.muted) {
        audioPlayerBRT.pause();
    }
    audioPlayerBRT.currentTime = 0;
    if (!BismuteKB) {
        audioObjects.fullyout2.pause();
    }
    audioObjects.fullyout2.currentTime = 0;
    timerControlsButtonsKB.pauseKB.style.display = 'none';
    timerControlsButtonsKB.startKB.style.display = 'inline';
    setFormDisabledStateKB(false);
    setTimerControlsDisabledStateKB(false, true, true);
    timerControlsButtonsKB.stopKB.style.color = "rgb(177, 177, 177)";
    ctxKB.clearRect(0, 0, cKB.width, cKB.height);
    ctxKB.fillStyle = my_gradientKB;
    ctxKB.beginPath();
    ctxKB.arc(150, 100, 80, 0, 2 * Math.PI, true);
    ctxKB.fill();
    ctxKB.font = "bold 48px serif"
    ctxKB.fillStyle = "white";
    ctxKB.textAlign = "center";
    yKB = formSettingsFieldsKB.breakDuration2KB.value;
    ctxKB.fillText(yKB, 150, 115);
    document.getElementById("KBResults").innerHTML = '';
    stopTimerTickKB();
    resetTimerKB();
    clearTimeout(myTimeoutKB);
    clearTimeout(myTimeout2KB);
}
// Event listener for closing the modal
KBcloseModal.addEventListener("click", KBclose);
KBBTN.onclick = function () {
    KBopenmodal();
}

var iKB = 0;
var xKB = 0;
var yKB = 30;
var myTimeoutKB;
var myTimeout2KB;
var speedKB = 6;
var cKB = document.getElementById("myCanvasKB");
var ctxKB = cKB.getContext("2d");
var my_gradientKB = ctxKB.createLinearGradient(70, 0, 0, 170);
my_gradientKB.addColorStop(0, "#49B79D");
my_gradientKB.addColorStop(1, "#0661AA");
ctxKB.fillStyle = my_gradientKB;
ctxKB.beginPath();
ctxKB.arc(150, 100, 80, 0, 2 * Math.PI, true);
ctxKB.fill();
function animateKB() {
    if (iKB > 79) {
        iKB = 80;
    }
    if (iKB > 25) {
        ctxKB.clearRect(0, 0, cKB.width, cKB.height);
        ctxKB.fillStyle = my_gradientKB;
        ctxKB.beginPath();
        ctxKB.arc(150, 100, 79, 0, 2 * Math.PI, true);
        ctxKB.fill();
        ctxKB.font = "bold 48px serif"
        ctxKB.fillStyle = "white";
        ctxKB.textAlign = "center";
        ctxKB.fillText(yKB, 150, 115);
    }
    if (iKB == 80) {
        xKB = xKB + 2;
        ctxKB.clearRect(0, 0, cKB.width, cKB.height);
        ctxKB.fillStyle = my_gradientKB;
        ctxKB.beginPath();
        ctxKB.arc(150, 100, 80 - xKB, 0, 2 * Math.PI, true);
        ctxKB.fill();
        ctxKB.font = "bold 48px serif"
        ctxKB.fillStyle = "white";
        ctxKB.textAlign = "center";
        ctxKB.fillText(yKB, 150, 115);
    }
    if (xKB > 50) {
        yKB--;
        xKB = 0;
        iKB = 25;
        ctxKB.font = "bold 48px serif"
        ctxKB.fillStyle = "white";
        ctxKB.textAlign = "center";
        ctxKB.fillText(yKB, 150, 165);
        if (yKB == 0) {
            if (!ismuteKB) {
                setTimeout(function () {
                    audioObjects.fullyinHold.muted = false;
                    audioObjects.fullyinHold.play();
                }, 500);
            }
        }
    }
    iKB++;
    myTimeoutKB = setTimeout(animateKB, speedKB);
    if (yKB == 0) {
        ctxKB.clearRect(0, 0, cKB.width, cKB.height);
        ctxKB.fillStyle = my_gradientKB;
        ctxKB.beginPath();
        ctxKB.arc(150, 100, 80, 0, 2 * Math.PI, true);
        ctxKB.fill();
        ctxKB.font = "bold 48px serif"
        ctxKB.fillStyle = "white";
        ctxKB.textAlign = "center";
        ctxKB.fillText('Hold', 150, 115);
        [secondsKB, minutesKB] = [0, 0];
        clearTimeout(myTimeoutKB);
        intKB = setInterval(displayTimerKB, 1000);
    }
}

function animate2KB() {
    if (iKB > 0) {
        ctxKB.clearRect(0, 0, cKB.width, cKB.height);
        ctxKB.fillStyle = my_gradientKB;
        ctxKB.beginPath();
        ctxKB.arc(150, 100, 80, 0, 2 * Math.PI, true);
        ctxKB.fill();
        ctxKB.font = "bold 48px serif"
        ctxKB.fillStyle = "white";
        ctxKB.textAlign = "center";
        ctxKB.fillText(yKB, 150, 115);
        yKB--;
    }
    iKB++;
    myTimeout2KB = setTimeout(animate2KB, 1000);
    if (yKB == -1) {
        [secondsKB, minutesKB] = [0, 0];
        if (!ismuteKB) {
            audioObjects.nextRound.muted = false;
            audioObjects.nextRound.play();
        }
        ctxKB.clearRect(0, 0, cKB.width, cKB.height);
        ctxKB.fillStyle = my_gradientKB;
        ctxKB.beginPath();
        ctxKB.arc(150, 100, 80, 0, 2 * Math.PI, true);
        ctxKB.fill();
        ctxKB.font = "bold 48px serif"
        ctxKB.fillStyle = "white";
        ctxKB.textAlign = "center";
        ctxKB.fillText('Next', 150, 115);
        clearTimeout(myTimeout2KB);
        yKB = formSettingsFieldsKB.breakDuration2KB.value;
        setTimeout(function () {
            startTimerKB();
        }, 3000);
    }
}

$(function () {
    $('#KBForm').on('submit', function (e) {
        e.preventDefault(); // Prevent the default form submission

        var formData = new FormData(this); // Get the form data

        $.ajax({
            url: "/",
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function (result) {
                $('#KBResultSaved').html(result); // Update the result section with the server response
            }
        });
        document.getElementById("KBResults").innerHTML = "";
        timerRefKB.value = "|";
        clearInterval(intKB);
        document.getElementById('KBSettings').disabled = false;
        document.getElementById('KBSettings').style.color = '#49B79D';
        if (!audioPlayerBRT.muted) {
            audioPlayerBRT.pause();
        }
        timerControlsButtonsKB.pauseKB.style.display = 'none';
        timerControlsButtonsKB.startKB.style.display = 'inline';
        setFormDisabledStateKB(false);
        setTimerControlsDisabledStateKB(false, true, true);
        document.getElementById('resetBtnKB').style.display = 'none';
        document.getElementById('stopBtnKB').style.display = 'inline';
        timerControlsButtonsKB.stopKB.style.color = "rgb(177, 177, 177)";
        timerControlsButtonsKB.startKB.style.color = "#0661AA";
        document.getElementById('KBSave').disabled = true;
        document.getElementById('KBSave').style.color = 'rgb(177, 177, 177)';
        stopTimerTickKB();
        resetTimerKB();
        timerKB.isFinishedKB = true;
        stopTimerTickKB();
    });
});

let formSettingsFieldsKB,
    timerControlsButtonsKB,
    statusPanelKB,
    timerKB,
    timerSettingsKB;

function setTimerSettingsKB(
    intervalCountKB = timerSettingsKB.intervalCountKB,
    intervalDurationKB = timerSettingsKB.intervalDurationKB,
    enableBreakKB = timerSettingsKB.enableBreakKB,
    breakDurationKB = timerSettingsKB.breakDurationKB,
    enableBreak2KB = timerSettingsKB.enableBreak2KB,
    breakDuration2KB = timerSettingsKB.breakDuration2KB
) {
    timerSettingsKB = {
        intervalCountKB,
        intervalDurationKB,
        enableBreakKB,
        breakDurationKB,
        enableBreak2KB,
        breakDuration2KB,
    };
}

function resetTimerKB() {
    timerKB = {
        totalTimeElapsedKB: 0,
        elapsedInIntervalKB: 0,
        intervalsDoneKB: 0,
        isBreak3KB: false,
        isBreakKB: false,
        isBreak2KB: true,
        isFinishedKB: false
    };
    updateInfoKB();
}

let [secondsKB, minutesKB, hoursKB] = [0, 0, 0];
let timerRefKB = document.getElementById('timerDisplayKB');
let intKB = null;
document.getElementById('stopBtnKB').disabled = true;
document.getElementById('stopBtnKB').style.color = 'rgb(177, 177, 177)';
document.getElementById('KBSave').disabled = true;
document.getElementById('KBSave').style.color = 'rgb(177, 177, 177)';

var audioKB = document.getElementById("audioKB"),
    muteKB = document.getElementById("muteKB"),
    ismuteKB = false;

var BaudioKB = document.getElementById("BaudioKB"),
    BmuteKB = document.getElementById("BmuteKB"),
    BismuteKB = false;

audioPlayerBRT.loop = true;

var audioSongKB = document.getElementById("songKB"),
    muteSongKB = document.getElementById("songMuteKB");
// Get the volumeVKB bar element
const volumeVoiceKB = document.getElementById('volumeVoiceKB');

// Add an event listener for the volumeVKB change event
volumeVoiceKB.addEventListener('input', function () {
    // Get the current volumeVKB value
    const volumeVKB = parseFloat(volumeVoiceKB.value);

    // Check if volumeVKB is 0 and mute the media if necessary
    if (volumeVKB === 0) {
        audioObjects.normalbreath.muted = true;
        audioObjects.fullyinHold.muted = true;
        audioKB.style.display = "none";
        muteKB.style.display = "block";
        ismuteKB = true;
    } else {
        audioObjects.normalbreath.muted = false;
        audioObjects.fullyinHold.muted = false;
        muteKB.style.display = "none";
        audioKB.style.display = "block";
        ismuteKB = false;
    }
});
// Get the volumeVKB bar element
const BvolumeVoiceKB = document.getElementById('BvolumeVoiceKB');

// Add an event listener for the volumeVKB change event
BvolumeVoiceKB.addEventListener('input', function () {
    // Get the current volumeVKB value
    const BvolumeVKB = parseFloat(BvolumeVoiceKB.value);

    // Check if volumeVKB is 0 and mute the media if necessary
    if (BvolumeVKB === 0) {
        audioObjects.fullyin.muted = true;
        audioObjects.fullyout.muted = true;
        BaudioKB.style.display = "none";
        BmuteKB.style.display = "block";
        BismuteKB = true;
    } else {
        audioObjects.fullyin.muted = false;
        audioObjects.fullyout.muted = false;
        BmuteKB.style.display = "none";
        BaudioKB.style.display = "block";
        BismuteKB = false;
    }
});

// Get the volumeSKB bar element
const volumeSongKB = document.getElementById('volumeSongKB');

// Add an event listener for the volumeSKB change event
volumeSongKB.addEventListener('input', function () {
    // Get the current volumeSKB value
    const volumeSKB = parseFloat(volumeSongKB.value);

    // Check if volumeSKB is 0 and mute the media if necessary
    if (volumeSKB === 0) {
        audioPlayerBRT.muted = true;
        audioSongKB.style.display = "none";
        muteSongKB.style.display = "block";
    } else {
        audioPlayerBRT.muted = false;
        muteSongKB.style.display = "none";
        audioSongKB.style.display = "block";
    }
});


var inhaleKB = 9999;
var holdHW = 30;
var exhaleKB = 9999;
setTimerSettingsKB(9999, inhaleKB, true, holdHW, true, exhaleKB);
initializeTimerControlsKB();
initializeStatusPanelKB();
initializeTimerSettingsFormKB();
resetTimerKB();

var minusBtnKB = document.getElementById("minusKB"),
    plusBtnKB = document.getElementById("plusKB"),
    numberKB = 30, /// numberKB value
    minKB = 10, /// minKB numberKB
    maxKB = 70;
minusBtnKB.onclick = function () {
    if (numberKB > minKB) {
        numberKB = numberKB - 10;
        formSettingsFieldsKB.breakDuration2KB.value = numberKB;
        ctxKB.clearRect(0, 0, cKB.width, cKB.height);
        ctxKB.fillStyle = my_gradientKB;
        ctxKB.beginPath();
        ctxKB.arc(150, 100, 80, 0, 2 * Math.PI, true);
        ctxKB.fill();
        ctxKB.font = "bold 48px serif"
        ctxKB.fillStyle = "white";
        ctxKB.textAlign = "center";
        ctxKB.fillText(numberKB, 150, 115);
        yKB = numberKB;
        setTimerSettingsKB(9999, yKB, true, formSettingsFieldsKB.breakDurationKB.value, true, 9999);
    }
}

plusBtnKB.onclick = function () {
    if (numberKB < maxKB) {
        numberKB = numberKB + 10;
        formSettingsFieldsKB.breakDuration2KB.value = numberKB;
        ctxKB.clearRect(0, 0, cKB.width, cKB.height);
        ctxKB.fillStyle = my_gradientKB;
        ctxKB.beginPath();
        ctxKB.arc(150, 100, 80, 0, 2 * Math.PI, true);
        ctxKB.fill();
        ctxKB.font = "bold 48px serif"
        ctxKB.fillStyle = "white";
        ctxKB.textAlign = "center";
        ctxKB.fillText(numberKB, 150, 115);
        yKB = numberKB;
        setTimerSettingsKB(9999, yKB, true, formSettingsFieldsKB.breakDurationKB.value, true, 9999);
    }
}
function initializeTimerSettingsFormKB() {
    const oneDayInSecondsKB = 60 * 60 * 24;
    let lastUserSetEnableBreakKB = timerSettingsKB.enableBreakKB;
    let lastUserSetEnableBreak2 = timerSettingsKB.enableBreak2KB;
    formSettingsFieldsKB = {
        intervalCountKB: document.getElementById('intervalCountInputKB'),
        intervalDurationKB: document.getElementById('intervalDurationInputKB'),
        enableBreakKB: document.getElementById('enableBreakInputKB'),
        breakDurationKB: document.getElementById('breakDurationInputKB'),
        enableBreak2KB: document.getElementById('enableBreakInput2KB'),
        breakDuration2KB: document.getElementById('breakDurationInput2KB'),
    };
    formSettingsFieldsKB.intervalCountKB.value = timerSettingsKB.intervalCountKB;
    formSettingsFieldsKB.intervalDurationKB.value = timerSettingsKB.intervalDurationKB;
    formSettingsFieldsKB.enableBreakKB.checked = timerSettingsKB.enableBreakKB;
    formSettingsFieldsKB.breakDurationKB.value = timerSettingsKB.breakDurationKB;
    formSettingsFieldsKB.enableBreak2KB.checked = timerSettingsKB.enableBreak2KB;
    formSettingsFieldsKB.breakDuration2KB.value = 30;
    ctxKB.font = "bold 48px serif"
    ctxKB.fillStyle = "white";
    ctxKB.textAlign = "center";
    ctxKB.fillText(30, 150, 115);

    function getNumberInBoundsOrDefaultKB(value, minKB, maxKB, def = 1) {
        const valueAsNumberKB = parseInt(value);
        return isNaN(valueAsNumberKB) ? def : Math.max(minKB, Math.min(valueAsNumberKB, maxKB));
    }

    function setBreakDurationLineDisplayKB(displayed) {
        const breakDurationInputLineEltKB = document.getElementById('breakDurationInputLineKB');
        breakDurationInputLineEltKB.style.display = displayed ? null : 'none';
        const breakDurationInputLineElt2KB = document.getElementById('breakDurationInputLine2KB');
        breakDurationInputLineElt2KB.style.display = displayed ? null : 'none';
    }

    formSettingsFieldsKB.intervalCountKB.addEventListener('input', () => {
        const intervalCountKB = getNumberInBoundsOrDefaultKB(formSettingsFieldsKB.intervalCountKB.value, 1, 9999),
            hasOneIntervalKB = intervalCountKB === 1,
            hasBreakKB = hasOneIntervalKB ? false : lastUserSetEnableBreakKB;
        formSettingsFieldsKB.enableBreakKB.disabled = hasOneIntervalKB === true;
        formSettingsFieldsKB.enableBreakKB.checked = hasBreakKB;
        setBreakDurationLineDisplayKB(hasBreakKB);
        setTimerSettingsKB(intervalCountKB, undefined, hasBreakKB);
        updateInfoKB();
    });

    formSettingsFieldsKB.intervalDurationKB.addEventListener('input', () => {
        setTimerSettingsKB(undefined, getNumberInBoundsOrDefaultKB(formSettingsFieldsKB.intervalDurationKB.value, 1, oneDayInSecondsKB));
        updateInfoKB();
    });

    formSettingsFieldsKB.enableBreakKB.addEventListener('change', () => {
        const enableBreakKB = formSettingsFieldsKB.enableBreakKB.checked;
        lastUserSetEnableBreakKB = enableBreakKB;
        setBreakDurationLineDisplayKB(enableBreakKB);
        setTimerSettingsKB(undefined, undefined, enableBreakKB);
        updateInfoKB();
    });

    formSettingsFieldsKB.breakDurationKB.addEventListener('input', () => {
        setTimerSettingsKB(
            undefined, undefined, undefined,
            getNumberInBoundsOrDefaultKB(formSettingsFieldsKB.breakDurationKB.value, 1, oneDayInSecondsKB)
        );
        updateInfoKB();
    });

    formSettingsFieldsKB.enableBreak2KB.addEventListener('change', () => {
        const enableBreak2KB = formSettingsFieldsKB.enableBreak2KB.checked;
        lastUserSetEnableBreak2 = enableBreak2KB;
        setBreakDurationLineDisplayKB(enableBreak2KB);
        setTimerSettingsKB(undefined, undefined, undefined, undefined, enableBreak2KB);
        updateInfoKB();
    });

    formSettingsFieldsKB.breakDuration2KB.addEventListener('input', () => {
        setTimerSettingsKB(
            undefined, undefined, undefined, undefined, undefined,
            getNumberInBoundsOrDefaultKB(formSettingsFieldsKB.breakDuration2KB.value, 1, oneDayInSecondsKB)
        );
        updateInfoKB();
    });
}

function initializeTimerControlsKB() {
    timerControlsButtonsKB = {
        startKB: document.getElementById('startBtnKB'),
        pauseKB: document.getElementById('pauseBtnKB'),
        stopKB: document.getElementById('stopBtnKB'),
    };
    setTimerControlsDisabledStateKB(false, true, true);
    timerControlsButtonsKB.startKB.addEventListener('click', startTimerKB);
    timerControlsButtonsKB.pauseKB.addEventListener('click', pauseTimerKB);
    timerControlsButtonsKB.stopKB.addEventListener('click', stopTimerKB);
}

function initializeStatusPanelKB() {
    statusPanelKB = {
        timeOverviewMessageKB: document.getElementById('timeOverviewMessageKB'),

        elapsedInIntervalBoxKB: document.getElementById('elapsedInIntervalBoxKB'),
        elapsedInBreakIntervalBoxKB: document.getElementById('elapsedInBreakIntervalBoxKB'),
        elapsedInIntervalKB: document.getElementById('elapsedInIntervalKB'),
        elapsedInBreakIntervalKB: document.getElementById('elapsedInBreakIntervalKB'),
        elapsedInBreakIntervalBox2KB: document.getElementById('elapsedInBreakIntervalBox2KB'),
        elapsedInBreakInterval2KB: document.getElementById('elapsedInBreakInterval2KB'),
        intervalsDoneKB: document.getElementById('intervalsDoneKB'),
    };
}

function setTimerControlsDisabledStateKB(startKB, pauseKB, stopKB) {
    timerControlsButtonsKB.startKB.disabled = startKB;
    timerControlsButtonsKB.pauseKB.disabled = pauseKB;
    timerControlsButtonsKB.stopKB.disabled = stopKB;
}

function setFormDisabledStateKB(disabled) {
    formSettingsFieldsKB.intervalCountKB.disabled = disabled;
    formSettingsFieldsKB.intervalDurationKB.disabled = disabled;
    formSettingsFieldsKB.enableBreakKB.disabled = disabled || timerSettingsKB.intervalCountKB === 1;
    formSettingsFieldsKB.breakDurationKB.disabled = disabled;
    formSettingsFieldsKB.enableBreak2KB.disabled = disabled
    formSettingsFieldsKB.breakDuration2KB.disabled = disabled;
    minusBtnKB.disabled = disabled;
    plusBtnKB.disabled = disabled;
}
var musicIsOnKB = false;
function startTimerKB() {
    timerRefAHAT.value = "";
    setFormDisabledStateKB(true);
    setTimerControlsDisabledStateKB(false, true, false);
    document.getElementById('stopBtnKB').style.color = '#990000';
    if (intKB !== null) {
        clearInterval(intKB);
    }
    if (timerKB.isFinishedKB) {
        resetTimerKB();
    }
    if (!audioPlayerBRT.muted) {
        playSelectedSongBRT(true);
    }
    startTimerTickKB();
    if (!BismuteKB) {
        audioObjects.fullyout2.loop = false;
        audioObjects.fullyout2.play();
    }

    document.getElementById("circleKB").style.display = "block";

    animateKB();
    timerControlsButtonsKB.startKB.style.display = 'none';
    timerControlsButtonsKB.pauseKB.style.display = 'inline';
    timerControlsButtonsKB.pauseKB.style.color = "rgb(177, 177, 177)";
    document.getElementById('KBDate').value = date;
    document.getElementById('KBSettings').disabled = true;
    document.getElementById('KBSettings').style.color = 'rgb(177, 177, 177)';
}

function pauseTimerKB() {
    timerKB.intervalsDoneKB++;
    intervalsDoneKB.value = timerKB.intervalsDoneKB;
    timerRefKB.value += timeKB + "|";
    setTimerControlsDisabledStateKB(true, true, false);
    timerControlsButtonsKB.pauseKB.style.color = "rgb(177, 177, 177)";
    if (isPortuguese) {
        document.getElementById("KBResults").innerHTML += "<div class='NOfSteps'> <div>Round " + (timerKB.intervalsDoneKB) + "</div><div>" + timeKB + " segundos</div></div>";
    } else {
        document.getElementById("KBResults").innerHTML += "<div class='NOfSteps'> <div>Round " + (timerKB.intervalsDoneKB) + "</div><div>" + timeKB + " seconds</div></div>";
    }
    timerRefAHAT.value += timerAHAT.elapsedInIntervalAHAT + "|";
    clearInterval(intKB);
    [secondsKB, minutesKB] = [0, 0];
    stopTimerTickKB();
    timerControlsButtonsKB.stopKB.style.color = '#990000';
    if (!ismuteKB) {
        audioObjects.normalbreath.muted = false;
        audioObjects.normalbreath.play();
    }
    yKB = 30;
    animate2KB();
    timerKB.isBreak2KB = true;
    timerKB.isBreak3KB = false;
}

function stopTimerKB() {
    if (timerKB.isBreak3KB) {
        timerKB.intervalsDoneKB++;
        intervalsDoneKB.value = timerKB.intervalsDoneKB;
        timerRefKB.value += timeKB + "|";
        if (isPortuguese) {
            document.getElementById("KBResults").innerHTML += "<div class='NOfSteps'> <div>Round " + (timerKB.intervalsDoneKB) + "</div><div>" + timeKB + " segundos</div></div>";
        } else {
            document.getElementById("KBResults").innerHTML += "<div class='NOfSteps'> <div>Round " + (timerKB.intervalsDoneKB) + "</div><div>" + timeKB + " seconds</div></div>";
        }
        timerRefAHAT.value += timerAHAT.elapsedInIntervalAHAT + "|";
    }
    if (document.getElementById("KBResults").innerHTML !== "") {
        document.getElementById('KBSave').disabled = false;
        document.getElementById('KBSave').style.color = '#49B79D';
        timerControlsButtonsKB.stopKB.style.display = "none";
        document.getElementById('resetBtnKB').style.display = 'inline';
        document.getElementById('resetBtnKB').style.color = '#990000';
        setTimerControlsDisabledStateKB(true, true, true);
        timerControlsButtonsKB.startKB.style.color = "rgb(177, 177, 177)";
    } else {
        setTimerControlsDisabledStateKB(false, true, true);
        timerControlsButtonsKB.startKB.style.color = '#49B79D';
    }
    clearInterval(intKB);
    [secondsKB, minutesKB] = [0, 0];
    document.getElementById('KBSettings').disabled = false;
    document.getElementById('KBSettings').style.color = '#49B79D';
    if (!audioPlayerBRT.muted) {
        audioPlayerBRT.pause();
    }
    audioPlayerBRT.currentTime = 0;
    if (!BismuteKB) {
        audioObjects.fullyout2.pause();
    }
    audioObjects.fullyout2.currentTime = 0;
    timerControlsButtonsKB.pauseKB.style.display = 'none';
    timerControlsButtonsKB.startKB.style.display = 'inline';
    setFormDisabledStateKB(false);
    timerControlsButtonsKB.stopKB.style.color = "rgb(177, 177, 177)";
    ctxKB.clearRect(0, 0, cKB.width, cKB.height);
    ctxKB.fillStyle = my_gradientKB;
    ctxKB.beginPath();
    ctxKB.arc(150, 100, 80, 0, 2 * Math.PI, true);
    ctxKB.fill();
    ctxKB.font = "bold 48px serif"
    ctxKB.fillStyle = "white";
    ctxKB.textAlign = "center";
    yKB = formSettingsFieldsKB.breakDuration2KB.value;
    ctxKB.fillText(yKB, 150, 115);
    if (!ismuteKB) {
        audioObjects.normalbreath.muted = false;
        audioObjects.normalbreath.play();
    }
    stopTimerTickKB();
    clearTimeout(myTimeoutKB);
    clearTimeout(myTimeout2KB);
}
document.getElementById('resetBtnKB').addEventListener('click', function () {
    resetTimerKB();
    setTimerControlsDisabledStateKB(false, true, true);
    timerControlsButtonsKB.startKB.style.color = '#49B79D';
    document.getElementById("KBResults").innerHTML = '';
    document.getElementById('resetBtnKB').style.display = 'none';
    timerControlsButtonsKB.stopKB.style.display = "inline";
    document.getElementById('KBSave').disabled = true;
    document.getElementById('KBSave').style.color = 'rgb(177, 177, 177)';
});


var timeKB = '';
function displayTimerKB() {
    secondsKB++;
    if (secondsKB == 60) {
        secondsKB = 0;
        minutesKB++;
    }
    let mKB = minutesKB < 10 ? "0" + minutesKB : minutesKB;
    let sKB = secondsKB < 10 ? "0" + secondsKB : secondsKB;
    ctxKB.clearRect(0, 0, cKB.width, cKB.height);
    ctxKB.fillStyle = my_gradientKB;
    ctxKB.beginPath();
    ctxKB.arc(150, 100, 80, 0, 2 * Math.PI, true);
    ctxKB.fill();
    ctxKB.font = "bold 48px serif"
    ctxKB.fillStyle = "white";
    ctxKB.textAlign = "center";
    timeKB = `${mKB} : ${sKB}`;
    ctxKB.fillText(timeKB, 150, 115);
}

function startTimerTickKB() {
    timerKB.intervalId = setInterval(onTimerTickKB, 1000);
}

function stopTimerTickKB() {
    clearInterval(timerKB.intervalId);
}

function onTimerTickKB() {
    const currentIntervalDurationKB = timerKB.isBreak2KB ? timerSettingsKB.breakDuration2KB : timerSettingsKB.intervalDurationKB;
    if (timerKB.elapsedInIntervalKB <= currentIntervalDurationKB && timerKB.isBreak2KB) {
        timerKB.elapsedInIntervalKB++;
        if (yKB == 0 && timerKB.isBreak2KB) {
            if (!BismuteKB) {
                audioObjects.fullyout2.pause();
            }
            audioObjects.fullyout2.currentTime = 0;
            timerKB.isBreak2KB = false;
            timerKB.isBreak3KB = true;
            timerControlsButtonsKB.pauseKB.style.color = '#0661AA';
            setTimerControlsDisabledStateKB(false, false, false);
        }
    }
}

function updateInfoKB() {
    statusPanelKB.timeOverviewMessageKB.style.display = timerKB.isFinishedKB ? 'block' : null;
    statusPanelKB.elapsedInIntervalBoxKB.style.display = timerKB.isFinishedKB || timerKB.isBreakKB || timerKB.isBreak2KB || timerKB.isBreak4 ? 'none' : null;
    statusPanelKB.elapsedInBreakIntervalBoxKB.style.display = !timerKB.isFinishedKB && timerKB.isBreakKB ? 'block' : null;
    statusPanelKB.elapsedInBreakIntervalBox2KB.style.display = !timerKB.isFinishedKB && timerKB.isBreak2KB ? 'block' : null;
    if (timerKB.isBreakKB) {
        statusPanelKB.elapsedInBreakIntervalKB.textContent = timerKB.elapsedInIntervalKB;
    } else if (timerKB.isBreak2KB) {
        statusPanelKB.elapsedInBreakInterval2KB.textContent = timerKB.elapsedInIntervalKB;
    } else {
        statusPanelKB.elapsedInIntervalKB.textContent = timerKB.elapsedInIntervalKB;
    }
    statusPanelKB.intervalsDoneKB.value = timerKB.intervalsDoneKB;
}
