import Handlebars from 'handlebars';
import { v4 } from 'uuid';
import { EventBus } from './eventBus';
import { AnyFunction } from './types';

type BlockProps = {
    attr?: Record<string, string>;
    events?: Record<string, AnyFunction>;
    [key: string]: unknown;
};

export default class Block {
    static EVENTS = {
        INIT: 'init',
        FLOW_CDM: 'flow:component-did-mount',
        FLOW_CDU: 'flow:component-did-update',
        FLOW_RENDER: 'flow:render'
    };

    _element: HTMLElement | null = null;

    _id: string = v4();

    props: BlockProps;

    children: Record<string, Block>;

    lists: Record<string, Block | Block[]>;

    eventBus: () => EventBus;

    constructor(propsWithChildren = {}) {
        this._id = v4();

        const eventBusInstance = new EventBus();
        const { props, children, lists } = this._getChildrenPropsAndProps(propsWithChildren);
        this.props = this._makePropsProxy({ ...props }) as BlockProps;
        this.children = children;
        this.lists = lists;
        this.eventBus = () => eventBusInstance;
        this._registerEvents(eventBusInstance);
        eventBusInstance.emit(Block.EVENTS.INIT);
    }

    _addEvents() {
        const { events = {} } = this.props;
        Object.keys(events).forEach((eventName: string) => {
            this._element?.addEventListener(eventName, events[eventName]);
        });
    }

    _removeEvents() {
        const { events = {} } = this.props;

        Object.keys(events).forEach((eventName: string) => {
            this._element?.removeEventListener(eventName, events[eventName]);
        });
    }

    _registerEvents(eventBus: EventBus) {
        eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
        eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    }

    init() {
        this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }

    _componentDidMount() {
        this.componentDidMount();
        Object.values(this.children).forEach((child) => {
            child.dispatchComponentDidMount();
        });
    }

    componentDidMount() {}

    dispatchComponentDidMount() {
        this.eventBus().emit(Block.EVENTS.FLOW_CDM);
    }

    _componentDidUpdate(oldProps: BlockProps, newProps: BlockProps) {
        const response = this.componentDidUpdate(oldProps, newProps);
        if (!response) {
            return;
        }
        this._render();
    }

    componentDidUpdate(oldProps: BlockProps, newProps: BlockProps) {
        return JSON.stringify(oldProps) !== JSON.stringify(newProps);
    }

    _getChildrenPropsAndProps(propsAndChildren: BlockProps) {
        const children = {} as typeof this.children;
        const props = {} as BlockProps;
        const lists = {} as typeof this.lists;

        Object.entries(propsAndChildren).forEach(([key, value]) => {
            if (value instanceof Block) {
                children[key] = value;
            } else if (Array.isArray(value)) {
                lists[key] = value;
            } else {
                props[key] = value;
            }
        });

        return { children, props, lists };
    }

    addAttributes() {
        const { attr = {} } = this.props as { attr: Record<string, string> };

        Object.entries(attr).forEach(([key, value]) => {
            this._element?.setAttribute(key, value);
        });
    }

    setProps = (nextProps: BlockProps) => {
        if (!nextProps) {
            return;
        }

        Object.assign(this.props as object, nextProps);
    };

    get element() {
        return this._element;
    }

    _render() {
        const propsAndStubs = { ...this.props };
        const _tmpId = Math.floor(100000 + Math.random() * 900000);

        this._removeEvents();

        Object.entries(this.children).forEach(([key, child]) => {
            // @ts-ignore
            propsAndStubs[key] = `<div data-id="${child._id}"></div>`;
        });

        Object.entries(this.lists).forEach(([key]) => {
            // @ts-ignore
            propsAndStubs[key] = `<div data-id="__l_${_tmpId}"></div>`;
        });

        const fragment = this._createDocumentElement('template');
        fragment.innerHTML = Handlebars.compile(this.render())(propsAndStubs);

        Object.values(this.children).forEach((child) => {
            const stub = fragment.content.querySelector(`[data-id="${child._id}"]`);
            stub?.replaceWith(child.getContent() as HTMLElement);
        });

        Object.entries(this.lists).forEach((entry) => {
            const child = entry[1];

            if (!Array.isArray(child)) {
                return;
            }
            const listCont = this._createDocumentElement('template');
            child.forEach((item) => {
                if (item instanceof Block) {
                    listCont.content.append(item.getContent() as HTMLElement);
                } else {
                    listCont.content.append(`${item}`);
                }
            });
            const stub = fragment.content.querySelector(`[data-id="__l_${_tmpId}"]`);
            stub?.replaceWith(listCont.content);
        });

        const newElement = fragment.content.firstElementChild as HTMLElement;
        if (this._element) {
            this._element.replaceWith(newElement);
        }
        this._element = newElement;
        this._addEvents();
    }

    render() {}

    getContent() {
        return this.element;
    }

    _makePropsProxy(props: BlockProps) {
        const self = this;

        return new Proxy(props as object, {
            get(target, prop) {
                // @ts-ignore
                const value = target[prop];
                return typeof value === 'function' ? value.bind(target) : value;
            },
            set(target, prop, value) {
                const oldTarget = { ...target };
                // @ts-ignore
                target[prop] = value;
                self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
                return true;
            },
            deleteProperty() {
                throw new Error('No access');
            }
        });
    }

    _createDocumentElement(tagName: string) {
        const element = document.createElement(tagName);

        element.setAttribute('data-id', this._id);

        return element as HTMLTemplateElement;
    }

    show() {
        const content = this.getContent();
        if (content) {
            content.style.display = 'block';
        }
    }

    hide() {
        const content = this.getContent();
        if (content) {
            content.style.display = 'none';
        }
    }
}
