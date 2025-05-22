import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchToolsByCategory } from "../api/api";
import CartButton from "../components/cartButton";
import "../styles/toolsPage.css";

function ToolsPage() {
  const { categoryName } = useParams();

  const [tools, setTools] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Normalize category strings to match backend kept having errors this fixed it
  const normalizeCategory = (cat) => {
    if (!cat) return "";
    const c = cat.toLowerCase();
    if (c.includes("power")) return "power tool";
    if (c.includes("hand")) return "hand tool";
    if (
      c.includes("toolbox") ||
      c.includes("tool box") ||
      c.includes("toolboxes")
    )
      return "tool box";
    return c;
  };

  useEffect(() => {
    if (!categoryName) return;

    setLoading(true);
    setError(null);

    const normalizedCategory = normalizeCategory(categoryName);

    fetchToolsByCategory(normalizedCategory)
      .then((data) => setTools(data))
      .catch(() => setError("Failed to load tools."))
      .finally(() => setLoading(false));
  }, [categoryName]);

  if (!categoryName) {
    return <p>Please select a category from the menu.</p>;
  }

  if (loading) {
    return <p>Loading tools for {categoryName}...</p>;
  }

  if (error) {
    return <p className="error">{error}</p>;
  }

  return (
    <div className="tools-page-container">
      <h1> {categoryName.replace(/([a-z])([A-Z])/g, "$1 $2")}</h1>
      {tools.length ? (
        <ul className="tools-list">
          {tools.map((tool) => (
            <li key={tool.id} className="tool-item">
              <img
                src={tool.image_url}
                alt={tool.name}
                className="tool-image"
              />
              <div className="tool-info">
                <strong>{tool.name}</strong> —{" "}
                {tool.description || "No description"}
                <br />
                {tool.quantity > 0
                  ? `In stock (${tool.quantity})`
                  : "Out of stock"}
                <p>Price: ${tool.price}</p>
                <CartButton tool={tool} />
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No tools found in this category.</p>
      )}
    </div>
  );
}

export default ToolsPage;
