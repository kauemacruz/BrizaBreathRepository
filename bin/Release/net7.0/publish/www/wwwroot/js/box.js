/*BOX JS*/
var isBOXon = false;
const BOXball = document.getElementById('BOXball');
const BOXballText = document.getElementById('BOXballText');

function BOXchangeBall(scale, duration) {
    BOXball.style.transition = `transform ${duration}s ease`;
    BOXball.style.transform = `scale(${scale})`;
}

const BOXtimeInput = document.getElementById('BOXtimeInput');
const BOXcountdownDisplay = document.getElementById('BOXcountdownDisplay');
let BOXcountdown;
let BOXtimeRemaining = Infinity;
let BOXisPaused = false;

// Populate the dropdown with options
for (let BOXi = 2; BOXi <= 60; BOXi++) { // assuming 1 to 60 minutes
    let BOXoption = document.createElement('option');
    BOXoption.value = BOXi * 60;
    if (isPortuguese) {
        BOXoption.textContent = BOXi + ' minutos';
    } else {
        BOXoption.textContent = BOXi + ' minutes';
    }
    BOXtimeInput.appendChild(BOXoption);
}

//BOX Modal
const modalBOX = document.getElementById("myModalBOX");
const closeModalBOXButton = document.getElementById("closeModalBOX");
var BOXquestion = document.getElementById("BOXquestion");

function openModalBOX() {
    modalBOX.style.display = "block";
    showSlides(slideIndex, 'BOXslides');
}

// Function to close the modalBOX
function closeModalBOX() {
    modalBOX.style.display = "none";
    slideIndex = 1;

}

// Event listener for closing the modalBOX
closeModalBOXButton.addEventListener("click", closeModalBOX);

// Close the modalBOX if the user clicks outside the modalBOX content
window.addEventListener("click", function (event) {
    if (event.target === modalBOX) {
        closeModalBOX();
    }
});
BOXquestion.onclick = function () {
    openModalBOX();
}

BOXLink.onclick = function () {
    if (isUserActiveSubscriber) {
        openPage(PRANAPage, BOXPage, 'slideLeft');
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        backBOX.style.display = "block";
        backPRANA.style.display = "none";
        audioObjects.exhale.load();
        audioObjects.inhale.load();
        audioObjects.hold.load();
        audioObjects.normalbreath.load();
    } else {
        openModal();
    }
}
backBOX.onclick = function () {
    openPage(BOXPage, PRANAPage, 'slideRight');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    backPRANA.style.display = "block";
    backBOX.style.display = "none";
    BOXclose();
}
BOXSettings.onclick = function () {
    openPage(BOXPage, BOXSettingsPage, 'slideLeft');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    selectSongsList.style.display = "block";
    backBOXSet.style.display = "block";
    backBOX.style.display = "none";
}
backBOXSet.onclick = function () {
    if (!audioPlayerBRT.muted) {
        audioPlayerBRT.pause();
    }
    audioPlayerBRT.currentTime = 0;
    openPage(BOXSettingsPage, BOXPage, 'slideRight');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    selectSongsList.style.display = "none";
    backBOX.style.display = "block";
    backBOXSet.style.display = "none";
}

// Function to close the modal
function BOXclose() {
    isBOXon = false;
    clearInterval(intBOX);
    [secondsBOX, minutesBOX, hoursBOX] = [0, 0, 0];
    timerRefBOX.value = '00 : 00 : 00';
    if (!audioPlayerBRT.muted) {
        audioPlayerBRT.pause();
    }
    audioPlayerBRT.currentTime = 0;
    timerControlsButtonsBOX.pauseBOX.style.display = 'none';
    timerControlsButtonsBOX.startBOX.style.display = 'inline';
    setFormDisabledStateBOX(false);
    setTimerControlsDisabledStateBOX(false, true, true);
    timerControlsButtonsBOX.stopBOX.style.color = "rgb(177, 177, 177)";
    document.getElementById('BOXSave').disabled = true;
    document.getElementById('BOXSave').style.color = 'rgb(177, 177, 177)';
    document.getElementById('BOXSettings').disabled = false;
    document.getElementById('BOXSettings').style.color = '#49B79D';
    stopTimerTickBOX();
    resetTimerBOX();
    document.getElementById('BOXResultSaved').innerHTML = "";
    clearInterval(BOXcountdown);
    BOXisPaused = false;
    BOXtimeInput.classList.remove('CountdownHidden');
    BOXcountdownDisplay.classList.add('CountdownHidden');
    BOXchangeBall(1, 1);
}

$(function () {
    $('#BOXForm').on('submit', function (e) {
        e.preventDefault(); // Prevent the default form submission

        var formData = new FormData(this); // Get the form data

        $.ajax({
            url: "/",
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function (result) {
                $('#BOXResultSaved').html(result); // Update the result section with the server response
            }
        });
        clearInterval(intBOX);
        [secondsBOX, minutesBOX, hoursBOX] = [0, 0, 0];
        timerRefBOX.value = '00 : 00 : 00';
        audioPlayerBRT.currentTime = 0
        timerControlsButtonsBOX.pauseBOX.style.display = 'none';
        timerControlsButtonsBOX.startBOX.style.display = 'inline';
        timerControlsButtonsBB.startBOX.style.color = '#0661AA';
        setFormDisabledStateBOX(false);
        setTimerControlsDisabledStateBOX(false, true, true);
        timerControlsButtonsBOX.stopBOX.style.color = "rgb(177, 177, 177)";
        document.getElementById('BOXSave').disabled = true;
        document.getElementById('BOXSave').style.color = 'rgb(177, 177, 177)';
        stopTimerTickBOX();
        resetTimerBOX();
        BOXtimeInput.classList.remove('CountdownHidden');
        BOXcountdownDisplay.classList.add('CountdownHidden');
    });
});

let
    formSettingsFieldsBOX,
    timerControlsButtonsBOX,
    statusPanelBOX,
    timerBOX,
    timerSettingsBOX;

function setTimerSettingsBOX(
    intervalCountBOX = timerSettingsBOX.intervalCountBOX,
    intervalDurationBOX = timerSettingsBOX.intervalDurationBOX,
    enableBreakBOX = timerSettingsBOX.enableBreakBOX,
    breakDurationBOX = timerSettingsBOX.breakDurationBOX,
    enableBreak2BOX = timerSettingsBOX.enableBreak2BOX,
    breakDuration2BOX = timerSettingsBOX.breakDuration2BOX,
    enableBreak3BOX = timerSettingsBOX.enableBreak3BOX,
    breakDuration3BOX = timerSettingsBOX.breakDuration3BOX
) {
    timerSettingsBOX = {
        intervalCountBOX,
        intervalDurationBOX,
        enableBreakBOX,
        breakDurationBOX,
        enableBreak2BOX,
        breakDuration2BOX,
        enableBreak3BOX,
        breakDuration3BOX
    };
}

function resetTimerBOX() {
    timerBOX = {
        totalTimeElapsedBOX: 0,
        elapsedInIntervalBOX: 0,
        intervalsDoneBOX: 0,
        isBreak3BOX: true,
        isBreakBOX: false,
        isBreak2BOX: false,
        isBreak4BOX: false,
        isFinishedBOX: false
    };
    updateInfoBOX();
}

let [secondsBOX, minutesBOX, hoursBOX] = [0, 0, 0];
let timerRefBOX = document.getElementById('timerDisplayBOX');
let intBOX = null;
document.getElementById('stopBtnBOX').disabled = true;
document.getElementById('stopBtnBOX').style.color = 'rgb(177, 177, 177)';
document.getElementById('BOXSave').disabled = true;
document.getElementById('BOXSave').style.color = 'rgb(177, 177, 177)';
var audioBOX = document.getElementById("audioBOX"),
    muteBOX = document.getElementById("muteBOX"),
    ismuteBOX = false;

var audioSongBOX = document.getElementById("songBOX"),
    muteSongBOX = document.getElementById("songMuteBOX");
// Get the volumeVBOX bar element
const volumeVoiceBOX = document.getElementById('volumeVoiceBOX');

// Add an event listener for the volumeVBOX change event
volumeVoiceBOX.addEventListener('input', function () {
    // Get the current volumeVBOX value
    const volumeVBOX = parseFloat(volumeVoiceBOX.value);

    // Check if volumeVBOX is 0 and mute the media if necessary
    if (volumeVBOX === 0) {
        audioObjects.inhale.muted = true;
        audioObjects.exhale.muted = true;
        audioObjects.hold.muted = true;
        audioBOX.style.display = "none";
        muteBOX.style.display = "block";
        ismuteBOX = true;
    } else {
        audioObjects.inhale.muted = false;
        audioObjects.exhale.muted = false;
        audioObjects.hold.muted = false;
        muteBOX.style.display = "none";
        audioBOX.style.display = "block";
        ismuteBOX = false;
    }
});
// Get the volumeSBOX bar element
const volumeSongBOX = document.getElementById('volumeSongBOX');

// Add an event listener for the volumeSBOX change event
volumeSongBOX.addEventListener('input', function () {
    // Get the current volumeSBOX value
    const volumeSBOX = parseFloat(volumeSongBOX.value);

    // Check if volumeSBOX is 0 and mute the media if necessary
    if (volumeSBOX === 0) {
        audioPlayerBRT.muted = true;
        audioSongBOX.style.display = "none";
        muteSongBOX.style.display = "block";
    } else {
        audioPlayerBRT.muted = false;
        muteSongBOX.style.display = "none";
        audioSongBOX.style.display = "block";
    }
});


var inhaleBOX = 4;
var holdBOX = inhaleBOX;
var exhaleBOX = inhaleBOX;
var hold2BOX = inhaleBOX;
setTimerSettingsBOX(9999, inhaleBOX, true, holdBOX, true, exhaleBOX, true, hold2BOX);
initializeTimerControlsBOX();
initializeStatusPanelBOX();
initializeTimerSettingsFormBOX();
resetTimerBOX();


var minusBtnBOX = document.getElementById("minusBOX"),
    plusBtnBOX = document.getElementById("plusBOX"),
    numberBOX = 4, /// numberBOX value
    minBOX = 3, /// minBOX numberBOX
    maxBOX = 30;

minusBtnBOX.onclick = function () {
    if (numberBOX > minBOX) {
        numberBOX = numberBOX - 1; /// Minus 1 of the numberBOX
        formSettingsFieldsBOX.intervalDurationBOX.value = numberBOX; /// Display the value in place of the numberBOX
        //fix here to change pranayama type
        formSettingsFieldsBOX.breakDurationBOX.value = formSettingsFieldsBOX.intervalDurationBOX.value;
        formSettingsFieldsBOX.breakDuration2BOX.value = formSettingsFieldsBOX.intervalDurationBOX.value;
        formSettingsFieldsBOX.breakDuration3BOX.value = formSettingsFieldsBOX.intervalDurationBOX.value;
        setTimerSettingsBOX(9999, formSettingsFieldsBOX.intervalDurationBOX.value, true, formSettingsFieldsBOX.breakDurationBOX.value, true, formSettingsFieldsBOX.breakDuration2BOX.value, true, formSettingsFieldsBOX.breakDuration3BOX.value);
    }
}

plusBtnBOX.onclick = function () {
    if (numberBOX < maxBOX) {
        numberBOX = numberBOX + 1;
        formSettingsFieldsBOX.intervalDurationBOX.value = numberBOX; /// Display the value in place of the numberBOX
        //fix here to change pranayama type
        formSettingsFieldsBOX.breakDurationBOX.value = formSettingsFieldsBOX.intervalDurationBOX.value;
        formSettingsFieldsBOX.breakDuration2BOX.value = formSettingsFieldsBOX.intervalDurationBOX.value;
        formSettingsFieldsBOX.breakDuration3BOX.value = formSettingsFieldsBOX.intervalDurationBOX.value;
        setTimerSettingsBOX(9999, formSettingsFieldsBOX.intervalDurationBOX.value, true, formSettingsFieldsBOX.breakDurationBOX.value, true, formSettingsFieldsBOX.breakDuration2BOX.value, true, formSettingsFieldsBOX.breakDuration3BOX.value);

    }
}

function initializeTimerSettingsFormBOX() {
    const oneDayInSecondsBRE = 60 * 60 * 24;
    let lastUserSetEnableBreakBOX = timerSettingsBOX.enableBreakBOX;
    let lastUserSetEnableBreak2BOX = timerSettingsBOX.enableBreak2BOX;
    let lastUserSetEnableBreak3BOX = timerSettingsBOX.enableBreak3BOX;

    formSettingsFieldsBOX = {
        intervalCountBOX: document.getElementById('intervalCountInputBOX'),
        intervalDurationBOX: document.getElementById('intervalDurationInputBOX'),
        enableBreakBOX: document.getElementById('enableBreakInputBOX'),
        breakDurationBOX: document.getElementById('breakDurationInputBOX'),
        enableBreak2BOX: document.getElementById('enableBreakInput2BOX'),
        breakDuration2BOX: document.getElementById('breakDurationInput2BOX'),
        enableBreak3BOX: document.getElementById('enableBreakInput3BOX'),
        breakDuration3BOX: document.getElementById('breakDurationInput3BOX'),
    };

    formSettingsFieldsBOX.intervalCountBOX.value = timerSettingsBOX.intervalCountBOX;
    formSettingsFieldsBOX.intervalDurationBOX.value = timerSettingsBOX.intervalDurationBOX;
    formSettingsFieldsBOX.enableBreakBOX.checked = timerSettingsBOX.enableBreakBOX;
    formSettingsFieldsBOX.breakDurationBOX.value = timerSettingsBOX.breakDurationBOX;
    formSettingsFieldsBOX.enableBreak2BOX.checked = timerSettingsBOX.enableBreak2BOX;
    formSettingsFieldsBOX.breakDuration2BOX.value = timerSettingsBOX.breakDuration2BOX;
    formSettingsFieldsBOX.enableBreak3BOX.checked = timerSettingsBOX.enableBreak3BOX;
    formSettingsFieldsBOX.breakDuration3BOX.value = timerSettingsBOX.breakDuration3BOX;

    function getNumberInBoundsOrDefaultBOX(value, minBOX, maxBOX, def = 1) {
        const valueAsNumberBOX = parseInt(value);
        return isNaN(valueAsNumberBOX) ? def : Math.max(minBOX, Math.min(valueAsNumberBOX, maxBOX));
    }

    function setBreakDurationLineDisplayBOX(displayed) {
        const breakDurationInputLineEltBOX = document.getElementById('breakDurationInputLineBOX');
        breakDurationInputLineEltBOX.style.display = displayed ? null : 'none';
        const breakDurationInputLineElt2BOX = document.getElementById('breakDurationInputLine2BOX');
        breakDurationInputLineElt2BOX.style.display = displayed ? null : 'none';
        const breakDurationInputLineElt3BOX = document.getElementById('breakDurationInputLine3BOX');
        breakDurationInputLineElt3BOX.style.display = displayed ? null : 'none';
    }

    formSettingsFieldsBOX.intervalCountBOX.addEventListener('input', () => {
        const intervalCountBOX = getNumberInBoundsOrDefaultBOX(formSettingsFieldsBOX.intervalCountBOX.value, 1, 9999),
            hasOneIntervalBOX = intervalCountBOX === 1,
            hasBreakBOX = hasOneIntervalBOX ? false : lastUserSetEnableBreakBOX;

        formSettingsFieldsBOX.enableBreakBOX.disabled = hasOneIntervalBOX === true;
        formSettingsFieldsBOX.enableBreakBOX.checked = hasBreakBOX;

        setBreakDurationLineDisplayBOX(hasBreakBOX);

        setTimerSettingsBOX(intervalCountBOX, undefined, hasBreakBOX);
        updateInfoBOX();
    });

    formSettingsFieldsBOX.intervalDurationBOX.addEventListener('input', () => {
        setTimerSettingsBOX(undefined, getNumberInBoundsOrDefaultBOX(formSettingsFieldsBOX.intervalDurationBOX.value, 1, oneDayInSecondsBRE));
        updateInfoBOX();
    });

    formSettingsFieldsBOX.enableBreakBOX.addEventListener('change', () => {
        const enableBreakBOX = formSettingsFieldsBOX.enableBreakBOX.checked;

        lastUserSetEnableBreakBOX = enableBreakBOX;
        setBreakDurationLineDisplayBOX(enableBreakBOX);
        setTimerSettingsBOX(undefined, undefined, enableBreakBOX);
        updateInfoBOX();
    });

    formSettingsFieldsBOX.breakDurationBOX.addEventListener('input', () => {
        setTimerSettingsBOX(undefined, undefined, undefined,
            getNumberInBoundsOrDefaultBOX(formSettingsFieldsBOX.breakDurationBOX.value, 1, oneDayInSecondsBRE)
        );
        updateInfoBOX();
    });

    formSettingsFieldsBOX.enableBreak2BOX.addEventListener('change', () => {
        const enableBreak2BOX = formSettingsFieldsBOX.enableBreak2BOX.checked;

        lastUserSetEnableBreak2BOX = enableBreak2BOX;
        setBreakDurationLineDisplayBOX(enableBreak2BOX);
        setTimerSettingsBOX(undefined, undefined, undefined, undefined, enableBreak2BOX);
        updateInfoBOX();
    });

    formSettingsFieldsBOX.breakDuration2BOX.addEventListener('input', () => {
        setTimerSettingsBOX(undefined, undefined, undefined, undefined, undefined,
            getNumberInBoundsOrDefaultBOX(formSettingsFieldsBOX.breakDuration2BOX.value, 1, oneDayInSecondsBRE)
        );
        updateInfoBOX();
    });

    formSettingsFieldsBOX.enableBreak3BOX.addEventListener('change', () => {
        const enableBreak3BOX = formSettingsFieldsBOX.enableBreak3BOX.checked;

        lastUserSetEnableBreak3BOX = enableBreak2BOX;
        setBreakDurationLineDisplayBOX(enableBreak3BOX);
        setTimerSettingsBOX(undefined, undefined, undefined, undefined, undefined, undefined, enableBreak3BOX);
        updateInfoBOX();
    });

    formSettingsFieldsBOX.breakDuration3BOX.addEventListener('input', () => {
        setTimerSettingsBOX(
            undefined, undefined, undefined, undefined, undefined, undefined, undefined,
            getNumberInBoundsOrDefaultBOX(formSettingsFieldsBOX.breakDuration3BOX.value, 1, oneDayInSecondsBRE)
        );
        updateInfoBOX();
    });
}

function initializeTimerControlsBOX() {
    timerControlsButtonsBOX = {
        startBOX: document.getElementById('startBtnBOX'),
        pauseBOX: document.getElementById('pauseBtnBOX'),
        stopBOX: document.getElementById('stopBtnBOX'),
    };

    setTimerControlsDisabledStateBOX(false, true, true);

    timerControlsButtonsBOX.startBOX.addEventListener('click', startTimerBOX);
    timerControlsButtonsBOX.pauseBOX.addEventListener('click', pauseTimerBOX);
    timerControlsButtonsBOX.stopBOX.addEventListener('click', stopTimerBOX);
}

function initializeStatusPanelBOX() {
    statusPanelBOX = {
        timeOverviewMessageBOX: document.getElementById('timeOverviewMessageBOX'),

        elapsedInIntervalBoxBOX: document.getElementById('elapsedInIntervalBoxBOX'),
        elapsedInBreakIntervalBoxBOX: document.getElementById('elapsedInBreakIntervalBoxBOX'),
        elapsedInIntervalBOX: document.getElementById('elapsedInIntervalBOX'),
        elapsedInBreakIntervalBOX: document.getElementById('elapsedInBreakIntervalBOX'),
        elapsedInBreakIntervalBox2BOX: document.getElementById('elapsedInBreakIntervalBox2BOX'),
        elapsedInBreakInterval2BOX: document.getElementById('elapsedInBreakInterval2BOX'),
        elapsedInBreakIntervalBox3BOX: document.getElementById('elapsedInBreakIntervalBox3BOX'),
        elapsedInBreakInterval3BOX: document.getElementById('elapsedInBreakInterval3BOX'),

        intervalsDoneBOX: document.getElementById('intervalsDoneBOX'),
    };
}

function setTimerControlsDisabledStateBOX(startBOX, pauseBOX, stopBOX) {
    timerControlsButtonsBOX.startBOX.disabled = startBOX;
    timerControlsButtonsBOX.pauseBOX.disabled = pauseBOX;
    timerControlsButtonsBOX.stopBOX.disabled = stopBOX;
}

function setFormDisabledStateBOX(disabled) {
    formSettingsFieldsBOX.intervalCountBOX.disabled = disabled;
    formSettingsFieldsBOX.intervalDurationBOX.disabled = disabled;
    formSettingsFieldsBOX.enableBreakBOX.disabled = disabled || timerSettingsBOX.intervalCountBOX === 1;
    formSettingsFieldsBOX.breakDurationBOX.disabled = disabled;
    formSettingsFieldsBOX.enableBreak2BOX.disabled = disabled
    formSettingsFieldsBOX.breakDuration2BOX.disabled = disabled;
    formSettingsFieldsBOX.enableBreak3BOX.disabled = disabled
    formSettingsFieldsBOX.breakDuration3BOX.disabled = disabled;
    minusBtnBOX.disabled = disabled;
    plusBtnBOX.disabled = disabled;
}

function startTimerBOX() {
    isBOXon = true;
    if (intBOX !== null) {
        clearInterval(intBOX);
    }
    setFormDisabledStateBOX(true);
    setTimerControlsDisabledStateBOX(true, true, true);
    setTimeout(() => {
        setTimerControlsDisabledStateBOX(true, false, true);
    }, 2000);
    timerControlsButtonsBOX.stopBOX.style.color = "rgb(177, 177, 177)";
    if (timerBOX.isBreak3BOX) {
        if (!ismuteBOX) {
            audioObjects.bell.muted = false;
            audioObjects.bell.play();
            setTimeout(() => {
                audioObjects.inhale.muted = false;
                audioObjects.inhale.play();
            }, 1500);    
        }
        setTimeout(() => {
            BOXchangeBall(1.5, timerSettingsBOX.intervalDurationBOX);
        }, 1500); 
    }
    if (!audioPlayerBRT.muted) {
        playSelectedSongBRT(true);
    }
    if (timerBOX.isFinishedBOX) {
        resetTimerBOX();
    }
    setTimeout(() => {
        setTimeout(() => {
            intBOX = setInterval(displayTimerBOX, 1000);
        }, 1000);
        startTimerTickBOX();
        if (BOXisPaused) {
            // Resume from paused state
            BOXstartTimer(BOXtimeRemaining);
            BOXisPaused = false;
        } else {
            // Start a new timer
            clearInterval(BOXcountdown);
            BOXtimeRemaining = BOXtimeInput.value === '∞' ? Infinity : parseInt(BOXtimeInput.value);
            BOXcountdownDisplay.textContent = '';
            BOXstartTimer(BOXtimeRemaining);
        }
    }, 1700);  
    timerControlsButtonsBOX.startBOX.style.display = 'none';
    timerControlsButtonsBOX.pauseBOX.style.display = 'inline';
    document.getElementById('BOXSettings').disabled = true;
    document.getElementById('BOXSettings').style.color = 'rgb(177, 177, 177)';
    document.getElementById('BOXSave').disabled = true;
    document.getElementById('BOXSave').style.color = 'rgb(177, 177, 177)';
}
function BOXstartTimer(BOXduration) {
    BOXcountdown = setInterval(function () {
        if (BOXduration > 0 && BOXduration !== Infinity) {
            BOXduration--;
            BOXtimeRemaining = BOXduration;
            let BOXContdownminutes = Math.floor(BOXduration / 60);
            let BOXContdownseconds = BOXduration % 60;
            BOXcountdownDisplay.textContent = `${BOXContdownminutes}:${BOXContdownseconds.toString().padStart(2, '0')}`;
            BOXtimeInput.classList.add('CountdownHidden');
            BOXcountdownDisplay.classList.remove('CountdownHidden');
        } else if (BOXduration == Infinity) {
            BOXcountdownDisplay.textContent = '∞';
            BOXtimeInput.classList.add('CountdownHidden');
            BOXcountdownDisplay.classList.remove('CountdownHidden');
        }
    }, 1000);
}
function pauseTimerBOX() {
    isBOXon = false;
    clearInterval(intBOX);
    setTimerControlsDisabledStateBOX(false, true, false);
    document.getElementById('stopBtnBOX').style.color = '#990000';
    timerControlsButtonsBOX.pauseBOX.style.display = 'none';
    timerControlsButtonsBOX.startBOX.style.display = 'inline';
    document.getElementById('BOXSettings').disabled = false;
    document.getElementById('BOXSettings').style.color = '#49B79D';
    if (!audioPlayerBRT.muted) {
        audioPlayerBRT.pause();
    }
    stopTimerTickBOX();
    document.getElementById('BOXDate').value = date;
    document.getElementById('BOXSave').disabled = false;
    document.getElementById('BOXSave').style.color = '#49B79D';
    clearInterval(BOXcountdown);
    BOXisPaused = true;
    BOXchangeBall(1, 1);
}

function stopTimerBOX() {
    isBOXon = false;
    clearInterval(intBOX);
    [secondsBOX, minutesBOX, hoursBOX] = [0, 0, 0];
    timerRefBOX.value = '00 : 00 : 00';
    audioPlayerBRT.currentTime = 0
    timerControlsButtonsBOX.pauseBOX.style.display = 'none';
    timerControlsButtonsBOX.startBOX.style.display = 'inline';
    setFormDisabledStateBOX(false);
    setTimerControlsDisabledStateBOX(false, true, true);
    timerControlsButtonsBOX.stopBOX.style.color = "rgb(177, 177, 177)";
    document.getElementById('BOXSave').disabled = true;
    document.getElementById('BOXSave').style.color = 'rgb(177, 177, 177)';
    stopTimerTickBOX();
    resetTimerBOX();
    timerControlsButtonsBOX.startBOX.style.color = '#49B79D';
    clearInterval(BOXcountdown);
    BOXisPaused = false;
    BOXtimeInput.classList.remove('CountdownHidden');
    BOXcountdownDisplay.classList.add('CountdownHidden');
    BOXchangeBall(1, 1);
}

function displayTimerBOX() {
    secondsBOX++;
    if (secondsBOX == 60) {
        secondsBOX = 0;
        minutesBOX++;
        if (minutesBOX == 60) {
            minutesBOX = 0;
            hoursBOX++;
        }
    }
    let hBOX = hoursBOX < 10 ? "0" + hoursBOX : hoursBOX;
    let mBOX = minutesBOX < 10 ? "0" + minutesBOX : minutesBOX;
    let sBOX = secondsBOX < 10 ? "0" + secondsBOX : secondsBOX;
    timerRefBOX.value = `${hBOX} : ${mBOX} : ${sBOX}`;
}

function startTimerTickBOX() {
    timerBOX.intervalId = setInterval(onTimerTickBOX, 1000);
}

function stopTimerTickBOX() {
    clearInterval(timerBOX.intervalId);
}

function onTimerTickBOX() {
    const currentIntervalDurationBOX = timerBOX.isBreakBOX ? timerSettingsBOX.breakDurationBOX : timerBOX.isBreak2BOX ? timerSettingsBOX.breakDuration2BOX : timerBOX.isBreak4BOX ? timerSettingsBOX.breakDuration3BOX : timerSettingsBOX.intervalDurationBOX;
    if (timerBOX.elapsedInIntervalBOX <= currentIntervalDurationBOX && timerBOX.isBreak3BOX) {
        timerBOX.elapsedInIntervalBOX++;
        if (timerBOX.elapsedInIntervalBOX == currentIntervalDurationBOX && timerBOX.isBreak3BOX) {
            if (!ismuteBOX) {
                audioObjects.hold.muted = false;
                audioObjects.hold.play();
            }
            BOXchangeBall(1.3, timerSettingsBOX.breakDurationBOX);
        }
        if (timerBOX.elapsedInIntervalBOX > currentIntervalDurationBOX && timerBOX.isBreak3BOX) {
            timerBOX.isBreakBOX = true;
            timerBOX.isBreak3BOX = false;
            timerBOX.isFinishedBOX = timerBOX.intervalsDoneBOX === timerSettingsBOX.intervalCountBOX;
            if (!timerBOX.isFinishedBOX) {
                timerBOX.elapsedInIntervalBOX = 1;
            }
            if (timerBOX.isFinishedBOX) {
                setTimerControlsDisabledStateBOX(false, true, true);
                setFormDisabledStateBOX(false);
                stopTimerTickBOX();
            } else {
                timerBOX.totalTimeElapsedBOX++;
            }
            updateInfoBOX();
        }
        updateInfoBOX();
    } else if (timerBOX.elapsedInIntervalBOX <= currentIntervalDurationBOX && timerBOX.isBreakBOX) {
        timerBOX.elapsedInIntervalBOX++;
        if (timerBOX.elapsedInIntervalBOX == currentIntervalDurationBOX && timerBOX.isBreakBOX) {
            if (!ismuteBOX) {
                audioObjects.exhale.muted = false;
                audioObjects.exhale.play();
            }
            BOXchangeBall(0.5, timerSettingsBOX.breakDuration2BOX);
        }
        if (timerBOX.elapsedInIntervalBOX > currentIntervalDurationBOX && timerBOX.isBreakBOX) {
            timerBOX.isBreak2BOX = true;
            timerBOX.isBreakBOX = false;
            timerBOX.isFinishedBOX = timerBOX.intervalsDoneBOX === timerSettingsBOX.intervalCountBOX;
            if (!timerBOX.isFinishedBOX) {
                timerBOX.elapsedInIntervalBOX = 1;
            }
            if (timerBOX.isFinishedBOX) {
                setTimerControlsDisabledStateBOX(false, true, true);
                setFormDisabledStateBOX(false);
                stopTimerTickBOX();
            } else {
                timerBOX.totalTimeElapsedBOX++;
            }
            updateInfoBOX();
        }
        updateInfoBOX();
    } else if (timerBOX.elapsedInIntervalBOX <= currentIntervalDurationBOX && timerBOX.isBreak2BOX) {
        timerBOX.elapsedInIntervalBOX++;
        if (timerBOX.elapsedInIntervalBOX == currentIntervalDurationBOX && timerBOX.isBreak2BOX) {
            if (!ismuteBOX) {
                audioObjects.hold.muted = false;
                audioObjects.hold.play();
            }
            BOXchangeBall(0.5, timerSettingsBOX.breakDuration3BOX);
        }
        if (timerBOX.elapsedInIntervalBOX > currentIntervalDurationBOX && timerBOX.isBreak2BOX) {
            timerBOX.isBreak4BOX = true;
            timerBOX.isBreak2BOX = false;
            timerBOX.isFinishedBOX = timerBOX.intervalsDoneBOX === timerSettingsBOX.intervalCountBOX;
            if (!timerBOX.isFinishedBOX) {
                timerBOX.elapsedInIntervalBOX = 1;
            }
            if (timerBOX.isFinishedBOX) {
                setTimerControlsDisabledStateBOX(false, true, true);
                setFormDisabledStateBOX(false);
                stopTimerTickBOX();
            } else {
                timerBOX.totalTimeElapsedBOX++;
            }
            updateInfoBOX();
        }
        updateInfoBOX();
    } else if (timerBOX.elapsedInIntervalBOX <= currentIntervalDurationBOX && timerBOX.isBreak4BOX) {
        timerBOX.elapsedInIntervalBOX++;
        if (timerBOX.elapsedInIntervalBOX == currentIntervalDurationBOX && timerBOX.isBreak4BOX) {
            if (!ismuteBOX) {
                if(BOXcountdownDisplay.textContent == '0:00') {
                    audioObjects.inhale.muted = true;
                    clearInterval(BOXcountdown);
                    if (!ismuteBOX) {
                        audioObjects.bell.muted = false;
                        audioObjects.bell.play();
                    }
                    clearInterval(intBOX);
                    setTimerControlsDisabledStateBOX(true, true, false);
                    document.getElementById('stopBtnBOX').style.color = '#990000';
                    timerControlsButtonsBOX.pauseBOX.style.display = 'none';
                    timerControlsButtonsBOX.startBOX.style.display = 'inline';
                    timerControlsButtonsBOX.startBOX.style.color = "rgb(177, 177, 177)";
                    document.getElementById('BOXSettings').disabled = false;
                    document.getElementById('BOXSettings').style.color = '#49B79D';
                    if (!audioPlayerBRT.muted) {
                        audioPlayerBRT.pause();
                    }
                    stopTimerTickBOX();
                    document.getElementById('BOXDate').value = date;
                    document.getElementById('BOXSave').disabled = false;
                    document.getElementById('BOXSave').style.color = '#49B79D';
                    clearInterval(BOXcountdown);
                    BOXisPaused = false;
                    setTimeout(() => {
                        audioObjects.normalbreath.muted = false;
                        audioObjects.normalbreath.play();
                        if (isPortuguese) {
                            BOXballText.textContent = 'Respira\u00E7\u00E3o Normal';
                        } else {
                            BOXballText.textContent = 'Normal Breath';
                        }
                    }, 1000);
                } else {
                    audioObjects.inhale.muted = false;
                    audioObjects.inhale.play();
                }
            }
            BOXchangeBall(1.5, timerSettingsBOX.intervalDurationBOX);
        }
        if (timerBOX.elapsedInIntervalBOX > currentIntervalDurationBOX && timerBOX.isBreak4BOX) {
            timerBOX.isBreak3BOX = true;
            timerBOX.isBreak4BOX = false;
            timerBOX.intervalsDoneBOX++;
            timerBOX.isFinishedBOX = timerBOX.intervalsDoneBOX === timerSettingsBOX.intervalCountBOX;
            if (!timerBOX.isFinishedBOX) {
                timerBOX.elapsedInIntervalBOX = 1;
            }
            if (timerBOX.isFinishedBOX) {
                setTimerControlsDisabledStateBOX(false, true, true);
                setFormDisabledStateBOX(false);
                stopTimerTickBOX();
            } else {
                timerBOX.totalTimeElapsedBOX++;
            }
            updateInfoBOX();
        }
        updateInfoBOX();
    }
}

function updateInfoBOX() {
    statusPanelBOX.timeOverviewMessageBOX.style.display = timerBOX.isFinishedBOX ? 'block' : null;
    statusPanelBOX.elapsedInIntervalBoxBOX.style.display = timerBOX.isFinishedBOX || timerBOX.isBreakBOX || timerBOX.isBreak2BOX || timerBOX.isBreak4BOX ? 'none' : null;
    statusPanelBOX.elapsedInBreakIntervalBoxBOX.style.display = !timerBOX.isFinishedBOX && timerBOX.isBreakBOX ? 'block' : null;
    statusPanelBOX.elapsedInBreakIntervalBox2BOX.style.display = !timerBOX.isFinishedBOX && timerBOX.isBreak2BOX ? 'block' : null;
    statusPanelBOX.elapsedInBreakIntervalBox3BOX.style.display = !timerBOX.isFinishedBOX && timerBOX.isBreak4BOX ? 'block' : null;
    if (isPortuguese) {
        if (timerBOX.isBreakBOX) {
            BOXballText.textContent = 'SEGURE';
        } else if (timerBOX.isBreak2BOX) {
            BOXballText.textContent = 'EXPIRA';
        } else if (timerBOX.isBreak4BOX) {
            BOXballText.textContent = 'SEGURE';
        } else {
            BOXballText.textContent = 'INSPIRA';
        }
    } else {
        if (timerBOX.isBreakBOX) {
            BOXballText.textContent = 'HOLD';
        } else if (timerBOX.isBreak2BOX) {
            BOXballText.textContent = 'EXHALE';
        } else if (timerBOX.isBreak4BOX) {
            BOXballText.textContent = 'HOLD';
        } else {
            BOXballText.textContent = 'INHALE';
        }
    }
    statusPanelBOX.intervalsDoneBOX.value = timerBOX.intervalsDoneBOX;

}

//---------------------------------------------------//
