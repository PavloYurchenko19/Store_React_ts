import { axiosService } from './axiosService';
import { IProduct } from '../interface';
import { urls } from '../constans/urls';

export const productsService = {
    getAll: (sort: string, order: string) => axiosService
        .get<IProduct[]>(`${urls.products}?_sort=${sort}&_order=${order}`),
    createProduct: (product:IProduct) => axiosService.post<IProduct>(urls.products, product),
    deleteProduct: (id:number) => axiosService.delete<void>(`${urls.products}/${id}`),
    getById: (id: string | undefined) => axiosService.get<IProduct>(`${urls.products}/${id}`),
    changeRate: (id:number, rate:number) => axiosService.patch<IProduct>(`${urls.products}/${id}`, { rate }),
};
