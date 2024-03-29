import Block from '../../utils/block';
import template from './warning.hbs?raw';

type WarningProps = {
    title: string;
    text: string;
};

export class Warning extends Block {
    constructor(props: WarningProps) {
        super({ ...props });
    }

    render() {
        return template;
    }
}
