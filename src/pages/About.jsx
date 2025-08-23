import React, { useEffect, useState } from "react";
import "./Styles/About.css";
import profile from "../assets/1002577584.jpg";
import sign from "../assets/sign.png";
import ButtonComponent from "../components/ButtonComponent";
import CollabCart from "../components/collabCart.jsx";
import design from "../assets/design2.png";
import { useDispatch, useSelector } from "react-redux";
import { getAllCollections } from "../redux/apiCall/collectionCall.jsx";
import { Link, useNavigate } from "react-router-dom";



import Trailer from "../assets/Trailer2.mp4";
const About = () => {
  const navigate = useNavigate();

  const discoverMore = () => {
    navigate("/products");
  };

  const dispatch = useDispatch();

  // var collections = JSON.parse(localStorage.getItem('collection'))
  const collections = useSelector((state) => state.collection.collections);

  useEffect(() => {
    const response = dispatch(getAllCollections());
  }, [dispatch]);
  return (
    <>
      <div className="About-us-component-main-div d-flex">
        <div className="title-with-text-classname">
          <div className="d-flex gap-2 p-classname-title">
            Our
            <span className="span-class-name-main">
              <p>Founder</p>
            </span>
          </div>
          <div className="paragraph-description-text d-flex flex-column">
            Michel Bandali, a Lebanese interior and object designer, holds a
            master’s in interior architecture and a DNSEP in design from
            France’s ESADMM. With a background in TV set design and event
            planning, Michel collaborates with Claire de Chivré on projects for
            ADIDAS and BRITA. In 2018, he founded Anbar Concept Store,
            empowering women and local designers. Michel’s design philosophy
            focuses on celebrating Lebanese architecture and preserving
            authentic handcraft. Explore his unique vision blending artistry
            with a commitment to community and craftsmanship showcased in Paris,
            Marseille, Salernes, and Forcalquier.
          </div>
          <div className="d-flex flex-column div-for-img-button">
            {" "}
            <img
              className="class-for-profile profile2-bandali"
              src={sign}
              alt="signaturebymichel"
              width={270}
              height={100}
            />
            <a href="#collabs">
              <ButtonComponent>Collabs</ButtonComponent>
            </a>
          </div>
        </div>
        <img
          className="class-for-profile"
          src={profile}
          alt="design-recycled"
          width={400}
          height={400}
        />
      </div>
      <div className="About-us-component-main-div d-flex">
        <video
          autoPlay
          loop
          muted
          className="class-for-profile"
          style={{ width: "800px", height: "800px" }}
        >
          <source src={Trailer} type="video/mp4" />
        </video>
        <div className="title-with-text-classname">
          <div className="d-flex gap-2 p-classname-title">
            Our
            <span className="span-class-name-main">
              <p>Project</p>
            </span>
          </div>
          <div className="paragraph-description-text d-flex flex-column">
            Michel Bandali Design, a vital component of Anbar Concept Store, is
            a visionary brand that embraces our rich heritage and cosmopolitan
            culture. By transforming what some may consider "obsolete" into
            contemporary works of art, Michel Bandali Design bridges the past
            and the present. Through the empowerment of skilled women and local
            craftsmen, combined with a commitment to eco-friendly practices
            through recycled materials, this brand is at the forefront of
            socially and ecologically responsible design. With a bold vision to
            push the boundaries of traditional craftsmanship and redefine
            product design, Michel Bandali Design is paving the way for new
            horizons and fresh interpretations of design concepts.
          </div>
          <div className="d-flex flex-column div-for-img-button mt-4">
            <ButtonComponent onClick={discoverMore}>
              Discover more
            </ButtonComponent>
          </div>
        </div>
      </div>

      {/* collaborations section */}

      <div id="collabs" className="About-us-component-main-divv d-flex">
        <div className="title-with-text-classnamee flex-column">
          <div className="d-flex gap-2 p-classname-title">
            Our
            <span className="span-class-name-main">
              <p>Collaborations</p>
            </span>
          </div>
          <div className="d-flex collab-card-main-componentt">
          {collections && collections.length > 0 ? (
              collections.map((collection) => (
                <Link key={collection._id} to={`/collection/${collection._id}`}>
                  <CollabCart collection={collection} />
                </Link>
              ))
            ) : (
              <p>No collaborations available</p>
            )}


          </div>
        </div>
        <img className="profile3-bandali" src={design} width={400} height={400} alt="" />
      </div>

    </>
  );
};

export default About;
