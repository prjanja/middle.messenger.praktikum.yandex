import { set } from '.';
import { EventBus } from './eventBus';

type RootState = {};

enum StoreEvents {
    Updated = 'Updated'
}

class Store extends EventBus {
    private state: RootState = {};

    public getState() {
        return this.state;
    }

    public setState(path: string, value: unknown) {
        set(this.state, path, value);
        this.emit(StoreEvents.Updated);
    }
}

export default new Store();
