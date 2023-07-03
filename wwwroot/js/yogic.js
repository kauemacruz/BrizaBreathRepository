/*YOGIC JS*/
const songSelectYogic = document.getElementById('song-selectYogic');
const audioPlayerYogic = document.getElementById('audio-playerYogic');
var isYogicON = false;
// Variable to store the timeout ID
let timeoutIdYogic;


// Function to play the selected song
const playSelectedSongYogic = () => {
    const selectedSongYogic = songSelectYogic.value;
    audioPlayerYogic.src = selectedSongYogic;
    if (isYogicON !== true) {
        audioPlayerYogic.muted = false;
        audioPlayerYogic.play();
        localStorage.setItem('selectedSongYogic', songSelectYogic.value);
        // Clear any existing timeout
        clearTimeout(timeoutIdYogic);
        timeoutIdYogic = setTimeout(function () {
            audioPlayerYogic.pause();
            audioPlayerYogic.currentTime = 0;
        }, 15000);
    } else {
        audioPlayerYogic.muted = false;
        audioPlayerYogic.loop = true;
        audioPlayerYogic.play();
        clearTimeout(timeoutIdYogic);
    }
};


const storedSongYogic = localStorage.getItem('selectedSongYogic');
if (storedSongYogic) {
    // Set the value of the songSelect dropdown to the stored song
    songSelectYogic.value = storedSongYogic;
}

// Add an event listener to the songSelectYogic dropdown
songSelectYogic.addEventListener('change', function () {
    // Stop the currently playing song
    audioPlayerYogic.pause();
    audioPlayerYogic.currentTime = 0;

    // Play the selected song
    playSelectedSongYogic();
});

$(function () {
    $('#yogicForm').on('submit', function (e) {
        e.preventDefault(); // Prevent the default form submission

        var formData = new FormData(this); // Get the form data

        $.ajax({
            url: "/",
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function (result) {
                $('#yogicResultSaved').html(result); // Update the result section with the server response
            }
        });
        clearInterval(intYogic);
        [secondsYogic, minutesYogic, hoursYogic] = [0, 0, 0];
        timerRefYogic.value = '00 : 00 : 00';
        audioPlayerYogic.currentTime = 0
        timerControlsButtonsYogic.pauseYogic.style.display = 'none';
        timerControlsButtonsYogic.startYogic.style.display = 'inline';
        setFormDisabledStateYogic(false);
        setTimerControlsDisabledStateYogic(false, true, true);
        timerControlsButtonsYogic.stopYogic.style.color = "rgb(177, 177, 177)";
        document.getElementById('yogicSave').disabled = true;
        document.getElementById('yogicSave').style.color = 'rgb(177, 177, 177)';
        stopTimerTickYogic();
        resetTimerYogic();
        isYogicON = false;
    });
});

let
    formSettingsFieldsYogic,
    timerControlsButtonsYogic,
    statusPanelYogic,
    timerYogic,
    timerSettingsYogic;

function setTimerSettingsYogic(
    intervalCountYogic = timerSettingsYogic.intervalCountYogic,
    intervalDurationYogic = timerSettingsYogic.intervalDurationYogic,
    enableBreakYogic = timerSettingsYogic.enableBreakYogic,
    breakDurationYogic = timerSettingsYogic.breakDurationYogic,
    enableBreak2Yogic = timerSettingsYogic.enableBreak2Yogic,
    breakDuration2Yogic = timerSettingsYogic.breakDuration2Yogic,
    enableBreak3Yogic = timerSettingsYogic.enableBreak3Yogic,
    breakDuration3Yogic = timerSettingsYogic.breakDuration3Yogic
) {
    timerSettingsYogic = {
        intervalCountYogic,
        intervalDurationYogic,
        enableBreakYogic,
        breakDurationYogic,
        enableBreak2Yogic,
        breakDuration2Yogic,
        enableBreak3Yogic,
        breakDuration3Yogic
    };
}

function resetTimerYogic() {
    timerYogic = {
        totalTimeElapsedYogic: 0,
        elapsedInIntervalYogic: 0,
        intervalsDoneYogic: 0,
        isBreak3Yogic: true,
        isBreakYogic: false,
        isBreak2Yogic: false,
        isBreak4Yogic: false,
        isFinishedYogic: false
    };
    updateInfoYogic();
}

let [secondsYogic, minutesYogic, hoursYogic] = [0, 0, 0];
let timerRefYogic = document.getElementById('timerDisplayYogic');
let intYogic = null;
document.getElementById('stopBtnYogic').disabled = true;
document.getElementById('stopBtnYogic').style.color = 'rgb(177, 177, 177)';
document.getElementById('yogicSave').disabled = true;
document.getElementById('yogicSave').style.color = 'rgb(177, 177, 177)';

var audioListYogic = []
audioListYogic.push(new Audio('/sounds/breathein.mp3'))
audioListYogic.push(new Audio('/sounds/holdyourbreath.mp3'));
audioListYogic.push(new Audio('/sounds/exhale.mp3'));
audioListYogic.push(new Audio('/sounds/hold.mp3'));


var audioYogic = document.getElementById("audioYogic"),
    muteYogic = document.getElementById("muteYogic"),
    ismuteYogic = false;

audioPlayerYogic.loop = true;

var audioSongYogic = document.getElementById("songYogic"),
    muteSongYogic = document.getElementById("songMuteYogic"),
    isSongMuteYogic = false;

// Get the volumeVyogic bar element
const volumeVoiceYogic = document.getElementById('volumeVoiceYogic');

// Add an event listener for the volumeVyogic change event
volumeVoiceYogic.addEventListener('input', function () {
    // Get the current volumeVyogic value
    const volumeVyogic = parseFloat(volumeVoiceYogic.value);

    // Check if volumeVyogic is 0 and mute the media if necessary
    if (volumeVyogic === 0) {
        audioListYogic[0].muted = true;
        audioListYogic[1].muted = true;
        audioListYogic[2].muted = true;
        audioListYogic[3].muted = true;
        audioYogic.style.display = "none";
        muteYogic.style.display = "block";
        ismuteYogic = true;
    } else {
        audioListYogic[0].muted = false;
        audioListYogic[1].muted = false;
        audioListYogic[2].muted = false;
        audioListYogic[3].muted = false;
        muteYogic.style.display = "none";
        audioYogic.style.display = "block";
        ismuteYogic = false;
    }
});
// Get the volumeSyogic bar element
const volumeSongYogic = document.getElementById('volumeSongYogic');

// Add an event listener for the volumeSyogic change event
volumeSongYogic.addEventListener('input', function () {
    // Get the current volumeSyogic value
    const volumeSyogic = parseFloat(volumeSongYogic.value);

    // Check if volumeSyogic is 0 and mute the media if necessary
    if (volumeSyogic === 0) {
        audioPlayerYogic.muted = true;
        audioSongYogic.style.display = "none";
        muteSongYogic.style.display = "block";
        isSongMuteYogic = true;
    } else {
        audioPlayerYogic.muted = false;
        muteSongYogic.style.display = "none";
        audioSongYogic.style.display = "block";
        isSongMuteYogic = false;
    }
});


var inhaleYogic = 4;
var holdYogic = inhaleYogic / 2;
var exhaleYogic = inhaleYogic;
var hold2Yogic = inhaleYogic / 2;
setTimerSettingsYogic(9999, inhaleYogic, true, holdYogic, true, exhaleYogic, true, hold2Yogic);
initializeTimerControlsYogic();
initializeStatusPanelYogic();
initializeTimerSettingsFormYogic();
resetTimerYogic();


var minusBtnYogic = document.getElementById("minusYogic"),
    plusBtnYogic = document.getElementById("plusYogic"),
    numberYogic = 4, /// numberYogic value
    minYogic = 4, /// minYogic numberYogic
    maxYogic = 30;

minusBtnYogic.onclick = function () {
    if (numberYogic > minYogic) {
        numberYogic = numberYogic - 2; /// Minus 1 of the numberYogic
        formSettingsFieldsYogic.intervalDurationYogic.value = numberYogic; /// Display the value in place of the numberYogic
        //fix here to change pranayama type
        formSettingsFieldsYogic.breakDurationYogic.value = formSettingsFieldsYogic.intervalDurationYogic.value / 2;
        formSettingsFieldsYogic.breakDuration2Yogic.value = formSettingsFieldsYogic.intervalDurationYogic.value;
        formSettingsFieldsYogic.breakDuration3Yogic.value = formSettingsFieldsYogic.intervalDurationYogic.value / 2;
        setTimerSettingsYogic(9999, formSettingsFieldsYogic.intervalDurationYogic.value, true, formSettingsFieldsYogic.breakDurationYogic.value, true, formSettingsFieldsYogic.breakDuration2Yogic.value, true, formSettingsFieldsYogic.breakDuration3Yogic.value);
    }
}

plusBtnYogic.onclick = function () {
    if (numberYogic < maxYogic) {
        numberYogic = numberYogic + 2;
        formSettingsFieldsYogic.intervalDurationYogic.value = numberYogic; /// Display the value in place of the numberYogic
        //fix here to change pranayama type
        formSettingsFieldsYogic.breakDurationYogic.value = formSettingsFieldsYogic.intervalDurationYogic.value / 2;
        formSettingsFieldsYogic.breakDuration2Yogic.value = formSettingsFieldsYogic.intervalDurationYogic.value;
        formSettingsFieldsYogic.breakDuration3Yogic.value = formSettingsFieldsYogic.intervalDurationYogic.value / 2;
        setTimerSettingsYogic(9999, formSettingsFieldsYogic.intervalDurationYogic.value, true, formSettingsFieldsYogic.breakDurationYogic.value, true, formSettingsFieldsYogic.breakDuration2Yogic.value, true, formSettingsFieldsYogic.breakDuration3Yogic.value);

    }
}

function initializeTimerSettingsFormYogic() {
    const oneDayInSecondsBRE = 60 * 60 * 24;
    let lastUserSetEnableBreakYogic = timerSettingsYogic.enableBreakYogic;
    let lastUserSetEnableBreak2Yogic = timerSettingsYogic.enableBreak2Yogic;
    let lastUserSetEnableBreak3Yogic = timerSettingsYogic.enableBreak3Yogic;

    formSettingsFieldsYogic = {
        intervalCountYogic: document.getElementById('intervalCountInputYogic'),
        intervalDurationYogic: document.getElementById('intervalDurationInputYogic'),
        enableBreakYogic: document.getElementById('enableBreakInputYogic'),
        breakDurationYogic: document.getElementById('breakDurationInputYogic'),
        enableBreak2Yogic: document.getElementById('enableBreakInput2Yogic'),
        breakDuration2Yogic: document.getElementById('breakDurationInput2Yogic'),
        enableBreak3Yogic: document.getElementById('enableBreakInput3Yogic'),
        breakDuration3Yogic: document.getElementById('breakDurationInput3Yogic'),
    };

    formSettingsFieldsYogic.intervalCountYogic.value = timerSettingsYogic.intervalCountYogic;
    formSettingsFieldsYogic.intervalDurationYogic.value = timerSettingsYogic.intervalDurationYogic;
    formSettingsFieldsYogic.enableBreakYogic.checked = timerSettingsYogic.enableBreakYogic;
    formSettingsFieldsYogic.breakDurationYogic.value = timerSettingsYogic.breakDurationYogic;
    formSettingsFieldsYogic.enableBreak2Yogic.checked = timerSettingsYogic.enableBreak2Yogic;
    formSettingsFieldsYogic.breakDuration2Yogic.value = timerSettingsYogic.breakDuration2Yogic;
    formSettingsFieldsYogic.enableBreak3Yogic.checked = timerSettingsYogic.enableBreak3Yogic;
    formSettingsFieldsYogic.breakDuration3Yogic.value = timerSettingsYogic.breakDuration3Yogic;

    function getNumberInBoundsOrDefaultYogic(value, minYogic, maxYogic, def = 1) {
        const valueAsNumberYogic = parseInt(value);
        return isNaN(valueAsNumberYogic) ? def : Math.max(minYogic, Math.min(valueAsNumberYogic, maxYogic));
    }

    function setBreakDurationLineDisplayYogic(displayed) {
        const breakDurationInputLineEltYogic = document.getElementById('breakDurationInputLineYogic');
        breakDurationInputLineEltYogic.style.display = displayed ? null : 'none';
        const breakDurationInputLineElt2Yogic = document.getElementById('breakDurationInputLine2Yogic');
        breakDurationInputLineElt2Yogic.style.display = displayed ? null : 'none';
        const breakDurationInputLineElt3Yogic = document.getElementById('breakDurationInputLine3Yogic');
        breakDurationInputLineElt3Yogic.style.display = displayed ? null : 'none';
    }

    formSettingsFieldsYogic.intervalCountYogic.addEventListener('input', () => {
        const intervalCountYogic = getNumberInBoundsOrDefaultYogic(formSettingsFieldsYogic.intervalCountYogic.value, 1, 9999),
            hasOneIntervalYogic = intervalCountYogic === 1,
            hasBreakYogic = hasOneIntervalYogic ? false : lastUserSetEnableBreakYogic;

        formSettingsFieldsYogic.enableBreakYogic.disabled = hasOneIntervalYogic === true;
        formSettingsFieldsYogic.enableBreakYogic.checked = hasBreakYogic;

        setBreakDurationLineDisplayYogic(hasBreakYogic);

        setTimerSettingsYogic(intervalCountYogic, undefined, hasBreakYogic);
        updateInfoYogic();
    });

    formSettingsFieldsYogic.intervalDurationYogic.addEventListener('input', () => {
        setTimerSettingsYogic(undefined, getNumberInBoundsOrDefaultYogic(formSettingsFieldsYogic.intervalDurationYogic.value, 1, oneDayInSecondsBRE));
        updateInfoYogic();
    });

    formSettingsFieldsYogic.enableBreakYogic.addEventListener('change', () => {
        const enableBreakYogic = formSettingsFieldsYogic.enableBreakYogic.checked;

        lastUserSetEnableBreakYogic = enableBreakYogic;
        setBreakDurationLineDisplayYogic(enableBreakYogic);
        setTimerSettingsYogic(undefined, undefined, enableBreakYogic);
        updateInfoYogic();
    });

    formSettingsFieldsYogic.breakDurationYogic.addEventListener('input', () => {
        setTimerSettingsYogic(undefined, undefined, undefined,
            getNumberInBoundsOrDefaultYogic(formSettingsFieldsYogic.breakDurationYogic.value, 1, oneDayInSecondsBRE)
        );
        updateInfoYogic();
    });

    formSettingsFieldsYogic.enableBreak2Yogic.addEventListener('change', () => {
        const enableBreak2Yogic = formSettingsFieldsYogic.enableBreak2Yogic.checked;

        lastUserSetEnableBreak2Yogic = enableBreak2Yogic;
        setBreakDurationLineDisplayYogic(enableBreak2Yogic);
        setTimerSettingsYogic(undefined, undefined, undefined, undefined, enableBreak2Yogic);
        updateInfoYogic();
    });

    formSettingsFieldsYogic.breakDuration2Yogic.addEventListener('input', () => {
        setTimerSettingsYogic(undefined, undefined, undefined, undefined, undefined,
            getNumberInBoundsOrDefaultYogic(formSettingsFieldsYogic.breakDuration2Yogic.value, 1, oneDayInSecondsBRE)
        );
        updateInfoYogic();
    });

    formSettingsFieldsYogic.enableBreak3Yogic.addEventListener('change', () => {
        const enableBreak3Yogic = formSettingsFieldsYogic.enableBreak3Yogic.checked;

        lastUserSetEnableBreak3Yogic = enableBreak2Yogic;
        setBreakDurationLineDisplayYogic(enableBreak3Yogic);
        setTimerSettingsYogic(undefined, undefined, undefined, undefined, undefined, undefined, enableBreak3Yogic);
        updateInfoYogic();
    });

    formSettingsFieldsYogic.breakDuration3Yogic.addEventListener('input', () => {
        setTimerSettingsYogic(
            undefined, undefined, undefined, undefined, undefined, undefined, undefined,
            getNumberInBoundsOrDefaultYogic(formSettingsFieldsYogic.breakDuration3Yogic.value, 1, oneDayInSecondsBRE)
        );
        updateInfoYogic();
    });
}

function initializeTimerControlsYogic() {
    timerControlsButtonsYogic = {
        startYogic: document.getElementById('startBtnYogic'),
        pauseYogic: document.getElementById('pauseBtnYogic'),
        stopYogic: document.getElementById('stopBtnYogic'),
    };

    setTimerControlsDisabledStateYogic(false, true, true);

    timerControlsButtonsYogic.startYogic.addEventListener('click', startTimerYogic);
    timerControlsButtonsYogic.pauseYogic.addEventListener('click', pauseTimerYogic);
    timerControlsButtonsYogic.stopYogic.addEventListener('click', stopTimerYogic);
}

function initializeStatusPanelYogic() {
    statusPanelYogic = {
        timeOverviewMessageYogic: document.getElementById('timeOverviewMessageYogic'),

        elapsedInIntervalBoxYogic: document.getElementById('elapsedInIntervalBoxYogic'),
        elapsedInBreakIntervalBoxYogic: document.getElementById('elapsedInBreakIntervalBoxYogic'),
        elapsedInIntervalYogic: document.getElementById('elapsedInIntervalYogic'),
        elapsedInBreakIntervalYogic: document.getElementById('elapsedInBreakIntervalYogic'),
        elapsedInBreakIntervalBox2Yogic: document.getElementById('elapsedInBreakIntervalBox2Yogic'),
        elapsedInBreakInterval2Yogic: document.getElementById('elapsedInBreakInterval2Yogic'),
        elapsedInBreakIntervalBox3Yogic: document.getElementById('elapsedInBreakIntervalBox3Yogic'),
        elapsedInBreakInterval3Yogic: document.getElementById('elapsedInBreakInterval3Yogic'),

        intervalsDoneYogic: document.getElementById('intervalsDoneYogic'),
    };
}

function setTimerControlsDisabledStateYogic(startYogic, pauseYogic, stopYogic) {
    timerControlsButtonsYogic.startYogic.disabled = startYogic;
    timerControlsButtonsYogic.pauseYogic.disabled = pauseYogic;
    timerControlsButtonsYogic.stopYogic.disabled = stopYogic;
}

function setFormDisabledStateYogic(disabled) {
    formSettingsFieldsYogic.intervalCountYogic.disabled = disabled;
    formSettingsFieldsYogic.intervalDurationYogic.disabled = disabled;
    formSettingsFieldsYogic.enableBreakYogic.disabled = disabled || timerSettingsYogic.intervalCountYogic === 1;
    formSettingsFieldsYogic.breakDurationYogic.disabled = disabled;
    formSettingsFieldsYogic.enableBreak2Yogic.disabled = disabled
    formSettingsFieldsYogic.breakDuration2Yogic.disabled = disabled;
    formSettingsFieldsYogic.enableBreak3Yogic.disabled = disabled
    formSettingsFieldsYogic.breakDuration3Yogic.disabled = disabled;
    minusBtnYogic.disabled = disabled;
    plusBtnYogic.disabled = disabled;
}

function startTimerYogic() {
    if (intYogic !== null) {
        clearInterval(intYogic);
    }
    intYogic = setInterval(displayTimerYogic, 1000);
    setFormDisabledStateYogic(true);
    setTimerControlsDisabledStateYogic(true, false, true);
    timerControlsButtonsYogic.stopYogic.style.color = "rgb(177, 177, 177)";
    if (timerYogic.isBreak3Yogic) {
        audioListYogic[2].muted = true;
        audioListYogic[3].muted = true;
        audioListYogic[2].play();
        audioListYogic[3].play();
        setTimeout(function () {
            audioListYogic[2].pause();
            audioListYogic[2].currentTime = 0
            audioListYogic[3].pause();
            audioListYogic[3].currentTime = 0
        }, 1000);
        if (!ismuteYogic) {
            audioListYogic[0].play();
        }
    }
    isYogicON = true;
    if (!isSongMuteYogic) {
        playSelectedSongYogic();
    }
    if (timerYogic.isFinishedYogic) {
        resetTimerYogic();
    }
    startTimerTickYogic();
    timerControlsButtonsYogic.startYogic.style.display = 'none';
    timerControlsButtonsYogic.pauseYogic.style.display = 'inline';
    document.getElementById('yogicSettings').disabled = true;
    document.getElementById('yogicSettings').style.color = 'rgb(177, 177, 177)';
    document.getElementById('yogicSave').disabled = true;
    document.getElementById('yogicSave').style.color = 'rgb(177, 177, 177)';
}

function pauseTimerYogic() {
    clearInterval(intYogic);
    setTimerControlsDisabledStateYogic(false, true, false);
    document.getElementById('stopBtnYogic').style.color = '#990000';
    timerControlsButtonsYogic.pauseYogic.style.display = 'none';
    timerControlsButtonsYogic.startYogic.style.display = 'inline';
    document.getElementById('yogicSettings').disabled = false;
    document.getElementById('yogicSettings').style.color = '#49B79D';
    if (!isSongMuteYogic) {
        audioPlayerYogic.pause();
    }
    stopTimerTickYogic();
    isYogicON = false;
    document.getElementById('yogicDate').value = date;
    document.getElementById('yogicSave').disabled = false;
    document.getElementById('yogicSave').style.color = '#49B79D';
}

function stopTimerYogic() {
    clearInterval(intYogic);
    [secondsYogic, minutesYogic, hoursYogic] = [0, 0, 0];
    timerRefYogic.value = '00 : 00 : 00';
    audioPlayerYogic.currentTime = 0
    timerControlsButtonsYogic.pauseYogic.style.display = 'none';
    timerControlsButtonsYogic.startYogic.style.display = 'inline';
    setFormDisabledStateYogic(false);
    setTimerControlsDisabledStateYogic(false, true, true);
    timerControlsButtonsYogic.stopYogic.style.color = "rgb(177, 177, 177)";
    document.getElementById('yogicSave').disabled = true;
    document.getElementById('yogicSave').style.color = 'rgb(177, 177, 177)';
    stopTimerTickYogic();
    resetTimerYogic();
    isYogicON = false;
}

function displayTimerYogic() {
    secondsYogic++;
    if (secondsYogic == 60) {
        secondsYogic = 0;
        minutesYogic++;
        if (minutesYogic == 60) {
            minutesYogic = 0;
            hoursYogic++;
        }
    }
    let hYogic = hoursYogic < 10 ? "0" + hoursYogic : hoursYogic;
    let mYogic = minutesYogic < 10 ? "0" + minutesYogic : minutesYogic;
    let sYogic = secondsYogic < 10 ? "0" + secondsYogic : secondsYogic;
    timerRefYogic.value = `${hYogic} : ${mYogic} : ${sYogic}`;
}

function startTimerTickYogic() {
    timerYogic.intervalId = setInterval(onTimerTickYogic, 1000);
}

function stopTimerTickYogic() {
    clearInterval(timerYogic.intervalId);
}

function onTimerTickYogic() {
    const currentIntervalDurationYogic = timerYogic.isBreakYogic ? timerSettingsYogic.breakDurationYogic : timerYogic.isBreak2Yogic ? timerSettingsYogic.breakDuration2Yogic : timerYogic.isBreak4Yogic ? timerSettingsYogic.breakDuration3Yogic : timerSettingsYogic.intervalDurationYogic;
    if (timerYogic.elapsedInIntervalYogic <= currentIntervalDurationYogic && timerYogic.isBreak3Yogic) {
        timerYogic.elapsedInIntervalYogic++;
        if (timerYogic.elapsedInIntervalYogic > currentIntervalDurationYogic && timerYogic.isBreak3Yogic) {
            if (!ismuteYogic) {
                audioListYogic[3].muted = false;
                audioListYogic[3].play();
            }
            timerYogic.isBreakYogic = true;
            timerYogic.isBreak3Yogic = false;
            timerYogic.isFinishedYogic = timerYogic.intervalsDoneYogic === timerSettingsYogic.intervalCountYogic;
            if (!timerYogic.isFinishedYogic) {
                timerYogic.elapsedInIntervalYogic = 1;
            }
            if (timerYogic.isFinishedYogic) {
                setTimerControlsDisabledStateYogic(false, true, true);
                setFormDisabledStateYogic(false);
                stopTimerTickYogic();
            } else {
                timerYogic.totalTimeElapsedYogic++;
            }
            updateInfoYogic();
        }
        updateInfoYogic();
    } else if (timerYogic.elapsedInIntervalYogic <= currentIntervalDurationYogic && timerYogic.isBreakYogic) {
        timerYogic.elapsedInIntervalYogic++;
        if (timerYogic.elapsedInIntervalYogic > currentIntervalDurationYogic && timerYogic.isBreakYogic) {
            if (!ismuteYogic) {
                audioListYogic[2].muted = false;
                audioListYogic[2].play();
            }
            timerYogic.isBreak2Yogic = true;
            timerYogic.isBreakYogic = false;
            timerYogic.isFinishedYogic = timerYogic.intervalsDoneYogic === timerSettingsYogic.intervalCountYogic;
            if (!timerYogic.isFinishedYogic) {
                timerYogic.elapsedInIntervalYogic = 1;
            }
            if (timerYogic.isFinishedYogic) {
                setTimerControlsDisabledStateYogic(false, true, true);
                setFormDisabledStateYogic(false);
                stopTimerTickYogic();
            } else {
                timerYogic.totalTimeElapsedYogic++;
            }
            updateInfoYogic();
        }
        updateInfoYogic();
    } else if (timerYogic.elapsedInIntervalYogic <= currentIntervalDurationYogic && timerYogic.isBreak2Yogic) {
        timerYogic.elapsedInIntervalYogic++;
        if (timerYogic.elapsedInIntervalYogic > currentIntervalDurationYogic && timerYogic.isBreak2Yogic) {
            if (!ismuteYogic) {
                audioListYogic[3].muted = false;
                audioListYogic[3].play();
            }
            timerYogic.isBreak4Yogic = true;
            timerYogic.isBreak2Yogic = false;
            timerYogic.isFinishedYogic = timerYogic.intervalsDoneYogic === timerSettingsYogic.intervalCountYogic;
            if (!timerYogic.isFinishedYogic) {
                timerYogic.elapsedInIntervalYogic = 1;
            }
            if (timerYogic.isFinishedYogic) {
                setTimerControlsDisabledStateYogic(false, true, true);
                setFormDisabledStateYogic(false);
                stopTimerTickYogic();
            } else {
                timerYogic.totalTimeElapsedYogic++;
            }
            updateInfoYogic();
        }
        updateInfoYogic();
    } else if (timerYogic.elapsedInIntervalYogic <= currentIntervalDurationYogic && timerYogic.isBreak4Yogic) {
        timerYogic.elapsedInIntervalYogic++;
        if (timerYogic.elapsedInIntervalYogic > currentIntervalDurationYogic && timerYogic.isBreak4Yogic) {
            if (!ismuteYogic) {
                audioListYogic[0].play();
            }
            timerYogic.isBreak3Yogic = true;
            timerYogic.isBreak4Yogic = false;
            timerYogic.intervalsDoneYogic++;
            timerYogic.isFinishedYogic = timerYogic.intervalsDoneYogic === timerSettingsYogic.intervalCountYogic;
            if (!timerYogic.isFinishedYogic) {
                timerYogic.elapsedInIntervalYogic = 1;
            }
            if (timerYogic.isFinishedYogic) {
                setTimerControlsDisabledStateYogic(false, true, true);
                setFormDisabledStateYogic(false);
                stopTimerTickYogic();
            } else {
                timerYogic.totalTimeElapsedYogic++;
            }
            updateInfoYogic();
        }
        updateInfoYogic();
    }
}

function updateInfoYogic() {
    statusPanelYogic.timeOverviewMessageYogic.style.display = timerYogic.isFinishedYogic ? 'block' : null;
    statusPanelYogic.elapsedInIntervalBoxYogic.style.display = timerYogic.isFinishedYogic || timerYogic.isBreakYogic || timerYogic.isBreak2Yogic || timerYogic.isBreak4Yogic ? 'none' : null;
    statusPanelYogic.elapsedInBreakIntervalBoxYogic.style.display = !timerYogic.isFinishedYogic && timerYogic.isBreakYogic ? 'block' : null;
    statusPanelYogic.elapsedInBreakIntervalBox2Yogic.style.display = !timerYogic.isFinishedYogic && timerYogic.isBreak2Yogic ? 'block' : null;
    statusPanelYogic.elapsedInBreakIntervalBox3Yogic.style.display = !timerYogic.isFinishedYogic && timerYogic.isBreak4Yogic ? 'block' : null;

    if (timerYogic.isBreakYogic) {
        statusPanelYogic.elapsedInBreakIntervalYogic.textContent = timerYogic.elapsedInIntervalYogic;
    } else if (timerYogic.isBreak2Yogic) {
        statusPanelYogic.elapsedInBreakInterval2Yogic.textContent = timerYogic.elapsedInIntervalYogic;
    } else if (timerYogic.isBreak4Yogic) {
        statusPanelYogic.elapsedInBreakInterval3Yogic.textContent = timerYogic.elapsedInIntervalYogic;
    } else {
        statusPanelYogic.elapsedInIntervalYogic.textContent = timerYogic.elapsedInIntervalYogic;
    }
    statusPanelYogic.intervalsDoneYogic.value = timerYogic.intervalsDoneYogic;
}
//---------------------------------------------------//
