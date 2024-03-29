import { Button, Input } from '../../components';
import Block from '../../utils/block';
import { printFormData, validateForm } from '../../utils/formUtils';
import template from './register.hbs?raw';

const formFields = [
    { label: 'Почта', name: 'email' },
    { label: 'Логин', name: 'login' },
    { label: 'Имя', name: 'first_name' },
    { label: 'Фамилия', name: 'second_name' },
    { label: 'Телефон', type: 'tel', name: 'phone' },
    { label: 'Пароль', type: 'password', name: 'password' }
];

export class Register extends Block {
    constructor() {
        super();

        this.lists.FormFields = formFields.map((inputProps) => {
            return new Input({
                ...inputProps,
                validate: true
            });
        });
        this.children.CreateButton = new Button({
            type: 'button',
            label: 'Создать аккаунт',
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
