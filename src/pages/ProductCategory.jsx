import React, { useEffect } from 'react';
import './Styles/shop.css';
import Product from '../components/Product.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { getProductsByCategoryId } from '../redux/apiCall/productCall.jsx';
import { useLocation } from 'react-router-dom';

const ProductCategory = () => {
    
        const location = useLocation();
        const { categoryId , categoryName} = location.state;
      
        const dispatch = useDispatch();
        const { productsByCategory } = useSelector((state) => state.product);
      
        useEffect(() => {
          // console.log('Dispatching action to get products by category');
          dispatch(getProductsByCategoryId(categoryId));
        }, [dispatch, categoryId]);
      
        
        if (productsByCategory.length === 0) {
          return <p>Loading...</p>;
        }
      
        return (
          <div className='products-shop-container flex-column'>
            <p className='p-classname-title d-flex flex-category-title-main'>{categoryName}</p>
            <div className='product-main-div'>
              {productsByCategory.map((product) => (
                <Product key={product._id} product={product} index={product.color.length - 1} />
              ))}
            </div>
          </div>
        );
      };
      

export default ProductCategory;
