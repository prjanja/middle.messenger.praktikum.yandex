import Block from '../../utils/block';
import { AppRouter } from '../../utils/router';
import template from './link.hbs?raw';

type LinkProps = {
    label?: string;
    href?: string;
    events?: {
        click?: (e: Event) => void;
    };
};

export class Link extends Block {
    constructor(props: LinkProps) {
        super({
            ...props,
            events: {
                click: () => {
                    if (props.href) {
                        AppRouter.go(props.href);
                    }
                }
            }
        });
    }

    render() {
        return template;
    }
}
