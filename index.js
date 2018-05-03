'use strict';
const BootBot = require('bootbot');
const config = require('config');
const fetch = require('node-fetch');
const GIPHY_URL = 'http://api.giphy.com/v1/gifs/search?api_key=HzaXHDB3xaqTI8i6SeHsrGc1SXLU0vt1&q=';

const bot = new BootBot({
    accessToken:config.get('accessToken'),
    verifyToken:config.get('verifyToken'),
    appSecret:config.get('appSecret')
});

bot.hear(['hello', 'hi', 'hey'], (payload, chat) => {

    chat.say('Hello there!');

});

bot.hear(/gif (.*)/i, (payload, chat, data) => {

    const query = data.match[1];
    chat.say('Searching for the perfect gif...');
    fetch(GIPHY_URL+query)
        .then(res => res.json())
        .then(json => {
            chat.say({
                attachment:'image',
                url: json.data[0].images.fixed_height.url
            }, {
                typing:true
            });
        })

});

bot.start();