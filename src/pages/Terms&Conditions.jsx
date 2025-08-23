import React from "react";
import "./Styles/terms.css";
const TermsAndConditions = () => {
  return (
    <div className="Terms-and-condition-main-container d-flex flex-column mt-5">
      <div className="single-title-with-paragraph d-flex flex-column ">
        <p className="d-flex gap-2 p-classname-title ">
          Terms and
          <span className="span-class-name-main">
            <p>Conditions</p>
          </span>
        </p>
        <span className="text-muted span-for-date-updated">
          Last Updated Jan 21st 2024{" "}
        </span>
        <hr />

        <div className="single-paragraph-terms-conditions">
          <h3>1. Acceptance of Terms</h3>
          <p className="text-muted">
            By accessing or using the website Michel Bandali Designs , you agree
            to comply with and be bound by these terms and conditions. If you do
            not agree with any part of these terms and conditions, please do not
            use the Website.
          </p>
        </div>

        <div className="single-paragraph-terms-conditions">
          <h3>2. Products and Services</h3>
          <p className="text-muted">
            Michel Bandali Designs offers products made from recycled materials
            through the Website. Product descriptions and prices are subject to
            change without notice.
          </p>
        </div>

        <div className="single-paragraph-terms-conditions">
          <h3>3. Orders and Payments</h3>
          <p className="text-muted">
            Michel Bandali Designs offers products made from recycled materials
            through the Website. Product descriptions and prices are subject to
            change without notice.
          </p>
        </div>

        <div className="single-paragraph-terms-conditions">
          <h3>4. Intellectual Property</h3>
          <p className="text-muted">
            All content on the Website, including images, text, and logos, is
            the property of Michel Bandali Designs and is protected by copyright
            and other intellectual property laws.
          </p>
        </div>

        <div className="single-paragraph-terms-conditions">
          <h3>5. Privacy Policy</h3>
          <p className="text-muted">
            All content on the Website, including images, text, and logos, is
            the property of Michel Bandali Designs and is protected by copyright
            and other intellectual property laws.
          </p>
        </div>

        <div className="single-paragraph-terms-conditions">
          <h3>6. Governing Law</h3>
          <p className="text-muted">
            These terms and conditions are governed by and construed in
            accordance with the laws of Lebanon.
          </p>
        </div>

        <div className="single-paragraph-terms-conditions">
          <h3>7. Changes to Terms and Conditions</h3>
          <p className="text-muted">
            Michel Bandali Designs reserves the right to modify these terms and
            conditions at any time. It is your responsibility to review these
            terms periodically for changes.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
