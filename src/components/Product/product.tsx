import React, { FC, useEffect, useState } from 'react';

import { IProduct } from '../../interface';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getAllByproductId } from '../../store/slices/commentSlice';
import { addToProductSelected, deleteFromSelected, deleteProduct } from '../../store/slices/productSlice';

const Product: FC<{ product: IProduct }> = ({ product }) => {
    const { selected } = useAppSelector((state) => state.productReducer);
    const [add, setAdd] = useState(false);
    useEffect(() => {
        localStorage.setItem('selected', JSON.stringify(selected));
    }, [selected]);
    const {
        id, count, name, imageUrl,
    } = product;
    const [show, setShow] = useState(false);
    const [showComment, setShowComment] = useState(false);
    const { comments } = useAppSelector((state) => state.commentReducer);
    const dispatch = useAppDispatch();
    useEffect(() => {
        const length = selected.filter((element) => element.id === product.id).length;
        if (length > 0) {
            setAdd(true);
        } else {
            setAdd(false);
        }
    }, [selected]);
    return (
        <div>
            <h2>Name: {name} </h2>
            <h2>Image: </h2> <img src={imageUrl} alt=""/>
            <h2>Count: {count}</h2>
            <button onClick={() => setShow(!show)}>Details</button>
            <button onClick={() => {
                dispatch(deleteProduct({ id }));
            }}>Delete
            </button>
            <button onClick={() => {
                dispatch(getAllByproductId({ id }));
                setShowComment(!showComment);
            }}>Open Comment
            </button>
            {add && (<button onClick={() => {
                dispatch(deleteFromSelected({ product }));
            }}>delete from selected </button>) }
            {!add && (<button onClick={() => {
                dispatch(addToProductSelected({ product }));
            }}>add to selected</button>) }

            {show && (
                <div>

                    {/* Id: {id}, Name: {name}, Size: { size }, Count: {count}, Weight: {weight} */}

                    {/* {id} */}
                </div>

            )}
            {showComment && (
                JSON.stringify(comments)
            )}

        </div>
    );
};

export { Product };
