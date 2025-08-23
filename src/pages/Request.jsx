import React, { useRef, useState } from 'react';
import axios from 'axios';
import HeroBG from "../assets/hero.jpg";
import "./Styles/Request.css";
import { HiUpload } from "react-icons/hi";
import swal from "sweetalert";
const Request = () => {
  const inputRef = useRef(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files.length > 0) {
      setImage(e.dataTransfer.files[0]);
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      if (image) formData.append("image", image);
  
      const res = await axios.post(
        "https://bandali-back.vercel.app/api/requests",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
  
      console.log("Success:", res.data);
  
      swal({
        title: "Succès !",
        text: "Votre demande a été envoyée avec succès !",
        icon: "success",
        button: "OK",
      });
  
      // --- WhatsApp message ---
      const phone = "+9613729086"; // numéro sans espaces ni +
      const message = `Nouvelle demande :\nTitre: ${title}\nDescription: ${description}`;
      const whatsappURL = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  
      window.open(whatsappURL, "_blank"); // ouvre WhatsApp dans un nouvel onglet
  
      setTitle("");
      setDescription("");
      setImage(null);
  
    } catch (err) {
      console.error("Erreur:", err.response ? err.response.data : err);
  
      swal({
        title: "Erreur",
        text: "Erreur lors de l'envoi de la requête.",
        icon: "error",
        button: "OK",
      });
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="request-container">
      {/* HERO */}
      <div className="hero">
        <div className="imageWrapper">
          <img src={HeroBG} alt="Hero Background" className="bg-image" />
        </div>
        <div className="hero-content">
          <h1>Request a Customize</h1>
          <div className="breadcrumb">
            <a href="/">Home</a> <span>Request</span>
          </div>
        </div>
      </div>

      {/* FORM */}
      <div className="form-wrapper">
        <h2 className="form-title">Customize Your Product</h2>
        <form className="custom-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title"
            className="input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <textarea
            placeholder="Description"
            rows="4"
            className="textarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>

          {/* Drop Zone */}
          <div
            className="dropZone"
            onClick={() => inputRef.current?.click()}
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
          >
            <HiUpload className="icon" />
            <p className="text">{image ? image.name : "Drop your image here"}</p>
            <p className="subText">PNG, JPG…</p>
            <input
              ref={inputRef}
              type="file"
              hidden
              accept="image/*"
              onChange={handleImageChange}
              aria-label="Upload image"
            />
          </div>

          <button className="submitBtn" type="submit" disabled={loading}>
            {loading ? "Envoi..." : "Send Request"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Request;
