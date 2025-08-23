import React from 'react'
import Modal from 'react-bootstrap/Modal';
import { FiShoppingCart } from "react-icons/fi";
import CartProduct from '../components/CartProduct.jsx'
import  ButtonComponent from '../components/ButtonComponent.jsx'
import { useSelector } from 'react-redux';
import {useNavigate} from "react-router-dom"
import './Styles/shop.css'
function MyVerticallyCenteredModal(props) {
  const navigate = useNavigate();
  const { totalPrice } = useSelector(state => state.cart);

  const { carts } = useSelector(state => state.cart);
  console.log('test ici les données de cart',carts)
   const CloseAndConfirmOrder = ()=>{
    // console.log("prprpr ",props)
    props.onHide();
    navigate('/confirm')
   }
  
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
        Shopping Cart
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      {carts.map((item) => (
  <CartProduct key={item.id} item={item} />
  
))}
      
       <div className='container order-summary-before-checkout flex-column'>
          <div className='d-flex justify-content-between'><h3>Subtotal: </h3> <p> ${totalPrice}</p></div>
          <div className='d-flex justify-content-between'><h3 className='class-for-price-size-total'>TOTAL: </h3> <p className='class-for-price-size-total'> ${totalPrice}</p></div>
       </div>
      </Modal.Body>
      <Modal.Footer>
    <ButtonComponent onClick={()=> CloseAndConfirmOrder()}>Proceed to Checkout</ButtonComponent>
        
      </Modal.Footer>
    </Modal>
  );
}

function ShoppingCart() {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <>
 
      
    <FiShoppingCart className="fi-shopping-card-icon"  variant="primary" onClick={() => setModalShow(true)}/>
      
  
    

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}


export default ShoppingCart