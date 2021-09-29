const express = require('express');
const { logger } = require('./middleware/middleware.js')
const server = express();
server.use(express.json());

const userRouter = require('./users/users-router');

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});
server.use(logger)

server.use('/api/users', userRouter);

server.use('*', handleError);

module.exports = server;

function handleError(err, req, res, next) { //eslint-disable-line
  res.status(err.status || 500).json({
    message: err.message,
    error: 'oh no we have an error',
  });
}
