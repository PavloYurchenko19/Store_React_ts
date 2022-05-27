import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';

import { Products } from '../../components';

const StorePage:FC = () => (
    <>
        <Products/>
        <Outlet/>
    </>
);

export { StorePage };
