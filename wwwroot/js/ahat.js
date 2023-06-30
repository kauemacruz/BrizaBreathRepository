/*AHAT JS*/
const songSelectAHAT = document.getElementById('song-selectAHAT');
const audioPlayerAHAT = document.getElementById('audio-playerAHAT');
var isAHATON = false;
// Variable to store the timeout ID
let timeoutIdAHAT;


// Function to play the selected song
const playSelectedSongAHAT = () => {
    const selectedSongAHAT = songSelectAHAT.value;
    audioPlayerAHAT.src = selectedSongAHAT;
    if (isAHATON !== true) {
        audioPlayerAHAT.muted = false;
        audioPlayerAHAT.play();
        localStorage.setItem('selectedSongAHAT', songSelectAHAT.value);
        // Clear any existing timeout
        clearTimeout(timeoutIdAHAT);
        timeoutIdAHAT = setTimeout(function () {
            audioPlayerAHAT.pause();
            audioPlayerAHAT.currentTime = 0;
        }, 15000);
    } else {
        audioPlayerAHAT.muted = false;
        audioPlayerAHAT.loop = true;
        audioPlayerAHAT.play();
        clearTimeout(timeoutIdAHAT);
    }
};


const storedSongAHAT = localStorage.getItem('selectedSongAHAT');
if (storedSongAHAT) {
    // Set the value of the songSelect dropdown to the stored song
    songSelectAHAT.value = storedSongAHAT;
}

// Add an event listener to the songSelectAHAT dropdown
songSelectAHAT.addEventListener('change', function () {
    // Stop the currently playing song
    audioPlayerAHAT.pause();
    audioPlayerAHAT.currentTime = 0;

    // Play the selected song
    playSelectedSongAHAT();
});

$(function () {
    $('#ahatForm').on('submit', function (e) {
        e.preventDefault(); // Prevent the default form submission

        var formData = new FormData(this); // Get the form data

        $.ajax({
            url: "/",
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function (result) {
                $('#ahatResultSaved').html(result); // Update the result section with the server response
            }
        });
        document.getElementById("AHATResults").innerHTML = "";
        timerRefAHAT.value ="|";
        clearInterval(intAHAT);
        document.getElementById('ahatSettings').disabled = false;
        document.getElementById('ahatSettings').style.color = '#49B79D';
        if (!isSongMuteAHAT) {
            audioPlayerAHAT.pause();
        }
        timerControlsButtonsAHAT.pauseAHAT.style.display = 'none';
        timerControlsButtonsAHAT.startAHAT.style.display = 'inline';
        setFormDisabledStateAHAT(false);
        setTimerControlsDisabledStateAHAT(false, true, true);
        document.getElementById('resetBtnAHAT').style.display = 'none';
        document.getElementById('stopBtnAHAT').style.display = 'inline';
        timerControlsButtonsAHAT.stopAHAT.style.color = "rgb(177, 177, 177)";
        timerControlsButtonsAHAT.startAHAT.style.color = "#0661AA";
        document.getElementById('ahatSave').disabled = true;
        document.getElementById('ahatSave').style.color = 'rgb(177, 177, 177)';
        stopTimerTickAHAT();
        resetTimerAHAT();
        timerAHAT.isFinishedAHAT = true;
        isFirstTimeAHAT = false;
        stopTimerTickAHAT();
    });
});

let formSettingsFieldsAHAT,
    timerControlsButtonsAHAT,
    statusPanelAHAT,
    timerAHAT,
    timerSettingsAHAT;

function setTimerSettingsAHAT(
    intervalCountAHAT = timerSettingsAHAT.intervalCountAHAT,
    intervalDurationAHAT = timerSettingsAHAT.intervalDurationAHAT,
    enableBreakAHAT = timerSettingsAHAT.enableBreakAHAT,
    breakDurationAHAT = timerSettingsAHAT.breakDurationAHAT,
    enableBreak2AHAT = timerSettingsAHAT.enableBreak2AHAT,
    breakDuration2AHAT = timerSettingsAHAT.breakDuration2AHAT
) {
    timerSettingsAHAT = {
        intervalCountAHAT,
        intervalDurationAHAT,
        enableBreakAHAT,
        breakDurationAHAT,
        enableBreak2AHAT,
        breakDuration2AHAT,
    };
}

function resetTimerAHAT() {
    timerAHAT = {
        totalTimeElapsedAHAT: 0,
        elapsedInIntervalAHAT: 0,
        intervalsDoneAHAT: 0,
        isBreak0AHAT: true,
        isBreakAHAT: false,
        isBreak2AHAT: false,
        isFinishedAHAT: false
    };
    updateInfoAHAT();
}


let [secondsAHAT, minutesAHAT, hoursAHAT] = [0, 0, 0];
let timerRefAHAT = document.getElementById('timerDisplayAHAT');
let intAHAT = null;
document.getElementById('stopBtnAHAT').disabled = true;
document.getElementById('stopBtnAHAT').style.color = 'rgb(177, 177, 177)';
document.getElementById('ahatSave').disabled = true;
document.getElementById('ahatSave').style.color = 'rgb(177, 177, 177)';

var audioListAHAT = []
audioListAHAT.push(new Audio('../sounds/pinchnose.mp3'));
audioListAHAT.push(new Audio('../sounds/lightbreath.mp3'));
audioListAHAT.push(new Audio('../sounds/normalbreath.mp3'));
audioListAHAT.push(new Audio('../sounds/hold.mp3'));

var audioAHAT = document.getElementById("audioAHAT"),
    muteAHAT = document.getElementById("muteAHAT"),
    ismuteAHAT = false;

audioPlayerAHAT.loop = true;

var audioSongAHAT = document.getElementById("songAHAT"),
    muteSongAHAT = document.getElementById("songMuteAHAT"),
    isSongMuteAHAT = false;

// Get the volumeVahat bar element
const volumeVoiceAHAT = document.getElementById('volumeVoiceAHAT');

// Add an event listener for the volumeVahat change event
volumeVoiceAHAT.addEventListener('input', function () {
    // Get the current volumeVahat value
    const volumeVahat = parseFloat(volumeVoiceAHAT.value);

    // Check if volumeVahat is 0 and mute the media if necessary
    if (volumeVahat === 0) {
        audioListAHAT[0].muted = true;
        audioListAHAT[1].muted = true;
        audioListAHAT[2].muted = true;
        audioListAHAT[3].muted = true;
        audioAHAT.style.display = "none";
        muteAHAT.style.display = "block";
        ismuteAHAT = true;
    } else {
        audioListAHAT[0].muted = false;
        audioListAHAT[1].muted = false;
        audioListAHAT[2].muted = false;
        audioListAHAT[3].muted = false;
        muteAHAT.style.display = "none";
        audioAHAT.style.display = "block";
        ismuteAHAT = false;
    }
});
// Get the volumeSahat bar element
const volumeSongAHAT = document.getElementById('volumeSongAHAT');

// Add an event listener for the volumeSahat change event
volumeSongAHAT.addEventListener('input', function () {
    // Get the current volumeSahat value
    const volumeSahat = parseFloat(volumeSongAHAT.value);

    // Check if volumeSahat is 0 and mute the media if necessary
    if (volumeSahat === 0) {
        audioPlayerAHAT.muted = true;
        audioSongAHAT.style.display = "none";
        muteSongAHAT.style.display = "block";
        isSongMuteAHAT = true;
    } else {
        audioPlayerAHAT.muted = false;
        muteSongAHAT.style.display = "none";
        audioSongAHAT.style.display = "block";
        isSongMuteAHAT = false;
    }
});

var inhaleAHAT = 600;
var holdAHAT = 15;
var exhaleAHAT = 30;
setTimerSettingsAHAT(9999, inhaleAHAT, true, holdAHAT, true, exhaleAHAT);
initializeTimerControlsAHAT();
initializeStatusPanelAHAT();
initializeTimerSettingsFormAHAT();
resetTimerAHAT();

var minusBtnAHAT = document.getElementById("minusAHAT").style.display = 'none',
    plusBtnAHAT = document.getElementById("plusAHAT").style.display = 'none',
    numberAHAT = 4, /// numberAHAT value
    minAHAT = 2, /// minAHAT numberAHAT
    maxAHAT = 30;
minusBtnAHAT.onclick = function () {
    if (numberAHAT > minAHAT) {
        numberAHAT = numberAHAT - 1; /// Minus 1 of the numberAHAT
        formSettingsFieldsAHAT.intervalDurationAHAT.value = numberAHAT; /// Display the value in place of the numberAHAT
        //fix here to change pranayama type
        formSettingsFieldsAHAT.breakDurationAHAT.value = formSettingsFieldsAHAT.intervalDurationAHAT.value;
        formSettingsFieldsAHAT.breakDuration2AHAT.value = formSettingsFieldsAHAT.intervalDurationAHAT.value;
        formSettingsFieldsAHAT.breakDuration3.value = formSettingsFieldsAHAT.intervalDurationAHAT.value;
        setTimerSettingsAHAT(9999, formSettingsFieldsAHAT.intervalDurationAHAT.value, true, formSettingsFieldsAHAT.breakDurationAHAT.value, true, formSettingsFieldsAHAT.breakDuration2AHAT.value, true, formSettingsFieldsAHAT.breakDuration3.value);
    }
}

plusBtnAHAT.onclick = function () {
    if (numberAHAT < maxAHAT) {
        numberAHAT = numberAHAT + 1;
        formSettingsFieldsAHAT.intervalDurationAHAT.value = numberAHAT; /// Display the value in place of the numberAHAT
        //fix here to change pranayama type
        formSettingsFieldsAHAT.breakDurationAHAT.value = formSettingsFieldsAHAT.intervalDurationAHAT.value;
        formSettingsFieldsAHAT.breakDuration2AHAT.value = formSettingsFieldsAHAT.intervalDurationAHAT.value;
        setTimerSettingsAHAT(9999, formSettingsFieldsAHAT.intervalDurationAHAT.value, true, formSettingsFieldsAHAT.breakDurationAHAT.value, true, formSettingsFieldsAHAT.breakDuration2AHAT.value);
    }
}

function initializeTimerSettingsFormAHAT() {
    const oneDayInSecondsAHAT = 60 * 60 * 24;
    let lastUserSetEnableBreakAHAT = timerSettingsAHAT.enableBreakAHAT;
    let lastUserSetEnableBreak2AHAT = timerSettingsAHAT.enableBreak2AHAT;
    formSettingsFieldsAHAT = {
        intervalCountAHAT: document.getElementById('intervalCountInputAHAT'),
        intervalDurationAHAT: document.getElementById('intervalDurationInputAHAT'),
        enableBreakAHAT: document.getElementById('enableBreakInputAHAT'),
        breakDurationAHAT: document.getElementById('breakDurationInputAHAT'),
        enableBreak2AHAT: document.getElementById('enableBreakInput2AHAT'),
        breakDuration2AHAT: document.getElementById('breakDurationInput2AHAT'),
    };
    formSettingsFieldsAHAT.intervalCountAHAT.value = timerSettingsAHAT.intervalCountAHAT;
    formSettingsFieldsAHAT.intervalDurationAHAT.value = timerSettingsAHAT.intervalDurationAHAT;
    formSettingsFieldsAHAT.enableBreakAHAT.checked = timerSettingsAHAT.enableBreakAHAT;
    formSettingsFieldsAHAT.breakDurationAHAT.value = timerSettingsAHAT.breakDurationAHAT;
    formSettingsFieldsAHAT.enableBreak2AHAT.checked = timerSettingsAHAT.enableBreak2AHAT;
    formSettingsFieldsAHAT.breakDuration2AHAT.value = timerSettingsAHAT.breakDuration2AHAT;

    function getNumberInBoundsOrDefaultAHAT(value, minAHAT, maxAHAT, def = 1) {
        const valueAsNumberAHAT = parseInt(value);
        return isNaN(valueAsNumberAHAT) ? def : Math.max(minAHAT, Math.min(valueAsNumberAHAT, maxAHAT));
    }

    function setBreakDurationLineDisplayAHAT(displayed) {
        const breakDurationInputLineEltAHAT = document.getElementById('breakDurationInputLineAHAT');
        breakDurationInputLineEltAHAT.style.display = displayed ? null : 'none';
        const breakDurationInputLineElt2AHAT = document.getElementById('breakDurationInputLine2AHAT');
        breakDurationInputLineElt2AHAT.style.display = displayed ? null : 'none';
    }

    formSettingsFieldsAHAT.intervalCountAHAT.addEventListener('input', () => {
        const intervalCountAHAT = getNumberInBoundsOrDefaultAHAT(formSettingsFieldsAHAT.intervalCountAHAT.value, 1, 9999),
            hasOneInterval = intervalCountAHAT === 1,
            hasBreak = hasOneInterval ? false : lastUserSetEnableBreakAHAT;
        formSettingsFieldsAHAT.enableBreakAHAT.disabled = hasOneInterval === true;
        formSettingsFieldsAHAT.enableBreakAHAT.checked = hasBreak;
        setBreakDurationLineDisplayAHAT(hasBreak);
        setTimerSettingsAHAT(intervalCountAHAT, undefined, hasBreak);
        updateInfoAHAT();
    });

    formSettingsFieldsAHAT.intervalDurationAHAT.addEventListener('input', () => {
        setTimerSettingsAHAT(undefined, getNumberInBoundsOrDefaultAHAT(formSettingsFieldsAHAT.intervalDurationAHAT.value, 1, oneDayInSecondsAHAT));
        updateInfoAHAT();
    });

    formSettingsFieldsAHAT.enableBreakAHAT.addEventListener('change', () => {
        const enableBreakAHAT = formSettingsFieldsAHAT.enableBreakAHAT.checked;
        lastUserSetEnableBreakAHAT = enableBreakAHAT;
        setBreakDurationLineDisplayAHAT(enableBreakAHAT);
        setTimerSettingsAHAT(undefined, undefined, enableBreakAHAT);
        updateInfoAHAT();
    });

    formSettingsFieldsAHAT.breakDurationAHAT.addEventListener('input', () => {
        setTimerSettingsAHAT(
            undefined, undefined, undefined,
            getNumberInBoundsOrDefaultAHAT(formSettingsFieldsAHAT.breakDurationAHAT.value, 1, oneDayInSecondsAHAT)
        );
        updateInfoAHAT();
    });

    formSettingsFieldsAHAT.enableBreak2AHAT.addEventListener('change', () => {
        const enableBreak2AHAT = formSettingsFieldsAHAT.enableBreak2AHAT.checked;
        lastUserSetEnableBreak2AHAT = enableBreak2AHAT;
        setBreakDurationLineDisplayAHAT(enableBreak2AHAT);
        setTimerSettingsAHAT(undefined, undefined, undefined, undefined, enableBreak2AHAT);
        updateInfoAHAT();
    });

    formSettingsFieldsAHAT.breakDuration2AHAT.addEventListener('input', () => {
        setTimerSettingsAHAT(
            undefined, undefined, undefined, undefined, undefined,
            getNumberInBoundsOrDefaultAHAT(formSettingsFieldsAHAT.breakDuration2AHAT.value, 1, oneDayInSecondsAHAT)
        );
        updateInfoAHAT();
    });
}

function initializeTimerControlsAHAT() {
    timerControlsButtonsAHAT = {
        startAHAT: document.getElementById('startBtnAHAT'),
        pauseAHAT: document.getElementById('pauseBtnAHAT'),
        stopAHAT: document.getElementById('stopBtnAHAT'),
    };
    setTimerControlsDisabledStateAHAT(false, true, true);
    timerControlsButtonsAHAT.startAHAT.addEventListener('click', startTimerAHAT);
    timerControlsButtonsAHAT.pauseAHAT.addEventListener('click', pauseTimerAHAT);
    timerControlsButtonsAHAT.stopAHAT.addEventListener('click', stopTimerAHAT);
}

function initializeStatusPanelAHAT() {
    statusPanelAHAT = {
        timeOverviewMessageAHAT: document.getElementById('timeOverviewMessageAHAT'),
        elapsedInIntervalBoxAHAT: document.getElementById('elapsedInIntervalBoxAHAT'),
        elapsedInBreakIntervalBoxAHAT: document.getElementById('elapsedInBreakIntervalBoxAHAT'),
        elapsedInIntervalAHAT: document.getElementById('elapsedInIntervalAHAT'),
        elapsedInBreakIntervalAHAT: document.getElementById('elapsedInBreakIntervalAHAT'),
        elapsedInBreakIntervalBox2AHAT: document.getElementById('elapsedInBreakIntervalBox2AHAT'),
        elapsedInBreakInterval2AHAT: document.getElementById('elapsedInBreakInterval2AHAT'),
        intervalsDoneAHAT: document.getElementById('intervalsDoneAHAT'),
    };
}

function setTimerControlsDisabledStateAHAT(startAHAT, pauseAHAT, stopAHAT) {
    timerControlsButtonsAHAT.startAHAT.disabled = startAHAT;
    timerControlsButtonsAHAT.pauseAHAT.disabled = pauseAHAT;
    timerControlsButtonsAHAT.stopAHAT.disabled = stopAHAT;
}

function setFormDisabledStateAHAT(disabled) {
    formSettingsFieldsAHAT.intervalCountAHAT.disabled = disabled;
    formSettingsFieldsAHAT.intervalDurationAHAT.disabled = disabled;
    formSettingsFieldsAHAT.enableBreakAHAT.disabled = disabled || timerSettingsAHAT.intervalCountAHAT === 1;
    formSettingsFieldsAHAT.breakDurationAHAT.disabled = disabled;
    formSettingsFieldsAHAT.enableBreak2AHAT.disabled = disabled
    formSettingsFieldsAHAT.breakDuration2AHAT.disabled = disabled;
    minusBtnAHAT.disabled = disabled;
    plusBtnAHAT.disabled = disabled;
}
var isFirstTimeAHAT = true;
function startTimerAHAT() {
    setFormDisabledStateAHAT(true);
    setTimerControlsDisabledStateAHAT(false, true, false);
    document.getElementById('stopBtnAHAT').style.color = '#990000';
    if (intAHAT !== null) {
        clearInterval(intAHAT);
    }
    intAHAT = setInterval(displayTimerAHAT, 1000);
    if (timerAHAT.isBreak0AHAT) {
        audioListAHAT[1].muted = true;
        audioListAHAT[2].muted = true;
        audioListAHAT[3].muted = true;
        audioListAHAT[1].play();
        audioListAHAT[2].play();
        audioListAHAT[3].play();
        setTimeout(function () {
            audioListAHAT[1].pause();
            audioListAHAT[1].currentTime = 0
            audioListAHAT[2].pause();
            audioListAHAT[2].currentTime = 0
            audioListAHAT[3].pause();
            audioListAHAT[3].currentTime = 0
        }, 1000);
        if (!ismuteAHAT) {
            audioListAHAT[0].play();
        }
    }
    isAHATON = true;
    if (!isSongMuteAHAT) {
        playSelectedSongAHAT();
    }
    if (timerAHAT.isFinishedAHAT) {
        resetTimerAHAT();
    }
    if (isFirstTimeAHAT) {
        startTimerTickAHAT();
    } else {
        onTimerTickAHAT();
        document.getElementById("AHATResults").value = "";
    }
    timerControlsButtonsAHAT.startAHAT.style.display = 'none';
    timerControlsButtonsAHAT.pauseAHAT.style.display = 'inline';
    document.getElementById('ahatSettings').disabled = true;
    document.getElementById('ahatSettings').style.color = 'rgb(177, 177, 177)';
}

var nextroundAHAT = false;
function pauseTimerAHAT() {
    document.getElementById('stopBtnAHAT').style.color = '#990000';
    setTimerControlsDisabledStateAHAT(true, true, false);
    nextroundAHAT = true;
    document.getElementById("AHATResults").innerHTML += "<div class='NOfSteps'> <div>Round " + (timerAHAT.intervalsDoneAHAT + 1) + "</div><div>" + timerAHAT.elapsedInIntervalAHAT + " seconds</div></div>";
    timerRefAHAT.value += timerAHAT.elapsedInIntervalAHAT + "|";
    timerAHAT.elapsedInIntervalAHAT = 0;
    timerAHAT.intervalsDoneAHAT++;
}

function stopTimerAHAT() {
    if (elapsedInIntervalBoxAHAT.style.display !== "none") {
        document.getElementById("AHATResults").innerHTML += "<div class='NOfSteps'> <div>Round " + (timerAHAT.intervalsDoneAHAT + 1) + "</div><div>" + timerAHAT.elapsedInIntervalAHAT + " seconds</div></div>";
        timerRefAHAT.value += timerAHAT.elapsedInIntervalAHAT + "|";
    } else { }
    clearInterval(intAHAT);
    [secondsAHAT, minutesAHAT, hoursAHAT] = [0, 0, 0];
    document.getElementById('ahatSettings').disabled = false;
    document.getElementById('ahatSettings').style.color = '#49B79D';
    if (!isSongMuteAHAT) {
        audioPlayerAHAT.pause();
    }
    timerControlsButtonsAHAT.pauseAHAT.style.display = 'none';
    timerControlsButtonsAHAT.startAHAT.style.display = 'inline';
    setFormDisabledStateAHAT(false);
    setTimerControlsDisabledStateAHAT(true, true, true);
    document.getElementById('stopBtnAHAT').style.display = 'none';
    document.getElementById('resetBtnAHAT').style.display = 'inline';
    timerControlsButtonsAHAT.startAHAT.style.color = "rgb(177, 177, 177)";
    timerAHAT.isFinishedAHAT = true;
    isFirstTimeAHAT = false;
    document.getElementById('ahatDate').value = date;
    document.getElementById('ahatSave').disabled = false;
    document.getElementById('ahatSave').style.color = '#49B79D';
    stopTimerTickAHAT();
}

document.getElementById('resetBtnAHAT').addEventListener('click', resetBtnFunctionAHAT);
function resetBtnFunctionAHAT() {
    document.getElementById("AHATResults").innerHTML = "";
    timerRefAHAT.value = "|";
    document.getElementById('resetBtnAHAT').style.display = 'none';
    document.getElementById('stopBtnAHAT').style.display = 'inline';
    timerControlsButtonsAHAT.stopAHAT.style.color = "rgb(177, 177, 177)";
    timerControlsButtonsAHAT.startAHAT.style.color = "#0661AA";
    document.getElementById('ahatSave').disabled = true;
    document.getElementById('ahatSave').style.color = 'rgb(177, 177, 177)';
    setTimerControlsDisabledStateAHAT(false, true, true);
    resetTimerAHAT();
    timerAHAT.isFinishedAHAT = true;
}
function displayTimerAHAT() {
    secondsAHAT++;
    if (secondsAHAT == 60) {
        secondsAHAT = 0;
        minutesAHAT++;
        if (minutesAHAT == 60) {
            minutesAHAT = 0;
            hoursAHAT++;
        }
    }
    let hAHAT = hoursAHAT < 10 ? "0" + hoursAHAT : hoursAHAT;
    let mAHAT = minutesAHAT < 10 ? "0" + minutesAHAT : minutesAHAT;
    let sAHAT = secondsAHAT < 10 ? "0" + secondsAHAT : secondsAHAT;
}

function startTimerTickAHAT() {
    setInterval(onTimerTickAHAT, 1000);
}

function stopTimerTickAHAT() {
    clearInterval();
}

function onTimerTickAHAT() {
    const currentIntervalDurationAHAT = timerAHAT.isBreakAHAT ? timerSettingsAHAT.breakDurationAHAT : timerAHAT.isBreak2AHAT ? timerSettingsAHAT.breakDuration2AHAT : timerAHAT.isBreak4 ? timerSettingsAHAT.breakDuration3 : timerSettingsAHAT.intervalDurationAHAT;
    if (timerAHAT.elapsedInIntervalAHAT <= currentIntervalDurationAHAT && timerAHAT.isBreak0AHAT) {
        timerAHAT.elapsedInIntervalAHAT++;
        if (timerAHAT.elapsedInIntervalAHAT > 10) {
            setTimerControlsDisabledStateAHAT(false, false, false);
        }
        if (nextroundAHAT) {
            if (!ismuteAHAT) {
                audioListAHAT[1].muted = false;
                audioListAHAT[1].play();
            }
            timerControlsButtonsAHAT.pauseAHAT.disabled = true;
            timerAHAT.isBreakAHAT = true;
            timerAHAT.isBreak0AHAT = false;
            timerAHAT.isFinishedAHAT = timerAHAT.intervalsDoneAHAT === timerSettingsAHAT.intervalCountAHAT;
            if (!timerAHAT.isFinishedAHAT) {
                timerAHAT.elapsedInIntervalAHAT = 1;
            }
            if (timerAHAT.isFinishedAHAT) {
                setTimerControlsDisabledStateAHAT(false, true, true);
                setFormDisabledStateAHAT(false);
                stopTimerTickAHAT();
            } else {
                timerAHAT.totalTimeElapsedAHAT++;
            }
            updateInfoAHAT();
            nextroundAHAT = false;
        }
        updateInfoAHAT();
    } else if (timerAHAT.elapsedInIntervalAHAT <= currentIntervalDurationAHAT && timerAHAT.isBreakAHAT) {
        timerAHAT.elapsedInIntervalAHAT++;
        if (timerAHAT.elapsedInIntervalAHAT > currentIntervalDurationAHAT && timerAHAT.isBreakAHAT) {
            if (!ismuteAHAT) {
                audioListAHAT[2].muted = false;
                audioListAHAT[2].play();
            }
            timerAHAT.isBreak2AHAT = true;
            timerAHAT.isBreakAHAT = false;
            timerAHAT.isFinishedAHAT = timerAHAT.intervalsDoneAHAT === timerSettingsAHAT.intervalCountAHAT;
            if (!timerAHAT.isFinishedAHAT) {
                timerAHAT.elapsedInIntervalAHAT = 1;
            }
            if (timerAHAT.isFinishedAHAT) {
                setTimerControlsDisabledStateAHAT(false, false, true);
                setFormDisabledStateAHAT(false);
                stopTimerTickAHAT();
            } else {
                timerAHAT.totalTimeElapsedAHAT++;
            }
            updateInfoAHAT();
        }
        updateInfoAHAT();
    } else if (timerAHAT.elapsedInIntervalAHAT <= currentIntervalDurationAHAT && timerAHAT.isBreak2AHAT) {
        timerAHAT.elapsedInIntervalAHAT++;
        if (timerAHAT.elapsedInIntervalAHAT > currentIntervalDurationAHAT && timerAHAT.isBreak2AHAT) {
            if (!ismuteAHAT) {
                audioListAHAT[0].muted = false;
                audioListAHAT[0].play();
            }
            timerAHAT.isBreak0AHAT = true;
            timerAHAT.isBreak2AHAT = false;
            timerAHAT.isFinishedAHAT = timerAHAT.intervalsDoneAHAT === timerSettingsAHAT.intervalCountAHAT;
            if (!timerAHAT.isFinishedAHAT) {
                timerAHAT.elapsedInIntervalAHAT = 1;
            }
            if (timerAHAT.isFinishedAHAT) {
                setTimerControlsDisabledStateAHAT(false, true, true);
                setFormDisabledStateAHAT(false);
                stopTimerTickAHAT();
            } else {
                timerAHAT.totalTimeElapsedAHAT++;
            }
            updateInfoAHAT();
        }
        updateInfoAHAT();
    }
}

function updateInfoAHAT() {
    statusPanelAHAT.timeOverviewMessageAHAT.style.display = timerAHAT.isFinishedAHAT ? 'block' : null;
    statusPanelAHAT.elapsedInIntervalBoxAHAT.style.display = timerAHAT.isFinishedAHAT || timerAHAT.isBreakAHAT || timerAHAT.isBreak2AHAT || timerAHAT.isBreak4 ? 'none' : null;
    statusPanelAHAT.elapsedInBreakIntervalBoxAHAT.style.display = !timerAHAT.isFinishedAHAT && timerAHAT.isBreakAHAT ? 'block' : null;
    statusPanelAHAT.elapsedInBreakIntervalBox2AHAT.style.display = !timerAHAT.isFinishedAHAT && timerAHAT.isBreak2AHAT ? 'block' : null;
    if (timerAHAT.isBreakAHAT) {
        statusPanelAHAT.elapsedInBreakIntervalAHAT.textContent = timerAHAT.elapsedInIntervalAHAT;
    } else if (timerAHAT.isBreak2AHAT) {
        statusPanelAHAT.elapsedInBreakInterval2AHAT.textContent = timerAHAT.elapsedInIntervalAHAT;
    } else {
        statusPanelAHAT.elapsedInIntervalAHAT.textContent = timerAHAT.elapsedInIntervalAHAT;
    }
    statusPanelAHAT.intervalsDoneAHAT.value = timerAHAT.intervalsDoneAHAT;
}
