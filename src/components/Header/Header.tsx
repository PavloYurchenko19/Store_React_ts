import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';

import '../../../typings';

import styl from './Header.module.scss';

const Header:FC = () => (
    <div className={styl.hed}>
        <NavLink to={'/store'}> All products </NavLink>
        <NavLink to={'/selected'}> Selected </NavLink>
    </div>
);

export { Header };
