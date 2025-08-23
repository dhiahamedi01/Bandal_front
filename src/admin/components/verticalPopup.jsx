import React from 'react'
import Modal from 'react-bootstrap/Modal';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';


function MyVerticallyCenteredModalAdmin(props) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { orders } = useSelector((state) => state.order);

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
        Order Details
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
  
       
      </Modal.Body>
      <Modal.Footer className='d-flex justify-content-between px-5'>
     
        <button>hello</button>
        <button>hello</button>

      </Modal.Footer>
    </Modal>
  );
}

export default MyVerticallyCenteredModalAdmin;