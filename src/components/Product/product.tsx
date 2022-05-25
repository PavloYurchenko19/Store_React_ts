import React, { FC, useState } from 'react';

import { IProduct } from '../../interface';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getAllByproductId } from '../../store/slices/commentSlice';
import { deleteProduct } from '../../store/slices/productSlice';

const Product: FC<{ product: IProduct }> = ({
    product: {
        id, count, size, name, imageUrl, weight,
    },
}) => {
    const [show, setShow] = useState(false);
    const [showComment, setShowComment] = useState(false);
    const { comments } = useAppSelector((state) => state.commentReducer);
    const dispatch = useAppDispatch();
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
