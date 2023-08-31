
var botController = (function () {


})();

var uiController = (function () {


})();

var hist = [];


var controller = (function (botCntr, uiCntr) {
    var $chatCircle,
        $chatBox,
        $chatBoxClose,
        $chatBoxWelcome,
        $chatWraper,
        $submitBtn,
        $chatInput,
        $msg;

    /*toggle*/
    function hideCircle(evt) {
        evt.preventDefault();
        $chatCircle.hide('scale');
        $chatBox.show('scale');
        $chatBoxWelcome.show('scale');
    }

    function chatBoxCl(evt) {
        evt.preventDefault();
        $chatCircle.show('scale');
        $chatBox.hide('scale');
        $chatBoxWelcome.hide('scale');
        $chatWraper.hide('scale');
    }

    function chatOpenMessage(evt) {
        evt.preventDefault();
        $chatBoxWelcome.hide();
        $chatWraper.show();
    }

    //generate messages on submit click
    function submitMsg(evt) {
        evt.preventDefault();

        //1. get input message data
        msg = $chatSubmitBtn.val();

        //2.if there is no string button send shoudn't work
        if (msg.trim() == '') {
            return false;
        }
        //3. add message to bot controller
        callbot(msg);
        //4. display message to ui controller
        generate_message(msg, 'self');

    }

    function chatSbmBtn(evt) {
        if (evt.keyCode === 13 || evt.which === 13) {
            console.log("btn pushed");
        }
    }
    /* var input = uiCntr.getInput();*/
    /* $chatSubmitBtn.on("click", hideCircle);*/



    function init() {
        $chatCircle = $("#chat-circle");
        $chatBox = $(".chat-box");
        $chatBoxClose = $(".chat-box-toggle");
        $chatBoxWelcome = $(".chat-box-welcome__header");
        $chatWraper = $("#chat-box__wraper");
        $chatInput = $("#chat-input__text");
        $submitBtn = $("#chat-submit");

        //1. call toggle
        $chatCircle.on("click", hideCircle);
        $chatBoxClose.on("click", chatBoxCl);
        $chatInput.on("click", chatOpenMessage);

        //2. call wait message from CRM-human

        $submitBtn.on("click", chatSbmBtn);
        $chatInput.on("keypress", chatSbmBtn);


        //6. get message from bot controller-back end
        //7. display bot message to ui controller
    }

    return {
        init: init
    };

})(botController, uiController);

async function fetchAnswer() {
    url = "https://api.matthewfbailey.com/chatbot-api";
    console.log(hist);
    params = {
        headers: {},
        body: JSON.stringify(hist),
        method: "POST"
    };
    const response = await fetch(url, params)
    let data = await response.text();
    data = JSON.parse(data);

    hist.push({"role": "assistant", "content": data});
    $('.chat-logs').append('<div class="msg-row row"><div class="cm-msg-text">' + data + '</div><span class="justify-content-center align-items-center msg-avatar"></span></div>');

}

$('.chat-input__form').on('submit', function (e) {
    e.preventDefault();
    msg = $('.chat-input__text').val();

    if (msg != "") {
        $('.chat-logs').append('<div class="msg-row row float-right"><div style="background: #1982FC; color: white" class="cm-msg-text">' + msg + '</div><span class="justify-content-center align-items-center msg-avatar"></span></div>');
        $('.chat-input__text').val('');
        hist.push({"role": "user", "content": msg});
        console.log(hist);

        fetchAnswer()
    }

});


$(document).ready(controller.init);

    know = {
      "hello" : "hi",
      "how are you?" : "good",
      "ok" : ":)"
    };
    function talk() {
      var user = document.getElementById("userBox").value;
      document.getElementById("userBox").value = "";
      document.getElementById("chatLog").innerHTML += user+"<br>";
      if (user in know) {
        document.getElementById("chatLog").innerHTML += know[user]+"<br>";
      }
      else {
        document.getElementById("chatLog").innerHTML += "I don't understand...<br>";
      }
    }
