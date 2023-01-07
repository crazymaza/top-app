import { ReviewFormProps } from "./ReviewForm.props";
import styles from './ReviewForm.module.css';
import cn from 'classnames';
import { Input } from "../input/Input";
import { Rating } from "../rating/Rating";
import { Textarea } from "../textarea/Textarea";
import { Button } from "../button/Button";
import CloseIcon from './close.svg';
import { useForm, Controller } from "react-hook-form";
import { IReviewForm, IReviewSentResponse } from "./ReviewForm.interface";
import axios from "axios";
import { API } from "../../helpers/api";
import { useState } from "react";

export const ReviewForm = ({ productId, className, ...props }: ReviewFormProps): JSX.Element => {
    const { register, control, handleSubmit, formState: { errors }, reset } = useForm<IReviewForm>();
    const [isSuccess, setIsSuccess] = useState<boolean>(false);
    const [error, setError] = useState<string>();

    const onSubmit = async (formData: IReviewForm) => {
        try {
            const { data } = await axios.post<IReviewSentResponse>(API.review.createDemo, {
                ...formData,
                productId
            });
            if (data.message) {
                setIsSuccess(true);
                reset();
            } else {
                setError('Что-то пошло не так');
            }
        } catch (err) {
            setError('Что-то пошло не так, попробуйте обновить страницу');
        }

    };

    const handleClose = () => {
        setIsSuccess(false);
        setError(undefined);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} {...props}>
            <div className={cn(className, styles.reviewForm)}>
                <Input
                    {...register('name', { required: { value: true, message: 'Заполните имя' } })}
                    placeholder="Имя"
                    error={errors.name}
                    className={styles.name}
                />
                <Input
                    {...register('title', { required: { value: true, message: 'Заполните заголовок' } })}
                    placeholder="Заголовок отзыва"
                    className={styles.title}
                    error={errors.title}
                />
                <div className={styles.rating}>
                    <span>Оценка:</span>
                    <Controller
                        control={control}
                        name="rating"
                        rules={{ required: { value: true, message: 'Укажите рейтинг' } }}
                        render={({ field }) => (
                            <Rating
                                error={errors.rating}
                                ref={field.ref}
                                isEditable
                                rating={field.value}
                                setRating={field.onChange}
                            />
                        )}
                    />
                </div>
                <Textarea
                    {...register('description', { required: { value: true, message: 'Заполните описание' } })}
                    placeholder="Текст отзыва"
                    className={styles.textarea}
                    error={errors.description}
                />
                <Button
                    type="submit"
                    appearance="primary"
                    className={styles.submit}>
                    Отправить
                </Button>
                <span>* Перед публикацией отзыв пройдет предварительную модерацию и проверку</span>
            </div>
            {(isSuccess || error) && <div className={cn(styles.panel, {
                [styles.success]: isSuccess,
                [styles.error]: error,
            })}>
                {isSuccess && <>
                    <p className={styles.panelTitle}>Ваш отзыв отправлен</p>
                    <p>Ваш отзыв будет опубликован после проверки</p>
                </>
                }
                {error && <p>{error}</p>}
                <CloseIcon
                    className={styles.close}
                    onClick={handleClose}
                />
            </div>}
        </form>
    );
};