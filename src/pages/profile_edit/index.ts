import { User, UserEdit } from '../../api/types';
import { Avatar, Button, Input } from '../../components';
import { BASE_URL } from '../../consts';
import { UserController } from '../../controllers/userController';
import Block from '../../utils/block';
import { getFormData, printFormData, validateForm } from '../../utils/formUtils';
import { RootState, connect } from '../../utils/store';
import template from './profile_edit.hbs?raw';

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

export class ProfileEdit extends Block {
    constructor(props = {} as StateProps) {
        super(props);
        const { user = {} as User } = props;

        this.lists.FormFields = formFields.map((inputProps) => {
            return new Input({
                ...inputProps,
                value: user[inputProps.name as keyof User] as string,
                validate: true
            });
        });

        this.children.Avatar = new Avatar({
            avatar: user?.avatar ? BASE_URL + '/resources/' + user.avatar : '/avatar.svg'
        });

        this.children.ChangeAvatar = new Input({
            placeholder: 'Выберите файл',
            name: 'avatar',
            type: 'file',
            events: {
                change: (event) => {
                    const inputElement = event.target as HTMLInputElement;
                    if (inputElement.files) {
                        const formData = new FormData();
                        const file = inputElement.files[0];
                        formData.append('avatar', file);
                        UserController.changeUserAvatar(formData);
                    }
                }
            }
        });

        this.children.SaveButton = new Button({
            type: 'button',
            label: 'Сохранить',
            events: {
                click: (e) => {
                    e.preventDefault();
                    const form = this.element?.querySelector('form') as HTMLFormElement;
                    printFormData(form);
                    validateForm(form);
                    UserController.changeUserProfile(getFormData(form) as UserEdit);
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

export const ProfileEditConnected = connect(mapStateToProps)(ProfileEdit);
