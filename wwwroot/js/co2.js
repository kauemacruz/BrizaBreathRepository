/*CO2 JS*/
$(function () {
    $('#CO2Form').on('submit', function (e) {
        e.preventDefault(); // Prevent the default form submission

        var formData = new FormData(this); // Get the form data

        $.ajax({
            url: "/",
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function (result) {
                $('#CO2ResultSaved').html(result); // Update the result section with the server response
            }
        });
        document.getElementById("CO2Results").innerHTML = "";
        timerRefCO2.value = "|";
        clearInterval(intCO2);
        if (!isSongMuteCO2) {
            audioPlayerO2.pause();
        }
        timerControlsButtonsCO2.pauseCO2.style.display = 'none';
        timerControlsButtonsCO2.startCO2.style.display = 'inline';
        setFormDisabledStateCO2(false);
        setTimerControlsDisabledStateCO2(false, true, true);
        document.getElementById('stopBtnCO2').style.display = 'inline';
        timerControlsButtonsCO2.stopCO2.style.color = "rgb(177, 177, 177)";
        timerControlsButtonsCO2.startCO2.style.color = "#0661AA";
        document.getElementById('CO2Save').disabled = true;
        document.getElementById('CO2Save').style.color = 'rgb(177, 177, 177)';
        stopTimerTickCO2();
        resetTimerCO2();
        timerCO2.isFinishedCO2 = true;
        stopTimerTickCO2();
    });
});

let
  formSettingsFieldsCO2,
  timerControlsButtonsCO2,
  statusPanelCO2,
  timerCO2,
  timerSettingsCO2;

function setTimerSettingsCO2(
  intervalCountCO2 = timerSettingsCO2.intervalCountCO2,
  intervalDurationCO2 = timerSettingsCO2.intervalDurationCO2,
  enableBreakCO2 = timerSettingsCO2.enableBreakCO2,
  breakDurationCO2 = timerSettingsCO2.breakDurationCO2,
  enableBreak2CO2 = timerSettingsCO2.enableBreak2CO2,
  breakDuration2CO2 = timerSettingsCO2.breakDuration2CO2,
  enableBreak3CO2 = timerSettingsCO2.enableBreak3CO2,
  breakDuration3CO2 = timerSettingsCO2.breakDuration3CO2,
  enableBreak4CO2 = timerSettingsCO2.enableBreakCO2,
  breakDuration4CO2 = timerSettingsCO2.breakDurationCO2,
  enableBreak5CO2 = timerSettingsCO2.enableBreak2CO2,
  breakDuration5CO2 = timerSettingsCO2.breakDuration2CO2,
  enableBreak6CO2 = timerSettingsCO2.enableBreak3CO2,
  breakDuration6CO2 = timerSettingsCO2.breakDuration3CO2,
  enableBreak7CO2 = timerSettingsCO2.enableBreakCO2,
  breakDuration7CO2 = timerSettingsCO2.breakDurationCO2,
  enableBreak8CO2 = timerSettingsCO2.enableBreak2CO2,
  breakDuration8CO2 = timerSettingsCO2.breakDuration2CO2,
  enableBreak9CO2 = timerSettingsCO2.enableBreak3CO2,
  breakDuration9CO2 = timerSettingsCO2.breakDuration3CO2,
  enableBreak10CO2 = timerSettingsCO2.enableBreakCO2,
  breakDuration10CO2 = timerSettingsCO2.breakDurationCO2,
  enableBreak11CO2 = timerSettingsCO2.enableBreak2CO2,
  breakDuration11CO2 = timerSettingsCO2.breakDuration2CO2,
  enableBreak12CO2 = timerSettingsCO2.enableBreak3CO2,
  breakDuration12CO2 = timerSettingsCO2.breakDuration3CO2,
  enableBreak13CO2 = timerSettingsCO2.enableBreakCO2,
  breakDuration13CO2 = timerSettingsCO2.breakDurationCO2,
  enableBreak14CO2 = timerSettingsCO2.enableBreak2CO2,
  breakDuration14CO2 = timerSettingsCO2.breakDuration2CO2,
  enableBreak15CO2 = timerSettingsCO2.enableBreak3CO2,
  breakDuration15CO2 = timerSettingsCO2.breakDuration3CO2
) {
  timerSettingsCO2 = {
    intervalCountCO2,
    intervalDurationCO2,
    enableBreakCO2,
    breakDurationCO2,
    enableBreak2CO2,
    breakDuration2CO2,
    enableBreak3CO2,
    breakDuration3CO2,
    enableBreak4CO2,
    breakDuration4CO2,
    enableBreak5CO2,
    breakDuration5CO2,
    enableBreak6CO2,
    breakDuration6CO2,
    enableBreak7CO2,
    breakDuration7CO2,
    enableBreak8CO2,
    breakDuration8CO2,
    enableBreak9CO2,
    breakDuration9CO2,
    enableBreak10CO2,
    breakDuration10CO2,
    enableBreak11CO2,
    breakDuration11CO2,
    enableBreak12CO2,
    breakDuration12CO2,
    enableBreak13CO2,
    breakDuration13CO2,
    enableBreak14CO2,
    breakDuration14CO2,
    enableBreak15CO2,
    breakDuration15CO2
  };
}

function resetTimerCO2() {
  timerCO2 = {
    totalTimeElapsedCO2: 0,
    elapsedInIntervalCO2: 0,
    intervalsDoneCO2: 0,
    isBreak0CO2: true,
    isBreakCO2: false,
    isBreak2CO2: false,
    isBreak3CO2: false,
    isBreak4CO2: false,
    isBreak5CO2: false,
    isBreak6CO2: false,
    isBreak7CO2: false,
    isBreak8CO2: false,
    isBreak9CO2: false,
    isBreak10CO2: false,
    isBreak11CO2: false,
    isBreak12CO2: false,
    isBreak13CO2: false,
    isBreak14CO2: false,
    isBreak15CO2: false,
    isFinishedCO2: false
  };
  updateInfoCO2();
}

let [secondsCO2, minutesCO2, hoursCO2] = [0, 0, 0];
let timerRefCO2 = document.getElementById('timerDisplayCO2');
let intCO2 = null;
document.getElementById('stopBtnCO2').disabled = true;
document.getElementById('stopBtnCO2').style.color = 'rgb(177, 177, 177)';
document.getElementById('CO2Save').disabled = true;
document.getElementById('CO2Save').style.color = 'rgb(177, 177, 177)';

var audioListCO2 = []
audioListCO2.push(new Audio('../sounds/deepbreaths.mp3'));
audioListCO2.push(new Audio('../sounds/deepbreaths2.mp3'));
audioListCO2.push(new Audio('../sounds/normalbreath.mp3'));
audioListCO2.push(new Audio('../sounds/holdyourbreath.mp3'));

var ismuteCO2 = false;

var isSongMuteCO2 = false;

// Get the volumeVO2 bar element
const volumeVoiceO2 = document.getElementById('volumeVoiceO2');

// Add an event listener for the volumeVO2 change event
volumeVoiceO2.addEventListener('input', function () {
    // Get the current volumeVO2 value
    const volumeVO2 = parseFloat(volumeVoiceO2.value);

    // Check if volumeVO2 is 0 and mute the media if necessary
    if (volumeVO2 === 0) {
        audioListO2[0].muted = true;
        audioListO2[1].muted = true;
        audioListO2[2].muted = true;
        audioListO2[3].muted = true;
        audioListCO2[0].muted = true;
        audioListCO2[1].muted = true;
        audioListCO2[2].muted = true;
        audioListCO2[3].muted = true;
        audioO2.style.display = "none";
        muteO2.style.display = "block";
        ismuteO2 = true;
        ismuteCO2 = true;
    } else {
        audioListO2[0].muted = false;
        audioListO2[1].muted = false;
        audioListO2[2].muted = false;
        audioListO2[3].muted = false;
        audioListCO2[0].muted = false;
        audioListCO2[1].muted = false;
        audioListCO2[2].muted = false;
        audioListCO2[3].muted = false;
        muteO2.style.display = "none";
        audioO2.style.display = "block";
        ismuteO2 = false;
        ismuteCO2 = false;

    }
});
// Get the volumeSO2 bar element
const volumeSongO2 = document.getElementById('volumeSongO2');

// Add an event listener for the volumeSO2 change event
volumeSongO2.addEventListener('input', function () {
    // Get the current volumeSO2 value
    const volumeSO2 = parseFloat(volumeSongO2.value);

    // Check if volumeSO2 is 0 and mute the media if necessary
    if (volumeSO2 === 0) {
        audioPlayerO2.muted = true;
        audioSongO2.style.display = "none";
        muteSongO2.style.display = "block";
        isSongMuteO2 = true;
        isSongMuteCO2 = true;
    } else {
        audioPlayerO2.muted = false;
        muteSongO2.style.display = "none";
        audioSongO2.style.display = "block";
        isSongMuteO2 = false;
        isSongMuteCO2 = false;
    }
});

var breatheCO2 = 135;
var holdCO2 = 30;
var breathe1CO2 = 120;
var hold1CO2 = 30;
var breathe2CO2 = 105;
var hold2CO2 = 30;
var breathe3CO2 = 90;
var hold3CO2 = 30;
var breathe4CO2 = 75;
var hold4CO2 = 30;
var breathe5CO2 = 60;
var hold5CO2 = 30;
var breathe6CO2 = 45;
var hold6CO2 = 30;
var breathe7CO2 = 30;
var hold7CO2 = 30;

setTimerSettingsCO2(8, breatheCO2, true, holdCO2, true, breathe1CO2, true, hold1CO2, true, breathe2CO2, true, hold2CO2, true, breathe3CO2, true, hold3CO2, true, breathe4CO2, true, hold4CO2, true, breathe5CO2, true, hold5CO2, true, breathe6CO2, true, hold6CO2, true, breathe7CO2, true, hold7CO2);
initializeTimerControlsCO2();
initializeStatusPanelCO2();
initializeTimerSettingsFormCO2();
resetTimerCO2();

var isLevel1CO2 = true,
    isLevel2CO2 = false,
    isLevel3CO2 = false,
    isLevel4CO2 = false,
    isLevel5CO2 = false,
    isLevel6CO2 = false,
    isLevel7CO2 = false,
    isLevel8CO2 = false;

var minusBtnCO2 = document.getElementById("minusCO2"),
    plusBtnCO2 = document.getElementById("plusCO2"),
    numberCO2 = 30, /// numberCO2 value
    minCO2 = 30, /// minCO2 numberCO2
    maxCO2 = 240;

minusBtnCO2.onclick = function () {
    if (numberCO2 > minCO2) {
        numberCO2 = numberCO2 - 30;
        formSettingsFieldsCO2.breakDurationCO2.value = numberCO2;
        formSettingsFieldsCO2.breakDuration3CO2.value = formSettingsFieldsCO2.breakDurationCO2.value;
        formSettingsFieldsCO2.breakDuration5CO2.value = formSettingsFieldsCO2.breakDurationCO2.value;
        formSettingsFieldsCO2.breakDuration7CO2.value = formSettingsFieldsCO2.breakDurationCO2.value;
        formSettingsFieldsCO2.breakDuration9CO2.value = formSettingsFieldsCO2.breakDurationCO2.value;
        formSettingsFieldsCO2.breakDuration11CO2.value = formSettingsFieldsCO2.breakDurationCO2.value;
        formSettingsFieldsCO2.breakDuration13CO2 .value = formSettingsFieldsCO2.breakDurationCO2.value;
        formSettingsFieldsCO2.breakDuration15CO2.value = formSettingsFieldsCO2.breakDurationCO2.value;
        setTimerSettingsCO2(8, 135, true, formSettingsFieldsCO2.breakDurationCO2.value, true, 120, true, formSettingsFieldsCO2.breakDuration3CO2.value, true, 105, true, formSettingsFieldsCO2.breakDuration5CO2.value, true, 90, true, formSettingsFieldsCO2.breakDuration7CO2.value, true, 75, true, formSettingsFieldsCO2.breakDuration9CO2.value, true, 60, true, formSettingsFieldsCO2.breakDuration11CO2.value, true, 45, true, formSettingsFieldsCO2.breakDuration13CO2 .value, true, 30, true, formSettingsFieldsCO2.breakDuration15CO2.value);
        if (isLevel2CO2) {
            isLevel2CO2 = false;
            isLevel1CO2 = true;
            statusPanelCO2.levelCO2.textContent = '1';
            statusPanelCO2.levelHold1CO2.textContent = '0:30';
            statusPanelCO2.levelHold2CO2.textContent = '0:30';
            statusPanelCO2.levelHold3CO2.textContent = '0:30';
            statusPanelCO2.levelHold4CO2.textContent = '0:30';
            statusPanelCO2.levelHold5CO2.textContent = '0:30';
            statusPanelCO2.levelHold6CO2.textContent = '0:30';
            statusPanelCO2.levelHold7CO2.textContent = '0:30';
            statusPanelCO2.levelHold8CO2.textContent = '0:30';
        } else if (isLevel3CO2) {
            isLevel3CO2 = false;
            isLevel2CO2 = true;
            statusPanelCO2.levelCO2.textContent = '2';
            statusPanelCO2.levelHold1CO2.textContent = '1:00';
            statusPanelCO2.levelHold2CO2.textContent = '1:00';
            statusPanelCO2.levelHold3CO2.textContent = '1:00';
            statusPanelCO2.levelHold4CO2.textContent = '1:00';
            statusPanelCO2.levelHold5CO2.textContent = '1:00';
            statusPanelCO2.levelHold6CO2.textContent = '1:00';
            statusPanelCO2.levelHold7CO2.textContent = '1:00';
            statusPanelCO2.levelHold8CO2.textContent = '1:00';
        } else if (isLevel4CO2) {
            isLevel4CO2 = false;
            isLevel3CO2 = true;
            statusPanelCO2.levelCO2.textContent = '3';
            statusPanelCO2.levelHold1CO2.textContent = '1:30';
            statusPanelCO2.levelHold2CO2.textContent = '1:30';
            statusPanelCO2.levelHold3CO2.textContent = '1:30';
            statusPanelCO2.levelHold4CO2.textContent = '1:30';
            statusPanelCO2.levelHold5CO2.textContent = '1:30';
            statusPanelCO2.levelHold6CO2.textContent = '1:30';
            statusPanelCO2.levelHold7CO2.textContent = '1:30';
            statusPanelCO2.levelHold8CO2.textContent = '1:30';
        } else if (isLevel5CO2) {
            isLevel5CO2 = false;
            isLevel4CO2 = true;
            statusPanelCO2.levelCO2.textContent = '4';
            statusPanelCO2.levelHold1CO2.textContent = '2:00';
            statusPanelCO2.levelHold2CO2.textContent = '2:00';
            statusPanelCO2.levelHold3CO2.textContent = '2:00';
            statusPanelCO2.levelHold4CO2.textContent = '2:00';
            statusPanelCO2.levelHold5CO2.textContent = '2:00';
            statusPanelCO2.levelHold6CO2.textContent = '2:00';
            statusPanelCO2.levelHold7CO2.textContent = '2:00';
            statusPanelCO2.levelHold8CO2.textContent = '2:00';
        } else if (isLevel6CO2) {
            isLevel6CO2 = false;
            isLevel5CO2 = true;
            statusPanelCO2.levelCO2.textContent = '5';
            statusPanelCO2.levelHold1CO2.textContent = '2:30';
            statusPanelCO2.levelHold2CO2.textContent = '2:30';
            statusPanelCO2.levelHold3CO2.textContent = '2:30';
            statusPanelCO2.levelHold4CO2.textContent = '2:30';
            statusPanelCO2.levelHold5CO2.textContent = '2:30';
            statusPanelCO2.levelHold6CO2.textContent = '2:30';
            statusPanelCO2.levelHold7CO2.textContent = '2:30';
            statusPanelCO2.levelHold8CO2.textContent = '2:30';
        } else if (isLevel7CO2) {
            isLevel7CO2 = false;
            isLevel6CO2 = true;
            statusPanelCO2.levelCO2.textContent = '6';
            statusPanelCO2.levelHold1CO2.textContent = '3:00';
            statusPanelCO2.levelHold2CO2.textContent = '3:00';
            statusPanelCO2.levelHold3CO2.textContent = '3:00';
            statusPanelCO2.levelHold4CO2.textContent = '3:00';
            statusPanelCO2.levelHold5CO2.textContent = '3:00';
            statusPanelCO2.levelHold6CO2.textContent = '3:00';
            statusPanelCO2.levelHold7CO2.textContent = '3:00';
            statusPanelCO2.levelHold8CO2.textContent = '3:00';
        } else if (isLevel8CO2) {
            isLevel8CO2 = false;
            isLevel7CO2 = true;
            statusPanelCO2.levelCO2.textContent = '7';
            statusPanelCO2.levelHold1CO2.textContent = '3:30';
            statusPanelCO2.levelHold2CO2.textContent = '3:30';
            statusPanelCO2.levelHold3CO2.textContent = '3:30';
            statusPanelCO2.levelHold4CO2.textContent = '3:30';
            statusPanelCO2.levelHold5CO2.textContent = '3:30';
            statusPanelCO2.levelHold6CO2.textContent = '3:30';
            statusPanelCO2.levelHold7CO2.textContent = '3:30';
            statusPanelCO2.levelHold8CO2.textContent = '3:30';
        }
    }
}

plusBtnCO2.onclick = function () {
    if (numberCO2 < maxCO2) {
        numberCO2 = numberCO2 + 30;
        formSettingsFieldsCO2.breakDurationCO2.value = numberCO2;
        formSettingsFieldsCO2.breakDuration3CO2.value = formSettingsFieldsCO2.breakDurationCO2.value;
        formSettingsFieldsCO2.breakDuration5CO2.value = formSettingsFieldsCO2.breakDurationCO2.value;
        formSettingsFieldsCO2.breakDuration7CO2.value = formSettingsFieldsCO2.breakDurationCO2.value;
        formSettingsFieldsCO2.breakDuration9CO2.value = formSettingsFieldsCO2.breakDurationCO2.value;
        formSettingsFieldsCO2.breakDuration11CO2.value = formSettingsFieldsCO2.breakDurationCO2.value;
        formSettingsFieldsCO2.breakDuration13CO2 .value = formSettingsFieldsCO2.breakDurationCO2.value;
        formSettingsFieldsCO2.breakDuration15CO2.value = formSettingsFieldsCO2.breakDurationCO2.value;
        setTimerSettingsCO2(8, 135, true, formSettingsFieldsCO2.breakDurationCO2.value, true, 120, true, formSettingsFieldsCO2.breakDuration3CO2.value, true, 105, true, formSettingsFieldsCO2.breakDuration5CO2.value, true, 90, true, formSettingsFieldsCO2.breakDuration7CO2.value, true, 75, true, formSettingsFieldsCO2.breakDuration9CO2.value, true, 60, true, formSettingsFieldsCO2.breakDuration11CO2.value, true, 45, true, formSettingsFieldsCO2.breakDuration13CO2 .value, true, 30, true, formSettingsFieldsCO2.breakDuration15CO2.value);
        if (isLevel1CO2) {
            isLevel1CO2 = false;
            isLevel2CO2 = true;
            statusPanelCO2.levelCO2.textContent = '2';
            statusPanelCO2.levelHold1CO2.textContent = '1:00';
            statusPanelCO2.levelHold2CO2.textContent = '1:00';
            statusPanelCO2.levelHold3CO2.textContent = '1:00';
            statusPanelCO2.levelHold4CO2.textContent = '1:00';
            statusPanelCO2.levelHold5CO2.textContent = '1:00';
            statusPanelCO2.levelHold6CO2.textContent = '1:00';
            statusPanelCO2.levelHold7CO2.textContent = '1:00';
            statusPanelCO2.levelHold8CO2.textContent = '1:00';
        } else if (isLevel2CO2) {
            isLevel2CO2 = false;
            isLevel3CO2 = true;
            statusPanelCO2.levelCO2.textContent = '3';
            statusPanelCO2.levelHold1CO2.textContent = '1:30';
            statusPanelCO2.levelHold2CO2.textContent = '1:30';
            statusPanelCO2.levelHold3CO2.textContent = '1:30';
            statusPanelCO2.levelHold4CO2.textContent = '1:30';
            statusPanelCO2.levelHold5CO2.textContent = '1:30';
            statusPanelCO2.levelHold6CO2.textContent = '1:30';
            statusPanelCO2.levelHold7CO2.textContent = '1:30';
            statusPanelCO2.levelHold8CO2.textContent = '1:30';
        } else if (isLevel3CO2) {
            isLevel3CO2 = false;
            isLevel4CO2 = true;
            statusPanelCO2.levelCO2.textContent = '4';
            statusPanelCO2.levelHold1CO2.textContent = '2:00';
            statusPanelCO2.levelHold2CO2.textContent = '2:00';
            statusPanelCO2.levelHold3CO2.textContent = '2:00';
            statusPanelCO2.levelHold4CO2.textContent = '2:00';
            statusPanelCO2.levelHold5CO2.textContent = '2:00';
            statusPanelCO2.levelHold6CO2.textContent = '2:00';
            statusPanelCO2.levelHold7CO2.textContent = '2:00';
            statusPanelCO2.levelHold8CO2.textContent = '2:00';
        } else if (isLevel4CO2) {
            isLevel4CO2 = false;
            isLevel5CO2 = true;
            statusPanelCO2.levelCO2.textContent = '5';
            statusPanelCO2.levelHold1CO2.textContent = '2:30';
            statusPanelCO2.levelHold2CO2.textContent = '2:30';
            statusPanelCO2.levelHold3CO2.textContent = '2:30';
            statusPanelCO2.levelHold4CO2.textContent = '2:30';
            statusPanelCO2.levelHold5CO2.textContent = '2:30';
            statusPanelCO2.levelHold6CO2.textContent = '2:30';
            statusPanelCO2.levelHold7CO2.textContent = '2:30';
            statusPanelCO2.levelHold8CO2.textContent = '2:30';
        } else if (isLevel5CO2) {
            isLevel5CO2 = false;
            isLevel6CO2 = true;
            statusPanelCO2.levelCO2.textContent = '6';
            statusPanelCO2.levelHold1CO2.textContent = '3:00';
            statusPanelCO2.levelHold2CO2.textContent = '3:00';
            statusPanelCO2.levelHold3CO2.textContent = '3:00';
            statusPanelCO2.levelHold4CO2.textContent = '3:00';
            statusPanelCO2.levelHold5CO2.textContent = '3:00';
            statusPanelCO2.levelHold6CO2.textContent = '3:00';
            statusPanelCO2.levelHold7CO2.textContent = '3:00';
            statusPanelCO2.levelHold8CO2.textContent = '3:00';
        } else if (isLevel6CO2) {
            isLevel6CO2 = false;
            isLevel7CO2 = true;
            statusPanelCO2.levelCO2.textContent = '7';
            statusPanelCO2.levelHold1CO2.textContent = '3:30';
            statusPanelCO2.levelHold2CO2.textContent = '3:30';
            statusPanelCO2.levelHold3CO2.textContent = '3:30';
            statusPanelCO2.levelHold4CO2.textContent = '3:30';
            statusPanelCO2.levelHold5CO2.textContent = '3:30';
            statusPanelCO2.levelHold6CO2.textContent = '3:30';
            statusPanelCO2.levelHold7CO2.textContent = '3:30';
            statusPanelCO2.levelHold8CO2.textContent = '3:30';
        } else if (isLevel7CO2) {
            isLevel7CO2 = false;
            isLevel8CO2 = true;
            statusPanelCO2.levelCO2.textContent = '8';
            statusPanelCO2.levelHold1CO2.textContent = '4:00';
            statusPanelCO2.levelHold2CO2.textContent = '4:00';
            statusPanelCO2.levelHold3CO2.textContent = '4:00';
            statusPanelCO2.levelHold4CO2.textContent = '4:00';
            statusPanelCO2.levelHold5CO2.textContent = '4:00';
            statusPanelCO2.levelHold6CO2.textContent = '4:00';
            statusPanelCO2.levelHold7CO2.textContent = '4:00';
            statusPanelCO2.levelHold8CO2.textContent = '4:00';
        }
    }
}

function initializeTimerSettingsFormCO2() {
  const oneDayInSecondsCO2 = 60 * 60 * 24;
  let lastUserSetEnableBreakCO2 = timerSettingsCO2.enableBreakCO2;
  let lastUserSetEnableBreak2CO2 = timerSettingsCO2.enableBreak2CO2;
  let lastUserSetEnableBreak3CO2 = timerSettingsCO2.enableBreak3CO2;
  let lastUserSetEnableBreak4CO2 = timerSettingsCO2.enableBreak4CO2;
  let lastUserSetEnableBreak5CO2 = timerSettingsCO2.enableBreak5CO2;
  let lastUserSetEnableBreak6CO2 = timerSettingsCO2.enableBreak6CO2;
  let lastUserSetEnableBreak7CO2 = timerSettingsCO2.enableBreak7CO2;
  let lastUserSetEnableBreak8CO2 = timerSettingsCO2.enableBreak8CO2;
  let lastUserSetEnableBreak9CO2 = timerSettingsCO2.enableBreak9CO2;
  let lastUserSetEnableBreak10CO2 = timerSettingsCO2.enableBreak10CO2;
  let lastUserSetEnableBreak11CO2 = timerSettingsCO2.enableBreak11CO2;
  let lastUserSetEnableBreak12CO2 = timerSettingsCO2.enableBreak12CO2;
  let lastUserSetEnableBreak13CO2 = timerSettingsCO2.enableBreak13CO2;
  let lastUserSetEnableBreak14CO2 = timerSettingsCO2.enableBreak14CO2;
  let lastUserSetEnableBreak15CO2 = timerSettingsCO2.enableBreak15CO2;

  formSettingsFieldsCO2 = {
    intervalCountCO2: document.getElementById('intervalCountInputCO2'),
    intervalDurationCO2: document.getElementById('intervalDurationInputCO2'),
    enableBreakCO2: document.getElementById('enableBreakInputCO2'),
    breakDurationCO2: document.getElementById('breakDurationInputCO2'),
    enableBreak2CO2: document.getElementById('enableBreakInput2CO2'),
    breakDuration2CO2: document.getElementById('breakDurationInput2CO2'),
    enableBreak3CO2: document.getElementById('enableBreakInput3CO2'),
    breakDuration3CO2: document.getElementById('breakDurationInput3CO2'),
    enableBreak4CO2: document.getElementById('enableBreakInput4CO2'),
    breakDuration4CO2: document.getElementById('breakDurationInput4CO2'),
    enableBreak5CO2: document.getElementById('enableBreakInput5CO2'),
    breakDuration5CO2: document.getElementById('breakDurationInput5CO2'),
    enableBreak6CO2: document.getElementById('enableBreakInput6CO2'),
    breakDuration6CO2: document.getElementById('breakDurationInput6CO2'),
    enableBreak7CO2: document.getElementById('enableBreakInput7CO2'),
    breakDuration7CO2: document.getElementById('breakDurationInput7CO2'),
    enableBreak8CO2: document.getElementById('enableBreakInput8CO2'),
    breakDuration8CO2: document.getElementById('breakDurationInput8CO2'),
    enableBreak9CO2: document.getElementById('enableBreakInput9CO2'),
    breakDuration9CO2: document.getElementById('breakDurationInput9CO2'),
    enableBreak10CO2: document.getElementById('enableBreakInput10CO2'),
    breakDuration10CO2: document.getElementById('breakDurationInput10CO2'),
    enableBreak11CO2: document.getElementById('enableBreakInput11CO2'),
    breakDuration11CO2: document.getElementById('breakDurationInput11CO2'),
    enableBreak12CO2: document.getElementById('enableBreakInput12CO2'),
    breakDuration12CO2: document.getElementById('breakDurationInput12CO2'),
    enableBreak13CO2: document.getElementById('enableBreakInput13CO2'),
    breakDuration13CO2: document.getElementById('breakDurationInput13CO2'),
    enableBreak14CO2: document.getElementById('enableBreakInput14CO2'),
    breakDuration14CO2: document.getElementById('breakDurationInput14CO2'),
    enableBreak15CO2: document.getElementById('enableBreakInput15CO2'),
    breakDuration15CO2: document.getElementById('breakDurationInput15CO2'),
  };

  formSettingsFieldsCO2.intervalCountCO2.value = timerSettingsCO2.intervalCountCO2;
  formSettingsFieldsCO2.intervalDurationCO2.value = timerSettingsCO2.intervalDurationCO2;
  formSettingsFieldsCO2.enableBreakCO2.checked = timerSettingsCO2.enableBreakCO2;
  formSettingsFieldsCO2.breakDurationCO2.value = timerSettingsCO2.breakDurationCO2;
  formSettingsFieldsCO2.enableBreak2CO2.checked = timerSettingsCO2.enableBreak2CO2;
  formSettingsFieldsCO2.breakDuration2CO2.value = timerSettingsCO2.breakDuration2CO2;
  formSettingsFieldsCO2.enableBreak3CO2.checked = timerSettingsCO2.enableBreak3CO2;
  formSettingsFieldsCO2.breakDuration3CO2.value = timerSettingsCO2.breakDuration3CO2;
  formSettingsFieldsCO2.enableBreak4CO2.checked = timerSettingsCO2.enableBreak4CO2;
  formSettingsFieldsCO2.breakDuration4CO2.value = timerSettingsCO2.breakDuration4CO2;
  formSettingsFieldsCO2.enableBreak5CO2.checked = timerSettingsCO2.enableBreak5CO2;
  formSettingsFieldsCO2.breakDuration5CO2.value = timerSettingsCO2.breakDuration5CO2;
  formSettingsFieldsCO2.enableBreak6CO2.checked = timerSettingsCO2.enableBreak6CO2;
  formSettingsFieldsCO2.breakDuration6CO2.value = timerSettingsCO2.breakDuration6CO2;
  formSettingsFieldsCO2.enableBreak7CO2.checked = timerSettingsCO2.enableBreak7CO2;
  formSettingsFieldsCO2.breakDuration7CO2.value = timerSettingsCO2.breakDuration7CO2;
  formSettingsFieldsCO2.enableBreak8CO2.checked = timerSettingsCO2.enableBreak8CO2;
  formSettingsFieldsCO2.breakDuration8CO2.value = timerSettingsCO2.breakDuration8CO2;
  formSettingsFieldsCO2.enableBreak9CO2.checked = timerSettingsCO2.enableBreak9CO2;
  formSettingsFieldsCO2.breakDuration9CO2.value = timerSettingsCO2.breakDuration9CO2;
  formSettingsFieldsCO2.enableBreak10CO2.checked = timerSettingsCO2.enableBreak10CO2;
  formSettingsFieldsCO2.breakDuration10CO2.value = timerSettingsCO2.breakDuration10CO2;
  formSettingsFieldsCO2.enableBreak11CO2.checked = timerSettingsCO2.enableBreak11CO2;
  formSettingsFieldsCO2.breakDuration11CO2.value = timerSettingsCO2.breakDuration11CO2;
  formSettingsFieldsCO2.enableBreak12CO2.checked = timerSettingsCO2.enableBreak12CO2;
  formSettingsFieldsCO2.breakDuration12CO2.value = timerSettingsCO2.breakDuration12CO2;
  formSettingsFieldsCO2.enableBreak13CO2.checked = timerSettingsCO2.enableBreak13CO2;
  formSettingsFieldsCO2.breakDuration13CO2.value = timerSettingsCO2.breakDuration13CO2;
  formSettingsFieldsCO2.enableBreak14CO2.checked = timerSettingsCO2.enableBreak14CO2;
  formSettingsFieldsCO2.breakDuration14CO2.value = timerSettingsCO2.breakDuration14CO2;
  formSettingsFieldsCO2.enableBreak15CO2.checked = timerSettingsCO2.enableBreak15CO2;
  formSettingsFieldsCO2.breakDuration15CO2.value = timerSettingsCO2.breakDuration15CO2;
  
  function getNumberInBoundsOrDefaultCO2(value, minCO2, maxCO2, def = 1) {
    const valueAsNumberCO2 = parseInt(value);
    return isNaN(valueAsNumberCO2) ? def : Math.max(minCO2, Math.min(valueAsNumberCO2, maxCO2));
  }

  function setBreakDurationLineDisplayCO2(displayed) {
    const breakDurationInputLineEltCO2 = document.getElementById('breakDurationInputLineCO2');
    breakDurationInputLineEltCO2.style.display = displayed ? null : 'none';
    const breakDurationInputLineElt2CO2 = document.getElementById('breakDurationInputLine2CO2');
    breakDurationInputLineElt2CO2.style.display = displayed ? null : 'none';
    const breakDurationInputLineElt3CO2 = document.getElementById('breakDurationInputLine3CO2');
    breakDurationInputLineElt3CO2.style.display = displayed ? null : 'none';
    const breakDurationInputLineElt4CO2 = document.getElementById('breakDurationInputLine4CO2');
    breakDurationInputLineElt4CO2.style.display = displayed ? null : 'none';
    const breakDurationInputLineElt5CO2 = document.getElementById('breakDurationInputLine5CO2');
    breakDurationInputLineElt5CO2.style.display = displayed ? null : 'none';
    const breakDurationInputLineElt6CO2 = document.getElementById('breakDurationInputLine6CO2');
    breakDurationInputLineElt6CO2.style.display = displayed ? null : 'none';
    const breakDurationInputLineElt7CO2 = document.getElementById('breakDurationInputLine7CO2');
    breakDurationInputLineElt7CO2.style.display = displayed ? null : 'none';
    const breakDurationInputLineElt8CO2 = document.getElementById('breakDurationInputLine8CO2');
    breakDurationInputLineElt8CO2.style.display = displayed ? null : 'none';
    const breakDurationInputLineElt9CO2 = document.getElementById('breakDurationInputLine9CO2');
    breakDurationInputLineElt9CO2.style.display = displayed ? null : 'none';
    const breakDurationInputLineElt10CO2 = document.getElementById('breakDurationInputLine10CO2');
    breakDurationInputLineElt10CO2.style.display = displayed ? null : 'none';
    const breakDurationInputLineElt11CO2 = document.getElementById('breakDurationInputLine11CO2');
    breakDurationInputLineElt11CO2.style.display = displayed ? null : 'none';
    const breakDurationInputLineElt12CO2 = document.getElementById('breakDurationInputLine12CO2');
    breakDurationInputLineElt12CO2.style.display = displayed ? null : 'none';
    const breakDurationInputLineElt13CO2 = document.getElementById('breakDurationInputLine13CO2');
    breakDurationInputLineElt13CO2.style.display = displayed ? null : 'none';
    const breakDurationInputLineElt14CO2 = document.getElementById('breakDurationInputLine14CO2');
    breakDurationInputLineElt14CO2.style.display = displayed ? null : 'none';
    const breakDurationInputLineElt15CO2 = document.getElementById('breakDurationInputLine15CO2');
    breakDurationInputLineElt15CO2.style.display = displayed ? null : 'none';
  }

  formSettingsFieldsCO2.intervalCountCO2.addEventListener('input', () => {
    const intervalCountCO2 = getNumberInBoundsOrDefaultCO2(formSettingsFieldsCO2.intervalCountCO2.value, 1, 8),
    hasOneIntervalCO2 = intervalCountCO2 === 1,
    hasBreakCO2 = hasOneIntervalCO2 ? false : lastUserSetEnableBreakCO2;

    formSettingsFieldsCO2.enableBreakCO2.disabled = hasOneIntervalCO2 === true;
    formSettingsFieldsCO2.enableBreakCO2.checked = hasBreakCO2;

    setBreakDurationLineDisplayCO2(hasBreakCO2);

    setTimerSettingsCO2(intervalCountCO2, undefined, hasBreakCO2);
    updateInfoCO2();
  });

  formSettingsFieldsCO2.intervalDurationCO2.addEventListener('input', () => {
    setTimerSettingsCO2(undefined, getNumberInBoundsOrDefaultCO2(formSettingsFieldsCO2.intervalDurationCO2.value, 1, oneDayInSecondsCO2));
    updateInfoCO2();
  });

  formSettingsFieldsCO2.enableBreakCO2.addEventListener('change', () => {
    const enableBreakCO2 = formSettingsFieldsCO2.enableBreakCO2.checked;

    lastUserSetEnableBreakCO2 = enableBreakCO2;
    setBreakDurationLineDisplayCO2(enableBreakCO2);
    setTimerSettingsCO2(undefined, undefined, enableBreakCO2);
    updateInfoCO2();
  });

  formSettingsFieldsCO2.breakDurationCO2.addEventListener('input', () => {
    setTimerSettingsCO2( undefined, undefined, undefined,
    getNumberInBoundsOrDefaultCO2(formSettingsFieldsCO2.breakDurationCO2.value, 1, oneDayInSecondsCO2)
    );
    updateInfoCO2();
  });

  formSettingsFieldsCO2.enableBreak2CO2.addEventListener('change', () => {
    const enableBreak2CO2 = formSettingsFieldsCO2.enableBreak2CO2.checked;

    lastUserSetEnableBreak2CO2 = enableBreak2CO2;
    setBreakDurationLineDisplayCO2(enableBreak2CO2);
    setTimerSettingsCO2(undefined, undefined, undefined, undefined, enableBreak2CO2);
    updateInfoCO2();
  });

  formSettingsFieldsCO2.breakDuration2CO2.addEventListener('input', () => {
    setTimerSettingsCO2(undefined, undefined, undefined, undefined, undefined,
    getNumberInBoundsOrDefaultCO2(formSettingsFieldsCO2.breakDuration2CO2.value, 1, oneDayInSecondsCO2)
    );
    updateInfoCO2();
  });

    formSettingsFieldsCO2.enableBreak3CO2.addEventListener('change', () => {
      const enableBreak3CO2 = formSettingsFieldsCO2.enableBreak3CO2.checked;

      lastUserSetEnableBreak3CO2 = enableBreak2CO2;
      setBreakDurationLineDisplayCO2(enableBreak3CO2);
      setTimerSettingsCO2(undefined, undefined, undefined, undefined, undefined, undefined, enableBreak3CO2);
      updateInfoCO2();
    });

    formSettingsFieldsCO2.breakDuration3CO2.addEventListener('input', () => {
      setTimerSettingsCO2(
        undefined, undefined, undefined, undefined, undefined, undefined, undefined,
        getNumberInBoundsOrDefaultCO2(formSettingsFieldsCO2.breakDuration3CO2.value, 1, oneDayInSecondsCO2)
      );
      updateInfoCO2();
    });
    formSettingsFieldsCO2.enableBreak4CO2.addEventListener('change', () => {
      const enableBreak4CO2 = formSettingsFieldsCO2.enableBreak4CO2.checked;

      lastUserSetEnableBreak4CO2 = enableBreak4CO2;
      setBreakDurationLineDisplayCO2(enableBreak4CO2);
      setTimerSettingsCO2(undefined, undefined, undefined, undefined, undefined, undefined, undefined, enableBreak4CO2);
      updateInfoCO2();
    });

    formSettingsFieldsCO2.breakDuration4CO2.addEventListener('input', () => {
      setTimerSettingsCO2(
        undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined,
        getNumberInBoundsOrDefaultCO2(formSettingsFieldsCO2.breakDuration4CO2.value, 1, oneDayInSecondsCO2)
      );
      updateInfoCO2();
    });
    formSettingsFieldsCO2.enableBreak5CO2.addEventListener('change', () => {
      const enableBreak5CO2 = formSettingsFieldsCO2.enableBreak5CO2.checked;

      lastUserSetEnableBreak5CO2 = enableBreak5CO2;
      setBreakDurationLineDisplayCO2(enableBreak5CO2);
      setTimerSettingsCO2(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, enableBreak5CO2);
      updateInfoCO2();
    });

    formSettingsFieldsCO2.breakDuration5CO2.addEventListener('input', () => {
      setTimerSettingsCO2(
        undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined,
        getNumberInBoundsOrDefaultCO2(formSettingsFieldsCO2.breakDuration5CO2.value, 1, oneDayInSecondsCO2)
      );
      updateInfoCO2();
    });
    formSettingsFieldsCO2.enableBreak6CO2.addEventListener('change', () => {
      const enableBreak6CO2 = formSettingsFieldsCO2.enableBreak6CO2.checked;

      lastUserSetEnableBreak6CO2 = enableBreak6CO2;
      setBreakDurationLineDisplayCO2(enableBreak6CO2);
      setTimerSettingsCO2(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, enableBreak6CO2);
      updateInfoCO2();
    });

    formSettingsFieldsCO2.breakDuration6CO2.addEventListener('input', () => {
      setTimerSettingsCO2(
        undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined,
        getNumberInBoundsOrDefaultCO2(formSettingsFieldsCO2.breakDuration6CO2.value, 1, oneDayInSecondsCO2)
      );
      updateInfoCO2();
    });
    formSettingsFieldsCO2.enableBreak7CO2.addEventListener('change', () => {
      const enableBreak7CO2 = formSettingsFieldsCO2.enableBreak7CO2.checked;

      lastUserSetEnableBreak7CO2 = enableBreak7CO2;
      setBreakDurationLineDisplayCO2(enableBreak7CO2);
      setTimerSettingsCO2(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, enableBreak7CO2);
      updateInfoCO2();
    });

    formSettingsFieldsCO2.breakDuration7CO2.addEventListener('input', () => {
      setTimerSettingsCO2(
        undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined,
        getNumberInBoundsOrDefaultCO2(formSettingsFieldsCO2.breakDuration7CO2.value, 1, oneDayInSecondsCO2)
      );
      updateInfoCO2();
    });
    formSettingsFieldsCO2.enableBreak8CO2.addEventListener('change', () => {
      const enableBreak8CO2 = formSettingsFieldsCO2.enableBreak8CO2.checked;

      lastUserSetEnableBreak8CO2 = enableBreak8CO2;
      setBreakDurationLineDisplayCO2(enableBreak8CO2);
      setTimerSettingsCO2(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, enableBreak8CO2);
      updateInfoCO2();
    });

    formSettingsFieldsCO2.breakDuration8CO2.addEventListener('input', () => {
      setTimerSettingsCO2(
        undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined,
        getNumberInBoundsOrDefaultCO2(formSettingsFieldsCO2.breakDuration8CO2.value, 1, oneDayInSecondsCO2)
      );
      updateInfoCO2();
    });
    formSettingsFieldsCO2.enableBreak9CO2.addEventListener('change', () => {
      const enableBreak9CO2 = formSettingsFieldsCO2.enableBreak9CO2.checked;

      lastUserSetEnableBreak9CO2 = enableBreak9CO2;
      setBreakDurationLineDisplayCO2(enableBreak9CO2);
      setTimerSettingsCO2(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, enableBreak9CO2);
      updateInfoCO2();
    });

    formSettingsFieldsCO2.breakDuration9CO2.addEventListener('input', () => {
      setTimerSettingsCO2(
        undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined,
        getNumberInBoundsOrDefaultCO2(formSettingsFieldsCO2.breakDuration9CO2.value, 1, oneDayInSecondsCO2)
      );
      updateInfoCO2();
    });
    formSettingsFieldsCO2.enableBreak10CO2.addEventListener('change', () => {
      const enableBreak10CO2 = formSettingsFieldsCO2.enableBreak10CO2.checked;

      lastUserSetEnableBreak10CO2 = enableBreak10CO2;
      setBreakDurationLineDisplayCO2(enableBreak10CO2);
      setTimerSettingsCO2(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, enableBreak10CO2);
      updateInfoCO2();
    });

    formSettingsFieldsCO2.breakDuration10CO2.addEventListener('input', () => {
      setTimerSettingsCO2(
        undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined,
        getNumberInBoundsOrDefaultCO2(formSettingsFieldsCO2.breakDuration10CO2.value, 1, oneDayInSecondsCO2)
      );
      updateInfoCO2();
    });
    formSettingsFieldsCO2.enableBreak11CO2.addEventListener('change', () => {
      const enableBreak11CO2 = formSettingsFieldsCO2.enableBreak11CO2.checked;

      lastUserSetEnableBreak11CO2 = enableBreak11CO2;
      setBreakDurationLineDisplayCO2(enableBreak11CO2);
      setTimerSettingsCO2(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, enableBreak11CO2);
      updateInfoCO2();
    });

    formSettingsFieldsCO2.breakDuration11CO2.addEventListener('input', () => {
      setTimerSettingsCO2(
        undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined,
        getNumberInBoundsOrDefaultCO2(formSettingsFieldsCO2.breakDuration11CO2.value, 1, oneDayInSecondsCO2)
      );
      updateInfoCO2();
    });
    formSettingsFieldsCO2.enableBreak12CO2.addEventListener('change', () => {
      const enableBreak12CO2 = formSettingsFieldsCO2.enableBreak12CO2.checked;

      lastUserSetEnableBreak12CO2 = enableBreak12CO2;
      setBreakDurationLineDisplayCO2(enableBreak12CO2);
      setTimerSettingsCO2(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, enableBreak12CO2);
      updateInfoCO2();
    });

    formSettingsFieldsCO2.breakDuration12CO2.addEventListener('input', () => {
      setTimerSettingsCO2(
        undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined,
        getNumberInBoundsOrDefaultCO2(formSettingsFieldsCO2.breakDuration12CO2.value, 1, oneDayInSecondsCO2)
      );
      updateInfoCO2();
    });
    formSettingsFieldsCO2.enableBreak13CO2.addEventListener('change', () => {
      const enableBreak13CO2 = formSettingsFieldsCO2.enableBreak13CO2.checked;

      lastUserSetEnableBreak13CO2 = enableBreak13CO2;
      setBreakDurationLineDisplayCO2(enableBreak13CO2);
      setTimerSettingsCO2(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, enableBreak13CO2);
      updateInfoCO2();
    });

    formSettingsFieldsCO2.breakDuration13CO2.addEventListener('input', () => {
      setTimerSettingsCO2(
        undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined,
        getNumberInBoundsOrDefaultCO2(formSettingsFieldsCO2.breakDuration13CO2.value, 1, oneDayInSecondsCO2)
      );
      updateInfoCO2();
    });
    formSettingsFieldsCO2.enableBreak14CO2.addEventListener('change', () => {
      const enableBreak14CO2 = formSettingsFieldsCO2.enableBreak14CO2.checked;

      lastUserSetEnableBreak14CO2 = enableBreak14CO2;
      setBreakDurationLineDisplayCO2(enableBreak14CO2);
      setTimerSettingsCO2(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, enableBreak14CO2);
      updateInfoCO2();
    });

    formSettingsFieldsCO2.breakDuration14CO2.addEventListener('input', () => {
      setTimerSettingsCO2(
        undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined,
        getNumberInBoundsOrDefaultCO2(formSettingsFieldsCO2.breakDuration14CO2.value, 1, oneDayInSecondsCO2)
      );
      updateInfoCO2();
    });
    formSettingsFieldsCO2.enableBreak15CO2.addEventListener('change', () => {
      const enableBreak15CO2 = formSettingsFieldsCO2.enableBreak15CO2.checked;

      lastUserSetEnableBreak15CO2 = enableBreak15CO2;
      setBreakDurationLineDisplayCO2(enableBreak15CO2);
      setTimerSettingsCO2(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, enableBreak15CO2);
      updateInfoCO2();
    });

    formSettingsFieldsCO2.breakDuration15CO2.addEventListener('input', () => {
      setTimerSettingsCO2(
        undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined,
        getNumberInBoundsOrDefaultCO2(formSettingsFieldsCO2.breakDuration15CO2.value, 1, oneDayInSecondsCO2)
      );
      updateInfoCO2();
    });
  }

  function initializeTimerControlsCO2() {
    timerControlsButtonsCO2 = {
      startCO2: document.getElementById('startBtnCO2'),
      pauseCO2: document.getElementById('pauseBtnCO2'),
      stopCO2: document.getElementById('stopBtnCO2'),
    };

    setTimerControlsDisabledStateCO2(false, true, true);

    timerControlsButtonsCO2.startCO2.addEventListener('click', startTimerCO2);
    timerControlsButtonsCO2.pauseCO2.addEventListener('click', pauseTimerCO2);
    timerControlsButtonsCO2.stopCO2.addEventListener('click', stopTimerCO2);
  }

  function initializeStatusPanelCO2() {
    statusPanelCO2 = {
      timeOverviewMessageCO2: document.getElementById('timeOverviewMessageCO2'),
      elapsedInIntervalCO2: document.getElementById('elapsedInIntervalCO2'),
      elapsedInIntervalBoxCO2: document.getElementById('elapsedInIntervalBoxCO2'),
      elapsedInBreakIntervalBoxCO2: document.getElementById('elapsedInBreakIntervalBoxCO2'),
      elapsedInBreakIntervalCO2: document.getElementById('elapsedInBreakIntervalCO2'),
      elapsedInBreakIntervalBox2CO2: document.getElementById('elapsedInBreakIntervalBox2CO2'),
      elapsedInBreakInterval2CO2: document.getElementById('elapsedInBreakInterval2CO2'),
      elapsedInBreakIntervalBox3CO2: document.getElementById('elapsedInBreakIntervalBox3CO2'),
      elapsedInBreakInterval3CO2: document.getElementById('elapsedInBreakInterval3CO2'),
      elapsedInBreakIntervalBox4CO2: document.getElementById('elapsedInBreakIntervalBox4CO2'),
      elapsedInBreakInterval4CO2: document.getElementById('elapsedInBreakInterval4CO2'),
      elapsedInBreakIntervalBox5CO2: document.getElementById('elapsedInBreakIntervalBox5CO2'),
      elapsedInBreakInterval5CO2: document.getElementById('elapsedInBreakInterval5CO2'),
      elapsedInBreakIntervalBox6CO2: document.getElementById('elapsedInBreakIntervalBox6CO2'),
      elapsedInBreakInterval6CO2: document.getElementById('elapsedInBreakInterval6CO2'),
      elapsedInBreakIntervalBox7CO2: document.getElementById('elapsedInBreakIntervalBox7CO2'),
      elapsedInBreakInterval7CO2: document.getElementById('elapsedInBreakInterval7CO2'),
      elapsedInBreakIntervalBox8CO2: document.getElementById('elapsedInBreakIntervalBox8CO2'),
      elapsedInBreakInterval8CO2: document.getElementById('elapsedInBreakInterval8CO2'),
      elapsedInBreakIntervalBox9CO2: document.getElementById('elapsedInBreakIntervalBox9CO2'),
      elapsedInBreakInterval9CO2: document.getElementById('elapsedInBreakInterval9CO2'),
      elapsedInBreakIntervalBox10CO2: document.getElementById('elapsedInBreakIntervalBox10CO2'),
      elapsedInBreakInterval10CO2: document.getElementById('elapsedInBreakInterval10CO2'),
      elapsedInBreakIntervalBox11CO2: document.getElementById('elapsedInBreakIntervalBox11CO2'),
      elapsedInBreakInterval11CO2: document.getElementById('elapsedInBreakInterval11CO2'),
      elapsedInBreakIntervalBox12CO2: document.getElementById('elapsedInBreakIntervalBox12CO2'),
      elapsedInBreakInterval12CO2: document.getElementById('elapsedInBreakInterval12CO2'),
      elapsedInBreakIntervalBox13CO2: document.getElementById('elapsedInBreakIntervalBox13CO2'),
      elapsedInBreakInterval13CO2: document.getElementById('elapsedInBreakInterval13CO2'),
      elapsedInBreakIntervalBox14CO2: document.getElementById('elapsedInBreakIntervalBox14CO2'),
      elapsedInBreakInterval14CO2: document.getElementById('elapsedInBreakInterval14CO2'),
      elapsedInBreakIntervalBox15CO2: document.getElementById('elapsedInBreakIntervalBox15CO2'),
      elapsedInBreakInterval15CO2: document.getElementById('elapsedInBreakInterval15CO2'),
      intervalsDoneCO2: document.getElementById('intervalsDoneCO2'),
      levelHold1CO2: document.getElementById('levelHold1CO2'),
      levelHold2CO2: document.getElementById('levelHold2CO2'),
      levelHold3CO2: document.getElementById('levelHold3CO2'),
      levelHold4CO2: document.getElementById('levelHold4CO2'),
      levelHold5CO2: document.getElementById('levelHold5CO2'),
      levelHold6CO2: document.getElementById('levelHold6CO2'),
      levelHold7CO2: document.getElementById('levelHold7CO2'),
      levelHold8CO2: document.getElementById('levelHold8CO2'),
      levelCO2: document.getElementById('levelCO2')
    };
    statusPanelCO2.levelCO2.textContent = '1';
    statusPanelCO2.levelHold1CO2.textContent = '0:30';
    statusPanelCO2.levelHold2CO2.textContent = '0:45';
    statusPanelCO2.levelHold3CO2.textContent = '1:00';
    statusPanelCO2.levelHold4CO2.textContent = '1:15';
    statusPanelCO2.levelHold5CO2.textContent = '1:30';
    statusPanelCO2.levelHold6CO2.textContent = '1:45';
    statusPanelCO2.levelHold7CO2.textContent = '2:00';
    statusPanelCO2.levelHold8CO2.textContent = '2:15';
  }

  function setTimerControlsDisabledStateCO2(startCO2, pauseCO2, stopCO2) {
    timerControlsButtonsCO2.startCO2.disabled = startCO2;
    timerControlsButtonsCO2.pauseCO2.disabled = pauseCO2;
    timerControlsButtonsCO2.stopCO2.disabled = stopCO2;
  }

  function setFormDisabledStateCO2(disabled) {
    formSettingsFieldsCO2.intervalCountCO2.disabled = disabled;
    formSettingsFieldsCO2.intervalDurationCO2.disabled = disabled;
    formSettingsFieldsCO2.enableBreakCO2.disabled = disabled || timerSettingsCO2.intervalCountCO2 === 1;
    formSettingsFieldsCO2.breakDurationCO2.disabled = disabled;
    formSettingsFieldsCO2.enableBreak2CO2.disabled = disabled
    formSettingsFieldsCO2.breakDuration2CO2.disabled = disabled;
    formSettingsFieldsCO2.enableBreak3CO2.disabled = disabled
    formSettingsFieldsCO2.breakDuration3CO2.disabled = disabled;
    formSettingsFieldsCO2.enableBreak4CO2.disabled = disabled
    formSettingsFieldsCO2.breakDuration4CO2.disabled = disabled;
    formSettingsFieldsCO2.enableBreak5CO2.disabled = disabled
    formSettingsFieldsCO2.breakDuration5CO2.disabled = disabled;
    formSettingsFieldsCO2.enableBreak6CO2.disabled = disabled
    formSettingsFieldsCO2.breakDuration6CO2.disabled = disabled;
    formSettingsFieldsCO2.enableBreak7CO2.disabled = disabled
    formSettingsFieldsCO2.breakDuration7CO2.disabled = disabled;
    formSettingsFieldsCO2.enableBreak8CO2.disabled = disabled
    formSettingsFieldsCO2.breakDuration8CO2.disabled = disabled;
    formSettingsFieldsCO2.enableBreak9CO2.disabled = disabled
    formSettingsFieldsCO2.breakDuration9CO2.disabled = disabled;
    formSettingsFieldsCO2.enableBreak10CO2.disabled = disabled
    formSettingsFieldsCO2.breakDuration10CO2.disabled = disabled;
    formSettingsFieldsCO2.enableBreak11CO2.disabled = disabled
    formSettingsFieldsCO2.breakDuration11CO2.disabled = disabled;
    formSettingsFieldsCO2.enableBreak12CO2.disabled = disabled
    formSettingsFieldsCO2.breakDuration12CO2.disabled = disabled;
    formSettingsFieldsCO2.enableBreak13CO2.disabled = disabled
    formSettingsFieldsCO2.breakDuration13CO2.disabled = disabled;
    formSettingsFieldsCO2.enableBreak14CO2.disabled = disabled
    formSettingsFieldsCO2.breakDuration14CO2.disabled = disabled;
    formSettingsFieldsCO2.enableBreak15CO2.disabled = disabled
    formSettingsFieldsCO2.breakDuration15CO2.disabled = disabled;
    minusBtnCO2.disabled = disabled;
    plusBtnCO2.disabled = disabled;
  }

  function startTimerCO2() {
    if(intCO2!==null){
      clearInterval(intCO2);
    }
    intCO2 = setInterval(displayTimerCO2,1000);
    setFormDisabledStateCO2(true);
    setTimerControlsDisabledStateCO2(true, false, true);
    timerControlsButtonsCO2.stopCO2.style.color = "rgb(177, 177, 177)";
      if (timerCO2.isBreak0CO2) {
        if (!ismuteCO2) {
            audioListCO2[0].muted = false;
            audioListCO2[0].play();
        }
    }
      isO2ON = true;
      if (!isSongMuteCO2) {
          playSelectedSongO2();
      }
    if (timerCO2.isFinishedCO2) {
      resetTimerCO2();
    }
    startTimerTickCO2();  
      timerControlsButtonsCO2.startCO2.style.display = 'none';
      timerControlsButtonsCO2.pauseCO2.style.display = 'inline';
  }

  function pauseTimerCO2() {
    clearInterval(intCO2);
    setTimerControlsDisabledStateCO2(false, true, false);
    document.getElementById('stopBtnCO2').style.color = '#990000';
    timerControlsButtonsCO2.pauseCO2.style.display = 'none'; 
    timerControlsButtonsCO2.startCO2.style.display = 'inline';
    document.getElementById('CO2Date').value = date;
    if (timerCO2.intervalsDoneCO2 == 0) {
        document.getElementById('CO2Save').disabled = true;
    }
    else {
        document.getElementById('CO2Save').disabled = false;
        document.getElementById('CO2Save').style.color = '#49B79D';
    }
    if (!isSongMuteCO2) {
        audioPlayerO2.pause();
    }
    stopTimerTickCO2();
  }

  function stopTimerCO2() {
    clearInterval(intCO2);
    timerRefCO2.value = '|';
    if (!isSongMuteCO2) {
        audioPlayerO2.pause();
    }
    audioPlayerO2.currentTime = 0
    timerControlsButtonsCO2.pauseCO2.style.display = 'none'; 
    timerControlsButtonsCO2.startCO2.style.display = 'inline';
    setFormDisabledStateCO2(false);
    setTimerControlsDisabledStateCO2(false, true, true);
    timerControlsButtonsCO2.stopCO2.style.color = "rgb(177, 177, 177)";
    timerControlsButtonsCO2.startCO2.style.color = "#0661AA";
    stopTimerTickCO2();
    resetTimerCO2();
    document.getElementsByClassName('gap2CO2')[0].style.backgroundColor = '#ffffff';
    document.getElementsByClassName('gap2CO2')[1].style.backgroundColor = '#ffffff';
    document.getElementsByClassName('gap3CO2')[0].style.backgroundColor = '#ffffff';
    document.getElementsByClassName('gap3CO2')[1].style.backgroundColor = '#ffffff';
    document.getElementsByClassName('gap4CO2')[0].style.backgroundColor = '#ffffff';
    document.getElementsByClassName('gap4CO2')[1].style.backgroundColor = '#ffffff';
    document.getElementsByClassName('gap5CO2')[0].style.backgroundColor = '#ffffff';
    document.getElementsByClassName('gap5CO2')[1].style.backgroundColor = '#ffffff';
    document.getElementsByClassName('gap6CO2')[0].style.backgroundColor = '#ffffff';
    document.getElementsByClassName('gap6CO2')[1].style.backgroundColor = '#ffffff';
    document.getElementsByClassName('gap7CO2')[0].style.backgroundColor = '#ffffff';
    document.getElementsByClassName('gap7CO2')[1].style.backgroundColor = '#ffffff';
    document.getElementsByClassName('gap8CO2')[0].style.backgroundColor = '#ffffff';
    document.getElementsByClassName('gap8CO2')[1].style.backgroundColor = '#ffffff';
    document.getElementsByClassName('gap1CO2')[0].style.backgroundColor = '#49B79D';
    document.getElementsByClassName('gap1CO2')[1].style.backgroundColor = '#49B79D';
    isBreak0CO2 = true;
    document.getElementById("CO2Results").innerHTML = "";
  }

  function displayTimerCO2(){
    secondsCO2++;
    if(secondsCO2 == 60){
      secondsCO2 = 0;
      minutesCO2++;
      if(minutesCO2 == 60){
        minutesCO2 = 0;
        hoursCO2++;
      }
    }
  }

  function startTimerTickCO2() {
    timerCO2.intervalId = setInterval(onTimerTickCO2, 1000);
  }

  function stopTimerTickCO2() {
    clearInterval(timerCO2.intervalId);
  }

  function onTimerTickCO2() {
    const currentIntervalDurationCO2 = timerCO2.isBreakCO2 ? timerSettingsCO2.breakDurationCO2 : timerCO2.isBreak2CO2 ? timerSettingsCO2.breakDuration2CO2 : timerCO2.isBreak3CO2 ? timerSettingsCO2.breakDuration3CO2 : timerCO2.isBreak4CO2 ? timerSettingsCO2.breakDuration4CO2 : timerCO2.isBreak5CO2 ? timerSettingsCO2.breakDuration5CO2 : timerCO2.isBreak6CO2 ? timerSettingsCO2.breakDuration6CO2 : timerCO2.isBreak7CO2 ? timerSettingsCO2.breakDuration7CO2 : timerCO2.isBreak8CO2 ? timerSettingsCO2.breakDuration8CO2 : timerCO2.isBreak9CO2 ? timerSettingsCO2.breakDuration9CO2 : timerCO2.isBreak10CO2 ? timerSettingsCO2.breakDuration10CO2 : timerCO2.isBreak11CO2 ? timerSettingsCO2.breakDuration11CO2 : timerCO2.isBreak12CO2 ? timerSettingsCO2.breakDuration12CO2 : timerCO2.isBreak13CO2 ? timerSettingsCO2.breakDuration13CO2 : timerCO2.isBreak14CO2 ? timerSettingsCO2.breakDuration14CO2 : timerCO2.isBreak15CO2 ? timerSettingsCO2.breakDuration15CO2 : timerSettingsCO2.intervalDurationCO2;
    if (timerCO2.elapsedInIntervalCO2 <= currentIntervalDurationCO2 && timerCO2.isBreak0CO2) {
      timerCO2.elapsedInIntervalCO2++;
      if(timerCO2.elapsedInIntervalCO2 > currentIntervalDurationCO2 && timerCO2.isBreak0CO2){
          if (!ismuteCO2) {
            audioListCO2[3].muted = false;
            audioListCO2[3].play();
        }
        timerCO2.isBreakCO2 = true;  
        timerCO2.isBreak0CO2 = false;
        timerCO2.isFinishedCO2 = timerCO2.intervalsDoneCO2 === timerSettingsCO2.intervalCountCO2;
        if (!timerCO2.isFinishedCO2) {
            timerCO2.elapsedInIntervalCO2 = 1;
        }
        if (timerCO2.isFinishedCO2) {
          setTimerControlsDisabledStateCO2(false, true, true);
          setFormDisabledStateCO2(false);
          stopTimerTickCO2();
        } else {
          timerCO2.totalTimeElapsedCO2++;
        }
        updateInfoCO2();
      } 
      updateInfoCO2();
    }else if(timerCO2.elapsedInIntervalCO2 <= currentIntervalDurationCO2 && timerCO2.isBreakCO2){
      timerCO2.elapsedInIntervalCO2++;
      if(timerCO2.elapsedInIntervalCO2 > currentIntervalDurationCO2 && timerCO2.isBreakCO2){
          if (!ismuteCO2) {
            audioListCO2[0].muted = false;
            audioListCO2[0].play();
        }
        document.getElementsByClassName('gap1CO2')[0].style.backgroundColor = '#ffffff';
        document.getElementsByClassName('gap1CO2')[1].style.backgroundColor = '#ffffff';
        document.getElementsByClassName('gap2CO2')[0].style.backgroundColor = '#49B79D';
        document.getElementsByClassName('gap2CO2')[1].style.backgroundColor = '#49B79D';
        timerCO2.isBreak2CO2 = true;
        timerCO2.isBreakCO2 = false; 
        timerCO2.intervalsDoneCO2++;
        document.getElementById("CO2Results").innerHTML += "<div class='NOfSteps'> <div>Round " + timerCO2.intervalsDoneCO2 + "</div><div>" + (timerCO2.elapsedInIntervalCO2 - 1) + " seconds</div></div>";
          timerRefCO2.value += (timerCO2.elapsedInIntervalCO2 - 1) + "|";
        timerCO2.isFinishedCO2 = timerCO2.intervalsDoneCO2 === timerSettingsCO2.intervalCountCO2;
        if (!timerCO2.isFinishedCO2) {
            timerCO2.elapsedInIntervalCO2 = 1;
        }
        if (timerCO2.isFinishedCO2) {
          setTimerControlsDisabledStateCO2(false, true, true);
          setFormDisabledStateCO2(false);
          stopTimerTickCO2();
        } else {
          timerCO2.totalTimeElapsedCO2++;
        }
        updateInfoCO2();
      } 
      updateInfoCO2();
    }else if(timerCO2.elapsedInIntervalCO2 <= currentIntervalDurationCO2 && timerCO2.isBreak2CO2){
      timerCO2.elapsedInIntervalCO2++;
      if(timerCO2.elapsedInIntervalCO2 > currentIntervalDurationCO2 && timerCO2.isBreak2CO2){
          if (!ismuteCO2) {
            audioListCO2[3].muted = false;
            audioListCO2[3].play();
        }
        timerCO2.isBreak3CO2 = true;
        timerCO2.isBreak2CO2 = false;
        timerCO2.isFinishedCO2 = timerCO2.intervalsDoneCO2 === timerSettingsCO2.intervalCountCO2;
        if (!timerCO2.isFinishedCO2) {
          timerCO2.elapsedInIntervalCO2 = 1;
        }
        if (timerCO2.isFinishedCO2) {
          setTimerControlsDisabledStateCO2(false, true, true);
          setFormDisabledStateCO2(false);
          stopTimerTickCO2();
        } else {
          timerCO2.totalTimeElapsedCO2++;
        }
        updateInfoCO2();
      } 
      updateInfoCO2();
    }else if(timerCO2.elapsedInIntervalCO2 <= currentIntervalDurationCO2 && timerCO2.isBreak3CO2){
        timerCO2.elapsedInIntervalCO2++;
        if(timerCO2.elapsedInIntervalCO2 > currentIntervalDurationCO2 && timerCO2.isBreak3CO2){
            if (!ismuteCO2) {
                audioListCO2[0].muted = false;
                audioListCO2[0].play();
          }
          document.getElementsByClassName('gap2CO2')[0].style.backgroundColor = '#ffffff';
          document.getElementsByClassName('gap2CO2')[1].style.backgroundColor = '#ffffff';
          document.getElementsByClassName('gap3CO2')[0].style.backgroundColor = '#49B79D';
          document.getElementsByClassName('gap3CO2')[1].style.backgroundColor = '#49B79D';
          timerCO2.isBreak4CO2 = true;
          timerCO2.isBreak3CO2 = false;
          timerCO2.intervalsDoneCO2++;
            document.getElementById("CO2Results").innerHTML += "<div class='NOfSteps'> <div>Round " + timerCO2.intervalsDoneCO2 + "</div><div>" + (timerCO2.elapsedInIntervalCO2 - 1) + " seconds</div></div>";
            timerRefCO2.value += (timerCO2.elapsedInIntervalCO2 - 1) + "|";
          timerCO2.isFinishedCO2 = timerCO2.intervalsDoneCO2 === timerSettingsCO2.intervalCountCO2;
          if (!timerCO2.isFinishedCO2) {
            timerCO2.elapsedInIntervalCO2 = 1;
          }
          if (timerCO2.isFinishedCO2) {
            setTimerControlsDisabledStateCO2(false, true, true);
            setFormDisabledStateCO2(false);
            stopTimerTickCO2();
          } else {
            timerCO2.totalTimeElapsedCO2++;
          }
          updateInfoCO2();
        } 
        updateInfoCO2();
      }else if(timerCO2.elapsedInIntervalCO2 <= currentIntervalDurationCO2 && timerCO2.isBreak4CO2){
        timerCO2.elapsedInIntervalCO2++;
        if(timerCO2.elapsedInIntervalCO2 > currentIntervalDurationCO2 && timerCO2.isBreak4CO2){
            if (!ismuteCO2) {
                audioListCO2[3].muted = false;
                audioListCO2[3].play();
          }
          timerCO2.isBreak5CO2 = true;
          timerCO2.isBreak4CO2 = false;
          timerCO2.isFinishedCO2 = timerCO2.intervalsDoneCO2 === timerSettingsCO2.intervalCountCO2;
          if (!timerCO2.isFinishedCO2) {
            timerCO2.elapsedInIntervalCO2 = 1;
          }
          if (timerCO2.isFinishedCO2) {
            setTimerControlsDisabledStateCO2(false, true, true);
            setFormDisabledStateCO2(false);
            stopTimerTickCO2();
          } else {
            timerCO2.totalTimeElapsedCO2++;
          }
          updateInfoCO2();
        } 
        updateInfoCO2();
      }else if(timerCO2.elapsedInIntervalCO2 <= currentIntervalDurationCO2 && timerCO2.isBreak5CO2){
        timerCO2.elapsedInIntervalCO2++;
        if(timerCO2.elapsedInIntervalCO2 > currentIntervalDurationCO2 && timerCO2.isBreak5CO2){
          if(!ismuteCO2){
              audioListCO2[0].muted = false;
              audioListCO2[0].play();
          }
          document.getElementsByClassName('gap3CO2')[0].style.backgroundColor = '#ffffff';
          document.getElementsByClassName('gap3CO2')[1].style.backgroundColor = '#ffffff';
          document.getElementsByClassName('gap4CO2')[0].style.backgroundColor = '#49B79D';
          document.getElementsByClassName('gap4CO2')[1].style.backgroundColor = '#49B79D';
          timerCO2.isBreak6CO2 = true;
          timerCO2.isBreak5CO2 = false;
          timerCO2.intervalsDoneCO2++;
            document.getElementById("CO2Results").innerHTML += "<div class='NOfSteps'> <div>Round " + timerCO2.intervalsDoneCO2 + "</div><div>" + (timerCO2.elapsedInIntervalCO2 - 1) + " seconds</div></div>";
            timerRefCO2.value += (timerCO2.elapsedInIntervalCO2 - 1) + "|";
          timerCO2.isFinishedCO2 = timerCO2.intervalsDoneCO2 === timerSettingsCO2.intervalCountCO2;
          if (!timerCO2.isFinishedCO2) {
            timerCO2.elapsedInIntervalCO2 = 1;
          }
          if (timerCO2.isFinishedCO2) {
            setTimerControlsDisabledStateCO2(false, true, true);
            setFormDisabledStateCO2(false);
            stopTimerTickCO2();
          } else {
            timerCO2.totalTimeElapsedCO2++;
          }
          updateInfoCO2();
        } 
        updateInfoCO2();
      }else if(timerCO2.elapsedInIntervalCO2 <= currentIntervalDurationCO2 && timerCO2.isBreak6CO2){
        timerCO2.elapsedInIntervalCO2++;
        if(timerCO2.elapsedInIntervalCO2 > currentIntervalDurationCO2 && timerCO2.isBreak6CO2){
            if (!ismuteCO2) {
                audioListCO2[3].muted = false;
                audioListCO2[3].play();
          }
          timerCO2.isBreak7CO2 = true;
          timerCO2.isBreak6CO2 = false;
          timerCO2.isFinishedCO2 = timerCO2.intervalsDoneCO2 === timerSettingsCO2.intervalCountCO2;
          if (!timerCO2.isFinishedCO2) {
            timerCO2.elapsedInIntervalCO2 = 1;
          }
          if (timerCO2.isFinishedCO2) {
            setTimerControlsDisabledStateCO2(false, true, true);
            setFormDisabledStateCO2(false);
            stopTimerTickCO2();
          } else {
            timerCO2.totalTimeElapsedCO2++;
          }
          updateInfoCO2();
        } 
        updateInfoCO2();
      }else if(timerCO2.elapsedInIntervalCO2 <= currentIntervalDurationCO2 && timerCO2.isBreak7CO2){
        timerCO2.elapsedInIntervalCO2++;
        if(timerCO2.elapsedInIntervalCO2 > currentIntervalDurationCO2 && timerCO2.isBreak7CO2){
          if(!ismuteCO2){
              audioListCO2[0].muted = false;
              audioListCO2[0].play();
          }
          document.getElementsByClassName('gap4CO2')[0].style.backgroundColor = '#ffffff';
          document.getElementsByClassName('gap4CO2')[1].style.backgroundColor = '#ffffff';
          document.getElementsByClassName('gap5CO2')[0].style.backgroundColor = '#49B79D';
          document.getElementsByClassName('gap5CO2')[1].style.backgroundColor = '#49B79D';
          timerCO2.isBreak8CO2 = true;
          timerCO2.isBreak7CO2 = false;
          timerCO2.intervalsDoneCO2++;
            document.getElementById("CO2Results").innerHTML += "<div class='NOfSteps'> <div>Round " + timerCO2.intervalsDoneCO2 + "</div><div>" + (timerCO2.elapsedInIntervalCO2 - 1) + " seconds</div></div>";
            timerRefCO2.value += (timerCO2.elapsedInIntervalCO2 - 1) + "|";          
          timerCO2.isFinishedCO2 = timerCO2.intervalsDoneCO2 === timerSettingsCO2.intervalCountCO2;
          if (!timerCO2.isFinishedCO2) {
            timerCO2.elapsedInIntervalCO2 = 1;
          }
          if (timerCO2.isFinishedCO2) {
            setTimerControlsDisabledStateCO2(false, true, true);
            setFormDisabledStateCO2(false);
            stopTimerTickCO2();
          } else {
            timerCO2.totalTimeElapsedCO2++;
          }
          updateInfoCO2();
        } 
        updateInfoCO2();
      }else if(timerCO2.elapsedInIntervalCO2 <= currentIntervalDurationCO2 && timerCO2.isBreak8CO2){
        timerCO2.elapsedInIntervalCO2++;
        if(timerCO2.elapsedInIntervalCO2 > currentIntervalDurationCO2 && timerCO2.isBreak8CO2){
            if (!ismuteCO2) {
                audioListCO2[3].muted = false;
                audioListCO2[3].play();
          }
          timerCO2.isBreak9CO2 = true;
          timerCO2.isBreak8CO2 = false;
          timerCO2.isFinishedCO2 = timerCO2.intervalsDoneCO2 === timerSettingsCO2.intervalCountCO2;
          if (!timerCO2.isFinishedCO2) {
            timerCO2.elapsedInIntervalCO2 = 1;
          }
          if (timerCO2.isFinishedCO2) {
            setTimerControlsDisabledStateCO2(false, true, true);
            setFormDisabledStateCO2(false);
            stopTimerTickCO2();
          } else {
            timerCO2.totalTimeElapsedCO2++;
          }
          updateInfoCO2();
        } 
        updateInfoCO2();
      }else if(timerCO2.elapsedInIntervalCO2 <= currentIntervalDurationCO2 && timerCO2.isBreak9CO2){
        timerCO2.elapsedInIntervalCO2++;
        if(timerCO2.elapsedInIntervalCO2 > currentIntervalDurationCO2 && timerCO2.isBreak9CO2){
          if(!ismuteCO2){
              audioListCO2[0].muted = false;
              audioListCO2[0].play();
          }
          document.getElementsByClassName('gap5CO2')[0].style.backgroundColor = '#ffffff';
          document.getElementsByClassName('gap5CO2')[1].style.backgroundColor = '#ffffff';
          document.getElementsByClassName('gap6CO2')[0].style.backgroundColor = '#49B79D';
          document.getElementsByClassName('gap6CO2')[1].style.backgroundColor = '#49B79D';
          timerCO2.isBreak10CO2 = true;
          timerCO2.isBreak9CO2 = false;
          timerCO2.intervalsDoneCO2++;
            document.getElementById("CO2Results").innerHTML += "<div class='NOfSteps'> <div>Round " + timerCO2.intervalsDoneCO2 + "</div><div>" + (timerCO2.elapsedInIntervalCO2 - 1) + " seconds</div></div>";
            timerRefCO2.value += (timerCO2.elapsedInIntervalCO2 - 1) + "|";
          timerCO2.isFinishedCO2 = timerCO2.intervalsDoneCO2 === timerSettingsCO2.intervalCountCO2;
          if (!timerCO2.isFinishedCO2) {
            timerCO2.elapsedInIntervalCO2 = 1;
          }
          if (timerCO2.isFinishedCO2) {
            setTimerControlsDisabledStateCO2(false, true, true);
            setFormDisabledStateCO2(false);
            stopTimerTickCO2();
          } else {
            timerCO2.totalTimeElapsedCO2++;
          }
          updateInfoCO2();
        } 
        updateInfoCO2();
      }else if(timerCO2.elapsedInIntervalCO2 <= currentIntervalDurationCO2 && timerCO2.isBreak10CO2){
        timerCO2.elapsedInIntervalCO2++;
        if(timerCO2.elapsedInIntervalCO2 > currentIntervalDurationCO2 && timerCO2.isBreak10CO2){
            if (!ismuteCO2) {
                audioListCO2[3].muted = false;
                audioListCO2[3].play();
          }
          timerCO2.isBreak11CO2 = true;
          timerCO2.isBreak10CO2 = false;
          timerCO2.isFinishedCO2 = timerCO2.intervalsDoneCO2 === timerSettingsCO2.intervalCountCO2;
          if (!timerCO2.isFinishedCO2) {
            timerCO2.elapsedInIntervalCO2 = 1;
          }
          if (timerCO2.isFinishedCO2) {
            setTimerControlsDisabledStateCO2(false, true, true);
            setFormDisabledStateCO2(false);
            stopTimerTickCO2();
          } else {
            timerCO2.totalTimeElapsedCO2++;
          }
          updateInfoCO2();
        } 
        updateInfoCO2();
      }else if(timerCO2.elapsedInIntervalCO2 <= currentIntervalDurationCO2 && timerCO2.isBreak11CO2){
        timerCO2.elapsedInIntervalCO2++;
        if(timerCO2.elapsedInIntervalCO2 > currentIntervalDurationCO2 && timerCO2.isBreak11CO2){
          if(!ismuteCO2){
              audioListCO2[0].muted = false;
              audioListCO2[0].play();
          }
          document.getElementsByClassName('gap6CO2')[0].style.backgroundColor = '#ffffff';
          document.getElementsByClassName('gap6CO2')[1].style.backgroundColor = '#ffffff';
          document.getElementsByClassName('gap7CO2')[0].style.backgroundColor = '#49B79D';
          document.getElementsByClassName('gap7CO2')[1].style.backgroundColor = '#49B79D';
          timerCO2.isBreak12CO2 = true;
          timerCO2.isBreak11CO2 = false;
          timerCO2.intervalsDoneCO2++;
            document.getElementById("CO2Results").innerHTML += "<div class='NOfSteps'> <div>Round " + timerCO2.intervalsDoneCO2 + "</div><div>" + (timerCO2.elapsedInIntervalCO2 - 1) + " seconds</div></div>";
            timerRefCO2.value += (timerCO2.elapsedInIntervalCO2 - 1) + "|";
          timerCO2.isFinishedCO2 = timerCO2.intervalsDoneCO2 === timerSettingsCO2.intervalCountCO2;
          if (!timerCO2.isFinishedCO2) {
            timerCO2.elapsedInIntervalCO2 = 1;
          }
          if (timerCO2.isFinishedCO2) {
            setTimerControlsDisabledStateCO2(false, true, true);
            setFormDisabledStateCO2(false);
            stopTimerTickCO2();
          } else {
            timerCO2.totalTimeElapsedCO2++;
          }
          updateInfoCO2();
        } 
        updateInfoCO2();
      }else if(timerCO2.elapsedInIntervalCO2 <= currentIntervalDurationCO2 && timerCO2.isBreak12CO2){
        timerCO2.elapsedInIntervalCO2++;
        if(timerCO2.elapsedInIntervalCO2 > currentIntervalDurationCO2 && timerCO2.isBreak12CO2){
            if (!ismuteCO2) {
                audioListCO2[3].muted = false;
                audioListCO2[3].play();
          }
          timerCO2.isBreak13CO2 = true;
          timerCO2.isBreak12CO2 = false;
          timerCO2.isFinishedCO2 = timerCO2.intervalsDoneCO2 === timerSettingsCO2.intervalCountCO2;
          if (!timerCO2.isFinishedCO2) {
            timerCO2.elapsedInIntervalCO2 = 1;
          }
          if (timerCO2.isFinishedCO2) {
            setTimerControlsDisabledStateCO2(false, true, true);
            setFormDisabledStateCO2(false);
            stopTimerTickCO2();
          } else {
            timerCO2.totalTimeElapsedCO2++;
          }
          updateInfoCO2();
        } 
        updateInfoCO2();
      }else if(timerCO2.elapsedInIntervalCO2 <= currentIntervalDurationCO2 && timerCO2.isBreak13CO2){
        timerCO2.elapsedInIntervalCO2++;
        if(timerCO2.elapsedInIntervalCO2 > currentIntervalDurationCO2 && timerCO2.isBreak13CO2){
          if(!ismuteCO2){
              audioListCO2[0].muted = false;
              audioListCO2[0].play();
          }
          document.getElementsByClassName('gap7CO2')[0].style.backgroundColor = '#ffffff';
          document.getElementsByClassName('gap7CO2')[1].style.backgroundColor = '#ffffff';
          document.getElementsByClassName('gap8CO2')[0].style.backgroundColor = '#49B79D';
          document.getElementsByClassName('gap8CO2')[1].style.backgroundColor = '#49B79D';
          timerCO2.isBreak14CO2 = true;
          timerCO2.isBreak13CO2 = false;
          timerCO2.intervalsDoneCO2++;
            document.getElementById("CO2Results").innerHTML += "<div class='NOfSteps'> <div>Round " + timerCO2.intervalsDoneCO2 + "</div><div>" + (timerCO2.elapsedInIntervalCO2 - 1) + " seconds</div></div>";
            timerRefCO2.value += (timerCO2.elapsedInIntervalCO2 - 1) + "|";
          timerCO2.isFinishedCO2 = timerCO2.intervalsDoneCO2 === timerSettingsCO2.intervalCountCO2;
          if (!timerCO2.isFinishedCO2) {
            timerCO2.elapsedInIntervalCO2 = 1;
          }
          if (timerCO2.isFinishedCO2) {
            setTimerControlsDisabledStateCO2(false, true, true);
            setFormDisabledStateCO2(false);
            stopTimerTickCO2();
          } else {
            timerCO2.totalTimeElapsedCO2++;
          }
          updateInfoCO2();
        } 
        updateInfoCO2();
      }else if(timerCO2.elapsedInIntervalCO2 <= currentIntervalDurationCO2 && timerCO2.isBreak14CO2){
        timerCO2.elapsedInIntervalCO2++;
        if(timerCO2.elapsedInIntervalCO2 > currentIntervalDurationCO2 && timerCO2.isBreak14CO2){
            if (!ismuteCO2) {
                audioListCO2[3].muted = false;
                audioListCO2[3].play();
          }
          timerCO2.isBreak15CO2 = true;
          timerCO2.isBreak14CO2 = false;
          timerCO2.isFinishedCO2 = timerCO2.intervalsDoneCO2 === timerSettingsCO2.intervalCountCO2;
          if (!timerCO2.isFinishedCO2) {
            timerCO2.elapsedInIntervalCO2 = 1;
          }
          if (timerCO2.isFinishedCO2) {
            setTimerControlsDisabledStateCO2(false, true, true);
            setFormDisabledStateCO2(false);
            stopTimerTickCO2();
          } else {
            timerCO2.totalTimeElapsedCO2++;
          }
          updateInfoCO2();
        } 
        updateInfoCO2();
      }else if(timerCO2.elapsedInIntervalCO2 <= currentIntervalDurationCO2 && timerCO2.isBreak15CO2){
      timerCO2.elapsedInIntervalCO2++;
      if(timerCO2.elapsedInIntervalCO2 > currentIntervalDurationCO2 && timerCO2.isBreak15CO2){
        document.getElementsByClassName('gap8CO2')[0].style.backgroundColor = '#ffffff';
        document.getElementsByClassName('gap8CO2')[1].style.backgroundColor = '#ffffff';
        document.getElementsByClassName('gap1CO2')[0].style.backgroundColor = '#49B79D';
        document.getElementsByClassName('gap1CO2')[1].style.backgroundColor = '#49B79D';
        timerCO2.isFinishedCO2 = true;
        timerCO2.isBreak15CO2 = false;
        timerCO2.intervalsDoneCO2++;
          document.getElementById("CO2Results").innerHTML += "<div class='NOfSteps'> <div>Round " + timerCO2.intervalsDoneCO2 + "</div><div>" + (timerCO2.elapsedInIntervalCO2 - 1) + " seconds</div></div>";
          timerRefCO2.value += (timerCO2.elapsedInIntervalCO2 - 1) + "|";
        timerCO2.isFinishedCO2 = timerCO2.intervalsDoneCO2 === timerSettingsCO2.intervalCountCO2;
        timerCO2.elapsedInIntervalCO2 = 1;
        pauseTimerCO2();
          if (!ismuteCO2) {
              audioListCO2[2].muted = false;
              audioListCO2[2].play();
        }
        setTimerControlsDisabledStateCO2(true, false, false);
        timerControlsButtonsCO2.start.style.color = "rgb(177, 177, 177)";
        setFormDisabledStateCO2(false);
        updateInfoCO2();
      } 
      updateInfoCO2();
    }
  }

  function updateInfoCO2() {
    statusPanelCO2.timeOverviewMessageCO2.style.display = timerCO2.isFinishedCO2 ? 'block' : null;
    statusPanelCO2.elapsedInIntervalBoxCO2.style.display = timerCO2.isFinishedCO2 || timerCO2.isBreakCO2 || timerCO2.isBreak2CO2 || timerCO2.isBreak3CO2 || timerCO2.isBreak4CO2 || timerCO2.isBreak5CO2 || timerCO2.isBreak6CO2 || timerCO2.isBreak7CO2 || timerCO2.isBreak8CO2 || timerCO2.isBreak9CO2 || timerCO2.isBreak10CO2 || timerCO2.isBreak11CO2 || timerCO2.isBreak12CO2 || timerCO2.isBreak13CO2 || timerCO2.isBreak14CO2 || timerCO2.isBreak15CO2 ? 'none' : null;
    statusPanelCO2.elapsedInBreakIntervalBoxCO2.style.display = !timerCO2.isFinishedCO2 && timerCO2.isBreakCO2 ? 'block' : null;
    statusPanelCO2.elapsedInBreakIntervalBox2CO2.style.display = !timerCO2.isFinishedCO2 && timerCO2.isBreak2CO2 ? 'block' : null;
    statusPanelCO2.elapsedInBreakIntervalBox3CO2.style.display = !timerCO2.isFinishedCO2 && timerCO2.isBreak3CO2 ? 'block' : null;
    statusPanelCO2.elapsedInBreakIntervalBox4CO2.style.display = !timerCO2.isFinishedCO2 && timerCO2.isBreak4CO2 ? 'block' : null;
    statusPanelCO2.elapsedInBreakIntervalBox5CO2.style.display = !timerCO2.isFinishedCO2 && timerCO2.isBreak5CO2 ? 'block' : null;
    statusPanelCO2.elapsedInBreakIntervalBox6CO2.style.display = !timerCO2.isFinishedCO2 && timerCO2.isBreak6CO2 ? 'block' : null;
    statusPanelCO2.elapsedInBreakIntervalBox7CO2.style.display = !timerCO2.isFinishedCO2 && timerCO2.isBreak7CO2 ? 'block' : null;
    statusPanelCO2.elapsedInBreakIntervalBox8CO2.style.display = !timerCO2.isFinishedCO2 && timerCO2.isBreak8CO2 ? 'block' : null;
    statusPanelCO2.elapsedInBreakIntervalBox9CO2.style.display = !timerCO2.isFinishedCO2 && timerCO2.isBreak9CO2 ? 'block' : null;
    statusPanelCO2.elapsedInBreakIntervalBox10CO2.style.display = !timerCO2.isFinishedCO2 && timerCO2.isBreak10CO2 ? 'block' : null;
    statusPanelCO2.elapsedInBreakIntervalBox11CO2.style.display = !timerCO2.isFinishedCO2 && timerCO2.isBreak11CO2 ? 'block' : null;
    statusPanelCO2.elapsedInBreakIntervalBox12CO2.style.display = !timerCO2.isFinishedCO2 && timerCO2.isBreak12CO2 ? 'block' : null;
    statusPanelCO2.elapsedInBreakIntervalBox13CO2.style.display = !timerCO2.isFinishedCO2 && timerCO2.isBreak13CO2 ? 'block' : null;
    statusPanelCO2.elapsedInBreakIntervalBox14CO2.style.display = !timerCO2.isFinishedCO2 && timerCO2.isBreak14CO2 ? 'block' : null;
    statusPanelCO2.elapsedInBreakIntervalBox15CO2.style.display = !timerCO2.isFinishedCO2 && timerCO2.isBreak15CO2 ? 'block' : null;
    
    if (timerCO2.isBreakCO2) {
      statusPanelCO2.elapsedInBreakIntervalCO2.textContent = timerCO2.elapsedInIntervalCO2;
    } else if (timerCO2.isBreak2CO2){
      statusPanelCO2.elapsedInBreakInterval2CO2.textContent = timerCO2.elapsedInIntervalCO2;
    }else if (timerCO2.isBreak3CO2){
      statusPanelCO2.elapsedInBreakInterval3CO2.textContent = timerCO2.elapsedInIntervalCO2;
    }else if (timerCO2.isBreak4CO2){
      statusPanelCO2.elapsedInBreakInterval4CO2.textContent = timerCO2.elapsedInIntervalCO2;
    }else if (timerCO2.isBreak5CO2){
      statusPanelCO2.elapsedInBreakInterval5CO2.textContent = timerCO2.elapsedInIntervalCO2;
    }else if (timerCO2.isBreak6CO2){
      statusPanelCO2.elapsedInBreakInterval6CO2.textContent = timerCO2.elapsedInIntervalCO2;
    }else if (timerCO2.isBreak7CO2){
      statusPanelCO2.elapsedInBreakInterval7CO2.textContent = timerCO2.elapsedInIntervalCO2;
    }else if (timerCO2.isBreak8CO2){
      statusPanelCO2.elapsedInBreakInterval8CO2.textContent = timerCO2.elapsedInIntervalCO2;
    }else if (timerCO2.isBreak9CO2){
      statusPanelCO2.elapsedInBreakInterval9CO2.textContent = timerCO2.elapsedInIntervalCO2;
    }else if (timerCO2.isBreak10CO2){
      statusPanelCO2.elapsedInBreakInterval10CO2.textContent = timerCO2.elapsedInIntervalCO2;
    }else if (timerCO2.isBreak11CO2){
      statusPanelCO2.elapsedInBreakInterval11CO2.textContent = timerCO2.elapsedInIntervalCO2;
    }else if (timerCO2.isBreak12CO2){
      statusPanelCO2.elapsedInBreakInterval12CO2.textContent = timerCO2.elapsedInIntervalCO2;
    }else if (timerCO2.isBreak13CO2){
      statusPanelCO2.elapsedInBreakInterval13CO2.textContent = timerCO2.elapsedInIntervalCO2;
    }else if (timerCO2.isBreak14CO2){
      statusPanelCO2.elapsedInBreakInterval14CO2.textContent = timerCO2.elapsedInIntervalCO2;
    }else if (timerCO2.isBreak15CO2){
      statusPanelCO2.elapsedInBreakInterval15CO2.textContent = timerCO2.elapsedInIntervalCO2;
    }else {
      statusPanelCO2.elapsedInIntervalCO2.textContent = timerCO2.elapsedInIntervalCO2;
    }
    statusPanelCO2.intervalsDoneCO2.value = timerCO2.intervalsDoneCO2;
  }
//---------------------------------------------------//