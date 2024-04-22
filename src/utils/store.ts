import { Indexed, set } from '.';
import Block from './block';
import { EventBus } from './eventBus';

export type RootState = {
    user: {};
    chats: unknown[];
};

enum StoreEvents {
    Updated = 'Updated'
}

class Store extends EventBus {
    private state: RootState = {} as RootState;

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
