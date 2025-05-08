// this will entry point of our server and app
// so when this runs everything runs easily and starts
// pnpm dlx nodemon to run
const http = require('http');
const app = require('./app');
// const { initializeSocket } = require('./socket');
const port = process.env.PORT || 3000;

const server = http.createServer(app);

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
