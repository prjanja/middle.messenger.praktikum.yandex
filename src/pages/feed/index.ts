import { Chat, User } from '../../api/types';
import {
    Button, ChatListItem, Input, Link
} from '../../components';
import { ChatUserItem } from '../../components/chat-user-item';
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
                        this.handleOpenChat(chat);
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

        this.children.UserIDInput = new Input({
            placeholder: 'Введите id юзера для добавления',
            name: 'userIdInput'
        });
        this.children.AddUserButton = new Button({
            type: 'button',
            label: 'Добавить',
            events: {
                click: (e) => {
                    e.preventDefault();
                    const input = document.querySelector('input[name="userIdInput"]');

                    if (input) {
                        const { value: id } = input as HTMLInputElement;

                        if (id && this.props.currentChatId) {
                            ChatController.addUserToChat([Number(id)], this.props.currentChatId as number).then(() => {
                                ChatController.getChats();
                            });
                        }
                    }
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
                            this.handleOpenChat(chat);
                        }
                    }
                });
            });
        }

        const chatUsers = newProps.chatUsers as User[];
        if (chatUsers) {
            this.lists.Users = chatUsers.map((user) => {
                return new ChatUserItem({
                    avatar: BASE_URL + '/resources' + user.avatar,
                    title: user.display_name || user.first_name,
                    events: {
                        click: () => {
                            ChatController.deleteUserFromChat([user.id!], this.props.currentChatId as number);
                        }
                    }
                });
            });
        }

        super.setProps(newProps);
    }

    handleOpenChat = (chat: Chat) => {
        ChatController.getChatUsers(chat.id).then(() => {
            this.setProps({
                currentChatId: chat.id,
                chatTitle: chat.title
            });
        });
    };

    render() {
        return template;
    }
}

const mapStateToProps = (state: RootState) => ({
    chats: state.chats,
    chatUsers: state.chatUsers
});

export const FeedConnected = connect(mapStateToProps)(Feed);
