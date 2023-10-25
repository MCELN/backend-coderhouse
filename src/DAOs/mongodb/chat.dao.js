const Chat = require('./models/chat.model');

class ChatDao {
    async getAll() {
        return await Chat.find();
    };

    async create(newMessage) {
        await Chat.create(newMessage);
    }
};

module.exports = ChatDao;