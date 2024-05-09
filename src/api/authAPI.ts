import { SignInData, User } from './types';
import { BaseAPI } from './baseAPI';

export class AuthAPI extends BaseAPI {
    constructor() {
        super('/auth');
    }

    signUp = (data: User) => {
        return this._fetch.post('/signup', {
            data,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    };

    signIn = (data: SignInData) => {
        return this._fetch.post('/signin', {
            data,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    };

    user = () => {
        return this._fetch.get('/user');
    };

    logOut = () => {
        return this._fetch.post('/logout');
    };
}
