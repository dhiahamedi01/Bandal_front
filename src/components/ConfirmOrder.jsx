import React, {useState} from 'react'
import './Styles/confirm.css'
import MyVerticallyCenteredModalOrder from "./MyVerticalCenteredModalOrder"


function ConfirmOrder() {
  const [modalShow, setModalShow] = useState(true);

  return (
    <>
      <MyVerticallyCenteredModalOrder
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}

export  default ConfirmOrder;
