require('dotenv').config();
const Twit = require('twit');
const fetch = require("node-fetch");
const download = require('download');
const fs = require('fs');
const path = require('path');
const cron = require('node-cron');

const T = new Twit({
  consumer_key: process.env.consumer_key,
  consumer_secret: process.env.consumer_secret,
  access_token: process.env.access_token,
  access_token_secret: process.env.access_token_secret,
  timeout_ms: 60 * 1000,
});

const postToTwitter = () => {
  const image_path = path.join(__dirname, './files/dog.jpg');
  const b64image = fs.readFileSync(image_path, { encoding: 'base64' });

  T.post('media/upload', { media_data: b64image }, (err, data, response) => {
    if (err) {
      console.log('ERROR:', err);
    }
    else {
      T.post('statuses/update', { 
        status: '#dog #dogs #doggo #dailydogpic #dailydog #dogbot #bot #dailydogbot #doge #doges #doggos #dogepic #dogepics ', 
        media_ids: new Array(data.media_id_string)
      });
      console.log('Posted!');
    }
  });
};

const downloadDogImage = (dogUrl) => {
  download(dogUrl).pipe(fs.createWriteStream('files/dog.jpg')).on('finish', () => {
    postToTwitter();
  });
};

const start = () => {
  console.log('starting dailydoggobot');
  const url = 'https://dog.ceo/api/breeds/image/random';
  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      downloadDogImage(data.message);
    });
};

cron.schedule('20 14 * * *', () => {
  start();
});