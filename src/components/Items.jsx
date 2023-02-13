import React, { useState, useEffect } from 'react';
import "../css/Items.scss";
import axios from 'axios';

const Items = () => {
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);

    const selectedPageHandler = (id) =>{
        if(id  >= 1 && id <= products.length / 10 && id !== page){
            setPage(id);
        }
    }

    useEffect(()=>{
        axios.get("https://dummyjson.com/products?limit=100")
        .then((resp)=> setProducts(resp.data.products))
        .catch((err)=> console.log(err));
    },[]);

  return (
    <React.Fragment>
        <h1>Products</h1>

        <div className="box">
            {products.length > 0 && products.slice(page*10-10, page*10).map((val)=>{
                    console.log(val);
                    return(
                        <div className="box-container" key={val.id}>
                            <img loading='lazy' src={val.thumbnail} alt={val.title} />
                            <h6>{val.title}</h6>
                            <p>{val.description}</p>
                        </div>
                    )
            })}
        </div>

        {products.length > 0 &&
            <div className="btn-group">
                <button onClick={()=> selectedPageHandler(page - 1)} className={page > 1 ? "btn btn-warning": "d-none"}>Prev</button>
                {
                    [...Array(products.length/10)].map((_, ind)=>{
                        return(
                            <button onClick={()=> selectedPageHandler(ind + 1)} className={page === ind+1 ? "btn btn-dark": "btn btn-success"}>{ind + 1}</button>
                        )
                    })
                }
                <button onClick={()=> selectedPageHandler(page + 1)} className={page < products.length/10 ? "btn btn-warning": "d-none"}>Next</button>
            </div>
        }

    </React.Fragment>
  )
}

export default Items