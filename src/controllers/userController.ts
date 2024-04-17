import { PasswordChangeData, UserEdit, UserSearch } from '../api/types.ts';
import { handleErrorResponse } from '../utils/fetch.ts';
import { AppRouter } from '../utils/router.ts';
import { Routes } from '../consts/index.ts';
import store from '../utils/store.ts';
import { UserAPI } from '../api/userAPI.ts';

export class UserController {
    static readonly _api = new UserAPI();

    static changeUserProfile = (data: UserEdit) => {
        return this._api
            .changeUserProfile(data)
            .then((res) => {
                if (res.status === 200) {
                    store.setState('user', res);
                    AppRouter.go(Routes.PROFILE);
                } else {
                    handleErrorResponse(res);
                }
            })
            .catch((err) => {
                console.error(err);
            });
    };

    static changeUserAvatar = (data: FormData) => {
        return this._api
            .changeUserAvatar(data)
            .then((res) => {
                if (res.status === 200) {
                    store.setState('user', res);
                } else {
                    handleErrorResponse(res);
                }
            })
            .catch((err) => {
                console.error(err);
            });
    };

    static changeUserPassword = (data: PasswordChangeData) => {
        return this._api
            .changeUserPassword(data)
            .then((res) => {
                if (res.status === 200) {
                    AppRouter.go(Routes.PROFILE);
                } else {
                    handleErrorResponse(res);
                }
            })
            .catch((err) => {
                console.error(err);
            });
    };

    static getUserByLogin = (data: UserSearch) => {
        return this._api
            .getUserByLogin(data)
            .then((res) => {
                if (res.status === 200) {
                    return res;
                }

                return handleErrorResponse(res);
            })
            .catch((err) => {
                console.error(err);
            });
    };
}
