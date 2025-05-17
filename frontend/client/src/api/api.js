const API_BASE_URL = 'http://localhost:3000';

export const fetchCategories = async () => {
  const res = await fetch(`${API_BASE_URL}/categories`);
  if (!res.ok) throw new Error("Failed to fetch categories");
  return res.json();
};

export const fetchToolsByCategory = async (category) => {
  const res = await fetch(`${API_BASE_URL}/tools/${encodeURIComponent(category)}`);
  if (!res.ok) throw new Error(`Failed to fetch tools for category: ${category}`);
  return res.json();
};
