import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Menu.css";

export function ProductCard({ imageSrc, altText, name, price, productId, onAdd }) {
  const formattedPrice = parseFloat(price).toFixed(2);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/selection/${productId}`);
  };

  return (
    <button className="product-card" onClick={handleClick}>
      <img
        loading="lazy"
        src={imageSrc}
        alt={altText}
        className="product-image"
      />
      <div className="product-title">{name}</div>
      <div className="product-price">{formattedPrice} €</div>
    </button>
  );
};