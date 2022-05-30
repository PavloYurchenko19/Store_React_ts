import React, { FC, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { BiStoreAlt } from 'react-icons/bi';
import { BsHeart } from 'react-icons/bs';

import styl from './Header.module.scss';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { Form } from '../Form/Form';
import { changeFilter } from '../../store/slices/productSlice';

const Header: FC = () => {
    const dispatch = useAppDispatch();
    const {
        order, sort, quantitySelected,
    } = useAppSelector((state) => state.productReducer);

    const [selectedSort, setSelectedSort] = useState(`${sort}`);
    const [selectedOrder, setSelectedOrder] = useState(`${order}`);

    useEffect(() => {
        dispatch(changeFilter({ sort: selectedSort, order: selectedOrder }));
    }, [selectedSort, selectedOrder]);

    return (
        <header>
            <div className={styl.SideInfo}>
                <NavLink to={'/'}> <BiStoreAlt className={styl.icon}/></NavLink>
                <p>Store</p>
            </div>

            <div className={styl.center}>
                <select value={selectedSort} onChange={(e) => {
                    setSelectedSort(e.target.value);
                }}>
                    <option value="name">Name</option>
                    <option value="count">Count</option>
                    <option value="size.width">Width</option>
                    <option value="size.height">Height</option>
                    <option value="weight">Weight</option>
                    <option value="comments">Comments</option>
                    <option value="price">Price</option>
                </select>

                <select value={selectedOrder} onChange={(e) => {
                    setSelectedOrder(e.target.value);
                }}>
                    <option value="asc">asc</option>
                    <option value="desc">desc</option>
                </select>

                <h1>Welcome to my store</h1>
                <Form/>
            </div>

            <div className={styl.count}>
                <div className={styl.quantity}>{quantitySelected}</div>
                <NavLink
                    to={'/selected'}>< BsHeart className={styl.icon}/> </NavLink>
                <p>Selected</p>
            </div>
        </header>
    );
};

export { Header };
