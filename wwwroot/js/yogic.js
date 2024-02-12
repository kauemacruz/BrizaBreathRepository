/*YB JS*/
var isYBon = false;
const YBball = document.getElementById('YBball');
const YBballText = document.getElementById('YBballText');

function YBchangeBall(scale, duration) {
    YBball.style.transition = `transform ${duration}s ease`;
    YBball.style.transform = `scale(${scale})`;
}

const YBtimeInput = document.getElementById('YBtimeInput');
const YBcountdownDisplay = document.getElementById('YBcountdownDisplay');
let YBcountdown;
let YBtimeRemaining = Infinity;
let YBisPaused = false;

// Populate the dropdown with options
for (let YBi = 2; YBi <= 60; YBi++) { // assuming 1 to 60 minutes
    let YBoption = document.createElement('option');
    YBoption.value = YBi * 60;
    if (isPortuguese) {
        YBoption.textContent = YBi + ' minutos';
    } else {
        YBoption.textContent = YBi + ' minutes';
    }
    YBtimeInput.appendChild(YBoption);
}
const YBmodal = document.getElementById("YBmodal");
const YBcloseModal = document.getElementById("YBcloseModal");
const YBBTN = document.getElementById("YBBTN");

function YBopenmodal() {
    YBmodal.style.display = "block";
    audioObjects.exhale.load();
    audioObjects.inhale.load();
    audioObjects.hold.load();
    audioObjects.normalbreath.load();
}
// Function to close the modal
function YBclose() {
    isYBon = false;
    YBmodal.style.display = "none";
    clearInterval(intYB);
    [secondsYB, minutesYB, hoursYB] = [0, 0, 0];
    timerRefYB.value = '00 : 00 : 00';
    if (!audioPlayerBRT.muted) {
        audioPlayerBRT.pause();
    }
    audioPlayerBRT.currentTime = 0;
    timerControlsButtonsYB.pauseYB.style.display = 'none';
    timerControlsButtonsYB.startYB.style.display = 'inline';
    setFormDisabledStateYB(false);
    setTimerControlsDisabledStateYB(false, true, true);
    timerControlsButtonsYB.stopYB.style.color = "rgb(177, 177, 177)";
    document.getElementById('YBSave').disabled = true;
    document.getElementById('YBSave').style.color = 'rgb(177, 177, 177)';
    document.getElementById('YBSettings').disabled = false;
    document.getElementById('YBSettings').style.color = '#49B79D';
    stopTimerTickYB();
    resetTimerYB();
    document.getElementById('YBResultSaved').innerHTML = "";
    clearInterval(YBcountdown);
    YBisPaused = false;
    YBtimeInput.classList.remove('CountdownHidden');
    YBcountdownDisplay.classList.add('CountdownHidden');
    YBchangeBall(1, 1);
}
// Event listener for closing the modal
YBcloseModal.addEventListener("click", YBclose);
YBBTN.onclick = function () {
    YBopenmodal();
}
$(function () {
    $('#YBForm').on('submit', function (e) {
        e.preventDefault(); // Prevent the default form submission

        var formData = new FormData(this); // Get the form data

        $.ajax({
            url: "/",
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function (result) {
                $('#YBResultSaved').html(result); // Update the result section with the server response
            }
        });
        clearInterval(intYB);
        [secondsYB, minutesYB, hoursYB] = [0, 0, 0];
        timerRefYB.value = '00 : 00 : 00';
        audioPlayerBRT.currentTime = 0
        timerControlsButtonsYB.pauseYB.style.display = 'none';
        timerControlsButtonsYB.startYB.style.display = 'inline';
        timerControlsButtonsAHAT.startYB.style.color = "#0661AA";
        setFormDisabledStateYB(false);
        setTimerControlsDisabledStateYB(false, true, true);
        timerControlsButtonsYB.stopYB.style.color = "rgb(177, 177, 177)";
        document.getElementById('YBSave').disabled = true;
        document.getElementById('YBSave').style.color = 'rgb(177, 177, 177)';
        stopTimerTickYB();
        resetTimerYB();
        YBtimeInput.classList.remove('CountdownHidden');
        YBcountdownDisplay.classList.add('CountdownHidden');
    });
});

let
    formSettingsFieldsYB,
    timerControlsButtonsYB,
    statusPanelYB,
    timerYB,
    timerSettingsYB;

function setTimerSettingsYB(
    intervalCountYB = timerSettingsYB.intervalCountYB,
    intervalDurationYB = timerSettingsYB.intervalDurationYB,
    enableBreakYB = timerSettingsYB.enableBreakYB,
    breakDurationYB = timerSettingsYB.breakDurationYB,
    enableBreak2YB = timerSettingsYB.enableBreak2YB,
    breakDuration2YB = timerSettingsYB.breakDuration2YB,
    enableBreak3YB = timerSettingsYB.enableBreak3YB,
    breakDuration3YB = timerSettingsYB.breakDuration3YB
) {
    timerSettingsYB = {
        intervalCountYB,
        intervalDurationYB,
        enableBreakYB,
        breakDurationYB,
        enableBreak2YB,
        breakDuration2YB,
        enableBreak3YB,
        breakDuration3YB
    };
}

function resetTimerYB() {
    timerYB = {
        totalTimeElapsedYB: 0,
        elapsedInIntervalYB: 0,
        intervalsDoneYB: 0,
        isBreak3YB: true,
        isBreakYB: false,
        isBreak2YB: false,
        isBreak4YB: false,
        isFinishedYB: false
    };
    updateInfoYB();
}

let [secondsYB, minutesYB, hoursYB] = [0, 0, 0];
let timerRefYB = document.getElementById('timerDisplayYB');
let intYB = null;
document.getElementById('stopBtnYB').disabled = true;
document.getElementById('stopBtnYB').style.color = 'rgb(177, 177, 177)';
document.getElementById('YBSave').disabled = true;
document.getElementById('YBSave').style.color = 'rgb(177, 177, 177)';

var audioYB = document.getElementById("audioYB"),
    muteYB = document.getElementById("muteYB"),
    ismuteYB = false;

audioPlayerBRT.loop = true;

var audioSongYB = document.getElementById("songYB"),
    muteSongYB = document.getElementById("songMuteYB");
// Get the volumeVYB bar element
const volumeVoiceYB = document.getElementById('volumeVoiceYB');

// Add an event listener for the volumeVYB change event
volumeVoiceYB.addEventListener('input', function () {
    // Get the current volumeVYB value
    const volumeVYB = parseFloat(volumeVoiceYB.value);

    // Check if volumeVYB is 0 and mute the media if necessary
    if (volumeVYB === 0) {
        audioObjects.inhale.muted = true;
        audioObjects.exhale.muted = true;
        audioObjects.hold.muted = true;
        audioYB.style.display = "none";
        muteYB.style.display = "block";
        ismuteYB = true;
    } else {
        audioObjects.inhale.muted = false;
        audioObjects.exhale.muted = false;
        audioObjects.hold.muted = false;
        muteYB.style.display = "none";
        audioYB.style.display = "block";
        ismuteYB = false;
    }
});
// Get the volumeSYB bar element
const volumeSongYB = document.getElementById('volumeSongYB');

// Add an event listener for the volumeSYB change event
volumeSongYB.addEventListener('input', function () {
    // Get the current volumeSYB value
    const volumeSYB = parseFloat(volumeSongYB.value);

    // Check if volumeSYB is 0 and mute the media if necessary
    if (volumeSYB === 0) {
        audioPlayerBRT.muted = true;
        audioSongYB.style.display = "none";
        muteSongYB.style.display = "block";
    } else {
        audioPlayerBRT.muted = false;
        muteSongYB.style.display = "none";
        audioSongYB.style.display = "block";
    }
});


var inhaleYB = 4;
var holdYB = inhaleYB / 2;
var exhaleYB = inhaleYB;
var hold2YB = inhaleYB / 2;
setTimerSettingsYB(9999, inhaleYB, true, holdYB, true, exhaleYB, true, hold2YB);
initializeTimerControlsYB();
initializeStatusPanelYB();
initializeTimerSettingsFormYB();
resetTimerYB();


var minusBtnYB = document.getElementById("minusYB"),
    plusBtnYB = document.getElementById("plusYB"),
    numberYB = 4, /// numberYB value
    minYB = 4, /// minYB numberYB
    maxYB = 30;

minusBtnYB.onclick = function () {
    if (numberYB > minYB) {
        numberYB = numberYB - 2; /// Minus 1 of the numberYB
        formSettingsFieldsYB.intervalDurationYB.value = numberYB; /// Display the value in place of the numberYB
        //fix here to change pranayama type
        formSettingsFieldsYB.breakDurationYB.value = formSettingsFieldsYB.intervalDurationYB.value / 2;
        formSettingsFieldsYB.breakDuration2YB.value = formSettingsFieldsYB.intervalDurationYB.value;
        formSettingsFieldsYB.breakDuration3YB.value = formSettingsFieldsYB.intervalDurationYB.value / 2;
        setTimerSettingsYB(9999, formSettingsFieldsYB.intervalDurationYB.value, true, formSettingsFieldsYB.breakDurationYB.value, true, formSettingsFieldsYB.breakDuration2YB.value, true, formSettingsFieldsYB.breakDuration3YB.value);
    }
}

plusBtnYB.onclick = function () {
    if (numberYB < maxYB) {
        numberYB = numberYB + 2;
        formSettingsFieldsYB.intervalDurationYB.value = numberYB; /// Display the value in place of the numberYB
        //fix here to change pranayama type
        formSettingsFieldsYB.breakDurationYB.value = formSettingsFieldsYB.intervalDurationYB.value / 2;
        formSettingsFieldsYB.breakDuration2YB.value = formSettingsFieldsYB.intervalDurationYB.value;
        formSettingsFieldsYB.breakDuration3YB.value = formSettingsFieldsYB.intervalDurationYB.value / 2;
        setTimerSettingsYB(9999, formSettingsFieldsYB.intervalDurationYB.value, true, formSettingsFieldsYB.breakDurationYB.value, true, formSettingsFieldsYB.breakDuration2YB.value, true, formSettingsFieldsYB.breakDuration3YB.value);

    }
}

function initializeTimerSettingsFormYB() {
    const oneDayInSecondsBRE = 60 * 60 * 24;
    let lastUserSetEnableBreakYB = timerSettingsYB.enableBreakYB;
    let lastUserSetEnableBreak2YB = timerSettingsYB.enableBreak2YB;
    let lastUserSetEnableBreak3YB = timerSettingsYB.enableBreak3YB;

    formSettingsFieldsYB = {
        intervalCountYB: document.getElementById('intervalCountInputYB'),
        intervalDurationYB: document.getElementById('intervalDurationInputYB'),
        enableBreakYB: document.getElementById('enableBreakInputYB'),
        breakDurationYB: document.getElementById('breakDurationInputYB'),
        enableBreak2YB: document.getElementById('enableBreakInput2YB'),
        breakDuration2YB: document.getElementById('breakDurationInput2YB'),
        enableBreak3YB: document.getElementById('enableBreakInput3YB'),
        breakDuration3YB: document.getElementById('breakDurationInput3YB'),
    };

    formSettingsFieldsYB.intervalCountYB.value = timerSettingsYB.intervalCountYB;
    formSettingsFieldsYB.intervalDurationYB.value = timerSettingsYB.intervalDurationYB;
    formSettingsFieldsYB.enableBreakYB.checked = timerSettingsYB.enableBreakYB;
    formSettingsFieldsYB.breakDurationYB.value = timerSettingsYB.breakDurationYB;
    formSettingsFieldsYB.enableBreak2YB.checked = timerSettingsYB.enableBreak2YB;
    formSettingsFieldsYB.breakDuration2YB.value = timerSettingsYB.breakDuration2YB;
    formSettingsFieldsYB.enableBreak3YB.checked = timerSettingsYB.enableBreak3YB;
    formSettingsFieldsYB.breakDuration3YB.value = timerSettingsYB.breakDuration3YB;

    function getNumberInBoundsOrDefaultYB(value, minYB, maxYB, def = 1) {
        const valueAsNumberYB = parseInt(value);
        return isNaN(valueAsNumberYB) ? def : Math.max(minYB, Math.min(valueAsNumberYB, maxYB));
    }

    function setBreakDurationLineDisplayYB(displayed) {
        const breakDurationInputLineEltYB = document.getElementById('breakDurationInputLineYB');
        breakDurationInputLineEltYB.style.display = displayed ? null : 'none';
        const breakDurationInputLineElt2YB = document.getElementById('breakDurationInputLine2YB');
        breakDurationInputLineElt2YB.style.display = displayed ? null : 'none';
        const breakDurationInputLineElt3YB = document.getElementById('breakDurationInputLine3YB');
        breakDurationInputLineElt3YB.style.display = displayed ? null : 'none';
    }

    formSettingsFieldsYB.intervalCountYB.addEventListener('input', () => {
        const intervalCountYB = getNumberInBoundsOrDefaultYB(formSettingsFieldsYB.intervalCountYB.value, 1, 9999),
            hasOneIntervalYB = intervalCountYB === 1,
            hasBreakYB = hasOneIntervalYB ? false : lastUserSetEnableBreakYB;

        formSettingsFieldsYB.enableBreakYB.disabled = hasOneIntervalYB === true;
        formSettingsFieldsYB.enableBreakYB.checked = hasBreakYB;

        setBreakDurationLineDisplayYB(hasBreakYB);

        setTimerSettingsYB(intervalCountYB, undefined, hasBreakYB);
        updateInfoYB();
    });

    formSettingsFieldsYB.intervalDurationYB.addEventListener('input', () => {
        setTimerSettingsYB(undefined, getNumberInBoundsOrDefaultYB(formSettingsFieldsYB.intervalDurationYB.value, 1, oneDayInSecondsBRE));
        updateInfoYB();
    });

    formSettingsFieldsYB.enableBreakYB.addEventListener('change', () => {
        const enableBreakYB = formSettingsFieldsYB.enableBreakYB.checked;

        lastUserSetEnableBreakYB = enableBreakYB;
        setBreakDurationLineDisplayYB(enableBreakYB);
        setTimerSettingsYB(undefined, undefined, enableBreakYB);
        updateInfoYB();
    });

    formSettingsFieldsYB.breakDurationYB.addEventListener('input', () => {
        setTimerSettingsYB(undefined, undefined, undefined,
            getNumberInBoundsOrDefaultYB(formSettingsFieldsYB.breakDurationYB.value, 1, oneDayInSecondsBRE)
        );
        updateInfoYB();
    });

    formSettingsFieldsYB.enableBreak2YB.addEventListener('change', () => {
        const enableBreak2YB = formSettingsFieldsYB.enableBreak2YB.checked;

        lastUserSetEnableBreak2YB = enableBreak2YB;
        setBreakDurationLineDisplayYB(enableBreak2YB);
        setTimerSettingsYB(undefined, undefined, undefined, undefined, enableBreak2YB);
        updateInfoYB();
    });

    formSettingsFieldsYB.breakDuration2YB.addEventListener('input', () => {
        setTimerSettingsYB(undefined, undefined, undefined, undefined, undefined,
            getNumberInBoundsOrDefaultYB(formSettingsFieldsYB.breakDuration2YB.value, 1, oneDayInSecondsBRE)
        );
        updateInfoYB();
    });

    formSettingsFieldsYB.enableBreak3YB.addEventListener('change', () => {
        const enableBreak3YB = formSettingsFieldsYB.enableBreak3YB.checked;

        lastUserSetEnableBreak3YB = enableBreak2YB;
        setBreakDurationLineDisplayYB(enableBreak3YB);
        setTimerSettingsYB(undefined, undefined, undefined, undefined, undefined, undefined, enableBreak3YB);
        updateInfoYB();
    });

    formSettingsFieldsYB.breakDuration3YB.addEventListener('input', () => {
        setTimerSettingsYB(
            undefined, undefined, undefined, undefined, undefined, undefined, undefined,
            getNumberInBoundsOrDefaultYB(formSettingsFieldsYB.breakDuration3YB.value, 1, oneDayInSecondsBRE)
        );
        updateInfoYB();
    });
}

function initializeTimerControlsYB() {
    timerControlsButtonsYB = {
        startYB: document.getElementById('startBtnYB'),
        pauseYB: document.getElementById('pauseBtnYB'),
        stopYB: document.getElementById('stopBtnYB'),
    };

    setTimerControlsDisabledStateYB(false, true, true);

    timerControlsButtonsYB.startYB.addEventListener('click', startTimerYB);
    timerControlsButtonsYB.pauseYB.addEventListener('click', pauseTimerYB);
    timerControlsButtonsYB.stopYB.addEventListener('click', stopTimerYB);
}

function initializeStatusPanelYB() {
    statusPanelYB = {
        timeOverviewMessageYB: document.getElementById('timeOverviewMessageYB'),

        elapsedInIntervalBoxYB: document.getElementById('elapsedInIntervalBoxYB'),
        elapsedInBreakIntervalBoxYB: document.getElementById('elapsedInBreakIntervalBoxYB'),
        elapsedInIntervalYB: document.getElementById('elapsedInIntervalYB'),
        elapsedInBreakIntervalYB: document.getElementById('elapsedInBreakIntervalYB'),
        elapsedInBreakIntervalBox2YB: document.getElementById('elapsedInBreakIntervalBox2YB'),
        elapsedInBreakInterval2YB: document.getElementById('elapsedInBreakInterval2YB'),
        elapsedInBreakIntervalBox3YB: document.getElementById('elapsedInBreakIntervalBox3YB'),
        elapsedInBreakInterval3YB: document.getElementById('elapsedInBreakInterval3YB'),

        intervalsDoneYB: document.getElementById('intervalsDoneYB'),
    };
}

function setTimerControlsDisabledStateYB(startYB, pauseYB, stopYB) {
    timerControlsButtonsYB.startYB.disabled = startYB;
    timerControlsButtonsYB.pauseYB.disabled = pauseYB;
    timerControlsButtonsYB.stopYB.disabled = stopYB;
}

function setFormDisabledStateYB(disabled) {
    formSettingsFieldsYB.intervalCountYB.disabled = disabled;
    formSettingsFieldsYB.intervalDurationYB.disabled = disabled;
    formSettingsFieldsYB.enableBreakYB.disabled = disabled || timerSettingsYB.intervalCountYB === 1;
    formSettingsFieldsYB.breakDurationYB.disabled = disabled;
    formSettingsFieldsYB.enableBreak2YB.disabled = disabled
    formSettingsFieldsYB.breakDuration2YB.disabled = disabled;
    formSettingsFieldsYB.enableBreak3YB.disabled = disabled
    formSettingsFieldsYB.breakDuration3YB.disabled = disabled;
    minusBtnYB.disabled = disabled;
    plusBtnYB.disabled = disabled;
}

function startTimerYB() {
    isYBon = true;
    if (intYB !== null) {
        clearInterval(intYB);
    }
    setFormDisabledStateYB(true);
    setTimerControlsDisabledStateYB(true, true, true);
    setTimeout(() => {
        setTimerControlsDisabledStateYB(true, false, true);
    }, 2000);
    timerControlsButtonsYB.stopYB.style.color = "rgb(177, 177, 177)";
    if (timerYB.isBreak3YB) {
        if (!ismuteYB) {
            audioObjects.bell.muted = false;
            audioObjects.bell.play();
            setTimeout(() => {
                audioObjects.inhale.muted = false;
                audioObjects.inhale.play();
            }, 1500);    
        }
        setTimeout(() => {
            YBchangeBall(1.5, timerSettingsYB.intervalDurationYB);
        }, 1500); 
    }
    if (!audioPlayerBRT.muted) {
        playSelectedSongBRT(true);
    }
    if (timerYB.isFinishedYB) {
        resetTimerYB();
    }
    setTimeout(() => {
        setTimeout(() => {
            intYB = setInterval(displayTimerYB, 1000);
        }, 1000);
        startTimerTickYB();
        if (YBisPaused) {
            // Resume from paused state
            YBstartTimer(YBtimeRemaining);
            YBisPaused = false;
        } else {
            // Start a new timer
            clearInterval(YBcountdown);
            YBtimeRemaining = YBtimeInput.value === '∞' ? Infinity : parseInt(YBtimeInput.value);
            YBcountdownDisplay.textContent = '';
            YBstartTimer(YBtimeRemaining);
        }
    }, 1700);    
    timerControlsButtonsYB.startYB.style.display = 'none';
    timerControlsButtonsYB.pauseYB.style.display = 'inline';
    document.getElementById('YBSettings').disabled = true;
    document.getElementById('YBSettings').style.color = 'rgb(177, 177, 177)';
    document.getElementById('YBSave').disabled = true;
    document.getElementById('YBSave').style.color = 'rgb(177, 177, 177)';
}
function YBstartTimer(YBduration) {
    YBcountdown = setInterval(function () {
        if (YBduration > 0 && YBduration !== Infinity) {
            YBduration--;
            YBtimeRemaining = YBduration;
            let YBContdownminutes = Math.floor(YBduration / 60);
            let YBContdownseconds = YBduration % 60;
            YBcountdownDisplay.textContent = `${YBContdownminutes}:${YBContdownseconds.toString().padStart(2, '0')}`;
            YBtimeInput.classList.add('CountdownHidden');
            YBcountdownDisplay.classList.remove('CountdownHidden');
        } else if (YBduration == Infinity) {
            YBcountdownDisplay.textContent = '∞';
            YBtimeInput.classList.add('CountdownHidden');
            YBcountdownDisplay.classList.remove('CountdownHidden');
        }
    }, 1000);
}
function pauseTimerYB() {
    isYBon = false;
    clearInterval(intYB);
    setTimerControlsDisabledStateYB(false, true, false);
    document.getElementById('stopBtnYB').style.color = '#990000';
    timerControlsButtonsYB.pauseYB.style.display = 'none';
    timerControlsButtonsYB.startYB.style.display = 'inline';
    document.getElementById('YBSettings').disabled = false;
    document.getElementById('YBSettings').style.color = '#49B79D';
    if (!audioPlayerBRT.muted) {
        audioPlayerBRT.pause();
    }
    stopTimerTickYB();
    document.getElementById('YBDate').value = date;
    document.getElementById('YBSave').disabled = false;
    document.getElementById('YBSave').style.color = '#49B79D';
    clearInterval(YBcountdown);
    YBisPaused = true;
    YBchangeBall(1, 1);
}

function stopTimerYB() {
    isYBon = false;
    clearInterval(intYB);
    [secondsYB, minutesYB, hoursYB] = [0, 0, 0];
    timerRefYB.value = '00 : 00 : 00';
    audioPlayerBRT.currentTime = 0
    timerControlsButtonsYB.pauseYB.style.display = 'none';
    timerControlsButtonsYB.startYB.style.display = 'inline';
    setFormDisabledStateYB(false);
    setTimerControlsDisabledStateYB(false, true, true);
    timerControlsButtonsYB.stopYB.style.color = "rgb(177, 177, 177)";
    document.getElementById('YBSave').disabled = true;
    document.getElementById('YBSave').style.color = 'rgb(177, 177, 177)';
    stopTimerTickYB();
    resetTimerYB();
    timerControlsButtonsYB.startYB.style.color = '#49B79D';
    clearInterval(YBcountdown);
    YBisPaused = false;
    YBtimeInput.classList.remove('CountdownHidden');
    YBcountdownDisplay.classList.add('CountdownHidden');
    YBchangeBall(1, 1);
}

function displayTimerYB() {
    secondsYB++;
    if (secondsYB == 60) {
        secondsYB = 0;
        minutesYB++;
        if (minutesYB == 60) {
            minutesYB = 0;
            hoursYB++;
        }
    }
    let hYB = hoursYB < 10 ? "0" + hoursYB : hoursYB;
    let mYB = minutesYB < 10 ? "0" + minutesYB : minutesYB;
    let sYB = secondsYB < 10 ? "0" + secondsYB : secondsYB;
    timerRefYB.value = `${hYB} : ${mYB} : ${sYB}`;
}

function startTimerTickYB() {
    timerYB.intervalId = setInterval(onTimerTickYB, 1000);
}

function stopTimerTickYB() {
    clearInterval(timerYB.intervalId);
}

function onTimerTickYB() {
    const currentIntervalDurationYB = timerYB.isBreakYB ? timerSettingsYB.breakDurationYB : timerYB.isBreak2YB ? timerSettingsYB.breakDuration2YB : timerYB.isBreak4YB ? timerSettingsYB.breakDuration3YB : timerSettingsYB.intervalDurationYB;
    if (timerYB.elapsedInIntervalYB <= currentIntervalDurationYB && timerYB.isBreak3YB) {
        timerYB.elapsedInIntervalYB++;
        if (timerYB.elapsedInIntervalYB == currentIntervalDurationYB && timerYB.isBreak3YB) {
            if (!ismuteYB) {
                audioObjects.hold.muted = false;
                audioObjects.hold.play();
            }
            YBchangeBall(1.3, timerSettingsYB.breakDurationYB);
        }
        if (timerYB.elapsedInIntervalYB > currentIntervalDurationYB && timerYB.isBreak3YB) {
            timerYB.isBreakYB = true;
            timerYB.isBreak3YB = false;
            timerYB.isFinishedYB = timerYB.intervalsDoneYB === timerSettingsYB.intervalCountYB;
            if (!timerYB.isFinishedYB) {
                timerYB.elapsedInIntervalYB = 1;
            }
            if (timerYB.isFinishedYB) {
                setTimerControlsDisabledStateYB(false, true, true);
                setFormDisabledStateYB(false);
                stopTimerTickYB();
            } else {
                timerYB.totalTimeElapsedYB++;
            }
            updateInfoYB();
        }
        updateInfoYB();
    } else if (timerYB.elapsedInIntervalYB <= currentIntervalDurationYB && timerYB.isBreakYB) {
        timerYB.elapsedInIntervalYB++;
        if (timerYB.elapsedInIntervalYB == currentIntervalDurationYB && timerYB.isBreakYB) {
            if (!ismuteYB) {
                audioObjects.exhale.muted = false;
                audioObjects.exhale.play();
            }
            YBchangeBall(0.5, timerSettingsYB.breakDuration2YB);
        }
        if (timerYB.elapsedInIntervalYB > currentIntervalDurationYB && timerYB.isBreakYB) {
            timerYB.isBreak2YB = true;
            timerYB.isBreakYB = false;
            timerYB.isFinishedYB = timerYB.intervalsDoneYB === timerSettingsYB.intervalCountYB;
            if (!timerYB.isFinishedYB) {
                timerYB.elapsedInIntervalYB = 1;
            }
            if (timerYB.isFinishedYB) {
                setTimerControlsDisabledStateYB(false, true, true);
                setFormDisabledStateYB(false);
                stopTimerTickYB();
            } else {
                timerYB.totalTimeElapsedYB++;
            }
            updateInfoYB();
        }
        updateInfoYB();
    } else if (timerYB.elapsedInIntervalYB <= currentIntervalDurationYB && timerYB.isBreak2YB) {
        timerYB.elapsedInIntervalYB++;
        if (timerYB.elapsedInIntervalYB == currentIntervalDurationYB && timerYB.isBreak2YB) {
            if (!ismuteYB) {
                audioObjects.hold.muted = false;
                audioObjects.hold.play();
            }
            YBchangeBall(0.5, timerSettingsYB.breakDuration3YB);
        }
        if (timerYB.elapsedInIntervalYB > currentIntervalDurationYB && timerYB.isBreak2YB) {
            timerYB.isBreak4YB = true;
            timerYB.isBreak2YB = false;
            timerYB.isFinishedYB = timerYB.intervalsDoneYB === timerSettingsYB.intervalCountYB;
            if (!timerYB.isFinishedYB) {
                timerYB.elapsedInIntervalYB = 1;
            }
            if (timerYB.isFinishedYB) {
                setTimerControlsDisabledStateYB(false, true, true);
                setFormDisabledStateYB(false);
                stopTimerTickYB();
            } else {
                timerYB.totalTimeElapsedYB++;
            }
            updateInfoYB();
        }
        updateInfoYB();
    } else if (timerYB.elapsedInIntervalYB <= currentIntervalDurationYB && timerYB.isBreak4YB) {
        timerYB.elapsedInIntervalYB++;
        if (timerYB.elapsedInIntervalYB == currentIntervalDurationYB && timerYB.isBreak4YB) {
            if (!ismuteYB) {
                if (YBcountdownDisplay.textContent == '0:00') {
                    audioObjects.inhale.muted = true;
                    clearInterval(YBcountdown);
                    if (!ismuteYB) {
                        audioObjects.bell.muted = false;
                        audioObjects.bell.play();
                    }
                    clearInterval(intYB);
                    setTimerControlsDisabledStateYB(true, true, false);
                    document.getElementById('stopBtnYB').style.color = '#990000';
                    timerControlsButtonsYB.pauseYB.style.display = 'none';
                    timerControlsButtonsYB.startYB.style.display = 'inline';
                    timerControlsButtonsYB.startYB.style.color = "rgb(177, 177, 177)";
                    document.getElementById('YBSettings').disabled = false;
                    document.getElementById('YBSettings').style.color = '#49B79D';
                    if (!audioPlayerBRT.muted) {
                        audioPlayerBRT.pause();
                    }
                    stopTimerTickYB();
                    document.getElementById('YBDate').value = date;
                    document.getElementById('YBSave').disabled = false;
                    document.getElementById('YBSave').style.color = '#49B79D';
                    clearInterval(YBcountdown);
                    YBisPaused = false;
                    setTimeout(() => {
                        audioObjects.normalbreath.muted = false;
                        audioObjects.normalbreath.play();
                        if (isPortuguese) {
                            YBballText.textContent = 'Respira\u00E7\u00E3o Normal';
                        } else {
                            YBballText.textContent = 'Normal Breath';
                        }
                    }, 1000);
                } else {
                    audioObjects.inhale.muted = false;
                    audioObjects.inhale.play();
                }
            }
            YBchangeBall(1.5, timerSettingsYB.intervalDurationYB);
        }
        if (timerYB.elapsedInIntervalYB > currentIntervalDurationYB && timerYB.isBreak4YB) {
            timerYB.isBreak3YB = true;
            timerYB.isBreak4YB = false;
            timerYB.intervalsDoneYB++;
            timerYB.isFinishedYB = timerYB.intervalsDoneYB === timerSettingsYB.intervalCountYB;
            if (!timerYB.isFinishedYB) {
                timerYB.elapsedInIntervalYB = 1;
            }
            if (timerYB.isFinishedYB) {
                setTimerControlsDisabledStateYB(false, true, true);
                setFormDisabledStateYB(false);
                stopTimerTickYB();
            } else {
                timerYB.totalTimeElapsedYB++;
            }
            updateInfoYB();
        }
        updateInfoYB();
    }
}

function updateInfoYB() {
    statusPanelYB.timeOverviewMessageYB.style.display = timerYB.isFinishedYB ? 'block' : null;
    statusPanelYB.elapsedInIntervalBoxYB.style.display = timerYB.isFinishedYB || timerYB.isBreakYB || timerYB.isBreak2YB || timerYB.isBreak4YB ? 'none' : null;
    statusPanelYB.elapsedInBreakIntervalBoxYB.style.display = !timerYB.isFinishedYB && timerYB.isBreakYB ? 'block' : null;
    statusPanelYB.elapsedInBreakIntervalBox2YB.style.display = !timerYB.isFinishedYB && timerYB.isBreak2YB ? 'block' : null;
    statusPanelYB.elapsedInBreakIntervalBox3YB.style.display = !timerYB.isFinishedYB && timerYB.isBreak4YB ? 'block' : null;
    if (isPortuguese) {
        if (timerYB.isBreakYB) {
            YBballText.textContent = 'SEGURE';
        } else if (timerYB.isBreak2YB) {
            YBballText.textContent = 'EXPIRA';
        } else if (timerYB.isBreak4YB) {
            YBballText.textContent = 'SEGURE';
        } else {
            YBballText.textContent = 'INSPIRA';
        }
    } else {
        if (timerYB.isBreakYB) {
            YBballText.textContent = 'HOLD';
        } else if (timerYB.isBreak2YB) {
            YBballText.textContent = 'EXHALE';
        } else if (timerYB.isBreak4YB) {
            YBballText.textContent = 'HOLD';
        } else {
            YBballText.textContent = 'INHALE';
        }
    }
    statusPanelYB.intervalsDoneYB.value = timerYB.intervalsDoneYB;

}

//---------------------------------------------------//
