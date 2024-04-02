import './styles/style.less';
import * as Pages from './pages';

const container = document.getElementById('app')!;
const LOGIN_PAGE = 'Login';

const setHash = (hash: string) => {
    window.location.hash = hash;
};

function navigate(page: string) {
    if (page.startsWith('#')) {
        page = page.slice(1);
    }

    // @ts-expect-error: Страница имеет тип any, хотя по факту это класс
    const CurrentPage = Pages[page] || Pages.NotFound;

    const block = new CurrentPage();
    container.innerHTML = '';
    container.append(block.getContent()!);
    block.dispatchComponentDidMount();
}

function locationHashChanged() {
    navigate(window.location.hash);
}

window.onhashchange = locationHashChanged;

document.addEventListener('DOMContentLoaded', () => {
    if (window.location.hash.slice(1) !== LOGIN_PAGE) {
        setHash(LOGIN_PAGE);
    } else {
        navigate(LOGIN_PAGE);
    }
});
