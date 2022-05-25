import React, { FC, useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { Product } from '../Product/product';
import { getAll } from '../../store/slices/productSlice';

const Products: FC = () => {
    const { products } = useAppSelector((state) => state.productReducer);
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(getAll());
    }, []);
    return (
        <div>
            {products.map((product) => <Product key={ product.id } product={ product }/>)}
        </div>
    );
};

export { Products };
