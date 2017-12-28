function extenApi() {
    this.login = function login(email, password, eventSuccess, eventError) {
        let loginData = {
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
        let data = {
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
        let data = {
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

    this.saveSettings = function saveSettings(id_theme, token, eventSuccess, eventError) {
        let data = {
            Id_theme: id_theme,
        };
        $.ajax({
            type: 'POST',
            url: 'http://localhost:54049/api/Models/SaveTheme/',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(data),
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Authorization", "Bearer " + token);
            },
            success: eventSuccess,
            fail: function (data) {
                alert(data.responseText);
            },
            error: eventError
        });
    }
	
	this.remember = function remember(word, token, eventSuccess, eventError) {
        let data = {
            Word: word,
        };
		$.ajax({
            url: 'http://localhost:54049/api/Models/SaveWord/',
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(data),
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Authorization", "Bearer " + token);
            },
            success: eventSuccess,
            error: eventError
        });
    }
	
}