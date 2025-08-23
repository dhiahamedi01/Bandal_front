import React from "react";

const CollabProduct = (props) => {
  const cardStyle = {
    width: "200px",
    height: "300px",
    overflow: "hidden",
  };

  const imageStyle = {
    objectFit: "cover",
    height: "50%",
    transition: "transform 0.3s ease-in-out",
  };

  return (
    <>
      <div className="row row-cols-1 row-cols-md-4 g-4">
        <div className="col">
          <div className="card" style={cardStyle}>
            <img
              src={props.item.image}
              className="card-img-top"
              alt="Product Avatar"
              style={imageStyle}
              onMouseOver={(e) =>
                (e.currentTarget.style.transform = "scale(1.1)")
              }
              onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
            />
            <div className="card-body">
              <h5 className="card-title">{props.item.name}</h5>
              <p className="card-text font-size-text-card">
                {props.item.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CollabProduct;
