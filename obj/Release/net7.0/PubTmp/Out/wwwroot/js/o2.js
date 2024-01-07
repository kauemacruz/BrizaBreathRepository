/*O2 JS*/
const O2modal = document.getElementById("O2modal");
const O2closeModal = document.getElementById("O2closeModal");
const O2BTN = document.getElementById("O2BTN");

function O2openmodal() {
    O2modal.style.display = "block";
    audioObjects.breathedeeply.load();
    audioObjects.normalbreath.load();
    audioObjects.hold.load();
}
// Function to close the modal
function O2close() {
    O2modal.style.display = "none";
    document.getElementById("O2Results").innerHTML = "";
    timerRefO2.value = "|";
    clearInterval(intO2);
    document.getElementById('O2Settings').disabled = false;
    document.getElementById('O2Settings').style.color = '#49B79D';
    if (!audioPlayerBRT.muted) {
        audioPlayerBRT.pause();
    }
    timerControlsButtonsO2.pauseO2.style.display = 'none';
    timerControlsButtonsO2.startO2.style.display = 'inline';
    setFormDisabledStateO2(false);
    setTimerControlsDisabledStateO2(false, true, true);
    document.getElementById('stopBtnO2').style.display = 'inline';
    timerControlsButtonsO2.stopO2.style.color = "rgb(177, 177, 177)";
    timerControlsButtonsO2.startO2.style.color = "#0661AA";
    stopTimerTickO2();
    resetTimerO2();
    timerO2.isFinishedO2 = true;
    document.getElementById('O2Save').disabled = true;
    document.getElementById('O2Save').style.color = 'rgb(177, 177, 177)';
    document.getElementById('O2ResultSaved').innerHTML = "";
    document.getElementById("O2Results").innerHTML = "";
    timerRefO2.value = "|";
    clearInterval(intCO2);
    timerControlsButtonsCO2.pauseCO2.style.display = 'none';
    timerControlsButtonsCO2.startCO2.style.display = 'inline';
    setFormDisabledStateCO2(false);
    setTimerControlsDisabledStateCO2(false, true, true);
    document.getElementById('stopBtnCO2').style.display = 'inline';
    timerControlsButtonsCO2.stopCO2.style.color = "rgb(177, 177, 177)";
    timerControlsButtonsCO2.startCO2.style.color = "#0661AA";
    stopTimerTickCO2();
    resetTimerCO2();
    timerCO2.isFinishedCO2 = true;
    document.getElementById('CO2Save').disabled = true;
    document.getElementById('CO2Save').style.color = 'rgb(177, 177, 177)';
    document.getElementById('CO2ResultSaved').innerHTML = "";
    document.getElementById("CO2Results").innerHTML = "";
}
// Event listener for closing the modal
O2closeModal.addEventListener("click", O2close);
O2BTN.onclick = function () {
    O2openmodal();
}
$(function () {
    $('#O2Form').on('submit', function (e) {
        e.preventDefault(); // Prevent the default form submission

        var formData = new FormData(this); // Get the form data

        $.ajax({
            url: "/",
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function (result) {
                $('#O2ResultSaved').html(result); // Update the result section with the server response
            }
        });
        document.getElementById("O2Results").innerHTML = "";
        timerRefO2.value = "|";
        clearInterval(intO2);
        document.getElementById('O2Settings').disabled = false;
        document.getElementById('O2Settings').style.color = '#49B79D';
        if (!audioPlayerBRT.muted) {
            audioPlayerBRT.pause();
        }
        timerControlsButtonsO2.pauseO2.style.display = 'none';
        timerControlsButtonsO2.startO2.style.display = 'inline';
        setFormDisabledStateO2(false);
        setTimerControlsDisabledStateO2(false, true, true);
        document.getElementById('stopBtnO2').style.display = 'inline';
        timerControlsButtonsO2.stopO2.style.color = "rgb(177, 177, 177)";
        timerControlsButtonsO2.startO2.style.color = "#0661AA";
        document.getElementById('O2Save').disabled = true;
        document.getElementById('O2Save').style.color = 'rgb(177, 177, 177)';
        stopTimerTickO2();
        resetTimerO2();
        timerO2.isFinishedO2 = true;
        stopTimerTickO2();
    });
});

let
  formSettingsFieldsO2,
  timerControlsButtonsO2,
  statusPanelO2,
  timerO2,
  timerSettingsO2;

function setTimerSettingsO2(
  intervalCountO2 = timerSettingsO2.intervalCountO2,
  intervalDurationO2 = timerSettingsO2.intervalDurationO2,
  enableBreakO2 = timerSettingsO2.enableBreakO2,
  breakDurationO2 = timerSettingsO2.breakDurationO2,
  enableBreak2O2 = timerSettingsO2.enableBreak2O2,
  breakDuration2O2 = timerSettingsO2.breakDuration2O2,
  enableBreak3O2 = timerSettingsO2.enableBreak3O2,
  breakDuration3O2 = timerSettingsO2.breakDuration3O2,
  enableBreak4O2 = timerSettingsO2.enableBreakO2,
  breakDuration4O2 = timerSettingsO2.breakDurationO2,
  enableBreak5O2 = timerSettingsO2.enableBreak2O2,
  breakDuration5O2 = timerSettingsO2.breakDuration2O2,
  enableBreak6O2 = timerSettingsO2.enableBreak3O2,
  breakDuration6O2 = timerSettingsO2.breakDuration3O2,
  enableBreak7O2 = timerSettingsO2.enableBreakO2,
  breakDuration7O2 = timerSettingsO2.breakDurationO2,
  enableBreak8O2 = timerSettingsO2.enableBreak2O2,
  breakDuration8O2 = timerSettingsO2.breakDuration2O2,
  enableBreak9O2 = timerSettingsO2.enableBreak3O2,
  breakDuration9O2 = timerSettingsO2.breakDuration3O2,
  enableBreak10O2 = timerSettingsO2.enableBreakO2,
  breakDuration10O2 = timerSettingsO2.breakDurationO2,
  enableBreak11O2 = timerSettingsO2.enableBreak2O2,
  breakDuration11O2 = timerSettingsO2.breakDuration2O2,
  enableBreak12O2 = timerSettingsO2.enableBreak3O2,
  breakDuration12O2 = timerSettingsO2.breakDuration3O2,
  enableBreak13O2 = timerSettingsO2.enableBreakO2,
  breakDuration13O2 = timerSettingsO2.breakDurationO2,
  enableBreak14O2 = timerSettingsO2.enableBreak2O2,
  breakDuration14O2 = timerSettingsO2.breakDuration2O2,
  enableBreak15O2 = timerSettingsO2.enableBreak3O2,
  breakDuration15O2 = timerSettingsO2.breakDuration3O2
) {
  timerSettingsO2 = {
    intervalCountO2,
    intervalDurationO2,
    enableBreakO2,
    breakDurationO2,
    enableBreak2O2,
    breakDuration2O2,
    enableBreak3O2,
    breakDuration3O2,
    enableBreak4O2,
    breakDuration4O2,
    enableBreak5O2,
    breakDuration5O2,
    enableBreak6O2,
    breakDuration6O2,
    enableBreak7O2,
    breakDuration7O2,
    enableBreak8O2,
    breakDuration8O2,
    enableBreak9O2,
    breakDuration9O2,
    enableBreak10O2,
    breakDuration10O2,
    enableBreak11O2,
    breakDuration11O2,
    enableBreak12O2,
    breakDuration12O2,
    enableBreak13O2,
    breakDuration13O2,
    enableBreak14O2,
    breakDuration14O2,
    enableBreak15O2,
    breakDuration15O2
  };
}

function resetTimerO2() {
  timerO2 = {
    totalTimeElapsedO2: 0,
    elapsedInIntervalO2: 0,
    intervalsDoneO2: 0,
    isBreak0O2: true,
    isBreakO2: false,
    isBreak2O2: false,
    isBreak3O2: false,
    isBreak4O2: false,
    isBreak5O2: false,
    isBreak6O2: false,
    isBreak7O2: false,
    isBreak8O2: false,
    isBreak9O2: false,
    isBreak10O2: false,
    isBreak11O2: false,
    isBreak12O2: false,
    isBreak13O2: false,
    isBreak14O2: false,
    isBreak15O2: false,
    isFinishedO2: false
  };
  updateInfoO2();
}

let [secondsO2, minutesO2, hoursO2] = [0, 0, 0];
let timerRefO2 = document.getElementById('timerDisplayO2');
let intO2 = null;
document.getElementById('stopBtnO2').disabled = true;
document.getElementById('stopBtnO2').style.color = 'rgb(177, 177, 177)';
document.getElementById('O2Save').disabled = true;
document.getElementById('O2Save').style.color = 'rgb(177, 177, 177)';

var audioO2 = document.getElementById("audioO2"),
    muteO2 = document.getElementById("muteO2"),
    ismuteO2 = false;

audioPlayerBRT.loop = true;

var audioSongO2 = document.getElementById("songO2"),
    muteSongO2 = document.getElementById("songMuteO2");

var breatheO2 = 120;
var holdO2 = 30;
var breathe1O2 = 120;
var hold1O2 = 45;
var breathe2O2 = 120;
var hold2O2 = 60;
var breathe3O2 = 120;
var hold3O2 = 75;
var breathe4O2 = 120;
var hold4O2 = 90;
var breathe5O2 = 120;
var hold5O2 = 105;
var breathe6O2 = 120;
var hold6O2 = 120;
var breathe7O2 = 120;
var hold7O2 = 135;

setTimerSettingsO2(8, breatheO2, true, holdO2, true, breathe1O2, true, hold1O2, true, breathe2O2, true, hold2O2, true, breathe3O2, true, hold3O2, true, breathe4O2, true, hold4O2, true, breathe5O2, true, hold5O2, true, breathe6O2, true, hold6O2, true, breathe7O2, true, hold7O2);
initializeTimerControlsO2();
initializeStatusPanelO2();
initializeTimerSettingsFormO2();
resetTimerO2();

var isLevel1O2 = true,
    isLevel2O2 = false,
    isLevel3O2 = false,
    isLevel4O2 = false,
    isLevel5O2 = false,
    isLevel6O2 = false,
    isLevel7O2 = false,
    isLevel8O2 = false;

var minusBtnO2 = document.getElementById("minusO2"),
    plusBtnO2 = document.getElementById("plusO2"),
    numberO2 = 30, /// numberO2 value
    minO2 = 30, /// minO2 numberO2
    maxO2 = 135;

minusBtnO2.onclick = function(){
  if (numberO2>minO2){
    numberO2 = numberO2-15;
    formSettingsFieldsO2.breakDurationO2.value = numberO2;
    formSettingsFieldsO2.breakDuration3O2.value = parseInt(formSettingsFieldsO2.breakDurationO2.value)+15;
    formSettingsFieldsO2.breakDuration5O2.value = parseInt(formSettingsFieldsO2.breakDuration3O2.value) + 15;
    formSettingsFieldsO2.breakDuration7O2.value = parseInt(formSettingsFieldsO2.breakDuration5O2.value) + 15;
    formSettingsFieldsO2.breakDuration9O2.value = parseInt(formSettingsFieldsO2.breakDuration7O2.value) + 15;
    formSettingsFieldsO2.breakDuration11O2.value = parseInt(formSettingsFieldsO2.breakDuration9O2.value) + 15;
    formSettingsFieldsO2.breakDuration13O2.value = parseInt(formSettingsFieldsO2.breakDuration11O2.value) + 15;
    formSettingsFieldsO2.breakDuration15O2.value = parseInt(formSettingsFieldsO2.breakDuration13O2.value) + 15;
    setTimerSettingsO2(8, 120, true, formSettingsFieldsO2.breakDurationO2.value, true, 120, true, formSettingsFieldsO2.breakDuration3O2.value, true, 120, true, formSettingsFieldsO2.breakDuration5O2.value, true, 120, true, formSettingsFieldsO2.breakDuration7O2.value, true, 120, true, formSettingsFieldsO2.breakDuration9O2.value, true, 120, true, formSettingsFieldsO2.breakDuration11O2.value, true, 120, true, formSettingsFieldsO2.breakDuration13O2.value, true, 120, true, formSettingsFieldsO2.breakDuration15O2.value);
    if(isLevel2O2){
        isLevel2O2 = false;
        isLevel1O2 = true;
        statusPanelO2.levelO2.textContent = '1';
        statusPanelO2.levelHold1O2.textContent = '0:30';
        statusPanelO2.levelHold2O2.textContent = '0:45';
        statusPanelO2.levelHold3O2.textContent = '1:00';
        statusPanelO2.levelHold4O2.textContent = '1:15';
        statusPanelO2.levelHold5O2.textContent = '1:30';
        statusPanelO2.levelHold6O2.textContent = '1:45';
        statusPanelO2.levelHold7O2.textContent = '2:00';
        statusPanelO2.levelHold8O2.textContent = '2:15';
    }else if(isLevel3O2){
        isLevel3O2 = false;
        isLevel2O2 = true;
        statusPanelO2.levelO2.textContent = '2';
        statusPanelO2.levelHold1O2.textContent = '0:45';
        statusPanelO2.levelHold2O2.textContent = '1:00';
        statusPanelO2.levelHold3O2.textContent = '1:15';
        statusPanelO2.levelHold4O2.textContent = '1:30';
        statusPanelO2.levelHold5O2.textContent = '1:45';
        statusPanelO2.levelHold6O2.textContent = '2:00';
        statusPanelO2.levelHold7O2.textContent = '2:15';
        statusPanelO2.levelHold8O2.textContent = '2:30';
    }else if(isLevel4O2){
        isLevel4O2 = false;
        isLevel3O2 = true;
        statusPanelO2.levelO2.textContent = '3';
        statusPanelO2.levelHold1O2.textContent = '1:00';
        statusPanelO2.levelHold2O2.textContent = '1:15';
        statusPanelO2.levelHold3O2.textContent = '1:30';
        statusPanelO2.levelHold4O2.textContent = '1:45';
        statusPanelO2.levelHold5O2.textContent = '2:00';
        statusPanelO2.levelHold6O2.textContent = '2:15';
        statusPanelO2.levelHold7O2.textContent = '2:30';
        statusPanelO2.levelHold8O2.textContent = '2:45';
    }else if(isLevel5O2){
        isLevel5O2 = false;
        isLevel4O2 = true;
        statusPanelO2.levelO2.textContent = '4';
        statusPanelO2.levelHold1O2.textContent = '1:15';
        statusPanelO2.levelHold2O2.textContent = '1:30';
        statusPanelO2.levelHold3O2.textContent = '1:45';
        statusPanelO2.levelHold4O2.textContent = '2:00';
        statusPanelO2.levelHold5O2.textContent = '2:15';
        statusPanelO2.levelHold6O2.textContent = '2:30';
        statusPanelO2.levelHold7O2.textContent = '2:45';
        statusPanelO2.levelHold8O2.textContent = '3:00';
    }else if(isLevel6O2){
        isLevel6O2 = false;
        isLevel5O2 = true;
        statusPanelO2.levelO2.textContent = '5';
        statusPanelO2.levelHold1O2.textContent = '1:30';
        statusPanelO2.levelHold2O2.textContent = '1:45';
        statusPanelO2.levelHold3O2.textContent = '2:00';
        statusPanelO2.levelHold4O2.textContent = '2:15';
        statusPanelO2.levelHold5O2.textContent = '2:30';
        statusPanelO2.levelHold6O2.textContent = '2:45';
        statusPanelO2.levelHold7O2.textContent = '3:00';
        statusPanelO2.levelHold8O2.textContent = '3:15';
    }else if(isLevel7O2){
        isLevel7O2 = false;
        isLevel6O2 = true;
        statusPanelO2.levelO2.textContent = '6';
        statusPanelO2.levelHold1O2.textContent = '1:45';
        statusPanelO2.levelHold2O2.textContent = '2:00';
        statusPanelO2.levelHold3O2.textContent = '2:15';
        statusPanelO2.levelHold4O2.textContent = '2:30';
        statusPanelO2.levelHold5O2.textContent = '2:45';
        statusPanelO2.levelHold6O2.textContent = '3:00';
        statusPanelO2.levelHold7O2.textContent = '3:15';
        statusPanelO2.levelHold8O2.textContent = '3:30';
    }else if(isLevel8O2){
        isLevel8O2 = false;
        isLevel7O2 = true;
        statusPanelO2.levelO2.textContent = '7';
        statusPanelO2.levelHold1O2.textContent = '2:00';
        statusPanelO2.levelHold2O2.textContent = '2:15';
        statusPanelO2.levelHold3O2.textContent = '2:30';
        statusPanelO2.levelHold4O2.textContent = '2:45';
        statusPanelO2.levelHold5O2.textContent = '3:00';
        statusPanelO2.levelHold6O2.textContent = '3:15';
        statusPanelO2.levelHold7O2.textContent = '3:30';
        statusPanelO2.levelHold8O2.textContent = '3:45';
    }
}
}

plusBtnO2.onclick = function(){
    if(numberO2<maxO2){
        numberO2 = numberO2+15;
    formSettingsFieldsO2.breakDurationO2.value = numberO2;
    formSettingsFieldsO2.breakDuration3O2.value = parseInt(formSettingsFieldsO2.breakDurationO2.value) + 15;
    formSettingsFieldsO2.breakDuration5O2.value = parseInt(formSettingsFieldsO2.breakDuration3O2.value) + 15;
    formSettingsFieldsO2.breakDuration7O2.value = parseInt(formSettingsFieldsO2.breakDuration5O2.value) + 15;
    formSettingsFieldsO2.breakDuration9O2.value = parseInt(formSettingsFieldsO2.breakDuration7O2.value) + 15;
    formSettingsFieldsO2.breakDuration11O2.value = parseInt(formSettingsFieldsO2.breakDuration9O2.value) + 15;
    formSettingsFieldsO2.breakDuration13O2.value = parseInt(formSettingsFieldsO2.breakDuration11O2.value) + 15;
    formSettingsFieldsO2.breakDuration15O2.value = parseInt(formSettingsFieldsO2.breakDuration13O2.value) + 15;
    setTimerSettingsO2(8, 120, true, formSettingsFieldsO2.breakDurationO2.value, true, 120, true, formSettingsFieldsO2.breakDuration3O2.value, true, 120, true, formSettingsFieldsO2.breakDuration5O2.value, true, 120, true, formSettingsFieldsO2.breakDuration7O2.value, true, 120, true, formSettingsFieldsO2.breakDuration9O2.value, true, 120, true, formSettingsFieldsO2.breakDuration11O2.value, true, 120, true, formSettingsFieldsO2.breakDuration13O2.value, true, 120, true, formSettingsFieldsO2.breakDuration15O2.value);
        if(isLevel1O2){
            isLevel1O2 = false;
            isLevel2O2 = true;
            statusPanelO2.levelO2.textContent = '2';
            statusPanelO2.levelHold1O2.textContent = '0:45';
            statusPanelO2.levelHold2O2.textContent = '1:00';
            statusPanelO2.levelHold3O2.textContent = '1:15';
            statusPanelO2.levelHold4O2.textContent = '1:30';
            statusPanelO2.levelHold5O2.textContent = '1:45';
            statusPanelO2.levelHold6O2.textContent = '2:00';
            statusPanelO2.levelHold7O2.textContent = '2:15';
            statusPanelO2.levelHold8O2.textContent = '2:30';
        }else if(isLevel2O2){
            isLevel2O2 = false;
            isLevel3O2 = true;
            statusPanelO2.levelO2.textContent = '3';
            statusPanelO2.levelHold1O2.textContent = '1:00';
            statusPanelO2.levelHold2O2.textContent = '1:15';
            statusPanelO2.levelHold3O2.textContent = '1:30';
            statusPanelO2.levelHold4O2.textContent = '1:45';
            statusPanelO2.levelHold5O2.textContent = '2:00';
            statusPanelO2.levelHold6O2.textContent = '2:15';
            statusPanelO2.levelHold7O2.textContent = '2:30';
            statusPanelO2.levelHold8O2.textContent = '2:45';
        }else if(isLevel3O2){
            isLevel3O2 = false;
            isLevel4O2 = true;
            statusPanelO2.levelO2.textContent = '4';
            statusPanelO2.levelHold1O2.textContent = '1:15';
            statusPanelO2.levelHold2O2.textContent = '1:30';
            statusPanelO2.levelHold3O2.textContent = '1:45';
            statusPanelO2.levelHold4O2.textContent = '2:00';
            statusPanelO2.levelHold5O2.textContent = '2:15';
            statusPanelO2.levelHold6O2.textContent = '2:30';
            statusPanelO2.levelHold7O2.textContent = '2:45';
            statusPanelO2.levelHold8O2.textContent = '3:00';
        }else if(isLevel4O2){
            isLevel4O2 = false;
            isLevel5O2 = true;
            statusPanelO2.levelO2.textContent = '5';
            statusPanelO2.levelHold1O2.textContent = '1:30';
            statusPanelO2.levelHold2O2.textContent = '1:45';
            statusPanelO2.levelHold3O2.textContent = '2:00';
            statusPanelO2.levelHold4O2.textContent = '2:15';
            statusPanelO2.levelHold5O2.textContent = '2:30';
            statusPanelO2.levelHold6O2.textContent = '2:45';
            statusPanelO2.levelHold7O2.textContent = '3:00';
            statusPanelO2.levelHold8O2.textContent = '3:15';
        }else if(isLevel5O2){
            isLevel5O2 = false;
            isLevel6O2 = true;
            statusPanelO2.levelO2.textContent = '6';
            statusPanelO2.levelHold1O2.textContent = '1:45';
            statusPanelO2.levelHold2O2.textContent = '2:00';
            statusPanelO2.levelHold3O2.textContent = '2:15';
            statusPanelO2.levelHold4O2.textContent = '2:30';
            statusPanelO2.levelHold5O2.textContent = '2:45';
            statusPanelO2.levelHold6O2.textContent = '3:00';
            statusPanelO2.levelHold7O2.textContent = '3:15';
            statusPanelO2.levelHold8O2.textContent = '3:30';
        }else if(isLevel6O2){
            isLevel6O2 = false;
            isLevel7O2 = true;
            statusPanelO2.levelO2.textContent = '7';
            statusPanelO2.levelHold1O2.textContent = '2:00';
            statusPanelO2.levelHold2O2.textContent = '2:15';
            statusPanelO2.levelHold3O2.textContent = '2:30';
            statusPanelO2.levelHold4O2.textContent = '2:45';
            statusPanelO2.levelHold5O2.textContent = '3:00';
            statusPanelO2.levelHold6O2.textContent = '3:15';
            statusPanelO2.levelHold7O2.textContent = '3:30';
            statusPanelO2.levelHold8O2.textContent = '3:45';
        }else if(isLevel7O2){
            isLevel7O2 = false;
            isLevel8O2 = true;
            statusPanelO2.levelO2.textContent = '8';
            statusPanelO2.levelHold1O2.textContent = '2:15';
            statusPanelO2.levelHold2O2.textContent = '2:30';
            statusPanelO2.levelHold3O2.textContent = '2:45';
            statusPanelO2.levelHold4O2.textContent = '3:00';
            statusPanelO2.levelHold5O2.textContent = '3:15';
            statusPanelO2.levelHold6O2.textContent = '3:30';
            statusPanelO2.levelHold7O2.textContent = '3:45';
            statusPanelO2.levelHold8O2.textContent = '4:00';
        }
    }    
}
 
function initializeTimerSettingsFormO2() {
  const oneDayInSecondsO2 = 60 * 60 * 24;
  let lastUserSetEnableBreakO2 = timerSettingsO2.enableBreakO2;
  let lastUserSetEnableBreak2O2 = timerSettingsO2.enableBreak2O2;
  let lastUserSetEnableBreak3O2 = timerSettingsO2.enableBreak3O2;
  let lastUserSetEnableBreak4O2 = timerSettingsO2.enableBreak4O2;
  let lastUserSetEnableBreak5O2 = timerSettingsO2.enableBreak5O2;
  let lastUserSetEnableBreak6O2 = timerSettingsO2.enableBreak6O2;
  let lastUserSetEnableBreak7O2 = timerSettingsO2.enableBreak7O2;
  let lastUserSetEnableBreak8O2 = timerSettingsO2.enableBreak8O2;
  let lastUserSetEnableBreak9O2 = timerSettingsO2.enableBreak9O2;
  let lastUserSetEnableBreak10O2 = timerSettingsO2.enableBreak10O2;
  let lastUserSetEnableBreak11O2 = timerSettingsO2.enableBreak11O2;
  let lastUserSetEnableBreak12O2 = timerSettingsO2.enableBreak12O2;
  let lastUserSetEnableBreak13O2 = timerSettingsO2.enableBreak13O2;
  let lastUserSetEnableBreak14O2 = timerSettingsO2.enableBreak14O2;
  let lastUserSetEnableBreak15O2 = timerSettingsO2.enableBreak15O2;

  formSettingsFieldsO2 = {
    intervalCountO2: document.getElementById('intervalCountInputO2'),
    intervalDurationO2: document.getElementById('intervalDurationInputO2'),
    enableBreakO2: document.getElementById('enableBreakInputO2'),
    breakDurationO2: document.getElementById('breakDurationInputO2'),
    enableBreak2O2: document.getElementById('enableBreakInput2O2'),
    breakDuration2O2: document.getElementById('breakDurationInput2O2'),
    enableBreak3O2: document.getElementById('enableBreakInput3O2'),
    breakDuration3O2: document.getElementById('breakDurationInput3O2'),
    enableBreak4O2: document.getElementById('enableBreakInput4O2'),
    breakDuration4O2: document.getElementById('breakDurationInput4O2'),
    enableBreak5O2: document.getElementById('enableBreakInput5O2'),
    breakDuration5O2: document.getElementById('breakDurationInput5O2'),
    enableBreak6O2: document.getElementById('enableBreakInput6O2'),
    breakDuration6O2: document.getElementById('breakDurationInput6O2'),
    enableBreak7O2: document.getElementById('enableBreakInput7O2'),
    breakDuration7O2: document.getElementById('breakDurationInput7O2'),
    enableBreak8O2: document.getElementById('enableBreakInput8O2'),
    breakDuration8O2: document.getElementById('breakDurationInput8O2'),
    enableBreak9O2: document.getElementById('enableBreakInput9O2'),
    breakDuration9O2: document.getElementById('breakDurationInput9O2'),
    enableBreak10O2: document.getElementById('enableBreakInput10O2'),
    breakDuration10O2: document.getElementById('breakDurationInput10O2'),
    enableBreak11O2: document.getElementById('enableBreakInput11O2'),
    breakDuration11O2: document.getElementById('breakDurationInput11O2'),
    enableBreak12O2: document.getElementById('enableBreakInput12O2'),
    breakDuration12O2: document.getElementById('breakDurationInput12O2'),
    enableBreak13O2: document.getElementById('enableBreakInput13O2'),
    breakDuration13O2: document.getElementById('breakDurationInput13O2'),
    enableBreak14O2: document.getElementById('enableBreakInput14O2'),
    breakDuration14O2: document.getElementById('breakDurationInput14O2'),
    enableBreak15O2: document.getElementById('enableBreakInput15O2'),
    breakDuration15O2: document.getElementById('breakDurationInput15O2'),
  };

  formSettingsFieldsO2.intervalCountO2.value = timerSettingsO2.intervalCountO2;
  formSettingsFieldsO2.intervalDurationO2.value = timerSettingsO2.intervalDurationO2;
  formSettingsFieldsO2.enableBreakO2.checked = timerSettingsO2.enableBreakO2;
  formSettingsFieldsO2.breakDurationO2.value = timerSettingsO2.breakDurationO2;
  formSettingsFieldsO2.enableBreak2O2.checked = timerSettingsO2.enableBreak2O2;
  formSettingsFieldsO2.breakDuration2O2.value = timerSettingsO2.breakDuration2O2;
  formSettingsFieldsO2.enableBreak3O2.checked = timerSettingsO2.enableBreak3O2;
  formSettingsFieldsO2.breakDuration3O2.value = timerSettingsO2.breakDuration3O2;
  formSettingsFieldsO2.enableBreak4O2.checked = timerSettingsO2.enableBreak4O2;
  formSettingsFieldsO2.breakDuration4O2.value = timerSettingsO2.breakDuration4O2;
  formSettingsFieldsO2.enableBreak5O2.checked = timerSettingsO2.enableBreak5O2;
  formSettingsFieldsO2.breakDuration5O2.value = timerSettingsO2.breakDuration5O2;
  formSettingsFieldsO2.enableBreak6O2.checked = timerSettingsO2.enableBreak6O2;
  formSettingsFieldsO2.breakDuration6O2.value = timerSettingsO2.breakDuration6O2;
  formSettingsFieldsO2.enableBreak7O2.checked = timerSettingsO2.enableBreak7O2;
  formSettingsFieldsO2.breakDuration7O2.value = timerSettingsO2.breakDuration7O2;
  formSettingsFieldsO2.enableBreak8O2.checked = timerSettingsO2.enableBreak8O2;
  formSettingsFieldsO2.breakDuration8O2.value = timerSettingsO2.breakDuration8O2;
  formSettingsFieldsO2.enableBreak9O2.checked = timerSettingsO2.enableBreak9O2;
  formSettingsFieldsO2.breakDuration9O2.value = timerSettingsO2.breakDuration9O2;
  formSettingsFieldsO2.enableBreak10O2.checked = timerSettingsO2.enableBreak10O2;
  formSettingsFieldsO2.breakDuration10O2.value = timerSettingsO2.breakDuration10O2;
  formSettingsFieldsO2.enableBreak11O2.checked = timerSettingsO2.enableBreak11O2;
  formSettingsFieldsO2.breakDuration11O2.value = timerSettingsO2.breakDuration11O2;
  formSettingsFieldsO2.enableBreak12O2.checked = timerSettingsO2.enableBreak12O2;
  formSettingsFieldsO2.breakDuration12O2.value = timerSettingsO2.breakDuration12O2;
  formSettingsFieldsO2.enableBreak13O2.checked = timerSettingsO2.enableBreak13O2;
  formSettingsFieldsO2.breakDuration13O2.value = timerSettingsO2.breakDuration13O2;
  formSettingsFieldsO2.enableBreak14O2.checked = timerSettingsO2.enableBreak14O2;
  formSettingsFieldsO2.breakDuration14O2.value = timerSettingsO2.breakDuration14O2;
  formSettingsFieldsO2.enableBreak15O2.checked = timerSettingsO2.enableBreak15O2;
  formSettingsFieldsO2.breakDuration15O2.value = timerSettingsO2.breakDuration15O2;
  
  function getNumberInBoundsOrDefaultO2(value, minO2, maxO2, def = 1) {
    const valueAsNumberO2 = parseInt(value);
    return isNaN(valueAsNumberO2) ? def : Math.max(minO2, Math.min(valueAsNumberO2, maxO2));
  }

  function setBreakDurationLineDisplayO2(displayed) {
    const breakDurationInputLineEltO2 = document.getElementById('breakDurationInputLineO2');
    breakDurationInputLineEltO2.style.display = displayed ? null : 'none';
    const breakDurationInputLineElt2O2 = document.getElementById('breakDurationInputLine2O2');
    breakDurationInputLineElt2O2.style.display = displayed ? null : 'none';
    const breakDurationInputLineElt3O2 = document.getElementById('breakDurationInputLine3O2');
    breakDurationInputLineElt3O2.style.display = displayed ? null : 'none';
    const breakDurationInputLineElt4O2 = document.getElementById('breakDurationInputLine4O2');
    breakDurationInputLineElt4O2.style.display = displayed ? null : 'none';
    const breakDurationInputLineElt5O2 = document.getElementById('breakDurationInputLine5O2');
    breakDurationInputLineElt5O2.style.display = displayed ? null : 'none';
    const breakDurationInputLineElt6O2 = document.getElementById('breakDurationInputLine6O2');
    breakDurationInputLineElt6O2.style.display = displayed ? null : 'none';
    const breakDurationInputLineElt7O2 = document.getElementById('breakDurationInputLine7O2');
    breakDurationInputLineElt7O2.style.display = displayed ? null : 'none';
    const breakDurationInputLineElt8O2 = document.getElementById('breakDurationInputLine8O2');
    breakDurationInputLineElt8O2.style.display = displayed ? null : 'none';
    const breakDurationInputLineElt9O2 = document.getElementById('breakDurationInputLine9O2');
    breakDurationInputLineElt9O2.style.display = displayed ? null : 'none';
    const breakDurationInputLineElt10O2 = document.getElementById('breakDurationInputLine10O2');
    breakDurationInputLineElt10O2.style.display = displayed ? null : 'none';
    const breakDurationInputLineElt11O2 = document.getElementById('breakDurationInputLine11O2');
    breakDurationInputLineElt11O2.style.display = displayed ? null : 'none';
    const breakDurationInputLineElt12O2 = document.getElementById('breakDurationInputLine12O2');
    breakDurationInputLineElt12O2.style.display = displayed ? null : 'none';
    const breakDurationInputLineElt13O2 = document.getElementById('breakDurationInputLine13O2');
    breakDurationInputLineElt13O2.style.display = displayed ? null : 'none';
    const breakDurationInputLineElt14O2 = document.getElementById('breakDurationInputLine14O2');
    breakDurationInputLineElt14O2.style.display = displayed ? null : 'none';
    const breakDurationInputLineElt15O2 = document.getElementById('breakDurationInputLine15O2');
    breakDurationInputLineElt15O2.style.display = displayed ? null : 'none';
  }

  formSettingsFieldsO2.intervalCountO2.addEventListener('input', () => {
    const intervalCountO2 = getNumberInBoundsOrDefaultO2(formSettingsFieldsO2.intervalCountO2.value, 1, 8),
    hasOneIntervalO2 = intervalCountO2 === 1,
    hasBreakO2 = hasOneIntervalO2 ? false : lastUserSetEnableBreakO2;

    formSettingsFieldsO2.enableBreakO2.disabled = hasOneIntervalO2 === true;
    formSettingsFieldsO2.enableBreakO2.checked = hasBreakO2;

    setBreakDurationLineDisplayO2(hasBreakO2);

    setTimerSettingsO2(intervalCountO2, undefined, hasBreakO2);
    updateInfoO2();
  });

  formSettingsFieldsO2.intervalDurationO2.addEventListener('input', () => {
    setTimerSettingsO2(undefined, getNumberInBoundsOrDefaultO2(formSettingsFieldsO2.intervalDurationO2.value, 1, oneDayInSecondsO2));
    updateInfoO2();
  });

  formSettingsFieldsO2.enableBreakO2.addEventListener('change', () => {
    const enableBreakO2 = formSettingsFieldsO2.enableBreakO2.checked;

    lastUserSetEnableBreakO2 = enableBreakO2;
    setBreakDurationLineDisplayO2(enableBreakO2);
    setTimerSettingsO2(undefined, undefined, enableBreakO2);
    updateInfoO2();
  });

  formSettingsFieldsO2.breakDurationO2.addEventListener('input', () => {
    setTimerSettingsO2( undefined, undefined, undefined,
    getNumberInBoundsOrDefaultO2(formSettingsFieldsO2.breakDurationO2.value, 1, oneDayInSecondsO2)
    );
    updateInfoO2();
  });

  formSettingsFieldsO2.enableBreak2O2.addEventListener('change', () => {
    const enableBreak2O2 = formSettingsFieldsO2.enableBreak2O2.checked;

    lastUserSetEnableBreak2O2 = enableBreak2O2;
    setBreakDurationLineDisplayO2(enableBreak2O2);
    setTimerSettingsO2(undefined, undefined, undefined, undefined, enableBreak2O2);
    updateInfoO2();
  });

  formSettingsFieldsO2.breakDuration2O2.addEventListener('input', () => {
    setTimerSettingsO2(undefined, undefined, undefined, undefined, undefined,
    getNumberInBoundsOrDefaultO2(formSettingsFieldsO2.breakDuration2O2.value, 1, oneDayInSecondsO2)
    );
    updateInfoO2();
  });

    formSettingsFieldsO2.enableBreak3O2.addEventListener('change', () => {
      const enableBreak3O2 = formSettingsFieldsO2.enableBreak3O2.checked;

      lastUserSetEnableBreak3O2 = enableBreak2O2;
      setBreakDurationLineDisplayO2(enableBreak3O2);
      setTimerSettingsO2(undefined, undefined, undefined, undefined, undefined, undefined, enableBreak3O2);
      updateInfoO2();
    });

    formSettingsFieldsO2.breakDuration3O2.addEventListener('input', () => {
      setTimerSettingsO2(
        undefined, undefined, undefined, undefined, undefined, undefined, undefined,
        getNumberInBoundsOrDefaultO2(formSettingsFieldsO2.breakDuration3O2.value, 1, oneDayInSecondsO2)
      );
      updateInfoO2();
    });
    formSettingsFieldsO2.enableBreak4O2.addEventListener('change', () => {
      const enableBreak4O2 = formSettingsFieldsO2.enableBreak4O2.checked;

      lastUserSetEnableBreak4O2 = enableBreak4O2;
      setBreakDurationLineDisplayO2(enableBreak4O2);
      setTimerSettingsO2(undefined, undefined, undefined, undefined, undefined, undefined, undefined, enableBreak4O2);
      updateInfoO2();
    });

    formSettingsFieldsO2.breakDuration4O2.addEventListener('input', () => {
      setTimerSettingsO2(
        undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined,
        getNumberInBoundsOrDefaultO2(formSettingsFieldsO2.breakDuration4O2.value, 1, oneDayInSecondsO2)
      );
      updateInfoO2();
    });
    formSettingsFieldsO2.enableBreak5O2.addEventListener('change', () => {
      const enableBreak5O2 = formSettingsFieldsO2.enableBreak5O2.checked;

      lastUserSetEnableBreak5O2 = enableBreak5O2;
      setBreakDurationLineDisplayO2(enableBreak5O2);
      setTimerSettingsO2(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, enableBreak5O2);
      updateInfoO2();
    });

    formSettingsFieldsO2.breakDuration5O2.addEventListener('input', () => {
      setTimerSettingsO2(
        undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined,
        getNumberInBoundsOrDefaultO2(formSettingsFieldsO2.breakDuration5O2.value, 1, oneDayInSecondsO2)
      );
      updateInfoO2();
    });
    formSettingsFieldsO2.enableBreak6O2.addEventListener('change', () => {
      const enableBreak6O2 = formSettingsFieldsO2.enableBreak6O2.checked;

      lastUserSetEnableBreak6O2 = enableBreak6O2;
      setBreakDurationLineDisplayO2(enableBreak6O2);
      setTimerSettingsO2(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, enableBreak6O2);
      updateInfoO2();
    });

    formSettingsFieldsO2.breakDuration6O2.addEventListener('input', () => {
      setTimerSettingsO2(
        undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined,
        getNumberInBoundsOrDefaultO2(formSettingsFieldsO2.breakDuration6O2.value, 1, oneDayInSecondsO2)
      );
      updateInfoO2();
    });
    formSettingsFieldsO2.enableBreak7O2.addEventListener('change', () => {
      const enableBreak7O2 = formSettingsFieldsO2.enableBreak7O2.checked;

      lastUserSetEnableBreak7O2 = enableBreak7O2;
      setBreakDurationLineDisplayO2(enableBreak7O2);
      setTimerSettingsO2(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, enableBreak7O2);
      updateInfoO2();
    });

    formSettingsFieldsO2.breakDuration7O2.addEventListener('input', () => {
      setTimerSettingsO2(
        undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined,
        getNumberInBoundsOrDefaultO2(formSettingsFieldsO2.breakDuration7O2.value, 1, oneDayInSecondsO2)
      );
      updateInfoO2();
    });
    formSettingsFieldsO2.enableBreak8O2.addEventListener('change', () => {
      const enableBreak8O2 = formSettingsFieldsO2.enableBreak8O2.checked;

      lastUserSetEnableBreak8O2 = enableBreak8O2;
      setBreakDurationLineDisplayO2(enableBreak8O2);
      setTimerSettingsO2(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, enableBreak8O2);
      updateInfoO2();
    });

    formSettingsFieldsO2.breakDuration8O2.addEventListener('input', () => {
      setTimerSettingsO2(
        undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined,
        getNumberInBoundsOrDefaultO2(formSettingsFieldsO2.breakDuration8O2.value, 1, oneDayInSecondsO2)
      );
      updateInfoO2();
    });
    formSettingsFieldsO2.enableBreak9O2.addEventListener('change', () => {
      const enableBreak9O2 = formSettingsFieldsO2.enableBreak9O2.checked;

      lastUserSetEnableBreak9O2 = enableBreak9O2;
      setBreakDurationLineDisplayO2(enableBreak9O2);
      setTimerSettingsO2(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, enableBreak9O2);
      updateInfoO2();
    });

    formSettingsFieldsO2.breakDuration9O2.addEventListener('input', () => {
      setTimerSettingsO2(
        undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined,
        getNumberInBoundsOrDefaultO2(formSettingsFieldsO2.breakDuration9O2.value, 1, oneDayInSecondsO2)
      );
      updateInfoO2();
    });
    formSettingsFieldsO2.enableBreak10O2.addEventListener('change', () => {
      const enableBreak10O2 = formSettingsFieldsO2.enableBreak10O2.checked;

      lastUserSetEnableBreak10O2 = enableBreak10O2;
      setBreakDurationLineDisplayO2(enableBreak10O2);
      setTimerSettingsO2(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, enableBreak10O2);
      updateInfoO2();
    });

    formSettingsFieldsO2.breakDuration10O2.addEventListener('input', () => {
      setTimerSettingsO2(
        undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined,
        getNumberInBoundsOrDefaultO2(formSettingsFieldsO2.breakDuration10O2.value, 1, oneDayInSecondsO2)
      );
      updateInfoO2();
    });
    formSettingsFieldsO2.enableBreak11O2.addEventListener('change', () => {
      const enableBreak11O2 = formSettingsFieldsO2.enableBreak11O2.checked;

      lastUserSetEnableBreak11O2 = enableBreak11O2;
      setBreakDurationLineDisplayO2(enableBreak11O2);
      setTimerSettingsO2(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, enableBreak11O2);
      updateInfoO2();
    });

    formSettingsFieldsO2.breakDuration11O2.addEventListener('input', () => {
      setTimerSettingsO2(
        undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined,
        getNumberInBoundsOrDefaultO2(formSettingsFieldsO2.breakDuration11O2.value, 1, oneDayInSecondsO2)
      );
      updateInfoO2();
    });
    formSettingsFieldsO2.enableBreak12O2.addEventListener('change', () => {
      const enableBreak12O2 = formSettingsFieldsO2.enableBreak12O2.checked;

      lastUserSetEnableBreak12O2 = enableBreak12O2;
      setBreakDurationLineDisplayO2(enableBreak12O2);
      setTimerSettingsO2(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, enableBreak12O2);
      updateInfoO2();
    });

    formSettingsFieldsO2.breakDuration12O2.addEventListener('input', () => {
      setTimerSettingsO2(
        undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined,
        getNumberInBoundsOrDefaultO2(formSettingsFieldsO2.breakDuration12O2.value, 1, oneDayInSecondsO2)
      );
      updateInfoO2();
    });
    formSettingsFieldsO2.enableBreak13O2.addEventListener('change', () => {
      const enableBreak13O2 = formSettingsFieldsO2.enableBreak13O2.checked;

      lastUserSetEnableBreak13O2 = enableBreak13O2;
      setBreakDurationLineDisplayO2(enableBreak13O2);
      setTimerSettingsO2(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, enableBreak13O2);
      updateInfoO2();
    });

    formSettingsFieldsO2.breakDuration13O2.addEventListener('input', () => {
      setTimerSettingsO2(
        undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined,
        getNumberInBoundsOrDefaultO2(formSettingsFieldsO2.breakDuration13O2.value, 1, oneDayInSecondsO2)
      );
      updateInfoO2();
    });
    formSettingsFieldsO2.enableBreak14O2.addEventListener('change', () => {
      const enableBreak14O2 = formSettingsFieldsO2.enableBreak14O2.checked;

      lastUserSetEnableBreak14O2 = enableBreak14O2;
      setBreakDurationLineDisplayO2(enableBreak14O2);
      setTimerSettingsO2(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, enableBreak14O2);
      updateInfoO2();
    });

    formSettingsFieldsO2.breakDuration14O2.addEventListener('input', () => {
      setTimerSettingsO2(
        undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined,
        getNumberInBoundsOrDefaultO2(formSettingsFieldsO2.breakDuration14O2.value, 1, oneDayInSecondsO2)
      );
      updateInfoO2();
    });
    formSettingsFieldsO2.enableBreak15O2.addEventListener('change', () => {
      const enableBreak15O2 = formSettingsFieldsO2.enableBreak15O2.checked;

      lastUserSetEnableBreak15O2 = enableBreak15O2;
      setBreakDurationLineDisplayO2(enableBreak15O2);
      setTimerSettingsO2(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, enableBreak15O2);
      updateInfoO2();
    });

    formSettingsFieldsO2.breakDuration15O2.addEventListener('input', () => {
      setTimerSettingsO2(
        undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined,
        getNumberInBoundsOrDefaultO2(formSettingsFieldsO2.breakDuration15O2.value, 1, oneDayInSecondsO2)
      );
      updateInfoO2();
    });
  }

  function initializeTimerControlsO2() {
    timerControlsButtonsO2 = {
      startO2: document.getElementById('startBtnO2'),
      pauseO2: document.getElementById('pauseBtnO2'),
      stopO2: document.getElementById('stopBtnO2'),
    };

    setTimerControlsDisabledStateO2(false, true, true);

    timerControlsButtonsO2.startO2.addEventListener('click', startTimerO2);
    timerControlsButtonsO2.pauseO2.addEventListener('click', pauseTimerO2);
    timerControlsButtonsO2.stopO2.addEventListener('click', stopTimerO2);
  }

  function initializeStatusPanelO2() {
    statusPanelO2 = {
      timeOverviewMessageO2: document.getElementById('timeOverviewMessageO2'),
      elapsedInIntervalO2: document.getElementById('elapsedInIntervalO2'),
      elapsedInIntervalBoxO2: document.getElementById('elapsedInIntervalBoxO2'),
      elapsedInBreakIntervalBoxO2: document.getElementById('elapsedInBreakIntervalBoxO2'),
      elapsedInBreakIntervalO2: document.getElementById('elapsedInBreakIntervalO2'),
      elapsedInBreakIntervalBox2O2: document.getElementById('elapsedInBreakIntervalBox2O2'),
      elapsedInBreakInterval2O2: document.getElementById('elapsedInBreakInterval2O2'),
      elapsedInBreakIntervalBox3O2: document.getElementById('elapsedInBreakIntervalBox3O2'),
      elapsedInBreakInterval3O2: document.getElementById('elapsedInBreakInterval3O2'),
      elapsedInBreakIntervalBox4O2: document.getElementById('elapsedInBreakIntervalBox4O2'),
      elapsedInBreakInterval4O2: document.getElementById('elapsedInBreakInterval4O2'),
      elapsedInBreakIntervalBox5O2: document.getElementById('elapsedInBreakIntervalBox5O2'),
      elapsedInBreakInterval5O2: document.getElementById('elapsedInBreakInterval5O2'),
      elapsedInBreakIntervalBox6O2: document.getElementById('elapsedInBreakIntervalBox6O2'),
      elapsedInBreakInterval6O2: document.getElementById('elapsedInBreakInterval6O2'),
      elapsedInBreakIntervalBox7O2: document.getElementById('elapsedInBreakIntervalBox7O2'),
      elapsedInBreakInterval7O2: document.getElementById('elapsedInBreakInterval7O2'),
      elapsedInBreakIntervalBox8O2: document.getElementById('elapsedInBreakIntervalBox8O2'),
      elapsedInBreakInterval8O2: document.getElementById('elapsedInBreakInterval8O2'),
      elapsedInBreakIntervalBox9O2: document.getElementById('elapsedInBreakIntervalBox9O2'),
      elapsedInBreakInterval9O2: document.getElementById('elapsedInBreakInterval9O2'),
      elapsedInBreakIntervalBox10O2: document.getElementById('elapsedInBreakIntervalBox10O2'),
      elapsedInBreakInterval10O2: document.getElementById('elapsedInBreakInterval10O2'),
      elapsedInBreakIntervalBox11O2: document.getElementById('elapsedInBreakIntervalBox11O2'),
      elapsedInBreakInterval11O2: document.getElementById('elapsedInBreakInterval11O2'),
      elapsedInBreakIntervalBox12O2: document.getElementById('elapsedInBreakIntervalBox12O2'),
      elapsedInBreakInterval12O2: document.getElementById('elapsedInBreakInterval12O2'),
      elapsedInBreakIntervalBox13O2: document.getElementById('elapsedInBreakIntervalBox13O2'),
      elapsedInBreakInterval13O2: document.getElementById('elapsedInBreakInterval13O2'),
      elapsedInBreakIntervalBox14O2: document.getElementById('elapsedInBreakIntervalBox14O2'),
      elapsedInBreakInterval14O2: document.getElementById('elapsedInBreakInterval14O2'),
      elapsedInBreakIntervalBox15O2: document.getElementById('elapsedInBreakIntervalBox15O2'),
      elapsedInBreakInterval15O2: document.getElementById('elapsedInBreakInterval15O2'),
      intervalsDoneO2: document.getElementById('intervalsDoneO2'),
      levelHold1O2: document.getElementById('levelHold1O2'),
      levelHold2O2: document.getElementById('levelHold2O2'),
      levelHold3O2: document.getElementById('levelHold3O2'),
      levelHold4O2: document.getElementById('levelHold4O2'),
      levelHold5O2: document.getElementById('levelHold5O2'),
      levelHold6O2: document.getElementById('levelHold6O2'),
      levelHold7O2: document.getElementById('levelHold7O2'),
      levelHold8O2: document.getElementById('levelHold8O2'),
      levelO2: document.getElementById('levelO2')
    };
    statusPanelO2.levelO2.textContent = '1';
    statusPanelO2.levelHold1O2.textContent = '0:30';
    statusPanelO2.levelHold2O2.textContent = '0:45';
    statusPanelO2.levelHold3O2.textContent = '1:00';
    statusPanelO2.levelHold4O2.textContent = '1:15';
    statusPanelO2.levelHold5O2.textContent = '1:30';
    statusPanelO2.levelHold6O2.textContent = '1:45';
    statusPanelO2.levelHold7O2.textContent = '2:00';
    statusPanelO2.levelHold8O2.textContent = '2:15';
  }

  function setTimerControlsDisabledStateO2(startO2, pauseO2, stopO2) {
    timerControlsButtonsO2.startO2.disabled = startO2;
    timerControlsButtonsO2.pauseO2.disabled = pauseO2;
    timerControlsButtonsO2.stopO2.disabled = stopO2;
  }

  function setFormDisabledStateO2(disabled) {
    formSettingsFieldsO2.intervalCountO2.disabled = disabled;
    formSettingsFieldsO2.intervalDurationO2.disabled = disabled;
    formSettingsFieldsO2.enableBreakO2.disabled = disabled || timerSettingsO2.intervalCountO2 === 1;
    formSettingsFieldsO2.breakDurationO2.disabled = disabled;
    formSettingsFieldsO2.enableBreak2O2.disabled = disabled
    formSettingsFieldsO2.breakDuration2O2.disabled = disabled;
    formSettingsFieldsO2.enableBreak3O2.disabled = disabled
    formSettingsFieldsO2.breakDuration3O2.disabled = disabled;
    formSettingsFieldsO2.enableBreak4O2.disabled = disabled
    formSettingsFieldsO2.breakDuration4O2.disabled = disabled;
    formSettingsFieldsO2.enableBreak5O2.disabled = disabled
    formSettingsFieldsO2.breakDuration5O2.disabled = disabled;
    formSettingsFieldsO2.enableBreak6O2.disabled = disabled
    formSettingsFieldsO2.breakDuration6O2.disabled = disabled;
    formSettingsFieldsO2.enableBreak7O2.disabled = disabled
    formSettingsFieldsO2.breakDuration7O2.disabled = disabled;
    formSettingsFieldsO2.enableBreak8O2.disabled = disabled
    formSettingsFieldsO2.breakDuration8O2.disabled = disabled;
    formSettingsFieldsO2.enableBreak9O2.disabled = disabled
    formSettingsFieldsO2.breakDuration9O2.disabled = disabled;
    formSettingsFieldsO2.enableBreak10O2.disabled = disabled
    formSettingsFieldsO2.breakDuration10O2.disabled = disabled;
    formSettingsFieldsO2.enableBreak11O2.disabled = disabled
    formSettingsFieldsO2.breakDuration11O2.disabled = disabled;
    formSettingsFieldsO2.enableBreak12O2.disabled = disabled
    formSettingsFieldsO2.breakDuration12O2.disabled = disabled;
    formSettingsFieldsO2.enableBreak13O2.disabled = disabled
    formSettingsFieldsO2.breakDuration13O2.disabled = disabled;
    formSettingsFieldsO2.enableBreak14O2.disabled = disabled
    formSettingsFieldsO2.breakDuration14O2.disabled = disabled;
    formSettingsFieldsO2.enableBreak15O2.disabled = disabled
    formSettingsFieldsO2.breakDuration15O2.disabled = disabled;
    minusBtnO2.disabled = disabled;
    plusBtnO2.disabled = disabled;
  }

  function startTimerO2() {
    if(intO2!==null){
      clearInterval(intO2);
    }
    intO2 = setInterval(displayTimerO2,1000);
    setFormDisabledStateO2(true);
    setTimerControlsDisabledStateO2(true, false, true);
    timerControlsButtonsO2.stopO2.style.color = "rgb(177, 177, 177)";
    if(timerO2.isBreak0O2){
        if (!ismuteO2) {
            audioObjects.breathedeeply.muted = false;
            audioObjects.breathedeeply.play();
        }
    }
      if (!audioPlayerBRT.muted) {
          playSelectedSongBRT(true);
      }
    if (timerO2.isFinishedO2) {
      resetTimerO2();
    }
    startTimerTickO2();  
      timerControlsButtonsO2.startO2.style.display = 'none';
      timerControlsButtonsO2.pauseO2.style.display = 'inline';
      document.getElementById('O2Settings').disabled = true;
      document.getElementById('O2Settings').style.color = 'rgb(177, 177, 177)';
  }

  function pauseTimerO2() {
    clearInterval(intO2);
    setTimerControlsDisabledStateO2(false, true, false);
    document.getElementById('stopBtnO2').style.color = '#990000';
    timerControlsButtonsO2.pauseO2.style.display = 'none'; 
    timerControlsButtonsO2.startO2.style.display = 'inline';
    document.getElementById('O2Date').value = date;
    if (timerO2.intervalsDoneO2 == 0) {
        document.getElementById('O2Save').disabled = true;
    }
    else {
        document.getElementById('O2Save').disabled = false;
        document.getElementById('O2Save').style.color = '#49B79D';
    }
    if (!audioPlayerBRT.muted) {
       audioPlayerBRT.pause();
    }
    stopTimerTickO2();
  }

  function stopTimerO2() {
    clearInterval(intO2);
    timerRefO2.value = '|';
    if (!audioPlayerBRT.muted) {
        audioPlayerBRT.pause();
    }
    audioPlayerBRT.currentTime = 0
    timerControlsButtonsO2.pauseO2.style.display = 'none'; 
    timerControlsButtonsO2.startO2.style.display = 'inline';
    setFormDisabledStateO2(false);
    setTimerControlsDisabledStateO2(false, true, true);
    timerControlsButtonsO2.stopO2.style.color = "rgb(177, 177, 177)";
    timerControlsButtonsO2.startO2.style.color = "#0661AA";
    stopTimerTickO2();
    resetTimerO2();
    document.getElementsByClassName('gap2O2')[0].style.backgroundColor = '#ffffff';
    document.getElementsByClassName('gap2O2')[1].style.backgroundColor = '#ffffff';
    document.getElementsByClassName('gap3O2')[0].style.backgroundColor = '#ffffff';
    document.getElementsByClassName('gap3O2')[1].style.backgroundColor = '#ffffff';
    document.getElementsByClassName('gap4O2')[0].style.backgroundColor = '#ffffff';
    document.getElementsByClassName('gap4O2')[1].style.backgroundColor = '#ffffff';
    document.getElementsByClassName('gap5O2')[0].style.backgroundColor = '#ffffff';
    document.getElementsByClassName('gap5O2')[1].style.backgroundColor = '#ffffff';
    document.getElementsByClassName('gap6O2')[0].style.backgroundColor = '#ffffff';
    document.getElementsByClassName('gap6O2')[1].style.backgroundColor = '#ffffff';
    document.getElementsByClassName('gap7O2')[0].style.backgroundColor = '#ffffff';
    document.getElementsByClassName('gap7O2')[1].style.backgroundColor = '#ffffff';
    document.getElementsByClassName('gap8O2')[0].style.backgroundColor = '#ffffff';
    document.getElementsByClassName('gap8O2')[1].style.backgroundColor = '#ffffff';
    document.getElementsByClassName('gap1O2')[0].style.backgroundColor = '#49B79D';
    document.getElementsByClassName('gap1O2')[1].style.backgroundColor = '#49B79D';
    isBreak0O2 = true;
    document.getElementById("O2Results").innerHTML = "";
  }

  function displayTimerO2(){
    secondsO2++;
    if(secondsO2 == 60){
      secondsO2 = 0;
      minutesO2++;
      if(minutesO2 == 60){
        minutesO2 = 0;
        hoursO2++;
      }
    }
  }

  function startTimerTickO2() {
    timerO2.intervalId = setInterval(onTimerTickO2, 1000);
  }

  function stopTimerTickO2() {
    clearInterval(timerO2.intervalId);
  }

  function onTimerTickO2() {
    const currentIntervalDurationO2 = timerO2.isBreakO2 ? timerSettingsO2.breakDurationO2 : timerO2.isBreak2O2 ? timerSettingsO2.breakDuration2O2 : timerO2.isBreak3O2 ? timerSettingsO2.breakDuration3O2 : timerO2.isBreak4O2 ? timerSettingsO2.breakDuration4O2 : timerO2.isBreak5O2 ? timerSettingsO2.breakDuration5O2 : timerO2.isBreak6O2 ? timerSettingsO2.breakDuration6O2 : timerO2.isBreak7O2 ? timerSettingsO2.breakDuration7O2 : timerO2.isBreak8O2 ? timerSettingsO2.breakDuration8O2 : timerO2.isBreak9O2 ? timerSettingsO2.breakDuration9O2 : timerO2.isBreak10O2 ? timerSettingsO2.breakDuration10O2 : timerO2.isBreak11O2 ? timerSettingsO2.breakDuration11O2 : timerO2.isBreak12O2 ? timerSettingsO2.breakDuration12O2 : timerO2.isBreak13O2 ? timerSettingsO2.breakDuration13O2 : timerO2.isBreak14O2 ? timerSettingsO2.breakDuration14O2 : timerO2.isBreak15O2 ? timerSettingsO2.breakDuration15O2 : timerSettingsO2.intervalDurationO2;
    if (timerO2.elapsedInIntervalO2 <= currentIntervalDurationO2 && timerO2.isBreak0O2) {
      timerO2.elapsedInIntervalO2++;
      if(timerO2.elapsedInIntervalO2 > currentIntervalDurationO2 && timerO2.isBreak0O2){
          if (!ismuteO2) {
            audioObjects.hold.muted = false;
            audioObjects.hold.play();
        }
        timerO2.isBreakO2 = true;  
        timerO2.isBreak0O2 = false;
        timerO2.isFinishedO2 = timerO2.intervalsDoneO2 === timerSettingsO2.intervalCountO2;
        if (!timerO2.isFinishedO2) {
            timerO2.elapsedInIntervalO2 = 1;
        }
        if (timerO2.isFinishedO2) {
          setTimerControlsDisabledStateO2(false, true, true);
          setFormDisabledStateO2(false);
          stopTimerTickO2();
        } else {
          timerO2.totalTimeElapsedO2++;
        }
        updateInfoO2();
      } 
      updateInfoO2();
    }else if(timerO2.elapsedInIntervalO2 <= currentIntervalDurationO2 && timerO2.isBreakO2){
      timerO2.elapsedInIntervalO2++;
      if(timerO2.elapsedInIntervalO2 > currentIntervalDurationO2 && timerO2.isBreakO2){
          if (!ismuteO2) {
              audioObjects.breathedeeply.muted = false;
              audioObjects.breathedeeply.play();
        }
        document.getElementsByClassName('gap1O2')[0].style.backgroundColor = '#ffffff';
        document.getElementsByClassName('gap1O2')[1].style.backgroundColor = '#ffffff';
        document.getElementsByClassName('gap2O2')[0].style.backgroundColor = '#49B79D';
        document.getElementsByClassName('gap2O2')[1].style.backgroundColor = '#49B79D';
        timerO2.isBreak2O2 = true;
        timerO2.isBreakO2 = false; 
          timerO2.intervalsDoneO2++;
          if (isPortuguese) {
              document.getElementById("O2Results").innerHTML += "<div class='NOfSteps'> <div>Round " + timerO2.intervalsDoneO2 + "</div><div>" + (timerO2.elapsedInIntervalO2 - 1) + " segundos</div></div>";
          } else {
              document.getElementById("O2Results").innerHTML += "<div class='NOfSteps'> <div>Round " + timerO2.intervalsDoneO2 + "</div><div>" + (timerO2.elapsedInIntervalO2 - 1) + " seconds</div></div>";
          }
        timerRefO2.value += timerO2.elapsedInIntervalO2 + "|";
        timerO2.isFinishedO2 = timerO2.intervalsDoneO2 === timerSettingsO2.intervalCountO2;
        if (!timerO2.isFinishedO2) {
            timerO2.elapsedInIntervalO2 = 1;
        }
        if (timerO2.isFinishedO2) {
          setTimerControlsDisabledStateO2(false, true, true);
          setFormDisabledStateO2(false);
          stopTimerTickO2();
        } else {
          timerO2.totalTimeElapsedO2++;
        }
        updateInfoO2();
      } 
      updateInfoO2();
    }else if(timerO2.elapsedInIntervalO2 <= currentIntervalDurationO2 && timerO2.isBreak2O2){
      timerO2.elapsedInIntervalO2++;
      if(timerO2.elapsedInIntervalO2 > currentIntervalDurationO2 && timerO2.isBreak2O2){
          if (!ismuteO2) {
            audioObjects.hold.muted = false;
            audioObjects.hold.play();
        }
        timerO2.isBreak3O2 = true;
        timerO2.isBreak2O2 = false;
        timerO2.isFinishedO2 = timerO2.intervalsDoneO2 === timerSettingsO2.intervalCountO2;
        if (!timerO2.isFinishedO2) {
          timerO2.elapsedInIntervalO2 = 1;
        }
        if (timerO2.isFinishedO2) {
          setTimerControlsDisabledStateO2(false, true, true);
          setFormDisabledStateO2(false);
          stopTimerTickO2();
        } else {
          timerO2.totalTimeElapsedO2++;
        }
        updateInfoO2();
      } 
      updateInfoO2();
    }else if(timerO2.elapsedInIntervalO2 <= currentIntervalDurationO2 && timerO2.isBreak3O2){
        timerO2.elapsedInIntervalO2++;
        if(timerO2.elapsedInIntervalO2 > currentIntervalDurationO2 && timerO2.isBreak3O2){
          if(!ismuteO2){
              audioObjects.breathedeeply.muted = false;
              audioObjects.breathedeeply.play();
          }
          document.getElementsByClassName('gap2O2')[0].style.backgroundColor = '#ffffff';
          document.getElementsByClassName('gap2O2')[1].style.backgroundColor = '#ffffff';
          document.getElementsByClassName('gap3O2')[0].style.backgroundColor = '#49B79D';
          document.getElementsByClassName('gap3O2')[1].style.backgroundColor = '#49B79D';
          timerO2.isBreak4O2 = true;
          timerO2.isBreak3O2 = false;
          timerO2.intervalsDoneO2++;
            if (isPortuguese) {
                document.getElementById("O2Results").innerHTML += "<div class='NOfSteps'> <div>Round " + timerO2.intervalsDoneO2 + "</div><div>" + (timerO2.elapsedInIntervalO2 - 1) + " segundos</div></div>";
            } else {
                document.getElementById("O2Results").innerHTML += "<div class='NOfSteps'> <div>Round " + timerO2.intervalsDoneO2 + "</div><div>" + (timerO2.elapsedInIntervalO2 - 1) + " seconds</div></div>";
            }
            timerRefO2.value += (timerO2.elapsedInIntervalO2 - 1) + "|";
          timerO2.isFinishedO2 = timerO2.intervalsDoneO2 === timerSettingsO2.intervalCountO2;
          if (!timerO2.isFinishedO2) {
            timerO2.elapsedInIntervalO2 = 1;
          }
          if (timerO2.isFinishedO2) {
            setTimerControlsDisabledStateO2(false, true, true);
            setFormDisabledStateO2(false);
            stopTimerTickO2();
          } else {
            timerO2.totalTimeElapsedO2++;
          }
          updateInfoO2();
        } 
        updateInfoO2();
      }else if(timerO2.elapsedInIntervalO2 <= currentIntervalDurationO2 && timerO2.isBreak4O2){
        timerO2.elapsedInIntervalO2++;
        if(timerO2.elapsedInIntervalO2 > currentIntervalDurationO2 && timerO2.isBreak4O2){
            if (!ismuteO2) {
                audioObjects.hold.muted = false;
                audioObjects.hold.play();
          }
          timerO2.isBreak5O2 = true;
          timerO2.isBreak4O2 = false;
          timerO2.isFinishedO2 = timerO2.intervalsDoneO2 === timerSettingsO2.intervalCountO2;
          if (!timerO2.isFinishedO2) {
            timerO2.elapsedInIntervalO2 = 1;
          }
          if (timerO2.isFinishedO2) {
            setTimerControlsDisabledStateO2(false, true, true);
            setFormDisabledStateO2(false);
            stopTimerTickO2();
          } else {
            timerO2.totalTimeElapsedO2++;
          }
          updateInfoO2();
        } 
        updateInfoO2();
      }else if(timerO2.elapsedInIntervalO2 <= currentIntervalDurationO2 && timerO2.isBreak5O2){
        timerO2.elapsedInIntervalO2++;
        if(timerO2.elapsedInIntervalO2 > currentIntervalDurationO2 && timerO2.isBreak5O2){
          if(!ismuteO2){
              audioObjects.breathedeeply.muted = false;
              audioObjects.breathedeeply.play();
          }
          document.getElementsByClassName('gap3O2')[0].style.backgroundColor = '#ffffff';
          document.getElementsByClassName('gap3O2')[1].style.backgroundColor = '#ffffff';
          document.getElementsByClassName('gap4O2')[0].style.backgroundColor = '#49B79D';
          document.getElementsByClassName('gap4O2')[1].style.backgroundColor = '#49B79D';
          timerO2.isBreak6O2 = true;
          timerO2.isBreak5O2 = false;
          timerO2.intervalsDoneO2++;
            if (isPortuguese) {
                document.getElementById("O2Results").innerHTML += "<div class='NOfSteps'> <div>Round " + timerO2.intervalsDoneO2 + "</div><div>" + (timerO2.elapsedInIntervalO2 - 1) + " segundos</div></div>";
            } else {
                document.getElementById("O2Results").innerHTML += "<div class='NOfSteps'> <div>Round " + timerO2.intervalsDoneO2 + "</div><div>" + (timerO2.elapsedInIntervalO2 - 1) + " seconds</div></div>";
            }
            timerRefO2.value += (timerO2.elapsedInIntervalO2 - 1) + "|";
          timerO2.isFinishedO2 = timerO2.intervalsDoneO2 === timerSettingsO2.intervalCountO2;
          if (!timerO2.isFinishedO2) {
            timerO2.elapsedInIntervalO2 = 1;
          }
          if (timerO2.isFinishedO2) {
            setTimerControlsDisabledStateO2(false, true, true);
            setFormDisabledStateO2(false);
            stopTimerTickO2();
          } else {
            timerO2.totalTimeElapsedO2++;
          }
          updateInfoO2();
        } 
        updateInfoO2();
      }else if(timerO2.elapsedInIntervalO2 <= currentIntervalDurationO2 && timerO2.isBreak6O2){
        timerO2.elapsedInIntervalO2++;
        if(timerO2.elapsedInIntervalO2 > currentIntervalDurationO2 && timerO2.isBreak6O2){
            if (!ismuteO2) {
                audioObjects.hold.muted = false;
                audioObjects.hold.play();
          }
          timerO2.isBreak7O2 = true;
          timerO2.isBreak6O2 = false;
          timerO2.isFinishedO2 = timerO2.intervalsDoneO2 === timerSettingsO2.intervalCountO2;
          if (!timerO2.isFinishedO2) {
            timerO2.elapsedInIntervalO2 = 1;
          }
          if (timerO2.isFinishedO2) {
            setTimerControlsDisabledStateO2(false, true, true);
            setFormDisabledStateO2(false);
            stopTimerTickO2();
          } else {
            timerO2.totalTimeElapsedO2++;
          }
          updateInfoO2();
        } 
        updateInfoO2();
      }else if(timerO2.elapsedInIntervalO2 <= currentIntervalDurationO2 && timerO2.isBreak7O2){
        timerO2.elapsedInIntervalO2++;
        if(timerO2.elapsedInIntervalO2 > currentIntervalDurationO2 && timerO2.isBreak7O2){
          if(!ismuteO2){
              audioObjects.breathedeeply.muted = false;
              audioObjects.breathedeeply.play();
          }
          document.getElementsByClassName('gap4O2')[0].style.backgroundColor = '#ffffff';
          document.getElementsByClassName('gap4O2')[1].style.backgroundColor = '#ffffff';
          document.getElementsByClassName('gap5O2')[0].style.backgroundColor = '#49B79D';
          document.getElementsByClassName('gap5O2')[1].style.backgroundColor = '#49B79D';
          timerO2.isBreak8O2 = true;
          timerO2.isBreak7O2 = false;
          timerO2.intervalsDoneO2++;
            if (isPortuguese) {
                document.getElementById("O2Results").innerHTML += "<div class='NOfSteps'> <div>Round " + timerO2.intervalsDoneO2 + "</div><div>" + (timerO2.elapsedInIntervalO2 - 1) + " segundos</div></div>";
            } else {
                document.getElementById("O2Results").innerHTML += "<div class='NOfSteps'> <div>Round " + timerO2.intervalsDoneO2 + "</div><div>" + (timerO2.elapsedInIntervalO2 - 1) + " seconds</div></div>";
            }
            timerRefO2.value += (timerO2.elapsedInIntervalO2 - 1) + "|";          
          timerO2.isFinishedO2 = timerO2.intervalsDoneO2 === timerSettingsO2.intervalCountO2;
          if (!timerO2.isFinishedO2) {
            timerO2.elapsedInIntervalO2 = 1;
          }
          if (timerO2.isFinishedO2) {
            setTimerControlsDisabledStateO2(false, true, true);
            setFormDisabledStateO2(false);
            stopTimerTickO2();
          } else {
            timerO2.totalTimeElapsedO2++;
          }
          updateInfoO2();
        } 
        updateInfoO2();
      }else if(timerO2.elapsedInIntervalO2 <= currentIntervalDurationO2 && timerO2.isBreak8O2){
        timerO2.elapsedInIntervalO2++;
        if(timerO2.elapsedInIntervalO2 > currentIntervalDurationO2 && timerO2.isBreak8O2){
            if (!ismuteO2) {
                audioObjects.hold.muted = false;
                audioObjects.hold.play();
          }
          timerO2.isBreak9O2 = true;
          timerO2.isBreak8O2 = false;
          timerO2.isFinishedO2 = timerO2.intervalsDoneO2 === timerSettingsO2.intervalCountO2;
          if (!timerO2.isFinishedO2) {
            timerO2.elapsedInIntervalO2 = 1;
          }
          if (timerO2.isFinishedO2) {
            setTimerControlsDisabledStateO2(false, true, true);
            setFormDisabledStateO2(false);
            stopTimerTickO2();
          } else {
            timerO2.totalTimeElapsedO2++;
          }
          updateInfoO2();
        } 
        updateInfoO2();
      }else if(timerO2.elapsedInIntervalO2 <= currentIntervalDurationO2 && timerO2.isBreak9O2){
        timerO2.elapsedInIntervalO2++;
        if(timerO2.elapsedInIntervalO2 > currentIntervalDurationO2 && timerO2.isBreak9O2){
          if(!ismuteO2){
              audioObjects.breathedeeply.muted = false;
              audioObjects.breathedeeply.play();
          }
          document.getElementsByClassName('gap5O2')[0].style.backgroundColor = '#ffffff';
          document.getElementsByClassName('gap5O2')[1].style.backgroundColor = '#ffffff';
          document.getElementsByClassName('gap6O2')[0].style.backgroundColor = '#49B79D';
          document.getElementsByClassName('gap6O2')[1].style.backgroundColor = '#49B79D';
          timerO2.isBreak10O2 = true;
          timerO2.isBreak9O2 = false;
          timerO2.intervalsDoneO2++;
            if (isPortuguese) {
                document.getElementById("O2Results").innerHTML += "<div class='NOfSteps'> <div>Round " + timerO2.intervalsDoneO2 + "</div><div>" + (timerO2.elapsedInIntervalO2 - 1) + " segundos</div></div>";
            } else {
                document.getElementById("O2Results").innerHTML += "<div class='NOfSteps'> <div>Round " + timerO2.intervalsDoneO2 + "</div><div>" + (timerO2.elapsedInIntervalO2 - 1) + " seconds</div></div>";
            }
            timerRefO2.value += (timerO2.elapsedInIntervalO2 - 1) + "|";
          timerO2.isFinishedO2 = timerO2.intervalsDoneO2 === timerSettingsO2.intervalCountO2;
          if (!timerO2.isFinishedO2) {
            timerO2.elapsedInIntervalO2 = 1;
          }
          if (timerO2.isFinishedO2) {
            setTimerControlsDisabledStateO2(false, true, true);
            setFormDisabledStateO2(false);
            stopTimerTickO2();
          } else {
            timerO2.totalTimeElapsedO2++;
          }
          updateInfoO2();
        } 
        updateInfoO2();
      }else if(timerO2.elapsedInIntervalO2 <= currentIntervalDurationO2 && timerO2.isBreak10O2){
        timerO2.elapsedInIntervalO2++;
        if(timerO2.elapsedInIntervalO2 > currentIntervalDurationO2 && timerO2.isBreak10O2){
            if (!ismuteO2) {
                audioObjects.hold.muted = false;
                audioObjects.hold.play();
          }
          timerO2.isBreak11O2 = true;
          timerO2.isBreak10O2 = false;
          timerO2.isFinishedO2 = timerO2.intervalsDoneO2 === timerSettingsO2.intervalCountO2;
          if (!timerO2.isFinishedO2) {
            timerO2.elapsedInIntervalO2 = 1;
          }
          if (timerO2.isFinishedO2) {
            setTimerControlsDisabledStateO2(false, true, true);
            setFormDisabledStateO2(false);
            stopTimerTickO2();
          } else {
            timerO2.totalTimeElapsedO2++;
          }
          updateInfoO2();
        } 
        updateInfoO2();
      }else if(timerO2.elapsedInIntervalO2 <= currentIntervalDurationO2 && timerO2.isBreak11O2){
        timerO2.elapsedInIntervalO2++;
        if(timerO2.elapsedInIntervalO2 > currentIntervalDurationO2 && timerO2.isBreak11O2){
          if(!ismuteO2){
              audioObjects.breathedeeply.muted = false;
              audioObjects.breathedeeply.play();
          }
          document.getElementsByClassName('gap6O2')[0].style.backgroundColor = '#ffffff';
          document.getElementsByClassName('gap6O2')[1].style.backgroundColor = '#ffffff';
          document.getElementsByClassName('gap7O2')[0].style.backgroundColor = '#49B79D';
          document.getElementsByClassName('gap7O2')[1].style.backgroundColor = '#49B79D';
          timerO2.isBreak12O2 = true;
          timerO2.isBreak11O2 = false;
          timerO2.intervalsDoneO2++;
            if (isPortuguese) {
                document.getElementById("O2Results").innerHTML += "<div class='NOfSteps'> <div>Round " + timerO2.intervalsDoneO2 + "</div><div>" + (timerO2.elapsedInIntervalO2 - 1) + " segundos</div></div>";
            } else {
                document.getElementById("O2Results").innerHTML += "<div class='NOfSteps'> <div>Round " + timerO2.intervalsDoneO2 + "</div><div>" + (timerO2.elapsedInIntervalO2 - 1) + " seconds</div></div>";
            }
            timerRefO2.value += (timerO2.elapsedInIntervalO2 - 1) + "|";
          timerO2.isFinishedO2 = timerO2.intervalsDoneO2 === timerSettingsO2.intervalCountO2;
          if (!timerO2.isFinishedO2) {
            timerO2.elapsedInIntervalO2 = 1;
          }
          if (timerO2.isFinishedO2) {
            setTimerControlsDisabledStateO2(false, true, true);
            setFormDisabledStateO2(false);
            stopTimerTickO2();
          } else {
            timerO2.totalTimeElapsedO2++;
          }
          updateInfoO2();
        } 
        updateInfoO2();
      }else if(timerO2.elapsedInIntervalO2 <= currentIntervalDurationO2 && timerO2.isBreak12O2){
        timerO2.elapsedInIntervalO2++;
        if(timerO2.elapsedInIntervalO2 > currentIntervalDurationO2 && timerO2.isBreak12O2){
            if (!ismuteO2) {
                audioObjects.hold.muted = false;
                audioObjects.hold.play();
          }
          timerO2.isBreak13O2 = true;
          timerO2.isBreak12O2 = false;
          timerO2.isFinishedO2 = timerO2.intervalsDoneO2 === timerSettingsO2.intervalCountO2;
          if (!timerO2.isFinishedO2) {
            timerO2.elapsedInIntervalO2 = 1;
          }
          if (timerO2.isFinishedO2) {
            setTimerControlsDisabledStateO2(false, true, true);
            setFormDisabledStateO2(false);
            stopTimerTickO2();
          } else {
            timerO2.totalTimeElapsedO2++;
          }
          updateInfoO2();
        } 
        updateInfoO2();
      }else if(timerO2.elapsedInIntervalO2 <= currentIntervalDurationO2 && timerO2.isBreak13O2){
        timerO2.elapsedInIntervalO2++;
        if(timerO2.elapsedInIntervalO2 > currentIntervalDurationO2 && timerO2.isBreak13O2){
          if(!ismuteO2){
              audioObjects.breathedeeply.muted = false;
              audioObjects.breathedeeply.play();
          }
          document.getElementsByClassName('gap7O2')[0].style.backgroundColor = '#ffffff';
          document.getElementsByClassName('gap7O2')[1].style.backgroundColor = '#ffffff';
          document.getElementsByClassName('gap8O2')[0].style.backgroundColor = '#49B79D';
          document.getElementsByClassName('gap8O2')[1].style.backgroundColor = '#49B79D';
          timerO2.isBreak14O2 = true;
          timerO2.isBreak13O2 = false;
          timerO2.intervalsDoneO2++;
            if (isPortuguese) {
                document.getElementById("O2Results").innerHTML += "<div class='NOfSteps'> <div>Round " + timerO2.intervalsDoneO2 + "</div><div>" + (timerO2.elapsedInIntervalO2 - 1) + " segundos</div></div>";
            } else {
                document.getElementById("O2Results").innerHTML += "<div class='NOfSteps'> <div>Round " + timerO2.intervalsDoneO2 + "</div><div>" + (timerO2.elapsedInIntervalO2 - 1) + " seconds</div></div>";
            }
            timerRefO2.value += (timerO2.elapsedInIntervalO2 - 1) + "|";
          timerO2.isFinishedO2 = timerO2.intervalsDoneO2 === timerSettingsO2.intervalCountO2;
          if (!timerO2.isFinishedO2) {
            timerO2.elapsedInIntervalO2 = 1;
          }
          if (timerO2.isFinishedO2) {
            setTimerControlsDisabledStateO2(false, true, true);
            setFormDisabledStateO2(false);
            stopTimerTickO2();
          } else {
            timerO2.totalTimeElapsedO2++;
          }
          updateInfoO2();
        } 
        updateInfoO2();
      }else if(timerO2.elapsedInIntervalO2 <= currentIntervalDurationO2 && timerO2.isBreak14O2){
        timerO2.elapsedInIntervalO2++;
        if(timerO2.elapsedInIntervalO2 > currentIntervalDurationO2 && timerO2.isBreak14O2){
            if (!ismuteO2) {
                audioObjects.hold.muted = false;
                audioObjects.hold.play();
          }
          timerO2.isBreak15O2 = true;
          timerO2.isBreak14O2 = false;
          timerO2.isFinishedO2 = timerO2.intervalsDoneO2 === timerSettingsO2.intervalCountO2;
          if (!timerO2.isFinishedO2) {
            timerO2.elapsedInIntervalO2 = 1;
          }
          if (timerO2.isFinishedO2) {
            setTimerControlsDisabledStateO2(false, true, true);
            setFormDisabledStateO2(false);
            stopTimerTickO2();
          } else {
            timerO2.totalTimeElapsedO2++;
          }
          updateInfoO2();
        } 
        updateInfoO2();
      }else if(timerO2.elapsedInIntervalO2 <= currentIntervalDurationO2 && timerO2.isBreak15O2){
      timerO2.elapsedInIntervalO2++;
      if(timerO2.elapsedInIntervalO2 > currentIntervalDurationO2 && timerO2.isBreak15O2){
        document.getElementsByClassName('gap8O2')[0].style.backgroundColor = '#ffffff';
        document.getElementsByClassName('gap8O2')[1].style.backgroundColor = '#ffffff';
        document.getElementsByClassName('gap1O2')[0].style.backgroundColor = '#49B79D';
        document.getElementsByClassName('gap1O2')[1].style.backgroundColor = '#49B79D';
        timerO2.isFinishedO2 = true;
        timerO2.isBreak15O2 = false;
        timerO2.intervalsDoneO2++;
          if (isPortuguese) {
              document.getElementById("O2Results").innerHTML += "<div class='NOfSteps'> <div>Round " + timerO2.intervalsDoneO2 + "</div><div>" + (timerO2.elapsedInIntervalO2 - 1) + " segundos</div></div>";
          } else {
              document.getElementById("O2Results").innerHTML += "<div class='NOfSteps'> <div>Round " + timerO2.intervalsDoneO2 + "</div><div>" + (timerO2.elapsedInIntervalO2 - 1) + " seconds</div></div>";
          }
          timerRefO2.value += (timerO2.elapsedInIntervalO2 - 1) + "|";
        timerO2.isFinishedO2 = timerO2.intervalsDoneO2 === timerSettingsO2.intervalCountO2;
        timerO2.elapsedInIntervalO2 = 1;
        pauseTimerO2();
          if (!ismuteO2) {
              audioObjects.normalbreath.muted = false;
              audioObjects.normalbreath.play();
        }
        setTimerControlsDisabledStateO2(true, false, false);
        timerControlsButtonsO2.start.style.color = "rgb(177, 177, 177)";
        setFormDisabledStateO2(false);
        updateInfoO2();
      } 
      updateInfoO2();
    }
  }

  function updateInfoO2() {
    statusPanelO2.timeOverviewMessageO2.style.display = timerO2.isFinishedO2 ? 'block' : null;
    statusPanelO2.elapsedInIntervalBoxO2.style.display = timerO2.isFinishedO2 || timerO2.isBreakO2 || timerO2.isBreak2O2 || timerO2.isBreak3O2 || timerO2.isBreak4O2 || timerO2.isBreak5O2 || timerO2.isBreak6O2 || timerO2.isBreak7O2 || timerO2.isBreak8O2 || timerO2.isBreak9O2 || timerO2.isBreak10O2 || timerO2.isBreak11O2 || timerO2.isBreak12O2 || timerO2.isBreak13O2 || timerO2.isBreak14O2 || timerO2.isBreak15O2 ? 'none' : null;
    statusPanelO2.elapsedInBreakIntervalBoxO2.style.display = !timerO2.isFinishedO2 && timerO2.isBreakO2 ? 'block' : null;
    statusPanelO2.elapsedInBreakIntervalBox2O2.style.display = !timerO2.isFinishedO2 && timerO2.isBreak2O2 ? 'block' : null;
    statusPanelO2.elapsedInBreakIntervalBox3O2.style.display = !timerO2.isFinishedO2 && timerO2.isBreak3O2 ? 'block' : null;
    statusPanelO2.elapsedInBreakIntervalBox4O2.style.display = !timerO2.isFinishedO2 && timerO2.isBreak4O2 ? 'block' : null;
    statusPanelO2.elapsedInBreakIntervalBox5O2.style.display = !timerO2.isFinishedO2 && timerO2.isBreak5O2 ? 'block' : null;
    statusPanelO2.elapsedInBreakIntervalBox6O2.style.display = !timerO2.isFinishedO2 && timerO2.isBreak6O2 ? 'block' : null;
    statusPanelO2.elapsedInBreakIntervalBox7O2.style.display = !timerO2.isFinishedO2 && timerO2.isBreak7O2 ? 'block' : null;
    statusPanelO2.elapsedInBreakIntervalBox8O2.style.display = !timerO2.isFinishedO2 && timerO2.isBreak8O2 ? 'block' : null;
    statusPanelO2.elapsedInBreakIntervalBox9O2.style.display = !timerO2.isFinishedO2 && timerO2.isBreak9O2 ? 'block' : null;
    statusPanelO2.elapsedInBreakIntervalBox10O2.style.display = !timerO2.isFinishedO2 && timerO2.isBreak10O2 ? 'block' : null;
    statusPanelO2.elapsedInBreakIntervalBox11O2.style.display = !timerO2.isFinishedO2 && timerO2.isBreak11O2 ? 'block' : null;
    statusPanelO2.elapsedInBreakIntervalBox12O2.style.display = !timerO2.isFinishedO2 && timerO2.isBreak12O2 ? 'block' : null;
    statusPanelO2.elapsedInBreakIntervalBox13O2.style.display = !timerO2.isFinishedO2 && timerO2.isBreak13O2 ? 'block' : null;
    statusPanelO2.elapsedInBreakIntervalBox14O2.style.display = !timerO2.isFinishedO2 && timerO2.isBreak14O2 ? 'block' : null;
    statusPanelO2.elapsedInBreakIntervalBox15O2.style.display = !timerO2.isFinishedO2 && timerO2.isBreak15O2 ? 'block' : null;
    
    if (timerO2.isBreakO2) {
      statusPanelO2.elapsedInBreakIntervalO2.textContent = timerO2.elapsedInIntervalO2;
    } else if (timerO2.isBreak2O2){
      statusPanelO2.elapsedInBreakInterval2O2.textContent = timerO2.elapsedInIntervalO2;
    }else if (timerO2.isBreak3O2){
      statusPanelO2.elapsedInBreakInterval3O2.textContent = timerO2.elapsedInIntervalO2;
    }else if (timerO2.isBreak4O2){
      statusPanelO2.elapsedInBreakInterval4O2.textContent = timerO2.elapsedInIntervalO2;
    }else if (timerO2.isBreak5O2){
      statusPanelO2.elapsedInBreakInterval5O2.textContent = timerO2.elapsedInIntervalO2;
    }else if (timerO2.isBreak6O2){
      statusPanelO2.elapsedInBreakInterval6O2.textContent = timerO2.elapsedInIntervalO2;
    }else if (timerO2.isBreak7O2){
      statusPanelO2.elapsedInBreakInterval7O2.textContent = timerO2.elapsedInIntervalO2;
    }else if (timerO2.isBreak8O2){
      statusPanelO2.elapsedInBreakInterval8O2.textContent = timerO2.elapsedInIntervalO2;
    }else if (timerO2.isBreak9O2){
      statusPanelO2.elapsedInBreakInterval9O2.textContent = timerO2.elapsedInIntervalO2;
    }else if (timerO2.isBreak10O2){
      statusPanelO2.elapsedInBreakInterval10O2.textContent = timerO2.elapsedInIntervalO2;
    }else if (timerO2.isBreak11O2){
      statusPanelO2.elapsedInBreakInterval11O2.textContent = timerO2.elapsedInIntervalO2;
    }else if (timerO2.isBreak12O2){
      statusPanelO2.elapsedInBreakInterval12O2.textContent = timerO2.elapsedInIntervalO2;
    }else if (timerO2.isBreak13O2){
      statusPanelO2.elapsedInBreakInterval13O2.textContent = timerO2.elapsedInIntervalO2;
    }else if (timerO2.isBreak14O2){
      statusPanelO2.elapsedInBreakInterval14O2.textContent = timerO2.elapsedInIntervalO2;
    }else if (timerO2.isBreak15O2){
      statusPanelO2.elapsedInBreakInterval15O2.textContent = timerO2.elapsedInIntervalO2;
    }else {
      statusPanelO2.elapsedInIntervalO2.textContent = timerO2.elapsedInIntervalO2;
    }
    statusPanelO2.intervalsDoneO2.value = timerO2.intervalsDoneO2;
  }
//---------------------------------------------------//