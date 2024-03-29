import Block from '../../utils/block';
import template from './input.hbs?raw';

type InputProps = {
    label?: string;
    placeholder?: string;
    value?: string;
    type?: string;
    name: string;
    title?: string;
    events?: {
      click: (e: Event) => void;
    };
};

export class Input extends Block {
    constructor(props: InputProps) {
        super({ ...props });
    }

    render() {
        return template;
    }
}
