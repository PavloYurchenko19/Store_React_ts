import { combineReducers, configureStore } from '@reduxjs/toolkit';
import productReducer from './slices/productSlice';
import commentReducer from './slices/commentSlice';

const rootReducer = combineReducers({
    productReducer,
    commentReducer,
});

export const setupStore = () => configureStore({
    reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
