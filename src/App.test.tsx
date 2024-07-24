import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { InventoryList } from "./components/InventoryList";
import { CreateProduct } from "./components/CreateProduct";

test("renders inventoryList page", () => {
  render(
    <MemoryRouter initialEntries={["/"]}>
      <Routes>
        <Route path="/" element={<InventoryList />} />
      </Routes>
    </MemoryRouter>
  );

  const inventoryTitle = screen.getByText(/Inventory List/i);
  expect(inventoryTitle).toBeInTheDocument();
});

test("renders createProduct page", () => {
  render(
    <MemoryRouter initialEntries={["/create-product"]}>
      <Routes>
        <Route path="/create-product" element={<CreateProduct />} />
      </Routes>
    </MemoryRouter>
  );

  const createProductTitle = screen.getByText(/Create New Product/i);
  expect(createProductTitle).toBeInTheDocument();
});
