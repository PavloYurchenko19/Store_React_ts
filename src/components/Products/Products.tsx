import React, { FC, useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { Product } from '../Product/Product';
import { getAll } from '../../store/slices/productSlice';
import styl from './Products.module.scss';

const Products: FC = () => {
    const {
        products, deletedProduct, sort, order, changedRate,
    } = useAppSelector((state) => state.productReducer);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getAll({ sort, order }));
    }, [deletedProduct, sort, order, changedRate]);

    return (
        <div className={styl.products}>
            {products.map((product) => <Product key={ product.id } product={ product }/>)}
        </div>
    );
};

export { Products };
