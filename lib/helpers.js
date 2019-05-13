/*
 *
 * Helpers
 *
 */

const helpers = {};

// Retrun response
helpers.response = (response, statusCode, payload) => {
    response.writeHead(statusCode, {
        'Content-Type': 'application/json'
    });
    const payloadString = JSON.stringify(payload);
    response.end(payloadString);
};

// Parse object to JSON
helpers.parseJsonToObject = (str) => {
    try {
        const obj = JSON.parse(str);
        return obj;
    } catch (e) {
        return {};
    }
};

module.exports = helpers;