import { Indexed, set } from '.';
import Block from './block';
import { EventBus } from './eventBus';
import { User, Chat, Message } from '../api/types';

export type RootState = {
    user: User;
    chats: Chat[];
    chatUsers: User[];
    messages: Message[];
};

enum StoreEvents {
    Updated = 'Updated'
}

class Store extends EventBus {
    private state: RootState = {
        user: {} as User,
        chats: [],
        chatUsers: [],
        messages: []
    } as RootState;

    public getState() {
        return this.state;
    }

    public setState(path: string, value: unknown) {
        set(this.state, path, value);
        this.emit(StoreEvents.Updated);
    }
}

const AppStore = new Store();

export const connect = (mapStateToProps: (data: RootState) => Indexed) => {
    return (Component: typeof Block) => {
        return class extends Component {
            constructor(...args: any) {
                const state = mapStateToProps(AppStore.getState());

                super({ ...args, ...state });

                AppStore.on(StoreEvents.Updated, () => {
                    const newProps = mapStateToProps(AppStore.getState());

                    this.setProps(newProps);
                });
            }
        };
    };
};

export default AppStore;
