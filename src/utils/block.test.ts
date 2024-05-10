import { expect } from 'chai';
import Block from './block.ts';

class TestComponent extends Block {
    constructor(props: { text: string }) {
        super(props);
    }

    render() {
        // eslint-disable-next-line quotes
        return `<div>{{text}}</div>`;
    }
}
describe('Block test', () => {
    const component = new TestComponent({ text: 'Test' });

    it('should render', () => {
        const innerHTML = component.getContent()?.innerHTML;
        expect(innerHTML).to.equal('Test');
    });

    it('should update props', () => {
        const currentProps = { ...component.props };
        component.setProps({
            text: 'Another text'
        });

        expect(currentProps).to.not.equal(component.props);
    });

    it('should rerender after props update', () => {
        component.setProps({
            text: 'Updated text'
        });

        const innerHTML = component.getContent()?.innerHTML;
        expect(innerHTML).to.equal('Updated text');
    });
});
