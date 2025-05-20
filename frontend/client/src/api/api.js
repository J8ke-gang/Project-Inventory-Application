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

// === Add cart API functions ===

export const getCartId = async (userId = 1) => {
  const res = await fetch(`${API_BASE_URL}/api/cart/${userId}`);
  if (!res.ok) throw new Error('Failed to get cart');
  const cart = await res.json();
  return cart.id;
};

export const addToCart = async (toolId, userId = 1) => {
  const cartId = await getCartId(userId);

  const res = await fetch(`${API_BASE_URL}/api/cart/items`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      cart_id: cartId,
      tool_id: toolId,
      quantity: 1,
    }),
  });

  if (!res.ok) throw new Error('Failed to add item to cart');
};
