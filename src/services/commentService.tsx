import { axiosService } from './axiosService';
import { IComment } from '../interface';
import { urls } from '../constans/urls';

export const commentService = {
    getAllByProductId: (id:string | undefined) => axiosService
        .get<IComment[]>(`${urls.comments}?productId=${id}`),
    createComment: (comment:IComment) => axiosService.post(urls.comments, comment),
    deleteComment: (id:number) => axiosService.delete(`${urls.comments}/${id}`),
};
