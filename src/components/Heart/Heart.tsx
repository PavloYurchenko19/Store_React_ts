import React, { FC, useEffect, useState } from 'react';
import { BsHeart } from 'react-icons/bs';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { addQuantitySelected, addToSelected, deleteSelected } from '../../store/slices/productSlice';
import styl from './Heart.module.scss';
import { IProduct } from '../../interface';

const Heart:FC<{product: IProduct}> = ({ product }) => {
    const { selected } = useAppSelector((state) => state.productReducer);

    const [add, setAdd] = useState(false);
    const dispatch = useAppDispatch();

    useEffect(() => {
        localStorage.setItem('selected', JSON.stringify(selected));
        dispatch(addQuantitySelected({
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
                dispatch(deleteSelected({ product }));
            }} /> : <BsHeart className={`${styl.heartSize} ${styl.heart}`} onClick={() => {
                dispatch(addToSelected({ product }));
            }} /> }
        </>
    );
};

export { Heart };
