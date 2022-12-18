import { FooterProps } from './FooterProps';
import styles from './Footer.module.css';
import cn from 'classnames';
import {format} from 'date-fns';

export const Footer = ({ className, ...props }: FooterProps): JSX.Element => {
    return (
        <footer className={cn(styles.footer, className)} {...props}>
            <span className={styles.allRight}>OwlTop 2022-{format(new Date(), 'yyyy')} Все права защищены</span>
            <a href='#' className={styles.users}>Пользовательское соглашение</a>
            <a href='#' className={styles.confidencial}>Политика конфиденциальности</a>
        </footer>);
};