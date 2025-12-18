const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://localhost:7070/api";

export const productService = {
  getProducts: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/products`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching products:", error);
      return [];
    }
  },
};
