import React from "react";
import { FooterMain } from "../Footer/FooterMain";
import { useNavigate } from "react-router-dom";
import "../styles/MainLayout.css";
import "../styles/FooterMain.css";
import mainImage from '../../../../images/imagen-header.jpg';

function Header() {
  return (
    <div className="mainLayout-container">
      <img
        loading="lazy"
        src={mainImage}
        className="header-image-2"
        alt="Header image"
      />
    </div>
  );
}

function InfoText() {
  return (
    <div className="info-content">
      <span className="icon-container">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/38906c7e12e2eb6c2d171e5a298dcd112f05ba444c11155d66e002fd58dae831?apiKey=19ca1fee3b3c4f58b9c6c7c164e21a51&"
          className="info-icon"
          alt="Information icon"
        />
      </span>
      <span className="info-title">
        Si desea información sobre <strong>alérgenos</strong>, solicita al
        personal del restaurante o consulte www.pistachiokebab.es
      </span>{" "}
    </div>
  );
}

function StartOrderButton() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/home");
  };

  return (
    <div className="centered-container">
      <button className="start-order-button" onClick={handleClick}>
        <h2 className="start-order-title">Empieza a pedir</h2>
        <p className="start-order-subtitle">pulse aquí</p>
      </button>
    </div>
  );
}

export function MainLayout() {
  return (
    <>
      <Header />
      <InfoText />
      <StartOrderButton />
      <FooterMain />
    </>
  );
}
