import React, { useState } from "react";
import { Col, Form } from "react-bootstrap";
import ButtonComponent from "../components/ButtonComponent";
import "./Styles/Contact.css";
import { toast } from "react-toastify";
import whatsupp from "../assets/whatsapp.png";
import axios from "axios";

const Contact = () => {
  const [formData, setFormData] = useState({
    from_name: "",
    from_email: "",
    from_phone: "",
    message: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const sendEmail = async (e) => {
    e.preventDefault();

    try {
      // Remplace l'URL par celle de ton backend
      await axios.post("https://bandali-back.vercel.app/api/send-email", formData);

      setFormData({
        from_name: "",
        from_email: "",
        from_phone: "",
        message: ""
      });

      toast.success("Email sent successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Error sending email. Please try again.");
    }
  };

  return (
    <div className="contact-page-container my-5 d-flex flex-row">
      <Col md={6} xs={12} className="contact-page-information-form">
        <div className="contact-page-info-header d-flex flex-column">
          <p className="d-flex justify-content-center fs-1 fw-bold text-white">
            Contact Info
          </p>
          <p
            className="contact-page-info-header-second-text d-flex justify-content-center fs-1 fw-bold"
            style={{ color: "#FF8A00" }}
          >
            Michel Bandali
          </p>
        </div>

        <div className="contact-info d-flex flex-column">
          <div className="contact-info-item">
            <i className="fas fa-envelope"></i>
            <span className="contact-info-text">michelbandali@hotmail.com</span>
          </div>
          <div className="contact-info-item">
            <i className="fab fa-instagram"></i>
            <span className="contact-info-text">@michelbandalidesign</span>
          </div>
          <div className="contact-info-item">
            <i className="fab fa-facebook"></i>
            <span className="contact-info-text">Michel Bandali Design</span>
          </div>
          <div className="contact-info-item">
            <i className="fas fa-map-marker-alt"></i>
            <span className="contact-info-text">
              <a
                href="https://www.google.com/maps/dir//34.452997,35.8122754/@34.4528848,35.7297039,12z/data=!3m1!4b1!4m4!4m3!1m1!4e2!1m0?entry=ttu"
                target="_blank"
                rel="noreferrer"
              >
                Fawzi kawikji street, Tripoli, Lebanon
              </a>
            </span>
          </div>
          <div className="contact-info-item">
            <button
              className="whatsapp-button"
              onClick={() => window.open("https://wa.me/9613729086", "_blank")}
            >
              <img
                src={whatsupp}
                alt="WhatsApp"
                className="whatsapp-icon"
              />
              <span className="contact-info-text2">
                Chat with me on WhatsApp
              </span>
            </button>
          </div>
        </div>
      </Col>

      <Col md={6} xs={12} className="contact-page-form">
        <h2 className="contact-page-text fs-1 fw-bold">
          <span className="text-black">Send us</span>{" "}
          <span className="contact-page-text-span-2"> a message!</span>
        </h2>
        <Form onSubmit={sendEmail}>
          <Form.Group controlId="from_name" className="contact-page-form-group">
            <Form.Label className="contact-page-label">Your Name *</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Enter your name"
              className="contact-page-input"
              name="from_name"
              value={formData.from_name}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="email" className="contact-page-form-group">
            <Form.Label className="contact-page-label">Email *</Form.Label>
            <Form.Control
              required
              type="email"
              placeholder="Enter your email"
              className="contact-page-input"
              name="from_email"
              value={formData.from_email}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="phone" className="contact-page-form-group">
            <Form.Label className="contact-page-label">
              Phone number (optional)
            </Form.Label>
            <Form.Control
              pattern="[0-9]*"
              title="Please enter only numeric characters"
              type="tel"
              placeholder="Enter your phone number"
              className="contact-page-input"
              name="from_phone"
              value={formData.from_phone}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="message" className="contact-page-form-group">
            <Form.Label className="contact-page-label">Message *</Form.Label>
            <Form.Control
              required
              as="textarea"
              placeholder="Type your message here"
              className="contact-page-textarea"
              name="message"
              value={formData.message}
              onChange={handleChange}
            />
          </Form.Group>

          <ButtonComponent>Send Message</ButtonComponent>
        </Form>
      </Col>
    </div>
  );
};

export default Contact;
