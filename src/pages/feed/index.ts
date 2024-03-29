import { Button, ChatListItem, Input } from '../../components';
import Block from '../../utils/block';
import template from './feed.hbs?raw';

const chats = [
    {
        id: '111',
        title: 'Андрей',
        date: '10:15',
        avatar: '/avatar.svg',
        lastMessage: 'Изображение',
        notification: 2
    },
    {
        id: '222',
        title: 'Киноклуб',
        date: '10:15',
        avatar: '/avatar.svg',
        lastMessage: 'стикер',
        notification: 0
    },
    {
        id: '333',
        title: 'Илья',
        date: '10:15',
        avatar: '/avatar.svg',
        lastMessage:
            'Друзья, у меня для вас особенный выпуск новостей! Длинное сообщение, которое не помещается и нужны элипсы',
        notification: 0
    }
];

type OwnProps = { currentChatId: string | null; chatTitle: string };
export class Feed extends Block {
    constructor(props: OwnProps) {
        super(props);

        this.children.SearchInput = new Input({
            placeholder: 'Поиск',
            name: 'login'
        });

        this.lists.ListItems = chats.map((chat) => {
            return new ChatListItem({
                ...chat,
                events: {
                    click: () => {
                        this.setProps({
                            currentChatId: chat.id,
                            chatTitle: chat.title
                        });
                    }
                }
            });
        });

        this.children.AttachButton = new Button({
            icon: '/attach.svg',
            type: 'button'
        });
        this.children.MessageInput = new Input({
            name: 'message'
        });
        this.children.SendButton = new Button({ icon: '/send.svg', type: 'button' });
    }

    render() {
        return template;
    }
}
