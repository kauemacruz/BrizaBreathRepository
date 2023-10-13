var meditationList = [];
if (isPortuguese) {
    meditationList.push(new Audio('/sounds/songs/autumn-sky-meditation-7618.mp3'));
    meditationList.push(new Audio('/sounds/songs/meditation-sounds-122698.mp3'));
} else {
    meditationList.push(new Audio('/sounds/songs/autumn-sky-meditation-7618.mp3'));
    meditationList.push(new Audio('/sounds/songs/meditation-sounds-122698.mp3'));
}


//MEDITATATION 1
document.getElementById("startBtnMED1").addEventListener('click', startMED1);
document.getElementById("pauseBtnMED1").addEventListener('click', pauseMED1);

// Update the progress bar while playing
meditationList[0].addEventListener('timeupdate', updateProgressBarMED1);
var MED1isON = false;

// Reset when the audio finishes playing
meditationList[0].addEventListener('ended', function () {
    resetMED1();
});

function startMED1() {
    document.getElementById("startBtnMED1").style.display = "none";
    document.getElementById("pauseBtnMED1").style.display = "inline";
    MED1isON = true;
    meditationList[0].muted = false;
    meditationList[0].play();
    if (MED2isON) {
        resetMED2();
    }
}

function pauseMED1() {
    document.getElementById("startBtnMED1").style.display = "inline";
    document.getElementById("pauseBtnMED1").style.display = "none";
    MED1isON = false;
    meditationList[0].pause();
    meditationList[0].currentTime = 0;
}

function updateProgressBarMED1() {
    var progressBarMED1 = document.getElementById("progressBarMED1");
    var currentTimeMED1 = meditationList[0].currentTime;
    var durationMED1 = meditationList[0].duration;

    if (isNaN(durationMED1)) {
        progressBarMED1.value = 0;
    } else {
        progressBarMED1.value = (currentTimeMED1 / durationMED1) * 100;
    }
}

// Seek to the specified time when the progress bar is clicked
document.getElementById("progressBarMED1").addEventListener('input', function () {
    var progressBarMED1 = document.getElementById("progressBarMED1");
    var durationMED1 = meditationList[0].duration;

    if (!isNaN(durationMED1)) {
        var seekTimeMED1 = (progressBarMED1.value / 100) * durationMED1;
        meditationList[0].currentTime = seekTimeMED1;
    }
});
function resetMED1() {
    document.getElementById("startBtnMED1").style.display = "inline";
    document.getElementById("pauseBtnMED1").style.display = "none";
    meditationList[0].pause();
    meditationList[0].currentTime = 0;
    document.getElementById("progressBarMED1").value = 0;
    MED1isON = false;
}

//MEDITATION 2
    document.getElementById("startBtnMED2").addEventListener('click', startMED2);
document.getElementById("pauseBtnMED2").addEventListener('click', pauseMED2);

// Update the progress bar while playing
meditationList[1].addEventListener('timeupdate', updateProgressBarMED2);
var MED2isON = false;

// Reset when the audio finishes playing
meditationList[1].addEventListener('ended', function () {
    resetMED2();
});

function startMED2() {
    document.getElementById("startBtnMED2").style.display = "none";
    document.getElementById("pauseBtnMED2").style.display = "inline";
    MED2isON = true;
    meditationList[1].muted = false;
    meditationList[1].play();
    if (MED1isON) {
        resetMED1();
    }
}

function pauseMED2() {
    document.getElementById("startBtnMED2").style.display = "inline";
    document.getElementById("pauseBtnMED2").style.display = "none";
    MED2isON = false;
    meditationList[1].pause();
    meditationList[1].currentTime = 0;
}

function updateProgressBarMED2() {
    var progressBarMED2 = document.getElementById("progressBarMED2");
    var currentTimeMED2 = meditationList[1].currentTime;
    var durationMED2 = meditationList[1].duration;

    if (isNaN(durationMED2)) {
        progressBarMED2.value = 0;
    } else {
        progressBarMED2.value = (currentTimeMED2 / durationMED2) * 100;
    }
}

// Seek to the specified time when the progress bar is clicked
document.getElementById("progressBarMED2").addEventListener('input', function () {
    var progressBarMED2 = document.getElementById("progressBarMED2");
    var durationMED2 = meditationList[1].duration;

    if (!isNaN(durationMED2)) {
        var seekTimeMED2 = (progressBarMED2.value / 100) * durationMED2;
        meditationList[1].currentTime = seekTimeMED2;
    }
});
function resetMED2() {
    document.getElementById("startBtnMED2").style.display = "inline";
    document.getElementById("pauseBtnMED2").style.display = "none";
    meditationList[1].pause();
    meditationList[1].currentTime = 0;
    document.getElementById("progressBarMED2").value = 0;
    MED2isON = false;
}

//SEX BREATHING
$(function () {
    $('#SEXForm').on('submit', function (e) {
        e.preventDefault(); // Prevent the default form submission

        var formData = new FormData(this); // Get the form data

        $.ajax({
            url: "/",
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function (result) {
                $('#SEXResultSaved').html(result); // Update the result section with the server response
            }
        });
        clearInterval(intSEX);
        [secondsSEX, minutesSEX, hoursSEX] = [0, 0, 0];
        timerRefSEX.value = '00 : 00 : 00';
        audioPlayerBRT.currentTime = 0
        timerControlsButtonsSEX.pauseSEX.style.display = 'none';
        timerControlsButtonsSEX.startSEX.style.display = 'inline';
        setFormDisabledStateSEX(false);
        setTimerControlsDisabledStateSEX(false, true, true);
        timerControlsButtonsSEX.stopSEX.style.color = "rgb(177, 177, 177)";
        document.getElementById('SEXSave').disabled = true;
        document.getElementById('SEXSave').style.color = 'rgb(177, 177, 177)';
        stopTimerTickSEX();
        resetTimerSEX();
    });
});

let
    formSettingsFieldsSEX,
    timerControlsButtonsSEX,
    statusPanelSEX,
    timerSEX,
    timerSettingsSEX;

function setTimerSettingsSEX(
    intervalCountSEX = timerSettingsSEX.intervalCountSEX,
    intervalDurationSEX = timerSettingsSEX.intervalDurationSEX,
    enableBreakSEX = timerSettingsSEX.enableBreakSEX,
    breakDurationSEX = timerSettingsSEX.breakDurationSEX,
    enableBreak2SEX = timerSettingsSEX.enableBreak2SEX,
    breakDuration2SEX = timerSettingsSEX.breakDuration2SEX
) {
    timerSettingsSEX = {
        intervalCountSEX,
        intervalDurationSEX,
        enableBreakSEX,
        breakDurationSEX,
        enableBreak2SEX,
        breakDuration2SEX
    };
}

function resetTimerSEX() {
    timerSEX = {
        totalTimeElapsedSEX: 0,
        elapsedInIntervalSEX: 0,
        intervalsDoneSEX: 0,
        isBreak3SEX: true,
        isBreakSEX: false,
        isBreak2SEX: false,
        isFinishedSEX: false
    };
    updateInfoSEX();
}

let [secondsSEX, minutesSEX, hoursSEX] = [0, 0, 0];
let timerRefSEX = document.getElementById('timerDisplaySEX');
let intSEX = null;
document.getElementById('stopBtnSEX').disabled = true;
document.getElementById('stopBtnSEX').style.color = 'rgb(177, 177, 177)';
document.getElementById('SEXSave').disabled = true;
document.getElementById('SEXSave').style.color = 'rgb(177, 177, 177)';

var audioListSEX = []
if (isPortuguese) {
    audioListSEX.push(new Audio('/sounds/breathein.mp3'))
    audioListSEX.push(new Audio('/sounds/holdyourbreath.mp3'));
    audioListSEX.push(new Audio('/sounds/exhale.mp3'));
    audioListSEX.push(new Audio('/sounds/hold.mp3'));
} else {
    audioListSEX.push(new Audio('/sounds/breathein.mp3'))
    audioListSEX.push(new Audio('/sounds/holdyourbreath.mp3'));
    audioListSEX.push(new Audio('/sounds/exhale.mp3'));
    audioListSEX.push(new Audio('/sounds/hold.mp3'));
}



var audioSEX = document.getElementById("audioSEX"),
    muteSEX = document.getElementById("muteSEX"),
    ismuteSEX = false;

audioPlayerBRT.loop = true;

var audioSongSEX = document.getElementById("songSEX"),
    muteSongSEX = document.getElementById("songMuteSEX");
// Get the volumeVSEX bar element
const volumeVoiceSEX = document.getElementById('volumeVoiceSEX');

// Add an event listener for the volumeVSEX change event
volumeVoiceSEX.addEventListener('input', function () {
    // Get the current volumeVSEX value
    const volumeVSEX = parseFloat(volumeVoiceSEX.value);

    // Check if volumeVSEX is 0 and mute the media if necessary
    if (volumeVSEX === 0) {
        audioListSEX[0].muted = true;
        audioListSEX[1].muted = true;
        audioListSEX[2].muted = true;
        audioListSEX[3].muted = true;
        audioSEX.style.display = "none";
        muteSEX.style.display = "block";
        ismuteSEX = true;
    } else {
        audioListSEX[0].muted = false;
        audioListSEX[1].muted = false;
        audioListSEX[2].muted = false;
        audioListSEX[3].muted = false;
        muteSEX.style.display = "none";
        audioSEX.style.display = "block";
        ismuteSEX = false;
    }
});
// Get the volumeSSEX bar element
const volumeSongSEX = document.getElementById('volumeSongSEX');

// Add an event listener for the volumeSSEX change event
volumeSongSEX.addEventListener('input', function () {
    // Get the current volumeSSEX value
    const volumeSSEX = parseFloat(volumeSongSEX.value);

    // Check if volumeSSEX is 0 and mute the media if necessary
    if (volumeSSEX === 0) {
        audioPlayerBRT.muted = true;
        audioSongSEX.style.display = "none";
        muteSongSEX.style.display = "block";
    } else {
        audioPlayerBRT.muted = false;
        muteSongSEX.style.display = "none";
        audioSongSEX.style.display = "block";
    }
});


var inhaleSEX = 2;
var holdSEX = 8;
var exhaleSEX = 4;
setTimerSettingsSEX(9999, inhaleSEX, true, holdSEX, true, exhaleSEX);
initializeTimerControlsSEX();
initializeStatusPanelSEX();
initializeTimerSettingsFormSEX();
resetTimerSEX();


var minusBtnSEX = document.getElementById("minusSEX"),
    plusBtnSEX = document.getElementById("plusSEX"),
    numberSEX = 3, /// numberSEX value
    minSEX = 2, /// minSEX numberSEX
    maxSEX = 60;

minusBtnSEX.onclick = function () {
    if (numberSEX > minSEX) {
        numberSEX = numberSEX - 1; /// Minus 1 of the numberSEX
        formSettingsFieldsSEX.intervalDurationSEX.value = numberSEX; /// Display the value in place of the numberSEX
        //fix here to change pranayama type
        formSettingsFieldsSEX.breakDurationSEX.value = formSettingsFieldsSEX.intervalDurationSEX.value * 4;
        formSettingsFieldsSEX.breakDuration2SEX.value = formSettingsFieldsSEX.intervalDurationSEX.value * 2;
        setTimerSettingsSEX(9999, formSettingsFieldsSEX.intervalDurationSEX.value, true, formSettingsFieldsSEX.breakDurationSEX.value, true, formSettingsFieldsSEX.breakDuration2SEX.value);
    }
}

plusBtnSEX.onclick = function () {
    if (numberSEX < maxSEX) {
        numberSEX = numberSEX + 1;
        formSettingsFieldsSEX.intervalDurationSEX.value = numberSEX; /// Display the value in place of the numberSEX
        //fix here to change pranayama type
        formSettingsFieldsSEX.breakDurationSEX.value = formSettingsFieldsSEX.intervalDurationSEX.value * 4;
        formSettingsFieldsSEX.breakDuration2SEX.value = formSettingsFieldsSEX.intervalDurationSEX.value * 2;
        setTimerSettingsSEX(9999, formSettingsFieldsSEX.intervalDurationSEX.value, true, formSettingsFieldsSEX.breakDurationSEX.value, true, formSettingsFieldsSEX.breakDuration2SEX.value);

    }
}

function initializeTimerSettingsFormSEX() {
    const oneDayInSecondsBRE = 60 * 60 * 24;
    let lastUserSetEnableBreakSEX = timerSettingsSEX.enableBreakSEX;
    let lastUserSetEnableBreak2SEX = timerSettingsSEX.enableBreak2SEX;

    formSettingsFieldsSEX = {
        intervalCountSEX: document.getElementById('intervalCountInputSEX'),
        intervalDurationSEX: document.getElementById('intervalDurationInputSEX'),
        enableBreakSEX: document.getElementById('enableBreakInputSEX'),
        breakDurationSEX: document.getElementById('breakDurationInputSEX'),
        enableBreak2SEX: document.getElementById('enableBreakInput2SEX'),
        breakDuration2SEX: document.getElementById('breakDurationInput2SEX')
    };

    formSettingsFieldsSEX.intervalCountSEX.value = timerSettingsSEX.intervalCountSEX;
    formSettingsFieldsSEX.intervalDurationSEX.value = timerSettingsSEX.intervalDurationSEX;
    formSettingsFieldsSEX.enableBreakSEX.checked = timerSettingsSEX.enableBreakSEX;
    formSettingsFieldsSEX.breakDurationSEX.value = timerSettingsSEX.breakDurationSEX;
    formSettingsFieldsSEX.enableBreak2SEX.checked = timerSettingsSEX.enableBreak2SEX;
    formSettingsFieldsSEX.breakDuration2SEX.value = timerSettingsSEX.breakDuration2SEX;

    function getNumberInBoundsOrDefaultSEX(value, minSEX, maxSEX, def = 1) {
        const valueAsNumberSEX = parseInt(value);
        return isNaN(valueAsNumberSEX) ? def : Math.max(minSEX, Math.min(valueAsNumberSEX, maxSEX));
    }

    function setBreakDurationLineDisplaySEX(displayed) {
        const breakDurationInputLineEltSEX = document.getElementById('breakDurationInputLineSEX');
        breakDurationInputLineEltSEX.style.display = displayed ? null : 'none';
        const breakDurationInputLineElt2SEX = document.getElementById('breakDurationInputLine2SEX');
        breakDurationInputLineElt2SEX.style.display = displayed ? null : 'none';
        const breakDurationInputLineElt3SEX = document.getElementById('breakDurationInputLine3SEX');
        breakDurationInputLineElt3SEX.style.display = displayed ? null : 'none';
    }

    formSettingsFieldsSEX.intervalCountSEX.addEventListener('input', () => {
        const intervalCountSEX = getNumberInBoundsOrDefaultSEX(formSettingsFieldsSEX.intervalCountSEX.value, 1, 9999),
            hasOneIntervalSEX = intervalCountSEX === 1,
            hasBreakSEX = hasOneIntervalSEX ? false : lastUserSetEnableBreakSEX;

        formSettingsFieldsSEX.enableBreakSEX.disabled = hasOneIntervalSEX === true;
        formSettingsFieldsSEX.enableBreakSEX.checked = hasBreakSEX;

        setBreakDurationLineDisplaySEX(hasBreakSEX);

        setTimerSettingsSEX(intervalCountSEX, undefined, hasBreakSEX);
        updateInfoSEX();
    });

    formSettingsFieldsSEX.intervalDurationSEX.addEventListener('input', () => {
        setTimerSettingsSEX(undefined, getNumberInBoundsOrDefaultSEX(formSettingsFieldsSEX.intervalDurationSEX.value, 1, oneDayInSecondsBRE));
        updateInfoSEX();
    });

    formSettingsFieldsSEX.enableBreakSEX.addEventListener('change', () => {
        const enableBreakSEX = formSettingsFieldsSEX.enableBreakSEX.checked;

        lastUserSetEnableBreakSEX = enableBreakSEX;
        setBreakDurationLineDisplaySEX(enableBreakSEX);
        setTimerSettingsSEX(undefined, undefined, enableBreakSEX);
        updateInfoSEX();
    });

    formSettingsFieldsSEX.breakDurationSEX.addEventListener('input', () => {
        setTimerSettingsSEX(undefined, undefined, undefined,
            getNumberInBoundsOrDefaultSEX(formSettingsFieldsSEX.breakDurationSEX.value, 1, oneDayInSecondsBRE)
        );
        updateInfoSEX();
    });

    formSettingsFieldsSEX.enableBreak2SEX.addEventListener('change', () => {
        const enableBreak2SEX = formSettingsFieldsSEX.enableBreak2SEX.checked;

        lastUserSetEnableBreak2SEX = enableBreak2SEX;
        setBreakDurationLineDisplaySEX(enableBreak2SEX);
        setTimerSettingsSEX(undefined, undefined, undefined, undefined, enableBreak2SEX);
        updateInfoSEX();
    });

    formSettingsFieldsSEX.breakDuration2SEX.addEventListener('input', () => {
        setTimerSettingsSEX(undefined, undefined, undefined, undefined, undefined,
            getNumberInBoundsOrDefaultSEX(formSettingsFieldsSEX.breakDuration2SEX.value, 1, oneDayInSecondsBRE)
        );
        updateInfoSEX();
    });
}

function initializeTimerControlsSEX() {
    timerControlsButtonsSEX = {
        startSEX: document.getElementById('startBtnSEX'),
        pauseSEX: document.getElementById('pauseBtnSEX'),
        stopSEX: document.getElementById('stopBtnSEX'),
    };

    setTimerControlsDisabledStateSEX(false, true, true);

    timerControlsButtonsSEX.startSEX.addEventListener('click', startTimerSEX);
    timerControlsButtonsSEX.pauseSEX.addEventListener('click', pauseTimerSEX);
    timerControlsButtonsSEX.stopSEX.addEventListener('click', stopTimerSEX);
}

function initializeStatusPanelSEX() {
    statusPanelSEX = {
        timeOverviewMessageSEX: document.getElementById('timeOverviewMessageSEX'),

        elapsedInIntervalBoxSEX: document.getElementById('elapsedInIntervalBoxSEX'),
        elapsedInBreakIntervalBoxSEX: document.getElementById('elapsedInBreakIntervalBoxSEX'),
        elapsedInIntervalSEX: document.getElementById('elapsedInIntervalSEX'),
        elapsedInBreakIntervalSEX: document.getElementById('elapsedInBreakIntervalSEX'),
        elapsedInBreakIntervalBox2SEX: document.getElementById('elapsedInBreakIntervalBox2SEX'),
        elapsedInBreakInterval2SEX: document.getElementById('elapsedInBreakInterval2SEX'),
        elapsedInBreakIntervalBox3SEX: document.getElementById('elapsedInBreakIntervalBox3SEX'),

        intervalsDoneSEX: document.getElementById('intervalsDoneSEX'),
    };
}

function setTimerControlsDisabledStateSEX(startSEX, pauseSEX, stopSEX) {
    timerControlsButtonsSEX.startSEX.disabled = startSEX;
    timerControlsButtonsSEX.pauseSEX.disabled = pauseSEX;
    timerControlsButtonsSEX.stopSEX.disabled = stopSEX;
}

function setFormDisabledStateSEX(disabled) {
    formSettingsFieldsSEX.intervalCountSEX.disabled = disabled;
    formSettingsFieldsSEX.intervalDurationSEX.disabled = disabled;
    formSettingsFieldsSEX.enableBreakSEX.disabled = disabled || timerSettingsSEX.intervalCountSEX === 1;
    formSettingsFieldsSEX.breakDurationSEX.disabled = disabled;
    formSettingsFieldsSEX.enableBreak2SEX.disabled = disabled
    formSettingsFieldsSEX.breakDuration2SEX.disabled = disabled;
    minusBtnSEX.disabled = disabled;
    plusBtnSEX.disabled = disabled;
}

function startTimerSEX() {
    if (intSEX !== null) {
        clearInterval(intSEX);
    }
    intSEX = setInterval(displayTimerSEX, 1000);
    setFormDisabledStateSEX(true);
    setTimerControlsDisabledStateSEX(true, false, true);
    timerControlsButtonsSEX.stopSEX.style.color = "rgb(177, 177, 177)";
    if (timerSEX.isBreak3SEX) {
        if (!ismuteSEX) {
            audioListSEX[0].muted = false;
            audioListSEX[0].play();
        }
    }
    if (!audioPlayerBRT.muted) {
        playSelectedSongBRT(true);
    }
    if (timerSEX.isFinishedSEX) {
        resetTimerSEX();
    }
    startTimerTickSEX();
    timerControlsButtonsSEX.startSEX.style.display = 'none';
    timerControlsButtonsSEX.pauseSEX.style.display = 'inline';
    document.getElementById('SEXSettings').disabled = true;
    document.getElementById('SEXSettings').style.color = 'rgb(177, 177, 177)';
    document.getElementById('SEXSave').disabled = true;
    document.getElementById('SEXSave').style.color = 'rgb(177, 177, 177)';
}

function pauseTimerSEX() {
    clearInterval(intSEX);
    setTimerControlsDisabledStateSEX(false, true, false);
    document.getElementById('stopBtnSEX').style.color = '#990000';
    timerControlsButtonsSEX.pauseSEX.style.display = 'none';
    timerControlsButtonsSEX.startSEX.style.display = 'inline';
    document.getElementById('SEXSettings').disabled = false;
    document.getElementById('SEXSettings').style.color = '#49B79D';
    if (!audioPlayerBRT.muted) {
        audioPlayerBRT.pause();
    }
    stopTimerTickSEX();
    document.getElementById('SEXDate').value = date;
    document.getElementById('SEXSave').disabled = false;
    document.getElementById('SEXSave').style.color = '#49B79D';
}

function stopTimerSEX() {
    clearInterval(intSEX);
    [secondsSEX, minutesSEX, hoursSEX] = [0, 0, 0];
    timerRefSEX.value = '00 : 00 : 00';
    audioPlayerBRT.currentTime = 0
    timerControlsButtonsSEX.pauseSEX.style.display = 'none';
    timerControlsButtonsSEX.startSEX.style.display = 'inline';
    setFormDisabledStateSEX(false);
    setTimerControlsDisabledStateSEX(false, true, true);
    timerControlsButtonsSEX.stopSEX.style.color = "rgb(177, 177, 177)";
    document.getElementById('SEXSave').disabled = true;
    document.getElementById('SEXSave').style.color = 'rgb(177, 177, 177)';
    stopTimerTickSEX();
    resetTimerSEX();
}

function displayTimerSEX() {
    secondsSEX++;
    if (secondsSEX == 60) {
        secondsSEX = 0;
        minutesSEX++;
        if (minutesSEX == 60) {
            minutesSEX = 0;
            hoursSEX++;
        }
    }
    let hSEX = hoursSEX < 10 ? "0" + hoursSEX : hoursSEX;
    let mSEX = minutesSEX < 10 ? "0" + minutesSEX : minutesSEX;
    let sSEX = secondsSEX < 10 ? "0" + secondsSEX : secondsSEX;
    timerRefSEX.value = `${hSEX} : ${mSEX} : ${sSEX}`;
}

function startTimerTickSEX() {
    timerSEX.intervalId = setInterval(onTimerTickSEX, 1000);
}

function stopTimerTickSEX() {
    clearInterval(timerSEX.intervalId);
}

function onTimerTickSEX() {
    const currentIntervalDurationSEX = timerSEX.isBreakSEX ? timerSettingsSEX.breakDurationSEX : timerSEX.isBreak2SEX ? timerSettingsSEX.breakDuration2SEX : timerSettingsSEX.intervalDurationSEX;
    if (timerSEX.elapsedInIntervalSEX <= currentIntervalDurationSEX && timerSEX.isBreak3SEX) {
        timerSEX.elapsedInIntervalSEX++;
        if (timerSEX.elapsedInIntervalSEX > currentIntervalDurationSEX && timerSEX.isBreak3SEX) {
            if (!ismuteSEX) {
                audioListSEX[3].muted = false;
                audioListSEX[3].play();
            }
            timerSEX.isBreakSEX = true;
            timerSEX.isBreak3SEX = false;
            timerSEX.isFinishedSEX = timerSEX.intervalsDoneSEX === timerSettingsSEX.intervalCountSEX;
            if (!timerSEX.isFinishedSEX) {
                timerSEX.elapsedInIntervalSEX = 1;
            }
            if (timerSEX.isFinishedSEX) {
                setTimerControlsDisabledStateSEX(false, true, true);
                setFormDisabledStateSEX(false);
                stopTimerTickSEX();
            } else {
                timerSEX.totalTimeElapsedSEX++;
            }
            updateInfoSEX();
        }
        updateInfoSEX();
    } else if (timerSEX.elapsedInIntervalSEX <= currentIntervalDurationSEX && timerSEX.isBreakSEX) {
        timerSEX.elapsedInIntervalSEX++;
        if (timerSEX.elapsedInIntervalSEX > currentIntervalDurationSEX && timerSEX.isBreakSEX) {
            if (!ismuteSEX) {
                audioListSEX[2].muted = false;
                audioListSEX[2].play();
            }
            timerSEX.isBreak2SEX = true;
            timerSEX.isBreakSEX = false;
            timerSEX.isFinishedSEX = timerSEX.intervalsDoneSEX === timerSettingsSEX.intervalCountSEX;
            if (!timerSEX.isFinishedSEX) {
                timerSEX.elapsedInIntervalSEX = 1;
            }
            if (timerSEX.isFinishedSEX) {
                setTimerControlsDisabledStateSEX(false, true, true);
                setFormDisabledStateSEX(false);
                stopTimerTickSEX();
            } else {
                timerSEX.totalTimeElapsedSEX++;
            }
            updateInfoSEX();
        }
        updateInfoSEX();
    } else if (timerSEX.elapsedInIntervalSEX <= currentIntervalDurationSEX && timerSEX.isBreak2SEX) {
        timerSEX.elapsedInIntervalSEX++;
        if (timerSEX.elapsedInIntervalSEX > currentIntervalDurationSEX && timerSEX.isBreak2SEX) {
            if (!ismuteSEX) {
                audioListSEX[0].muted = false;
                audioListSEX[0].play();
            }
            timerSEX.isBreak3SEX = true;
            timerSEX.isBreak2SEX = false;
            timerSEX.intervalsDoneSEX++;
            timerSEX.isFinishedSEX = timerSEX.intervalsDoneSEX === timerSettingsSEX.intervalCountSEX;
            if (!timerSEX.isFinishedSEX) {
                timerSEX.elapsedInIntervalSEX = 1;
            }
            if (timerSEX.isFinishedSEX) {
                setTimerControlsDisabledStateSEX(false, true, true);
                setFormDisabledStateSEX(false);
                stopTimerTickSEX();
            } else {
                timerSEX.totalTimeElapsedSEX++;
            }
            updateInfoSEX();
        }
        updateInfoSEX();
    }
}

function updateInfoSEX() {
    statusPanelSEX.timeOverviewMessageSEX.style.display = timerSEX.isFinishedSEX ? 'block' : null;
    statusPanelSEX.elapsedInIntervalBoxSEX.style.display = timerSEX.isFinishedSEX || timerSEX.isBreakSEX || timerSEX.isBreak2SEX || timerSEX.isBreak4SEX ? 'none' : null;
    statusPanelSEX.elapsedInBreakIntervalBoxSEX.style.display = !timerSEX.isFinishedSEX && timerSEX.isBreakSEX ? 'block' : null;
    statusPanelSEX.elapsedInBreakIntervalBox2SEX.style.display = !timerSEX.isFinishedSEX && timerSEX.isBreak2SEX ? 'block' : null;
    if (timerSEX.isBreakSEX) {
        statusPanelSEX.elapsedInBreakIntervalSEX.textContent = timerSEX.elapsedInIntervalSEX;
    } else if (timerSEX.isBreak2SEX) {
        statusPanelSEX.elapsedInBreakInterval2SEX.textContent = timerSEX.elapsedInIntervalSEX;
    } else {
        statusPanelSEX.elapsedInIntervalSEX.textContent = timerSEX.elapsedInIntervalSEX;
    }
    statusPanelSEX.intervalsDoneSEX.value = timerSEX.intervalsDoneSEX;
}
//---------------------------------------------------//
