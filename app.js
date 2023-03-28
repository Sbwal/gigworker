const express = require('express');
const { mongooseConnection } = require('./models');
const userRouter = require('./routes/user.routes');
const workerRouter = require('./routes/worker.routes');
const gigRouter = require('./routes/gig.routes');
const giggerRouter = require('./routes/gigger.routes');

const app = express();

app.use(express.json());

app.use((req, res, next) => {
    if (mongooseConnection()) {
        next();
    } else {
        res.status(500).json({
            statusCode: 500,
            status: "Mongo is unavailable"
        });
    }
});

app.get('/healthcheck', (req, res) => {
    res.send('Working');
})

app.use('/user', userRouter);
app.use('/worker', workerRouter);
app.use('/gig', gigRouter);
app.use('/gigger', giggerRouter);

app.all('*', (req, res) => {
    res.status(404).send('Route not found');
});

module.exports = app;