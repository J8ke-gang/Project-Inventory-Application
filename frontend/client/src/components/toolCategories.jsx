import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchToolsByCategory } from '../api/api';

const ToolsByCategory = () => {
  const { categoryName } = useParams();
  const [tools, setTools] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!categoryName) return;

    console.log('Fetching tools for category:', categoryName);

    fetchToolsByCategory(categoryName)
      .then(setTools)
      .catch((err) => {
        setError(err.message);
        console.error(err);
      });
  }, [categoryName]);

  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Tools in category: {categoryName}</h2>
      <ul>
        {tools.map(tool => (
          <li key={tool.id}>{tool.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default ToolsByCategory;

