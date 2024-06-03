import React, { useEffect, useState } from "react";
import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";
import "../styles/Order.css";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

function ProductItem({ product, onRemove, onQuantityChange }) {
  return (
    <div className="product-item">
      <button
        className="remove-button"
        aria-label="Remove item"
        onClick={onRemove}
      >
        Quitar
      </button>
      <div className="product-details">
        <img
          loading="lazy"
          src={product.image}
          className="product-image-3"
          alt={product.alt}
        />
        <div className="description">
          <h2 className="product-title-3">{product.title}</h2>
          <button className="details-button" tabIndex="0">
            Mostrar detalles
          </button>
        </div>
        <div className="quantity-order">
          <button
            onClick={() => onQuantityChange(product.id, -1)}
            aria-label="Decrease quantity"
          >
            -
          </button>
          <span>{product.quantity}</span>
          <button
            onClick={() => onQuantityChange(product.id, 1)}
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
        <div className="product-price-3">{product.price}</div>
      </div>
    </div>
  );
}

export function Order() {
  const [products, setProducts] = useState([
    {
      id: 1,
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/c85daae051642e90e108ae5eae03c670c56cc6df0704d0948165dee89a0f7754?apiKey=40acac346cfd4e1f8d46b35934a94ae2&",
      alt: "Image of Durum Rollo",
      title: "Durum Rollo",
      quantity: 1,
      price: "5,45 €",
    },
  ]);

  const handleRemove = (id) => {
    const confirmed = Swal.fire({
      title: "¿Eliminar?",
      text: "¿Está seguro de que desea quitar el producto de su pedido?",
      icon: "warning",
      showConfirmButton: true,
      confirmButtonText: "Sí",
      confirmButtonColor: "green",
      showDenyButton: true,
      denyButtonText: "No",
    }).then((response) => {
      if (response.isConfirmed) {
        const updatedProducts = products.filter((product) => product.id !== id);
        setProducts(updatedProducts);
      }
    });
  };

  const handleQuantityChange = (id, change) => {
    const updatedProducts = products.map((product) =>
      product.id === id
        ? { ...product, quantity: Math.max(0, product.quantity + change) }
        : product
    );
    setProducts(updatedProducts);
  };

  const navigate = useNavigate();
  const handleAddMore = () => {
    navigate(`/menu`);
  };

  return (
    <>
      <Header />
      <section className="order-container">
        <h1 className="order-title">Tu Pedido</h1>
        <div className="product-list">
          {products.map((product, index) => (
            <ProductItem
              key={index}
              product={product}
              onRemove={() => handleRemove(product.id)}
              onQuantityChange={handleQuantityChange}
            />
          ))}
        </div>
        <div className="order-summary">
          <div className="order-total">
            <span>Total: </span>
            <span>
              {products
                .reduce(
                  (total, product) =>
                    total +
                    parseFloat(
                      product.price.replace("€", "").replace(",", ".")
                    ) *
                      product.quantity,
                  0
                )
                .toFixed(2)}
              €
            </span>
          </div>
          <div className="order-actions">
            <button
              className="add-more-button"
              onClick={handleAddMore}
              aria-label="Add more items"
            >
              Pedir Más
            </button>
            <button className="confirm-button" aria-label="Confirm order">
              Confirmar pedido
            </button>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
