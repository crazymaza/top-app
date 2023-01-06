import { ProductProps } from "./Product.props";
import styles from './Product.module.css';
import cn from 'classnames';
import { Card } from "../card/Card";
import Image from "next/image";
import { Rating } from "../rating/Rating";
import { Tag } from "../tag/Tag";
import { Button } from "../button/Button";
import { declOfNumber, priceRu } from "../../helpers/helpers";
import { Divider } from "../divider/Divider";

export const Product = ({ product, className, ...props }: ProductProps): JSX.Element => {
    const getCurrectUrl = (url: string): string => {
        return url.includes('http') ?
            url : `${process.env.NEXT_PUBLIC_DOMAIN}${product.image}`;
    };

    return (
        <Card className={styles.product}>
            <div className={styles.logo}>
                <Image
                    src={getCurrectUrl(product.image)}
                    alt={product.title}
                    width={70}
                    height={70}
                />
            </div>
            <div className={styles.title}>{product.title}</div>
            <div className={styles.price}>
                {priceRu(product.price)}
                {product.oldPrice &&
                    <Tag
                        className={styles.oldPrice}
                        color="green"
                    >
                        {priceRu(product.price - product.oldPrice)}
                    </Tag>
                }
            </div>
            <div className={styles.credit}>
                {priceRu(product.credit)}
                <span>/мес</span>
            </div>
            <div className={styles.rating}>
                <Rating rating={product.reviewAvg ?? product.initialRating} />
            </div>
            <div className={styles.tags}>
                {product.categories.map(category =>
                    <Tag
                        key={category}
                        className={styles.category}
                        color="ghost"
                    >
                        {category}
                    </Tag>)
                }
            </div>
            <div className={styles.priceTitle}>Цена</div>
            <div className={styles.creditTitle}>Кредит</div>
            <div className={styles.rateTitle}>{product.reviewCount} {declOfNumber(product.reviewCount, ['отзыв', 'отзыва', 'отзывов'])}</div>
            <Divider className={styles.hr} />
            <div className={styles.description}>{product.description}</div>
            <div className={styles.features}>
                {product.characteristics.map((characteristic) => (
                    <div
                        key={characteristic.name}
                        className={styles.characteristic}
                    >
                        <span className={styles.characteristicName}>{characteristic.name}</span>
                        <span className={styles.characteristicDot}></span>
                        <span className={styles.characteristicValue}>{characteristic.value}</span>
                    </div>
                ))}
            </div>
            <div className={styles.advBlock}>
                {product.advantages && <div className={styles.advantages}>
                    <div className={styles.advTitle}>Преимущества</div>
                    {product.advantages}
                </div>
                }
                {product.disadvantages && <div className={styles.disadvantages}>
                    <div>Недостатки</div>
                    {product.disadvantages}
                </div>
                }
            </div>
            <Divider className={cn(styles.hr, styles.hr2)} />
            <div className={styles.actions}>
                <Button appearance="primary">Узнать подробнее</Button>
                <Button
                    appearance="ghost"
                    arrow="right"
                    className={styles.reviewButton}
                >
                    Читать отзывы
                </Button>
            </div>
        </Card>
    );
};