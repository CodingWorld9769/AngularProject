import { ProductCategory } from './ProductCategory.enum';

export interface Product {
  productId: number;
  productName: string;
  category: ProductCategory;
  price: number;
  isAvailable: boolean;
  quantity: number;
}
