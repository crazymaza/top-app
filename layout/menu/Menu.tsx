import styles from './Menu.module.css';
import cn from 'classnames';
import { useContext } from 'react';
import { AppContext } from '../../context/app.context';
import { FirstLevelMenuItem, MenuItem, PageItem } from '../../interfaces/menu.interface';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { firstLevelMenu } from '../../helpers/helpers';

export const Menu = (): JSX.Element => {
    const { menu, setMenu, firstCategory } = useContext(AppContext);
    const router = useRouter();

    const openSecondLevel = (secondCategory: string) => {
        setMenu && setMenu(menu.map(item => {
            if (item._id.secondCategory === secondCategory) {
                item.isOpened = !item.isOpened;
            }
            return item;
        }));
    };

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
                {menu.map((menuItem: MenuItem) => {
                    if (menuItem.pages.map((page: PageItem) => page.alias).includes(router.asPath.split('/')[2])) {
                        menuItem.isOpened = true;
                    }
                    return (
                        <div key={menuItem._id.secondCategory}>
                            <div
                                className={styles.secondLevel}
                                onClick={() => openSecondLevel(menuItem._id.secondCategory)}
                            >
                                {menuItem._id.secondCategory}
                                <div className={cn(styles.secondLevelBlock, {
                                    [styles.secondLevelBlockOpened]: menuItem?.isOpened,
                                })}>
                                    {buildThirdLevel(menuItem.pages, firstLevelMenu.route)}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    };
    const buildThirdLevel = (pages: PageItem[], route: string) => {
        return (
            pages.map(page => (
                <Link key={page._id} href={`/${route}/${page.alias}`}
                    className={cn(styles.thirdLevel, {
                        [styles.thirdLevelActive]: `/${route}/${page.alias}` === router.asPath,
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