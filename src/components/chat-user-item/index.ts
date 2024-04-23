import { Avatar } from '..';
import Block from '../../utils/block';
import template from './chat-user-item.hbs?raw';

type ChatUserItemProps = {
    avatar: string;
    title: string;
    events?: {
        click: (e: Event) => void;
    };
};

export class ChatUserItem extends Block {
    constructor(props: ChatUserItemProps) {
        super({ ...props });
        this.children.Avatar = new Avatar({
            avatar: props.avatar
        });
    }

    render() {
        return template;
    }
}
