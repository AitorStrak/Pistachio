import React, { createContext, useState } from "react";

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [order, setOrder] = useState([]);

  const addProduct = (product) => {
    setOrder((prevOrder) => {
      const uniqueIdentifier = `${product.id}-${product.price}-${product.name}`;
      const existingProductIndex = prevOrder.findIndex((p) => `${p.id}-${p.price}-${p.name}` === uniqueIdentifier);
      if (existingProductIndex !== -1) {
        const updatedOrder = prevOrder.map((p, index) =>
          index === existingProductIndex
            ? { 
                ...p, 
                quantity: p.quantity + product.quantity, 
                totalPrice: (parseFloat(p.totalPrice) + parseFloat(product.totalPrice)).toFixed(2) 
              }
            : p
        );
        return updatedOrder;
      } else {
        return [...prevOrder, product];
      }
    });
  };

  const removeProduct = (id, price, name) => {
    const uniqueIdentifier = `${id}-${price}-${name}`;
    setOrder((prevOrder) => prevOrder.filter((product) => `${product.id}-${product.price}-${product.name}` !== uniqueIdentifier));
  };

  const updateQuantity = (id, price, name, quantity) => {
    const uniqueIdentifier = `${id}-${price}-${name}`;
    setOrder((prevOrder) =>
      prevOrder.map((product) =>
        `${product.id}-${product.price}-${product.name}` === uniqueIdentifier ? { ...product, quantity } : product
      )
    );
  };

  const clearOrder = () => {
    setOrder([]);
  };

  return (
    <OrderContext.Provider value={{ order, addProduct, removeProduct, updateQuantity, clearOrder }}>
      {children}
    </OrderContext.Provider>
  );
};

export default OrderContext;