import React from "react";
import "./Styles/ButtonComponent.css";
const ButtonComponent = ({ to, children, state, type, onClick }) => {
  return (
    <>
      <button
        type={type}
        onClick={onClick}
        className="usable-button-component-main mt-2"
      >
        {children}
      </button>
    </>
  );
};

export default ButtonComponent;
