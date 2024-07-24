const BASE_URL = "http://184.73.145.4:8085";

export const getProducts = async () => {
  try {
    const response = await fetch(`${BASE_URL}/product/all`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const createProduct = async (name: string) => {
  try {
    const response = await fetch(`${BASE_URL}/product`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });
    return await response.json();
  } catch (error) {
    console.error("Error creating product:", error);
    throw error;
  }
};

export const getInventory = async () => {
  try {
    const response = await fetch(`${BASE_URL}/inventory`);
    return await response.json();
  } catch (error) {
    console.error("Error fetching inventory:", error);
    throw error;
  }
};

export const updateInventory = async (
  inventoryItems: { name: string; quantity: number }[]
) => {
  try {
    const response = await fetch(`${BASE_URL}/inventory`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inventoryItems),
    });
    return await response.json();
  } catch (error) {
    console.error("Error updating inventory:", error);
    throw error;
  }
};

export const resetInventory = async () => {
  try {
    const response = await fetch(`${BASE_URL}/inventory/reset`, {
      method: "POST",
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    console.error("Error resetting inventory:", error);
    throw error;
  }
};
