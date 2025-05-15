const API_BASE_URL = 'http://localhost:3000';

// Fetch all categories (e.g., powertools, handtools, toolboxes)
export const fetchToolsByCategory = async (category) => {
  const res = await fetch(`${API_BASE_URL}/tools/${encodeURIComponent(category)}`);
  if (!res.ok) throw new Error(`Failed to fetch tools for ${category}`);
  return res.json();
};

// Fetch a specific tool by ID
export const fetchToolById = async (id) => {
  const res = await fetch(`${API_BASE_URL}/tools/tool/${id}`);
  if (!res.ok) throw new Error(`Failed to fetch tool with ID ${id}`);
  return res.json();
};
