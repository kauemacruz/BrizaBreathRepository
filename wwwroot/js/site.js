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
    backAHATset = document.getElementById("backAHATset");

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
    ahatSettingsPage = document.getElementById("ahatSettingsPage");
     
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
    setTimeout(function () {
        audioPlayerYogic.pause();
        audioPlayerYogic.currentTime = 0;
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
    setTimeout(function () {
        audioPlayerBRE.pause();
        audioPlayerBRE.currentTime = 0;
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
    setTimeout(function () {
        audioPlayerBRW.pause();
        audioPlayerBRW.currentTime = 0;
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
    setTimeout(function () {
        audioPlayerHUM.pause();
        audioPlayerHUM.currentTime = 0;
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
    setTimeout(function () {
        audioPlayerBB.pause();
        audioPlayerBB.currentTime = 0;
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
    setTimeout(function () {
        audioPlayerHAT.pause();
        audioPlayerHAT.currentTime = 0;
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
    setTimeout(function () {
        audioPlayerHATC.pause();
        audioPlayerHATC.currentTime = 0;
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
    setTimeout(function () {
        audioPlayerAHAT.pause();
        audioPlayerAHAT.currentTime = 0;
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