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

// TODO: Check the validity of the token
helpers.checkToken = (token) => {
    let actualDate;
    if(token.date > actualDate) {
        // Delete token - logout
    }
};

// TODO: Is the day there? Check with the DB
helpers.dayExist = (day) => {
    let checkedInDb;
    if(day === checkedInDb) {
        return true;
    }
};

module.exports = helpers;