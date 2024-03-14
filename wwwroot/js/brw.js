//BRW JS//
var isBRWon = false;
const BRWball = document.getElementById('BRWball');
const BRWballText = document.getElementById('BRWballText');

function BRWchangeBall(scale, duration) {
    BRWball.style.transition = `transform ${duration}s ease`;
    BRWball.style.transform = `scale(${scale})`;
}

const BRWtimeInput = document.getElementById('BRWtimeInput');
const BRWcountdownDisplay = document.getElementById('BRWcountdownDisplay');
let BRWcountdown;
let BRWtimeRemaining = Infinity;
let BRWisPaused = false;
// Populate the dropdown with options
for (let BRWi = 2; BRWi <= 60; BRWi++) { // assuming 1 to 60 minutes
    let BRWoption = document.createElement('option');
    BRWoption.value = BRWi * 60;
    if (isPortuguese) {
        BRWoption.textContent = BRWi + ' minutos';
    } else {
        BRWoption.textContent = BRWi + ' minutes';
    }
    BRWtimeInput.appendChild(BRWoption);
}

//BRW Modal
const modalBRW = document.getElementById("myModalBRW");
const closeModalBRWButton = document.getElementById("closeModalBRW");
var BRWquestion = document.getElementById("BRWquestion");

function openModalBRW() {
    modalBRW.style.display = "block";
    showSlides(slideIndex, 'BRWslides');
}

// Function to close the modalBRW
function closeModalBRW() {
    modalBRW.style.display = "none";
    slideIndex = 1;

}

// Event listener for closing the modalBRW
closeModalBRWButton.addEventListener("click", closeModalBRW);

// Close the modalBRW if the user clicks outside the modalBRW content
window.addEventListener("click", function (event) {
    if (event.target === modalBRW) {
        closeModalBRW();
    }
});
BRWquestion.onclick = function () {
    openModalBRW();
}

backBRW.onclick = function () {
    openPage(BRWPage, programPage, 'slideRight');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    backProgram.style.display = "block";
    backBRW.style.display = "none";
    BRWclose();
}

backBRW2.onclick = function () {
    openPage(BRWPage, programPage2, 'slideRight');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    backProgram2.style.display = "block";
    backBRW2.style.display = "none";
    BRWclose();
}
BRWLink2.onclick = function () {
    openPage(programPage2, BRWPage, 'slideRight');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    backProgram2.style.display = "none";
    backBRW2.style.display = "block";
    audioObjects.inhale.load();
    audioObjects.exhale.load();
    audioObjects.hold.load();
    audioObjects.normalbreath.load();
}
brwSettings.onclick = function () {
    openPage(BRWPage, brwSettingsPage, 'slideLeft');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    selectSongsList.style.display = "block";
    backBRWset.style.display = "block";
    backBRW.style.display = "none";
}
backBRWset.onclick = function () {
    if (!audioPlayerBRT.muted) {
        audioPlayerBRT.pause();
    }
    audioPlayerBRT.currentTime = 0;
    openPage(brwSettingsPage, BRWPage, 'slideRight');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    selectSongsList.style.display = "none";
    backBRW.style.display = "block";
    backBRWset.style.display = "none";
}
// Function to close the modal
function BRWclose() {
    isBRWon = false;
    clearInterval(intBRW);
    [secondsBRW, minutesBRW, hoursBRW] = [0, 0, 0];
    timerRefBRW.value = '00 : 00 : 00';
    if (!audioPlayerBRT.muted) {
        audioPlayerBRT.pause();
    }
    audioPlayerBRT.currentTime = 0
    timerControlsButtonsBRW.pauseBRW.style.display = 'none';
    timerControlsButtonsBRW.startBRW.style.display = 'inline';
    setFormDisabledStateBRW(false);
    setTimerControlsDisabledStateBRW(false, true, true);
    timerControlsButtonsBRW.stopBRW.style.color = "rgb(177, 177, 177)";
    document.getElementById('BRWSave').disabled = true;
    document.getElementById('BRWSave').style.color = 'rgb(177, 177, 177)';
    document.getElementById('brwSettings').disabled = false;
    document.getElementById('brwSettings').style.color = '#49B79D';
    stopTimerTickBRW();
    resetTimerBRW();
    isBRWON = false;
    document.getElementById('BRWResultSaved').innerHTML = "";
    clearInterval(BRWcountdown);
    BRWisPaused = false;
    BRWtimeInput.classList.remove('CountdownHidden');
    BRWcountdownDisplay.classList.add('CountdownHidden');
    BRWchangeBall(1, 1);
}

$(function () {
    $('#BRWForm').on('submit', function (e) {
        e.preventDefault(); // Prevent the default form submission

        var formData = new FormData(this); // Get the form data

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
        audioPlayerBRT.currentTime = 0
        timerControlsButtonsBRW.pauseBRW.style.display = 'none';
        timerControlsButtonsBRW.startBRW.style.display = 'inline';
        timerControlsButtonsBB.startBRW.style.color = '#0661AA';
        setFormDisabledStateBRW(false);
        setTimerControlsDisabledStateBRW(false, true, true);
        timerControlsButtonsBRW.stopBRW.style.color = "rgb(177, 177, 177)";
        document.getElementById('BRWSave').disabled = true;
        document.getElementById('BRWSave').style.color = 'rgb(177, 177, 177)';
        stopTimerTickBRW();
        resetTimerBRW();
        BRWtimeInput.classList.remove('CountdownHidden');
        BRWcountdownDisplay.classList.add('CountdownHidden');
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


var audioBRW = document.getElementById("audioBRW"),
    muteBRW = document.getElementById("muteBRW"),
    ismuteBRW = false;

var audioSongBRW = document.getElementById("songBRW"),
    muteSongBRW = document.getElementById("songMuteBRW");
// Get the volumeVbre bar element
const volumeVoiceBRW = document.getElementById('volumeVoiceBRW');

// Add an event listener for the volumeVbre change event
volumeVoiceBRW.addEventListener('input', function () {
    // Get the current volumeVbre value
    const volumeVbre = parseFloat(volumeVoiceBRW.value);

    // Check if volumeVbre is 0 and mute the media if necessary
    if (volumeVbre === 0) {
        audioObjects.inhale.muted = true;
        audioObjects.exhale.muted = true;
        audioObjects.hold.muted = true;
        audioBRW.style.display = "none";
        muteBRW.style.display = "block";
        ismuteBRW = true;
    } else {
        audioObjects.inhale.muted = false;
        audioObjects.exhale.muted = false;
        audioObjects.hold.muted = false;
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
    const volumeSbre = parseFloat(volumeSongBRW.value);

    // Check if volumeSbre is 0 and mute the media if necessary
    if (volumeSbre === 0) {
        audioPlayerBRT.muted = true;
        audioSongBRW.style.display = "none";
        muteSongBRW.style.display = "block";
    } else {
        audioPlayerBRT.muted = false;
        muteSongBRW.style.display = "none";
        audioSongBRW.style.display = "block";
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
    isBRWon = true;
    if (intBRW !== null) {
        clearInterval(intBRW);
    }
    setFormDisabledStateBRW(true);
    setTimerControlsDisabledStateBRW(true, true, true);
    setTimeout(() => {
        setTimerControlsDisabledStateBRW(true, false, true);
    }, 2000);
    timerControlsButtonsBRW.stopBRW.style.color = "rgb(177, 177, 177)";
    if (timerBRW.isBreak0BRW) {
        if (!ismuteBRW) {
            audioObjects.bell.muted = false;
            audioObjects.bell.play();
            setTimeout(() => {
                audioObjects.inhale.muted = false;
                audioObjects.inhale.play();
            }, 1500);    
        }
        setTimeout(() => {
            BRWchangeBall(1.5, timerSettingsBRW.intervalDurationBRW);
        }, 1500); 
    }
    if (!audioPlayerBRT.muted) {
        playSelectedSongBRT(true);
    }
    if (timerBRW.isFinishedBRW) {
        resetTimerBRW();
    }
    setTimeout(() => {
        setTimeout(() => {
            intBRW = setInterval(displayTimerBRW, 1000);
        }, 1000);
        startTimerTickBRW();
        if (BRWisPaused) {
            // Resume from paused state
            BRWstartTimer(BRWtimeRemaining);
            BRWisPaused = false;
        } else {
            // Start a new timer
            clearInterval(BRWcountdown);
            BRWtimeRemaining = BRWtimeInput.value === '∞' ? Infinity : parseInt(BRWtimeInput.value);
            BRWcountdownDisplay.textContent = '';
            BRWstartTimer(BRWtimeRemaining);
        }
    }, 1700);  
    timerControlsButtonsBRW.startBRW.style.display = 'none';
    timerControlsButtonsBRW.pauseBRW.style.display = 'inline';
    document.getElementById('BRWSave').disabled = true;
    document.getElementById('BRWSave').style.color = 'rgb(177, 177, 177)';
    document.getElementById('brwSettings').disabled = true;
    document.getElementById('brwSettings').style.color = 'rgb(177, 177, 177)';
}
function BRWstartTimer(BRWduration) {
    BRWcountdown = setInterval(function () {
        if (BRWduration > 0 && BRWduration !== Infinity) {
            BRWduration--;
            BRWtimeRemaining = BRWduration;
            let BRWContdownminutes = Math.floor(BRWduration / 60);
            let BRWContdownseconds = BRWduration % 60;
            BRWcountdownDisplay.textContent = `${BRWContdownminutes}:${BRWContdownseconds.toString().padStart(2, '0')}`;
            BRWtimeInput.classList.add('CountdownHidden');
            BRWcountdownDisplay.classList.remove('CountdownHidden');    
        } else if (BRWduration == Infinity) {
            BRWcountdownDisplay.textContent = '∞';
            BRWtimeInput.classList.add('CountdownHidden');
            BRWcountdownDisplay.classList.remove('CountdownHidden');
        }
    }, 1000);
}
function pauseTimerBRW() {
    isBRWon = false;
    clearInterval(intBRW);
    setTimerControlsDisabledStateBRW(false, true, false);
    document.getElementById('stopBtnBRW').style.color = '#990000';
    timerControlsButtonsBRW.pauseBRW.style.display = 'none';
    timerControlsButtonsBRW.startBRW.style.display = 'inline';
    if (!audioPlayerBRT.muted) {
        audioPlayerBRT.pause();
    }
    stopTimerTickBRW();
    document.getElementById('BRWDate').value = date;
    document.getElementById('BRWSave').disabled = false;
    document.getElementById('BRWSave').style.color = '#49B79D';
    document.getElementById('brwSettings').disabled = false;
    document.getElementById('brwSettings').style.color = '#49B79D';
    clearInterval(BRWcountdown);
    BRWisPaused = true;
    BRWchangeBall(1, 1);
}

function stopTimerBRW() {
    isBRWon = false;
    clearInterval(intBRW);
    [secondsBRW, minutesBRW, hoursBRW] = [0, 0, 0];
    timerRefBRW.value = '00 : 00 : 00';
    if (!audioPlayerBRT.muted) {
        audioPlayerBRT.pause();
    }
    audioPlayerBRT.currentTime = 0
    timerControlsButtonsBRW.pauseBRW.style.display = 'none';
    timerControlsButtonsBRW.startBRW.style.display = 'inline';
    setFormDisabledStateBRW(false);
    setTimerControlsDisabledStateBRW(false, true, true);
    timerControlsButtonsBRW.stopBRW.style.color = "rgb(177, 177, 177)";
    document.getElementById('BRWSave').disabled = true;
    document.getElementById('BRWSave').style.color = 'rgb(177, 177, 177)';
    stopTimerTickBRW();
    resetTimerBRW();
    timerControlsButtonsBRW.startBRW.style.color = '#49B79D';
    clearInterval(BRWcountdown);
    BRWisPaused = false;
    BRWtimeInput.classList.remove('CountdownHidden');
    BRWcountdownDisplay.classList.add('CountdownHidden');
    BRWchangeBall(1, 1);
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
        if (timerBRW.elapsedInIntervalBRW == currentIntervalDurationBRW && timerBRW.isBreak0BRW) {
            if (!ismuteBRW) {
                audioObjects.exhale.muted = false;
                audioObjects.exhale.play();
            }
            BRWchangeBall(0.5, timerSettingsBRW.breakDurationBRW);
        }
        if (timerBRW.elapsedInIntervalBRW > currentIntervalDurationBRW && timerBRW.isBreak0BRW) {
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
        if (timerBRW.elapsedInIntervalBRW == currentIntervalDurationBRW && timerBRW.isBreakBRW) {
            if (!ismuteBRW) {
                audioObjects.inhale.muted = false;
                audioObjects.inhale.play();
            }
            BRWchangeBall(1.5, timerSettingsBRW.breakDuration2BRW);
        }
        if (timerBRW.elapsedInIntervalBRW > currentIntervalDurationBRW && timerBRW.isBreakBRW) {
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
        if (timerBRW.elapsedInIntervalBRW == currentIntervalDurationBRW && timerBRW.isBreak2BRW) {
            if (!ismuteBRW) {
                audioObjects.exhale.muted = false;
                audioObjects.exhale.play();
            }
            BRWchangeBall(0.5, timerSettingsBRW.breakDuration3BRW);
        }
        if (timerBRW.elapsedInIntervalBRW > currentIntervalDurationBRW && timerBRW.isBreak2BRW) {
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
        if (timerBRW.elapsedInIntervalBRW == currentIntervalDurationBRW && timerBRW.isBreak3BRW) {
            if (!ismuteBRW) {
                audioObjects.hold.muted = false;
                audioObjects.hold.play();
            }
            BRWchangeBall(0.5, timerSettingsBRW.breakDuration4BRW);
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
        if (timerBRW.elapsedInIntervalBRW == currentIntervalDurationBRW && timerBRW.isBreak4BRW) {
            if (!ismuteBRW) {
                if (BRWcountdownDisplay.textContent == '0:00') {
                    audioObjects.inhale.muted = true;
                    clearInterval(BRWcountdown);                  
                    if (!ismuteBRW) {
                        audioObjects.bell.muted = false;
                        audioObjects.bell.play();
                    }
                    clearInterval(intBRW);
                    setTimerControlsDisabledStateBRW(true, true, false);
                    document.getElementById('stopBtnBRW').style.color = '#990000';
                    timerControlsButtonsBRW.pauseBRW.style.display = 'none';
                    timerControlsButtonsBRW.startBRW.style.display = 'inline';
                    timerControlsButtonsBRW.startBRW.style.color = "rgb(177, 177, 177)";
                    document.getElementById('brwSettings').disabled = false;
                    document.getElementById('brwSettings').style.color = '#49B79D';
                    if (!audioPlayerBRT.muted) {
                        audioPlayerBRT.pause();
                    }
                    stopTimerTickBRW();
                    document.getElementById('BRWDate').value = date;
                    document.getElementById('BRWSave').disabled = false;
                    document.getElementById('BRWSave').style.color = '#49B79D';
                    clearInterval(BRWcountdown);
                    BRWisPaused = false;
                    setTimeout(() => {
                        audioObjects.normalbreath.muted = false;
                        audioObjects.normalbreath.play();
                        if (isPortuguese) {
                            BRWballText.textContent = 'Respira\u00E7\u00E3o Normal';
                        } else {
                            BRWballText.textContent = 'Normal Breath';
                        }
                    }, 1000);
                } else {
                    audioObjects.inhale.muted = false;
                    audioObjects.inhale.play();
                }
            }
            BRWchangeBall(1.5, timerSettingsBRW.intervalDurationBRW);
        }
        if (timerBRW.elapsedInIntervalBRW > currentIntervalDurationBRW && timerBRW.isBreak4BRW) {
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
    if (isPortuguese) {
        if(timerBRW.isBreakBRW) {
            BRWballText.textContent = 'EXPIRA';
        } else if (timerBRW.isBreak2BRW) {
            BRWballText.textContent = 'INSPIRA';
        } else if (timerBRW.isBreak3BRW) {
            BRWballText.textContent = 'EXPIRA';
        } else if (timerBRW.isBreak4BRW) {
            BRWballText.textContent = 'SEGURE';
        } else {
            BRWballText.textContent = 'INSPIRA';
        }
    } else {
        if (timerBRW.isBreakBRW) {
            BRWballText.textContent = 'EXHALE';
        } else if (timerBRW.isBreak2BRW) {
            BRWballText.textContent = 'INHALE';
        } else if (timerBRW.isBreak3BRW) {
            BRWballText.textContent = 'EXHALE';
        } else if (timerBRW.isBreak4BRW) {
            BRWballText.textContent = 'HOLD';
        } else {
            BRWballText.textContent = 'INHALE';
        }
    }
    statusPanelBRW.intervalsDoneBRW.value = timerBRW.intervalsDoneBRW;
}
//-----------------------------------------------------//