var ex = new extenApi();
var tokenKey = "tokenInfo";
var email = getCookie("username");
var password = getCookie("password");
if (email || password) {
    let user = getCookie("username");
    let pass = getCookie("password");
	$(document).ready(function () {
		$('#preloader').css('display', 'block');
	});
    ex.login(user, pass, function (data) {
        sessionStorage.setItem(tokenKey, data.access_token);
		$('#preloader').css('display', 'none');
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
            $('#preloader').css('display', 'block');
            ex.login(email, password, function (data) {
                sessionStorage.setItem(tokenKey, data.access_token);
                setCookie("username", email,1);
                setCookie("password", password,1);
                $('#preloader').css('display', 'none');
                document.location.href = "main.html";
            }, function (error) {
                $('#preloader').fadeOut('1000');;
                $('#infoBlock').fadeIn('1000');
                $('#message').text(error.responseJSON["error_description"]);
            });
        });
    });
}