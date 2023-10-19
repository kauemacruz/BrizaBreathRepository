/*SB JS*/
$(function () {
    $('#SBForm').on('submit', function (e) {
        e.preventDefault(); // Prevent the default form submission

        var formData = new FormData(this); // Get the form data

        $.ajax({
            url: "/",
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function (result) {
                $('#SBResultSaved').html(result); // Update the result section with the server response
            }
        });
        clearInterval(intSB);
        [secondsSB, minutesSB, hoursSB] = [0, 0, 0];
        timerRefSB.value = '00 : 00 : 00';
        audioPlayerBRT.currentTime = 0
        timerControlsButtonsSB.pauseSB.style.display = 'none';
        timerControlsButtonsSB.startSB.style.display = 'inline';
        setFormDisabledStateSB(false);
        setTimerControlsDisabledStateSB(false, true, true);
        timerControlsButtonsSB.stopSB.style.color = "rgb(177, 177, 177)";
        document.getElementById('SBSave').disabled = true;
        document.getElementById('SBSave').style.color = 'rgb(177, 177, 177)';
        stopTimerTickSB();
        resetTimerSB();
    });
});

let
    formSettingsFieldsSB,
    timerControlsButtonsSB,
    statusPanelSB,
    timerSB,
    timerSettingsSB;

function setTimerSettingsSB(
    intervalCountSB = timerSettingsSB.intervalCountSB,
    intervalDurationSB = timerSettingsSB.intervalDurationSB,
    enableBreakSB = timerSettingsSB.enableBreakSB,
    breakDurationSB = timerSettingsSB.breakDurationSB,
    enableBreak2SB = timerSettingsSB.enableBreak2SB,
    breakDuration2SB = timerSettingsSB.breakDuration2SB
) {
    timerSettingsSB = {
        intervalCountSB,
        intervalDurationSB,
        enableBreakSB,
        breakDurationSB,
        enableBreak2SB,
        breakDuration2SB
    };
}

function resetTimerSB() {
    timerSB = {
        totalTimeElapsedSB: 0,
        elapsedInIntervalSB: 0,
        intervalsDoneSB: 0,
        isBreak3SB: true,
        isBreakSB: false,
        isBreak2SB: false,
        isFinishedSB: false
    };
    updateInfoSB();
}

let [secondsSB, minutesSB, hoursSB] = [0, 0, 0];
let timerRefSB = document.getElementById('timerDisplaySB');
let intSB = null;
document.getElementById('stopBtnSB').disabled = true;
document.getElementById('stopBtnSB').style.color = 'rgb(177, 177, 177)';
document.getElementById('SBSave').disabled = true;
document.getElementById('SBSave').style.color = 'rgb(177, 177, 177)';

var audioSB = document.getElementById("audioSB"),
    muteSB = document.getElementById("muteSB"),
    ismuteSB = false;

audioPlayerBRT.loop = true;

var audioSongSB = document.getElementById("songSB"),
    muteSongSB = document.getElementById("songMuteSB");
// Get the volumeVSB bar element
const volumeVoiceSB = document.getElementById('volumeVoiceSB');

// Add an event listener for the volumeVSB change event
volumeVoiceSB.addEventListener('input', function () {
    // Get the current volumeVSB value
    const volumeVSB = parseFloat(volumeVoiceSB.value);

    // Check if volumeVSB is 0 and mute the media if necessary
    if (volumeVSB === 0) {
        audioObjects.inhale.muted = true;
        audioObjects.exhale.muted = true;
        audioObjects.hold.muted = true;
        audioSB.style.display = "none";
        muteSB.style.display = "block";
        ismuteSB = true;
    } else {
        audioObjects.inhale.muted = false;
        audioObjects.exhale.muted = false;
        audioObjects.hold.muted = false;
        muteSB.style.display = "none";
        audioSB.style.display = "block";
        ismuteSB = false;
    }
});
// Get the volumeSSB bar element
const volumeSongSB = document.getElementById('volumeSongSB');

// Add an event listener for the volumeSSB change event
volumeSongSB.addEventListener('input', function () {
    // Get the current volumeSSB value
    const volumeSSB = parseFloat(volumeSongSB.value);

    // Check if volumeSSB is 0 and mute the media if necessary
    if (volumeSSB === 0) {
        audioPlayerBRT.muted = true;
        audioSongSB.style.display = "none";
        muteSongSB.style.display = "block";
    } else {
        audioPlayerBRT.muted = false;
        muteSongSB.style.display = "none";
        audioSongSB.style.display = "block";
    }
});


var inhaleSB = 4;
var holdSB = 4;
var exhaleSB = 8;
setTimerSettingsSB(9999, inhaleSB, true, holdSB, true, exhaleSB);
initializeTimerControlsSB();
initializeStatusPanelSB();
initializeTimerSettingsFormSB();
resetTimerSB();


var minusBtnSB = document.getElementById("minusSB"),
    plusBtnSB = document.getElementById("plusSB"),
    numberSB = 3, /// numberSB value
    minSB = 3, /// minSB numberSB
    maxSB = 60;

minusBtnSB.onclick = function () {
    if (numberSB > minSB) {
        numberSB = numberSB - 1; /// Minus 1 of the numberSB
        formSettingsFieldsSB.intervalDurationSB.value = numberSB; /// Display the value in place of the numberSB
        //fix here to change pranayama type
        formSettingsFieldsSB.breakDurationSB.value = formSettingsFieldsSB.intervalDurationSB.value;
        formSettingsFieldsSB.breakDuration2SB.value = formSettingsFieldsSB.intervalDurationSB.value*2;
        setTimerSettingsSB(9999, formSettingsFieldsSB.intervalDurationSB.value, true, formSettingsFieldsSB.breakDurationSB.value, true, formSettingsFieldsSB.breakDuration2SB.value);
    }
}

plusBtnSB.onclick = function () {
    if (numberSB < maxSB) {
        numberSB = numberSB + 1;
        formSettingsFieldsSB.intervalDurationSB.value = numberSB; /// Display the value in place of the numberSB
        //fix here to change pranayama type
        formSettingsFieldsSB.breakDurationSB.value = formSettingsFieldsSB.intervalDurationSB.value;
        formSettingsFieldsSB.breakDuration2SB.value = formSettingsFieldsSB.intervalDurationSB.value*2;
        setTimerSettingsSB(9999, formSettingsFieldsSB.intervalDurationSB.value, true, formSettingsFieldsSB.breakDurationSB.value, true, formSettingsFieldsSB.breakDuration2SB.value);

    }
}

function initializeTimerSettingsFormSB() {
    const oneDayInSecondsBRE = 60 * 60 * 24;
    let lastUserSetEnableBreakSB = timerSettingsSB.enableBreakSB;
    let lastUserSetEnableBreak2SB = timerSettingsSB.enableBreak2SB;

    formSettingsFieldsSB = {
        intervalCountSB: document.getElementById('intervalCountInputSB'),
        intervalDurationSB: document.getElementById('intervalDurationInputSB'),
        enableBreakSB: document.getElementById('enableBreakInputSB'),
        breakDurationSB: document.getElementById('breakDurationInputSB'),
        enableBreak2SB: document.getElementById('enableBreakInput2SB'),
        breakDuration2SB: document.getElementById('breakDurationInput2SB')
    };

    formSettingsFieldsSB.intervalCountSB.value = timerSettingsSB.intervalCountSB;
    formSettingsFieldsSB.intervalDurationSB.value = timerSettingsSB.intervalDurationSB;
    formSettingsFieldsSB.enableBreakSB.checked = timerSettingsSB.enableBreakSB;
    formSettingsFieldsSB.breakDurationSB.value = timerSettingsSB.breakDurationSB;
    formSettingsFieldsSB.enableBreak2SB.checked = timerSettingsSB.enableBreak2SB;
    formSettingsFieldsSB.breakDuration2SB.value = timerSettingsSB.breakDuration2SB;

    function getNumberInBoundsOrDefaultSB(value, minSB, maxSB, def = 1) {
        const valueAsNumberSB = parseInt(value);
        return isNaN(valueAsNumberSB) ? def : Math.max(minSB, Math.min(valueAsNumberSB, maxSB));
    }

    function setBreakDurationLineDisplaySB(displayed) {
        const breakDurationInputLineEltSB = document.getElementById('breakDurationInputLineSB');
        breakDurationInputLineEltSB.style.display = displayed ? null : 'none';
        const breakDurationInputLineElt2SB = document.getElementById('breakDurationInputLine2SB');
        breakDurationInputLineElt2SB.style.display = displayed ? null : 'none';
        const breakDurationInputLineElt3SB = document.getElementById('breakDurationInputLine3SB');
        breakDurationInputLineElt3SB.style.display = displayed ? null : 'none';
    }

    formSettingsFieldsSB.intervalCountSB.addEventListener('input', () => {
        const intervalCountSB = getNumberInBoundsOrDefaultSB(formSettingsFieldsSB.intervalCountSB.value, 1, 9999),
            hasOneIntervalSB = intervalCountSB === 1,
            hasBreakSB = hasOneIntervalSB ? false : lastUserSetEnableBreakSB;

        formSettingsFieldsSB.enableBreakSB.disabled = hasOneIntervalSB === true;
        formSettingsFieldsSB.enableBreakSB.checked = hasBreakSB;

        setBreakDurationLineDisplaySB(hasBreakSB);

        setTimerSettingsSB(intervalCountSB, undefined, hasBreakSB);
        updateInfoSB();
    });

    formSettingsFieldsSB.intervalDurationSB.addEventListener('input', () => {
        setTimerSettingsSB(undefined, getNumberInBoundsOrDefaultSB(formSettingsFieldsSB.intervalDurationSB.value, 1, oneDayInSecondsBRE));
        updateInfoSB();
    });

    formSettingsFieldsSB.enableBreakSB.addEventListener('change', () => {
        const enableBreakSB = formSettingsFieldsSB.enableBreakSB.checked;

        lastUserSetEnableBreakSB = enableBreakSB;
        setBreakDurationLineDisplaySB(enableBreakSB);
        setTimerSettingsSB(undefined, undefined, enableBreakSB);
        updateInfoSB();
    });

    formSettingsFieldsSB.breakDurationSB.addEventListener('input', () => {
        setTimerSettingsSB(undefined, undefined, undefined,
            getNumberInBoundsOrDefaultSB(formSettingsFieldsSB.breakDurationSB.value, 1, oneDayInSecondsBRE)
        );
        updateInfoSB();
    });

    formSettingsFieldsSB.enableBreak2SB.addEventListener('change', () => {
        const enableBreak2SB = formSettingsFieldsSB.enableBreak2SB.checked;

        lastUserSetEnableBreak2SB = enableBreak2SB;
        setBreakDurationLineDisplaySB(enableBreak2SB);
        setTimerSettingsSB(undefined, undefined, undefined, undefined, enableBreak2SB);
        updateInfoSB();
    });

    formSettingsFieldsSB.breakDuration2SB.addEventListener('input', () => {
        setTimerSettingsSB(undefined, undefined, undefined, undefined, undefined,
            getNumberInBoundsOrDefaultSB(formSettingsFieldsSB.breakDuration2SB.value, 1, oneDayInSecondsBRE)
        );
        updateInfoSB();
    });
}

function initializeTimerControlsSB() {
    timerControlsButtonsSB = {
        startSB: document.getElementById('startBtnSB'),
        pauseSB: document.getElementById('pauseBtnSB'),
        stopSB: document.getElementById('stopBtnSB'),
    };

    setTimerControlsDisabledStateSB(false, true, true);

    timerControlsButtonsSB.startSB.addEventListener('click', startTimerSB);
    timerControlsButtonsSB.pauseSB.addEventListener('click', pauseTimerSB);
    timerControlsButtonsSB.stopSB.addEventListener('click', stopTimerSB);
}

function initializeStatusPanelSB() {
    statusPanelSB = {
        timeOverviewMessageSB: document.getElementById('timeOverviewMessageSB'),

        elapsedInIntervalBoxSB: document.getElementById('elapsedInIntervalBoxSB'),
        elapsedInBreakIntervalBoxSB: document.getElementById('elapsedInBreakIntervalBoxSB'),
        elapsedInIntervalSB: document.getElementById('elapsedInIntervalSB'),
        elapsedInBreakIntervalSB: document.getElementById('elapsedInBreakIntervalSB'),
        elapsedInBreakIntervalBox2SB: document.getElementById('elapsedInBreakIntervalBox2SB'),
        elapsedInBreakInterval2SB: document.getElementById('elapsedInBreakInterval2SB'),
        elapsedInBreakIntervalBox3SB: document.getElementById('elapsedInBreakIntervalBox3SB'),

        intervalsDoneSB: document.getElementById('intervalsDoneSB'),
    };
}

function setTimerControlsDisabledStateSB(startSB, pauseSB, stopSB) {
    timerControlsButtonsSB.startSB.disabled = startSB;
    timerControlsButtonsSB.pauseSB.disabled = pauseSB;
    timerControlsButtonsSB.stopSB.disabled = stopSB;
}

function setFormDisabledStateSB(disabled) {
    formSettingsFieldsSB.intervalCountSB.disabled = disabled;
    formSettingsFieldsSB.intervalDurationSB.disabled = disabled;
    formSettingsFieldsSB.enableBreakSB.disabled = disabled || timerSettingsSB.intervalCountSB === 1;
    formSettingsFieldsSB.breakDurationSB.disabled = disabled;
    formSettingsFieldsSB.enableBreak2SB.disabled = disabled
    formSettingsFieldsSB.breakDuration2SB.disabled = disabled;
    minusBtnSB.disabled = disabled;
    plusBtnSB.disabled = disabled;
}

function startTimerSB() {
    if (intSB !== null) {
        clearInterval(intSB);
    }
    intSB = setInterval(displayTimerSB, 1000);
    setFormDisabledStateSB(true);
    setTimerControlsDisabledStateSB(true, false, true);
    timerControlsButtonsSB.stopSB.style.color = "rgb(177, 177, 177)";
    if (timerSB.isBreak3SB) {
        if (!ismuteSB) {
            audioObjects.inhale.muted = false;
            audioObjects.inhale.play();
        }
    }
    if (!audioPlayerBRT.muted) {
        playSelectedSongBRT(true);
    }
    if (timerSB.isFinishedSB) {
        resetTimerSB();
    }
    startTimerTickSB();
    timerControlsButtonsSB.startSB.style.display = 'none';
    timerControlsButtonsSB.pauseSB.style.display = 'inline';
    document.getElementById('SBSettings').disabled = true;
    document.getElementById('SBSettings').style.color = 'rgb(177, 177, 177)';
    document.getElementById('SBSave').disabled = true;
    document.getElementById('SBSave').style.color = 'rgb(177, 177, 177)';
}

function pauseTimerSB() {
    clearInterval(intSB);
    setTimerControlsDisabledStateSB(false, true, false);
    document.getElementById('stopBtnSB').style.color = '#990000';
    timerControlsButtonsSB.pauseSB.style.display = 'none';
    timerControlsButtonsSB.startSB.style.display = 'inline';
    document.getElementById('SBSettings').disabled = false;
    document.getElementById('SBSettings').style.color = '#49B79D';
    if (!audioPlayerBRT.muted) {
        audioPlayerBRT.pause();
    }
    stopTimerTickSB();
    document.getElementById('SBDate').value = date;
    document.getElementById('SBSave').disabled = false;
    document.getElementById('SBSave').style.color = '#49B79D';
}

function stopTimerSB() {
    clearInterval(intSB);
    [secondsSB, minutesSB, hoursSB] = [0, 0, 0];
    timerRefSB.value = '00 : 00 : 00';
    audioPlayerBRT.currentTime = 0
    timerControlsButtonsSB.pauseSB.style.display = 'none';
    timerControlsButtonsSB.startSB.style.display = 'inline';
    setFormDisabledStateSB(false);
    setTimerControlsDisabledStateSB(false, true, true);
    timerControlsButtonsSB.stopSB.style.color = "rgb(177, 177, 177)";
    document.getElementById('SBSave').disabled = true;
    document.getElementById('SBSave').style.color = 'rgb(177, 177, 177)';
    stopTimerTickSB();
    resetTimerSB();
}

function displayTimerSB() {
    secondsSB++;
    if (secondsSB == 60) {
        secondsSB = 0;
        minutesSB++;
        if (minutesSB == 60) {
            minutesSB = 0;
            hoursSB++;
        }
    }
    let hSB = hoursSB < 10 ? "0" + hoursSB : hoursSB;
    let mSB = minutesSB < 10 ? "0" + minutesSB : minutesSB;
    let sSB = secondsSB < 10 ? "0" + secondsSB : secondsSB;
    timerRefSB.value = `${hSB} : ${mSB} : ${sSB}`;
}

function startTimerTickSB() {
    timerSB.intervalId = setInterval(onTimerTickSB, 1000);
}

function stopTimerTickSB() {
    clearInterval(timerSB.intervalId);
}

function onTimerTickSB() {
    const currentIntervalDurationSB = timerSB.isBreakSB ? timerSettingsSB.breakDurationSB : timerSB.isBreak2SB ? timerSettingsSB.breakDuration2SB : timerSettingsSB.intervalDurationSB;
    if (timerSB.elapsedInIntervalSB <= currentIntervalDurationSB && timerSB.isBreak3SB) {
        timerSB.elapsedInIntervalSB++;
        if (timerSB.elapsedInIntervalSB > currentIntervalDurationSB && timerSB.isBreak3SB) {
            if (!ismuteSB) {
                audioObjects.hold.muted = false;
                audioObjects.hold.play();
            }
            timerSB.isBreakSB = true;
            timerSB.isBreak3SB = false;
            timerSB.isFinishedSB = timerSB.intervalsDoneSB === timerSettingsSB.intervalCountSB;
            if (!timerSB.isFinishedSB) {
                timerSB.elapsedInIntervalSB = 1;
            }
            if (timerSB.isFinishedSB) {
                setTimerControlsDisabledStateSB(false, true, true);
                setFormDisabledStateSB(false);
                stopTimerTickSB();
            } else {
                timerSB.totalTimeElapsedSB++;
            }
            updateInfoSB();
        }
        updateInfoSB();
    } else if (timerSB.elapsedInIntervalSB <= currentIntervalDurationSB && timerSB.isBreakSB) {
        timerSB.elapsedInIntervalSB++;
        if (timerSB.elapsedInIntervalSB > currentIntervalDurationSB && timerSB.isBreakSB) {
            if (!ismuteSB) {
                audioObjects.exhale.muted = false;
                audioObjects.exhale.play();
            }
            timerSB.isBreak2SB = true;
            timerSB.isBreakSB = false;
            timerSB.isFinishedSB = timerSB.intervalsDoneSB === timerSettingsSB.intervalCountSB;
            if (!timerSB.isFinishedSB) {
                timerSB.elapsedInIntervalSB = 1;
            }
            if (timerSB.isFinishedSB) {
                setTimerControlsDisabledStateSB(false, true, true);
                setFormDisabledStateSB(false);
                stopTimerTickSB();
            } else {
                timerSB.totalTimeElapsedSB++;
            }
            updateInfoSB();
        }
        updateInfoSB();
    } else if (timerSB.elapsedInIntervalSB <= currentIntervalDurationSB && timerSB.isBreak2SB) {
        timerSB.elapsedInIntervalSB++;
        if (timerSB.elapsedInIntervalSB > currentIntervalDurationSB && timerSB.isBreak2SB) {
            if (!ismuteSB) {
                audioObjects.inhale.muted = false;
                audioObjects.inhale.play();
            }
            timerSB.isBreak3SB = true;
            timerSB.isBreak2SB = false;
            timerSB.intervalsDoneSB++;
            timerSB.isFinishedSB = timerSB.intervalsDoneSB === timerSettingsSB.intervalCountSB;
            if (!timerSB.isFinishedSB) {
                timerSB.elapsedInIntervalSB = 1;
            }
            if (timerSB.isFinishedSB) {
                setTimerControlsDisabledStateSB(false, true, true);
                setFormDisabledStateSB(false);
                stopTimerTickSB();
            } else {
                timerSB.totalTimeElapsedSB++;
            }
            updateInfoSB();
        }
        updateInfoSB();
    } 
}

function updateInfoSB() {
    statusPanelSB.timeOverviewMessageSB.style.display = timerSB.isFinishedSB ? 'block' : null;
    statusPanelSB.elapsedInIntervalBoxSB.style.display = timerSB.isFinishedSB || timerSB.isBreakSB || timerSB.isBreak2SB || timerSB.isBreak4SB ? 'none' : null;
    statusPanelSB.elapsedInBreakIntervalBoxSB.style.display = !timerSB.isFinishedSB && timerSB.isBreakSB ? 'block' : null;
    statusPanelSB.elapsedInBreakIntervalBox2SB.style.display = !timerSB.isFinishedSB && timerSB.isBreak2SB ? 'block' : null;
    if (timerSB.isBreakSB) {
        statusPanelSB.elapsedInBreakIntervalSB.textContent = timerSB.elapsedInIntervalSB;
    } else if (timerSB.isBreak2SB) {
        statusPanelSB.elapsedInBreakInterval2SB.textContent = timerSB.elapsedInIntervalSB;
    } else {
        statusPanelSB.elapsedInIntervalSB.textContent = timerSB.elapsedInIntervalSB;
    }
    statusPanelSB.intervalsDoneSB.value = timerSB.intervalsDoneSB;
}
//---------------------------------------------------//
