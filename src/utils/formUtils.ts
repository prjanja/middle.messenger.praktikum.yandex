export const printFormData = (form: HTMLFormElement) => {
    const formData = new FormData(form);
    console.log([...formData.entries()].reduce((acc, cur) => ({ ...acc, [cur[0]]: cur[1] }), {}));
};

export const getFormData = (form: HTMLFormElement) => {
    const formData = new FormData(form);
    return [...formData.entries()].reduce((acc, cur) => ({ ...acc, [cur[0]]: cur[1] }), {});
};

export const validateName = (s: string) => /^[A-Z,А-Я][a-zA-Zа-яА-я-]+$/.test(s);

export const validateLogin = (s: string) => {
    if (/^\d+$/.test(s)) {
        return false;
    }
    return /^[\w-]{3,20}$/.test(s);
};

export const validateEmail = (s: string) => /^[\w-]+@\w+\.\w+$/.test(s);

export const validatePassword = (s: string) => {
    if (!/[A-Z]/.test(s)) {
        return false;
    }
    if (!/[0-9]/.test(s)) {
        return false;
    }
    return /^.{8,40}$/.test(s);
};

export const validatePhone = (s: string) => /^\+?[0-9]{10,15}$/.test(s);

export const validateMessage = (s: string) => s.length > 0;

export const validateInputField = (input: HTMLInputElement) => {
    const { value, name } = input;

    let isFieldValid = true;

    switch (name) {
        case 'first_name':
        case 'second_name':
            isFieldValid = validateName(value);
            break;
        case 'login':
            isFieldValid = validateLogin(value);
            break;
        case 'email':
            isFieldValid = validateEmail(value);
            break;
        case 'password':
            isFieldValid = validatePassword(value);
            break;
        case 'phone':
            isFieldValid = validatePhone(value);
            break;
        case 'message':
            isFieldValid = validateMessage(value);
            break;
        default:
            break;
    }

    return isFieldValid ? '' : 'Некорректное значение поля';
};

export const validateForm = (form: HTMLFormElement) => {
    let formError = '';
    form.querySelectorAll('input').forEach((element) => {
        formError = formError || validateInputField(element);
    });

    if (formError) {
        console.error('Некорректно заполнена форма');
    }
};
