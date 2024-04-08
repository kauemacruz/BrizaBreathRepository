/*CT JS*/
var isCTon = false;
const CTball = document.getElementById('CTball');
const CTballText = document.getElementById('CTballText');

function CTchangeBall(scale, duration) {
    CTball.style.transition = `transform ${duration}s ease`;
    CTball.style.transform = `scale(${scale})`;
}

const CTtimeInput = document.getElementById('CTtimeInput');
const CTcountdownDisplay = document.getElementById('CTcountdownDisplay');
let CTcountdown;
let CTtimeRemaining = Infinity;
let CTisPaused = false;
// Populate the dropdown with options
for (let CTi = 2; CTi <= 60; CTi++) { // assuming 1 to 60 minutes
    let CToption = document.createElement('option');
    CToption.value = CTi * 60;
    if (isPortuguese) {
        CToption.textContent = CTi + ' minutos';
    } else {
        CToption.textContent = CTi + ' minutes';
    }
    CTtimeInput.appendChild(CToption);
}

//CT Modal
const modalCT = document.getElementById("myModalCT");
const closeModalCTButton = document.getElementById("closeModalCT");
var CTquestion = document.getElementById("CTquestion");

function openModalCT() {
    modalCT.style.display = "block";
    showSlides(slideIndex, 'CTslides');
}

// Function to close the modalCT
function closeModalCT() {
    modalCT.style.display = "none";
    slideIndex = 1;

}

// Event listener for closing the modalCT
closeModalCTButton.addEventListener("click", closeModalCT);

// Close the modalCT if the user clicks outside the modalCT content
window.addEventListener("click", function (event) {
    if (event.target === modalCT) {
        closeModalCT();
    }
});
CTquestion.onclick = function () {
    openModalCT();
}
CTLink.onclick = function () {
    if (isUserActiveSubscriber) {
        openPage(BHPage, CTPage, 'slideLeft');
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        backCT.style.display = "block";
        backBH.style.display = "none";
        audioObjects.exhale.load();
        audioObjects.inhale.load();
        audioObjects.hold.load();
        audioObjects.normalbreath.load();
    } else {
        openModal();
    }
}
CTLink3.onclick = function () {
    if (isUserActiveSubscriber) {
        openPage(programPage2, CTPage, 'slideLeft');
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        backCT3.style.display = "block";
        backProgram2.style.display = "none";
        audioObjects.exhale.load();
        audioObjects.inhale.load();
        audioObjects.hold.load();
        audioObjects.normalbreath.load();
    } else {
        openModal();
    }
}
backCT.onclick = function () {
    openPage(CTPage, BHPage, 'slideRight');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    backBH.style.display = "block";
    backCT.style.display = "none";
    CTclose();
}
backCT2.onclick = function () {
    openPage(CTPage, programPage, 'slideRight');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    backProgram.style.display = "block";
    backCT2.style.display = "none";
    CTclose();
}
backCT3.onclick = function () {
    openPage(CTPage, programPage2, 'slideRight');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    backProgram2.style.display = "block";
    backCT3.style.display = "none";
    CTclose();
}
CTSettings.onclick = function () {
    openPage(CTPage, CTSettingsPage, 'slideLeft');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    selectSongsList.style.display = "block";
    backCTSet.style.display = "block";
    backCT.style.display = "none";
    backCT2.style.display = "none";
    backCT3.style.display = "none";
}
backCTSet.onclick = function () {
    if (!audioPlayerBRT.muted) {
        audioPlayerBRT.pause();
    }
    audioPlayerBRT.currentTime = 0;
    openPage(CTSettingsPage, CTPage, 'slideRight');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    selectSongsList.style.display = "none";
    backCT.style.display = "block";
    backCTSet.style.display = "none";
}
// Function to close the modal
function CTclose() {
    isCTon = false;
    clearInterval(intCT);
    [secondsCT, minutesCT, hoursCT] = [0, 0, 0];
    timerRefCT.value = '00 : 00 : 00';
    if (!audioPlayerBRT.muted) {
        audioPlayerBRT.pause();
    }
    audioPlayerBRT.currentTime = 0;
    timerControlsButtonsCT.pauseCT.style.display = 'none';
    timerControlsButtonsCT.startCT.style.display = 'inline';
    setFormDisabledStateCT(false);
    setTimerControlsDisabledStateCT(false, true, true);
    timerControlsButtonsCT.stopCT.style.color = "rgb(177, 177, 177)";
    document.getElementById('CTSave').disabled = true;
    document.getElementById('CTSave').style.color = 'rgb(177, 177, 177)';
    document.getElementById('CTSettings').disabled = false;
    document.getElementById('CTSettings').style.color = '#49B79D';
    stopTimerTickCT();
    resetTimerCT();
    document.getElementById('CTResultSaved').innerHTML = "";
    clearInterval(CTcountdown);
    CTisPaused = false;
    CTtimeInput.classList.remove('CountdownHidden');
    CTcountdownDisplay.classList.add('CountdownHidden');
    CTchangeBall(1, 1);
}

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
        timerControlsButtonsCT.startCT.style.color = '#0661AA';
        setFormDisabledStateCT(false);
        setTimerControlsDisabledStateCT(false, true, true);
        document.getElementById('CTSave').disabled = true;
        document.getElementById('CTSave').style.color = 'rgb(177, 177, 177)';
        stopTimerTickCT();
        resetTimerCT();
        document.getElementById('resetBtnCT').style.display = 'none';
        timerControlsButtonsCT.stopCT.style.display = "inline";
        timerControlsButtonsCT.stopCT.style.color = "rgb(177, 177, 177)";
        CBtimeInput.classList.remove('CountdownHidden');
        CBcountdownDisplay.classList.add('CountdownHidden');
        setTimerSettingsCT(9999, inhaleCT, true, holdCT, true, exhaleCT);
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

var audioCT = document.getElementById("audioCT"),
    muteCT = document.getElementById("muteCT"),
    ismuteCT = false;

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
        audioObjects.inhale.muted = true;
        audioObjects.recover.muted = true;
        audioObjects.exhale.muted = true;
        audioObjects.hold.muted = true;
        audioCT.style.display = "none";
        muteCT.style.display = "block";
        ismuteCT = true;
    } else {
        audioObjects.inhale.muted = false;
        audioObjects.recover.muted = false;
        audioObjects.exhale.muted = false;
        audioObjects.hold.muted = false;
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
}

function startTimerCT() {
    isCTon = true;
    if (intCT !== null) {
        clearInterval(intCT);
    }
    setFormDisabledStateCT(true);
    setTimerControlsDisabledStateCT(true, true, true);
    setTimeout(() => {
        setTimerControlsDisabledStateCT(false, false, false);
    }, 2000);
    timerControlsButtonsCT.stopCT.style.color = '#990000';
    if (timerCT.isBreak3CT) {
        if (!ismuteCT) {
            audioObjects.bell.muted = false;
            audioObjects.bell.play();
            setTimeout(() => {
                audioObjects.inhale.muted = false;
                audioObjects.inhale.play();
            }, 1500);    
        }
        setTimeout(() => {
            CTchangeBall(1.5, timerSettingsCT.intervalDurationCT);
        }, 1500);  
    }
    if (!audioPlayerBRT.muted) {
        playSelectedSongBRT(true);
    }
    if (timerCT.isFinishedCT) {
        resetTimerCT();
    }
    setTimeout(() => {
        setTimeout(() => {
            intCT = setInterval(displayTimerCT, 1000);
        }, 1000);
        startTimerTickCT();
        if (CTisPaused) {
            // Resume from paused state
            CTstartTimer(CTtimeRemaining);
            CTisPaused = false;
        } else {
            // Start a new timer
            clearInterval(CTcountdown);
            CTtimeRemaining = CTtimeInput.value === '∞' ? Infinity : parseInt(CTtimeInput.value);
            CTcountdownDisplay.textContent = '';
            CTstartTimer(CTtimeRemaining);
        }
    }, 1700);  
    timerControlsButtonsCT.startCT.style.display = 'none';
    timerControlsButtonsCT.pauseCT.style.display = 'inline';
    document.getElementById('CTSettings').disabled = true;
    document.getElementById('CTSettings').style.color = 'rgb(177, 177, 177)';
    document.getElementById('CTSave').disabled = true;
    document.getElementById('CTSave').style.color = 'rgb(177, 177, 177)';
}
function CTstartTimer(CTduration) {
    CTcountdown = setInterval(function () {
        if (CTduration > 0 && CTduration !== Infinity) {
            CTduration--;
            CTtimeRemaining = CTduration;
            let CTContdownminutes = Math.floor(CTduration / 60);
            let CTContdownseconds = CTduration % 60;
            CTcountdownDisplay.textContent = `${CTContdownminutes}:${CTContdownseconds.toString().padStart(2, '0')}`;
            CTtimeInput.classList.add('CountdownHidden');
            CTcountdownDisplay.classList.remove('CountdownHidden');
        } else if (CTduration == Infinity) {
            CTcountdownDisplay.textContent = '∞';
            CTtimeInput.classList.add('CountdownHidden');
            CTcountdownDisplay.classList.remove('CountdownHidden');
        }
    }, 1000);
}
function pauseTimerCT() {
    stopTimerTickCT();
    if (!ismuteCT) {
        audioObjects.recover.muted = false;
        audioObjects.recover.play();
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
    CTchangeBall(1, 1);
    if (isPortuguese) {
        CTballText.textContent = 'INSPIRA';
    } else {
        CTballText.textContent = 'INHALE';
    }
    setTimeout(function () {
        recoverCT();
        setTimerControlsDisabledStateCT(false, false, false);
    }, 3000);
}
function recoverCT() {
    startTimerTickCT();
    if (!ismuteCT) {
        audioObjects.inhale.muted = false;
        audioObjects.inhale.play();
    }
    CTchangeBall(1.5, timerSettingsCT.intervalDurationCT);
}
function stopTimerCT() {
    isCTon = false;
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
    clearInterval(CTcountdown);
    CTisPaused = true;
    CTchangeBall(1, 1);
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
    clearInterval(CTcountdown);
    CTisPaused = false;
    CTtimeInput.classList.remove('CountdownHidden');
    CTcountdownDisplay.classList.add('CountdownHidden');
    CTchangeBall(1, 1);
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
        if (timerCT.elapsedInIntervalCT == currentIntervalDurationCT && timerCT.isBreak3CT) {
            if (!ismuteCT) {
                audioObjects.exhale.muted = false;
                audioObjects.exhale.play();
            }
            CTchangeBall(0.5, timerSettingsCT.breakDurationCT);
        }
        if (timerCT.elapsedInIntervalCT > currentIntervalDurationCT && timerCT.isBreak3CT) {
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
        if (timerCT.elapsedInIntervalCT == currentIntervalDurationCT && timerCT.isBreakCT) {
            if (!ismuteCT) {
                audioObjects.hold.muted = false;
                audioObjects.hold.play();
            }
            CTchangeBall(0.5, timerSettingsCT.breakDurationCT);
        }
        if (timerCT.elapsedInIntervalCT > currentIntervalDurationCT && timerCT.isBreakCT) {
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
        if (timerCT.elapsedInIntervalCT == currentIntervalDurationCT && timerCT.isBreak2CT) {
            if (!ismuteCT) {
                if (CTcountdownDisplay.textContent == '0:00') {
                    audioObjects.inhale.muted = true;
                    clearInterval(CTcountdown);
                    if (!ismuteCT) {
                        audioObjects.bell.muted = false;
                        audioObjects.bell.play();
                    }
                    clearInterval(intCT);
                    setTimerControlsDisabledStateCT(true, true, false);
                    document.getElementById('stopBtnCT').style.color = '#990000';
                    timerControlsButtonsCT.pauseCT.style.display = 'none';
                    timerControlsButtonsCT.startCT.style.display = 'inline';
                    timerControlsButtonsCT.startCT.style.color = "rgb(177, 177, 177)";
                    document.getElementById('CTSettings').disabled = false;
                    document.getElementById('CTSettings').style.color = '#49B79D';
                    if (!audioPlayerBRT.muted) {
                        audioPlayerBRT.pause();
                    }
                    stopTimerTickCT();
                    document.getElementById('CTDate').value = date;
                    document.getElementById('CTSave').disabled = false;
                    document.getElementById('CTSave').style.color = '#49B79D';
                    clearInterval(CTcountdown);
                    CTisPaused = false;
                    setTimeout(() => {
                        audioObjects.normalbreath.muted = false;
                        audioObjects.normalbreath.play();
                        if (isPortuguese) {
                            CTballText.textContent = 'Respira\u00E7\u00E3o Normal';
                        } else {
                            CTballText.textContent = 'Normal Breath';
                        }
                    }, 1000);
                } else {
                    audioObjects.inhale.muted = false;
                    audioObjects.inhale.play();
                }
            }
            CTchangeBall(1.5, timerSettingsCT.intervalDurationCT);
        }
        if (timerCT.elapsedInIntervalCT > currentIntervalDurationCT && timerCT.isBreak2CT) {
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
    if (isPortuguese) {
        if (timerCT.isBreakCT) {
            CTballText.textContent = 'EXPIRA';
        } else if (timerCT.isBreak2CT) {
            CTballText.textContent = 'SEGURE';
        } else {
            CTballText.textContent = 'INSPIRA';
        }
    } else {
        if (timerCT.isBreakCT) {
            CTballText.textContent = 'EXHALE';
        } else if (timerCT.isBreak2CT) {
            CTballText.textContent = 'HOLD';
        } else {
            CTballText.textContent = 'INHALE';
        }
    }
    statusPanelCT.intervalsDoneCT.value = timerCT.intervalsDoneCT;
}
//---------------------------------------------------//
