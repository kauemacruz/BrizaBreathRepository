var meditationList = [];
if (isPortuguese) {
    meditationList.push(new Audio('https://brizastorage.blob.core.windows.net/audio/morningMeditation.mp3'));
    meditationList.push(new Audio('https://brizastorage.blob.core.windows.net/audio/sleepMeditation.mp3'));
} else {
    meditationList.push(new Audio('https://brizastorage.blob.core.windows.net/audio/morningMeditation.mp3'));
    meditationList.push(new Audio('https://brizastorage.blob.core.windows.net/audio/sleepMeditation.mp3'));
}

//MEDITATATION 1
document.getElementById("startBtnMED1").addEventListener('click', startMED1);
document.getElementById("pauseBtnMED1").addEventListener('click', pauseMED1);

// Update the progress bar while playing
meditationList[0].addEventListener('timeupdate', updateProgressBarMED1);
var MED1isON = false;

// Reset when the audio finishes playing
meditationList[0].addEventListener('ended', function () {
    resetMED1();
});

function startMED1() {
    document.getElementById("startBtnMED1").style.display = "none";
    document.getElementById("pauseBtnMED1").style.display = "inline";
    MED1isON = true;
    meditationList[0].muted = false;
    meditationList[0].play();
    if (MED2isON) {
        resetMED2();
    }
}

function pauseMED1() {
    document.getElementById("startBtnMED1").style.display = "inline";
    document.getElementById("pauseBtnMED1").style.display = "none";
    MED1isON = false;
    meditationList[0].pause();
}

function updateProgressBarMED1() {
    var progressBarMED1 = document.getElementById("progressBarMED1");
    var currentTimeMED1 = meditationList[0].currentTime;
    var durationMED1 = meditationList[0].duration;

    if (isNaN(durationMED1)) {
        progressBarMED1.value = 0;
    } else {
        progressBarMED1.value = (currentTimeMED1 / durationMED1) * 100;
    }
}

document.getElementById("progressBarMED1").addEventListener('input', function () {
    var progressBarMED1 = document.getElementById("progressBarMED1");
    var durationMED1 = meditationList[0].duration;

    console.log("Duration: ", durationMED1); // Debugging

    if (!isNaN(durationMED1)) {
        var seekTimeMED1 = (progressBarMED1.value / 100) * durationMED1;
        console.log("Seeking to: ", seekTimeMED1); // Debugging
        meditationList[0].currentTime = seekTimeMED1;
    } else {
        console.log("Duration is NaN"); // Debugging
    }
});
function resetMED1() {
    document.getElementById("startBtnMED1").style.display = "inline";
    document.getElementById("pauseBtnMED1").style.display = "none";
    meditationList[0].pause();
    meditationList[0].currentTime = 0;
    document.getElementById("progressBarMED1").value = 0;
    MED1isON = false;
}

//MEDITATION 2
    document.getElementById("startBtnMED2").addEventListener('click', startMED2);
document.getElementById("pauseBtnMED2").addEventListener('click', pauseMED2);

// Update the progress bar while playing
meditationList[1].addEventListener('timeupdate', updateProgressBarMED2);
var MED2isON = false;

// Reset when the audio finishes playing
meditationList[1].addEventListener('ended', function () {
    resetMED2();
});

function startMED2() {
    document.getElementById("startBtnMED2").style.display = "none";
    document.getElementById("pauseBtnMED2").style.display = "inline";
    MED2isON = true;
    meditationList[1].muted = false;
    meditationList[1].play();
    if (MED1isON) {
        resetMED1();
    }
}

function pauseMED2() {
    document.getElementById("startBtnMED2").style.display = "inline";
    document.getElementById("pauseBtnMED2").style.display = "none";
    MED2isON = false;
    meditationList[1].pause();
}

function updateProgressBarMED2() {
    var progressBarMED2 = document.getElementById("progressBarMED2");
    var currentTimeMED2 = meditationList[1].currentTime;
    var durationMED2 = meditationList[1].duration;

    if (isNaN(durationMED2)) {
        progressBarMED2.value = 0;
    } else {
        progressBarMED2.value = (currentTimeMED2 / durationMED2) * 100;
    }
}

// Seek to the specified time when the progress bar is clicked
document.getElementById("progressBarMED2").addEventListener('input', function () {
    var progressBarMED2 = document.getElementById("progressBarMED2");
    var durationMED2 = meditationList[1].duration;

    if (!isNaN(durationMED2)) {
        var seekTimeMED2 = (progressBarMED2.value / 100) * durationMED2;
        meditationList[1].currentTime = seekTimeMED2;
    }
});
function resetMED2() {
    document.getElementById("startBtnMED2").style.display = "inline";
    document.getElementById("pauseBtnMED2").style.display = "none";
    meditationList[1].pause();
    meditationList[1].currentTime = 0;
    document.getElementById("progressBarMED2").value = 0;
    MED2isON = false;
}