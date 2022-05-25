import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { IProduct } from '../../interface';
import { productsService } from '../../services';

interface IProductState {
    products: IProduct[];
    selected:IProduct[]
}

const initialState: IProductState = {
    products: [],
    selected: JSON.parse(`${localStorage.getItem('selected')}`),
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
export const addToProductSelected = createAsyncThunk<void, {product:IProduct}>(
    'productSlice/addToSelected',
    ({ product }, { dispatch }) => {
        dispatch(addToSelected({ product }));
    },
);

export const deleteProduct = createAsyncThunk<void, {id:number}>(
    'productSlice/deleteProduct',
    async ({ id }, { dispatch }) => {
        await productsService.deleteProduct(id);
    },
);
export const deleteFromSelected = createAsyncThunk<void, {product:IProduct}>(
    'productSlice/deleteFromSelected ',
    ({ product }, { dispatch }) => {
        dispatch(deleteSelected({ product }));
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
        addToSelected: (state, action:PayloadAction<{product:IProduct}>) => {
            state.selected.push(action.payload.product);
        },
        deleteSelected: (state, action:PayloadAction<{product:IProduct}>) => {
            state.selected = state.selected.filter((element) => element.id !== action.payload.product.id);
        },
    },

});

const productReducer = ProductSlice.reducer;
const {
    getProducts, addProduct, addToSelected, deleteSelected,
} = ProductSlice.actions;
export default productReducer;
