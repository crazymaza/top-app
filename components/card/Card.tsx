import { CardProps } from './CardProps';
import cn from 'classnames';
import styles from './Card.module.css';

export const Card = ({ color = 'white', children, className, ...props }: CardProps): JSX.Element => {
    return (
        <div {...props} className={cn(className, styles.card, {
            [styles.blue]: color === 'blue',
        })}>
            {children}
        </div>);
};