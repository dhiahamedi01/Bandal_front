import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersByUser } from "../redux/apiCall/orderCall";

import { orderActions } from "../redux/slice/orderSlice";

import Spinner from 'react-bootstrap/Spinner';
import Table from "react-bootstrap/Table";
import './Styles/OrderHistory.css'
import moment from 'moment'
export default function OrderHistory() {
  const dispatch = useDispatch();

  const { user } = useSelector(state => state.auth);
  const { token } = useSelector(state => state.auth);
  const { orders, getResponse } = useSelector((state) => state.order);

  // const [orderss, setOrders] = useState([])

  useEffect(() => {
    dispatch(getAllOrdersByUser(user[0].data._id, JSON.parse(localStorage.getItem('token'))))
  }, [dispatch]);

  // useEffect(() => {
  //   var orderss = orders.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  //   setOrders(orderss);

  // },[orders])

  // useEffect(() => {
  //  var orderss = orders.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  //  console.log("orders 6666 ",orderss)
  // setOrders(orderss);

  // },[orders])


  useEffect(() => {
    // console.log("orders 6666 ",orders)
 
   },[])

  const ordersCount = orders.length;
  dispatch(orderActions.setOrderCount(ordersCount));
   if(getResponse === false){
    return  <Spinner animation="border" role="status" className="spinner-loading">
    <span className="visually-hidden">Loading...</span>
  </Spinner>
   }
   if (orders.length == 0  ) {
    return <p className=" d-flex justify-self-center align-self-center mt-5">There's no data to display...</p>
    
  }
    var orderss = orders.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return(
    <div className="manage-loc-page d-flex">
      
  <div className="manage-loc-buttons">
 
  </div>

  <div className="manage-loc-table">
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>Products</th>
          <th>Status</th>
          <th>Total</th>
          <th>Date</th>
    
        </tr>
      </thead>
      <tbody>
        {orderss.map((order) => (
          <tr key={order._id}>
            <td className="text-center px-0 color-red-400">
              {order.products.map((product) =>(
                <td>{`X${product.quantity}  ${product.product.name}`}</td>
              ))}
</td>
           
           <td className={`${order.status==='Pending'? 'pending':order.status==='Accepted'? 'accepted':order.status==='Canceled'?'canceled':order.status==='Delivered'?'delivered':'delivered'}`}>{order.status }</td>
           <td>{`$${order.totalPrice.$numberDecimal}`}</td>
           <td>{moment(order.createdAt).format("MMMM Do YYYY, h:mm a")}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  </div>
  </div>
  )}