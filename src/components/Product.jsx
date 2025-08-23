import React, { useState } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardText,
  MDBCardImage,
} from "mdb-react-ui-kit";
import { FiShoppingCart } from "react-icons/fi";
import Color from "./Color.jsx";
import "./Styles/card.css";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../redux/slice/cartSlice.jsx";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';

const Product = ({ product }) => {
  const navigate = useNavigate(); // ✅ hook à l'intérieur du composant
  const { totalPrice } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [quantity] = useState(1);
  const [chosen, setChosen] = useState("fff");

  const [currentImage, setCurrentImage] = useState(
    product.images && product.images.length > 0 ? product.images[0] : ""
  );

  const handleMouseEnter = () => {
    if (product.images && product.images.length > 1) {
      setCurrentImage(product.images[1]);
    }
  };

  const handleMouseLeave = () => {
    if (product.images && product.images.length > 0) {
      setCurrentImage(product.images[0]);
    }
  };

  const handleChosenColor = (color) => {
    setChosen(color);
    toast.success(`You chose ${color} color successfully!`);
  };

  const handleAdd = (product) => {
    const newOrder = {
      product,
      quantity,
      price: product.price,
      chosenColor: chosen,
    };

    let temp_cart = JSON.parse(localStorage.getItem("saved-order")) || [];

    let found = false;
    for (let i = 0; i < temp_cart.length; i++) {
      if (
        temp_cart[i].product._id === product._id &&
        temp_cart[i].chosenColor === chosen
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
  };

  // ✅ Nouvelle fonction pour naviguer vers le détail produit
  const handleClick = () => {
    navigate(`/product/${product._id}`);
  };

  return (
    <div className="single-product-component-card" onClick={handleClick} style={{ cursor: 'pointer' }}>
      <div className="row justify-content-center">
        <MDBCard className="border-0">
          <MDBCardImage
            className="rounded image-product-main-con"
            src={currentImage}
            alt={product.name}
            position="top"
            height={250}
            width={250}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          />
          <MDBCardBody className="card-bod-shop">
            <MDBCardText className="title-text-for-cardshop fw-bold mb-0">
              {product.name}
            </MDBCardText>
            <span
              className="d-block text-truncate mb-0"
              style={{ fontSize: "15px" }}
            >
              {product.description}
            </span>
            <MDBCardText className="text-muted mb-0 price-text">
              $ {product.price}
            </MDBCardText>

            <div className="row-of-colors d-flex">
                  {product.color && product.color.length > 0 &&
                    product.color.map((item, index) => (
                      <Color key={index} props={handleChosenColor}>
                        {item}
                      </Color>
                    ))
                  }
                </div>

            <button
              className="usable-button-component-main mt-1 button-for-add-to-card-button"
              onClick={(e) => {
                e.stopPropagation(); // ✅ empêche la navigation si on clique sur "Add to Cart"
                handleAdd(product);
              }}
            >
              <FiShoppingCart /> Add To Cart
            </button>
          </MDBCardBody>
        </MDBCard>
      </div>
    </div>
  );
};

export default Product;
