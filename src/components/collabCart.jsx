// components/CollabCard.jsx
import React from "react";
import "./Styles/collab.css";

const CollabCard = ({ collection }) => {
  console.log("test:", collection);
  return (
    <div className="card-collab-component-main">
      <div className="img-hover-zoom">
        <img
          src={collection.collectionImage}
          alt={`${collection.collectionName} collection`}
        />
      </div>
      <h5>{collection.collectionName} collection</h5>
    </div>
  );
};

export default CollabCard;
