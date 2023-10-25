const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

class ChatDao {
    #path = '';
    #Chats = [];

    constructor() {
        this.#path = (process.cwd() + '/src/dataFiles/chat.json');
        try {
            const chatFile = fs.readFileSync(this.#path, 'utf-8');
            this.#Chats = chatFile ? JSON.parse(chatFile) : [];
        } catch (error) {
            throw error;
        };
    };

    async getAll() {
        try {
            const chats = await fs.promises.readFile(this.#path, 'utf-8');
            if (!chats) return [];
            return JSON.parse(chats);
        } catch (error) {
            throw error;
        };
    };

    async create(newMessage) {
        try {
            newMessage.id = uuidv4();
            this.#Chats.push(newMessage);
            const response = await fs.promises.writeFile(this.#path, JSON.stringify(this.#Chats));
            return response;
        } catch (error) {
            throw error;
        };
    };
};

module.exports = ChatDao;