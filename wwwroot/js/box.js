/*BOX JS*/
$(function () {
    $('#BOXForm').on('submit', function (e) {
        e.preventDefault(); // Prevent the default form submission

        var formData = new FormData(this); // Get the form data

        $.ajax({
            url: "/",
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function (result) {
                $('#BOXResultSaved').html(result); // Update the result section with the server response
            }
        });
        clearInterval(intBOX);
        [secondsBOX, minutesBOX, hoursBOX] = [0, 0, 0];
        timerRefBOX.value = '00 : 00 : 00';
        audioPlayerBRT.currentTime = 0
        timerControlsButtonsBOX.pauseBOX.style.display = 'none';
        timerControlsButtonsBOX.startBOX.style.display = 'inline';
        setFormDisabledStateBOX(false);
        setTimerControlsDisabledStateBOX(false, true, true);
        timerControlsButtonsBOX.stopBOX.style.color = "rgb(177, 177, 177)";
        document.getElementById('BOXSave').disabled = true;
        document.getElementById('BOXSave').style.color = 'rgb(177, 177, 177)';
        stopTimerTickBOX();
        resetTimerBOX();
        isBOXON = false;
    });
});

let
    formSettingsFieldsBOX,
    timerControlsButtonsBOX,
    statusPanelBOX,
    timerBOX,
    timerSettingsBOX;

function setTimerSettingsBOX(
    intervalCountBOX = timerSettingsBOX.intervalCountBOX,
    intervalDurationBOX = timerSettingsBOX.intervalDurationBOX,
    enableBreakBOX = timerSettingsBOX.enableBreakBOX,
    breakDurationBOX = timerSettingsBOX.breakDurationBOX,
    enableBreak2BOX = timerSettingsBOX.enableBreak2BOX,
    breakDuration2BOX = timerSettingsBOX.breakDuration2BOX,
    enableBreak3BOX = timerSettingsBOX.enableBreak3BOX,
    breakDuration3BOX = timerSettingsBOX.breakDuration3BOX
) {
    timerSettingsBOX = {
        intervalCountBOX,
        intervalDurationBOX,
        enableBreakBOX,
        breakDurationBOX,
        enableBreak2BOX,
        breakDuration2BOX,
        enableBreak3BOX,
        breakDuration3BOX
    };
}

function resetTimerBOX() {
    timerBOX = {
        totalTimeElapsedBOX: 0,
        elapsedInIntervalBOX: 0,
        intervalsDoneBOX: 0,
        isBreak3BOX: true,
        isBreakBOX: false,
        isBreak2BOX: false,
        isBreak4BOX: false,
        isFinishedBOX: false
    };
    updateInfoBOX();
}

let [secondsBOX, minutesBOX, hoursBOX] = [0, 0, 0];
let timerRefBOX = document.getElementById('timerDisplayBOX');
let intBOX = null;
document.getElementById('stopBtnBOX').disabled = true;
document.getElementById('stopBtnBOX').style.color = 'rgb(177, 177, 177)';
document.getElementById('BOXSave').disabled = true;
document.getElementById('BOXSave').style.color = 'rgb(177, 177, 177)';

var audioListBOX = []
if (isPortuguese) {
    audioListBOX.push(new Audio('/sounds/breathein.mp3'))
    audioListBOX.push(new Audio('/sounds/holdyourbreath.mp3'));
    audioListBOX.push(new Audio('/sounds/exhale.mp3'));
    audioListBOX.push(new Audio('/sounds/hold.mp3'));
} else {
    audioListBOX.push(new Audio('/sounds/breathein.mp3'))
    audioListBOX.push(new Audio('/sounds/holdyourbreath.mp3'));
    audioListBOX.push(new Audio('/sounds/exhale.mp3'));
    audioListBOX.push(new Audio('/sounds/hold.mp3'));
}


var audioBOX = document.getElementById("audioBOX"),
    muteBOX = document.getElementById("muteBOX"),
    ismuteBOX = false;

audioPlayerBRT.loop = true;

var audioSongBOX = document.getElementById("songBOX"),
    muteSongBOX = document.getElementById("songMuteBOX");
// Get the volumeVBOX bar element
const volumeVoiceBOX = document.getElementById('volumeVoiceBOX');

// Add an event listener for the volumeVBOX change event
volumeVoiceBOX.addEventListener('input', function () {
    // Get the current volumeVBOX value
    const volumeVBOX = parseFloat(volumeVoiceBOX.value);

    // Check if volumeVBOX is 0 and mute the media if necessary
    if (volumeVBOX === 0) {
        audioListBOX[0].muted = true;
        audioListBOX[1].muted = true;
        audioListBOX[2].muted = true;
        audioListBOX[3].muted = true;
        audioBOX.style.display = "none";
        muteBOX.style.display = "block";
        ismuteBOX = true;
    } else {
        audioListBOX[0].muted = false;
        audioListBOX[1].muted = false;
        audioListBOX[2].muted = false;
        audioListBOX[3].muted = false;
        muteBOX.style.display = "none";
        audioBOX.style.display = "block";
        ismuteBOX = false;
    }
});
// Get the volumeSBOX bar element
const volumeSongBOX = document.getElementById('volumeSongBOX');

// Add an event listener for the volumeSBOX change event
volumeSongBOX.addEventListener('input', function () {
    // Get the current volumeSBOX value
    const volumeSBOX = parseFloat(volumeSongBOX.value);

    // Check if volumeSBOX is 0 and mute the media if necessary
    if (volumeSBOX === 0) {
        audioPlayerBRT.muted = true;
        audioSongBOX.style.display = "none";
        muteSongBOX.style.display = "block";
    } else {
        audioPlayerBRT.muted = false;
        muteSongBOX.style.display = "none";
        audioSongBOX.style.display = "block";
    }
});


var inhaleBOX = 4;
var holdBOX = inhaleBOX;
var exhaleBOX = inhaleBOX;
var hold2BOX = inhaleBOX;
setTimerSettingsBOX(9999, inhaleBOX, true, holdBOX, true, exhaleBOX, true, hold2BOX);
initializeTimerControlsBOX();
initializeStatusPanelBOX();
initializeTimerSettingsFormBOX();
resetTimerBOX();


var minusBtnBOX = document.getElementById("minusBOX"),
    plusBtnBOX = document.getElementById("plusBOX"),
    numberBOX = 4, /// numberBOX value
    minBOX = 3, /// minBOX numberBOX
    maxBOX = 30;

minusBtnBOX.onclick = function () {
    if (numberBOX > minBOX) {
        numberBOX = numberBOX - 1; /// Minus 1 of the numberBOX
        formSettingsFieldsBOX.intervalDurationBOX.value = numberBOX; /// Display the value in place of the numberBOX
        //fix here to change pranayama type
        formSettingsFieldsBOX.breakDurationBOX.value = formSettingsFieldsBOX.intervalDurationBOX.value;
        formSettingsFieldsBOX.breakDuration2BOX.value = formSettingsFieldsBOX.intervalDurationBOX.value;
        formSettingsFieldsBOX.breakDuration3BOX.value = formSettingsFieldsBOX.intervalDurationBOX.value;
        setTimerSettingsBOX(9999, formSettingsFieldsBOX.intervalDurationBOX.value, true, formSettingsFieldsBOX.breakDurationBOX.value, true, formSettingsFieldsBOX.breakDuration2BOX.value, true, formSettingsFieldsBOX.breakDuration3BOX.value);
    }
}

plusBtnBOX.onclick = function () {
    if (numberBOX < maxBOX) {
        numberBOX = numberBOX + 1;
        formSettingsFieldsBOX.intervalDurationBOX.value = numberBOX; /// Display the value in place of the numberBOX
        //fix here to change pranayama type
        formSettingsFieldsBOX.breakDurationBOX.value = formSettingsFieldsBOX.intervalDurationBOX.value;
        formSettingsFieldsBOX.breakDuration2BOX.value = formSettingsFieldsBOX.intervalDurationBOX.value;
        formSettingsFieldsBOX.breakDuration3BOX.value = formSettingsFieldsBOX.intervalDurationBOX.value;
        setTimerSettingsBOX(9999, formSettingsFieldsBOX.intervalDurationBOX.value, true, formSettingsFieldsBOX.breakDurationBOX.value, true, formSettingsFieldsBOX.breakDuration2BOX.value, true, formSettingsFieldsBOX.breakDuration3BOX.value);

    }
}

function initializeTimerSettingsFormBOX() {
    const oneDayInSecondsBRE = 60 * 60 * 24;
    let lastUserSetEnableBreakBOX = timerSettingsBOX.enableBreakBOX;
    let lastUserSetEnableBreak2BOX = timerSettingsBOX.enableBreak2BOX;
    let lastUserSetEnableBreak3BOX = timerSettingsBOX.enableBreak3BOX;

    formSettingsFieldsBOX = {
        intervalCountBOX: document.getElementById('intervalCountInputBOX'),
        intervalDurationBOX: document.getElementById('intervalDurationInputBOX'),
        enableBreakBOX: document.getElementById('enableBreakInputBOX'),
        breakDurationBOX: document.getElementById('breakDurationInputBOX'),
        enableBreak2BOX: document.getElementById('enableBreakInput2BOX'),
        breakDuration2BOX: document.getElementById('breakDurationInput2BOX'),
        enableBreak3BOX: document.getElementById('enableBreakInput3BOX'),
        breakDuration3BOX: document.getElementById('breakDurationInput3BOX'),
    };

    formSettingsFieldsBOX.intervalCountBOX.value = timerSettingsBOX.intervalCountBOX;
    formSettingsFieldsBOX.intervalDurationBOX.value = timerSettingsBOX.intervalDurationBOX;
    formSettingsFieldsBOX.enableBreakBOX.checked = timerSettingsBOX.enableBreakBOX;
    formSettingsFieldsBOX.breakDurationBOX.value = timerSettingsBOX.breakDurationBOX;
    formSettingsFieldsBOX.enableBreak2BOX.checked = timerSettingsBOX.enableBreak2BOX;
    formSettingsFieldsBOX.breakDuration2BOX.value = timerSettingsBOX.breakDuration2BOX;
    formSettingsFieldsBOX.enableBreak3BOX.checked = timerSettingsBOX.enableBreak3BOX;
    formSettingsFieldsBOX.breakDuration3BOX.value = timerSettingsBOX.breakDuration3BOX;

    function getNumberInBoundsOrDefaultBOX(value, minBOX, maxBOX, def = 1) {
        const valueAsNumberBOX = parseInt(value);
        return isNaN(valueAsNumberBOX) ? def : Math.max(minBOX, Math.min(valueAsNumberBOX, maxBOX));
    }

    function setBreakDurationLineDisplayBOX(displayed) {
        const breakDurationInputLineEltBOX = document.getElementById('breakDurationInputLineBOX');
        breakDurationInputLineEltBOX.style.display = displayed ? null : 'none';
        const breakDurationInputLineElt2BOX = document.getElementById('breakDurationInputLine2BOX');
        breakDurationInputLineElt2BOX.style.display = displayed ? null : 'none';
        const breakDurationInputLineElt3BOX = document.getElementById('breakDurationInputLine3BOX');
        breakDurationInputLineElt3BOX.style.display = displayed ? null : 'none';
    }

    formSettingsFieldsBOX.intervalCountBOX.addEventListener('input', () => {
        const intervalCountBOX = getNumberInBoundsOrDefaultBOX(formSettingsFieldsBOX.intervalCountBOX.value, 1, 9999),
            hasOneIntervalBOX = intervalCountBOX === 1,
            hasBreakBOX = hasOneIntervalBOX ? false : lastUserSetEnableBreakBOX;

        formSettingsFieldsBOX.enableBreakBOX.disabled = hasOneIntervalBOX === true;
        formSettingsFieldsBOX.enableBreakBOX.checked = hasBreakBOX;

        setBreakDurationLineDisplayBOX(hasBreakBOX);

        setTimerSettingsBOX(intervalCountBOX, undefined, hasBreakBOX);
        updateInfoBOX();
    });

    formSettingsFieldsBOX.intervalDurationBOX.addEventListener('input', () => {
        setTimerSettingsBOX(undefined, getNumberInBoundsOrDefaultBOX(formSettingsFieldsBOX.intervalDurationBOX.value, 1, oneDayInSecondsBRE));
        updateInfoBOX();
    });

    formSettingsFieldsBOX.enableBreakBOX.addEventListener('change', () => {
        const enableBreakBOX = formSettingsFieldsBOX.enableBreakBOX.checked;

        lastUserSetEnableBreakBOX = enableBreakBOX;
        setBreakDurationLineDisplayBOX(enableBreakBOX);
        setTimerSettingsBOX(undefined, undefined, enableBreakBOX);
        updateInfoBOX();
    });

    formSettingsFieldsBOX.breakDurationBOX.addEventListener('input', () => {
        setTimerSettingsBOX(undefined, undefined, undefined,
            getNumberInBoundsOrDefaultBOX(formSettingsFieldsBOX.breakDurationBOX.value, 1, oneDayInSecondsBRE)
        );
        updateInfoBOX();
    });

    formSettingsFieldsBOX.enableBreak2BOX.addEventListener('change', () => {
        const enableBreak2BOX = formSettingsFieldsBOX.enableBreak2BOX.checked;

        lastUserSetEnableBreak2BOX = enableBreak2BOX;
        setBreakDurationLineDisplayBOX(enableBreak2BOX);
        setTimerSettingsBOX(undefined, undefined, undefined, undefined, enableBreak2BOX);
        updateInfoBOX();
    });

    formSettingsFieldsBOX.breakDuration2BOX.addEventListener('input', () => {
        setTimerSettingsBOX(undefined, undefined, undefined, undefined, undefined,
            getNumberInBoundsOrDefaultBOX(formSettingsFieldsBOX.breakDuration2BOX.value, 1, oneDayInSecondsBRE)
        );
        updateInfoBOX();
    });

    formSettingsFieldsBOX.enableBreak3BOX.addEventListener('change', () => {
        const enableBreak3BOX = formSettingsFieldsBOX.enableBreak3BOX.checked;

        lastUserSetEnableBreak3BOX = enableBreak2BOX;
        setBreakDurationLineDisplayBOX(enableBreak3BOX);
        setTimerSettingsBOX(undefined, undefined, undefined, undefined, undefined, undefined, enableBreak3BOX);
        updateInfoBOX();
    });

    formSettingsFieldsBOX.breakDuration3BOX.addEventListener('input', () => {
        setTimerSettingsBOX(
            undefined, undefined, undefined, undefined, undefined, undefined, undefined,
            getNumberInBoundsOrDefaultBOX(formSettingsFieldsBOX.breakDuration3BOX.value, 1, oneDayInSecondsBRE)
        );
        updateInfoBOX();
    });
}

function initializeTimerControlsBOX() {
    timerControlsButtonsBOX = {
        startBOX: document.getElementById('startBtnBOX'),
        pauseBOX: document.getElementById('pauseBtnBOX'),
        stopBOX: document.getElementById('stopBtnBOX'),
    };

    setTimerControlsDisabledStateBOX(false, true, true);

    timerControlsButtonsBOX.startBOX.addEventListener('click', startTimerBOX);
    timerControlsButtonsBOX.pauseBOX.addEventListener('click', pauseTimerBOX);
    timerControlsButtonsBOX.stopBOX.addEventListener('click', stopTimerBOX);
}

function initializeStatusPanelBOX() {
    statusPanelBOX = {
        timeOverviewMessageBOX: document.getElementById('timeOverviewMessageBOX'),

        elapsedInIntervalBoxBOX: document.getElementById('elapsedInIntervalBoxBOX'),
        elapsedInBreakIntervalBoxBOX: document.getElementById('elapsedInBreakIntervalBoxBOX'),
        elapsedInIntervalBOX: document.getElementById('elapsedInIntervalBOX'),
        elapsedInBreakIntervalBOX: document.getElementById('elapsedInBreakIntervalBOX'),
        elapsedInBreakIntervalBox2BOX: document.getElementById('elapsedInBreakIntervalBox2BOX'),
        elapsedInBreakInterval2BOX: document.getElementById('elapsedInBreakInterval2BOX'),
        elapsedInBreakIntervalBox3BOX: document.getElementById('elapsedInBreakIntervalBox3BOX'),
        elapsedInBreakInterval3BOX: document.getElementById('elapsedInBreakInterval3BOX'),

        intervalsDoneBOX: document.getElementById('intervalsDoneBOX'),
    };
}

function setTimerControlsDisabledStateBOX(startBOX, pauseBOX, stopBOX) {
    timerControlsButtonsBOX.startBOX.disabled = startBOX;
    timerControlsButtonsBOX.pauseBOX.disabled = pauseBOX;
    timerControlsButtonsBOX.stopBOX.disabled = stopBOX;
}

function setFormDisabledStateBOX(disabled) {
    formSettingsFieldsBOX.intervalCountBOX.disabled = disabled;
    formSettingsFieldsBOX.intervalDurationBOX.disabled = disabled;
    formSettingsFieldsBOX.enableBreakBOX.disabled = disabled || timerSettingsBOX.intervalCountBOX === 1;
    formSettingsFieldsBOX.breakDurationBOX.disabled = disabled;
    formSettingsFieldsBOX.enableBreak2BOX.disabled = disabled
    formSettingsFieldsBOX.breakDuration2BOX.disabled = disabled;
    formSettingsFieldsBOX.enableBreak3BOX.disabled = disabled
    formSettingsFieldsBOX.breakDuration3BOX.disabled = disabled;
    minusBtnBOX.disabled = disabled;
    plusBtnBOX.disabled = disabled;
}

function startTimerBOX() {
    if (intBOX !== null) {
        clearInterval(intBOX);
    }
    intBOX = setInterval(displayTimerBOX, 1000);
    setFormDisabledStateBOX(true);
    setTimerControlsDisabledStateBOX(true, false, true);
    timerControlsButtonsBOX.stopBOX.style.color = "rgb(177, 177, 177)";
    if (timerBOX.isBreak3BOX) {
        if (!ismuteBOX) {
            audioListBOX[0].muted = false;
            audioListBOX[0].play();
        }
    }
    isBOXON = true;
    if (!audioPlayerBRT.muted) {
        playSelectedSongBRT(true);
    }
    if (timerBOX.isFinishedBOX) {
        resetTimerBOX();
    }
    startTimerTickBOX();
    timerControlsButtonsBOX.startBOX.style.display = 'none';
    timerControlsButtonsBOX.pauseBOX.style.display = 'inline';
    document.getElementById('BOXSettings').disabled = true;
    document.getElementById('BOXSettings').style.color = 'rgb(177, 177, 177)';
    document.getElementById('BOXSave').disabled = true;
    document.getElementById('BOXSave').style.color = 'rgb(177, 177, 177)';
}

function pauseTimerBOX() {
    clearInterval(intBOX);
    setTimerControlsDisabledStateBOX(false, true, false);
    document.getElementById('stopBtnBOX').style.color = '#990000';
    timerControlsButtonsBOX.pauseBOX.style.display = 'none';
    timerControlsButtonsBOX.startBOX.style.display = 'inline';
    document.getElementById('BOXSettings').disabled = false;
    document.getElementById('BOXSettings').style.color = '#49B79D';
    if (!audioPlayerBRT.muted) {
        audioPlayerBRT.pause();
    }
    stopTimerTickBOX();
    isBOXON = false;
    document.getElementById('BOXDate').value = date;
    document.getElementById('BOXSave').disabled = false;
    document.getElementById('BOXSave').style.color = '#49B79D';
}

function stopTimerBOX() {
    clearInterval(intBOX);
    [secondsBOX, minutesBOX, hoursBOX] = [0, 0, 0];
    timerRefBOX.value = '00 : 00 : 00';
    audioPlayerBRT.currentTime = 0
    timerControlsButtonsBOX.pauseBOX.style.display = 'none';
    timerControlsButtonsBOX.startBOX.style.display = 'inline';
    setFormDisabledStateBOX(false);
    setTimerControlsDisabledStateBOX(false, true, true);
    timerControlsButtonsBOX.stopBOX.style.color = "rgb(177, 177, 177)";
    document.getElementById('BOXSave').disabled = true;
    document.getElementById('BOXSave').style.color = 'rgb(177, 177, 177)';
    stopTimerTickBOX();
    resetTimerBOX();
    isBOXON = false;
}

function displayTimerBOX() {
    secondsBOX++;
    if (secondsBOX == 60) {
        secondsBOX = 0;
        minutesBOX++;
        if (minutesBOX == 60) {
            minutesBOX = 0;
            hoursBOX++;
        }
    }
    let hBOX = hoursBOX < 10 ? "0" + hoursBOX : hoursBOX;
    let mBOX = minutesBOX < 10 ? "0" + minutesBOX : minutesBOX;
    let sBOX = secondsBOX < 10 ? "0" + secondsBOX : secondsBOX;
    timerRefBOX.value = `${hBOX} : ${mBOX} : ${sBOX}`;
}

function startTimerTickBOX() {
    timerBOX.intervalId = setInterval(onTimerTickBOX, 1000);
}

function stopTimerTickBOX() {
    clearInterval(timerBOX.intervalId);
}

function onTimerTickBOX() {
    const currentIntervalDurationBOX = timerBOX.isBreakBOX ? timerSettingsBOX.breakDurationBOX : timerBOX.isBreak2BOX ? timerSettingsBOX.breakDuration2BOX : timerBOX.isBreak4BOX ? timerSettingsBOX.breakDuration3BOX : timerSettingsBOX.intervalDurationBOX;
    if (timerBOX.elapsedInIntervalBOX <= currentIntervalDurationBOX && timerBOX.isBreak3BOX) {
        timerBOX.elapsedInIntervalBOX++;
        if (timerBOX.elapsedInIntervalBOX > currentIntervalDurationBOX && timerBOX.isBreak3BOX) {
            if (!ismuteBOX) {
                audioListBOX[3].muted = false;
                audioListBOX[3].play();
            }
            timerBOX.isBreakBOX = true;
            timerBOX.isBreak3BOX = false;
            timerBOX.isFinishedBOX = timerBOX.intervalsDoneBOX === timerSettingsBOX.intervalCountBOX;
            if (!timerBOX.isFinishedBOX) {
                timerBOX.elapsedInIntervalBOX = 1;
            }
            if (timerBOX.isFinishedBOX) {
                setTimerControlsDisabledStateBOX(false, true, true);
                setFormDisabledStateBOX(false);
                stopTimerTickBOX();
            } else {
                timerBOX.totalTimeElapsedBOX++;
            }
            updateInfoBOX();
        }
        updateInfoBOX();
    } else if (timerBOX.elapsedInIntervalBOX <= currentIntervalDurationBOX && timerBOX.isBreakBOX) {
        timerBOX.elapsedInIntervalBOX++;
        if (timerBOX.elapsedInIntervalBOX > currentIntervalDurationBOX && timerBOX.isBreakBOX) {
            if (!ismuteBOX) {
                audioListBOX[2].muted = false;
                audioListBOX[2].play();
            }
            timerBOX.isBreak2BOX = true;
            timerBOX.isBreakBOX = false;
            timerBOX.isFinishedBOX = timerBOX.intervalsDoneBOX === timerSettingsBOX.intervalCountBOX;
            if (!timerBOX.isFinishedBOX) {
                timerBOX.elapsedInIntervalBOX = 1;
            }
            if (timerBOX.isFinishedBOX) {
                setTimerControlsDisabledStateBOX(false, true, true);
                setFormDisabledStateBOX(false);
                stopTimerTickBOX();
            } else {
                timerBOX.totalTimeElapsedBOX++;
            }
            updateInfoBOX();
        }
        updateInfoBOX();
    } else if (timerBOX.elapsedInIntervalBOX <= currentIntervalDurationBOX && timerBOX.isBreak2BOX) {
        timerBOX.elapsedInIntervalBOX++;
        if (timerBOX.elapsedInIntervalBOX > currentIntervalDurationBOX && timerBOX.isBreak2BOX) {
            if (!ismuteBOX) {
                audioListBOX[3].muted = false;
                audioListBOX[3].play();
            }
            timerBOX.isBreak4BOX = true;
            timerBOX.isBreak2BOX = false;
            timerBOX.isFinishedBOX = timerBOX.intervalsDoneBOX === timerSettingsBOX.intervalCountBOX;
            if (!timerBOX.isFinishedBOX) {
                timerBOX.elapsedInIntervalBOX = 1;
            }
            if (timerBOX.isFinishedBOX) {
                setTimerControlsDisabledStateBOX(false, true, true);
                setFormDisabledStateBOX(false);
                stopTimerTickBOX();
            } else {
                timerBOX.totalTimeElapsedBOX++;
            }
            updateInfoBOX();
        }
        updateInfoBOX();
    } else if (timerBOX.elapsedInIntervalBOX <= currentIntervalDurationBOX && timerBOX.isBreak4BOX) {
        timerBOX.elapsedInIntervalBOX++;
        if (timerBOX.elapsedInIntervalBOX > currentIntervalDurationBOX && timerBOX.isBreak4BOX) {
            if (!ismuteBOX) {
                audioListBOX[0].muted = false;
                audioListBOX[0].play();
            }
            timerBOX.isBreak3BOX = true;
            timerBOX.isBreak4BOX = false;
            timerBOX.intervalsDoneBOX++;
            timerBOX.isFinishedBOX = timerBOX.intervalsDoneBOX === timerSettingsBOX.intervalCountBOX;
            if (!timerBOX.isFinishedBOX) {
                timerBOX.elapsedInIntervalBOX = 1;
            }
            if (timerBOX.isFinishedBOX) {
                setTimerControlsDisabledStateBOX(false, true, true);
                setFormDisabledStateBOX(false);
                stopTimerTickBOX();
            } else {
                timerBOX.totalTimeElapsedBOX++;
            }
            updateInfoBOX();
        }
        updateInfoBOX();
    }
}

function updateInfoBOX() {
    statusPanelBOX.timeOverviewMessageBOX.style.display = timerBOX.isFinishedBOX ? 'block' : null;
    statusPanelBOX.elapsedInIntervalBoxBOX.style.display = timerBOX.isFinishedBOX || timerBOX.isBreakBOX || timerBOX.isBreak2BOX || timerBOX.isBreak4BOX ? 'none' : null;
    statusPanelBOX.elapsedInBreakIntervalBoxBOX.style.display = !timerBOX.isFinishedBOX && timerBOX.isBreakBOX ? 'block' : null;
    statusPanelBOX.elapsedInBreakIntervalBox2BOX.style.display = !timerBOX.isFinishedBOX && timerBOX.isBreak2BOX ? 'block' : null;
    statusPanelBOX.elapsedInBreakIntervalBox3BOX.style.display = !timerBOX.isFinishedBOX && timerBOX.isBreak4BOX ? 'block' : null;

    if (timerBOX.isBreakBOX) {
        statusPanelBOX.elapsedInBreakIntervalBOX.textContent = timerBOX.elapsedInIntervalBOX;
    } else if (timerBOX.isBreak2BOX) {
        statusPanelBOX.elapsedInBreakInterval2BOX.textContent = timerBOX.elapsedInIntervalBOX;
    } else if (timerBOX.isBreak4BOX) {
        statusPanelBOX.elapsedInBreakInterval3BOX.textContent = timerBOX.elapsedInIntervalBOX;
    } else {
        statusPanelBOX.elapsedInIntervalBOX.textContent = timerBOX.elapsedInIntervalBOX;
    }
    statusPanelBOX.intervalsDoneBOX.value = timerBOX.intervalsDoneBOX;
}
//---------------------------------------------------//
