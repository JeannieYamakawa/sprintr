var dwolla = require('dwolla-v2');

var client = new dwolla.Client({id: "...", secret: "..."});

var accountToken = new client.Token({access_token: "GnlMMOlLLTTwRRC44gGPkjfsVbVtwzkptDVdIB0fwGwLnV481N"});

var requestBody = {
  _links: {
    source: {
      href: 'https://api-uat.dwolla.com/funding-sources/118b08b9-e1eb-48b7-94ad-866989b0764e'
    },
    destination: {
      href: 'https://api-uat.dwolla.com/funding-sources/2fa64102-185d-443d-9001-dda9bc37651d'
    }
  },
  amount: {
    currency: 'USD',
    value: '1.00'
  }
};

accountToken
  .post('transfers', requestBody)
  .then(function(res) {
    res.headers.get('location'); // => 'https://api-uat.dwolla.com/transfers/74c9129b-d14a-e511-80da-0aa34a9b2388'
  });
