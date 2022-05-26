import React, { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getProductById } from '../../store/slices/productSlice';
import { addComment, deleteComment, getAllByproductId } from '../../store/slices/commentSlice';
import { IComment } from '../../interface';

const ProductDetails: FC = () => {
    const { product } = useAppSelector((state) => state.productReducer);
    const { comments } = useAppSelector((state) => state.commentReducer);

    const dispatch = useAppDispatch();

    const { id } = useParams();
    const idProduct:string | undefined = id;
    useEffect(() => {
        dispatch(getProductById({ id: idProduct }));

        dispatch(getAllByproductId({ id: idProduct }));
    }, [id, comments]);
    const {
        handleSubmit, register, reset, setValue, formState: { errors },
    } = useForm<IComment>();
    const submit:SubmitHandler<IComment> = (comment) => {
        dispatch(addComment({ comment }));
        reset();
    };
    return (
        <div>
            <h1>pavlo</h1>
            { product.id }
            { product.name }
            { product.count }

            <img src={ product.imageUrl } alt={product.name}/>
            <div>
                {comments.map((comment) => <div key={comment.id}>
                    {comment.id}
                    {comment.productId}
                    {comment.date}
                    {comment.description}
                    <button onClick={() => { dispatch(deleteComment({ id: comment.id })); }}>
                        delete Comment</button>
                </div>)}
            </div>
            <form onSubmit={handleSubmit(submit)}>
                <label><input type="number" defaultValue={product.id} hidden={true}
                    {...register(
                        'productId',
                        { valueAsNumber: true },
                    )}/></label>
                <label>Description <input type="text"
                    {...register('description', { required: 'This field is required' })}/></label>
                <ErrorMessage name={'description'} errors={errors}
                    render={({ message }) => <h2>{message}</h2>}/>
                <label>Date <input type="text"
                    value={`${new Date().getFullYear()}:${new Date().getMonth() + 1}:${new Date().getDate()}`}
                    hidden={true}
                    {...register('date')}/></label>
                <button onClick={() => { setValue('productId', product.id); }}>send</button>
            </form>
        </div>
    );
};

export { ProductDetails };
