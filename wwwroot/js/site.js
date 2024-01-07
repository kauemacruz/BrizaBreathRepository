window.addEventListener('load', function () {
    // Hide the loading indicator
    var loadingIndicator = document.getElementById('loadingIndicator');
    loadingIndicator.style.display = 'none';

    // Display the content
    homePage.classList.remove('hidden');
    homePage.classList.add('open');
    if (isUserActiveSubscriber) {
        document.getElementById("manageMembership").style.display = "block";
        document.getElementById("noActiveMembership").style.display = "none";
    }
    else {
        document.getElementById("manageMembership").style.display = "none";
        document.getElementById("noActiveMembership").style.display = "block";
    }
});

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
        var audioSrc = option.value;
        var audioElement = new Audio(audioSrc);
        audioElements.push(audioElement);
    }
}

//Stop any video that is playing when user clicks outside of the video area
let currentlyPlayingVideo = null;

// Function to check if an element is inside a video
function isInsideVideo(element) {
    if (!element) return false;
    return element.tagName === 'VIDEO' || isInsideVideo(element.parentElement);
}

// Function to pause the currently playing video
function pauseCurrentlyPlayingVideo() {
    if (currentlyPlayingVideo && !currentlyPlayingVideo.paused) {
        currentlyPlayingVideo.pause();
    }
}

// Add click and touchstart event listeners to the document
document.addEventListener('click', handleOutsideClick);
document.addEventListener('touchstart', handleOutsideClick);

// Function to handle outside clicks (both click and touchstart)
function handleOutsideClick(event) {
    const clickTarget = event.target;

    // Check if the click target is not a video or inside a video
    if (!isInsideVideo(clickTarget)) {
        // Pause the currently playing video (if any)
        pauseCurrentlyPlayingVideo();
    }
}

// Function to play the video and update the currentlyPlayingVideo variable
function playVideo(video) {
    if (currentlyPlayingVideo && currentlyPlayingVideo !== video) {
        currentlyPlayingVideo.pause();
    }
    currentlyPlayingVideo = video;

    // Check if the video is paused (using in-built controls) and then play it
    if (video.paused) {
        video.play().catch(() => {
            // If the play() promise is rejected (e.g., due to autoplay restrictions), handle it here.
            // You can show a play button overlay and play the video when the user clicks the overlay.
        });
    }
}

// Add event listener to all videos on the page
const allVideos = document.getElementsByTagName('video');
for (let i = 0; i < allVideos.length; i++) {
    allVideos[i].addEventListener('play', function () {
        // Play the clicked video and update the currentlyPlayingVideo variable
        playVideo(this);
    });
}
let startX;

document.addEventListener('touchstart', function (e) {
    startX = e.touches[0].clientX;
}, false);

document.addEventListener('touchmove', function (e) {
    // Prevent default will stop user from scrolling horizontally but allows vertical scroll.
    // You might want to limit this prevention only for certain areas of your app.
    if (Math.abs(e.touches[0].clientX - startX) > 5) {  // Threshold of 5px
        e.preventDefault();
    }
}, false);

//logout add waiting screen
$(function () {
    $('#logoutForm').on('submit', function (e) {
        //loading indicator
        var loadingIndicator = document.getElementById('loadingIndicator');
        loadingIndicator.style.display = 'flex';
        // Display the content
        profilePage.classList.remove('open');
        profilePage.classList.add('hidden');
    });
});
//membership modal

const modal = document.getElementById("myModal");
const closeModalButton = document.getElementById("closeModal");
const modal2 = document.getElementById("myModal2");
const closeModalButton2 = document.getElementById("closeModal2");
const modal3 = document.getElementById("myModal3");
const closeModalButton3 = document.getElementById("closeModal3");

// Function to open the modal
function openModal() {
    modal.style.display = "block";
}

// Function to close the modal
function closeModal() {
    modal.style.display = "none";
}

// Event listener for closing the modal
closeModalButton.addEventListener("click", closeModal);

// Close the modal if the user clicks outside the modal content
window.addEventListener("click", function (event) {
    if (event.target === modal) {
        closeModal();
    }
});
function openModal2() {
    modal2.style.display = "block";
}

// Function to close the modal
function closeModal2() {
    modal2.style.display = "none";
}

// Event listener for closing the modal
closeModalButton2.addEventListener("click", closeModal2);

// Close the modal if the user clicks outside the modal content
window.addEventListener("click", function (event) {
    if (event.target === modal2) {
        closeModal2();
    }
});
// Get references to the radio buttons
const radioOption1 = document.getElementById("option1");
const radioOption2 = document.getElementById("option2");
const radioOption3 = document.getElementById("option3");
const radioOption4 = document.getElementById("option4");
const priceChoice = document.getElementById("priceChoice");
const monthlyBox = document.getElementById("monthlyBox");
const yearlyBox = document.getElementById("yearlyBox");



// Function to be triggered when a radio button is checked
function radioButtonChangeHandler() {
    if (this.checked) {
        // A radio button has been checked
        const selectedValue = this.id;
        if (selectedValue == "option1") {
            if (isPortuguese) {
                priceChoice.value = 5;
            } else {
                priceChoice.value = 3;
            }
            monthlyBox.style.backgroundColor = "aliceblue";
            yearlyBox.style.backgroundColor = "white";
        } else {
            if (isPortuguese) {
                priceChoice.value = 6;
            } else {
                priceChoice.value = 4;
            }
            yearlyBox.style.backgroundColor = "aliceblue";
            monthlyBox.style.backgroundColor = "white";
        }
    }
}
// Add event listeners to the radio buttons to listen for changes
radioOption1.addEventListener("change", radioButtonChangeHandler);
radioOption2.addEventListener("change", radioButtonChangeHandler);
monthlyBox.onclick = function () {
    if (!radioOption1.checked) {
        radioOption2.checked = false;
        radioOption1.checked = true;
        if (isPortuguese) {
            priceChoice.value = 5;
        } else {
            priceChoice.value = 3;
        }
        monthlyBox.style.backgroundColor = "aliceblue";
        yearlyBox.style.backgroundColor = "white";
    }
}
yearlyBox.onclick = function () {
    if (!radioOption2.checked) {
        radioOption2.checked = true;
        radioOption1.checked = false;
        if (isPortuguese) {
            priceChoice.value = 6;
        } else {
            priceChoice.value = 4;
        }
        yearlyBox.style.backgroundColor = "aliceblue";
        monthlyBox.style.backgroundColor = "white";
    }
}
var subscriptionBtn = document.getElementById("subscriptionBtn"),
    subscriptionBtn2 = document.getElementById("subscriptionBtn2"),
    getSubscriptionBtn = document.getElementById("getSubscriptionBtn"),
    SUBDate = document.getElementById("SUBDate"),
    SUBDate2 = document.getElementById("SUBDate2");
let currentDate;

subscriptionBtn.onclick = function () {
    openModal2();
}
getSubscriptionBtn.onclick = function () {
    openModal();
}
function openModal3() {
    modal3.style.display = "block";
}

// Function to close the modal
function closeModal3() {
    modal3.style.display = "none";
}

// Event listener for closing the modal
closeModalButton3.addEventListener("click", closeModal3);

// Close the modal if the user clicks outside the modal content
window.addEventListener("click", function (event) {
    if (event.target === modal3) {
        closeModal3();
    }
});
subscriptionBtn2.onclick = function () {
    SUBDate.value = date;
    currentDate = new Date();
    if (priceChoice.value == 3 || priceChoice.value == 5) {
        currentDate.setDate(currentDate.getDate() + 30);
        SUBDate2.value = currentDate.toLocaleDateString("en-IN");
    }
    else if (priceChoice.value == 4 || priceChoice.value == 6) {
        currentDate.setDate(currentDate.getDate() + 365);
        SUBDate2.value = currentDate.toLocaleDateString("en-IN");
    }
    else { console.log("Membership does no exist") }
    openModal3();
}
$(function () {
    $('#subscriptionForm').on('submit', function (e) {
        e.preventDefault(); // Prevent the default form submission

        //loading indicator
        var loadingIndicator = document.getElementById('loadingIndicator');
        loadingIndicator.style.display = 'flex';

        // Display the content
        closeModal2();
        profilePage.classList.remove('open');
        profilePage.classList.add('hidden');

        var formData = new FormData(this);
        $.ajax({
            url: "/?handler=SignMembership",
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function (response) {
                console.log(response);
                if (priceChoice.value == 3) {
                    window.location.href = "https://pay.brizabreath.com/b/4gw00udtj6Y57q8fZ1?prefilled_email=" + response;
                } else if (priceChoice.value == 4) {
                    window.location.href = "https://pay.brizabreath.com/b/00g9B4cpf5U18uc4gi?prefilled_email=" + response;
                } else if (priceChoice.value == 5) {
                    window.location.href = "https://pay.brizabreath.com/b/fZeeVo60R8294dW5kk?prefilled_email=" + response + "&locale=pt-BR";
                } else if (priceChoice.value == 6) {
                    window.location.href = "https://pay.brizabreath.com/b/dR66oSgFv0zHbGo9AB?prefilled_email=" + response + "&locale=pt-BR";
                } else {
                    console.log("No Memberships with this id");
                }
            },
            error: function (error) {
                console.error("Error adding membership:", error);
            }
        })
    });
});
$(function () {
    $('#manageSubscriptionForm').on('submit', function (e) {
        e.preventDefault(); // Prevent the default form submission

        //loading indicator
        var loadingIndicator = document.getElementById('loadingIndicator');
        loadingIndicator.style.display = 'flex';

        // Display the content
        closeModal2();
        profilePage.classList.remove('open');
        profilePage.classList.add('hidden');

        var formData = new FormData(this);

        $.ajax({
            url: "/?handler=RedirectToStripePortal",
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function (response) {
                if (response.success) {
                    window.location.href = response.url; // Redirect the browser to the Stripe portal
                } else {
                    console.error("Failed to get Stripe URL:", response);
                }
            },
            error: function (error) {
                console.error("Error adding membership:", error);
            }
        })
    });
});
let audioObjects = {};
const soundNames = ['bell', 'breathedeeply', 'exhale', 'exhaleLeft', 'exhaleRight', 'fullyin', 'fullyinHold', 'fullyout', 'fullyout2', 'hold', 'hum', 'inhale', 'inhaleLeft', 'inhaleRight', 'letGo', 'letgoandhold', 'lightNasal', 'normalbreath', 'nextRound', 'pinchRun', 'pinchWalk', 'recover'];
soundNames.forEach((name) => {
    audioObjects[name] = new Audio(`https://brizastorage.blob.core.windows.net/sounds/${name}${isPortuguese ? 'PT' : ''}.mp3`);
});

/*Links*/
var navResults = document.getElementById("navResults"),
    navResults2 = document.getElementById("navResults2"),
    navProfile = document.getElementById("navProfile"),
    navProfile2 = document.getElementById("navProfile2"),
    navHome = document.getElementById("navHome"),
    navHome2 = document.getElementById("navHome2"),
    breathHoldsLink = document.getElementById("breathHoldsLink"),
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
    BRELink = document.getElementById("BRELink"),
    backBRE = document.getElementById("backBRE"),
    BRWLink = document.getElementById("BRWLink"),
    backBRW = document.getElementById("backBRW"),
    BBLink = document.getElementById("BBLink"),
    backBB = document.getElementById("backBB"),
    brtSettings = document.getElementById("brtSettings"),
    backBRTset = document.getElementById("backBRTset"),
    YBLink = document.getElementById("YBLink"),
    backYB = document.getElementById("backYB"),
    YBSettings = document.getElementById("YBSettings"),
    backYBSet = document.getElementById("backYBSet"),
    breSettings = document.getElementById("breSettings"),
    backBREset = document.getElementById("backBREset"),
    brwSettings = document.getElementById("brwSettings"),
    backBRWset = document.getElementById("backBRWset"),
    BBSettings = document.getElementById("BBSettings"),
    backBBset = document.getElementById("backBBset"),
    hatSettings = document.getElementById("hatSettings"),
    HATLink = document.getElementById("HATLink"),
    backHATset = document.getElementById("backHATset"),
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
    backCTSet = document.getElementById("backCTSet"),
    UBLink = document.getElementById("UBLink"),
    backUB = document.getElementById("backUB"),
    UBSettings = document.getElementById("UBSettings"),
    backUBSet = document.getElementById("backUBSet"),
    KBLink = document.getElementById("KBLink"),
    backKB = document.getElementById("backKB"),
    KBSettings = document.getElementById("KBSettings"),
    backKBSet = document.getElementById("backKBset"),
    BOXLink = document.getElementById("BOXLink"),
    backBOX = document.getElementById("backBOX"),
    BOXSettings = document.getElementById("BOXSettings"),
    backBOXSet = document.getElementById("backBOXSet"),
    NBLink = document.getElementById("NBLink"),
    backNB = document.getElementById("backNB"),
    NBSettings = document.getElementById("NBSettings"),
    backNBSet = document.getElementById("backNBSet"),
    CBLink = document.getElementById("CBLink"),
    backCB = document.getElementById("backCB"),
    CBSettings = document.getElementById("CBSettings"),
    backCBSet = document.getElementById("backCBSet"),
    SBLink = document.getElementById("SBLink"),
    backSB = document.getElementById("backSB"),
    SBSettings = document.getElementById("SBSettings"),
    backSBSet = document.getElementById("backSBSet"),
    RBLink = document.getElementById("RBLink"),
    backRB = document.getElementById("backRB"),
    RBSettings = document.getElementById("RBSettings"),
    backRBSet = document.getElementById("backRBSet"),
    NKLink = document.getElementById("NKLink"),
    backNK = document.getElementById("backNK"),
    MEDLink = document.getElementById("MEDLink"),
    backMED = document.getElementById("backMED"),
    SLEEPLink = document.getElementById("SLEEPLink"),
    backSLEEP = document.getElementById("backSLEEP"),
    HYDLink = document.getElementById("HYDLink"),
    backHYD = document.getElementById("backHYD"),
    SHOTLink = document.getElementById("SHOTLink"),
    backSHOT = document.getElementById("backSHOT"),
    ILLink = document.getElementById("ILLink"),
    backIL = document.getElementById("backIL"),
    BEETLink = document.getElementById("BEETLink"),
    backBEET = document.getElementById("backBEET"),
    DIETLink = document.getElementById("DIETLink"),
    backDIET = document.getElementById("backDIET"),
    ICELink = document.getElementById("ICELink"),
    backICE = document.getElementById("backICE"),
    EXERCISINGLink = document.getElementById("EXERCISINGLink"),
    backEXERCISING = document.getElementById("backEXERCISING"),
    HUMLink = document.getElementById("HUMLink"),
    backHUM = document.getElementById("backHUM"),
    humSettings = document.getElementById("humSettings"),
    backHUMSet = document.getElementById("backHUMset"),
    backBRTresults = document.getElementById("backBRTresults"),
    backLUNGSresults = document.getElementById("backLUNGSresults"),
    backYBresults = document.getElementById("backYBresults"),
    backBREresults = document.getElementById("backBREresults"),
    backBRWresults = document.getElementById("backBRWresults"),
    backBBresults = document.getElementById("backBBresults"),
    backAPresults = document.getElementById("backAPresults"),
    backCTresults = document.getElementById("backCTresults"),
    backBOXresults = document.getElementById("backBOXresults"),
    backUBresults = document.getElementById("backUBresults"),
    backNBresults = document.getElementById("backNBresults"),
    backSBresults = document.getElementById("backSBresults"),
    backCBresults = document.getElementById("backCBresults"),
    backRBresults = document.getElementById("backRBresults"),
    backHUMresults = document.getElementById("backHUMresults"),
    backWHresults = document.getElementById("backWHresults"),
    backKBresults = document.getElementById("backKBresults"),
    backHATresults = document.getElementById("backHATresults"),
    backHATCresults = document.getElementById("backHATCresults"),
    backAHATresults = document.getElementById("backAHATresults"),
    backO2results = document.getElementById("backO2results"),
    backCO2results = document.getElementById("backCO2results");

/*Pages*/
var homePage = document.getElementById("homePage"),
    profilePage = document.getElementById("profilePage"),
    programPage = document.getElementById("programPage"),
    nasalBreathingPage = document.getElementById("nasalBreathingPage"),
    noseUnblockPage = document.getElementById("noseUnblockPage"),
    brtPage = document.getElementById("brtPage"),
    diaphragmPage = document.getElementById("diaphragmPage"),
    YBPage = document.getElementById("YBPage"),
    YBSettingsPage = document.getElementById("YBSettingsPage"),
    BREPage = document.getElementById("BREPage"),
    BRWPage = document.getElementById("BRWPage"),
    BBPage = document.getElementById("BBPage"),
    brtSettingsPage = document.getElementById("brtSettingsPage"),
    breSettingsPage = document.getElementById("breSettingsPage"),
    brwSettingsPage = document.getElementById("brwSettingsPage"),
    bbSettingsPage = document.getElementById("bbSettingsPage"),
    HATPage = document.getElementById("HATPage"),
    hatSettingsPage = document.getElementById("hatSettingsPage"),
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
    CTSettingsPage = document.getElementById("CTSettingsPage"),
    UBPage = document.getElementById("UBPage"),
    UBSettingsPage = document.getElementById("UBSettingsPage"),
    KBPage = document.getElementById("KBPage"),
    KBSettingsPage = document.getElementById("KBSettingsPage"),
    BOXPage = document.getElementById("BOXPage"),
    BOXSettingsPage = document.getElementById("BOXSettingsPage"),
    NBPage = document.getElementById("NBPage"),
    NBSettingsPage = document.getElementById("NBSettingsPage"),
    CBPage = document.getElementById("CBPage"),
    CBSettingsPage = document.getElementById("CBSettingsPage"),
    SBPage = document.getElementById("SBPage"),
    SBSettingsPage = document.getElementById("SBSettingsPage"),
    RBPage = document.getElementById("RBPage"),
    RBSettingsPage = document.getElementById("RBSettingsPage"),
    NKPage = document.getElementById("NKPage"),
    MEDPage = document.getElementById("MEDPage"),
    SLEEPPage = document.getElementById("SLEEPPage"),
    HYDPage = document.getElementById("HYDPage"),
    SHOTPage = document.getElementById("SHOTPage"),
    ILPage = document.getElementById("ILPage"),
    BEETPage = document.getElementById("BEETPage"),
    DIETPage = document.getElementById("DIETPage"),
    ICEPage = document.getElementById("ICEPage"),
    EXERCISINGPage = document.getElementById("EXERCISINGPage"),
    HUMPage = document.getElementById("HUMPage"),
    humSettingsPage = document.getElementById("humSettingsPage"),
    selectSongsList = document.getElementById("selectSongsList");

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
navResults.onclick = function () {
    if (isUserActiveSubscriber) {
        document.getElementById("homeFooter").style.display = "none";
        document.getElementById("resultsFooter").style.display = "block";
        openPage(homePage, resultsPage, 'slideLeft');
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        $.ajax({
            url: "/?fetchData=true",
            type: 'GET',
            success: function (data) {
                fetchedDataArray = data;
                // Check if there is at least one non-empty and non-null BRTtimeString
                var hasNonEmptyTimeStrings = fetchedDataArray.some(function (BRTresultData) {
                    var BRTtimeString = BRTresultData.brtResultScore;
                    return BRTtimeString !== undefined && BRTtimeString !== '' && BRTtimeString !== null;
                });

                if (hasNonEmptyTimeStrings) {
                    BRTupdateChart(BRTstartDate, BRTendDate);
                }
                BRTupdateOverview();
                // Check if there is at least one non-empty and non-null BRTtimeString
                var hasNonEmptyTimeStrings = fetchedDataArray.some(function (LUNGSresultData) {
                    var LUNGStimeString = LUNGSresultData.lungsResultScore;
                    return LUNGStimeString !== undefined && LUNGStimeString !== '' && LUNGStimeString !== null;
                });

                if (hasNonEmptyTimeStrings) {
                    LUNGSupdateChart(LUNGSstartDate, LUNGSendDate);
                }
                LUNGSupdateOverview();
                // Check if there is at least one non-empty and non-null YBtimeString
                var hasNonEmptyTimeStrings = fetchedDataArray.some(function (YBresultData) {
                    var YBtimeString = YBresultData.YBTotalTime;
                    return YBtimeString !== undefined && YBtimeString !== '' && YBtimeString !== null;
                });

                if (hasNonEmptyTimeStrings) {
                    YBupdateChart(YBstartDate, YBendDate);
                }
                YBupdateOverview();
                // Check if there is at least one non-empty and non-null BREtimeString
                var hasNonEmptyTimeStrings = fetchedDataArray.some(function (BREresultData) {
                    var BREtimeString = BREresultData.breTotalTime;
                    return BREtimeString !== undefined && BREtimeString !== '' && BREtimeString !== null;
                });

                if (hasNonEmptyTimeStrings) {
                    BREupdateChart(BREstartDate, BREendDate);
                }
                BREupdateOverview();
                // Check if there is at least one non-empty and non-null BRWtimeString
                var hasNonEmptyTimeStrings = fetchedDataArray.some(function (BRWresultData) {
                    var BRWtimeString = BRWresultData.brwTotalTime;
                    return BRWtimeString !== undefined && BRWtimeString !== '' && BRWtimeString !== null;
                });

                if (hasNonEmptyTimeStrings) {
                    BRWupdateChart(BRWstartDate, BRWendDate);
                }
                BRWupdateOverview();
                // Check if there is at least one non-empty and non-null BBtimeString
                var hasNonEmptyTimeStrings = fetchedDataArray.some(function (BBresultData) {
                    var BBtimeString = BBresultData.bbTotalTime;
                    return BBtimeString !== undefined && BBtimeString !== '' && BBtimeString !== null;
                });

                if (hasNonEmptyTimeStrings) {
                    BBupdateChart(BBstartDate, BBendDate);
                }
                BBupdateOverview();
                // Check if there is at least one non-empty and non-null APtimeString
                var hasNonEmptyTimeStrings = fetchedDataArray.some(function (APresultData) {
                    var APtimeString = APresultData.apTotalTime;
                    return APtimeString !== undefined && APtimeString !== '' && APtimeString !== null;
                });

                if (hasNonEmptyTimeStrings) {
                    APupdateChart(APstartDate, APendDate);
                }
                APupdateOverview();
                // Check if there is at least one non-empty and non-null CTtimeString
                var hasNonEmptyTimeStrings = fetchedDataArray.some(function (CTresultData) {
                    var CTtimeString = CTresultData.ctTotalTime;
                    return CTtimeString !== undefined && CTtimeString !== '' && CTtimeString !== null;
                });

                if (hasNonEmptyTimeStrings) {
                    CTupdateChart(CTstartDate, CTendDate);
                }
                CTupdateOverview();
                // Check if there is at least one non-empty and non-null BOXtimeString
                var hasNonEmptyTimeStrings = fetchedDataArray.some(function (BOXresultData) {
                    var BOXtimeString = BOXresultData.boxTotalTime;
                    return BOXtimeString !== undefined && BOXtimeString !== '' && BOXtimeString !== null;
                });

                if (hasNonEmptyTimeStrings) {
                    BOXupdateChart(BOXstartDate, BOXendDate);
                }
                BOXupdateOverview();
                // Check if there is at least one non-empty and non-null UBtimeString
                var hasNonEmptyTimeStrings = fetchedDataArray.some(function (UBresultData) {
                    var UBtimeString = UBresultData.ubTotalTime;
                    return UBtimeString !== undefined && UBtimeString !== '' && UBtimeString !== null;
                });

                if (hasNonEmptyTimeStrings) {
                    UBupdateChart(UBstartDate, UBendDate);
                }
                UBupdateOverview();
                // Check if there is at least one non-empty and non-null NBtimeString
                var hasNonEmptyTimeStrings = fetchedDataArray.some(function (NBresultData) {
                    var NBtimeString = NBresultData.nbTotalTime;
                    return NBtimeString !== undefined && NBtimeString !== '' && NBtimeString !== null;
                });

                if (hasNonEmptyTimeStrings) {
                    NBupdateChart(NBstartDate, NBendDate);
                }
                NBupdateOverview();
                // Check if there is at least one non-empty and non-null SBtimeString
                var hasNonEmptyTimeStrings = fetchedDataArray.some(function (SBresultData) {
                    var SBtimeString = SBresultData.sbTotalTime;
                    return SBtimeString !== undefined && SBtimeString !== '' && SBtimeString !== null;
                });

                if (hasNonEmptyTimeStrings) {
                    SBupdateChart(SBstartDate, SBendDate);
                }
                SBupdateOverview();
                // Check if there is at least one non-empty and non-null CBtimeString
                var hasNonEmptyTimeStrings = fetchedDataArray.some(function (CBresultData) {
                    var CBtimeString = CBresultData.cbTotalTime;
                    return CBtimeString !== undefined && CBtimeString !== '' && CBtimeString !== null;
                });

                if (hasNonEmptyTimeStrings) {
                    CBupdateChart(CBstartDate, CBendDate);
                }
                CBupdateOverview();
                // Check if there is at least one non-empty and non-null RBtimeString
                var hasNonEmptyTimeStrings = fetchedDataArray.some(function (RBresultData) {
                    var RBtimeString = RBresultData.rbTotalTime;
                    return RBtimeString !== undefined && RBtimeString !== '' && RBtimeString !== null;
                });

                if (hasNonEmptyTimeStrings) {
                    RBupdateChart(RBstartDate, RBendDate);
                }
                RBupdateOverview();
                // Check if there is at least one non-empty and non-null HUMtimeString
                var hasNonEmptyTimeStrings = fetchedDataArray.some(function (HUMresultData) {
                    var HUMtimeString = HUMresultData.humTotalTime;
                    return HUMtimeString !== undefined && HUMtimeString !== '' && HUMtimeString !== null;
                });

                if (hasNonEmptyTimeStrings) {
                    HUMupdateChart(HUMstartDate, HUMendDate);
                }
                HUMupdateOverview();
                // Check if there is at least one non-empty and non-null WHtimeString
                var hasNonEmptyTimeStrings = fetchedDataArray.some(function (WHresultData) {
                    var WHtimeString = WHresultData.whTotalTime;
                    return WHtimeString !== undefined && WHtimeString !== '' && WHtimeString !== null;
                });

                if (hasNonEmptyTimeStrings) {
                    WHupdateChart(WHstartDate, WHendDate);
                }
                WHupdateOverview();
                // Check if there is at least one non-empty and non-null KBtimeString
                var hasNonEmptyTimeStrings = fetchedDataArray.some(function (KBresultData) {
                    var KBtimeString = KBresultData.kbTotalTime;
                    return KBtimeString !== undefined && KBtimeString !== '' && KBtimeString !== null;
                });

                if (hasNonEmptyTimeStrings) {
                    KBupdateChart(KBstartDate, KBendDate);
                }
                KBupdateOverview();
                // Check if there is at least one non-empty and non-null HATtimeString
                var hasNonEmptyTimeStrings = fetchedDataArray.some(function (HATresultData) {
                    var HATtimeString = HATresultData.hatTotalTime;
                    return HATtimeString !== undefined && HATtimeString !== '' && HATtimeString !== null;
                });

                if (hasNonEmptyTimeStrings) {
                    HATupdateChart(HATstartDate, HATendDate);
                }
                HATupdateOverview();
                // Check if there is at least one non-empty and non-null HATCtimeString
                var hasNonEmptyTimeStrings = fetchedDataArray.some(function (HATCresultData) {
                    var HATCtimeString = HATCresultData.hatcTotalTime;
                    return HATCtimeString !== undefined && HATCtimeString !== '' && HATCtimeString !== null;
                });

                if (hasNonEmptyTimeStrings) {
                    HATCupdateChart(HATCstartDate, HATCendDate);
                }
                HATCupdateOverview();
                // Check if there is at least one non-empty and non-null AHATtimeString
                var hasNonEmptyTimeStrings = fetchedDataArray.some(function (AHATresultData) {
                    var AHATtimeString = AHATresultData.ahatTotalTime;
                    return AHATtimeString !== undefined && AHATtimeString !== '' && AHATtimeString !== null;
                });

                if (hasNonEmptyTimeStrings) {
                    AHATupdateChart(AHATstartDate, AHATendDate);
                }
                AHATupdateOverview();
                // Check if there is at least one non-empty and non-null CO2timeString
                var hasNonEmptyTimeStrings = fetchedDataArray.some(function (CO2resultData) {
                    var CO2timeString = CO2resultData.co2TotalTime;
                    return CO2timeString !== undefined && CO2timeString !== '' && CO2timeString !== null;
                });

                if (hasNonEmptyTimeStrings) {
                    CO2updateChart(CO2startDate, CO2endDate);
                }
                CO2updateOverview();
                // Check if there is at least one non-empty and non-null O2timeString
                var hasNonEmptyTimeStrings = fetchedDataArray.some(function (O2resultData) {
                    var O2timeString = O2resultData.o2TotalTime;
                    return O2timeString !== undefined && O2timeString !== '' && O2timeString !== null;
                });

                if (hasNonEmptyTimeStrings) {
                    O2updateChart(O2startDate, O2endDate);
                }
                O2updateOverview();
            },
            error: function (error) {
                console.error("Error fetching data:", error);
            }
        });

    } else {
        openModal();
    }
}
navResults2.onclick = function () {
    if (isUserActiveSubscriber) {
        document.getElementById("profileFooter").style.display = "none";
        document.getElementById("resultsFooter").style.display = "block";
        openPage(profilePage, resultsPage, 'slideRight');
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        $.ajax({
            url: "/?fetchData=true",
            type: 'GET',
            success: function (data) {
                fetchedDataArray = data;

                // Check if there is at least one non-empty and non-null BRTtimeString
                var hasNonEmptyTimeStrings = fetchedDataArray.some(function (BRTresultData) {
                    var BRTtimeString = BRTresultData.brtResultScore;
                    return BRTtimeString !== undefined && BRTtimeString !== '' && BRTtimeString !== null;
                });

                if (hasNonEmptyTimeStrings) {
                    BRTupdateChart(BRTstartDate, BRTendDate);
                }

                BRTupdateOverview();
                // Check if there is at least one non-empty and non-null lungstimeString
                var hasNonEmptyTimeStrings = fetchedDataArray.some(function (LUNGSresultData) {
                    var LUNGStimeString = LUNGSresultData.lungsResultScore;
                    return LUNGStimeString !== undefined && LUNGStimeString !== '' && LUNGStimeString !== null;
                });

                if (hasNonEmptyTimeStrings) {
                    LUNGSupdateChart(LUNGSstartDate, LUNGSendDate);
                }
                LUNGSupdateOverview();
                // Check if there is at least one non-empty and non-null YBtimeString
                var hasNonEmptyTimeStrings = fetchedDataArray.some(function (YBresultData) {
                    var YBtimeString = YBresultData.YBTotalTime;
                    return YBtimeString !== undefined && YBtimeString !== '' && YBtimeString !== null;
                });

                if (hasNonEmptyTimeStrings) {
                    YBupdateChart(YBstartDate, YBendDate);
                }
                YBupdateOverview();
                // Check if there is at least one non-empty and non-null BREtimeString
                var hasNonEmptyTimeStrings = fetchedDataArray.some(function (BREresultData) {
                    var BREtimeString = BREresultData.breTotalTime;
                    return BREtimeString !== undefined && BREtimeString !== '' && BREtimeString !== null;
                });

                if (hasNonEmptyTimeStrings) {
                    BREupdateChart(BREstartDate, BREendDate);
                }
                BREupdateOverview();
                // Check if there is at least one non-empty and non-null BRWtimeString
                var hasNonEmptyTimeStrings = fetchedDataArray.some(function (BRWresultData) {
                    var BRWtimeString = BRWresultData.brwTotalTime;
                    return BRWtimeString !== undefined && BRWtimeString !== '' && BRWtimeString !== null;
                });

                if (hasNonEmptyTimeStrings) {
                    BRWupdateChart(BRWstartDate, BRWendDate);
                }
                BRWupdateOverview();
                // Check if there is at least one non-empty and non-null BBtimeString
                var hasNonEmptyTimeStrings = fetchedDataArray.some(function (BBresultData) {
                    var BBtimeString = BBresultData.bbTotalTime;
                    return BBtimeString !== undefined && BBtimeString !== '' && BBtimeString !== null;
                });

                if (hasNonEmptyTimeStrings) {
                    BBupdateChart(BBstartDate, BBendDate);
                }
                BBupdateOverview();
                // Check if there is at least one non-empty and non-null APtimeString
                var hasNonEmptyTimeStrings = fetchedDataArray.some(function (APresultData) {
                    var APtimeString = APresultData.apTotalTime;
                    return APtimeString !== undefined && APtimeString !== '' && APtimeString !== null;
                });

                if (hasNonEmptyTimeStrings) {
                    APupdateChart(APstartDate, APendDate);
                }
                APupdateOverview();
                // Check if there is at least one non-empty and non-null CTtimeString
                var hasNonEmptyTimeStrings = fetchedDataArray.some(function (CTresultData) {
                    var CTtimeString = CTresultData.ctTotalTime;
                    return CTtimeString !== undefined && CTtimeString !== '' && CTtimeString !== null;
                });

                if (hasNonEmptyTimeStrings) {
                    CTupdateChart(CTstartDate, CTendDate);
                }
                CTupdateOverview();
                // Check if there is at least one non-empty and non-null BOXtimeString
                var hasNonEmptyTimeStrings = fetchedDataArray.some(function (BOXresultData) {
                    var BOXtimeString = BOXresultData.boxTotalTime;
                    return BOXtimeString !== undefined && BOXtimeString !== '' && BOXtimeString !== null;
                });

                if (hasNonEmptyTimeStrings) {
                    BOXupdateChart(BOXstartDate, BOXendDate);
                }
                BOXupdateOverview();
                // Check if there is at least one non-empty and non-null UBtimeString
                var hasNonEmptyTimeStrings = fetchedDataArray.some(function (UBresultData) {
                    var UBtimeString = UBresultData.ubTotalTime;
                    return UBtimeString !== undefined && UBtimeString !== '' && UBtimeString !== null;
                });

                if (hasNonEmptyTimeStrings) {
                    UBupdateChart(UBstartDate, UBendDate);
                }
                UBupdateOverview();
                // Check if there is at least one non-empty and non-null NBtimeString
                var hasNonEmptyTimeStrings = fetchedDataArray.some(function (NBresultData) {
                    var NBtimeString = NBresultData.nbTotalTime;
                    return NBtimeString !== undefined && NBtimeString !== '' && NBtimeString !== null;
                });

                if (hasNonEmptyTimeStrings) {
                    NBupdateChart(NBstartDate, NBendDate);
                }
                NBupdateOverview();
                // Check if there is at least one non-empty and non-null SBtimeString
                var hasNonEmptyTimeStrings = fetchedDataArray.some(function (SBresultData) {
                    var SBtimeString = SBresultData.sbTotalTime;
                    return SBtimeString !== undefined && SBtimeString !== '' && SBtimeString !== null;
                });

                if (hasNonEmptyTimeStrings) {
                    SBupdateChart(SBstartDate, SBendDate);
                }
                SBupdateOverview();
                // Check if there is at least one non-empty and non-null CBtimeString
                var hasNonEmptyTimeStrings = fetchedDataArray.some(function (CBresultData) {
                    var CBtimeString = CBresultData.cbTotalTime;
                    return CBtimeString !== undefined && CBtimeString !== '' && CBtimeString !== null;
                });

                if (hasNonEmptyTimeStrings) {
                    CBupdateChart(CBstartDate, CBendDate);
                }
                CBupdateOverview();
                // Check if there is at least one non-empty and non-null RBtimeString
                var hasNonEmptyTimeStrings = fetchedDataArray.some(function (RBresultData) {
                    var RBtimeString = RBresultData.rbTotalTime;
                    return RBtimeString !== undefined && RBtimeString !== '' && RBtimeString !== null;
                });

                if (hasNonEmptyTimeStrings) {
                    RBupdateChart(RBstartDate, RBendDate);
                }
                RBupdateOverview();
                // Check if there is at least one non-empty and non-null HUMtimeString
                var hasNonEmptyTimeStrings = fetchedDataArray.some(function (HUMresultData) {
                    var HUMtimeString = HUMresultData.humTotalTime;
                    return HUMtimeString !== undefined && HUMtimeString !== '' && HUMtimeString !== null;
                });

                if (hasNonEmptyTimeStrings) {
                    HUMupdateChart(HUMstartDate, HUMendDate);
                }
                HUMupdateOverview();
                // Check if there is at least one non-empty and non-null WHtimeString
                var hasNonEmptyTimeStrings = fetchedDataArray.some(function (WHresultData) {
                    var WHtimeString = WHresultData.whTotalTime;
                    return WHtimeString !== undefined && WHtimeString !== '' && WHtimeString !== null;
                });

                if (hasNonEmptyTimeStrings) {
                    WHupdateChart(WHstartDate, WHendDate);
                }
                WHupdateOverview();
                // Check if there is at least one non-empty and non-null KBtimeString
                var hasNonEmptyTimeStrings = fetchedDataArray.some(function (KBresultData) {
                    var KBtimeString = KBresultData.kbTotalTime;
                    return KBtimeString !== undefined && KBtimeString !== '' && KBtimeString !== null;
                });

                if (hasNonEmptyTimeStrings) {
                    KBupdateChart(KBstartDate, KBendDate);
                }
                KBupdateOverview();
                // Check if there is at least one non-empty and non-null HATtimeString
                var hasNonEmptyTimeStrings = fetchedDataArray.some(function (HATresultData) {
                    var HATtimeString = HATresultData.hatTotalTime;
                    return HATtimeString !== undefined && HATtimeString !== '' && HATtimeString !== null;
                });

                if (hasNonEmptyTimeStrings) {
                    HATupdateChart(HATstartDate, HATendDate);
                }
                HATupdateOverview();
                // Check if there is at least one non-empty and non-null HATCtimeString
                var hasNonEmptyTimeStrings = fetchedDataArray.some(function (HATCresultData) {
                    var HATCtimeString = HATCresultData.hatcTotalTime;
                    return HATCtimeString !== undefined && HATCtimeString !== '' && HATCtimeString !== null;
                });

                if (hasNonEmptyTimeStrings) {
                    HATCupdateChart(HATCstartDate, HATCendDate);
                }
                HATCupdateOverview();
                // Check if there is at least one non-empty and non-null AHATtimeString
                var hasNonEmptyTimeStrings = fetchedDataArray.some(function (AHATresultData) {
                    var AHATtimeString = AHATresultData.ahatTotalTime;
                    return AHATtimeString !== undefined && AHATtimeString !== '' && AHATtimeString !== null;
                });

                if (hasNonEmptyTimeStrings) {
                    AHATupdateChart(AHATstartDate, AHATendDate);
                }
                AHATupdateOverview();
                // Check if there is at least one non-empty and non-null CO2timeString
                var hasNonEmptyTimeStrings = fetchedDataArray.some(function (CO2resultData) {
                    var CO2timeString = CO2resultData.co2TotalTime;
                    return CO2timeString !== undefined && CO2timeString !== '' && CO2timeString !== null;
                });

                if (hasNonEmptyTimeStrings) {
                    CO2updateChart(CO2startDate, CO2endDate);
                }
                CO2updateOverview();
                // Check if there is at least one non-empty and non-null O2timeString
                var hasNonEmptyTimeStrings = fetchedDataArray.some(function (O2resultData) {
                    var O2timeString = O2resultData.o2TotalTime;
                    return O2timeString !== undefined && O2timeString !== '' && O2timeString !== null;
                });

                if (hasNonEmptyTimeStrings) {
                    O2updateChart(O2startDate, O2endDate);
                }
                O2updateOverview();
            },
            error: function (error) {
                console.error("Error fetching data:", error);
            }
        });
    }else{
        openModal();
    }
}
navProfile.onclick = function () {
    document.getElementById("profileFooter").style.display = "block";
    document.getElementById("homeFooter").style.display = "none";
    openPage(homePage, profilePage, 'slideLeft');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
navProfile2.onclick = function () {
    document.getElementById("profileFooter").style.display = "block";
    document.getElementById("resultsFooter").style.display = "none";
    openPage(resultsPage, profilePage, 'slideLeft');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
navHome.onclick = function () {
    document.getElementById("homeFooter").style.display = "block";
    document.getElementById("resultsFooter").style.display = "none";
    openPage(resultsPage, homePage, 'slideRight');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
navHome2.onclick = function () {
    document.getElementById("profileFooter").style.display = "none";
    document.getElementById("homeFooter").style.display = "block";
    openPage(profilePage, homePage, 'slideRight');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
programLink.onclick = function () {
    if (isUserActiveSubscriber) {
        $.ajax({
            url: "/?fetchData=true",
            type: 'GET',
            success: function (data) {
                fetchedDataArray = data;
                // Check if there is at least one non-empty and non-null BRTtimeString
                var hasNonEmptyTimeStrings = fetchedDataArray.some(function (BRTresultData) {
                    var BRTtimeString = BRTresultData.brtResultScore;
                    return BRTtimeString !== undefined && BRTtimeString !== '' && BRTtimeString !== null;
                });

                if (hasNonEmptyTimeStrings) {
                    BRTupdateChart(BRTstartDate, BRTendDate);
                }
                BRTupdateOverview();

            },
            error: function (error) {
                console.error("Error fetching data:", error);
            }
        });
        openPage(homePage, programPage, 'slideLeft');
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        audioObjects.bell.load();
        audioElements.forEach((audio) => {
            audio.load();
        });
    } else {
        openModal();
    }
}
backProgram.onclick = function () {
    openPage(programPage, homePage, 'slideRight');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
backNasal.onclick = function () {
    openPage(nasalBreathingPage, programPage, 'slideRight');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
backUnblock.onclick = function () {
    openPage(noseUnblockPage, programPage, 'slideRight');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
brtLink.onclick = function () {
    openPage(homePage, brtPage, 'slideUp');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    audioObjects.bell.load();
    audioElements.forEach((audio) => {
        audio.load();
    });
}
backBRT.onclick = function () {
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
}

backDiaphragm.onclick = function () {
    openPage(diaphragmPage, programPage, 'slideRight');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

backYB.onclick = function () {
    openPage(YBPage, programPage, 'slideRight');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
YBSettings.onclick = function () {
    openPage(YBPage, YBSettingsPage, 'slideUp');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    selectSongsList.style.display = "block";
}
backYBSet.onclick = function () {
    if (!audioPlayerBRT.muted) {
        audioPlayerBRT.pause();
    }
    audioPlayerBRT.currentTime = 0;
    openPage(YBSettingsPage, YBPage, 'slideDown');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    selectSongsList.style.display = "none";
}

backBRE.onclick = function () {
    openPage(BREPage, programPage, 'slideRight');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
backBRW.onclick = function () {
    openPage(BRWPage, programPage, 'slideRight');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

backBB.onclick = function () {
    openPage(BBPage, programPage, 'slideRight');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
brtSettings.onclick = function () {
    openPage(brtPage, brtSettingsPage, 'slideUp');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    selectSongsList.style.display = "block";
}
backBRTset.onclick = function () {
    if (!audioPlayerBRT.muted) {
        audioPlayerBRT.pause();
    }
    audioPlayerBRT.currentTime = 0;
    openPage(brtSettingsPage, brtPage, 'slideDown');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    selectSongsList.style.display = "none";
}
breSettings.onclick = function () {
    openPage(BREPage, breSettingsPage, 'slideUp');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    selectSongsList.style.display = "block";
}
backBREset.onclick = function () {
    if (!audioPlayerBRT.muted) {
        audioPlayerBRT.pause();
    }
    audioPlayerBRT.currentTime = 0;
    openPage(breSettingsPage, BREPage, 'slideDown');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    selectSongsList.style.display = "none";
}
brwSettings.onclick = function () {
    openPage(BRWPage, brwSettingsPage, 'slideUp');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    selectSongsList.style.display = "block";
}
backBRWset.onclick = function () {
    if (!audioPlayerBRT.muted) {
        audioPlayerBRT.pause();
    }
    audioPlayerBRT.currentTime = 0;
    openPage(brwSettingsPage, BRWPage, 'slideDown');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    selectSongsList.style.display = "none";
}
BBSettings.onclick = function () {
    openPage(BBPage, bbSettingsPage, 'slideUp');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    selectSongsList.style.display = "block";
}
backBBset.onclick = function () {
    if (!audioPlayerBRT.muted) {
        audioPlayerBRT.pause();
    }
    audioPlayerBRT.currentTime = 0;
    openPage(bbSettingsPage, BBPage, 'slideDown');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    selectSongsList.style.display = "none";
}
backHAT.onclick = function () {
    openPage(HATPage, programPage, 'slideRight');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
hatSettings.onclick = function () {
    openPage(HATPage, hatSettingsPage, 'slideUp');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    selectSongsList.style.display = "block";
}
backHATset.onclick = function () {
    if (!audioPlayerBRT.muted) {
        audioPlayerBRT.pause();
    }
    audioPlayerBRT.currentTime = 0;
    openPage(hatSettingsPage, HATPage, 'slideDown');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    selectSongsList.style.display = "none";
}

backHATC.onclick = function () {
    openPage(HATCPage, programPage, 'slideRight');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
hatcSettings.onclick = function () {
    openPage(HATCPage, hatcSettingsPage, 'slideUp');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    selectSongsList.style.display = "block";
}
backHATCset.onclick = function () {
    if (!audioPlayerBRT.muted) {
        audioPlayerBRT.pause();
    }
    audioPlayerBRT.currentTime = 0;
    openPage(hatcSettingsPage, HATCPage, 'slideDown');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    selectSongsList.style.display = "none";
}

backAHAT.onclick = function () {
    openPage(AHATPage, programPage, 'slideRight');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
ahatSettings.onclick = function () {
    openPage(AHATPage, hatSettingsPage, 'slideUp');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    selectSongsList.style.display = "block";
}
backAHATset.onclick = function () {
    if (!audioPlayerBRT.muted) {
        audioPlayerBRT.pause();
    }
    audioPlayerBRT.currentTime = 0;
    openPage(ahatSettingsPage, AHATPage, 'slideDown');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    selectSongsList.style.display = "none";
}
lungsLink.onclick = function () {
    if (isUserActiveSubscriber) {
        openPage(homePage, lungsPage, 'slideLeft');
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        audioObjects.bell.load();
        audioElements.forEach((audio) => {
            audio.load();
        });
    } else {
        openModal();
    }
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
    if (!audioPlayerBRT.muted){
        audioPlayerBRT.pause();
    }
    audioPlayerBRT.currentTime = 0;
    lungsIsOn = false;
}
lungsSettings.onclick = function () {
    openPage(lungsPage, lungsSettingsPage, 'slideUp');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    selectSongsList.style.display = "block";
}
backLungsset.onclick = function () {
    if (!audioPlayerBRT.muted) {
        audioPlayerBRT.pause();
    }
    audioPlayerBRT.currentTime = 0;
    openPage(lungsSettingsPage, lungsPage, 'slideDown');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    selectSongsList.style.display = "none";
}
mobilityLink.onclick = function () {
    openPage(homePage, mobilityPage, 'slideLeft');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
backMobility.onclick = function () {
    openPage(mobilityPage, homePage, 'slideRight');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
breathHoldsLink.onclick = function () {
    openPage(homePage, BHPage, 'slideLeft');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    audioObjects.bell.load();
    audioElements.forEach((audio) => {
        audio.load();
    });
}
backBH.onclick = function () {
    openPage(BHPage, homePage, 'slideRight');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
pranayamaLink.onclick = function () {
    openPage(homePage, PRANAPage, 'slideLeft');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    audioObjects.bell.load();
    audioElements.forEach((audio) => {
        audio.load();
    });
}
backPRANA.onclick = function () {
    openPage(PRANAPage, homePage, 'slideRight');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
extrasLink.onclick = function () {
    openPage(homePage, EXTRAPage, 'slideLeft');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
backEXTRA.onclick = function () {
    openPage(EXTRAPage, homePage, 'slideRight');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
APLink.onclick = function () {
    openPage(BHPage, APPage, 'slideUp');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
backAP.onclick = function () {
    openPage(APPage, BHPage, 'slideRight');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
APSettings.onclick = function () {
    openPage(APPage, APSettingsPage, 'slideUp');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    selectSongsList.style.display = "block";
}
backAPSet.onclick = function () {
    if (!audioPlayerBRT.muted) {
        audioPlayerBRT.pause();
    }
    audioPlayerBRT.currentTime = 0;
    openPage(APSettingsPage, APPage, 'slideDown');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    selectSongsList.style.display = "none";
}
co2o2Link.onclick = function () {
    if (isUserActiveSubscriber) {
        openPage(BHPage, O2Page, 'slideUp');
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
        openModal();
    }
}
backO2.onclick = function () {
    openPage(O2Page, BHPage, 'slideRight');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
O2Settings.onclick = function () {
    openPage(O2Page, O2SettingsPage, 'slideUp');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    selectSongsList.style.display = "block";
}
backO2Set.onclick = function () {
    if (!audioPlayerBRT.muted) {
        audioPlayerBRT.pause();
    }
    audioPlayerBRT.currentTime = 0;
    openPage(O2SettingsPage, O2Page, 'slideDown');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    selectSongsList.style.display = "none";
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
    if (isUserActiveSubscriber) {
        openPage(BHPage, WHPage, 'slideUp');
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
        openModal();
    }
}
backWH.onclick = function () {
    openPage(WHPage, BHPage, 'slideRight');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
WHSettings.onclick = function () {
    openPage(WHPage, WHSettingsPage, 'slideUp');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    selectSongsList.style.display = "block";
}
backWHSet.onclick = function () {
    if (!audioPlayerBRT.muted) {
        audioPlayerBRT.pause();
    }
    audioPlayerBRT.currentTime = 0;
    openPage(WHSettingsPage, WHPage, 'slideDown');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    selectSongsList.style.display = "none";
}
CTLink.onclick = function () {
    if (isUserActiveSubscriber) {
        openPage(BHPage, CTPage, 'slideUp');
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
        openModal();
    }
}
backCT.onclick = function () {
    openPage(CTPage, BHPage, 'slideRight');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
CTSettings.onclick = function () {
    openPage(CTPage, CTSettingsPage, 'slideUp');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    selectSongsList.style.display = "block";
}
backCTSet.onclick = function () {
    if (!audioPlayerBRT.muted) {
        audioPlayerBRT.pause();
    }
    audioPlayerBRT.currentTime = 0;
    openPage(CTSettingsPage, CTPage, 'slideDown');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    selectSongsList.style.display = "none";
}
UBLink.onclick = function () {
    openPage(PRANAPage, UBPage, 'slideUp');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
backUB.onclick = function () {
    openPage(UBPage, PRANAPage, 'slideRight');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
UBSettings.onclick = function () {
    openPage(UBPage, UBSettingsPage, 'slideUp');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    selectSongsList.style.display = "block";
}
backUBSet.onclick = function () {
    if (!audioPlayerBRT.muted) {
        audioPlayerBRT.pause();
    }
    audioPlayerBRT.currentTime = 0;
    openPage(UBSettingsPage, UBPage, 'slideDown');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    selectSongsList.style.display = "none";
}
KBLink.onclick = function () {
    if (isUserActiveSubscriber) {
        openPage(PRANAPage, KBPage, 'slideUp');
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
        openModal();
    }
}
backKB.onclick = function () {
    openPage(KBPage, PRANAPage, 'slideRight');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
KBSettings.onclick = function () {
    openPage(KBPage, KBSettingsPage, 'slideUp');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    selectSongsList.style.display = "block";
}
backKBSet.onclick = function () {
    if (!audioPlayerBRT.muted) {
        audioPlayerBRT.pause();
    }
    audioPlayerBRT.currentTime = 0;
    openPage(KBSettingsPage, KBPage, 'slideDown');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    selectSongsList.style.display = "none";
}
BOXLink.onclick = function () {
    if (isUserActiveSubscriber) {
        openPage(PRANAPage, BOXPage, 'slideUp');
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
        openModal();
    }
}
backBOX.onclick = function () {
    openPage(BOXPage, PRANAPage, 'slideRight');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
BOXSettings.onclick = function () {
    openPage(BOXPage, BOXSettingsPage, 'slideUp');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    selectSongsList.style.display = "block";
}
backBOXSet.onclick = function () {
    if (!audioPlayerBRT.muted) {
        audioPlayerBRT.pause();
    }
    audioPlayerBRT.currentTime = 0;
    openPage(BOXSettingsPage, BOXPage, 'slideDown');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    selectSongsList.style.display = "none";
}
NBLink.onclick = function () {
    if (isUserActiveSubscriber) {
        openPage(PRANAPage, NBPage, 'slideUp');
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
        openModal();
    }
}
backNB.onclick = function () {
    openPage(NBPage, PRANAPage, 'slideRight');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
NBSettings.onclick = function () {
    openPage(NBPage, NBSettingsPage, 'slideUp');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    selectSongsList.style.display = "block";
}
backNBSet.onclick = function () {
    if (!audioPlayerBRT.muted) {
        audioPlayerBRT.pause();
    }
    audioPlayerBRT.currentTime = 0;
    openPage(NBSettingsPage, NBPage, 'slideDown');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    selectSongsList.style.display = "none";
}
CBLink.onclick = function () {
    if (isUserActiveSubscriber) {
        openPage(PRANAPage, CBPage, 'slideUp');
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
        openModal();
    }
}
backCB.onclick = function () {
    openPage(CBPage, PRANAPage, 'slideRight');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
CBSettings.onclick = function () {
    openPage(CBPage, CBSettingsPage, 'slideUp');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    selectSongsList.style.display = "block";
}
backCBSet.onclick = function () {
    if (!audioPlayerBRT.muted) {
        audioPlayerBRT.pause();
    }
    audioPlayerBRT.currentTime = 0;
    openPage(CBSettingsPage, CBPage, 'slideDown');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    selectSongsList.style.display = "none";
}
SBLink.onclick = function () {
        if (isUserActiveSubscriber) {
        openPage(PRANAPage, SBPage, 'slideUp');
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        else {
            openModal();
        }
}
backSB.onclick = function () {
    openPage(SBPage, PRANAPage, 'slideRight');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
SBSettings.onclick = function () {
    openPage(SBPage, SBSettingsPage, 'slideUp');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    selectSongsList.style.display = "block";
}
backSBSet.onclick = function () {
    if (!audioPlayerBRT.muted) {
        audioPlayerBRT.pause();
    }
    audioPlayerBRT.currentTime = 0;
    openPage(SBSettingsPage, SBPage, 'slideDown');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    selectSongsList.style.display = "none";
}
NKLink.onclick = function () {
    if (isUserActiveSubscriber) {
        openPage(EXTRAPage, NKPage, 'slideUp');
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
        openModal();
    }
}
backNK.onclick = function () {
    openPage(NKPage, EXTRAPage, 'slideRight');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
RBLink.onclick = function () {
    if (isUserActiveSubscriber) {
        openPage(PRANAPage, RBPage, 'slideUp');
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
        openModal();
    }
}
backRB.onclick = function () {
    openPage(RBPage, PRANAPage, 'slideRight');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
RBSettings.onclick = function () {
    openPage(RBPage, RBSettingsPage, 'slideUp');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    selectSongsList.style.display = "block";
}
backRBSet.onclick = function () {
    if (!audioPlayerBRT.muted) {
        audioPlayerBRT.pause();
    }
    audioPlayerBRT.currentTime = 0;
    openPage(RBSettingsPage, RBPage, 'slideDown');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    selectSongsList.style.display = "none";
}
MEDLink.onclick = function () {
    if (isUserActiveSubscriber) {
        openPage(EXTRAPage, MEDPage, 'slideUp');
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        meditationList[0].load();
        meditationList[1].load();
    } else {
        openModal();
    }
}
backMED.onclick = function () {
    openPage(MEDPage, EXTRAPage, 'slideRight');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    if (MED1isON) {
        resetMED1();
    }
    if (MED2isON) {
        resetMED2();
    }
}
SLEEPLink.onclick = function () {
    if (isUserActiveSubscriber) {
        openPage(EXTRAPage, SLEEPPage, 'slideUp');
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
        openModal();
    }
}
backSLEEP.onclick = function () {
    openPage(SLEEPPage, EXTRAPage, 'slideRight');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
HYDLink.onclick = function () {
    if (isUserActiveSubscriber) {
        openPage(EXTRAPage, HYDPage, 'slideUp');
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
        openModal();
    }
}
backHYD.onclick = function () {
    openPage(HYDPage, EXTRAPage, 'slideRight');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
SHOTLink.onclick = function () {
    if (isUserActiveSubscriber) {
        openPage(EXTRAPage, SHOTPage, 'slideUp');
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
        openModal();
    }
}
backSHOT.onclick = function () {
    openPage(SHOTPage, EXTRAPage, 'slideRight');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
ILLink.onclick = function () {
    if (isUserActiveSubscriber) {
        openPage(EXTRAPage, ILPage, 'slideUp');
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
        openModal();
    }
}
backIL.onclick = function () {
    openPage(ILPage, EXTRAPage, 'slideRight');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
BEETLink.onclick = function () {
    if (isUserActiveSubscriber) {
        openPage(EXTRAPage, BEETPage, 'slideUp');
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
        openModal();
    }
}
backBEET.onclick = function () {
    openPage(BEETPage, EXTRAPage, 'slideRight');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
DIETLink.onclick = function () {
    if (isUserActiveSubscriber) {
        openPage(EXTRAPage, DIETPage, 'slideUp');
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
        openModal();
    }
}
backDIET.onclick = function () {
    openPage(DIETPage, EXTRAPage, 'slideRight');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
ICELink.onclick = function () {
    if (isUserActiveSubscriber) {
        openPage(EXTRAPage, ICEPage, 'slideUp');
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
        openModal();
    }
}
backICE.onclick = function () {
    openPage(ICEPage, EXTRAPage, 'slideRight');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
EXERCISINGLink.onclick = function () {
    if (isUserActiveSubscriber) {
        openPage(EXTRAPage, EXERCISINGPage, 'slideUp');
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
        openModal();
    }
}
backEXERCISING.onclick = function () {
    openPage(EXERCISINGPage, EXTRAPage, 'slideRight');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
HUMLink.onclick = function () {
    if (isUserActiveSubscriber) {
        openPage(PRANAPage, HUMPage, 'slideUp');
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
        openModal();
    }
}
backHUM.onclick = function () {
    openPage(HUMPage, PRANAPage, 'slideRight');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
humSettings.onclick = function () {
    openPage(HUMPage, humSettingsPage, 'slideUp');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    selectSongsList.style.display = "block";
}
backHUMSet.onclick = function () {
    if (!audioPlayerBRT.muted) {
        audioPlayerBRT.pause();
    }
    audioPlayerBRT.currentTime = 0;
    openPage(humSettingsPage, HUMPage, 'slideDown');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    selectSongsList.style.display = "none";
}
backBRTresults.onclick = function () {
    openPage(BRTresultPage, resultsPage, 'slideDown');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    BRTresultDateHeader.innerHTML = '';
    BRTresultSessions.innerHTML = '';
}
backYBresults.onclick = function () {
    openPage(YBresultPage, resultsPage, 'slideDown');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    YBresultDateHeader.innerHTML = '';
    YBresultSessions.innerHTML = '';
}
backBREresults.onclick = function () {
    openPage(BREresultPage, resultsPage, 'slideDown');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    BREresultDateHeader.innerHTML = '';
    BREresultSessions.innerHTML = '';
}
backBRWresults.onclick = function () {
    openPage(BRWresultPage, resultsPage, 'slideDown');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    BRWresultDateHeader.innerHTML = '';
    BRWresultSessions.innerHTML = '';
}

backBBresults.onclick = function () {
    openPage(BBresultPage, resultsPage, 'slideDown');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    BBresultDateHeader.innerHTML = '';
    BBresultSessions.innerHTML = '';
}
backLUNGSresults.onclick = function () {
    openPage(LUNGSresultPage, resultsPage, 'slideDown');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    LUNGSresultDateHeader.innerHTML = '';
    LUNGSresultSessions.innerHTML = '';
}
backAPresults.onclick = function () {
    openPage(APresultPage, resultsPage, 'slideDown');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    APresultDateHeader.innerHTML = '';
    APresultSessions.innerHTML = '';
}
backCTresults.onclick = function () {
    openPage(CTresultPage, resultsPage, 'slideDown');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    CTresultDateHeader.innerHTML = '';
    CTresultSessions.innerHTML = '';
}
backBOXresults.onclick = function () {
    openPage(BOXresultPage, resultsPage, 'slideDown');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    BOXresultDateHeader.innerHTML = '';
    BOXresultSessions.innerHTML = '';
}
backUBresults.onclick = function () {
    openPage(UBresultPage, resultsPage, 'slideDown');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    UBresultDateHeader.innerHTML = '';
    UBresultSessions.innerHTML = '';
}
backNBresults.onclick = function () {
    openPage(NBresultPage, resultsPage, 'slideDown');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    NBresultDateHeader.innerHTML = '';
    NBresultSessions.innerHTML = '';
}
backSBresults.onclick = function () {
    openPage(SBresultPage, resultsPage, 'slideDown');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    SBresultDateHeader.innerHTML = '';
    SBresultSessions.innerHTML = '';
}
backHUMresults.onclick = function () {
    openPage(HUMresultPage, resultsPage, 'slideDown');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    HUMresultDateHeader.innerHTML = '';
    HUMresultSessions.innerHTML = '';
}
backWHresults.onclick = function () {
    openPage(WHresultPage, resultsPage, 'slideDown');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    WHresultDateHeader.innerHTML = '';
    WHresultSessions.innerHTML = '';
}
backKBresults.onclick = function () {
    openPage(KBresultPage, resultsPage, 'slideDown');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    KBresultDateHeader.innerHTML = '';
    KBresultSessions.innerHTML = '';
}
backHATresults.onclick = function () {
    openPage(HATresultPage, resultsPage, 'slideDown');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    HATresultDateHeader.innerHTML = '';
    HATresultSessions.innerHTML = '';
}
backHATCresults.onclick = function () {
    openPage(HATCresultPage, resultsPage, 'slideDown');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    HATCresultDateHeader.innerHTML = '';
    HATCresultSessions.innerHTML = '';
}
backAHATresults.onclick = function () {
    openPage(AHATresultPage, resultsPage, 'slideDown');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    AHATresultDateHeader.innerHTML = '';
    AHATresultSessions.innerHTML = '';
}
backO2results.onclick = function () {
    openPage(O2resultPage, resultsPage, 'slideDown');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    O2resultDateHeader.innerHTML = '';
    O2resultSessions.innerHTML = '';
}
backCO2results.onclick = function () {
    openPage(CO2resultPage, resultsPage, 'slideDown');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    CO2resultDateHeader.innerHTML = '';
    CO2resultSessions.innerHTML = '';
}