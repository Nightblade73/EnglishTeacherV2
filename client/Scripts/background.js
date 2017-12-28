chrome.alarms.create({ 'delayInMinutes': 10, 'periodInMinutes': 10 });
function launch() {
    //chrome.app.window.create('Views/Home/main.html', {
    //    id: 'main',
    //    bounds: { width: 620, height: 500 }
    //});
    //chrome.window.create('Views/Home/main.html');
    chrome.tabs.create({ url: "Views/Home/main.html" });
    //windows.location.href({ url: "Views/Home/main.html" });
}
function showNotification() {

    chrome.notifications.create('reminder', {
        type: 'basic',
        iconUrl: '../../bookmark.png',
        title: 'Привет!',
        message: 'Есть новое слово для тебя! Загляни в расширение'
    }, function (notificationId) { });
    
}
chrome.notifications.onClicked.addListener(function (notificationId) {
    //launch();
    chrome.notifications.clear(notificationId, function () { });
    //chrome.browserAction.setPopup({ popup: "Views/Home/main.html" });
    chrome.browserAction.setBadgeText({ text: "" });
});

//chrome.browserAction.onClicked.addListener(function () {
//    //launch();
//    //chrome.notifications.clear(notificationId, function () { });
//    chrome.browserAction.setBadgeText({ text: "" });
//    chrome.browserAction.setPopup({ popup: "Views/Home/main.html" });
//    alert('!!!');
    

//});

chrome.alarms.onAlarm.addListener(function (alarm) {
    console.log("Got an alarm!", alarm);
    //chrome.browserAction.setIcon({ path: path });
    //chrome.browserAction.setTitle({ title: title });
    chrome.browserAction.setBadgeText({ text: "!" });
    showNotification();
});