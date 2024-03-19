async function openStripeCheckout(checkouturl) {
    if (Capacitor.isNativePlatform()) {
        // Capacitor is running in a native environment; use the plugin
        const { Browser } = Capacitor.Plugins;
        Browser.open({ url: checkouturl });
    } else {
        // Capacitor is not running in a native environment; fallback to web behavior
        window.open('checkouturl', '_blank');
    }
}

let timer;

function resetTimer() {
    clearTimeout(timer);
    timer = setTimeout(dimScreen, 40000); // 40 seconds
}

function dimScreen() {
    // Show the overlay
    document.getElementById('dimOverlay').style.display = 'block';
}

// Listen for any of these events to reset the timer
window.onmousedown = resetTimer;  // Catches touchscreen presses
window.onclick = resetTimer;      // Catches touchpad clicks

document.getElementById('dimOverlay').addEventListener('click', function () {
    document.getElementById('dimOverlay').style.display = 'none';
});

//stop any exercise if they ARE ON WHEN SCREEN LOCK HAPPENS
document.addEventListener("visibilitychange", function () {
    if (document.visibilityState === 'hidden') {
        if (isAHATon) {
            stopTimerAHAT();
        }
        if (isCTon) {
            stopTimerCT();
        }
        if (isHATon) {
            stopTimerHAT();
        }
        if (isHATCon) {
            stopTimerHATC();
        }
        if (isKBon) {
            stopTimerKB();
        }
        if (isWHon) {
            stopTimerWH();
        }
        if (isAPon) {
            pauseTimerAP();
        }
        if (isBBon) {
            pauseTimerBB();
        }
        if (isBOXon) {
            pauseTimerBOX();
        }
        if (isBREon) {
            pauseTimerBRE();
        }
        if (isBRTon) {
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
        }
        if (isBRWon) {
            pauseTimerBRW();
        }
        if (isCBon) {
            pauseTimerCB();
        }
        if (isCO2on) {
            pauseTimerCO2();
        }
        if (isHUMon) {
            pauseTimerHUM();
        }
        if (isNBon) {
            pauseTimerNB();
        }
        if (isO2on) {
            pauseTimerO2();
        }
        if (isRBon) {
            pauseTimerRB();
        }
        if (isSBon) {
            pauseTimerSB();
        }
        if (isUBon) {
            pauseTimerUB();
        }
        if (isYBon) {
            pauseTimerYB();
        }
    }
});
window.addEventListener("beforeunload", function (event) {
    if (isAHATon) {
        stopTimerAHAT();
    }
    if (isCTon) {
        stopTimerCT();
    }
    if (isHATon) {
        stopTimerHAT();
    }
    if (isHATCon) {
        stopTimerHATC();
    }
    if (isKBon) {
        stopTimerKB();
    }
    if (isWHon) {
        stopTimerWH();
    }
    if (isAPon) {
        pauseTimerAP();
    }
    if (isBBon) {
        pauseTimerBB();
    }
    if (isBOXon) {
        pauseTimerBOX();
    }
    if (isBREon) {
        pauseTimerBRE();
    }
    if (isBRTon) {
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
    }
    if (isBRWon) {
        pauseTimerBRW();
    }
    if (isCBon) {
        pauseTimerCB();
    }
    if (isCO2on) {
        pauseTimerCO2();
    }
    if (isHUMon) {
        pauseTimerHUM();
    }
    if (isNBon) {
        pauseTimerNB();
    }
    if (isO2on) {
        pauseTimerO2();
    }
    if (isRBon) {
        pauseTimerRB();
    }
    if (isSBon) {
        pauseTimerSB();
    }
    if (isUBon) {
        pauseTimerUB();
    }
    if (isYBon) {
        pauseTimerYB();
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
        document.getElementById("mainHeader").style.display = "none";
        //loading indicator
        var loadingIndicator = document.getElementById('loadingIndicator');
        loadingIndicator.style.display = 'flex';
        // Display the content
        profilePage.classList.remove('open');
        profilePage.classList.add('hidden');
    });
});
//slide show in explanation
var slideIndex = 1;

// Next/previous controls
function plusSlides(n, className) {
    showSlides(slideIndex += n, className);
}
function showSlides(n, className) {
    var i;
    var slides = document.getElementsByClassName(className);
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[slideIndex - 1].style.display = "block";
}
//BH Modal
const modalBH = document.getElementById("myModalBH");
const closeModalBHButton = document.getElementById("closeModalBH");
var BHquestion = document.getElementById("BHquestion");

function openModalBH() {
    modalBH.style.display = "block";
    showSlides(slideIndex, 'BHslides');
}

// Function to close the modalBH
function closeModalBH() {
    modalBH.style.display = "none";
    slideIndex = 1;
}

// Event listener for closing the modalBH
closeModalBHButton.addEventListener("click", closeModalBH);

// Close the modalBH if the user clicks outside the modalBH content
window.addEventListener("click", function (event) {
    if (event.target === modalBH) {
        closeModalBH();
    }
});
BHquestion.onclick = function () {
    openModalBH();
}
//PRANA Modal
const modalPRANA = document.getElementById("myModalPRANA");
const closeModalPRANAButton = document.getElementById("closeModalPRANA");
var PRANAquestion = document.getElementById("PRANAquestion");

function openModalPRANA() {
    modalPRANA.style.display = "block";
    showSlides(slideIndex, 'PRANAslides');
}

// Function to close the modalPRANA
function closeModalPRANA() {
    modalPRANA.style.display = "none";
    slideIndex = 1;

}

// Event listener for closing the modalPRANA
closeModalPRANAButton.addEventListener("click", closeModalPRANA);

// Close the modalPRANA if the user clicks outside the modalPRANA content
window.addEventListener("click", function (event) {
    if (event.target === modalPRANA) {
        closeModalPRANA();
    }
});
PRANAquestion.onclick = function () {
    openModalPRANA();
}
//BP Modal
const modalBP = document.getElementById("myModalBP");
const closeModalBPButton = document.getElementById("closeModalBP");
var BPquestion = document.getElementById("BPquestion");

function openModalBP() {
    modalBP.style.display = "block";
    showSlides(slideIndex, 'BPslides');
}

// Function to close the modalBP
function closeModalBP() {
    modalBP.style.display = "none";
    slideIndex = 1;

}

// Event listener for closing the modalBP
closeModalBPButton.addEventListener("click", closeModalBP);

// Close the modalBP if the user clicks outside the modalBP content
window.addEventListener("click", function (event) {
    if (event.target === modalBP) {
        closeModalBP();
    }
});
BPquestion.onclick = function () {
    openModalBP();
}

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
    getSubscriptionBtn = document.getElementById("getSubscriptionBtn");

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
    openModal3();
}

$(function () {
    $('#subscriptionForm').on('submit', function (e) {
        e.preventDefault(); // Prevent the default form submission

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
                    openStripeCheckout("https://pay.brizabreath.com/b/14k9B4ah70zH5i0cMT?prefilled_email=" + response);
                } else if (priceChoice.value == 4) {
                    openStripeCheckout("https://pay.brizabreath.com/b/00g3cG2OF2HP39S7sy?prefilled_email=" + response);
                } else if (priceChoice.value == 5) {
                    openStripeCheckout("https://pay.brizabreath.com/b/8wM5kO74V1DLeSA28c?prefilled_email=" + response + "&locale=pt-BR");
                } else if (priceChoice.value == 6) {
                    openStripeCheckout("https://pay.brizabreath.com/b/28o28CdtjdmtcKs9AF?prefilled_email=" + response + "&locale=pt-BR");
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

        var formData = new FormData(this);

        $.ajax({
            url: "/?handler=RedirectToStripePortal",
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function (response) {
                if (response.success) {
                    openStripeCheckout(response.url);
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
        backProgram.style.display = "block";
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
    backProgram.style.display = "none";
}
programLink2.onclick = function () {
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
        openPage(programPage, programPage2, 'slideLeft');
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        backProgram2.style.display = "block";
        backProgram.style.display = "none";
        audioObjects.bell.load();
        audioElements.forEach((audio) => {
            audio.load();
        });
    } else {
        openModal();
    }
}
backProgram2.onclick = function () {
    openPage(programPage2, programPage, 'slideRight');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    backProgram2.style.display = "none";
    backProgram.style.display = "block";
}
backLungs.onclick = function () {
    openPage(lungsPage, programPage, 'slideRight');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    backLungs.style.display = "none";
    backProgram.style.display = "block";
}
backLungs2.onclick = function () {
    openPage(lungsPage, programPage2, 'slideRight');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    backLungs2.style.display = "none";
    backProgram2.style.display = "block";
}
breathHoldsLink.onclick = function () {
    openPage(homePage, BHPage, 'slideLeft');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    audioObjects.bell.load();
    audioElements.forEach((audio) => {
        audio.load();
    });
    backBH.style.display = "block";
}
backBH.onclick = function () {
    openPage(BHPage, homePage, 'slideRight');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    backBH.style.display = "none";
}
pranayamaLink.onclick = function () {
    openPage(homePage, PRANAPage, 'slideLeft');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    audioObjects.bell.load();
    audioElements.forEach((audio) => {
        audio.load();
    });
    backPRANA.style.display = "block";
}
backPRANA.onclick = function () {
    openPage(PRANAPage, homePage, 'slideRight');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    backPRANA.style.display = "none";
}

backBRTresults.onclick = function () {
    openPage(BRTresultPage, resultsPage, 'slideRight');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    BRTresultDateHeader.innerHTML = '';
    BRTresultSessions.innerHTML = '';
    backBRTresults.style.display = "none";
}
backYBresults.onclick = function () {
    openPage(YBresultPage, resultsPage, 'slideRight');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    YBresultDateHeader.innerHTML = '';
    YBresultSessions.innerHTML = '';
    backYBresults.style.display = "none";
}
backBREresults.onclick = function () {
    openPage(BREresultPage, resultsPage, 'slideRight');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    BREresultDateHeader.innerHTML = '';
    BREresultSessions.innerHTML = '';
    backBREresults.style.display = "none";
}
backBRWresults.onclick = function () {
    openPage(BRWresultPage, resultsPage, 'slideRight');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    BRWresultDateHeader.innerHTML = '';
    BRWresultSessions.innerHTML = '';
    backBRWresults.style.display = "none";
}

backBBresults.onclick = function () {
    openPage(BBresultPage, resultsPage, 'slideRight');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    BBresultDateHeader.innerHTML = '';
    BBresultSessions.innerHTML = '';
    backBBresults.style.display = "none";
}
backAPresults.onclick = function () {
    openPage(APresultPage, resultsPage, 'slideRight');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    APresultDateHeader.innerHTML = '';
    APresultSessions.innerHTML = '';
    backAPresults.style.display = "none";
}
backCTresults.onclick = function () {
    openPage(CTresultPage, resultsPage, 'slideRight');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    CTresultDateHeader.innerHTML = '';
    CTresultSessions.innerHTML = '';
    backCTresults.style.display = "none";
}
backBOXresults.onclick = function () {
    openPage(BOXresultPage, resultsPage, 'slideRight');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    BOXresultDateHeader.innerHTML = '';
    BOXresultSessions.innerHTML = '';
    backBOXresults.style.display = "none";
}
backUBresults.onclick = function () {
    openPage(UBresultPage, resultsPage, 'slideRight');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    UBresultDateHeader.innerHTML = '';
    UBresultSessions.innerHTML = '';
    backUBresults.style.display = "none";
}
backNBresults.onclick = function () {
    openPage(NBresultPage, resultsPage, 'slideRight');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    NBresultDateHeader.innerHTML = '';
    NBresultSessions.innerHTML = '';
    backNBresults.style.display = "none";
}
backSBresults.onclick = function () {
    openPage(SBresultPage, resultsPage, 'slideRight');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    SBresultDateHeader.innerHTML = '';
    SBresultSessions.innerHTML = '';
    backSBresults.style.display = "none";
}
backHUMresults.onclick = function () {
    openPage(HUMresultPage, resultsPage, 'slideRight');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    HUMresultDateHeader.innerHTML = '';
    HUMresultSessions.innerHTML = '';
    backHUMresults.style.display = "none";
}
backWHresults.onclick = function () {
    openPage(WHresultPage, resultsPage, 'slideRight');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    WHresultDateHeader.innerHTML = '';
    WHresultSessions.innerHTML = '';
    backWHresults.style.display = "none";
}
backKBresults.onclick = function () {
    openPage(KBresultPage, resultsPage, 'slideRight');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    KBresultDateHeader.innerHTML = '';
    KBresultSessions.innerHTML = '';
    backKBresults.style.display = "none";
}
backHATresults.onclick = function () {
    openPage(HATresultPage, resultsPage, 'slideRight');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    HATresultDateHeader.innerHTML = '';
    HATresultSessions.innerHTML = '';
    backHATresults.style.display = "none";
}
backHATCresults.onclick = function () {
    openPage(HATCresultPage, resultsPage, 'slideRight');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    HATCresultDateHeader.innerHTML = '';
    HATCresultSessions.innerHTML = '';
    backHATCresults.style.display = "none";
}
backAHATresults.onclick = function () {
    openPage(AHATresultPage, resultsPage, 'slideRight');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    AHATresultDateHeader.innerHTML = '';
    AHATresultSessions.innerHTML = '';
    backAHATresults.style.display = "none";
}
backO2results.onclick = function () {
    openPage(O2resultPage, resultsPage, 'slideRight');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    O2resultDateHeader.innerHTML = '';
    O2resultSessions.innerHTML = '';
    backO2results.style.display = "none";
}
backCO2results.onclick = function () {
    openPage(CO2resultPage, resultsPage, 'slideRight');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    CO2resultDateHeader.innerHTML = '';
    CO2resultSessions.innerHTML = '';
    backCO2results.style.display = "none";
}
lungsLink3.onclick = function () {
    openPage(programPage2, lungsPage, 'slideLeft');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    backLungs2.style.display = "block";
    backProgram2.style.display = "none";
}
