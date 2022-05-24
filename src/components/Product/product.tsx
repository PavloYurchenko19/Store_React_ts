import React, { FC, useState } from 'react';

import { IProduct } from "../../interface";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getAllByproductId } from "../../store/slices/commentSlice";
import { deleteProduct } from "../../store/slices/productSlice";



const Product:FC<{product: IProduct }> = ({ product: {id, count, size,name,imageUrl,weight} }) => {
    const [ show, setShow ] = useState(false);
    const [ showComment, setShowComment ] = useState(false);
    const { comments } = useAppSelector(state => state.commentReducer)
   const dispatch = useAppDispatch()
    return(
        <div>
            <h2>Name: { name } </h2>
            <h2>Image:  </h2> <img src={ imageUrl } alt=""/>
            <h2>Count: { count }</h2>
            <button onClick={ ()=>setShow(!show) }>Details</button>
            <button onClick={()=>{ dispatch(deleteProduct({ id }))  }}>Delete</button>
            <button onClick={()=>{ dispatch(getAllByproductId({ id }))
            setShowComment(!showComment)
            }}>Open Comment</button>
            {/*Я дуже багато часу потратив на цій помилці. я шукав і не знайшов як її вирішити*/}
            {/*his JSX tag's 'children' prop expects a single child of type 'ReactNode', but multiple children were provided.*/}

            {/*І ше мене підвів Eslint з цим no-use-before-define*/}
            {/*Я прописував в rules "no-use-before-define": "off"*/}
            {/*але воно не працювало тоже шукав чому так і не знайшов також прописував*/}
            {/*еслінт no-use-before-define: ["error", { "variables": false і так дальше */}
            {/*не працювало можливо то шось з веб штормом*/}

            {/*{show && (*/}
            {/*    <div>*/}
            {/*      Id: {id}, Name: {name}, Size: { size }, Count: {count}, Weight: {weight}*/}


            {/*    </div>*/}

            {/*) }*/}
            {showComment && (
                JSON.stringify(comments)
            ) }

        </div>
    );
};

export { Product };
