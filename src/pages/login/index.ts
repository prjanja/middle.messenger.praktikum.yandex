import { Button, Input } from '../../components';
import Block from '../../utils/block';
import template from './login.hbs?raw';

const formFields = [
    { label: 'Логин', name: 'login' },
    { label: 'Пароль', type: 'password', name: 'password' }
];
export class Login extends Block {
    constructor() {
        super();

        this.lists.FormFields = formFields.map((inputProps) => {
            return new Input({
                ...inputProps
            });
        });

        this.children.LoginButton = new Button({
            type: 'button',
            label: 'Вход'
        });
    }

    render() {
        return template;
    }
}
