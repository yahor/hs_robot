function sendCommand(command) {
    var jqxhr = $.ajax("/answer?keys=" + command)
        .done(function (msg) {
            console.log(msg);
            $('#answer').text(msg);
        })
        .fail(function () {
            console.log("error");
        })
        .always(function (msg) {
            console.log("complete " + msg);
        });
}

var keyArray = Array();

function sendKeys() {
    if(keyArray.length >= 2) {
        var data = [keyArray[keyArray.length - 1], keyArray[keyArray.length - 2]];

        var jqxhr = $.post("/timer", { 'keys[]': data })
            .done(function (msg) {
                keyArray = Array();
                console.log(keyArray);
            })
            .fail(function () {
                console.log("error");
            })
            .always(function (msg) {
                console.log("complete " + msg);
            });
    }
    setTimeout('sendKeys()', 2000); //now that the request is complete, do it again in 2 second
}

$(document).ready(function () {
    $(window).keydown(function (e) {
        $('#text').text(e.keyCode);
        console.log(e);
        sendCommand(e.keyCode);
    });

    $(window).keyup(function (e) {
      keyArray.push(event.which);
    });
    sendKeys();
});
