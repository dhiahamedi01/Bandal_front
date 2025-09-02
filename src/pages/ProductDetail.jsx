import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProductById } from '../redux/apiCall/productCall.jsx';
import { FaCheckCircle, FaStar } from 'react-icons/fa';
import { FiShoppingCart } from "react-icons/fi";
import { cartActions } from "../redux/slice/cartSlice.jsx";
import { toast } from "react-toastify";
import './Styles/ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { productDetail } = useSelector(state => state.product);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(null);

  useEffect(() => {
    dispatch(getProductById(id));
  }, [dispatch, id]);

  const product = productDetail || null;
  if (!product) return <p>Loading...</p>;

  const images = product.images?.length > 0 ? product.images : ['/img/no-image.png'];

  const validColors = [
    "red","blue","yellow","green","black","white","orange","purple","pink","brown","grey"
  ];

  const handleAdd = () => {
    const newOrder = {
      product,
      quantity: 1,
      price: product.price || 0,
      chosenColor: selectedColor,
    };

    let temp_cart = JSON.parse(localStorage.getItem("saved-order")) || [];
    let found = false;

    for (let i = 0; i < temp_cart.length; i++) {
      if (
        temp_cart[i].product._id === product._id &&
        temp_cart[i].chosenColor === newOrder.chosenColor
      ) {
        found = true;
        temp_cart[i].quantity += 1;
        temp_cart[i].price = temp_cart[i].product.price * temp_cart[i].quantity;
        break;
      }
    }

    if (!found) temp_cart.push(newOrder);

    localStorage.setItem("saved-order", JSON.stringify(temp_cart));
    let calculatedTotal = temp_cart.reduce((acc, item) => acc + item.price, 0);
    dispatch(cartActions.setCarts(temp_cart));
    dispatch(cartActions.setTotal(calculatedTotal));
    dispatch(cartActions.setCartsCount(temp_cart.length));
    localStorage.setItem("total", calculatedTotal);

    toast.success("Product added to cart!");
  };

  return (
    <div className="product-detail">
      <div className="product-info">
        <h1>{product.name || 'Name unavailable'}</h1>
        <div className="product-rating">
          {[...Array(5)].map((_, i) => (
            <FaStar key={i} color="#FAAF00" />
          ))}
        </div>
        <p className="product-price">
          {product.price ? `${product.price} €` : 'Price unavailable'}
        </p>
        <p className="product-description">
          {product.description || 'Description unavailable'}
        </p>

        {/* Affichage propre des couleurs */}
        {Array.isArray(product.color) && product.color.length > 0 && (
          <div style={{ display: 'flex', gap: '8px', margin: '10px 0' }}>
            {product.color.map((c, idx) => {
              const clean = c.trim().toLowerCase();  // <- IMPORTANT : on nettoie la chaine
              if (!validColors.includes(clean)) return null;

              return (
                <div
                  key={idx}
                  onClick={() => setSelectedColor(clean)}
                  style={{
                    width: '25px',
                    height: '25px',
                    borderRadius: '50%',
                    backgroundColor: clean,
                    border: selectedColor === clean ? '2px solid #000' : '1px solid #ccc',
                    cursor: 'pointer'
                  }}
                ></div>
              );
            })}
          </div>
        )}

        <button className="add-to-cart-button" onClick={handleAdd}>
          <FiShoppingCart /> Add to cart
        </button>

        {product.caracteristiques?.length > 0 && (
          <div className="product-caracteristiques">
            <h3>Features</h3>
            <ul>
              {product.caracteristiques.map((c, idx) => (
                <li key={idx}><FaCheckCircle color="green" /> {c}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="product-images">
        <div className="main-image">
          <img src={images[selectedImage]} alt={`${product.name} ${selectedImage + 1}`} />
        </div>
        <div className="thumbnail-list">
          {images.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`${product.name} ${idx + 1}`}
              className={selectedImage === idx ? 'selected' : ''}
              onClick={() => setSelectedImage(idx)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
