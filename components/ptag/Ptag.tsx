import { PtagProps } from "./Ptag.props";
import styles from './Ptag.module.css';
import cn from 'classnames';

export const Ptag = ({ size = 'm', children, className, ...props }: PtagProps): JSX.Element => {
    return (
        <p
            className={cn(styles.basicParagraph, className, {
                [styles.smallParagraph]: size === 's',
                [styles.mediumParagraph]: size === 'm',
                [styles.largeParagraph]: size === 'l',
            })}
            {...props}
        >
            {children}
        </p>);
};