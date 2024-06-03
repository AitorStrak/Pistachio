import React from "react";
import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";
import "../styles/Header.css";
import "../styles/Footer.css";

export function ChoiceCard({ title, src }) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/menu");
  };

  return (
    <button className="choice-card" onClick={handleClick}>
      <h3 className="choice-card-title">{title}</h3>
      <img loading="lazy" alt={title} src={src} className="choice-card-image" />
      <div className="choice-card-prefooter" />
      <div className="choice-card-footer" />
    </button>
  );
}

export function FormSubmitButton({ text, className, onClick }) {
  return (
    <button className={className} onClick={onClick}>
      {text}
    </button>
  );
}

function FormSubmitButtonLanguages({ text, className }) {
  return (
    <button className={className}>
      <img
        loading="lazy"
        alt="More Languages Icon"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/f63f52207b3be66d32f2bb1c9f1d893a8e78b082fe1e5016d1f4686bcf2d84bd?apiKey=40acac346cfd4e1f8d46b35934a94ae2&"
        className="more-languages-icon"
      />
      <span> {text} </span>
    </button>
  );
}

export function FormSubmitButtonAcces({ text, className }) {
  return (
    <button className={className}>
      <img
        loading="lazy"
        alt="Accessibility Icon"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/7460a85cd0707cfa5bb8840ce5316313984de3c096f779b82484df65225497ca?apiKey=40acac346cfd4e1f8d46b35934a94ae2&"
        className="accessibility-icon"
      />
      <span> {text} </span>
    </button>
  );
}

export function Home() {
  return (
    <div className="home-container">
      <Header />
      <h1 className="title">
        ¿Dónde lo quieres <br /> comer?
      </h1>
      <div className="choices">
        <ChoiceCard
          title="Comer aquí"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/62c2565f1f2222ba7d7bb5bf7b3d8820951ac637ce37939aab43ec4d6455076a?apiKey=40acac346cfd4e1f8d46b35934a94ae2&"
        />
        <ChoiceCard
          title="Llevar"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/b74a140589736c2ca8fdc8117b0baedeeb6b5d85972376bd7a8227c96b5699d6?apiKey=40acac346cfd4e1f8d46b35934a94ae2&"
        />
      </div>
      <div className="language-section">
        <img
          loading="lazy"
          alt="Language Icon"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/f63f52207b3be66d32f2bb1c9f1d893a8e78b082fe1e5016d1f4686bcf2d84bd?apiKey=40acac346cfd4e1f8d46b35934a94ae2&"
          className="language-icon"
        />
        <h2 className="language-title">Seleccione un idioma</h2>
      </div>
      <div className="language-buttons">
        <FormSubmitButton text="Español" className="form-submit-button" />
        <FormSubmitButton text="English" className="form-submit-button" />
        <FormSubmitButton text="Deutsch" className="form-submit-button" />
        <FormSubmitButton text="Français" className="form-submit-button" />
      </div>
      <div className="more-languages">
        <FormSubmitButtonLanguages
          text="Más idiomas"
          className="btn-more-languages"
        />
      </div>
      <Footer />
    </div>
  );
}
