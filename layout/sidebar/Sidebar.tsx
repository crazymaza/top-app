import { Menu } from '../menu/Menu';
import { SidebarProps } from './SidebarProps';

export const Sidebar = ({...props}: SidebarProps): JSX.Element => {
    return (
        <div {...props}>
            <Menu />
        </div>);
};