import React from "react";
const PrivacyPolicy = () => {
  return (
    <div className="Terms-and-condition-main-container d-flex flex-column mt-5">
      <div className="single-title-with-paragraph d-flex flex-column ">
        <p className="d-flex gap-2 p-classname-title ">
          Privacy
          <span className="span-class-name-main">
            <p>Policy</p>
          </span>
        </p>
        <span className="text-muted span-for-date-updated">
          Last Updated Jan 21st 2024{" "}
        </span>
        <hr />

        <div className="single-paragraph-terms-conditions">
          <h3>1. Information We Collect</h3>
          <p className="text-muted">
            We may collect personal information such as:
            <li> Name Contact</li>
            <li>Information (email address, phone number) </li>
            <li>Your location(s)</li>
          </p>
        </div>

        <div className="single-paragraph-terms-conditions">
          <h3>2. How We Use Your Information</h3>
          <p className="text-muted">
            We use the collected information for the following purposes:
            <ul>
              <li>
                Processing and fulfilling orders Improving our products and
                services
              </li>
              <li>
                Communicating with you about promotions, updates, and orders
              </li>
              <li>Analyzing website performance and user behavior</li>
            </ul>
          </p>
        </div>

        <div className="single-paragraph-terms-conditions">
          <h3>3. Sharing Your Information</h3>
          <p className="text-muted">
            We may share your information with:
            <ul>
              <li>
                Service providers for order processing, shipping, and payment
                processing
              </li>
              <li>Legal authorities when required by law</li>
            </ul>
            We do not sell, rent, or trade your personal information to third
            parties for marketing purposes.
          </p>
        </div>

        <div className="single-paragraph-terms-conditions">
          <h3>4. Your Choices</h3>
          <p className="text-muted">
            <h4>4.1 Opting Out</h4>
            You may opt-out of receiving promotional communications by following
            the instructions provided in our emails or contacting us directly.
            <h4>4.2 Access and Correction </h4>
            You have the right to access and correct your personal information.
            Contact us to update your information.
          </p>
        </div>

        <div className="single-paragraph-terms-conditions">
          <h3>5. Security</h3>
          <p className="text-muted">
            We implement reasonable security measures to protect your
            information. However, no method of transmission over the internet or
            electronic storage is entirely secure.
          </p>
        </div>

        <div className="single-paragraph-terms-conditions">
          <h3>6. Cookies</h3>
          <p className="text-muted">
            We use cookies to enhance your browsing experience. You can disable
            cookies in your browser settings, but this may affect the
            functionality of the website.
          </p>
        </div>

        <div className="single-paragraph-terms-conditions">
          <h3>7. Changes to Privacy Policy</h3>
          <p className="text-muted">
            We reserve the right to update this Privacy Policy. Changes will be
            posted on this page with an updated effective date.
          </p>
        </div>

        <div className="single-paragraph-terms-conditions">
          <h3>8. Contact Us</h3>
          <p className="text-muted">
          If you have questions about our Privacy Policy, please contact us at <b>michelbandali@hotmail.com.</b>
          </p>
        </div>
        
      </div>
    </div>
  );
};

export default PrivacyPolicy;
