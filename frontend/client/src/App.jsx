import { useState, useEffect } from 'react';

function App() {
  const [tools, setTools] = useState([]);

  // Fetch tools from the backend API
  useEffect(() => {
    fetch(import.meta.env.VITE_API_URL)
      .then((res) => res.json())
      .then((data) => setTools(data))
      .catch((error) => console.error('Error fetching tools:', error));
  }, []);

  return (
    <div>
      <h1>Tool Inventory</h1>
      <ul>
        {tools.map((tool, index) => (
          <li key={index}>{tool.name} - Quantity: {tool.quantity}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
