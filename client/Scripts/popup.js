$(document).ready(function () {
    var ex = new extenApi();
    var tokenKey = "tokenInfo";

    if (sessionStorage.getItem(tokenKey) !== null) {
        ex.getNewWord(sessionStorage.getItem(tokenKey),
                function (data) {
                    document.getElementById("newWord").innerHTML = data.word1;
                    document.getElementById("translate").innerHTML = data.translate;
                },
                function (jqXHR, textStatus, errorThrown) {
                    $('#infoBlock').fadeIn('1000');
                    $('#message').text(jqXHR.responseText || textStatus);
                });
    }
    ex.getThemes(function (data) {
        let defaultV = new Option("--Select--", 0, true);
        $('#selectTheme').empty();
        $('#selectTheme').append(defaultV);
        for (let i = 0; i < data.length; i++) {
            let opt = new Option(data[i].name, data[i].id_theme, false);
            $('#selectTheme').append(opt);
        }
    },
            function (jqXHR, textStatus, errorThrown) {
                $('#infoBlock').fadeIn('1000');
                $('#message').text(jqXHR.responseText || textStatus);
            });





    $('#but-Sign-Up').click(function (e) {
        e.preventDefault();
        $('#preloader').css('display', 'block');
        ex.registration($('#inputEmail').val(), $('#inputPassword').val(),
                $('#inputPasswordConfirmation').val(),
                function (data) {
                    /* alert("Всё норм"); */
                    $('#preloader').css('display', 'none');
                    /* $('#preloader').fadeOut('1000');; */
                    $('#infoBlock').fadeIn('1000');
                    $('#message').text("Вам отправлено письмо подтверждения пароля");
                }, function (error) {
            $('#preloader').fadeOut('1000');
            ;
            $('#infoBlock').fadeIn('1000');
            $('#message').text(errorMessage(error));
        });
    });

    $('#forgot-pass').click(function () {
        $("#main-section").fadeOut('1000');
        setTimeout(function () {
            $('#add-section').fadeIn('1000');
        }, 500);
    });

    $('#cancle').click(function () {
        $("#add-section").fadeOut('1000');
        setTimeout(function () {
            $('#main-section').fadeIn('1000');
        }, 500);
    });

    $('#send-new-pass').click(function (e) {
        e.preventDefault();
        $('#preloader').css('display', 'block');
        ex.forrgotPassword($('#emailToSend').val(),
                function (data) {
                    /* alert("Вам отправлено письмо с новым паролем"); */
                    $('#preloader').css('display', 'none');
                    $('#infoBlock').fadeIn('1000');
                    $('#message').text("Вам отправлено письмо с новым паролем");
                    window.close();
                }, function (error) {
            $('#preloader').fadeOut('1000');
            ;
            $('#infoBlock').fadeIn('1000');
            $('#message').text(errorMessage(error));
        });
    });

    $('#getItemsButton').click(function (e) {
        e.preventDefault();
        ex.getNewWord(sessionStorage.getItem(tokenKey),
                function (data) {
                    document.getElementById("newWord").innerHTML = data.word1;
                    document.getElementById("translate").innerHTML = data.translate;
                },
                function (jqXHR, textStatus, errorThrown) {
                    $('#infoBlock').fadeIn('1000');
                    $('#message').text(jqXHR.responseText || textStatus);
                });
    });

    $('#ok').click(function () {
        $('#infoBlock').fadeOut('1000');
    });

    $('#btn-Save').click(function (e) {
        e.preventDefault();
        ex.saveSettings($('#selectTheme').val(), sessionStorage.getItem(tokenKey),
                function () {
                    document.location.href = "main.html";
                }, function (jqXHR, textStatus, errorThrown) {
            $('#infoBlock').fadeIn('1000');
            $('#message').text(jqXHR.responseText || textStatus);
        });
    });

    $('#no').click(function (e) {
        e.preventDefault();
        ex.donotremember(
                function () {
                    chrome.browserAction.setBadgeText({text: ""});
                    window.close();
                },
                function (jqXHR, textStatus, errorThrown) {
                    /* alert(jqXHR.responseText || textStatus); */
                    $('#infoBlock').fadeIn('1000');
                    $('#message').text(jqXHR.responseText || textStatus);
                });
    });


    $('#yes').click(function (e) {
        e.preventDefault();
        ex.remember(document.getElementById("newWord").textContent, sessionStorage.getItem(tokenKey),
                function () {
                    chrome.browserAction.setBadgeText({text: ""});
                    window.close();
                },
                function (jqXHR, textStatus, errorThrown) {
                    /* alert(jqXHR.responseText || textStatus); */
                    $('#infoBlock').fadeIn('1000');
                    $('#message').text(qXHR.responseText || textStatus);
                }
        );
    });



    $('#logOut').click(function (e) {
        e.preventDefault();
        sessionStorage.removeItem(tokenKey);
        deleteCookie("username");
        deleteCookie("password");
        chrome.browserAction.setBadgeText({text: ""});
        document.location.href = "autorization.html";
    });

    function errorMessage(error) {
        let message = "";
        console.log(error.responseJSON);
        if (typeof error.responseJSON.ModelState !== "undefined")
        {
            if (typeof error.responseJSON.ModelState[""] !== "undefined")
                message += "Проверьте корректность введённой почты" + "\n";
            if (typeof error.responseJSON.ModelState["model.ConfirmPassword"] !== "undefined")
                message += error.responseJSON.ModelState["model.ConfirmPassword"][0] + "\n";
            if (typeof error.responseJSON.ModelState["model.Password"] !== "undefined")
                message += error.responseJSON.ModelState["model.Password"][0] + "\n";
        }
        if (typeof error.responseJSON["Message"] !== "undefined" && !message.Contaion("Проверьте корректность введённой почты"))
            message += "Проверьте корректность введённой почты" + "\n";
        if (typeof error.responseJSON["error_description"] !== "undefined")
            message += error.responseJSON["error_description"] + "\n";
        return message;
    }



});
