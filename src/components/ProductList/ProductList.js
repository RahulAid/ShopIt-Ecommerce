import React, { useEffect } from 'react';
import "./ProductList.scss";
import Product from "../Product/Product";

const ProductList = ({products}) => {

  useEffect(()=>{
    console.log("These are products from props",products)
  },[products])
  return (
    <div className='product-lists grid bg-whitesmoke my-3'>
      {
        products?.map(product => {
          let discountedPrice = (product?.price) - (product?.price * (product?.discountPercentage / 100));

          return (
            <Product key = {product?.id} product = {{...product, discountedPrice}} />
          )
        })
      }
    </div>
  )
}

export default ProductList