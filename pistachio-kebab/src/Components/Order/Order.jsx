import React, { useContext, useState } from "react";
import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import OrderContext from "./OrderContext";
import "../styles/Order.css";

function ProductItem({ product, onRemove, onQuantityChange }) {
  const { id, imageSrc, altText, name, quantity, price } = product;

  const formattedPrice =
    typeof price === "number" ? price.toFixed(2) : parseFloat(price).toFixed(2);

  return (
    <div className="product-item">
      <button
        className="remove-button"
        aria-label="Remove item"
        onClick={() => onRemove(id, price, name)}
      >
        Quitar
      </button>
      <div className="product-details">
        <img
          loading="lazy"
          src={imageSrc}
          className="product-image-3"
          alt={altText}
        />
        <div className="description">
          <h2 className="product-title-3">{name}</h2>
          <button className="details-button" tabIndex="0">
            Mostrar detalles
          </button>
        </div>
        <div className="quantity-order">
          <button
            onClick={() => onQuantityChange(id, price, name, -1)}
            aria-label="Decrease quantity"
          >
            -
          </button>
          <span>{quantity}</span>
          <button
            onClick={() => onQuantityChange(id, price, name, 1)}
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
        <div className="product-price-3">{formattedPrice}€</div>
      </div>
    </div>
  );
}

export function Order() {
  const { order, removeProduct, updateQuantity } = useContext(OrderContext);
  const navigate = useNavigate();
  const [isAccessibleMode, setIsAccessibleMode] = useState(false);

  const handleRemove = (id, price, name) => {
    const confirmationOptions = {
      title: "¿Eliminar?",
      text: "¿Está seguro de que desea quitar el producto de su pedido?",
      icon: "warning",
      showConfirmButton: true,
      confirmButtonText: "Sí",
      confirmButtonColor: "green",
      showDenyButton: true,
      denyButtonText: "No",
    };

    Swal.fire(confirmationOptions).then((response) => {
      if (response.isConfirmed) {
        removeProduct(id, price, name);
      }
    });
  };

  const handleQuantityChange = (id, price, name, change) => {
    const product = order.find((p) => `${p.id}-${p.price}-${p.name}` === `${id}-${price}-${name}`);
    const newQuantity = product.quantity + change;
    if (newQuantity > 0) {
      updateQuantity(id, price, name, newQuantity);
    }
  };

  const handleAddMore = () => {
    navigate(`/menu`);
  };

  const handleConfirmOrder = async () => {
    try {
      const orderData = {
        products: order.map((product) => ({
          id: product.id,
          quantity: product.quantity,
        })),
        total: order
          .reduce((total, product) => {
            const price =
              typeof product.price === "string"
                ? parseFloat(product.price.replace("€", "").replace(",", "."))
                : product.price;
            return total + price * product.quantity;
          }, 0)
          .toFixed(2),
      };

      const response = await fetch("http://pc-practicas:8984/api/export", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Api-Token": "1234567890",
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }

      const result = await response.json();
      Swal.fire(
        "Pedido confirmado",
        `ID del pedido: ${result.Number}`,
        "success"
      );
    } catch (error) {
      Swal.fire("Error", "Hubo un problema al confirmar el pedido", "error");
      console.error("Error al confirmar el pedido", error);
    }
  };

  const totalPrice = order
    .reduce((total, product) => {
      const price =
        typeof product.price === "string"
          ? parseFloat(product.price.replace("€", "").replace(",", "."))
          : product.price;
      return total + price * product.quantity;
    }, 0)
    .toFixed(2);

  const toggleAccessibleMode = () => {
    setIsAccessibleMode(!isAccessibleMode);
  };

  return (
    <div className={`app-container ${isAccessibleMode ? 'accessible' : ''}`}>
      <Header />
      <section className="order-container">
        <h1 className="order-title">Tu Pedido</h1>
        <div className="product-list">
          {order.map((product) => (
            <ProductItem
              key={`${product.id}-${product.price}-${product.name}`}
              product={product}
              onRemove={handleRemove}
              onQuantityChange={handleQuantityChange}
            />
          ))}
        </div>
        <div className="order-summary">
          <div className="order-total">
            <span>Total: </span>
            <span>{totalPrice} €</span>
          </div>
          <div className="order-actions">
            <button
              className="add-more-button"
              onClick={handleAddMore}
              aria-label="Add more items"
            >
              Pedir Más
            </button>
            <button
              className="confirm-button"
              onClick={handleConfirmOrder}
              aria-label="Confirm order"
            >
              Confirmar pedido
            </button>
          </div>
        </div>
      </section>
      <Footer toggleAccessibleMode={toggleAccessibleMode} />
    </div>
  );
}