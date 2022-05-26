import React from 'react';

import {
    Outlet, Route, Routes,
} from 'react-router-dom';
import { Selected } from './components';
import { FirstPage, ProductDetailsPage, StorePage } from './Pages';

function App() {
    return (
        <div>
            <Routes>
                <Route path={'/'} element={<FirstPage/>}>
                    <Route path={'/store'} element={<StorePage/>}/>
                    <Route path={'/aboutProduct/:id'} element={<ProductDetailsPage/>}/>
                    <Route path={'/selected'} element={<Selected/>}/>
                </Route>
            </Routes>
            <Outlet/>
        </div>
    );
}

export default App;
