


    function login(email, password, preloader, e1) {
        var loginData = {
            grant_type: 'password',
            username: email,
            password: password
        };
        var ajaxData = {
            type: 'POST',
            url: 'http://localhost:54049/Token',
            data: loginData,
            beforeSend: function () {
                preloader.css('display', 'block');
            },
            complete: function () {
                preloader.css('display', 'none');
            },
            success: e1,
            fail: function (data) {
                alert(data.responseText);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert(jqXHR.responseText || textStatus);
            }
        };
        $.ajax(ajaxData);
    }
    


