import React, { FC, useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { Product } from '../Product/Product';
import { getAll } from '../../store/slices/productSlice';

const Products: FC = () => {
    const {
        products, deletedProduct, order, sort,
    } = useAppSelector((state) => state.productReducer);
    const dispatch = useAppDispatch();
    const [selectedSort, setSelectedSort] = useState(`${sort}`);
    const [selectedOrder, setSelectedOrder] = useState(`${order}`);
    useEffect(() => {
        dispatch(getAll({ sort: selectedSort, order: selectedOrder }));
    }, [deletedProduct, selectedSort, selectedOrder]);
    return (
        <div>
            <select value={selectedSort} onChange={(e) => {
                setSelectedSort(e.target.value);
            }}>
                <option value="name">Name</option>
                <option value="count">Count</option>
                <option value="size.width">Width</option>
                <option value="size.height">Height</option>
                <option value="weight">Weight</option>
                <option value="comments">Comments</option>
            </select>
            <select value={selectedOrder} onChange={(e) => {
                setSelectedOrder(e.target.value);
            }}>
                <option value="asc">asc</option>
                <option value="desc">desc</option>
            </select>
            {products.map((product) => <Product key={ product.id } product={ product }/>)}
        </div>
    );
};

export { Products };
