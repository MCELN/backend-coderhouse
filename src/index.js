const app = require('./app');
const { port } = require('./config/index');

app.listen(port, () => {
    console.log(`Server running to port ${port}`);
});

