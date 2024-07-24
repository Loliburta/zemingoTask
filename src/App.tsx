import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { InventoryList } from "./components/InventoryList";
import { CreateProduct } from "./components/CreateProduct";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<InventoryList />} />
        <Route path="/create-product" element={<CreateProduct />} />
      </Routes>
    </Router>
  );
};

export default App;
