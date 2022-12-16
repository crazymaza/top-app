import { PtagProps } from "./Tag.props";
import styles from './Tag.module.css';
import cn from 'classnames';

export const Tag = ({ size = 's', children, color = 'ghost', href, className, ...props }: PtagProps): JSX.Element => {
    return (
        <div
            className={cn(styles.tag, className, {
                [styles.small]: size === 's',
                [styles.medium]: size === 'm',
                [styles.ghost]: color === 'ghost',
                [styles.primary]: color === 'primary',
                [styles.green]: color === 'green',
                [styles.gray]: color === 'gray',
                [styles.red]: color === 'red',
            })}
            {...props}
        >
            {href ? <a href={href}>{children}</a> : <>{children}</>}
        </div>);
};