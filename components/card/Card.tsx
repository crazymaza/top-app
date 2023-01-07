import { CardProps } from './CardProps';
import cn from 'classnames';
import styles from './Card.module.css';
import { ForwardedRef, forwardRef } from 'react';

export const Card = forwardRef(({ color = 'white', children, className, ...props }: CardProps,
    ref: ForwardedRef<HTMLDivElement>): JSX.Element => {
    return (
        <div ref={ref} {...props} className={cn(className, styles.card, {
            [styles.blue]: color === 'blue',
        })}>
            {children}
        </div>);
});

Card.displayName = 'Card';