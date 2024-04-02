import Block from '../../utils/block';
import template from './avatar.hbs?raw';

type AvatarProps = {
    avatar: string;
};

export class Avatar extends Block {
    constructor(props: AvatarProps) {
        super({ ...props });
    }

    render() {
        return template;
    }
}
