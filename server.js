require('dotenv').config();
const http = require('http');
const app = require('./app');
const config = require('./config/default');
const PORT = config.app.port;
const { connect } = require('./models');
connect();

const server = http.createServer(app);

server.listen(PORT, () => {
    console.log('-------------------------')
    console.log(`listening at Port ${PORT}`)
    console.log('-------------------------')
})