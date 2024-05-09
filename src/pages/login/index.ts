import { SignInData } from '../../api/types';
import { Button, Input, Link } from '../../components';
import { Routes } from '../../consts';
import { AuthController } from '../../controllers/authController';
import Block from '../../utils/block';
import { getFormData, printFormData, validateForm } from '../../utils/formUtils';
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

        this.children.RegisterLink = new Link({
            label: 'Регистрация',
            href: Routes.REGISTER
        });

        this.children.LoginButton = new Button({
            type: 'submit',
            label: 'Вход',
            events: {
                click: (e) => {
                    e.preventDefault();

                    const form = this.element?.querySelector('form') as HTMLFormElement;
                    printFormData(form);
                    validateForm(form);
                    AuthController.signIn(getFormData(form) as SignInData);
                }
            }
        });
    }

    render() {
        return template;
    }
}
