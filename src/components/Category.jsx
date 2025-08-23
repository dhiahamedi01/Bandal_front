import React from 'react';
import './Styles/category.css';

const Category = ({category,image}) => {
  return (
    <div className='category-single-component-main'>
      <div className='dark-overlay'>
        <p className='overlay-text'>{category}</p>
      </div>
      <img className='image-for-category-single' src={image} alt={category} width={300} />
    </div>
  );
};

export default Category;
