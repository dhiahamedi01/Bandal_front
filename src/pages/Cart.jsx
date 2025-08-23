import InCartComponent from "../components/InCartComponent"
import "./Styles/Cart.css"

import React from 'react'

const Cart = () => {
  return (
    <div className="cart-main-container d-flex flex-row">
    <div><InCartComponent/></div>
    </div>
  )
}

export default Cart