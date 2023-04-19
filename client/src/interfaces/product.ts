import { IBrand } from './brand';
import { ICategory } from './category';
import { SIZE } from '@/constants/enum';

export interface IProduct {
  _id?: string;
  name: string;
  brand: IBrand | string;
  category: ICategory | string;
  description: string;
  quantity?: number;
  price: number;
  status?: boolean;
  images: IProductImage[] | any;
  options: IProductOption[] | any;
  gender: string;
  rating?: number;
  slug: string;
}

export interface IProductImage {
  _id?: string;
  product_id: string;
  image_name: string;
  image_url: string;
  delete_url: string;
}

export interface IProductOption {
  _id: string;
  product_id: string;
  //size: SIZE;
  size: string;
  color: string;
  quantity: number;
}
