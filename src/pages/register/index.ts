import { User } from '../../api/types';
import { Button, Input, Link } from '../../components';
import { Routes } from '../../consts';
import { AuthController } from '../../controllers/authController';
import Block from '../../utils/block';
import { getFormData, printFormData, validateForm } from '../../utils/formUtils';
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

        this.children.LoginLink = new Link({
            label: 'Войти',
            href: Routes.LOGIN
        });

        this.children.CreateButton = new Button({
            type: 'submit',
            label: 'Создать аккаунт',
            events: {
                click: (e) => {
                    e.preventDefault();

                    const form = this.element?.querySelector('form') as HTMLFormElement;
                    printFormData(form);
                    validateForm(form);
                    AuthController.signUp(getFormData(form) as User);
                }
            }
        });
    }

    render() {
        return template;
    }
}
