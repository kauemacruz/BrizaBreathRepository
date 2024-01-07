//BB JS//
const BBball = document.getElementById('BBball');
const BBballText = document.getElementById('BBballText');

function BBchangeBall(scale, duration) {
    BBball.style.transition = `transform ${duration}s ease`;
    BBball.style.transform = `scale(${scale})`;
}

const BBtimeInput = document.getElementById('BBtimeInput');
const BBcountdownDisplay = document.getElementById('BBcountdownDisplay');
let BBcountdown;
let BBtimeRemaining = Infinity;
let BBisPaused = false;
var BBroundTime;
var BBremainingRounds;
// Populate the dropdown with options
for (let BBi = 2; BBi <= 60; BBi++) { // assuming 1 to 60 minutes
    let BBoption = document.createElement('option');
    BBoption.value = BBi * 60;
    if (isPortuguese) {
        BBoption.textContent = BBi + ' minutos';
    } else {
        BBoption.textContent = BBi + ' minutes';
    }
    BBtimeInput.appendChild(BBoption);
}

const BBmodal = document.getElementById("BBmodal");
const BBcloseModal = document.getElementById("BBcloseModal");
const BBBTN = document.getElementById("BBBTN");

function BBopenmodal() {
    BBmodal.style.display = "block";
    audioObjects.inhale.load();
    audioObjects.exhale.load();
    audioObjects.hold.load();
}
// Function to close the modal
function BBclose() {
    BBmodal.style.display = "none";
    clearInterval(intBB);
    [secondsBB, minutesBB, hoursBB] = [0, 0, 0];
    timerRefBB.value = '00 : 00 : 00';
    if (!audioPlayerBRT.muted) {
        audioPlayerBRT.pause();
    }
    audioPlayerBRT.currentTime = 0
    timerControlsButtonsBB.pauseBB.style.display = 'none';
    timerControlsButtonsBB.startBB.style.display = 'inline';
    setFormDisabledStateBB(false);
    setTimerControlsDisabledStateBB(false, true, true);
    timerControlsButtonsBB.stopBB.style.color = "rgb(177, 177, 177)";
    document.getElementById('BBSettings').disabled = false;
    document.getElementById('BBSettings').style.color = '#49B79D';
    stopTimerTickBB();
    resetTimerBB();
    timerControlsButtonsBB.stopBB.disabled = true;
    isBBON = false;
    document.getElementById('BBResultSaved').innerHTML = "";
    clearInterval(BBcountdown);
    BBisPaused = false;
    BBtimeInput.classList.remove('CountdownHidden');
    BBcountdownDisplay.classList.add('CountdownHidden');
    BBchangeBall(1, 1);
}
// Event listener for closing the modal
BBcloseModal.addEventListener("click", BBclose);
BBBTN.onclick = function () {
    BBopenmodal();
}
$(function () {
    $('#BBForm').on('submit', function (e) {
        e.preventDefault(); // Prevent the default form submission

        var formData = new FormData(this); // Get the form

        $.ajax({
            url: "/",
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function (result) {
                $('#BBResultSaved').html(result); // Update the result section with the server response
            }
        });
        clearInterval(intBB);
        [secondsBB, minutesBB, hoursBB] = [0, 0, 0];
        timerRefBB.value = '00 : 00 : 00';
        audioPlayerBRT.currentTime = 0
        timerControlsButtonsBB.pauseBB.style.display = 'none';
        timerControlsButtonsBB.startBB.style.display = 'inline';
        setFormDisabledStateBB(false);
        setTimerControlsDisabledStateBB(false, true, true);
        timerControlsButtonsBB.stopBB.style.color = "rgb(177, 177, 177)";
        document.getElementById('BBSave').disabled = true;
        document.getElementById('BBSave').style.color = 'rgb(177, 177, 177)';
        stopTimerTickBB();
        resetTimerBB();
        BBtimeInput.classList.remove('CountdownHidden');
        BBcountdownDisplay.classList.add('CountdownHidden');
    });
});

let
  formSettingsFieldsBB,
  timerControlsButtonsBB,
  statusPanelBB,
  timerBB,
  timerSettingsBB;

function setTimerSettingsBB(
  intervalCountBB = timerSettingsBB.intervalCountBB,
  intervalDurationBB = timerSettingsBB.intervalDurationBB,
  enableBreakBB = timerSettingsBB.enableBreakBB,
  breakDurationBB = timerSettingsBB.breakDurationBB,
  enableBreak2BB = timerSettingsBB.enableBreak2BB,
  breakDuration2BB = timerSettingsBB.breakDuration2BB,
  enableBreak3BB = timerSettingsBB.enableBreak3BB,
  breakDuration3BB = timerSettingsBB.breakDuration3BB
) {
  timerSettingsBB = {
    intervalCountBB,
    intervalDurationBB,
    enableBreakBB,
    breakDurationBB,
    enableBreak2BB,
    breakDuration2BB,
    enableBreak3BB,
    breakDuration3BB
  };
}
function resetTimerBB() {
  timerBB = {
    totalTimeElapsedBB: 0,
    elapsedInIntervalBB: 0,
    intervalsDoneBB: 0,
    isBreak3BB: true,
    isBreakBB: false,
    isBreak2BB: false,
    isBreak4BB: false,
    isFinishedBB: false
  };
  updateInfoBB();
}
var inhaleBB = 4;
var holdBB = inhaleBB/2;
var exhaleBB = inhaleBB*1.5;
var hold2BB = inhaleBB/2;
setTimerSettingsBB(9999, inhaleBB, true, holdBB, true, exhaleBB, true, hold2BB);
initializeTimerControlsBB();
initializeStatusPanelBB();
initializeTimerSettingsFormBB();
resetTimerBB();
let [secondsBB, minutesBB, hoursBB] = [0, 0, 0];
let timerRefBB = document.getElementById('timerDisplayBB');
let intBB = null;
document.getElementById('BBSave').disabled = true;
document.getElementById('BBSave').style.color = 'rgb(177, 177, 177)';  
var audioBB = document.getElementById("audioBB"),
    muteBB = document.getElementById("muteBB"),
    ismuteBB = false;
audioPlayerBRT.loop = true;
var audioSongBB = document.getElementById("songBB"),
    muteSongBB = document.getElementById("songMuteBB");
// Get the volumeVbre bar element
const volumeVoiceBB = document.getElementById('volumeVoiceBB');

// Add an event listener for the volumeVbre change event
volumeVoiceBB.addEventListener('input', function () {
    // Get the current volumeVbre value
    const volumeVbb = parseFloat(volumeVoiceBB.value);

    // Check if volumeVbre is 0 and mute the media if necessary
    if (volumeVbb === 0) {
        audioObjects.inhale.muted = true;
        audioObjects.exhale.muted = true;
        audioObjects.hold.muted = true;
        audioBB.style.display = "none";
        muteBB.style.display = "block";
        ismuteBB = true;
    } else {
        audioObjects.inhale.muted = false;
        audioObjects.exhale.muted = false;
        audioObjects.hold.muted = false;
        muteBB.style.display = "none";
        audioBB.style.display = "block";
        ismuteBB = false;
    }
});
// Get the volumeSbre bar element
const volumeSongBB = document.getElementById('volumeSongBB');

// Add an event listener for the volumeSbre change event
volumeSongBB.addEventListener('input', function () {
    // Get the current volumeSbre value
    const volumeSbb = parseFloat(volumeSongBB.value);

    // Check if volumeSbre is 0 and mute the media if necessary
    if (volumeSbb === 0) {
        audioPlayerBRT.muted = true;
        audioSongBB.style.display = "none";
        muteSongBB.style.display = "block";
    } else {
        audioPlayerBRT.muted = false;
        muteSongBB.style.display = "none";
        audioSongBB.style.display = "block";
    }
});
function initializeTimerSettingsFormBB() {
    const oneDayInSecondsBB = 60 * 60 * 24;
      let lastUserSetEnableBreakBB = timerSettingsBB.enableBreakBB;
      let lastUserSetEnableBreak2BB = timerSettingsBB.enableBreak2BB;
      let lastUserSetEnableBreak3BB = timerSettingsBB.enableBreak3BB;

      formSettingsFieldsBB = {
        intervalCountBB: document.getElementById('intervalCountInputBB'),
        intervalDurationBB: document.getElementById('intervalDurationInputBB'),
        enableBreakBB: document.getElementById('enableBreakInputBB'),
        breakDurationBB: document.getElementById('breakDurationInputBB'),
        enableBreak2BB: document.getElementById('enableBreakInput2BB'),
        breakDuration2BB: document.getElementById('breakDurationInput2BB'),
        enableBreak3BB: document.getElementById('enableBreakInput3BB'),
        breakDuration3BB: document.getElementById('breakDurationInput3BB'),
      };

      formSettingsFieldsBB.intervalCountBB.value = timerSettingsBB.intervalCountBB;
      formSettingsFieldsBB.intervalDurationBB.value = timerSettingsBB.intervalDurationBB;
      formSettingsFieldsBB.enableBreakBB.checked = timerSettingsBB.enableBreakBB;
      formSettingsFieldsBB.breakDurationBB.value = timerSettingsBB.breakDurationBB;
      formSettingsFieldsBB.enableBreak2BB.checked = timerSettingsBB.enableBreak2BB;
      formSettingsFieldsBB.breakDuration2BB.value = timerSettingsBB.breakDuration2BB;
      formSettingsFieldsBB.enableBreak3BB.checked = timerSettingsBB.enableBreak3BB;
      formSettingsFieldsBB.breakDuration3BB.value = timerSettingsBB.breakDuration3BB;

    function getNumberInBoundsOrDefaultBB(value, minBB, maxBB, def = 1) {
        const valueAsNumberBB = parseInt(value);
        return isNaN(valueAsNumberBB) ? def : Math.max(minBB, Math.min(valueAsNumberBB, maxBB));
    }

    function setBreakDurationLineDisplayBB(displayed) {
        const breakDurationInputLineEltBB = document.getElementById('breakDurationInputLineBB');
        breakDurationInputLineEltBB.style.display = displayed ? null : 'none';
        const breakDurationInputLineElt2BB = document.getElementById('breakDurationInputLine2BB');
        breakDurationInputLineElt2BB.style.display = displayed ? null : 'none';
        const breakDurationInputLineElt3BB = document.getElementById('breakDurationInputLine3BB');
        breakDurationInputLineElt3BB.style.display = displayed ? null : 'none';
    }

    formSettingsFieldsBB.intervalCountBB.addEventListener('input', () => {
        const intervalCountBB = getNumberInBoundsOrDefaultBB(formSettingsFieldsBB.intervalCountBB.value, 1, 9999),
        hasOneIntervalBB = intervalCountBB === 1,
        hasBreakBB = hasOneIntervalBB ? false : lastUserSetEnableBreakBB;

        formSettingsFieldsBB.enableBreakBB.disabled = hasOneIntervalBB === true;
        formSettingsFieldsBB.enableBreakBB.checked = hasBreakBB;

        setBreakDurationLineDisplayBB(hasBreakBB);

        setTimerSettingsBB(intervalCountBB, undefined, hasBreakBB);
        updateInfoBB();
    });

    formSettingsFieldsBB.intervalDurationBB.addEventListener('input', () => {
        setTimerSettingsBB(undefined, getNumberInBoundsOrDefaultBB(formSettingsFieldsBB.intervalDurationBB.value, 1, oneDayInSecondsBB));
        updateInfoBB();
    });

    formSettingsFieldsBB.enableBreakBB.addEventListener('change', () => {
        const enableBreakBB = formSettingsFieldsBB.enableBreakBB.checked;

        lastUserSetEnableBreakBB = enableBreakBB;
        setBreakDurationLineDisplayBB(enableBreakBB);
        setTimerSettingsBB(undefined, undefined, enableBreakBB);
        updateInfoBB();
    });

    formSettingsFieldsBB.breakDurationBB.addEventListener('input', () => {
        setTimerSettingsBB( undefined, undefined, undefined,
        getNumberInBoundsOrDefaultBB(formSettingsFieldsBB.breakDurationBB.value, 1, oneDayInSecondsBB)
        );
        updateInfoBB();
    });

    formSettingsFieldsBB.enableBreak2BB.addEventListener('change', () => {
        const enableBreak2BB = formSettingsFieldsBB.enableBreak2BB.checked;

        lastUserSetEnableBreak2BB = enableBreak2BB;
        setBreakDurationLineDisplayBB(enableBreak2BB);
        setTimerSettingsBB(undefined, undefined, undefined, undefined, enableBreak2BB);
        updateInfoBB();
    });

    formSettingsFieldsBB.breakDuration2BB.addEventListener('input', () => {
        setTimerSettingsBB(undefined, undefined, undefined, undefined, undefined,
        getNumberInBoundsOrDefaultBB(formSettingsFieldsBB.breakDuration2BB.value, 1, oneDayInSecondsBB)
        );
        updateInfoBB();
    });

    formSettingsFieldsBB.enableBreak3BB.addEventListener('change', () => {
        const enableBreak3BB = formSettingsFieldsBB.enableBreak3BB.checked;

        lastUserSetEnableBreak3BB = enableBreak2BB;
        setBreakDurationLineDisplayBB(enableBreak3BB);
        setTimerSettingsBB(undefined, undefined, undefined, undefined, undefined, undefined, enableBreak3BB);
        updateInfoBB();
    });

    formSettingsFieldsBB.breakDuration3BB.addEventListener('input', () => {
        setTimerSettingsBB(
        undefined, undefined, undefined, undefined, undefined, undefined, undefined,
        getNumberInBoundsOrDefaultBB(formSettingsFieldsBB.breakDuration3BB.value, 1, oneDayInSecondsBB)
        );
        updateInfoBB();
    });
}

  function initializeTimerControlsBB() {
    timerControlsButtonsBB = {
      startBB: document.getElementById('startBtnBB'),
      pauseBB: document.getElementById('pauseBtnBB'),
      stopBB: document.getElementById('stopBtnBB'),
    };

    setTimerControlsDisabledStateBB(false, true, true);

    timerControlsButtonsBB.startBB.addEventListener('click', startTimerBB);
    timerControlsButtonsBB.pauseBB.addEventListener('click', pauseTimerBB);
    timerControlsButtonsBB.stopBB.addEventListener('click', stopTimerBB);
}

function initializeStatusPanelBB() {
    statusPanelBB = {
      timeOverviewMessageBB: document.getElementById('timeOverviewMessageBB'),

      elapsedInIntervalBoxBB: document.getElementById('elapsedInIntervalBoxBB'),
      elapsedInBreakIntervalBoxBB: document.getElementById('elapsedInBreakIntervalBoxBB'),
      elapsedInIntervalBB: document.getElementById('elapsedInIntervalBB'),
      elapsedInBreakIntervalBB: document.getElementById('elapsedInBreakIntervalBB'),
      elapsedInBreakIntervalBox2BB: document.getElementById('elapsedInBreakIntervalBox2BB'),
      elapsedInBreakInterval2BB: document.getElementById('elapsedInBreakInterval2BB'),
      elapsedInBreakIntervalBox3BB: document.getElementById('elapsedInBreakIntervalBox3BB'),
      elapsedInBreakInterval3BB: document.getElementById('elapsedInBreakInterval3BB'),

      intervalsDoneBB: document.getElementById('intervalsDoneBB'),
    };
}

function setTimerControlsDisabledStateBB(startBB, pauseBB, stopBB) {
    timerControlsButtonsBB.startBB.disabled = startBB;
    timerControlsButtonsBB.pauseBB.disabled = pauseBB;
    timerControlsButtonsBB.stopBB.disabled = stopBB;
}

function setFormDisabledStateBB(disabled) {
    formSettingsFieldsBB.intervalCountBB.disabled = disabled;
    formSettingsFieldsBB.intervalDurationBB.disabled = disabled;
    formSettingsFieldsBB.enableBreakBB.disabled = disabled || timerSettingsBB.intervalCountBB === 1;
    formSettingsFieldsBB.breakDurationBB.disabled = disabled;
    formSettingsFieldsBB.enableBreak2BB.disabled = disabled
    formSettingsFieldsBB.breakDuration2BB.disabled = disabled;
    formSettingsFieldsBB.enableBreak3BB.disabled = disabled
    formSettingsFieldsBB.breakDuration3BB.disabled = disabled;
}

function startTimerBB() {
    if(intBB!==null){
      clearInterval(intBB);
    }
    setFormDisabledStateBB(true);
    setTimerControlsDisabledStateBB(true, true, true);
    setTimeout(() => {
        setTimerControlsDisabledStateBB(true, false, true);
    }, 2000);
    timerControlsButtonsBB.stopBB.style.color = "rgb(177, 177, 177)";
    if(timerBB.isBreak3BB){
        if (!ismuteBB) {
            audioObjects.bell.muted = false;
            audioObjects.bell.play();
            setTimeout(() => {
                audioObjects.inhale.muted = false;
                audioObjects.inhale.play();
            }, 1500);    
        }
        setTimeout(() => {
            BBchangeBall(1.5, timerSettingsBB.intervalDurationBB);
        }, 1500); 
    }
    if (!audioPlayerBRT.muted) {
        playSelectedSongBRT(true);
    }
    if (timerBB.isFinishedBB) {
      resetTimerBB();
    }
    setTimeout(() => {
        setTimeout(() => {
            intBB = setInterval(displayTimerBB, 1000);
        }, 1000);
        startTimerTickBB();
        if (BBisPaused) {
            // Resume from paused state
            BBstartTimer(BBtimeRemaining);
            BBisPaused = false;
        } else {
            // Start a new timer
            clearInterval(BBcountdown);
            BBtimeRemaining = BBtimeInput.value === '∞' ? Infinity : parseInt(BBtimeInput.value);
            BBroundTime = parseInt(timerSettingsBB.intervalDurationBB) + parseInt(timerSettingsBB.breakDurationBB) + parseInt(timerSettingsBB.breakDuration2BB) + parseInt(timerSettingsBB.breakDuration3BB);
            BBremainingRounds = BBtimeRemaining / BBroundTime;
            BBcountdownDisplay.textContent = '';
            BBstartTimer(BBtimeRemaining);
        }
    }, 1700);  
    timerControlsButtonsBB.startBB.style.display = 'none';
    timerControlsButtonsBB.pauseBB.style.display = 'inline';
    document.getElementById('BBSave').disabled = true;
    document.getElementById('BBSave').style.color = 'rgb(177, 177, 177)';
    document.getElementById('BBSettings').disabled = true;
    document.getElementById('BBSettings').style.color = 'rgb(177, 177, 177)';
}
function BBstartTimer(BBduration) {
    BBcountdown = setInterval(function () {
        if (BBduration > 0 && BBduration !== Infinity) {
            BBduration--;
            BBtimeRemaining = BBduration;
            let BBContdownminutes = Math.floor(BBduration / 60);
            let BBContdownseconds = BBduration % 60;
            BBcountdownDisplay.textContent = `${BBContdownminutes}:${BBContdownseconds.toString().padStart(2, '0')}`;
            BBtimeInput.classList.add('CountdownHidden');
            BBcountdownDisplay.classList.remove('CountdownHidden');
        } else if (Math.round(BBremainingRounds + 1) == timerBB.intervalsDoneBB) {
            clearInterval(BBcountdown);
            if (BBduration !== Infinity) {
                BBcountdownDisplay.textContent = 'Back to normal breathing';
                if (!ismuteBB) {
                    audioObjects.bell.muted = false;
                    audioObjects.bell.play();
                }
                clearInterval(intBB);
                setTimerControlsDisabledStateBB(true, true, false);
                document.getElementById('stopBtnBB').style.color = '#990000';
                timerControlsButtonsBB.pauseBB.style.display = 'none';
                timerControlsButtonsBB.startBB.style.display = 'inline';
                timerControlsButtonsBB.startBB.style.color = "rgb(177, 177, 177)";
                document.getElementById('BBSettings').disabled = false;
                document.getElementById('BBSettings').style.color = '#49B79D';
                if (!audioPlayerBRT.muted) {
                    audioPlayerBRT.pause();
                }
                stopTimerTickBB();
                document.getElementById('BBDate').value = date;
                document.getElementById('BBSave').disabled = false;
                document.getElementById('BBSave').style.color = '#49B79D';
                clearInterval(BBcountdown);
                BBisPaused = false;
                setTimeout(() => {
                    audioObjects.normalbreath.muted = false;
                    audioObjects.normalbreath.play();
                }, 1000);
            }
        } else if (BBduration == Infinity) {
            BBcountdownDisplay.textContent = '∞';
            BBtimeInput.classList.add('CountdownHidden');
            BBcountdownDisplay.classList.remove('CountdownHidden');
        }
    }, 1000);
}
function pauseTimerBB() {
    clearInterval(intBB);
    setTimerControlsDisabledStateBB(false, true, false);
    document.getElementById('stopBtnBB').style.color = '#990000';
    timerControlsButtonsBB.pauseBB.style.display = 'none'; 
    timerControlsButtonsBB.startBB.style.display = 'inline';
    if (!audioPlayerBRT.muted) {
        audioPlayerBRT.pause();
    }
    stopTimerTickBB();
    document.getElementById('BBDate').value = date;
    document.getElementById('BBSave').disabled = false;
    document.getElementById('BBSave').style.color = '#49B79D';
    document.getElementById('BBSettings').disabled = false;
    document.getElementById('BBSettings').style.color = '#49B79D';
    clearInterval(BBcountdown);
    BBisPaused = true;
    BBchangeBall(1, 1);
}

function stopTimerBB() {
    clearInterval(intBB);
    [secondsBB,minutesBB,hoursBB] = [0,0,0];
    timerRefBB.value = '00 : 00 : 00';
    if (!audioPlayerBRT.muted) {
        audioPlayerBRT.pause();
    }
    audioPlayerBRT.currentTime = 0
    timerControlsButtonsBB.pauseBB.style.display = 'none'; 
    timerControlsButtonsBB.startBB.style.display = 'inline';
    setFormDisabledStateBB(false);
    setTimerControlsDisabledStateBB(false, true, true);
    timerControlsButtonsBB.stopBB.style.color = "rgb(177, 177, 177)";
    stopTimerTickBB();
    resetTimerBB();
    timerControlsButtonsBB.stopBB.disabled = true;
    document.getElementById('BBSave').disabled = true;
    document.getElementById('BBSave').style.color = 'rgb(177, 177, 177)';
    timerControlsButtonsBB.startBB.style.color = '#49B79D';
    clearInterval(BBcountdown);
    BBisPaused = false;
    BBtimeInput.classList.remove('CountdownHidden');
    BBcountdownDisplay.classList.add('CountdownHidden');
    BBchangeBall(1, 1);

}

function displayTimerBB(){
    secondsBB++;
    if(secondsBB == 60){
      secondsBB = 0;
      minutesBB++;
      if(minutesBB == 60){
        minutesBB = 0;
        hoursBB++;
      }
    }
    let hBB = hoursBB < 10 ? "0" + hoursBB : hoursBB;
    let mBB = minutesBB < 10 ? "0" + minutesBB : minutesBB;
    let sBB = secondsBB < 10 ? "0" + secondsBB : secondsBB;
    timerRefBB.value = `${hBB} : ${mBB} : ${sBB}`;
}

function startTimerTickBB() {
    timerBB.intervalId = setInterval(onTimerTickBB, 1000);
}

function stopTimerTickBB() {
    clearInterval(timerBB.intervalId);
}

function onTimerTickBB() {
    const currentIntervalDurationBB = timerBB.isBreakBB ? timerSettingsBB.breakDurationBB : timerBB.isBreak2BB ? timerSettingsBB.breakDuration2BB : timerBB.isBreak4BB ? timerSettingsBB.breakDuration3BB : timerSettingsBB.intervalDurationBB;
    if (timerBB.elapsedInIntervalBB <= currentIntervalDurationBB && timerBB.isBreak3BB) {
        timerBB.elapsedInIntervalBB++;
        if (timerBB.elapsedInIntervalBB == currentIntervalDurationBB && timerBB.isBreak3BB) {
            if (!ismuteBB) {
                audioObjects.hold.muted = false;
                audioObjects.hold.play();
            }
            BBchangeBall(1.3, timerSettingsBB.breakDurationBB);
        }
      if(timerBB.elapsedInIntervalBB > currentIntervalDurationBB && timerBB.isBreak3BB){
        timerBB.isBreakBB = true;  
        timerBB.isBreak3BB = false;
        timerBB.isFinishedBB = timerBB.intervalsDoneBB === timerSettingsBB.intervalCountBB;
        if (!timerBB.isFinishedBB) {
            timerBB.elapsedInIntervalBB = 1;
        }
        if (timerBB.isFinishedBB) {
          setTimerControlsDisabledStateBB(false, true, true);
          setFormDisabledStateBB(false);
          stopTimerTickBB();
        } else {
          timerBB.totalTimeElapsedBB++;
        }
        updateInfoBB();
      } 
      updateInfoBB();
    }else if(timerBB.elapsedInIntervalBB <= currentIntervalDurationBB && timerBB.isBreakBB){
        timerBB.elapsedInIntervalBB++;
        if (timerBB.elapsedInIntervalBB == currentIntervalDurationBB && timerBB.isBreakBB) {
            if (!ismuteBB) {
                audioObjects.exhale.muted = false;
                audioObjects.exhale.play();
            }
            BBchangeBall(0.5, timerSettingsBB.breakDuration2BB);
        }
      if(timerBB.elapsedInIntervalBB > currentIntervalDurationBB && timerBB.isBreakBB){
        timerBB.isBreak2BB = true;
        timerBB.isBreakBB = false; 
        timerBB.isFinishedBB = timerBB.intervalsDoneBB === timerSettingsBB.intervalCountBB;
        if (!timerBB.isFinishedBB) {
            timerBB.elapsedInIntervalBB = 1;
        }
        if (timerBB.isFinishedBB) {
          setTimerControlsDisabledStateBB(false, true, true);
          setFormDisabledStateBB(false);
          stopTimerTickBB();
        } else {
          timerBB.totalTimeElapsedBB++;
        }
        updateInfoBB();
      } 
      updateInfoBB();
    }else if(timerBB.elapsedInIntervalBB <= currentIntervalDurationBB && timerBB.isBreak2BB){
        timerBB.elapsedInIntervalBB++;
        if (timerBB.elapsedInIntervalBB == currentIntervalDurationBB && timerBB.isBreak2BB) {
            if (!ismuteBB) {
                audioObjects.hold.muted = false;
                audioObjects.hold.play();
            }
            BBchangeBall(0.5, timerSettingsBB.breakDuration3BB);
        }
      if(timerBB.elapsedInIntervalBB > currentIntervalDurationBB && timerBB.isBreak2BB){
        timerBB.isBreak4BB = true;
        timerBB.isBreak2BB = false;
        timerBB.isFinishedBB = timerBB.intervalsDoneBB === timerSettingsBB.intervalCountBB;
        if (!timerBB.isFinishedBB) {
          timerBB.elapsedInIntervalBB = 1;
        }
        if (timerBB.isFinishedBB) {
          setTimerControlsDisabledStateBB(false, true, true);
          setFormDisabledStateBB(false);
          stopTimerTickBB();
        } else {
          timerBB.totalTimeElapsedBB++;
        }
        updateInfoBB();
      } 
      updateInfoBB();
    }else if(timerBB.elapsedInIntervalBB <= currentIntervalDurationBB && timerBB.isBreak4BB){
        timerBB.elapsedInIntervalBB++;
        if (timerBB.elapsedInIntervalBB == currentIntervalDurationBB && timerBB.isBreak4BB) {
            if (!ismuteBB) {
                if (Math.round(BBremainingRounds) == timerBB.intervalsDoneBB) {
                    audioObjects.inhale.muted = true;
                } else {
                    audioObjects.inhale.muted = false;
                    audioObjects.inhale.play();
                }
            }
            BBchangeBall(1.5, timerSettingsBB.intervalDurationBB);
        }
      if(timerBB.elapsedInIntervalBB > currentIntervalDurationBB && timerBB.isBreak4BB){
        timerBB.isBreak3BB = true;
        timerBB.isBreak4BB = false;
        timerBB.intervalsDoneBB++;
        timerBB.isFinishedBB = timerBB.intervalsDoneBB === timerSettingsBB.intervalCountBB;
        if (!timerBB.isFinishedBB) {
          timerBB.elapsedInIntervalBB = 1;
        }  
        if (timerBB.isFinishedBB) {
          setTimerControlsDisabledStateBB(false, true, true);
          setFormDisabledStateBB(false);
          stopTimerTickBB();
        }else {
          timerBB.totalTimeElapsedBB++;
        }
        updateInfoBB();
      } 
      updateInfoBB();
    }
}

function updateInfoBB() {
    statusPanelBB.timeOverviewMessageBB.style.display = timerBB.isFinishedBB ? 'block' : null;
    statusPanelBB.elapsedInIntervalBoxBB.style.display = timerBB.isFinishedBB || timerBB.isBreakBB || timerBB.isBreak2BB || timerBB.isBreak4BB ? 'none' : null;
    statusPanelBB.elapsedInBreakIntervalBoxBB.style.display = !timerBB.isFinishedBB && timerBB.isBreakBB ? 'block' : null;
    statusPanelBB.elapsedInBreakIntervalBox2BB.style.display = !timerBB.isFinishedBB && timerBB.isBreak2BB ? 'block' : null;
    statusPanelBB.elapsedInBreakIntervalBox3BB.style.display = !timerBB.isFinishedBB && timerBB.isBreak4BB ? 'block' : null;
    if (isPortuguese) {
        if (timerBB.isBreakBB) {
            BBballText.textContent = 'SEGURE';
        } else if (timerBB.isBreak2BB) {
            BBballText.textContent = 'EXPIRA';
        } else if (timerBB.isBreak4BB) {
            BBballText.textContent = 'SEGURE';
        } else {
            BBballText.textContent = 'INSPIRA';
        }
    } else {
        if (timerBB.isBreakBB) {
            BBballText.textContent = 'HOLD';
        } else if (timerBB.isBreak2BB) {
            BBballText.textContent = 'EXHALE';
        } else if (timerBB.isBreak4BB) {
            BBballText.textContent = 'HOLD';
        } else {
            BBballText.textContent = 'INHALE';
        }
    }
    statusPanelBB.intervalsDoneBB.value = timerBB.intervalsDoneBB;

}
//---------------------------------------------------//