var http = require('http');

var defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10 // Seconds.
};

var database = {results: []};

var requestHandler = function(request, response) {
  var headers = defaultCorsHeaders;

  var thingToSendBack;

  var statusCode = 200;

  console.log('Serving request type ' + request.method + ' for url ' + request.url);

  // Tell the client we are sending them plain text. You will need to change this if you are sending something other than plain text, like JSON or HTML.
  
  headers['Content-Type'] = 'text/plain';


  // .writeHead() writes to the request line and headers of the response, which includes the status and all headers.
  if (request.method === 'POST') {
    console.log(Object.keys(request));
    statusCode = 201;
    var body = '';

    request.on('data', function(data) {
      body += data;
    });

    request.on('end', function() {
      console.log('request body: ~~~~', body);
      var parsedBody = JSON.parse(body);
      database.results.push(parsedBody);
      response.writeHead(statusCode, headers);
      response.end('Message created');
    });

  } else if (request.method === 'GET') {

    // TODO: add a condition to set status code
    statusCode = 200;

    // thingToSendBack = messages;

    response.writeHead(statusCode, headers);
    response.end(JSON.stringify(database));

  }


};


exports.requestHandler = requestHandler;