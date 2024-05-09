import { Link } from '..';
import { Routes } from '../../consts';
import Block from '../../utils/block';
import template from './warning.hbs?raw';

type WarningProps = {
    title: string;
    text: string;
};

export class Warning extends Block {
    constructor(props: WarningProps) {
        super({ ...props });

        this.children.Link = new Link({
            label: 'К чатам',
            href: Routes.MESSANGER
        });
    }

    render() {
        return template;
    }
}
