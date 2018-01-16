function extenApi() {
    this.login = function login(email, password, eventSuccess, eventError) {
        let loginData = {
            grant_type: 'password',
            username: email,
            password: password
        };
        $.ajax({
            type: 'POST',
            url: 'https://lab.group.3.b2bfamily.com/Token',
            data: loginData,
            success: eventSuccess,
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
            url: 'https://lab.group.3.b2bfamily.com/api/Account/Register/',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(data),
            success: eventSuccess,
            error: eventError
        });
    }

    this.forrgotPassword = function forrgotPass(email, eventSuccess, eventError) {
        let data = {
            Email: email,
        };
        $.ajax({
            type: 'POST',
            url: 'https://lab.group.3.b2bfamily.com/api/Account/ForgotPassword/',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(data),
            success: eventSuccess,
            error: eventError
        });
    }

    this.saveSettings = function saveSettings(id_theme, token, eventSuccess, eventError) {
        let data = {
            Id_theme: id_theme,
        };
        $.ajax({
            type: 'POST',
            url: 'https://lab.group.3.b2bfamily.com/api/Models/SaveTheme/',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(data),
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Authorization", "Bearer " + token);
            },
            success: eventSuccess,
            error: eventError
        });
    }
	
	this.getNewWord = function getNewWord(token, eventSuccess, eventError) {
		$.ajax({
            type: 'GET',
            url: 'https://lab.group.3.b2bfamily.com/api/Models/GetWordWithUser',
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Authorization", "Bearer " + token);
            },
            success: eventSuccess,
            error: eventError
        });
    }
	
	this.getThemes = function getNewThemes( eventSuccess, eventError) {
		$.ajax({
            type: 'GET',
            url: 'https://lab.group.3.b2bfamily.com/api/Models/GetThemes',
            success: eventSuccess,
            error: eventError
        });
    }
	
	this.remember = function remember(word, token, eventSuccess, eventError) {
        let data = {
            Word: word,
        };
		$.ajax({
            url: 'https://lab.group.3.b2bfamily.com/api/Models/SaveWord/',
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
		this.donotremember = function donotremember(eventSuccess, eventError) {
		$.ajax({
            success: eventSuccess,
            error: eventError
        });
    }
}