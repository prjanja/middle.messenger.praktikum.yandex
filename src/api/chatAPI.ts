import { CreateChatData } from './types';
import { BaseAPI } from './baseAPI';

export class ChatAPI extends BaseAPI {
    constructor() {
        super('/chats');
    }

    getChats = () => {
        return this._fetch.get('');
    };

    createChat = (data: CreateChatData) => {
        return this._fetch.post('', {
            data,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    };

    deleteChat = (chatId: number) => {
        return this._fetch.delete('', {
            data: {
                chatId
            },
            headers: {
                'Content-Type': 'application/json'
            }
        });
    };

    getChatUsers = (chatId: number) => {
        return this._fetch.get(`/${chatId}/users`);
    };

    getNewMessagesCount = (chatId: number) => {
        return this._fetch.get(`/new/${chatId}`);
    };

    addUserToChat = (users: number[], chatId: number) => {
        return this._fetch.put('/users', {
            data: {
                users,
                chatId
            },
            headers: {
                'Content-Type': 'application/json'
            }
        });
    };

    deleteUserFromChat = (users: number[], chatId: number) => {
        return this._fetch.delete('/users', {
            data: {
                users,
                chatId
            },
            headers: {
                'Content-Type': 'application/json'
            }
        });
    };

    getToken = (id: number) => {
        return this._fetch.post(`/token/${id}`, {
            data: {
                id
            }
        });
    };
}
