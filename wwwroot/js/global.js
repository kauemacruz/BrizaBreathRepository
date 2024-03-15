var currentUrl = window.location.href;
// Define a function to check if the URL contains a specific keyword
function checkUrl() {
    if (currentUrl.includes("CreateBR")) {
        // URL contains the specific keyword
        return true;
    } else {
        // URL does not contain the specific keyword
        return false;
    }
}
// Set a variable based on the result of the check
var isPortuguese = checkUrl();
// Check local storage on page load and redirect if necessary
var storedValue = localStorage.getItem('isPortuguese');
if (storedValue === null) {
    localStorage.setItem('isPortuguese', isPortuguese.toString());
    storedValue = isPortuguese.toString();
}

if (storedValue == 'true' && !isPortuguese) {
    // Check if the user is already on the Portuguese page. If not, redirect them.
    window.location.href = "https://brizabreathappservice.azurewebsites.net/Results/CreateBR";
} else if (storedValue == 'false' && isPortuguese) {
    window.location.href = "https://brizabreathappservice.azurewebsites.net/";
} else {
    //do nothing
}
if (isPortuguese) {
    // Save the value to local storage
    localStorage.setItem('isPortuguese', 'true');
}
// Attach event listeners to all elements with the class "backToEnglish"
var backToEnglish = document.getElementsByClassName("backToEnglish");
for (let i = 0; i < backToEnglish.length; i++) {
    backToEnglish[i].addEventListener("click", function () {
        localStorage.setItem('isPortuguese', 'false');
    });
}

/*Links*/
var navResults = document.getElementById("navResults"),
    navResults2 = document.getElementById("navResults2"),
    navProfile = document.getElementById("navProfile"),
    navProfile2 = document.getElementById("navProfile2"),
    navHome = document.getElementById("navHome"),
    navHome2 = document.getElementById("navHome2"),
    breathHoldsLink = document.getElementById("breathHoldsLink"),
    pranayamaLink = document.getElementById("pranayamaLink"),
    programLink = document.getElementById("programLink"),
    programLink2 = document.getElementById("programLink2"),
    backProgram = document.getElementById("backProgram"),
    backProgram2 = document.getElementById("backProgram2"),
    brtLink = document.getElementById("brtLink"),
    backBRT = document.getElementById("backBRT"),
    backBRT2 = document.getElementById("backBRT2"),
    BRELink2 = document.getElementById("BRELink2"),
    backBRE = document.getElementById("backBRE"),
    backBRE2 = document.getElementById("backBRE2"),
    BRWLink2 = document.getElementById("BRWLink2"),
    backBRW = document.getElementById("backBRW"),
    backBRW2 = document.getElementById("backBRW2"),
    backBB = document.getElementById("backBB"),
    BBLink2 = document.getElementById("BBLink2"),
    backBB2 = document.getElementById("backBB2"),
    brtSettings = document.getElementById("brtSettings"),
    backBRTset = document.getElementById("backBRTset"),
    backYB = document.getElementById("backYB"),
    YBLink2 = document.getElementById("YBLink2"),
    backYB2 = document.getElementById("backYB2"),
    YBSettings = document.getElementById("YBSettings"),
    backYBSet = document.getElementById("backYBSet"),
    breSettings = document.getElementById("breSettings"),
    backBREset = document.getElementById("backBREset"),
    brwSettings = document.getElementById("brwSettings"),
    backBRWset = document.getElementById("backBRWset"),
    BBSettings = document.getElementById("BBSettings"),
    backBBset = document.getElementById("backBBset"),
    hatSettings = document.getElementById("hatSettings"),
    HATLink2 = document.getElementById("HATLink2"),
    backHATset = document.getElementById("backHATset"),
    backHAT = document.getElementById("backHAT"),
    backHAT2 = document.getElementById("backHAT2"),
    backHATC = document.getElementById("backHATC"),
    backHATC2 = document.getElementById("backHATC2"),
    backAHAT = document.getElementById("backAHAT"),
    backAHAT2 = document.getElementById("backAHAT2"),
    HATCLink2 = document.getElementById("HATCLink2"),
    hatcSettings = document.getElementById("hatcSettings"),
    backAHATCset = document.getElementById("backAHATCset"),
    ahatSettings = document.getElementById("ahatSettings"),
    AHATLink2 = document.getElementById("AHATLink2"),
    backAHATset = document.getElementById("backAHATset"),
    backLungs = document.getElementById("backLungs"),
    backLungs2 = document.getElementById("backLungs2"),
    lungsLink3 = document.getElementById("lungsLink3"),
    backBH = document.getElementById("backBH"),
    backPRANA = document.getElementById("backPRANA"),
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
    backWH2 = document.getElementById("backWH2"),
    backWH3 = document.getElementById("backWH3"),
    WHSettings = document.getElementById("WHSettings"),
    backWHSet = document.getElementById("backWHset"),
    CTLink = document.getElementById("CTLink"),
    backCT = document.getElementById("backCT"),
    backCT2 = document.getElementById("backCT2"),
    backCT3 = document.getElementById("backCT3"),
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
    HUMLink = document.getElementById("HUMLink"),
    backHUM = document.getElementById("backHUM"),
    humSettings = document.getElementById("humSettings"),
    backHUMSet = document.getElementById("backHUMset"),
    backBRTresults = document.getElementById("backBRTresults"),
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
    backCO2results = document.getElementById("backCO2results"),
    breathHoldsLinkResults = document.getElementById("breathHoldsLinkResults"),
    pranayamaLinkResults = document.getElementById("pranayamaLinkResults"),
    brtLinkResults = document.getElementById("brtLinkResults"),
    programLinkResults = document.getElementById("programLinkResults");

/*Pages*/
var homePage = document.getElementById("homePage"),
    profilePage = document.getElementById("profilePage"),
    programPage = document.getElementById("programPage"),
    brtPage = document.getElementById("brtPage"),
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
    HUMPage = document.getElementById("HUMPage"),
    humSettingsPage = document.getElementById("humSettingsPage"),
    selectSongsList = document.getElementById("selectSongsList");

window.addEventListener('load', function () {
    if ('serviceWorker' in navigator) {
        // Determine the base URL based on the current location
        const baseUrl = window.location.href.split('/').slice(0, 3).join('/');

        // Construct the full path to the service worker script
        const serviceWorkerPath = `${baseUrl}/js/service-worker.js`;

        // Register the service worker
        navigator.serviceWorker.register(serviceWorkerPath)
            .then(registration => {
                console.log('Service Worker registered with scope:', registration.scope);
            })
            .catch(error => {
                console.error('Service Worker registration failed:', error);
            });
    }
    // Hide the loading indicator
    var loadingIndicator = document.getElementById('loadingIndicator');
    loadingIndicator.style.display = 'none';

    // Display the content
    document.getElementById("mainHeader").style.display = "flex";
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
    if (currentUrl.includes("session_id")) {
        if (isPortuguese) {
            alert('Parabéns! Sua compra foi processada com sucesso. Agora você tem acesso completo a todos os recursos do Briza App')
        } else {
            alert('Congratulations! Your purchase has been successfully processed. You now have full access to all features of the Briza App')
        }
    }
    if (window.navigator.standalone === true) {
        document.body.classList.add('ios-webview');
    }
});
window.addEventListener('offline', function (e) {
    alert("You are currently offline. Some features may not be available. And you will not be able to save your results");
});
