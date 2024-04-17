import { PasswordChangeData, UserEdit, UserSearch } from './types';
import { BaseAPI } from './baseAPI';

export class UserAPI extends BaseAPI {
    constructor() {
        super('/user');
    }

    changeUserProfile = (data: UserEdit) => {
        return this._fetch.put('/profile', {
            data,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    };

    changeUserAvatar = (data: FormData) => {
        return this._fetch.put('/profile/avatar', {
            data
        });
    };

    changeUserPassword = (data: PasswordChangeData) => {
        return this._fetch.put('/password', {
            data,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    };

    getUserByLogin = (data: UserSearch) => {
        return this._fetch.post('/search', { data });
    };
}
