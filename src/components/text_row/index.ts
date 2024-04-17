import Block from '../../utils/block';
import template from './text_row.hbs?raw';

type TextRowProps = {
    label?: string;
    value?: string;
};

export class TextRow extends Block {
    constructor(props: TextRowProps) {
        super({
            ...props
        });
    }

    render() {
        return template;
    }
}
