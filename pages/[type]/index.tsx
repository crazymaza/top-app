import axios from "axios";
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next/types";
import { ParsedUrlQuery } from "querystring";
import { API } from "../../helpers/api";
import { firstLevelMenu } from "../../helpers/helpers";
import { MenuItem } from "../../interfaces/menu.interface";
import { withLayout } from "../../layout/Layout";

const Type = ({firstCategory}: TypeProps): JSX.Element => {
    return <span>{`It is a Type page ${firstCategory}`}</span>;
};

export default withLayout(Type);

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: firstLevelMenu.map(menuItem => `/${menuItem.route}`),
        fallback: true,
    };
};

export const getStaticProps: GetStaticProps<TypeProps> = async ({ params }: GetStaticPropsContext<ParsedUrlQuery>) => {
    if (!params) {
        return { notFound: true };
    }
    const firstCategoryItem = firstLevelMenu.find(item => item.route === params.type);
    if (!firstCategoryItem) {
        return { notFound: true };
    }

    const { data: menu } = await axios.post<MenuItem[]>(API.topPage.find,
        { firstCategory: firstCategoryItem.id });
    return {
        props: {
            menu,
            firstCategory: firstCategoryItem.id,
        }
    };
};

interface TypeProps extends Record<string, unknown> {
    menu: MenuItem[];
    firstCategory: number;
  }