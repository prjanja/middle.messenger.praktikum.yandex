import './styles/style.less';
import * as Pages from './pages';
import { AppRouter } from './utils/router';
import { Routes } from './consts';

AppRouter
    .use(Routes.LOGIN, Pages.Login)
    .use(Routes.REGISTER, Pages.Register)
    .use(Routes.PROFILE, Pages.Profile)
    .use(Routes.MESSANGER, Pages.Feed)
    .use(Routes.ERROR, Pages.Error)
    .use(Routes.NOT_FOUND, Pages.NotFound)
    .start();
