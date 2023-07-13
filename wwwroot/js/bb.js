//BB JS//
const songSelectBB = document.getElementById('song-selectBB');
const audioPlayerBB = document.getElementById('audio-playerBB');
var isBBON = false;
// Variable to store the timeout ID
let timeoutIdBB;


// Function to play the selected song
const playSelectedSongBB = () => {
    const selectedSongBB = songSelectBB.value;
    audioPlayerBB.src = selectedSongBB;
    if (isBBON != true) {
        audioPlayerBB.muted = false;
        audioPlayerBB.play();
        localStorage.setItem('selectedSongBB', songSelectBB.value);
        // Clear any existing timeout
        clearTimeout(timeoutIdBB);
        timeoutIdBB = setTimeout(function () {
            audioPlayerBB.pause();
            audioPlayerBB.currentTime = 0;
        }, 15000);
    }
    else {
        audioPlayerBB.muted = false;
        audioPlayerBB.loop = true;
        audioPlayerBB.play();
        clearTimeout(timeoutIdBB);
    }
};

const storedSongBB = localStorage.getItem('selectedSongBB');
if (storedSongBB) {
    // Set the value of the songSelect dropdown to the stored song
    songSelectBB.value = storedSongBB;
}

// Add an event listener to the songSelectBB dropdown
songSelectBB.addEventListener('change', function () {
    // Stop the currently playing song
    audioPlayerBB.pause();
    audioPlayerBB.currentTime = 0;

    // Play the selected song
    playSelectedSongBB();
});

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
        audioPlayerBB.currentTime = 0
        timerControlsButtonsBB.pauseBB.style.display = 'none';
        timerControlsButtonsBB.startBB.style.display = 'inline';
        setFormDisabledStateBB(false);
        setTimerControlsDisabledStateBB(false, true, true);
        timerControlsButtonsBB.stopBB.style.color = "rgb(177, 177, 177)";
        document.getElementById('BBSave').disabled = true;
        document.getElementById('BBSave').style.color = 'rgb(177, 177, 177)';
        stopTimerTickBB();
        resetTimerBB();
        isBBON = false;
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
var audioListBB = []
audioListBB.push(new Audio('/sounds/breathein.mp3'));
audioListBB.push(new Audio('/sounds/holdyourbreath.mp3'));
audioListBB.push(new Audio('/sounds/exhale.mp3'));
audioListBB.push(new Audio('/sounds/hold.mp3'));         

var audioBB = document.getElementById("audioBB"),
    muteBB = document.getElementById("muteBB"),
    ismuteBB = false;

audioPlayerBB.loop = true;

var audioSongBB = document.getElementById("songBB"),
    muteSongBB = document.getElementById("songMuteBB"),
    isSongMuteBB = false;



// Get the volumeVbre bar element
const volumeVoiceBB = document.getElementById('volumeVoiceBB');

// Add an event listener for the volumeVbre change event
volumeVoiceBB.addEventListener('input', function () {
    // Get the current volumeVbre value
    const volumeVbb = parseFloat(volumeVoiceBB.value);

    // Check if volumeVbre is 0 and mute the media if necessary
    if (volumeVbb === 0) {
        audioListBB[0].muted = true;
        audioListBB[1].muted = true;
        audioListBB[2].muted = true;
        audioListBB[3].muted = true;
        audioBB.style.display = "none";
        muteBB.style.display = "block";
        ismuteBB = true;
    } else {
        audioListBB[0].muted = false;
        audioListBB[1].muted = false;
        audioListBB[2].muted = false;
        audioListBB[3].muted = false;
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
        audioPlayerBB.muted = true;
        audioSongBB.style.display = "none";
        muteSongBB.style.display = "block";
        isSongMuteBB = true;
    } else {
        audioPlayerBB.muted = false;
        muteSongBB.style.display = "none";
        audioSongBB.style.display = "block";
        isSongMuteBB = false;
    }
});


var minusBtnBB = document.getElementById("minusBB").style.display = "none";
    plusBtnBB = document.getElementById("plusBB").style.display = "none";
    numberBB = 4, /// numberBB value
    minBB = 4, /// minBB numberBB
    maxBB = 30;

minusBtnBB.onclick = function(){
  if (numberBB>minBB){
    numberBB = numberBB-2; /// Minus 1 of the numberBB
    formSettingsFieldsBB.intervalDurationBB.value = numberBB ; /// Display the value in place of the numberBB
    //fix here to change pranayama type
    formSettingsFieldsBB.breakDurationBB.value = formSettingsFieldsBB.intervalDurationBB.value/2;
    formSettingsFieldsBB.breakDuration2BB.value = formSettingsFieldsBB.intervalDurationBB.value;
    formSettingsFieldsBB.breakDuration3BB.value = formSettingsFieldsBB.intervalDurationBB.value/2;
    setTimerSettingsBB(9999, formSettingsFieldsBB.intervalDurationBB.value, true, formSettingsFieldsBB.breakDurationBB.value, true, formSettingsFieldsBB.breakDuration2BB.value, true, formSettingsFieldsBB.breakDuration3BB.value);
  }
}

plusBtnBB.onclick = function(){
  if(numberBB<maxBB){
    numberBB = numberBB+2;
    formSettingsFieldsBB.intervalDurationBB.value = numberBB ; /// Display the value in place of the numberBB
    //fix here to change pranayama type
    formSettingsFieldsBB.breakDurationBB.value = formSettingsFieldsBB.intervalDurationBB.value/2;
    formSettingsFieldsBB.breakDuration2BB.value = formSettingsFieldsBB.intervalDurationBB.value;
    formSettingsFieldsBB.breakDuration3BB.value = formSettingsFieldsBB.intervalDurationBB.value/2;
    setTimerSettingsBB(9999, formSettingsFieldsBB.intervalDurationBB.value, true, formSettingsFieldsBB.breakDurationBB.value, true, formSettingsFieldsBB.breakDuration2BB.value, true, formSettingsFieldsBB.breakDuration3BB.value);

  }    
}

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
    minusBtnBB.disabled = disabled;
    plusBtnBB.disabled = disabled;
}

function startTimerBB() {
    if(intBB!==null){
      clearInterval(intBB);
    }
    intBB = setInterval(displayTimerBB,1000);
    setFormDisabledStateBB(true);
    setTimerControlsDisabledStateBB(true, false, true);
    timerControlsButtonsBB.stopBB.style.color = "rgb(177, 177, 177)";
    if(timerBB.isBreak3BB){
        if (!ismuteBB) {
            audioListBB[0].muted = false;
            audioListBB[0].play();
      }
    }
    isBBON = true;
    if (isSongMuteBB != true) {
        playSelectedSongBB();
    }
    if (timerBB.isFinishedBB) {
      resetTimerBB();
    }
    startTimerTickBB();     
    timerControlsButtonsBB.startBB.style.display = 'none';
    timerControlsButtonsBB.pauseBB.style.display = 'inline';
    document.getElementById('BBSave').disabled = true;
    document.getElementById('BBSave').style.color = 'rgb(177, 177, 177)';
    document.getElementById('bbSettings').disabled = true;
    document.getElementById('bbSettings').style.color = 'rgb(177, 177, 177)';
}

function pauseTimerBB() {
    clearInterval(intBB);
    setTimerControlsDisabledStateBB(false, true, false);
    document.getElementById('stopBtnBB').style.color = '#990000';
    timerControlsButtonsBB.pauseBB.style.display = 'none'; 
    timerControlsButtonsBB.startBB.style.display = 'inline';
    if (isSongMuteBB != true) {
        audioPlayerBB.pause();
    }
    stopTimerTickBB();
    isBBON = false;
    document.getElementById('BBDate').value = date;
    document.getElementById('BBSave').disabled = false;
    document.getElementById('BBSave').style.color = '#49B79D';
    document.getElementById('bbSettings').disabled = false;
    document.getElementById('bbSettings').style.color = '#49B79D';
}

function stopTimerBB() {
    clearInterval(intBB);
    [secondsBB,minutesBB,hoursBB] = [0,0,0];
    timerRefBB.value = '00 : 00 : 00';
    if (isSongMuteBB != true) {
        audioPlayerBB.pause();
    }
    audioPlayerBB.currentTime = 0
    timerControlsButtonsBB.pauseBB.style.display = 'none'; 
    timerControlsButtonsBB.startBB.style.display = 'inline';
    setFormDisabledStateBB(false);
    setTimerControlsDisabledStateBB(false, true, true);
    timerControlsButtonsBB.stopBB.style.color = "rgb(177, 177, 177)";
    stopTimerTickBB();
    resetTimerBB();
    timerControlsButtonsBB.stopBB.disabled = true;
    isBBON = false;
    document.getElementById('BBSave').disabled = true;
    document.getElementById('BBSave').style.color = 'rgb(177, 177, 177)';
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
      if(timerBB.elapsedInIntervalBB > currentIntervalDurationBB && timerBB.isBreak3BB){
          if (!ismuteBB) {
            audioListBB[3].muted = false;
            audioListBB[3].play();
        }
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
      if(timerBB.elapsedInIntervalBB > currentIntervalDurationBB && timerBB.isBreakBB){
        if(!ismuteBB){
            audioListBB[2].muted = false;
            audioListBB[2].play();
        }
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
      if(timerBB.elapsedInIntervalBB > currentIntervalDurationBB && timerBB.isBreak2BB){
          if (!ismuteBB) {
              audioListBB[3].muted = false;
              audioListBB[3].play();
        }
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
      if(timerBB.elapsedInIntervalBB > currentIntervalDurationBB && timerBB.isBreak4BB){
          if (!ismuteBB) {
              audioListBB[0].muted = false;
              audioListBB[0].play();
        }
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
    
    if (timerBB.isBreakBB) {
      statusPanelBB.elapsedInBreakIntervalBB.textContent = timerBB.elapsedInIntervalBB;
    } else if (timerBB.isBreak2BB){
      statusPanelBB.elapsedInBreakInterval2BB.textContent = timerBB.elapsedInIntervalBB;
    }else if (timerBB.isBreak4BB){
      statusPanelBB.elapsedInBreakInterval3BB.textContent = timerBB.elapsedInIntervalBB;
    }else {
      statusPanelBB.elapsedInIntervalBB.textContent = timerBB.elapsedInIntervalBB;
    }
    statusPanelBB.intervalsDoneBB.value = timerBB.intervalsDoneBB;

}
//---------------------------------------------------//