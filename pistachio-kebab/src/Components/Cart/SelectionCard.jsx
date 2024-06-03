import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";
import "../styles/SelectionCard.css";
import OrderContext from "../Order/OrderContext";
import Swal from "sweetalert2";

export function SelectionCard() {
  const navigate = useNavigate();
  const { productId } = useParams();
  const location = useLocation();
  const [productData, setProductData] = useState(
    location.state?.product || null
  );
  const [quantity, setQuantity] = useState(1);
  const { addProduct, order } = useContext(OrderContext);

  useEffect(() => {
    if (!productData) {
      const fetchProductData = async () => {
        try {
          const response = await fetch(
            `http://pc-practicas:8984/api/export-master/?filter=Products`
          );
          const data = await response.json();
          const product = data.Products.find((p) => p.Id === productId);
          if (product) {
            setProductData({
              id: product.Id,
              imageSrc:
                product.imageSrc ||
                "https://cdn.builder.io/api/v1/image/assets/TEMP/34d8b192206a782bb90ec0f97530cde5383cf419e0553cea0690edaa5e699cd7?apiKey=19ca1fee3b3c4f58b9c6c7c164e21a51&",
              altText: product.Name,
              name: product.Name,
              price:
                product.Prices && product.Prices[0]
                  ? parseFloat(product.Prices[0].MainPrice.replace(",", ".")).toFixed(2)
                  : "0.00",
            });
          } else {
            console.error("Producto no encontrado");
          }
        } catch (error) {
          console.error("Error al obtener los datos del producto", error);
        }
      };

      fetchProductData();
    }
  }, [productId, productData]);

  const handleClick = () => {
    navigate("/añadidos", { state: { product: productData } });
  };

  const handleDecrease = () => {
    setQuantity((prevQuantity) => Math.max(prevQuantity - 1, 1));
  };

  const handleIncrease = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleAddToOrder = () => {
    Swal.fire({
      title: "¡Añadido!",
      text: "El producto ha sido añadido.",
      icon: "success",
    }).then((response) => {
      if (response.isConfirmed) {
        const totalPriceOfProduct = productData.price * quantity;
        addProduct({
          ...productData,
          totalPrice: totalPriceOfProduct,
          quantity,
        });
        console.log(totalPriceOfProduct, productData, quantity);
        navigate("/menu");
      }
    });
  };

  useEffect(() => {
    console.log('Current order:', order);
  }, [order]);

  if (!productData) {
    return <div>Loading...</div>;
  };

  const formattedPrice =
    typeof productData.price === "string"
      ? parseFloat(productData.price).toLocaleString("es-ES", {
          style: "currency",
          currency: "EUR",
        })
      : parseFloat(productData.price).toFixed(2);

  return (
    <>
      <Header />
      <nav className="nav">
        <button className="back-icon" onClick={() => navigate("/menu")}>
          <img
            src="https://img.icons8.com/?size=100&id=99284&format=png&color=000000"
            alt="back-icon"
            className="back-icon-img"
          />
          <div className="nav-text">Volver</div>
        </button>
      </nav>
      <main className="container">
        <section className="product-card-2">
          <img
            src={productData.imageSrc}
            alt={productData.altText}
            className="product-image-2"
          />
          <h2 className="product-title-2">{productData.name}</h2>
          <p className="product-price-2">{formattedPrice} €</p>
          <button className="customize-button" onClick={handleClick}>
            Personalizar y extras
          </button>
          <div className="quantity-selector">
            <button className="decrease-button" onClick={handleDecrease}>
              -
            </button>
            <span className="quantity">{quantity}</span>
            <button className="increase-button" onClick={handleIncrease}>
              +
            </button>
          </div>
          <div className="action-buttons">
            <button
              className="cancel-button-2"
              onClick={() => navigate("/menu")}
            >
              Cancelar
            </button>
            <button className="add-button" onClick={handleAddToOrder}>
              Añadir al pedido
            </button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
