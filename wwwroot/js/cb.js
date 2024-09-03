/*CB JS*/
var isCBon = false;
const CBball = document.getElementById('CBball');
const CBballText = document.getElementById('CBballText');

function CBchangeBall(scale, duration) {
    CBball.style.transition = `transform ${duration}s ease`;
    CBball.style.transform = `scale(${scale})`;
}

const CBtimeInput = document.getElementById('CBtimeInput');
const CBcountdownDisplay = document.getElementById('CBcountdownDisplay');
let CBcountdown;
let CBtimeRemaining = Infinity;
let CBisPaused = false;
// Populate the dropdown with options
for (let CBi = 2; CBi <= 60; CBi++) { // assuming 1 to 60 minutes
    let CBoption = document.createElement('option');
    CBoption.value = CBi * 60;
    if (isPortuguese) {
        CBoption.textContent = CBi + ' minutos';
    } else {
        CBoption.textContent = CBi + ' minutes';
    }
    CBtimeInput.appendChild(CBoption);
}

//CB Modal
const modalCB = document.getElementById("myModalCB");
const closeModalCBButton = document.getElementById("closeModalCB");
var CBquestion = document.getElementById("CBquestion");

function openModalCB() {
    modalCB.style.display = "block";
    showSlides(slideIndex, 'CBslides');
}

// Function to close the modalCB
function closeModalCB() {
    modalCB.style.display = "none";
    slideIndex = 1;

}

// Event listener for closing the modalCB
closeModalCBButton.addEventListener("click", closeModalCB);

// Close the modalCB if the user clicks outside the modalCB content
window.addEventListener("click", function (event) {
    if (event.target === modalCB) {
        closeModalCB();
    }
});
CBquestion.onclick = function () {
    openModalCB();
}

CBLink.onclick = function () {
    if (isUserActiveSubscriber) {
        openPage(PRANAPage, CBPage, 'slideLeft');
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        backCB.style.display = "block";
        backPRANA.style.display = "none";
        audioObjects.exhale.load();
        audioObjects.inhale.load();
        audioObjects.normalbreath.load();
    } else {
        openModal();
    }
}
backCB.onclick = function () {
    openPage(CBPage, PRANAPage, 'slideRight');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    backPRANA.style.display = "block";
    backCB.style.display = "none";
    CBclose();
}
CBSettings.onclick = function () {
    openPage(CBPage, CBSettingsPage, 'slideLeft');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    selectSongsList.style.display = "block";
    backCBSet.style.display = "block";
    backCB.style.display = "none";
}
backCBSet.onclick = function () {
    if (!audioPlayerBRT.muted) {
        audioPlayerBRT.pause();
    }
    audioPlayerBRT.currentTime = 0;
    openPage(CBSettingsPage, CBPage, 'slideRight');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    selectSongsList.style.display = "none";
    backCB.style.display = "block";
    backCBSet.style.display = "none";
}

// Function to close the modal
function CBclose() {
    isCBon = false;
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
    clearInterval(CBcountdown);
    CBisPaused = false;
    CBtimeInput.classList.remove('CountdownHidden');
    CBcountdownDisplay.classList.add('CountdownHidden');
    CBchangeBall(1, 1);
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
        timerControlsButtonsCB.startCB.style.color = '#0661AA';
        setFormDisabledStateCB(false);
        setTimerControlsDisabledStateCB(false, true, true);
        timerControlsButtonsCB.stopCB.style.color = "rgb(177, 177, 177)";
        document.getElementById('CBSave').disabled = true;
        document.getElementById('CBSave').style.color = 'rgb(177, 177, 177)';
        stopTimerTickCB();
        resetTimerCB();
        CBtimeInput.classList.remove('CountdownHidden');
        CBcountdownDisplay.classList.add('CountdownHidden');
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
    requestWakeLock();
    isCBon = true;
    if (intCB !== null) {
        clearInterval(intCB);
    }
    setFormDisabledStateCB(true);
    setTimerControlsDisabledStateCB(true, true, true);
    setTimeout(() => {
        setTimerControlsDisabledStateCB(true, false, true);
    }, 2000);
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
        setTimeout(() => {
            CBchangeBall(1.5, timerSettingsCB.intervalDurationCB);
        }, 1500); 
    }
    if (!audioPlayerBRT.muted) {
        playSelectedSongBRT(true);
    }
    if (timerCB.isFinishedCB) {
        resetTimerCB();
    }
    setTimeout(() => {
        setTimeout(() => {
            intCB = setInterval(displayTimerCB, 1000);
        }, 1000);
        startTimerTickCB();
        if (CBisPaused) {
            // Resume from paused state
            CBstartTimer(CBtimeRemaining);
            CBisPaused = false;
        } else {
            // Start a new timer
            clearInterval(CBcountdown);
            CBtimeRemaining = CBtimeInput.value === '∞' ? Infinity : parseInt(CBtimeInput.value);
            CBcountdownDisplay.textContent = '';
            CBstartTimer(CBtimeRemaining);
        }
    }, 1700);
    timerControlsButtonsCB.startCB.style.display = 'none';
    timerControlsButtonsCB.pauseCB.style.display = 'inline';
    document.getElementById('CBSettings').disabled = true;
    document.getElementById('CBSettings').style.color = 'rgb(177, 177, 177)';
    document.getElementById('CBSave').disabled = true;
    document.getElementById('CBSave').style.color = 'rgb(177, 177, 177)';
}
function CBstartTimer(CBduration) {
    CBcountdown = setInterval(function () {
        if (CBduration > 0 && CBduration !== Infinity) {
            CBduration--;
            CBtimeRemaining = CBduration;
            let CBContdownminutes = Math.floor(CBduration / 60);
            let CBContdownseconds = CBduration % 60;
            CBcountdownDisplay.textContent = `${CBContdownminutes}:${CBContdownseconds.toString().padStart(2, '0')}`;
            CBtimeInput.classList.add('CountdownHidden');
            CBcountdownDisplay.classList.remove('CountdownHidden'); 
        } else if (CBduration == Infinity) {
            CBcountdownDisplay.textContent = '∞';
            CBtimeInput.classList.add('CountdownHidden');
            CBcountdownDisplay.classList.remove('CountdownHidden');
        }
    }, 1000);
}
function pauseTimerCB() {
    isCBon = false;
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
    clearInterval(CBcountdown);
    CBisPaused = true;
    CBchangeBall(1, 1);
}

function stopTimerCB() {
    isCBon = false;
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
    clearInterval(CBcountdown);
    CBisPaused = false;
    CBtimeInput.classList.remove('CountdownHidden');
    CBcountdownDisplay.classList.add('CountdownHidden');
    CBchangeBall(1, 1);
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
            CBchangeBall(0.5, timerSettingsCB.breakDurationCB);
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
                if (CBcountdownDisplay.textContent == '0:00') {
                    audioObjects.inhale.muted = true;
                    clearInterval(CBcountdown);
                    if (!ismuteCB) {
                        audioObjects.bell.muted = false;
                        audioObjects.bell.play();
                    }
                    clearInterval(intCB);
                    setTimerControlsDisabledStateCB(true, true, false);
                    document.getElementById('stopBtnCB').style.color = '#990000';
                    timerControlsButtonsCB.pauseCB.style.display = 'none';
                    timerControlsButtonsCB.startCB.style.display = 'inline';
                    timerControlsButtonsCB.startCB.style.color = "rgb(177, 177, 177)";
                    document.getElementById('CBSettings').disabled = false;
                    document.getElementById('CBSettings').style.color = '#49B79D';
                    if (!audioPlayerBRT.muted) {
                        audioPlayerBRT.pause();
                    }
                    stopTimerTickCB();
                    document.getElementById('CBDate').value = date;
                    document.getElementById('CBSave').disabled = false;
                    document.getElementById('CBSave').style.color = '#49B79D';
                    clearInterval(CBcountdown);
                    CBisPaused = false;
                    setTimeout(() => {
                        audioObjects.normalbreath.muted = false;
                        audioObjects.normalbreath.play();
                        if (isPortuguese) {
                            CBballText.textContent = 'Respira\u00E7\u00E3o Normal';
                        } else {
                            CBballText.textContent = 'Normal Breath';
                        }
                    }, 1000);
                } else {
                    setTimeout(() => {
                        audioObjects.inhale.muted = false;
                        audioObjects.inhale.play();
                    }, 450);
                }
            }
            CBchangeBall(1.5, timerSettingsCB.intervalDurationCB);
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
    if (isPortuguese) {
        if (timerCB.isBreakCB) {
            CBballText.textContent = 'EXPIRA';
        } else {
            CBballText.textContent = 'INSPIRA';
        }
    } else {
        if (timerCB.isBreakCB) {
            CBballText.textContent = 'EXHALE';
        } else {
            CBballText.textContent = 'INHALE';
        }
    }
    statusPanelCB.intervalsDoneCB.value = timerCB.intervalsDoneCB;
}
//---------------------------------------------------//
