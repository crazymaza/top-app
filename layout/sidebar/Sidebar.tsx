import { Menu } from '../menu/Menu';
import { SidebarProps } from './SidebarProps';
import Logo from '../logo.svg';
import cn from 'classnames';
import styles from './Sidebar.module.css';
import { Search } from '../../components';


export const Sidebar = ({ className, ...props }: SidebarProps): JSX.Element => {
    return (
        <div {...props} className={cn(className, styles.sidebar)}>
            <Logo className={styles.logo}/>
            <Search />
            <Menu />
        </div>);
};