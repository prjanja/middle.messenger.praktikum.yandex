import { EventBus } from './eventBus';
import { BASE_URL_WS } from '../consts';

type WSTransportProps = {
    userId: number;
    chatId: number;
    token: string;
};

type Message = {
    type: string;
    content?: string;
};

const PING_TIMEOUT = 15000;

export class WSTransport extends EventBus {
    static EVENTS = {
        OPEN: 'open',
        CLOSE: 'close',
        ERROR: 'error',
        MESSAGE: 'message'
    };

    _socket: WebSocket;

    constructor(props: WSTransportProps) {
        const { userId, token, chatId } = props;
        super();

        this._socket = new WebSocket(BASE_URL_WS + `/${userId}/${chatId}/${token}`);
    }

    connect() {
        this._socket.addEventListener('open', () => {
            this.emit(WSTransport.EVENTS.OPEN);
        });

        this._socket.addEventListener('close', () => {
            this.emit(WSTransport.EVENTS.CLOSE);
        });

        this._socket.addEventListener('error', (e) => {
            console.log('Ошибка', e);
            this.emit(WSTransport.EVENTS.ERROR, e);
        });

        this._socket.addEventListener('message', (message) => {
            try {
                const data = JSON.parse(message.data);

                this.emit(WSTransport.EVENTS.MESSAGE, data);
            } catch (e) {
                console.log('Ошибка', e);
            }
        });

        const pingInterval = setInterval(() => {
            this.send({ type: 'ping' });
        }, PING_TIMEOUT);

        this.on(WSTransport.EVENTS.CLOSE, () => {
            clearInterval(pingInterval);
        });

        return new Promise((resolve, reject) => {
            this.on(WSTransport.EVENTS.ERROR, reject);
            this.on(WSTransport.EVENTS.OPEN, resolve);
        });
    }

    send(message: Message) {
        if (!this._socket) {
            throw new Error('WebSocket connection is not open');
        }

        this._socket.send(JSON.stringify(message));
    }

    close() {
        this._socket.close();
    }
}
