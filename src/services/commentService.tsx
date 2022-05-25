import { axiosService } from './axiosService';
import { IComment } from '../interface';
import { urls } from '../constans/urls';

export const commentService = {
    getAllByProductId: (id:number) => axiosService.get<IComment[]>(`${urls.comments}/${id}`),
};
