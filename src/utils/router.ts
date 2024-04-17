import Block from './block';

function isEqual(lhs: string, rhs: string) {
    return lhs === rhs;
}

function render(query: string, block: Block) {
    const root = document.querySelector(query);
    if (root) {
        root.innerHTML = '';
        root.append(block.getContent()!);
    }

    return root;
}

type RouteProps = { rootQuery: string } & Record<string, unknown>;

class Route {
    _pathname: string;

    _blockClass: typeof Block;

    _block: Block | null;

    _props: RouteProps;

    constructor(pathname: string, view: typeof Block, props: RouteProps) {
        this._pathname = pathname;
        this._blockClass = view;
        this._block = null;
        this._props = props;
    }

    navigate(pathname: string) {
        if (this.match(pathname)) {
            this._pathname = pathname;
            this.render();
        }
    }

    leave() {
        if (this._block) {
            this._block.hide();
        }
    }

    match(pathname: string) {
        return isEqual(pathname, this._pathname);
    }

    render() {
        if (!this._block) {
            this._block = new this._blockClass();
            render(this._props.rootQuery, this._block);
            return;
        }

        this._block.show();
    }
}

class Router {
    static __instance: Router;

    routes!: Route[];

    history!: typeof window.history;

    _currentRoute!: Route | null;

    _rootQuery!: string;

    constructor(rootQuery: string) {
        if (Router.__instance) {
            return Router.__instance;
        }

        this.routes = [];
        this.history = window.history;
        this._currentRoute = null;
        this._rootQuery = rootQuery;

        Router.__instance = this;
    }

    use(pathname: string, block: typeof Block) {
        const route = new Route(pathname, block, { rootQuery: this._rootQuery });

        this.routes.push(route);

        return this;
    }

    start() {
        window.onpopstate = (event) => {
            // @ts-expect-error: Эвент будет содержать location
            this._onRoute(event.currentTarget?.location.pathname);
        };

        this._onRoute(window.location.pathname);
    }

    _onRoute(pathname: string) {
        const route = this.getRoute(pathname);
        if (!route) {
            return;
        }

        if (this._currentRoute && this._currentRoute !== route) {
            this._currentRoute.leave();
        }

        this._currentRoute = route;
        route.render();
    }

    go(pathname: string) {
        this.history.pushState({}, '', pathname);
        this._onRoute(pathname);
    }

    back() {
        this.history.back();
    }

    forward() {
        this.history.forward();
    }

    getRoute(pathname: string) {
        return this.routes.find((route) => route.match(pathname));
    }
}

const AppRouter = new Router('#app');

export { AppRouter };
