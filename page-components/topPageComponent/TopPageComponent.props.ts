import { TopLevelCategory, PageModel } from "../../interfaces/page.interface";
import { ProductModel } from "../../interfaces/product.interface";

export interface TopPageComponentProps extends Record<string, unknown> {
    firstCategory: TopLevelCategory;
    page: PageModel;
    products: ProductModel[];
  }