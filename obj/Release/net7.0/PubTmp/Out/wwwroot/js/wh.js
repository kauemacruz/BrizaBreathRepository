//WH js//
var isWHon = false;
const WHball = document.getElementById('WHball');
const WHballText = document.getElementById('WHballText');

function WHchangeBall(scale, duration) {
    WHball.style.transition = `transform ${duration}s ease`;
    WHball.style.transform = `scale(${scale})`;
}

//WH Modal
const modalWH = document.getElementById("myModalWH");
const closeModalWHButton = document.getElementById("closeModalWH");
var WHquestion = document.getElementById("WHquestion");

function openModalWH() {
    modalWH.style.display = "block";
    showSlides(slideIndex, 'WHslides');
}

// Function to close the modalWH
function closeModalWH() {
    modalWH.style.display = "none";
    slideIndex = 1;

}

// Event listener for closing the modalWH
closeModalWHButton.addEventListener("click", closeModalWH);

// Close the modalWH if the user clicks outside the modalWH content
window.addEventListener("click", function (event) {
    if (event.target === modalWH) {
        closeModalWH();
    }
});
WHquestion.onclick = function () {
    openModalWH();
}

WHLink.onclick = function () {
    if (isUserActiveSubscriber) {
        openPage(BHPage, WHPage, 'slideLeft');
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        backBH.style.display = "none";
        backWH.style.display = "block";
        audioObjects.fullyin.load();
        audioObjects.fullyout.load();
        audioObjects.letgoandhold.load();
        audioObjects.fullyinHold.load();
        audioObjects.normalbreath.load();
        audioObjects.nextRound.load();
    } else {
        openModal();
    }
}
WHLink3.onclick = function () {
    if (isUserActiveSubscriber) {
        openPage(programPage2, WHPage, 'slideLeft');
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        backProgram2.style.display = "none";
        backWH3.style.display = "block";
        audioObjects.fullyin.load();
        audioObjects.fullyout.load();
        audioObjects.letgoandhold.load();
        audioObjects.fullyinHold.load();
        audioObjects.normalbreath.load();
        audioObjects.nextRound.load();
    } else {
        openModal();
    }
}
backWH.onclick = function () {
    openPage(WHPage, BHPage, 'slideRight');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    backBH.style.display = "block";
    backWH.style.display = "none";
    WHclose();
}
backWH2.onclick = function () {
    openPage(WHPage, programPage, 'slideRight');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    backProgram.style.display = "block";
    backWH2.style.display = "none";
    WHclose();
}
backWH3.onclick = function () {
    openPage(WHPage, programPage2, 'slideRight');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    backProgram2.style.display = "block";
    backWH3.style.display = "none";
    WHclose();
}
WHSettings.onclick = function () {
    openPage(WHPage, WHSettingsPage, 'slideLeft');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    selectSongsList.style.display = "block";
    backWHSet.style.display = "block";
    backWH.style.display = "none";
    backWH2.style.display = "none";
    backWH3.style.display = "none";
}
backWHSet.onclick = function () {
    if (!audioPlayerBRT.muted) {
        audioPlayerBRT.pause();
    }
    audioPlayerBRT.currentTime = 0;
    openPage(WHSettingsPage, WHPage, 'slideRight');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    selectSongsList.style.display = "none";
    backWH.style.display = "block";
    backWHSet.style.display = "none";
}

function WHclose() {
    isWHon = false;
    clearTimeout(intWH);
    intWH = null;
    [secondsWH, minutesWH] = [0, 0];
    document.getElementById('WHSettings').disabled = false;
    document.getElementById('WHSettings').style.color = '#49B79D';
    if (!audioPlayerBRT.muted) {
        audioPlayerBRT.pause();
    }
    audioPlayerBRT.currentTime = 0;
    timerControlsButtonsWH.pauseWH.style.display = 'none';
    timerControlsButtonsWH.startWH.style.display = 'inline';
    setFormDisabledStateWH(false);
    setTimerControlsDisabledStateWH(false, true, true);
    timerControlsButtonsWH.stopWH.style.color = "rgb(177, 177, 177)";
    WHbreaths = formSettingsFieldsWH.breakDuration2WH.value;
    clearTimeout(WHmyTimeout);
    WHmyTimeout = null;
    clearTimeout(WHmyTimeout2);
    WHmyTimeout2 = null;
    timerWH.isBreak2WH = false;
    timerWH.isBreak3WH = false;
    timerWH.isBreakWH = false;
    WHchangeBall(1.5, 1);
    WHballText.textContent = formSettingsFieldsWH.breakDuration2WH.value;

}

var WHbreaths = 30;
var WHbreathsSpeed = 2000;
var WHbreathSpeed2 = 1;
let WHmyTimeout;
let WHmyTimeout2;
WHballText.textContent = WHbreaths;


function WHanimate() {
    if (WHbreaths < 1) {
        clearTimeout(WHmyTimeout);         
        WHholdFunction();
        return;
    } else {
        WHballText.textContent = WHbreaths;
        WHchangeBall(1.5, WHbreathSpeed2);
        if (!ismuteWH) {
            audioObjects.fullyin.play();
        }
        setTimeout(function () {
            WHchangeBall(0.5, WHbreathSpeed2);
            if (!ismuteWH) {
                audioObjects.fullyout.play();
            }
        }, WHbreathsSpeed/2);
    }
    WHbreaths--;
    WHmyTimeout = setTimeout(WHanimate, WHbreathsSpeed);
}
function WHholdFunction() {
    timerWH.isBreak3WH = true;
    timerWH.isBreak2WH = false;
    timerWH.isBreakWH = false;
    WHmyTimeout = null;
    setTimerControlsDisabledStateWH(true, false, false);
    timerControlsButtonsWH.pauseWH.style.color = '#0661AA';
    if (!ismuteWH) {
        audioObjects.letgoandhold.muted = false;
        audioObjects.letgoandhold.play();
    }
    if (isPortuguese) {
        WHballText.textContent = 'SOLTA E SEGURA';
    } else {
        WHballText.textContent = 'LET GO & HOLD';
    }
    WHchangeBall(1.5, 1);
    setTimeout(function () {
        displayTimerWH();
    }, 3000);
}
var WHcountdown = 15;
function WHanimate2() {
    if (WHcountdown < 1) {
        clearTimeout(WHmyTimeout2);    
        WHnextRound();
        return;
    }
    WHballText.textContent = WHcountdown;
    WHcountdown--;
    WHmyTimeout2 = setTimeout(WHanimate2, 1000);
}
function WHnextRound() {
    timerWH.isBreak2WH = false;
    timerWH.isBreak3WH = false;
    timerWH.isBreakWH = true;
    WHcountdown = 15;
    WHmyTimeout2 = null;
    if (!ismuteWH) {
        audioObjects.nextRound.muted = false;
        audioObjects.nextRound.play();
    }
    if (isPortuguese) {
        WHballText.textContent = 'PROXIMO ROUND';
    } else {
        WHballText.textContent = 'NEXT ROUND';
    }
    WHbreaths = formSettingsFieldsWH.breakDuration2WH.value;
    setTimeout(() => {
        if (!ismuteWH) {
            audioObjects.fullyout.play();
        }
        WHchangeBall(0.5, 1);
    }, 2000); 
    setTimeout(() => {
        WHanimate();
    }, 3000); 
}
$(function () {
    $('#WHForm').on('submit', function (e) {
        e.preventDefault(); // Prevent the default form submission

        var formData = new FormData(this); // Get the form data

        $.ajax({
            url: "/",
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function (result) {
                $('#WHResultSaved').html(result); // Update the result section with the server response
            }
        });
        document.getElementById("WHResults").innerHTML = "";
        timerRefWH.value = "|";
        clearTimeout(intWH);
        intWH = null;
        document.getElementById('WHSettings').disabled = false;
        document.getElementById('WHSettings').style.color = '#49B79D';
        if (!audioPlayerBRT.muted) {
            audioPlayerBRT.pause();
        }
        timerControlsButtonsWH.pauseWH.style.display = 'none';
        timerControlsButtonsWH.startWH.style.display = 'inline';
        setFormDisabledStateWH(false);
        setTimerControlsDisabledStateWH(false, true, true);
        document.getElementById('resetBtnWH').style.display = 'none';
        document.getElementById('stopBtnWH').style.display = 'inline';
        timerControlsButtonsWH.stopWH.style.color = "rgb(177, 177, 177)";
        timerControlsButtonsWH.startWH.style.color = "#0661AA";
        document.getElementById('WHSave').disabled = true;
        document.getElementById('WHSave').style.color = 'rgb(177, 177, 177)';
        resetTimerWH();
        timerWH.isFinishedWH = true;
        clearTimeout(WHmyTimeout);
        WHmyTimeout = null;
        clearTimeout(WHmyTimeout2);
        WHmyTimeout2 = null;
        timerWH.isBreak2WH = false;
        timerWH.isBreak3WH = false;
        timerWH.isBreakWH = false;
        WHchangeBall(1.5, 1);
        WHballText.textContent = formSettingsFieldsWH.breakDuration2WH.value;
    });
});

let formSettingsFieldsWH,
    timerControlsButtonsWH,
    statusPanelWH,
    timerWH,
    timerSettingsWH;

function setTimerSettingsWH(
    intervalCountWH = timerSettingsWH.intervalCountWH,
    intervalDurationWH = timerSettingsWH.intervalDurationWH,
    enableBreakWH = timerSettingsWH.enableBreakWH,
    breakDurationWH = timerSettingsWH.breakDurationWH,
    enableBreak2WH = timerSettingsWH.enableBreak2WH,
    breakDuration2WH = timerSettingsWH.breakDuration2WH
) {
    timerSettingsWH = {
        intervalCountWH,
        intervalDurationWH,
        enableBreakWH,
        breakDurationWH,
        enableBreak2WH,
        breakDuration2WH,
    };
}

function resetTimerWH() {
    timerWH = {
        totalTimeElapsedWH: 0,
        elapsedInIntervalWH: 0,
        intervalsDoneWH: 0,
        isBreak3WH: false,
        isBreakWH: false,
        isBreak2WH: true,
        isFinishedWH: false
    };
    updateInfoWH();
}

let [secondsWH, minutesWH, hoursWH] = [0, 0, 0];
let timerRefWH = document.getElementById('timerDisplayWH');
let intWH = null;
document.getElementById('stopBtnWH').disabled = true;
document.getElementById('stopBtnWH').style.color = 'rgb(177, 177, 177)';
document.getElementById('WHSave').disabled = true;
document.getElementById('WHSave').style.color = 'rgb(177, 177, 177)';

var audioWH = document.getElementById("audioWH"),
    muteWH = document.getElementById("muteWH"),
    ismuteWH = false;

var BaudioWH = document.getElementById("BaudioWH"),
    BmuteWH = document.getElementById("BmuteWH"),
    BismuteWH = false;

var audioSongWH = document.getElementById("songWH"),
    muteSongWH = document.getElementById("songMuteWH");
// Get the volumeVWH bar element
const volumeVoiceWH = document.getElementById('volumeVoiceWH');

// Add an event listener for the volumeVWH change event
volumeVoiceWH.addEventListener('input', function () {
    // Get the current volumeVWH value
    const volumeVWH = parseFloat(volumeVoiceWH.value);

    // Check if volumeVWH is 0 and mute the media if necessary
    if (volumeVWH === 0) {
        audioObjects.inhale.muted = true;
        audioObjects.normalbreath.muted = true;
        audioObjects.letgoandhold.muted = true;
        audioObjects.fullyinHold.muted = true;
        audioWH.style.display = "none";
        muteWH.style.display = "block";
        ismuteWH = true;
    } else {
        audioObjects.inhale.muted = false;
        audioObjects.normalbreath.muted = false;
        audioObjects.letgoandhold.muted = false;
        audioObjects.fullyinHold.muted = false;
        muteWH.style.display = "none";
        audioWH.style.display = "block";
        ismuteWH = false;
    }
});
// Get the volumeVWH bar element
const BvolumeVoiceWH = document.getElementById('BvolumeVoiceWH');

// Add an event listener for the volumeVWH change event
BvolumeVoiceWH.addEventListener('input', function () {
    // Get the current volumeVWH value
    const BvolumeVWH = parseFloat(BvolumeVoiceWH.value);

    // Check if volumeVWH is 0 and mute the media if necessary
    if (BvolumeVWH === 0) {
        audioObjects.fullyin.muted = true;
        audioObjects.fullyout.muted = true;
        BaudioWH.style.display = "none";
        BmuteWH.style.display = "block";
        BismuteWH = true;
    } else {
        audioObjects.fullyin.muted = false;
        audioObjects.fullyout.muted = false;
        BmuteWH.style.display = "none";
        BaudioWH.style.display = "block";
        BismuteWH = false;
    }
});

// Get the volumeSWH bar element
const volumeSongWH = document.getElementById('volumeSongWH');

// Add an event listener for the volumeSWH change event
volumeSongWH.addEventListener('input', function () {
    // Get the current volumeSWH value
    const volumeSWH = parseFloat(volumeSongWH.value);

    // Check if volumeSWH is 0 and mute the media if necessary
    if (volumeSWH === 0) {
        audioPlayerBRT.muted = true;
        audioSongWH.style.display = "none";
        muteSongWH.style.display = "block";
    } else {
        audioPlayerBRT.muted = false;
        muteSongWH.style.display = "none";
        audioSongWH.style.display = "block";
    }
});


var inhaleWH = 9999;
var holdHW = 15;
var exhaleWH = 9999;
setTimerSettingsWH(9999, inhaleWH, true, holdHW, true, exhaleWH);
initializeTimerControlsWH();
initializeStatusPanelWH();
initializeTimerSettingsFormWH();
resetTimerWH();

var minusBtnWH = document.getElementById("minusWH"),
    plusBtnWH = document.getElementById("plusWH"),
    numberWH = 30, /// numberWH value
    minWH = 10, /// minWH numberWH
    maxWH = 70;
minusBtnWH.onclick = function () {
    if (numberWH > minWH) {
        numberWH = numberWH - 10;
        formSettingsFieldsWH.breakDuration2WH.value = numberWH;
        WHbreaths = numberWH;
        WHballText.textContent = WHbreaths;
        setTimerSettingsWH(9999, WHbreaths, true, formSettingsFieldsWH.breakDurationWH.value, true, 9999);
    }
}

plusBtnWH.onclick = function () {
    if (numberWH < maxWH) {
        numberWH = numberWH + 10;
        formSettingsFieldsWH.breakDuration2WH.value = numberWH;
        WHbreaths = numberWH;
        WHballText.textContent = WHbreaths;
        setTimerSettingsWH(9999, WHbreaths, true, formSettingsFieldsWH.breakDurationWH.value, true, 9999);
    }
}
var SminusBtnWH = document.getElementById("SminusWH"),
    SplusBtnWH = document.getElementById("SplusWH"),
    breathSpeedWH = document.getElementById("breathSpeedWH");
breathSpeedWH.value = "Medium";
SminusBtnWH.onclick = function () {
    if (breathSpeedWH.value == "Medium") {
        SminusBtnWH.style.color = "rgb(177,177,177)";
        breathSpeedWH.value = "Slow";
        WHbreathsSpeed = 3000;
        WHbreathsSpeed2 = 1.5;
    }
    else if (breathSpeedWH.value == "Fast") {
        breathSpeedWH.value = "Medium";
        WHbreathsSpeed = 2000;
        WHbreathsSpeed2 = 1;
        SplusBtnWH.style.color = "#49B79D";
    }
}

SplusBtnWH.onclick = function () {
    if (breathSpeedWH.value == "Slow") {
        SminusBtnWH.style.color = "#49B79D";
        breathSpeedWH.value = "Medium";
        WHbreathsSpeed = 2000;
        WHbreathsSpeed2 = 1;
    }
    else if (breathSpeedWH.value == "Medium") {
        breathSpeedWH.value = "Fast";
        SplusBtnWH.style.color = "rgb(177,177,177)";
        WHbreathsSpeed = 1800;
        WHbreathsSpeed2 = 0.85;
    }
}

function initializeTimerSettingsFormWH() {
    const oneDayInSecondsWH = 60 * 60 * 24;
    let lastUserSetEnableBreakWH = timerSettingsWH.enableBreakWH;
    let lastUserSetEnableBreak2 = timerSettingsWH.enableBreak2WH;
    formSettingsFieldsWH = {
        intervalCountWH: document.getElementById('intervalCountInputWH'),
        intervalDurationWH: document.getElementById('intervalDurationInputWH'),
        enableBreakWH: document.getElementById('enableBreakInputWH'),
        breakDurationWH: document.getElementById('breakDurationInputWH'),
        enableBreak2WH: document.getElementById('enableBreakInput2WH'),
        breakDuration2WH: document.getElementById('breakDurationInput2WH'),
    };
    formSettingsFieldsWH.intervalCountWH.value = timerSettingsWH.intervalCountWH;
    formSettingsFieldsWH.intervalDurationWH.value = timerSettingsWH.intervalDurationWH;
    formSettingsFieldsWH.enableBreakWH.checked = timerSettingsWH.enableBreakWH;
    formSettingsFieldsWH.breakDurationWH.value = timerSettingsWH.breakDurationWH;
    formSettingsFieldsWH.enableBreak2WH.checked = timerSettingsWH.enableBreak2WH;
    formSettingsFieldsWH.breakDuration2WH.value = 30;
}

function initializeTimerControlsWH() {
    timerControlsButtonsWH = {
        startWH: document.getElementById('startBtnWH'),
        pauseWH: document.getElementById('pauseBtnWH'),
        stopWH: document.getElementById('stopBtnWH'),
    };
    setTimerControlsDisabledStateWH(false, true, true);
    timerControlsButtonsWH.startWH.addEventListener('click', startTimerWH);
    timerControlsButtonsWH.pauseWH.addEventListener('click', pauseTimerWH);
    timerControlsButtonsWH.stopWH.addEventListener('click', stopTimerWH);
}

function initializeStatusPanelWH() {
    statusPanelWH = {
        timeOverviewMessageWH: document.getElementById('timeOverviewMessageWH'),

        elapsedInIntervalBoxWH: document.getElementById('elapsedInIntervalBoxWH'),
        elapsedInBreakIntervalBoxWH: document.getElementById('elapsedInBreakIntervalBoxWH'),
        elapsedInIntervalWH: document.getElementById('elapsedInIntervalWH'),
        elapsedInBreakIntervalWH: document.getElementById('elapsedInBreakIntervalWH'),
        elapsedInBreakIntervalBox2WH: document.getElementById('elapsedInBreakIntervalBox2WH'),
        elapsedInBreakInterval2WH: document.getElementById('elapsedInBreakInterval2WH'),
        intervalsDoneWH: document.getElementById('intervalsDoneWH'),
    };
}

function setTimerControlsDisabledStateWH(startWH, pauseWH, stopWH) {
    timerControlsButtonsWH.startWH.disabled = startWH;
    timerControlsButtonsWH.pauseWH.disabled = pauseWH;
    timerControlsButtonsWH.stopWH.disabled = stopWH;
}

function setFormDisabledStateWH(disabled) {
    formSettingsFieldsWH.intervalCountWH.disabled = disabled;
    formSettingsFieldsWH.intervalDurationWH.disabled = disabled;
    formSettingsFieldsWH.enableBreakWH.disabled = disabled || timerSettingsWH.intervalCountWH === 1;
    formSettingsFieldsWH.breakDurationWH.disabled = disabled;
    formSettingsFieldsWH.enableBreak2WH.disabled = disabled
    formSettingsFieldsWH.breakDuration2WH.disabled = disabled;
    minusBtnWH.disabled = disabled;
    plusBtnWH.disabled = disabled;
}
var musicIsOnWH = false;
function startTimerWH() {
    isWHon = true;
    timerWH.isBreakWH = true;
    timerWH.isBreak2WH = false;
    timerWH.isBreak3WH = false;
    setFormDisabledStateWH(true);
    setTimerControlsDisabledStateWH(true, true, false);
    timerControlsButtonsWH.pauseWH.style.color = 'rgb(177, 177, 177)';
    document.getElementById('stopBtnWH').style.color = '#990000';
    clearTimeout(intWH);
    intWH = null;
    if (timerWH.isFinishedWH) {
        resetTimerWH();
    }
    if (!audioPlayerBRT.muted) {
        playSelectedSongBRT(true);
    }
    if (!BismuteWH) {
        audioObjects.fullyin.muted = false;
        audioObjects.fullyin.loop = false;
        audioObjects.fullyin.play();
    }
    WHanimate(); 
    timerControlsButtonsWH.startWH.style.display = 'none';
    timerControlsButtonsWH.pauseWH.style.display = 'inline';
    document.getElementById('WHDate').value = date;
    document.getElementById('WHSettings').disabled = true;
    document.getElementById('WHSettings').style.color = 'rgb(177, 177, 177)';
}

function pauseTimerWH() {
    timerWH.intervalsDoneWH++;
    intervalsDoneWH.value = timerWH.intervalsDoneWH;
    timerRefWH.value += timeWH + "|";
    setTimerControlsDisabledStateWH(true, true, false);
    timerControlsButtonsWH.pauseWH.style.color = "rgb(177, 177, 177)";
    if (isPortuguese) {
        document.getElementById("WHResults").innerHTML += "<div class='NOfSteps'> <div>Round " + (timerWH.intervalsDoneWH) + "</div><div>" + timeWH + " segundos</div></div>";
    } else {
        document.getElementById("WHResults").innerHTML += "<div class='NOfSteps'> <div>Round " + (timerWH.intervalsDoneWH) + "</div><div>" + timeWH + " seconds</div></div>";
    }
    clearTimeout(intWH);
    intWH = null;
    [secondsWH, minutesWH] = [0, 0];
    timerControlsButtonsWH.stopWH.style.color = '#990000';
    if (!ismuteWH) {
        audioObjects.fullyinHold.muted = false;
        audioObjects.fullyinHold.play();
    }
    WHchangeBall(1.5, 1);
    WHanimate2();
    timerWH.isBreak2WH = true;
    timerWH.isBreak3WH = false;
    timerWH.isBreakWH = false;
}

function stopTimerWH() {
    isWHon = false;
    if (timerWH.isBreak3WH) {
        timerWH.intervalsDoneWH++;
        intervalsDoneWH.value = timerWH.intervalsDoneWH;
        timerRefWH.value += timeWH + "|";
        if (isPortuguese) {
            document.getElementById("WHResults").innerHTML += "<div class='NOfSteps'> <div>Round " + (timerWH.intervalsDoneWH) + "</div><div>" + timeWH + " segundos</div></div>";
        } else {
            document.getElementById("WHResults").innerHTML += "<div class='NOfSteps'> <div>Round " + (timerWH.intervalsDoneWH) + "</div><div>" + timeWH + " seconds</div></div>";
        }
    }
    if (document.getElementById("WHResults").innerHTML !== "") {
        document.getElementById('WHSave').disabled = false;
        document.getElementById('WHSave').style.color = '#49B79D';
        timerControlsButtonsWH.stopWH.style.display = "none";
        document.getElementById('resetBtnWH').style.display = 'inline';
        document.getElementById('resetBtnWH').style.color = '#990000';
        setTimerControlsDisabledStateWH(true, true, true);
        timerControlsButtonsWH.startWH.style.color = "rgb(177, 177, 177)";
    } else {
        setTimerControlsDisabledStateWH(false, true, true);
        timerControlsButtonsWH.startWH.style.color = '#49B79D';
    }
    clearTimeout(intWH);
    intWH = null;
    [secondsWH, minutesWH] = [0, 0];
    document.getElementById('WHSettings').disabled = false;
    document.getElementById('WHSettings').style.color = '#49B79D';
    if (!audioPlayerBRT.muted) {
        audioPlayerBRT.pause();
    }
    audioPlayerBRT.currentTime = 0;
    timerControlsButtonsWH.pauseWH.style.display = 'none';
    timerControlsButtonsWH.startWH.style.display = 'inline';
    setFormDisabledStateWH(false);
    timerControlsButtonsWH.stopWH.style.color = "rgb(177, 177, 177)";
    WHbreaths = formSettingsFieldsWH.breakDuration2WH.value;
    WHballText.textContent = WHbreaths;
    if (!ismuteWH) {
        audioObjects.normalbreath.muted = false;
        audioObjects.normalbreath.play();
    }
    clearTimeout(WHmyTimeout);
    WHmyTimeout = null;
    clearTimeout(WHmyTimeout2);
    WHmyTimeout2 = null;
    timerWH.isBreak2WH = false;
    timerWH.isBreak3WH = false;
    timerWH.isBreakWH = false;
    WHchangeBall(1.5, 1);
    WHballText.textContent = formSettingsFieldsWH.breakDuration2WH.value;

}
document.getElementById('resetBtnWH').addEventListener('click', function () {
    resetTimerWH();
    setTimerControlsDisabledStateWH(false, true, true);
    timerControlsButtonsWH.startWH.style.color = '#49B79D';
    document.getElementById("WHResults").innerHTML = '';
    document.getElementById('resetBtnWH').style.display = 'none';
    timerControlsButtonsWH.stopWH.style.display = "inline";
    document.getElementById('WHSave').disabled = true;
    document.getElementById('WHSave').style.color = 'rgb(177, 177, 177)';
});


var timeWH = '';
function displayTimerWH() {
    secondsWH++;
    if (secondsWH == 60) {
        secondsWH = 0;
        minutesWH++;
    }
    let mWH = minutesWH < 10 ? "0" + minutesWH : minutesWH;
    let sWH = secondsWH < 10 ? "0" + secondsWH : secondsWH;
    timeWH = `${mWH} : ${sWH}`;
    WHballText.textContent = timeWH;
    intWH = setTimeout(displayTimerWH, 1000);
}

function updateInfoWH() {
    statusPanelWH.intervalsDoneWH.value = timerWH.intervalsDoneWH;
}
