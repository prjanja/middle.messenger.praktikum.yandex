export type User = {
    id?: number;
    first_name: string;
    second_name: string;
    display_name?: string;
    phone: string;
    login: string;
    avatar?: string;
    email: string;
};

export type UserEdit = {
    first_name: string;
    second_name: string;
    display_name?: string;
    phone: string;
    login: string;
    email: string;
};

export type SignInData = {
    login: string;
    password: string;
};

export type PasswordChangeData = {
    oldPassword: 'string';
    newPassword: 'string';
};

export type UserSearch = {
    login: string;
};
