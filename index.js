

var querystring = require('querystring');
var https = require('https');

var host = 'offersvc.expedia.com';


callExpedia();
function performRequest(endpoint, method, data, success) {

  var dataString = JSON.stringify('');
  var headers = {};
  
  if (method == 'GET') {
//    endpoint += '?' + querystring.stringify(data);
  }
  else {
    headers = {
      'Content-Type': 'application/json',
      'Content-Length': dataString.length
    };
  }
  var options = {
    host: host,
    path: endpoint,
    method: method,
    headers: headers
  };

  var req = https.request(options, function(res) {
    res.setEncoding('utf-8');

    var responseString = '';

    res.on('data', function(data) {
      responseString += data;
    });

    res.on('end', function() {
      console.log(responseString);
      var responseObject = JSON.parse(responseString);
      success(responseObject);
    });
  });

  req.write(dataString);
  req.end();
}

function callExpedia() {
	  performRequest('/offers/v2/getOffers?scenario=deal-finder&page=foo&uid=foo&productType=Hotel', 'GET', '', function(data) {
	  });
	}
