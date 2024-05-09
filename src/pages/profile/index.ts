import { User } from '../../api/types';
import {
    Avatar, Button, Link, TextRow
} from '../../components';
import { BASE_URL, Routes } from '../../consts';
import { AuthController } from '../../controllers/authController';
import Block from '../../utils/block';
import { RootState, connect } from '../../utils/store';
import template from './profile.hbs?raw';

const formFields = [
    { label: 'Почта', name: 'email' },
    { label: 'Логин', name: 'login' },
    { label: 'Имя', name: 'first_name' },
    { label: 'Фамилия', name: 'second_name' },
    { label: 'Имя в чате', name: 'display_name' },
    { label: 'Телефон', type: 'tel', name: 'phone' }
];

type StateProps = {
    user: User;
};

export class Profile extends Block {
    constructor(props: StateProps) {
        super();
        const { user = {} as User } = props;

        this.lists.FormFields = formFields.map((inputProps) => {
            return new TextRow({
                ...inputProps,
                value: String(user[inputProps.name as keyof User])
            });
        });

        this.children.FeedLink = new Link({
            label: '< К чатам ',
            href: Routes.MESSANGER
        });
        this.children.ChangeDataLink = new Link({
            label: 'Изменить данные',
            href: Routes.PROFILE_EDIT
        });
        this.children.ChangePasswordLink = new Link({
            label: 'Изменить пароль',
            href: Routes.PROFILE_EDIT_PASSWORD
        });

        this.children.Avatar = new Avatar({
            avatar: user.avatar ? BASE_URL + '/resources/' + user.avatar : '/avatar.svg'
        });

        this.children.LogoutButton = new Button({
            type: 'button',
            label: 'Выход',
            events: {
                click: (e) => {
                    e.preventDefault();
                    AuthController.logOut();
                }
            }
        });
    }

    render() {
        return template;
    }
}

const mapStateToProps = (state: RootState) => ({
    user: state.user
});

export const ProfileConnected = connect(mapStateToProps)(Profile);
