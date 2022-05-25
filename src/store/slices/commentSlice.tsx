import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

import { IComment } from '../../interface';
import { commentService } from '../../services';

interface ICommentState {
    comments: IComment[];
}

const initialState: ICommentState = {
    comments: [],
};

export const getAllByproductId = createAsyncThunk<void, { id:number }>(
    'commentSlice/getAllByproductId',
    async ({ id }, { dispatch }):Promise< void> => {
        const { data } = await commentService.getAllByProductId(id);
        dispatch(getComments({ comments: data }));
    },
);

const CommentSlice = createSlice({
    name: 'commentSlice',
    initialState,
    reducers: {
        getComments: (state, action:PayloadAction<{ comments:IComment[] }>) => {
            state.comments = action.payload.comments;
        },

    },

});

const commentReducer = CommentSlice.reducer;
const { getComments } = CommentSlice.actions;
export default commentReducer;
