/*
 *
 * Training API
 *
 */

// Dependecies
const helpers = require('../helpers');
const db = require('../db');

// Container for training methods
const training = {};

training.init = (req, res) => {
    const method = req.method.toLowerCase();
    const acceptableMethods = ['post', 'get', 'put', 'delete'];
    if (acceptableMethods.indexOf(method) > -1) {
        training[method](req, res);
    } else {
        helpers.response(res, 405);
    }
};

// Training GET
training.get = (req, res) => {
    const userId = req.headers.userId;
    console.log(userId);
    // if (userId) {
    db.read('training_calendar_data')
        .then(trainingList => {
            helpers.response(res, 200, trainingList);
        })
        .catch(() => {
            helpers.response(res, 404, []);
        });
};

module.exports = training;