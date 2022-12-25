import { Advantages, HhData, Htag, Ptag, Tag } from "../../components";
import { TopPageComponentProps } from "./TopPageComponent.props";
import styles from './TopPageComponent.module.css';
import { TopLevelCategory } from "../../interfaces/page.interface";
import { Advantage } from "../../components/advantage/Advantage";

export const TopPageComponent = ({ page, products, firstCategory }: TopPageComponentProps): JSX.Element => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.title}>
                <Htag tag='h1'>{page.title}</Htag>
                {products && <Tag color='gray' size='m'>{products.length}</Tag>}
                <span>Сортировка</span>
            </div>
            <div>
                {products && products.map(product => (<div key={product._id}>{product.title}</div>))}
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