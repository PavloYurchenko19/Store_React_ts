import React, { FC, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import ReactStars from 'react-stars';
import { GiFullWoodBucket } from 'react-icons/gi';

import { useAppDispatch, useAppSelector } from '../../hooks';
import {
    changeRate,
    deleteProduct,
    getProductById,
} from '../../store/slices/productSlice';
import { addComment, deleteComment, getAllByproductId } from '../../store/slices/commentSlice';
import { IComment } from '../../interface';
import styl from './ProductDetails.module.scss';
import { Heart } from '../Heart/Heart';

const ProductDetails: FC = () => {
    const { product } = useAppSelector((state) => state.productReducer);
    const { comment, comments } = useAppSelector((state) => state.commentReducer);
    const [refresh, setRefresh] = useState(false);

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { id } = useParams();
    const idProduct:string | undefined = id;

    useEffect(() => {
        dispatch(getProductById({ id: idProduct }));
    }, [id]);

    useEffect(() => {
        dispatch(getAllByproductId({ id: idProduct }));
    }, [comment, refresh]);

    const {
        handleSubmit, register, reset, setValue, formState: { errors },
    } = useForm<IComment>();

    const submit:SubmitHandler<IComment> = (commentData) => {
        dispatch(addComment({ comment: commentData }));
        reset();
    };

    return (
        <div className={styl.mainBox}>
            <div className={styl.aboutProduct}>

                <Heart key={product.id} product={product}/>
                <h2>{product.name}</h2>
                <img src={product.imageUrl} alt={product.name}/>

                <div className={styl.description}>
                    <h3>Price: {product.price}$</h3>
                    <h3>Count: {product.count}</h3>
                    <h3><ReactStars size={24} value={product.rate} onChange={
                        (e) => { dispatch(changeRate({ id: product.id, rate: e })); }} half={true} />
                    Rate: {product.rate}</h3>
                    <h3>Weight: {product.weight}</h3>

                    <GiFullWoodBucket className={styl.garbage} onClick={() => {
                        dispatch(deleteProduct({ id: product.id }));
                        navigate('/');
                    }}/>
                </div>
            </div>

            <div className={styl.comments}>
                <h2>Comments</h2>
                {comments.map((one) => <div className={styl.comment} key={one.id}>
                    <div><h3>Data: {one.date}</h3>
                        <p>{one.description}</p></div>

                    <GiFullWoodBucket className={styl.garbage} onClick={() => {
                        dispatch(deleteComment({ id: one.id }));
                        setRefresh(!refresh);
                    }}/>
                </div>)}
            </div>

            <form onSubmit={handleSubmit(submit)}>
                <input type="number" defaultValue={product.id} hidden={true}
                    {...register(
                        'productId',
                        { valueAsNumber: true },
                    )}/>
                <input type="text" placeholder={'Enter comment'}
                    {...register('description', { required: 'This field is required' })}/>
                <ErrorMessage name={'description'} errors={errors}
                    render={({ message }) => <h2>{message}</h2>}/>

                <input type="text"
                    value={`${new Date().getFullYear()}:${new Date().getMonth() + 1}:${new Date().getDate()}`}
                    hidden={true}
                    {...register('date')}/>
                <button onClick={() => { setValue('productId', product.id); }}>Send Comment</button>
            </form>
        </div>
    );
};

export { ProductDetails };
