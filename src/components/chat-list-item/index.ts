import { Avatar } from '..';
import Block from '../../utils/block';
import template from './chat-list-item.hbs?raw';

type ChatListItemProps = {
    title: string;
    date: string;
    lastMessage: string;
    notification?: number;
    avatar: string;
    events?: {
        click: (e: Event) => void;
    };
};

export class ChatListItem extends Block {
    constructor(props: ChatListItemProps) {
        super({ ...props });
        this.children.Avatar = new Avatar({
            avatar: props.avatar
        });
    }

    render() {
        return template;
    }
}
