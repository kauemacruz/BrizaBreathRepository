/*NB JS*/
var isNBon = false;
const NBball = document.getElementById('NBball');
const NBballText = document.getElementById('NBballText');

function NBchangeBall(scale, duration) {
    NBball.style.transition = `transform ${duration}s ease`;
    NBball.style.transform = `scale(${scale})`;
}

const NBtimeInput = document.getElementById('NBtimeInput');
const NBcountdownDisplay = document.getElementById('NBcountdownDisplay');
let NBcountdown;
let NBtimeRemaining = Infinity;
let NBisPaused = false;

// Populate the dropdown with options
for (let NBi = 2; NBi <= 60; NBi++) { // assuming 1 to 60 minutes
    let NBoption = document.createElement('option');
    NBoption.value = NBi * 60;
    if (isPortuguese) {
        NBoption.textContent = NBi + ' minutos';
    } else {
        NBoption.textContent = NBi + ' minutes';
    }
    NBtimeInput.appendChild(NBoption);
}
const NBmodal = document.getElementById("NBmodal");
const NBcloseModal = document.getElementById("NBcloseModal");
const NBBTN = document.getElementById("NBBTN");

function NBopenmodal() {
    NBmodal.style.display = "block";
    audioObjects.exhaleLeft.load();
    audioObjects.inhaleLeft.load();
    audioObjects.exhaleRight.load();
    audioObjects.inhaleRight.load();
    audioObjects.normalbreath.load();
}
// Function to close the modal
function NBclose() {
    isNBon = false;
    NBmodal.style.display = "none";
    clearInterval(intNB);
    [secondsNB, minutesNB, hoursNB] = [0, 0, 0];
    timerRefNB.value = '00 : 00 : 00';
    if (!audioPlayerBRT.muted) {
        audioPlayerBRT.pause();
    }
    audioPlayerBRT.currentTime = 0;
    timerControlsButtonsNB.pauseNB.style.display = 'none';
    timerControlsButtonsNB.startNB.style.display = 'inline';
    setFormDisabledStateNB(false);
    setTimerControlsDisabledStateNB(false, true, true);
    timerControlsButtonsNB.stopNB.style.color = "rgb(177, 177, 177)";
    document.getElementById('NBSave').disabled = true;
    document.getElementById('NBSave').style.color = 'rgb(177, 177, 177)';
    document.getElementById('NBSettings').disabled = false;
    document.getElementById('NBSettings').style.color = '#49B79D';
    stopTimerTickNB();
    resetTimerNB();
    isNBON = false;
    document.getElementById('NBResultSaved').innerHTML = "";
    clearInterval(NBcountdown);
    NBisPaused = false;
    NBtimeInput.classList.remove('CountdownHidden');
    NBcountdownDisplay.classList.add('CountdownHidden');
    NBchangeBall(1, 1);
}
// Event listener for closing the modal
NBcloseModal.addEventListener("click", NBclose);
NBBTN.onclick = function () {
    NBopenmodal();
}
$(function () {
    $('#NBForm').on('submit', function (e) {
        e.preventDefault(); // Prevent the default form submission

        var formData = new FormData(this); // Get the form data

        $.ajax({
            url: "/",
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function (result) {
                $('#NBResultSaved').html(result); // Update the result section with the server response
            }
        });
        clearInterval(intNB);
        [secondsNB, minutesNB, hoursNB] = [0, 0, 0];
        timerRefNB.value = '00 : 00 : 00';
        audioPlayerBRT.currentTime = 0
        timerControlsButtonsNB.pauseNB.style.display = 'none';
        timerControlsButtonsNB.startNB.style.display = 'inline';
        timerControlsButtonsAHAT.startNB.style.color = "#0661AA";
        setFormDisabledStateNB(false);
        setTimerControlsDisabledStateNB(false, true, true);
        timerControlsButtonsNB.stopNB.style.color = "rgb(177, 177, 177)";
        document.getElementById('NBSave').disabled = true;
        document.getElementById('NBSave').style.color = 'rgb(177, 177, 177)';
        stopTimerTickNB();
        resetTimerNB();
        NBtimeInput.classList.remove('CountdownHidden');
        NBcountdownDisplay.classList.add('CountdownHidden');
    });
});

let
    formSettingsFieldsNB,
    timerControlsButtonsNB,
    statusPanelNB,
    timerNB,
    timerSettingsNB;

function setTimerSettingsNB(
    intervalCountNB = timerSettingsNB.intervalCountNB,
    intervalDurationNB = timerSettingsNB.intervalDurationNB,
    enableBreakNB = timerSettingsNB.enableBreakNB,
    breakDurationNB = timerSettingsNB.breakDurationNB,
    enableBreak2NB = timerSettingsNB.enableBreak2NB,
    breakDuration2NB = timerSettingsNB.breakDuration2NB,
    enableBreak3NB = timerSettingsNB.enableBreak3NB,
    breakDuration3NB = timerSettingsNB.breakDuration3NB
) {
    timerSettingsNB = {
        intervalCountNB,
        intervalDurationNB,
        enableBreakNB,
        breakDurationNB,
        enableBreak2NB,
        breakDuration2NB,
        enableBreak3NB,
        breakDuration3NB
    };
}

function resetTimerNB() {
    timerNB = {
        totalTimeElapsedNB: 0,
        elapsedInIntervalNB: 0,
        intervalsDoneNB: 0,
        isBreak3NB: true,
        isBreakNB: false,
        isBreak2NB: false,
        isBreak4NB: false,
        isFinishedNB: false
    };
    updateInfoNB();
}

let [secondsNB, minutesNB, hoursNB] = [0, 0, 0];
let timerRefNB = document.getElementById('timerDisplayNB');
let intNB = null;
document.getElementById('stopBtnNB').disabled = true;
document.getElementById('stopBtnNB').style.color = 'rgb(177, 177, 177)';
document.getElementById('NBSave').disabled = true;
document.getElementById('NBSave').style.color = 'rgb(177, 177, 177)';

var audioNB = document.getElementById("audioNB"),
    muteNB = document.getElementById("muteNB"),
    ismuteNB = false;

audioPlayerBRT.loop = true;

var audioSongNB = document.getElementById("songNB"),
    muteSongNB = document.getElementById("songMuteNB");
// Get the volumeVNB bar element
const volumeVoiceNB = document.getElementById('volumeVoiceNB');

// Add an event listener for the volumeVNB change event
volumeVoiceNB.addEventListener('input', function () {
    // Get the current volumeVNB value
    const volumeVNB = parseFloat(volumeVoiceNB.value);

    // Check if volumeVNB is 0 and mute the media if necessary
    if (volumeVNB === 0) {
        audioObjects.inhaleLeft.muted = true;
        audioListNB[1].muted = true;
        audioObjects.inhaleRight.muted = true;
        audioListNB[3].muted = true;
        audioNB.style.display = "none";
        muteNB.style.display = "block";
        ismuteNB = true;
    } else {
        audioObjects.inhaleLeft.muted = false;
        audioListNB[1].muted = false;
        audioObjects.inhaleRight.muted = false;
        audioListNB[3].muted = false;
        muteNB.style.display = "none";
        audioNB.style.display = "block";
        ismuteNB = false;
    }
});
// Get the volumeSNB bar element
const volumeSongNB = document.getElementById('volumeSongNB');

// Add an event listener for the volumeSNB change event
volumeSongNB.addEventListener('input', function () {
    // Get the current volumeSNB value
    const volumeSNB = parseFloat(volumeSongNB.value);

    // Check if volumeSNB is 0 and mute the media if necessary
    if (volumeSNB === 0) {
        audioPlayerBRT.muted = true;
        audioSongNB.style.display = "none";
        muteSongNB.style.display = "block";
    } else {
        audioPlayerBRT.muted = false;
        muteSongNB.style.display = "none";
        audioSongNB.style.display = "block";
    }
});


var inhaleNB = 4;
var holdNB = inhaleNB;
var exhaleNB = inhaleNB;
var hold2NB = inhaleNB;
setTimerSettingsNB(9999, inhaleNB, true, holdNB, true, exhaleNB, true, hold2NB);
initializeTimerControlsNB();
initializeStatusPanelNB();
initializeTimerSettingsFormNB();
resetTimerNB();


var minusBtnNB = document.getElementById("minusNB"),
    plusBtnNB = document.getElementById("plusNB"),
    numberNB = 3, /// numberNB value
    minNB = 3, /// minNB numberNB
    maxNB = 60;

minusBtnNB.onclick = function () {
    if (numberNB > minNB) {
        numberNB = numberNB - 1; /// Minus 1 of the numberNB
        formSettingsFieldsNB.intervalDurationNB.value = numberNB; /// Display the value in place of the numberNB
        //fix here to change pranayama type
        formSettingsFieldsNB.breakDurationNB.value = formSettingsFieldsNB.intervalDurationNB.value;
        formSettingsFieldsNB.breakDuration2NB.value = formSettingsFieldsNB.intervalDurationNB.value;
        formSettingsFieldsNB.breakDuration3NB.value = formSettingsFieldsNB.intervalDurationNB.value;
        setTimerSettingsNB(9999, formSettingsFieldsNB.intervalDurationNB.value, true, formSettingsFieldsNB.breakDurationNB.value, true, formSettingsFieldsNB.breakDuration2NB.value, true, formSettingsFieldsNB.breakDuration3NB.value);
    }
}

plusBtnNB.onclick = function () {
    if (numberNB < maxNB) {
        numberNB = numberNB + 1;
        formSettingsFieldsNB.intervalDurationNB.value = numberNB; /// Display the value in place of the numberNB
        //fix here to change pranayama type
        formSettingsFieldsNB.breakDurationNB.value = formSettingsFieldsNB.intervalDurationNB.value;
        formSettingsFieldsNB.breakDuration2NB.value = formSettingsFieldsNB.intervalDurationNB.value;
        formSettingsFieldsNB.breakDuration3NB.value = formSettingsFieldsNB.intervalDurationNB.value;
        setTimerSettingsNB(9999, formSettingsFieldsNB.intervalDurationNB.value, true, formSettingsFieldsNB.breakDurationNB.value, true, formSettingsFieldsNB.breakDuration2NB.value, true, formSettingsFieldsNB.breakDuration3NB.value);

    }
}

function initializeTimerSettingsFormNB() {
    const oneDayInSecondsBRE = 60 * 60 * 24;
    let lastUserSetEnableBreakNB = timerSettingsNB.enableBreakNB;
    let lastUserSetEnableBreak2NB = timerSettingsNB.enableBreak2NB;
    let lastUserSetEnableBreak3NB = timerSettingsNB.enableBreak3NB;

    formSettingsFieldsNB = {
        intervalCountNB: document.getElementById('intervalCountInputNB'),
        intervalDurationNB: document.getElementById('intervalDurationInputNB'),
        enableBreakNB: document.getElementById('enableBreakInputNB'),
        breakDurationNB: document.getElementById('breakDurationInputNB'),
        enableBreak2NB: document.getElementById('enableBreakInput2NB'),
        breakDuration2NB: document.getElementById('breakDurationInput2NB'),
        enableBreak3NB: document.getElementById('enableBreakInput3NB'),
        breakDuration3NB: document.getElementById('breakDurationInput3NB'),
    };

    formSettingsFieldsNB.intervalCountNB.value = timerSettingsNB.intervalCountNB;
    formSettingsFieldsNB.intervalDurationNB.value = timerSettingsNB.intervalDurationNB;
    formSettingsFieldsNB.enableBreakNB.checked = timerSettingsNB.enableBreakNB;
    formSettingsFieldsNB.breakDurationNB.value = timerSettingsNB.breakDurationNB;
    formSettingsFieldsNB.enableBreak2NB.checked = timerSettingsNB.enableBreak2NB;
    formSettingsFieldsNB.breakDuration2NB.value = timerSettingsNB.breakDuration2NB;
    formSettingsFieldsNB.enableBreak3NB.checked = timerSettingsNB.enableBreak3NB;
    formSettingsFieldsNB.breakDuration3NB.value = timerSettingsNB.breakDuration3NB;

    function getNumberInBoundsOrDefaultNB(value, minNB, maxNB, def = 1) {
        const valueAsNumberNB = parseInt(value);
        return isNaN(valueAsNumberNB) ? def : Math.max(minNB, Math.min(valueAsNumberNB, maxNB));
    }

    function setBreakDurationLineDisplayNB(displayed) {
        const breakDurationInputLineEltNB = document.getElementById('breakDurationInputLineNB');
        breakDurationInputLineEltNB.style.display = displayed ? null : 'none';
        const breakDurationInputLineElt2NB = document.getElementById('breakDurationInputLine2NB');
        breakDurationInputLineElt2NB.style.display = displayed ? null : 'none';
        const breakDurationInputLineElt3NB = document.getElementById('breakDurationInputLine3NB');
        breakDurationInputLineElt3NB.style.display = displayed ? null : 'none';
    }

    formSettingsFieldsNB.intervalCountNB.addEventListener('input', () => {
        const intervalCountNB = getNumberInBoundsOrDefaultNB(formSettingsFieldsNB.intervalCountNB.value, 1, 9999),
            hasOneIntervalNB = intervalCountNB === 1,
            hasBreakNB = hasOneIntervalNB ? false : lastUserSetEnableBreakNB;

        formSettingsFieldsNB.enableBreakNB.disabled = hasOneIntervalNB === true;
        formSettingsFieldsNB.enableBreakNB.checked = hasBreakNB;

        setBreakDurationLineDisplayNB(hasBreakNB);

        setTimerSettingsNB(intervalCountNB, undefined, hasBreakNB);
        updateInfoNB();
    });

    formSettingsFieldsNB.intervalDurationNB.addEventListener('input', () => {
        setTimerSettingsNB(undefined, getNumberInBoundsOrDefaultNB(formSettingsFieldsNB.intervalDurationNB.value, 1, oneDayInSecondsBRE));
        updateInfoNB();
    });

    formSettingsFieldsNB.enableBreakNB.addEventListener('change', () => {
        const enableBreakNB = formSettingsFieldsNB.enableBreakNB.checked;

        lastUserSetEnableBreakNB = enableBreakNB;
        setBreakDurationLineDisplayNB(enableBreakNB);
        setTimerSettingsNB(undefined, undefined, enableBreakNB);
        updateInfoNB();
    });

    formSettingsFieldsNB.breakDurationNB.addEventListener('input', () => {
        setTimerSettingsNB(undefined, undefined, undefined,
            getNumberInBoundsOrDefaultNB(formSettingsFieldsNB.breakDurationNB.value, 1, oneDayInSecondsBRE)
        );
        updateInfoNB();
    });

    formSettingsFieldsNB.enableBreak2NB.addEventListener('change', () => {
        const enableBreak2NB = formSettingsFieldsNB.enableBreak2NB.checked;

        lastUserSetEnableBreak2NB = enableBreak2NB;
        setBreakDurationLineDisplayNB(enableBreak2NB);
        setTimerSettingsNB(undefined, undefined, undefined, undefined, enableBreak2NB);
        updateInfoNB();
    });

    formSettingsFieldsNB.breakDuration2NB.addEventListener('input', () => {
        setTimerSettingsNB(undefined, undefined, undefined, undefined, undefined,
            getNumberInBoundsOrDefaultNB(formSettingsFieldsNB.breakDuration2NB.value, 1, oneDayInSecondsBRE)
        );
        updateInfoNB();
    });

    formSettingsFieldsNB.enableBreak3NB.addEventListener('change', () => {
        const enableBreak3NB = formSettingsFieldsNB.enableBreak3NB.checked;

        lastUserSetEnableBreak3NB = enableBreak2NB;
        setBreakDurationLineDisplayNB(enableBreak3NB);
        setTimerSettingsNB(undefined, undefined, undefined, undefined, undefined, undefined, enableBreak3NB);
        updateInfoNB();
    });

    formSettingsFieldsNB.breakDuration3NB.addEventListener('input', () => {
        setTimerSettingsNB(
            undefined, undefined, undefined, undefined, undefined, undefined, undefined,
            getNumberInBoundsOrDefaultNB(formSettingsFieldsNB.breakDuration3NB.value, 1, oneDayInSecondsBRE)
        );
        updateInfoNB();
    });
}

function initializeTimerControlsNB() {
    timerControlsButtonsNB = {
        startNB: document.getElementById('startBtnNB'),
        pauseNB: document.getElementById('pauseBtnNB'),
        stopNB: document.getElementById('stopBtnNB'),
    };

    setTimerControlsDisabledStateNB(false, true, true);

    timerControlsButtonsNB.startNB.addEventListener('click', startTimerNB);
    timerControlsButtonsNB.pauseNB.addEventListener('click', pauseTimerNB);
    timerControlsButtonsNB.stopNB.addEventListener('click', stopTimerNB);
}

function initializeStatusPanelNB() {
    statusPanelNB = {
        timeOverviewMessageNB: document.getElementById('timeOverviewMessageNB'),

        elapsedInIntervalBoxNB: document.getElementById('elapsedInIntervalBoxNB'),
        elapsedInBreakIntervalBoxNB: document.getElementById('elapsedInBreakIntervalBoxNB'),
        elapsedInIntervalNB: document.getElementById('elapsedInIntervalNB'),
        elapsedInBreakIntervalNB: document.getElementById('elapsedInBreakIntervalNB'),
        elapsedInBreakIntervalBox2NB: document.getElementById('elapsedInBreakIntervalBox2NB'),
        elapsedInBreakInterval2NB: document.getElementById('elapsedInBreakInterval2NB'),
        elapsedInBreakIntervalBox3NB: document.getElementById('elapsedInBreakIntervalBox3NB'),
        elapsedInBreakInterval3NB: document.getElementById('elapsedInBreakInterval3NB'),

        intervalsDoneNB: document.getElementById('intervalsDoneNB'),
    };
}

function setTimerControlsDisabledStateNB(startNB, pauseNB, stopNB) {
    timerControlsButtonsNB.startNB.disabled = startNB;
    timerControlsButtonsNB.pauseNB.disabled = pauseNB;
    timerControlsButtonsNB.stopNB.disabled = stopNB;
}

function setFormDisabledStateNB(disabled) {
    formSettingsFieldsNB.intervalCountNB.disabled = disabled;
    formSettingsFieldsNB.intervalDurationNB.disabled = disabled;
    formSettingsFieldsNB.enableBreakNB.disabled = disabled || timerSettingsNB.intervalCountNB === 1;
    formSettingsFieldsNB.breakDurationNB.disabled = disabled;
    formSettingsFieldsNB.enableBreak2NB.disabled = disabled
    formSettingsFieldsNB.breakDuration2NB.disabled = disabled;
    formSettingsFieldsNB.enableBreak3NB.disabled = disabled
    formSettingsFieldsNB.breakDuration3NB.disabled = disabled;
    minusBtnNB.disabled = disabled;
    plusBtnNB.disabled = disabled;
}

function startTimerNB() {
    isNBon = true;
    if (intNB !== null) {
        clearInterval(intNB);
    }
    setFormDisabledStateNB(true);
    setTimerControlsDisabledStateNB(true, true, true);
    setTimeout(() => {
        setTimerControlsDisabledStateNB(true, false, true);
    }, 2000);
    timerControlsButtonsNB.stopNB.style.color = "rgb(177, 177, 177)";
    if (timerNB.isBreak3NB) {
        if (!ismuteNB) {
            audioObjects.bell.muted = false;
            audioObjects.bell.play();
            setTimeout(() => {
                audioObjects.inhaleLeft.muted = false;
                audioObjects.inhaleLeft.play();
            }, 1500);       
        }
        setTimeout(() => {
            NBchangeBall(1.5, timerSettingsNB.intervalDurationNB);
        }, 1500); 
    }
    if (!audioPlayerBRT.muted) {
        playSelectedSongBRT(true);
    }
    if (timerNB.isFinishedNB) {
        resetTimerNB();
    }
    setTimeout(() => {
        setTimeout(() => {
            intNB = setInterval(displayTimerNB, 1000);
        }, 1000);
        startTimerTickNB();
        if (NBisPaused) {
            // Resume from paused state
            NBstartTimer(NBtimeRemaining);
            NBisPaused = false;
        } else {
            // Start a new timer
            clearInterval(NBcountdown);
            NBtimeRemaining = NBtimeInput.value === '∞' ? Infinity : parseInt(NBtimeInput.value);
            NBcountdownDisplay.textContent = '';
            NBstartTimer(NBtimeRemaining);
        }
    }, 1700);   
    timerControlsButtonsNB.startNB.style.display = 'none';
    timerControlsButtonsNB.pauseNB.style.display = 'inline';
    document.getElementById('NBSettings').disabled = true;
    document.getElementById('NBSettings').style.color = 'rgb(177, 177, 177)';
    document.getElementById('NBSave').disabled = true;
    document.getElementById('NBSave').style.color = 'rgb(177, 177, 177)';
}
function NBstartTimer(NBduration) {
    NBcountdown = setInterval(function () {
        if (NBduration > 0 && NBduration !== Infinity) {
            NBduration--;
            NBtimeRemaining = NBduration;
            let NBContdownminutes = Math.floor(NBduration / 60);
            let NBContdownseconds = NBduration % 60;
            NBcountdownDisplay.textContent = `${NBContdownminutes}:${NBContdownseconds.toString().padStart(2, '0')}`;
            NBtimeInput.classList.add('CountdownHidden');
            NBcountdownDisplay.classList.remove('CountdownHidden');
        } else if (NBduration == Infinity) {
            NBcountdownDisplay.textContent = '∞';
            NBtimeInput.classList.add('CountdownHidden');
            NBcountdownDisplay.classList.remove('CountdownHidden');
        }
    }, 1000);
}
function pauseTimerNB() {
    isNBon = false;
    clearInterval(intNB);
    setTimerControlsDisabledStateNB(false, true, false);
    document.getElementById('stopBtnNB').style.color = '#990000';
    timerControlsButtonsNB.pauseNB.style.display = 'none';
    timerControlsButtonsNB.startNB.style.display = 'inline';
    document.getElementById('NBSettings').disabled = false;
    document.getElementById('NBSettings').style.color = '#49B79D';
    if (!audioPlayerBRT.muted) {
        audioPlayerBRT.pause();
    }
    stopTimerTickNB();
    document.getElementById('NBDate').value = date;
    document.getElementById('NBSave').disabled = false;
    document.getElementById('NBSave').style.color = '#49B79D';
    clearInterval(NBcountdown);
    NBisPaused = true;
    NBchangeBall(1, 1);
}

function stopTimerNB() {
    isNBon = false;
    clearInterval(intNB);
    [secondsNB, minutesNB, hoursNB] = [0, 0, 0];
    timerRefNB.value = '00 : 00 : 00';
    audioPlayerBRT.currentTime = 0
    timerControlsButtonsNB.pauseNB.style.display = 'none';
    timerControlsButtonsNB.startNB.style.display = 'inline';
    setFormDisabledStateNB(false);
    setTimerControlsDisabledStateNB(false, true, true);
    timerControlsButtonsNB.stopNB.style.color = "rgb(177, 177, 177)";
    document.getElementById('NBSave').disabled = true;
    document.getElementById('NBSave').style.color = 'rgb(177, 177, 177)';
    stopTimerTickNB();
    resetTimerNB();
    timerControlsButtonsNB.startNB.style.color = '#49B79D';
    clearInterval(NBcountdown);
    NBisPaused = false;
    NBtimeInput.classList.remove('CountdownHidden');
    NBcountdownDisplay.classList.add('CountdownHidden');
    NBchangeBall(1, 1);
}

function displayTimerNB() {
    secondsNB++;
    if (secondsNB == 60) {
        secondsNB = 0;
        minutesNB++;
        if (minutesNB == 60) {
            minutesNB = 0;
            hoursNB++;
        }
    }
    let hNB = hoursNB < 10 ? "0" + hoursNB : hoursNB;
    let mNB = minutesNB < 10 ? "0" + minutesNB : minutesNB;
    let sNB = secondsNB < 10 ? "0" + secondsNB : secondsNB;
    timerRefNB.value = `${hNB} : ${mNB} : ${sNB}`;
}

function startTimerTickNB() {
    timerNB.intervalId = setInterval(onTimerTickNB, 1000);
}

function stopTimerTickNB() {
    clearInterval(timerNB.intervalId);
}

function onTimerTickNB() {
    const currentIntervalDurationNB = timerNB.isBreakNB ? timerSettingsNB.breakDurationNB : timerNB.isBreak2NB ? timerSettingsNB.breakDuration2NB : timerNB.isBreak4NB ? timerSettingsNB.breakDuration3NB : timerSettingsNB.intervalDurationNB;
    if (timerNB.elapsedInIntervalNB <= currentIntervalDurationNB && timerNB.isBreak3NB) {
        timerNB.elapsedInIntervalNB++;
        if (timerNB.elapsedInIntervalNB == currentIntervalDurationNB && timerNB.isBreak3NB) {
            if (!ismuteNB) {
                audioObjects.exhaleRight.muted = false;
                audioObjects.exhaleRight.play();
            }
            NBchangeBall(0.5, timerSettingsNB.breakDurationNB);
        }
        if (timerNB.elapsedInIntervalNB > currentIntervalDurationNB && timerNB.isBreak3NB) {
            timerNB.isBreakNB = true;
            timerNB.isBreak3NB = false;
            timerNB.isFinishedNB = timerNB.intervalsDoneNB === timerSettingsNB.intervalCountNB;
            if (!timerNB.isFinishedNB) {
                timerNB.elapsedInIntervalNB = 1;
            }
            if (timerNB.isFinishedNB) {
                setTimerControlsDisabledStateNB(false, true, true);
                setFormDisabledStateNB(false);
                stopTimerTickNB();
            } else {
                timerNB.totalTimeElapsedNB++;
            }
            updateInfoNB();
        }
        updateInfoNB();
    } else if (timerNB.elapsedInIntervalNB <= currentIntervalDurationNB && timerNB.isBreakNB) {
        timerNB.elapsedInIntervalNB++;
        if (timerNB.elapsedInIntervalNB == currentIntervalDurationNB && timerNB.isBreakNB) {
            if (!ismuteNB) {
                audioObjects.inhaleRight.muted = false;
                audioObjects.inhaleRight.play();
            }
            NBchangeBall(1.5, timerSettingsNB.breakDuration2NB);
        }
        if (timerNB.elapsedInIntervalNB > currentIntervalDurationNB && timerNB.isBreakNB) {
            timerNB.isBreak2NB = true;
            timerNB.isBreakNB = false;
            timerNB.isFinishedNB = timerNB.intervalsDoneNB === timerSettingsNB.intervalCountNB;
            if (!timerNB.isFinishedNB) {
                timerNB.elapsedInIntervalNB = 1;
            }
            if (timerNB.isFinishedNB) {
                setTimerControlsDisabledStateNB(false, true, true);
                setFormDisabledStateNB(false);
                stopTimerTickNB();
            } else {
                timerNB.totalTimeElapsedNB++;
            }
            updateInfoNB();
        }
        updateInfoNB();
    } else if (timerNB.elapsedInIntervalNB <= currentIntervalDurationNB && timerNB.isBreak2NB) {
        timerNB.elapsedInIntervalNB++;
        if (timerNB.elapsedInIntervalNB == currentIntervalDurationNB && timerNB.isBreak2NB) {
            if (!ismuteNB) {
                audioObjects.exhaleLeft.muted = false;
                audioObjects.exhaleLeft.play();
            }
            NBchangeBall(0.5, timerSettingsNB.breakDuration3NB);
        }
        if (timerNB.elapsedInIntervalNB > currentIntervalDurationNB && timerNB.isBreak2NB) {
            timerNB.isBreak4NB = true;
            timerNB.isBreak2NB = false;
            timerNB.isFinishedNB = timerNB.intervalsDoneNB === timerSettingsNB.intervalCountNB;
            if (!timerNB.isFinishedNB) {
                timerNB.elapsedInIntervalNB = 1;
            }
            if (timerNB.isFinishedNB) {
                setTimerControlsDisabledStateNB(false, true, true);
                setFormDisabledStateNB(false);
                stopTimerTickNB();
            } else {
                timerNB.totalTimeElapsedNB++;
            }
            updateInfoNB();
        }
        updateInfoNB();
    } else if (timerNB.elapsedInIntervalNB <= currentIntervalDurationNB && timerNB.isBreak4NB) {
        timerNB.elapsedInIntervalNB++;
        if (timerNB.elapsedInIntervalNB == currentIntervalDurationNB && timerNB.isBreak4NB) {
            if (!ismuteNB) {
                if (NBcountdownDisplay.textContent == '0:00') {
                    audioObjects.inhale.muted = true;
                    clearInterval(NBcountdown);
                    if (!ismuteNB) {
                        audioObjects.bell.muted = false;
                        audioObjects.bell.play();
                    }
                    clearInterval(intNB);
                    setTimerControlsDisabledStateNB(true, true, false);
                    document.getElementById('stopBtnNB').style.color = '#990000';
                    timerControlsButtonsNB.pauseNB.style.display = 'none';
                    timerControlsButtonsNB.startNB.style.display = 'inline';
                    timerControlsButtonsNB.startNB.style.color = "rgb(177, 177, 177)";
                    document.getElementById('NBSettings').disabled = false;
                    document.getElementById('NBSettings').style.color = '#49B79D';
                    if (!audioPlayerBRT.muted) {
                        audioPlayerBRT.pause();
                    }
                    stopTimerTickNB();
                    document.getElementById('NBDate').value = date;
                    document.getElementById('NBSave').disabled = false;
                    document.getElementById('NBSave').style.color = '#49B79D';
                    clearInterval(NBcountdown);
                    NBisPaused = false;
                    setTimeout(() => {
                        audioObjects.normalbreath.muted = false;
                        audioObjects.normalbreath.play();
                        if (isPortuguese) {
                            NBballText.textContent = 'Respira\u00E7\u00E3o Normal';
                        } else {
                            NBballText.textContent = 'Normal Breath';
                        }
                    }, 1000);
                } else {
                    audioObjects.inhaleLeft.muted = false;
                    audioObjects.inhaleLeft.play();
                }
            }
            NBchangeBall(1.5, timerSettingsNB.intervalDurationNB);
        }
        if (timerNB.elapsedInIntervalNB > currentIntervalDurationNB && timerNB.isBreak4NB) {
            timerNB.isBreak3NB = true;
            timerNB.isBreak4NB = false;
            timerNB.intervalsDoneNB++;
            timerNB.isFinishedNB = timerNB.intervalsDoneNB === timerSettingsNB.intervalCountNB;
            if (!timerNB.isFinishedNB) {
                timerNB.elapsedInIntervalNB = 1;
            }
            if (timerNB.isFinishedNB) {
                setTimerControlsDisabledStateNB(false, true, true);
                setFormDisabledStateNB(false);
                stopTimerTickNB();
            } else {
                timerNB.totalTimeElapsedNB++;
            }
            updateInfoNB();
        }
        updateInfoNB();
    }
}

function updateInfoNB() {
    statusPanelNB.timeOverviewMessageNB.style.display = timerNB.isFinishedNB ? 'block' : null;
    statusPanelNB.elapsedInIntervalBoxNB.style.display = timerNB.isFinishedNB || timerNB.isBreakNB || timerNB.isBreak2NB || timerNB.isBreak4NB ? 'none' : null;
    statusPanelNB.elapsedInBreakIntervalBoxNB.style.display = !timerNB.isFinishedNB && timerNB.isBreakNB ? 'block' : null;
    statusPanelNB.elapsedInBreakIntervalBox2NB.style.display = !timerNB.isFinishedNB && timerNB.isBreak2NB ? 'block' : null;
    statusPanelNB.elapsedInBreakIntervalBox3NB.style.display = !timerNB.isFinishedNB && timerNB.isBreak4NB ? 'block' : null;
    if (isPortuguese) {
        if (timerNB.isBreakNB) {
            NBballText.textContent = 'EXPIRA';
        } else if (timerNB.isBreak2NB) {
            NBballText.textContent = 'INSPIRA';
        } else if (timerNB.isBreak4NB) {
            NBballText.textContent = 'EXPIRA';
        } else {
            NBballText.textContent = 'INSPIRA';
        }
    } else {
        if (timerNB.isBreakNB) {
            NBballText.textContent = 'EXHALE';
        } else if (timerNB.isBreak2NB) {
            NBballText.textContent = 'INHALE';
        } else if (timerNB.isBreak4NB) {
            NBballText.textContent = 'EXHALE';
        } else {
            NBballText.textContent = 'INHALE';
        }
    }
    statusPanelNB.intervalsDoneNB.value = timerNB.intervalsDoneNB;
}
//---------------------------------------------------//
