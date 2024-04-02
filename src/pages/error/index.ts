import { Warning } from '../../components';
import Block from '../../utils/block';
import template from './error.hbs?raw';

export class Error extends Block {
    constructor() {
        super();

        this.children.Warning = new Warning({
            title: '5XX',
            text: 'Что-то пошло не так'
        });
    }

    render() {
        return template;
    }
}
