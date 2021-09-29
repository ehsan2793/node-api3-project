const express = require('express');

const server = express();
server.use(express.json());

const userRouter = require('./users/users-router');
// global middlewares and the user's router need to be connected here

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

server.use('/api/users', userRouter);

server.use('*', handleError);

module.exports = server;

function handleError(err, req, res, next) {
  res.status(err.status || 500).json({
    message: err.message,
    error: 'oh no we have an error',
  });
}
