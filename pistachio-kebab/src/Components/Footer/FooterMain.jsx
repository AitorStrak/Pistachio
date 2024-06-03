import React from "react";
import "../styles/FooterMain.css";

export function FooterMain() {
  return (
    <>
      <div className="footer-buttons">
        <button className="language-button">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/f63f52207b3be66d32f2bb1c9f1d893a8e78b082fe1e5016d1f4686bcf2d84bd?apiKey=40acac346cfd4e1f8d46b35934a94ae2&"
            alt="language-img"
            className="language-img"
          />
          <span>Idiomas / Languages</span>
        </button>

        <button className="accessibility-button">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/7460a85cd0707cfa5bb8840ce5316313984de3c096f779b82484df65225497ca?apiKey=40acac346cfd4e1f8d46b35934a94ae2&"
            alt="accessibility-img"
            className="accessibility-img"
          />
          <span>Accesibilidad</span>
        </button>
      </div>
      <div className="images-container">
        <img
          loading="lazy"
          src="https://pistachiokebab.es/wp-content/uploads/2023/09/Pistachio-kebab-menu-home.png"
          className="durum-image"
          alt="durum-image"
        />
        <img
          loading="lazy"
          src="https://papadoner.com/wp-content/uploads/2021/03/pita-kebab-solo-2.png"
          alt="pita-image"
          className="pita-image"
        />
      </div>
    </>
  );
}
