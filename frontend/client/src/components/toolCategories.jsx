import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchToolsByCategory } from '../api/api';

const ToolsByCategory = () => {
  const { categoryName } = useParams();
  const [tools, setTools] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchToolsByCategory(categoryName)
      .then(data => setTools(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [categoryName]);



  if (loading) return <p>Loading...</p>;

  return (
    <div className="tools-category-container">
      <h2>Tools in category:</h2>
      {tools.length === 0 ? (
        <p>No tools found in this category.</p>
      ) : (
        <ul className="tools-list">
          {tools.map(tool => (
            <li key={tool.id} className="tool-item">{tool.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ToolsByCategory;
