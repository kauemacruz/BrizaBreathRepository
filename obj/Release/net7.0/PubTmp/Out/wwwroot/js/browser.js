function isNativeApp() {
    // Explicitly check for Capacitor and that it's running in a native platform
    return typeof Capacitor !== 'undefined' && Capacitor.isNativePlatform();
}

function displayInstructions() {
    var nativeApp = isNativeApp();
    if (nativeApp) {
        // Running as a native app
        document.getElementById('iosInstructions').style.display = 'none';
        document.getElementById('androidInstructions').style.display = 'none';
        document.getElementById('desktopInstructions').style.display = 'none';
        document.getElementById('loginPage').style.display = 'block';
        document.getElementById('loadingIndicator').style.display = 'none';
    } else {
        // Determine the platform from the user agent if not running as a native app
        var result = new UAParser().getResult();

        if (result.os.name === 'iOS') {
            document.getElementById('iosInstructions').style.display = 'none';
            document.getElementById('loginPage').style.display = 'block';
            document.getElementById('loadingIndicator').style.display = 'none';
        } else if (result.os.name === 'Android') {
            document.getElementById('androidInstructions').style.display = 'block';
            // Hide the login page if not running as a native app
            document.getElementById('loginPage').style.display = 'none';
            document.getElementById('loadingIndicator').style.display = 'none';
        } else {
            // Default to desktop instructions for other platforms
            document.getElementById('desktopInstructions').style.display = 'block';
            // Hide the login page if not running as a native app
            document.getElementById('loginPage').style.display = 'none';
            document.getElementById('loadingIndicator').style.display = 'none';
        }
    }
}

displayInstructions();


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
