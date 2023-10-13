/*CT JS*/
document.getElementById('CTDate').value = date;
$(function () {
    $('#CTForm').on('submit', function (e) {
        e.preventDefault(); // Prevent the default form submission

        var formData = new FormData(this); // Get the form data

        $.ajax({
            url: "/",
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function (result) {
                $('#CTResultSaved').html(result); // Update the result section with the server response
            }
        });
        clearInterval(intCT);
        [secondsCT, minutesCT, hoursCT] = [0, 0, 0];
        timerRefCT.value = '00 : 00 : 00';
        audioPlayerBRT.currentTime = 0
        timerControlsButtonsCT.pauseCT.style.display = 'none';
        timerControlsButtonsCT.startCT.style.display = 'inline';
        timerControlsButtonsCT.startCT.style.color = '#49B79D';
        setFormDisabledStateCT(false);
        setTimerControlsDisabledStateCT(false, true, true);
        document.getElementById('CTSave').disabled = true;
        document.getElementById('CTSave').style.color = 'rgb(177, 177, 177)';
        stopTimerTickCT();
        resetTimerCT();
        document.getElementById('resetBtnCT').style.display = 'none';
        timerControlsButtonsCT.stopCT.style.display = "inline";
        timerControlsButtonsCT.stopCT.style.color = "rgb(177, 177, 177)";
    });
});

let
    formSettingsFieldsCT,
    timerControlsButtonsCT,
    statusPanelCT,
    timerCT,
    timerSettingsCT;

function setTimerSettingsCT(
    intervalCountCT = timerSettingsCT.intervalCountCT,
    intervalDurationCT = timerSettingsCT.intervalDurationCT,
    enableBreakCT = timerSettingsCT.enableBreakCT,
    breakDurationCT = timerSettingsCT.breakDurationCT,
    enableBreak2CT = timerSettingsCT.enableBreak2CT,
    breakDuration2CT = timerSettingsCT.breakDuration2CT
) {
    timerSettingsCT = {
        intervalCountCT,
        intervalDurationCT,
        enableBreakCT,
        breakDurationCT,
        enableBreak2CT,
        breakDuration2CT
    };
}

function resetTimerCT() {
    timerCT = {
        totalTimeElapsedCT: 0,
        elapsedInIntervalCT: 0,
        intervalsDoneCT: 0,
        isBreak3CT: true,
        isBreakCT: false,
        isBreak2CT: false,
        isFinishedCT: false
    };
    updateInfoCT();
}

let [secondsCT, minutesCT, hoursCT] = [0, 0, 0];
let timerRefCT = document.getElementById('timerDisplayCT');
let intCT = null;
document.getElementById('stopBtnCT').disabled = true;
document.getElementById('stopBtnCT').style.color = 'rgb(177, 177, 177)';
document.getElementById('CTSave').disabled = true;
document.getElementById('CTSave').style.color = 'rgb(177, 177, 177)';

var audioListCT = []
if (isPortuguese) {
    audioListCT.push(new Audio('/sounds/breathein.mp3'))
    audioListCT.push(new Audio('/sounds/recover.mp3'));
    audioListCT.push(new Audio('/sounds/exhale.mp3'));
    audioListCT.push(new Audio('/sounds/hold.mp3'));
} else {
    audioListCT.push(new Audio('/sounds/breathein.mp3'))
    audioListCT.push(new Audio('/sounds/recover.mp3'));
    audioListCT.push(new Audio('/sounds/exhale.mp3'));
    audioListCT.push(new Audio('/sounds/hold.mp3'));
}



var audioCT = document.getElementById("audioCT"),
    muteCT = document.getElementById("muteCT"),
    ismuteCT = false;

audioPlayerBRT.loop = true;

var audioSongCT = document.getElementById("songCT"),
    muteSongCT = document.getElementById("songMuteCT");

// Get the volumeVCT bar element
const volumeVoiceCT = document.getElementById('volumeVoiceCT');

// Add an event listener for the volumeVCT change event
volumeVoiceCT.addEventListener('input', function () {
    // Get the current volumeVCT value
    const volumeVCT = parseFloat(volumeVoiceCT.value);

    // Check if volumeVCT is 0 and mute the media if necessary
    if (volumeVCT === 0) {
        audioListCT[0].muted = true;
        audioListCT[1].muted = true;
        audioListCT[2].muted = true;
        audioListCT[3].muted = true;
        audioCT.style.display = "none";
        muteCT.style.display = "block";
        ismuteCT = true;
    } else {
        audioListCT[0].muted = false;
        audioListCT[1].muted = false;
        audioListCT[2].muted = false;
        audioListCT[3].muted = false;
        muteCT.style.display = "none";
        audioCT.style.display = "block";
        ismuteCT = false;
    }
});
// Get the volumeSCT bar element
const volumeSongCT = document.getElementById('volumeSongCT');

// Add an event listener for the volumeSCT change event
volumeSongCT.addEventListener('input', function () {
    // Get the current volumeSCT value
    const volumeSCT = parseFloat(volumeSongCT.value);

    // Check if volumeSCT is 0 and mute the media if necessary
    if (volumeSCT === 0) {
        audioPlayerBRT.muted = true;
        audioSongCT.style.display = "none";
        muteSongCT.style.display = "block";
    } else {
        audioPlayerBRT.muted = false;
        muteSongCT.style.display = "none";
        audioSongCT.style.display = "block";
    }
});


var inhaleCT = 3;
var holdCT = 3;
var exhaleCT = 4;
setTimerSettingsCT(9999, inhaleCT, true, holdCT, true, exhaleCT);
initializeTimerControlsCT();
initializeStatusPanelCT();
initializeTimerSettingsFormCT();
resetTimerCT();


var minusBtnCT = document.getElementById("minusCT").style.display = 'none',
    plusBtnCT = document.getElementById("plusCT").style.display = 'none',
    numberCT = 3, /// numberCT value
    minCT = 2, /// minCT numberCT
    maxCT = 60;

minusBtnCT.onclick = function () {
    if (numberCT > minCT) {
        numberCT = numberCT - 1; /// Minus 1 of the numberCT
        formSettingsFieldsCT.intervalDurationCT.value = numberCT; /// Display the value in place of the numberCT
        //fix here to change pranayama type
        formSettingsFieldsCT.breakDurationCT.value = formSettingsFieldsCT.intervalDurationCT.value*4;
        formSettingsFieldsCT.breakDuration2CT.value = formSettingsFieldsCT.intervalDurationCT.value*2;
        setTimerSettingsCT(9999, formSettingsFieldsCT.intervalDurationCT.value, true, formSettingsFieldsCT.breakDurationCT.value, true, formSettingsFieldsCT.breakDuration2CT.value);
    }
}

plusBtnCT.onclick = function () {
    if (numberCT < maxCT) {
        numberCT = numberCT + 1;
        formSettingsFieldsCT.intervalDurationCT.value = numberCT; /// Display the value in place of the numberCT
        //fix here to change pranayama type
        formSettingsFieldsCT.breakDurationCT.value = formSettingsFieldsCT.intervalDurationCT.value*4;
        formSettingsFieldsCT.breakDuration2CT.value = formSettingsFieldsCT.intervalDurationCT.value*2;
        setTimerSettingsCT(9999, formSettingsFieldsCT.intervalDurationCT.value, true, formSettingsFieldsCT.breakDurationCT.value, true, formSettingsFieldsCT.breakDuration2CT.value);

    }
}

function initializeTimerSettingsFormCT() {
    const oneDayInSecondsBRE = 60 * 60 * 24;
    let lastUserSetEnableBreakCT = timerSettingsCT.enableBreakCT;
    let lastUserSetEnableBreak2CT = timerSettingsCT.enableBreak2CT;

    formSettingsFieldsCT = {
        intervalCountCT: document.getElementById('intervalCountInputCT'),
        intervalDurationCT: document.getElementById('intervalDurationInputCT'),
        enableBreakCT: document.getElementById('enableBreakInputCT'),
        breakDurationCT: document.getElementById('breakDurationInputCT'),
        enableBreak2CT: document.getElementById('enableBreakInput2CT'),
        breakDuration2CT: document.getElementById('breakDurationInput2CT')
    };

    formSettingsFieldsCT.intervalCountCT.value = timerSettingsCT.intervalCountCT;
    formSettingsFieldsCT.intervalDurationCT.value = timerSettingsCT.intervalDurationCT;
    formSettingsFieldsCT.enableBreakCT.checked = timerSettingsCT.enableBreakCT;
    formSettingsFieldsCT.breakDurationCT.value = timerSettingsCT.breakDurationCT;
    formSettingsFieldsCT.enableBreak2CT.checked = timerSettingsCT.enableBreak2CT;
    formSettingsFieldsCT.breakDuration2CT.value = timerSettingsCT.breakDuration2CT;

    function getNumberInBoundsOrDefaultCT(value, minCT, maxCT, def = 1) {
        const valueAsNumberCT = parseInt(value);
        return isNaN(valueAsNumberCT) ? def : Math.max(minCT, Math.min(valueAsNumberCT, maxCT));
    }

    function setBreakDurationLineDisplayCT(displayed) {
        const breakDurationInputLineEltCT = document.getElementById('breakDurationInputLineCT');
        breakDurationInputLineEltCT.style.display = displayed ? null : 'none';
        const breakDurationInputLineElt2CT = document.getElementById('breakDurationInputLine2CT');
        breakDurationInputLineElt2CT.style.display = displayed ? null : 'none';
        const breakDurationInputLineElt3CT = document.getElementById('breakDurationInputLine3CT');
        breakDurationInputLineElt3CT.style.display = displayed ? null : 'none';
    }

    formSettingsFieldsCT.intervalCountCT.addEventListener('input', () => {
        const intervalCountCT = getNumberInBoundsOrDefaultCT(formSettingsFieldsCT.intervalCountCT.value, 1, 9999),
            hasOneIntervalCT = intervalCountCT === 1,
            hasBreakCT = hasOneIntervalCT ? false : lastUserSetEnableBreakCT;

        formSettingsFieldsCT.enableBreakCT.disabled = hasOneIntervalCT === true;
        formSettingsFieldsCT.enableBreakCT.checked = hasBreakCT;

        setBreakDurationLineDisplayCT(hasBreakCT);

        setTimerSettingsCT(intervalCountCT, undefined, hasBreakCT);
        updateInfoCT();
    });

    formSettingsFieldsCT.intervalDurationCT.addEventListener('input', () => {
        setTimerSettingsCT(undefined, getNumberInBoundsOrDefaultCT(formSettingsFieldsCT.intervalDurationCT.value, 1, oneDayInSecondsBRE));
        updateInfoCT();
    });

    formSettingsFieldsCT.enableBreakCT.addEventListener('change', () => {
        const enableBreakCT = formSettingsFieldsCT.enableBreakCT.checked;

        lastUserSetEnableBreakCT = enableBreakCT;
        setBreakDurationLineDisplayCT(enableBreakCT);
        setTimerSettingsCT(undefined, undefined, enableBreakCT);
        updateInfoCT();
    });

    formSettingsFieldsCT.breakDurationCT.addEventListener('input', () => {
        setTimerSettingsCT(undefined, undefined, undefined,
            getNumberInBoundsOrDefaultCT(formSettingsFieldsCT.breakDurationCT.value, 1, oneDayInSecondsBRE)
        );
        updateInfoCT();
    });

    formSettingsFieldsCT.enableBreak2CT.addEventListener('change', () => {
        const enableBreak2CT = formSettingsFieldsCT.enableBreak2CT.checked;

        lastUserSetEnableBreak2CT = enableBreak2CT;
        setBreakDurationLineDisplayCT(enableBreak2CT);
        setTimerSettingsCT(undefined, undefined, undefined, undefined, enableBreak2CT);
        updateInfoCT();
    });

    formSettingsFieldsCT.breakDuration2CT.addEventListener('input', () => {
        setTimerSettingsCT(undefined, undefined, undefined, undefined, undefined,
            getNumberInBoundsOrDefaultCT(formSettingsFieldsCT.breakDuration2CT.value, 1, oneDayInSecondsBRE)
        );
        updateInfoCT();
    });
}

function initializeTimerControlsCT() {
    timerControlsButtonsCT = {
        startCT: document.getElementById('startBtnCT'),
        pauseCT: document.getElementById('pauseBtnCT'),
        stopCT: document.getElementById('stopBtnCT'),
    };

    setTimerControlsDisabledStateCT(false, true, true);

    timerControlsButtonsCT.startCT.addEventListener('click', startTimerCT);
    timerControlsButtonsCT.pauseCT.addEventListener('click', pauseTimerCT);
    timerControlsButtonsCT.stopCT.addEventListener('click', stopTimerCT);
}

function initializeStatusPanelCT() {
    statusPanelCT = {
        timeOverviewMessageCT: document.getElementById('timeOverviewMessageCT'),
        elapsedInIntervalBoxCT: document.getElementById('elapsedInIntervalBoxCT'),
        elapsedInBreakIntervalBoxCT: document.getElementById('elapsedInBreakIntervalBoxCT'),
        elapsedInIntervalCT: document.getElementById('elapsedInIntervalCT'),
        elapsedInBreakIntervalCT: document.getElementById('elapsedInBreakIntervalCT'),
        elapsedInBreakIntervalBox2CT: document.getElementById('elapsedInBreakIntervalBox2CT'),
        elapsedInBreakInterval2CT: document.getElementById('elapsedInBreakInterval2CT'),
        elapsedInBreakIntervalBox3CT: document.getElementById('elapsedInBreakIntervalBox3CT'),
        intervalsDoneCT: document.getElementById('intervalsDoneCT'),
    };
}

function setTimerControlsDisabledStateCT(startCT, pauseCT, stopCT) {
    timerControlsButtonsCT.startCT.disabled = startCT;
    timerControlsButtonsCT.pauseCT.disabled = pauseCT;
    timerControlsButtonsCT.stopCT.disabled = stopCT;
}

function setFormDisabledStateCT(disabled) {
    formSettingsFieldsCT.intervalCountCT.disabled = disabled;
    formSettingsFieldsCT.intervalDurationCT.disabled = disabled;
    formSettingsFieldsCT.enableBreakCT.disabled = disabled || timerSettingsCT.intervalCountCT === 1;
    formSettingsFieldsCT.breakDurationCT.disabled = disabled;
    formSettingsFieldsCT.enableBreak2CT.disabled = disabled
    formSettingsFieldsCT.breakDuration2CT.disabled = disabled;
    minusBtnCT.disabled = disabled;
    plusBtnCT.disabled = disabled;
}

function startTimerCT() {
    if (intCT !== null) {
        clearInterval(intCT);
    }
    intCT = setInterval(displayTimerCT, 1000);
    setFormDisabledStateCT(true);
    setTimerControlsDisabledStateCT(true, false, false);
    timerControlsButtonsCT.stopCT.style.color = '#990000';
    if (timerCT.isBreak3CT) {
        if (!ismuteCT) {
            audioListCT[0].muted = false;
            audioListCT[0].play();
        }
    }
    if (!audioPlayerBRT.muted) {
        playSelectedSongBRT(true);
    }
    if (timerCT.isFinishedCT) {
        resetTimerCT();
    }
    startTimerTickCT();
    timerControlsButtonsCT.startCT.style.display = 'none';
    timerControlsButtonsCT.pauseCT.style.display = 'inline';
    document.getElementById('CTSettings').disabled = true;
    document.getElementById('CTSettings').style.color = 'rgb(177, 177, 177)';
    document.getElementById('CTSave').disabled = true;
    document.getElementById('CTSave').style.color = 'rgb(177, 177, 177)';
}

function pauseTimerCT() {
    stopTimerTickCT();
    if (!ismuteCT) {
        audioListCT[1].muted = false;
        audioListCT[1].play();
    }
    timerCT.elapsedInIntervalCT = 0;
    timerCT.isBreak3CT = true;
    timerCT.isBreakCT = false;
    timerCT.isBreak2CT = false;
    setTimerControlsDisabledStateCT(true, true, true);
    timerSettingsCT.breakDurationCT = 3;
    formSettingsFieldsCT.breakDurationCT.value = 3;
    timerSettingsCT.breakDuration2CT = 4;
    formSettingsFieldsCT.breakDuration2CT.value = 4;
    setTimeout(function () {
        recoverCT();
        setTimerControlsDisabledStateCT(false, false, false);
    }, 3000);
}
function recoverCT() {
    startTimerTickCT();
    if (!ismuteCT) {
        audioListCT[0].muted = false;
        audioListCT[0].play();
    }
}
function stopTimerCT() {
    clearInterval(intCT);
    [secondsCT, minutesCT, hoursCT] = [0, 0, 0];
    if (!audioPlayerBRT.muted) {
        audioPlayerBRT.pause();
    }
    audioPlayerBRT.currentTime = 0
    timerControlsButtonsCT.pauseCT.style.display = 'none';
    timerControlsButtonsCT.startCT.style.display = 'inline';
    setFormDisabledStateCT(false);
    setTimerControlsDisabledStateCT(true, true, true);
    timerControlsButtonsCT.startCT.style.color = 'rgb(177, 177, 177)';
    timerControlsButtonsCT.stopCT.style.color = 'rgb(177, 177, 177)';
    stopTimerTickCT();
    timerSettingsCT.breakDurationCT = 3;
    formSettingsFieldsCT.breakDurationCT.value = 3;
    timerSettingsCT.breakDuration2CT = 4;
    formSettingsFieldsCT.breakDuration2CT.value = 4;
    document.getElementById('CTSave').disabled = false;
    document.getElementById('CTSave').style.color = '#49B79D';
    timerControlsButtonsCT.stopCT.style.display = "none";
    document.getElementById('resetBtnCT').style.display = 'inline';
    document.getElementById('resetBtnCT').style.color = '#990000';
}
document.getElementById('resetBtnCT').addEventListener('click', function () {
    resetTimerCT();
    timerRefCT.value = '00 : 00 : 00';
    setTimerControlsDisabledStateCT(false, true, true);
    timerControlsButtonsCT.startCT.style.color = '#49B79D';
    document.getElementById('resetBtnCT').style.display = 'none';
    timerControlsButtonsCT.stopCT.style.display = "inline";
    document.getElementById('CTSave').disabled = true;
    document.getElementById('CTSave').style.color = 'rgb(177, 177, 177)';
});
function displayTimerCT() {
    secondsCT++;
    if (secondsCT == 60) {
        secondsCT = 0;
        minutesCT++;
        if (minutesCT == 60) {
            minutesCT = 0;
            hoursCT++;
        }
    }
    let hCT = hoursCT < 10 ? "0" + hoursCT : hoursCT;
    let mCT = minutesCT < 10 ? "0" + minutesCT : minutesCT;
    let sCT = secondsCT < 10 ? "0" + secondsCT : secondsCT;
    timerRefCT.value = `${hCT} : ${mCT} : ${sCT}`;
}

function startTimerTickCT() {
    timerCT.intervalId = setInterval(onTimerTickCT, 1000);
}

function stopTimerTickCT() {
    clearInterval(timerCT.intervalId);
}

function onTimerTickCT() {
    const currentIntervalDurationCT = timerCT.isBreakCT ? timerSettingsCT.breakDurationCT : timerCT.isBreak2CT ? timerSettingsCT.breakDuration2CT : timerSettingsCT.intervalDurationCT;
    if (timerCT.elapsedInIntervalCT <= currentIntervalDurationCT && timerCT.isBreak3CT) {
        timerCT.elapsedInIntervalCT++;
        if (timerCT.elapsedInIntervalCT > currentIntervalDurationCT && timerCT.isBreak3CT) {
            if (!ismuteCT) {
                audioListCT[2].muted = false;
                audioListCT[2].play();
            }
            timerCT.isBreakCT = true;
            timerCT.isBreak3CT = false;
            timerCT.isFinishedCT = timerCT.intervalsDoneCT === timerSettingsCT.intervalCountCT;
            if (!timerCT.isFinishedCT) {
                timerCT.elapsedInIntervalCT = 1;
            }
            if (timerCT.isFinishedCT) {
                setTimerControlsDisabledStateCT(false, true, true);
                setFormDisabledStateCT(false);
                stopTimerTickCT();
            } else {
                timerCT.totalTimeElapsedCT++;
            }
            updateInfoCT();
        }
        updateInfoCT();
    } else if (timerCT.elapsedInIntervalCT <= currentIntervalDurationCT && timerCT.isBreakCT) {
        timerCT.elapsedInIntervalCT++;
        if (timerCT.elapsedInIntervalCT > currentIntervalDurationCT && timerCT.isBreakCT) {
            if (!ismuteCT) {
                audioListCT[3].muted = false;
                audioListCT[3].play();
            }
            timerCT.isBreak2CT = true;
            timerCT.isBreakCT = false;
            timerCT.isFinishedCT = timerCT.intervalsDoneCT === timerSettingsCT.intervalCountCT;
            if (!timerCT.isFinishedCT) {
                timerCT.elapsedInIntervalCT = 1;
            }
            if (timerCT.isFinishedCT) {
                setTimerControlsDisabledStateCT(false, true, true);
                setFormDisabledStateCT(false);
                stopTimerTickCT();
            } else {
                timerCT.totalTimeElapsedCT++;
            }
            updateInfoCT();
        }
        updateInfoCT();
    } else if (timerCT.elapsedInIntervalCT <= currentIntervalDurationCT && timerCT.isBreak2CT) {
        timerCT.elapsedInIntervalCT++;
        if (timerCT.elapsedInIntervalCT > currentIntervalDurationCT && timerCT.isBreak2CT) {
            if (!ismuteCT) {
                audioListCT[0].muted = false;
                audioListCT[0].play();
            }
            timerCT.isBreak3CT = true;
            timerCT.isBreak2CT = false;
            timerCT.intervalsDoneCT++;
            timerSettingsCT.breakDurationCT = timerSettingsCT.breakDurationCT + 1;
            formSettingsFieldsCT.breakDurationCT.value = timerSettingsCT.breakDurationCT;
            timerSettingsCT.breakDuration2CT = timerSettingsCT.breakDuration2CT + 2;
            formSettingsFieldsCT.breakDuration2CT.value = timerSettingsCT.breakDuration2CT;
            timerCT.isFinishedCT = timerCT.intervalsDoneCT === timerSettingsCT.intervalCountCT;
            if (!timerCT.isFinishedCT) {
                timerCT.elapsedInIntervalCT = 1;
            }
            if (timerCT.isFinishedCT) {
                setTimerControlsDisabledStateCT(false, true, true);
                setFormDisabledStateCT(false);
                stopTimerTickCT();
            } else {
                timerCT.totalTimeElapsedCT++;
            }
            updateInfoCT();
        }
        updateInfoCT();
    } 
}

function updateInfoCT() {
    statusPanelCT.timeOverviewMessageCT.style.display = timerCT.isFinishedCT ? 'block' : null;
    statusPanelCT.elapsedInIntervalBoxCT.style.display = timerCT.isFinishedCT || timerCT.isBreakCT || timerCT.isBreak2CT || timerCT.isBreak4CT ? 'none' : null;
    statusPanelCT.elapsedInBreakIntervalBoxCT.style.display = !timerCT.isFinishedCT && timerCT.isBreakCT ? 'block' : null;
    statusPanelCT.elapsedInBreakIntervalBox2CT.style.display = !timerCT.isFinishedCT && timerCT.isBreak2CT ? 'block' : null;
    if (timerCT.isBreakCT) {
        statusPanelCT.elapsedInBreakIntervalCT.textContent = timerCT.elapsedInIntervalCT;
    } else if (timerCT.isBreak2CT) {
        statusPanelCT.elapsedInBreakInterval2CT.textContent = timerCT.elapsedInIntervalCT;
    } else {
        statusPanelCT.elapsedInIntervalCT.textContent = timerCT.elapsedInIntervalCT;
    }
    statusPanelCT.intervalsDoneCT.value = timerCT.intervalsDoneCT;
}
//---------------------------------------------------//
