import { AuthAPI } from '../api/authAPI.ts';
import { SignInData, User } from '../api/types.ts';
import { handleErrorResponse } from '../utils/fetch.ts';
import { AppRouter } from '../utils/router.ts';
import { Routes } from '../consts/index.ts';
import store from '../utils/store.ts';

export class AuthController {
    static readonly _authApi = new AuthAPI();

    static signUp(userData: User) {
        return this._authApi
            .signUp(userData)
            .then((res) => {
                if (res.status === 200) {
                    return this.user().then(() => {
                        AppRouter.go(Routes.MESSANGER);
                    });
                }
                return handleErrorResponse(res);
            })
            .catch((err) => {
                console.error(err);
            });
    }

    static signIn(loginData: SignInData) {
        return this._authApi
            .signIn(loginData)
            .then((res) => {
                if (res.status === 200) {
                    return this.user().then(() => {
                        AppRouter.go(Routes.MESSANGER);
                    });
                }
                return handleErrorResponse(res);
            })
            .catch((err) => {
                console.error(err);
            });
    }

    static user() {
        return this._authApi
            .user()
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
    }

    static logOut() {
        return this._authApi
            .logOut()
            .then((res) => {
                console.log(res);
                if (res.status === 200) {
                    store.setState('user', null);
                    console.log('here');
                    AppRouter.go(Routes.LOGIN);
                } else {
                    handleErrorResponse(res);
                }
            })
            .catch((err) => {
                console.error(err);
            });
    }
}
