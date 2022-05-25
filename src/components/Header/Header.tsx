import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';

const Header:FC = () => (
    <div>
        <NavLink to={'/store'}> All products </NavLink>
        <NavLink to={'/selected'}> Selected </NavLink>
    </div>
);

export { Header };
