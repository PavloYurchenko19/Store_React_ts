import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { IProduct } from '../../interface';
import { productsService } from '../../services';

interface IProductState {
    products: IProduct[];
    selected: IProduct[];
    product: IProduct;
    deletedProduct: object;
    sort: string;
    order: string;
}

const initialState: IProductState = {
    products: [],
    product: {} as IProduct,
    selected: JSON.parse(`${localStorage.getItem('selected')}`),
    deletedProduct: {},
    order: 'asc',
    sort: 'name',
};

export const getAll = createAsyncThunk<void, { sort: string, order: string}>(
    'productSlice/getAll',
    async ({ sort, order }, { dispatch }):Promise< void> => {
        const { data } = await productsService.getAll(sort, order);
        dispatch(getProducts({ products: data }));
        dispatch(changeFilter({ sort, order }));
    },
);

export const setProduct = createAsyncThunk<void, {product:IProduct}>(
    'productSlice/setProduct',
    async ({ product }, { dispatch }) => {
        const { data } = await productsService.createProduct(product);
        dispatch(addProduct({ product: data }));
    },
);
export const getProductById = createAsyncThunk<void, {id:string | undefined}>(
    'productSlice/getProductById',
    async ({ id }, { dispatch }) => {
        const { data } = await productsService.getById(id);
        dispatch(getById({ product: data }));
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
        dispatch(getDeletedProduct({}));
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
        getById: (state, action:PayloadAction<{ product: IProduct }>) => {
            state.product = action.payload.product;
        },
        getDeletedProduct: (state, action:PayloadAction<{}>) => {
            state.deletedProduct = action.payload;
        },
        changeFilter: (state, action:PayloadAction<{sort:string, order:string}>) => {
            state.sort = action.payload.sort;
            state.order = action.payload.order;
        },
    },

});

const productReducer = ProductSlice.reducer;
const {
    getProducts, addProduct, addToSelected, deleteSelected, getById, getDeletedProduct, changeFilter,
} = ProductSlice.actions;
export default productReducer;
