var ex = new extenApi();
var tokenKey = "tokenInfo";
var email = getCookie("username");
var password = getCookie("password");
if (email || password) {
    let user = getCookie("username");
    let pass = getCookie("password");
    ex.login(user, pass, function (data) {
        sessionStorage.setItem(tokenKey, data.access_token);
        document.location.href = "main.html";
    }, function (jqXHR, textStatus, errorThrown) {
        alert(jqXHR.responseText || textStatus);
    });

} else {
    $(document).ready(function () {

        $('#but-Sign-In').click(function (e) {
            e.preventDefault();
            let email = $('#emailLogin').val();
            let password = $('#passwordLogin').val();
            $('#wrapped').css('display', 'block');
            ex.login(email, password, function (data) {
                sessionStorage.setItem(tokenKey, data.access_token);
                setCookie("username", email);
                setCookie("password", password);
                $('#wrapped').css('display', 'none');
                document.location.href = "main.html";
            }, function (jqXHR, textStatus, errorThrown) {
                $('#wrapped').css('display', 'none');
                alert(jqXHR.responseText || textStatus);
            });
        });
    });
}