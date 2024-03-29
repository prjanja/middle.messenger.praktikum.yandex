import Block from '../../utils/block';
import template from './page-wrapper.hbs?raw';

export class PageWrapper extends Block {
    constructor() {
        super();
    }

    render() {
        return template;
    }
}
