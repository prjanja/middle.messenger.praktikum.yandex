import { Message as MessageProps } from '../../api/types';
import Block from '../../utils/block';
import template from './message.hbs?raw';

export class Message extends Block {
    constructor(props: MessageProps) {
        super({ ...props });
    }

    render() {
        return template;
    }
}
