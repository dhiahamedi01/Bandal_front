import React, { useEffect } from "react";
import "./Styles/CollabDetails.css";
import CollabProduct from "../components/ProductNotForSale.jsx";
import { useDispatch, useSelector } from "react-redux";
import { getSingleCollection } from "../redux/apiCall/collectionCall.jsx";
import { getByCollectionId } from "../redux/apiCall/notSaleCall.jsx";
import { useParams } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import ScrollToTop from "../components/ScrollToTop.jsx";

const CollabDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  //fetch collection by its id
  useEffect(() => {
    dispatch(getSingleCollection(id));
    dispatch(getByCollectionId(id));
  }, [dispatch, id]);
  const { productByCollection } = useSelector((state) => state.notProduct);
  const { singleCollection } = useSelector((state) => state.collection);
  // console.log("test", singleCollection);

  if (
    !singleCollection ||
    singleCollection.length == 0 ||
    !productByCollection ||
    productByCollection.length == 0
  ) {
    return (
      <Spinner animation="border" role="status" className="spinner-loading">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }

  localStorage.setItem(
    "product-by-collection",
    JSON.stringify(productByCollection)
  );

  // console.log("product by collection id", productByCollection);
  return (
    <>
      <ScrollToTop />

      <div className="collab-page-container d-flex ">
        <p className="collab-page-left-side-parg">
          <span className="collab-page-left-side-span1">
            {singleCollection.data.collectionName}
          </span>
          <span className="collab-page-left-side-span2"> Collection</span>
        </p>
        <div className="collab-page-left-side">
        
            <img
              alt="collab-profile"
              src={singleCollection.data.collectionImage}
              width={300}
              height={300}
            />
          
          <div className="collab-page-right-side-desc">
            <h2 className="collab-page-right-h2">
              <strong>
                {" "}
                Explore the Collaboration: Michel Bandali Design{" "}
                <span className="collab-page-left-side-span2">X </span>
                {singleCollection.data.collectionName}
              </strong>
            </h2>
            <p
            className="collab-page-right-p"
              style={{
                wordWrap: "break-word",
                textAlign: "justify",
                whiteSpace: "pre-line",
              }}
            >
              {singleCollection.data.collectionDescription}
            </p>
          </div>
        </div>
        <h1 className=" collab-page-left-side-parg"><span className="collab-page-left-side-span2">All</span> Products</h1>
        <div className="product-main-div1 d-flex gap-4 align-items-center justify-content-center">
        {productByCollection.data.data.map((item) => (
          <CollabProduct key={item._id} item={item} />
        ))}{productByCollection.data.data.map((item) => (
          <CollabProduct key={item._id} item={item} />
        ))}
      </div>
      </div>

     
    </>
  );
};

export default CollabDetails;
