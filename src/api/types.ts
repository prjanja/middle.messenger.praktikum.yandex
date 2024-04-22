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

export type CreateChatData = {
    title: string;
};

export type Chat = {
    id: number;
    title: string;
    avatar: string;
    unread_count: number;
    created_by: number;
    last_message?: {
        user: User;
        time: string;
        content: string;
    };
};
