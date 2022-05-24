import React, { FC, useState } from 'react';
import { SubmitHandler, useForm } from "react-hook-form";

import { IProduct } from "../../interface";
import { useAppDispatch } from "../../hooks";
import { setProduct } from "../../store/slices/productSlice";

const Form:FC = () => {
    const { handleSubmit,reset,register } = useForm<IProduct>();
    const [ open, setOpen ] = useState(false)
    const dispatch = useAppDispatch();
    const submit:SubmitHandler<IProduct> = (product) => {
        dispatch(setProduct({ product }))
        reset()
    }

    return (
        <div>
            <button onClick={ ()=>{ setOpen(!open) } }>Add product</button>
            {open &&( <form onSubmit={handleSubmit(submit)}>
                <label>id: <input type="number" {...register('id', { valueAsNumber: true })}/></label>
                <label>name: <input type="text" {...register('name')}/></label>
                <label>Weight: <input type="text" {...register('weight')}/></label>
                <label>imgUrl: <input type="text" {...register('imageUrl')}/></label>
                <label>Count: <input type="number" {...register('count', { valueAsNumber: true })}/></label>
                <label>Size width: <input type="number" {...register('size.width', { valueAsNumber: true })}/></label>
                <label>Size height: <input type="number" {...register('size.height', { valueAsNumber: true })}/></label>
                <button>Save</button>
            </form>)}
        </div>
    );
};

export{Form};
