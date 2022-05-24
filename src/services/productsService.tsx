import { axiosService } from './axiosService';
import { IProduct } from '../interface';
import { urls } from '../constans/urls';

export const productsService = {
    getAll: () => axiosService.get<IProduct[]>(urls.products),
};
