/*CB JS*/
const CBmodal = document.getElementById("CBmodal");
const CBcloseModal = document.getElementById("CBcloseModal");
const CBBTN = document.getElementById("CBBTN");

function CBopenmodal() {
    CBmodal.style.display = "block";
    audioObjects.exhale.load();
    audioObjects.inhale.load();
}
// Function to close the modal
function CBclose() {
    CBmodal.style.display = "none";
    clearInterval(intCB);
    [secondsCB, minutesCB, hoursCB] = [0, 0, 0];
    timerRefCB.value = '00 : 00 : 00';
    if (!audioPlayerBRT.muted) {
        audioPlayerBRT.pause();
    }
    audioPlayerBRT.currentTime = 0;
    timerControlsButtonsCB.pauseCB.style.display = 'none';
    timerControlsButtonsCB.startCB.style.display = 'inline';
    setFormDisabledStateCB(false);
    setTimerControlsDisabledStateCB(false, true, true);
    timerControlsButtonsCB.stopCB.style.color = "rgb(177, 177, 177)";
    document.getElementById('CBSave').disabled = true;
    document.getElementById('CBSave').style.color = 'rgb(177, 177, 177)';
    document.getElementById('CBSettings').disabled = false;
    document.getElementById('CBSettings').style.color = '#49B79D';
    stopTimerTickCB();
    resetTimerCB();
    isCBON = false;
    document.getElementById('CBResultSaved').innerHTML = "";
}
// Event listener for closing the modal
CBcloseModal.addEventListener("click", CBclose);
CBBTN.onclick = function () {
    CBopenmodal();
}
$(function () {
    $('#CBForm').on('submit', function (e) {
        e.preventDefault(); // Prevent the default form submission

        var formData = new FormData(this); // Get the form data

        $.ajax({
            url: "/",
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function (result) {
                $('#CBResultSaved').html(result); // Update the result section with the server response
            }
        });
        clearInterval(intCB);
        [secondsCB, minutesCB, hoursCB] = [0, 0, 0];
        timerRefCB.value = '00 : 00 : 00';
        audioPlayerBRT.currentTime = 0
        timerControlsButtonsCB.pauseCB.style.display = 'none';
        timerControlsButtonsCB.startCB.style.display = 'inline';
        setFormDisabledStateCB(false);
        setTimerControlsDisabledStateCB(false, true, true);
        timerControlsButtonsCB.stopCB.style.color = "rgb(177, 177, 177)";
        document.getElementById('CBSave').disabled = true;
        document.getElementById('CBSave').style.color = 'rgb(177, 177, 177)';
        stopTimerTickCB();
        resetTimerCB();
    });
});

let
    formSettingsFieldsCB,
    timerControlsButtonsCB,
    statusPanelCB,
    timerCB,
    timerSettingsCB;

function setTimerSettingsCB(
    intervalCountCB = timerSettingsCB.intervalCountCB,
    intervalDurationCB = timerSettingsCB.intervalDurationCB,
    enableBreakCB = timerSettingsCB.enableBreakCB,
    breakDurationCB = timerSettingsCB.breakDurationCB
) {
    timerSettingsCB = {
        intervalCountCB,
        intervalDurationCB,
        enableBreakCB,
        breakDurationCB
    };
}

function resetTimerCB() {
    timerCB = {
        totalTimeElapsedCB: 0,
        elapsedInIntervalCB: 0,
        intervalsDoneCB: 0,
        isBreak3CB: true,
        isBreakCB: false
    };
    updateInfoCB();
}

let [secondsCB, minutesCB, hoursCB] = [0, 0, 0];
let timerRefCB = document.getElementById('timerDisplayCB');
let intCB = null;
document.getElementById('stopBtnCB').disabled = true;
document.getElementById('stopBtnCB').style.color = 'rgb(177, 177, 177)';
document.getElementById('CBSave').disabled = true;
document.getElementById('CBSave').style.color = 'rgb(177, 177, 177)';

var audioCB = document.getElementById("audioCB"),
    muteCB = document.getElementById("muteCB"),
    ismuteCB = false;

audioPlayerBRT.loop = true;

var audioSongCB = document.getElementById("songCB"),
    muteSongCB = document.getElementById("songMuteCB");

// Get the volumeVCB bar element
const volumeVoiceCB = document.getElementById('volumeVoiceCB');

// Add an event listener for the volumeVCB change event
volumeVoiceCB.addEventListener('input', function () {
    // Get the current volumeVCB value
    const volumeVCB = parseFloat(volumeVoiceCB.value);

    // Check if volumeVCB is 0 and mute the media if necessary
    if (volumeVCB === 0) {
        audioObjects.inhale.muted = true;
        audioObjects.exhale.muted = true;
        audioCB.style.display = "none";
        muteCB.style.display = "block";
        ismuteCB = true;
    } else {
        audioObjects.inhale.muted = false;
        audioObjects.exhale.muted = false;
        muteCB.style.display = "none";
        audioCB.style.display = "block";
        ismuteCB = false;
    }
});
// Get the volumeSCB bar element
const volumeSongCB = document.getElementById('volumeSongCB');

// Add an event listener for the volumeSCB change event
volumeSongCB.addEventListener('input', function () {
    // Get the current volumeSCB value
    const volumeSCB = parseFloat(volumeSongCB.value);

    // Check if volumeSCB is 0 and mute the media if necessary
    if (volumeSCB === 0) {
        audioPlayerBRT.muted = true;
        audioSongCB.style.display = "none";
        muteSongCB.style.display = "block";
    } else {
        audioPlayerBRT.muted = false;
        muteSongCB.style.display = "none";
        audioSongCB.style.display = "block";
    }
});


var inhaleCB = 5.5;
var exhaleCB = 5.5;
setTimerSettingsCB(9999, inhaleCB, true, exhaleCB);
initializeTimerControlsCB();
initializeStatusPanelCB();
initializeTimerSettingsFormCB();
resetTimerCB();


function initializeTimerSettingsFormCB() {
    const oneDayInSecondsBRE = 60 * 60 * 24;
    let lastUserSetEnableBreakCB = timerSettingsCB.enableBreakCB;

    formSettingsFieldsCB = {
        intervalCountCB: document.getElementById('intervalCountInputCB'),
        intervalDurationCB: document.getElementById('intervalDurationInputCB'),
        enableBreakCB: document.getElementById('enableBreakInputCB'),
        breakDurationCB: document.getElementById('breakDurationInputCB')
    };

    formSettingsFieldsCB.intervalCountCB.value = timerSettingsCB.intervalCountCB;
    formSettingsFieldsCB.intervalDurationCB.value = timerSettingsCB.intervalDurationCB;
    formSettingsFieldsCB.enableBreakCB.checked = timerSettingsCB.enableBreakCB;
    formSettingsFieldsCB.breakDurationCB.value = timerSettingsCB.breakDurationCB;

    function getNumberInBoundsOrDefaultCB(value, minCB, maxCB, def = 1) {
        const valueAsNumberCB = parseInt(value);
        return isNaN(valueAsNumberCB) ? def : Math.max(minCB, Math.min(valueAsNumberCB, maxCB));
    }

    function setBreakDurationLineDisplayCB(displayed) {
        const breakDurationInputLineEltCB = document.getElementById('breakDurationInputLineCB');
        breakDurationInputLineEltCB.style.display = displayed ? null : 'none';
        const breakDurationInputLineElt2CB = document.getElementById('breakDurationInputLine2CB');
        breakDurationInputLineElt2CB.style.display = displayed ? null : 'none';
        const breakDurationInputLineElt3CB = document.getElementById('breakDurationInputLine3CB');
        breakDurationInputLineElt3CB.style.display = displayed ? null : 'none';
    }

    formSettingsFieldsCB.intervalCountCB.addEventListener('input', () => {
        const intervalCountCB = getNumberInBoundsOrDefaultCB(formSettingsFieldsCB.intervalCountCB.value, 1, 9999),
            hasOneIntervalCB = intervalCountCB === 1,
            hasBreakCB = hasOneIntervalCB ? false : lastUserSetEnableBreakCB;

        formSettingsFieldsCB.enableBreakCB.disabled = hasOneIntervalCB === true;
        formSettingsFieldsCB.enableBreakCB.checked = hasBreakCB;

        setBreakDurationLineDisplayCB(hasBreakCB);

        setTimerSettingsCB(intervalCountCB, undefined, hasBreakCB);
        updateInfoCB();
    });

    formSettingsFieldsCB.intervalDurationCB.addEventListener('input', () => {
        setTimerSettingsCB(undefined, getNumberInBoundsOrDefaultCB(formSettingsFieldsCB.intervalDurationCB.value, 1, oneDayInSecondsBRE));
        updateInfoCB();
    });

    formSettingsFieldsCB.enableBreakCB.addEventListener('change', () => {
        const enableBreakCB = formSettingsFieldsCB.enableBreakCB.checked;

        lastUserSetEnableBreakCB = enableBreakCB;
        setBreakDurationLineDisplayCB(enableBreakCB);
        setTimerSettingsCB(undefined, undefined, enableBreakCB);
        updateInfoCB();
    });

    formSettingsFieldsCB.breakDurationCB.addEventListener('input', () => {
        setTimerSettingsCB(undefined, undefined, undefined,
            getNumberInBoundsOrDefaultCB(formSettingsFieldsCB.breakDurationCB.value, 1, oneDayInSecondsBRE)
        );
        updateInfoCB();
    });
}

function initializeTimerControlsCB() {
    timerControlsButtonsCB = {
        startCB: document.getElementById('startBtnCB'),
        pauseCB: document.getElementById('pauseBtnCB'),
        stopCB: document.getElementById('stopBtnCB'),
    };

    setTimerControlsDisabledStateCB(false, true, true);

    timerControlsButtonsCB.startCB.addEventListener('click', startTimerCB);
    timerControlsButtonsCB.pauseCB.addEventListener('click', pauseTimerCB);
    timerControlsButtonsCB.stopCB.addEventListener('click', stopTimerCB);
}

function initializeStatusPanelCB() {
    statusPanelCB = {
        timeOverviewMessageCB: document.getElementById('timeOverviewMessageCB'),

        elapsedInIntervalBoxCB: document.getElementById('elapsedInIntervalBoxCB'),
        elapsedInBreakIntervalBoxCB: document.getElementById('elapsedInBreakIntervalBoxCB'),
        elapsedInIntervalCB: document.getElementById('elapsedInIntervalCB'),
        elapsedInBreakIntervalCB: document.getElementById('elapsedInBreakIntervalCB'),
        intervalsDoneCB: document.getElementById('intervalsDoneCB'),
    };
}

function setTimerControlsDisabledStateCB(startCB, pauseCB, stopCB) {
    timerControlsButtonsCB.startCB.disabled = startCB;
    timerControlsButtonsCB.pauseCB.disabled = pauseCB;
    timerControlsButtonsCB.stopCB.disabled = stopCB;
}

function setFormDisabledStateCB(disabled) {
    formSettingsFieldsCB.intervalCountCB.disabled = disabled;
    formSettingsFieldsCB.intervalDurationCB.disabled = disabled;
    formSettingsFieldsCB.enableBreakCB.disabled = disabled || timerSettingsCB.intervalCountCB === 1;
    formSettingsFieldsCB.breakDurationCB.disabled = disabled;
}

function startTimerCB() {
    if (intCB !== null) {
        clearInterval(intCB);
    }
    intCB = setInterval(displayTimerCB, 1000);
    setFormDisabledStateCB(true);
    setTimerControlsDisabledStateCB(true, false, true);
    timerControlsButtonsCB.stopCB.style.color = "rgb(177, 177, 177)";
    if (timerCB.isBreak3CB) {
        if (!ismuteCB) {
            audioObjects.bell.muted = false;
            audioObjects.bell.play();
            setTimeout(() => {
                audioObjects.inhale.muted = false;
                audioObjects.inhale.play();
            }, 1500);         
        }
    }
    if (!audioPlayerBRT.muted) {
        playSelectedSongBRT(true);
    }
    if (timerCB.isFinishedCB) {
        resetTimerCB();
    }
    setTimeout(() => {
        startTimerTickCB();
    }, 1700);
    timerControlsButtonsCB.startCB.style.display = 'none';
    timerControlsButtonsCB.pauseCB.style.display = 'inline';
    document.getElementById('CBSettings').disabled = true;
    document.getElementById('CBSettings').style.color = 'rgb(177, 177, 177)';
    document.getElementById('CBSave').disabled = true;
    document.getElementById('CBSave').style.color = 'rgb(177, 177, 177)';
}

function pauseTimerCB() {
    clearInterval(intCB);
    setTimerControlsDisabledStateCB(false, true, false);
    document.getElementById('stopBtnCB').style.color = '#990000';
    timerControlsButtonsCB.pauseCB.style.display = 'none';
    timerControlsButtonsCB.startCB.style.display = 'inline';
    document.getElementById('CBSettings').disabled = false;
    document.getElementById('CBSettings').style.color = '#49B79D';
    if (!audioPlayerBRT.muted) {
        audioPlayerBRT.pause();
    }
    stopTimerTickCB();
    document.getElementById('CBDate').value = date;
    document.getElementById('CBSave').disabled = false;
    document.getElementById('CBSave').style.color = '#49B79D';
}

function stopTimerCB() {
    clearInterval(intCB);
    [secondsCB, minutesCB, hoursCB] = [0, 0, 0];
    timerRefCB.value = '00 : 00 : 00';
    audioPlayerBRT.currentTime = 0
    timerControlsButtonsCB.pauseCB.style.display = 'none';
    timerControlsButtonsCB.startCB.style.display = 'inline';
    setFormDisabledStateCB(false);
    setTimerControlsDisabledStateCB(false, true, true);
    timerControlsButtonsCB.stopCB.style.color = "rgb(177, 177, 177)";
    document.getElementById('CBSave').disabled = true;
    document.getElementById('CBSave').style.color = 'rgb(177, 177, 177)';
    stopTimerTickCB();
    resetTimerCB();
}

function displayTimerCB() {
    secondsCB++;
    if (secondsCB == 60) {
        secondsCB = 0;
        minutesCB++;
        if (minutesCB == 60) {
            minutesCB = 0;
            hoursCB++;
        }
    }
    let hCB = hoursCB < 10 ? "0" + hoursCB : hoursCB;
    let mCB = minutesCB < 10 ? "0" + minutesCB : minutesCB;
    let sCB = secondsCB < 10 ? "0" + secondsCB : secondsCB;
    timerRefCB.value = `${hCB} : ${mCB} : ${sCB}`;
}

function startTimerTickCB() {
    timerCB.intervalId = setInterval(onTimerTickCB, 500);
}

function stopTimerTickCB() {
    clearInterval(timerCB.intervalId);
}

function onTimerTickCB() {
    const currentIntervalDurationCB = timerCB.isBreakCB ? timerSettingsCB.breakDurationCB : timerSettingsCB.intervalDurationCB;
    if (timerCB.elapsedInIntervalCB <= currentIntervalDurationCB && timerCB.isBreak3CB) {
        timerCB.elapsedInIntervalCB = timerCB.elapsedInIntervalCB + 0.5;
        if (timerCB.elapsedInIntervalCB == 5.0 && timerCB.isBreak3CB) {
            if (!ismuteCB) {
                setTimeout(() => {
                    audioObjects.exhale.muted = false;
                    audioObjects.exhale.play();
                }, 450);
            }
        }
        if (timerCB.elapsedInIntervalCB > currentIntervalDurationCB && timerCB.isBreak3CB) {
            timerCB.isBreakCB = true;
            timerCB.isBreak3CB = false;
            timerCB.isFinishedCB = timerCB.intervalsDoneCB === timerSettingsCB.intervalCountCB;
            if (!timerCB.isFinishedCB) {
                timerCB.elapsedInIntervalCB = 0.5;
            }
            if (timerCB.isFinishedCB) {
                setTimerControlsDisabledStateCB(false, true, true);
                setFormDisabledStateCB(false);
                stopTimerTickCB();
            } else {
                timerCB.totalTimeElapsedCB++;
            }
            updateInfoCB();
        }
        updateInfoCB();
    } else if (timerCB.elapsedInIntervalCB <= currentIntervalDurationCB && timerCB.isBreakCB) {
        timerCB.elapsedInIntervalCB = timerCB.elapsedInIntervalCB + 0.5;
        if (timerCB.elapsedInIntervalCB == 5.0 && timerCB.isBreakCB) {
            if (!ismuteCB) {
                setTimeout(() => {
                    audioObjects.inhale.muted = false;
                    audioObjects.inhale.play();
                }, 450);
            }
        }
        if (timerCB.elapsedInIntervalCB > currentIntervalDurationCB && timerCB.isBreakCB) {
            timerCB.isBreak3CB = true;
            timerCB.isBreakCB = false;
            timerCB.intervalsDoneCB++;
            timerCB.isFinishedCB = timerCB.intervalsDoneCB === timerSettingsCB.intervalCountCB;
            if (!timerCB.isFinishedCB) {
                timerCB.elapsedInIntervalCB = 0.5;
            }
            if (timerCB.isFinishedCB) {
                setTimerControlsDisabledStateCB(false, true, true);
                setFormDisabledStateCB(false);
                stopTimerTickCB();
            } else {
                timerCB.totalTimeElapsedCB++;
            }
            updateInfoCB();
        }
        updateInfoCB();
    } 
}

function updateInfoCB() {
    statusPanelCB.timeOverviewMessageCB.style.display = timerCB.isFinishedCB ? 'block' : null;
    statusPanelCB.elapsedInIntervalBoxCB.style.display = timerCB.isFinishedCB || timerCB.isBreakCB || timerCB.isBreak2CB || timerCB.isBreak4CB ? 'none' : null;
    statusPanelCB.elapsedInBreakIntervalBoxCB.style.display = !timerCB.isFinishedCB && timerCB.isBreakCB ? 'block' : null;
    if (timerCB.isBreakCB) {
        statusPanelCB.elapsedInBreakIntervalCB.textContent = timerCB.elapsedInIntervalCB.toFixed(1);
    } else {
        statusPanelCB.elapsedInIntervalCB.textContent = timerCB.elapsedInIntervalCB.toFixed(1);
    }
    statusPanelCB.intervalsDoneCB.value = timerCB.intervalsDoneCB;
}
//---------------------------------------------------//