import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Icon from '../assets/icons8-ok.gif'
import ButtonComponent from '../components/ButtonComponent.jsx'
import { useNavigate} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { getAllOrdersByUser } from '../redux/apiCall/orderCall';
import { orderActions } from '../redux/slice/orderSlice';
function Basic() {
  const navigate = useNavigate()
  const [lgShow, setLgShow] = useState(true);
  const { orders } = useSelector((state)=> state.order)
  const dispatch = useDispatch()
 useEffect(() => {
  dispatch(getAllOrdersByUser)
  
  localStorage.setItem('orderss', JSON.stringify(orders))
  }, [dispatch])
  return (
    <>
      <Modal
        size="lg"
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
       
        </Modal.Header>
        <Modal.Body className='modal-show-body-component-main d-flex flex-column justify-content-center align-items-center'>
          <img className='d-flex align-self-center' src={Icon} alt='gif.gif' width={70} height={70}/>
          <h1>Order is Sent !</h1>

<div className='d-flex flex-column justify-content-center align-self-center align-items-center'>
          <p>Congratulations! Your order has been successfully placed !<br/> We are excited to embark on this journey with you !</p>
          <ButtonComponent onClick={()=>navigate('/myorders')}>Track Your Order</ButtonComponent>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Basic;