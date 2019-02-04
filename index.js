const Twit = require('twit');
const fetch = require("node-fetch");

const T = new Twit({
  consumer_key: 'o3e0umgmfeuUgmmJRXC1bk7xP',
  consumer_secret: 'jMfgjwv1iE1bf1XGG7pmlbTB4blApqUsMD181fIvFcsQkyFMqI',
  access_token: '1092513253396226050-H3qvEYvV7TA7vuhddZfOhXhnhDmH0Y',
  access_token_secret: 'sAWaiZykSrFE8lgBzOpew17BhT6CBHwrcLPC8cZf4SRHn',
  timeout_ms: 60 * 1000,
});

const postToTwitter = (data) => {
  T.post(
    'statuses/update',
    { status: data.message },
    (err, data, response) => {
      console.log(err, data, response);
    }
  )
};

const url = 'https://dog.ceo/api/breeds/image/random';
fetch(url)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(JSON.stringify(data));
    postToTwitter(data);
  });


