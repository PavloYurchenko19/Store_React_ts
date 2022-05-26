import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

import { IComment } from '../../interface';
import { commentService } from '../../services';

interface ICommentState {
    comments: IComment[];
    comment: IComment | {};
}

const initialState: ICommentState = {
    comments: [],
    comment: {},
};

export const getAllByproductId = createAsyncThunk<void, { id:string | undefined}>(
    'commentSlice/getAllByproductId',
    async ({ id }, { dispatch }):Promise< void> => {
        const { data } = await commentService.getAllByProductId(id);
        dispatch(getComments({ comments: data }));
    },
);
export const addComment = createAsyncThunk<void, { comment: IComment}>(
    'commentSlice/addComment',
    async ({ comment }, { dispatch }) => {
        const { data } = await commentService.createComment(comment);
        dispatch(addNewComment({ comment: data }));
    },
);
export const deleteComment = createAsyncThunk<void, {id: number}>(
    'commentSlice/deleteComment',
    async ({ id }, _) => {
        await commentService.deleteComment(id);
    },
);

const CommentSlice = createSlice({
    name: 'commentSlice',
    initialState,
    reducers: {
        getComments: (state, action:PayloadAction<{ comments:IComment[] }>) => {
            state.comments = action.payload.comments;
        },
        addNewComment: (state, action:PayloadAction<{ comment: IComment }>) => {
            state.comment = action.payload.comment;
        },

    },

});

const commentReducer = CommentSlice.reducer;
const { getComments, addNewComment } = CommentSlice.actions;
export default commentReducer;
