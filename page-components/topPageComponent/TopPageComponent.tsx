import { Advantages, HhData, Htag, Product, Sort, Tag } from "../../components";
import { TopPageComponentProps } from "./TopPageComponent.props";
import styles from './TopPageComponent.module.css';
import { TopLevelCategory } from "../../interfaces/page.interface";
import { SortEnum } from "../../components/sort/Sort.props";
import { useEffect, useReducer } from "react";
import { sortReduser } from "../../components/sort/sort.reducer";

export const TopPageComponent = ({ page, products, firstCategory }: TopPageComponentProps): JSX.Element => {
    const [{ products: sortedProducts, sort }, dispatchSort] = useReducer(sortReduser, { products, sort: SortEnum.Rating });

    const setSort = (sort: SortEnum) => dispatchSort({ type: sort });

    useEffect(() => {
        dispatchSort({ type: 'reset', initialState: products });
    }, [products]);

    return (
        <div className={styles.wrapper}>
            <div className={styles.title}>
                <Htag tag='h1'>{page.title}</Htag>
                {products && <Tag color='gray' size='m'>{products.length}</Tag>}
                <Sort sort={sort} setSort={setSort} />
            </div>
            <div>
                {sortedProducts && sortedProducts.map(product => (<Product key={product._id} product={product} />))}
            </div>
            <div className={styles.hhTitle}>
                <Htag tag='h2'>{`Вакансии - ${page.category}`}</Htag>
                <Tag color='red' size='m'>hh.ru</Tag>
            </div>
            {firstCategory === TopLevelCategory.Courses && page.hh && <HhData {...page.hh} />}

            {page.advantages && page.advantages.length > 0 &&
                page.advantages[0].title && page.advantages[0].description &&
                <>
                    <Htag tag='h2'>Преимущества</Htag>
                    <Advantages advantages={page.advantages} />
                </>
            }
            {page.seoText && <div className={styles.seo} dangerouslySetInnerHTML={{ __html: page.seoText }} />}
            <Htag tag='h2'>Получаемые навыки</Htag>
            {page.tags && page.tags.map(tag => <Tag color='primary' key={tag}>{tag}</Tag>)}
        </div>
    );
};