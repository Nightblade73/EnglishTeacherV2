$(document).ready(function () {
    var ex = new extenApi();
    var tokenKey = "tokenInfo";
    
    $.ajax({
        type: 'GET',
        url: 'http://localhost:54049/api/Models/GetWords',
        //     datatype: 'jsonp',
        beforeSend: function (xhr) {
            //     preloader.css('display', 'block');
        },
        success: function (data) {
            //   console.log(data[Math.round(0 - 0.5 + Math.random() * (data.length))]);

       //     let r = Math.round(0 - 0.5 + Math.random() * (data.length));
       //     document.getElementById("newWord").innerHTML = data[r].word1;
       //     document.getElementById("transcription").innerHTML = data[r].transcription;
       //     document.getElementById("translate").innerHTML = data[r].translate;

            //    $('#lbl').text = (data[Math.round(0 - 0.5 + Math.random() * (data.length))].word1);
        },
        error: function (jqXHR, textStatus, errorThrown) {

            alert(jqXHR.responseText || textStatus);
        }
    });
   
    $.ajax({
        type: 'GET',
        url: 'http://localhost:54049/api/Models/GetThemes',
        //     datatype: 'jsonp',
        beforeSend: function (xhr) {
            // preloader.css('display', 'block');
        },
        success: function (data) {
            // console.log(data);
            //  var cityData = result.Data;
            let defaultV = new Option("--Select--", 0, true);
            $('#selectTheme').empty();
            $('#selectTheme').append(defaultV);
            for (let i = 0; i < data.length; i++) {
                let opt = new Option(data[i].name, data[i].id_theme, false);
                $('#selectTheme').append(opt);
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert(jqXHR.responseText || textStatus);
        }
    });

    $('#but-Sign-Up').click(function (e) {
        e.preventDefault();
        $('#preloader').css('display', 'block');
        ex.registration($('#inputEmail').val(), $('#inputPassword').val(),
            $('#inputPasswordConfirmation').val(),
            function (data) {
                alert("Всё норм");
                $('#preloader').css('display', 'none');
            }, function (jqXHR, textStatus, errorThrown) {
                $('#preloader').css('display', 'none');
                alert(jqXHR.responseText || textStatus);
            });

    });

    $('#send-new-pass').click(function (e) {
        e.preventDefault();
        $('#preloader').css('display', 'block');
        ex.forrgotPassword($('#emailToSend').val(),
            function (data) {
                alert("Вам отправлено письмо с новым паролем");
                $('#preloader').css('display', 'none');
            }, function (jqXHR, textStatus, errorThrown) {
                $('#preloader').css('display', 'none');
                alert(jqXHR.responseText || textStatus);
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


    $('#getItemsButton').click(function (e) {
        e.preventDefault();
        $.ajax({
            type: 'GET',
            url: 'http://localhost:54049/api/Models/GetWordWithUser',
            //     datatype: 'jsonp',
            beforeSend: function (xhr) {
                //     preloader.css('display', 'block');
                let token = sessionStorage.getItem(tokenKey);
                xhr.setRequestHeader("Authorization", "Bearer " + token);
            },
            success: function (data) {
                //   console.log(data);
                document.getElementById("newWord").innerHTML = data.word1;
                document.getElementById("translate").innerHTML = data.translate;

            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert(jqXHR.responseText || textStatus);
            }
        });
    });

    $('#ok').click(function () {
        $('#infoBlock').fadeOut('1000');
        //setTimeout(function () {
        //    $('#main-section').fadeIn('1000');
        //}, 500);
    });

    //   $('#getNewWordTry').click(    function (e) {
    //        e.preventDefault();

    //  });
    //   $('#Themes').click(function (e) {

    //    e.preventDefault();

    //   });
    $('#btn-Save').click(function (e) {
        e.preventDefault();
        ex.saveSettings($('#selectTheme').val(), sessionStorage.getItem(tokenKey),
            function () {
                document.location.href = "main.html";
            }, function (jqXHR, textStatus, errorThrown) {
                alert(jqXHR.responseText || textStatus);
            });
    });

    $('#no').click(function (e) {
        e.preventDefault();
        $.ajax({
            beforeSend: function (xhr) {
            },
            success: function (data) {
                chrome.browserAction.setBadgeText({ text: "" });
                window.close();
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert(jqXHR.responseText || textStatus);
            }
        });
    });

    $('#yes').click(function (e) {
        e.preventDefault();
        var data = {
            Word: document.getElementById("newWord").textContent
            // Word: $('#newWord').val()
        };
        $.ajax({
            url: 'http://localhost:54049/api/Models/SaveWord/',
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(data),
            beforeSend: function (xhr) {
                let token = sessionStorage.getItem(tokenKey);
                xhr.setRequestHeader("Authorization", "Bearer " + token);
            },
            success: function () {
                chrome.browserAction.setBadgeText({ text: "" });
                window.close();
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert(jqXHR.responseText || textStatus);
            }
        });
    });

    $('#logOut').click(function (e) {
        e.preventDefault();
        sessionStorage.removeItem(tokenKey);
        deleteCookie("username");
        deleteCookie("password");
        document.location.href = "autorization.html";
    });

});
