import { Avatar, Button, TextRow } from '../../components';
import { AuthController } from '../../controllers/authController';
import Block from '../../utils/block';
import template from './profile.hbs?raw';

const formFields = [
    { label: 'Почта', name: 'email' },
    { label: 'Логин', name: 'login' },
    { label: 'Имя', name: 'first_name' },
    { label: 'Фамилия', name: 'second_name' },
    { label: 'Имя в чате', name: 'display_name' },
    { label: 'Телефон', type: 'tel', name: 'phone' }
];

export class Profile extends Block {
    constructor() {
        super();

        this.lists.FormFields = formFields.map((inputProps) => {
            return new TextRow({
                ...inputProps
            });
        });

        this.children.Avatar = new Avatar({
            avatar: '/avatar.svg'
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
