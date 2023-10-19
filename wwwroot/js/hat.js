/*HAT JS*/
$(function () {
    $('#hatForm').on('submit', function (e) {
        e.preventDefault(); // Prevent the default form submission

        var formData = new FormData(this); // Get the form data

        $.ajax({
            url: "/",
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function (result) {
                $('#hatResultSaved').html(result); // Update the result section with the server response
            }
        });
        document.getElementById("HATResults").innerHTML = "";
        timerRefHAT.value ="|";
        clearInterval(intHAT);
        document.getElementById('hatSettings').disabled = false;
        document.getElementById('hatSettings').style.color = '#49B79D';
        if (!audioPlayerBRT.muted) {
            audioPlayerBRT.pause();
        }
        timerControlsButtonsHAT.pauseHAT.style.display = 'none';
        timerControlsButtonsHAT.startHAT.style.display = 'inline';
        setFormDisabledStateHAT(false);
        setTimerControlsDisabledStateHAT(false, true, true);
        document.getElementById('resetBtnHAT').style.display = 'none';
        document.getElementById('stopBtnHAT').style.display = 'inline';
        timerControlsButtonsHAT.stopHAT.style.color = "rgb(177, 177, 177)";
        timerControlsButtonsHAT.startHAT.style.color = "#0661AA";
        document.getElementById('hatSave').disabled = true;
        document.getElementById('hatSave').style.color = 'rgb(177, 177, 177)';
        stopTimerTickHAT();
        resetTimerHAT();
        timerHAT.isFinishedHAT = true;
        isFirstTimeHAT = false;
        stopTimerTickHAT();
    });
});

let formSettingsFieldsHAT,
    timerControlsButtonsHAT,
    statusPanelHAT,
    timerHAT,
    timerSettingsHAT;

function setTimerSettingsHAT(
    intervalCountHAT = timerSettingsHAT.intervalCountHAT,
    intervalDurationHAT = timerSettingsHAT.intervalDurationHAT,
    enableBreakHAT = timerSettingsHAT.enableBreakHAT,
    breakDurationHAT = timerSettingsHAT.breakDurationHAT,
    enableBreak2HAT = timerSettingsHAT.enableBreak2HAT,
    breakDuration2HAT = timerSettingsHAT.breakDuration2HAT
) {
    timerSettingsHAT = {
        intervalCountHAT,
        intervalDurationHAT,
        enableBreakHAT,
        breakDurationHAT,
        enableBreak2HAT,
        breakDuration2HAT,
    };
}

function resetTimerHAT() {
    timerHAT = {
        totalTimeElapsedHAT: 0,
        elapsedInIntervalHAT: 0,
        intervalsDoneHAT: 0,
        isBreak0HAT: true,
        isBreakHAT: false,
        isBreak2HAT: false,
        isFinishedHAT: false
    };
    updateInfoHAT();
}


let [secondsHAT, minutesHAT, hoursHAT] = [0, 0, 0];
let timerRefHAT = document.getElementById('timerDisplayHAT');
let intHAT = null;
document.getElementById('stopBtnHAT').disabled = true;
document.getElementById('stopBtnHAT').style.color = 'rgb(177, 177, 177)';
document.getElementById('hatSave').disabled = true;
document.getElementById('hatSave').style.color = 'rgb(177, 177, 177)';


var audioHAT = document.getElementById("audioHAT"),
    muteHAT = document.getElementById("muteHAT"),
    ismuteHAT = false;

audioPlayerBRT.loop = true;

var audioSongHAT = document.getElementById("songHAT"),
    muteSongHAT = document.getElementById("songMuteHAT");
// Get the volumeVhat bar element
const volumeVoiceHAT = document.getElementById('volumeVoiceHAT');

// Add an event listener for the volumeVhat change event
volumeVoiceHAT.addEventListener('input', function () {
    // Get the current volumeVhat value
    const volumeVhat = parseFloat(volumeVoiceHAT.value);

    // Check if volumeVhat is 0 and mute the media if necessary
    if (volumeVhat === 0) {
        audioObjects.pinchWalk.muted = true;
        audioObjects.ligthNasal.muted = true;
        audioObjects.normalbreath.muted = true;
        audioHAT.style.display = "none";
        muteHAT.style.display = "block";
        ismuteHAT = true;
    } else {
        audioObjects.pinchWalk.muted = false;
        audioObjects.ligthNasal.muted = false;
        audioObjects.normalbreath.muted = false;
        muteHAT.style.display = "none";
        audioHAT.style.display = "block";
        ismuteHAT = false;
    }
});
// Get the volumeShat bar element
const volumeSongHAT = document.getElementById('volumeSongHAT');

// Add an event listener for the volumeShat change event
volumeSongHAT.addEventListener('input', function () {
    // Get the current volumeShat value
    const volumeShat = parseFloat(volumeSongHAT.value);

    // Check if volumeShat is 0 and mute the media if necessary
    if (volumeShat === 0) {
        audioPlayerBRT.muted = true;
        audioSongHAT.style.display = "none";
        muteSongHAT.style.display = "block";
    } else {
        audioPlayerBRT.muted = false;
        muteSongHAT.style.display = "none";
        audioSongHAT.style.display = "block";
    }
});

var inhaleHAT = 600;
var holdHAT = 15;
var exhaleHAT = 30;
setTimerSettingsHAT(9999, inhaleHAT, true, holdHAT, true, exhaleHAT);
initializeTimerControlsHAT();
initializeStatusPanelHAT();
initializeTimerSettingsFormHAT();
resetTimerHAT();

var minusBtnHAT = document.getElementById("minusHAT").style.display = 'none',
    plusBtnHAT = document.getElementById("plusHAT").style.display = 'none',
    numberHAT = 4, /// numberHAT value
    minHAT = 2, /// minHAT numberHAT
    maxHAT = 30;
minusBtnHAT.onclick = function () {
    if (numberHAT > minHAT) {
        numberHAT = numberHAT - 1; /// Minus 1 of the numberHAT
        formSettingsFieldsHAT.intervalDurationHAT.value = numberHAT; /// Display the value in place of the numberHAT
        //fix here to change pranayama type
        formSettingsFieldsHAT.breakDurationHAT.value = formSettingsFieldsHAT.intervalDurationHAT.value;
        formSettingsFieldsHAT.breakDuration2HAT.value = formSettingsFieldsHAT.intervalDurationHAT.value;
        formSettingsFieldsHAT.breakDuration3.value = formSettingsFieldsHAT.intervalDurationHAT.value;
        setTimerSettingsHAT(9999, formSettingsFieldsHAT.intervalDurationHAT.value, true, formSettingsFieldsHAT.breakDurationHAT.value, true, formSettingsFieldsHAT.breakDuration2HAT.value, true, formSettingsFieldsHAT.breakDuration3.value);
    }
}

plusBtnHAT.onclick = function () {
    if (numberHAT < maxHAT) {
        numberHAT = numberHAT + 1;
        formSettingsFieldsHAT.intervalDurationHAT.value = numberHAT; /// Display the value in place of the numberHAT
        //fix here to change pranayama type
        formSettingsFieldsHAT.breakDurationHAT.value = formSettingsFieldsHAT.intervalDurationHAT.value;
        formSettingsFieldsHAT.breakDuration2HAT.value = formSettingsFieldsHAT.intervalDurationHAT.value;
        setTimerSettingsHAT(9999, formSettingsFieldsHAT.intervalDurationHAT.value, true, formSettingsFieldsHAT.breakDurationHAT.value, true, formSettingsFieldsHAT.breakDuration2HAT.value);
    }
}

function initializeTimerSettingsFormHAT() {
    const oneDayInSecondsHAT = 60 * 60 * 24;
    let lastUserSetEnableBreakHAT = timerSettingsHAT.enableBreakHAT;
    let lastUserSetEnableBreak2HAT = timerSettingsHAT.enableBreak2HAT;
    formSettingsFieldsHAT = {
        intervalCountHAT: document.getElementById('intervalCountInputHAT'),
        intervalDurationHAT: document.getElementById('intervalDurationInputHAT'),
        enableBreakHAT: document.getElementById('enableBreakInputHAT'),
        breakDurationHAT: document.getElementById('breakDurationInputHAT'),
        enableBreak2HAT: document.getElementById('enableBreakInput2HAT'),
        breakDuration2HAT: document.getElementById('breakDurationInput2HAT'),
    };
    formSettingsFieldsHAT.intervalCountHAT.value = timerSettingsHAT.intervalCountHAT;
    formSettingsFieldsHAT.intervalDurationHAT.value = timerSettingsHAT.intervalDurationHAT;
    formSettingsFieldsHAT.enableBreakHAT.checked = timerSettingsHAT.enableBreakHAT;
    formSettingsFieldsHAT.breakDurationHAT.value = timerSettingsHAT.breakDurationHAT;
    formSettingsFieldsHAT.enableBreak2HAT.checked = timerSettingsHAT.enableBreak2HAT;
    formSettingsFieldsHAT.breakDuration2HAT.value = timerSettingsHAT.breakDuration2HAT;

    function getNumberInBoundsOrDefaultHAT(value, minHAT, maxHAT, def = 1) {
        const valueAsNumberHAT = parseInt(value);
        return isNaN(valueAsNumberHAT) ? def : Math.max(minHAT, Math.min(valueAsNumberHAT, maxHAT));
    }

    function setBreakDurationLineDisplayHAT(displayed) {
        const breakDurationInputLineEltHAT = document.getElementById('breakDurationInputLineHAT');
        breakDurationInputLineEltHAT.style.display = displayed ? null : 'none';
        const breakDurationInputLineElt2HAT = document.getElementById('breakDurationInputLine2HAT');
        breakDurationInputLineElt2HAT.style.display = displayed ? null : 'none';
    }

    formSettingsFieldsHAT.intervalCountHAT.addEventListener('input', () => {
        const intervalCountHAT = getNumberInBoundsOrDefaultHAT(formSettingsFieldsHAT.intervalCountHAT.value, 1, 9999),
            hasOneInterval = intervalCountHAT === 1,
            hasBreak = hasOneInterval ? false : lastUserSetEnableBreakHAT;
        formSettingsFieldsHAT.enableBreakHAT.disabled = hasOneInterval === true;
        formSettingsFieldsHAT.enableBreakHAT.checked = hasBreak;
        setBreakDurationLineDisplayHAT(hasBreak);
        setTimerSettingsHAT(intervalCountHAT, undefined, hasBreak);
        updateInfoHAT();
    });

    formSettingsFieldsHAT.intervalDurationHAT.addEventListener('input', () => {
        setTimerSettingsHAT(undefined, getNumberInBoundsOrDefaultHAT(formSettingsFieldsHAT.intervalDurationHAT.value, 1, oneDayInSecondsHAT));
        updateInfoHAT();
    });

    formSettingsFieldsHAT.enableBreakHAT.addEventListener('change', () => {
        const enableBreakHAT = formSettingsFieldsHAT.enableBreakHAT.checked;
        lastUserSetEnableBreakHAT = enableBreakHAT;
        setBreakDurationLineDisplayHAT(enableBreakHAT);
        setTimerSettingsHAT(undefined, undefined, enableBreakHAT);
        updateInfoHAT();
    });

    formSettingsFieldsHAT.breakDurationHAT.addEventListener('input', () => {
        setTimerSettingsHAT(
            undefined, undefined, undefined,
            getNumberInBoundsOrDefaultHAT(formSettingsFieldsHAT.breakDurationHAT.value, 1, oneDayInSecondsHAT)
        );
        updateInfoHAT();
    });

    formSettingsFieldsHAT.enableBreak2HAT.addEventListener('change', () => {
        const enableBreak2HAT = formSettingsFieldsHAT.enableBreak2HAT.checked;
        lastUserSetEnableBreak2HAT = enableBreak2HAT;
        setBreakDurationLineDisplayHAT(enableBreak2HAT);
        setTimerSettingsHAT(undefined, undefined, undefined, undefined, enableBreak2HAT);
        updateInfoHAT();
    });

    formSettingsFieldsHAT.breakDuration2HAT.addEventListener('input', () => {
        setTimerSettingsHAT(
            undefined, undefined, undefined, undefined, undefined,
            getNumberInBoundsOrDefaultHAT(formSettingsFieldsHAT.breakDuration2HAT.value, 1, oneDayInSecondsHAT)
        );
        updateInfoHAT();
    });
}

function initializeTimerControlsHAT() {
    timerControlsButtonsHAT = {
        startHAT: document.getElementById('startBtnHAT'),
        pauseHAT: document.getElementById('pauseBtnHAT'),
        stopHAT: document.getElementById('stopBtnHAT'),
    };
    setTimerControlsDisabledStateHAT(false, true, true);
    timerControlsButtonsHAT.startHAT.addEventListener('click', startTimerHAT);
    timerControlsButtonsHAT.pauseHAT.addEventListener('click', pauseTimerHAT);
    timerControlsButtonsHAT.stopHAT.addEventListener('click', stopTimerHAT);
}

function initializeStatusPanelHAT() {
    statusPanelHAT = {
        timeOverviewMessageHAT: document.getElementById('timeOverviewMessageHAT'),
        elapsedInIntervalBoxHAT: document.getElementById('elapsedInIntervalBoxHAT'),
        elapsedInBreakIntervalBoxHAT: document.getElementById('elapsedInBreakIntervalBoxHAT'),
        elapsedInIntervalHAT: document.getElementById('elapsedInIntervalHAT'),
        elapsedInBreakIntervalHAT: document.getElementById('elapsedInBreakIntervalHAT'),
        elapsedInBreakIntervalBox2HAT: document.getElementById('elapsedInBreakIntervalBox2HAT'),
        elapsedInBreakInterval2HAT: document.getElementById('elapsedInBreakInterval2HAT'),
        intervalsDoneHAT: document.getElementById('intervalsDoneHAT'),
    };
}

function setTimerControlsDisabledStateHAT(startHAT, pauseHAT, stopHAT) {
    timerControlsButtonsHAT.startHAT.disabled = startHAT;
    timerControlsButtonsHAT.pauseHAT.disabled = pauseHAT;
    timerControlsButtonsHAT.stopHAT.disabled = stopHAT;
}

function setFormDisabledStateHAT(disabled) {
    formSettingsFieldsHAT.intervalCountHAT.disabled = disabled;
    formSettingsFieldsHAT.intervalDurationHAT.disabled = disabled;
    formSettingsFieldsHAT.enableBreakHAT.disabled = disabled || timerSettingsHAT.intervalCountHAT === 1;
    formSettingsFieldsHAT.breakDurationHAT.disabled = disabled;
    formSettingsFieldsHAT.enableBreak2HAT.disabled = disabled
    formSettingsFieldsHAT.breakDuration2HAT.disabled = disabled;
    minusBtnHAT.disabled = disabled;
    plusBtnHAT.disabled = disabled;
}
var isFirstTimeHAT = true;
function startTimerHAT() {
    setFormDisabledStateHAT(true);
    setTimerControlsDisabledStateHAT(false, true, false);
    document.getElementById('stopBtnHAT').style.color = '#990000';
    if (intHAT !== null) {
        clearInterval(intHAT);
    }
    intHAT = setInterval(displayTimerHAT, 1000);
    if (timerHAT.isBreak0HAT) {
        if (!ismuteHAT) {
            audioObjects.pinchWalk.muted = false;
            audioObjects.pinchWalk.play();
        }
    }
    if (!audioPlayerBRT.muted) {
        playSelectedSongBRT(true);
    }
    if (timerHAT.isFinishedHAT) {
        resetTimerHAT();
    }
    if (isFirstTimeHAT) {
        startTimerTickHAT();
    } else {
        onTimerTickHAT();
        document.getElementById("HATResults").value = "";
    }
    timerControlsButtonsHAT.startHAT.style.display = 'none';
    timerControlsButtonsHAT.pauseHAT.style.display = 'inline';
    document.getElementById('hatSettings').disabled = true;
    document.getElementById('hatSettings').style.color = 'rgb(177, 177, 177)';
}

var nextroundHAT = false;
function pauseTimerHAT() {
    document.getElementById('stopBtnHAT').style.color = '#990000';
    setTimerControlsDisabledStateHAT(true, true, false);
    nextroundHAT = true;
    if (isPortuguese) {
        document.getElementById("HATResults").innerHTML += "<div class='NOfSteps'> <div>Round " + (timerHAT.intervalsDoneHAT + 1) + "</div><div>" + timerHAT.elapsedInIntervalHAT + " segundos</div></div>";
    } else {
        document.getElementById("HATResults").innerHTML += "<div class='NOfSteps'> <div>Round " + (timerHAT.intervalsDoneHAT + 1) + "</div><div>" + timerHAT.elapsedInIntervalHAT + " seconds</div></div>";
    }
    timerRefHAT.value += timerHAT.elapsedInIntervalHAT + "|";
    timerHAT.elapsedInIntervalHAT = 0;
    timerHAT.intervalsDoneHAT++;
}

function stopTimerHAT() {
    if (elapsedInIntervalBoxHAT.style.display !== "none") {
        if (isPortuguese) {
            document.getElementById("HATResults").innerHTML += "<div class='NOfSteps'> <div>Round " + (timerHAT.intervalsDoneHAT + 1) + "</div><div>" + timerHAT.elapsedInIntervalHAT + " segundos</div></div>";
        } else {
            document.getElementById("HATResults").innerHTML += "<div class='NOfSteps'> <div>Round " + (timerHAT.intervalsDoneHAT + 1) + "</div><div>" + timerHAT.elapsedInIntervalHAT + " seconds</div></div>";
        }
        timerRefHAT.value += timerHAT.elapsedInIntervalHAT + "|";
    } else { }
    clearInterval(intHAT);
    [secondsHAT, minutesHAT, hoursHAT] = [0, 0, 0];
    document.getElementById('hatSettings').disabled = false;
    document.getElementById('hatSettings').style.color = '#49B79D';
    if (!audioPlayerBRT.muted) {
        audioPlayerBRT.pause();
    }
    timerControlsButtonsHAT.pauseHAT.style.display = 'none';
    timerControlsButtonsHAT.startHAT.style.display = 'inline';
    setFormDisabledStateHAT(false);
    setTimerControlsDisabledStateHAT(true, true, true);
    document.getElementById('stopBtnHAT').style.display = 'none';
    document.getElementById('resetBtnHAT').style.display = 'inline';
    timerControlsButtonsHAT.startHAT.style.color = "rgb(177, 177, 177)";
    timerHAT.isFinishedHAT = true;
    isFirstTimeHAT = false;
    document.getElementById('hatDate').value = date;
    document.getElementById('hatSave').disabled = false;
    document.getElementById('hatSave').style.color = '#49B79D';
    stopTimerTickHAT();
}

document.getElementById('resetBtnHAT').addEventListener('click', resetBtnFunctionHAT);
function resetBtnFunctionHAT() {
    document.getElementById("HATResults").innerHTML = "";
    timerRefHAT.value = "|";
    document.getElementById('resetBtnHAT').style.display = 'none';
    document.getElementById('stopBtnHAT').style.display = 'inline';
    timerControlsButtonsHAT.stopHAT.style.color = "rgb(177, 177, 177)";
    timerControlsButtonsHAT.startHAT.style.color = "#0661AA";
    document.getElementById('hatSave').disabled = true;
    document.getElementById('hatSave').style.color = 'rgb(177, 177, 177)';
    setTimerControlsDisabledStateHAT(false, true, true);
    resetTimerHAT();
    timerHAT.isFinishedHAT = true;
}
function displayTimerHAT() {
    secondsHAT++;
    if (secondsHAT == 60) {
        secondsHAT = 0;
        minutesHAT++;
        if (minutesHAT == 60) {
            minutesHAT = 0;
            hoursHAT++;
        }
    }
    let hHAT = hoursHAT < 10 ? "0" + hoursHAT : hoursHAT;
    let mHAT = minutesHAT < 10 ? "0" + minutesHAT : minutesHAT;
    let sHAT = secondsHAT < 10 ? "0" + secondsHAT : secondsHAT;
}

function startTimerTickHAT() {
    setInterval(onTimerTickHAT, 1000);
}

function stopTimerTickHAT() {
    clearInterval();
}

function onTimerTickHAT() {
    const currentIntervalDurationHAT = timerHAT.isBreakHAT ? timerSettingsHAT.breakDurationHAT : timerHAT.isBreak2HAT ? timerSettingsHAT.breakDuration2HAT : timerHAT.isBreak4 ? timerSettingsHAT.breakDuration3 : timerSettingsHAT.intervalDurationHAT;
    if (timerHAT.elapsedInIntervalHAT <= currentIntervalDurationHAT && timerHAT.isBreak0HAT) {
        timerHAT.elapsedInIntervalHAT++;
        if (timerHAT.elapsedInIntervalHAT > 10) {
            setTimerControlsDisabledStateHAT(false, false, false);
        }
        if (nextroundHAT) {
            if (!ismuteHAT) {
                audioObjects.ligthNasal.muted = false;
                audioObjects.ligthNasal.play();
            }
            timerControlsButtonsHAT.pauseHAT.disabled = true;
            timerHAT.isBreakHAT = true;
            timerHAT.isBreak0HAT = false;
            timerHAT.isFinishedHAT = timerHAT.intervalsDoneHAT === timerSettingsHAT.intervalCountHAT;
            if (!timerHAT.isFinishedHAT) {
                timerHAT.elapsedInIntervalHAT = 1;
            }
            if (timerHAT.isFinishedHAT) {
                setTimerControlsDisabledStateHAT(false, true, true);
                setFormDisabledStateHAT(false);
                stopTimerTickHAT();
            } else {
                timerHAT.totalTimeElapsedHAT++;
            }
            updateInfoHAT();
            nextroundHAT = false;
        }
        updateInfoHAT();
    } else if (timerHAT.elapsedInIntervalHAT <= currentIntervalDurationHAT && timerHAT.isBreakHAT) {
        timerHAT.elapsedInIntervalHAT++;
        if (timerHAT.elapsedInIntervalHAT > currentIntervalDurationHAT && timerHAT.isBreakHAT) {
            if (!ismuteHAT) {
                audioObjects.normalbreath.muted = false;
                audioObjects.normalbreath.play();
            }
            timerHAT.isBreak2HAT = true;
            timerHAT.isBreakHAT = false;
            timerHAT.isFinishedHAT = timerHAT.intervalsDoneHAT === timerSettingsHAT.intervalCountHAT;
            if (!timerHAT.isFinishedHAT) {
                timerHAT.elapsedInIntervalHAT = 1;
            }
            if (timerHAT.isFinishedHAT) {
                setTimerControlsDisabledStateHAT(false, false, true);
                setFormDisabledStateHAT(false);
                stopTimerTickHAT();
            } else {
                timerHAT.totalTimeElapsedHAT++;
            }
            updateInfoHAT();
        }
        updateInfoHAT();
    } else if (timerHAT.elapsedInIntervalHAT <= currentIntervalDurationHAT && timerHAT.isBreak2HAT) {
        timerHAT.elapsedInIntervalHAT++;
        if (timerHAT.elapsedInIntervalHAT > currentIntervalDurationHAT && timerHAT.isBreak2HAT) {
            if (!ismuteHAT) {
                audioObjects.pinchWalk.muted = false;
                audioObjects.pinchWalk.play();
            }
            timerHAT.isBreak0HAT = true;
            timerHAT.isBreak2HAT = false;
            timerHAT.isFinishedHAT = timerHAT.intervalsDoneHAT === timerSettingsHAT.intervalCountHAT;
            if (!timerHAT.isFinishedHAT) {
                timerHAT.elapsedInIntervalHAT = 1;
            }
            if (timerHAT.isFinishedHAT) {
                setTimerControlsDisabledStateHAT(false, true, true);
                setFormDisabledStateHAT(false);
                stopTimerTickHAT();
            } else {
                timerHAT.totalTimeElapsedHAT++;
            }
            updateInfoHAT();
        }
        updateInfoHAT();
    }
}

function updateInfoHAT() {
    statusPanelHAT.timeOverviewMessageHAT.style.display = timerHAT.isFinishedHAT ? 'block' : null;
    statusPanelHAT.elapsedInIntervalBoxHAT.style.display = timerHAT.isFinishedHAT || timerHAT.isBreakHAT || timerHAT.isBreak2HAT || timerHAT.isBreak4 ? 'none' : null;
    statusPanelHAT.elapsedInBreakIntervalBoxHAT.style.display = !timerHAT.isFinishedHAT && timerHAT.isBreakHAT ? 'block' : null;
    statusPanelHAT.elapsedInBreakIntervalBox2HAT.style.display = !timerHAT.isFinishedHAT && timerHAT.isBreak2HAT ? 'block' : null;
    if (timerHAT.isBreakHAT) {
        statusPanelHAT.elapsedInBreakIntervalHAT.textContent = timerHAT.elapsedInIntervalHAT;
    } else if (timerHAT.isBreak2HAT) {
        statusPanelHAT.elapsedInBreakInterval2HAT.textContent = timerHAT.elapsedInIntervalHAT;
    } else {
        statusPanelHAT.elapsedInIntervalHAT.textContent = timerHAT.elapsedInIntervalHAT;
    }
    statusPanelHAT.intervalsDoneHAT.value = timerHAT.intervalsDoneHAT;
}
