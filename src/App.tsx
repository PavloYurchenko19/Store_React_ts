import React from 'react';

import {
    Outlet, Route, Routes,
} from 'react-router-dom';
import { Selected } from './components';
import { FirstPage, StorePage } from './Pages';

function App() {
    return (
        <div>
            <Routes>
                <Route path={'/'} element={<FirstPage/>}>
                    <Route path={'/store'} element={<StorePage/>}/>
                    <Route path={'/selected'} element={<Selected/>}/>
                </Route>
            </Routes>
            <Outlet/>
        </div>
    );
}

export default App;
