
import React, { useEffect, useState } from 'react';
import TableOrder from '../components/TableOrder';
import Sidebar from '../components/SidebarAdmin.jsx'
import { useSelector, useDispatch } from 'react-redux';
import { getAllOrders } from '../../redux/apiCall/orderCall.jsx';
import OrdersCard from '../components/OrdersCard.jsx';
const AdminOrder = () => {
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(getAllOrders())
  }, [dispatch])
  const { orders } = useSelector((state)=>state.order)
  return (

    <div className="d-flex div-admin-dashboard-main">
    <Sidebar/>
    <div className="d-flex flex-column div-admin-dashboard-main-child">
    <OrdersCard/>
    {/* <NewTable/> */}
    <TableOrder/>
    </div>
  </div>
  )
};

export default AdminOrder;
