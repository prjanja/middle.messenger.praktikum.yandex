import { CreateChatData } from '../api/types.ts';
import { handleErrorResponse } from '../utils/fetch.ts';
import store from '../utils/store.ts';
import { ChatAPI } from '../api/chatAPI.ts';

export class ChatController {
    static readonly _api = new ChatAPI();

    static getChats = () => {
        return this._api
            .getChats()
            .then((res) => {
                if (res.status === 200) {
                    store.setState('chats', JSON.parse(res.response));
                } else {
                    handleErrorResponse(res);
                }
            })
            .catch((err) => {
                console.error(err);
            });
    };

    static createChat = (data: CreateChatData) => {
        return this._api
            .createChat(data)
            .then((res) => {
                if (res.status === 200) {
                    console.log(res);
                } else {
                    handleErrorResponse(res);
                }
            })
            .catch((err) => {
                console.error(err);
            });
    };

    static deleteChat = (id: number) => {
        return this._api
            .deleteChat(id)
            .then((res) => {
                if (res.status === 200) {
                    console.log(res);
                } else {
                    handleErrorResponse(res);
                }
            })
            .catch((err) => {
                console.error(err);
            });
    };

    static getChatUsers = (id: number) => {
        return this._api
            .getChatUsers(id)
            .then((res) => {
                if (res.status === 200) {
                    store.setState('chatUsers', JSON.parse(res.response));
                } else {
                    handleErrorResponse(res);
                }
            })
            .catch((err) => {
                console.error(err);
            });
    };

    static addUserToChat = (users: number[], chatId: number) => {
        return this._api
            .addUserToChat(users, chatId)
            .then((res) => {
                if (res.status === 200) {
                    this.getChatUsers(chatId);
                } else {
                    handleErrorResponse(res);
                }
            })
            .catch((err) => {
                console.error(err);
            });
    };

    static deleteUserFromChat = (users: number[], chatId: number) => {
        return this._api
            .deleteUserFromChat(users, chatId)
            .then((res) => {
                if (res.status === 200) {
                    this.getChatUsers(chatId);
                } else {
                    handleErrorResponse(res);
                }
            })
            .catch((err) => {
                console.error(err);
            });
    };

    static getToken = (chatId: number) => {
        return this._api
            .getToken(chatId)
            .then((res) => {
                if (res.status === 200) {
                    return JSON.parse(res.response);
                }
                handleErrorResponse(res);
                return null;
            })
            .catch((err) => {
                console.error(err);
            });
    };
}
