//KB js//
var isKBon = false;
const KBball = document.getElementById('KBball');
const KBballText = document.getElementById('KBballText');

function KBchangeBall(scale, duration) {
    KBball.style.transition = `transform ${duration}s ease`;
    KBball.style.transform = `scale(${scale})`;
}

//KB Modal
const modalKB = document.getElementById("myModalKB");
const closeModalKBButton = document.getElementById("closeModalKB");
var KBquestion = document.getElementById("KBquestion");

function openModalKB() {
    modalKB.style.display = "block";
    showSlides(slideIndex, 'KBslides');
}

// Function to close the modalKB
function closeModalKB() {
    modalKB.style.display = "none";
    slideIndex = 1;

}

// Event listener for closing the modalKB
closeModalKBButton.addEventListener("click", closeModalKB);

// Close the modalKB if the user clicks outside the modalKB content
window.addEventListener("click", function (event) {
    if (event.target === modalKB) {
        closeModalKB();
    }
});
KBquestion.onclick = function () {
    openModalKB();
}

KBLink.onclick = function () {
    if (isUserActiveSubscriber) {
        openPage(PRANAPage, KBPage, 'slideLeft');
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        backKB.style.display = "block";
        backPRANA.style.display = "none";
        audioObjects.fullyin.load();
        audioObjects.fullyout2.load();
        audioObjects.letgoandhold.load();
        audioObjects.fullyinHold.load();
        audioObjects.normalbreath.load();
        audioObjects.nextRound.load();
    } else {
        openModal();
    }
}
backKB.onclick = function () {
    openPage(KBPage, PRANAPage, 'slideRight');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    backPRANA.style.display = "block";
    backKB.style.display = "none";
    KBclose();
}
KBSettings.onclick = function () {
    openPage(KBPage, KBSettingsPage, 'slideLeft');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    selectSongsList.style.display = "block";
    backKBSet.style.display = "block";
    backKB.style.display = "none";
}
backKBSet.onclick = function () {
    if (!audioPlayerBRT.muted) {
        audioPlayerBRT.pause();
    }
    audioPlayerBRT.currentTime = 0;
    openPage(KBSettingsPage, KBPage, 'slideRight');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    selectSongsList.style.display = "none";
    backKB.style.display = "block";
    backKBSet.style.display = "none";
}
// Function to close the modal
function KBclose() {
    isKBon = false;
    clearTimeout(intKB);
    intKB = null;
    [secondsKB, minutesKB] = [0, 0];
    document.getElementById('KBSettings').disabled = false;
    document.getElementById('KBSettings').style.color = '#49B79D';
    if (!audioPlayerBRT.muted) {
        audioPlayerBRT.pause();
    }
    audioPlayerBRT.currentTime = 0;
    timerControlsButtonsKB.pauseKB.style.display = 'none';
    timerControlsButtonsKB.startKB.style.display = 'inline';
    setFormDisabledStateKB(false);
    setTimerControlsDisabledStateKB(false, true, true);
    timerControlsButtonsKB.stopKB.style.color = "rgb(177, 177, 177)";
    KBbreaths = formSettingsFieldsKB.breakDuration2KB.value;
    clearTimeout(KBmyTimeout);
    KBmyTimeout = null;
    clearTimeout(KBmyTimeout2);
    KBmyTimeout2 = null;
    timerKB.isBreak2KB = false;
    timerKB.isBreak3KB = false;
    timerKB.isBreakKB = false;
    setTimeout(() => {
        KBchangeBall(1.5, 1);
    }, 3000); KBballText.textContent = formSettingsFieldsKB.breakDuration2KB.value;
}


var KBbreaths = 30;
let KBmyTimeout;
let KBmyTimeout2;
KBballText.textContent = KBbreaths;


function KBanimate() {
    if (KBbreaths < 1) {
        clearTimeout(KBmyTimeout);
        KBholdFunction();
        return;
    } else {
        KBballText.textContent = KBbreaths;
        KBball.style.transition = `transform 0.2s linear`;
        KBball.style.transform = `scale(1.5)`;
 
        setTimeout(function () {
            KBball.style.transition = `transform 0.4s linear`;
            KBball.style.transform = `scale(0.3)`;
         }, 200);
    }
    KBbreaths--;
    KBmyTimeout = setTimeout(KBanimate, 600);
}
function KBholdFunction() {
    setTimerControlsDisabledStateKB(true, true, true);
    setTimeout(function () {
        setTimerControlsDisabledStateKB(true, false, false);
    }, 5000);
    timerKB.isBreak3KB = true;
    timerKB.isBreak2KB = false;
    timerKB.isBreakKB = false;
    KBmyTimeout = null;
    if (!ismuteKB) {
        audioObjects.fullyout2.pause();
        audioObjects.fullyout2.currentTime = 0;
    }
    timerControlsButtonsKB.pauseKB.style.color = '#0661AA';
    if (!ismuteKB) {
        audioObjects.fullyinHold.muted = false;
        audioObjects.fullyinHold.play();
    }
    if (isPortuguese) {
        KBballText.textContent = 'INSPIRA E SEGURA';
    } else {
        KBballText.textContent = 'FULLY IN & HOLD';
    }
    KBchangeBall(1.5, 1);
    setTimeout(function () {
        displayTimerKB();
    }, 3000);
}
var KBcountdown = 30;
function KBanimate2() {
    if (KBcountdown < 1) {
        clearTimeout(KBmyTimeout2);
        KBnextRound();
        return;
    }
    KBballText.textContent = KBcountdown;
    KBcountdown--;
    KBmyTimeout2 = setTimeout(KBanimate2, 1000);
}
function KBnextRound() {
    timerKB.isBreak2KB = false;
    timerKB.isBreak3KB = false;
    timerKB.isBreakKB = true;
    KBcountdown = 30;
    KBmyTimeout2 = null;
    if (!ismuteKB) {
        audioObjects.nextRound.muted = false;
        audioObjects.nextRound.play();
    }
    if (isPortuguese) {
        KBballText.textContent = 'PROXIMO ROUND';
    } else {
        KBballText.textContent = 'NEXT ROUND';
    }
    KBbreaths = formSettingsFieldsKB.breakDuration2KB.value;
    setTimeout(() => {
        if (!ismuteKB) {
            audioObjects.fullyout2.play();
        }
        KBchangeBall(0.5, 1);
    }, 2000);
    setTimeout(() => {
        KBanimate();
    }, 3000);
}
$(function () {
    $('#KBForm').on('submit', function (e) {
        e.preventDefault(); // Prevent the default form submission

        var formData = new FormData(this); // Get the form data

        $.ajax({
            url: "/",
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function (result) {
                $('#KBResultSaved').html(result); // Update the result section with the server response
            }
        });
        document.getElementById("KBResults").innerHTML = "";
        timerRefKB.value = "|";
        clearTimeout(intKB);
        intKB = null;
        document.getElementById('KBSettings').disabled = false;
        document.getElementById('KBSettings').style.color = '#49B79D';
        if (!audioPlayerBRT.muted) {
            audioPlayerBRT.pause();
        }
        timerControlsButtonsKB.pauseKB.style.display = 'none';
        timerControlsButtonsKB.startKB.style.display = 'inline';
        setFormDisabledStateKB(false);
        setTimerControlsDisabledStateKB(false, true, true);
        document.getElementById('resetBtnKB').style.display = 'none';
        document.getElementById('stopBtnKB').style.display = 'inline';
        timerControlsButtonsKB.stopKB.style.color = "rgb(177, 177, 177)";
        timerControlsButtonsKB.startKB.style.color = "#0661AA";
        document.getElementById('KBSave').disabled = true;
        document.getElementById('KBSave').style.color = 'rgb(177, 177, 177)';
        resetTimerKB();
        timerKB.isFinishedKB = true;
        clearTimeout(KBmyTimeout);
        KBmyTimeout = null;
        clearTimeout(KBmyTimeout2);
        KBmyTimeout2 = null;
        timerKB.isBreak2KB = false;
        timerKB.isBreak3KB = false;
        timerKB.isBreakKB = false;
        KBchangeBall(1.5, 1);
        KBballText.textContent = formSettingsFieldsKB.breakDuration2KB.value;
    });
});

let formSettingsFieldsKB,
    timerControlsButtonsKB,
    statusPanelKB,
    timerKB,
    timerSettingsKB;

function setTimerSettingsKB(
    intervalCountKB = timerSettingsKB.intervalCountKB,
    intervalDurationKB = timerSettingsKB.intervalDurationKB,
    enableBreakKB = timerSettingsKB.enableBreakKB,
    breakDurationKB = timerSettingsKB.breakDurationKB,
    enableBreak2KB = timerSettingsKB.enableBreak2KB,
    breakDuration2KB = timerSettingsKB.breakDuration2KB
) {
    timerSettingsKB = {
        intervalCountKB,
        intervalDurationKB,
        enableBreakKB,
        breakDurationKB,
        enableBreak2KB,
        breakDuration2KB,
    };
}

function resetTimerKB() {
    timerKB = {
        totalTimeElapsedKB: 0,
        elapsedInIntervalKB: 0,
        intervalsDoneKB: 0,
        isBreak3KB: false,
        isBreakKB: false,
        isBreak2KB: true,
        isFinishedKB: false
    };
    updateInfoKB();
}

let [secondsKB, minutesKB, hoursKB] = [0, 0, 0];
let timerRefKB = document.getElementById('timerDisplayKB');
let intKB = null;
document.getElementById('stopBtnKB').disabled = true;
document.getElementById('stopBtnKB').style.color = 'rgb(177, 177, 177)';
document.getElementById('KBSave').disabled = true;
document.getElementById('KBSave').style.color = 'rgb(177, 177, 177)';

var audioKB = document.getElementById("audioKB"),
    muteKB = document.getElementById("muteKB"),
    ismuteKB = false;

var BaudioKB = document.getElementById("BaudioKB"),
    BmuteKB = document.getElementById("BmuteKB"),
    BismuteKB = false;

var audioSongKB = document.getElementById("songKB"),
    muteSongKB = document.getElementById("songMuteKB");
// Get the volumeVKB bar element
const volumeVoiceKB = document.getElementById('volumeVoiceKB');

// Add an event listener for the volumeVKB change event
volumeVoiceKB.addEventListener('input', function () {
    // Get the current volumeVKB value
    const volumeVKB = parseFloat(volumeVoiceKB.value);

    // Check if volumeVKB is 0 and mute the media if necessary
    if (volumeVKB === 0) {
        audioObjects.inhale.muted = true;
        audioObjects.normalbreath.muted = true;
        audioObjects.letgoandhold.muted = true;
        audioObjects.fullyinHold.muted = true;
        audioKB.style.display = "none";
        muteKB.style.display = "block";
        ismuteKB = true;
    } else {
        audioObjects.inhale.muted = false;
        audioObjects.normalbreath.muted = false;
        audioObjects.letgoandhold.muted = false;
        audioObjects.fullyinHold.muted = false;
        muteKB.style.display = "none";
        audioKB.style.display = "block";
        ismuteKB = false;
    }
});
// Get the volumeVKB bar element
const BvolumeVoiceKB = document.getElementById('BvolumeVoiceKB');

// Add an event listener for the volumeVKB change event
BvolumeVoiceKB.addEventListener('input', function () {
    // Get the current volumeVKB value
    const BvolumeVKB = parseFloat(BvolumeVoiceKB.value);

    // Check if volumeVKB is 0 and mute the media if necessary
    if (BvolumeVKB === 0) {
        audioObjects.fullyin.muted = true;
        audioObjects.fullyout2.muted = true;
        BaudioKB.style.display = "none";
        BmuteKB.style.display = "block";
        BismuteKB = true;
    } else {
        audioObjects.fullyin.muted = false;
        audioObjects.fullyout2.muted = false;
        BmuteKB.style.display = "none";
        BaudioKB.style.display = "block";
        BismuteKB = false;
    }
});

// Get the volumeSKB bar element
const volumeSongKB = document.getElementById('volumeSongKB');

// Add an event listener for the volumeSKB change event
volumeSongKB.addEventListener('input', function () {
    // Get the current volumeSKB value
    const volumeSKB = parseFloat(volumeSongKB.value);

    // Check if volumeSKB is 0 and mute the media if necessary
    if (volumeSKB === 0) {
        audioPlayerBRT.muted = true;
        audioSongKB.style.display = "none";
        muteSongKB.style.display = "block";
    } else {
        audioPlayerBRT.muted = false;
        muteSongKB.style.display = "none";
        audioSongKB.style.display = "block";
    }
});


var inhaleKB = 9999;
var holdHW = 30;
var exhaleKB = 9999;
setTimerSettingsKB(9999, inhaleKB, true, holdHW, true, exhaleKB);
initializeTimerControlsKB();
initializeStatusPanelKB();
initializeTimerSettingsFormKB();
resetTimerKB();

var minusBtnKB = document.getElementById("minusKB"),
    plusBtnKB = document.getElementById("plusKB"),
    numberKB = 30, /// numberKB value
    minKB = 10, /// minKB numberKB
    maxKB = 70;
minusBtnKB.onclick = function () {
    if (numberKB > minKB) {
        numberKB = numberKB - 10;
        formSettingsFieldsKB.breakDuration2KB.value = numberKB;
        KBbreaths = numberKB;
        KBballText.textContent = KBbreaths;
        setTimerSettingsKB(9999, KBbreaths, true, formSettingsFieldsKB.breakDurationKB.value, true, 9999);
    }
}

plusBtnKB.onclick = function () {
    if (numberKB < maxKB) {
        numberKB = numberKB + 10;
        formSettingsFieldsKB.breakDuration2KB.value = numberKB;
        KBbreaths = numberKB;
        KBballText.textContent = KBbreaths;
        setTimerSettingsKB(9999, KBbreaths, true, formSettingsFieldsKB.breakDurationKB.value, true, 9999);
    }
}
var SminusBtnKB = document.getElementById("SminusKB"),
    SplusBtnKB = document.getElementById("SplusKB");
   
function initializeTimerSettingsFormKB() {
    const oneDayInSecondsKB = 60 * 60 * 24;
    let lastUserSetEnableBreakKB = timerSettingsKB.enableBreakKB;
    let lastUserSetEnableBreak2 = timerSettingsKB.enableBreak2KB;
    formSettingsFieldsKB = {
        intervalCountKB: document.getElementById('intervalCountInputKB'),
        intervalDurationKB: document.getElementById('intervalDurationInputKB'),
        enableBreakKB: document.getElementById('enableBreakInputKB'),
        breakDurationKB: document.getElementById('breakDurationInputKB'),
        enableBreak2KB: document.getElementById('enableBreakInput2KB'),
        breakDuration2KB: document.getElementById('breakDurationInput2KB'),
    };
    formSettingsFieldsKB.intervalCountKB.value = timerSettingsKB.intervalCountKB;
    formSettingsFieldsKB.intervalDurationKB.value = timerSettingsKB.intervalDurationKB;
    formSettingsFieldsKB.enableBreakKB.checked = timerSettingsKB.enableBreakKB;
    formSettingsFieldsKB.breakDurationKB.value = timerSettingsKB.breakDurationKB;
    formSettingsFieldsKB.enableBreak2KB.checked = timerSettingsKB.enableBreak2KB;
    formSettingsFieldsKB.breakDuration2KB.value = 30;
}

function initializeTimerControlsKB() {
    timerControlsButtonsKB = {
        startKB: document.getElementById('startBtnKB'),
        pauseKB: document.getElementById('pauseBtnKB'),
        stopKB: document.getElementById('stopBtnKB'),
    };
    setTimerControlsDisabledStateKB(false, true, true);
    timerControlsButtonsKB.startKB.addEventListener('click', startTimerKB);
    timerControlsButtonsKB.pauseKB.addEventListener('click', pauseTimerKB);
    timerControlsButtonsKB.stopKB.addEventListener('click', stopTimerKB);
}

function initializeStatusPanelKB() {
    statusPanelKB = {
        timeOverviewMessageKB: document.getElementById('timeOverviewMessageKB'),

        elapsedInIntervalBoxKB: document.getElementById('elapsedInIntervalBoxKB'),
        elapsedInBreakIntervalBoxKB: document.getElementById('elapsedInBreakIntervalBoxKB'),
        elapsedInIntervalKB: document.getElementById('elapsedInIntervalKB'),
        elapsedInBreakIntervalKB: document.getElementById('elapsedInBreakIntervalKB'),
        elapsedInBreakIntervalBox2KB: document.getElementById('elapsedInBreakIntervalBox2KB'),
        elapsedInBreakInterval2KB: document.getElementById('elapsedInBreakInterval2KB'),
        intervalsDoneKB: document.getElementById('intervalsDoneKB'),
    };
}

function setTimerControlsDisabledStateKB(startKB, pauseKB, stopKB) {
    timerControlsButtonsKB.startKB.disabled = startKB;
    timerControlsButtonsKB.pauseKB.disabled = pauseKB;
    timerControlsButtonsKB.stopKB.disabled = stopKB;
}

function setFormDisabledStateKB(disabled) {
    formSettingsFieldsKB.intervalCountKB.disabled = disabled;
    formSettingsFieldsKB.intervalDurationKB.disabled = disabled;
    formSettingsFieldsKB.enableBreakKB.disabled = disabled || timerSettingsKB.intervalCountKB === 1;
    formSettingsFieldsKB.breakDurationKB.disabled = disabled;
    formSettingsFieldsKB.enableBreak2KB.disabled = disabled
    formSettingsFieldsKB.breakDuration2KB.disabled = disabled;
    minusBtnKB.disabled = disabled;
    plusBtnKB.disabled = disabled;
}
var musicIsOnKB = false;
function startTimerKB() {
    isKBon = true;
    timerKB.isBreakKB = true;
    timerKB.isBreak2KB = false;
    timerKB.isBreak3KB = false;
    setFormDisabledStateKB(true);
    setTimerControlsDisabledStateKB(true, true, false);
    timerControlsButtonsKB.pauseKB.style.color = 'rgb(177, 177, 177)';
    document.getElementById('stopBtnKB').style.color = '#990000';
    clearTimeout(intKB);
    intKB = null;
    if (timerKB.isFinishedKB) {
        resetTimerKB();
    }
    if (!audioPlayerBRT.muted) {
        playSelectedSongBRT(true);
    }
    if (!ismuteKB) {
        audioObjects.fullyout2.play();
    }
    KBanimate();
    timerControlsButtonsKB.startKB.style.display = 'none';
    timerControlsButtonsKB.pauseKB.style.display = 'inline';
    document.getElementById('KBDate').value = date;
    document.getElementById('KBSettings').disabled = true;
    document.getElementById('KBSettings').style.color = 'rgb(177, 177, 177)';
}

function pauseTimerKB() {
    timerKB.intervalsDoneKB++;
    intervalsDoneKB.value = timerKB.intervalsDoneKB;
    timerRefKB.value += timeKB + "|";
    setTimerControlsDisabledStateKB(true, true, false);
    timerControlsButtonsKB.pauseKB.style.color = "rgb(177, 177, 177)";
    if (isPortuguese) {
        document.getElementById("KBResults").innerHTML += "<div class='NOfSteps'> <div>Round " + (timerKB.intervalsDoneKB) + "</div><div>" + timeKB + " segundos</div></div>";
    } else {
        document.getElementById("KBResults").innerHTML += "<div class='NOfSteps'> <div>Round " + (timerKB.intervalsDoneKB) + "</div><div>" + timeKB + " seconds</div></div>";
    }
    clearTimeout(intKB);
    intKB = null;
    [secondsKB, minutesKB] = [0, 0];
    timerControlsButtonsKB.stopKB.style.color = '#990000';
    if (!ismuteKB) {
        audioObjects.fullyout2.pause();
        audioObjects.fullyout2.currentTime = 0;
        audioObjects.normalbreath.muted = false;
        audioObjects.normalbreath.play();
    }
    KBchangeBall(1.5, 1);
    KBanimate2();
    timerKB.isBreak2KB = true;
    timerKB.isBreak3KB = false;
    timerKB.isBreakKB = false;
}

function stopTimerKB() {
    isKBon = false;
    if (timerKB.isBreak3KB) {
        timerKB.intervalsDoneKB++;
        intervalsDoneKB.value = timerKB.intervalsDoneKB;
        timerRefKB.value += timeKB + "|";
        if (isPortuguese) {
            document.getElementById("KBResults").innerHTML += "<div class='NOfSteps'> <div>Round " + (timerKB.intervalsDoneKB) + "</div><div>" + timeKB + " segundos</div></div>";
        } else {
            document.getElementById("KBResults").innerHTML += "<div class='NOfSteps'> <div>Round " + (timerKB.intervalsDoneKB) + "</div><div>" + timeKB + " seconds</div></div>";
        }
    }
    if (document.getElementById("KBResults").innerHTML !== "") {
        document.getElementById('KBSave').disabled = false;
        document.getElementById('KBSave').style.color = '#49B79D';
        timerControlsButtonsKB.stopKB.style.display = "none";
        document.getElementById('resetBtnKB').style.display = 'inline';
        document.getElementById('resetBtnKB').style.color = '#990000';
        setTimerControlsDisabledStateKB(true, true, true);
        timerControlsButtonsKB.startKB.style.color = "rgb(177, 177, 177)";
    } else {
        setTimerControlsDisabledStateKB(false, true, true);
        timerControlsButtonsKB.startKB.style.color = '#49B79D';
    }
    clearTimeout(intKB);
    intKB = null;
    [secondsKB, minutesKB] = [0, 0];
    document.getElementById('KBSettings').disabled = false;
    document.getElementById('KBSettings').style.color = '#49B79D';
    if (!audioPlayerBRT.muted) {
        audioPlayerBRT.pause();
    }
    audioPlayerBRT.currentTime = 0;
    timerControlsButtonsKB.pauseKB.style.display = 'none';
    timerControlsButtonsKB.startKB.style.display = 'inline';
    setFormDisabledStateKB(false);
    timerControlsButtonsKB.stopKB.style.color = "rgb(177, 177, 177)";
    KBbreaths = formSettingsFieldsKB.breakDuration2KB.value;
    KBballText.textContent = KBbreaths;
    if (!ismuteKB) {
        audioObjects.fullyout2.pause();
        audioObjects.fullyout2.currentTime = 0;
        audioObjects.normalbreath.muted = false;
        audioObjects.normalbreath.play();
    }  
    clearTimeout(KBmyTimeout);
    KBmyTimeout = null;
    clearTimeout(KBmyTimeout2);
    KBmyTimeout2 = null;
    timerKB.isBreak2KB = false;
    timerKB.isBreak3KB = false;
    timerKB.isBreakKB = false;
    setTimeout(() => {
        KBchangeBall(1.5, 1);
    }, 3000); KBballText.textContent = formSettingsFieldsKB.breakDuration2KB.value;
}
document.getElementById('resetBtnKB').addEventListener('click', function () {
    resetTimerKB();
    setTimerControlsDisabledStateKB(false, true, true);
    timerControlsButtonsKB.startKB.style.color = '#49B79D';
    document.getElementById("KBResults").innerHTML = '';
    document.getElementById('resetBtnKB').style.display = 'none';
    timerControlsButtonsKB.stopKB.style.display = "inline";
    document.getElementById('KBSave').disabled = true;
    document.getElementById('KBSave').style.color = 'rgb(177, 177, 177)';
    setTimeout(() => {
        KBchangeBall(1.5, 1);
    }, 3000);
});


var timeKB = '';
function displayTimerKB() {
    secondsKB++;
    if (secondsKB == 60) {
        secondsKB = 0;
        minutesKB++;
    }
    let mKB = minutesKB < 10 ? "0" + minutesKB : minutesKB;
    let sKB = secondsKB < 10 ? "0" + secondsKB : secondsKB;
    timeKB = `${mKB} : ${sKB}`;
    KBballText.textContent = timeKB;
    intKB = setTimeout(displayTimerKB, 1000);
}

function updateInfoKB() {
    statusPanelKB.intervalsDoneKB.value = timerKB.intervalsDoneKB;
}
