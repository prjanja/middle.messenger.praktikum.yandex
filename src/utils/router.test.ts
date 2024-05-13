import { expect } from 'chai';
import { Routes } from '../consts';
import Block from './block';
import { Router, AppRouter } from './router';

class TestComponent extends Block {
    constructor(props: { text: string }) {
        super(props);
    }

    render() {
        // eslint-disable-next-line quotes
        return `<div>{{text}}</div>`;
    }
}
describe('Router test', () => {
    beforeEach(() => {
        AppRouter.use(Routes.LOGIN, TestComponent)
            .use(Routes.MESSANGER, TestComponent)
            .use(Routes.NOT_FOUND, TestComponent)
            .start();
    });
    it('should be singleton', () => {
        const SecondRouter = new Router('');

        expect(AppRouter).to.equal(SecondRouter);
    });
    it('should navigate on messanger', () => {
        AppRouter.go(Routes.MESSANGER);

        expect(window.location.pathname).to.equal(Routes.MESSANGER);
    });

    it('should navigate on 404 page', () => {
        AppRouter.go('/not_exist');

        expect(window.location.pathname).to.equal(Routes.NOT_FOUND);
    });

    it('should navigate to previous page', () => {
        AppRouter.go(Routes.MESSANGER);
        AppRouter.go(Routes.LOGIN);
        AppRouter.back();

        setTimeout(() => {
            expect(window.location.pathname).to.equal(Routes.MESSANGER);
        }, 10);
    });
});
