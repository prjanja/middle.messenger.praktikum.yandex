import { PasswordChangeData } from '../../api/types';
import { Button, Input } from '../../components';
import { UserController } from '../../controllers/userController';
import Block from '../../utils/block';
import { getFormData, printFormData, validateForm } from '../../utils/formUtils';
import template from './profile_edit_password.hbs?raw';

const formFields = [
    { label: 'Старый пароль', name: 'oldPassword', type: 'password' },
    { label: 'Новый пароль', name: 'newPassword', type: 'password' }
];

export class ProfileEditPassword extends Block {
    constructor() {
        super();

        this.lists.FormFields = formFields.map((inputProps) => {
            return new Input({
                ...inputProps,
                validate: true
            });
        });

        this.children.SaveButton = new Button({
            type: 'submit',
            label: 'Сохранить',
            events: {
                click: (e) => {
                    e.preventDefault();
                    const form = this.element?.querySelector('form') as HTMLFormElement;
                    printFormData(form);
                    validateForm(form);
                    UserController.changeUserPassword(getFormData(form) as PasswordChangeData);
                }
            }
        });
    }

    render() {
        return template;
    }
}
