function displayLogin() {
        document.getElementById('loginPage').style.display = 'block';
        document.getElementById('loadingIndicator').style.display = 'none';
}

document.addEventListener('DOMContentLoaded', displayLogin);
document.getElementById('login-submit').addEventListener('click', function () {
    document.getElementById('loadingIndicator').style.display = 'flex';
    document.getElementById('loginPage').style.display = 'none';
});
//document.addEventListener('contextmenu', function (e) {
//    e.preventDefault();
//}, false);
