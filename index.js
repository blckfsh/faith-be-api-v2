const express = require('express');
const mongoose = require('mongoose');
const winston = require('winston');
const app = express();
const bibleRoute = require('./routes/bible');
const groupRoute = require('./routes/group');
const groupMemberRoute = require('./routes/group-member');
const userRoute = require('./routes/user');
require('dotenv').config();

const PORT = process.env.PORT || 4000;

// middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true})); //allows array and objects

// create a logger
const logger = winston.createLogger({
    level: 'info',
    transports: [
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize({all:true})
            )
        }),
        new winston.transports.File({ filename: 'error.log', level: 'error' })
    ],
    exceptionHandlers: [
        new winston.transports.File({ filename: 'exception.log' })
    ]
});

// routes
app.use('/api/bible', bibleRoute);
app.use('/api/group', groupRoute);
app.use('/api/group-member', groupMemberRoute);
app.use('/api/user', userRoute);

// connect to mongodb atlas
mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true}).then(() => {
    logger.info("Connected to mongoDb atlas")
}).catch(error => {
    logger.error(error.message);
})

// start server
app.listen(PORT, () => {
    logger.info(`Server started at PORT ${PORT}`);
})