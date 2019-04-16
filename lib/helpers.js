/*
 *
 * Helpers
 *
 */

const helpers = {};

helpers.response = (response, statusCode, payload) => {
    response.writeHead(statusCode, {
      'Content-Type': 'application/json'
    });
    const payloadString = JSON.stringify(payload);
    response.end(payloadString)
  };

module.exports = helpers