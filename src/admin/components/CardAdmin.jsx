import Card from "react-bootstrap/Card";
import "./Styles/sidebar.css";
import brand from "../../assets/brand.png";
import { useSelector } from "react-redux";
import { MdOutlineCategory } from "react-icons/md";
import { MdOutlineCollectionsBookmark } from "react-icons/md";
import order from "../../assets/order.png";
const CardAdmin = () => {
  const productsCount = useSelector((state) => state.product.productsCount);
  const CategoryCount = useSelector((state) => state.category.categoryCount);
  const collectionCount = useSelector(
    (state) => state.collection.collectionCount
  );
  const { AllOrdersCount } = useSelector((state) => state.order);

  return (
    <div className="d-flex  mt-5 gap-5">
      <div className="d-flex flex-column">
        <span className="text-muted">Products</span>
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
                  alt="avatar"
                  src={brand}
                  style={{ width: 40, height: 40 }}
                />
              </Card.Title>
            </Card.Body>
          </Card>
          <div>
            {/* <Card.Text> */}
              <Card.Title className="text-center p-3  display-5 text-dark">
                {productsCount}
              </Card.Title>
            {/* </Card.Text> */}
          </div>
        </Card>
      </div>
      {/* Categories */}
      <div className="d-flex flex-column">
        <span className="text-muted">Categories</span>
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
                <MdOutlineCategory
                  style={{ width: 40, height: 40 }}
                  className="text-white"
                />
              </Card.Title>
            </Card.Body>
          </Card>
          <div>
            {/* <Card.Text> */}
              <Card.Title className="text-center p-3  display-5 text-dark">
                {CategoryCount}
              </Card.Title>
            {/* </Card.Text> */}
          </div>
        </Card>
      </div>

      {/* Collections */}
      <div className="d-flex flex-column">
        <span className="text-muted">Collections</span>
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
                <MdOutlineCollectionsBookmark className="text-white" />
              </Card.Title>
            </Card.Body>
          </Card>

          {/* <Card.Text> */}
            <Card.Title className="text-center p-3  display-5 text-dark">
              {collectionCount}
            </Card.Title>
          {/* </Card.Text> */}
        </Card>
      </div>

      {/*  orders */}
      <div className="d-flex flex-column">
        <span className="text-muted">Orders</span>
        <Card
          className="d-flex flex-row justify-content-between  align-items-center"
          style={{ width: 210, height: 80 }}
        >
          <Card
            className="bg-dark  text-warning-color-main"
            style={{ width: 80, height: 80 }}
          >
            <Card.Body className="rounded">
              <Card.Title className="text-center display-6">
                <img
                  alt="avatar"
                  src={order}
                  style={{ width: 40, height: 40 }}
                />
              </Card.Title>
            </Card.Body>
          </Card>
          <div>
            {/* <Card.Text> */}
              <Card.Title className="text-center  display-5 p-3 text-dark">
                {AllOrdersCount}
              </Card.Title>
            {/* </Card.Text> */}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default CardAdmin;
