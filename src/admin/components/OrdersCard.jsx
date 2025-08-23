import Card from "react-bootstrap/Card";
import "./Styles/sidebar.css";

import { useSelector, useDispatch } from "react-redux";
import { MdOutlinePendingActions } from "react-icons/md";
import Check from "../../assets/check.png";
import Cancel from "../../assets/cancel-order.png";
import { CiDeliveryTruck } from "react-icons/ci";
import { useEffect } from "react";
import {
  getAccepted,
  getCanceled,
  getDelivered,
  getPending,
} from "../../redux/apiCall/orderCall";
const OrdersCard = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPending());
    dispatch(getAccepted());
    dispatch(getCanceled());
    dispatch(getDelivered());
  }, [dispatch]);

  const { pending, accepted, delivered, canceled } = useSelector(
    (state) => state.order
  );
  // console.log("ordersCard", pending);
  return (
    <div className="d-flex  mt-5 gap-5">
      <div className="d-flex flex-column">
        <span className="text-muted">Pending Orders</span>
        <Card
          className="d-flex flex-row justify-content-between align-items-center"
          style={{ width: 210, height: 80 }}
        >
          <Card
            className="bg-dark  text-warning-color-main"
            style={{ width: 80, height: 80 }}
          >
            <Card.Body className="rounded">
              <Card.Title className="text-center display-6">
                <MdOutlinePendingActions variant="text-white" />
              </Card.Title>
            </Card.Body>
          </Card>
          <div>
              <Card.Title className="text-center  p-3   display-5 text-color-custom">
                {pending}
              </Card.Title>
          </div>
        </Card>
      </div>
      {/* accepted orders */}
      <div className="d-flex flex-column">
        <span className="text-muted">Accepted Orders</span>
        <Card
          className="d-flex flex-row justify-content-between align-items-center"
          style={{ width: 210, height: 80 }}
        >
          <Card
            className="bg-dark  text-warning-color-main"
            style={{ width: 80, height: 80 }}
          >
            <Card.Body className="rounded">
              <Card.Title className="text-center display-6">
                <img
                  alt="logo avatar"
                  src={Check}
                  style={{ width: 40, height: 40 }}
                />
              </Card.Title>
            </Card.Body>
          </Card>
          <div>
              <Card.Title className="text-center  p-3   display-5 text-success">
                {accepted}
              </Card.Title>
          </div>
        </Card>
      </div>

      {/* Delivered orders */}
      <div className="d-flex flex-column">
        <span className="text-muted">Delivered Orders</span>
        <Card
          className="d-flex flex-row justify-content-between align-items-center"
          style={{ width: 210, height: 80 }}
        >
          <Card
            className="bg-dark  text-warning-color-main"
            style={{ width: 80, height: 80 }}
          >
            <Card.Body className="rounded">
              <Card.Title className="text-center display-6">
                <CiDeliveryTruck />
              </Card.Title>
            </Card.Body>
          </Card>
          <div>
              <Card.Title className="text-center  p-3   display-5 text-success">
                {delivered}
              </Card.Title>
          </div>
        </Card>
      </div>

      {/* Canceled orders */}
      <div className="d-flex flex-column">
        <span className="text-muted">Canceled Orders</span>
        <Card
          className="d-flex flex-row justify-content-between align-items-center"
          style={{ width: 210, height: 80 }}
        >
          <Card
            className="bg-dark  text-warning-color-main"
            style={{ width: 80, height: 80 }}
          >
            <Card.Body className="rounded">
              <Card.Title className="text-center display-6">
                <img
                  alt="cancel-avatar"
                  src={Cancel}
                  style={{ width: 40, height: 40 }}
                />
              </Card.Title>
            </Card.Body>
          </Card>
          <div>
              <Card.Title className="text-center  p-3   display-5 text-danger">
                {canceled}
              </Card.Title>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default OrdersCard;
