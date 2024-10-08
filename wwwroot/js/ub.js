﻿/*UB JS*/
var isUBon = false;
const UBball = document.getElementById('UBball');
const UBballText = document.getElementById('UBballText');

function UBchangeBall(scale, duration) {
    UBball.style.transition = `transform ${duration}s ease`;
    UBball.style.transform = `scale(${scale})`;
}

const UBtimeInput = document.getElementById('UBtimeInput');
const UBcountdownDisplay = document.getElementById('UBcountdownDisplay');
let UBcountdown;
let UBtimeRemaining = Infinity;
let UBisPaused = false;

// Populate the dropdown with options
for (let UBi = 2; UBi <= 60; UBi++) { // assuming 1 to 60 minutes
    let UBoption = document.createElement('option');
    UBoption.value = UBi * 60;
    if (isPortuguese) {
        UBoption.textContent = UBi + ' minutos';
    } else {
        UBoption.textContent = UBi + ' minutes';
    }
    UBtimeInput.appendChild(UBoption);
}

//UB Modal
const modalUB = document.getElementById("myModalUB");
const closeModalUBButton = document.getElementById("closeModalUB");
var UBquestion = document.getElementById("UBquestion");

function openModalUB() {
    modalUB.style.display = "block";
    showSlides(slideIndex, 'UBslides');
}

// Function to close the modalUB
function closeModalUB() {
    modalUB.style.display = "none";
    slideIndex = 1;

}

// Event listener for closing the modalUB
closeModalUBButton.addEventListener("click", closeModalUB);

// Close the modalUB if the user clicks outside the modalUB content
window.addEventListener("click", function (event) {
    if (event.target === modalUB) {
        closeModalUB();
    }
});
UBquestion.onclick = function () {
    openModalUB();
}

UBLink.onclick = function () {
    openPage(PRANAPage, UBPage, 'slideLeft');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    backUB.style.display = "block";
    backPRANA.style.display = "none";
    audioObjects.exhale.load();
    audioObjects.inhale.load();
    audioObjects.hold.load();
    audioObjects.normalbreath.load();
}
backUB.onclick = function () {
    openPage(UBPage, PRANAPage, 'slideRight');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    backPRANA.style.display = "block";
    backUB.style.display = "none";
    UBclose();
}
UBSettings.onclick = function () {
    openPage(UBPage, UBSettingsPage, 'slideLeft');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    selectSongsList.style.display = "block";
    backUBSet.style.display = "block";
    backUB.style.display = "none";
}
backUBSet.onclick = function () {
    if (!audioPlayerBRT.muted) {
        audioPlayerBRT.pause();
    }
    audioPlayerBRT.currentTime = 0;
    openPage(UBSettingsPage, UBPage, 'slideRight');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    selectSongsList.style.display = "none";
    backUB.style.display = "block";
    backUBSet.style.display = "none";
}

// Function to close the modal
function UBclose() {
    isUBon = false;
    clearInterval(intUB);
    [secondsUB, minutesUB, hoursUB] = [0, 0, 0];
    timerRefUB.value = '00 : 00 : 00';
    if (!audioPlayerBRT.muted) {
        audioPlayerBRT.pause();
    }
    audioPlayerBRT.currentTime = 0;
    timerControlsButtonsUB.pauseUB.style.display = 'none';
    timerControlsButtonsUB.startUB.style.display = 'inline';
    setFormDisabledStateUB(false);
    setTimerControlsDisabledStateUB(false, true, true);
    timerControlsButtonsUB.stopUB.style.color = "rgb(177, 177, 177)";
    document.getElementById('UBSave').disabled = true;
    document.getElementById('UBSave').style.color = 'rgb(177, 177, 177)';
    document.getElementById('UBSettings').disabled = false;
    document.getElementById('UBSettings').style.color = '#49B79D';
    stopTimerTickUB();
    resetTimerUB();
    isUBON = false;
    document.getElementById('UBResultSaved').innerHTML = "";
    clearInterval(UBcountdown);
    UBisPaused = false;
    UBtimeInput.classList.remove('CountdownHidden');
    UBcountdownDisplay.classList.add('CountdownHidden');
    UBchangeBall(1, 1);
}
$(function () {
    $('#UBForm').on('submit', function (e) {
        e.preventDefault(); // Prevent the default form submission

        var formData = new FormData(this); // Get the form data

        $.ajax({
            url: "/",
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function (result) {
                $('#UBResultSaved').html(result); // Update the result section with the server response
            }
        });
        clearInterval(intUB);
        [secondsUB, minutesUB, hoursUB] = [0, 0, 0];
        timerRefUB.value = '00 : 00 : 00';
        audioPlayerBRT.currentTime = 0
        timerControlsButtonsUB.pauseUB.style.display = 'none';
        timerControlsButtonsUB.startUB.style.display = 'inline';
        timerControlsButtonsUB.startUB.style.color = "#0661AA";
        setFormDisabledStateUB(false);
        setTimerControlsDisabledStateUB(false, true, true);
        timerControlsButtonsUB.stopUB.style.color = "rgb(177, 177, 177)";
        document.getElementById('UBSave').disabled = true;
        document.getElementById('UBSave').style.color = 'rgb(177, 177, 177)';
        stopTimerTickUB();
        resetTimerUB();
        UBtimeInput.classList.remove('CountdownHidden');
        UBcountdownDisplay.classList.add('CountdownHidden');
    });
});

let
    formSettingsFieldsUB,
    timerControlsButtonsUB,
    statusPanelUB,
    timerUB,
    timerSettingsUB;

function setTimerSettingsUB(
    intervalCountUB = timerSettingsUB.intervalCountUB,
    intervalDurationUB = timerSettingsUB.intervalDurationUB,
    enableBreakUB = timerSettingsUB.enableBreakUB,
    breakDurationUB = timerSettingsUB.breakDurationUB,
    enableBreak2UB = timerSettingsUB.enableBreak2UB,
    breakDuration2UB = timerSettingsUB.breakDuration2UB,
    enableBreak3UB = timerSettingsUB.enableBreak3UB,
    breakDuration3UB = timerSettingsUB.breakDuration3UB
) {
    timerSettingsUB = {
        intervalCountUB,
        intervalDurationUB,
        enableBreakUB,
        breakDurationUB,
        enableBreak2UB,
        breakDuration2UB,
        enableBreak3UB,
        breakDuration3UB
    };
}

function resetTimerUB() {
    timerUB = {
        totalTimeElapsedUB: 0,
        elapsedInIntervalUB: 0,
        intervalsDoneUB: 0,
        isBreak3UB: true,
        isBreakUB: false,
        isBreak2UB: false,
        isBreak4UB: false,
        isFinishedUB: false
    };
    updateInfoUB();
}

let [secondsUB, minutesUB, hoursUB] = [0, 0, 0];
let timerRefUB = document.getElementById('timerDisplayUB');
let intUB = null;
document.getElementById('stopBtnUB').disabled = true;
document.getElementById('stopBtnUB').style.color = 'rgb(177, 177, 177)';
document.getElementById('UBSave').disabled = true;
document.getElementById('UBSave').style.color = 'rgb(177, 177, 177)';

var audioUB = document.getElementById("audioUB"),
    muteUB = document.getElementById("muteUB"),
    ismuteUB = false;

var audioSongUB = document.getElementById("songUB"),
    muteSongUB = document.getElementById("songMuteUB");
// Get the volumeVUB bar element
const volumeVoiceUB = document.getElementById('volumeVoiceUB');

// Add an event listener for the volumeVUB change event
volumeVoiceUB.addEventListener('input', function () {
    // Get the current volumeVUB value
    const volumeVUB = parseFloat(volumeVoiceUB.value);

    // Check if volumeVUB is 0 and mute the media if necessary
    if (volumeVUB === 0) {
        audioObjects.inhale.muted = true;
        audioObjects.exhale.muted = true;
        audioObjects.hold.muted = true;
        audioUB.style.display = "none";
        muteUB.style.display = "block";
        ismuteUB = true;
    } else {
        audioObjects.inhale.muted = false;
        audioObjects.exhale.muted = false;
        audioObjects.hold.muted = false;
        muteUB.style.display = "none";
        audioUB.style.display = "block";
        ismuteUB = false;
    }
});
// Get the volumeSUB bar element
const volumeSongUB = document.getElementById('volumeSongUB');

// Add an event listener for the volumeSUB change event
volumeSongUB.addEventListener('input', function () {
    // Get the current volumeSUB value
    const volumeSUB = parseFloat(volumeSongUB.value);

    // Check if volumeSUB is 0 and mute the media if necessary
    if (volumeSUB === 0) {
        audioPlayerBRT.muted = true;
        audioSongUB.style.display = "none";
        muteSongUB.style.display = "block";
    } else {
        audioPlayerBRT.muted = false;
        muteSongUB.style.display = "none";
        audioSongUB.style.display = "block";
    }
});


var inhaleUB = 4;
var holdUB = inhaleUB / 2;
var exhaleUB = inhaleUB;
var hold2UB = inhaleUB / 2;
setTimerSettingsUB(9999, inhaleUB, true, holdUB, true, exhaleUB, true, hold2UB);
initializeTimerControlsUB();
initializeStatusPanelUB();
initializeTimerSettingsFormUB();
resetTimerUB();


var minusBtnUB = document.getElementById("minusUB"),
    plusBtnUB = document.getElementById("plusUB"),
    numberUB = 4, /// numberUB value
    minUB = 4, /// minUB numberUB
    maxUB = 30;

minusBtnUB.onclick = function () {
    if (numberUB > minUB) {
        numberUB = numberUB - 2; /// Minus 1 of the numberUB
        formSettingsFieldsUB.intervalDurationUB.value = numberUB; /// Display the value in place of the numberUB
        //fix here to change pranayama type
        formSettingsFieldsUB.breakDurationUB.value = formSettingsFieldsUB.intervalDurationUB.value / 2;
        formSettingsFieldsUB.breakDuration2UB.value = formSettingsFieldsUB.intervalDurationUB.value;
        formSettingsFieldsUB.breakDuration3UB.value = formSettingsFieldsUB.intervalDurationUB.value / 2;
        setTimerSettingsUB(9999, formSettingsFieldsUB.intervalDurationUB.value, true, formSettingsFieldsUB.breakDurationUB.value, true, formSettingsFieldsUB.breakDuration2UB.value, true, formSettingsFieldsUB.breakDuration3UB.value);
    }
}

plusBtnUB.onclick = function () {
    if (numberUB < maxUB) {
        numberUB = numberUB + 2;
        formSettingsFieldsUB.intervalDurationUB.value = numberUB; /// Display the value in place of the numberUB
        //fix here to change pranayama type
        formSettingsFieldsUB.breakDurationUB.value = formSettingsFieldsUB.intervalDurationUB.value / 2;
        formSettingsFieldsUB.breakDuration2UB.value = formSettingsFieldsUB.intervalDurationUB.value;
        formSettingsFieldsUB.breakDuration3UB.value = formSettingsFieldsUB.intervalDurationUB.value / 2;
        setTimerSettingsUB(9999, formSettingsFieldsUB.intervalDurationUB.value, true, formSettingsFieldsUB.breakDurationUB.value, true, formSettingsFieldsUB.breakDuration2UB.value, true, formSettingsFieldsUB.breakDuration3UB.value);

    }
}

function initializeTimerSettingsFormUB() {
    const oneDayInSecondsBRE = 60 * 60 * 24;
    let lastUserSetEnableBreakUB = timerSettingsUB.enableBreakUB;
    let lastUserSetEnableBreak2UB = timerSettingsUB.enableBreak2UB;
    let lastUserSetEnableBreak3UB = timerSettingsUB.enableBreak3UB;

    formSettingsFieldsUB = {
        intervalCountUB: document.getElementById('intervalCountInputUB'),
        intervalDurationUB: document.getElementById('intervalDurationInputUB'),
        enableBreakUB: document.getElementById('enableBreakInputUB'),
        breakDurationUB: document.getElementById('breakDurationInputUB'),
        enableBreak2UB: document.getElementById('enableBreakInput2UB'),
        breakDuration2UB: document.getElementById('breakDurationInput2UB'),
        enableBreak3UB: document.getElementById('enableBreakInput3UB'),
        breakDuration3UB: document.getElementById('breakDurationInput3UB'),
    };

    formSettingsFieldsUB.intervalCountUB.value = timerSettingsUB.intervalCountUB;
    formSettingsFieldsUB.intervalDurationUB.value = timerSettingsUB.intervalDurationUB;
    formSettingsFieldsUB.enableBreakUB.checked = timerSettingsUB.enableBreakUB;
    formSettingsFieldsUB.breakDurationUB.value = timerSettingsUB.breakDurationUB;
    formSettingsFieldsUB.enableBreak2UB.checked = timerSettingsUB.enableBreak2UB;
    formSettingsFieldsUB.breakDuration2UB.value = timerSettingsUB.breakDuration2UB;
    formSettingsFieldsUB.enableBreak3UB.checked = timerSettingsUB.enableBreak3UB;
    formSettingsFieldsUB.breakDuration3UB.value = timerSettingsUB.breakDuration3UB;

    function getNumberInBoundsOrDefaultUB(value, minUB, maxUB, def = 1) {
        const valueAsNumberUB = parseInt(value);
        return isNaN(valueAsNumberUB) ? def : Math.max(minUB, Math.min(valueAsNumberUB, maxUB));
    }

    function setBreakDurationLineDisplayUB(displayed) {
        const breakDurationInputLineEltUB = document.getElementById('breakDurationInputLineUB');
        breakDurationInputLineEltUB.style.display = displayed ? null : 'none';
        const breakDurationInputLineElt2UB = document.getElementById('breakDurationInputLine2UB');
        breakDurationInputLineElt2UB.style.display = displayed ? null : 'none';
        const breakDurationInputLineElt3UB = document.getElementById('breakDurationInputLine3UB');
        breakDurationInputLineElt3UB.style.display = displayed ? null : 'none';
    }

    formSettingsFieldsUB.intervalCountUB.addEventListener('input', () => {
        const intervalCountUB = getNumberInBoundsOrDefaultUB(formSettingsFieldsUB.intervalCountUB.value, 1, 9999),
            hasOneIntervalUB = intervalCountUB === 1,
            hasBreakUB = hasOneIntervalUB ? false : lastUserSetEnableBreakUB;

        formSettingsFieldsUB.enableBreakUB.disabled = hasOneIntervalUB === true;
        formSettingsFieldsUB.enableBreakUB.checked = hasBreakUB;

        setBreakDurationLineDisplayUB(hasBreakUB);

        setTimerSettingsUB(intervalCountUB, undefined, hasBreakUB);
        updateInfoUB();
    });

    formSettingsFieldsUB.intervalDurationUB.addEventListener('input', () => {
        setTimerSettingsUB(undefined, getNumberInBoundsOrDefaultUB(formSettingsFieldsUB.intervalDurationUB.value, 1, oneDayInSecondsBRE));
        updateInfoUB();
    });

    formSettingsFieldsUB.enableBreakUB.addEventListener('change', () => {
        const enableBreakUB = formSettingsFieldsUB.enableBreakUB.checked;

        lastUserSetEnableBreakUB = enableBreakUB;
        setBreakDurationLineDisplayUB(enableBreakUB);
        setTimerSettingsUB(undefined, undefined, enableBreakUB);
        updateInfoUB();
    });

    formSettingsFieldsUB.breakDurationUB.addEventListener('input', () => {
        setTimerSettingsUB(undefined, undefined, undefined,
            getNumberInBoundsOrDefaultUB(formSettingsFieldsUB.breakDurationUB.value, 1, oneDayInSecondsBRE)
        );
        updateInfoUB();
    });

    formSettingsFieldsUB.enableBreak2UB.addEventListener('change', () => {
        const enableBreak2UB = formSettingsFieldsUB.enableBreak2UB.checked;

        lastUserSetEnableBreak2UB = enableBreak2UB;
        setBreakDurationLineDisplayUB(enableBreak2UB);
        setTimerSettingsUB(undefined, undefined, undefined, undefined, enableBreak2UB);
        updateInfoUB();
    });

    formSettingsFieldsUB.breakDuration2UB.addEventListener('input', () => {
        setTimerSettingsUB(undefined, undefined, undefined, undefined, undefined,
            getNumberInBoundsOrDefaultUB(formSettingsFieldsUB.breakDuration2UB.value, 1, oneDayInSecondsBRE)
        );
        updateInfoUB();
    });

    formSettingsFieldsUB.enableBreak3UB.addEventListener('change', () => {
        const enableBreak3UB = formSettingsFieldsUB.enableBreak3UB.checked;

        lastUserSetEnableBreak3UB = enableBreak2UB;
        setBreakDurationLineDisplayUB(enableBreak3UB);
        setTimerSettingsUB(undefined, undefined, undefined, undefined, undefined, undefined, enableBreak3UB);
        updateInfoUB();
    });

    formSettingsFieldsUB.breakDuration3UB.addEventListener('input', () => {
        setTimerSettingsUB(
            undefined, undefined, undefined, undefined, undefined, undefined, undefined,
            getNumberInBoundsOrDefaultUB(formSettingsFieldsUB.breakDuration3UB.value, 1, oneDayInSecondsBRE)
        );
        updateInfoUB();
    });
}

function initializeTimerControlsUB() {
    timerControlsButtonsUB = {
        startUB: document.getElementById('startBtnUB'),
        pauseUB: document.getElementById('pauseBtnUB'),
        stopUB: document.getElementById('stopBtnUB'),
    };

    setTimerControlsDisabledStateUB(false, true, true);

    timerControlsButtonsUB.startUB.addEventListener('click', startTimerUB);
    timerControlsButtonsUB.pauseUB.addEventListener('click', pauseTimerUB);
    timerControlsButtonsUB.stopUB.addEventListener('click', stopTimerUB);
}

function initializeStatusPanelUB() {
    statusPanelUB = {
        timeOverviewMessageUB: document.getElementById('timeOverviewMessageUB'),

        elapsedInIntervalBoxUB: document.getElementById('elapsedInIntervalBoxUB'),
        elapsedInBreakIntervalBoxUB: document.getElementById('elapsedInBreakIntervalBoxUB'),
        elapsedInIntervalUB: document.getElementById('elapsedInIntervalUB'),
        elapsedInBreakIntervalUB: document.getElementById('elapsedInBreakIntervalUB'),
        elapsedInBreakIntervalBox2UB: document.getElementById('elapsedInBreakIntervalBox2UB'),
        elapsedInBreakInterval2UB: document.getElementById('elapsedInBreakInterval2UB'),
        elapsedInBreakIntervalBox3UB: document.getElementById('elapsedInBreakIntervalBox3UB'),
        elapsedInBreakInterval3UB: document.getElementById('elapsedInBreakInterval3UB'),

        intervalsDoneUB: document.getElementById('intervalsDoneUB'),
    };
}

function setTimerControlsDisabledStateUB(startUB, pauseUB, stopUB) {
    timerControlsButtonsUB.startUB.disabled = startUB;
    timerControlsButtonsUB.pauseUB.disabled = pauseUB;
    timerControlsButtonsUB.stopUB.disabled = stopUB;
}

function setFormDisabledStateUB(disabled) {
    formSettingsFieldsUB.intervalCountUB.disabled = disabled;
    formSettingsFieldsUB.intervalDurationUB.disabled = disabled;
    formSettingsFieldsUB.enableBreakUB.disabled = disabled || timerSettingsUB.intervalCountUB === 1;
    formSettingsFieldsUB.breakDurationUB.disabled = disabled;
    formSettingsFieldsUB.enableBreak2UB.disabled = disabled
    formSettingsFieldsUB.breakDuration2UB.disabled = disabled;
    formSettingsFieldsUB.enableBreak3UB.disabled = disabled
    formSettingsFieldsUB.breakDuration3UB.disabled = disabled;
    minusBtnUB.disabled = disabled;
    plusBtnUB.disabled = disabled;
}

function startTimerUB() {
    requestWakeLock();
    isUBon = true;
    if (intUB !== null) {
        clearInterval(intUB);
    }
    setFormDisabledStateUB(true);
    setTimerControlsDisabledStateUB(true, true, true);
    setTimeout(() => {
        setTimerControlsDisabledStateUB(true, false, true);
    }, 2000);
    timerControlsButtonsUB.stopUB.style.color = "rgb(177, 177, 177)";
    if (timerUB.isBreak3UB) {
        if (!ismuteUB) {
            audioObjects.bell.muted = false;
            audioObjects.bell.play();
            setTimeout(() => {
                audioObjects.inhale.muted = false;
                audioObjects.inhale.play();
            }, 1500);
        }
        setTimeout(() => {
            UBchangeBall(1.5, timerSettingsUB.intervalDurationUB);
        }, 1500);
    }
    if (!audioPlayerBRT.muted) {
        playSelectedSongBRT(true);
    }
    if (timerUB.isFinishedUB) {
        resetTimerUB();
    }
    setTimeout(() => {
        setTimeout(() => {
            intUB = setInterval(displayTimerUB, 1000);
        }, 1000);
        startTimerTickUB();
        if (UBisPaused) {
            // Resume from paused state
            UBstartTimer(UBtimeRemaining);
            UBisPaused = false;
        } else {
            // Start a new timer
            clearInterval(UBcountdown);
            UBtimeRemaining = UBtimeInput.value === '∞' ? Infinity : parseInt(UBtimeInput.value);
            UBcountdownDisplay.textContent = '';
            UBstartTimer(UBtimeRemaining);
        }
    }, 1700);
    timerControlsButtonsUB.startUB.style.display = 'none';
    timerControlsButtonsUB.pauseUB.style.display = 'inline';
    document.getElementById('UBSettings').disabled = true;
    document.getElementById('UBSettings').style.color = 'rgb(177, 177, 177)';
    document.getElementById('UBSave').disabled = true;
    document.getElementById('UBSave').style.color = 'rgb(177, 177, 177)';
}
function UBstartTimer(UBduration) {
    UBcountdown = setInterval(function () {
        if (UBduration > 0 && UBduration !== Infinity) {
            UBduration--;
            UBtimeRemaining = UBduration;
            let UBContdownminutes = Math.floor(UBduration / 60);
            let UBContdownseconds = UBduration % 60;
            UBcountdownDisplay.textContent = `${UBContdownminutes}:${UBContdownseconds.toString().padStart(2, '0')}`;
            UBtimeInput.classList.add('CountdownHidden');
            UBcountdownDisplay.classList.remove('CountdownHidden');
        } else if (UBduration == Infinity) {
            UBcountdownDisplay.textContent = '∞';
            UBtimeInput.classList.add('CountdownHidden');
            UBcountdownDisplay.classList.remove('CountdownHidden');
        }
    }, 1000);
}
function pauseTimerUB() {
    isUBon = false;
    clearInterval(intUB);
    setTimerControlsDisabledStateUB(false, true, false);
    document.getElementById('stopBtnUB').style.color = '#990000';
    timerControlsButtonsUB.pauseUB.style.display = 'none';
    timerControlsButtonsUB.startUB.style.display = 'inline';
    document.getElementById('UBSettings').disabled = false;
    document.getElementById('UBSettings').style.color = '#49B79D';
    if (!audioPlayerBRT.muted) {
        audioPlayerBRT.pause();
    }
    stopTimerTickUB();
    document.getElementById('UBDate').value = date;
    document.getElementById('UBSave').disabled = false;
    document.getElementById('UBSave').style.color = '#49B79D';
    clearInterval(UBcountdown);
    UBisPaused = true;
    UBchangeBall(1, 1);
}

function stopTimerUB() {
    isUBon = false;
    clearInterval(intUB);
    [secondsUB, minutesUB, hoursUB] = [0, 0, 0];
    timerRefUB.value = '00 : 00 : 00';
    audioPlayerBRT.currentTime = 0
    timerControlsButtonsUB.pauseUB.style.display = 'none';
    timerControlsButtonsUB.startUB.style.display = 'inline';
    setFormDisabledStateUB(false);
    setTimerControlsDisabledStateUB(false, true, true);
    timerControlsButtonsUB.stopUB.style.color = "rgb(177, 177, 177)";
    document.getElementById('UBSave').disabled = true;
    document.getElementById('UBSave').style.color = 'rgb(177, 177, 177)';
    stopTimerTickUB();
    resetTimerUB();
    timerControlsButtonsUB.startUB.style.color = '#49B79D';
    clearInterval(UBcountdown);
    UBisPaused = false;
    UBtimeInput.classList.remove('CountdownHidden');
    UBcountdownDisplay.classList.add('CountdownHidden');
    UBchangeBall(1, 1);
}

function displayTimerUB() {
    secondsUB++;
    if (secondsUB == 60) {
        secondsUB = 0;
        minutesUB++;
        if (minutesUB == 60) {
            minutesUB = 0;
            hoursUB++;
        }
    }
    let hUB = hoursUB < 10 ? "0" + hoursUB : hoursUB;
    let mUB = minutesUB < 10 ? "0" + minutesUB : minutesUB;
    let sUB = secondsUB < 10 ? "0" + secondsUB : secondsUB;
    timerRefUB.value = `${hUB} : ${mUB} : ${sUB}`;
}

function startTimerTickUB() {
    timerUB.intervalId = setInterval(onTimerTickUB, 1000);
}

function stopTimerTickUB() {
    clearInterval(timerUB.intervalId);
}

function onTimerTickUB() {
    const currentIntervalDurationUB = timerUB.isBreakUB ? timerSettingsUB.breakDurationUB : timerUB.isBreak2UB ? timerSettingsUB.breakDuration2UB : timerUB.isBreak4UB ? timerSettingsUB.breakDuration3UB : timerSettingsUB.intervalDurationUB;
    if (timerUB.elapsedInIntervalUB <= currentIntervalDurationUB && timerUB.isBreak3UB) {
        timerUB.elapsedInIntervalUB++;
        if (timerUB.elapsedInIntervalUB == currentIntervalDurationUB && timerUB.isBreak3UB) {
            if (!ismuteUB) {
                audioObjects.hold.muted = false;
                audioObjects.hold.play();
            }
            UBchangeBall(1.3, timerSettingsUB.breakDurationUB);
        }
        if (timerUB.elapsedInIntervalUB > currentIntervalDurationUB && timerUB.isBreak3UB) {
            timerUB.isBreakUB = true;
            timerUB.isBreak3UB = false;
            timerUB.isFinishedUB = timerUB.intervalsDoneUB === timerSettingsUB.intervalCountUB;
            if (!timerUB.isFinishedUB) {
                timerUB.elapsedInIntervalUB = 1;
            }
            if (timerUB.isFinishedUB) {
                setTimerControlsDisabledStateUB(false, true, true);
                setFormDisabledStateUB(false);
                stopTimerTickUB();
            } else {
                timerUB.totalTimeElapsedUB++;
            }
            updateInfoUB();
        }
        updateInfoUB();
    } else if (timerUB.elapsedInIntervalUB <= currentIntervalDurationUB && timerUB.isBreakUB) {
        timerUB.elapsedInIntervalUB++;
        if (timerUB.elapsedInIntervalUB == currentIntervalDurationUB && timerUB.isBreakUB) {
            if (!ismuteUB) {
                audioObjects.exhale.muted = false;
                audioObjects.exhale.play();
            }
            UBchangeBall(0.5, timerSettingsUB.breakDuration2UB);
        }
        if (timerUB.elapsedInIntervalUB > currentIntervalDurationUB && timerUB.isBreakUB) {
            timerUB.isBreak2UB = true;
            timerUB.isBreakUB = false;
            timerUB.isFinishedUB = timerUB.intervalsDoneUB === timerSettingsUB.intervalCountUB;
            if (!timerUB.isFinishedUB) {
                timerUB.elapsedInIntervalUB = 1;
            }
            if (timerUB.isFinishedUB) {
                setTimerControlsDisabledStateUB(false, true, true);
                setFormDisabledStateUB(false);
                stopTimerTickUB();
            } else {
                timerUB.totalTimeElapsedUB++;
            }
            updateInfoUB();
        }
        updateInfoUB();
    } else if (timerUB.elapsedInIntervalUB <= currentIntervalDurationUB && timerUB.isBreak2UB) {
        timerUB.elapsedInIntervalUB++;
        if (timerUB.elapsedInIntervalUB == currentIntervalDurationUB && timerUB.isBreak2UB) {
            if (!ismuteUB) {
                audioObjects.hold.muted = false;
                audioObjects.hold.play();
            }
            UBchangeBall(0.5, timerSettingsUB.breakDuration3UB);
        }
        if (timerUB.elapsedInIntervalUB > currentIntervalDurationUB && timerUB.isBreak2UB) {
            timerUB.isBreak4UB = true;
            timerUB.isBreak2UB = false;
            timerUB.isFinishedUB = timerUB.intervalsDoneUB === timerSettingsUB.intervalCountUB;
            if (!timerUB.isFinishedUB) {
                timerUB.elapsedInIntervalUB = 1;
            }
            if (timerUB.isFinishedUB) {
                setTimerControlsDisabledStateUB(false, true, true);
                setFormDisabledStateUB(false);
                stopTimerTickUB();
            } else {
                timerUB.totalTimeElapsedUB++;
            }
            updateInfoUB();
        }
        updateInfoUB();
    } else if (timerUB.elapsedInIntervalUB <= currentIntervalDurationUB && timerUB.isBreak4UB) {
        timerUB.elapsedInIntervalUB++;
        if (timerUB.elapsedInIntervalUB == currentIntervalDurationUB && timerUB.isBreak4UB) {
            if (!ismuteUB) {
                if (UBcountdownDisplay.textContent == '0:00') {
                    audioObjects.inhale.muted = true;
                    clearInterval(UBcountdown);
                    if (!ismuteUB) {
                        audioObjects.bell.muted = false;
                        audioObjects.bell.play();
                    }
                    clearInterval(intUB);
                    setTimerControlsDisabledStateUB(true, true, false);
                    document.getElementById('stopBtnUB').style.color = '#990000';
                    timerControlsButtonsUB.pauseUB.style.display = 'none';
                    timerControlsButtonsUB.startUB.style.display = 'inline';
                    timerControlsButtonsUB.startUB.style.color = "rgb(177, 177, 177)";
                    document.getElementById('UBSettings').disabled = false;
                    document.getElementById('UBSettings').style.color = '#49B79D';
                    if (!audioPlayerBRT.muted) {
                        audioPlayerBRT.pause();
                    }
                    stopTimerTickUB();
                    document.getElementById('UBDate').value = date;
                    document.getElementById('UBSave').disabled = false;
                    document.getElementById('UBSave').style.color = '#49B79D';
                    clearInterval(UBcountdown);
                    UBisPaused = false;
                    setTimeout(() => {
                        audioObjects.normalbreath.muted = false;
                        audioObjects.normalbreath.play();
                        if (isPortuguese) {
                            UBballText.textContent = 'Respira\u00E7\u00E3o Normal';
                        } else {
                            UBballText.textContent = 'Normal Breath';
                        }
                    }, 1000);
                } else {
                    audioObjects.inhale.muted = false;
                    audioObjects.inhale.play();
                }
            }
            UBchangeBall(1.5, timerSettingsUB.intervalDurationUB);
        }
        if (timerUB.elapsedInIntervalUB > currentIntervalDurationUB && timerUB.isBreak4UB) {
            timerUB.isBreak3UB = true;
            timerUB.isBreak4UB = false;
            timerUB.intervalsDoneUB++;
            timerUB.isFinishedUB = timerUB.intervalsDoneUB === timerSettingsUB.intervalCountUB;
            if (!timerUB.isFinishedUB) {
                timerUB.elapsedInIntervalUB = 1;
            }
            if (timerUB.isFinishedUB) {
                setTimerControlsDisabledStateUB(false, true, true);
                setFormDisabledStateUB(false);
                stopTimerTickUB();
            } else {
                timerUB.totalTimeElapsedUB++;
            }
            updateInfoUB();
        }
        updateInfoUB();
    }
}

function updateInfoUB() {
    statusPanelUB.timeOverviewMessageUB.style.display = timerUB.isFinishedUB ? 'block' : null;
    statusPanelUB.elapsedInIntervalBoxUB.style.display = timerUB.isFinishedUB || timerUB.isBreakUB || timerUB.isBreak2UB || timerUB.isBreak4UB ? 'none' : null;
    statusPanelUB.elapsedInBreakIntervalBoxUB.style.display = !timerUB.isFinishedUB && timerUB.isBreakUB ? 'block' : null;
    statusPanelUB.elapsedInBreakIntervalBox2UB.style.display = !timerUB.isFinishedUB && timerUB.isBreak2UB ? 'block' : null;
    statusPanelUB.elapsedInBreakIntervalBox3UB.style.display = !timerUB.isFinishedUB && timerUB.isBreak4UB ? 'block' : null;
    if (isPortuguese) {
        if (timerUB.isBreakUB) {
            UBballText.textContent = 'SEGURE';
        } else if (timerUB.isBreak2UB) {
            UBballText.textContent = 'EXPIRA';
        } else if (timerUB.isBreak4UB) {
            UBballText.textContent = 'SEGURE';
        } else {
            UBballText.textContent = 'INSPIRA';
        }
    } else {
        if (timerUB.isBreakUB) {
            UBballText.textContent = 'HOLD';
        } else if (timerUB.isBreak2UB) {
            UBballText.textContent = 'EXHALE';
        } else if (timerUB.isBreak4UB) {
            UBballText.textContent = 'HOLD';
        } else {
            UBballText.textContent = 'INHALE';
        }
    }
    statusPanelUB.intervalsDoneUB.value = timerUB.intervalsDoneUB;

}

//---------------------------------------------------//
