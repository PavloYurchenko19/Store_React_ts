import React, { useEffect, useState } from 'react';
import { GiFullWoodBucket } from 'react-icons/gi';
import { NavLink } from 'react-router-dom';

import { IProduct } from '../../interface';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { addQuantitySelected, deleteSelected } from '../../store/slices/productSlice';
import styl from './Selected.module.scss';

const Selected = () => {
    const { selected, quantitySelected } = useAppSelector((state) => state.productReducer);
    const [products, setProducts] = useState([]);
    const dispatch = useAppDispatch();

    useEffect(() => {
        localStorage.setItem('selected', JSON.stringify(selected));
        setProducts([]);
        setProducts(JSON.parse(`${localStorage.getItem('selected')}`));
    }, [selected, quantitySelected]);

    useEffect(() => {
        dispatch(addQuantitySelected({ quantity: products.length }));
    }, [products]);

    return (
        <div className={styl.selected}>
            {products.map((product:IProduct) => <div className={styl.oneSelected} key={product.id}>
                <div className={styl.selectedLeftSide}>
                    <h2>{product.name}</h2>
                    <NavLink className={styl.imgBox} to={`/aboutProduct/${product.id}`}>
                        <img src={product.imageUrl} alt={product.name}/>
                    </NavLink>
                </div>

                <h3>Price: {product.price}$ </h3>
                <GiFullWoodBucket className={styl.garbage} onClick={() => {
                    dispatch(deleteSelected({ product }));
                }}/>
            </div>)}
        </div>
    );
};

export { Selected };
