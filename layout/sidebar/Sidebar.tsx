import { Menu } from '../menu/Menu';
import { SidebarProps } from './SidebarProps';
import Logo from '../logo.svg';
import cn from 'classnames';
import styles from './Sidebar.module.css';

export const Sidebar = ({ className, ...props }: SidebarProps): JSX.Element => {
    return (
        <div {...props} className={cn(className, styles.sidebar)}>
            <div className={styles.logoWrapper}>
            <Logo/>
            <span>OWLtop</span>
            </div>
            <div>Поиск</div>
            <Menu />
        </div>);
};