chrome.alarms.onAlarm.addListener(
    () => {
        chrome.notifications.create(
            "time_is_over",
            {
                type: "basic",
                iconUrl: "../icon.png",
                title: "Time Calculator",
                message: "Hello There Look Like You Don't See Current Time",
                silent: false
            },
            () => {
                chrome.alarms.clear("time_is_over")
            }
        )
    },
)
chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if(request.time){
            chrome.alarms.clear("time_is_over")
            createAlarm(request.time);
        }
    }
);

function createAlarm(time=0) {
    if(time){
        chrome.alarms.create(
            "time_is_over",
            {
                periodInMinutes: time
            }
        );
    }
}