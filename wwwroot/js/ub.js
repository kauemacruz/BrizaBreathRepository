/*UB JS*/
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
        setFormDisabledStateUB(false);
        setTimerControlsDisabledStateUB(false, true, true);
        timerControlsButtonsUB.stopUB.style.color = "rgb(177, 177, 177)";
        document.getElementById('UBSave').disabled = true;
        document.getElementById('UBSave').style.color = 'rgb(177, 177, 177)';
        stopTimerTickUB();
        resetTimerUB();
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

audioPlayerBRT.loop = true;

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
    if (intUB !== null) {
        clearInterval(intUB);
    }
    intUB = setInterval(displayTimerUB, 1000);
    setFormDisabledStateUB(true);
    setTimerControlsDisabledStateUB(true, false, true);
    timerControlsButtonsUB.stopUB.style.color = "rgb(177, 177, 177)";
    if (timerUB.isBreak3UB) {
        if (!ismuteUB) {
            audioObjects.inhale.muted = false;
            audioObjects.inhale.play();
        }
    }
    if (!audioPlayerBRT.muted) {
        playSelectedSongBRT(true);
    }
    if (timerUB.isFinishedUB) {
        resetTimerUB();
    }
    startTimerTickUB();
    timerControlsButtonsUB.startUB.style.display = 'none';
    timerControlsButtonsUB.pauseUB.style.display = 'inline';
    document.getElementById('UBSettings').disabled = true;
    document.getElementById('UBSettings').style.color = 'rgb(177, 177, 177)';
    document.getElementById('UBSave').disabled = true;
    document.getElementById('UBSave').style.color = 'rgb(177, 177, 177)';
}

function pauseTimerUB() {
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
}

function stopTimerUB() {
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
        if (timerUB.elapsedInIntervalUB > currentIntervalDurationUB && timerUB.isBreak3UB) {
            if (!ismuteUB) {
                audioObjects.hold.muted = false;
                audioObjects.hold.play();
            }
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
        if (timerUB.elapsedInIntervalUB > currentIntervalDurationUB && timerUB.isBreakUB) {
            if (!ismuteUB) {
                audioObjects.exhale.muted = false;
                audioObjects.exhale.play();
            }
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
        if (timerUB.elapsedInIntervalUB > currentIntervalDurationUB && timerUB.isBreak2UB) {
            if (!ismuteUB) {
                audioObjects.hold.muted = false;
                audioObjects.hold.play();
            }
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
        if (timerUB.elapsedInIntervalUB > currentIntervalDurationUB && timerUB.isBreak4UB) {
            if (!ismuteUB) {
                audioObjects.inhale.muted = false;
                audioObjects.inhale.play();
            }
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

    if (timerUB.isBreakUB) {
        statusPanelUB.elapsedInBreakIntervalUB.textContent = timerUB.elapsedInIntervalUB;
    } else if (timerUB.isBreak2UB) {
        statusPanelUB.elapsedInBreakInterval2UB.textContent = timerUB.elapsedInIntervalUB;
    } else if (timerUB.isBreak4UB) {
        statusPanelUB.elapsedInBreakInterval3UB.textContent = timerUB.elapsedInIntervalUB;
    } else {
        statusPanelUB.elapsedInIntervalUB.textContent = timerUB.elapsedInIntervalUB;
    }
    statusPanelUB.intervalsDoneUB.value = timerUB.intervalsDoneUB;
}
//---------------------------------------------------//
