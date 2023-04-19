import { IProduct } from './product';

export interface IProductCart {
  product_id: string;
  name: string;
  quantity: number;
  product_option_id: string;
  price: number;
  size: string;
  color: string;
  image: string;
  slug: string;
}
