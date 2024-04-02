import { Warning } from '../../components';
import Block from '../../utils/block';
import template from './not-found.hbs?raw';

export class NotFound extends Block {
    constructor() {
        super();

        this.children.Warning = new Warning({
            title: '404',
            text: 'Страница не существует'
        });
    }

    render() {
        return template;
    }
}
