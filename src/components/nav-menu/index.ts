import Block from '../../utils/block';
import template from './nav-menu.hbs?raw';
import templateItem from './nav-menu-item.hbs?raw';
import { Link } from '..';
import { Routes } from '../../consts';

const links = [
    {
        title: 'Error',
        url: Routes.ERROR
    },
    {
        title: 'Feed',
        url: Routes.MESSANGER
    },
    {
        title: 'Login',
        url: Routes.LOGIN
    },
    {
        title: 'NotFound',
        url: Routes.NOT_FOUND
    },
    {
        title: 'Profile',
        url: Routes.PROFILE
    },
    {
        title: 'Register',
        url: Routes.REGISTER
    }
];

class NavMenuItem extends Block {
    constructor(props: { link: Link }) {
        super(props);
        this.children.Link = props.link;
    }

    render() {
        return templateItem;
    }
}

export class NavMenu extends Block {
    constructor() {
        super();

        this.lists.Links = links.map((link) => {
            return new NavMenuItem({
                link: new Link({
                    label: link.title,
                    href: link.url
                })
            });
        });
    }

    render() {
        return template;
    }
}
