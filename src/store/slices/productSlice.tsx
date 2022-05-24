import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { IProduct } from '../../interface';
import { productsService } from '../../services';

interface IProductState {
    products: IProduct[];
}

const initialState: IProductState = {
    products: [],
};

export const getAll = createAsyncThunk(
    'product',
    async (_, { dispatch }):Promise< void> => {
        const { data } = await productsService.getAll();
        console.log(data);
        dispatch(getProducts({ products: data }));
    },
);

const ProductSlice = createSlice({
    name: 'productSlice',
    initialState,
    reducers: {
        getProducts: (state, action:PayloadAction<{products:IProduct[]}>) => {
            state.products = action.payload.products;
        },
    },

});

const productReducer = ProductSlice.reducer;
const { getProducts } = ProductSlice.actions;
export default productReducer;
