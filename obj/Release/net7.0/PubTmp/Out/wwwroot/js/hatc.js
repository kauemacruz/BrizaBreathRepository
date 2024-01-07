/*HATC JS*/
const HATCmodal = document.getElementById("HATCmodal");
const HATCcloseModal = document.getElementById("HATCcloseModal");
const HATCBTN = document.getElementById("HATCBTN");

function HATCopenmodal() {
    HATCmodal.style.display = "block";
    audioObjects.pinchRun.load();
    audioObjects.normalbreath.load();
}
// Function to close the modal
function HATCclose() {
    HATCmodal.style.display = "none";
    document.getElementById("HATCResults").innerHTML = "";
    timerRefHATC.value = "|";
    clearInterval(intHATC);
    document.getElementById('hatcSettings').disabled = false;
    document.getElementById('hatcSettings').style.color = '#49B79D';
    if (!audioPlayerBRT.muted) {
        audioPlayerBRT.pause();
    }
    timerControlsButtonsHATC.pauseHATC.style.display = 'none';
    timerControlsButtonsHATC.startHATC.style.display = 'inline';
    setFormDisabledStateHATC(false);
    setTimerControlsDisabledStateHATC(false, true, true);
    document.getElementById('resetBtnHATC').style.display = 'none';
    document.getElementById('stopBtnHATC').style.display = 'inline';
    timerControlsButtonsHATC.stopHATC.style.color = "rgb(177, 177, 177)";
    timerControlsButtonsHATC.startHATC.style.color = "#0661AA";
    stopTimerTickHATC();
    resetTimerHATC();
    timerHATC.isFinishedHATC = true;
    isFirstTimeHATC = false;
    document.getElementById('hatcSave').disabled = true;
    document.getElementById('hatcSave').style.color = 'rgb(177, 177, 177)';
    document.getElementById('hatcResultSaved').innerHTML = "";
}
// Event listener for closing the modal
HATCcloseModal.addEventListener("click", HATCclose);
HATCBTN.onclick = function () {
    HATCopenmodal();
}
$(function () {
    $('#hatcForm').on('submit', function (e) {
        e.preventDefault(); // Prevent the default form submission

        var formData = new FormData(this); // Get the form data

        $.ajax({
            url: "/",
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function (result) {
                $('#hatcResultSaved').html(result); // Update the result section with the server response
            }
        });
        document.getElementById("HATCResults").innerHTML = "";
        timerRefHATC.value ="|";
        clearInterval(intHATC);
        document.getElementById('hatcSettings').disabled = false;
        document.getElementById('hatcSettings').style.color = '#49B79D';
        if (!audioPlayerBRT.muted) {
            audioPlayerBRT.pause();
        }
        timerControlsButtonsHATC.pauseHATC.style.display = 'none';
        timerControlsButtonsHATC.startHATC.style.display = 'inline';
        setFormDisabledStateHATC(false);
        setTimerControlsDisabledStateHATC(false, true, true);
        document.getElementById('resetBtnHATC').style.display = 'none';
        document.getElementById('stopBtnHATC').style.display = 'inline';
        timerControlsButtonsHATC.stopHATC.style.color = "rgb(177, 177, 177)";
        timerControlsButtonsHATC.startHATC.style.color = "#0661AA";
        document.getElementById('hatcSave').disabled = true;
        document.getElementById('hatcSave').style.color = 'rgb(177, 177, 177)';
        stopTimerTickHATC();
        resetTimerHATC();
        timerHATC.isFinishedHATC = true;
        isFirstTimeHATC = false;
        stopTimerTickHATC();
    });
});

let formSettingsFieldsHATC,
    timerControlsButtonsHATC,
    statusPanelHATC,
    timerHATC,
    timerSettingsHATC;

function setTimerSettingsHATC(
    intervalCountHATC = timerSettingsHATC.intervalCountHATC,
    intervalDurationHATC = timerSettingsHATC.intervalDurationHATC,
    enableBreakHATC = timerSettingsHATC.enableBreakHATC,
    breakDurationHATC = timerSettingsHATC.breakDurationHATC,
    enableBreak2HATC = timerSettingsHATC.enableBreak2HATC,
    breakDuration2HATC = timerSettingsHATC.breakDuration2HATC
) {
    timerSettingsHATC = {
        intervalCountHATC,
        intervalDurationHATC,
        enableBreakHATC,
        breakDurationHATC,
        enableBreak2HATC,
        breakDuration2HATC,
    };
}

function resetTimerHATC() {
    timerHATC = {
        totalTimeElapsedHATC: 0,
        elapsedInIntervalHATC: 0,
        intervalsDoneHATC: 0,
        isBreak0HATC: true,
        isBreakHATC: false,
        isBreak2HATC: false,
        isFinishedHATC: false
    };
    updateInfoHATC();
}


let [secondsHATC, minutesHATC, hoursHATC] = [0, 0, 0];
let timerRefHATC = document.getElementById('timerDisplayHATC');
let intHATC = null;
document.getElementById('stopBtnHATC').disabled = true;
document.getElementById('stopBtnHATC').style.color = 'rgb(177, 177, 177)';
document.getElementById('hatcSave').disabled = true;
document.getElementById('hatcSave').style.color = 'rgb(177, 177, 177)';

var audioHATC = document.getElementById("audioHATC"),
    muteHATC = document.getElementById("muteHATC"),
    ismuteHATC = false;

audioPlayerBRT.loop = true;

var audioSongHATC = document.getElementById("songHATC"),
    muteSongHATC = document.getElementById("songMuteHATC");
// Get the volumeVhatc bar element
const volumeVoiceHATC = document.getElementById('volumeVoiceHATC');

// Add an event listener for the volumeVhatc change event
volumeVoiceHATC.addEventListener('input', function () {
    // Get the current volumeVhatc value
    const volumeVhatc = parseFloat(volumeVoiceHATC.value);

    // Check if volumeVhatc is 0 and mute the media if necessary
    if (volumeVhatc === 0) {
        audioObjects.pinchRun.muted = true;
        audioObjects.normalbreath.muted = true;
        audioHATC.style.display = "none";
        muteHATC.style.display = "block";
        ismuteHATC = true;
    } else {
        audioObjects.pinchRun.muted = false;
        audioObjects.normalbreath.muted = false;
        muteHATC.style.display = "none";
        audioHATC.style.display = "block";
        ismuteHATC = false;
    }
});
// Get the volumeShatc bar element
const volumeSongHATC = document.getElementById('volumeSongHATC');

// Add an event listener for the volumeShatc change event
volumeSongHATC.addEventListener('input', function () {
    // Get the current volumeShatc value
    const volumeShatc = parseFloat(volumeSongHATC.value);

    // Check if volumeShatc is 0 and mute the media if necessary
    if (volumeShatc === 0) {
        audioPlayerBRT.muted = true;
        audioSongHATC.style.display = "none";
        muteSongHATC.style.display = "block";
    } else {
        audioPlayerBRT.muted = false;
        muteSongHATC.style.display = "none";
        audioSongHATC.style.display = "block";
    }
});

var inhaleHATC = 600;
var holdHATC = 0;
var exhaleHATC = 60;
setTimerSettingsHATC(9999, inhaleHATC, true, holdHATC, true, exhaleHATC);
initializeTimerControlsHATC();
initializeStatusPanelHATC();
initializeTimerSettingsFormHATC();
resetTimerHATC();

function initializeTimerSettingsFormHATC() {
    const oneDayInSecondsHATC = 60 * 60 * 24;
    let lastUserSetEnableBreakHATC = timerSettingsHATC.enableBreakHATC;
    let lastUserSetEnableBreak2HATC = timerSettingsHATC.enableBreak2HATC;
    formSettingsFieldsHATC = {
        intervalCountHATC: document.getElementById('intervalCountInputHATC'),
        intervalDurationHATC: document.getElementById('intervalDurationInputHATC'),
        enableBreakHATC: document.getElementById('enableBreakInputHATC'),
        breakDurationHATC: document.getElementById('breakDurationInputHATC'),
        enableBreak2HATC: document.getElementById('enableBreakInput2HATC'),
        breakDuration2HATC: document.getElementById('breakDurationInput2HATC'),
    };
    formSettingsFieldsHATC.intervalCountHATC.value = timerSettingsHATC.intervalCountHATC;
    formSettingsFieldsHATC.intervalDurationHATC.value = timerSettingsHATC.intervalDurationHATC;
    formSettingsFieldsHATC.enableBreakHATC.checked = timerSettingsHATC.enableBreakHATC;
    formSettingsFieldsHATC.breakDurationHATC.value = timerSettingsHATC.breakDurationHATC;
    formSettingsFieldsHATC.enableBreak2HATC.checked = timerSettingsHATC.enableBreak2HATC;
    formSettingsFieldsHATC.breakDuration2HATC.value = timerSettingsHATC.breakDuration2HATC;

    function getNumberInBoundsOrDefaultHATC(value, minHATC, maxHATC, def = 1) {
        const valueAsNumberHATC = parseInt(value);
        return isNaN(valueAsNumberHATC) ? def : Math.max(minHATC, Math.min(valueAsNumberHATC, maxHATC));
    }

    function setBreakDurationLineDisplayHATC(displayed) {
        const breakDurationInputLineEltHATC = document.getElementById('breakDurationInputLineHATC');
        breakDurationInputLineEltHATC.style.display = displayed ? null : 'none';
        const breakDurationInputLineElt2HATC = document.getElementById('breakDurationInputLine2HATC');
        breakDurationInputLineElt2HATC.style.display = displayed ? null : 'none';
    }

    formSettingsFieldsHATC.intervalCountHATC.addEventListener('input', () => {
        const intervalCountHATC = getNumberInBoundsOrDefaultHATC(formSettingsFieldsHATC.intervalCountHATC.value, 1, 9999),
            hasOneInterval = intervalCountHATC === 1,
            hasBreak = hasOneInterval ? false : lastUserSetEnableBreakHATC;
        formSettingsFieldsHATC.enableBreakHATC.disabled = hasOneInterval === true;
        formSettingsFieldsHATC.enableBreakHATC.checked = hasBreak;
        setBreakDurationLineDisplayHATC(hasBreak);
        setTimerSettingsHATC(intervalCountHATC, undefined, hasBreak);
        updateInfoHATC();
    });

    formSettingsFieldsHATC.intervalDurationHATC.addEventListener('input', () => {
        setTimerSettingsHATC(undefined, getNumberInBoundsOrDefaultHATC(formSettingsFieldsHATC.intervalDurationHATC.value, 1, oneDayInSecondsHATC));
        updateInfoHATC();
    });

    formSettingsFieldsHATC.enableBreakHATC.addEventListener('change', () => {
        const enableBreakHATC = formSettingsFieldsHATC.enableBreakHATC.checked;
        lastUserSetEnableBreakHATC = enableBreakHATC;
        setBreakDurationLineDisplayHATC(enableBreakHATC);
        setTimerSettingsHATC(undefined, undefined, enableBreakHATC);
        updateInfoHATC();
    });

    formSettingsFieldsHATC.breakDurationHATC.addEventListener('input', () => {
        setTimerSettingsHATC(
            undefined, undefined, undefined,
            getNumberInBoundsOrDefaultHATC(formSettingsFieldsHATC.breakDurationHATC.value, 1, oneDayInSecondsHATC)
        );
        updateInfoHATC();
    });

    formSettingsFieldsHATC.enableBreak2HATC.addEventListener('change', () => {
        const enableBreak2HATC = formSettingsFieldsHATC.enableBreak2HATC.checked;
        lastUserSetEnableBreak2HATC = enableBreak2HATC;
        setBreakDurationLineDisplayHATC(enableBreak2HATC);
        setTimerSettingsHATC(undefined, undefined, undefined, undefined, enableBreak2HATC);
        updateInfoHATC();
    });

    formSettingsFieldsHATC.breakDuration2HATC.addEventListener('input', () => {
        setTimerSettingsHATC(
            undefined, undefined, undefined, undefined, undefined,
            getNumberInBoundsOrDefaultHATC(formSettingsFieldsHATC.breakDuration2HATC.value, 1, oneDayInSecondsHATC)
        );
        updateInfoHATC();
    });
}

function initializeTimerControlsHATC() {
    timerControlsButtonsHATC = {
        startHATC: document.getElementById('startBtnHATC'),
        pauseHATC: document.getElementById('pauseBtnHATC'),
        stopHATC: document.getElementById('stopBtnHATC'),
    };
    setTimerControlsDisabledStateHATC(false, true, true);
    timerControlsButtonsHATC.startHATC.addEventListener('click', startTimerHATC);
    timerControlsButtonsHATC.pauseHATC.addEventListener('click', pauseTimerHATC);
    timerControlsButtonsHATC.stopHATC.addEventListener('click', stopTimerHATC);
}

function initializeStatusPanelHATC() {
    statusPanelHATC = {
        timeOverviewMessageHATC: document.getElementById('timeOverviewMessageHATC'),
        elapsedInIntervalBoxHATC: document.getElementById('elapsedInIntervalBoxHATC'),
        elapsedInBreakIntervalBoxHATC: document.getElementById('elapsedInBreakIntervalBoxHATC'),
        elapsedInIntervalHATC: document.getElementById('elapsedInIntervalHATC'),
        elapsedInBreakIntervalHATC: document.getElementById('elapsedInBreakIntervalHATC'),
        elapsedInBreakIntervalBox2HATC: document.getElementById('elapsedInBreakIntervalBox2HATC'),
        elapsedInBreakInterval2HATC: document.getElementById('elapsedInBreakInterval2HATC'),
        intervalsDoneHATC: document.getElementById('intervalsDoneHATC'),
    };
}

function setTimerControlsDisabledStateHATC(startHATC, pauseHATC, stopHATC) {
    timerControlsButtonsHATC.startHATC.disabled = startHATC;
    timerControlsButtonsHATC.pauseHATC.disabled = pauseHATC;
    timerControlsButtonsHATC.stopHATC.disabled = stopHATC;
}

function setFormDisabledStateHATC(disabled) {
    formSettingsFieldsHATC.intervalCountHATC.disabled = disabled;
    formSettingsFieldsHATC.intervalDurationHATC.disabled = disabled;
    formSettingsFieldsHATC.enableBreakHATC.disabled = disabled || timerSettingsHATC.intervalCountHATC === 1;
    formSettingsFieldsHATC.breakDurationHATC.disabled = disabled;
    formSettingsFieldsHATC.enableBreak2HATC.disabled = disabled
    formSettingsFieldsHATC.breakDuration2HATC.disabled = disabled;
}
var isFirstTimeHATC = true;
function startTimerHATC() {
    setFormDisabledStateHATC(true);
    setTimerControlsDisabledStateHATC(false, true, false);
    document.getElementById('stopBtnHATC').style.color = '#990000';
    if (intHATC !== null) {
        clearInterval(intHATC);
    }
    intHATC = setInterval(displayTimerHATC, 1000);
    if (timerHATC.isBreak0HATC) {
        if (!ismuteHATC) {
            audioObjects.pinchRun.muted = false;
            audioObjects.pinchRun.play();
        }
    }
    if (!audioPlayerBRT.muted) {
        playSelectedSongBRT(true);
    }
    if (timerHATC.isFinishedHATC) {
        resetTimerHATC();
    }
    if (isFirstTimeHATC) {
        startTimerTickHATC();
    } else {
        onTimerTickHATC();
        document.getElementById("HATCResults").value = "";
    }
    timerControlsButtonsHATC.startHATC.style.display = 'none';
    timerControlsButtonsHATC.pauseHATC.style.display = 'inline';
    document.getElementById('hatcSettings').disabled = true;
    document.getElementById('hatcSettings').style.color = 'rgb(177, 177, 177)';
}

var nextroundHATC = false;
function pauseTimerHATC() {
    document.getElementById('stopBtnHATC').style.color = '#990000';
    setTimerControlsDisabledStateHATC(true, true, false);
    nextroundHATC = true;
    if (isPortuguese) {
        document.getElementById("HATCResults").innerHTML += "<div class='NOfSteps'> <div>Round " + (timerHATC.intervalsDoneHATC + 1) + "</div><div>" + timerHATC.elapsedInIntervalHATC + " segundos</div></div>";
    } else {
        document.getElementById("HATCResults").innerHTML += "<div class='NOfSteps'> <div>Round " + (timerHATC.intervalsDoneHATC + 1) + "</div><div>" + timerHATC.elapsedInIntervalHATC + " seconds</div></div>";
    }
    timerRefHATC.value += timerHATC.elapsedInIntervalHATC + "|";
    timerHATC.elapsedInIntervalHATC = 0;
    timerHATC.intervalsDoneHATC++;
}

function stopTimerHATC() {
    if (elapsedInIntervalBoxHATC.style.display !== "none") {
        if (isPortuguese) {
            document.getElementById("HATCResults").innerHTML += "<div class='NOfSteps'> <div>Round " + (timerHATC.intervalsDoneHATC + 1) + "</div><div>" + timerHATC.elapsedInIntervalHATC + " segundos</div></div>";
        } else {
            document.getElementById("HATCResults").innerHTML += "<div class='NOfSteps'> <div>Round " + (timerHATC.intervalsDoneHATC + 1) + "</div><div>" + timerHATC.elapsedInIntervalHATC + " seconds</div></div>";
        }
        timerRefHATC.value += timerHATC.elapsedInIntervalHATC + "|";
    } else { }
    clearInterval(intHATC);
    [secondsHATC, minutesHATC, hoursHATC] = [0, 0, 0];
    document.getElementById('hatcSettings').disabled = false;
    document.getElementById('hatcSettings').style.color = '#49B79D';
    if (!audioPlayerBRT.muted) {
        audioPlayerBRT.pause();
    }
    timerControlsButtonsHATC.pauseHATC.style.display = 'none';
    timerControlsButtonsHATC.startHATC.style.display = 'inline';
    setFormDisabledStateHATC(false);
    setTimerControlsDisabledStateHATC(true, true, true);
    document.getElementById('stopBtnHATC').style.display = 'none';
    document.getElementById('resetBtnHATC').style.display = 'inline';
    timerControlsButtonsHATC.startHATC.style.color = "rgb(177, 177, 177)";
    timerHATC.isFinishedHATC = true;
    isFirstTimeHATC = false;
    document.getElementById('hatcDate').value = date;
    document.getElementById('hatcSave').disabled = false;
    document.getElementById('hatcSave').style.color = '#49B79D';
    stopTimerTickHATC();
}

document.getElementById('resetBtnHATC').addEventListener('click', resetBtnFunctionHATC);
function resetBtnFunctionHATC() {
    document.getElementById("HATCResults").innerHTML = "";
    timerRefHATC.value = "|";
    document.getElementById('resetBtnHATC').style.display = 'none';
    document.getElementById('stopBtnHATC').style.display = 'inline';
    timerControlsButtonsHATC.stopHATC.style.color = "rgb(177, 177, 177)";
    timerControlsButtonsHATC.startHATC.style.color = "#0661AA";
    document.getElementById('hatcSave').disabled = true;
    document.getElementById('hatcSave').style.color = 'rgb(177, 177, 177)';
    setTimerControlsDisabledStateHATC(false, true, true);
    resetTimerHATC();
    timerHATC.isFinishedHATC = true;
}
function displayTimerHATC() {
    secondsHATC++;
    if (secondsHATC == 60) {
        secondsHATC = 0;
        minutesHATC++;
        if (minutesHATC == 60) {
            minutesHATC = 0;
            hoursHATC++;
        }
    }
    let hHATC = hoursHATC < 10 ? "0" + hoursHATC : hoursHATC;
    let mHATC = minutesHATC < 10 ? "0" + minutesHATC : minutesHATC;
    let sHATC = secondsHATC < 10 ? "0" + secondsHATC : secondsHATC;
}

function startTimerTickHATC() {
    setInterval(onTimerTickHATC, 1000);
}

function stopTimerTickHATC() {
    clearInterval();
}

function onTimerTickHATC() {
    const currentIntervalDurationHATC = timerHATC.isBreakHATC ? timerSettingsHATC.breakDurationHATC : timerHATC.isBreak2HATC ? timerSettingsHATC.breakDuration2HATC : timerSettingsHATC.intervalDurationHATC;
    if (timerHATC.elapsedInIntervalHATC <= currentIntervalDurationHATC && timerHATC.isBreak0HATC) {
        timerHATC.elapsedInIntervalHATC++;
        if (timerHATC.elapsedInIntervalHATC > 10) {
            setTimerControlsDisabledStateHATC(false, false, false);
        }
        if (nextroundHATC) {
            if (!ismuteHATC) {
                audioObjects.normalbreath.muted = false;
                audioObjects.normalbreath.play();
            }
            timerControlsButtonsHATC.pauseHATC.disabled = true;
            timerHATC.isBreak2HATC = true;
            timerHATC.isBreak0HATC = false;
            timerHATC.isFinishedHATC = timerHATC.intervalsDoneHATC === timerSettingsHATC.intervalCountHATC;
            if (!timerHATC.isFinishedHATC) {
                timerHATC.elapsedInIntervalHATC = 1;
            }
            if (timerHATC.isFinishedHATC) {
                setTimerControlsDisabledStateHATC(false, true, true);
                setFormDisabledStateHATC(false);
                stopTimerTickHATC();
            } else {
                timerHATC.totalTimeElapsedHATC++;
            }
            updateInfoHATC();
            nextroundHATC = false;
        }
        updateInfoHATC();
    } else if (timerHATC.elapsedInIntervalHATC <= currentIntervalDurationHATC && timerHATC.isBreak2HATC) {
        timerHATC.elapsedInIntervalHATC++;
        if (timerHATC.elapsedInIntervalHATC > currentIntervalDurationHATC && timerHATC.isBreak2HATC) {
            if (!ismuteHATC) {
                audioObjects.pinchRun.muted = false;
                audioObjects.pinchRun.play();
            }
            timerHATC.isBreak0HATC = true;
            timerHATC.isBreak2HATC = false;
            timerHATC.isFinishedHATC = timerHATC.intervalsDoneHATC === timerSettingsHATC.intervalCountHATC;
            if (!timerHATC.isFinishedHATC) {
                timerHATC.elapsedInIntervalHATC = 1;
            }
            if (timerHATC.isFinishedHATC) {
                setTimerControlsDisabledStateHATC(false, true, true);
                setFormDisabledStateHATC(false);
                stopTimerTickHATC();
            } else {
                timerHATC.totalTimeElapsedHATC++;
            }
            updateInfoHATC();
        }
        updateInfoHATC();
    }
}

function updateInfoHATC() {
    statusPanelHATC.timeOverviewMessageHATC.style.display = timerHATC.isFinishedHATC ? 'block' : null;
    statusPanelHATC.elapsedInIntervalBoxHATC.style.display = timerHATC.isFinishedHATC || timerHATC.isBreakHATC || timerHATC.isBreak2HATC || timerHATC.isBreak4 ? 'none' : null;
    statusPanelHATC.elapsedInBreakIntervalBoxHATC.style.display = !timerHATC.isFinishedHATC && timerHATC.isBreakHATC ? 'block' : null;
    statusPanelHATC.elapsedInBreakIntervalBox2HATC.style.display = !timerHATC.isFinishedHATC && timerHATC.isBreak2HATC ? 'block' : null;
    if (timerHATC.isBreakHATC) {
        statusPanelHATC.elapsedInBreakIntervalHATC.textContent = timerHATC.elapsedInIntervalHATC;
    } else if (timerHATC.isBreak2HATC) {
        statusPanelHATC.elapsedInBreakInterval2HATC.textContent = timerHATC.elapsedInIntervalHATC;
    } else {
        statusPanelHATC.elapsedInIntervalHATC.textContent = timerHATC.elapsedInIntervalHATC;
    }
    statusPanelHATC.intervalsDoneHATC.value = timerHATC.intervalsDoneHATC;
}
