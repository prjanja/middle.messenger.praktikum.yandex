import store from '../utils/store';
import { WSTransport } from '../utils/wsTransport';
import { ChatController } from './chatController';

export class MessagesController {
    static _wsTransports = {} as Record<number, WSTransport>;

    static connect = (chatId: number, token: string) => {
        if (this._wsTransports[chatId]) {
            return Promise.resolve();
        }

        const { user: { id: userId } = {} } = store.getState();

        if (userId) {
            const currentTransport = new WSTransport({
                userId,
                token,
                chatId
            });
            this._wsTransports[chatId] = currentTransport;
            return currentTransport.connect().then(() => {
                currentTransport.on(WSTransport.EVENTS.MESSAGE, (data) => {
                    this.exchangeMessages(data);
                });
            });
        }

        return Promise.resolve();
    };

    static sendMessage = (chatId: number, message: string) => {
        const currentTransport = this._wsTransports[chatId];
        currentTransport.send({ type: 'message', content: message });
    };

    static updateChatHistory = (chatId: number, content: number = 0) => {
        const currentTransport = this._wsTransports[chatId];

        currentTransport.send({
            type: 'get old',
            content: content.toString()
        });
    };

    // тип any используется для корректной обработки сообщений пинга и др
    static exchangeMessages = (messages: any) => {
        if ('id' in messages || Array.isArray(messages)) {
            const incomingMessages = Array.isArray(messages) ? messages : [messages];
            const { messages: currentMessages = [] } = store.getState();

            store.setState('messages', [...currentMessages, ...incomingMessages.reverse()]);
        }
        ChatController.getChats();
    };
}
