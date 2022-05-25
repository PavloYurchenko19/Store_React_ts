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
    'productSlice/getAll',
    async (_, { dispatch }):Promise< void> => {
        const { data } = await productsService.getAll();
        const sortData = data.sort((a, b) => a.name.localeCompare(b.name));
        dispatch(getProducts({ products: sortData }));
    },
);

export const setProduct = createAsyncThunk<void, {product:IProduct}>(
    'productSlice/setProduct',
    async ({ product }, { dispatch }) => {
        const { data } = await productsService.createProduct(product);
        dispatch(addProduct({ product: data }));
    },
);
export const deleteProduct = createAsyncThunk<void, {id:number}>(
    'productSlice/setProduct',
    async ({ id }, { dispatch }) => {
        await productsService.deleteProduct(id);
    },
);

const ProductSlice = createSlice({
    name: 'productSlice',
    initialState,
    reducers: {
        getProducts: (state, action:PayloadAction<{products:IProduct[]}>) => {
            state.products = action.payload.products;
        },
        addProduct: (state, action:PayloadAction<{product:IProduct}>) => {
            state.products.push(action.payload.product);
        },
    },

});

const productReducer = ProductSlice.reducer;
const { getProducts, addProduct } = ProductSlice.actions;
export default productReducer;
