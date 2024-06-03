import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { MainLayout } from "./Components/Main/MainLayout";
import { Home } from "./Components/Home/Home";
import { Menu } from "./Components/Menu/Menu";
import { SelectionCard } from "./Components/Cart/SelectionCard";
import { Addings } from "./Components/Addings/Addings";
import { OrderProvider } from "./Components/Order/OrderContext";
import { Order } from "./Components/Order/Order";

function App() {
  return (
    <OrderProvider>
      <Router>
        <Routes>
          <Route path="/" element={<MainLayout />} />
          <Route path="/home" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/selection/:productId" element={<SelectionCard />} />
          <Route path="/añadidos" element={<Addings />} />
          <Route path="/order" element={<Order />} />
        </Routes>
      </Router>
    </OrderProvider>
  );
}

export default App;
