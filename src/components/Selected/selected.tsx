import React, { useEffect, useState } from 'react';
import { IProduct } from '../../interface';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { deleteFromSelected } from '../../store/slices/productSlice';

const Selected = () => {
    const { selected } = useAppSelector((state) => state.productReducer);
    const [products, setProducts] = useState([]);
    useEffect(() => {
        localStorage.setItem('selected', JSON.stringify(selected));
        setProducts([]);
        setProducts(JSON.parse(`${localStorage.getItem('selected')}`));
    }, [selected]);

    const dispatch = useAppDispatch();
    return (
        <div>
            <h2>ura</h2>
            {products.map((product:IProduct) => <div key={product.id}>
                {product.id}
                {product.name}
                <button onClick={() => { dispatch(deleteFromSelected({ product })); }}>delete</button>

            </div>)}
        </div>
    );
};

export { Selected };
