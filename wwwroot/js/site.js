window.addEventListener('load', function () {
    // Hide the loading indicator
    var loadingIndicator = document.getElementById('loadingIndicator');
    loadingIndicator.style.display = 'none';

    // Display the content
    homePage.classList.remove('hidden');
    homePage.classList.add('open');
});
// Check if the Wake Lock API is available
if ('wakeLock' in navigator) {
    let wakeLock = null;

    // Request a wake lock
    const requestWakeLock = async () => {
        try {
            wakeLock = await navigator.wakeLock.request('screen');
            console.log('Screen wake lock engaged.');
            // Remove the click event listener after requesting the wake lock
            document.removeEventListener('click', requestWakeLock);
        } catch (error) {
            console.error(`Failed to request wake lock: ${error}`);
        }
    };

    // Add a click event listener to request the wake lock
    document.addEventListener('click', requestWakeLock);

    // Add an event listener to release the wake lock when the page is unloaded
    window.addEventListener('unload', () => {
        if (wakeLock !== null) {
            wakeLock.release();
            wakeLock = null;
            console.log('Screen wake lock released.');
        }
    });
}

/* Play all songs and pause so they can play in iphone*/
// Get the elements with the class "song-select"
var songSelects = document.getElementsByClassName('song-select');
// Create an array to store the audio elements
var audioElements = [];
// Iterate over the song-select elements
for (var i = 0; i < songSelects.length; i++) {
    var songSelect = songSelects[i];
    var options = songSelect.options;
    // Iterate over the options and create audio elements for each option
    for (var j = 0; j < options.length; j++) {
        var option = options[j];
        if (option.hasAttribute('data-audio')) {
            var audioSrc = option.getAttribute('data-audio');
            var audioElement = new Audio(audioSrc);
            audioElements.push(audioElement);
        }
    }
}

/*Links*/
var breathHoldsLink = document.getElementById("breathHoldsLink"),
    lungsExpansionLink = document.getElementById("lungsExpansionLink"),
    pranayamaLink = document.getElementById("pranayamaLink"),
    mobilityLink = document.getElementById("mobilityLink"),
    extrasLink = document.getElementById("extrasLink"),
    programLink = document.getElementById("programLink"),
    backProgram = document.getElementById("backProgram"),
    nasalLink = document.getElementById("nasalLink"),
    backNasal = document.getElementById("backNasal"),
    unblockLink = document.getElementById("unblockLink"),
    backUnblock = document.getElementById('backUnblock'),
    brtLink = document.getElementById("brtLink"),
    backBRT = document.getElementById("backBRT"),
    diaphragmLink = document.getElementById("diaphragmLink"),
    backDiaphragm = document.getElementById("backDiaphragm"),
    yogicLink = document.getElementById("yogicLink"),
    backYogic = document.getElementById("backYogic"),
    BRT10Link = document.getElementById("BRT10Link"),
    backBRT10 = document.getElementById("backBRT10"),
    BRELink = document.getElementById("BRELink"),
    backBRE = document.getElementById("backBRE"),
    BRWLink = document.getElementById("BRWLink"),
    backBRW = document.getElementById("backBRW"),
    HUMLink = document.getElementById("HUMLink"),
    backHUM = document.getElementById("backHUM"),
    BRT20Link = document.getElementById("BRT20Link"),
    backBRT20 = document.getElementById("backBRT20"),
    BBLink = document.getElementById("BBLink"),
    backBB = document.getElementById("backBB"),
    BRT30Link = document.getElementById("BRT30Link"),
    backBRT30 = document.getElementById("backBRT30"),
    brtSettings = document.getElementById("brtSettings"),
    backBRTset = document.getElementById("backBRTset"),
    yogicSettings = document.getElementById("yogicSettings"),
    backYogicSet = document.getElementById("backYogicSet"),
    breSettings = document.getElementById("breSettings"),
    backBREset = document.getElementById("backBREset"),
    brwSettings = document.getElementById("brwSettings"),
    backBRWset = document.getElementById("backBRWset"),
    humSettings = document.getElementById("humSettings"),
    backHUMset = document.getElementById("backHUMset"),
    bbSettings = document.getElementById("bbSettings"),
    backBBset = document.getElementById("backBBset"),
    hatSettings = document.getElementById("hatSettings"),
    HATLink = document.getElementById("HATLink"),
    backHATset = document.getElementById("backHATset"),
    BRT40Link = document.getElementById("BRT40Link"),
    backBRT40 = document.getElementById("backBRT40"),
    HATCLink = document.getElementById("HATCLink"),
    hatcSettings = document.getElementById("hatcSettings"),
    backAHATCset = document.getElementById("backAHATCset"),
    ahatSettings = document.getElementById("ahatSettings"),
    AHATLink = document.getElementById("AHATLink"),
    backAHATset = document.getElementById("backAHATset"),
    lungsLink = document.getElementById("lungsLink"),
    backLungs = document.getElementById("backLungs"),
    lungsSettings = document.getElementById("lungsSettings"),
    backLungsset = document.getElementById("backLungsset"),
    mobilityLink = document.getElementById("mobilityLink"),
    backMobility = document.getElementById("backMobility"),
    backBH = document.getElementById("backBH"),
    backPRANA = document.getElementById("backPRANA"),
    backEXTRA = document.getElementById("backEXTRA"),
    APLink = document.getElementById("apneaLink"),
    backAP = document.getElementById("backAP"),
    APSettings = document.getElementById("APSettings"),
    backAPSet = document.getElementById("backAPSet"),
    co2o2Link = document.getElementById("co2o2Link"),
    backO2 = document.getElementById("backO2"),
    O2Settings = document.getElementById("O2Settings"),
    backO2Set = document.getElementById("backO2Set"),
    O2Btn = document.getElementById("O2Btn"),
    CO2Btn = document.getElementById("CO2Btn"),
    WHLink = document.getElementById("WHLink"),
    backWH = document.getElementById("backWH"),
    WHSettings = document.getElementById("WHSettings"),
    backWHSet = document.getElementById("backWHset"),
    CTLink = document.getElementById("CTLink"),
    backCT = document.getElementById("backCT"),
    CTSettings = document.getElementById("CTSettings"),
    backCTSet = document.getElementById("backCTSet");

/*Pages*/
var homePage = document.getElementById("homePage"),
    programPage = document.getElementById("programPage"),
    nasalBreathingPage = document.getElementById("nasalBreathingPage"),
    noseUnblockPage = document.getElementById("noseUnblockPage"),
    brtPage = document.getElementById("brtPage"),
    diaphragmPage = document.getElementById("diaphragmPage"),
    yogicPage = document.getElementById("yogicPage"),
    BRT10Page = document.getElementById("BRT10Page"),
    BREPage = document.getElementById("BREPage"),
    BRWPage = document.getElementById("BRWPage"),
    HUMPage = document.getElementById("HUMPage"),
    BRT20Page = document.getElementById("BRT20Page"),
    BBPage = document.getElementById("BBPage"),
    BRT30Page = document.getElementById("BRT30Page"),
    brtSettingsPage = document.getElementById("brtSettingsPage"),
    yogicSettingsPage = document.getElementById("yogicSettingsPage"),
    breSettingsPage = document.getElementById("breSettingsPage"),
    brwSettingsPage = document.getElementById("brwSettingsPage"),
    humSettingsPage = document.getElementById("humSettingsPage"),
    bbSettingsPage = document.getElementById("bbSettingsPage"),
    HATPage = document.getElementById("HATPage"),
    hatSettingsPage = document.getElementById("hatSettingsPage"),
    BRT40Page = document.getElementById("BRT40Page"),
    HATCPage = document.getElementById("HATCPage"),
    hatcSettingsPage = document.getElementById("hatcSettingsPage"),
    AHATPage = document.getElementById("AHATPage"),
    ahatSettingsPage = document.getElementById("ahatSettingsPage"),
    lungsPage = document.getElementById("lungsPage"),
    lungsSettingsPage = document.getElementById("lungsSettingsPage"),
    mobilityPage = document.getElementById("mobilityPage"),
    BHPage = document.getElementById("BHPage"),
    PRANAPage = document.getElementById("PRANAPage"),
    EXTRAPage = document.getElementById("EXTRAPage"),
    APPage = document.getElementById("APPage"),
    APSettingsPage = document.getElementById("APSettingsPage"),
    O2Page = document.getElementById("O2Page"),
    O2SettingsPage = document.getElementById("O2SettingsPage"),
    WHPage = document.getElementById("WHPage"),
    WHSettingsPage = document.getElementById("WHSettingsPage"),
    CTPage = document.getElementById("CTPage"),
    CTSettingsPage = document.getElementById("CTSettingsPage");
     
/*Transition functions*/
const element = document.documentElement || document.body;
function openPage(id1, id2, slideMotion) {
    if (id1.classList.contains('open')) {
        id1.classList.remove('open');
        id1.classList.add('hidden');
        id2.classList.remove('hidden');
        id2.classList.add('open');
        id2.classList.add(slideMotion);
    } else { }
    if (id1.classList.contains('slideLeft')) {
        id1.classList.remove('slideLeft');
    } else if (id1.classList.contains('slideRight')) {
        id1.classList.remove('slideRight');
    } else if (id1.classList.contains('slideUp')) {
        id1.classList.remove('slideUp');
    } else if (id1.classList.contains('slideDown')) {
        id1.classList.remove('slideDown');
    } else { }
}
programLink.onclick = function () {
    openPage(homePage, programPage, 'slideLeft');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    for (var i = 0; i < audioElements.length; i++) {
        audioElements[i].muted = true;
        audioElements[i].play();
        setTimeout(function () {
            audioElements[i].pause();
            audioElements[i].currentTime = 0;
        }, 1000);
    }
}
backProgram.onclick = function () {
    openPage(programPage, homePage, 'slideRight');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
nasalLink.onclick = function () {
    openPage(programPage, nasalBreathingPage, 'slideUp');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
backNasal.onclick = function () {
    openPage(nasalBreathingPage, programPage, 'slideRight');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
unblockLink.onclick = function () {
    openPage(programPage, noseUnblockPage, 'slideUp');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
backUnblock.onclick = function () {
    openPage(noseUnblockPage, programPage, 'slideRight');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
brtLink.onclick = function () {
    openPage(programPage, brtPage, 'slideUp');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    playSelectedSongBRT();
    audioPlayerBRT.muted = true;
    setTimeout(function () {
        audioPlayerBRT.pause();
        audioPlayerBRT.currentTime = 0;
    }, 1000);
}
backBRT.onclick = function () {
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
    if (brtismute != true && brtIsOn != false) {
        audioPlayerBRT.pause();
    }
    audioPlayerBRT.currentTime = 0;
    brtIsOn = false;
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
diaphragmLink.onclick = function () {
    openPage(programPage, diaphragmPage, 'slideUp');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
backDiaphragm.onclick = function () {
    openPage(diaphragmPage, programPage, 'slideRight');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
yogicLink.onclick = function () {
    openPage(programPage, yogicPage, 'slideUp');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    playSelectedSongYogic();
    audioPlayerYogic.muted = true;
    audioListYogic[0].muted = true;
    audioListYogic[2].muted = true;
    audioListYogic[3].muted = true;
    audioListYogic[0].play();
    audioListYogic[2].play();
    audioListYogic[3].play();
    setTimeout(function () {
        audioPlayerYogic.pause();
        audioPlayerYogic.currentTime = 0;
        audioListYogic[0].pause();
        audioListYogic[0].currentTime = 0;
        audioListYogic[2].pause();
        audioListYogic[2].currentTime = 0;
        audioListYogic[3].pause();
        audioListYogic[3].currentTime = 0;
    }, 1000);
}
backYogic.onclick = function () {
    openPage(yogicPage, programPage, 'slideRight');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    clearInterval(intYogic);
    [secondsYogic, minutesYogic, hoursYogic] = [0, 0, 0];
    timerRefYogic.value = '00 : 00 : 00';
    if (isSongMuteYogic != true && isYogicON != false) {
        audioPlayerYogic.pause();
    }
    audioPlayerYogic.currentTime = 0;
    timerControlsButtonsYogic.pauseYogic.style.display = 'none';
    timerControlsButtonsYogic.startYogic.style.display = 'inline';
    setFormDisabledStateYogic(false);
    setTimerControlsDisabledStateYogic(false, true, true);
    timerControlsButtonsYogic.stopYogic.style.color = "rgb(177, 177, 177)";
    document.getElementById('yogicSave').disabled = true;
    document.getElementById('yogicSave').style.color = 'rgb(177, 177, 177)';
    document.getElementById('yogicSettings').disabled = false;
    document.getElementById('yogicSettings').style.color = '#49B79D';
    stopTimerTickYogic();
    resetTimerYogic();
    isYogicON = false;
    document.getElementById('yogicResultSaved').innerHTML = "";
}
BRT10Link.onclick = function () {
    openPage(programPage, BRT10Page, 'slideUp');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
backBRT10.onclick = function () {
    openPage(BRT10Page, programPage, 'slideRight');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
BRELink.onclick = function () {
    openPage(programPage, BREPage, 'slideUp');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    playSelectedSongBRE();
    audioPlayerBRE.muted = true;
    audioListBRE[0].muted = true;
    audioListBRE[2].muted = true;
    audioListBRE[3].muted = true;
    audioListBRE[0].play();
    audioListBRE[2].play();
    audioListBRE[3].play();
    setTimeout(function () {
        audioPlayerBRE.pause();
        audioPlayerBRE.currentTime = 0;
        audioListBRE[0].pause();
        audioListBRE[0].currentTime = 0;
        audioListBRE[2].pause();
        audioListBRE[2].currentTime = 0;
        audioListBRE[3].pause();
        audioListBRE[3].currentTime = 0;
    }, 1000);
}
backBRE.onclick = function () {
    openPage(BREPage, programPage, 'slideRight');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    clearInterval(intBRE);
    [secondsBRE, minutesBRE, hoursBRE] = [0, 0, 0];
    timerRefBRE.value = '00 : 00 : 00';
    if (isSongMuteBRE != true && isBREON != false) {
        audioPlayerBRE.pause();
    }
    audioPlayerBRE.currentTime = 0
    timerControlsButtonsBRE.pauseBRE.style.display = 'none';
    timerControlsButtonsBRE.startBRE.style.display = 'inline';
    setFormDisabledStateBRE(false);
    setTimerControlsDisabledStateBRE(false, true, true);
    timerControlsButtonsBRE.stopBRE.style.color = "rgb(177, 177, 177)";
    document.getElementById('BRESave').disabled = true;
    document.getElementById('BRESave').style.color = 'rgb(177, 177, 177)';
    document.getElementById('breSettings').disabled = false;
    document.getElementById('breSettings').style.color = '#49B79D';
    stopTimerTickBRE();
    resetTimerBRE();
    isBREON = false;
    document.getElementById('BREResultSaved').innerHTML = "";
}
BRWLink.onclick = function () {
    openPage(programPage, BRWPage, 'slideUp');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    playSelectedSongBRW();
    audioPlayerBRW.muted = true;
    audioListBRW[0].muted = true;
    audioListBRW[2].muted = true;
    audioListBRW[3].muted = true;
    audioListBRW[0].play();
    audioListBRW[2].play();
    audioListBRW[3].play();
    setTimeout(function () {
        audioPlayerBRW.pause();
        audioPlayerBRW.currentTime = 0;
        audioListBRW[0].pause();
        audioListBRW[0].currentTime = 0;
        audioListBRW[2].pause();
        audioListBRW[2].currentTime = 0;
        audioListBRW[3].pause();
        audioListBRW[3].currentTime = 0;
    }, 1000);
}
backBRW.onclick = function () {
    openPage(BRWPage, programPage, 'slideRight');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    clearInterval(intBRW);
    [secondsBRW, minutesBRW, hoursBRW] = [0, 0, 0];
    timerRefBRW.value = '00 : 00 : 00';
    if (isSongMuteBRW != true && isBRWON != false) {
        audioPlayerBRW.pause();
    }
    audioPlayerBRW.currentTime = 0
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
}
HUMLink.onclick = function () {
    openPage(programPage, HUMPage, 'slideUp');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    playSelectedSongHUM();
    audioPlayerHUM.muted = true;
    audioListHUM[0].muted = true;
    audioListHUM[2].muted = true;
    audioListHUM[3].muted = true;
    audioListHUM[0].play();
    audioListHUM[2].play();
    audioListHUM[3].play();
    setTimeout(function () {
        audioPlayerHUM.pause();
        audioPlayerHUM.currentTime = 0;
        audioListHUM[0].pause();
        audioListHUM[0].currentTime = 0;
        audioListHUM[2].pause();
        audioListHUM[2].currentTime = 0;
        audioListHUM[3].pause();
        audioListHUM[3].currentTime = 0;
    }, 1000);
}
backHUM.onclick = function () {
    openPage(HUMPage, programPage, 'slideRight');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    clearInterval(intHUM);
    [secondsHUM, minutesHUM, hoursHUM] = [0, 0, 0];
    timerRefHUM.value = '00 : 00 : 00';
    if (isSongMuteHUM != true && isHUMON != false) {
        audioPlayerHUM.pause();
    }
    audioPlayerHUM.currentTime = 0
    timerControlsButtonsHUM.pauseHUM.style.display = 'none';
    timerControlsButtonsHUM.startHUM.style.display = 'inline';
    setFormDisabledStateHUM(false);
    setTimerControlsDisabledStateHUM(false, true, true);
    timerControlsButtonsHUM.stopHUM.style.color = "rgb(177, 177, 177)";
    stopTimerTickHUM();
    resetTimerHUM();
    document.getElementById('HUMSave').disabled = true;
    document.getElementById('HUMSave').style.color = 'rgb(177, 177, 177)';
    document.getElementById('humSettings').disabled = false;
    document.getElementById('humSettings').style.color = '#49B79D';
    isHUMON = false;
    document.getElementById('HUMResultSaved').innerHTML = "";
}
BRT20Link.onclick = function () {
    openPage(programPage, BRT20Page, 'slideUp');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
backBRT20.onclick = function () {
    openPage(BRT20Page, programPage, 'slideRight');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
BBLink.onclick = function () {
    openPage(programPage, BBPage, 'slideUp');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    playSelectedSongBB();
    audioPlayerBB.muted = true;
    audioListBB[0].muted = true;
    audioListBB[2].muted = true;
    audioListBB[3].muted = true;
    audioListBB[0].play();
    audioListBB[2].play();
    audioListBB[3].play();
    setTimeout(function () {
        audioPlayerBB.pause();
        audioPlayerBB.currentTime = 0;
        audioListBB[0].pause();
        audioListBB[0].currentTime = 0;
        audioListBB[2].pause();
        audioListBB[2].currentTime = 0;
        audioListBB[3].pause();
        audioListBB[3].currentTime = 0;
    }, 1000);
}
backBB.onclick = function () {
    openPage(BBPage, programPage, 'slideRight');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    clearInterval(intBB);
    [secondsBB, minutesBB, hoursBB] = [0, 0, 0];
    timerRefBB.value = '00 : 00 : 00';
    if (isSongMuteBB != true && isBBON != false) {
        audioPlayerBB.pause();
    }
    audioPlayerBB.currentTime = 0
    timerControlsButtonsBB.pauseBB.style.display = 'none';
    timerControlsButtonsBB.startBB.style.display = 'inline';
    setFormDisabledStateBB(false);
    setTimerControlsDisabledStateBB(false, true, true);
    timerControlsButtonsBB.stopBB.style.color = "rgb(177, 177, 177)";
    document.getElementById('bbSettings').disabled = false;
    document.getElementById('bbSettings').style.color = '#49B79D';
    stopTimerTickBB();
    resetTimerBB();
    timerControlsButtonsBB.stopBB.disabled = true;
    isBBON = false;
    document.getElementById('BBResultSaved').innerHTML = "";
}
BRT30Link.onclick = function () {
    openPage(programPage, BRT30Page, 'slideUp');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
backBRT30.onclick = function () {
    openPage(BRT30Page, programPage, 'slideRight');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
brtSettings.onclick = function () {
    openPage(brtPage, brtSettingsPage, 'slideUp');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
backBRTset.onclick = function () {
    if (brtismute != true) {
        audioPlayerBRT.pause();
    }
    audioPlayerBRT.currentTime = 0;
    openPage(brtSettingsPage, brtPage, 'slideDown');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
yogicSettings.onclick = function () {
    openPage(yogicPage, yogicSettingsPage, 'slideUp');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
backYogicSet.onclick = function () {
    if (isSongMuteYogic != true) {
        audioPlayerYogic.pause();
    }
    audioPlayerYogic.currentTime = 0;
    openPage(yogicSettingsPage, yogicPage, 'slideDown');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
breSettings.onclick = function () {
    openPage(BREPage, breSettingsPage, 'slideUp');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
backBREset.onclick = function () {
    if (isSongMuteBRE != true) {
        audioPlayerBRE.pause();
    }
    audioPlayerBRE.currentTime = 0;
    openPage(breSettingsPage, BREPage, 'slideDown');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
brwSettings.onclick = function () {
    openPage(BRWPage, brwSettingsPage, 'slideUp');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
backBRWset.onclick = function () {
    if (isSongMuteBRW != true) {
        audioPlayerBRW.pause();
    }
    audioPlayerBRW.currentTime = 0;
    openPage(brwSettingsPage, BRWPage, 'slideDown');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
humSettings.onclick = function () {
    openPage(HUMPage, humSettingsPage, 'slideUp');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
backHUMset.onclick = function () {
    if (isSongMuteHUM != true) {
        audioPlayerHUM.pause();
    }
    audioPlayerHUM.currentTime = 0;
    openPage(humSettingsPage, HUMPage, 'slideDown');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
bbSettings.onclick = function () {
    openPage(BBPage, bbSettingsPage, 'slideUp');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
backBBset.onclick = function () {
    if (isSongMuteBB != true) {
        audioPlayerBB.pause();
    }
    audioPlayerBB.currentTime = 0;
    openPage(bbSettingsPage, BBPage, 'slideDown');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
HATLink.onclick = function () {
    openPage(programPage, HATPage, 'slideUp');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    playSelectedSongHAT();
    audioPlayerHAT.muted = true;
    audioListHAT[0].muted = true;
    audioListHAT[1].muted = true;
    audioListHAT[2].muted = true;
    audioListHAT[3].muted = true;
    audioListHAT[0].play();
    audioListHAT[1].play();
    audioListHAT[2].play();
    audioListHAT[3].play();
    setTimeout(function () {
        audioPlayerHAT.pause();
        audioPlayerHAT.currentTime = 0;
        audioListHAT[0].pause();
        audioListHAT[0].currentTime = 0;
        audioListHAT[1].pause();
        audioListHAT[1].currentTime = 0;
        audioListHAT[2].pause();
        audioListHAT[2].currentTime = 0;
        audioListHAT[3].pause();
        audioListHAT[3].currentTime = 0;
    }, 1000);
}
backHAT.onclick = function () {
    openPage(HATPage, programPage, 'slideRight');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    document.getElementById("HATResults").innerHTML = "";
    timerRefHAT.value = "|";
    clearInterval(intHAT);
    document.getElementById('hatSettings').disabled = false;
    document.getElementById('hatSettings').style.color = '#49B79D';
    if (!isSongMuteHAT) {
        audioPlayerHAT.pause();
    }
    timerControlsButtonsHAT.pauseHAT.style.display = 'none';
    timerControlsButtonsHAT.startHAT.style.display = 'inline';
    setFormDisabledStateHAT(false);
    setTimerControlsDisabledStateHAT(false, true, true);
    document.getElementById('resetBtnHAT').style.display = 'none';
    document.getElementById('stopBtnHAT').style.display = 'inline';
    timerControlsButtonsHAT.stopHAT.style.color = "rgb(177, 177, 177)";
    timerControlsButtonsHAT.startHAT.style.color = "#0661AA";
    stopTimerTickHAT();
    resetTimerHAT();
    timerHAT.isFinishedHAT = true;
    isFirstTimeHAT = false;
    document.getElementById('hatSave').disabled = true;
    document.getElementById('hatSave').style.color = 'rgb(177, 177, 177)';
    document.getElementById('hatResultSaved').innerHTML = "";
}
hatSettings.onclick = function () {
    openPage(HATPage, hatSettingsPage, 'slideUp');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
backHATset.onclick = function () {
    if (isSongMuteHAT != true) {
        audioPlayerHAT.pause();
    }
    audioPlayerHAT.currentTime = 0;
    openPage(hatSettingsPage, HATPage, 'slideDown');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
BRT40Link.onclick = function () {
    openPage(programPage, BRT40Page, 'slideUp');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
backBRT40.onclick = function () {
    openPage(BRT40Page, programPage, 'slideRight');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
HATCLink.onclick = function () {
    openPage(programPage, HATCPage, 'slideUp');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    playSelectedSongHATC();
    audioPlayerHATC.muted = true;
    audioListHATC[0].muted = true;
    audioListHATC[1].muted = true;
    audioListHATC[2].muted = true;
    audioListHATC[3].muted = true;
    audioListHATC[0].play();
    audioListHATC[1].play();
    audioListHATC[2].play();
    audioListHATC[3].play();
    setTimeout(function () {
        audioPlayerHATC.pause();
        audioPlayerHATC.currentTime = 0;
        audioListHATC[0].pause();
        audioListHATC[0].currentTime = 0;
        audioListHATC[1].pause();
        audioListHATC[1].currentTime = 0;
        audioListHATC[2].pause();
        audioListHATC[2].currentTime = 0;
        audioListHATC[3].pause();
        audioListHATC[3].currentTime = 0;
    }, 1000);
}
backHATC.onclick = function () {
    openPage(HATCPage, programPage, 'slideRight');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    document.getElementById("HATCResults").innerHTML = "";
    timerRefHATC.value = "|";
    clearInterval(intHATC);
    document.getElementById('hatcSettings').disabled = false;
    document.getElementById('hatcSettings').style.color = '#49B79D';
    if (!isSongMuteHATC) {
        audioPlayerHATC.pause();
    }
    timerControlsButtonsHATC.pauseHATC.style.display = 'none';
    timerControlsButtonsHATC.startHATC.style.display = 'inline';
    setFormDisabledStateHATC(false);
    setTimerControlsDisabledStateHATC(false, true, true);
    document.getElementById('resetBtnHATC').style.display = 'none';
    document.getElementById('stopBtnHATC').style.display = 'inline';
    timerControlsButtonsHATC.stopHATC.style.color = "rgb(177, 177, 177)";
    timerControlsButtonsHATC.startHATC.style.color = "#0661AA";
    stopTimerTickHATC();
    resetTimerHATC();
    timerHATC.isFinishedHATC = true;
    isFirstTimeHATC = false;
    document.getElementById('hatcSave').disabled = true;
    document.getElementById('hatcSave').style.color = 'rgb(177, 177, 177)';
    document.getElementById('hatcResultSaved').innerHTML = "";
}
hatcSettings.onclick = function () {
    openPage(HATCPage, hatcSettingsPage, 'slideUp');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
backHATCset.onclick = function () {
    if (isSongMuteHATC != true) {
        audioPlayerHATC.pause();
    }
    audioPlayerHATC.currentTime = 0;
    openPage(hatcSettingsPage, HATCPage, 'slideDown');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
AHATLink.onclick = function () {
    openPage(programPage, AHATPage, 'slideUp');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    playSelectedSongAHAT();
    audioPlayerAHAT.muted = true;
    audioListAHAT[0].muted = true;
    audioListAHAT[1].muted = true;
    audioListAHAT[2].muted = true;
    audioListAHAT[3].muted = true;
    audioListAHAT[0].play();
    audioListAHAT[1].play();
    audioListAHAT[2].play();
    audioListAHAT[3].play();
    setTimeout(function () {
        audioPlayerAHAT.pause();
        audioPlayerAHAT.currentTime = 0;
        audioListAHAT[0].pause();
        audioListAHAT[0].currentTime = 0;
        audioListAHAT[1].pause();
        audioListAHAT[1].currentTime = 0;
        audioListAHAT[2].pause();
        audioListAHAT[2].currentTime = 0;
        audioListAHAT[3].pause();
        audioListAHAT[3].currentTime = 0;
    }, 1000);
}
backAHAT.onclick = function () {
    openPage(AHATPage, programPage, 'slideRight');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    document.getElementById("AHATResults").innerHTML = "";
    timerRefAHAT.value = "|";
    clearInterval(intAHAT);
    document.getElementById('ahatSettings').disabled = false;
    document.getElementById('ahatSettings').style.color = '#49B79D';
    if (!isSongMuteAHAT) {
        audioPlayerAHAT.pause();
    }
    timerControlsButtonsAHAT.pauseAHAT.style.display = 'none';
    timerControlsButtonsAHAT.startAHAT.style.display = 'inline';
    setFormDisabledStateAHAT(false);
    setTimerControlsDisabledStateAHAT(false, true, true);
    document.getElementById('resetBtnAHAT').style.display = 'none';
    document.getElementById('stopBtnAHAT').style.display = 'inline';
    timerControlsButtonsAHAT.stopAHAT.style.color = "rgb(177, 177, 177)";
    timerControlsButtonsAHAT.startAHAT.style.color = "#0661AA";
    stopTimerTickAHAT();
    resetTimerAHAT();
    timerAHAT.isFinishedAHAT = true;
    isFirstTimeAHAT = false;
    document.getElementById('ahatSave').disabled = true;
    document.getElementById('ahatSave').style.color = 'rgb(177, 177, 177)';
    document.getElementById('ahatResultSaved').innerHTML = "";
}
ahatSettings.onclick = function () {
    openPage(AHATPage, hatSettingsPage, 'slideUp');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
backAHATset.onclick = function () {
    if (isSongMuteAHAT != true) {
        audioPlayerAHAT.pause();
    }
    audioPlayerAHAT.currentTime = 0;
    openPage(ahatSettingsPage, AHATPage, 'slideDown');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
lungsLink.onclick = function () {
    openPage(homePage, lungsPage, 'slideLeft');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    for (var i = 0; i < audioElements.length; i++) {
        audioElements[i].muted = true;
        audioElements[i].play();
        setTimeout(function () {
            audioElements[i].pause();
            audioElements[i].currentTime = 0;
        }, 1000);
    }
    playSelectedSongLungs();
    audioPlayerLungs.muted = true;
    setTimeout(function () {
        audioPlayerLungs.pause();
        audioPlayerLungs.currentTime = 0;
    }, 1000);
}
backLungs.onclick = function () {
    openPage(lungsPage, homePage, 'slideRight');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    clearInterval(lungsInt);
    [lungsSeconds, lungsMinutes] = [0, 0];
    lungsTimerRef.value = '00 : 00';
    document.getElementById('lungsStart').style.display = 'inline';
    document.getElementById('lungsPause').style.display = 'none';
    document.getElementById('lungsStop').disabled = true;
    document.getElementById('lungsStop').style.color = 'rgb(177, 177, 177)';
    document.getElementById('lungsSave').disabled = true;
    document.getElementById('lungsSave').style.color = 'rgb(177, 177, 177)';
    document.getElementById('lungsResultSaved').innerHTML = "";
    document.getElementById('lungsSettings').disabled = false;
    document.getElementById('lungsSettings').style.color = '#49B79D';
    if (lungsismute != true && lungsIsOn != false) {
        audioPlayerLungs.pause();
    }
    audioPlayerLungs.currentTime = 0;
    lungsIsOn = false;
}
lungsSettings.onclick = function () {
    openPage(lungsPage, lungsSettingsPage, 'slideUp');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
backLungsset.onclick = function () {
    if (lungsismute != true) {
        audioPlayerLungs.pause();
    }
    audioPlayerLungs.currentTime = 0;
    openPage(lungsSettingsPage, lungsPage, 'slideDown');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
mobilityLink.onclick = function () {
    openPage(homePage, mobilityPage, 'slideLeft');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    for (var i = 0; i < audioElements.length; i++) {
        audioElements[i].muted = true;
        audioElements[i].play();
        setTimeout(function () {
            audioElements[i].pause();
            audioElements[i].currentTime = 0;
        }, 1000);
    }
}
backMobility.onclick = function () {
    openPage(mobilityPage, homePage, 'slideRight');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
breathHoldsLink.onclick = function () {
    openPage(homePage, BHPage, 'slideLeft');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    for (var i = 0; i < audioElements.length; i++) {
        audioElements[i].muted = true;
        audioElements[i].play();
        setTimeout(function () {
            audioElements[i].pause();
            audioElements[i].currentTime = 0;
        }, 1000);
    }
}
backBH.onclick = function () {
    openPage(BHPage, homePage, 'slideRight');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
pranayamaLink.onclick = function () {
    openPage(homePage, PRANAPage, 'slideLeft');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    for (var i = 0; i < audioElements.length; i++) {
        audioElements[i].muted = true;
        audioElements[i].play();
        setTimeout(function () {
            audioElements[i].pause();
            audioElements[i].currentTime = 0;
        }, 1000);
    }
}
backPRANA.onclick = function () {
    openPage(PRANAPage, homePage, 'slideRight');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
extrasLink.onclick = function () {
    openPage(homePage, EXTRAPage, 'slideLeft');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    for (var i = 0; i < audioElements.length; i++) {
        audioElements[i].muted = true;
        audioElements[i].play();
        setTimeout(function () {
            audioElements[i].pause();
            audioElements[i].currentTime = 0;
        }, 1000);
    }
}
backEXTRA.onclick = function () {
    openPage(EXTRAPage, homePage, 'slideRight');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
APLink.onclick = function () {
    openPage(BHPage, APPage, 'slideUp');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    playSelectedSongAP();
    audioPlayerAP.muted = true;
    audioListAP[0].muted = true;
    audioListAP[2].muted = true;
    audioListAP[3].muted = true;
    audioListAP[0].play();
    audioListAP[2].play();
    audioListAP[3].play();
    setTimeout(function () {
        audioPlayerAP.pause();
        audioPlayerAP.currentTime = 0;
        audioListAP[0].pause();
        audioListAP[0].currentTime = 0;
        audioListAP[2].pause();
        audioListAP[2].currentTime = 0;
        audioListAP[3].pause();
        audioListAP[3].currentTime = 0;
    }, 1000);
}
backAP.onclick = function () {
    openPage(APPage, BHPage, 'slideRight');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    clearInterval(intAP);
    [secondsAP, minutesAP, hoursAP] = [0, 0, 0];
    timerRefAP.value = '00 : 00 : 00';
    if (isSongMuteAP != true && isAPON != false) {
        audioPlayerAP.pause();
    }
    audioPlayerAP.currentTime = 0;
    timerControlsButtonsAP.pauseAP.style.display = 'none';
    timerControlsButtonsAP.startAP.style.display = 'inline';
    setFormDisabledStateAP(false);
    setTimerControlsDisabledStateAP(false, true, true);
    timerControlsButtonsAP.stopAP.style.color = "rgb(177, 177, 177)";
    document.getElementById('APSave').disabled = true;
    document.getElementById('APSave').style.color = 'rgb(177, 177, 177)';
    document.getElementById('APSettings').disabled = false;
    document.getElementById('APSettings').style.color = '#49B79D';
    stopTimerTickAP();
    resetTimerAP();
    isAPON = false;
    document.getElementById('APResultSaved').innerHTML = "";
}
APSettings.onclick = function () {
    openPage(APPage, APSettingsPage, 'slideUp');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
backAPSet.onclick = function () {
    if (isSongMuteAP != true) {
        audioPlayerAP.pause();
    }
    audioPlayerAP.currentTime = 0;
    openPage(APSettingsPage, APPage, 'slideDown');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
co2o2Link.onclick = function () {
    openPage(BHPage, O2Page, 'slideUp');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    playSelectedSongO2();
    audioPlayerO2.muted = true;
    audioListCO2[0].muted = true;
    audioListCO2[1].muted = true;
    audioListCO2[2].muted = true;
    audioListCO2[3].muted = true;
    audioListCO2[0].play();
    audioListCO2[1].play();
    audioListCO2[2].play();
    audioListCO2[3].play();
    audioListO2[0].muted = true;
    audioListO2[1].muted = true;
    audioListO2[2].muted = true;
    audioListO2[3].muted = true;
    audioListO2[0].play();
    audioListO2[1].play();
    audioListO2[2].play();
    audioListO2[3].play();
    setTimeout(function () {
        audioPlayerO2.pause();
        audioPlayerO2.currentTime = 0;
        audioListCO2[0].pause();
        audioListCO2[0].currentTime = 0;
        audioListCO2[1].pause();
        audioListCO2[1].currentTime = 0;
        audioListCO2[2].pause();
        audioListCO2[2].currentTime = 0;
        audioListCO2[3].pause();
        audioListCO2[3].currentTime = 0;
        audioListO2[0].pause();
        audioListO2[0].currentTime = 0;
        audioListO2[1].pause();
        audioListO2[1].currentTime = 0;
        audioListO2[2].pause();
        audioListO2[2].currentTime = 0;
        audioListO2[3].pause();
        audioListO2[3].currentTime = 0;
    }, 1000);
}
backO2.onclick = function () {
    openPage(O2Page, BHPage, 'slideRight');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    document.getElementById("O2Results").innerHTML = "";
    timerRefO2.value = "|";
    clearInterval(intO2);
    document.getElementById('O2Settings').disabled = false;
    document.getElementById('O2Settings').style.color = '#49B79D';
    if (!isSongMuteO2) {
        audioPlayerO2.pause();
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
O2Settings.onclick = function () {
    openPage(O2Page, O2SettingsPage, 'slideUp');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
backO2Set.onclick = function () {
    if (isSongMuteO2 != true) {
        audioPlayerO2.pause();
    }
    audioPlayerO2.currentTime = 0;
    openPage(O2SettingsPage, O2Page, 'slideDown');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
CO2Btn.onclick = function () {
    document.getElementById("O2Table").style.display = 'block';
    document.getElementById("CO2Table").style.display = 'none';
}
O2Btn.onclick = function () {
    document.getElementById("CO2Table").style.display = 'block';
    document.getElementById("O2Table").style.display = 'none';
}
WHLink.onclick = function () {
    openPage(BHPage, WHPage, 'slideUp');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    playSelectedSongWH();
    audioPlayerWH.muted = true;
    audioListWH[0].muted = true;
    audioListWH[1].muted = true;
    audioListWH[2].muted = true;
    audioListWH[3].muted = true;
    audioListWH[4].muted = true;
    audioListWH[5].muted = true;
    audioListWH[6].muted = true;
    audioListWH[0].play();
    audioListWH[1].play();
    audioListWH[2].play();
    audioListWH[3].play();
    audioListWH[4].play();
    audioListWH[5].play();
    audioListWH[6].play();
    setTimeout(function () {
        audioPlayerWH.pause();
        audioPlayerWH.currentTime = 0;
        audioListWH[0].pause();
        audioListWH[0].currentTime = 0
        audioListWH[1].pause();
        audioListWH[1].currentTime = 0
        audioListWH[2].pause();
        audioListWH[2].currentTime = 0
        audioListWH[3].pause();
        audioListWH[3].currentTime = 0
        audioListWH[4].pause();
        audioListWH[4].currentTime = 0
        audioListWH[5].pause();
        audioListWH[5].currentTime = 0
        audioListWH[6].pause();
        audioListWH[6].currentTime = 0
    }, 1000);
}
backWH.onclick = function () {
    openPage(WHPage, BHPage, 'slideRight');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    clearInterval(intWH);
    [secondsWH, minutesWH] = [0, 0];
    document.getElementById('WHSettings').disabled = false;
    document.getElementById('WHSettings').style.color = '#49B79D';
    if (!isSongMuteWH) {
        audioPlayerWH.pause();
    }
    audioPlayerWH.currentTime = 0;
    timerControlsButtonsWH.pauseWH.style.display = 'none';
    timerControlsButtonsWH.startWH.style.display = 'inline';
    setFormDisabledStateWH(false);
    setTimerControlsDisabledStateWH(false, true, true);
    timerControlsButtonsWH.stopWH.style.color = "rgb(177, 177, 177)";
    ctxWH.clearRect(0, 0, cWH.width, cWH.height);
    ctxWH.fillStyle = my_gradientWH;
    ctxWH.beginPath();
    ctxWH.arc(150, 100, 80, 0, 2 * Math.PI, true);
    ctxWH.fill();
    ctxWH.font = "bold 48px serif"
    ctxWH.fillStyle = "white";
    ctxWH.textAlign = "center";
    yWH = formSettingsFieldsWH.breakDuration2WH.value;
    ctxWH.fillText(yWH, 150, 115);
    audioListWH[1].play();
    document.getElementById("WHResults").innerHTML = '';
    stopTimerTickWH();
    resetTimerWH();
    clearTimeout(myTimeoutWH);
    clearTimeout(myTimeout2WH);
}
WHSettings.onclick = function () {
    openPage(WHPage, WHSettingsPage, 'slideUp');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
backWHSet.onclick = function () {
    if (isSongMuteWH != true) {
        audioPlayerWH.pause();
    }
    audioPlayerWH.currentTime = 0;
    openPage(WHSettingsPage, WHPage, 'slideDown');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
CTLink.onclick = function () {
    openPage(BHPage, CTPage, 'slideUp');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    playSelectedSongCT();
    audioPlayerCT.muted = true;
    audioListCT[0].muted = true;
    audioListCT[1].muted = true;
    audioListCT[2].muted = true;
    audioListCT[3].muted = true;
    audioListCT[0].play();
    audioListCT[1].play();
    audioListCT[2].play();
    audioListCT[3].play();
    setTimeout(function () {
        audioPlayerCT.pause();
        audioPlayerCT.currentTime = 0;
        audioListCT[0].pause();
        audioListCT[0].currentTime = 0;
        audioListCT[1].pause();
        audioListCT[1].currentTime = 0;
        audioListCT[2].pause();
        audioListCT[2].currentTime = 0;
        audioListCT[3].pause();
        audioListCT[3].currentTime = 0;
    }, 1000);
}
backCT.onclick = function () {
    openPage(CTPage, BHPage, 'slideRight');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    clearInterval(intCT);
    [secondsCT, minutesCT, hoursCT] = [0, 0, 0];
    timerRefCT.value = '00 : 00 : 00';
    if (isSongMuteCT != true && isCTON != false) {
        audioPlayerCT.pause();
    }
    audioPlayerCT.currentTime = 0;
    timerControlsButtonsCT.pauseCT.style.display = 'none';
    timerControlsButtonsCT.startCT.style.display = 'inline';
    setFormDisabledStateCT(false);
    setTimerControlsDisabledStateCT(false, true, true);
    timerControlsButtonsCT.stopCT.style.color = "rgb(177, 177, 177)";
    document.getElementById('CTSave').disabled = true;
    document.getElementById('CTSave').style.color = 'rgb(177, 177, 177)';
    document.getElementById('CTSettings').disabled = false;
    document.getElementById('CTSettings').style.color = '#49B79D';
    stopTimerTickCT();
    resetTimerCT();
    isCTON = false;
    document.getElementById('CTResultSaved').innerHTML = "";
}
CTSettings.onclick = function () {
    openPage(CTPage, CTSettingsPage, 'slideUp');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
backCTSet.onclick = function () {
    if (isSongMuteCT != true) {
        audioPlayerCT.pause();
    }
    audioPlayerCT.currentTime = 0;
    openPage(CTSettingsPage, CTPage, 'slideDown');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
}