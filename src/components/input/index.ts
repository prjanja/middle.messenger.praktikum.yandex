import Block from '../../utils/block';
import { validateInputField } from '../../utils/formUtils';
import template from './input.hbs?raw';

type InputProps = {
    label?: string;
    placeholder?: string;
    value?: string;
    type?: string;
    name: string;
    title?: string;
    validate?: boolean;
    error?: string;
    events?: {
        click: (e: Event) => void;
    };
};

export class Input extends Block {
    constructor(props: InputProps) {
        super({
            ...props,
            events: {
                blur: (e: Event) => {
                    if (this.props.validate) {
                        const error = validateInputField(e.target as HTMLInputElement);

                        this.setProps({
                            error
                        });
                    }
                }
            }
        });
    }

    render() {
        return template;
    }
}
