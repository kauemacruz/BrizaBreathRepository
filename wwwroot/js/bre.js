//BRE JS//
const BREball = document.getElementById('BREball');
const BREballText = document.getElementById('BREballText');

function BREchangeBall(scale, duration) {
    BREball.style.transition = `transform ${duration}s ease`;
    BREball.style.transform = `scale(${scale})`;
}

const BREtimeInput = document.getElementById('BREtimeInput');
const BREcountdownDisplay = document.getElementById('BREcountdownDisplay');
let BREcountdown;
let BREtimeRemaining = Infinity;
let BREisPaused = false;
// Populate the dropdown with options
for (let BREi = 2; BREi <= 60; BREi++) { // assuming 1 to 60 minutes
    let BREoption = document.createElement('option');
    BREoption.value = BREi * 60;
    if (isPortuguese) {
        BREoption.textContent = BREi + ' minutos';
    } else {
        BREoption.textContent = BREi + ' minutes';
    }
    BREtimeInput.appendChild(BREoption);
}

const BREmodal = document.getElementById("BREmodal");
const BREcloseModal = document.getElementById("BREcloseModal");
const BREBTN = document.getElementById("BREBTN");

function BREopenmodal() {
    BREmodal.style.display = "block";
    audioObjects.inhale.load();
    audioObjects.exhale.load();
    audioObjects.hold.load();
}
// Function to close the modal
function BREclose() {
    BREmodal.style.display = "none";
    clearInterval(intBRE);
    [secondsBRE, minutesBRE, hoursBRE] = [0, 0, 0];
    timerRefBRE.value = '00 : 00 : 00';
    if (!audioPlayerBRT.muted) {
        audioPlayerBRT.pause();
    }
    audioPlayerBRT.currentTime = 0
    timerControlsButtonsBRE.pauseBRE.style.display = 'none';
    timerControlsButtonsBRE.startBRE.style.display = 'inline';
    setFormDisabledStateBRE(false);
    setTimerControlsDisabledStateBRE(false, true, true);
    timerControlsButtonsBRE.stopBRE.style.color = "rgb(177, 177, 177)";
    document.getElementById('BRESave').disabled = true;
    document.getElementById('BRESave').style.color = 'rgb(177, 177, 177)';
    document.getElementById('breSettings').disabled = false;
    document.getElementById('breSettings').style.color = '#49B79D';
    stopTimerTickBRE();
    resetTimerBRE();
    isBREON = false;
    document.getElementById('BREResultSaved').innerHTML = "";
    clearInterval(BREcountdown);
    BREisPaused = false;
    BREtimeInput.classList.remove('CountdownHidden');
    BREcountdownDisplay.classList.add('CountdownHidden');
    BREchangeBall(1, 1);
}
// Event listener for closing the modal
BREcloseModal.addEventListener("click", BREclose);
BREBTN.onclick = function () {
    BREopenmodal();
}
$(function () {
    $('#BREForm').on('submit', function (e) {
        e.preventDefault(); // Prevent the default form submission

        var formData = new FormData(this); // Get the form data

        $.ajax({
            url: "/",
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function (result) {
                $('#BREResultSaved').html(result); // Update the result section with the server response
            }
        });
        clearInterval(intBRE);
        [secondsBRE, minutesBRE, hoursBRE] = [0, 0, 0];
        timerRefBRE.value = '00 : 00 : 00';
        audioPlayerBRT.currentTime = 0
        timerControlsButtonsBRE.pauseBRE.style.display = 'none';
        timerControlsButtonsBRE.startBRE.style.display = 'inline';
        setFormDisabledStateBRE(false);
        setTimerControlsDisabledStateBRE(false, true, true);
        timerControlsButtonsBRE.stopBRE.style.color = "rgb(177, 177, 177)";
        document.getElementById('BRESave').disabled = true;
        document.getElementById('BRESave').style.color = 'rgb(177, 177, 177)';
        stopTimerTickBRE();
        resetTimerBRE();
        BREtimeInput.classList.remove('CountdownHidden');
        BREcountdownDisplay.classList.add('CountdownHidden');
    });
});

let
    formSettingsFieldsBRE,
    timerControlsButtonsBRE,
    statusPanelBRE,
    timerBRE,
    timerSettingsBRE;

function setTimerSettingsBRE(
    intervalCountBRE = timerSettingsBRE.intervalCountBRE,
    intervalDurationBRE = timerSettingsBRE.intervalDurationBRE,
    enableBreakBRE = timerSettingsBRE.enableBreakBRE,
    breakDurationBRE = timerSettingsBRE.breakDurationBRE,
    enableBreak2BRE = timerSettingsBRE.enableBreak2BRE,
    breakDuration2BRE = timerSettingsBRE.breakDuration2BRE,
    enableBreak3BRE = timerSettingsBRE.enableBreak3BRE,
    breakDuration3BRE = timerSettingsBRE.breakDuration3BRE,
    enableBreak4BRE = timerSettingsBRE.enableBreak4BRE,
    breakDuration4BRE = timerSettingsBRE.breakDuration4BRE,
) {
    timerSettingsBRE = {
        intervalCountBRE,
        intervalDurationBRE,
        enableBreakBRE,
        breakDurationBRE,
        enableBreak2BRE,
        breakDuration2BRE,
        enableBreak3BRE,
        breakDuration3BRE,
        enableBreak4BRE,
        breakDuration4BRE
    };
}

function resetTimerBRE() {
    timerBRE = {
        totalTimeElapsedBRE: 0,
        elapsedInIntervalBRE: 0,
        intervalsDoneBRE: 0,
        isBreak0BRE: true,
        isBreakBRE: false,
        isBreak2BRE: false,
        isBreak3BRE: false,
        isBreak4BRE: false,
        isFinishedBRE: false
    };
    updateInfoBRE();
}

let [secondsBRE, minutesBRE, hoursBRE] = [0, 0, 0];
let timerRefBRE = document.getElementById('timerDisplayBRE');
let intBRE = null;
document.getElementById('BRESave').disabled = true;
document.getElementById('BRESave').style.color = 'rgb(177, 177, 177)';


var audioBRE = document.getElementById("audioBRE"),
    muteBRE = document.getElementById("muteBRE"),
    ismuteBRE = false;

audioPlayerBRT.loop = true;

var audioSongBRE = document.getElementById("songBRE"),
    muteSongBRE = document.getElementById("songMuteBRE");
// Get the volumeVbre bar element
const volumeVoiceBRE = document.getElementById('volumeVoiceBRE');

// Add an event listener for the volumeVbre change event
volumeVoiceBRE.addEventListener('input', function () {
    // Get the current volumeVbre value
    const volumeVbre = parseFloat(volumeVoiceBRE.value);

    // Check if volumeVbre is 0 and mute the media if necessary
    if (volumeVbre === 0) {
        audioObjects.inhale.muted = true;
        audioObjects.exhale.muted = true;
        audioObjects.hold.muted = true;
        audioBRE.style.display = "none";
        muteBRE.style.display = "block";
        ismuteBRE = true;
    } else {
        audioObjects.inhale.muted = false;
        audioObjects.exhale.muted = false;
        audioObjects.hold.muted = false;
        muteBRE.style.display = "none";
        audioBRE.style.display = "block";
        ismuteBRE = false;
    }
});
// Get the volumeSbre bar element
const volumeSongBRE = document.getElementById('volumeSongBRE');

// Add an event listener for the volumeSbre change event
volumeSongBRE.addEventListener('input', function () {
    // Get the current volumeSbre value
    const volumeSbre = parseFloat(volumeSongBRE.value);

    // Check if volumeSbre is 0 and mute the media if necessary
    if (volumeSbre === 0) {
        audioPlayerBRT.muted = true;
        audioSongBRE.style.display = "none";
        muteSongBRE.style.display = "block";
    } else {
        audioPlayerBRT.muted = false;
        muteSongBRE.style.display = "none";
        audioSongBRE.style.display = "block";
    }
});


var inhaleBRE = 4;
var holdBRE = inhaleBRE;
var exhaleBRE = inhaleBRE;
var hold2BRE = inhaleBRE;
var hold3BRE = inhaleBRE;
setTimerSettingsBRE(9999, inhaleBRE, true, holdBRE, true, exhaleBRE, true, hold2BRE, true, hold3BRE);
initializeTimerControlsBRE();
initializeStatusPanelBRE();
initializeTimerSettingsFormBRE();
resetTimerBRE();

var minusBtnBRE = document.getElementById("minusBRE"),
    plusBtnBRE = document.getElementById("plusBRE"),
    numberBRE = 4, /// numberBRE value
    minBRE = 2, /// minBRE numberBRE
    maxBRE = 5;

minusBtnBRE.onclick = function () {
    if (numberBRE > minBRE) {
        numberBRE = numberBRE - 1; /// Minus 1 of the numberBRE
        formSettingsFieldsBRE.intervalDurationBRE.value = 4; /// Display the value in place of the numberBRE
        //fix here to change pranayama type
        formSettingsFieldsBRE.breakDurationBRE.value = 4;
        formSettingsFieldsBRE.breakDuration2BRE.value = 4;
        formSettingsFieldsBRE.breakDuration3BRE.value = 4;
        formSettingsFieldsBRE.breakDuration4BRE.value = numberBRE;
        setTimerSettingsBRE(9999, formSettingsFieldsBRE.intervalDurationBRE.value, true, formSettingsFieldsBRE.breakDurationBRE.value, true, formSettingsFieldsBRE.breakDuration2BRE.value, true, formSettingsFieldsBRE.breakDuration3BRE.value, true, formSettingsFieldsBRE.breakDuration4BRE.value);
    }
}

plusBtnBRE.onclick = function () {
    if (numberBRE < maxBRE) {
        numberBRE = numberBRE + 1;
        formSettingsFieldsBRE.intervalDurationBRE.value = 4; /// Display the value in place of the numberBRE
        //fix here to change pranayama type
        formSettingsFieldsBRE.breakDurationBRE.value = 4;
        formSettingsFieldsBRE.breakDuration2BRE.value = 4;
        formSettingsFieldsBRE.breakDuration3BRE.value = 4;
        formSettingsFieldsBRE.breakDuration4BRE.value = numberBRE;
        setTimerSettingsBRE(9999, formSettingsFieldsBRE.intervalDurationBRE.value, true, formSettingsFieldsBRE.breakDurationBRE.value, true, formSettingsFieldsBRE.breakDuration2BRE.value, true, formSettingsFieldsBRE.breakDuration3BRE.value, true, formSettingsFieldsBRE.breakDuration4BRE.value);
    }
}

function initializeTimerSettingsFormBRE() {
    const oneDayInSecondsBRE = 60 * 60 * 24;
    let lastUserSetEnableBreakBRE = timerSettingsBRE.enableBreakBRE;
    let lastUserSetEnableBreak2BRE = timerSettingsBRE.enableBreak2BRE;
    let lastUserSetEnableBreak3BRE = timerSettingsBRE.enableBreak3BRE;
    let lastUserSetEnableBreak4BRE = timerSettingsBRE.enableBreak4BRE;

    formSettingsFieldsBRE = {
        intervalCountBRE: document.getElementById('intervalCountInputBRE'),
        intervalDurationBRE: document.getElementById('intervalDurationInputBRE'),
        enableBreakBRE: document.getElementById('enableBreakInputBRE'),
        breakDurationBRE: document.getElementById('breakDurationInputBRE'),
        enableBreak2BRE: document.getElementById('enableBreakInput2BRE'),
        breakDuration2BRE: document.getElementById('breakDurationInput2BRE'),
        enableBreak3BRE: document.getElementById('enableBreakInput3BRE'),
        breakDuration3BRE: document.getElementById('breakDurationInput3BRE'),
        enableBreak4BRE: document.getElementById('enableBreakInput4BRE'),
        breakDuration4BRE: document.getElementById('breakDurationInput4BRE')
    };

    formSettingsFieldsBRE.intervalCountBRE.value = timerSettingsBRE.intervalCountBRE;
    formSettingsFieldsBRE.intervalDurationBRE.value = timerSettingsBRE.intervalDurationBRE;
    formSettingsFieldsBRE.enableBreakBRE.checked = timerSettingsBRE.enableBreakBRE;
    formSettingsFieldsBRE.breakDurationBRE.value = timerSettingsBRE.breakDurationBRE;
    formSettingsFieldsBRE.enableBreak2BRE.checked = timerSettingsBRE.enableBreak2BRE;
    formSettingsFieldsBRE.breakDuration2BRE.value = timerSettingsBRE.breakDuration2BRE;
    formSettingsFieldsBRE.enableBreak3BRE.checked = timerSettingsBRE.enableBreak3BRE;
    formSettingsFieldsBRE.breakDuration3BRE.value = timerSettingsBRE.breakDuration3BRE;
    formSettingsFieldsBRE.enableBreak4BRE.checked = timerSettingsBRE.enableBreak4BRE;
    formSettingsFieldsBRE.breakDuration4BRE.value = timerSettingsBRE.breakDuration4BRE;

    function getNumberInBoundsOrDefaultBRE(value, minBRE, maxBRE, def = 1) {
        const valueAsNumberBRE = parseInt(value);
        return isNaN(valueAsNumberBRE) ? def : Math.max(minBRE, Math.min(valueAsNumberBRE, maxBRE));
    }

    function setBreakDurationLineDisplayBRE(displayed) {
        const breakDurationInputLineEltBRE = document.getElementById('breakDurationInputLineBRE');
        breakDurationInputLineEltBRE.style.display = displayed ? null : 'none';
        const breakDurationInputLineElt2BRE = document.getElementById('breakDurationInputLine2BRE');
        breakDurationInputLineElt2BRE.style.display = displayed ? null : 'none';
        const breakDurationInputLineElt3BRE = document.getElementById('breakDurationInputLine3BRE');
        breakDurationInputLineElt3BRE.style.display = displayed ? null : 'none';
        const breakDurationInputLineElt4BRE = document.getElementById('breakDurationInputLine4BRE');
        breakDurationInputLineElt4BRE.style.display = displayed ? null : 'none';
    }

    formSettingsFieldsBRE.intervalCountBRE.addEventListener('input', () => {
        const intervalCountBRE = getNumberInBoundsOrDefaultBRE(formSettingsFieldsBRE.intervalCountBRE.value, 1, 9999),
            hasOneIntervalBRE = intervalCountBRE === 1,
            hasBreakBRE = hasOneIntervalBRE ? false : lastUserSetEnableBreakBRE;

        formSettingsFieldsBRE.enableBreakBRE.disabled = hasOneIntervalBRE === true;
        formSettingsFieldsBRE.enableBreakBRE.checked = hasBreakBRE;

        setBreakDurationLineDisplayBRE(hasBreakBRE);

        setTimerSettingsBRE(intervalCountBRE, undefined, hasBreakBRE);
        updateInfoBRE();
    });

    formSettingsFieldsBRE.intervalDurationBRE.addEventListener('input', () => {
        setTimerSettingsBRE(undefined, getNumberInBoundsOrDefaultBRE(formSettingsFieldsBRE.intervalDurationBRE.value, 1, oneDayInSecondsBRE));
        updateInfoBRE();
    });

    formSettingsFieldsBRE.enableBreakBRE.addEventListener('change', () => {
        const enableBreakBRE = formSettingsFieldsBRE.enableBreakBRE.checked;

        lastUserSetEnableBreakBRE = enableBreakBRE;
        setBreakDurationLineDisplayBRE(enableBreakBRE);
        setTimerSettingsBRE(undefined, undefined, enableBreakBRE);
        updateInfoBRE();
    });

    formSettingsFieldsBRE.breakDurationBRE.addEventListener('input', () => {
        setTimerSettingsBRE(undefined, undefined, undefined,
            getNumberInBoundsOrDefaultBRE(formSettingsFieldsBRE.breakDurationBRE.value, 1, oneDayInSecondsBRE)
        );
        updateInfoBRE();
    });

    formSettingsFieldsBRE.enableBreak2BRE.addEventListener('change', () => {
        const enableBreak2BRE = formSettingsFieldsBRE.enableBreak2BRE.checked;

        lastUserSetEnableBreak2BRE = enableBreak2BRE;
        setBreakDurationLineDisplayBRE(enableBreak2BRE);
        setTimerSettingsBRE(undefined, undefined, undefined, undefined, enableBreak2BRE);
        updateInfoBRE();
    });

    formSettingsFieldsBRE.breakDuration2BRE.addEventListener('input', () => {
        setTimerSettingsBRE(undefined, undefined, undefined, undefined, undefined,
            getNumberInBoundsOrDefaultBRE(formSettingsFieldsBRE.breakDuration2BRE.value, 1, oneDayInSecondsBRE)
        );
        updateInfoBRE();
    });

    formSettingsFieldsBRE.enableBreak3BRE.addEventListener('change', () => {
        const enableBreak3BRE = formSettingsFieldsBRE.enableBreak3BRE.checked;

        lastUserSetEnableBreak3BRE = enableBreak2BRE;
        setBreakDurationLineDisplayBRE(enableBreak3BRE);
        setTimerSettingsBRE(undefined, undefined, undefined, undefined, undefined, undefined, enableBreak3BRE);
        updateInfoBRE();
    });

    formSettingsFieldsBRE.breakDuration3BRE.addEventListener('input', () => {
        setTimerSettingsBRE(
            undefined, undefined, undefined, undefined, undefined, undefined, undefined,
            getNumberInBoundsOrDefaultBRE(formSettingsFieldsBRE.breakDuration3BRE.value, 1, oneDayInSecondsBRE)
        );
        updateInfoBRE();
    });

    formSettingsFieldsBRE.enableBreak4BRE.addEventListener('change', () => {
        const enableBreak4BRE = formSettingsFieldsBRE.enableBreak4BRE.checked;

        lastUserSetEnableBreak4BRE = enableBreak2BRE;
        setBreakDurationLineDisplayBRE(enableBreak4BRE);
        setTimerSettingsBRE(undefined, undefined, undefined, undefined, undefined, undefined, undefined, enableBreak4BRE);
        updateInfoBRE();
    });

    formSettingsFieldsBRE.breakDuration4BRE.addEventListener('input', () => {
        setTimerSettingsBRE(
            undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined,
            getNumberInBoundsOrDefaultBRE(formSettingsFieldsBRE.breakDuration4BRE.value, 1, oneDayInSecondsBRE)
        );
        updateInfoBRE();
    });
}

function initializeTimerControlsBRE() {
    timerControlsButtonsBRE = {
        startBRE: document.getElementById('startBtnBRE'),
        pauseBRE: document.getElementById('pauseBtnBRE'),
        stopBRE: document.getElementById('stopBtnBRE'),
    };

    setTimerControlsDisabledStateBRE(false, true, true);

    timerControlsButtonsBRE.startBRE.addEventListener('click', startTimerBRE);
    timerControlsButtonsBRE.pauseBRE.addEventListener('click', pauseTimerBRE);
    timerControlsButtonsBRE.stopBRE.addEventListener('click', stopTimerBRE);
}

function initializeStatusPanelBRE() {
    statusPanelBRE = {
        timeOverviewMessageBRE: document.getElementById('timeOverviewMessageBRE'),

        elapsedInIntervalBoxBRE: document.getElementById('elapsedInIntervalBoxBRE'),
        elapsedInBreakIntervalBoxBRE: document.getElementById('elapsedInBreakIntervalBoxBRE'),
        elapsedInIntervalBRE: document.getElementById('elapsedInIntervalBRE'),
        elapsedInBreakIntervalBRE: document.getElementById('elapsedInBreakIntervalBRE'),
        elapsedInBreakIntervalBox2BRE: document.getElementById('elapsedInBreakIntervalBox2BRE'),
        elapsedInBreakInterval2BRE: document.getElementById('elapsedInBreakInterval2BRE'),
        elapsedInBreakIntervalBox3BRE: document.getElementById('elapsedInBreakIntervalBox3BRE'),
        elapsedInBreakInterval3BRE: document.getElementById('elapsedInBreakInterval3BRE'),
        elapsedInBreakIntervalBox4BRE: document.getElementById('elapsedInBreakIntervalBox4BRE'),
        elapsedInBreakInterval4BRE: document.getElementById('elapsedInBreakInterval4BRE'),
        intervalsDoneBRE: document.getElementById('intervalsDoneBRE'),
    };
}

function setTimerControlsDisabledStateBRE(startBRE, pauseBRE, stopBRE) {
    timerControlsButtonsBRE.startBRE.disabled = startBRE;
    timerControlsButtonsBRE.pauseBRE.disabled = pauseBRE;
    timerControlsButtonsBRE.stopBRE.disabled = stopBRE;
}

function setFormDisabledStateBRE(disabled) {
    formSettingsFieldsBRE.intervalCountBRE.disabled = disabled;
    formSettingsFieldsBRE.intervalDurationBRE.disabled = disabled;
    formSettingsFieldsBRE.enableBreakBRE.disabled = disabled || timerSettingsBRE.intervalCountBRE === 1;
    formSettingsFieldsBRE.breakDurationBRE.disabled = disabled;
    formSettingsFieldsBRE.enableBreak2BRE.disabled = disabled
    formSettingsFieldsBRE.breakDuration2BRE.disabled = disabled;
    formSettingsFieldsBRE.enableBreak3BRE.disabled = disabled
    formSettingsFieldsBRE.breakDuration3BRE.disabled = disabled;
    formSettingsFieldsBRE.enableBreak4BRE.disabled = disabled
    formSettingsFieldsBRE.breakDuration4BRE.disabled = disabled;
    minusBtnBRE.disabled = disabled;
    plusBtnBRE.disabled = disabled;
}
function startTimerBRE() {
    if (intBRE !== null) {
        clearInterval(intBRE);
    }
    setFormDisabledStateBRE(true);
    setTimerControlsDisabledStateBRE(true, true, true);
    setTimeout(() => {
        setTimerControlsDisabledStateBRE(true, false, true);
    }, 2000);
    timerControlsButtonsBRE.stopBRE.style.color = "rgb(177, 177, 177)";
    if (timerBRE.isBreak0BRE) {
        if (!ismuteBRE) {
            audioObjects.bell.muted = false;
            audioObjects.bell.play();
            setTimeout(() => {
                audioObjects.inhale.muted = false;
                audioObjects.inhale.play();
            }, 1500);    
        }
        setTimeout(() => {
            BREchangeBall(1.5, timerSettingsBRE.intervalDurationBRE);
        }, 1500); 
    }
    if (!audioPlayerBRT.muted) {
        playSelectedSongBRT(true);
    }
    if (timerBRE.isFinishedBRE) {
        resetTimerBRE();
    }
    setTimeout(() => {
        setTimeout(() => {
            intBRE = setInterval(displayTimerBRE, 1000);
        }, 1000);
        startTimerTickBRE();
        if (BREisPaused) {
            // Resume from paused state
            BREstartTimer(BREtimeRemaining);
            BREisPaused = false;
        } else {
            // Start a new timer
            clearInterval(BREcountdown);
            BREtimeRemaining = BREtimeInput.value === '∞' ? Infinity : parseInt(BREtimeInput.value);
            BREcountdownDisplay.textContent = '';
            BREstartTimer(BREtimeRemaining);
        }
    }, 1700);  
    timerControlsButtonsBRE.startBRE.style.display = 'none';
    timerControlsButtonsBRE.pauseBRE.style.display = 'inline';
    document.getElementById('BRESave').disabled = true;
    document.getElementById('BRESave').style.color = 'rgb(177, 177, 177)';
    document.getElementById('breSettings').disabled = true;
    document.getElementById('breSettings').style.color = 'rgb(177, 177, 177)';
}
function BREstartTimer(BREduration) {
    BREcountdown = setInterval(function () {
        if (BREduration > 0 && BREduration !== Infinity) {
            BREduration--;
            BREtimeRemaining = BREduration;
            let BREContdownminutes = Math.floor(BREduration / 60);
            let BREContdownseconds = BREduration % 60;
            BREcountdownDisplay.textContent = `${BREContdownminutes}:${BREContdownseconds.toString().padStart(2, '0')}`;
            BREtimeInput.classList.add('CountdownHidden');
            BREcountdownDisplay.classList.remove('CountdownHidden');
        } else if (BREduration == Infinity) {
            BREcountdownDisplay.textContent = '∞';
            BREtimeInput.classList.add('CountdownHidden');
            BREcountdownDisplay.classList.remove('CountdownHidden');
        }
    }, 1000);
}
function pauseTimerBRE() {
    clearInterval(intBRE);
    setTimerControlsDisabledStateBRE(false, true, false);
    document.getElementById('stopBtnBRE').style.color = '#990000';
    timerControlsButtonsBRE.pauseBRE.style.display = 'none';
    timerControlsButtonsBRE.startBRE.style.display = 'inline';
    if (!audioPlayerBRT.muted) {
        audioPlayerBRT.pause();
    }
    stopTimerTickBRE();
    document.getElementById('BREDate').value = date;
    document.getElementById('BRESave').disabled = false;
    document.getElementById('BRESave').style.color = '#49B79D';
    document.getElementById('breSettings').disabled = false;
    document.getElementById('breSettings').style.color = '#49B79D';
    clearInterval(BREcountdown);
    BREisPaused = true;
    BREchangeBall(1, 1);
}

function stopTimerBRE() {
    clearInterval(intBRE);
    [secondsBRE, minutesBRE, hoursBRE] = [0, 0, 0];
    timerRefBRE.value = '00 : 00 : 00';
    if (!audioPlayerBRT.muted) {
        audioPlayerBRT.pause();
    }
    audioPlayerBRT.currentTime = 0
    timerControlsButtonsBRE.pauseBRE.style.display = 'none';
    timerControlsButtonsBRE.startBRE.style.display = 'inline';
    setFormDisabledStateBRE(false);
    setTimerControlsDisabledStateBRE(false, true, true);
    timerControlsButtonsBRE.stopBRE.style.color = "rgb(177, 177, 177)";
    document.getElementById('BRESave').disabled = true;
    document.getElementById('BRESave').style.color = 'rgb(177, 177, 177)';
    stopTimerTickBRE();
    resetTimerBRE();
    timerControlsButtonsBRE.startBRE.style.color = '#49B79D';
    clearInterval(BREcountdown);
    BREisPaused = false;
    BREtimeInput.classList.remove('CountdownHidden');
    BREcountdownDisplay.classList.add('CountdownHidden');
    BREchangeBall(1, 1);
}

function displayTimerBRE() {
    secondsBRE++;
    if (secondsBRE == 60) {
        secondsBRE = 0;
        minutesBRE++;
        if (minutesBRE == 60) {
            minutesBRE = 0;
            hoursBRE++;
        }
    }
    let hBRE = hoursBRE < 10 ? "0" + hoursBRE : hoursBRE;
    let mBRE = minutesBRE < 10 ? "0" + minutesBRE : minutesBRE;
    let sBRE = secondsBRE < 10 ? "0" + secondsBRE : secondsBRE;
    timerRefBRE.value = `${hBRE} : ${mBRE} : ${sBRE}`;
}

function startTimerTickBRE() {
    timerBRE.intervalId = setInterval(onTimerTickBRE, 1000);
}

function stopTimerTickBRE() {
    clearInterval(timerBRE.intervalId);
}

function onTimerTickBRE() {
    const currentIntervalDurationBRE = timerBRE.isBreakBRE ? timerSettingsBRE.breakDurationBRE : timerBRE.isBreak2BRE ? timerSettingsBRE.breakDuration2BRE : timerBRE.isBreak3BRE ? timerSettingsBRE.breakDuration3BRE : timerBRE.isBreak4BRE ? timerSettingsBRE.breakDuration4BRE : timerSettingsBRE.intervalDurationBRE;
    if (timerBRE.elapsedInIntervalBRE <= currentIntervalDurationBRE && timerBRE.isBreak0BRE) {
        timerBRE.elapsedInIntervalBRE++;
        if (timerBRE.elapsedInIntervalBRE == currentIntervalDurationBRE && timerBRE.isBreak0BRE) {
            if (!ismuteBRE) {
                audioObjects.exhale.muted = false;
                audioObjects.exhale.play();
            }
            BREchangeBall(0.5, timerSettingsBRE.breakDurationBRE);
        }
        if (timerBRE.elapsedInIntervalBRE > currentIntervalDurationBRE && timerBRE.isBreak0BRE) {
            timerBRE.isBreakBRE = true;
            timerBRE.isBreak0BRE = false;
            timerBRE.isFinishedBRE = timerBRE.intervalsDoneBRE === timerSettingsBRE.intervalCountBRE;
            if (!timerBRE.isFinishedBRE) {
                timerBRE.elapsedInIntervalBRE = 1;
            }
            if (timerBRE.isFinishedBRE) {
                setTimerControlsDisabledStateBRE(false, true, true);
                setFormDisabledStateBRE(false);
                stopTimerTickBRE();
            } else {
                timerBRE.totalTimeElapsedBRE++;
            }
            updateInfoBRE();
        }
        updateInfoBRE();
    } else if (timerBRE.elapsedInIntervalBRE <= currentIntervalDurationBRE && timerBRE.isBreakBRE) {
        timerBRE.elapsedInIntervalBRE++;
        if (timerBRE.elapsedInIntervalBRE == currentIntervalDurationBRE && timerBRE.isBreakBRE) {
            if (!ismuteBRE) {
                audioObjects.inhale.muted = false;
                audioObjects.inhale.play();
            }
            BREchangeBall(1.5, timerSettingsBRE.breakDuration2BRE);
        }
        if (timerBRE.elapsedInIntervalBRE > currentIntervalDurationBRE && timerBRE.isBreakBRE) {
            timerBRE.isBreak2BRE = true;
            timerBRE.isBreakBRE = false;
            timerBRE.isFinishedBRE = timerBRE.intervalsDoneBRE === timerSettingsBRE.intervalCountBRE;
            if (!timerBRE.isFinishedBRE) {
                timerBRE.elapsedInIntervalBRE = 1;
            }
            if (timerBRE.isFinishedBRE) {
                setTimerControlsDisabledStateBRE(false, true, true);
                setFormDisabledStateBRE(false);
                stopTimerTickBRE();
            } else {
                timerBRE.totalTimeElapsedBRE++;
            }
            updateInfoBRE();
        }
        updateInfoBRE();
    } else if (timerBRE.elapsedInIntervalBRE <= currentIntervalDurationBRE && timerBRE.isBreak2BRE) {
        timerBRE.elapsedInIntervalBRE++;
        if (timerBRE.elapsedInIntervalBRE == currentIntervalDurationBRE && timerBRE.isBreak2BRE) {
            if (!ismuteBRE) {
                audioObjects.exhale.muted = false;
                audioObjects.exhale.play();
            }
            BREchangeBall(0.5, timerSettingsBRE.breakDuration3BRE);
        }
        if (timerBRE.elapsedInIntervalBRE > currentIntervalDurationBRE && timerBRE.isBreak2BRE) {
            timerBRE.isBreak3BRE = true;
            timerBRE.isBreak2BRE = false;
            timerBRE.isFinishedBRE = timerBRE.intervalsDoneBRE === timerSettingsBRE.intervalCountBRE;
            if (!timerBRE.isFinishedBRE) {
                timerBRE.elapsedInIntervalBRE = 1;
            }
            if (timerBRE.isFinishedBRE) {
                setTimerControlsDisabledStateBRE(false, true, true);
                setFormDisabledStateBRE(false);
                stopTimerTickBRE();
            } else {
                timerBRE.totalTimeElapsedBRE++;
            }
            updateInfoBRE();
        }
        updateInfoBRE();
    } else if (timerBRE.elapsedInIntervalBRE <= currentIntervalDurationBRE && timerBRE.isBreak3BRE) {
        timerBRE.elapsedInIntervalBRE++;
        if (timerBRE.elapsedInIntervalBRE == currentIntervalDurationBRE && timerBRE.isBreak3BRE) {
            if (!ismuteBRE) {
                audioObjects.hold.muted = false;
                audioObjects.hold.play();
            }
            BREchangeBall(0.5, timerSettingsBRE.breakDuration4BRE);
            timerBRE.isBreak4BRE = true;
            timerBRE.isBreak3BRE = false;
            timerBRE.isFinishedBRE = timerBRE.intervalsDoneBRE === timerSettingsBRE.intervalCountBRE;
            if (!timerBRE.isFinishedBRE) {
                timerBRE.elapsedInIntervalBRE = 1;
            }
            if (timerBRE.isFinishedBRE) {
                setTimerControlsDisabledStateBRE(false, true, true);
                setFormDisabledStateBRE(false);
                stopTimerTickBRE();
            } else {
                timerBRE.totalTimeElapsedBRE++;
            }
            updateInfoBRE();
        }
        updateInfoBRE();
    }
    else if (timerBRE.elapsedInIntervalBRE <= currentIntervalDurationBRE && timerBRE.isBreak4BRE) {
        timerBRE.elapsedInIntervalBRE++;
        if (timerBRE.elapsedInIntervalBRE == currentIntervalDurationBRE && timerBRE.isBreak4BRE) {
            if (!ismuteBRE) {
                if(BREcountdownDisplay.textContent == '0:00') {
                    audioObjects.inhale.muted = true;
                    clearInterval(BREcountdown);
                    if (!ismuteBRE) {
                        audioObjects.bell.muted = false;
                        audioObjects.bell.play();
                    }
                    clearInterval(intBRE);
                    setTimerControlsDisabledStateBRE(true, true, false);
                    document.getElementById('stopBtnBRE').style.color = '#990000';
                    timerControlsButtonsBRE.pauseBRE.style.display = 'none';
                    timerControlsButtonsBRE.startBRE.style.display = 'inline';
                    timerControlsButtonsBRE.startBRE.style.color = "rgb(177, 177, 177)";
                    document.getElementById('breSettings').disabled = false;
                    document.getElementById('breSettings').style.color = '#49B79D';
                    if (!audioPlayerBRT.muted) {
                        audioPlayerBRT.pause();
                    }
                    stopTimerTickBRE();
                    document.getElementById('BREDate').value = date;
                    document.getElementById('BRESave').disabled = false;
                    document.getElementById('BRESave').style.color = '#49B79D';
                    clearInterval(BREcountdown);
                    BREisPaused = false;
                    setTimeout(() => {
                        audioObjects.normalbreath.muted = false;
                        audioObjects.normalbreath.play();
                        if (isPortuguese) {
                            BREballText.textContent = 'Respira\u00E7\u00E3o Normal';
                        } else {
                            BREballText.textContent = 'Normal Breath';
                        }
                    }, 1000);
                } else {
                    audioObjects.inhale.muted = false;
                    audioObjects.inhale.play();
                }
            }
            BREchangeBall(1.5, timerSettingsBRE.intervalDurationBRE);
        }
        if (timerBRE.elapsedInIntervalBRE > currentIntervalDurationBRE && timerBRE.isBreak4BRE) {
            timerBRE.isBreak0BRE = true;
            timerBRE.isBreak4BRE = false;
            timerBRE.intervalsDoneBRE++;
            timerBRE.isFinishedBRE = timerBRE.intervalsDoneBRE === timerSettingsBRE.intervalCountBRE;
            if (!timerBRE.isFinishedBRE) {
                timerBRE.elapsedInIntervalBRE = 1;
            }
            if (timerBRE.isFinishedBRE) {
                setTimerControlsDisabledStateBRE(false, true, true);
                setFormDisabledStateBRE(false);
                stopTimerTickBRE();
            } else {
                timerBRE.totalTimeElapsedBRE++;
            }
            updateInfoBRE();
        }
        updateInfoBRE();
    }
}

function updateInfoBRE() {
    statusPanelBRE.timeOverviewMessageBRE.style.display = timerBRE.isFinishedBRE ? 'block' : null;
    statusPanelBRE.elapsedInIntervalBoxBRE.style.display = timerBRE.isFinishedBRE || timerBRE.isBreakBRE || timerBRE.isBreak2BRE || timerBRE.isBreak3BRE || timerBRE.isBreak4BRE ? 'none' : null;
    statusPanelBRE.elapsedInBreakIntervalBoxBRE.style.display = !timerBRE.isFinishedBRE && timerBRE.isBreakBRE ? 'block' : null;
    statusPanelBRE.elapsedInBreakIntervalBox2BRE.style.display = !timerBRE.isFinishedBRE && timerBRE.isBreak2BRE ? 'block' : null;
    statusPanelBRE.elapsedInBreakIntervalBox3BRE.style.display = !timerBRE.isFinishedBRE && timerBRE.isBreak3BRE ? 'block' : null;
    statusPanelBRE.elapsedInBreakIntervalBox4BRE.style.display = !timerBRE.isFinishedBRE && timerBRE.isBreak4BRE ? 'block' : null;  
    if (isPortuguese) {
        if(timerBRE.isBreakBRE) {
            BREballText.textContent = 'EXPIRA';
        } else if (timerBRE.isBreak2BRE) {
            BREballText.textContent = 'INSPIRA';
        } else if (timerBRE.isBreak3BRE) {
            BREballText.textContent = 'EXPIRA';
        } else if (timerBRE.isBreak4BRE) {
            BREballText.textContent = 'SEGURE';
        } else {
            BREballText.textContent = 'INSPIRA';
        }
    } else {
        if (timerBRE.isBreakBRE) {
            BREballText.textContent = 'EXHALE';
        } else if (timerBRE.isBreak2BRE) {
            BREballText.textContent = 'INHALE';
        } else if (timerBRE.isBreak3BRE) {
            BREballText.textContent = 'EXHALE';
        } else if (timerBRE.isBreak4BRE) {
            BREballText.textContent = 'HOLD';
        } else {
            BREballText.textContent = 'INHALE';
        }
    }
    statusPanelBRE.intervalsDoneBRE.value = timerBRE.intervalsDoneBRE;
}
//-----------------------------------------------------//