const mongoose = require('mongoose');

const envs = require('../envs');

mongoose.connect(envs.database.url)
    .then(() => {
        console.log({ mongodb: 'MongoDB online!' });
    }).catch(error => {
        console.log({
            error: {
                mongodb: error
            }
        });
    });

module.exports = mongoose.connection;