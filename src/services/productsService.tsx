import { axiosService } from './axiosService';
import { IProduct } from '../interface';
import { urls } from '../constans/urls';

export const productsService = {
    getAll: () => axiosService.get<IProduct[]>(urls.products),
    createProduct:(product:IProduct)=>axiosService.post<IProduct>(urls.products,product),
    deleteProduct:(id:number)=>axiosService.delete<void>(`${urls.products}/${ id }`),
};
