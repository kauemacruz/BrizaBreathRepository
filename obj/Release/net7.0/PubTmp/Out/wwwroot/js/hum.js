//HUM JS//
const HUMball = document.getElementById('HUMball');
const HUMballText = document.getElementById('HUMballText');

function HUMchangeBall(scale, duration) {
    HUMball.style.transition = `transform ${duration}s ease`;
    HUMball.style.transform = `scale(${scale})`;
}

const HUMtimeInput = document.getElementById('HUMtimeInput');
const HUMcountdownDisplay = document.getElementById('HUMcountdownDisplay');
let HUMcountdown;
let HUMtimeRemaining = Infinity;
let HUMisPaused = false;
// Populate the dropdown with options
for (let HUMi = 2; HUMi <= 60; HUMi++) { // assuming 1 to 60 minutes
    let HUMoption = document.createElement('option');
    HUMoption.value = HUMi * 60;
    if (isPortuguese) {
        HUMoption.textContent = HUMi + ' minutos';
    } else {
        HUMoption.textContent = HUMi + ' minutes';
    }
    HUMtimeInput.appendChild(HUMoption);
}
const HUMmodal = document.getElementById("HUMmodal");
const HUMcloseModal = document.getElementById("HUMcloseModal");
const HUMBTN = document.getElementById("HUMBTN");

function HUMopenmodal() {
    HUMmodal.style.display = "block";
    audioObjects.inhale.load();
    audioObjects.hum.load();
    audioObjects.hold.load();
}
// Function to close the modal
function HUMclose() {
    HUMmodal.style.display = "none";
    clearInterval(intHUM);
    [secondsHUM, minutesHUM, hoursHUM] = [0, 0, 0];
    timerRefHUM.value = '00 : 00 : 00';
    if (!audioPlayerBRT.muted) {
        audioPlayerBRT.pause();
    }
    if (!ismuteHUM) {
        audioObjects.hum.pause();
        audioObjects.hum.currentTime = 0
    }
    audioPlayerBRT.currentTime = 0
    timerControlsButtonsHUM.pauseHUM.style.display = 'none';
    timerControlsButtonsHUM.startHUM.style.display = 'inline';
    setFormDisabledStateHUM(false);
    setTimerControlsDisabledStateHUM(false, true, true);
    timerControlsButtonsHUM.stopHUM.style.color = "rgb(177, 177, 177)";
    stopTimerTickHUM();
    resetTimerHUM();
    document.getElementById('HUMSave').disabled = true;
    document.getElementById('HUMSave').style.color = 'rgb(177, 177, 177)';
    document.getElementById('humSettings').disabled = false;
    document.getElementById('humSettings').style.color = '#49B79D';
    document.getElementById('HUMResultSaved').innerHTML = "";
    clearInterval(HUMcountdown);
    HUMisPaused = false;
    HUMtimeInput.classList.remove('CountdownHidden');
    HUMcountdownDisplay.classList.add('CountdownHidden');
    HUMchangeBall(1, 1);
}
// Event listener for closing the modal
HUMcloseModal.addEventListener("click", HUMclose);
HUMBTN.onclick = function () {
    HUMopenmodal();
}
$(function () {
    $('#HUMForm').on('submit', function (e) {
        e.preventDefault(); // Prevent the default form submission

        var formData = new FormData(this); // Get the form

        $.ajax({
            url: "/",
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function (result) {
                $('#HUMResultSaved').html(result); // Update the result section with the server response
            }
        });
        clearInterval(intHUM);
        [secondsHUM, minutesHUM, hoursHUM] = [0, 0, 0];
        timerRefHUM.value = '00 : 00 : 00';
        audioPlayerBRT.currentTime = 0
        timerControlsButtonsHUM.pauseHUM.style.display = 'none';
        timerControlsButtonsHUM.startHUM.style.display = 'inline';
        setFormDisabledStateHUM(false);
        setTimerControlsDisabledStateHUM(false, true, true);
        timerControlsButtonsHUM.stopHUM.style.color = "rgb(177, 177, 177)";
        document.getElementById('HUMSave').disabled = true;
        document.getElementById('HUMSave').style.color = 'rgb(177, 177, 177)';
        stopTimerTickHUM();
        resetTimerHUM();
        CBtimeInput.classList.remove('CountdownHidden');
        CBcountdownDisplay.classList.add('CountdownHidden');
    });
});

let
    formSettingsFieldsHUM,
    timerControlsButtonsHUM,
    statusPanelHUM,
    timerHUM,
    timerSettingsHUM;

function setTimerSettingsHUM(
    intervalCountHUM = timerSettingsHUM.intervalCountHUM,
    intervalDurationHUM = timerSettingsHUM.intervalDurationHUM,
    enableBreakHUM = timerSettingsHUM.enableBreakHUM,
    breakDurationHUM = timerSettingsHUM.breakDurationHUM,
    enableBreak2HUM = timerSettingsHUM.enableBreak2HUM,
    breakDuration2HUM = timerSettingsHUM.breakDuration2HUM,
    enableBreak3HUM = timerSettingsHUM.enableBreak3HUM,
    breakDuration3HUM = timerSettingsHUM.breakDuration3HUM
) {
    timerSettingsHUM = {
        intervalCountHUM,
        intervalDurationHUM,
        enableBreakHUM,
        breakDurationHUM,
        enableBreak2HUM,
        breakDuration2HUM,
        enableBreak3HUM,
        breakDuration3HUM
    };
}

function resetTimerHUM() {
    timerHUM = {
        totalTimeElapsedHUM: 0,
        elapsedInIntervalHUM: 0,
        intervalsDoneHUM: 0,
        isBreak3HUM: true,
        isBreakHUM: false,
        isBreak2HUM: false,
        isBreak4HUM: false,
        isFinishedHUM: false
    };
    updateInfoHUM();
}

let [secondsHUM, minutesHUM, hoursHUM] = [0, 0, 0];
let timerRefHUM = document.getElementById('timerDisplayHUM');
let intHUM = null;
document.getElementById('HUMSave').disabled = true;
document.getElementById('HUMSave').style.color = 'rgb(177, 177, 177)';

var audioHUM = document.getElementById("audioHUM"),
    muteHUM = document.getElementById("muteHUM"),
    ismuteHUM = false;

audioPlayerBRT.loop = true;

var audioSongHUM = document.getElementById("songHUM"),
    muteSongHUM = document.getElementById("songMuteHUM");
// Get the volumeVbre bar element
const volumeVoiceHUM = document.getElementById('volumeVoiceHUM');

// Add an event listener for the volumeVbre change event
volumeVoiceHUM.addEventListener('input', function () {
    // Get the current volumeVbre value
    const volumeVhum = parseFloat(volumeVoiceHUM.value);

    // Check if volumeVbre is 0 and mute the media if necessary
    if (volumeVhum === 0) {
        audioObjects.inhale.muted = true;
        audioObjects.hum.muted = true;
        audioObjects.hold.muted = true;
        audioHUM.style.display = "none";
        muteHUM.style.display = "block";
        ismuteHUM = true;
    } else {
        audioObjects.inhale.muted = false;
        audioObjects.hum.muted = false;
        audioObjects.hold.muted = false;
        muteHUM.style.display = "none";
        audioHUM.style.display = "block";
        ismuteHUM = false;
    }
});
// Get the volumeSbre bar element
const volumeSongHUM = document.getElementById('volumeSongHUM');

// Add an event listener for the volumeSbre change event
volumeSongHUM.addEventListener('input', function () {
    // Get the current volumeSbre value
    const volumeShum = parseFloat(volumeSongHUM.value);

    // Check if volumeSbre is 0 and mute the media if necessary
    if (volumeShum === 0) {
        audioPlayerBRT.muted = true;
        audioSongHUM.style.display = "none";
        muteSongHUM.style.display = "block";
    } else {
        audioPlayerBRT.muted = false;
        muteSongHUM.style.display = "none";
        audioSongHUM.style.display = "block";
    }
});

//pranayama type
var inhaleHUM = 4;
var holdHUM = inhaleHUM;
var exhaleHUM = inhaleHUM * 1.5;
var hold2HUM = inhaleHUM / 2;
setTimerSettingsHUM(9999, inhaleHUM, true, holdHUM, true, exhaleHUM, true, hold2HUM);
initializeTimerControlsHUM();
initializeStatusPanelHUM();
initializeTimerSettingsFormHUM();
resetTimerHUM();

var minusBtnHUM = document.getElementById("minusHUM"),
    plusBtnHUM = document.getElementById("plusHUM"),
    numberHUM = 4, /// numberHUM value
    minHUM = 4, /// minHUM numberHUM
    maxHUM = 30;

minusBtnHUM.onclick = function () {
    if (numberHUM > minHUM) {
        numberHUM = numberHUM - 1; /// Minus 1 of the numberHUM
        formSettingsFieldsHUM.intervalDurationHUM.value = numberHUM; /// Display the value in place of the numberHUM
        //fix here to change pranayama type
        formSettingsFieldsHUM.breakDurationHUM.value = formSettingsFieldsHUM.intervalDurationHUM.value;
        formSettingsFieldsHUM.breakDuration2HUM.value = Math.ceil(formSettingsFieldsHUM.intervalDurationHUM.value * 1.5);
        formSettingsFieldsHUM.breakDuration3HUM.value = Math.ceil(formSettingsFieldsHUM.intervalDurationHUM.value / 2);
        setTimerSettingsHUM(9999, formSettingsFieldsHUM.intervalDurationHUM.value, true, formSettingsFieldsHUM.breakDurationHUM.value, true, formSettingsFieldsHUM.breakDuration2HUM.value, true, formSettingsFieldsHUM.breakDuration3HUM.value);
    }
}

plusBtnHUM.onclick = function () {
    if (numberHUM < maxHUM) {
        numberHUM = numberHUM + 1;
        formSettingsFieldsHUM.intervalDurationHUM.value = numberHUM; /// Display the value in place of the numberHUM
        //fix here to change pranayama type
        formSettingsFieldsHUM.breakDurationHUM.value = formSettingsFieldsHUM.intervalDurationHUM.value;
        formSettingsFieldsHUM.breakDuration2HUM.value = Math.ceil(formSettingsFieldsHUM.intervalDurationHUM.value * 1.5);
        formSettingsFieldsHUM.breakDuration3HUM.value = Math.ceil(formSettingsFieldsHUM.intervalDurationHUM.value / 2);
        setTimerSettingsHUM(9999, formSettingsFieldsHUM.intervalDurationHUM.value, true, formSettingsFieldsHUM.breakDurationHUM.value, true, formSettingsFieldsHUM.breakDuration2HUM.value, true, formSettingsFieldsHUM.breakDuration3HUM.value);

    }
}

function initializeTimerSettingsFormHUM() {
    const oneDayInSecondsHUM = 60 * 60 * 24;
    let lastUserSetEnableBreakHUM = timerSettingsHUM.enableBreakHUM;
    let lastUserSetEnableBreak2HUM = timerSettingsHUM.enableBreak2HUM;
    let lastUserSetEnableBreak3HUM = timerSettingsHUM.enableBreak3HUM;

    formSettingsFieldsHUM = {
        intervalCountHUM: document.getElementById('intervalCountInputHUM'),
        intervalDurationHUM: document.getElementById('intervalDurationInputHUM'),
        enableBreakHUM: document.getElementById('enableBreakInputHUM'),
        breakDurationHUM: document.getElementById('breakDurationInputHUM'),
        enableBreak2HUM: document.getElementById('enableBreakInput2HUM'),
        breakDuration2HUM: document.getElementById('breakDurationInput2HUM'),
        enableBreak3HUM: document.getElementById('enableBreakInput3HUM'),
        breakDuration3HUM: document.getElementById('breakDurationInput3HUM'),
    };

    formSettingsFieldsHUM.intervalCountHUM.value = timerSettingsHUM.intervalCountHUM;
    formSettingsFieldsHUM.intervalDurationHUM.value = timerSettingsHUM.intervalDurationHUM;
    formSettingsFieldsHUM.enableBreakHUM.checked = timerSettingsHUM.enableBreakHUM;
    formSettingsFieldsHUM.breakDurationHUM.value = timerSettingsHUM.breakDurationHUM;
    formSettingsFieldsHUM.enableBreak2HUM.checked = timerSettingsHUM.enableBreak2HUM;
    formSettingsFieldsHUM.breakDuration2HUM.value = timerSettingsHUM.breakDuration2HUM;
    formSettingsFieldsHUM.enableBreak3HUM.checked = timerSettingsHUM.enableBreak3HUM;
    formSettingsFieldsHUM.breakDuration3HUM.value = timerSettingsHUM.breakDuration3HUM;

    function getNumberInBoundsOrDefaultHUM(value, minHUM, maxHUM, def = 1) {
        const valueAsNumberHUM = parseInt(value);
        return isNaN(valueAsNumberHUM) ? def : Math.max(minHUM, Math.min(valueAsNumberHUM, maxHUM));
    }

    function setBreakDurationLineDisplayHUM(displayed) {
        const breakDurationInputLineEltHUM = document.getElementById('breakDurationInputLineHUM');
        breakDurationInputLineEltHUM.style.display = displayed ? null : 'none';
        const breakDurationInputLineElt2HUM = document.getElementById('breakDurationInputLine2HUM');
        breakDurationInputLineElt2HUM.style.display = displayed ? null : 'none';
        const breakDurationInputLineElt3HUM = document.getElementById('breakDurationInputLine3HUM');
        breakDurationInputLineElt3HUM.style.display = displayed ? null : 'none';
    }

    formSettingsFieldsHUM.intervalCountHUM.addEventListener('input', () => {
        const intervalCountHUM = getNumberInBoundsOrDefaultHUM(formSettingsFieldsHUM.intervalCountHUM.value, 1, 9999),
            hasOneIntervalHUM = intervalCountHUM === 1,
            hasBreakHUM = hasOneIntervalHUM ? false : lastUserSetEnableBreakHUM;

        formSettingsFieldsHUM.enableBreakHUM.disabled = hasOneIntervalHUM === true;
        formSettingsFieldsHUM.enableBreakHUM.checked = hasBreakHUM;

        setBreakDurationLineDisplayHUM(hasBreakHUM);

        setTimerSettingsHUM(intervalCountHUM, undefined, hasBreakHUM);
        updateInfoHUM();
    });

    formSettingsFieldsHUM.intervalDurationHUM.addEventListener('input', () => {
        setTimerSettingsHUM(undefined, getNumberInBoundsOrDefaultHUM(formSettingsFieldsHUM.intervalDurationHUM.value, 1, oneDayInSecondsHUM));
        updateInfoHUM();
    });

    formSettingsFieldsHUM.enableBreakHUM.addEventListener('change', () => {
        const enableBreakHUM = formSettingsFieldsHUM.enableBreakHUM.checked;

        lastUserSetEnableBreakHUM = enableBreakHUM;
        setBreakDurationLineDisplayHUM(enableBreakHUM);
        setTimerSettingsHUM(undefined, undefined, enableBreakHUM);
        updateInfoHUM();
    });

    formSettingsFieldsHUM.breakDurationHUM.addEventListener('input', () => {
        setTimerSettingsHUM(undefined, undefined, undefined,
            getNumberInBoundsOrDefaultHUM(formSettingsFieldsHUM.breakDurationHUM.value, 1, oneDayInSecondsHUM)
        );
        updateInfoHUM();
    });

    formSettingsFieldsHUM.enableBreak2HUM.addEventListener('change', () => {
        const enableBreak2HUM = formSettingsFieldsHUM.enableBreak2HUM.checked;

        lastUserSetEnableBreak2HUM = enableBreak2HUM;
        setBreakDurationLineDisplayHUM(enableBreak2HUM);
        setTimerSettingsHUM(undefined, undefined, undefined, undefined, enableBreak2HUM);
        updateInfoHUM();
    });

    formSettingsFieldsHUM.breakDuration2HUM.addEventListener('input', () => {
        setTimerSettingsHUM(undefined, undefined, undefined, undefined, undefined,
            getNumberInBoundsOrDefaultHUM(formSettingsFieldsHUM.breakDuration2HUM.value, 1, oneDayInSecondsHUM)
        );
        updateInfoHUM();
    });

    formSettingsFieldsHUM.enableBreak3HUM.addEventListener('change', () => {
        const enableBreak3HUM = formSettingsFieldsHUM.enableBreak3HUM.checked;

        lastUserSetEnableBreak3HUM = enableBreak2HUM;
        setBreakDurationLineDisplayHUM(enableBreak3HUM);
        setTimerSettingsHUM(undefined, undefined, undefined, undefined, undefined, undefined, enableBreak3HUM);
        updateInfoHUM();
    });

    formSettingsFieldsHUM.breakDuration3HUM.addEventListener('input', () => {
        setTimerSettingsHUM(
            undefined, undefined, undefined, undefined, undefined, undefined, undefined,
            getNumberInBoundsOrDefaultHUM(formSettingsFieldsHUM.breakDuration3HUM.value, 1, oneDayInSecondsHUM)
        );
        updateInfoHUM();
    });
}

function initializeTimerControlsHUM() {
    timerControlsButtonsHUM = {
        startHUM: document.getElementById('startBtnHUM'),
        pauseHUM: document.getElementById('pauseBtnHUM'),
        stopHUM: document.getElementById('stopBtnHUM'),
    };

    setTimerControlsDisabledStateHUM(false, true, true);

    timerControlsButtonsHUM.startHUM.addEventListener('click', startTimerHUM);
    timerControlsButtonsHUM.pauseHUM.addEventListener('click', pauseTimerHUM);
    timerControlsButtonsHUM.stopHUM.addEventListener('click', stopTimerHUM);
}

function initializeStatusPanelHUM() {
    statusPanelHUM = {
        timeOverviewMessageHUM: document.getElementById('timeOverviewMessageHUM'),

        elapsedInIntervalBoxHUM: document.getElementById('elapsedInIntervalBoxHUM'),
        elapsedInBreakIntervalBoxHUM: document.getElementById('elapsedInBreakIntervalBoxHUM'),
        elapsedInIntervalHUM: document.getElementById('elapsedInIntervalHUM'),
        elapsedInBreakIntervalHUM: document.getElementById('elapsedInBreakIntervalHUM'),
        elapsedInBreakIntervalBox2HUM: document.getElementById('elapsedInBreakIntervalBox2HUM'),
        elapsedInBreakInterval2HUM: document.getElementById('elapsedInBreakInterval2HUM'),
        elapsedInBreakIntervalBox3HUM: document.getElementById('elapsedInBreakIntervalBox3HUM'),
        elapsedInBreakInterval3HUM: document.getElementById('elapsedInBreakInterval3HUM'),

        intervalsDoneHUM: document.getElementById('intervalsDoneHUM'),
    };
}

function setTimerControlsDisabledStateHUM(startHUM, pauseHUM, stopHUM) {
    timerControlsButtonsHUM.startHUM.disabled = startHUM;
    timerControlsButtonsHUM.pauseHUM.disabled = pauseHUM;
    timerControlsButtonsHUM.stopHUM.disabled = stopHUM;
}

function setFormDisabledStateHUM(disabled) {
    formSettingsFieldsHUM.intervalCountHUM.disabled = disabled;
    formSettingsFieldsHUM.intervalDurationHUM.disabled = disabled;
    formSettingsFieldsHUM.enableBreakHUM.disabled = disabled || timerSettingsHUM.intervalCountHUM === 1;
    formSettingsFieldsHUM.breakDurationHUM.disabled = disabled;
    formSettingsFieldsHUM.enableBreak2HUM.disabled = disabled
    formSettingsFieldsHUM.breakDuration2HUM.disabled = disabled;
    formSettingsFieldsHUM.enableBreak3HUM.disabled = disabled
    formSettingsFieldsHUM.breakDuration3HUM.disabled = disabled;
    minusBtnHUM.disabled = disabled;
    plusBtnHUM.disabled = disabled;
}

function startTimerHUM() {
    if (intHUM !== null) {
        clearInterval(intHUM);
    }
    setFormDisabledStateHUM(true);
    setTimerControlsDisabledStateHUM(true, true, true);
    setTimeout(() => {
        setTimerControlsDisabledStateHUM(true, false, true);
    }, 2000);
    timerControlsButtonsHUM.stopHUM.style.color = "rgb(177, 177, 177)";
    if (timerHUM.isBreak3HUM) {
        if (!ismuteHUM) {
            audioObjects.bell.muted = false;
            audioObjects.bell.play();
            setTimeout(() => {
                audioObjects.inhale.muted = false;
                audioObjects.inhale.play();
            }, 1500);
        }
        setTimeout(() => {
            HUMchangeBall(1.5, timerSettingsHUM.intervalDurationHUM);
        }, 1500);
    }
    if (!audioPlayerBRT.muted) {
        playSelectedSongBRT(true);
    }
    if (timerHUM.isFinishedHUM) {
        resetTimerHUM();
    }
    setTimeout(() => {
        setTimeout(() => {
            intHUM = setInterval(displayTimerHUM, 1000);
        }, 1000);
        startTimerTickHUM();
        if (HUMisPaused) {
            // Resume from paused state
            HUMstartTimer(HUMtimeRemaining);
            HUMisPaused = false;
        } else {
            // Start a new timer
            clearInterval(HUMcountdown);
            HUMtimeRemaining = HUMtimeInput.value === '∞' ? Infinity : parseInt(HUMtimeInput.value);
            HUMcountdownDisplay.textContent = '';
            HUMstartTimer(HUMtimeRemaining);
        }
    }, 1700);
    timerControlsButtonsHUM.startHUM.style.display = 'none';
    timerControlsButtonsHUM.pauseHUM.style.display = 'inline';
    document.getElementById('humSettings').disabled = true;
    document.getElementById('humSettings').style.color = 'rgb(177, 177, 177)';
    document.getElementById('HUMSave').disabled = true;
    document.getElementById('HUMSave').style.color = 'rgb(177, 177, 177)';
}
function HUMstartTimer(HUMduration) {
    HUMcountdown = setInterval(function () {
        if (HUMduration > 0 && HUMduration !== Infinity) {
            HUMduration--;
            HUMtimeRemaining = HUMduration;
            let HUMContdownminutes = Math.floor(HUMduration / 60);
            let HUMContdownseconds = HUMduration % 60;
            HUMcountdownDisplay.textContent = `${HUMContdownminutes}:${HUMContdownseconds.toString().padStart(2, '0')}`;
            HUMtimeInput.classList.add('CountdownHidden');
            HUMcountdownDisplay.classList.remove('CountdownHidden');
        } else if (HUMduration == Infinity) {
            HUMcountdownDisplay.textContent = '∞';
            HUMtimeInput.classList.add('CountdownHidden');
            HUMcountdownDisplay.classList.remove('CountdownHidden');
        }
    }, 1000);
}
function pauseTimerHUM() {
    clearInterval(intHUM);
    setTimerControlsDisabledStateHUM(false, true, false);
    document.getElementById('stopBtnHUM').style.color = '#990000';
    timerControlsButtonsHUM.pauseHUM.style.display = 'none';
    timerControlsButtonsHUM.startHUM.style.display = 'inline';
    document.getElementById('humSettings').disabled = false;
    document.getElementById('humSettings').style.color = '#49B79D';
    if (!audioPlayerBRT.muted) {
        audioPlayerBRT.pause();
    }
    stopTimerTickHUM();
    document.getElementById('HUMDate').value = date;
    document.getElementById('HUMSave').disabled = false;
    document.getElementById('HUMSave').style.color = '#49B79D';
    clearInterval(HUMcountdown);
    HUMisPaused = true;
    HUMchangeBall(1, 1);
}

function stopTimerHUM() {
    clearInterval(intHUM);
    [secondsHUM, minutesHUM, hoursHUM] = [0, 0, 0];
    timerRefHUM.value = '00 : 00 : 00';
    audioPlayerBRT.currentTime = 0
    timerControlsButtonsHUM.pauseHUM.style.display = 'none';
    timerControlsButtonsHUM.startHUM.style.display = 'inline';
    setFormDisabledStateHUM(false);
    setTimerControlsDisabledStateHUM(false, true, true);
    timerControlsButtonsHUM.stopHUM.style.color = "rgb(177, 177, 177)";
    document.getElementById('HUMSave').disabled = true;
    document.getElementById('HUMSave').style.color = 'rgb(177, 177, 177)';
    timerControlsButtonsHUM.startHUM.style.color = '#49B79D';
    stopTimerTickHUM();
    resetTimerHUM();
    clearInterval(HUMcountdown);
    HUMisPaused = false;
    HUMtimeInput.classList.remove('CountdownHidden');
    HUMcountdownDisplay.classList.add('CountdownHidden');
    HUMchangeBall(1, 1);
}

function displayTimerHUM() {
    secondsHUM++;
    if (secondsHUM == 60) {
        secondsHUM = 0;
        minutesHUM++;
        if (minutesHUM == 60) {
            minutesHUM = 0;
            hoursHUM++;
        }
    }
    let hHUM = hoursHUM < 10 ? "0" + hoursHUM : hoursHUM;
    let mHUM = minutesHUM < 10 ? "0" + minutesHUM : minutesHUM;
    let sHUM = secondsHUM < 10 ? "0" + secondsHUM : secondsHUM;
    timerRefHUM.value = `${hHUM} : ${mHUM} : ${sHUM}`;
}

function startTimerTickHUM() {
    timerHUM.intervalId = setInterval(onTimerTickHUM, 1000);
}

function stopTimerTickHUM() {
    clearInterval(timerHUM.intervalId);
}

function onTimerTickHUM() {
    const currentIntervalDurationHUM = timerHUM.isBreakHUM ? timerSettingsHUM.breakDurationHUM : timerHUM.isBreak2HUM ? timerSettingsHUM.breakDuration2HUM : timerHUM.isBreak4HUM ? timerSettingsHUM.breakDuration3HUM : timerSettingsHUM.intervalDurationHUM;
    if (timerHUM.elapsedInIntervalHUM <= currentIntervalDurationHUM && timerHUM.isBreak3HUM) {
        timerHUM.elapsedInIntervalHUM++;
        if (timerHUM.elapsedInIntervalHUM == currentIntervalDurationHUM && timerHUM.isBreak3HUM) {
            if (!ismuteHUM) {
                audioObjects.hold.muted = false;
                audioObjects.hold.play();
            }
            HUMchangeBall(1.0, timerSettingsHUM.breakDurationHUM);
        }
        if (timerHUM.elapsedInIntervalHUM > currentIntervalDurationHUM && timerHUM.isBreak3HUM) {
            timerHUM.isBreakHUM = true;
            timerHUM.isBreak3HUM = false;
            timerHUM.isFinishedHUM = timerHUM.intervalsDoneHUM === timerSettingsHUM.intervalCountHUM;
            if (!timerHUM.isFinishedHUM) {
                timerHUM.elapsedInIntervalHUM = 1;
            }
            if (timerHUM.isFinishedHUM) {
                setTimerControlsDisabledStateHUM(false, true, true);
                setFormDisabledStateHUM(false);
                stopTimerTickHUM();
            } else {
                timerHUM.totalTimeElapsedHUM++;
            }
            updateInfoHUM();
        }
        updateInfoHUM();
    } else if (timerHUM.elapsedInIntervalHUM <= currentIntervalDurationHUM && timerHUM.isBreakHUM) {
        timerHUM.elapsedInIntervalHUM++;
        if (timerHUM.elapsedInIntervalHUM == currentIntervalDurationHUM && timerHUM.isBreakHUM) {
            if (!ismuteHUM) {
                audioObjects.hum.muted = false;
                audioObjects.hum.loop = true;
                audioObjects.hum.play();
            }
            HUMchangeBall(0.5, timerSettingsHUM.breakDuration2HUM);
        }
        if (timerHUM.elapsedInIntervalHUM > currentIntervalDurationHUM && timerHUM.isBreakHUM) {
            timerHUM.isBreak2HUM = true;
            timerHUM.isBreakHUM = false;
            timerHUM.isFinishedHUM = timerHUM.intervalsDoneHUM === timerSettingsHUM.intervalCountHUM;
            if (!timerHUM.isFinishedHUM) {
                timerHUM.elapsedInIntervalHUM = 1;
            }
            if (timerHUM.isFinishedHUM) {
                setTimerControlsDisabledStateHUM(false, true, true);
                setFormDisabledStateHUM(false);
                stopTimerTickHUM();
            } else {
                timerHUM.totalTimeElapsedHUM++;
            }
            updateInfoHUM();
        }
        updateInfoHUM();
    } else if (timerHUM.elapsedInIntervalHUM <= currentIntervalDurationHUM && timerHUM.isBreak2HUM) {
        timerHUM.elapsedInIntervalHUM++;
        if (timerHUM.elapsedInIntervalHUM == currentIntervalDurationHUM && timerHUM.isBreak2HUM) {
            if (!ismuteHUM) {
                audioObjects.hum.pause();
                audioObjects.hum.currentTime = 0
                audioObjects.hold.muted = false;
                audioObjects.hold.play();
            }
            HUMchangeBall(0.5, timerSettingsHUM.breakDuration3HUM);
        }
        if (timerHUM.elapsedInIntervalHUM > currentIntervalDurationHUM && timerHUM.isBreak2HUM) {
            timerHUM.isBreak4HUM = true;
            timerHUM.isBreak2HUM = false;
            timerHUM.isFinishedHUM = timerHUM.intervalsDoneHUM === timerSettingsHUM.intervalCountHUM;
            if (!timerHUM.isFinishedHUM) {
                timerHUM.elapsedInIntervalHUM = 1;
            }
            if (timerHUM.isFinishedHUM) {
                setTimerControlsDisabledStateHUM(false, true, true);
                setFormDisabledStateHUM(false);
                stopTimerTickHUM();
            } else {
                timerHUM.totalTimeElapsedHUM++;
            }
            updateInfoHUM();
        }
        updateInfoHUM();
    } else if (timerHUM.elapsedInIntervalHUM <= currentIntervalDurationHUM && timerHUM.isBreak4HUM) {
        timerHUM.elapsedInIntervalHUM++;
        if (timerHUM.elapsedInIntervalHUM == currentIntervalDurationHUM && timerHUM.isBreak4HUM) {
            if (!ismuteHUM) {
                if (HUMcountdownDisplay.textContent == '0:00') {
                    audioObjects.inhale.muted = true;
                    clearInterval(HUMcountdown);
                    if (!ismuteHUM) {
                        audioObjects.bell.muted = false;
                        audioObjects.bell.play();
                    }
                    clearInterval(intHUM);
                    setTimerControlsDisabledStateHUM(true, true, false);
                    document.getElementById('stopBtnHUM').style.color = '#990000';
                    timerControlsButtonsHUM.pauseHUM.style.display = 'none';
                    timerControlsButtonsHUM.startHUM.style.display = 'inline';
                    timerControlsButtonsHUM.startHUM.style.color = "rgb(177, 177, 177)";
                    document.getElementById('humSettings').disabled = false;
                    document.getElementById('humSettings').style.color = '#49B79D';
                    if (!audioPlayerBRT.muted) {
                        audioPlayerBRT.pause();
                    }
                    stopTimerTickHUM();
                    document.getElementById('HUMDate').value = date;
                    document.getElementById('HUMSave').disabled = false;
                    document.getElementById('HUMSave').style.color = '#49B79D';
                    clearInterval(HUMcountdown);
                    HUMisPaused = false;
                    setTimeout(() => {
                        audioObjects.normalbreath.muted = false;
                        audioObjects.normalbreath.play();
                        if (isPortuguese) {
                            HUMballText.textContent = 'Respira\u00E7\u00E3o Normal';
                        } else {
                            HUMballText.textContent = 'Normal Breath';
                        }
                    }, 1000);
                } else {
                    audioObjects.inhale.muted = false;
                    audioObjects.inhale.play();
                }
            }
            HUMchangeBall(1.5, timerSettingsHUM.intervalDurationHUM);
        }
        if (timerHUM.elapsedInIntervalHUM > currentIntervalDurationHUM && timerHUM.isBreak4HUM) {
            timerHUM.isBreak3HUM = true;
            timerHUM.isBreak4HUM = false;
            timerHUM.intervalsDoneHUM++;
            timerHUM.isFinishedHUM = timerHUM.intervalsDoneHUM === timerSettingsHUM.intervalCountHUM;
            if (!timerHUM.isFinishedHUM) {
                timerHUM.elapsedInIntervalHUM = 1;
            }
            if (timerHUM.isFinishedHUM) {
                setTimerControlsDisabledStateHUM(false, true, true);
                setFormDisabledStateHUM(false);
                stopTimerTickHUM();
            } else {
                timerHUM.totalTimeElapsedHUM++;
            }
            updateInfoHUM();
        }
        updateInfoHUM();
    }
}

function updateInfoHUM() {
    statusPanelHUM.timeOverviewMessageHUM.style.display = timerHUM.isFinishedHUM ? 'block' : null;
    statusPanelHUM.elapsedInIntervalBoxHUM.style.display = timerHUM.isFinishedHUM || timerHUM.isBreakHUM || timerHUM.isBreak2HUM || timerHUM.isBreak4HUM ? 'none' : null;
    statusPanelHUM.elapsedInBreakIntervalBoxHUM.style.display = !timerHUM.isFinishedHUM && timerHUM.isBreakHUM ? 'block' : null;
    statusPanelHUM.elapsedInBreakIntervalBox2HUM.style.display = !timerHUM.isFinishedHUM && timerHUM.isBreak2HUM ? 'block' : null;
    statusPanelHUM.elapsedInBreakIntervalBox3HUM.style.display = !timerHUM.isFinishedHUM && timerHUM.isBreak4HUM ? 'block' : null;
    if (isPortuguese) {
        if (timerHUM.isBreakHUM) {
            HUMballText.textContent = 'SEGURE';
        } else if (timerHUM.isBreak2HUM) {
            HUMballText.textContent = 'ZUMBIDO';
        } else if (timerHUM.isBreak4HUM) {
            HUMballText.textContent = 'SEGURE';
        } else {
            HUMballText.textContent = 'INSPIRA';
        }
    } else {
        if (timerHUM.isBreakHUM) {
            HUMballText.textContent = 'HOLD';
        } else if (timerHUM.isBreak2HUM) {
            HUMballText.textContent = 'HUM';
        } else if (timerHUM.isBreak4HUM) {
            HUMballText.textContent = 'HOLD';
        } else {
            HUMballText.textContent = 'INHALE';
        }
    }
    statusPanelHUM.intervalsDoneHUM.value = timerHUM.intervalsDoneHUM;
}
//---------------------------------------------------//