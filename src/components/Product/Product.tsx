import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import ReactStars from 'react-stars';
import { GiFullWoodBucket } from 'react-icons/gi';

import { IProduct } from '../../interface';
import { useAppDispatch } from '../../hooks';
import {
    changeRate, deleteProduct,
} from '../../store/slices/productSlice';
import styl from './Product.module.scss';
import { Heart } from '../Heart/Heart';

const Product: FC<{ product: IProduct }> = ({ product }) => {
    const dispatch = useAppDispatch();

    const {
        id, count, imageUrl, name, rate, price,
    } = product;

    return (
        <div className={styl.boxProduct} >
            <div>
                <Heart key={product.id} product={product}/>
                <NavLink className={styl.imgBox} to={`/aboutProduct/${id}`}>
                    <img src={imageUrl} alt={name}/>
                </NavLink>

                <div className={styl.description}>
                    <h2>{name}</h2>
                    <ReactStars size={24} value={rate} onChange={
                        (e) => { dispatch(changeRate({ id: product.id, rate: e })); }} half={true} />
                    <p>Count: {count}</p>
                </div>
            </div>

            <div className={styl.boxFooter}>
                <h3>Price: {price}$</h3>
                <GiFullWoodBucket className={styl.garbage} onClick={() => {
                    dispatch(deleteProduct({ id }));
                }}/>
            </div>
        </div>
    );
};

export { Product };
