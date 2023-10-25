const { ChatDao } = require('../adapters/factory');

const Chat = new ChatDao()

const getAll = async () => {
    try {
        return await Chat.getAll();
    } catch (error) {
        throw error;
    };
};

const create = async (newMessage) => {
    try {
        await Chat.create(newMessage);
    } catch (error) {
        throw error;
    };
};

module.exports = {
    getAll,
    create,
}