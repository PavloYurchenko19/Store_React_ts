import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../../components';

const FirstPage:FC = () => (
    <div>
        <Header/>
        <h1>Hello everyone to my store</h1>
        <Outlet/>

    </div>
);

export { FirstPage };
