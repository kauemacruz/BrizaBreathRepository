/*APNEA JS*/
var isAPon = false;
const APball = document.getElementById('APball');
const APballText = document.getElementById('APballText');

function APchangeBall(scale, duration) {
    APball.style.transition = `transform ${duration}s ease`;
    APball.style.transform = `scale(${scale})`;
}

const APtimeInput = document.getElementById('APtimeInput');
const APcountdownDisplay = document.getElementById('APcountdownDisplay');
let APcountdown;
let APtimeRemaining = Infinity;
let APisPaused = false;
// Populate the dropdown with options
for (let APi = 2; APi <= 60; APi++) { // assuming 1 to 60 minutes
    let APoption = document.createElement('option');
    APoption.value = APi * 60;
    if (isPortuguese) {
        APoption.textContent = APi + ' minutos';
    } else {
        APoption.textContent = APi + ' minutes';
    }
    APtimeInput.appendChild(APoption);
}

//AP Modal
const modalAP = document.getElementById("myModalAP");
const closeModalAPButton = document.getElementById("closeModalAP");
var APquestion = document.getElementById("APquestion");

function openModalAP() {
    modalAP.style.display = "block";
    showSlides(slideIndex, 'APslides');
}

// Function to close the modalAP
function closeModalAP() {
    modalAP.style.display = "none";
    slideIndex = 1;

}

// Event listener for closing the modalAP
closeModalAPButton.addEventListener("click", closeModalAP);

// Close the modalAP if the user clicks outside the modalAP content
window.addEventListener("click", function (event) {
    if (event.target === modalAP) {
        closeModalAP();
    }
});
APquestion.onclick = function () {
    openModalAP();
}
APLink.onclick = function () {
    openPage(BHPage, APPage, 'slideLeft');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    backAP.style.display = "block";
    backBH.style.display = "none";
    audioObjects.inhale.load();
    audioObjects.exhale.load();
    audioObjects.hold.load();
    audioObjects.normalbreath.load();
}
backAP.onclick = function () {
    openPage(APPage, BHPage, 'slideRight');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    backAP.style.display = "none";
    backBH.style.display = "block";
    isAPon = false;
    clearInterval(intAP);
    [secondsAP, minutesAP, hoursAP] = [0, 0, 0];
    timerRefAP.value = '00 : 00 : 00';
    if (!audioPlayerBRT.muted) {
        audioPlayerBRT.pause();
    }
    audioPlayerBRT.currentTime = 0;
    timerControlsButtonsAP.pauseAP.style.display = 'none';
    timerControlsButtonsAP.startAP.style.display = 'inline';
    setFormDisabledStateAP(false);
    setTimerControlsDisabledStateAP(false, true, true);
    timerControlsButtonsAP.stopAP.style.color = "rgb(177, 177, 177)";
    document.getElementById('APSave').disabled = true;
    document.getElementById('APSave').style.color = 'rgb(177, 177, 177)';
    document.getElementById('APSettings').disabled = false;
    document.getElementById('APSettings').style.color = '#0661AA';
    stopTimerTickAP();
    resetTimerAP();
    document.getElementById('APResultSaved').innerHTML = "";
    clearInterval(APcountdown);
    APisPaused = false;
    APtimeInput.classList.remove('CountdownHidden');
    APcountdownDisplay.classList.add('CountdownHidden');
    APchangeBall(1, 1);
}
APSettings.onclick = function () {
    openPage(APPage, APSettingsPage, 'slideLeft');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    selectSongsList.style.display = "block";
    backAP.style.display = "none";
    backAPSet.style.display = "block";
}
backAPSet.onclick = function () {
    if (!audioPlayerBRT.muted) {
        audioPlayerBRT.pause();
    }
    audioPlayerBRT.currentTime = 0;
    openPage(APSettingsPage, APPage, 'slideRight');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    selectSongsList.style.display = "none";
    backAP.style.display = "block";
    backAPSet.style.display = "none";
}

$(function () {
    $('#APForm').on('submit', function (e) {
        e.preventDefault(); // Prevent the default form submission

        var formData = new FormData(this); // Get the form data

        $.ajax({
            url: "/",
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function (result) {
                $('#APResultSaved').html(result); // Update the result section with the server response
            }
        });
        clearInterval(intAP);
        [secondsAP, minutesAP, hoursAP] = [0, 0, 0];
        timerRefAP.value = '00 : 00 : 00';
        audioPlayerBRT.currentTime = 0
        timerControlsButtonsAP.pauseAP.style.display = 'none';
        timerControlsButtonsAP.startAP.style.display = 'inline';
        timerControlsButtonsAP.startAP.style.color = '#49B79D';
        setFormDisabledStateAP(false);
        setTimerControlsDisabledStateAP(false, true, true);
        timerControlsButtonsAP.stopAP.style.color = "rgb(177, 177, 177)";
        document.getElementById('APSave').disabled = true;
        document.getElementById('APSave').style.color = 'rgb(177, 177, 177)';
        stopTimerTickAP();
        resetTimerAP();
        CBtimeInput.classList.remove('CountdownHidden');
        CBcountdownDisplay.classList.add('CountdownHidden');
    });
});

let
    formSettingsFieldsAP,
    timerControlsButtonsAP,
    statusPanelAP,
    timerAP,
    timerSettingsAP;

function setTimerSettingsAP(
    intervalCountAP = timerSettingsAP.intervalCountAP,
    intervalDurationAP = timerSettingsAP.intervalDurationAP,
    enableBreakAP = timerSettingsAP.enableBreakAP,
    breakDurationAP = timerSettingsAP.breakDurationAP,
    enableBreak2AP = timerSettingsAP.enableBreak2AP,
    breakDuration2AP = timerSettingsAP.breakDuration2AP
) {
    timerSettingsAP = {
        intervalCountAP,
        intervalDurationAP,
        enableBreakAP,
        breakDurationAP,
        enableBreak2AP,
        breakDuration2AP
    };
}
function resetTimerAP() {
    timerAP = {
        totalTimeElapsedAP: 0,
        elapsedInIntervalAP: 0,
        intervalsDoneAP: 0,
        isBreak3AP: true,
        isBreakAP: false,
        isBreak2AP: false,
        isFinishedAP: false
    };
    updateInfoAP();
}

let [secondsAP, minutesAP, hoursAP] = [0, 0, 0];
let timerRefAP = document.getElementById('timerDisplayAP');
let intAP = null;
document.getElementById('stopBtnAP').disabled = true;
document.getElementById('stopBtnAP').style.color = 'rgb(177, 177, 177)';
document.getElementById('APSave').disabled = true;
document.getElementById('APSave').style.color = 'rgb(177, 177, 177)';


var audioAP = document.getElementById("audioAP"),
    muteAP = document.getElementById("muteAP"),
    ismuteAP = false;

var audioSongAP = document.getElementById("songAP"),
    muteSongAP = document.getElementById("songMuteAP");

// Get the volumeVAP bar element
const volumeVoiceAP = document.getElementById('volumeVoiceAP');

// Add an event listener for the volumeVAP change event
volumeVoiceAP.addEventListener('input', function () {
    // Get the current volumeVAP value
    const volumeVAP = parseFloat(volumeVoiceAP.value);

    // Check if volumeVAP is 0 and mute the media if necessary
    if (volumeVAP === 0) {
        audioObjects.inhale.muted = true;
        audioObjects.exhale.muted = true;
        audioObjects.hold.muted = true;
        audioAP.style.display = "none";
        muteAP.style.display = "block";
        ismuteAP = true;
    } else {
        audioObjects.inhale.muted = false;
        audioObjects.exhale.muted = false;
        audioObjects.hold.muted = false;
        muteAP.style.display = "none";
        audioAP.style.display = "block";
        ismuteAP = false;
    }
});
// Get the volumeSAP bar element
const volumeSongAP = document.getElementById('volumeSongAP');

// Add an event listener for the volumeSAP change event
volumeSongAP.addEventListener('input', function () {
    // Get the current volumeSAP value
    const volumeSAP = parseFloat(volumeSongAP.value);

    // Check if volumeSAP is 0 and mute the media if necessary
    if (volumeSAP === 0) {
        audioPlayerBRT.muted = true;
        audioSongAP.style.display = "none";
        muteSongAP.style.display = "block";
    } else {
        audioPlayerBRT.muted = false;
        muteSongAP.style.display = "none";
        audioSongAP.style.display = "block";
    }
});


var inhaleAP = 3;
var holdAP = 12;
var exhaleAP = 6;
setTimerSettingsAP(9999, inhaleAP, true, holdAP, true, exhaleAP);
initializeTimerControlsAP();
initializeStatusPanelAP();
initializeTimerSettingsFormAP();
resetTimerAP();


var minusBtnAP = document.getElementById("minusAP"),
    plusBtnAP = document.getElementById("plusAP"),
    numberAP = 3, /// numberAP value
    minAP = 2, /// minAP numberAP
    maxAP = 60;

minusBtnAP.onclick = function () {
    if (numberAP > minAP) {
        numberAP = numberAP - 1; /// Minus 1 of the numberAP
        formSettingsFieldsAP.intervalDurationAP.value = numberAP; /// Display the value in place of the numberAP
        //fix here to change pranayama type
        formSettingsFieldsAP.breakDurationAP.value = formSettingsFieldsAP.intervalDurationAP.value*4;
        formSettingsFieldsAP.breakDuration2AP.value = formSettingsFieldsAP.intervalDurationAP.value*2;
        setTimerSettingsAP(9999, formSettingsFieldsAP.intervalDurationAP.value, true, formSettingsFieldsAP.breakDurationAP.value, true, formSettingsFieldsAP.breakDuration2AP.value);
    }
}

plusBtnAP.onclick = function () {
    if (numberAP < maxAP) {
        numberAP = numberAP + 1;
        formSettingsFieldsAP.intervalDurationAP.value = numberAP; /// Display the value in place of the numberAP
        //fix here to change pranayama type
        formSettingsFieldsAP.breakDurationAP.value = formSettingsFieldsAP.intervalDurationAP.value*4;
        formSettingsFieldsAP.breakDuration2AP.value = formSettingsFieldsAP.intervalDurationAP.value*2;
        setTimerSettingsAP(9999, formSettingsFieldsAP.intervalDurationAP.value, true, formSettingsFieldsAP.breakDurationAP.value, true, formSettingsFieldsAP.breakDuration2AP.value);

    }
}

function initializeTimerSettingsFormAP() {
    const oneDayInSecondsBRE = 60 * 60 * 24;
    let lastUserSetEnableBreakAP = timerSettingsAP.enableBreakAP;
    let lastUserSetEnableBreak2AP = timerSettingsAP.enableBreak2AP;

    formSettingsFieldsAP = {
        intervalCountAP: document.getElementById('intervalCountInputAP'),
        intervalDurationAP: document.getElementById('intervalDurationInputAP'),
        enableBreakAP: document.getElementById('enableBreakInputAP'),
        breakDurationAP: document.getElementById('breakDurationInputAP'),
        enableBreak2AP: document.getElementById('enableBreakInput2AP'),
        breakDuration2AP: document.getElementById('breakDurationInput2AP')
    };

    formSettingsFieldsAP.intervalCountAP.value = timerSettingsAP.intervalCountAP;
    formSettingsFieldsAP.intervalDurationAP.value = timerSettingsAP.intervalDurationAP;
    formSettingsFieldsAP.enableBreakAP.checked = timerSettingsAP.enableBreakAP;
    formSettingsFieldsAP.breakDurationAP.value = timerSettingsAP.breakDurationAP;
    formSettingsFieldsAP.enableBreak2AP.checked = timerSettingsAP.enableBreak2AP;
    formSettingsFieldsAP.breakDuration2AP.value = timerSettingsAP.breakDuration2AP;

    function getNumberInBoundsOrDefaultAP(value, minAP, maxAP, def = 1) {
        const valueAsNumberAP = parseInt(value);
        return isNaN(valueAsNumberAP) ? def : Math.max(minAP, Math.min(valueAsNumberAP, maxAP));
    }

    function setBreakDurationLineDisplayAP(displayed) {
        const breakDurationInputLineEltAP = document.getElementById('breakDurationInputLineAP');
        breakDurationInputLineEltAP.style.display = displayed ? null : 'none';
        const breakDurationInputLineElt2AP = document.getElementById('breakDurationInputLine2AP');
        breakDurationInputLineElt2AP.style.display = displayed ? null : 'none';
        const breakDurationInputLineElt3AP = document.getElementById('breakDurationInputLine3AP');
        breakDurationInputLineElt3AP.style.display = displayed ? null : 'none';
    }

    formSettingsFieldsAP.intervalCountAP.addEventListener('input', () => {
        const intervalCountAP = getNumberInBoundsOrDefaultAP(formSettingsFieldsAP.intervalCountAP.value, 1, 9999),
            hasOneIntervalAP = intervalCountAP === 1,
            hasBreakAP = hasOneIntervalAP ? false : lastUserSetEnableBreakAP;

        formSettingsFieldsAP.enableBreakAP.disabled = hasOneIntervalAP === true;
        formSettingsFieldsAP.enableBreakAP.checked = hasBreakAP;

        setBreakDurationLineDisplayAP(hasBreakAP);

        setTimerSettingsAP(intervalCountAP, undefined, hasBreakAP);
        updateInfoAP();
    });

    formSettingsFieldsAP.intervalDurationAP.addEventListener('input', () => {
        setTimerSettingsAP(undefined, getNumberInBoundsOrDefaultAP(formSettingsFieldsAP.intervalDurationAP.value, 1, oneDayInSecondsBRE));
        updateInfoAP();
    });

    formSettingsFieldsAP.enableBreakAP.addEventListener('change', () => {
        const enableBreakAP = formSettingsFieldsAP.enableBreakAP.checked;

        lastUserSetEnableBreakAP = enableBreakAP;
        setBreakDurationLineDisplayAP(enableBreakAP);
        setTimerSettingsAP(undefined, undefined, enableBreakAP);
        updateInfoAP();
    });

    formSettingsFieldsAP.breakDurationAP.addEventListener('input', () => {
        setTimerSettingsAP(undefined, undefined, undefined,
            getNumberInBoundsOrDefaultAP(formSettingsFieldsAP.breakDurationAP.value, 1, oneDayInSecondsBRE)
        );
        updateInfoAP();
    });

    formSettingsFieldsAP.enableBreak2AP.addEventListener('change', () => {
        const enableBreak2AP = formSettingsFieldsAP.enableBreak2AP.checked;

        lastUserSetEnableBreak2AP = enableBreak2AP;
        setBreakDurationLineDisplayAP(enableBreak2AP);
        setTimerSettingsAP(undefined, undefined, undefined, undefined, enableBreak2AP);
        updateInfoAP();
    });

    formSettingsFieldsAP.breakDuration2AP.addEventListener('input', () => {
        setTimerSettingsAP(undefined, undefined, undefined, undefined, undefined,
            getNumberInBoundsOrDefaultAP(formSettingsFieldsAP.breakDuration2AP.value, 1, oneDayInSecondsBRE)
        );
        updateInfoAP();
    });
}

function initializeTimerControlsAP() {
    timerControlsButtonsAP = {
        startAP: document.getElementById('startBtnAP'),
        pauseAP: document.getElementById('pauseBtnAP'),
        stopAP: document.getElementById('stopBtnAP'),
    };

    setTimerControlsDisabledStateAP(false, true, true);

    timerControlsButtonsAP.startAP.addEventListener('click', startTimerAP);
    timerControlsButtonsAP.pauseAP.addEventListener('click', pauseTimerAP);
    timerControlsButtonsAP.stopAP.addEventListener('click', stopTimerAP);
}

function initializeStatusPanelAP() {
    statusPanelAP = {
        timeOverviewMessageAP: document.getElementById('timeOverviewMessageAP'),

        elapsedInIntervalBoxAP: document.getElementById('elapsedInIntervalBoxAP'),
        elapsedInBreakIntervalBoxAP: document.getElementById('elapsedInBreakIntervalBoxAP'),
        elapsedInIntervalAP: document.getElementById('elapsedInIntervalAP'),
        elapsedInBreakIntervalAP: document.getElementById('elapsedInBreakIntervalAP'),
        elapsedInBreakIntervalBox2AP: document.getElementById('elapsedInBreakIntervalBox2AP'),
        elapsedInBreakInterval2AP: document.getElementById('elapsedInBreakInterval2AP'),
        elapsedInBreakIntervalBox3AP: document.getElementById('elapsedInBreakIntervalBox3AP'),

        intervalsDoneAP: document.getElementById('intervalsDoneAP'),
    };
}

function setTimerControlsDisabledStateAP(startAP, pauseAP, stopAP) {
    timerControlsButtonsAP.startAP.disabled = startAP;
    timerControlsButtonsAP.pauseAP.disabled = pauseAP;
    timerControlsButtonsAP.stopAP.disabled = stopAP;
}

function setFormDisabledStateAP(disabled) {
    formSettingsFieldsAP.intervalCountAP.disabled = disabled;
    formSettingsFieldsAP.intervalDurationAP.disabled = disabled;
    formSettingsFieldsAP.enableBreakAP.disabled = disabled || timerSettingsAP.intervalCountAP === 1;
    formSettingsFieldsAP.breakDurationAP.disabled = disabled;
    formSettingsFieldsAP.enableBreak2AP.disabled = disabled
    formSettingsFieldsAP.breakDuration2AP.disabled = disabled;
    minusBtnAP.disabled = disabled;
    plusBtnAP.disabled = disabled;
}

function startTimerAP() {
    requestWakeLock();
    isAPon = true;
    if (intAP !== null) {
        clearInterval(intAP);
    }
    setFormDisabledStateAP(true);
    setTimerControlsDisabledStateAP(true, true, true);
    setTimeout(() => {
        setTimerControlsDisabledStateAP(true, false, true);
    }, 2000);  
    timerControlsButtonsAP.stopAP.style.color = "rgb(177, 177, 177)";
    if (timerAP.isBreak3AP) {
        if (!ismuteAP) {
            audioObjects.bell.muted = false;
            audioObjects.bell.play();
            setTimeout(() => {
                audioObjects.inhale.muted = false;
                audioObjects.inhale.play();
            }, 1500);    
        }
        setTimeout(() => {
            APchangeBall(1.5, timerSettingsAP.intervalDurationAP);
        }, 1500);  
    }
    if (!audioPlayerBRT.muted) {
        playSelectedSongBRT(true);
    }
    if (timerAP.isFinishedAP) {
        resetTimerAP();
    }
    setTimeout(() => {
        setTimeout(() => {
            intAP = setInterval(displayTimerAP, 1000);
        }, 1000);
        startTimerTickAP();
        if (APisPaused) {
            // Resume from paused state
            APstartTimer(APtimeRemaining);
            APisPaused = false;
        } else {
            // Start a new timer
            clearInterval(APcountdown);
            APtimeRemaining = APtimeInput.value === '∞' ? Infinity : parseInt(APtimeInput.value);
            APcountdownDisplay.textContent = '';
            APstartTimer(APtimeRemaining);
        }
    }, 1700);
    timerControlsButtonsAP.startAP.style.display = 'none';
    timerControlsButtonsAP.pauseAP.style.display = 'inline';
    document.getElementById('APSettings').disabled = true;
    document.getElementById('APSettings').style.color = 'rgb(177, 177, 177)';
    document.getElementById('APSave').disabled = true;
    document.getElementById('APSave').style.color = 'rgb(177, 177, 177)';
}
function APstartTimer(APduration) {    
    APcountdown = setInterval(function () {
        if (APduration > 0 && APduration !== Infinity) {
            APduration--;
            APtimeRemaining = APduration;
            let APContdownminutes = Math.floor(APduration / 60);
            let APContdownseconds = APduration % 60;
            APcountdownDisplay.textContent = `${APContdownminutes}:${APContdownseconds.toString().padStart(2, '0')}`;
            APtimeInput.classList.add('CountdownHidden');
            APcountdownDisplay.classList.remove('CountdownHidden');
        } else if (APduration == Infinity) {
            APcountdownDisplay.textContent = '∞';
            APtimeInput.classList.add('CountdownHidden');
            APcountdownDisplay.classList.remove('CountdownHidden');
        }
    }, 1000);
}
function pauseTimerAP() {
    isAPon = false;
    clearInterval(intAP);
    setTimerControlsDisabledStateAP(false, true, false);
    document.getElementById('stopBtnAP').style.color = '#990000';
    timerControlsButtonsAP.pauseAP.style.display = 'none';
    timerControlsButtonsAP.startAP.style.display = 'inline';
    document.getElementById('APSettings').disabled = false;
    document.getElementById('APSettings').style.color = '#49B79D';
    if (!audioPlayerBRT.muted) {
        audioPlayerBRT.pause();
    }
    stopTimerTickAP();
    document.getElementById('APDate').value = date;
    document.getElementById('APSave').disabled = false;
    document.getElementById('APSave').style.color = '#49B79D';
    clearInterval(APcountdown);
    APisPaused = true;
    APchangeBall(1, 1);
}

function stopTimerAP() {
    isAPon = false;
    clearInterval(intAP);
    [secondsAP, minutesAP, hoursAP] = [0, 0, 0];
    timerRefAP.value = '00 : 00 : 00';
    audioPlayerBRT.currentTime = 0
    timerControlsButtonsAP.pauseAP.style.display = 'none';
    timerControlsButtonsAP.startAP.style.display = 'inline';
    setFormDisabledStateAP(false);
    setTimerControlsDisabledStateAP(false, true, true);
    timerControlsButtonsAP.stopAP.style.color = "rgb(177, 177, 177)";
    document.getElementById('APSave').disabled = true;
    document.getElementById('APSave').style.color = 'rgb(177, 177, 177)';
    timerControlsButtonsAP.startAP.style.color = '#49B79D';
    stopTimerTickAP();
    resetTimerAP();
    clearInterval(APcountdown);
    APisPaused = false;
    APtimeInput.classList.remove('CountdownHidden');
    APcountdownDisplay.classList.add('CountdownHidden');
    APchangeBall(1, 1);
}

function displayTimerAP() {
    secondsAP++;
    if (secondsAP == 60) {
        secondsAP = 0;
        minutesAP++;
        if (minutesAP == 60) {
            minutesAP = 0;
            hoursAP++;
        }
    }
    let hAP = hoursAP < 10 ? "0" + hoursAP : hoursAP;
    let mAP = minutesAP < 10 ? "0" + minutesAP : minutesAP;
    let sAP = secondsAP < 10 ? "0" + secondsAP : secondsAP;
    timerRefAP.value = `${hAP} : ${mAP} : ${sAP}`;
}

function startTimerTickAP() {
    timerAP.intervalId = setInterval(onTimerTickAP, 1000);
}

function stopTimerTickAP() {
    clearInterval(timerAP.intervalId);
}

function onTimerTickAP() {
    const currentIntervalDurationAP = timerAP.isBreakAP ? timerSettingsAP.breakDurationAP : timerAP.isBreak2AP ? timerSettingsAP.breakDuration2AP : timerSettingsAP.intervalDurationAP;
    if (timerAP.elapsedInIntervalAP <= currentIntervalDurationAP && timerAP.isBreak3AP) {
        timerAP.elapsedInIntervalAP++;
        if (timerAP.elapsedInIntervalAP == currentIntervalDurationAP && timerAP.isBreak3AP) {
            if (!ismuteAP) {
                audioObjects.hold.muted = false;
                audioObjects.hold.play();
            }
            APchangeBall(1.0, timerSettingsAP.breakDurationAP);
        }
        if (timerAP.elapsedInIntervalAP > currentIntervalDurationAP && timerAP.isBreak3AP) {
            timerAP.isBreakAP = true;
            timerAP.isBreak3AP = false;
            timerAP.isFinishedAP = timerAP.intervalsDoneAP === timerSettingsAP.intervalCountAP;
            if (!timerAP.isFinishedAP) {
                timerAP.elapsedInIntervalAP = 1;
            }
            if (timerAP.isFinishedAP) {
                setTimerControlsDisabledStateAP(false, true, true);
                setFormDisabledStateAP(false);
                stopTimerTickAP();
            } else {
                timerAP.totalTimeElapsedAP++;
            }
            updateInfoAP();
        }
        updateInfoAP();
    } else if (timerAP.elapsedInIntervalAP <= currentIntervalDurationAP && timerAP.isBreakAP) {
        timerAP.elapsedInIntervalAP++;
        if (timerAP.elapsedInIntervalAP == currentIntervalDurationAP && timerAP.isBreakAP) {
            if (!ismuteAP) {
                audioObjects.exhale.muted = false;
                audioObjects.exhale.play();
            }
            APchangeBall(0.5, timerSettingsAP.breakDuration2AP);
        }
        if (timerAP.elapsedInIntervalAP > currentIntervalDurationAP && timerAP.isBreakAP) {
            timerAP.isBreak2AP = true;
            timerAP.isBreakAP = false;
            timerAP.isFinishedAP = timerAP.intervalsDoneAP === timerSettingsAP.intervalCountAP;
            if (!timerAP.isFinishedAP) {
                timerAP.elapsedInIntervalAP = 1;
            }
            if (timerAP.isFinishedAP) {
                setTimerControlsDisabledStateAP(false, true, true);
                setFormDisabledStateAP(false);
                stopTimerTickAP();
            } else {
                timerAP.totalTimeElapsedAP++;
            }
            updateInfoAP();
        }
        updateInfoAP();
    } else if (timerAP.elapsedInIntervalAP <= currentIntervalDurationAP && timerAP.isBreak2AP) {
        timerAP.elapsedInIntervalAP++;
        if (timerAP.elapsedInIntervalAP == currentIntervalDurationAP && timerAP.isBreak2AP) {
            if (!ismuteAP) {
                if (APcountdownDisplay.textContent == '0:00') {
                    audioObjects.inhale.muted = true;
                    clearInterval(APcountdown);
                    if (!ismuteAP) {
                        audioObjects.bell.muted = false;
                        audioObjects.bell.play();
                    }
                    clearInterval(intAP);
                    setTimerControlsDisabledStateAP(true, true, false);
                    document.getElementById('stopBtnAP').style.color = '#990000';
                    timerControlsButtonsAP.pauseAP.style.display = 'none';
                    timerControlsButtonsAP.startAP.style.display = 'inline';
                    timerControlsButtonsAP.startAP.style.color = "rgb(177, 177, 177)";
                    document.getElementById('APSettings').disabled = false;
                    document.getElementById('APSettings').style.color = '#49B79D';
                    if (!audioPlayerBRT.muted) {
                        audioPlayerBRT.pause();
                    }
                    stopTimerTickAP();
                    document.getElementById('APDate').value = date;
                    document.getElementById('APSave').disabled = false;
                    document.getElementById('APSave').style.color = '#49B79D';
                    clearInterval(APcountdown);
                    APisPaused = false;
                    setTimeout(() => {
                        audioObjects.normalbreath.muted = false;
                        audioObjects.normalbreath.play();
                        if (isPortuguese) {
                            APballText.textContent = 'Respira\u00E7\u00E3o Normal';
                        } else {
                            APballText.textContent = 'Normal Breath';
                        }
                    }, 1000);
                } else {
                    audioObjects.inhale.muted = false;
                    audioObjects.inhale.play();
                }
            }
            APchangeBall(1.5, timerSettingsAP.intervalDurationAP);
        }
        if (timerAP.elapsedInIntervalAP > currentIntervalDurationAP && timerAP.isBreak2AP) {
            timerAP.isBreak3AP = true;
            timerAP.isBreak2AP = false;
            timerAP.intervalsDoneAP++;
            timerAP.isFinishedAP = timerAP.intervalsDoneAP === timerSettingsAP.intervalCountAP;
            if (!timerAP.isFinishedAP) {
                timerAP.elapsedInIntervalAP = 1;
            }
            if (timerAP.isFinishedAP) {
                setTimerControlsDisabledStateAP(false, true, true);
                setFormDisabledStateAP(false);
                stopTimerTickAP();
            } else {
                timerAP.totalTimeElapsedAP++;
            }
            updateInfoAP();
        }
        updateInfoAP();
    } 
}

function updateInfoAP() {
    statusPanelAP.timeOverviewMessageAP.style.display = timerAP.isFinishedAP ? 'block' : null;
    statusPanelAP.elapsedInIntervalBoxAP.style.display = timerAP.isFinishedAP || timerAP.isBreakAP || timerAP.isBreak2AP || timerAP.isBreak4AP ? 'none' : null;
    statusPanelAP.elapsedInBreakIntervalBoxAP.style.display = !timerAP.isFinishedAP && timerAP.isBreakAP ? 'block' : null;
    statusPanelAP.elapsedInBreakIntervalBox2AP.style.display = !timerAP.isFinishedAP && timerAP.isBreak2AP ? 'block' : null;
    if (isPortuguese) {
        if (timerAP.isBreakAP) {
            APballText.textContent = 'SEGURE';
        } else if (timerAP.isBreak2AP) {
            APballText.textContent = 'EXPIRA';
        } else {
            APballText.textContent = 'INSPIRA';
        }
    } else {
        if (timerAP.isBreakAP) {
            APballText.textContent = 'HOLD';
        } else if (timerAP.isBreak2AP) {
            APballText.textContent = 'EXHALE';
        } else {
            APballText.textContent = 'INHALE';
        }
    }
    statusPanelAP.intervalsDoneAP.value = timerAP.intervalsDoneAP;
}
//---------------------------------------------------//
