/*478 JS*/
var isRBon = false;
const RBball = document.getElementById('RBball');
const RBballText = document.getElementById('RBballText');

function RBchangeBall(scale, duration) {
    RBball.style.transition = `transform ${duration}s ease`;
    RBball.style.transform = `scale(${scale})`;
}

const RBtimeInput = document.getElementById('RBtimeInput');
const RBcountdownDisplay = document.getElementById('RBcountdownDisplay');
let RBcountdown;
let RBtimeRemaining = Infinity;
let RBisPaused = false;
// Populate the dropdown with options
for (let RBi = 2; RBi <= 60; RBi++) { // assuming 1 to 60 minutes
    let RBoption = document.createElement('option');
    RBoption.value = RBi * 60;
    if (isPortuguese) {
        RBoption.textContent = RBi + ' minutos';
    } else {
        RBoption.textContent = RBi + ' minutes';
    }
    RBtimeInput.appendChild(RBoption);
}

//RB Modal
const modalRB = document.getElementById("myModalRB");
const closeModalRBButton = document.getElementById("closeModalRB");
var RBquestion = document.getElementById("RBquestion");

function openModalRB() {
    modalRB.style.display = "block";
    showSlides(slideIndex, 'RBslides');
}

// Function to close the modalRB
function closeModalRB() {
    modalRB.style.display = "none";
    slideIndex = 1;

}

// Event listener for closing the modalRB
closeModalRBButton.addEventListener("click", closeModalRB);

// Close the modalRB if the user clicks outside the modalRB content
window.addEventListener("click", function (event) {
    if (event.target === modalRB) {
        closeModalRB();
    }
});
RBquestion.onclick = function () {
    openModalRB();
}

RBLink.onclick = function () {
    if (isUserActiveSubscriber) {
        openPage(PRANAPage, RBPage, 'slideLeft');
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        backRB.style.display = "block";
        backPRANA.style.display = "none";
        audioObjects.exhale.load();
        audioObjects.inhale.load();
        audioObjects.hold.load();
        audioObjects.normalbreath.load();
    } else {
        openModal();
    }
}
backRB.onclick = function () {
    openPage(RBPage, PRANAPage, 'slideRight');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    backPRANA.style.display = "block";
    backRB.style.display = "none";
    RBclose();
}
RBSettings.onclick = function () {
    openPage(RBPage, RBSettingsPage, 'slideLeft');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    selectSongsList.style.display = "block";
    backRBSet.style.display = "block";
    backRB.style.display = "none";
}
backRBSet.onclick = function () {
    if (!audioPlayerBRT.muted) {
        audioPlayerBRT.pause();
    }
    audioPlayerBRT.currentTime = 0;
    openPage(RBSettingsPage, RBPage, 'slideRight');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    selectSongsList.style.display = "none";
    backRB.style.display = "block";
    backRBSet.style.display = "none";
}
// Function to close the modal
function RBclose() {
    isRBon = false;
    clearInterval(intRB);
    [secondsRB, minutesRB, hoursRB] = [0, 0, 0];
    timerRefRB.value = '00 : 00 : 00';
    if (!audioPlayerBRT.muted) {
        audioPlayerBRT.pause();
    }
    audioPlayerBRT.currentTime = 0;
    timerControlsButtonsRB.pauseRB.style.display = 'none';
    timerControlsButtonsRB.startRB.style.display = 'inline';
    setFormDisabledStateRB(false);
    setTimerControlsDisabledStateRB(false, true, true);
    timerControlsButtonsRB.stopRB.style.color = "rgb(177, 177, 177)";
    document.getElementById('RBSave').disabled = true;
    document.getElementById('RBSave').style.color = 'rgb(177, 177, 177)';
    document.getElementById('RBSettings').disabled = false;
    document.getElementById('RBSettings').style.color = '#49B79D';
    stopTimerTickRB();
    resetTimerRB();
    isRBON = false;
    document.getElementById('RBResultSaved').innerHTML = "";
    clearInterval(RBcountdown);
    RBisPaused = false;
    RBtimeInput.classList.remove('CountdownHidden');
    RBcountdownDisplay.classList.add('CountdownHidden');
    RBchangeBall(1, 1);
}

$(function () {
    $('#RBForm').on('submit', function (e) {
        e.preventDefault(); // Prevent the default form submission

        var formData = new FormData(this); // Get the form data

        $.ajax({
            url: "/",
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function (result) {
                $('#RBResultSaved').html(result); // Update the result section with the server response
            }
        });
        clearInterval(intRB);
        [secondsRB, minutesRB, hoursRB] = [0, 0, 0];
        timerRefRB.value = '00 : 00 : 00';
        audioPlayerBRT.currentTime = 0
        timerControlsButtonsRB.pauseRB.style.display = 'none';
        timerControlsButtonsRB.startRB.style.display = 'inline';
        timerControlsButtonsAHAT.startRB.style.color = "#0661AA";
        setFormDisabledStateRB(false);
        setTimerControlsDisabledStateRB(false, true, true);
        timerControlsButtonsRB.stopRB.style.color = "rgb(177, 177, 177)";
        document.getElementById('RBSave').disabled = true;
        document.getElementById('RBSave').style.color = 'rgb(177, 177, 177)';
        stopTimerTickRB();
        resetTimerRB();
        CBtimeInput.classList.remove('CountdownHidden');
        CBcountdownDisplay.classList.add('CountdownHidden');
    });
});

let
    formSettingsFieldsRB,
    timerControlsButtonsRB,
    statusPanelRB,
    timerRB,
    timerSettingsRB;

function setTimerSettingsRB(
    intervalCountRB = timerSettingsRB.intervalCountRB,
    intervalDurationRB = timerSettingsRB.intervalDurationRB,
    enableBreakRB = timerSettingsRB.enableBreakRB,
    breakDurationRB = timerSettingsRB.breakDurationRB,
    enableBreak2RB = timerSettingsRB.enableBreak2RB,
    breakDuration2RB = timerSettingsRB.breakDuration2RB
) {
    timerSettingsRB = {
        intervalCountRB,
        intervalDurationRB,
        enableBreakRB,
        breakDurationRB,
        enableBreak2RB,
        breakDuration2RB
    };
}

function resetTimerRB() {
    timerRB = {
        totalTimeElapsedRB: 0,
        elapsedInIntervalRB: 0,
        intervalsDoneRB: 0,
        isBreak3RB: true,
        isBreakRB: false,
        isBreak2RB: false,
        isFinishedRB: false
    };
    updateInfoRB();
}

let [secondsRB, minutesRB, hoursRB] = [0, 0, 0];
let timerRefRB = document.getElementById('timerDisplayRB');
let intRB = null;
document.getElementById('stopBtnRB').disabled = true;
document.getElementById('stopBtnRB').style.color = 'rgb(177, 177, 177)';
document.getElementById('RBSave').disabled = true;
document.getElementById('RBSave').style.color = 'rgb(177, 177, 177)';

var audioRB = document.getElementById("audioRB"),
    muteRB = document.getElementById("muteRB"),
    ismuteRB = false;

var audioSongRB = document.getElementById("songRB"),
    muteSongRB = document.getElementById("songMuteRB");
// Get the volumeVRB bar element
const volumeVoiceRB = document.getElementById('volumeVoiceRB');

// Add an event listener for the volumeVRB change event
volumeVoiceRB.addEventListener('input', function () {
    // Get the current volumeVRB value
    const volumeVRB = parseFloat(volumeVoiceRB.value);

    // Check if volumeVRB is 0 and mute the media if necessary
    if (volumeVRB === 0) {
        audioObjects.inhale.muted = true;
        audioObjects.exhale.muted = true;
        audioObjects.hold.muted = true;
        audioRB.style.display = "none";
        muteRB.style.display = "block";
        ismuteRB = true;
    } else {
        audioObjects.inhale.muted = false;
        audioObjects.exhale.muted = false;
        audioObjects.hold.muted = false;
        muteRB.style.display = "none";
        audioRB.style.display = "block";
        ismuteRB = false;
    }
});
// Get the volumeSRB bar element
const volumeSongRB = document.getElementById('volumeSongRB');

// Add an event listener for the volumeSRB change event
volumeSongRB.addEventListener('input', function () {
    // Get the current volumeSRB value
    const volumeSRB = parseFloat(volumeSongRB.value);

    // Check if volumeSRB is 0 and mute the media if necessary
    if (volumeSRB === 0) {
        audioPlayerBRT.muted = true;
        audioSongRB.style.display = "none";
        muteSongRB.style.display = "block";
    } else {
        audioPlayerBRT.muted = false;
        muteSongRB.style.display = "none";
        audioSongRB.style.display = "block";
    }
});


var inhaleRB = 4;
var holdRB = 7;
var exhaleRB = 8;
setTimerSettingsRB(9999, inhaleRB, true, holdRB, true, exhaleRB);
initializeTimerControlsRB();
initializeStatusPanelRB();
initializeTimerSettingsFormRB();
resetTimerRB();


function initializeTimerSettingsFormRB() {
    const oneDayInSecondsBRE = 60 * 60 * 24;
    let lastUserSetEnableBreakRB = timerSettingsRB.enableBreakRB;
    let lastUserSetEnableBreak2RB = timerSettingsRB.enableBreak2RB;

    formSettingsFieldsRB = {
        intervalCountRB: document.getElementById('intervalCountInputRB'),
        intervalDurationRB: document.getElementById('intervalDurationInputRB'),
        enableBreakRB: document.getElementById('enableBreakInputRB'),
        breakDurationRB: document.getElementById('breakDurationInputRB'),
        enableBreak2RB: document.getElementById('enableBreakInput2RB'),
        breakDuration2RB: document.getElementById('breakDurationInput2RB')
    };

    formSettingsFieldsRB.intervalCountRB.value = timerSettingsRB.intervalCountRB;
    formSettingsFieldsRB.intervalDurationRB.value = timerSettingsRB.intervalDurationRB;
    formSettingsFieldsRB.enableBreakRB.checked = timerSettingsRB.enableBreakRB;
    formSettingsFieldsRB.breakDurationRB.value = timerSettingsRB.breakDurationRB;
    formSettingsFieldsRB.enableBreak2RB.checked = timerSettingsRB.enableBreak2RB;
    formSettingsFieldsRB.breakDuration2RB.value = timerSettingsRB.breakDuration2RB;

    function getNumberInBoundsOrDefaultRB(value, minRB, maxRB, def = 1) {
        const valueAsNumberRB = parseInt(value);
        return isNaN(valueAsNumberRB) ? def : Math.max(minRB, Math.min(valueAsNumberRB, maxRB));
    }

    function setBreakDurationLineDisplayRB(displayed) {
        const breakDurationInputLineEltRB = document.getElementById('breakDurationInputLineRB');
        breakDurationInputLineEltRB.style.display = displayed ? null : 'none';
        const breakDurationInputLineElt2RB = document.getElementById('breakDurationInputLine2RB');
        breakDurationInputLineElt2RB.style.display = displayed ? null : 'none';
        const breakDurationInputLineElt3RB = document.getElementById('breakDurationInputLine3RB');
        breakDurationInputLineElt3RB.style.display = displayed ? null : 'none';
    }

    formSettingsFieldsRB.intervalCountRB.addEventListener('input', () => {
        const intervalCountRB = getNumberInBoundsOrDefaultRB(formSettingsFieldsRB.intervalCountRB.value, 1, 9999),
            hasOneIntervalRB = intervalCountRB === 1,
            hasBreakRB = hasOneIntervalRB ? false : lastUserSetEnableBreakRB;

        formSettingsFieldsRB.enableBreakRB.disabled = hasOneIntervalRB === true;
        formSettingsFieldsRB.enableBreakRB.checked = hasBreakRB;

        setBreakDurationLineDisplayRB(hasBreakRB);

        setTimerSettingsRB(intervalCountRB, undefined, hasBreakRB);
        updateInfoRB();
    });

    formSettingsFieldsRB.intervalDurationRB.addEventListener('input', () => {
        setTimerSettingsRB(undefined, getNumberInBoundsOrDefaultRB(formSettingsFieldsRB.intervalDurationRB.value, 1, oneDayInSecondsBRE));
        updateInfoRB();
    });

    formSettingsFieldsRB.enableBreakRB.addEventListener('change', () => {
        const enableBreakRB = formSettingsFieldsRB.enableBreakRB.checked;

        lastUserSetEnableBreakRB = enableBreakRB;
        setBreakDurationLineDisplayRB(enableBreakRB);
        setTimerSettingsRB(undefined, undefined, enableBreakRB);
        updateInfoRB();
    });

    formSettingsFieldsRB.breakDurationRB.addEventListener('input', () => {
        setTimerSettingsRB(undefined, undefined, undefined,
            getNumberInBoundsOrDefaultRB(formSettingsFieldsRB.breakDurationRB.value, 1, oneDayInSecondsBRE)
        );
        updateInfoRB();
    });

    formSettingsFieldsRB.enableBreak2RB.addEventListener('change', () => {
        const enableBreak2RB = formSettingsFieldsRB.enableBreak2RB.checked;

        lastUserSetEnableBreak2RB = enableBreak2RB;
        setBreakDurationLineDisplayRB(enableBreak2RB);
        setTimerSettingsRB(undefined, undefined, undefined, undefined, enableBreak2RB);
        updateInfoRB();
    });

    formSettingsFieldsRB.breakDuration2RB.addEventListener('input', () => {
        setTimerSettingsRB(undefined, undefined, undefined, undefined, undefined,
            getNumberInBoundsOrDefaultRB(formSettingsFieldsRB.breakDuration2RB.value, 1, oneDayInSecondsBRE)
        );
        updateInfoRB();
    });
}

function initializeTimerControlsRB() {
    timerControlsButtonsRB = {
        startRB: document.getElementById('startBtnRB'),
        pauseRB: document.getElementById('pauseBtnRB'),
        stopRB: document.getElementById('stopBtnRB'),
    };

    setTimerControlsDisabledStateRB(false, true, true);

    timerControlsButtonsRB.startRB.addEventListener('click', startTimerRB);
    timerControlsButtonsRB.pauseRB.addEventListener('click', pauseTimerRB);
    timerControlsButtonsRB.stopRB.addEventListener('click', stopTimerRB);
}

function initializeStatusPanelRB() {
    statusPanelRB = {
        timeOverviewMessageRB: document.getElementById('timeOverviewMessageRB'),

        elapsedInIntervalBoxRB: document.getElementById('elapsedInIntervalBoxRB'),
        elapsedInBreakIntervalBoxRB: document.getElementById('elapsedInBreakIntervalBoxRB'),
        elapsedInIntervalRB: document.getElementById('elapsedInIntervalRB'),
        elapsedInBreakIntervalRB: document.getElementById('elapsedInBreakIntervalRB'),
        elapsedInBreakIntervalBox2RB: document.getElementById('elapsedInBreakIntervalBox2RB'),
        elapsedInBreakInterval2RB: document.getElementById('elapsedInBreakInterval2RB'),
        elapsedInBreakIntervalBox3RB: document.getElementById('elapsedInBreakIntervalBox3RB'),

        intervalsDoneRB: document.getElementById('intervalsDoneRB'),
    };
}

function setTimerControlsDisabledStateRB(startRB, pauseRB, stopRB) {
    timerControlsButtonsRB.startRB.disabled = startRB;
    timerControlsButtonsRB.pauseRB.disabled = pauseRB;
    timerControlsButtonsRB.stopRB.disabled = stopRB;
}

function setFormDisabledStateRB(disabled) {
    formSettingsFieldsRB.intervalCountRB.disabled = disabled;
    formSettingsFieldsRB.intervalDurationRB.disabled = disabled;
    formSettingsFieldsRB.enableBreakRB.disabled = disabled || timerSettingsRB.intervalCountRB === 1;
    formSettingsFieldsRB.breakDurationRB.disabled = disabled;
    formSettingsFieldsRB.enableBreak2RB.disabled = disabled
    formSettingsFieldsRB.breakDuration2RB.disabled = disabled;
}

function startTimerRB() {
    requestWakeLock();
    isRBon = true;
    if (intRB !== null) {
        clearInterval(intRB);
    }
    setFormDisabledStateRB(true);
    setTimerControlsDisabledStateRB(true, true, true);
    setTimeout(() => {
        setTimerControlsDisabledStateRB(true, false, true);
    }, 2000);
    timerControlsButtonsRB.stopRB.style.color = "rgb(177, 177, 177)";
    if (timerRB.isBreak3RB) {
        if (!ismuteRB) {
            audioObjects.bell.muted = false;
            audioObjects.bell.play();
            setTimeout(() => {
                audioObjects.inhale.muted = false;
                audioObjects.inhale.play();
            }, 1500);
        }
        setTimeout(() => {
            RBchangeBall(1.5, timerSettingsRB.intervalDurationRB);
        }, 1500);
    }
    if (!audioPlayerBRT.muted) {
        playSelectedSongBRT(true);
    }
    if (timerRB.isFinishedRB) {
        resetTimerRB();
    }
    setTimeout(() => {
        setTimeout(() => {
            intRB = setInterval(displayTimerRB, 1000);
        }, 1000);
        startTimerTickRB();
        if (RBisPaused) {
            // Resume from paused state
            RBstartTimer(RBtimeRemaining);
            RBisPaused = false;
        } else {
            // Start a new timer
            clearInterval(RBcountdown);
            RBtimeRemaining = RBtimeInput.value === '∞' ? Infinity : parseInt(RBtimeInput.value);
            RBcountdownDisplay.textContent = '';
            RBstartTimer(RBtimeRemaining);
        }
    }, 1700);
    timerControlsButtonsRB.startRB.style.display = 'none';
    timerControlsButtonsRB.pauseRB.style.display = 'inline';
    document.getElementById('RBSettings').disabled = true;
    document.getElementById('RBSettings').style.color = 'rgb(177, 177, 177)';
    document.getElementById('RBSave').disabled = true;
    document.getElementById('RBSave').style.color = 'rgb(177, 177, 177)';
}
function RBstartTimer(RBduration) {
    RBcountdown = setInterval(function () {
        if (RBduration > 0 && RBduration !== Infinity) {
            RBduration--;
            RBtimeRemaining = RBduration;
            let RBContdownminutes = Math.floor(RBduration / 60);
            let RBContdownseconds = RBduration % 60;
            RBcountdownDisplay.textContent = `${RBContdownminutes}:${RBContdownseconds.toString().padStart(2, '0')}`;
            RBtimeInput.classList.add('CountdownHidden');
            RBcountdownDisplay.classList.remove('CountdownHidden');
        } else if (RBduration == Infinity) {
            RBcountdownDisplay.textContent = '∞';
            RBtimeInput.classList.add('CountdownHidden');
            RBcountdownDisplay.classList.remove('CountdownHidden');
        }
    }, 1000);
}
function pauseTimerRB() {
    isRBon = false;
    clearInterval(intRB);
    setTimerControlsDisabledStateRB(false, true, false);
    document.getElementById('stopBtnRB').style.color = '#990000';
    timerControlsButtonsRB.pauseRB.style.display = 'none';
    timerControlsButtonsRB.startRB.style.display = 'inline';
    document.getElementById('RBSettings').disabled = false;
    document.getElementById('RBSettings').style.color = '#49B79D';
    if (!audioPlayerBRT.muted) {
        audioPlayerBRT.pause();
    }
    stopTimerTickRB();
    document.getElementById('RBDate').value = date;
    document.getElementById('RBSave').disabled = false;
    document.getElementById('RBSave').style.color = '#49B79D';
    clearInterval(RBcountdown);
    RBisPaused = true;
    RBchangeBall(1, 1);
}

function stopTimerRB() {
    isRBon = false;
    clearInterval(intRB);
    [secondsRB, minutesRB, hoursRB] = [0, 0, 0];
    timerRefRB.value = '00 : 00 : 00';
    audioPlayerBRT.currentTime = 0
    timerControlsButtonsRB.pauseRB.style.display = 'none';
    timerControlsButtonsRB.startRB.style.display = 'inline';
    setFormDisabledStateRB(false);
    setTimerControlsDisabledStateRB(false, true, true);
    timerControlsButtonsRB.stopRB.style.color = "rgb(177, 177, 177)";
    document.getElementById('RBSave').disabled = true;
    document.getElementById('RBSave').style.color = 'rgb(177, 177, 177)';
    timerControlsButtonsRB.startRB.style.color = '#49B79D';
    stopTimerTickRB();
    resetTimerRB();
    clearInterval(RBcountdown);
    RBisPaused = false;
    RBtimeInput.classList.remove('CountdownHidden');
    RBcountdownDisplay.classList.add('CountdownHidden');
    RBchangeBall(1, 1);
}

function displayTimerRB() {
    secondsRB++;
    if (secondsRB == 60) {
        secondsRB = 0;
        minutesRB++;
        if (minutesRB == 60) {
            minutesRB = 0;
            hoursRB++;
        }
    }
    let hRB = hoursRB < 10 ? "0" + hoursRB : hoursRB;
    let mRB = minutesRB < 10 ? "0" + minutesRB : minutesRB;
    let sRB = secondsRB < 10 ? "0" + secondsRB : secondsRB;
    timerRefRB.value = `${hRB} : ${mRB} : ${sRB}`;
}

function startTimerTickRB() {
    timerRB.intervalId = setInterval(onTimerTickRB, 1000);
}

function stopTimerTickRB() {
    clearInterval(timerRB.intervalId);
}

function onTimerTickRB() {
    const currentIntervalDurationRB = timerRB.isBreakRB ? timerSettingsRB.breakDurationRB : timerRB.isBreak2RB ? timerSettingsRB.breakDuration2RB : timerSettingsRB.intervalDurationRB;
    if (timerRB.elapsedInIntervalRB <= currentIntervalDurationRB && timerRB.isBreak3RB) {
        timerRB.elapsedInIntervalRB++;
        if (timerRB.elapsedInIntervalRB == currentIntervalDurationRB && timerRB.isBreak3RB) {
            if (!ismuteRB) {
                audioObjects.hold.muted = false;
                audioObjects.hold.play();
            }
            RBchangeBall(1.0, timerSettingsRB.breakDurationRB);
        }
        if (timerRB.elapsedInIntervalRB > currentIntervalDurationRB && timerRB.isBreak3RB) {
            timerRB.isBreakRB = true;
            timerRB.isBreak3RB = false;
            timerRB.isFinishedRB = timerRB.intervalsDoneRB === timerSettingsRB.intervalCountRB;
            if (!timerRB.isFinishedRB) {
                timerRB.elapsedInIntervalRB = 1;
            }
            if (timerRB.isFinishedRB) {
                setTimerControlsDisabledStateRB(false, true, true);
                setFormDisabledStateRB(false);
                stopTimerTickRB();
            } else {
                timerRB.totalTimeElapsedRB++;
            }
            updateInfoRB();
        }
        updateInfoRB();
    } else if (timerRB.elapsedInIntervalRB <= currentIntervalDurationRB && timerRB.isBreakRB) {
        timerRB.elapsedInIntervalRB++;
        if (timerRB.elapsedInIntervalRB == currentIntervalDurationRB && timerRB.isBreakRB) {
            if (!ismuteRB) {
                audioObjects.exhale.muted = false;
                audioObjects.exhale.play();
            }
            RBchangeBall(0.5, timerSettingsRB.breakDuration2RB);
        }
        if (timerRB.elapsedInIntervalRB > currentIntervalDurationRB && timerRB.isBreakRB) {
            timerRB.isBreak2RB = true;
            timerRB.isBreakRB = false;
            timerRB.isFinishedRB = timerRB.intervalsDoneRB === timerSettingsRB.intervalCountRB;
            if (!timerRB.isFinishedRB) {
                timerRB.elapsedInIntervalRB = 1;
            }
            if (timerRB.isFinishedRB) {
                setTimerControlsDisabledStateRB(false, true, true);
                setFormDisabledStateRB(false);
                stopTimerTickRB();
            } else {
                timerRB.totalTimeElapsedRB++;
            }
            updateInfoRB();
        }
        updateInfoRB();
    } else if (timerRB.elapsedInIntervalRB <= currentIntervalDurationRB && timerRB.isBreak2RB) {
        timerRB.elapsedInIntervalRB++;
        if (timerRB.elapsedInIntervalRB == currentIntervalDurationRB && timerRB.isBreak2RB) {
            if (!ismuteRB) {
                if (RBcountdownDisplay.textContent == '0:00') {
                    audioObjects.inhale.muted = true;
                    clearInterval(RBcountdown);
                    if (!ismuteRB) {
                        audioObjects.bell.muted = false;
                        audioObjects.bell.play();
                    }
                    clearInterval(intRB);
                    setTimerControlsDisabledStateRB(true, true, false);
                    document.getElementById('stopBtnRB').style.color = '#990000';
                    timerControlsButtonsRB.pauseRB.style.display = 'none';
                    timerControlsButtonsRB.startRB.style.display = 'inline';
                    timerControlsButtonsRB.startRB.style.color = "rgb(177, 177, 177)";
                    document.getElementById('RBSettings').disabled = false;
                    document.getElementById('RBSettings').style.color = '#49B79D';
                    if (!audioPlayerBRT.muted) {
                        audioPlayerBRT.pause();
                    }
                    stopTimerTickRB();
                    document.getElementById('RBDate').value = date;
                    document.getElementById('RBSave').disabled = false;
                    document.getElementById('RBSave').style.color = '#49B79D';
                    clearInterval(RBcountdown);
                    RBisPaused = false;
                    setTimeout(() => {
                        audioObjects.normalbreath.muted = false;
                        audioObjects.normalbreath.play();
                        if (isPortuguese) {
                            RBballText.textContent = 'Respira\u00E7\u00E3o Normal';
                        } else {
                            RBballText.textContent = 'Normal Breath';
                        }
                    }, 1000);
                } else {
                    audioObjects.inhale.muted = false;
                    audioObjects.inhale.play();
                }
            }
            RBchangeBall(1.5, timerSettingsRB.intervalDurationRB);
        }
        if (timerRB.elapsedInIntervalRB > currentIntervalDurationRB && timerRB.isBreak2RB) {
            timerRB.isBreak3RB = true;
            timerRB.isBreak2RB = false;
            timerRB.intervalsDoneRB++;
            timerRB.isFinishedRB = timerRB.intervalsDoneRB === timerSettingsRB.intervalCountRB;
            if (!timerRB.isFinishedRB) {
                timerRB.elapsedInIntervalRB = 1;
            }
            if (timerRB.isFinishedRB) {
                setTimerControlsDisabledStateRB(false, true, true);
                setFormDisabledStateRB(false);
                stopTimerTickRB();
            } else {
                timerRB.totalTimeElapsedRB++;
            }
            updateInfoRB();
        }
        updateInfoRB();
    }
}

function updateInfoRB() {
    statusPanelRB.timeOverviewMessageRB.style.display = timerRB.isFinishedRB ? 'block' : null;
    statusPanelRB.elapsedInIntervalBoxRB.style.display = timerRB.isFinishedRB || timerRB.isBreakRB || timerRB.isBreak2RB || timerRB.isBreak4RB ? 'none' : null;
    statusPanelRB.elapsedInBreakIntervalBoxRB.style.display = !timerRB.isFinishedRB && timerRB.isBreakRB ? 'block' : null;
    statusPanelRB.elapsedInBreakIntervalBox2RB.style.display = !timerRB.isFinishedRB && timerRB.isBreak2RB ? 'block' : null;
    if (isPortuguese) {
        if (timerRB.isBreakRB) {
            RBballText.textContent = 'SEGURE';
        } else if (timerRB.isBreak2RB) {
            RBballText.textContent = 'EXPIRA';
        } else {
            RBballText.textContent = 'INSPIRA';
        }
    } else {
        if (timerRB.isBreakRB) {
            RBballText.textContent = 'HOLD';
        } else if (timerRB.isBreak2RB) {
            RBballText.textContent = 'EXHALE';
        } else {
            RBballText.textContent = 'INHALE';
        }
    }
    statusPanelRB.intervalsDoneRB.value = timerRB.intervalsDoneRB;
}
//---------------------------------------------------//
