import { Chat } from '../../api/types';
import { Button, ChatListItem, Input, Link } from '../../components';
import { BASE_URL, Routes } from '../../consts';
import { ChatController } from '../../controllers/chatController';
import Block, { BlockProps } from '../../utils/block';
import { printFormData } from '../../utils/formUtils';
import { RootState, connect } from '../../utils/store';
import template from './feed.hbs?raw';

type StateProps = {
    chats: Chat[];
};

type OwnProps = { currentChatId: number | null; chatTitle: string };

type FeedProps = OwnProps & StateProps;
export class Feed extends Block {
    constructor(props: FeedProps) {
        ChatController.getChats();
        const { chats, ...rest } = props;
        super(rest);

        this.children.ProfileLink = new Link({
            label: 'Профиль >',
            href: Routes.PROFILE
        });

        this.children.SearchInput = new Input({
            placeholder: 'Поиск',
            name: 'login'
        });

        this.children.NewChatNameInput = new Input({
            placeholder: 'Имя нового чата',
            name: 'chatName'
        });
        this.children.CreateChatButton = new Button({
            type: 'button',
            label: 'Создать новый чат',
            events: {
                click: (e) => {
                    e.preventDefault();
                    const chatNameInput = document.querySelector('input[name="chatName"]');
                    if (chatNameInput) {
                        const { value: title } = chatNameInput as HTMLInputElement;
                        if (title) {
                            ChatController.createChat({ title }).then(() => {
                                ChatController.getChats();
                            });
                        }
                    }
                }
            }
        });

        this.props.ListItems = props.chats?.map((chat) => {
            return new ChatListItem({
                title: chat.title,
                date: chat.last_message?.time,
                lastMessage: chat.last_message?.content,
                notification: chat.unread_count,
                avatar: BASE_URL + '/resources' + chat.avatar,
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
            name: 'message',
            validate: true
        });
        this.children.SendButton = new Button({
            icon: '/send.svg',
            type: 'button',
            events: {
                click: (e) => {
                    e.preventDefault();

                    const form = this.element?.querySelector('form') as HTMLFormElement;
                    printFormData(form);
                }
            }
        });
    }

    setProps(newProps: BlockProps) {
        const chats = newProps.chats as Chat[];
        if (chats) {
            this.lists.ListItems = chats.map((chat) => {
                return new ChatListItem({
                    title: chat.title,
                    date: chat.last_message?.time,
                    lastMessage: chat.last_message?.content,
                    notification: chat.unread_count,
                    avatar: BASE_URL + '/resources' + chat.avatar,
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
        }

        super.setProps(newProps);
    }

    render() {
        return template;
    }
}

const mapStateToProps = (state: RootState) => ({
    chats: state.chats
});

export const FeedConnected = connect(mapStateToProps)(Feed);
