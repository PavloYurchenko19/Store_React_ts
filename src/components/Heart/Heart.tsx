import React, { FC, useEffect, useState } from 'react';
import { BsHeart } from 'react-icons/bs';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { addQuantity, addToProductSelected, deleteFromSelected } from '../../store/slices/productSlice';
import styl from './Heart.module.scss';
import { IProduct } from '../../interface';

const Heart:FC<{product: IProduct}> = ({ product }) => {
    const { selected } = useAppSelector((state) => state.productReducer);

    const [add, setAdd] = useState(false);
    const dispatch = useAppDispatch();

    useEffect(() => {
        localStorage.setItem('selected', JSON.stringify(selected));
        dispatch(addQuantity({
            quantity: JSON
                .parse(`${localStorage.getItem('selected')}`).length,
        }));
    }, [selected]);

    useEffect(() => {
        const length = selected.filter((element) => element.id === product.id).length;
        if (length > 0) {
            setAdd(true);
        } else {
            setAdd(false);
        }
    }, [selected]);

    return (
        <>
            {add ? <BsHeart className={`${styl.red} ${styl.heartSize} ${styl.heart}`} onClick={() => {
                dispatch(deleteFromSelected({ product }));
            }} /> : <BsHeart className={`${styl.heartSize} ${styl.heart}`} onClick={() => {
                dispatch(addToProductSelected({ product }));
            }} /> }
        </>
    );
};

export { Heart };
