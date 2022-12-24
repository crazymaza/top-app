import styles from './Menu.module.css';
import cn from 'classnames';
import { useContext } from 'react';
import { AppContext } from '../../context/app.context';
import { FirstLevelMenuItem, MenuItem, PageItem } from '../../interfaces/menu.interface';
import CoursesIcon from './icons/courses.svg';
import BooksIcon from './icons/books.svg';
import ServisesIcon from './icons/servises.svg';
import ProductsIcon from './icons/products.svg';
import { TopLevelCategory } from '../../interfaces/page.interface';
import Link from 'next/link';

const firstLevelMenu: FirstLevelMenuItem[] = [
    { route: 'courses', name: 'Курсы', icon: <CoursesIcon />, id: TopLevelCategory.Courses },
    { route: 'servises', name: 'Сервисы', icon: <ServisesIcon />, id: TopLevelCategory.Services },
    { route: 'books', name: 'Книги', icon: <BooksIcon />, id: TopLevelCategory.Books },
    { route: 'goods', name: 'Продукты', icon: <ProductsIcon />, id: TopLevelCategory.Products },
];

export const Menu = (): JSX.Element => {
    const { menu, setMenu, firstCategory } = useContext(AppContext);

    const buildFirstLevel = () => {
        return (
            <>
                {firstLevelMenu.map(firstMenu => (
                    <div key={firstMenu.route}>
                        <Link href={`/${firstMenu.route}`}>
                            <div className={cn(styles.firstLevel, {
                                [styles.firstLevelActive]: firstMenu.id === firstCategory,
                            })}>
                                {firstMenu.icon}
                                <span>
                                    {firstMenu.name}
                                </span>
                            </div>
                        </Link>
                        {firstMenu.id === firstCategory && buildSecondLevel(firstMenu)}
                    </div>
                ))}
            </>
        );
    };
    const buildSecondLevel = (firstLevelMenu: FirstLevelMenuItem) => {
        return (
            <div className={styles.secondBlock}>
                {menu.map((menuItem: MenuItem) => (
                    <div key={menuItem._id.secondCategory}>
                        <div className={styles.secondLevel}>
                            {menuItem._id.secondCategory}
                            <div className={cn(styles.secondLevelBlock, {
                                [styles.secondLevelBlockOpened]: menuItem?.isOpened,
                            })}>
                                {buildThirdLevel(menuItem.pages, firstLevelMenu.route)}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    };
    const buildThirdLevel = (pages: PageItem[], route: string) => {
        return (
            pages.map(page => (
                <Link key={page._id} href={`/${route}/${page.alias}`}
                    className={cn(styles.thirdLevel, {
                        [styles.thirdLevelActive]: false,
                    })}>
                    {page.category}
                </Link>
            ))
        );
    };

    return (
        <div className={styles.menu}>
            {buildFirstLevel()}
        </div>
    );
};