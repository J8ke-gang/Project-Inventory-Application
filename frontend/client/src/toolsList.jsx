import React, { useEffect, useState } from 'react';

function ToolsList() {
  const [tools, setTools] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/tools')
      .then((res) => res.json())
      .then((data) => {
        setTools(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch tools:', err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading tools...</p>;

  return (
    <div>
      <h2>Tool Inventory</h2>
      <ul>
        {tools.map((tool) => (
          <li key={tool.id}>
            {tool.name} (Quantity: {tool.quantity})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ToolsList;
