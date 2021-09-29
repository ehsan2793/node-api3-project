// require your server and launch it
const server = require('./api/server');

const port = 3001

server.listen(port, () => {
    console.log(`server listening on http://localhost:${port}`);
})
