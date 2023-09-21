const app = require('./app');
const { port } = require('./config/index');
const realTimeServer = require('./realTimeServer');

const httpServer = app.listen(port, () => {
    console.log(`Server running to port ${port}`);
});

realTimeServer(httpServer);
