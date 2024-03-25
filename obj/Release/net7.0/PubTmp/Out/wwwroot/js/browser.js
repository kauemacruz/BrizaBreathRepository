var parser = new UAParser();
var result = parser.getResult();

function isStandalone() {
    return (window.matchMedia('(display-mode: standalone)').matches) || (window.navigator.standalone) || document.referrer.includes('android-app://') || (window.Capacitor && window.Capacitor.isNative);
}
function displayInstructions() {

    if (isStandalone()) {
        if (result.os.name === 'iOS') {
            // Show iOS instructions
            document.getElementById('iosInstructions').style.display = 'none';
            document.getElementById('loginPage').style.display = 'block';
            document.getElementById('loadingIndicator').style.display = 'none';
        } else if (result.os.name === 'Android') {
            // Show Android instructions
            document.getElementById('androidInstructions').style.display = 'none';
            document.getElementById('loginPage').style.display = 'block';
            document.getElementById('loadingIndicator').style.display = 'none';
        } else {
            // Assume desktop or other OS; show QR code or generic instructions
            document.getElementById('iosInstructions').style.display = 'none';
            document.getElementById('androidInstructions').style.display = 'none';
            document.getElementById('loginPage').style.display = 'none';
            document.getElementById('desktopInstructions').style.display = 'block';
            document.getElementById('loadingIndicator').style.display = 'none';
        }
    } else {
        if (result.os.name === 'iOS') {
            // Show iOS instructions
            document.getElementById('iosInstructions').style.display = 'block';
            document.getElementById('loginPage').style.display = 'none';
            document.getElementById('loadingIndicator').style.display = 'none';
        } else if (result.os.name === 'Android') {
            // Show Android instructions
            document.getElementById('androidInstructions').style.display = 'block';
            document.getElementById('loginPage').style.display = 'none';
            document.getElementById('loadingIndicator').style.display = 'none';
        } else {
            // Assume desktop or other OS; show QR code or generic instructions
            document.getElementById('desktopInstructions').style.display = 'block';
            document.getElementById('iosInstructions').style.display = 'none';
            document.getElementById('androidInstructions').style.display = 'none';
            document.getElementById('loginPage').style.display = 'none';
            document.getElementById('loadingIndicator').style.display = 'none';
        }
    }
}

document.addEventListener('DOMContentLoaded', displayInstructions);

var qrcode = new QRCode(document.getElementById("qrcode"), {
    text: "app.brizabreath.com",
    width: 128,
    height: 128,
    colorDark: "#000000",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.H
});

document.getElementById('login-submit').addEventListener('click', function () {
    document.getElementById('loadingIndicator').style.display = 'flex';
    document.getElementById('loginPage').style.display = 'none';
});
//document.addEventListener('contextmenu', function (e) {
//    e.preventDefault();
//}, false);
