import React, { FC, useEffect, useState } from 'react';

import { NavLink } from 'react-router-dom';
import { IProduct } from '../../interface';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
    addToProductSelected, deleteFromSelected, deleteProduct,
} from '../../store/slices/productSlice';

const Product: FC<{ product: IProduct }> = ({ product }) => {
    const { selected } = useAppSelector((state) => state.productReducer);
    const [add, setAdd] = useState(false);
    useEffect(() => {
        localStorage.setItem('selected', JSON.stringify(selected));
    }, [selected]);
    const {
        id, count, name, imageUrl,
    } = product;
    const dispatch = useAppDispatch();
    useEffect(() => {
        const length = selected.filter((element) => element.id === product.id).length;
        if (length > 0) {
            setAdd(true);
        } else {
            setAdd(false);
        }
    }, [selected]);
    return (
        <div>
            <h2>Name: {name} </h2>
            <h2>Image: </h2> <img src={imageUrl} alt=""/>
            <h2>Count: {count}</h2>
            <NavLink to={`/aboutProduct/${id}`}>
                <button>Details</button>
            </NavLink>
            <button onClick={() => {
                dispatch(deleteProduct({ id }));
            }}>Delete
            </button>
            {add && (<button onClick={() => {
                dispatch(deleteFromSelected({ product }));
            }}>delete from selected </button>) }
            {!add && (<button onClick={() => {
                dispatch(addToProductSelected({ product }));
            }}>add to selected</button>) }
        </div>
    );
};

export { Product };
