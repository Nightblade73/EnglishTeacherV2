function extenApi() {
    this.login = function login(email, password, eventSuccess, eventError) {
        var loginData = {
            grant_type: 'password',
            username: email,
            password: password
        };
        $.ajax({
            type: 'POST',
            url: 'http://localhost:54049/Token',
            data: loginData,
            success: eventSuccess,
            fail: function (data) {
                alert(data.responseText);
            },
            error: eventError
        });
    }

    this.registration = function registration(email, password, confirmPassword, eventSuccess, eventError) {
        var data = {
            Email: email,
            Password: password,
            ConfirmPassword: confirmPassword
        };
        $.ajax({
            type: 'POST',
            url: 'http://localhost:54049/api/Account/Register/',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(data),
            success: eventSuccess,
            fail: function (data) {
                alert(data.responseText);
            },
            error: eventError
        });
    }

    this.forrgotPassword = function forrgotPass(email, eventSuccess, eventError) {
        var data = {
            Email: email,
        };
        $.ajax({
            type: 'POST',
            url: 'http://localhost:54049/api/Account/ForgotPassword/',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(data),
            success: eventSuccess,
            fail: function (data) {
                alert(data.responseText);
            },
            error: eventError
        });
    }
}