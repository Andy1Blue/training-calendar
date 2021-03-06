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
    const userId = req.headers.userid;
    const trainingDate = req.headers.trainingdate;

    if (userId && trainingDate) {
        db.read('training_calendar_data', 'user_id', userId)
            .then(trainingList => {
                trainingList.forEach(training => {
                    if (training.training_date == trainingDate) {
                        helpers.response(res, 200, training);
                    }
                });
            })
            .catch(() => {
                helpers.response(res, 404, []);
            });
    }

    // If userid exist get data from DB
    if (userId && !trainingDate) {
        db.read('training_calendar_data', 'user_id', userId)
            .then(trainingList => {
                helpers.response(res, 200, trainingList);
            })
            .catch(() => {
                helpers.response(res, 404, []);
            });
    }
};

// Training POST
training.post = (req, res) => {
    const userId = req.headers.userid;
    const trainingDate = req.headers.trainingdate;
    const description = req.headers.description;
    const distance = req.headers.distance;
    const calories = req.headers.calories;
    const time = req.headers.time;
    const other = req.headers.other;


    if (userId && trainingDate) {
        const dataTraining = {
            'training_date': trainingDate,
            'description': description,
            'distance':distance,
            'calories':calories,
            'time':time,
            'user_id': userId,
            'other': other
        }

        db.read('training_calendar_data', 'user_id', userId)
            .then(trainingList => {
                if (trainingList.training_date != trainingDate) {
                    db.create('training_calendar_data', dataTraining)
                        .then(() => {
                            helpers.response(res, 200, {
                                'Message': 'Training has been added'
                            });
                        })
                        .catch((err) => {
                            helpers.response(res, 500, {
                                'Error': 'Could not add new training'
                            });
                        });
                }
            })
            .catch((e) => {
                db.create('training_calendar_data', dataTraining)
                    .then(() => {
                        helpers.response(res, 200, {
                            'Message': 'Training has been added'
                        });
                    })
                    .catch((err) => {
                        helpers.response(res, 500, {
                            'Error': 'Could not add new training'
                        });
                    });
            });
    }
};

// Training PUT
training.put = (req, res) => {
    const userId = req.headers.userid;
    const trainingDate = req.headers.trainingdate;
    const description = req.headers.description;
    const distance = req.headers.distance;
    const calories = req.headers.calories;
    const time = req.headers.time;
    const other = req.headers.other;

    if (userId && trainingDate) {
        const dataTraining = {
            'training_date': trainingDate,
            'description': description,
            'distance':distance,
            'calories':calories,
            'time':time,
            'user_id': userId,
            'other': other
        }
        db.read('training_calendar_data', 'user_id', userId)
            .then(trainingList => {
                trainingList.forEach(training => {
                    if (training.training_date == trainingDate) {
                        db.update('training_calendar_data', dataTraining, 'id', training.id)
                            .then(() => {
                                helpers.response(res, 200, {
                                    'Message': 'Training has been updated'
                                });
                            })
                            .catch((err) => {
                                helpers.response(res, 500, {
                                    'Error': 'Could not updating'
                                });
                            });
                    }
                });
            })
            .catch((e) => {
                helpers.response(res, 500, {
                    'Error': 'Could not update training'
                });
            });
    }
};

// Training DELETE
training.delete = (req, res) => {
    const userId = req.headers.userid;
    const trainingDate = req.headers.trainingdate;
    const idToDelete = req.headers.idtodelete;

    if (userId && trainingDate && idToDelete) {
        db.read('training_calendar_data', 'id', idToDelete)
            .then(trainingList => {
                console.log(trainingList[0]['training_date']);
                if (trainingList[0]['training_date'] === trainingDate) {
                    db.delete('training_calendar_data', 'id', idToDelete)
                        .then(() => {
                            helpers.response(res, 200, {
                                'Message': 'Training has been deleted'
                            });
                        })
                        .catch((err) => {
                            helpers.response(res, 500, {
                                'Error': 'Could not deleted'
                            });
                        });
                } else {
                    helpers.response(res, 200, {
                        'Message': 'Training date do not match'
                    });
                }
            })
            .catch(() => {
                helpers.response(res, 200, {
                    'Message': 'Training is not exist'
                });
            });
    }
};

module.exports = training;