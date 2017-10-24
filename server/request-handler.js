
var defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10 // Seconds.
};

var database = {results: []};

var requestHandler = function(request, response) {

  console.log('Serving request type ' + request.method + ' for url ' + request.url);

  var statusCode = 200;

  var headers = defaultCorsHeaders;

  var thingToSendBack;

  // Tell the client we are sending them plain text. You will need to change this if you are sending something other than plain text, like JSON or HTML.
  headers['Content-Type'] = 'text/plain';

  // .writeHead() writes to the request line and headers of the response, which includes the status and all headers.
  if (request.method === 'POST') {

    console.log(request.url);

    database.results.push({
      // createdAt: 'enter time here',
      // objectId: '',
      roomname: '',
      text: '',
      // updatedAt: '',
      username: ''
    });

    // TODO: add a condition to set status code
    statusCode = 201;

    thingToSendBack = {'message': 'Successful POST'};
    
    //read the request.body google this

    database.results.push();
  }

  // https://stackoverflow.com/questions/15427220/how-to-handle-post-request-in-node-js


  if (request.method === 'GET') {

    // TODO: add a condition to set status code
    statusCode = 200;

    thingToSendBack = database;
  }

  response.writeHead(statusCode, headers);

  response.end(JSON.stringify(thingToSendBack));
};


exports.requestHandler = requestHandler;