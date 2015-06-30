var TelegramBot = require('../src/telegram');
var request = require('request');

var options = {
  polling: true
};

var token = '';

var bot = new TelegramBot(token, options);
bot.getMe().then(function (me) {
  console.log('Hi my name is Tucky an ', me.username, 'from Xcaret Park');
});
bot.on('message', function (msg) {
  var chatId = msg.chat.id;
  if (msg.text == '/photo') {
    // From file
    var photo = __dirname+'/../test/bot.gif';
    bot.sendPhoto(chatId, photo, {caption: "I'm a bot!", action: "upload_photo"});
  }
  if (msg.text == '/loveme') {
    var url = 'http://mp3falls.com/a/cache/Lil_Wayne_-_Love_Me%201.mp3';
    // From HTTP request!
    var audio = request(url);
    bot.sendAudio(chatId, audio)
      .then(function (resp) {
        // Forward the msg
        var messageId = resp.message_id;
        bot.forwardMessage(chatId, chatId, messageId);
      });
  }
  if (msg.text == '/help') {
    var opts = {reply_to_message_id: msg.message_id};
    bot.sendMessage(chatId, "Test some methods: \n/photo to recieve a photo \n/loveme to get an audio \nand /help to... well i don't know");
  }
  if (msg.text == '/start') {
    var opts = {reply_to_message_id: msg.message_id};

    bot.sendMessage(chatId, "Hi my name is Tucky, an Master Bot from Xcaret Park, i am currently in development, please be patient! Test some methods: \n/photo to recieve a photo \n/loveme to get an audio \nand /help to... well i don't know");

  }
  if (msg.text == '/promotions') {
    var opts = {reply_to_message_id: msg.message_id};

    bot.sendMessage(chatId, "These are the promotions we have right nows");

  }
});
