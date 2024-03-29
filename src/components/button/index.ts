import Block from '../../utils/block';
import template from './button.hbs?raw';

type ButtonProps = {
    type?: string;
    label?: string;
    icon?: string;
    events?: {
        click: (e: Event) => void;
    };
};

export class Button extends Block {
    constructor(props: ButtonProps) {
        super({ ...props });
    }

    render() {
        return template;
    }
}
