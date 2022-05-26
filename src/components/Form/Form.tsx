import React, { FC, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';

import { useAppDispatch } from '../../hooks';
import { setProduct } from '../../store/slices/productSlice';
import { IProduct } from '../../interface';
// import styl from './form.module.css';

const Form:FC = () => {
    const {
        handleSubmit, reset, register, formState: { errors },
    } = useForm<IProduct>();
    const [open, setOpen] = useState(false);
    const dispatch = useAppDispatch();
    const submit:SubmitHandler<IProduct> = (product) => {
        dispatch(setProduct({ product }));
        reset();
    };

    return (
        <div>
            <button onClick={ () => { setOpen(!open); } }>Add product</button>
            {open && (<form onSubmit={handleSubmit(submit)}>
                <label>name: <input type="text" {...register(
                    'name',
                    { required: 'This is required.', maxLength: 25 },
                ) }/></label>
                <ErrorMessage errors={errors} name={'name'} render={({ message }) => <h2>{message}</h2>}/>
                <label>Weight: <input type="text" {...register(
                    'weight',
                    { required: 'This is required.', maxLength: 25 },
                )}/></label>
                <ErrorMessage errors={errors} name={'weight'} render={({ message }) => <h2>{message}</h2>}/>
                <label>imgUrl: <input type="text" {...register(
                    'imageUrl',
                    { required: 'This is required.' },
                )}/></label>
                <ErrorMessage errors={errors} name={'imageUrl'} render={({ message }) => <h2>{message}</h2>}/>
                <label>Count: <input type="number" {...register(
                    'count',
                    { required: 'This is required.', maxLength: 25, valueAsNumber: true },
                )}/></label>
                <ErrorMessage errors={errors} name={'count'} render={({ message }) => <h2>{message}</h2>}/>
                <label>Size width: <input type="number" {...register(
                    'size.width',
                    { valueAsNumber: true, required: 'This is required.', maxLength: 30 },
                )}/></label>
                <ErrorMessage errors={errors} name={'size.width'}
                    render={({ message }) => <h2>{message}</h2>}/>
                <label>Size height: <input type="number" {...register(
                    'size.height',
                    { valueAsNumber: true, required: 'This is required.', maxLength: 30 },
                )}/></label>
                <ErrorMessage errors={errors} name={'size.height'}
                    render={({ message }) => <h2>{message}</h2>}/>
                <button>Save</button>
            </form>)}
        </div>
    );
};

export { Form };
