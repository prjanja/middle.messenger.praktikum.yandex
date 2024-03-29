import { Avatar, Input } from '../../components';
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
            return new Input({
                ...inputProps
            });
        });

        this.children.Avatar = new Avatar({
            avatar: '/avatar.svg'
        });
    }

    render() {
        return template;
    }
}
