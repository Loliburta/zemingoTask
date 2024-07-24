import { create } from "zustand";
import {
  getInventory,
  getProducts,
  updateInventory,
  resetInventory,
  createProduct,
} from "../api";

interface InventoryItem {
  name: string;
  quantity: number;
}

interface InventoryState {
  items: InventoryItem[];
  products: string[];
  hasChanges: boolean;
  fetchInventory: () => Promise<void>;
  fetchProducts: () => Promise<void>;
  addItem: (newItem: InventoryItem) => void;
  removeItem: (index: number) => void;
  updateItemQuantity: (index: number, quantity: number) => void;
  saveInventory: () => Promise<void>;
  resetInventoryState: () => Promise<void>;
  addProduct: (productName: string) => Promise<void>;
}

const useInventoryStore = create<InventoryState>((set) => ({
  items: [],
  products: [],
  hasChanges: false,
  fetchInventory: async () => {
    try {
      const data = await getInventory();
      set({ items: data });
    } catch (error) {
      console.error("Error fetching inventory:", error);
    }
  },
  fetchProducts: async () => {
    try {
      const data = await getProducts();
      set({ products: data.map((product: { name: string }) => product.name) });
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  },
  addItem: (newItem) =>
    set((state) => ({
      items: [...state.items, newItem],
      hasChanges: true,
    })),
  removeItem: (index) =>
    set((state) => {
      const newItems = state.items.filter((_, i) => i !== index);
      return { items: newItems, hasChanges: true };
    }),
  updateItemQuantity: (index, quantity) =>
    set((state) => {
      let wasSomethingChanged = false;
      const newItems = state.items.map((item, i) => {
        if (i === index) {
          if (state.items[i].quantity !== quantity) {
            wasSomethingChanged = true;
          }
          return { ...item, quantity };
        } else {
          return item;
        }
      });
      return { items: newItems, hasChanges: wasSomethingChanged };
    }),
  saveInventory: async () => {
    try {
      await updateInventory(useInventoryStore.getState().items);
      set({ hasChanges: false });
    } catch (error) {
      console.error("Error saving inventory:", error);
    }
  },
  resetInventoryState: async () => {
    try {
      await resetInventory();
      set({ items: [], hasChanges: false });
    } catch (error) {
      console.error("Error resetting inventory:", error);
    }
  },
  addProduct: async (productName: string) => {
    try {
      const updatedProducts = await createProduct(productName);
      set({
        products: updatedProducts,
      });
    } catch (error) {
      console.error("Error adding product:", error);
    }
  },
}));

export default useInventoryStore;
