/*BRT JS*/
var isBRTon = false;
const songSelectBRT = document.getElementById('song-selectBRT');
const audioPlayerBRT = document.getElementById('audio-playerBRT');
const startBtnBRT = document.getElementById('brtStart');
// Variable to store the timeout ID
let timeoutIdBRT;

// Function to play the selected song
function playSelectedSongBRT (isSongOff){
    const selectedSongBRT = songSelectBRT.value;
    audioPlayerBRT.src = selectedSongBRT;
    if (!isSongOff) {
        audioPlayerBRT.muted = false;
        audioPlayerBRT.play();
        localStorage.setItem('selectedSongBRT', songSelectBRT.value);
        // Clear any existing timeout
        clearTimeout(timeoutIdBRT);
        timeoutIdBRT = setTimeout(function () {
            audioPlayerBRT.pause();
            audioPlayerBRT.currentTime = 0;
        }, 15000);
    }
    else {
        clearTimeout(timeoutIdBRT);
        audioPlayerBRT.muted = false;
        audioPlayerBRT.loop = true;
        audioPlayerBRT.play();
    }
}

const storedSongBRT = localStorage.getItem('selectedSongBRT');
if (storedSongBRT) {
    // Set the value of the songSelect dropdown to the stored song
    songSelectBRT.value = storedSongBRT;
}

// Add an event listener to the songSelectBRT dropdown
songSelectBRT.addEventListener('change', function () {
    // Stop the currently playing song
    audioPlayerBRT.pause();
    audioPlayerBRT.currentTime = 0;

    // Play the selected song
    playSelectedSongBRT(false);
});

$(function () {
    $('#brtForm').on('submit', function (e) {
        e.preventDefault(); // Prevent the default form submission

        var formData = new FormData(this); // Get the form data

        $.ajax({
            url: "/",
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function (result) {
                // Update the result section with the server response
                $('#brtResultSaved').html(result);
            }
        });

        clearInterval(brtInt);
        [brtSeconds, brtMinutes] = [0, 0];
        brtTimerRef.value = '00 : 00';
        document.getElementById('brtStop').disabled = true;
        document.getElementById('brtStop').style.color = 'rgb(177, 177, 177)';
        document.getElementById('brtSave').disabled = true;
        document.getElementById('brtSave').style.color = 'rgb(177, 177, 177)';
        audioPlayerBRT.currentTime = 0;
    });
});


let date = new Date().toLocaleDateString("en-US", {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
});
let [brtSeconds, brtMinutes] = [0, 0];
let brtTimerRef = document.getElementById('timerDisplayBRT');
let brtInt = null;
document.getElementById('brtStop').disabled = true;
document.getElementById('brtStop').style.color = 'rgb(177, 177, 177)';
document.getElementById('brtSave').disabled = true;
document.getElementById('brtSave').style.color = 'rgb(177, 177, 177)';
startBtnBRT.addEventListener('click', () => {
    isBRTon = true;
    if (brtInt !== null) {
        clearInterval(brtInt);
    }
    brtInt = setInterval(brtDisplayTimer, 1000);
    document.getElementById('brtStart').style.display = 'none';
    document.getElementById('brtPause').style.display = 'inline';
    document.getElementById('brtStop').disabled = true;
    document.getElementById('brtStop').style.color = 'rgb(177, 177, 177)';
    document.getElementById('brtSave').disabled = true;
    document.getElementById('brtSave').style.color = 'rgb(177, 177, 177)';
    document.getElementById('brtSettings').disabled = true;
    document.getElementById('brtSettings').style.color = 'rgb(177, 177, 177)';
    if (!audioPlayerBRT.muted) {
        audioObjects.bell.muted = false;
        audioObjects.bell.play();
        playSelectedSongBRT(true);
    }
});
document.getElementById('brtPause').addEventListener('click', () => {
    isBRTon = false;
    clearInterval(brtInt);
    document.getElementById('brtStart').style.display = 'inline';
    document.getElementById('brtPause').style.display = 'none';
    document.getElementById('brtStop').disabled = false;
    document.getElementById('brtStop').style.color = '#990000';
    document.getElementById('brtSave').disabled = false;
    document.getElementById('brtSave').style.color = '#49B79D';
    document.getElementById('brtSettings').disabled = false;
    document.getElementById('brtSettings').style.color = '#49B79D';
    if (!audioPlayerBRT.muted) {
        audioPlayerBRT.pause();
    }
    document.getElementById('brtDate').value = date;
});
document.getElementById('brtStop').addEventListener('click', () => {
    isBRTon = false;
    clearInterval(brtInt);
    [brtSeconds, brtMinutes] = [0, 0];
    brtTimerRef.value = '00 : 00';
    document.getElementById('brtStop').disabled = true;
    document.getElementById('brtStop').style.color = 'rgb(177, 177, 177)';
    document.getElementById('brtSave').disabled = true;
    document.getElementById('brtSave').style.color = 'rgb(177, 177, 177)';
    if (!audioPlayerBRT.muted) {
        audioPlayerBRT.pause();
    }
    audioPlayerBRT.currentTime = 0;
});
function brtDisplayTimer() {
    brtSeconds++;
    if (brtSeconds == 60) {
        brtSeconds = 0;
        brtMinutes++;
    }
    let brtM = brtMinutes < 10 ? "0" + brtMinutes : brtMinutes;
    let brtS = brtSeconds < 10 ? "0" + brtSeconds : brtSeconds;
    brtTimerRef.value = `${brtM} : ${brtS}`;
}
var brtaudio = document.getElementById("brtaudio"),
    brtmute = document.getElementById("brtmute");

// Get the volumeBRT bar element
const volumeBarBRT = document.getElementById('volumeBarBRT');

// Add an event listener for the volumeBRT change event
volumeBarBRT.addEventListener('input', function () {
    // Get the current volumeBRT value
    const volumeBRT = parseFloat(volumeBarBRT.value);

    // Check if volumeBRT is 0 and mute the media if necessary
    if (volumeBRT === 0) {
        audioPlayerBRT.muted = true;
        brtaudio.style.display = "none";
        brtmute.style.display = "block";
    } else {
        audioPlayerBRT.muted = false;
        brtmute.style.display = "none";
        brtaudio.style.display = "block";
    }
});
//BRT Modal
const modalBRT = document.getElementById("myModalBRT");
const closeModalBRTButton = document.getElementById("closeModalBRT");
var BRTquestion = document.getElementById("BRTquestion");

function openModalBRT() {
    modalBRT.style.display = "block";
    showSlides(slideIndex, 'BRTslides');
}

// Function to close the modalBRT
function closeModalBRT() {
    modalBRT.style.display = "none";
    slideIndex = 1;

}

// Event listener for closing the modalBRT
closeModalBRTButton.addEventListener("click", closeModalBRT);

// Close the modalBRT if the user clicks outside the modalBRT content
window.addEventListener("click", function (event) {
    if (event.target === modalBRT) {
        closeModalBRT();
    }
});
BRTquestion.onclick = function () {
    openModalBRT();
}
brtLink.onclick = function () {
    openPage(homePage, brtPage, 'slideLeft');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    audioObjects.bell.load();
    audioElements.forEach((audio) => {
        audio.load();
    });
    backBRT.style.display = "block";
}
backBRT.onclick = function () {
    isBRTon = false;
    openPage(brtPage, homePage, 'slideRight');
    clearInterval(brtInt);
    [brtSeconds, brtMinutes] = [0, 0];
    brtTimerRef.value = '00 : 00';
    document.getElementById('brtStart').style.display = 'inline';
    document.getElementById('brtPause').style.display = 'none';
    document.getElementById('brtStop').disabled = true;
    document.getElementById('brtStop').style.color = 'rgb(177, 177, 177)';
    document.getElementById('brtSave').disabled = true;
    document.getElementById('brtSave').style.color = 'rgb(177, 177, 177)';
    document.getElementById('brtResultSaved').innerHTML = "";
    document.getElementById('brtSettings').disabled = false;
    document.getElementById('brtSettings').style.color = '#49B79D';
    if (!audioPlayerBRT.muted) {
        audioPlayerBRT.pause();
    }
    audioPlayerBRT.currentTime = 0;
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    backBRT.style.display = "none";
}
backBRT2.onclick = function () {
    isBRTon = false;
    openPage(brtPage, programPage, 'slideRight');
    clearInterval(brtInt);
    [brtSeconds, brtMinutes] = [0, 0];
    brtTimerRef.value = '00 : 00';
    document.getElementById('brtStart').style.display = 'inline';
    document.getElementById('brtPause').style.display = 'none';
    document.getElementById('brtStop').disabled = true;
    document.getElementById('brtStop').style.color = 'rgb(177, 177, 177)';
    document.getElementById('brtSave').disabled = true;
    document.getElementById('brtSave').style.color = 'rgb(177, 177, 177)';
    document.getElementById('brtResultSaved').innerHTML = "";
    document.getElementById('brtSettings').disabled = false;
    document.getElementById('brtSettings').style.color = '#49B79D';
    if (!audioPlayerBRT.muted) {
        audioPlayerBRT.pause();
    }
    audioPlayerBRT.currentTime = 0;
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    backBRT2.style.display = "none";
    backProgram.style.display = "block";
}
brtSettings.onclick = function () {
    openPage(brtPage, brtSettingsPage, 'slideLeft');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    selectSongsList.style.display = "block";
    backBRTset.style.display = "block";
    backBRT.style.display = "none";
}
backBRTset.onclick = function () {
    if (!audioPlayerBRT.muted) {
        audioPlayerBRT.pause();
    }
    audioPlayerBRT.currentTime = 0;
    openPage(brtSettingsPage, brtPage, 'slideRight');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    selectSongsList.style.display = "none";
    backBRT.style.display = "block";
    backBRTset.style.display = "none";
}
