/*HATC JS*/
const songSelectHATC = document.getElementById('song-selectHATC');
const audioPlayerHATC = document.getElementById('audio-playerHATC');
var isHATCON = false;
// Variable to store the timeout ID
let timeoutIdHATC;


// Function to play the selected song
const playSelectedSongHATC = () => {
    const selectedSongHATC = songSelectHATC.value;
    audioPlayerHATC.src = selectedSongHATC;
    if (isHATCON !== true) {
        audioPlayerHATC.muted = false;
        audioPlayerHATC.play();
        localStorage.setItem('selectedSongHATC', songSelectHATC.value);
        // Clear any existing timeout
        clearTimeout(timeoutIdHATC);
        timeoutIdHATC = setTimeout(function () {
            audioPlayerHATC.pause();
            audioPlayerHATC.currentTime = 0;
        }, 15000);
    } else {
        audioPlayerHATC.muted = false;
        audioPlayerHATC.loop = true;
        audioPlayerHATC.play();
        clearTimeout(timeoutIdHATC);
    }
};


const storedSongHATC = localStorage.getItem('selectedSongHATC');
if (storedSongHATC) {
    // Set the value of the songSelect dropdown to the stored song
    songSelectHATC.value = storedSongHATC;
}

// Add an event listener to the songSelectHATC dropdown
songSelectHATC.addEventListener('change', function () {
    // Stop the currently playing song
    audioPlayerHATC.pause();
    audioPlayerHATC.currentTime = 0;

    // Play the selected song
    playSelectedSongHATC();
});

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
        if (!isSongMuteHATC) {
            audioPlayerHATC.pause();
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

var audioListHATC = []
audioListHATC.push(new Audio('../sounds/pinchnose.mp3'));
audioListHATC.push(new Audio('../sounds/lightbreath.mp3'));
audioListHATC.push(new Audio('../sounds/normalbreath.mp3'));
audioListHATC.push(new Audio('../sounds/hold.mp3'));

var audioHATC = document.getElementById("audioHATC"),
    muteHATC = document.getElementById("muteHATC"),
    ismuteHATC = false;

audioPlayerHATC.loop = true;

var audioSongHATC = document.getElementById("songHATC"),
    muteSongHATC = document.getElementById("songMuteHATC"),
    isSongMuteHATC = false;

// Get the volumeVhatc bar element
const volumeVoiceHATC = document.getElementById('volumeVoiceHATC');

// Add an event listener for the volumeVhatc change event
volumeVoiceHATC.addEventListener('input', function () {
    // Get the current volumeVhatc value
    const volumeVhatc = parseFloat(volumeVoiceHATC.value);

    // Check if volumeVhatc is 0 and mute the media if necessary
    if (volumeVhatc === 0) {
        audioListHATC[0].muted = true;
        audioListHATC[1].muted = true;
        audioListHATC[2].muted = true;
        audioListHATC[3].muted = true;
        audioHATC.style.display = "none";
        muteHATC.style.display = "block";
        ismuteHATC = true;
    } else {
        audioListHATC[0].muted = false;
        audioListHATC[1].muted = false;
        audioListHATC[2].muted = false;
        audioListHATC[3].muted = false;
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
        audioPlayerHATC.muted = true;
        audioSongHATC.style.display = "none";
        muteSongHATC.style.display = "block";
        isSongMuteHATC = true;
    } else {
        audioPlayerHATC.muted = false;
        muteSongHATC.style.display = "none";
        audioSongHATC.style.display = "block";
        isSongMuteHATC = false;
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

var minusBtnHATC = document.getElementById("minusHATC").style.display = 'none',
    plusBtnHATC = document.getElementById("plusHATC").style.display = 'none',
    numberHATC = 4, /// numberHATC value
    minHATC = 2, /// minHATC numberHATC
    maxHATC = 30;
minusBtnHATC.onclick = function () {
    if (numberHATC > minHATC) {
        numberHATC = numberHATC - 1; /// Minus 1 of the numberHATC
        formSettingsFieldsHATC.intervalDurationHATC.value = numberHATC; /// Display the value in place of the numberHATC
        //fix here to change pranayama type
        formSettingsFieldsHATC.breakDurationHATC.value = formSettingsFieldsHATC.intervalDurationHATC.value;
        formSettingsFieldsHATC.breakDuration2HATC.value = formSettingsFieldsHATC.intervalDurationHATC.value;
        formSettingsFieldsHATC.breakDuration3.value = formSettingsFieldsHATC.intervalDurationHATC.value;
        setTimerSettingsHATC(9999, formSettingsFieldsHATC.intervalDurationHATC.value, true, formSettingsFieldsHATC.breakDurationHATC.value, true, formSettingsFieldsHATC.breakDuration2HATC.value, true, formSettingsFieldsHATC.breakDuration3.value);
    }
}

plusBtnHATC.onclick = function () {
    if (numberHATC < maxHATC) {
        numberHATC = numberHATC + 1;
        formSettingsFieldsHATC.intervalDurationHATC.value = numberHATC; /// Display the value in place of the numberHATC
        //fix here to change pranayama type
        formSettingsFieldsHATC.breakDurationHATC.value = formSettingsFieldsHATC.intervalDurationHATC.value;
        formSettingsFieldsHATC.breakDuration2HATC.value = formSettingsFieldsHATC.intervalDurationHATC.value;
        setTimerSettingsHATC(9999, formSettingsFieldsHATC.intervalDurationHATC.value, true, formSettingsFieldsHATC.breakDurationHATC.value, true, formSettingsFieldsHATC.breakDuration2HATC.value);
    }
}

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
    minusBtnHATC.disabled = disabled;
    plusBtnHATC.disabled = disabled;
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
        audioListHATC[1].muted = true;
        audioListHATC[2].muted = true;
        audioListHATC[3].muted = true;
        audioListHATC[1].play();
        audioListHATC[2].play();
        audioListHATC[3].play();
        setTimeout(function () {
            audioListHATC[1].pause();
            audioListHATC[1].currentTime = 0
            audioListHATC[2].pause();
            audioListHATC[2].currentTime = 0
            audioListHATC[3].pause();
            audioListHATC[3].currentTime = 0
        }, 1000);
        if (!ismuteHATC) {
            audioListHATC[0].play();
        }
    }
    isHATCON = true;
    if (!isSongMuteHATC) {
        playSelectedSongHATC();
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
    document.getElementById("HATCResults").innerHTML += "<div class='NOfSteps'> <div>Round " + (timerHATC.intervalsDoneHATC + 1) + "</div><div>" + timerHATC.elapsedInIntervalHATC + " seconds</div></div>";
    timerRefHATC.value += timerHATC.elapsedInIntervalHATC + "|";
    timerHATC.elapsedInIntervalHATC = 0;
    timerHATC.intervalsDoneHATC++;
}

function stopTimerHATC() {
    if (elapsedInIntervalBoxHATC.style.display !== "none") {
        document.getElementById("HATCResults").innerHTML += "<div class='NOfSteps'> <div>Round " + (timerHATC.intervalsDoneHATC + 1) + "</div><div>" + timerHATC.elapsedInIntervalHATC + " seconds</div></div>";
        timerRefHATC.value += timerHATC.elapsedInIntervalHATC + "|";
    } else { }
    clearInterval(intHATC);
    [secondsHATC, minutesHATC, hoursHATC] = [0, 0, 0];
    document.getElementById('hatcSettings').disabled = false;
    document.getElementById('hatcSettings').style.color = '#49B79D';
    if (!isSongMuteHATC) {
        audioPlayerHATC.pause();
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
                audioListHATC[2].muted = false;
                audioListHATC[2].play();
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
                audioListHATC[0].muted = false;
                audioListHATC[0].play();
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
