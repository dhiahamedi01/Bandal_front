import React, { useEffect } from 'react'
import './Styles/shop.css'
import Product from '../components/Product.jsx'
import { useDispatch, useSelector } from "react-redux";
import { getAllProduct } from '../redux/apiCall/productCall.jsx';


const Shop = () =>{
  const dispatch = useDispatch();
  const { products } = useSelector(state => state.product);
  
  useEffect(() => {
    dispatch(getAllProduct());
  }, [dispatch]);



  return (
    <div className='products-shop-container flex-column'>
            <p className='d-flex gap-2 p-classname-title align-center-title'>All<span className='span-class-name-main'><p>Products</p></span></p>
        <div className='product-main-div'>
        
        {products.map((product) => 
        <Product key={product._id} product={product} index = {product.color.length-1}/>)}
        
        
      
   
        </div>
     
    </div>
  )
}

export default Shop