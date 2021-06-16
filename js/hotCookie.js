function remember(element) {
    let userName = element.form.querySelector('input[username-field]')
    let password = element.form.querySelector('input[password-field]') ?? ""
    let checkBox = document.querySelector('input[used]') ?? true
    if (userName == null)
        return;
    userName = userName.value
    if (password !== "")
        password = password.value
    if (checkBox !== true)
        checkBox = checkBox.checked
    if (checkBox)
        setLoginCardCookie(userName, password);
}

function setLoginCardCookie(username, password = '') {
    let date = new Date();
    date.setTime(date.getTime() + (3 * 24 * 60 * 60 * 1000));
    let expire = date.toGMTString();
    document.cookie = 'username=' + username + ';expires=' + expire + '';
    if (password !== '')
        document.cookie = 'password=' + password + ';expires=' + expire + '';

    console.log("cookie sets")
}
function getLoginCardCookie() {
    let cookies = document.cookie.split(';');
    let loginCard = {username: "", password: ""}
    cookies.forEach((cookie) => {
        let card = cookie.trim().split('=')
        loginCard[card[0]] = card[1]
    })
    return loginCard;
}

function cookieLogin() {
    let loginCard = getLoginCardCookie()
    if (loginCard.username === "")
        return;
    if (loginCard.password === "") {
        setLoginCardCookie(loginCard.username)
        window.location.href = 'login?username=' + loginCard.username + '';
    }
    setLoginCardCookie(loginCard.username, loginCard.password)
    window.location.href = 'login?username=' + loginCard.username + '&password=' + loginCard.password + '';
}
function clearCookies() {
    let cookies = document.cookie.split(';');
    cookies.forEach((cookie) => {
        let eqPos = cookie.indexOf("=");
        let name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    })
}

function init() {
    console.log(loginError)
    if (loginError === '') {
        cookieLogin()
        return
    }
    clearCookies()
}
