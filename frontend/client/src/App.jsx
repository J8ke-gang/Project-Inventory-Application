import { Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import HomePage from "./components/homePage";
import ToolsByCategory from "./components/toolCategories";
import ContactUs from "./components/contactUs";
import ToolsPage from "./components/toolsPage";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/category/:categoryName" element={<ToolsByCategory />} />
        <Route path="/tools" element={<ToolsPage />} />
        <Route path="/contact" element={<ContactUs />} />
      </Routes>
    </>
  );
};

export default App;
