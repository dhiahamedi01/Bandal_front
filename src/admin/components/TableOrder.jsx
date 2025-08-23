import {
  getAllOrders,
  getAccepted,
  getCanceled,
  getPending,
  getDelivered,
} from "../../redux/apiCall/orderCall";
import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import Cookies from "js-cookie";

import Color from "../../components/Color.jsx";
import Spinner from "react-bootstrap/Spinner";
import { toast } from "react-toastify";
function MyVerticallyCenteredModalAdmin({ orderData, ...props }) {
  const dispatch = useDispatch();
  const token = Cookies.get("userToken");
  const locations = orderData ? orderData.Location[0].split(",") : null;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  // console.log(locations);
  //function that handles accepting and refusing orders
  const handleStatus = async (status) => {
    try {
      const response = await axios.put(
        `https://bandali-back.vercel.app/api/orders/${orderData.id}`,
        {
          status: status,
        },
        { headers }
      );
      if (!response) {
        return (
          <Spinner animation="border" role="status" className="spinner-loading">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        );
      } else if (response.status == 200) {
        dispatch(getAllOrders());
        dispatch(getPending());
        dispatch(getAccepted());
        dispatch(getCanceled());
        dispatch(getDelivered());

        toast.success("order status modified !");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Customer Details
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Full Name: </h4>
        <div className="text-muted user-info-details-admin rounded">
          {orderData?.Name}
        </div>
        <h4>Email: </h4>
        <div className="text-muted user-info-details-admin rounded">
          {orderData?.email}
        </div>
        <h4>Phone Number: </h4>
        <div className="text-muted user-info-details-admin rounded">
          {orderData?.phone}
        </div>
        <h4>Delivery Adress: </h4>
        <div className="d-flex flex-column">
          <div className="d-flex  justify-content-between">
            <div className="d-flex flex-column">
              <h5>City: </h5>
              <div className="text-muted user-info-details-admin rounded detail-location-order">
                {locations ? locations[0] : null}
              </div>
            </div>

            <div className="d-flex flex-column">
              <h5>Street: </h5>
              <div className="text-muted user-info-details-admin rounded detail-location-order">
                {locations ? locations[1] : null}
              </div>
            </div>
          </div>

          <div className="d-flex  justify-content-between">
            <div className="d-flex flex-column">
              <h5>Building: </h5>
              <div className="text-muted user-info-details-admin rounded detail-location-order">
                {locations ? locations[2] : null}
              </div>
            </div>

            <div className="d-flex flex-column">
              <h5>Floor: </h5>
              <div className="text-muted user-info-details-admin rounded detail-location-order">
                {locations ? locations[3] : null}
              </div>
            </div>
          </div>
          <div className="d-flex flex-column class-for-location-description">
            <h5>Description: </h5>
            <div className="text-muted user-info-details-admin rounded detail-location-order-description">
              {locations ? locations[4] : null}
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          Order Details #{orderData ? orderData.id.slice(-4) : null}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {orderData ? (
          <div className="d-flex flex-column">
            {orderData.products.map((item) => (
              <div className="d-flex">
                <ul className="list-unstyled border-ul-list fs-4">
                  <div className="d-flex flex-column">
                    <li className="mb-1 ">
                      <i className="fas fa-long-arrow-alt-right  me-2 "></i>
                      product: {item.product.name}
                    </li>

                    <li className=" mb-1 text-muted">
                      <i className=" me-3  text-info">-</i>
                      quantity: x{item.quantity}
                    </li>
                    <li className="mb-1 text-muted d-flex  align-items-center">
                      {item.chosenColor !== "fff" ? (
                        <>
                          <i className="fas me-3 text-info">-</i>color:{" "}
                          <Color>{item.chosenColor}</Color>
                        </>
                      ) : null}
                    </li>
                  </div>
                  <p className="fs-2 d-flex justify-self-center justify-content-center align-items-center">
                    $ {item.price}
                  </p>
                </ul>
              </div>
            ))}
            <p className="rounded border-solid fs-1">
              subtotal: {orderData.Total}
            </p>
          </div>
        ) : null}
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-between px-5">
        <button
          onClick={() => handleStatus("Canceled")}
          className="btn btn-danger btn-lg"
        >
          Cancel Order
        </button>
        {orderData?.status !== "Accepted" ? (
          <button
            onClick={() => handleStatus("Accepted")}
            className="btn btn-success btn-lg"
          >
            Accept Order
          </button>
        ) : (
          <button
            onClick={() => handleStatus("Delivered")}
            className="btn btn-success btn-lg"
          >
            Delivered
          </button>
        )}
      </Modal.Footer>
    </Modal>
  );
}
const TableOrder = () => {
  const [modalShow, setModalShow] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const dispatch = useDispatch();
  const { AllOrders } = useSelector((state) => state.order);
  var orders = AllOrders.slice().sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );
  // console.log("all orders here=>", orders);
  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "Name", headerName: "Name", width: 110 },
    { field: "phone", headerName: "Phone number", width: 110 },
    { field: "email", headerName: "Email", width: 110 },

    {
      field: "products",
      headerName: "Products",
      width: 150,
      renderCell: (params) => (
        <div style={{ maxHeight: "100px", overflowY: "auto" }}>
          {params.value.map((product, index) => (
            <div
              key={index}
            >{`x${product.quantity}  ${product.product.name}`}</div>
          ))}
        </div>
      ),
    },
    { field: "Location", headerName: "Location", width: 110 },
    { field: "Total", headerName: "Total", width: 110 },
    {
      field: "status",
      headerName: "Status",
      width: 110,
      renderCell: (params) => (
        <div className={`status-cell ${params.value.toLowerCase()}`}>
          {params.value}
        </div>
      ),
    },
    {
      field: "Action",
      headerName: "Action",
      sortable: false,
      width: 132,
      renderCell: (params) => (
        <div>
          <button
            onClick={() => {
              setSelectedOrder(params.row);
              setModalShow(true);
            }}
            className="btn btn-success btn-m"
            style={{ marginRight: "25px" }}
          >
            Order Details
          </button>
        </div>
      ),
    },
  ];

  const getLocationString = (locations) => {
    if (!locations || locations.length === 0) {
      return "";
    }
    return locations
      .map(
        (location) =>
          `${location.city}, ${location.street}, ${location.building}`
      )
      .join(", ");
  };

  const rows = orders.map((order) => ({
    ...order,
    id: order._id,
    Name: order.userId.firstName + " " + order.userId.lastName,
    phone: order.userId.phone,
    email: order.userId.email,
    products: order.products,
    Location: order.userId.locations.map(
      (location, index) =>
        `${location.city}, ${location.street}, ${location.building}, ${location.floor}, ${location.description}`
    ),
    Total: `$${order.totalPrice.$numberDecimal}`,
  }));

  return (
    <div style={{ height: 400, width: "100%", margin: "10px" }}>
      <div className="d-flex justify-content-end mb-3"></div>
      <DataGrid rows={rows} columns={columns} pageSize={5} rowHeight={100} />

      <MyVerticallyCenteredModalAdmin
        orderData={selectedOrder}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </div>
  );
};

export default TableOrder;
