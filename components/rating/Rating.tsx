import { RatingProps } from "./Rating.props";
import styles from './Rating.module.css';
import cn from 'classnames';
import StarIcon from './star.svg';
import { useEffect, useState, KeyboardEvent, forwardRef, ForwardedRef } from "react";

export const Rating = forwardRef(({
    isEditable = false,
    rating,
    setRating,
    error,
    className,
    ...props }: RatingProps,
    ref: ForwardedRef<HTMLDivElement>): JSX.Element => {
    const [ratingArray, setRatingArray] = useState<JSX.Element[]>(new Array(5).fill(<></>));

    useEffect(() => {
        constructRating(rating);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [rating]);

    const constructRating = (currentRating: number) => {
        const updatedArray = ratingArray.map((r: JSX.Element, i: number) => {
            return (
                <span
                    key={i}
                    className={cn(styles.star, className, {
                        [styles.filled]: i < currentRating,
                        [styles.editable]: isEditable,
                    })}
                    onMouseLeave={() => changeDisplay(rating)}
                    onClick={() => onClick(i + 1)}
                    onMouseEnter={() => changeDisplay(i + 1)}
                >
                    <StarIcon
                        tabIndex={isEditable ? 0 : -1}
                        onKeyDown={(e: KeyboardEvent<SVGAElement>) => isEditable && handleSpace(i + 1, e)}
                    />
                </span>

            );
        });
        setRatingArray(updatedArray);
    };

    const changeDisplay = (someRating: number) => {
        if (!isEditable) return;
        constructRating(someRating);
    };

    const onClick = (someRating: number) => {
        if (!isEditable || !setRating) return;
        setRating(someRating);
    };

    const handleSpace = (i: number, e: KeyboardEvent<SVGAElement>) => {
        if (e.code !== 'Space' || !setRating) return;
        setRating(i);
    };

    return (
        <div
            {...props}
            className={cn(styles.ratingWrapper, { [styles.error]: error, })}
            ref={ref}
        >
            {ratingArray.map((r: JSX.Element, i: number) =>
                <span
                    key={i}>
                    {r}
                </span>)}
            {error && <span className={styles.errorMessage}>{error?.message}</span>}
        </div>
    );
});

Rating.displayName = 'Rating';