import { useState, useEffect } from "react";
import { fetchCategories, fetchToolsByCategory } from "../api/api";

function ToolsPage() {
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("");
  const [tools, setTools] = useState([]);
  const [loading, setLoading] = useState(true);

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
    fetchToolsByCategory(activeCategory)
      .then(setTools)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [activeCategory]);

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
            {cat.category[0].toUpperCase() + cat.category.slice(1)}
          </button>
        ))}
      </div>

      {loading ? (
        <p>Loading tools...</p>
      ) : tools.length ? (
        <ul className="tools-list">
          {tools.map((tool) => (
            <li key={tool.id}>
              <strong>{tool.name}</strong> — {tool.description}
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

