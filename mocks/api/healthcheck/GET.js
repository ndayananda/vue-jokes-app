function requestHandler(request, response) {
  response.json({status: "OK"});
}

module.exports = requestHandler;