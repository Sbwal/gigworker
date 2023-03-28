const mongoose = require('mongoose');
const config = require('../config/default');

mongoose.set("strictQuery", false);

function connect() {
    const dbURI = `mongodb+srv://${config.mongoConfig.userName}:${config.mongoConfig.password}@${config.mongoConfig.host}/?retryWrites=true&w=majority`;
    console.log('Connecting to MongoDB...')
    mongoose.connect(dbURI).then(() => {
        console.log('Connection to MongoDB established')
    }).catch((err) => {
        console.log('Connection to MongoDB falied', err)
    })
}

function mongooseConnection() {
    return mongoose.connection.readyState == 1;
}

module.exports = {
    connect,
    mongooseConnection
}
