import { useState, useEffect } from "react";
import { fetchCategories, fetchToolsByCategory } from "../api/api";

function ToolsPage() {
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("");
  const [tools, setTools] = useState([]);
  const [loading, setLoading] = useState(true);

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
    fetchCategories()
      .then((data) => {
        setCategories(data);
        if (data.length) setActiveCategory(data[0].category);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (!activeCategory) return;
    setLoading(true);

    const normalizedCategory = normalizeCategory(activeCategory);
    console.log("Fetching tools for category:", normalizedCategory);

    fetchToolsByCategory(normalizedCategory)
      .then((data) => {
        console.log("Tools data received:", data);
        setTools(data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [activeCategory]);

  const capitalizeWords = (str) =>
    str
      .split(" ")
      .map((w) => w[0].toUpperCase() + w.slice(1))
      .join(" ");

  return (
    <div className="tools-page-container">
      <h1>Tools</h1>

      <div className="category-buttons">
        {categories.map((cat) => (
          <button
            key={cat.category}
            onClick={() => setActiveCategory(cat.category)}
            className={activeCategory === cat.category ? "active" : ""}
          >
            {capitalizeWords(cat.category)}
          </button>
        ))}
      </div>

      {loading ? (
        <p>Loading tools...</p>
      ) : tools.length ? (
        <ul className="tools-list">
          {tools.map((tool) => (
            <li key={tool.id}>
              <strong>{tool.name}</strong> —{" "}
              {tool.description || "No description"}
              In stock:{" "}
              {tool.instock === true || tool.instock === "t" ? "Yes" : "No"} (
              {tool.quantity})
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
