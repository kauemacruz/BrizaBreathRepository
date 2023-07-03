/*APNEA JS*/
const songSelectAP = document.getElementById('song-selectAP');
const audioPlayerAP = document.getElementById('audio-playerAP');
var isAPON = false;
// Variable to store the timeout ID
let timeoutIdAP;


// Function to play the selected song
const playSelectedSongAP = () => {
    const selectedSongAP = songSelectAP.value;
    audioPlayerAP.src = selectedSongAP;
    if (isAPON !== true) {
        audioPlayerAP.muted = false;
        audioPlayerAP.play();
        localStorage.setItem('selectedSongAP', songSelectAP.value);
        // Clear any existing timeout
        clearTimeout(timeoutIdAP);
        timeoutIdAP = setTimeout(function () {
            audioPlayerAP.pause();
            audioPlayerAP.currentTime = 0;
        }, 15000);
    } else {
        audioPlayerAP.muted = false;
        audioPlayerAP.loop = true;
        audioPlayerAP.play();
        clearTimeout(timeoutIdAP);
    }
};


const storedSongAP = localStorage.getItem('selectedSongAP');
if (storedSongAP) {
    // Set the value of the songSelect dropdown to the stored song
    songSelectAP.value = storedSongAP;
}

// Add an event listener to the songSelectAP dropdown
songSelectAP.addEventListener('change', function () {
    // Stop the currently playing song
    audioPlayerAP.pause();
    audioPlayerAP.currentTime = 0;

    // Play the selected song
    playSelectedSongAP();
});

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
        audioPlayerAP.currentTime = 0
        timerControlsButtonsAP.pauseAP.style.display = 'none';
        timerControlsButtonsAP.startAP.style.display = 'inline';
        setFormDisabledStateAP(false);
        setTimerControlsDisabledStateAP(false, true, true);
        timerControlsButtonsAP.stopAP.style.color = "rgb(177, 177, 177)";
        document.getElementById('APSave').disabled = true;
        document.getElementById('APSave').style.color = 'rgb(177, 177, 177)';
        stopTimerTickAP();
        resetTimerAP();
        isAPON = false;
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

var audioListAP = []
audioListAP.push(new Audio('/sounds/breathein.mp3'))
audioListAP.push(new Audio('/sounds/holdyourbreath.mp3'));
audioListAP.push(new Audio('/sounds/exhale.mp3'));
audioListAP.push(new Audio('/sounds/hold.mp3'));


var audioAP = document.getElementById("audioAP"),
    muteAP = document.getElementById("muteAP"),
    ismuteAP = false;

audioPlayerAP.loop = true;

var audioSongAP = document.getElementById("songAP"),
    muteSongAP = document.getElementById("songMuteAP"),
    isSongMuteAP = false;

// Get the volumeVAP bar element
const volumeVoiceAP = document.getElementById('volumeVoiceAP');

// Add an event listener for the volumeVAP change event
volumeVoiceAP.addEventListener('input', function () {
    // Get the current volumeVAP value
    const volumeVAP = parseFloat(volumeVoiceAP.value);

    // Check if volumeVAP is 0 and mute the media if necessary
    if (volumeVAP === 0) {
        audioListAP[0].muted = true;
        audioListAP[1].muted = true;
        audioListAP[2].muted = true;
        audioListAP[3].muted = true;
        audioAP.style.display = "none";
        muteAP.style.display = "block";
        ismuteAP = true;
    } else {
        audioListAP[0].muted = false;
        audioListAP[1].muted = false;
        audioListAP[2].muted = false;
        audioListAP[3].muted = false;
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
        audioPlayerAP.muted = true;
        audioSongAP.style.display = "none";
        muteSongAP.style.display = "block";
        isSongMuteAP = true;
    } else {
        audioPlayerAP.muted = false;
        muteSongAP.style.display = "none";
        audioSongAP.style.display = "block";
        isSongMuteAP = false;
    }
});


var inhaleAP = 2;
var holdAP = 8;
var exhaleAP = 4;
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
    if (intAP !== null) {
        clearInterval(intAP);
    }
    intAP = setInterval(displayTimerAP, 1000);
    setFormDisabledStateAP(true);
    setTimerControlsDisabledStateAP(true, false, true);
    timerControlsButtonsAP.stopAP.style.color = "rgb(177, 177, 177)";
    if (timerAP.isBreak3AP) {
        audioListAP[2].muted = true;
        audioListAP[3].muted = true;
        audioListAP[2].play();
        audioListAP[3].play();
        setTimeout(function () {
            audioListAP[2].pause();
            audioListAP[2].currentTime = 0
            audioListAP[3].pause();
            audioListAP[3].currentTime = 0
        }, 1000);
        if (!ismuteAP) {
            audioListAP[0].play();
        }
    }
    isAPON = true;
    if (!isSongMuteAP) {
        playSelectedSongAP();
    }
    if (timerAP.isFinishedAP) {
        resetTimerAP();
    }
    startTimerTickAP();
    timerControlsButtonsAP.startAP.style.display = 'none';
    timerControlsButtonsAP.pauseAP.style.display = 'inline';
    document.getElementById('APSettings').disabled = true;
    document.getElementById('APSettings').style.color = 'rgb(177, 177, 177)';
    document.getElementById('APSave').disabled = true;
    document.getElementById('APSave').style.color = 'rgb(177, 177, 177)';
}

function pauseTimerAP() {
    clearInterval(intAP);
    setTimerControlsDisabledStateAP(false, true, false);
    document.getElementById('stopBtnAP').style.color = '#990000';
    timerControlsButtonsAP.pauseAP.style.display = 'none';
    timerControlsButtonsAP.startAP.style.display = 'inline';
    document.getElementById('APSettings').disabled = false;
    document.getElementById('APSettings').style.color = '#49B79D';
    if (!isSongMuteAP) {
        audioPlayerAP.pause();
    }
    stopTimerTickAP();
    isAPON = false;
    document.getElementById('APDate').value = date;
    document.getElementById('APSave').disabled = false;
    document.getElementById('APSave').style.color = '#49B79D';
}

function stopTimerAP() {
    clearInterval(intAP);
    [secondsAP, minutesAP, hoursAP] = [0, 0, 0];
    timerRefAP.value = '00 : 00 : 00';
    audioPlayerAP.currentTime = 0
    timerControlsButtonsAP.pauseAP.style.display = 'none';
    timerControlsButtonsAP.startAP.style.display = 'inline';
    setFormDisabledStateAP(false);
    setTimerControlsDisabledStateAP(false, true, true);
    timerControlsButtonsAP.stopAP.style.color = "rgb(177, 177, 177)";
    document.getElementById('APSave').disabled = true;
    document.getElementById('APSave').style.color = 'rgb(177, 177, 177)';
    stopTimerTickAP();
    resetTimerAP();
    isAPON = false;
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
        if (timerAP.elapsedInIntervalAP > currentIntervalDurationAP && timerAP.isBreak3AP) {
            if (!ismuteAP) {
                audioListAP[3].muted = false;
                audioListAP[3].play();
            }
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
        if (timerAP.elapsedInIntervalAP > currentIntervalDurationAP && timerAP.isBreakAP) {
            if (!ismuteAP) {
                audioListAP[2].muted = false;
                audioListAP[2].play();
            }
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
        if (timerAP.elapsedInIntervalAP > currentIntervalDurationAP && timerAP.isBreak2AP) {
            if (!ismuteAP) {
                audioListAP[0].muted = false;
                audioListAP[0].play();
            }
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
    if (timerAP.isBreakAP) {
        statusPanelAP.elapsedInBreakIntervalAP.textContent = timerAP.elapsedInIntervalAP;
    } else if (timerAP.isBreak2AP) {
        statusPanelAP.elapsedInBreakInterval2AP.textContent = timerAP.elapsedInIntervalAP;
    } else {
        statusPanelAP.elapsedInIntervalAP.textContent = timerAP.elapsedInIntervalAP;
    }
    statusPanelAP.intervalsDoneAP.value = timerAP.intervalsDoneAP;
}
//---------------------------------------------------//
