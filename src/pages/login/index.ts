import { Button, Input } from '../../components';
import Block from '../../utils/block';
import { printFormData, validateForm } from '../../utils/formUtils';
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
                ...inputProps,
                validate: true
            });
        });

        this.children.LoginButton = new Button({
            type: 'button',
            label: 'Вход',
            events: {
                click: (e) => {
                    e.preventDefault();

                    const form = this.element?.querySelector('form') as HTMLFormElement;
                    printFormData(form);
                    validateForm(form);
                }
            }
        });
    }

    render() {
        return template;
    }
}
