//BRW JS//
const songSelectBRW = document.getElementById('song-selectBRW');
const audioPlayerBRW = document.getElementById('audio-playerBRW');
var isBRWON = false;
// Variable to store the timeout ID
let timeoutIdBRW;


// Function to play the selected song
const playSelectedSongBRW = () => {
    const selectedSongBRW = songSelectBRW.value;
    audioPlayerBRW.src = selectedSongBRW;
    if (isBRWON != true) {
        audioPlayerBRW.muted = false;
        audioPlayerBRW.play();
        localStorage.setItem('selectedSongBRW', songSelectBRW.value);
        // Clear any existing timeout
        clearTimeout(timeoutIdBRW);
        timeoutIdBRW = setTimeout(function () {
            audioPlayerBRW.pause();
            audioPlayerBRW.currentTime = 0;
        }, 15000);
    }
    else {
        audioPlayerBRW.muted = false;
        audioPlayerBRW.loop = true;
        audioPlayerBRW.play();
        clearTimeout(timeoutIdBRW);
    }
};

const storedSongBRW = localStorage.getItem('selectedSongBRW');
if (storedSongBRW) {
    // Set the value of the songSelect dropdown to the stored song
    songSelectBRW.value = storedSongBRW;
}

// Add an event listener to the songSelectBRW dropdown
songSelectBRW.addEventListener('change', function () {
    // Stop the currently playing song
    audioPlayerBRW.pause();
    audioPlayerBRW.currentTime = 0;

    // Play the selected song
    playSelectedSongBRW();
});


$(function () {
    $('#BRWForm').on('submit', function (e) {
        e.preventDefault(); // Prevent the default form submission

        var formData = new FormData(this); // Get the form

        $.ajax({
            url: "/",
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function (result) {
                $('#BRWResultSaved').html(result); // Update the result section with the server response
            }
        });
        clearInterval(intBRW);
        [secondsBRW, minutesBRW, hoursBRW] = [0, 0, 0];
        timerRefBRW.value = '00 : 00 : 00';
        audioPlayerBRW.currentTime = 0
        timerControlsButtonsBRW.pauseBRW.style.display = 'none';
        timerControlsButtonsBRW.startBRW.style.display = 'inline';
        setFormDisabledStateBRW(false);
        setTimerControlsDisabledStateBRW(false, true, true);
        timerControlsButtonsBRW.stopBRW.style.color = "rgb(177, 177, 177)";
        document.getElementById('BRWSave').disabled = true;
        document.getElementById('BRWSave').style.color = 'rgb(177, 177, 177)';
        stopTimerTickBRW();
        resetTimerBRW();
        isBRWON = false;
    });
});

let
    formSettingsFieldsBRW,
    timerControlsButtonsBRW,
    statusPanelBRW,
    timerBRW,
    timerSettingsBRW;

function setTimerSettingsBRW(
    intervalCountBRW = timerSettingsBRW.intervalCountBRW,
    intervalDurationBRW = timerSettingsBRW.intervalDurationBRW,
    enableBreakBRW = timerSettingsBRW.enableBreakBRW,
    breakDurationBRW = timerSettingsBRW.breakDurationBRW,
    enableBreak2BRW = timerSettingsBRW.enableBreak2BRW,
    breakDuration2BRW = timerSettingsBRW.breakDuration2BRW,
    enableBreak3BRW = timerSettingsBRW.enableBreak3BRW,
    breakDuration3BRW = timerSettingsBRW.breakDuration3BRW,
    enableBreak4BRW = timerSettingsBRW.enableBreak4BRW,
    breakDuration4BRW = timerSettingsBRW.breakDuration4BRW,
) {
    timerSettingsBRW = {
        intervalCountBRW,
        intervalDurationBRW,
        enableBreakBRW,
        breakDurationBRW,
        enableBreak2BRW,
        breakDuration2BRW,
        enableBreak3BRW,
        breakDuration3BRW,
        enableBreak4BRW,
        breakDuration4BRW
    };
}

function resetTimerBRW() {
    timerBRW = {
        totalTimeElapsedBRW: 0,
        elapsedInIntervalBRW: 0,
        intervalsDoneBRW: 0,
        isBreak0BRW: true,
        isBreakBRW: false,
        isBreak2BRW: false,
        isBreak3BRW: false,
        isBreak4BRW: false,
        isFinishedBRW: false
    };
    updateInfoBRW();
}

let [secondsBRW, minutesBRW, hoursBRW] = [0, 0, 0];
let timerRefBRW = document.getElementById('timerDisplayBRW');
let intBRW = null;
document.getElementById('BRWSave').disabled = true;
document.getElementById('BRWSave').style.color = 'rgb(177, 177, 177)';
var audioListBRW = []
audioListBRW.push(new Audio('/sounds/breathein.mp3'));
audioListBRW.push(new Audio('/sounds/holdyourbreath.mp3'));
audioListBRW.push(new Audio('/sounds/exhale.mp3'));
audioListBRW.push(new Audio('/sounds/hold.mp3'));

var audioBRW = document.getElementById("audioBRW"),
    muteBRW = document.getElementById("muteBRW"),
    ismuteBRW = false;

audioPlayerBRW.loop = true;

var audioSongBRW = document.getElementById("songBRW"),
    muteSongBRW = document.getElementById("songMuteBRW"),
    isSongMuteBRW = false;

// Get the volumeVbre bar element
const volumeVoiceBRW = document.getElementById('volumeVoiceBRW');

// Add an event listener for the volumeVbre change event
volumeVoiceBRW.addEventListener('input', function () {
    // Get the current volumeVbre value
    const volumeVbrw = parseFloat(volumeVoiceBRW.value);

    // Check if volumeVbre is 0 and mute the media if necessary
    if (volumeVbrw === 0) {
        audioListBRW[0].muted = true;
        audioListBRW[1].muted = true;
        audioListBRW[2].muted = true;
        audioListBRW[3].muted = true;
        audioBRW.style.display = "none";
        muteBRW.style.display = "block";
        ismuteBRW = true;
    } else {
        audioListBRW[0].muted = false;
        audioListBRW[1].muted = false;
        audioListBRW[2].muted = false;
        audioListBRW[3].muted = false;
        muteBRW.style.display = "none";
        audioBRW.style.display = "block";
        ismuteBRW = false;
    }
});
// Get the volumeSbre bar element
const volumeSongBRW = document.getElementById('volumeSongBRW');

// Add an event listener for the volumeSbre change event
volumeSongBRW.addEventListener('input', function () {
    // Get the current volumeSbre value
    const volumeSbrw = parseFloat(volumeSongBRW.value);

    // Check if volumeSbre is 0 and mute the media if necessary
    if (volumeSbrw === 0) {
        audioPlayerBRW.muted = true;
        audioSongBRW.style.display = "none";
        muteSongBRW.style.display = "block";
        isSongMuteBRW = true;
    } else {
        audioPlayerBRW.muted = false;
        muteSongBRW.style.display = "none";
        audioSongBRW.style.display = "block";
        isSongMuteBRW = false;
    }
});

var inhaleBRW = 4;
var holdBRW = inhaleBRW;
var exhaleBRW = inhaleBRW;
var hold2BRW = inhaleBRW;
var hold3BRW = inhaleBRW;
setTimerSettingsBRW(9999, inhaleBRW, true, holdBRW, true, exhaleBRW, true, hold2BRW, true, hold3BRW);
initializeTimerControlsBRW();
initializeStatusPanelBRW();
initializeTimerSettingsFormBRW();
resetTimerBRW();

var minusBtnBRW = document.getElementById("minusBRW"),
    plusBtnBRW = document.getElementById("plusBRW"),
    numberBRW = 4, /// numberBRW value
    minBRW = 2, /// minBRW numberBRW
    maxBRW = 5;

minusBtnBRW.onclick = function () {
    if (numberBRW > minBRW) {
        numberBRW = numberBRW - 1; /// Minus 1 of the numberBRW
        formSettingsFieldsBRW.intervalDurationBRW.value = 4; /// Display the value in place of the numberBRW
        //fix here to change pranayama type
        formSettingsFieldsBRW.breakDurationBRW.value = 4;
        formSettingsFieldsBRW.breakDuration2BRW.value = 4;
        formSettingsFieldsBRW.breakDuration3BRW.value = 4;
        formSettingsFieldsBRW.breakDuration4BRW.value = numberBRW;
        setTimerSettingsBRW(9999, formSettingsFieldsBRW.intervalDurationBRW.value, true, formSettingsFieldsBRW.breakDurationBRW.value, true, formSettingsFieldsBRW.breakDuration2BRW.value, true, formSettingsFieldsBRW.breakDuration3BRW.value, true, formSettingsFieldsBRW.breakDuration4BRW.value);
    }
}

plusBtnBRW.onclick = function () {
    if (numberBRW < maxBRW) {
        numberBRW = numberBRW + 1;
        formSettingsFieldsBRW.intervalDurationBRW.value = 4; /// Display the value in place of the numberBRW
        //fix here to change pranayama type
        formSettingsFieldsBRW.breakDurationBRW.value = 4;
        formSettingsFieldsBRW.breakDuration2BRW.value = 4;
        formSettingsFieldsBRW.breakDuration3BRW.value = 4;
        formSettingsFieldsBRW.breakDuration4BRW.value = numberBRW;
        setTimerSettingsBRW(9999, formSettingsFieldsBRW.intervalDurationBRW.value, true, formSettingsFieldsBRW.breakDurationBRW.value, true, formSettingsFieldsBRW.breakDuration2BRW.value, true, formSettingsFieldsBRW.breakDuration3BRW.value, true, formSettingsFieldsBRW.breakDuration4BRW.value);
    }
}

function initializeTimerSettingsFormBRW() {
    const oneDayInSecondsBRW = 60 * 60 * 24;
    let lastUserSetEnableBreakBRW = timerSettingsBRW.enableBreakBRW;
    let lastUserSetEnableBreak2BRW = timerSettingsBRW.enableBreak2BRW;
    let lastUserSetEnableBreak3BRW = timerSettingsBRW.enableBreak3BRW;
    let lastUserSetEnableBreak4BRW = timerSettingsBRW.enableBreak4BRW;

    formSettingsFieldsBRW = {
        intervalCountBRW: document.getElementById('intervalCountInputBRW'),
        intervalDurationBRW: document.getElementById('intervalDurationInputBRW'),
        enableBreakBRW: document.getElementById('enableBreakInputBRW'),
        breakDurationBRW: document.getElementById('breakDurationInputBRW'),
        enableBreak2BRW: document.getElementById('enableBreakInput2BRW'),
        breakDuration2BRW: document.getElementById('breakDurationInput2BRW'),
        enableBreak3BRW: document.getElementById('enableBreakInput3BRW'),
        breakDuration3BRW: document.getElementById('breakDurationInput3BRW'),
        enableBreak4BRW: document.getElementById('enableBreakInput4BRW'),
        breakDuration4BRW: document.getElementById('breakDurationInput4BRW')
    };

    formSettingsFieldsBRW.intervalCountBRW.value = timerSettingsBRW.intervalCountBRW;
    formSettingsFieldsBRW.intervalDurationBRW.value = timerSettingsBRW.intervalDurationBRW;
    formSettingsFieldsBRW.enableBreakBRW.checked = timerSettingsBRW.enableBreakBRW;
    formSettingsFieldsBRW.breakDurationBRW.value = timerSettingsBRW.breakDurationBRW;
    formSettingsFieldsBRW.enableBreak2BRW.checked = timerSettingsBRW.enableBreak2BRW;
    formSettingsFieldsBRW.breakDuration2BRW.value = timerSettingsBRW.breakDuration2BRW;
    formSettingsFieldsBRW.enableBreak3BRW.checked = timerSettingsBRW.enableBreak3BRW;
    formSettingsFieldsBRW.breakDuration3BRW.value = timerSettingsBRW.breakDuration3BRW;
    formSettingsFieldsBRW.enableBreak4BRW.checked = timerSettingsBRW.enableBreak4BRW;
    formSettingsFieldsBRW.breakDuration4BRW.value = timerSettingsBRW.breakDuration4BRW;

    function getNumberInBoundsOrDefaultBRW(value, minBRW, maxBRW, def = 1) {
        const valueAsNumberBRW = parseInt(value);
        return isNaN(valueAsNumberBRW) ? def : Math.max(minBRW, Math.min(valueAsNumberBRW, maxBRW));
    }

    function setBreakDurationLineDisplayBRW(displayed) {
        const breakDurationInputLineEltBRW = document.getElementById('breakDurationInputLineBRW');
        breakDurationInputLineEltBRW.style.display = displayed ? null : 'none';
        const breakDurationInputLineElt2BRW = document.getElementById('breakDurationInputLine2BRW');
        breakDurationInputLineElt2BRW.style.display = displayed ? null : 'none';
        const breakDurationInputLineElt3BRW = document.getElementById('breakDurationInputLine3BRW');
        breakDurationInputLineElt3BRW.style.display = displayed ? null : 'none';
        const breakDurationInputLineElt4BRW = document.getElementById('breakDurationInputLine4BRW');
        breakDurationInputLineElt4BRW.style.display = displayed ? null : 'none';
    }

    formSettingsFieldsBRW.intervalCountBRW.addEventListener('input', () => {
        const intervalCountBRW = getNumberInBoundsOrDefaultBRW(formSettingsFieldsBRW.intervalCountBRW.value, 1, 9999),
            hasOneIntervalBRW = intervalCountBRW === 1,
            hasBreakBRW = hasOneIntervalBRW ? false : lastUserSetEnableBreakBRW;

        formSettingsFieldsBRW.enableBreakBRW.disabled = hasOneIntervalBRW === true;
        formSettingsFieldsBRW.enableBreakBRW.checked = hasBreakBRW;

        setBreakDurationLineDisplayBRW(hasBreakBRW);

        setTimerSettingsBRW(intervalCountBRW, undefined, hasBreakBRW);
        updateInfoBRW();
    });

    formSettingsFieldsBRW.intervalDurationBRW.addEventListener('input', () => {
        setTimerSettingsBRW(undefined, getNumberInBoundsOrDefaultBRW(formSettingsFieldsBRW.intervalDurationBRW.value, 1, oneDayInSecondsBRW));
        updateInfoBRW();
    });

    formSettingsFieldsBRW.enableBreakBRW.addEventListener('change', () => {
        const enableBreakBRW = formSettingsFieldsBRW.enableBreakBRW.checked;

        lastUserSetEnableBreakBRW = enableBreakBRW;
        setBreakDurationLineDisplayBRW(enableBreakBRW);
        setTimerSettingsBRW(undefined, undefined, enableBreakBRW);
        updateInfoBRW();
    });

    formSettingsFieldsBRW.breakDurationBRW.addEventListener('input', () => {
        setTimerSettingsBRW(undefined, undefined, undefined,
            getNumberInBoundsOrDefaultBRW(formSettingsFieldsBRW.breakDurationBRW.value, 1, oneDayInSecondsBRW)
        );
        updateInfoBRW();
    });

    formSettingsFieldsBRW.enableBreak2BRW.addEventListener('change', () => {
        const enableBreak2BRW = formSettingsFieldsBRW.enableBreak2BRW.checked;

        lastUserSetEnableBreak2BRW = enableBreak2BRW;
        setBreakDurationLineDisplayBRW(enableBreak2BRW);
        setTimerSettingsBRW(undefined, undefined, undefined, undefined, enableBreak2BRW);
        updateInfoBRW();
    });

    formSettingsFieldsBRW.breakDuration2BRW.addEventListener('input', () => {
        setTimerSettingsBRW(undefined, undefined, undefined, undefined, undefined,
            getNumberInBoundsOrDefaultBRW(formSettingsFieldsBRW.breakDuration2BRW.value, 1, oneDayInSecondsBRW)
        );
        updateInfoBRW();
    });

    formSettingsFieldsBRW.enableBreak3BRW.addEventListener('change', () => {
        const enableBreak3BRW = formSettingsFieldsBRW.enableBreak3BRW.checked;

        lastUserSetEnableBreak3BRW = enableBreak2BRW;
        setBreakDurationLineDisplayBRW(enableBreak3BRW);
        setTimerSettingsBRW(undefined, undefined, undefined, undefined, undefined, undefined, enableBreak3BRW);
        updateInfoBRW();
    });

    formSettingsFieldsBRW.breakDuration3BRW.addEventListener('input', () => {
        setTimerSettingsBRW(
            undefined, undefined, undefined, undefined, undefined, undefined, undefined,
            getNumberInBoundsOrDefaultBRW(formSettingsFieldsBRW.breakDuration3BRW.value, 1, oneDayInSecondsBRW)
        );
        updateInfoBRW();
    });

    formSettingsFieldsBRW.enableBreak4BRW.addEventListener('change', () => {
        const enableBreak4BRW = formSettingsFieldsBRW.enableBreak4BRW.checked;

        lastUserSetEnableBreak4BRW = enableBreak2BRW;
        setBreakDurationLineDisplayBRW(enableBreak4BRW);
        setTimerSettingsBRW(undefined, undefined, undefined, undefined, undefined, undefined, undefined, enableBreak4BRW);
        updateInfoBRW();
    });

    formSettingsFieldsBRW.breakDuration4BRW.addEventListener('input', () => {
        setTimerSettingsBRW(
            undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined,
            getNumberInBoundsOrDefaultBRW(formSettingsFieldsBRW.breakDuration4BRW.value, 1, oneDayInSecondsBRW)
        );
        updateInfoBRW();
    });
}

function initializeTimerControlsBRW() {
    timerControlsButtonsBRW = {
        startBRW: document.getElementById('startBtnBRW'),
        pauseBRW: document.getElementById('pauseBtnBRW'),
        stopBRW: document.getElementById('stopBtnBRW'),
    };

    setTimerControlsDisabledStateBRW(false, true, true);

    timerControlsButtonsBRW.startBRW.addEventListener('click', startTimerBRW);
    timerControlsButtonsBRW.pauseBRW.addEventListener('click', pauseTimerBRW);
    timerControlsButtonsBRW.stopBRW.addEventListener('click', stopTimerBRW);
}

function initializeStatusPanelBRW() {
    statusPanelBRW = {
        timeOverviewMessageBRW: document.getElementById('timeOverviewMessageBRW'),

        elapsedInIntervalBoxBRW: document.getElementById('elapsedInIntervalBoxBRW'),
        elapsedInBreakIntervalBoxBRW: document.getElementById('elapsedInBreakIntervalBoxBRW'),
        elapsedInIntervalBRW: document.getElementById('elapsedInIntervalBRW'),
        elapsedInBreakIntervalBRW: document.getElementById('elapsedInBreakIntervalBRW'),
        elapsedInBreakIntervalBox2BRW: document.getElementById('elapsedInBreakIntervalBox2BRW'),
        elapsedInBreakInterval2BRW: document.getElementById('elapsedInBreakInterval2BRW'),
        elapsedInBreakIntervalBox3BRW: document.getElementById('elapsedInBreakIntervalBox3BRW'),
        elapsedInBreakInterval3BRW: document.getElementById('elapsedInBreakInterval3BRW'),
        elapsedInBreakIntervalBox4BRW: document.getElementById('elapsedInBreakIntervalBox4BRW'),
        elapsedInBreakInterval4BRW: document.getElementById('elapsedInBreakInterval4BRW'),
        intervalsDoneBRW: document.getElementById('intervalsDoneBRW'),
    };
}

function setTimerControlsDisabledStateBRW(startBRW, pauseBRW, stopBRW) {
    timerControlsButtonsBRW.startBRW.disabled = startBRW;
    timerControlsButtonsBRW.pauseBRW.disabled = pauseBRW;
    timerControlsButtonsBRW.stopBRW.disabled = stopBRW;
}

function setFormDisabledStateBRW(disabled) {
    formSettingsFieldsBRW.intervalCountBRW.disabled = disabled;
    formSettingsFieldsBRW.intervalDurationBRW.disabled = disabled;
    formSettingsFieldsBRW.enableBreakBRW.disabled = disabled || timerSettingsBRW.intervalCountBRW === 1;
    formSettingsFieldsBRW.breakDurationBRW.disabled = disabled;
    formSettingsFieldsBRW.enableBreak2BRW.disabled = disabled
    formSettingsFieldsBRW.breakDuration2BRW.disabled = disabled;
    formSettingsFieldsBRW.enableBreak3BRW.disabled = disabled
    formSettingsFieldsBRW.breakDuration3BRW.disabled = disabled;
    formSettingsFieldsBRW.enableBreak4BRW.disabled = disabled
    formSettingsFieldsBRW.breakDuration4BRW.disabled = disabled;
    minusBtnBRW.disabled = disabled;
    plusBtnBRW.disabled = disabled;
}

function startTimerBRW() {
    if (intBRW !== null) {
        clearInterval(intBRW);
    }
    intBRW = setInterval(displayTimerBRW, 1000);
    setFormDisabledStateBRW(true);
    setTimerControlsDisabledStateBRW(true, false, true);
    timerControlsButtonsBRW.stopBRW.style.color = "rgb(177, 177, 177)";
    if (timerBRW.isBreak0BRW) {
        audioListBRW[2].muted = true;
        audioListBRW[3].muted = true;
        audioListBRW[2].play();
        audioListBRW[3].play();
        setTimeout(function () {
            audioListBRW[2].pause();
            audioListBRW[2].currentTime = 0
            audioListBRW[3].pause();
            audioListBRW[3].currentTime = 0
        }, 1000);
        if (!ismuteBRW) {
            audioListBRW[0].play();
        }
    }
    isBRWON = true;
    if (isSongMuteBRW != true) {
        playSelectedSongBRW();
    }
    if (timerBRW.isFinishedBRW) {
        resetTimerBRW();
    }
    startTimerTickBRW();
    timerControlsButtonsBRW.startBRW.style.display = 'none';
    timerControlsButtonsBRW.pauseBRW.style.display = 'inline';
    document.getElementById('BRWSave').disabled = true;
    document.getElementById('BRWSave').style.color = 'rgb(177, 177, 177)';
    document.getElementById('brwSettings').disabled = true;
    document.getElementById('brwSettings').style.color = 'rgb(177, 177, 177)';
}

function pauseTimerBRW() {
    clearInterval(intBRW);
    setTimerControlsDisabledStateBRW(false, true, false);
    document.getElementById('stopBtnBRW').style.color = '#990000';
    timerControlsButtonsBRW.pauseBRW.style.display = 'none';
    timerControlsButtonsBRW.startBRW.style.display = 'inline';
    if (isSongMuteBRW != true) {
        audioPlayerBRW.pause();
    }
    stopTimerTickBRW();
    isBRWON = false;
    document.getElementById('BRWDate').value = date;
    document.getElementById('BRWSave').disabled = false;
    document.getElementById('BRWSave').style.color = '#49B79D';
    document.getElementById('brwSettings').disabled = false;
    document.getElementById('brwSettings').style.color = '#49B79D';
}

function stopTimerBRW() {
    clearInterval(intBRW);
    [secondsBRW, minutesBRW, hoursBRW] = [0, 0, 0];
    timerRefBRW.value = '00 : 00 : 00';
    if (isSongMuteBRW != true) {
        audioPlayerBRW.pause();
    }
    audioPlayerBRW.currentTime = 0
    timerControlsButtonsBRW.pauseBRW.style.display = 'none';
    timerControlsButtonsBRW.startBRW.style.display = 'inline';
    setFormDisabledStateBRW(false);
    setTimerControlsDisabledStateBRW(false, true, true);
    timerControlsButtonsBRW.stopBRW.style.color = "rgb(177, 177, 177)";
    document.getElementById('BRWSave').disabled = true;
    document.getElementById('BRWSave').style.color = 'rgb(177, 177, 177)';
    stopTimerTickBRW();
    resetTimerBRW();
    isBRWON = false;
}

function displayTimerBRW() {
    secondsBRW++;
    if (secondsBRW == 60) {
        secondsBRW = 0;
        minutesBRW++;
        if (minutesBRW == 60) {
            minutesBRW = 0;
            hoursBRW++;
        }
    }
    let hBRW = hoursBRW < 10 ? "0" + hoursBRW : hoursBRW;
    let mBRW = minutesBRW < 10 ? "0" + minutesBRW : minutesBRW;
    let sBRW = secondsBRW < 10 ? "0" + secondsBRW : secondsBRW;
    timerRefBRW.value = `${hBRW} : ${mBRW} : ${sBRW}`;
}

function startTimerTickBRW() {
    timerBRW.intervalId = setInterval(onTimerTickBRW, 1000);
}

function stopTimerTickBRW() {
    clearInterval(timerBRW.intervalId);
}

function onTimerTickBRW() {
    const currentIntervalDurationBRW = timerBRW.isBreakBRW ? timerSettingsBRW.breakDurationBRW : timerBRW.isBreak2BRW ? timerSettingsBRW.breakDuration2BRW : timerBRW.isBreak3BRW ? timerSettingsBRW.breakDuration3BRW : timerBRW.isBreak4BRW ? timerSettingsBRW.breakDuration4BRW : timerSettingsBRW.intervalDurationBRW;
    if (timerBRW.elapsedInIntervalBRW <= currentIntervalDurationBRW && timerBRW.isBreak0BRW) {
        timerBRW.elapsedInIntervalBRW++;
        if (timerBRW.elapsedInIntervalBRW > currentIntervalDurationBRW && timerBRW.isBreak0BRW) {
            if (!ismuteBRW) {
                audioListBRW[2].muted = false;
                audioListBRW[2].play();
            }
            timerBRW.isBreakBRW = true;
            timerBRW.isBreak0BRW = false;
            timerBRW.isFinishedBRW = timerBRW.intervalsDoneBRW === timerSettingsBRW.intervalCountBRW;
            if (!timerBRW.isFinishedBRW) {
                timerBRW.elapsedInIntervalBRW = 1;
            }
            if (timerBRW.isFinishedBRW) {
                setTimerControlsDisabledStateBRW(false, true, true);
                setFormDisabledStateBRW(false);
                stopTimerTickBRW();
            } else {
                timerBRW.totalTimeElapsedBRW++;
            }
            updateInfoBRW();
        }
        updateInfoBRW();
    } else if (timerBRW.elapsedInIntervalBRW <= currentIntervalDurationBRW && timerBRW.isBreakBRW) {
        timerBRW.elapsedInIntervalBRW++;
        if (timerBRW.elapsedInIntervalBRW > currentIntervalDurationBRW && timerBRW.isBreakBRW) {
            if (!ismuteBRW) {
                audioListBRW[0].muted = false;
                audioListBRW[0].play();
            }
            timerBRW.isBreak2BRW = true;
            timerBRW.isBreakBRW = false;
            timerBRW.isFinishedBRW = timerBRW.intervalsDoneBRW === timerSettingsBRW.intervalCountBRW;
            if (!timerBRW.isFinishedBRW) {
                timerBRW.elapsedInIntervalBRW = 1;
            }
            if (timerBRW.isFinishedBRW) {
                setTimerControlsDisabledStateBRW(false, true, true);
                setFormDisabledStateBRW(false);
                stopTimerTickBRW();
            } else {
                timerBRW.totalTimeElapsedBRW++;
            }
            updateInfoBRW();
        }
        updateInfoBRW();
    } else if (timerBRW.elapsedInIntervalBRW <= currentIntervalDurationBRW && timerBRW.isBreak2BRW) {
        timerBRW.elapsedInIntervalBRW++;
        if (timerBRW.elapsedInIntervalBRW > currentIntervalDurationBRW && timerBRW.isBreak2BRW) {
            if (!ismuteBRW) {
                audioListBRW[2].muted = false;
                audioListBRW[2].play();
            }
            timerBRW.isBreak3BRW = true;
            timerBRW.isBreak2BRW = false;
            timerBRW.isFinishedBRW = timerBRW.intervalsDoneBRW === timerSettingsBRW.intervalCountBRW;
            if (!timerBRW.isFinishedBRW) {
                timerBRW.elapsedInIntervalBRW = 1;
            }
            if (timerBRW.isFinishedBRW) {
                setTimerControlsDisabledStateBRW(false, true, true);
                setFormDisabledStateBRW(false);
                stopTimerTickBRW();
            } else {
                timerBRW.totalTimeElapsedBRW++;
            }
            updateInfoBRW();
        }
        updateInfoBRW();
    } else if (timerBRW.elapsedInIntervalBRW <= currentIntervalDurationBRW && timerBRW.isBreak3BRW) {
        timerBRW.elapsedInIntervalBRW++;
        if (timerBRW.elapsedInIntervalBRW > currentIntervalDurationBRW && timerBRW.isBreak3BRW) {
            if (!ismuteBRW) {
                audioListBRW[3].muted = false;
                audioListBRW[3].play();
            }
            timerBRW.isBreak4BRW = true;
            timerBRW.isBreak3BRW = false;
            timerBRW.isFinishedBRW = timerBRW.intervalsDoneBRW === timerSettingsBRW.intervalCountBRW;
            if (!timerBRW.isFinishedBRW) {
                timerBRW.elapsedInIntervalBRW = 1;
            }
            if (timerBRW.isFinishedBRW) {
                setTimerControlsDisabledStateBRW(false, true, true);
                setFormDisabledStateBRW(false);
                stopTimerTickBRW();
            } else {
                timerBRW.totalTimeElapsedBRW++;
            }
            updateInfoBRW();
        }
        updateInfoBRW();
    }
    else if (timerBRW.elapsedInIntervalBRW <= currentIntervalDurationBRW && timerBRW.isBreak4BRW) {
        timerBRW.elapsedInIntervalBRW++;
        if (timerBRW.elapsedInIntervalBRW > currentIntervalDurationBRW && timerBRW.isBreak4BRW) {
            if (!ismuteBRW) {
                audioListBRW[0].muted = false;
                audioListBRW[0].play();
            }
            timerBRW.isBreak0BRW = true;
            timerBRW.isBreak4BRW = false;
            timerBRW.intervalsDoneBRW++;
            timerBRW.isFinishedBRW = timerBRW.intervalsDoneBRW === timerSettingsBRW.intervalCountBRW;
            if (!timerBRW.isFinishedBRW) {
                timerBRW.elapsedInIntervalBRW = 1;
            }
            if (timerBRW.isFinishedBRW) {
                setTimerControlsDisabledStateBRW(false, true, true);
                setFormDisabledStateBRW(false);
                stopTimerTickBRW();
            } else {
                timerBRW.totalTimeElapsedBRW++;
            }
            updateInfoBRW();
        }
        updateInfoBRW();
    }
}

function updateInfoBRW() {
    statusPanelBRW.timeOverviewMessageBRW.style.display = timerBRW.isFinishedBRW ? 'block' : null;
    statusPanelBRW.elapsedInIntervalBoxBRW.style.display = timerBRW.isFinishedBRW || timerBRW.isBreakBRW || timerBRW.isBreak2BRW || timerBRW.isBreak3BRW || timerBRW.isBreak4BRW ? 'none' : null;
    statusPanelBRW.elapsedInBreakIntervalBoxBRW.style.display = !timerBRW.isFinishedBRW && timerBRW.isBreakBRW ? 'block' : null;
    statusPanelBRW.elapsedInBreakIntervalBox2BRW.style.display = !timerBRW.isFinishedBRW && timerBRW.isBreak2BRW ? 'block' : null;
    statusPanelBRW.elapsedInBreakIntervalBox3BRW.style.display = !timerBRW.isFinishedBRW && timerBRW.isBreak3BRW ? 'block' : null;
    statusPanelBRW.elapsedInBreakIntervalBox4BRW.style.display = !timerBRW.isFinishedBRW && timerBRW.isBreak4BRW ? 'block' : null;

    if (timerBRW.isBreakBRW) {
        statusPanelBRW.elapsedInBreakIntervalBRW.textContent = timerBRW.elapsedInIntervalBRW;
    } else if (timerBRW.isBreak2BRW) {
        statusPanelBRW.elapsedInBreakInterval2BRW.textContent = timerBRW.elapsedInIntervalBRW;
    } else if (timerBRW.isBreak3BRW) {
        statusPanelBRW.elapsedInBreakInterval3BRW.textContent = timerBRW.elapsedInIntervalBRW;
    } else if (timerBRW.isBreak4BRW) {
        statusPanelBRW.elapsedInBreakInterval4BRW.textContent = timerBRW.elapsedInIntervalBRW;
    } else {
        statusPanelBRW.elapsedInIntervalBRW.textContent = timerBRW.elapsedInIntervalBRW;
    }
    statusPanelBRW.intervalsDoneBRW.value = timerBRW.intervalsDoneBRW;
}
//-----------------------------------------------------//