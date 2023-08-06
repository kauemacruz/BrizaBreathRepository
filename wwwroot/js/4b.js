/*B4 JS*/
const songSelectB4 = document.getElementById('song-selectB4');
const audioPlayerB4 = document.getElementById('audio-playerB4');
var isB4ON = false;
// Variable to store the timeout ID
let timeoutIdB4;


// Function to play the selected song
const playSelectedSongB4 = () => {
    const selectedSongB4 = songSelectB4.value;
    audioPlayerB4.src = selectedSongB4;
    if (isB4ON !== true) {
        audioPlayerB4.muted = false;
        audioPlayerB4.play();
        localStorage.setItem('selectedSongB4', songSelectB4.value);
        // Clear any existing timeout
        clearTimeout(timeoutIdB4);
        timeoutIdB4 = setTimeout(function () {
            audioPlayerB4.pause();
            audioPlayerB4.currentTime = 0;
        }, 15000);
    } else {
        audioPlayerB4.muted = false;
        audioPlayerB4.loop = true;
        audioPlayerB4.play();
        clearTimeout(timeoutIdB4);
    }
};


const storedSongB4 = localStorage.getItem('selectedSongB4');
if (storedSongB4) {
    // Set the value of the songSelect dropdown to the stored song
    songSelectB4.value = storedSongB4;
}

// Add an event listener to the songSelectB4 dropdown
songSelectB4.addEventListener('change', function () {
    // Stop the currently playing song
    audioPlayerB4.pause();
    audioPlayerB4.currentTime = 0;

    // Play the selected song
    playSelectedSongB4();
});

$(function () {
    $('#B4Form').on('submit', function (e) {
        e.preventDefault(); // Prevent the default form submission

        var formData = new FormData(this); // Get the form data

        $.ajax({
            url: "/",
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function (result) {
                $('#B4ResultSaved').html(result); // Update the result section with the server response
            }
        });
        clearInterval(intB4);
        [secondsB4, minutesB4, hoursB4] = [0, 0, 0];
        timerRefB4.value = '00 : 00 : 00';
        audioPlayerB4.currentTime = 0
        timerControlsButtonsB4.pauseB4.style.display = 'none';
        timerControlsButtonsB4.startB4.style.display = 'inline';
        setFormDisabledStateB4(false);
        setTimerControlsDisabledStateB4(false, true, true);
        timerControlsButtonsB4.stopB4.style.color = "rgb(177, 177, 177)";
        document.getElementById('B4Save').disabled = true;
        document.getElementById('B4Save').style.color = 'rgb(177, 177, 177)';
        stopTimerTickB4();
        resetTimerB4();
        isB4ON = false;
    });
});

let
    formSettingsFieldsB4,
    timerControlsButtonsB4,
    statusPanelB4,
    timerB4,
    timerSettingsB4;

function setTimerSettingsB4(
    intervalCountB4 = timerSettingsB4.intervalCountB4,
    intervalDurationB4 = timerSettingsB4.intervalDurationB4,
    enableBreakB4 = timerSettingsB4.enableBreakB4,
    breakDurationB4 = timerSettingsB4.breakDurationB4,
    enableBreak2B4 = timerSettingsB4.enableBreak2B4,
    breakDuration2B4 = timerSettingsB4.breakDuration2B4,
    enableBreak3B4 = timerSettingsB4.enableBreak3B4,
    breakDuration3B4 = timerSettingsB4.breakDuration3B4
) {
    timerSettingsB4 = {
        intervalCountB4,
        intervalDurationB4,
        enableBreakB4,
        breakDurationB4,
        enableBreak2B4,
        breakDuration2B4,
        enableBreak3B4,
        breakDuration3B4
    };
}

function resetTimerB4() {
    timerB4 = {
        totalTimeElapsedB4: 0,
        elapsedInIntervalB4: 0,
        intervalsDoneB4: 0,
        isBreak3B4: true,
        isBreakB4: false,
        isBreak2B4: false,
        isBreak4B4: false,
        isFinishedB4: false
    };
    updateInfoB4();
}

let [secondsB4, minutesB4, hoursB4] = [0, 0, 0];
let timerRefB4 = document.getElementById('timerDisplayB4');
let intB4 = null;
document.getElementById('stopBtnB4').disabled = true;
document.getElementById('stopBtnB4').style.color = 'rgb(177, 177, 177)';
document.getElementById('B4Save').disabled = true;
document.getElementById('B4Save').style.color = 'rgb(177, 177, 177)';

var audioListB4 = []
audioListB4.push(new Audio('/sounds/breathein.mp3'))
audioListB4.push(new Audio('/sounds/holdyourbreath.mp3'));
audioListB4.push(new Audio('/sounds/exhale.mp3'));
audioListB4.push(new Audio('/sounds/hold.mp3'));


var audioB4 = document.getElementById("audioB4"),
    muteB4 = document.getElementById("muteB4"),
    ismuteB4 = false;

audioPlayerB4.loop = true;

var audioSongB4 = document.getElementById("songB4"),
    muteSongB4 = document.getElementById("songMuteB4"),
    isSongMuteB4 = false;

// Get the volumeVB4 bar element
const volumeVoiceB4 = document.getElementById('volumeVoiceB4');

// Add an event listener for the volumeVB4 change event
volumeVoiceB4.addEventListener('input', function () {
    // Get the current volumeVB4 value
    const volumeVB4 = parseFloat(volumeVoiceB4.value);

    // Check if volumeVB4 is 0 and mute the media if necessary
    if (volumeVB4 === 0) {
        audioListB4[0].muted = true;
        audioListB4[1].muted = true;
        audioListB4[2].muted = true;
        audioListB4[3].muted = true;
        audioB4.style.display = "none";
        muteB4.style.display = "block";
        ismuteB4 = true;
    } else {
        audioListB4[0].muted = false;
        audioListB4[1].muted = false;
        audioListB4[2].muted = false;
        audioListB4[3].muted = false;
        muteB4.style.display = "none";
        audioB4.style.display = "block";
        ismuteB4 = false;
    }
});
// Get the volumeSB4 bar element
const volumeSongB4 = document.getElementById('volumeSongB4');

// Add an event listener for the volumeSB4 change event
volumeSongB4.addEventListener('input', function () {
    // Get the current volumeSB4 value
    const volumeSB4 = parseFloat(volumeSongB4.value);

    // Check if volumeSB4 is 0 and mute the media if necessary
    if (volumeSB4 === 0) {
        audioPlayerB4.muted = true;
        audioSongB4.style.display = "none";
        muteSongB4.style.display = "block";
        isSongMuteB4 = true;
    } else {
        audioPlayerB4.muted = false;
        muteSongB4.style.display = "none";
        audioSongB4.style.display = "block";
        isSongMuteB4 = false;
    }
});


var inhaleB4 = 4;
var holdB4 = inhaleB4;
var exhaleB4 = inhaleB4;
var hold2B4 = inhaleB4;
setTimerSettingsB4(9999, inhaleB4, true, holdB4, true, exhaleB4, true, hold2B4);
initializeTimerControlsB4();
initializeStatusPanelB4();
initializeTimerSettingsFormB4();
resetTimerB4();


var minusBtnB4 = document.getElementById("minusB4"),
    plusBtnB4 = document.getElementById("plusB4"),
    numberB4 = 3, /// numberB4 value
    minB4 = 3, /// minB4 numberB4
    maxB4 = 60;

minusBtnB4.onclick = function () {
    if (numberB4 > minB4) {
        numberB4 = numberB4 - 1; /// Minus 1 of the numberB4
        formSettingsFieldsB4.intervalDurationB4.value = numberB4; /// Display the value in place of the numberB4
        //fix here to change pranayama type
        formSettingsFieldsB4.breakDurationB4.value = formSettingsFieldsB4.intervalDurationB4.value;
        formSettingsFieldsB4.breakDuration2B4.value = formSettingsFieldsB4.intervalDurationB4.value;
        formSettingsFieldsB4.breakDuration3B4.value = formSettingsFieldsB4.intervalDurationB4.value;
        setTimerSettingsB4(9999, formSettingsFieldsB4.intervalDurationB4.value, true, formSettingsFieldsB4.breakDurationB4.value, true, formSettingsFieldsB4.breakDuration2B4.value, true, formSettingsFieldsB4.breakDuration3B4.value);
    }
}

plusBtnB4.onclick = function () {
    if (numberB4 < maxB4) {
        numberB4 = numberB4 + 1;
        formSettingsFieldsB4.intervalDurationB4.value = numberB4; /// Display the value in place of the numberB4
        //fix here to change pranayama type
        formSettingsFieldsB4.breakDurationB4.value = formSettingsFieldsB4.intervalDurationB4.value;
        formSettingsFieldsB4.breakDuration2B4.value = formSettingsFieldsB4.intervalDurationB4.value;
        formSettingsFieldsB4.breakDuration3B4.value = formSettingsFieldsB4.intervalDurationB4.value;
        setTimerSettingsB4(9999, formSettingsFieldsB4.intervalDurationB4.value, true, formSettingsFieldsB4.breakDurationB4.value, true, formSettingsFieldsB4.breakDuration2B4.value, true, formSettingsFieldsB4.breakDuration3B4.value);

    }
}

function initializeTimerSettingsFormB4() {
    const oneDayInSecondsBRE = 60 * 60 * 24;
    let lastUserSetEnableBreakB4 = timerSettingsB4.enableBreakB4;
    let lastUserSetEnableBreak2B4 = timerSettingsB4.enableBreak2B4;
    let lastUserSetEnableBreak3B4 = timerSettingsB4.enableBreak3B4;

    formSettingsFieldsB4 = {
        intervalCountB4: document.getElementById('intervalCountInputB4'),
        intervalDurationB4: document.getElementById('intervalDurationInputB4'),
        enableBreakB4: document.getElementById('enableBreakInputB4'),
        breakDurationB4: document.getElementById('breakDurationInputB4'),
        enableBreak2B4: document.getElementById('enableBreakInput2B4'),
        breakDuration2B4: document.getElementById('breakDurationInput2B4'),
        enableBreak3B4: document.getElementById('enableBreakInput3B4'),
        breakDuration3B4: document.getElementById('breakDurationInput3B4'),
    };

    formSettingsFieldsB4.intervalCountB4.value = timerSettingsB4.intervalCountB4;
    formSettingsFieldsB4.intervalDurationB4.value = timerSettingsB4.intervalDurationB4;
    formSettingsFieldsB4.enableBreakB4.checked = timerSettingsB4.enableBreakB4;
    formSettingsFieldsB4.breakDurationB4.value = timerSettingsB4.breakDurationB4;
    formSettingsFieldsB4.enableBreak2B4.checked = timerSettingsB4.enableBreak2B4;
    formSettingsFieldsB4.breakDuration2B4.value = timerSettingsB4.breakDuration2B4;
    formSettingsFieldsB4.enableBreak3B4.checked = timerSettingsB4.enableBreak3B4;
    formSettingsFieldsB4.breakDuration3B4.value = timerSettingsB4.breakDuration3B4;

    function getNumberInBoundsOrDefaultB4(value, minB4, maxB4, def = 1) {
        const valueAsNumberB4 = parseInt(value);
        return isNaN(valueAsNumberB4) ? def : Math.max(minB4, Math.min(valueAsNumberB4, maxB4));
    }

    function setBreakDurationLineDisplayB4(displayed) {
        const breakDurationInputLineEltB4 = document.getElementById('breakDurationInputLineB4');
        breakDurationInputLineEltB4.style.display = displayed ? null : 'none';
        const breakDurationInputLineElt2B4 = document.getElementById('breakDurationInputLine2B4');
        breakDurationInputLineElt2B4.style.display = displayed ? null : 'none';
        const breakDurationInputLineElt3B4 = document.getElementById('breakDurationInputLine3B4');
        breakDurationInputLineElt3B4.style.display = displayed ? null : 'none';
    }

    formSettingsFieldsB4.intervalCountB4.addEventListener('input', () => {
        const intervalCountB4 = getNumberInBoundsOrDefaultB4(formSettingsFieldsB4.intervalCountB4.value, 1, 9999),
            hasOneIntervalB4 = intervalCountB4 === 1,
            hasBreakB4 = hasOneIntervalB4 ? false : lastUserSetEnableBreakB4;

        formSettingsFieldsB4.enableBreakB4.disabled = hasOneIntervalB4 === true;
        formSettingsFieldsB4.enableBreakB4.checked = hasBreakB4;

        setBreakDurationLineDisplayB4(hasBreakB4);

        setTimerSettingsB4(intervalCountB4, undefined, hasBreakB4);
        updateInfoB4();
    });

    formSettingsFieldsB4.intervalDurationB4.addEventListener('input', () => {
        setTimerSettingsB4(undefined, getNumberInBoundsOrDefaultB4(formSettingsFieldsB4.intervalDurationB4.value, 1, oneDayInSecondsBRE));
        updateInfoB4();
    });

    formSettingsFieldsB4.enableBreakB4.addEventListener('change', () => {
        const enableBreakB4 = formSettingsFieldsB4.enableBreakB4.checked;

        lastUserSetEnableBreakB4 = enableBreakB4;
        setBreakDurationLineDisplayB4(enableBreakB4);
        setTimerSettingsB4(undefined, undefined, enableBreakB4);
        updateInfoB4();
    });

    formSettingsFieldsB4.breakDurationB4.addEventListener('input', () => {
        setTimerSettingsB4(undefined, undefined, undefined,
            getNumberInBoundsOrDefaultB4(formSettingsFieldsB4.breakDurationB4.value, 1, oneDayInSecondsBRE)
        );
        updateInfoB4();
    });

    formSettingsFieldsB4.enableBreak2B4.addEventListener('change', () => {
        const enableBreak2B4 = formSettingsFieldsB4.enableBreak2B4.checked;

        lastUserSetEnableBreak2B4 = enableBreak2B4;
        setBreakDurationLineDisplayB4(enableBreak2B4);
        setTimerSettingsB4(undefined, undefined, undefined, undefined, enableBreak2B4);
        updateInfoB4();
    });

    formSettingsFieldsB4.breakDuration2B4.addEventListener('input', () => {
        setTimerSettingsB4(undefined, undefined, undefined, undefined, undefined,
            getNumberInBoundsOrDefaultB4(formSettingsFieldsB4.breakDuration2B4.value, 1, oneDayInSecondsBRE)
        );
        updateInfoB4();
    });

    formSettingsFieldsB4.enableBreak3B4.addEventListener('change', () => {
        const enableBreak3B4 = formSettingsFieldsB4.enableBreak3B4.checked;

        lastUserSetEnableBreak3B4 = enableBreak2B4;
        setBreakDurationLineDisplayB4(enableBreak3B4);
        setTimerSettingsB4(undefined, undefined, undefined, undefined, undefined, undefined, enableBreak3B4);
        updateInfoB4();
    });

    formSettingsFieldsB4.breakDuration3B4.addEventListener('input', () => {
        setTimerSettingsB4(
            undefined, undefined, undefined, undefined, undefined, undefined, undefined,
            getNumberInBoundsOrDefaultB4(formSettingsFieldsB4.breakDuration3B4.value, 1, oneDayInSecondsBRE)
        );
        updateInfoB4();
    });
}

function initializeTimerControlsB4() {
    timerControlsButtonsB4 = {
        startB4: document.getElementById('startBtnB4'),
        pauseB4: document.getElementById('pauseBtnB4'),
        stopB4: document.getElementById('stopBtnB4'),
    };

    setTimerControlsDisabledStateB4(false, true, true);

    timerControlsButtonsB4.startB4.addEventListener('click', startTimerB4);
    timerControlsButtonsB4.pauseB4.addEventListener('click', pauseTimerB4);
    timerControlsButtonsB4.stopB4.addEventListener('click', stopTimerB4);
}

function initializeStatusPanelB4() {
    statusPanelB4 = {
        timeOverviewMessageB4: document.getElementById('timeOverviewMessageB4'),

        elapsedInIntervalBoxB4: document.getElementById('elapsedInIntervalBoxB4'),
        elapsedInBreakIntervalBoxB4: document.getElementById('elapsedInBreakIntervalBoxB4'),
        elapsedInIntervalB4: document.getElementById('elapsedInIntervalB4'),
        elapsedInBreakIntervalB4: document.getElementById('elapsedInBreakIntervalB4'),
        elapsedInBreakIntervalBox2B4: document.getElementById('elapsedInBreakIntervalBox2B4'),
        elapsedInBreakInterval2B4: document.getElementById('elapsedInBreakInterval2B4'),
        elapsedInBreakIntervalBox3B4: document.getElementById('elapsedInBreakIntervalBox3B4'),
        elapsedInBreakInterval3B4: document.getElementById('elapsedInBreakInterval3B4'),

        intervalsDoneB4: document.getElementById('intervalsDoneB4'),
    };
}

function setTimerControlsDisabledStateB4(startB4, pauseB4, stopB4) {
    timerControlsButtonsB4.startB4.disabled = startB4;
    timerControlsButtonsB4.pauseB4.disabled = pauseB4;
    timerControlsButtonsB4.stopB4.disabled = stopB4;
}

function setFormDisabledStateB4(disabled) {
    formSettingsFieldsB4.intervalCountB4.disabled = disabled;
    formSettingsFieldsB4.intervalDurationB4.disabled = disabled;
    formSettingsFieldsB4.enableBreakB4.disabled = disabled || timerSettingsB4.intervalCountB4 === 1;
    formSettingsFieldsB4.breakDurationB4.disabled = disabled;
    formSettingsFieldsB4.enableBreak2B4.disabled = disabled
    formSettingsFieldsB4.breakDuration2B4.disabled = disabled;
    formSettingsFieldsB4.enableBreak3B4.disabled = disabled
    formSettingsFieldsB4.breakDuration3B4.disabled = disabled;
    minusBtnB4.disabled = disabled;
    plusBtnB4.disabled = disabled;
}

function startTimerB4() {
    if (intB4 !== null) {
        clearInterval(intB4);
    }
    intB4 = setInterval(displayTimerB4, 1000);
    setFormDisabledStateB4(true);
    setTimerControlsDisabledStateB4(true, false, true);
    timerControlsButtonsB4.stopB4.style.color = "rgb(177, 177, 177)";
    if (timerB4.isBreak3B4) {
        if (!ismuteB4) {
            audioListB4[0].muted = false;
            audioListB4[0].play();
        }
    }
    isB4ON = true;
    if (!isSongMuteB4) {
        playSelectedSongB4();
    }
    if (timerB4.isFinishedB4) {
        resetTimerB4();
    }
    startTimerTickB4();
    timerControlsButtonsB4.startB4.style.display = 'none';
    timerControlsButtonsB4.pauseB4.style.display = 'inline';
    document.getElementById('B4Settings').disabled = true;
    document.getElementById('B4Settings').style.color = 'rgb(177, 177, 177)';
    document.getElementById('B4Save').disabled = true;
    document.getElementById('B4Save').style.color = 'rgb(177, 177, 177)';
}

function pauseTimerB4() {
    clearInterval(intB4);
    setTimerControlsDisabledStateB4(false, true, false);
    document.getElementById('stopBtnB4').style.color = '#990000';
    timerControlsButtonsB4.pauseB4.style.display = 'none';
    timerControlsButtonsB4.startB4.style.display = 'inline';
    document.getElementById('B4Settings').disabled = false;
    document.getElementById('B4Settings').style.color = '#49B79D';
    if (!isSongMuteB4) {
        audioPlayerB4.pause();
    }
    stopTimerTickB4();
    isB4ON = false;
    document.getElementById('B4Date').value = date;
    document.getElementById('B4Save').disabled = false;
    document.getElementById('B4Save').style.color = '#49B79D';
}

function stopTimerB4() {
    clearInterval(intB4);
    [secondsB4, minutesB4, hoursB4] = [0, 0, 0];
    timerRefB4.value = '00 : 00 : 00';
    audioPlayerB4.currentTime = 0
    timerControlsButtonsB4.pauseB4.style.display = 'none';
    timerControlsButtonsB4.startB4.style.display = 'inline';
    setFormDisabledStateB4(false);
    setTimerControlsDisabledStateB4(false, true, true);
    timerControlsButtonsB4.stopB4.style.color = "rgb(177, 177, 177)";
    document.getElementById('B4Save').disabled = true;
    document.getElementById('B4Save').style.color = 'rgb(177, 177, 177)';
    stopTimerTickB4();
    resetTimerB4();
    isB4ON = false;
}

function displayTimerB4() {
    secondsB4++;
    if (secondsB4 == 60) {
        secondsB4 = 0;
        minutesB4++;
        if (minutesB4 == 60) {
            minutesB4 = 0;
            hoursB4++;
        }
    }
    let hB4 = hoursB4 < 10 ? "0" + hoursB4 : hoursB4;
    let mB4 = minutesB4 < 10 ? "0" + minutesB4 : minutesB4;
    let sB4 = secondsB4 < 10 ? "0" + secondsB4 : secondsB4;
    timerRefB4.value = `${hB4} : ${mB4} : ${sB4}`;
}

function startTimerTickB4() {
    timerB4.intervalId = setInterval(onTimerTickB4, 1000);
}

function stopTimerTickB4() {
    clearInterval(timerB4.intervalId);
}

function onTimerTickB4() {
    const currentIntervalDurationB4 = timerB4.isBreakB4 ? timerSettingsB4.breakDurationB4 : timerB4.isBreak2B4 ? timerSettingsB4.breakDuration2B4 : timerB4.isBreak4B4 ? timerSettingsB4.breakDuration3B4 : timerSettingsB4.intervalDurationB4;
    if (timerB4.elapsedInIntervalB4 <= currentIntervalDurationB4 && timerB4.isBreak3B4) {
        timerB4.elapsedInIntervalB4++;
        if (timerB4.elapsedInIntervalB4 > currentIntervalDurationB4 && timerB4.isBreak3B4) {
            if (!ismuteB4) {
                audioListB4[3].muted = false;
                audioListB4[3].play();
            }
            timerB4.isBreakB4 = true;
            timerB4.isBreak3B4 = false;
            timerB4.isFinishedB4 = timerB4.intervalsDoneB4 === timerSettingsB4.intervalCountB4;
            if (!timerB4.isFinishedB4) {
                timerB4.elapsedInIntervalB4 = 1;
            }
            if (timerB4.isFinishedB4) {
                setTimerControlsDisabledStateB4(false, true, true);
                setFormDisabledStateB4(false);
                stopTimerTickB4();
            } else {
                timerB4.totalTimeElapsedB4++;
            }
            updateInfoB4();
        }
        updateInfoB4();
    } else if (timerB4.elapsedInIntervalB4 <= currentIntervalDurationB4 && timerB4.isBreakB4) {
        timerB4.elapsedInIntervalB4++;
        if (timerB4.elapsedInIntervalB4 > currentIntervalDurationB4 && timerB4.isBreakB4) {
            if (!ismuteB4) {
                audioListB4[2].muted = false;
                audioListB4[2].play();
            }
            timerB4.isBreak2B4 = true;
            timerB4.isBreakB4 = false;
            timerB4.isFinishedB4 = timerB4.intervalsDoneB4 === timerSettingsB4.intervalCountB4;
            if (!timerB4.isFinishedB4) {
                timerB4.elapsedInIntervalB4 = 1;
            }
            if (timerB4.isFinishedB4) {
                setTimerControlsDisabledStateB4(false, true, true);
                setFormDisabledStateB4(false);
                stopTimerTickB4();
            } else {
                timerB4.totalTimeElapsedB4++;
            }
            updateInfoB4();
        }
        updateInfoB4();
    } else if (timerB4.elapsedInIntervalB4 <= currentIntervalDurationB4 && timerB4.isBreak2B4) {
        timerB4.elapsedInIntervalB4++;
        if (timerB4.elapsedInIntervalB4 > currentIntervalDurationB4 && timerB4.isBreak2B4) {
            if (!ismuteB4) {
                audioListB4[3].muted = false;
                audioListB4[3].play();
            }
            timerB4.isBreak4B4 = true;
            timerB4.isBreak2B4 = false;
            timerB4.isFinishedB4 = timerB4.intervalsDoneB4 === timerSettingsB4.intervalCountB4;
            if (!timerB4.isFinishedB4) {
                timerB4.elapsedInIntervalB4 = 1;
            }
            if (timerB4.isFinishedB4) {
                setTimerControlsDisabledStateB4(false, true, true);
                setFormDisabledStateB4(false);
                stopTimerTickB4();
            } else {
                timerB4.totalTimeElapsedB4++;
            }
            updateInfoB4();
        }
        updateInfoB4();
    } else if (timerB4.elapsedInIntervalB4 <= currentIntervalDurationB4 && timerB4.isBreak4B4) {
        timerB4.elapsedInIntervalB4++;
        if (timerB4.elapsedInIntervalB4 > currentIntervalDurationB4 && timerB4.isBreak4B4) {
            if (!ismuteB4) {
                audioListB4[0].muted = false;
                audioListB4[0].play();
            }
            timerB4.isBreak3B4 = true;
            timerB4.isBreak4B4 = false;
            timerB4.intervalsDoneB4++;
            timerB4.isFinishedB4 = timerB4.intervalsDoneB4 === timerSettingsB4.intervalCountB4;
            if (!timerB4.isFinishedB4) {
                timerB4.elapsedInIntervalB4 = 1;
            }
            if (timerB4.isFinishedB4) {
                setTimerControlsDisabledStateB4(false, true, true);
                setFormDisabledStateB4(false);
                stopTimerTickB4();
            } else {
                timerB4.totalTimeElapsedB4++;
            }
            updateInfoB4();
        }
        updateInfoB4();
    }
}

function updateInfoB4() {
    statusPanelB4.timeOverviewMessageB4.style.display = timerB4.isFinishedB4 ? 'block' : null;
    statusPanelB4.elapsedInIntervalBoxB4.style.display = timerB4.isFinishedB4 || timerB4.isBreakB4 || timerB4.isBreak2B4 || timerB4.isBreak4B4 ? 'none' : null;
    statusPanelB4.elapsedInBreakIntervalBoxB4.style.display = !timerB4.isFinishedB4 && timerB4.isBreakB4 ? 'block' : null;
    statusPanelB4.elapsedInBreakIntervalBox2B4.style.display = !timerB4.isFinishedB4 && timerB4.isBreak2B4 ? 'block' : null;
    statusPanelB4.elapsedInBreakIntervalBox3B4.style.display = !timerB4.isFinishedB4 && timerB4.isBreak4B4 ? 'block' : null;

    if (timerB4.isBreakB4) {
        statusPanelB4.elapsedInBreakIntervalB4.textContent = timerB4.elapsedInIntervalB4;
    } else if (timerB4.isBreak2B4) {
        statusPanelB4.elapsedInBreakInterval2B4.textContent = timerB4.elapsedInIntervalB4;
    } else if (timerB4.isBreak4B4) {
        statusPanelB4.elapsedInBreakInterval3B4.textContent = timerB4.elapsedInIntervalB4;
    } else {
        statusPanelB4.elapsedInIntervalB4.textContent = timerB4.elapsedInIntervalB4;
    }
    statusPanelB4.intervalsDoneB4.value = timerB4.intervalsDoneB4;
}
//---------------------------------------------------//
