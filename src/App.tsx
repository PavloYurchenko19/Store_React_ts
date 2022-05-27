import React from 'react';

import {
    Outlet, Route, Routes,
} from 'react-router-dom';

import { Header, Selected } from './components';
import { ProductDetailsPage, StorePage } from './Pages';
import styl from './App.module.scss';

function App() {
    return (
        <div>
            <Header/>
            <div className={styl.wrap} >
                <Routes>
                    <Route path={'/'} element={<StorePage/>}/>
                    <Route path={'/aboutProduct/:id'} element={<ProductDetailsPage/>}/>
                    <Route path={'/selected'} element={<Selected/>}/>
                </Routes>
                <Outlet/>
            </div>
        </div>
    );
}

export default App;
