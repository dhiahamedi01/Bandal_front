import React from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FiShoppingCart } from "react-icons/fi";
import CartProduct from '../components/CartProduct.jsx'
import { useState, useEffect } from 'react';
import  ButtonComponent from '../components/ButtonComponent.jsx'
import { cartActions } from '../redux/slice/cartSlice.jsx';
import { useSelector, useDispatch } from 'react-redux';
import './Styles/shop.css'
import ConfirmCart from './ConfirmCart.jsx';
import './Styles/confirm.css'
import { createOrder } from '../redux/apiCall/orderCall.jsx';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
function MyVerticallyCenteredModalOrder(props) {
  const navigate = useNavigate()
  const { totalPrice } = useSelector(state => state.cart);
  const dispatch = useDispatch()
  const { carts } = useSelector(state => state.cart);
  const { user } = useSelector(state => state.auth)
  const [showNewLocationForm, setShowNewLocationForm] = useState(false);
  const [selectedLocationId, setSelectedLocationId] = useState(null);

  const confirmation = ()=>{
    const finalOrder = []
    carts.map((item)=>{
      finalOrder.push({product:item.product._id, quantity:item.quantity, chosenColor:item.chosenColor, price:item.price})
    })
    // console.log( localStorage.getItem('token'))
    dispatch(createOrder( user[0].data._id, JSON.parse(localStorage.getItem('token')),finalOrder, localStorage.getItem('selectedLocationId')))
    
    navigate('/track')
      

    
  }

  const openNewLocationForm = () => {
    setShowNewLocationForm(true);
  };

  const closeNewLocationForm = () => {
    setShowNewLocationForm(false);
  };

  const handleNewLocationSubmit = (newAddress) => {
    // Close the form
    closeNewLocationForm();
  };

  const handleLocationChange = (e) => {
    const selectedValue = e.target.value;

    // If "Add New Location" is selected and the form is already open, do nothing
    if (selectedValue === "new-location" && showNewLocationForm) {
      return;
    }

    // If "Add New Location" is selected, open the form
    if (selectedValue === "new-location") {
      openNewLocationForm();
    } else {
      // If another location is selected, close the form
      closeNewLocationForm();
      // Update the selected location ID
      setSelectedLocationId(selectedValue);
      // Also update the local storage
      localStorage.setItem("selectedLocationId", selectedValue);
    }
  };
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      {/* {console.log('redux state:user=>  ', user)} */}
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
        Confirm Order
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* {console.log("carts 123 ",carts)} */}
        {carts.map((item) => (
            <ConfirmCart key={item.id} item={item} />
        ))}
    <div className='confirm-location-order-main'>
        {/* {console.log(user[0])} */}
        <div className='class-container-main-component d-flex'>
        <div className='user-info-main-confirm d-flex flex-column'>
            <span className='h4'> First Name:  {user[0].data.firstName}</span>
            <span className='h4'> Last Name:  {user[0].data.lastName}</span>
            <span className='h4'> Phone Number:  {user[0].data.phone}</span>
            </div>
            <div className='user-info-main-confirm d-flex flex-column'>
                <span className='h4'> Email:  {user[0].data.email}</span>
                {user[0].data.locations.length>0?
                <span className='h4'> Location:  
                    <select
                        className="form-select text-muted"
                        onChange={handleLocationChange}
                        value={selectedLocationId || ""}
                        required
                    >
                      <option value='' disabled hidden>please select a location</option>
                        {user[0].data.locations.map((location) => (
                        <option key={location._id} value={`City: ${location.city}, Street: ${location.street}, Building: ${location.building}, Floor: ${location.floor}`}>
                            {`City: ${location.city}, Street: ${location.street}, Building: ${location.building}, Floor: ${location.floor}`}
                        </option>
                        ))}
                    </select>
                </span>:<Link to='/manage-location'><ButtonComponent>Add a location</ButtonComponent></Link>}
            </div>
        </div>
    </div>
     
  

      
       <div className='container order-summary-before-checkout flex-column'>
          <div className='d-flex justify-content-between'><h3>Subtotal: </h3> <p> ${totalPrice}</p></div>
          <div className='d-flex justify-content-between'><h3 className='class-for-price-size-total'>TOTAL: </h3> <p className='class-for-price-size-total'> ${totalPrice}</p></div>
       </div>
      </Modal.Body>
      <Modal.Footer>
      {user[0].data.locations.length>0?
     <ButtonComponent onClick={()=>confirmation()}>Confirm Order</ButtonComponent>:<p className='text-info'>add a location in order to continue...</p>}
        
      </Modal.Footer>
    </Modal>
  );
}

export default MyVerticallyCenteredModalOrder;