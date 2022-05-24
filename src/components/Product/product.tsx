import React, {FC, ReactNode, useState} from 'react';
import { IProduct } from "../../interface";



const Product:FC<{product: IProduct }> = ({ product:{id, count, size,name,imageUrl,weight}}) => {
    const [ show, setShow ] = useState(false);
    return(
        <div>
            <h2>Name: { name } </h2>
            <h2>Image:  </h2> <img src={ imageUrl } alt=""/>
            <h2>Count: { count }</h2>
            <button onClick={ ()=>setShow(!show) }>Details</button>
            {show &&(
                <div>
                  Id: {id}, Name: {name}, Size: { size }, Count: {count}, Weight: {weight}


                </div>

            ) }

        </div>
    );
};

export { Product };
