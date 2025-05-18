const API_BASE_URL = 'http://localhost:3000';

const normalizeCategory = (category) => {
  const cat = category.toLowerCase();
  if (cat.includes('tool box')) return 'toolboxes';
  if (cat.includes('hand tool')) return 'handtools';
  if (cat.includes('power tool')) return 'powertools';
  return cat;
};

export const fetchCategories = async () => {
  const res = await fetch(`${API_BASE_URL}/categories`);
  if (!res.ok) throw new Error("Failed to fetch categories");
  return res.json();
};

export const fetchToolsByCategory = async (category) => {
  const normalizedCategory = normalizeCategory(category);
  const res = await fetch(`${API_BASE_URL}/tools/${encodeURIComponent(normalizedCategory)}`);
  if (!res.ok) throw new Error(`Failed to fetch tools for category: ${category}`);
  return res.json();
};
