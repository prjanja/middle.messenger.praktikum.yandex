import './styles/style.less';
import * as Pages from './pages';
import { AppRouter } from './utils/router';
import { Routes } from './consts';

AppRouter.use(Routes.LOGIN, Pages.Login)
    .use(Routes.REGISTER, Pages.Register)
    .use(Routes.PROFILE, Pages.ProfileConnected)
    .use(Routes.MESSANGER, Pages.FeedConnected)
    .use(Routes.ERROR, Pages.Error)
    .use(Routes.NOT_FOUND, Pages.NotFound)
    .use(Routes.PROFILE_EDIT, Pages.ProfileEdit)
    .use(Routes.PROFILE_EDIT_PASSWORD, Pages.ProfileEditPassword)
    .start();
