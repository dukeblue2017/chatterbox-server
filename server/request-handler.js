var http = require('http');

var defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10 // Seconds.
};

var database = {results: []};

var requestHandler = function(request, response) {
  var headers = defaultCorsHeaders;
  var statusCode = 200;
  console.log('Serving request type ' + request.method + ' for url ' + request.url);

  // Tell the client we are sending them plain text. You will need to change this if you are sending something other than plain text, like JSON or HTML.
  headers['Content-Type'] = 'text/plain';
  if (request.method === 'POST' && request.url === '/classes/messages') {
    statusCode = 201;
    var body = '';

    request.on('data', function(data) {
      body += data;
    });

    request.on('end', function() {
      var parsedBody = JSON.parse(body);
      database.results.push(parsedBody);
      response.writeHead(statusCode, headers);
      response.end('Message created');
    });


  } else if (request.method === 'GET' && request.url === '/classes/messages') {
    response.writeHead(statusCode, headers);
    response.end(JSON.stringify(database));

  
  } else if (request.method === 'OPTIONS') {
    response.writeHead(statusCode, headers);
    response.end(JSON.stringify(defaultCorsHeaders['access-control-allow-methods']));
  

  } else {

    statusCode = 404;

    response.writeHead(statusCode, headers);
    response.end('Method not allowed');
  }
};


exports.requestHandler = requestHandler;