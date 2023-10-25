const { Server } = require('socket.io');
const chatServices = require('./services/chat.service');



const realTimeServer = (httpServer) => {
    const io = new Server(httpServer);
    console.log('io connect');
    io.on('connection', socket => {
        console.log(`Cliente con id ${socket.id} conectado.`)
        socket.on('addProd', async data => {
            try {
                io.emit('newProduct', data.title);
            } catch (error) {
                console.log(error);
            }
        })
        socket.on('errAddProd', async data => {
            try {
                socket.emit('errAdd', data);
            } catch (error) {
                console.log(error);
            }
        })

        socket.on('message', async (data) => {
            await chatServices.create(data);
            const messages = await chatServices.getAll();

            io.emit('messageLogs', messages)
        })

        socket.on('auth', async (data) => {
            const messages = await chatServices.getAll();
            socket.emit('messageLogs', messages);

            socket.broadcast.emit('newUser', data);
        })
    })
}

module.exports = realTimeServer; 